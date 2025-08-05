---
title: "Plynulé skrytí elementu"
headline: "Animované skrytí obsahu"
description: "Pomocí CSS <a href=\"/transition\"><code>transition</code></a> je možné <a href=\"/zobrazit-skryt\">skrývání a odkrývání textu</a> plynule <a href=\"/animace\">animovat</a> (od IE 10)."
date: "2013-09-14"
last_modification: "2013-09-17"
status: 1
tags: ["css", "hotova-reseni", "js", "prepinani-vzhledu", "webove-animace"]
format: "html"
---

<p>Vymyslet se dají různé efekty jako zprůhlednění, snížení výšky na nulu, odlet a podobně.</p>

<script>
function prohodit(element, trida) {
	element.className = element.className == trida ? "" : trida;
}
</script>

<h2 id="zmenseni">Zmenšení výšky nebo šířky</h2>
<h3>Zmenšení výšky</h3>
<p>Pokud známe výšku elementu (např. <code>100px</code>), stačí animovat z <code>height: 100px</code> na <code>height: 0</code>.</p>
<p>Když má element <code>padding</code>, <code>margin</code> nebo <code>border</code>, je vhodné vynulovat i tyto vlastnosti.</p>
<p>Pro <b>čistě CSS</b> zmenšovací animaci elementu s <b>neznámými rozměry</b> je možné použít místo <code>width</code> či <code>height</code> jejich <code>max-*</code> varianty:</p>
<ol>
  <li>pro zmenšení <b>výšky</b> na nulu použít <code>max-height</code>,</li>
  <li>pro zmenšení <b>šířky</b> na nulu použít <code>max-width</code></li>
</ol>
<p>Velikost <code>max-width/height</code> ve stavu viditelném se nastaví na vyšší hodnotu, než je skutečná očekávaná výška, ideálně, aby byla větší co nejméně, jinak nebude významnou část doby běhu animace viditelný výsledek.</p>

<img src="/files/animace-skryt/max-height.png" alt="height vs. max-height u animace" class="border">

<p>Když se <code>max-height</code> <i>přežene</i>, animace mezi <code>100px</code> a <code>180px</code> nebude nijak pozorovatelná.</p>

<pre><code>element {max-height: 2em; transition: max-height 1s}
element.skryt {max-height: 0}
</code></pre>

<div class="live zmenseni">
  <div class=nezmenseny>
  <style>
    .zmenseni p.zmensit {max-height: 2em; overflow: hidden; transition: max-height 1s}
    .zmenseny p.zmensit {max-height: 0}
  </style>
  <button onclick="prohodit(this.parentNode, 'zmenseny')">Zobrazit/skrýt změnou výšky</button>
    <p>Odstavec, který se nezmenší.</p>
  <p class=zmensit>Obsah plynule skrývaný.</p>
    <p>Odstavec, který se také nezmenší.</p>
  </div>
</div>

<h3>Snížení šířky</h3>
<div class="live zuzeni">
  <div class=nezuzeny>
  <style>
    .zuzeni p.zmensit {max-width: 15em; height: 2em; overflow: hidden; white-space: nowrap; transition: max-width 1s}
    .zuzeny p.zmensit {max-width: 0}
  </style>
  <button onclick="prohodit(this.parentNode, 'zuzeny')">Zobrazit/skrýt změnou <b>šířky</b></button>
    <p>Odstavec, který se nezmenší.</p>
  <p class=zmensit>Obsah plynule skrývaný.</p>
    <p>Odstavec, který se také nezmenší.</p>
  </div>
</div>

<h3 id="vycisteni">„Vyčištění“ prostoru</h3>
<p>U jiných zmizení než snížení výšky zůstane po elementu zabraný prostor.</p>
<p>Vyčištění lze tedy zajistit třeba právě <b>snížením výšky</b> (<code>max-height: 0</code>). Něco jako <code>display: none</code> není možné v čistém CSS použít — vlastnost <code>display</code> nelze animovat.</p>
<p>Snížení výšky není problém zkombinovat s ostatními efekty zmizení — po <i>hlavní</i> skrývací animaci se může spustit rychlá <i>čisticí</i> animace.</p>
<p>Druhá možnost je použít JavaScript a při vyvolání animace vytvořit časovač, který v době skončení CSS animace nastaví elementu <code>display: none</code>.</p>

<h2 id="pruhlednost">Průhlednost (<code>opacity</code>)</h2>
<p>Pro plynulé snížení nebo zvýšení průhlednosti stačí prosté.</p>
<pre><code>element {opacity: 1; transition: opacity 1s}
element.skryt {opacity: 0}</code></pre>
<p>U ukázce je přidané <i>vyčištění</i> snížením výšky.</p>

<div class="live pruhlednost">
  <div class=nepruhledny>
  <style>
    .pruhlednost p {opacity: 1; max-height: 1.5em; margin: 1em 0; transition: opacity .5s .3s, max-height 1s, margin .8s .2s}
    .pruhledny p {opacity: 0; max-height: 0; margin: 0; transition: opacity .5s, max-height 1s .2s, margin .8s}
  </style>
  <button onclick="prohodit(this.parentNode, 'pruhledny')">Zobrazit/skrýt změnou průhlednosti</button>
  <p>Obsah plynule skrývaný.</p>
  </div>
</div>

<h2 id="transform-scale">Zmizení transformací</h2>
<p>CSS nabízí v nových prohlížečích tzv. transformace. Jedna z nich se týká <i>měřítka</i> elementu.</p>
<pre><code>element {transform: scale(1); transition: transform 1s}
element.skryt {transform: scale(0)}</code></pre>

<div class="live transformace">
  <div class=netransformovany>
  <style>
    .transformace p.zmensit {-webkit-transform: scale(1); -moz-transform: scale(1); transform: scale(1); transition: all .5s}
    .transformovany p.zmensit {-webkit-transform: scale(0); -moz-transform: scale(0); transform: scale(0)}
  </style>
  <button onclick="prohodit(this.parentNode, 'transformovany')">Zobrazit/skrýt změnou <b>měřítka</b></button>
    <p>Odstavec, který se nezmenší.</p>
  <p class=zmensit>Obsah plynule skrývaný.</p>
    <p>Odstavec, který se také nezmenší.</p>
  </div>
</div>


<h2 id="odlet">Odlétnutí</h2>
<p>Použitím <a href="/position#relative">relativní posice</a> a změnou souřadnic vytvoříme plynulé odjetí elementu. (Opět by měl element odlétnou minimálně o svojí šířku/výšku.)</p>
<pre><code>element {position: relative; left: 0; transition: left 1s}
element.skryt {left: -15em}</code></pre>

<div class="live odlet">
  <div class=neodletly style="overflow: hidden">
  <style>
    .odlet p {position: relative; left: 0; transition: left 1s}
    .odletly p {left: -15em}
  </style>
  <button onclick="prohodit(this.parentNode, 'odletly')">Zobrazit/skrýt odlétnutím</button>
    <p>Odstavec, který odlétne.</p>
  </div>
</div>

<h2 id="starsi-prohlizece">Starší prohlížeče</h2>
<p>Starší prohlížeče (tj. starší než <b>Internet Explorer 10</b>) nepodporující <a href="/transition"><code>transition</code></a> skryjí element bez animace.</p>
<p>V takových prohlížečích lze <a href="/animace#js">docílit animace jedině JavaScriptem</a>.</p>