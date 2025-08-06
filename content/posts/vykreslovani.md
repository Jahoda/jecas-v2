---
title: "Jak probíhá vykreslování stránky"
headline: "Jak funguje vykreslování stránky"
description: "Co prohlížeč dělá s webovou stránkou při vykreslování. "
date: "2014-11-13"
last_modification: "2014-11-13"
status: 1
tags: ["webove-prohlizece"]
format: "html"
---

<h2 id="jadro">Vykreslovací jádro</h2>

<p>Postup, kterým se ze zdrojových kódů (HTML, CSS, JavaScript) vytvoří finální podoba stránky, se mírně liší v jednotlivých <b>vykreslovacích jádrech</b>. V dnešní době se používají převážně tyto.</p>

<ul>
  <li>Blink (<b>Chrome 28+</b>, <b>Opera 15+</b>)</li>
  
  <li>WebKit (<b>Safari</b>)</li>
  
  <li>Gecko (<b>Firefox</b>)</li>
  
  <li>Trident (<b>Internet Explorer</b>)</li>
  
  <li>Presto (<b>Opera 12</b> a starší)</li>
</ul>

<p>Jádro <b>Blink</b> vzešlo z <b>WebKitu</b>, který <b>Chrome</b> dříve používal.</p>

<div class="external-content">
  <p>Seznam více vykreslovacích jader je <a href="http://en.wikipedia.org/wiki/List_of_layout_engines">na Wikipedii</a>.</p>
</div>

<p>Cílem <i>vykreslovacího enginu</i> je tedy <i>nakreslit</i> ze zdrojových kódů „obrázek“ stránky a ten následně <b>překreslovat</b> při akcích vyvolaných návštěvníkem nebo programátorem, to může být například.</p>

<ul>
  <li><b>Najetí myší</b> na odkaz. Zobrazí se odkaz v jiné podobě díky stylu pro <code>:hover</code>.</li>
  
  <li><b>Kliknutí</b> na tlačítko, které vyvolá JavaScriptovou akci vypisující do stránky obsah.</li>
  
  <li><b>Zobrazení</b> nějakého prvku stránky po určité době díky JS časovači (<code>setTimeout</code>).</li>
  
  <li><b>Rolování</b> po stránce nebo <b>změna velikosti</b> písma či okna.</li>
</ul>


<h2 id="prubeh">Průběh vykreslování</h2>

<p>Po stažení potřebných dat (HTML kód a styly) je prohlížeč začíná aplikovat a sestavovat z nich stránku.</p>


<p><img src="/files/vykreslovani/vykreslovani.png" alt="Schéma vykreslování stránky" class="border"></p>

<ol>
  <li>
    <p>Nejprve si připraví <a href="/dom">DOM</a> (<i>Document Object Model</i>) – tedy strom z HTML kódu. V tomto procesu se domyslí značky s <a href="/html-znacky#koncova-volitelna">nepovinnými</a> koncovými nebo i počátečními tagy, opraví se případné <i>chyby</i> jako překřížené značky a podobně.</p>
  </li>
  
  <li>
    <p>Podobný proces nastane i s <b>CSS</b>, z kterého vznikne CSSOM (<i>CSS Object Model</i>), kde se kromě <i>opravných</i> činností musejí smíchat příslušné styly:</p>

    <ul>
      <li><b>výchozí styl</b> prohlížeče,</li>
      <li><b>externí/interní CSS</b>,</li>
      <li><b>inline styly</b> a <b>HTML atributy</b>,</li>
      <li><b>uživatelské</b> styly</li>
    </ul>
  </li>
  
  <li>
    <p>Z HTML stromu (DOMu) a CSS se potom připraví tzv. <b>renderovací/vykreslovací strom</b>, kde už se pro jednotlivé jeho potomky aplikují CSS pravidla, což znamená, že se do renderovacího stromu nedostanou například skryté elementy (<code>display: none</code>).</p>
    
    <p>Každý viditelný prvek je potom representován položkou ve vykreslovacím stromu, kde má uvedeny rozměry, rámeček, odsazení (<a href="/margin">margin<code></code></a>) a podobně. Těchto položek může být pro jeden element i více (třeba odstavce mají vlastní „box“ pro každý řádek).</p>
  </li>
  
  <li>
    <p>Po sestavení vykreslovacího stromu může konečně prohlížeč <b><i>nakreslit</i> výslednou stránku</b>.</p>
  </li>
