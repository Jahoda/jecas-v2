---
title: "Náhled URL"
headline: "Náhled URL"
description: "Jak získat obrázkový náhled a další informace pro libovolnou URL."
date: "2022-12-19"
last_modification: "2022-12-20"
status: 1
tags: ["hotova-reseni", "ziskavani-obsahu"]
format: "html"
---

<p>Zadává-li uživatel někam webovou adresu, může se pro zvýšení komfortu k adrese rovnou zobrazovat náhled. Textový či obrázkový.</p>


<p><img src="/files/nahled-url/nahled-url.png" alt="Náhled URL" class="border"></p>

<p>Jedna možnost je napsat si vlastní skript, který stáhne obsah dané URL a <i>něco</i> se z toho snažit vyparsovat.</p>

<p>Druhá možnost je použít nějaké hotové řešení:</p>







<h2 id="titulek">Titulek stránky</h2>

<p>Pro získání textového názvu stránky, jde použít minislužbu <a href="https://github.com/plibither8/url-title-api">url-title-api</a>.</p>

<p>Použití je triviální, stačí zadat URL za lomítko:</p>

<pre><code>https://title.mihir.ch/<b>https://jecas.cz</b></code></pre>

<p>Výstupem bude textový obsah:</p>

<pre><code>Je čas.cz – moderní tvorba webových stránek</code></pre>









<h2 id="favicona">Favicona</h2>

<p>Pro získání obrázku ikony webu (tzv. <a href="/favicon">favicony</a>) jde použít službu od Google:</p>

<pre><code>https://t3.gstatic.com/faviconV2?client=SOCIAL&amp;type=FAVICON&amp;fallback_opts=TYPE,SIZE,URL&amp;size=64&amp;url=<b>http://jecas.cz</b></code></pre>

<p>Výstup:</p>

<div class="live">
  <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=64&url=http://jecas.cz" alt="">
</div>







<h2 id="logo">Logo stránky</h2>

<p>Další zajímavá služba je <a href="https://clearbit.com/blog/logo">Clearbit Logo API
</a>.</p>

<p>Použití je následovné:</p>

<pre><code>https://logo.clearbit.com/<b>jecas.cz</b>?size=64</code></pre>

<p>Podle popisu získává logo z různých zdrojů (Twitter, Facebook, Wikipedie nebo <code>&lt;meta></code> značek).</p>

<p>Výsledek:</p>

<div class="live">
<img src="https://logo.clearbit.com/jecas.cz?size=64" alt="">
</div>











<h2 id="peekalink">Peekalink</h2>

<p><img src="/files/nahled-url/peekalink.png" alt="Peekalink" class="border"></p>

<p><a href="https://www.peekalink.io">Peekalink</a> už vyžaduje registraci a je potřeba implementovat přes vlastní backend, který se ověřuje přes API klíč.</p>

<p>Do určitého počtu požadavků (100 za hodinu) je zdarma.</p>

<p>Výstupem je JSON typu:</p>

<pre><code>{
  "url": "https://jecas.cz/",
  "domain": "jecas.cz",
  "lastUpdated": "2022-12-19T18:14:58.794822Z",
  "nextUpdate": "2022-12-20T18:14:58.781606Z",
  "contentType": "html",
  "mimeType": "text/html",
  "redirected": false,
  "title": "Je čas.cz – moderní tvorba webových stránek",
  "description": "Poznámky o moderním webdesignu, hotová řešení, experimenty a návody.",
  "name": "JECAS.CZ",
  "trackersDetected": false,
  "icon": {
    "url": "https://cdn.peekalink.io/public/images/57bdea21-83eb-4697-a8a9-d3ca43f9f7ed/554822e9-3c01-45b1-81e6-de97d044f586.jpg",
    "width": 57,
    "height": 57
  },
  "image": {
    "url": "https://cdn.peekalink.io/public/images/41d61f08-e2cc-4b08-9553-19a5d32bd2e3/e086e043-c69d-4ebe-b502-1bb386ca9b1c.jpg",
    "width": 200,
    "height": 200
  }
}</code></pre>