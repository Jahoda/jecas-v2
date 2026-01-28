#!/usr/bin/env python3
"""
Stažení dat z Disqus API: e-maily autorů, reakce na články, liky komentářů.

Použití (spustit lokálně, ne na serveru):
    python3 scripts/fetch-disqus-api.py

Výstup:
    database/migration_disqus_api.sql - SQL pro import do Supabase

Vyžaduje: requests (pip install requests)
"""

import json
import time
import sys
import hashlib
import secrets
from collections import defaultdict

try:
    import requests
except ImportError:
    print("Nainstalujte requests: pip install requests", file=sys.stderr)
    sys.exit(1)

API_SECRET = '14jIrepVXjG0E93awdyzKs88ZGuziNMe77nFlRl3y2DOBLkvzmhadZ4Y49v23e7w'
FORUM = 'jecas'
BASE = 'https://disqus.com/api/3.0'

# Rate limiting: max 1000 req/hour
request_count = 0


def api_get(endpoint, params=None):
    """Volání Disqus API s rate limiting."""
    global request_count
    if params is None:
        params = {}
    params['api_secret'] = API_SECRET
    params['forum'] = FORUM

    url = f'{BASE}/{endpoint}.json'

    for attempt in range(4):
        try:
            r = requests.get(url, params=params, timeout=30)
            request_count += 1

            if request_count % 50 == 0:
                print(f"  [{request_count} API volání]", file=sys.stderr)

            if r.status_code == 429:
                wait = 60 * (attempt + 1)
                print(f"  Rate limit, čekám {wait}s...", file=sys.stderr)
                time.sleep(wait)
                continue

            r.raise_for_status()
            data = r.json()
            if data.get('code') != 0:
                print(f"  API chyba: {data}", file=sys.stderr)
                return None
            return data
        except Exception as e:
            print(f"  Chyba: {e}, pokus {attempt + 1}/4", file=sys.stderr)
            time.sleep(2 ** attempt)

    return None


def paginate(endpoint, params=None, key='response'):
    """Stránkování přes cursor."""
    if params is None:
        params = {}
    params['limit'] = 100
    all_items = []

    while True:
        data = api_get(endpoint, params.copy())
        if not data:
            break

        items = data.get(key, [])
        if isinstance(items, list):
            all_items.extend(items)
        else:
            all_items.append(items)

        cursor = data.get('cursor', {})
        if not cursor.get('hasNext'):
            break
        params['cursor'] = cursor['next']

    return all_items


def escape_sql(text):
    return text.replace("'", "''").replace("\\", "\\\\")


