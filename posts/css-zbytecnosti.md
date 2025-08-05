---
title: "CSS zbytečnosti"
headline: "CSS zbytečnosti"
description: "CSS konstrukce, které nejspíš píšete zbytečně."
date: "2015-05-21"
last_modification: "2015-05-22"
status: 1
tags: ["css", "napady"]
format: "html"
---

<p>Během objevování a <b>učení se</b> kaskádovým stylům (CSS) si člověk snadno přivykne na <b>zbytečně komplikované konstrukce</b>, které začne používat z neznalosti. Potom si na ně navykne a ze setrvačnosti je často používá, i když už CSS docela rozumí…</p>




<h2 id="margin-auto"><code>margin: 0 auto</code></h2>

<p>Hodnotu horního a spodního <a href="/margin"><code>margin</code>u</a> není při vodorovném <a href="/centrovani">centrování</a> třeba explicitně uvádět.</p>

<p>Prosté:</p>

<pre><code>margin: auto</code></pre>

<p>Funguje naprosto identicky.</p>

<p>Nejspíš jediná výjimka, kdy se výsledek „<code>margin: auto</code>“ a „<code>margin: 0 auto</code>“ liší, je <a href="/centrovani#absolutni-margin">centrování absolutním posicováním</a>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/margin-auto">Psát <code>margin: auto</code>, nebo <code>margin: 0 auto</code>?</a></li>
  </ul>
</div>




<h2 id="nula">Nula před desetinnou tečkou</h2>

<p>Jak tomu tak bývá, v programování jde při zápisu <b>desetinných čísel</b> vypustit nulu na začátku.</p>

<pre><code>.5 +.5 = 1</code></pre>

<p>Jde to praktikovat i v CSS:</p>

<pre><code>margin: .5em;</code></pre>


<!-- http://www.lamer.cz/quote/72668 -->



<h2 id="nula-jednotky">Jednotky u hodnoty <code>0px</code></h2>

<p>Je-li nějaká hodnota nastavena na nulu, je zbytečné uvádět jednotky (<code>0px</code>, <code>0em</code> a podobně). Nula bude pořád nula.</p>

<pre><code>element {
  height: 0<del>px</del>;
}</code></pre>






<h2 id="uvozovky">Uvozovky kolem URL/písem</h2>

<pre><code>element {
  background: url(<b>"</b>obrazek.png<b>"</b>);
  font-family: <b>'</b>Název písma<b>'</b>;
}</code></pre>

<p>Při zadávání URL obrázku do CSS funkce <code>url</code> jsou <a href="/uvozovky">uvozovky</a> nepovinné.</p>

<p>Při uvádění fontu (<a href="/font#font-family"><code>font-family</code></a>) jsou uvozovky nutné jen v případě, že název písma obsahuje čísla a speciální symboly.</p>







<h2 id="strednik">Středník</h2>

<p>Jednotlivé CSS deklarace bývají oddělovány středníkem (<code>;</code>). Středník <b>není nutné psát</b> za poslední deklarací pro daný <a href="/css-selektory">selektor</a>.</p>

<pre><code>.uzasnyStyl {
  color: red;
  text-align: center
}</code></pre>


<p>Při používání <b>strukturovaného CSS</b> to ale dost zavání zapomenutím středníku při připsání dalšího předpisu.</p>


<p>U <b>řádkového CSS</b> to problém není.</p>

<pre><code>.uzasnyStyl {color: red; text-align: center}</code></pre>






<h2 id="block-float">Obtékaný element se stane blokovým</h2>

<p>Je-li element plovoucí (tj. má nastaven <a href="/float"><code>float</code></a>), stane se automaticky blokovým (<a href="/display#block"><code>display: block</code></a>).</p>

<pre><code>.obtekany {
  float: left;
  <del>display: block</del>;
}</code></pre>





<p>Blokovým se stane i element s výslovně nastaveným <code>display: inline</code>, <code>display: inline-block</code> nebo <code>display: table-cell</code> a podobně.</p>

<p>Výjimka je obtékaný element s <code>display: table</code> – tabulkové zobrazení se zachová. Obdobně se chová hodnota <code>list-item</code>, která je výchozí u odrážek seznamů. Rozplavaná položka seznamu bude stále <code>display: list-item</code>.</p>

<div class="live">
  <ul>
    <li style="float: left">Položka</li>
  </ul>
  <br>
</div>




<h2 id="block-absolute">Absolutně posicovaný element se stane blokovým</h2>

<p>Je-li element <a href="/position">posicován</a> absolutně nebo fixně, stane se z něj automaticky <code>display: block</code> bez nutnosti to uvádět.</p>

<pre><code>.posicovany {
  position: absolute;
  <del>display: block</del>;
}</code></pre>






<h2 id="dopocitavani">Dopočítávání hodnot</h2>