</ol>



<h2 id="prekreslovani">Překreslování</h2>

<p>Z pohledu pozdější <b>manipulace se stránkou JavaScriptem</b> je zajímavé překreslování stránky, kdy JS mění DOM nebo styly. Uživatel potom může <b>vykreslovací strom</b> ovlivňovat rolováním nebo změnou velikosti okna.</p>

<p><img src="/files/vykreslovani/js-uzivatel-vykreslovani.png" alt="Schéma vykreslování stránky" class="border"></p>

<p>Rozlišují se 2 základní typy překreslování:</p>

<ul>
  <li><b>Layout</b> (někdy také označováno jako <b>reflow</b>)</li>
  <li><b>Paint</b> (popř. <i>draw</i>, <i>redraw</i>)</li>
</ul>


<h3 id="layout">Layout</h3>
<p><i>Layout</i> znamená, že se musí přepočítat část vykreslovacího stromu nebo i celý strom. Nastává u vlastností, které mohou ovlivňovat okolí. Těch je většina. Nebo při manipulaci s DOMem (přidávání elementů apod.), scrollování či změně velikosti okna. Pár příkladů CSS vlastností.</p>

<ul>
  <li>
    <p id="puvodne-skryty" style='display: none'>Původně skrytý text.</p>
    
    <p>Zobrazení původně skrytého elementu pomocí <code>display: none</code> <button onclick="(function(el){el.style.display = el.style.display == 'block' ? 'none' : 'block'})(this.parentNode.parentNode.querySelector('#puvodne-skryty'))">odsune</button> následující obsah, takže se musí překresilt.</p>   
    
  </li>
  
  <li>
    <p>Přidání rámečku <button onclick="(function(el){el.style.border = el.style.border == '5px solid black' ? '' : '5px solid black'})(this.parentNode)">taktéž</button> způsobí odsunutí.</p>
  </li>
</ul>

<h3 id="paint">Paint</h3>

<p><i>Paint</i> se provádí i po <i>Layoutu</i>, ale někdy je možné provést jen <i>Paint</i>. Třeba u <b>změny barvy</b> pozadí, rámečku, změny průhlednosti (<a href="/opacity"><code>opacity</code></a>) a podobně.</p>


<div class="external-content">
<ul>
  <li><a href="http://csstriggers.com/">CSS Triggers</a> – jakým způsobem CSS vlastnosti ovlivňují překreslování stránky</li>
</ul>
</div>


<h2 id="optimalisace">Optimalisace překreslování</h2>

<p>Pro vyšší výkon se prohlížeče snaží <b>vykreslování optimalisovat</b>. Dělají to tak, že se nevykresluje při každé změně jednotlivého prvku vykreslovacího stromu:</p>

<pre><code>element.style.vlastnost = 'hodnota';</code></pre>

<p>Ale požadavky z JavaScriptu na změnu více prvků se dají do fronty a překreslení se provede dávkově (najednou).</p>

<p>Bohužel tuto funkci jde <b>snadno narušit</b> špatně napsaným JavaScriptem. Existují totiž vlastnosti, které pro správnou funkčnost potřebují zjistit aktuální stav, což znamená, že před jejich použitím musí prohlížeč aktuální stav <b>překreslit</b>, potom se provedou další změny a další překreslení a tak dál.</p>

<p>Jedná se například o <code>offset*</code> vlastnosti (<code>offsetTop</code>, <code>offseTLeft</code>, <code>offsetHeight</code>, <code>offsetWidth</code>), <code>client*</code>, <code>scroll*</code>, pochopitelně vlastnosti <a href="/zjisteni-css">zjišťující aktuální styl</a> a podobně.</p>

<div class="external-content">
<ul>
  <li><a href="http://gent.ilcore.com/2011/03/how-not-to-trigger-layout-in-webkit.html">Kompletní seznam JS metod způsobující překreslení</a></li>
</ul>
</div>


<h3 id="priklad-optimalisace">Příklad</h3>

<p>Budeme-li chtít <code>element</code> zvětšit o 10 px na šířku i výšku:</p>

<pre><code>element.style.width = element.offsetWidth + 10 + "px";
element.style.height = element.offsetHeight + 10 + "px";</code></pre>