def main():
    print("=== Stahování dat z Disqus API ===", file=sys.stderr)

    # 1. Stáhnout všechny posty (komentáře) s autory
    print("\n1. Stahování komentářů s e-maily autorů...", file=sys.stderr)
    posts = paginate('posts/list', {'related': 'thread', 'include': ['approved']})
    print(f"   Staženo {len(posts)} komentářů", file=sys.stderr)

    # Mapování: disqus_post_id → {email, likes, dislikes}
    post_data = {}
    for post in posts:
        pid = str(post.get('id', ''))
        author = post.get('author', {})
        email = author.get('email', '')
        likes = post.get('likes', 0)
        dislikes = post.get('dislikes', 0)

        # Thread info
        thread = post.get('thread', {})
        if isinstance(thread, dict):
            thread_link = thread.get('link', '')
        else:
            thread_link = ''

        # Extrahovat slug z URL
        slug = ''
        if thread_link:
            path = thread_link.replace('http://jecas.cz/', '').replace('https://jecas.cz/', '').strip('/')
            if '/' not in path and '"' not in path:
                slug = path

        post_data[pid] = {
            'email': email,
            'likes': likes,
            'dislikes': dislikes,
            'slug': slug,
            'author_name': author.get('name', ''),
        }

    # E-maily statistiky
    emails_found = sum(1 for p in post_data.values() if p['email'])
    print(f"   E-mailů nalezeno: {emails_found}/{len(post_data)}", file=sys.stderr)

    # Liky statistiky
    with_likes = sum(1 for p in post_data.values() if p['likes'] > 0)
    print(f"   Komentářů s liky: {with_likes}", file=sys.stderr)

    # 2. Stáhnout reakce na články (thread reactions)
    print("\n2. Stahování reakcí na články...", file=sys.stderr)

    # Nejdřív získat všechny thready
    threads = paginate('threads/list')
    print(f"   Staženo {len(threads)} threadů", file=sys.stderr)

    reactions_data = []  # [{slug, reaction_type, count}]

    for i, thread in enumerate(threads):
        tid = thread.get('id', '')
        thread_link = thread.get('link', '')

        # Extrahovat slug
        slug = ''
        if thread_link:
            path = thread_link.replace('http://jecas.cz/', '').replace('https://jecas.cz/', '').strip('/')
            if '/' not in path and '"' not in path:
                slug = path

        if not slug:
            continue

        # Získat reakce pro thread
        data = api_get('threadReactions/loadReactions', {'thread': tid})
        if not data:
            continue

        response = data.get('response', {})
        reactions = response.get('reactions', [])

        for reaction in reactions:
            rtype = reaction.get('id', '')
            count = reaction.get('count', 0)
            if count > 0:
                reactions_data.append({
                    'slug': slug,
                    'reaction_id': rtype,
                    'reaction_text': reaction.get('text', ''),
                    'count': count,
                })

        if (i + 1) % 100 == 0:
            print(f"   Zpracováno {i + 1}/{len(threads)} threadů", file=sys.stderr)

    print(f"   Nalezeno {len(reactions_data)} reakcí", file=sys.stderr)

    # 3. Generovat SQL
    print("\n3. Generování SQL...", file=sys.stderr)

    sql_lines = []
    sql_lines.append("-- Migrace dat z Disqus API")
    sql_lines.append(f"-- E-maily: {emails_found}, Reakce: {len(reactions_data)}, Komentáře s liky: {with_likes}")
    sql_lines.append("")
    sql_lines.append("BEGIN;")
    sql_lines.append("")

    # 3a. Aktualizace e-mailů v comments tabulce
    # Potřebujeme mapování přes disqus_id_map (z předchozí migrace)
    # Ale nemáme disqus ID v DB - musíme matchovat přes slug + author_name + created_at
    sql_lines.append("-- === E-MAILY AUTORŮ ===")
    sql_lines.append("-- Aktualizace author_email pro existující komentáře")
    sql_lines.append("-- Matchování přes slug + author_name (case insensitive)")
    sql_lines.append("")

    # Seskupit e-maily podle jména autora (jeden autor = jeden email)
    author_emails = {}
    for p in post_data.values():
        if p['email'] and p['author_name']:
            name = p['author_name'].strip()
            if name not in author_emails:
                author_emails[name] = p['email'].strip()

    for name, email in author_emails.items():
        sql_lines.append(
            f"UPDATE comments SET author_email = '{escape_sql(email)}' "
            f"WHERE lower(author_name) = lower('{escape_sql(name)}') "
            f"AND author_email IS NULL;"
        )

    sql_lines.append("")
    sql_lines.append(f"-- Aktualizováno {len(author_emails)} unikátních autorů")
    sql_lines.append("")

    # 3b. Reakce na články
    sql_lines.append("-- === REAKCE NA ČLÁNKY ===")

    # Mapování Disqus reaction types na naše types
    # Disqus má custom reactions per forum - potřebujeme zjistit mapování
    # Typicky: reaction IDs odpovídají konfiguraci fóra
    # Pro jistotu vypíšeme surová data a mapování

    if reactions_data:
        # Zjistit unikátní typy reakcí
        reaction_types = set()
        for r in reactions_data:
            reaction_types.add((r['reaction_id'], r['reaction_text']))
        sql_lines.append(f"-- Nalezené typy reakcí v Disqusu:")
        for rid, rtext in sorted(reaction_types):
            sql_lines.append(f"--   ID: {rid}, Text: {rtext}")
        sql_lines.append("")

        # Mapování (bude potřeba upravit ručně pokud IDs nesedí)
        sql_lines.append("-- Mapování Disqus reakcí → article_reactions:")
        sql_lines.append("-- Upravte mapování níže pokud IDs nesedí")
        sql_lines.append("")

        for r in reactions_data:
            slug = escape_sql(r['slug'])
            # Vygenerovat N řádků pro count reakcí
            # article_reactions má jeden řádek per reakce, ne agregát
            # Potřebujeme mapovat Disqus reaction_id na naše 'nice'/'didnt_know'/'use_it'
            reaction_map_comment = f"-- Disqus reaction '{r['reaction_text']}' (id={r['reaction_id']}) → {r['count']}× na /{r['slug']}"
            sql_lines.append(reaction_map_comment)

        sql_lines.append("")
        sql_lines.append("-- Pro import reakcí je potřeba namapovat Disqus typy na vaše typy.")
        sql_lines.append("-- Vaše typy: 'nice', 'didnt_know', 'use_it'")
        sql_lines.append("-- Odkomentujte a upravte INSERTy níže:")
        sql_lines.append("")

        for r in reactions_data:
            slug = escape_sql(r['slug'])
            # Vygenerujeme INSERT pro každou reakci s dummy IP hashem
            for i in range(r['count']):
                ip_hash = hashlib.sha256(f"disqus_import_{r['slug']}_{r['reaction_id']}_{i}".encode()).hexdigest()
                sql_lines.append(
                    f"-- INSERT INTO article_reactions (slug, reaction, ip_hash) "
                    f"VALUES ('{slug}', 'MAPUJ_SEM', '{ip_hash}');"
                )

    sql_lines.append("")
    sql_lines.append("COMMIT;")

    # Zapsat SQL
    output = '\n'.join(sql_lines)
    with open('database/migration_disqus_api.sql', 'w') as f:
        f.write(output)

    print(f"\nHotovo! SQL zapsáno do database/migration_disqus_api.sql", file=sys.stderr)
    print(f"Celkem API volání: {request_count}", file=sys.stderr)

    # Vypsat JSON s surovými daty pro debug
    with open('database/disqus_api_raw.json', 'w') as f:
        json.dump({
            'post_data': post_data,
            'reactions_data': reactions_data,
            'author_emails': author_emails,
        }, f, indent=2, ensure_ascii=False)
    print(f"Surová data: database/disqus_api_raw.json", file=sys.stderr)


if __name__ == '__main__':
    main()
