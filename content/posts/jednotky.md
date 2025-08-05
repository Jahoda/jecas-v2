---
title: "CSS jednotky"
headline: "Délkové jednotky"
description: "Jaké existují v CSS jednotky pro udávání rozměrů. Které z nich používat."
date: "2014-11-17"
last_modification: "2014-11-17"
status: 0
tags: []
format: "html"
---

<p>Pro stanovení šířky, výšky, tloušťky (rámečku), odsazení (<a href="/margin"><code>margin</code></a>/<code>padding</code>), umístění, velikosti (písma) a další věci se používají <b>délkové jednotky</b>. V CSS jich je celá řada.</p>



<h2 id="procenta">Procenta</h2>

<p>Procenta jde používat skoro vždycky. Výjimkou je například <b>tloušťka rámečku</b> (<code>border-width</code>) nebo <code>outline</code>. Záludné na jejich používání je, že si je třeba uvědomit <b>z čeho se počítají</b>.</p>

<pre><code>.priklad {
  width: 50%;
  font-size: 120%;
  margin: 1%;
  padding: 1%;
}</code></pre>








<h3 id="rozmery">Rozměry boxu</h3>

<p>Často se rozměr v procentech počítá z <b>šířky nadřazeného elementu</b>.</p>


<div class="live">
  <div style="width: 200px; height: 100px; background: #DA3F94;">
    <div style="width: 50%; height: 50%; background: #1081DD; color: #fff; text-align: center">50% × 50%</div>
  </div>
</div>

<p>Pokud bude mít rodič šířku 200 pixelů, jeho potomek o šířce 50 % bude mít 100 pixelů. Při nastavování výšky to funguje analogicky.</p>


<div class="internal-content">
  <ul>
    <li><a href="/box-model">Box model</a> může ovlivňovat výslednou šířku nebo výšku</li>
  </ul>
</div>

<p>Možná trochu <b>nečekané chování</b> nastane při počítání <code>margin</code>u nebo <code>padding</code>u – ty se totiž počítají <b>vždy z šířky</b>, takže i horní/spodní procentuální <code>margin</code>/<code>padding</code> bude odvozen od šířky.</p>

<div class="live">
  <div style="width: 200px; background: #DA3F94;">
    <div style="width: 50%; height: 0; padding-top: 50%; background: #1081DD;"></div>
  </div>
</div>

<p>Modrý prvek má <code>height: 0; padding-top: 50%</code>, což při výchozím obsahovém box-modelu způsobí, že bude vysoký jako polovina (50 %) šířky svého rodiče.</p>

<div class="internal-content">
  <ul>
    <li><a href="/vyska-podle-sirky">Výška závislá na šířce</a> – využívá nulové výšky a <code>padding</code>u podle šířky</li>
  </ul>
</div>



<h3 id="posicovani">Posicování</h3>

<p>Při <b>absolutním</b> <a href="/position">posicování</a> se hodnoty pro <code>left</code>/<code>right</code> a <code>top</code>/<code>bottom</code> počítají z šířky/výšky nejbližšího nadřazeného elementu s nestatickou posicí (<code>position: relative</code>/<code>absolute</code>/<code>fixed</code>), případně z šířky okna.</p>

<p><a href="http://kod.djpw.cz/kojb">Živá ukázka</a></p>

<p><b>Relativně</b> posicovaný element počítá běžně rozměry z šířky/výšky rodiče.</p>

<p><b>Fixní</b> element je vždy posicovaný vůči oknu.</p>


<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/elnb">Odsazení v procentech</a></li>
  </ul>
</div>



<h2 id="relativni-absolutni">Relativní, nebo absolutní?</h2>

<p>Někdy se jednotky dělí na <b>absolutní a relativní</b>. Dělení je to trochu komplikované, protože svým způsobem je všechno relativní. I při použití pixelů se může změnit velikost textu přes nastavení v prohlížeči. Dnešní prohlížeče sice zpravidla používají primárně <b>zvětšení celé stránky</b>, ale většinou jde i měnit velikost písma nezávisle na zbytku stránky.</p>

<p>Případně zvětšit velikost přímo v systému. Příklad ve Windows 7.</p>

<p><img src="/files/jednotky/velikost.gif" alt="Změna velikosti ve Windows" class="border"></p>
























<h2 id="rem-em">Rem, nebo em?</h2>

<ul>
  <li><a href="http://zellwk.com/blog/rem-vs-em/">REM vs EM – The Great Debate</a></li>
</ul>








<ul>
  <li>DevDocs: <a href="http://devdocs.io/css/length">&lt;length></a></li>
  
  <li><a href="http://webdesign.tutsplus.com/articles/7-css-units-you-might-not-know-about--cms-22573">7 CSS Units You Might Not Know About</a></li>
  
  <li><a href="http://webdesign.tutsplus.com/tutorials/instant-fluid-videos-with-viewport-width-units--cms-22845">Instant Fluid Videos with Viewport Width Units</a></li>
  
  <li><a href="http://demosthenes.info/blog/980/CSS-Units-Angles-Time-and-Frequency">CSS Units: Angles, Time and Frequency</a></li>
  
  <li><a href="http://katydecorah.com/css-ruler/">CSS Ruler</a> – živý výsledek nastavení velikosti písma</li>
</ul>


<h2 id="viewport">Viewport</h2>

<ul>
  <li><a href="http://bitsofco.de/2015/viewport-vs-percentage-units/">Viewport vs Percentage Units</a></li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/look-at-length-units-in-css/">A Look at Length Units in CSS</a></li>
</ul>