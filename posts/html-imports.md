---
title: "HTML Imports"
headline: "HTML Imports"
description: "HTML importy umožňují připojit/vložit do stránky jiný HTML dokument."
date: "2013-11-17"
last_modification: "2013-11-27"
status: 1
tags: ["html", "napady"]
format: "html"
---

<ul>
  <li><b>CSS</b> soubor je možné připojit přes: <code>&lt;link href="styl.css" type="text/css" rel="stylesheet"></code></li>
  <li><b>JavaScriptový</b> soubor připojí zase: <code>&lt;script src="skript.js">&lt;/script></code></li> 
  <li>A připojit <b>obrázek</b> lze přes: <code>&lt;img src="obrazek.jpg"></code></li>   
</ul>

<p><b>HTML importy</b> umožňují obdobným způsobem vložit z jedné HTML stránky <b>jinou HTML stránku</b>.</p>
<pre><code>&lt;link rel="<b>import</b>" href="importovana-stranka.html"></code></pre>

<p>Hezké je, že takto vložená stránka se <i>vloží</i> se vším všudy, tedy se načtou i skripty, styly nebo obrázky v <b>importované stránce</b> připojené. Zároveň je zajištěno, že se každý takový <i>objekt</i> <b>načte jen jednou</b>, i když se bude připojovat vícekrát.</p>

<h2 id="podpora">Podpora</h2>
<p>Importování HTML souborů zatím funguje <b>jen v Chromu</b> po povolení <b>Enable HTML Imports</b> v <code>about:flags</code>. Testovat <b>podporu</b> HTML Imports může následující kód.</p>
<pre><code>if ('import' in document.createElement('link')) {
  // HTML import funguje
}</code></pre>

<h2 id="vyuziti">Využití</h2>
<p>Dobrá podpora této funkce napříč <a href="/prohlizece">prohlížeči</a> by mohla výrazně <b>zpříjemnit</b> začleňování <b>cizích hotových řešení</b> do vlastní aplikace. Různé <b>frameworky</b> sestávají běžně z několika JS a CSS souborů, které se musí při<code>&lt;link&gt;</code>ovat nebo při<code>&lt;script src></code>ovat. Řešení s <code>&lt;link rel=import></code> by toto <b>elegantně řešilo</b>.</p>
<pre><code>&lt;link rel="import" href="<b>framework.html</b>"></code></pre>
<p>Připojovat lze podobně jako u <a href="/ajax">AJAX</a>u jen <b>obsah ze stejné domény</b> nebo přes <a href="http://en.wikipedia.org/wiki/Cross-origin_resource_sharing">Cross-origin resource sharing</a>.</p>

<h2 id="pouziti">Použití</h2>
<p>Import <b>ne</b>funguje jako běžné <code>include</code> <a href="/include">známé z PHP</a> — tedy neznamená to vypsat obsah importované stránky v místě použití <code>&lt;link rel=import></code>, ale jen dá vědět prohlížeči, <b>že si má daný obsah připravit</b> (skripty, styly, obrázky atd. načíst; z HTML vytvořit DOM). Výhodné chování je, že <code>import</code>em připojené skripty <b>neblokují další načítání</b>.</p>

<p>Obsah z připojeného HTML souboru <b>získáme pomocí JS následovně</b>:</p>
<pre><code>var link = document.querySelector('link[rel="import"]');
var obsah = link.<b>import</b>;</code></pre>

<p>Když máme obsah, stačí ho běžným způsobem <b>naklonovat do dokumentu</b>:</p>
<pre><code>document.body.appendChild(obsah.cloneNode(true));</code></pre>

<p>Nad obsahem z <code>link.import</code> lze provádět standardní metody DOMu typu <code>getElementById</code>.</p>

<h2 id="skriptovani">JS v importovaném souboru</h2>
<p>JS kód v souboru, který je importován, se na rozdíl od HTML nebo CSS projeví rovnou, tj. je <b>proveden ihned</b> po načtení.</p>
<p>Při skriptování je potom:</p>
<ol>
  <li><i>nadřazený</i> dokument (ze kterého se import volá) dostupný přes <code>document</code>,</li>
  <li>obsah importovaného přes <code>document.currentScript.ownerDocument</code>.</li>
</ol>

<h2 id="odkazy">Odkazy</h2>
<ul>
  <li>W3C: <a href="http://www.w3.org/TR/2013/WD-html-imports-20130514/">Specifikace HTML Imports</a></li>
  <li>HTML5 Rocks: <a href="http://www.html5rocks.com/en/tutorials/webcomponents/imports/">HTML Imports
#include for the web</a></li>
</ul>