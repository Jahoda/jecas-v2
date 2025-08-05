---
title: "CSS display"
headline: "CSS display"
description: "CSS vlastnost <code>display</code> ovlivňuje způsob vykreslování HTML elementu."
date: "2014-02-26"
last_modification: "2014-05-22"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<h2 id="zakladni">Základní hodnoty</h2>

<p>Nejčastěji používané hodnoty jsou:</p>

<dl>
  <dt id="none"><code>display: none</code></dt>
  <dd>
    <p>Element bude v kódu, ale na stránce se nezobrazí. Z pohledu CSS se bude tvářit, že na stránce vůbec není.</p>
    <pre><code>/* elementy s třídou „skryt“ nebudou vidět */
.skryt {
  display: none
}</code></pre>
    <p>Používá se většinou pro různé <a href="/zobrazit-skryt">skrývání a odkrývání textu</a> JavaScriptem.</p>
    <p>Skrytí obsahu je možné i dalšími způsoby než pomocí <code>display: none</code>:</p>
    <ol>
      <li>V případě, že nevadí (nebo je žádoucí), že element stále zabírá své místo na stránce, ale není vidět:
        <ul>
          <li><code>visibility: hidden</code></li>
          <li><code><a href="/opacity">opacity</a>: 0</code></li>
        </ul>      
      </li>
      <li>Skutečné skrytí:
        <ul>
          <li><code>display: none</code></li>
          <li>vystrčení <a href="/position#absolute">absolutní posicováním</a>: <code>position: absolute; top: -999em; left: -999em</code></li>
        </ul>
      </li>
    </ol>
    <p>Skrývání obsahu se hlavně v minulosti používalo i k <b>ošálení vyhledávačů</b>, kdy se na stránku napsal pro vyhledávače lákavý obsah, který by ale návštěvníka nezajímal, a skryl se pomocí <code>display: none</code>. Asi nemá smysl zdůrazňovat, že se jedná o <b>nepovolenou</b> praktiku.</p>
  </dd>
  
  <dt id="inline"><code>display: inline</code></dt>
  <dd>
    <p>Řádkových elementů je asi většina, patří sem značky pro <b>formátování textu</b> (<code>&lt;b></code>, <code>&lt;i></code> / <code>&lt;strong></code>, <code>&lt;em></code>, <code>&lt;code></code> a podobně). Dále všechny <a href="/vlastni-html-znacky">vlastní/neznámé HTML značky</a> a <i>neutrální</i> značka <code>&lt;span></code>.</p>
    
    <p>Kromě lehce pozměněného výchozího stylu (<b>tučný</b>, <i>kursiva</i>, <code>neproporcionální font</code>) <code>inline</code> značky nedělají skoro nic. Jednotlivé řádkové elementy jsou proto na stránce volně vedle sebe. Pod sebe je dostane jen <b>automatické</b> zalomení koncem řádku nebo značka pro zalomení <code>&lt;br></code>.</p>
  </dd>
  
  <dt id="block"><code>display: block</code></dt>
  <dd>
    <p>Konstrukce <code>display: block</code> je výchozí hodnota některých elementů – říká se jim podle toho <b>blokové elementy</b>. Patří mezi ně nadpisy, odstavce, značka <code>&lt;div></code> a pár dalších značek.</p>
    
    <p>Blokové elementy se vyznačují tím, že:</p>
    
    <ol>
      <li>je možné nastavit výšku a šířku (<code>height</code> a <code>width</code>),</li>
      <li>dva blokové elementy umístěné v kódu za sebou se na stránce objeví podsebou.</li>
    </ol>
    
    <p>Element, který dle <b>výchozích stylů prohlížeče</b> blokovým není, se může blokem stát i bez přidání <code>display: block</code>. V jakém případě?</p>
    
    <ul>
      <li>Všechny <a href="/float">obtékané elementy</a> se stávají bloky.</li>
      <li>Všechny absolutně nebo fixně posicované elementy se stávají rovněž bloky.</li>
    </ul>
  </dd>
  
  <dt id="inline-block"><code>display: inline-block</code></dt>
  <dd>
    <p>Kombinací řádkových (<code>inline</code>) a blokových (<code>block</code>) elementů je <code>display: inline-block</code>.</p>
    
    <p>Prvky s touto vlastností:</p>
    
    <ol>
      <li>Se zobrazují vedle sebe (jako <code>inline</code>).</li>
      <li>Mohou mít nastavenou šířku a výšku.</li>
    </ol>
    
    <p>Rozdíl mezi <code>inline-block</code> a <code>inline</code> je tedy v možnosti <b>zadávat rozměry</b>.</p>
    
    <p>Používání <code>inline-block</code>u je tak způsob, jak dostat elementy s nastavenými rozměry vedle sebe <b>bez použití obtékání</b> (<code>float</code>). Je ale nutno dát pozor na tzv. <a href="/inline-block-whitespace">bílé znaky</a> (mezery) mezi prvky s <code>inline-block</code>.</p>
  </dd>
</dl>

<h2 id="tabulkove">Tabulkové hodnoty <code>display</code>e</h2>

<p>Další skupinou jsou hodnoty pro vytváření <a href="/tabulky">tabulek</a>. Ano, tabulku je možné poskládat kromě značek <code>&lt;table></code>, <code>&lt;tr></code>, <code>&lt;td></code> atd. i z <b>libovolných jiných elementů</b>.</p>

