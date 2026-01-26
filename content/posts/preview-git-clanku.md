---
title: "Preview článků přímo z Gitu"
headline: "Preview článků přímo z Gitu"
description: "Jak zobrazit náhled článku z pull requestu bez čekání na build a deploy."
date: "2026-01-11"
status: 1
tags: ["git", "produktivita", "svelte", "napady"]
format: "html"
---

<p>Při práci s blogem postaveným na <b>SvelteKit</b> a hostovaným na <b>Vercelu</b> jsem řešil problém – jak rychle zobrazit náhled rozpracovaného článku?</p>

<p>Klasický postup vypadá takto:</p>

<ol>
<li>Vytvořím větev s novým článkem</li>
<li>Pushnu na GitHub</li>
<li>Vercel spustí build (~60 sekund)</li>
<li>Teprve pak vidím náhled</li>
</ol>

<p>Minutu čekat na každou změnu v textu? To je otravné.</p>

<h2 id="reseni">Řešení: Načítat články přímo z GitHubu</h2>

<p>Namísto čekání na build můžeme články <b>načítat za běhu</b> přímo z GitHub raw URL:</p>

<pre><code>https://raw.githubusercontent.com/user/repo/branch/content/posts/clanek.md</code></pre>

<p>Vytvořil jsem speciální <code>/preview</code> stránku, která:</p>

<ul>
<li>Přijme slug článku a název větve</li>
<li>Stáhne markdown soubor z GitHubu</li>
<li>Zparsuje frontmatter a obsah</li>
<li>Zobrazí článek stejně jako na produkci</li>
</ul>

<h2 id="implementace">Implementace</h2>

<p>Sdílená funkce pro načítání článků z GitHubu:</p>

<pre><code>// $lib/preview/github.ts
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/user/repo';

export async function fetchPostFromGitHub(slug: string, branch: string) {
  const url = `${GITHUB_RAW_BASE}/${branch}/content/posts/${slug}.md`;
  const response = await fetch(url);

  if (!response.ok) return null;

  const content = await response.text();
  const { data, content: body } = matter(content);

  return {
    title: data.title,
    headline: data.headline,
    description: data.description,
    text_html: body,
    // ...
  };
}</code></pre>

<p>A jednoduchý server endpoint:</p>

<pre><code>// routes/preview/[slug]/+page.server.ts
export const load = async ({ params, url }) => {
  const slug = params.slug;
  const branch = url.searchParams.get('branch') || 'main';

  const post = await fetchPostFromGitHub(slug, branch);

  if (!post) throw error(404, 'Článek nenalezen');

  return { post, branch };
};</code></pre>

<h2 id="obrazky">Co s obrázky?</h2>

<p>Články často obsahují náhledový obrázek. Ten také musíme načíst z GitHubu.</p>

<p>Vytvořil jsem proxy endpoint:</p>

<pre><code>// routes/preview/files/article/[slug]/+server.ts
export const GET = async ({ params, url }) => {
  const branch = url.searchParams.get('branch') || 'main';
  const githubUrl = `${GITHUB_RAW_BASE}/${branch}/static/files/article/${params.slug}`;

  const response = await fetch(githubUrl);
  return new Response(await response.arrayBuffer(), {
    headers: { 'Content-Type': response.headers.get('content-type') }
  });
};</code></pre>

<p>Proč proxy a ne přímé načítání z GitHubu? Kvůli <b>CORS</b> – GitHub raw URL nemá potřebné hlavičky pro všechny use-cases. Proxy endpoint navíc zachovává konsistentní URL strukturu (<code>/files/article/slug.png</code>) stejnou jako na produkci.</p>

<h2 id="github-action">Automatické odkazy v PR</h2>

<p>Aby nebylo potřeba ručně skládat URL, přidal jsem GitHub Action, která automaticky přidá komentář k pull requestu:</p>

<pre><code>name: Preview Comment

on:
  pull_request:
    paths:
      - 'content/posts/*.md'

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Get changed articles
        run: |
          # Najdi změněné články a vygeneruj odkazy
          for file in $(git diff --name-only ...); do
            slug=$(basename "$file" .md)
            echo "- [$slug](/preview/$slug?branch=$BRANCH)"
          done

      - name: Create comment
        uses: peter-evans/create-or-update-comment@v4
        # ...</code></pre>

<p>Výsledný komentář obsahuje odkazy na preview i s náhledovými obrázky.</p>

<h2 id="bezpecnost">Bezpečnost</h2>

<p>Preview stránky by neměly být indexovány vyhledávači:</p>

<ul>
<li><code>&lt;meta name="robots" content="noindex, nofollow"&gt;</code></li>
<li>Pravidlo v <code>robots.txt</code>: <code>Disallow: /preview/</code></li>
</ul>

<h2 id="rychlost">Porovnání rychlosti</h2>

<table>
<tr><th>Způsob</th><th>Čas</th></tr>
<tr><td>Vercel build</td><td>~60 sekund</td></tr>
<tr><td>Preview z GitHubu</td><td>~200 ms</td></tr>
</table>

<p>Rozdíl je dramatický – místo minuty vidím změny okamžitě.</p>

<h2 id="zaver">Závěr</h2>

<p>Toto řešení odděluje <b>náhled obsahu</b> od <b>nasazení aplikace</b>:</p>

<ul>
<li>Změny v článcích → okamžitý náhled přes <code>/preview</code></li>
<li>Změny v kódu → klasický Vercel build</li>
</ul>

<p>Není potřeba žádná externí služba ani database. Stačí GitHub raw URL a pár řádků kódu.</p>
