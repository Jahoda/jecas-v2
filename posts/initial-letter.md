---
title: "CSS initial-letter"
headline: "CSS initial-letter"
description: "Vlastnost <code>initial-letter</code> slouží k vytvoření prvního písmena přes více řádek."
date: "2014-12-10"
last_modification: "2014-12-10"
status: 0
tags: []
format: "html"
---

<p>Pro ozvláštnění textu může být někdy žádoucí začít text stránky <b>písmenem přes několik řádek</b>. Při řešení pomocí bez <code>initial-letter</code> je poměrně složité se dopočítat k potřebné velikosti počátečního písmena, aby <b>ladilo</b> s běžnými řádky.</p>

<p>Jako hodnoty pro <code>initial-letter</code> se udává počet řádků.</p>

<pre><code>p::first-letter {
  initial-letter: 3;
}</code></pre>

<p>Výše uvedený kód tedy vytvoří <a href="/first-letter">první písmeno</a> přes <code>3</code> řádky.</p>

<p><img src="/files/initial-letter/3-radky.png" alt="První písmeno přes 3 řádky" class="border"></p>










<p>Dá se přidat ještě <b>druhý parametr</b>, který upraví počet řádků nacházejících se vedle počátečního písmena.</p>

<pre><code>p::first-letter {
  initial-letter: 3 <b>2</b>;
}</code></pre>

<p><img src="/files/initial-letter/2-radky.png" alt="První písmeno velké jako 3 řádky" class="border"></p>





<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>W3C: <a href="http://dev.w3.org/csswg/css-inline/#sizing-drop-initials">An Introduction to Initial Letters</a></li>
  
  <li><a href="http://demosthenes.info/blog/961/Big-Beautiful-DropCaps-with-CSS-initial-letter">Big, Beautiful Dropcaps with CSS initial-letter</a></li>
</ul>