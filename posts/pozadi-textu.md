---
title: "Pozadí za textem"
headline: "Pozadí jenom za písmeny"
description: "Jak vytvořit nadpis, který má pozadí jen za písmeny."
date: "2015-03-18"
last_modification: "2015-03-19"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<p>Pro ozvláštnění <a href="/nadpisy">nadpisu</a> nebo nějakého popisku může být zajímavé nastavit pozadí, aby bylo pouze za textem.</p>

<p><img src="/files/pozadi-textu/priklad.png" alt="Příklad nadpisu s pozadím za písmeny" class="border"></p>

<p>Zadání možná vypadá jednoduše, ale docílit kýženého efektu není úplně triviální.</p>




<h2 id="pozadi">Pozadí</h2>

<p>Jelikož je nadpis blokový element (<a href="/display#block"><code>display: block</code></a>), nastavené pozadí se <i>rozlije</i> po celém bloku.</p>

<div class="live">
  <style>
    .nadpis {
      padding: .4em;
      background: #0D6AB7; 
      color: #fff;
      font-size: 200%;
    }
  </style>  
  <div class="nadpis">Nadpis</div>
</div>

<p>Je tedy nutné přepnout <code>display</code> na <code>inline</code>. Zároveň použít nějaký obal, aby nadpis zabíral celý řádek.</p>


<div class="live">
  <style>
    .nadpis-inline {
      display: inline;
    }
  </style>
  <div>
    <div class="nadpis nadpis-inline">Nadpis</div>  
  </div>
</div>


<h2 id="vyska-radku">Výška řádků</h2>

<p>V případě, že se nadpis rozleze do více řádků, mohou být řádky na sebe nepěkně nalepeny.</p>

<div class="live">
  <div>
    <div class="nadpis nadpis-inline">Nadpis <br> na více řádků</div>
  </div>
</div>

<p>Je potřeba tedy zvýšit výšku řádku (<a href="/font#line-height"><code>line-height</code></a>). Bohužel stanovit:</p>

<ol>
  <li>velikosti písma (<code>font-size</code>),</li>
  <li>odsazení (<code>padding</code>),</li>
  <li>výšku řádku (<code>line-height</code>)</li>
</ol>

<p>Aby to sedělo <b>přesně na 1 pixel</b> napříč prohlížeči vypadá neproveditelně.</p>

<p>Nezbývá než použít nějakou toleranci, aby na sebe řádky navazovaly.</p>


<div class="live">
  <style>
    .nadpis-vyska {
      line-height: 190%;
    }
  </style>
  <div>
    <div class="nadpis nadpis-inline nadpis-vyska">Nadpis <br> na více řádků</div>
  </div>
</div>


<h2 id="odsazeni">Odsazení na stranách</h2>

<p>Ne úplně hezky působí absence odsazení na konci prvního a začátku druhého řádku, pokud se použije <code>padding</code>.</p>

<h3 id="box-decoration"><code>box-decoration</code></h3>

<p>Mimo <b>IE</b> a starou <b>Operu 12</b> to dokáže vyřešit CSS vlastnost <a href="/box-decoration-break">box-decoration-break</a>, která umí <i>rozkopírovat</i> styl na jednotlivé řádky.</p>

<div class="live">
  <style>
    .box-decoration {
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      -ms-box-decoration-break: clone;
      -o-box-decoration-break: clone; 
    }
  </style>
  <div>
    <div class="nadpis nadpis-inline nadpis-vyska box-decoration">Nadpis <br> na více řádků</div>
  </div>
</div>


<h3 id="stin">Stín</h3>

<p>V případě jednobarevného pozadí by také odsazení teoreticky šlo vykouzlit přes <a href="/box-shadow"><code>box-shadow</code></a> a posunutí <a href="/margin"><code>margin</code>em</a> o šířku stínu. Bohužel tento postup nefunguje ve <b>Firefoxu</b> (vytvoří stín pouze prvnímu řádku) a v <a href="/ie11"><b>IE 11</b></a> není stín úplně ostrý, takže se mezi stínem a obsahem zobrazují svislé pruhy.</p>

<div class="live">
  <style>
    .box-shadow {
      margin: 0 10px;
    }
    .box-shadow div {
      padding-left: 0;
      padding-right: 0;
      box-shadow: 10px 0px 0px 0px #0D6AB7, -10px 0px 0px 0px #0D6AB7;
    }
  </style>
  <div class="box-shadow">
    <div class="nadpis nadpis-inline nadpis-vyska">Nadpis <br> na více řádků</div>
  </div>  
</div>


<h3 id="posicovani">Posicování</h3>

<p>Alespoň levé odsazení by šlo zajistit například absolutně posicovaným elementem. Funguje mimo <b>Firefox</b>.</p>


<div class="live">
  <style>
    .posicovani {
      padding: 0;      
      margin: 0 10px;
    }
    .posicovani div {
      padding-left: 0;
      padding-right: 0;
      position: relative;
    }
    .posicovani div:before {
      width: 10px;
      height: 100%;
      content: "";
      position: absolute;
      top: 0;
      left: -10px;
      background: #0D6AB7;
    }
  </style>
  <div class="posicovani">
    <div class="nadpis nadpis-inline nadpis-vyska">Nadpis <br> na více řádků</div>
  </div>  
</div>


<h2 id="zaver">Závěr</h2>

<p>Vypadá to, že vytvořit zmíněný efekt s odsazením na stranách a dobrou podporou v prohlížečích nějakým rozumným způsobem úplně nejde.</p>

<p>Nebo jde a víte jak? <b>Napište mi, prosím, do komentářů</b>.</p>