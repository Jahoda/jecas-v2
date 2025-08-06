---
title: "Word-spacing"
headline: "Word-spacing"
description: "CSS vlastnost <code>word-spacing</code> upravuje velikost mezer mezi slovy."
date: "2015-08-27"
last_modification: "2015-09-30"
status: 1
tags: ["css", "css-vlastnosti", "pisma"]
format: "html"
---

<div class="live">
  <style>
    .velke-mezery {
      word-spacing: 1em;  
    }
  </style>
  <p class="velke-mezery">Tento text má velké mezery mezi slovy.</p>
</div>

<p>Pro upravení rozestupů mezi <b>písmeny</b> slouží vlastnost <a href="/letter-spacing"><code>letter-spacing</code></a>.</p>

<h2 id="zapis">Zápis</h2>

<pre><code>element {
  word-spacing: 1em;    
}</code></pre>

<p>Hodnotu jde zadat několika způsoby:</p>

<ol>
  <li>
    <p><b>Výchozí mezera</b>:</p>
    
    <pre><code>word-spacing: <b>normal</b></code></pre>
    
    <p>Výchozí hodnota odpovídá nule.</p>
  </li>
  
  <li>
    <p><b>Délkové jednotky</b> (kromě procent):</p>
    
    <pre><code>word-spacing: <b>1em</b></code></pre>
  </li>  
</ol>

<p>Kromě zvětšení jde mezery i <b>zmenšit nebo zrušit</b>. Zmenšení se provede zadáním dostatečně velké <b>záporné hodnoty</b>.</p>


<div class="live">
  <style>
    .male-mezery {
      word-spacing: -0.1em;
    }
    .bez-mezer {
      word-spacing: -.25em;
    }    
  </style>
  <p>Text s normálními mezerami.</p>
  <p class="male-mezery">Text s menšími mezerami mezi slovy.</p>
  <p class="bez-mezer">Text bez mezer mezi slovy.</p>
</div>

<p>Prohlížeče používající vykreslovací jádra <b>Gecko</b> a <b>Blink</b> (např. <b>Firefox</b> a <b>Chrome</b>) při záporné hodnotě převyšující šířku mezery začnou překrývat slova přes sebe. Stará <b>Opera 12</b> a <b>IE</b>/<a href="/microsoft-edge"><b>Edge</b></a> tímto problémem netrpí.</p>

<div class="live">
  <style>
    .zaporne-mezery {
      word-spacing: -10em;
      text-align: center;
    }    
  </style>
  <p class="zaporne-mezery">Slova se překrývají</p>
</div>

<p>Srovnání zobrazení v různých prohlížečích:</p>

<p><img src="/files/word-spacing/zaporny.png" alt="Zobrazení záporného word-spacing v různých prohlížečích" class="border"></p>




<h2 id="podpora">Podpora</h2>

<p>Široce podporovaná vlastnost ve všech běžně používaných prohlížečích.</p>

<p>Chování se liší při používání <b>záporných hodnot</b>.</p>



<h2 id="vyuziti">Využití</h2>

<p>Hodně málo používaná vlastnost.</p>

<div class="internal-content">
  <ul>
    <li><a href="/cetnost-css">Nejpoužívanější CSS vlastnosti</a> – přehled nejpoužívanějších CSS vlastností</li>
  </ul>
</div>

<p>Měnit výchozí mezery mezi slovy většinou není potřeba.</p>



<h3 id="odsazeni">Odsazení</h3>

<p>Použít <code>word-spacing</code> jde třeba pro jednoduché <b>vodorovné odsazení několika položek</b>. Například odkazů v <a href="/menu">menu</a>:</p>

<div class="live">
<style>
.menu-odsazeni {
    word-spacing: 2em;
    background: #fff;
    display: inline-block;
    padding: 1em 2em;
}

.menu-odsazeni a {
    word-spacing: 0;
}
</style>
<div class="menu-odsazeni">
    <a href="#">Odkaz</a>
    <a href="#">Víceslovný odkaz</a>
    <a href="#">Odkaz</a>
</div>  
</div>


<p>Pro obalový element se nastaví <code>word-spacing</code> o rozměru odsazení a pro jednotlivé položky se zase vrátí na nulu (výchozí hodnotu).</p>

<pre><code>.obal-menu {word-spacing: 1em}
.obal-menu a {word-spacing: 0}</code></pre>

<p><a href="https://kod.djpw.cz/nnqb">Samostatná ukázka</a></p>


<h3 id="blok">Zarovnání do bloku</h3>

<p>Při použití blokového zarovnání písma (<a href="/text-align#justify"><code>text-align: justify</code></a>) se k přesnému roztažení na šířku využívá <b>automatické zvětšení mezer mezi slovy</b>.</p>

<p>V takovém případě jsou odstupy mezi slovy typicky stejné nebo větší než hodnota vlastnosti <code>word-spacing</code>.</p>

<div class="live">
  <style>
    .mezery-justify {
      text-align: justify;
      width: 14em;
      border: 1px solid;
      padding: 1em;
    }</style>
  <p class="mezery-justify">Mezery mezi slovy v textu zarovnaném do bloku se zvětší, aby se obsah přesně roztáhl ke krajům bloku.</p>
</div>

<p>Změnou hodnoty <code>word-spacing</code> se v tomto případě ničeho použitelnějšího nedocílí. Ve staré <b>Opeře 12</b> dokáže text při větším záporném <code>word-spacing</code>u, než odpovídá šířce mezery, opustit svůj obal.</p>

<p><img src="/files/word-spacing/opera-12.png" alt="Špatné zobrazení ve staré Opeře 12" class="border"></p>

<!-- ukázka: https://kod.djpw.cz/tnqb -->




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/css/word-spacing.html">Word-spacing</a></li>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing"><code>word-spacing</code></a></li>
</ul>