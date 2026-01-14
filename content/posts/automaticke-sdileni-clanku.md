---
title: 'Automatické sdílení článků'
headline: 'Automatické sdílení článků na X a Facebook přes GitHub Actions'
description: 'Jak nastavit GitHub Actions workflow pro automatické publikování nových článků na sociální sítě po deployi.'
date: '2026-01-14'
status: 1
tags: ['hotova-reseni']
format: 'html'
---

<p>Publikujete článek a pak ho ručně sdílíte na X, Facebook, LinkedIn? Tenhle proces lze snadno automatisovat pomocí GitHub Actions. Po každém deployi se nový článek automaticky publikuje na sociální sítě.</p>

<h2 id="predpoklady">Předpoklady</h2>

<p>Toto řešení předpokládá, že <b>obsah webu spravujete přes Git</b>. Články jsou uložené jako soubory v repozitáři (např. Markdown v <code>content/posts/</code>) a publikování probíhá přes push do main branch. Workflow detekuje nové články pomocí <code>git diff</code>, takže bez Gitu to nefunguje.</p>

<p>Nejpracnější část celého nastavení je <b>získání API klíčů</b> od jednotlivých platforem. X i Facebook mají komplikovaná vývojářská rozhraní, kde se člověk snadno ztratí. Počítejte s tím, že proklikávání formulářů, nastavování oprávnění a generování tokenů zabere víc času než samotné psaní workflow.</p>

<h2 id="jak-to-funguje">Jak to funguje</h2>

<p>Workflow se spouští po úspěšném Vercel deployi pomocí <code>deployment_status</code> eventu:</p>

<ol>
  <li>Vercel dokončí deploy a pošle status do GitHubu</li>
  <li>GitHub Actions workflow detekuje nové články pomocí <code>git diff</code></li>
  <li>Pro každý nový článek zavolá API sociálních sítí</li>
  <li>Uloží seznam publikovaných článků, aby se předešlo duplicitám</li>
</ol>

<h2 id="workflow">Základní workflow</h2>

<pre><code>name: Share New Articles on Social Media

on:
  deployment_status:

jobs:
  share-articles:
    runs-on: ubuntu-latest
    if: |
      github.event.deployment_status.state == 'success' &&
      github.event.deployment.environment == 'Production'
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Detect new articles
        id: detect
        run: |
          node scripts/social/get-new-articles.js --json > new-articles.json
          ARTICLE_COUNT=$(node -e "console.log(require('./new-articles.json').articles.length)")
          echo "article_count=$ARTICLE_COUNT" >> $GITHUB_OUTPUT
          echo "has_articles=$([[ $ARTICLE_COUNT -gt 0 ]] && echo true || echo false)" >> $GITHUB_OUTPUT

      - name: Post to X (Twitter)
        if: steps.detect.outputs.has_articles == 'true'
        env:
          X_API_KEY: ${{ secrets.X_API_KEY }}
          X_API_SECRET: ${{ secrets.X_API_SECRET }}
          X_ACCESS_TOKEN: ${{ secrets.X_ACCESS_TOKEN }}
          X_ACCESS_TOKEN_SECRET: ${{ secrets.X_ACCESS_TOKEN_SECRET }}
        run: node scripts/social/post-to-x.js

      - name: Post to Facebook
        if: steps.detect.outputs.has_articles == 'true'
        env:
          FACEBOOK_PAGE_ID: ${{ secrets.FACEBOOK_PAGE_ID }}
          FACEBOOK_ACCESS_TOKEN: ${{ secrets.FACEBOOK_ACCESS_TOKEN }}
        run: node scripts/social/post-to-facebook.js</code></pre>

<h2 id="detekce-clanku">Detekce nových článků</h2>

<p>Klíčem je správně detekovat pouze nově přidané články, ne upravené. Používáme <code>git diff</code> s filtrem <code>--diff-filter=A</code> (Added):</p>

<pre><code>git diff --name-only --diff-filter=A HEAD~1..HEAD -- 'content/posts/*.md'</code></pre>

<p>Tím získáme seznam souborů, které byly přidány v posledním commitu. Důležité je <code>fetch-depth: 2</code> v checkout action, jinak nemáme historii pro porovnání.</p>

<h2 id="x-api">Nastavení X (Twitter) API</h2>

<p>X používá OAuth 1.0a, což vyžaduje 4 klíče:</p>

<ol>
  <li>Vytvořte aplikaci na <a href="https://developer.x.com/en/portal/dashboard">X Developer Portal</a></li>
  <li>V <b>User authentication settings</b> nastavte <b>Read and write</b> oprávnění</li>
  <li>Vygenerujte <b>API Key</b>, <b>API Secret</b>, <b>Access Token</b> a <b>Access Token Secret</b></li>
</ol>

<p>Důležité: Access Token musí být vygenerován <b>po</b> nastavení Read and write oprávnění. Pokud změníte oprávnění, musíte token regenerovat.</p>

<h3 id="x-oauth">OAuth 1.0a signature</h3>

<p>X API vyžaduje podepsané požadavky. Signature se generuje takto:</p>

<pre><code>function generateOAuthSignature(method, url, params, consumerSecret, tokenSecret) {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  const signatureBaseString = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(sortedParams)
  ].join('&');

  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;

  return crypto.createHmac('sha1', signingKey)
    .update(signatureBaseString)
    .digest('base64');
}</code></pre>

