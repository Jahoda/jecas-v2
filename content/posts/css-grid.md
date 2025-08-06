---
title: "CSS grid"
headline: "CSS grid"
description: "Jak funguje CSS grid a proč ho používat."
date: "2022-03-07"
last_modification: "2022-03-07"
status: 0
tags: []
format: "html"
---

<p>Historicky existovaly různé způsoby, jak vytvořit <a href="/layout">layout stránky</a> – tím je myšleno různé rozvržení do sloupců a řádků.</p>

<p>V minulosti se k tomu používaly:</p>

<ol>
  <li><a href="/ramy#frameset">rámy</a> (značka <code>&lt;frameset></code>),</li>
  <li><a href="/html-tabulky">HTML tabulky</a> nebo CSS tabulky <code>display: table</code> (tzv. <i>tabulkový layout</i>)</li>
  <li><a href="/position">posicování</a> (absolutní nebo fixní)</li>
  <li>obtékání pomocí <a href="/float"><code>float</code></a> vlastnosti,</li>
  <li><a href="/flexbox">flexboxy</a></li>
</ol>

<p>CSS grid je tedy už asi šestý evoluční pokus vytváření layoutu.</p>

<p>Kombinací různých triků a občas i <a href="/js">JavaScriptu</a> je možné s trochou šikovnosti udělat libovolný layout pomocí kteréhokoliv způsobu.</p>

<p>Díky CSS gridu se tento proces výrazně zjednodušil. Kromě toho se jedná o první řešení čistě pro layout, všechny ostatní předchozí způsoby jde <b>považovat spíš za hacky</b> určené původně k něčemu jinému.</p>


<p>Z toho plynou některé výhody.</p>



<h2 id="nepouzivat">Proč nepoužívat CSS grid</h2>

<p>Asi jediný důvod proč v roce <b>2022</b> nepoužívat CSS grid je <b>podpora hodně starých prohlížečů</b> s minimálním tržním podílem.</p>

<p>Jelikož s CSS gridem přišel původně <b>Microsoft</b> ve svém prohlížeči <b>Internet Explorer 10</b> (vydání říjen 2012), je jediným ne úplně marginálním nepodporujícím prohlížečem mobilní <b>Opera Mini</b>.</p>





<p>Jinak jde o široce podporovanou vlastnost.</p>

<p>Jediný oříšek je, že starší <b>IE</b> podporují starší specifikaci CSS gridu. Je proto jednak potřeba doplnit <a href="/css-prefixy">prefixy</a> a některé věci používat jinak.</p>


<h2 id="flex">Flex vs. grid</h2>

<p>Hodně lidí používá pro stavbu layoutu flex (<code>display: flex</code>).</p>

<p>Je to způsob, jak relativně pohodlně stavět layouty včetně různých věcí jako <a href="/stejne-vysoke-sloupce">stejně vysokých sloupců</a>, kombinování sloupců s fixní i proměnlivou šířkou a podobě.</p>


<p>U flexu jde i snadno měnit <b>pořadí jednotlivých elementů</b>.</p>

<p>Koneckonců i populární CSS framework <a href="/bootstrap-rychlokurs">Bootstrap</a> má svůj grid založený na flexboxu.</p>


<p>Flex má ale oproti gridu jednu zásadní nevýhodu – ze své podstaty komplikuje prohlížečům <a href="/vykreslovani">vykreslování stránky</a>.</p>


<p>Vykreslování layoutu ve flexu trpí podobným problémem, kterým kdysi trpěly tabulkové layouty – prohlížeč <b>musí čekat za stažení</b> celého obsahu flex kontejneru.</p>


<p>Proč?</p>


<p>Protože klidně úplně poslední element ve flex rodiči může významně ovlivnit layout celé stránky – může to být třeba boční panel, který odsune obsah, změní mu šířku atd.</p>


