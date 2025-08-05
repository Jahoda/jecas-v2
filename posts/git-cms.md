---
title: "CMS založené na Gitu"
headline: "CMS založené na Gitu"
description: "K čemu jsou dobré redakční systémy postavené na Gitu."
date: "2023-01-29"
last_modification: "2023-01-29"
status: 0
tags: []
format: "html"
---

<p>Pro správu obsahu se často hodí mít tzv. redakční systém (CMS = <i lang="en">content management system</i>).</p>

<p>Otázka je, kam redakční systém ukládá data.</p>

<p>Například v roce 2023 stále nejrozšířenější <a href="/wordpress">WordPress</a> ukládá data do <b>SQL database</b>.</p>

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

<p>A mnoho <a href="https://jamstack.org/generators/">dalších</a>.</p>





<h2 id="md">Markdown</h2>

<p><a href="/markdown">Markdown</a> nabízí způsob, jak v obyčejném textu používat strojově pochopitelné formátování. Místo HTML značek se používají lidsky intuitivnější symboly:</p>

<pre><code># Nadpis
Odstavec s **tučným** a *šikmým textem*
1. číslovaný seznam
2. s několika
2. položkami</code></pre>











<p>Pro Markdown existuje hromada nástrojů, pluginů a editorů a pomalu se rozšiřuje i mimo programátory.</p>


<h2 id="git">Git</h2>

<p>Git je nástroj pro versování zdrojových kódů. Nad Gitem jsou navíc postavené online služby pro jeho nahrávání na internet.</p>

<p>Nejpoužívanější je <a href="https://github.com">GitHub</a> a <a href="https://about.gitlab.com">GitLab</a>.</p>







<h2 id="hosting">Hosting s podporou Gitu</h2>

<p>Existuje mnoho služeb, které se na pár kliknutí dokáží napojit na Git repositář na GitHubu nebo GitLabu a jeho obsah automaticky deployovat (vystavit na veřejnou URL).</p>

<ul>
  <li><a href="https://www.netlify.com">Netlify</a></li>
  <li><a href="https://vercel.com/">Vercel</a></li>
  <li><a href="https://pages.github.com">GitHub Pages</a></li>
  <li><a href="https://pages.cloudflare.com">Cloudflare Pages</a></li>
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


<h3 id="netlify-cms">Netlify CMS</h3>

<p><a href="https://www.netlifycms.org">Netlify CMS</a> je open-source redakční systém.</p>

<p>Není nutné ho používat jen na Netlify.</p>

<p><img src="/files/git-cms/netlify-cms.png" alt="Netlify CMS" class="border"></p>



























<h3 id="prose">Prose.io</h3>

<p><a href="https://prose.io">Prose</a> dokáže po připojení GitHub repositáře upravovat libovolné soubory. Pro soubory v Markdownu nabízí přehledný editor i s možností uploadu souborů.</p>

<p><img src="/files/git-cms/prose.png" alt="Prose" class="border"></p>

























<h3 id="tina">Tina</h3>

<p><a href="https://tina.io">Tina</a> (dříve <a href="https://forestry.io">Forestry</a>)</p>


<h3 id="github">GitHub Pages</h3>

<p>GitHub Pages dokáží generovat statické stránky přes <a href="https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll">Jekyll</a></p>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>
    <a href="https://nitro.unjs.io/deploy">Nitro</a> – přehled hostingů
  </li>
  <li>
    <a href="https://fly.io">Fly.io</a>
  </li>
  <li><a href="https://supabase.com">Supabase</a></li>
  <li><a href="https://planetscale.com">PlanetScale</a> – serverless MySQL</li>
</ul>