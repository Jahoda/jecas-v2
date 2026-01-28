#!/usr/bin/env python3
"""
Migrační skript: Disqus XML export → SQL pro Supabase comments tabulku.

Použití:
    python3 scripts/migrate-disqus.py > database/migration_disqus.sql

Poté SQL spustit v Supabase SQL Editoru.
"""

import xml.etree.ElementTree as ET
import html
import re
import secrets
from urllib.parse import urlparse, unquote

XML_FILE = 'jecas-2026-01-28T18_05_01.177892-all.xml'
NS = {'d': 'http://disqus.com', 'dsq': 'http://disqus.com/disqus-internals'}


def strip_html(text: str) -> str:
    """Převede HTML komentář na čistý text."""
    # Decode HTML entities
    text = html.unescape(text)
    # <br> → newline
    text = re.sub(r'<br\s*/?>', '\n', text)
    # <p>...</p> → text + newline
    text = re.sub(r'<p>(.*?)</p>', r'\1\n', text, flags=re.DOTALL)
    # <code>...</code> → `...`
    text = re.sub(r'<code>(.*?)</code>', r'`\1`', text, flags=re.DOTALL)
    # <a href="...">text</a> → text (URL)
    text = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', r'\2 (\1)', text, flags=re.DOTALL)
    # Strip remaining HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Normalize whitespace
    text = re.sub(r'\n{3,}', '\n\n', text).strip()
    return text


def extract_slug_from_url(url: str) -> str | None:
    """Extrahuje slug z Disqus thread URL."""
    parsed = urlparse(url)
    path = unquote(parsed.path).strip('/')
    # Ignore URLs with quotes or weird chars
    if '"' in path or '%22' in path or '/' in path:
        return None
    if not path:
        return None
    return path


def escape_sql(text: str) -> str:
    """Escapuje text pro SQL."""
    return text.replace("'", "''").replace("\\", "\\\\")


def main():
    tree = ET.parse(XML_FILE)
    root = tree.getroot()

    # 1. Parse threads → slug mapping
    thread_slug = {}  # dsq:id → slug
    for t in root.findall('d:thread', NS):
        tid = t.get(f'{{{NS["dsq"]}}}id')
        is_deleted = t.find('d:isDeleted', NS)
        if is_deleted is not None and is_deleted.text == 'true':
            continue

        # Prefer <id> (explicit slug), fallback to URL extraction
        thread_id_el = t.find('d:id', NS)
        slug = thread_id_el.text if thread_id_el is not None and thread_id_el.text else None

        if not slug:
            link = t.find('d:link', NS)
            if link is not None and link.text:
                slug = extract_slug_from_url(link.text)

        if slug:
            thread_slug[tid] = slug

    # 2. Parse posts
    posts = []
    for p in root.findall('d:post', NS):
        is_deleted = p.find('d:isDeleted', NS)
        is_spam = p.find('d:isSpam', NS)
        if (is_deleted is not None and is_deleted.text == 'true') or \
           (is_spam is not None and is_spam.text == 'true'):
            continue

        pid = p.get(f'{{{NS["dsq"]}}}id')
        thread_ref = p.find('d:thread', NS)
        thread_id = thread_ref.get(f'{{{NS["dsq"]}}}id') if thread_ref is not None else None

        if not thread_id or thread_id not in thread_slug:
            continue

        message_el = p.find('d:message', NS)
        message = message_el.text if message_el is not None and message_el.text else ''
        message = strip_html(message)
        if not message:
            continue

        author_el = p.find('d:author', NS)
        name_el = author_el.find('d:name', NS) if author_el is not None else None
        author_name = name_el.text if name_el is not None and name_el.text else 'Anonym'

        created_el = p.find('d:createdAt', NS)
        created_at = created_el.text if created_el is not None else None

        parent_el = p.find('d:parent', NS)
        parent_disqus_id = parent_el.get(f'{{{NS["dsq"]}}}id') if parent_el is not None else None

        posts.append({
            'disqus_id': pid,
            'slug': thread_slug[thread_id],
            'author_name': author_name,
            'message': message,
            'created_at': created_at,
            'parent_disqus_id': parent_disqus_id,
        })

    # 3. Generate SQL
    print("-- Migrace Disqus komentářů do Supabase")
    print(f"-- Celkem komentářů: {len(posts)}")
    print(f"-- Generováno ze souboru: {XML_FILE}")
    print()
    print("BEGIN;")
    print()

    # Create temporary mapping table for Disqus IDs → new IDs
    print("-- Dočasná tabulka pro mapování Disqus ID → nové ID")
    print("CREATE TEMP TABLE disqus_id_map (disqus_id TEXT PRIMARY KEY, new_id BIGINT);")
    print()

    # Insert comments without parent_id first, then update parents
    for post in posts:
        token = secrets.token_hex(32)
        slug = escape_sql(post['slug'])
        name = escape_sql(post['author_name'])
        msg = escape_sql(post['message'])
        created = post['created_at']

        print(f"WITH ins AS (")
        print(f"  INSERT INTO comments (slug, author_name, message, edit_token, is_approved, created_at, updated_at)")
        print(f"  VALUES ('{slug}', '{name}', '{msg}', '{token}', true, '{created}', '{created}')")
        print(f"  RETURNING id")
        print(f")")
        print(f"INSERT INTO disqus_id_map (disqus_id, new_id) SELECT '{post['disqus_id']}', id FROM ins;")
        print()

    # Update parent_id references
    print("-- Nastavení parent_id pro odpovědi")
    replies = [p for p in posts if p['parent_disqus_id']]
    for post in replies:
        print(f"UPDATE comments SET parent_id = (SELECT new_id FROM disqus_id_map WHERE disqus_id = '{post['parent_disqus_id']}')")
        print(f"WHERE id = (SELECT new_id FROM disqus_id_map WHERE disqus_id = '{post['disqus_id']}');")

    print()
    print("-- Vyčištění")
    print("DROP TABLE disqus_id_map;")
    print()
    print("COMMIT;")

    # Stats to stderr
    import sys
    slugs = set(p['slug'] for p in posts)
    replies_count = len([p for p in posts if p['parent_disqus_id']])
    print(f"\n-- Statistiky:", file=sys.stderr)
    print(f"--   Komentářů: {len(posts)}", file=sys.stderr)
    print(f"--   Odpovědí: {replies_count}", file=sys.stderr)
    print(f"--   Článků: {len(slugs)}", file=sys.stderr)


if __name__ == '__main__':
    main()
