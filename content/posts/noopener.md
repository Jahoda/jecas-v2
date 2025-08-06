---
title: "Rel=noopener"
headline: "Rel=noopener"
description: "Atribut <code>noopener</code> dokáže zabránit manipulaci ze stránky otevřené do nového okna."
date: "2016-03-17"
last_modification: "2016-05-16"
status: 1
tags: ["html", "html-atributy", "odkazy", "zabezpeceni"]
format: "html"
---

<p>HTML <a href="/odkaz">odkazy</a> obsahující otevření do nového okna pomocí <code>target="_blank"</code> s sebou nesou jisté bezpečnostní risiko.</p>

<p>Stránka, která byla do nového okna otevřena, <b>může manipulovat s adresou stránky</b>, která ji otevřela.</p>

<p>Po návratu z následující stránky otevřené do nového okna se to této stránky přidá <code>#hash</code> do URL:</p>

<div class="live">
  <p><a href="https://kod.djpw.cz/mxxb-" target="_blank">Odkaz na testovací stránku</a></p>
</div>





<p>Vše zajistí jednoduchý JS kód:</p>

<pre><code>opener.location = 'http://jecas.cz/noopener#hash';</code></pre>




<div id="hash">
  <div class="soft">
    Povedlo se změnit URL.
  </div>
</div>
<style>
#hash {display: none}
#hash:target {display: block}</style>



<h2 id="zneuziti">Zneužití</h2>

<p>Zneužít toto chování jde třeba pro phishing, kdy bude uživatel přesměrován na podvodnou stránkou za cílem získat hesla.</p>

<p>Využít změnu adresy se může hodit i pro zobrazení reklamy při kliknutí na odkaz.</p>





<h2 id="blank">Jen <code>target=_blank</code>?</h2>

<p>Problém se netýká jen odkazů otevíraných automaticky do nového okna díky atributu <code>target</code>. Změna <code>opener.location</code> se projeví i v případě, že si nové okno otevře uživatel sám.</p>





<h2 id="reseni">Řešení</h2>

<p>V podporovaných prohlížečích (<b>Chrome 49+</b>, <b>Opera 36+</b>) by mělo jít zakázat změnu adresy pomocí atributu <code>rel</code> a hodnoty <code>noopener</code>:</p>

<pre><code>&lt;a href="http://example.com" rel="noopener"></code></pre>










<p>Test:</p>



<div class="live">
  <p><a href="https://kod.djpw.cz/oxxb-" target="_blank" rel="noopener">Odkaz na testovací stránku</a></p>
</div>


<div id="hash-noopener">
  <div class="soft">
    Povedlo se změnit URL.
  </div>
</div>
<style>
#hash-noopener {display: none}
#hash-noopener:target {display: block}</style>

<p>Podle mých testů ale blokování nefunguje ani v <b>Chrome 50</b> a <code>hash</code> se změní.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://medium.com/@jitbit/target-blank-the-most-underestimated-vulnerability-ever-96e328301f4c#.25ll0gfzh">Target=”_blank” — the most underestimated vulnerability ever</a></li>
  <li><a href="https://mathiasbynens.github.io/rel-noopener/">About rel=noopener
What problems does it solve?</a></li>
  <li>Specifikace: <a href="https://html.spec.whatwg.org/multipage/semantics.html#link-type-noopener">Link type "<code>noopener</code>"</a></li>
</ul>