<p>CSS vlastnosti mající varianty pro všechny strany <code>*-top</code>, <code>*-right</code>, <code>*-bottom</code> a <code>*-left</code> jde zadávat do sdružené vlastnosti.</p>

<p>Konstrukce:</p>

<code>margin: 1em .5em .3em;</code>

<p>Odpovídá:</p>

<pre><code>margin-top: 1em;
margin-right: .5em;
margin-bottom: .3em;
margin-left: .5em;</code></pre>




<div class="internal-content">
  <ul>
    <li><a href="/css-dopocitavani">Dopočítávání CSS hodnot</a> – samostatný článek věnovaný se dopočítávání</li>
  </ul>
</div>





<h2 id="zkratky">Zkratky CSS vlastností</h2>

<p>Řada CSS vlastností má tzv. <b>zkratku</b>.</p>

<pre><code>border-width: 1px;
border-style: solid;
border-color: red;</code></pre>





<p>Předchozí rámeček tak jde zapsat jako:</p>

<pre><code>border: 1px solid red;</code></pre>

<p>I při použití zkratky není třeba uvádět všechny hodnoty. Pro zrušení rámečku tak stačí:</p>

<code>border: 0;</code>



<p>Obdobně pro zrušení odrážek <a href="/list-style">seznamu</a> stačí použít <code>list-style: none</code>, místo <code>list-style<b>-type</b>: none</code>, jak bývá často k vidění.</p>





<h2 id="detailni-selektory">Příliš konkrétní selektory</h2>

<p>Řekněme, že je cílem v následujícím HTML kódu zaměřit odkaz (značku <code>&lt;a></code>).</p>

<pre><code>&lt;div class="menu">
  &lt;ul>
    &lt;li>&lt;a href="">Odkaz&lt;/a>&lt;/li>
  &lt;/ul>
&lt;/div></code></pre>



<ol>
  <li>
    <p>Jedna extrémní varianta je selektor typu:</p>
    
    <pre><code>div.menu ul li a {}</code></pre>
  </li>
  
  <li>
    <p>Na opačné straně stojí:</p>
    
    <pre><code>.menu a {}</code></pre>
  </li>
</ol>

<p>Obecně bývá lepší používat spíš druhý způsob s jednodušším selektorem.</p>


<ol>
  <li>Má kratší zápis.</li>
  
  <li>Nemá zbytečně <b>vysokou prioritu</b>. Kvůli případnému přepisování vlastností je dobré držet <i>sílu selektorů</i> co nejnižší.</li>
  
  <li>Jednodušší selektor je rychlejší na vyhodnocení. To je spíš teoretická výhoda – i komplikovaný selektor bude pořád hodně rychlý.</li>
</ol>


<h2 id="dedicnost-barvy">Dědičnost barvy</h2>

<p>Rámečky <code>border</code>, ale i <code>outline</code>, <a href="/box-shadow"><code>box-shadow</code></a> nebo <a href="/text-shadow"><code>text-shadow</code></a> dokáží dědit barvu, která se nachází ve vlastnosti <code>color</code>.</p>

<div class="live">  
  <p style="border: solid; color: #0D6AB7">Rámeček převzal barvu z <code>color</code></p>
  
  <p style="text-shadow: 10px 10px 5px; color: #0D6AB7">Stín převzal barvu z <code>color</code></p>
</div>






<h2 id="sirka">Uvádění šířky</h2>

<p>Blokový element dle výchozích stylů automaticky vyplní všechnu dostupnou šířku.</p>


<p>Nastavovat pro vnořený element <b>stejnou šířku jako má jeho rodič</b> je tudíž zbytečné.</p>

<pre><code>&lt;div style="width: 400px">
  &lt;div style="width: 400px">
    Vnořený element
  &lt;/div>
&lt;/div></code></pre>






<p>Totéž platí pro nastavování šířky na 100 % pro <b>roztažení přes celou plochu</b> – to je výchozí chování blokového elementu.</p>



<h2 id="prefixy">Zbytečné CSS prefixy</h2>

<p>K vidění bývá používání <a href="/css-prefixy">CSS prefixů</a> pro vlastnosti, které daný prohlížeč s prefixem nikdy nepodporoval – například <code>-ms-transition</code>.</p>

<p>Podobný případ je vlastnost <code>-moz-opacity</code> – od <b>Firefoxu 0.9</b> (rok 2004) funguje prosté <a href="/opacity"><code>opacity</code></a>.</p>





<h2 id="podekovani">Poděkování</h2>

<p>Na sesbírání jednotlivých zbytečností se podíleli: <a href="http://www.1-webdesign.cz/">habendorf</a>, <a href="http://teststranek.kvalitne.cz/">Bubák</a>, <a href="http://ciwe.cz">Keil</a> a <a href="http://webylon.info/">Chamurappi</a>.</p>