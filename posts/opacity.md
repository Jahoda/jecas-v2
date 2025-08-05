---
title: "CSS průhlednost (opacity)"
headline: "Průhledný obsah v CSS"
description: "Pro zprůhlednění obsahu existují různé možnosti. Nejen CSS vlastnost <code>opacity</code>."
date: "2013-10-01"
last_modification: "2013-10-02"
status: 1
tags: ["css", "css-vlastnosti", "hotova-reseni"]
format: "html"
---

<p>Používat úspěšně <code>opacity</code> je možné <b>od Internet Exploreru 9</b>; ve starších lze totéž simulovat filtrem.</p>
<pre><code>.pruhledny {
  filter: alpha(opacity=50); /* 50 ze 100 = 50% průhlednost */
  opacity: 0.5; /* 0.5 z 1 = 50% průhlednost */
}</code></pre>

<p>Vlastnost <code>opacity</code> nabývá hodnot od nuly do jedné:</p>
<ul>
  <li><code>0</code> – element <b>je úplně průhledný</b> (není vidět, ale na stránce <i>překáží</i>, tj. jako by se použilo <code>visibility: hidden</code>),</li>
  <li><code>1</code> – element <b>není vůbec průhledný</b> (jako by se nic nenastavilo),</li>
  <li><code>0.5</code> (popř. zkráceně <code>.5</code>) – element je <b>průhledný z poloviny.</b>
</ul>

<p>Pro Exploreří <code>filter: alpha(opacity=X)</code> je to podobné, jen hodnota <b>rovnou v procentech</b>.</p>

<p>Za elementem <code>.pruhledny</code> bude <i>vykukovat</i> (prosvítat) pozadí.</p>

<div class="live">
  <style>
  .pruhledny {
    zoom: 1;
    background: rgb(100%, 70%, 100%);
    filter: alpha(opacity=50);
    opacity: 0.5;
    padding: 1em;
  }
  </style>
  <div class="pruhledny">
    <p>Průhledný element</p>
  </div>
</div>

<h3 id="has-layout">Nefunkční <code>filter: alpha(opacity=50)</code> v IE</h3>
<p>Ve starších Explorerech (IE7) občas zprůhlednění přes vlastnost <code>filter</code> <b>nemusí fungovat</b>.</p>
<p>Starší IE totiž neumí aplikovat filtry na elementy, co <i>nemají layout</i> (<code>hasLayout</code>), řešení je prosté — layout zapnout — třeba vlastností <code>zoom</code>:</p>
<pre><code>.pruhledny {
  zoom: 1; /* zapnutí hasLayoutu pro IE */ 
  filter: …
}</code></pre>

<h2 id="jen-text">Průhledný obsah, neprůhledný text</h2>
<p>Jak je vidět na předchozí ukázce, průhledné je úplně vše. Jelikož text není moc dobře čitelný, hodilo by se mít <b>průhledný pouze obsah</b>.</p>

<h3 id="rgba">Průhledná barva — <code>rgb<b>a</b>(…)</code></h3>
<p>Od <b>IE9</b> se při zápisu barev dá použít zprůhlednění. (Ekvivalent <code>rgba</code> bez průhlednosti je <code>rgb</code> a <b>funguje spolehlivě napříč prohlížeči</b>.)</p>
<p>Barva se zadá čtyřmi parametry:</p>
<table>
  <tr><th>R</th><td>red – červená <td>rozmezí 0–255 nebo 0%–100%</td>
  <tr><th>G</th><td>green – zelená <td>rozmezí 0–255 nebo 0%–100%</td>
  <tr><th>B</th><td>blue – modrá <td>rozmezí 0–255 nebo 0%–100%</td>
  <tr><th>A</th><td>aplha – průhlednost <td>hodnota v rozmezí 0–1</td>
</table>

