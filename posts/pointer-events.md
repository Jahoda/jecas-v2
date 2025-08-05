---
title: "CSS pointer-events"
headline: "CSS <code>pointer-events</code>"
description: "Vlastnost <code>pointer-events</code> umožňuje zrušit reakci na události vyvolané myší."
date: "2013-11-29"
last_modification: "2013-12-05"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>V některých situacích, například při <b>rolování po stránce</b>, může být zbytečné, aby se u všech elementů, co mají efekt po najetí myši, na ten zlomek sekundy, kdy kursor bude nad elementem, <code>:hover</code> vyvolával.</p>

<p>CSS vlastnost <code>pointer-events</code> může toto chování zablokovat. Kromě <b>CSS události</b> umí blokovat i události v JavaScriptu (<code>onclick</code>, <code>onmouseover</code> apod.). Bohaté využití má u <a href="/svg"><b>SVG</b></a>, kde funguje od <b>IE 9</b>. U HTML obsahu je podpora mimo starou <b>Operu 12</b> až od <b><a href="/ie11">IE 11</a></b>.</p>

<div class="live">
  <style>
    .pointer-events:hover {color: #DA3F94}
    .pointer-events-none {pointer-events: none}
  </style>
  <p onclick='alert("Baf")' class='pointer-events'>Odstavec má barevný <code>:hover</code> a při <code>onclick</code>u zobrazí JS hlášku.</p>
  <p onclick='alert("Baf")' class='pointer-events pointer-events-none'>Stejný odstavec, ale nastavení <code>pointer-events: none</code> by tuto <i>parádu</i> mělo zrušit.</p>  
</div>

<p><b>Poznámka</b>: správně řečeno nejde o blokování událostí myši, ale obecně <i>ukazatele</i>.</p>




<h2 id="hodnoty">Hodnoty</h2>

<dl>
  <dt id="auto"><code>auto</code></dt>
  <p>Výchozí hodnota. Jako by se nic nenastavilo.</p>
  
  <dt id="none"><code>none</code></dt>
  <dd>Události vyvolané ukazatelem se neprojeví.</dd>
  
  <dt id="svg">SVG</dt>
  <dd>Pro SVG existuje <a href="http://www.w3.org/TR/SVG11/interact.html#PointerEventsProperty">dalších 7 hodnot</a>.</dd>
</dl>







<h2 id="vyuziti">Využití</h2>
<p>S <code>pointer-events: none</code> se dá třeba zablokovat odkaz, tlačítko nebo <a href="http://www.thecssninja.com/javascript/pointer-events-60fps">zrychlit rolování stránky</a> (i když u toho je otázka, zda by takové chování neměl zajišťovat přímo prohlížeč).</p>
