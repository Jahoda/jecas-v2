---
title: "CMS založené na Gitu"
headline: "CMS založené na Gitu"
description: "K čemu jsou dobré redakční systémy postavené na Gitu."
date: "2023-01-29"
last_modification: "2025-09-02"
status: 1
tags: ["cms", "produktivita"]
format: "html"
---

<p>Pro správu obsahu se často hodí mít tzv. redakční systém (CMS = <i lang="en">content management system</i>).</p>

<p>Otázka je, kam redakční systém ukládá data.</p>

<p>Například v roce 2025 stále nejrozšířenější <a href="/wordpress">WordPress</a> ukládá data do <b>SQL databáse</b>.</p>

<p>To přináší jistou režii pro provoz – DB někde musí běžet, musí být někde <a href="/hosting">hostovaná</a>.</p>

<h2 id="staticke">Statické stránky</h2>

<p>V posledních letech se znovu do hry vrátily <b>statické stránky</b>. To nutně neznamená, že tvůrce obsahu <a href="https://www.jakpsatweb.cz/jak-udelat.html#soubory">ručně vytváří</a> jednotlivé <code>*.html</code> soubory.</p>

<p>Statické soubory mohou vzniknout až v okamžiku <i>buildu</i>.</p>

<p>Existuje řada hotových řešení pro generování statických stránek:</p>

<ul>
  <li><a href="https://astro.build">Astro</a></li>
  <li><a href="https://www.gatsbyjs.com">Gatsby</a></li>
  <li><a href="https://gohugo.io">Hugo</a></li>
  <li><a href="https://jekyllrb.com">Jekyll</a></li>
</ul>

<p>Případně i klasické fullstack JS frameworky, zvládají generovat statický web:</p>

<ul>
  <li><a href="https://svelte.dev">SvelteKit</a></li>
  <li><a href="https://nextjs.org">Next.js</a></li>
  <li><a href="https://nuxt.com">Nuxt</a></li>
</ul>

<p>A mnoho <a href="https://jamstack.org/generators/">dalších</a>.</p>

<h2 id="md">Markdown</h2>

<p><a href="/markdown">Markdown</a> nabízí způsob, jak v obyčejném textu používat strojově pochopitelné formátování. Místo HTML značek se používají lidsky intuitivnější symboly:</p>

<pre><code># Nadpis
Odstavec s **tučným** a *šikmým textem*
1. číslovaný seznam
2. s několika
3. položkami</code></pre>

<p>Pro Markdown existuje hromada nástrojů, pluginů a editorů a pomalu se rozšiřuje i mimo programátory.</p>

<p>Kromě toho Markdown dovoluje i psát v HTML, takže při přechodu na MD není potřeba nic konvertovat, ale vše může zůstat v HTML.</p>

<h3 id="frontmatter">Frontmatter</h3>

<p><i>Frontmatter</i> je způsob, jak do Markdown souboru přidat různá metadata. Jedná se o blok YAML nebo TOML na začátku souboru, který je oddělený třemi pomlčkami na začátku a konci.</p>

<p>Typický frontmatter může obsahovat:</p>

<pre><code>---
title: "Název článku"
date: "2025-09-02"
tags: ["tag1", "tag2"]
author: "Jméno autora"
draft: false
---</code></pre>

<p>Git-based CMS systémy často využívají frontmatter pro:</p>

<ul>
  <li><b>Kategorisaci obsahu</b> – pomocí tagů a kategorií</li>
  <li><b>Řízení workflow</b> – draft vs. publikovaný stav</li>
  <li><b>SEO metadata</b> – title, description, keywords</li>
  <li><b>Automatisaci</b> – datum publikování, autor, verse</li>
  <li><b>Integraci s build procesem</b> – formát, layout, šablona</li>
</ul>

<h2 id="git">Git</h2>

<p><a href="/git-prakticky">Git</a> je nástroj pro versování zdrojových kódů. Nad Gitem jsou navíc postavené online služby pro jeho nahrávání na internet.</p>

<p>Nejpoužívanější je <a href="https://github.com">GitHub</a> a <a href="https://about.gitlab.com">GitLab</a>.</p>

<h2 id="hosting">Hosting s podporou Gitu</h2>

<p>Existuje mnoho služeb, které se na pár kliknutí dokáží napojit na Git repositář na GitHubu nebo GitLabu a jeho obsah automaticky deployovat (vystavit na veřejnou URL).</p>

