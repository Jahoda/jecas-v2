---
title: "Zkosení hrany v CSS"
headline: "Zkosení hrany v CSS"
description: "Jak vytvořit šikmou hranu (zkosení) CSS bloku."
date: "2015-10-27"
last_modification: "2015-10-28"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<p>Dlouhou dobu bylo v CSS možné (a známé) pouze vytváření objektů ve tvaru čtverců a obdélníků.</p>

<ol>
  <li><p>Pomocí vlastnosti <a href="/border-radius"><code>border-radius</code></a> jde vytvářet <b>kulaté rohy</b> nebo <a href="/kruhovy-obrazek">kulaté obrázky</a>.</p></li>
  
  <li>Vhodnou kombinací tloušťky a barvy rámečků jde kreslit <a href="/css-sipky">šipky/trojúhelníky</a>.</li>
</ol>

<p>Jak vytvořit něco se <b>zkosenou hranou</b>?</p>


<h2 id="border">Pomocí <code>border</code> trojúhelníku</h2>

<p>Pomocí vytvořeného trojúhelníku z rámečku jde zajistit šikmou hranu.</p>

<p>Trojúhelník je vytvořen pomocí pseudo-elementu <code>:after</code>, který je umístěn za obsah.</p>

<div class="live">
  <style>
.sikmy {
    background: #0D6AB7;
    color: #fff;
    padding: 0 .5em;
    position: relative;
    display: inline-block;
    line-height: 2em;
}

.sikmy-trojuhelnik:after {
    content: "";
    border: 2em solid transparent; width: 0px; height: 0px; display: inline-block; position: absolute; border-left: 1em solid #0D6AB7; border-top: 0; left: 100%; top: 0;}
  </style>
  <p class="sikmy sikmy-trojuhelnik">Obsah se šikmou hranou</p>
</div>

<p><a href="https://kod.djpw.cz/morb">Samostatná ukázka</a> – šikmá hrana</p>

<p><b>Podpora</b> tohoto řešení je vynikající (rámečky fungují všude). Horší je to s vyhlazováním – šikmá hrana může vypadat kostrbatě.</p>

<p>Taktéž nastavení požadovaného zkosení není úplně intuitivní. Nakonec je podmínkou, aby pozadí bloku bylo jednobarevné kvůli napojení.</p>


<h2 id="clip">Oříznutí <code>clip</code></h2>

<p>Jako dělaná je pro tyto případ oříznutí CSS vlastnost <a href="/clip"><code>clip-path</code></a> s funkcí <code>polygon</code>:</p>

<pre><code>.sikmy {
  clip-path: polygon(0 0, 100% 0, 75% 100%, 0 100%);
}</code></pre>

<p>Ta bez problému funguje i s obrázkovým pozadím:</p>

<p><img src="/files/css-zkoseni/clip-path.png" alt="Oříznutí přes clip-path" class="border"></p>











<p>Výsledek:</p>


<div class="live">
  <style>
    .sikmy-clip {
      padding-right: 2em;
      clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
      -webkit-clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
    }
  </style>
  <p class="sikmy sikmy-clip">Obsah se šikmou hranou</p>
</div>

<p>Nevýhoda je <b>slabší podpora v prohlížečích</b>. Nepravidelné oříznutí podporuje <b>Chrome 24+</b>,  <b>Opera 15+</b> a <b>Safari 8+</b>. Pro lepší podporu je dobré použít <a href="/css-prefixy">CSS prefixy</a>.</p>


<h2 id="zkoseni">Zkosení <code>transform: skewX</code></h2>

<p>CSS transformace <code>skew</code> dokáže zkosit celý element. Zkosení zároveň deformuje i obsah – text – což je nežádoucí. Nabízí se tedy použít deformaci pouze pro pseudo-element, který se potom umístí na správné místo <a href="/position#absolute">absolutním posicováním</a>.</p>

<div class="live">
  <style>
    .skew {
      z-index: 0;
    }
.skew:after {
      width: 2em; height: 100%; display: inline-block; position: absolute; background: inherit; content: ""; right: -1em; z-index: -1; transform: skewX(-30deg); -ms-transform: skewX(-30deg); -moz-transform: skewX(-30deg); -webkit-transform: skewX(-30deg); -o-transform: skewX(-30deg);}
  </style>
  <p class="sikmy skew">Obsah se šikmou hranou</p>
</div>

<p>CSS vlastnost <code>transform</code> a zkosení <code>skewX</code>/<code>skewY</code> je podporováno s prefixy už od <b>IE 9</b>, <b>Firefoxu 3.5</b>, <b>Chrome 4</b> a <b>Opera 11.5</b>.</p>

<p>Pomocí <code>z-index</code>u se zkosení umístí za obsah.</p>


<h2 id="zkoseni-obe">Zkosení na obou stranách</h2>

<p>Bylo-li by cílem mít zkosené hrany na obou stranách, šlo by element včetně písma zkosit a pouze samotný text vrátit zpět opačnou hodnotou:</p>

<div class="live">
  <style>
    .zkosene-obe {
        display: inline-block; margin-left: 1em; margin-right: 1em;
        transform: skewX(-30deg); -ms-transform: skewX(-30deg); -moz-transform: skewX(-30deg); -webkit-transform: skewX(-30deg); -o-transform: skewX(-30deg);}
      .zkosene-obe span {
        display: inline-block;
        transform: skewX(30deg); -ms-transform: skewX(30deg); -moz-transform: skewX(30deg); -webkit-transform: skewX(30deg); -o-transform: skewX(30deg)
      }
  </style>
  <p class="sikmy zkosene-obe">
    <span>Obsah se šikmými hranami</span>
  </p>
</div>

<p><a href="https://kod.djpw.cz/porb">Samostatná ukázka</a> – zkosení na obou stranách</p>

<p></p>

<p>Možná u tohoto postupu bude někde problém s <b>vyhlazováním písma</b>.</p>

<p>Bez použití pseudo-elementu by šlo případně jednu šikmou stranu oříznout:</p>

<p><a href="https://kod.djpw.cz/sorb">Živá ukázka</a> – oříznutí jedné zkosené hrany</p>

<h2 id="rotace">Rotace</h2>

<p>Teoreticky by šlo vytvořit šikmou plochu i <a href="/rotace">rotací</a>, ale těžko říct, jestli to přináší nějaké výhody oproti zkosení. Podpora v prohlížečích je obdobná.</p>


<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li>Viget: <a href="https://viget.com/inspire/angled-edges-with-css-masks-and-transforms">Angled Edges with CSS Masks and Transforms</a></li>
</ul>