<h2 id="facebook-api">Nastavení Facebook API</h2>

<p>Facebook je jednodušší - stačí Page Access Token:</p>

<ol>
  <li>Vytvořte aplikaci na <a href="https://developers.facebook.com/">Facebook Developers</a></li>
  <li>V <a href="https://developers.facebook.com/tools/explorer/">Graph API Explorer</a> vygenerujte token s oprávněním <code>pages_manage_posts</code></li>
  <li>Převeďte na dlouhodobý token (viz níže)</li>
</ol>

<h3 id="facebook-token">Permanentní Page Access Token</h3>

<p>Krátkodobý token vyprší za pár hodin. Pro automatisaci potřebujete permanentní:</p>

<pre><code># 1. Převeďte user token na dlouhodobý (60 dní)
GET /oauth/access_token?
  grant_type=fb_exchange_token&
  client_id={APP_ID}&
  client_secret={APP_SECRET}&
  fb_exchange_token={SHORT_TOKEN}

# 2. Získejte permanentní page token
GET /{PAGE_ID}?fields=access_token&access_token={LONG_LIVED_USER_TOKEN}</code></pre>

<p>Výsledný token nevyprší, dokud nezměníte heslo nebo neodeberete oprávnění aplikaci.</p>

<h3 id="facebook-post">Publikování na Facebook</h3>

<pre><code>const response = await fetch(
  `https://graph.facebook.com/v19.0/${pageId}/feed`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      message: 'Text příspěvku',
      link: 'https://example.com/clanek',
      access_token: pageAccessToken
    })
  }
);</code></pre>

<h2 id="duplicity">Prevence duplicit</h2>

<p>Při re-runu workflow by se článek publikoval znovu. Řešením je tracking soubor:</p>

<pre><code>// .github/shared-articles.json
{
  "articles": ["slug-clanku-1", "slug-clanku-2"]
}</code></pre>

<p>Před publikováním zkontrolujeme, zda článek už není v seznamu:</p>

<pre><code>function getSharedArticles() {
  const filePath = '.github/shared-articles.json';
  if (!fs.existsSync(filePath)) return new Set();

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return new Set(data.articles || []);
}

// Filtrování nových článků
const sharedArticles = getSharedArticles();
const newArticles = articles.filter(a => !sharedArticles.has(a.slug));</code></pre>

<p>Po úspěšném publikování přidáme slug do souboru a commitneme:</p>

<pre><code>- name: Commit shared articles tracking
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
    git add .github/shared-articles.json
    git diff --staged --quiet || git commit -m "chore: mark articles as shared [skip ci]"
    git push</code></pre>

<p>Důležitý je <code>[skip ci]</code> v commit message - zabrání spuštění dalšího workflow a Vercel rebuildu.</p>

<h2 id="github-secrets">GitHub Secrets</h2>

<p>Všechny API klíče uložte v <b>Settings → Secrets and variables → Actions</b>:</p>

<table>
  <thead>
    <tr><th>Secret</th><th>Popis</th></tr>
  </thead>
  <tbody>
    <tr><td><code>X_API_KEY</code></td><td>X API Key (Consumer Key)</td></tr>
    <tr><td><code>X_API_SECRET</code></td><td>X API Secret</td></tr>
    <tr><td><code>X_ACCESS_TOKEN</code></td><td>X Access Token (s Read+Write)</td></tr>
    <tr><td><code>X_ACCESS_TOKEN_SECRET</code></td><td>X Access Token Secret</td></tr>
    <tr><td><code>FACEBOOK_PAGE_ID</code></td><td>ID vaší Facebook stránky</td></tr>
    <tr><td><code>FACEBOOK_ACCESS_TOKEN</code></td><td>Permanentní Page Access Token</td></tr>
  </tbody>
</table>

<h2 id="debugging">Debugging</h2>

<p>Nejčastější chyby:</p>

<ul>
  <li><b>X 401 Unauthorized</b> - Access Token má špatná oprávnění. Zkontrolujte, že je "Read and write" a regenerujte token.</li>
  <li><b>Facebook (#200) Permissions error</b> - Token nemá oprávnění <code>pages_manage_posts</code>.</li>
  <li><b>Článek se nepublikuje</b> - Zkontrolujte, že <code>fetch-depth: 2</code> je nastaveno a článek má <code>status: 1</code>.</li>
</ul>

<p>Pro lokální testování:</p>

<pre><code># X
export X_API_KEY="..." X_API_SECRET="..." X_ACCESS_TOKEN="..." X_ACCESS_TOKEN_SECRET="..."
node scripts/social/post-to-x.js --article='{"title":"Test","url":"https://example.com","tags":["test"]}'

# Facebook
export FACEBOOK_PAGE_ID="..." FACEBOOK_ACCESS_TOKEN="..."
node scripts/social/post-to-facebook.js --article='{"title":"Test","url":"https://example.com"}'</code></pre>

<h2 id="rozsireni">Rozšíření</h2>

<p>Stejný princip lze použít pro LinkedIn, Mastodon nebo jiné platformy. Stačí přidat další krok do workflow a odpovídající skript pro volání API.</p>
