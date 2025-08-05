---
title: "Posun obsahu v CSS"
headline: "Posunutí obsahu v CSS"
description: "Jak posunout jakýkoliv element někam jinam."
date: "2015-05-13"
last_modification: "2015-05-14"
status: 1
tags: ["css", "hotova-reseni", "napady"]
format: "html"
---

<p>V CSS existuje řada možností jak něco někam posunout.</p>

<p><img src="/files/posunuti/posun.png" alt="Posunutí obsahu pomocí CSS" class="border"></p>


















<h2 id="margin">Margin</h2>

<pre><code>.posunuty {
  margin-top: 1em;
}</code></pre>

<p>Asi nejčastější způsob, jak se elementy odsouvají, je využití vlastnosti <a href="/margin"><code>margin</code></a>.</p>

<div class="live">
  Obsah
  
  <div style="margin-top: 3em">Odsunutý obsah</div>
</div>


<p>Hodnota <code>margin</code>u může být i záporná, čímž se dají různé elementy <b>dostat přes sebe</b>.</p>

<div class="live">
  Obsah
  
  <div style="margin-top: -1.5em">Odsunutý obsah překrývá jiný element</div>  
</div>

<p>V kombinaci s <code>padding</code>em jde toto chování šikovně využít třeba pro <b>zvětšování klikacích ploch</b>, kdy se hodnota <code>padding</code>u odečte.</p>

<div class="live">
  Text <span style="padding: .3em; margin: -.3em; background: #fff">jakože tlačítko</span> text
</div>

<p>Při používání <code>margin</code>u může být problém, že se jeho hodnoty <a href="/margin#spojovani">slučují</a>.</p>






<h2 id="position-relative">Relativní posicování</h2>

<pre><code>.posunuty {
  position: relative;
  top: 1em;
}</code></pre>




<p>Rozdíl <a href="/position#relative">relativního posicování</a> od <code>margin</code>u je hlavně v tom, že element s <code>position: relative</code> stále zabírá prostor na původním umístění.</p>

<div class="live">
  Obsah
  <span style="position: relative; top: .5em; left: .4em">posunutý</span>
  relativním posicováním
</div>


<h2 id="transform">Transformace <code>translate</code></h2>

<pre><code>.posunuty {
  transform: translate(.5em, .4em);
}</code></pre>




<p>Pro zvýšení rychlosti zejména animací byla zavedena CSS vlastnost <code>transform</code>. Prohlížeče dokáží elementy s transformací lépe optimalisovat. Hlavně díky tomu, že transformace <b>neovlivňuje své okolí</b>. Nefunguje ale v <b>IE 8</b>.</p>

<div class="live">
  <style>
    .posun-transformace {
      display: inline-block;
      -webkit-transform: translate(.5em, .4em);
      -moz-transform: translate(.5em, .4em);
      -ms-transform: translate(.5em, .4em);
      transform: translate(.5em, .4em);
    }
  </style>
  Obsah
  <span class="posun-transformace">posunutý</span>
  transformací translate
</div>



<h2 id="position-absolute">Absolutní posicování</h2>

<p>Posunu jde docílit i posicováním absolutním. Specifikum této techniky je, že absolutně posicovaný element <b>nebude zabírat místo</b>. Stejně tak se chová i <code>position: fixed</code>, jen je obsah navíc fixovaný na stránce.</p>

<div class="live">
  <div style="position: relative">
  Obsah
    <span style="position: absolute; top: .7em; left: .4em">posunutý</span>
    absolutním posicováním    
  </div>
</div>


<h2 id="padding">Padding</h2>

<p>Pro posunutí jde použít i <code>padding</code>. Jelikož je <code>padding</code> součástí vnitřku elementu, hodí se spíš při použití pro rodičovský element.</p>

<div class="live">
  <style>
    .padding-obal {
        padding: 4em 1em;
    }
    .padding-obsah {
      background: #efefef;
    }
  </style>
  <div class="padding-obal">
    <div class="padding-obsah">Obsah odsazený <code>padding</code>em rodičovského elementu.</div>
  </div>  
</div>

<p>Výhoda v užívání <code>padding</code>u před <code>margin</code>em je v tom, že se dokáže díky <a href="/box-sizing#border-box">okrajovému box-modelu</a> (<code>box-sizing: border-box</code>) započítávat do výšky/šířky.</p>


<h2 id="border">Rámeček <code>border</code></h2>

<p>Jedná se spíš o zřídka využitelnou metodu, ale hodí se v situacích, kdy se <code>margin</code> nemá od čeho <i>odrazit</i>. To se může stát u elementu s <code>clear: both</code>, co je za něčím <a href="/float">obtékaným</a>.</p>

<div class="live">
  <div style="float: left; background: #efefef; height: 150px; width: 100px">Plovoucí obsah</div>
  <div style="clear: both; margin-top: 5em">Obsah s clear, kde se margin neprojeví.</div>
</div>








<p>Jde to obejít mimo jiné právě nastavením průhledného rámečku.</p>

<div class="live">
  <div style="float: left; background: #efefef; height: 150px; width: 100px">Plovoucí obsah</div>
  <div style="clear: both; border-top: 5em solid transparent">Obsah s clear, odsunutý rámečkem.</div>
</div>
















<h2 id="stin">Stín</h2>

<p>Trochu kuriosní způsob je využití stínu – CSS vlastnost <a href="/text-shadow"><code>text-shadow</code></a>. Stínem textu bez rozmazání jde v podstatě vytvořit kopii původního obsahu a kamkoliv ji přesunout.</p>

<div class="live">
  <div style="text-shadow: 20px -18px 0 #ff0000;">Červená podoba tohoto textu je stín.</div>
</div>

<p>Stínů může být víc, čehož využívá:</p>

<div class="internal-content">
  <ul>
    <li><a href="/hover-efekty-text-shadow">Hover efekty s <code>text-shadow</code></a> – zajímavé hover efekty využívající stín textu</li>
  </ul>
</div>

<p>Nevýhoda je, že stín nejde označit kursorem myši a funguje až v <b>IE 10</b>.</p>