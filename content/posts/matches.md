---
title: "Selektor :matches"
headline: "Selektor <code>:matches</code>"
description: "CSS pseudotřída <code>:matches</code> slouží ke zjednodušení zápisu dlouhých výčtů selektorů."
date: "2015-01-09"
last_modification: "2015-01-09"
status: 1
tags: ["css", "selektory-css"]
format: "html"
---

<h2 id="zapis">Zápis</h2>

<p>Pokud budeme například chtít mít <b>společný styl</b> pro <code>:hover</code> a <code>:focus</code> stavy odkazů v nějakém společném elementu, jde to napsat nějak takto:</p>

<pre><code>.spolecny a:hover, 
.spolecny a:focus {
  /* pravidla */
}</code></pre>






<p>Selektorem <code>:matches</code> jde tento zápis zpřehlednit bez nutnosti <i>se opakovat</i>.</p>

<pre><code>.spolecny a:matches(:hover, :focus) {
  /* pravidla */
}</code></pre>




<p>Tento selektor zachytí všechny odkazy v rodiči s třídou <code>spolecny</code>, které <i>vyhovují</i> pseudo-třídám <code>:hover</code> nebo <code>:focus</code>.</p>

<p>Dalším případem užití může být například stylování nadpisů v rámci <code>.obal</code>u.</p>

<pre><code>.obal h1,
.obal h2,
.obal h3 {
  /* pravidla */
}</code></pre>







<p>S použitím <code>:matches</code>:</p>

<pre><code>.obal :matches(h1, h2, h3) {
  /* pravidla */
}</code></pre>




<p>V rámci jednoho předpisu může být <code>:matches</code> použit i <b>vícekrát</b>. Tento kód se proto aplikuje na všechny <code>h1</code>, <code>h2</code> a <code>h3</code> v elementech <code>.obal</code> nebo <code>.jiny-obal</code>.</p>

<pre><code>:matches(.obal, .jiny-obal) :matches(h1, h2, h3) {
  /* pravidla */
}</code></pre>





<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Selektor <code>:matches</code> zatím není podporován, obdobně ale funguje selektor <code>:any</code> s <a href="/css-prefixy">CSS prefixy</a> s podporou trochu lepší:</p>

<ul>
  <li><code>:-webkit-any</code> – <b>Chrome 12+</b>, <b>Safari 5+</b>, <b>Opera 15+</b></li>
  <li><code>:-moz-any</code> – <b>Firefox 4+</b></li>
</ul>

<p><a href="https://kod.djpw.cz/sijb">Živá ukázka</a></p>

<p><b>Poznámka</b>: Selektory s prefixy není možné sdružovat, musí se duplikovat. Tohle proto <b>fungovat nebude</b>:</p>

<pre><code>a:-webkit-any(:hover, :focus)<b>,</b>
a:-moz-any(:hover, :focus) {
  /* nebude fungovat */
}</code></pre>







<h2 id="js">Matches v JavaScriptu</h2>

<p>V JavaScriptu obdobně slouží metoda <code>matchesSelector</code>. Zatím je podporovaná s prefixy, případně jde doplnit <a href="/queryselector"><code>querySelectorem</code></a>.</p>

<p><a href="https://kod.djpw.cz/tijb">Živá ukázka</a> s využitím <a href="/polyfill">polyfillu</a></p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>W3C: <a href="http://dev.w3.org/csswg/selectors-4/#matches">The Matches-any Pseudo-class</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:any"><code>:any</code></a></li>
  
  <li><a href="https://github.com/michelle/rework-matches">rework-matches</a> – polyfill selektoru <code>:matches</code></li>  
</ul>