<p>Tabulkové hodnoty vlastnosti <code>display</code> fungují od <b>IE 8</b>. Jejich fungování jde připodobnit k HTML značkám souvisejícími s tabulkami.</p>

<dl>
  
  <dt id="table"><code>display: table</code></dt>
  <dd>
    <p>Značka <code>&lt;table></code>.</p>
  </dd>
  
  <dt id="table-row"><code>display: table-row</code></dt>
  <dd>
    <p>Řádek tabulky. Značka <code>&lt;tr></code>.</p>
  </dd>
  
  <dt id="table-cell"><code>display: table-cell</code></dt>
  <dd>
    <p>Buňka tabulky. Značka <code>&lt;td></code>.</p>
  </dd>
  
  <dt id="table-caption"><code>display: table-caption</code></dt>
  <dd>
    <p>Značka <code>&lt;caption></code>.</p>
  </dd>  
    
  <dt id="table-column"><code>display: table-column</code></dt>
  <dd>
    <p>Sloupec tabulky. Značka <code>&lt;col></code>.</p>
  </dd>
  
    
  <dt id="table-column-group"><code>display: table-column-group</code></dt>
  <dd>
    <p>Značka <code>&lt;colgroup></code>.</p>
  </dd>
   
  <dt id="table-header-group"><code>display: table-header-group</code></dt>
  <dd>
    <p>Záhlaví tabulky. Značka <code>&lt;thead></code>.</p>
  </dd>
  
  <dt id="table-row-group"><code>display: table-row-group</code></dt>
  <dd>
    <p>Značka <code>&lt;tbody></code>.</p>
  </dd>
  
  <dt id="table-footer-group"><code>display: table-footer-group</code></dt>
  <dd>
    <p>Zápatí tabulky. Značka <code>&lt;tfoot></code>.</p>
  </dd>
    
</dl>

<p>Většina tabulkových hodnot <code>display</code>e se <b>moc nepoužívá</b>. Chceme-li na stránce mít tabulku, je lepší použít přímo:</p>

<pre><code>&lt;table>
  &lt;tr>
    &lt;td>Buňka&lt;/td>
  &lt;/tr>
&lt;/table>
</code></pre>

<p>Nicméně například pro umístění různě širokých boxů, které mají <b>vyplnit celou šířku</b>, je to poměrně vhodné řešení.</p>

<p><a href="http://kod.djpw.cz/hldb">Ukázka</a></p>

<h2 id="flexbox">Flexboxy</h2>

<p>Další dvě hodnoty vlastnosti <code>display</code> souvisejí s <a href="/flexbox">flexboxy</a>. Fungují od <b>IE 10</b>.</p>

<dl>
  
  <dt id="flex"><code>display: flex</code></dt>
  <dd>
    <p>Element bude blokový s možností upravovat ho s využitím flexbox modelu.</p>
  </dd>
  
  <dt id="inline-flex"><code>display: inline-flex</code></dt>
  <dd>
    <p>Totéž jako <code>display: flex</code>, jen pro <b>řádkové</b> elementy.</p>
  </dd>
</dl>

<h2 id="grid-layout">Grid</h2>

<p>Vlastnost <code>grid</code> je podobně jako <code>flex</code> určena pro snazší tvorbu layoutu. Grid (v překladu mřížka) funguje zatím pouze v <b>Ineternet Exploreru 10</b> a novějších (s <a href="/css-prefixy">prefixem <code>-ms-</code></a>).</p>

<p>Umožňuje <b>bez zásahů do HTML kódu</b> čistě v CSS vytvořit libovolný layout. Pravidlo <code>display: grid</code> se nastavuje společnému rodiči elementů, které jsou součástí <i>gridu</i>.</p>

<p>Pro rodiče s <code>grid</code>em se nadefinují jednotlivé části, do kterých se pohodlně přiřazují potomci.</p>

<p><a href="http://kod.djpw.cz/fldb">Živá ukázka</a> (pouze <b>IE 10+</b>)</p>

<p><img src="/files/display/grid.png" alt="Použití gridu v IE 10, 11" class="border"></p>

<dl>
  
  <dt id="grid"><code>display: grid</code></dt>
  <dd>
    <p>Element bude blokový s možností používat v něm mřížku.</p>
  </dd>
  
  <dt id="inline-grid"><code>display: inline-grid</code></dt>
  <dd>
    <p>Totéž jako <code>display: grid</code>, jen pro <b>řádkové</b> elementy.</p>
  </dd>
</dl>

<h2 id="run-in-vlastnost">Run-in</h2>
<dl>
  <dt id="run-in"><code>display: run-in</code></dt>
  
  <dd>
    <p>Poměrně málo známá hodnota <code>display</code>. Umožňuje, aby element <i>vtekl</i> do následujícího sourozence.</p>
    
    <p><a href="http://kod.djpw.cz/gldb">Ukázka</a> (<b>IE 8+</b>, <b>Opera 12</b>)</p>
    
    <p><img src="/files/display/run-in.png" alt="Použití display: run-in v IE a Opeře" class="border"></p>    
  </dd>
</dl>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>W3C: <a href="http://dev.w3.org/csswg/css-grid/">Specifikace grid layoutu</a></li>
</ul>