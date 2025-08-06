---
title: "Fit-content"
headline: "Fit-content"
description: "CSS vlastnost <code>fit-content</code> nastaví šířku podle obsahu."
date: "2015-01-15"
last_modification: "2015-01-25"
status: 1
tags: ["css", "menu", "napady"]
format: "html"
---

<p>Výchozí chování blokových elementů (<code>display: block</code>) je snaha se <b>roztáhnout přes celou šířku</b>.</p>

<div class="live">
  <style>
    .div {
      background: #0D6AB7; 
      color: #fff;
      padding: 1em;
    }
  </style>
  <div class="div">obsah</div>
</div>

<p>Takový postup vůbec neřeší, jak je široký obsah. Pomocí <code>fit-content</code> se dá nastavit šířka (<code>width</code>), aby respektovala šířku obsahu:</p>

<pre><code>element {
  width: fit-content;
}</code></pre>

<div class="live">
  <style>
    .fit-content {
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
    }
  </style>
  <div class="div fit-content">obsah</div>
</div>

<p><a href="https://kod.djpw.cz/svjb">Živá ukázka</a> – centrování menu s neznámou šířkou pomocí <code>fit-content</code></p>


<h2 id="podpora">Podpora</h2>

<p>Ve <b>Firefoxu</b> a <b>Webkitech</b> funguje s <a href="/css-prefixy">prefixy</a>:</p>

<pre><code>element {
  width: <b>-webkit-</b>fit-content;
  width: <b>-moz-</b>fit-content;
  width: fit-content;
}</code></pre>

<p>Podpora v jednotlivých versích prohlížečů:</p>

<ul>
  <li><b>Firefox 4+</b>,</li>
  <li><b>Chrome 22+</b>,</li>
  <li><b>Safar 6.1+</b>,</li>
  <li><b>Opera 15+</b></li>
</ul>

<p><b>Webkit</b> podporuje ještě alternativní zápis:</p>

<pre><code>element {
  width: <b>intrinsic</b>;
}</code></pre>

<p><a href="https://kod.djpw.cz/rvjb">Živá ukázka</a></p>

<p>Pro prohlížeče nepodporující <code>fit-content</code> existují následující možnosti.</p>



<h2 id="inline-block"><code>display: inline-block</code></h2>

<p>Přizpůsobit rozměry obsahu jde například pomocí <code>display: inline-block</code>:</p>

<div class="live">
  <style>
    .inline-block {
      display: inline-block;
    }
  </style>
  <div class="div inline-block">obsah</div>
</div>

<p>V případě, že je cílem takový obsah <a href="/centrovani">vycentrovat</a>, jde použít prosté <code>text-align: center</code> pro rodiče.</p>

<p><a href="https://kod.djpw.cz/ovjb">Živá ukázka</a></p>

<p>Problém řešení s <code>inline-block</code> mohou být <a href="/inline-block-whitespace">bílé znaky</a>.</p>

<h2 id="display-table"><code>display: table</code></h2>

<p>Obdobně jako <code>width: fit-content</code> zafunguje i <code>display: table</code>.</p>

<p><a href="https://kod.djpw.cz/pvjb">Živá ukázka</a></p>