<p>Tento kód donutí zbytečně překreslit stránku na druhém řádku, kde se zjišťuje <code>offsetHeight</code> (jedna z vlasností, co způsobí překreslení).</p>

<p>Řešením je nejprve zjišťovat hodnoty a až potom je najednou nastavovat:</p>

<pre><code>var novaSirka = element.offsetWidth + 10 + "px";
var novaVyska = element.offsetHeight + 10 + "px";
element.style.width = novaSirka;
element.style.height = novaVyska;</code></pre>

<p>V tomto jednoduchém případě to vyjde dost nastejno, ale při manipulaci s hodně objekty, je zásada „nejdřív zjistit všechny hodnoty a až potom je měnit“ užitečná.</p>

<p>U změny vlastností <b>500 elementů</b> oběma způsoby je rozdíl poměrně dobře patrný. Vytvořit dva cykly (jeden si uloží hodnoty všech prvků a druhý je změní) místo jednoho se vyplatí.</p>

<p><a href="https://kod.djpw.cz/ckhb">Ukázka</a></p>



<h2 id="rolovani">Rolování na stránce</h2>

<p>Rolování po stránce je velmi častá akce (je prakticky na každém webu), při které musí prohlížeč stránku (občas složitě) překreslovat.</p>

<p>Aby bylo rolování plynulejší, prohlížeč se po rozebrání DOMu snaží určit, které části budou při posunu <b>vypadat stále stejně</b>. Z nich potom vytvoří <i>obrázek</i> (vrstvu). Těchto vrstev může být na stránce více a různě se seskupovat. Když se potom na stránce při rolování něco změní, prohlížeč překreslí jen danou část.</p>

<p>V ideálním případě toho samozřejmě prohlížeč při rolování <b>překresluje co nejméně</b>, což má positivní efekt na plynulost.</p>

<p>Problematické jsou hlavně <b>velké fixované prvky</b>, které naruší velkou oblast předpřipravené vrstvy. Vykreslovacímu jádru totiž nestačí jen <i>jednoduše</i> posouvat statickou kombinaci vrstev, ale musí se zjišťovat, co je překrýváno fixním prvkem a co ne.</p>

<p>Taktéž <b>fixní obrázky</b> prosvítající za obsahem (textem) bývají z tohoto důvodu problematické. Prohlížeče používající Blink/WebKit navíc často trpí tím, že jsou zdržovány při scrollování i fixními prvky, co zrovna nejsou vidět. Většinou ale pomůže:</p>

<pre><code>.fixni {
  -webkit-backface-visibility: hidden
}</code></pre>

<p>Značně komplikované jsou potom <i>parallax efekty</i>, které při scrollování posouvají nějakými prvky, což je snad vůbec ta <b>nejhorší kombinace</b>, co si vykreslovací jádro může přát.</p>


<h2 id="mereni">Měření plynulosti vykreslování</h2>

<p>Zatímco rychlost <b>prvního načtení stránky</b> je dána spíš rychlostí a objemem přenášených dat. Interakce se stránkou už může negativně poznamenat <b>pomalé překreslování</b>.</p>

<p>Některé větší záseky jsou většinou viditelné přímo. Zjistit <b>přehled o rychlosti renderování</b> je ale možné i ze záložky <i>Timeline</i> ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> <b>Chrome</b>.</p>

<p><img src="/files/vykreslovani/chrome-timeline.png" alt="" class="border"></p>

<p>V ideálním případě by se <i>framerate</i> (počet snímků) měl držet nad 60 FPS (počet snímků za vteřinu), což přibližně odpovídá obnovovací frekvenci zobrazovacích zařízení.</p>

<p>Vývojářské nástroje sice umí zvýraznit <b>překreslovanou oblast</b>, zjistit, co způsobuje propad FPS, jde jedině ručně — <b>vypínáním jednotlivých částí vzhledu</b> (např. fixní posice, pozadí a podobně).</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/">Rendering: repaint, reflow/relayout, restyle</a></li>
  
  <li>Sitepoint.com: <a href="http://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/">10 Ways to Minimize Reflows and Improve Performance</a> – 10 rad, kterých se držet pro maximálně rychlé vykreslování</li>
  
  <li>Paul Irish: <a href="https://gist.github.com/paulirish/5d52fb081b3570c81e3a">
What forces layout / reflow</a> – přehled JS vlastností, co způsobují překreslení</li>
</ul>