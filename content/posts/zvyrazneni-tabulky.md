---
title: "Zvýraznění řádků a sloupců tabulky"
headline: "Zvýraznění sloupců/řádků tabulky po najetí"
description: "Jak při najetí myší na tabulku zvýraznit příslušné sloupce a řádky."
date: "2015-02-11"
last_modification: "2015-02-12"
status: 1
tags: ["css", "hotova-reseni", "tabulky"]
format: "html"
---

<p>U rozsáhlejších tabulek může být obtížnější udržet přehled o tom, co k čemu patří. Pomůže <b>zvýraznění sloupců a řádků</b> po najetí myší.</p>



<h2 id="radky">Zvýraznění řádků</h2>

<p>Zvýraznit po najetí celý řádek (<code>&lt;tr></code>) jde velmi jednoduše s využitím pseudo-třídy <a href="/css-selektory#uzivatelske-akce"><code>:hover</code></a>.</p>

<pre><code>tr:hover {
  background: yellow;
}</code></pre>

<p>Mají-li buňky (<code>&lt;td></code>) nastavenou nějakou barvu, je nutné barvit až přímo <code>tr:hover <b>td</b></code>, jinak by <code>:hover</code> celého řádku nebyl vidět.</p>

<div class="live">
  <style>
    .zvyrazneni-radku tr:hover td {
      background: yellow;
    }
  </style>
  <table class="zvyrazneni-radku">
    <tr>
      <td>Text</td>
      <td>Text</td>
    </tr>
    <tr>
      <td>Text</td>
      <td>Text</td>
    </tr>
    <tr>
      <td>Text</td>
      <td>Text</td>
    </tr>
  </table>
</div>


<h2 id="sloupce">Zvýraznění sloupců</h2>

<p>Hover efekt pro sloupce je o poznání těžší. Existuje sice značka <code>&lt;col></code>, díky které jde efektivně <a href="/stylovani-tabulky">stylovat celé sloupce</a>, ale neumí odchytnout <code>:hover</code>.</p>

<p>Nabízí se tedy dvě řešení:</p>

<ol>
  <li>JavaScriptem zjistit pořadí sloupce, kde je <b>kursor myši</b>, a nastavit příslušnému <code>&lt;col></code> zvýrazňující třídu.</li>
  
  <li>Zvýraznění zajistit <a href="/position#absolute">absolutně posicovanými</a> pseudo-elementy <a href="/content-attr"><code>:before</code>/<code>:after</code></a>.</li>
</ol>


<h3 id="js">Zvýraznění sloupce JavaScriptem</h3>

<ol>
  <li>
    <p>Při pohybu myši v tabulce (<a href="/udalosti-mysi#onmousemove"><code>onmousemove</code></a>) se z objektu <code>event</code> zjistí jeho <a href="/event-target"><code>target</code></a> (cílový element).</p>
  </li>  
  <li>
    <p>Pokud cílový element bude buňka (<code>&lt;td></code>), zjistí se její pořadí z vlastnosti <code>cellIndex</code>.</p>
  </li>  
  <li>
    <p>Podle indexu se najde příslušný <code>&lt;col></code> a přidá se mu třída pro zvýraznění.</p>
  </li>
  <li>
    <p>Je nezbytné, aby buňky tabulky <b>neměly nastavené pozadí</b>, jinak pozadí nastavené pro <code>&lt;col></code> nebude vidět.</p>
  </li>
  <li>
    <p>Docílit zrušení zvýraznění při <b>odjetí myší</b> jde při události <code>onmouseout</code> nebo obalením <code>&lt;div></code>em s mírným <code>padding</code>em, který označení „vyčistí“, protože není buňka tabulky.</p>
  </li>
</ol>

<div class="live">
  <style>
    table.zvyrazneni-js {
      background: #fff;
    }
    .zvyrazneni-js td {
      background: transparent;
    }
    .zvyrazneni-js tr:hover td, 
    .zvyrazneni-js col.hover {
      background: yellow;
    }
  </style>
  <div style="padding: .1em" onmousemove="zvyraznit(event)">
  <table class="zvyrazneni-js">
    <colgroup>
      <col>
      <col>
      <col>
    </colgroup>
    <tr>
      <td>Text</td>
      <td>Text</td>
      <td>Text</td>
    </tr>
    <tr>
      <td>Text</td>
      <td>Text</td>
      <td>Text</td>
    </tr>
    <tr>
      <td>Text</td>
      <td>Text</td>
      <td>Text</td>
    </tr>    
  </table>
    </div>
  <script>
    var aktivniSloupec = false;
    var sloupce = document.querySelector('.zvyrazneni-js').getElementsByTagName("col");
    function zvyraznit(e) {
        if (aktivniSloupec !== false) {
            sloupce[aktivniSloupec].className = "";
        }
        e = e || window.event;
        var bunka = (e.target || e.srcElement);
        if (bunka.tagName == "TD") {
            aktivniSloupec = bunka.cellIndex;
            sloupce[aktivniSloupec].className = "hover";
        }
    }
  </script>  
</div>

<p><a href="https://kod.djpw.cz/bikb">Samostatná ukázka</a></p>


<h3 id="css">Označení sloupce v CSS</h3>

<ol>
  <li>
    <p>Buňkám se přidá <a href="/position#relative">relativní posice</a>.</p>
  </li>
  <li>
    <p>Při <code>:hover</code>u se zobrazí absolutně posicovaný pseudo-element <code>:before</code>. Ten bude mít pozadí v barvě zvýraznění, 100% šířku a hodně vysokou výšku, aby bezpečně přesáhla výšku tabulky.</p>
    <p><img src="/files/zvyrazneni-tabulky/oriznuti.png" alt="Oříznutí zvýraznění" class="border"></p>    
  </li>
  <li>
    <p>Protože by tento absolutně posicovaný <i>zvýrazňovač</i> vylézal z tabulky, přidá se:</p>
    
    <pre><code>table {
  overflow: hidden;
}</code></pre>
  </li>
  <li>
    <p>Pro umístění zvýrazňovače „za text“ se přidá záporný <code>z-index</code>.</p>
  </li>
</ol>

<p><a href="https://kod.djpw.cz/jhkb">Živá ukázka</a></p>

<p>Těžko soudit, které řešení je lepší. Čistě CSS způsob je možná trochu <b>snazší na implementaci</b> (stačí pouze přidat CSS), spoléhání se na velkou výšku ale není úplně stoprocentní.</p>


<h3 id="generovani-css">Generování CSS</h3>

<p>Další možnost je vytvoření stylů pro zvýraznění každého sloupce (pomocí <a href="/css-selektory#n-ty-potomek">selektoru <code>:nth-child</code></a>) a při najetí měnit jen třídu tabulky podle aktivního sloupečku.</p>

<pre><code>.sloupec-1 td:nth-child(1),
.sloupec-2 td:nth-child(2),
.sloupec-3 td:nth-child(3) {
  background: yellow;
}</code></pre>

<p>Vygenerovat podobné CSS je ideální nějakým CSS preprocesorem, co umí cykly.</p>

<p><a href="https://kod.djpw.cz/cikb">Živá ukázka</a></p>


<h3 id="hruba-sila">Hrubá síla</h3>

<p>Funkční by zřejmě bylo i procházení všech buněk tabulky a měnění tříd, ale obával bych se <b>problémů s výkonem</b> u větších tabulek.</p>