<p>Následující elementy mají <i>stejnou</i> barvu, ale jinak nastavenou její průhlednost.</p>
<div class="live">
  <style>
    .pruhledny-alpha {overflow: hidden}
    .pruhledny-alpha p {
      padding: 1em;
      width: 4em;
      float: left;
    }
    .a8 {background: rgba(100%, 70%, 100%, 0.8)}
    .a7 {background: rgba(100%, 70%, 100%, 0.7)}
    .a6 {background: rgba(100%, 70%, 100%, 0.6)}
    .a5 {background: rgba(100%, 70%, 100%, 0.5)}
    .a4 {background: rgba(100%, 70%, 100%, 0.4)}
    .a3 {background: rgba(100%, 70%, 100%, 0.3)}
    .a2 {background: rgba(100%, 70%, 100%, 0.2)}
    
  </style>
  <div class="pruhledny-alpha">
    <p class="a8">Průhledný element</p>
    <p class="a7">Průhledný element</p>
    <p class="a6">Průhledný element</p>
    <p class="a5">Průhledný element</p>
    <p class="a4">Průhledný element</p>
    <p class="a3">Průhledný element</p>
    <p class="a2">Průhledný element</p>
  </div>
</div>

<p><small>Nastavování barev dle průhlednosti se může hodit při <b>návrhu webu</b>, když se ještě neví, co bude jak přesně barevné. Nebo v případě, kdy chceme <a href="/zmena-vzhledu">více barevných versí</a>. Stačí určit barevné pozadí a jednotlivé barvy zadávat jako černou nebo bílou o určité průhlednosti. Když se potom přebarví pozadí, <i>přebarví</i> se tak i všechny průhledné barvy.</small></p>

<h3 id="posicovani">Absolutně posicovaný element s <code>opacity</code></h3>
<p>Druhá možnost, jak docílit <b>průhledného pozadí bez průhledného textu</b>, je si připravit samotný průhledný element a za text jej <a href="/position#absolute">naposicovat</a> a <code>z-index</code>em přemístit za text (nutno dát pozor, aby se nedostal ještě <i>níže</i> než za požadovaný text – řešení je zvýšit <code>z-index</code> pro <i>obal</i>).</p>
<p>Výsledek by měl být v podporovaných prohlížečích totožný; v nepodporovaných, tj. <b>IE8</b>, <b>IE7</b> apod., by na rozdíl od předchozího příkladu tato ukázka měla fungovat.</p>

<div class="live">
  <style>
    .pozadi {
      background: rgb(100%, 70%, 100%);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }

    .pruhledny-pozadim {overflow: hidden}
    
    .pruhledny-pozadim p {
      position: relative;
      z-index: 1;
      padding: 1em;
      width: 4em;
      float: left;
    }    
    .o8 .pozadi {filter: alpha(opacity=80); opacity: 0.8}
    .o7 .pozadi {filter: alpha(opacity=70); opacity: 0.7}
    .o6 .pozadi {filter: alpha(opacity=60); opacity: 0.6}
    .o5 .pozadi {filter: alpha(opacity=50); opacity: 0.5}
    .o4 .pozadi {filter: alpha(opacity=40); opacity: 0.4}
    .o3 .pozadi {filter: alpha(opacity=30); opacity: 0.3}
    .o2 .pozadi {filter: alpha(opacity=20); opacity: 0.2}
  </style>
  <div class="pruhledny-pozadim">
    <p class="o8">Průhledný element<span class="pozadi"></span></p>
    <p class="o7">Průhledný element<span class="pozadi"></span></p>
    <p class="o6">Průhledný element<span class="pozadi"></span></p>
    <p class="o5">Průhledný element<span class="pozadi"></span></p>
    <p class="o4">Průhledný element<span class="pozadi"></span></p>
    <p class="o3">Průhledný element<span class="pozadi"></span></p>
    <p class="o2">Průhledný element<span class="pozadi"></span></p>
</div>
</div>

<h3 id="obrazek">Průhledný obrázek</h3>
<p>Další řešení výše uvedeného nebo jen řešení situace, <b>kdy nestačí obyčejné jednobarevné pozadí</b>, je vytvoření průhledného obrázku v grafickém editoru (<a href="/files/opacity/pruhledne-pozadi.png">příklad obrázku</a>), který se nastaví jako pozadí (<code>background</code>).</p>

<div class="live">
<style>
  .pruhledny-obrazek {overflow: hidden; background: url(/files/opacity/pruhledne-pozadi.png) no-repeat left top}
    .pruhledny-obrazek p {
      padding: 1em;
      width: 4em;
      float: left;
    margin-top: 0;
    }  
</style>
  <div class="pruhledny-obrazek">
    <p>Průhledný element</p>
    <p>Průhledný element</p>
    <p>Průhledný element</p>
    <p>Průhledný element</p>
    <p>Průhledný element</p>
    <p>Průhledný element</p>
    <p>Průhledný element</p>
 </div>
</div>