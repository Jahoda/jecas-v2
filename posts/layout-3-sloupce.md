---
title: "Třísloupcový layout"
headline: "Třísloupcový layout"
description: "Různé možnosti vytvoření rozvržení o 3 sloupcích s fixní i proměnnou šířkou."
date: "2013-11-25"
last_modification: "2014-10-30"
status: 1
tags: ["css", "layout"]
format: "html"
---

<h2 id="float">Obtékání <code>float</code></h2>
<p>První možnost pro řešení s <b>pevnou šířkou</b> je nechat všechny tři sloupce <a href="/float">obtékat</a> (<a href="http://kod.djpw.cz/zet-">ukázka</a>).</p>

<div class="live">
  <style>
    .fixni-obal {width: 560px; margin: auto; overflow: hidden}
    .fixni-obal .sloupec {float: left}
    
    .fixni-obal .levy {width: 130px; background: #1081DD;}
    .fixni-obal .pravy {width: 130px; background: #DA3F94;}
    .fixni-obal .stred {width: 300px; background: #fff;} /* 560 - 130 - 130 */
  </style>
  <div class="fixni-obal">
    <div class="sloupec levy">
      <p>Obsah levého sloupce</p>
    </div>
    <div class="sloupec stred">
      <p>Obsah prostředního sloupce</p>
    </div>
    <div class="sloupec pravy">
      <p>Obsah pravého sloupce</p>
    </div>
  </div>
</div>

<p><b>Obal</b>, který zároveň pomocí <code>overflow: hidden</code> <a href="/float#overflow">ukončuje obtékání</a>, je <a href="/centrovani#margin-auto">vodorovně vycentrovaný</a>.</p>

<p>Nevýhoda tohoto řešení může být, že obsah, má-li být v <b>prostředním sloupci</b>, není (a nemůže být) v kódu nejvíce nahoře při <b>zachování stejné struktury HTML</b>. Je potřeba dva ze tří sloupců <a href="http://kod.djpw.cz/nkt">obalit do dalšího <code>&lt;div></code>u</a> (je tak možné docílit libovolného uspořádání v kódu, ale vždy se musí předělat HTML – přesunout <i>obal</i>).</p>

<p><a href="/stejne-vysoke-sloupce">Stejně vysoké sloupce</a> se dají řešit obrázkem.</p>

<h3 id="procenta">Proměnlivá šířka</h3>
<p>Přizpůsobování šířky sloupců oknu se docílí použitím <b>procent</b> místo pixelů (<a href="http://kod.djpw.cz/bft">ukázka</a>).</p>

<div class="live">
  <style>
    .obal {width: 100%; overflow: hidden}
    .obal .sloupec {float: left}
    
    .obal .levy {width: 20%; background: #1081DD;}
    .obal .pravy {width: 20%; background: #DA3F94;}
    .obal .stred {width: 60%; background: #fff;} /* 100% - 20% - 20% */
  </style>
  <div class="obal">
    <div class="sloupec levy">
      <p>Obsah levého sloupce</p>
    </div>
    <div class="sloupec stred">
      <p>Obsah prostředního sloupce</p>
    </div>
    <div class="sloupec pravy">
      <p>Obsah pravého sloupce</p>
    </div>
  </div>
</div>


<h3 id="problemy">Možné problémy</h3>
<p>Při přidávání <code>padding</code>u nebo <code>border</code>u je nutné myslet na <a href="/box-model">vlastnosti <code>box-model</code>u</a>. Ve výchozím (obsahovém box modelu) se musí <b>přepočítávat šířka</b> (snižovat o odsazení a rámeček) nebo používat další vnitřní obal, který bude nastavovat jen rámečky a odsazení, ale už ne <b>šířku</b>.</p>

<p>Problém s místem může nastat i při <b>odsazení</b> pomocí <code>margin</code>u, kdy <code>width + margin</code> bude větší než <b>dostupný prostor</b>.</p>

<h2 id="position">Absolutní posicování</h2>
<p>Asi <b>hlavní výhoda</b> <a href="/position#absolute">absolutní posice</a> spočívá v jednoduchém umisťování elementu, co je v kódu na konci, nahoru a obráceně. Naopak <b>nevýhoda</b> je v tom, že je nutné znát, který sloupec bude vždy nejdelší.</p>

<p>Kromě toho je možné vytvořit rozvržení, kde některé sloupce budou mít <b>pevnou šířku v pixelech</b> a jiné proměnlivou podle dostupného prostoru. To by s <code>float</code>em nešlo.</p>

<h3>Řešení</h3>
<p>Není rozumné posicovat absolutně <b>všechny sloupce</b>. Komplikuje to třeba umístění patičky pod všechen obsah, protože <b>vyjmutí z toku dokumentu</b> způsobí, že se stránka nebude <i>natahovat</i>.</p>

<p>Proto nejdeleší (typicky sloupec s obsahem) <b>nebude</b> obtékaný nebo posicovaný (<a href="http://kod.djpw.cz/dft">samostatná ukázka</a>).</p>

<div class="live">
  <style>
    .posicovany-obal {width: 100%; position: relative;}
    .posicovany-obal .sloupec {position: absolute; top: 0}
    
    .posicovany-obal .levy {width: 100px; left: 0; background: #1081DD;}
    .posicovany-obal .pravy {width: 100px; right: 0; background: #DA3F94;}
    .posicovany-obal .stred {margin-left: 100px; margin-right: 100px; background: #fff;}
    
    /* stejně vysoké sloupce */
    .stejne-vysoke .sloupec {height: 100%}
  </style>
  <div class="posicovany-obal" id="stejne-vysoke">
    <div class="stred">
      <p>Obsah prostředního sloupce</p>
      <p>Který je delší než <b>ostatní sloupce</b>.</p>
      <p>Protože musí natáhnout obsah.</p>
      <p>Na stránkách, kde je málo obsahu si lze pomoci vlastností <code>min-height</code>.</p>
    </div>
    <div class="sloupec levy">
      <p>Obsah levého sloupce</p>
    </div>
    <div class="sloupec pravy">
      <p>Obsah pravého sloupce</p>
    </div>
  </div>
</div>
<script>
  var sv = document.getElementById("stejne-vysoke");
</script>

<p>Finta je v tom, že <code>&lt;div></code> s hlavním obsahem vytvoří na stranách místo, kam se boční sloupce naposicují. Vytvořit potřebný prostor lze několika způsoby:</p>

<ul>
  <li>Levým a pravým <code>margin</code>em (použito v ukázce).</li>
  <li>Levým a pravým <code>padding</code>em.</li>
  <li>V případě <b>dvousloupcového layoutu</b> se omezením šířky sloupce vytvoří vedle něj místo.</li>
</ul>

<p>Dosažení <b>stejně vysokých sloupců</b> je potom velmi prosté. Stačí <b>posicovaným sloupcům</b> <button onclick="toggle(sv, 'stejne-vysoke')">nastavit</button> <code>height: 100%</code> (<a href="http://kod.djpw.cz/eft">ukázka</a>) nebo současně <code>top: 0</code> a i <code>bottom: 0</code> (<a href="http://kod.djpw.cz/fft">ukázka</a>).</p>


<h2 id="css-tabulky">CSS tabulky</h2>

<p>Další možnost řešení jsou <i>CSS tabulky</i>. Tím není myšleno používání značek jako <code>&lt;table></code>, <code>&lt;tr></code>, <code>&lt;td></code> a podobně, nýbrž jejich ekvivalenty vytvořené CSS vlastností <a href="/display"><code>display</code></a> – tj. <code>display: table</code>, <code>display: table-row</code> a <code>display: table-cell</code>.</p>

<p>Nevýhoda je komplikovanější určování, co bude v kódu dřív nebo později.</p>

<p>Na druhou stranu <i>tabulky</i> řeší problém <b>stejně vysokých sloupců</b>. Rovněž jde i určit některé sloupce <b>s pevnou šířkou</b> a ostatní se podle toho dopočítají.</p>

<p><a href="http://kod.djpw.cz/fahb">Živá ukázka</a> (prostřední sloupec má nastaveno <code>width: 1000px</code>)</p>

<p>Šířka (<code>width</code>) v tabulce standardně funguje jako <i>doporučená</i>. Pokud nějaký sloupec bude mít širší obsah, roztáhne se na úkor toho s nastavenou šířkou, co se <b>ještě má jak zmenšit</b>. Toto chování jde změnit vlastností <code>table-layout</code>:</p>

<pre><code>.tabulka {
  table-layout: fixed;
}</code></pre>

<p>Taková tabulka bude více respektovat zadané rozměry. Někdy to může být na škodu.</p>

<p><a href="http://kod.djpw.cz/gahb">Živá ukázka</a></p>


<h2 id="flex">Flex</h2>
<p>Až se přestanou požívat prohlížeče starší než <b>IE 10</b>, půjde tento problém řešit <a href="/flexbox">flexboxy</a>.</p>