<p>Prohlížeč tedy buď musí čekat na stažení komplet HTML dané oblasti, nebo stránku během načítání postupně překreslovat – pokud zvolí tuto strategii, <b>bude web během načítání poskakovat</b> (tzv. <i>layout shift</i>).</p>


<p>CSS grid tento problém řeší tím, že už obal layoutu vymezí jednotlivé části webu. Prohlížeč si tak může vyhradit místo a průběžně vykreslovat, aniž by cokoliv poskakovalo.</p>





<p>Tento problém ale není v praxi zase tolik dramatický – existuje spousta webů, které neoptimální řešení pomocí flexu používají.</p>

<p>Pokud je HTML obsah flex obalu datově malý, server odpovídá rychle a i připojení je rychlé, nehrozí významný problém.</p>


<p>Vzhledem k tomu, že není možné vždy vše z toho zajistit, <b>je lepší používat CSS grid</b>.</p>












<h2 id="jak">Jak CSS grid funguje</h2>

<p>Grid se <i>zapíná</i> vlastností <a href="/display"><code>display</code></a>:</p>

<pre><code>.grid { display: grid }</code></pre>

<p>Pro vytvoření samotné mřížky potom slouží <code>grid-template-*</code> vlastnosti pro řádky a sloupce.</p>


<p>Nejjednodušší třísloupcový layout (se stejně vysokými sloupci) tak může mít například následující předpis:</p>

<pre><code>.grid {
  display: grid;
  grid-template-columns: 200px .7fr .3fr;
}</code></pre>


<p><a href="https://kod.djpw.cz/npfd">Živá ukázka</a></p>












<p>Za povštimnutí stojí jednotka <code>fr</code> (z anglického <i lang="en">fraction</i> – zlomek). V případě gridu se jedná o podíl na dostupném místě.</p>

<p>Výše uvedený předpis tedy vytvoří první sloupec o šířce 200 pixelů a další dva které si rozdělí zbývající prostor v poměru 70 ku 30 %.</p>

<p>V tomto případě se sloupce zaberou dle pořadí v HTML kódu.</p>

<p>Pro nastavení řádků slouží vlastnost <code>grid-template-row</code>.</p>


<h3 id="gird-template-areas"><code>gird-template-areas</code></h3>

<p>Aby se potom jednotlivé elementy v gridu dobře přiřazovaly na příslušná místa, existuje ještě vlastnost <code>gird-template-areas</code>.</p>

<p>Ta slouží k pojmenování jednotlivých částí gridu:</p>

<pre><code>.grid {
    display: grid;
    grid-template-columns: 200px .7fr .3fr;
    grid-template-rows: 100px 1fr 50px;
    grid-template-areas: 
        "header header header"
        "menu content sidebar"
        "footer footer footer";
}</code></pre>














<p>Tímto vzniknout oblasti header, menu, content, sidebar a footer.</p>

<p>Na potřebné místo se libovolný element dostane pomocí <code>grid-area</code>:</p>

<pre><code>.header {
    grid-area: header;
}</code></pre>

<p><a href="https://kod.djpw.cz/spfd">Živá ukázka</a></p>





<p>To je celé.</p>

<p>První výhoda je, že je to celé <b>hezky přehledné</b>.</p>

<p>Druhá super vlastnost je použití v <a href="/responsive">responsivním designu</a> – v závislosti na <a href="/media"><code>@media</code> pravidlech</a> si jde hezky nadefinovat různé rozložení pro různé šířky a jednotlivé elementy podle toho klidně umístit do jiných oblastí.</p>


<h2 id="generator">Generátor CSS gridu</h2>

<p>Psát celý grid ručně může být trochu otrava. Existují ale generátory, kde si jde layout naklikat a rovnou použít výsledný kód:</p>

<div class="external-content">
  <ul>
    <li><a href="https://grid.layoutit.com">Interactive CSS grid generator</a></li>
  </ul>
</div>

<p><img src="/files/css-grid/layoutit-css-grid-generator.png" alt="Layoutit – CSS grid generátor" class="border"></p>