<ul>
  <li><a href="https://www.netlify.com">Netlify</a></li>
  <li><a href="https://vercel.com/">Vercel</a></li>
  <li><a href="https://pages.github.com">GitHub Pages</a></li>
  <li><a href="https://pages.cloudflare.com">Cloudflare Pages</a></li>
  <li><a href="https://render.com">Render</a></li>
  <li><a href="https://www.digitalocean.com/products/app-platform">DigitalOcean App Platform</a></li>
</ul>

<p>Díky tomu, že mohou být <i>serverless</i>, jde na nich menší weby hostovat zdarma.</p>

<h2 id="serverless">Serverless hosting</h2>

<p>Serverless je v překladu <i>bezserverový</i>. Co to znamená? Přece to musí běžet na nějakém serveru.</p>

<p>Zjednodušeně řečeno se termínem serverless myslí situace, kdy se vývojář vůbec nestará o server. Nemusí řešit potřebné prostředky, ale vše škáluje automaticky.</p>

<p>Aplikace tak vytěžuje servery, jen když je zrovna potřeba.</p>

<p>Takže v situaci, kdy na web nechodí moc lidí, je jeho provoz velmi levný.</p>

<h2 id="stateless">Stateless</h2>

<p><i>Stateless</i> – tedy bezstavové – jsou aplikace, které neukládají trvalá data na server.</p>

<p>Tato architektura umožňuje snadnější škálování a zlepšuje dostupnost aplikace, protože stav aplikace není uložen na konkrétním serveru.</p>

<h2 id="headless">Headless CMS</h2>

<p>Česky přeloženo jako <i>bezhlavé</i> (headless) jsou redakční systémy, které neřeší frontend webu, ale pouze správu dat.</p>

<p>Data se z takových CMS buď stahují přes API, nebo ukládají data do souborů.</p>

<div class="external-content">
<ul><li><a href="https://jamstack.org/headless-cms/">Headless CMS</a> – seznam spousty headless CMS</li></ul>
</div>

<h2 id="git-based">Git-based CMS</h2>

<p>Díky dříve zmíněným technologiím existují <i>Git-based</i> redakční systémy, tj. založené na Gitu.</p>

<p>Z toho plyne, že Git repositář se používá jako <b>úložiště obsahu</b>. Změny na stránce se tak provádí klasickými <i>commity</i>.</p>

<p>To ale nutně neznamená, že vyžadují <b>znalost práce s Gitem</b>, protože tak mohou fungovat jen na pozadí. Pro uživatele se to může tvářit jako běžný CMS.</p>

<p>Implementace je obvykle velmi jednoduchá – víceméně stačí redakčnímu systému dát přístup k repositáři na GitHubu/GitLabu a rovnou začít provádět změny.</p>

<p>Některé CMS vyžadují konfiguraci, aby pochopily strukturu projektu.</p>

<h3 id="decapcms-cms">Decap CMS (dříve Netlify CMS)</h3>

<p><a href="https://decapcms.org">Decap CMS</a> je open-source redakční systém.</p>

<p>Není nutné ho používat jen na Netlify.</p>

<p><img src="/files/git-cms/netlify-cms.png" alt="Netlify CMS" class="border"></p>

<h3 id="prose">Prose.io</h3>

<p><a href="https://prose.io">Prose</a> dokáže po připojení GitHub repositáře upravovat libovolné soubory. Pro soubory v Markdownu nabízí přehledný editor i s možností uploadu souborů.</p>

<p>Není potřeba ho nijak instalovat ani konfigurovat.</p>

<p><img src="/files/git-cms/prose.png" alt="Prose" class="border"></p>

<h3 id="tina">Tina</h3>

<p><a href="https://tina.io">Tina</a> (dříve <a href="https://forestry.io">Forestry</a>) je moderní Git-based CMS s visuálním editorem. Umožňuje editaci obsahu přímo na webu s live preview.</p>

<p>Tina se integruje s různými frameworky jako Next.js, Nuxt, Gatsby a další. Poskytuje TypeScript podporu a umožňuje definovat vlastní schémata obsahu.</p>

<h3 id="github">GitHub Pages</h3>

<p>GitHub Pages dokáží generovat statické stránky přes <a href="https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll">Jekyll</a> nebo jiné statické generátory.</p>

