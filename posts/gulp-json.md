---
title: "Předávání a čtení dat z package.json v gulpfile.js"
headline: "Čtení dat z <code>package.json</code> v <code>gulpfile.js</code>"
description: "Jak do Gulpu předávat konfiguraci například z <code>package.json</code>."
date: "2019-04-08"
last_modification: "2019-04-08"
status: 0
tags: []
format: "html"
---

<p>Při používání <a href="/preprocesory">preprocesoru</a> <a href="/gulp-4">Gulp</a> se občas hodí do JS souboru s jednotlivými <i>tasky</i> (<code>gulpfile.js</code>) předávat nějakou konfiguraci.</p>

<p>Například zdrojové soubory, ze kterých se má sestavit výsledné CSS/JS.</p>

<p>Pro <b>přehlednost</b> může být užitečné nastavení <b>vyčlenit do samostatného souboru</b>. Nebo použít <code>package.json</code>:</p>

<p>Jak ale tato data předat?</p>

<h2><code>package.json</code></h2>

<p>V <code>package.json</code> se vytvoří nový klíč, např. <code>assets</code>.</p>

<pre><code>…,
"assets": {
  "js" : [
    "node_modules/focus-visible/dist/focus-visible.min.js",
    "node_modules/vanilla-lazyload/dist/lazyload.min.js",
    "www/assets/js/main.js"
  ],
  "css" : [
    "www/assets/scss/main.scss"
  ]
}</code></pre>


























<h2><code>gulpfile.js</code></h2>

<p>Pro přečtení jde použít třeba balíček <code>fs</code>:</p>

<ol>
  <li>
    <p>Nainstaluje se následovně:</p>
    
    <pre><code>npm install fs --save-dev</code></pre>
  </li>
  
  <li>
    <p>Potom se připojí:</p>
    <pre><code>import fs from 'fs';</code></pre>
  </li>
  
  
  
  
  
  
  
  
  <li>
    <p>Obsah <code>package.json</code> se zparsuje a přiřadí do konstanty:</p>
    
    <pre><code>const packageJson = JSON.parse(fs.readFileSync('./package.json'));</code></pre>
  </li>
  
  
  
  
  
  <li>
    <p>Nyní je v <code>packageJson.assets.js</code> pole všech použitých JS (viz výše) a soubory jsou připravené k dalšímu zpracování Gulpem (spojení, minifikace apod.).
    </p>
    
    <pre><code>return gulp.src(packageJson.assets.js).pipe(…)</code></pre>
  </li>
</ol>