<p>Pro editaci obsahu lze použít GitHub webové rozhraní nebo lokálně desktop aplikaci GitHub Desktop.</p>


<h3 id="zadny-cms">Skoro žádný CMS</h3>

<p>Teoreticky není potřeba vůbec žádný CMS, ale obsah můžete rovnou upravovat v prostředí GitHubu/GitLabu.</p>

<p>Pro soubory v Markdown formátu mají editory se zvýrazňováním syntaxe, klávesovými zkratkami a problém není ani upload obrázků nebo videí.</p>

<h2 id="výhody">Výhody Git-based CMS</h2>

<ul>
  <li><b>Versování</b> – každá změna je uložena s kompletní historií</li>
  <li><b>Záloha</b> – obsah je automaticky zálohován v Git repositáři</li>
  <li><b>Spolupráce</b> – více autorů může pracovat na obsahu přes pull/merge requesty</li>
  <li><b>Transparentnost</b> – všechny změny jsou viditelné a auditovatelné</li>
  <li><b>Offline práce</b> – obsah lze editovat lokálně bez internetu</li>
  <li><b>Integrace</b> – snadná integrace s CI/CD pipeline</li>
  <li><b>Nezávislost</b> – obsah může jít editovat současně různými CMS, velmi snadná migrace mezi CMS</li>
</ul>

<h2 id="nevýhody">Nevýhody Git-based CMS</h2>

<p>Různé CMS dokáží více či méně uživatele odstínit od těchto problémů:</p>

<ul>
  <li><b>Technická bariéra</b> – může být složitější pro netechnické uživatele</li>
  <li><b>Workflow</b> – editace vyžaduje commit a push proces</li>
  <li><b>Konflikty</b> – při současné editaci stejného souboru mohou vzniknout merge konflikty</li>
  <li><b>Omezené možnosti</b> – některé pokročilé CMS funkce mohou chybět</li>
</ul>

<h2 id="databazove-cms">Databásové CMS systémy</h2>

<p>Pro srovnání je dobré zmínit i tradiční CMS systémy, které ukládají obsah do databáze (např. WordPress).</p>

<h3 id="vyhody-databaze">Výhody DB CMS</h3>

<ul>
  <li><b>Real-time aktualisace</b> – změny jsou okamžitě viditelné bez nutnosti buildu</li>
  <li><b>Vyhledávání</b> – vyhledávání a filtrování ve velkém množství obsahu může být rychlejší</li>
  <li><b>Pokročilé funkce</b> – workflow management, role-based přístup</li>
  <li><b>Spolupráce</b> – souběžná editace více autorů bez risika konfliktů</li>
  <li><b>Složitější vazby</b> – SQL se víc hodí pro provázání různých entit mez sebou</li>
</ul>

<h3 id="nevýhody-databaze">Nevýhody DB CMS</h3>

<ul>
  <li><b>Provozní režie</b> – databáze musí běžet a být hostovaná</li>
  <li><b>Náklady</b> – vyšší hosting náklady, zejména při škálování</li>
  <li><b>Komplexita</b> – složitější nastavení a údržba</li>
  <li><b>Bezpečnost</b> – více potenciálních bezpečnostních rizik</li>
</ul>

<h3 id="kdy-volit">Kdy který přístup zvolit</h3>

<p><b>Databásové CMS</b> se hodí pro vysoký objem obsahu, časté aktualisace, komplexní workflow a více autorů. <b>Git-based CMS</b> jsou ideální pro menší weby, méně časté aktualisace, technické týmy a nízké náklady.</p>

<h2 id="případy- použití">Případy použití</h2>

<p>Git-based CMS se hodí zejména pro:</p>

<ul>
  <li><b>Dokumentaci</b> – technické dokumenty, API reference</li>
  <li><b>Blogy</b> – osobní nebo firemní blogy</li>
  <li><b>Portfolia</b> – umělecká nebo vývojářská portfolia</li>
  <li><b>Landing pages</b> – jednoduché marketingové stránky</li>
  <li><b>Firemní weby</b> – statické firemní stránky</li>
</ul>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>
    <a href="https://nitro.unjs.io/deploy">Nitro</a> – přehled hostingů
  </li>
  <li>
    <a href="https://fly.io">Fly.io</a>
  </li>
</ul>