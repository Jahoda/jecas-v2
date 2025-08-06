---
title: "Centrování v CSS"
headline: "Centrování na webových stránkách"
description: "Ucelený popis různých způsobů vertikálního i horizontálního centrování. Se známou i neznámou šířkou nebo výškou."
date: "2013-08-11"
last_modification: "2017-04-25"
status: 1
tags: ["css", "hotova-reseni", "napady"]
format: "html"
---

<h2 id="text-align">Horizontální centrování textu (<code>text-align: center</code>)</h2>
<p>Nejjednoduší je vodorovně vycentrovat text nějakého bloku, třeba odstavce:</p>
<p class="live" style="text-align: center"><code style="display: inline-block">&lt;p style="text-align: center"&gt;text&lt;/p&gt;</code></p>
<p>Centrovat je takto možné prostý text nebo cokoliv s:</p>
  <ul>
<li>
  <code>display: inline</code>,
</li>
<li>
  <code>display: inline-<b>block</b></code>
</li>
</ul>

<p>Právě <code>inline-block</code> lze použít pro <b>centrování menu s neznámou šířkou</b>, kdy potřebujeme nastavit odkazům <code>padding</code> apod.</p>

<div class="live">
  <style>
    .centrovane-menu {text-align: center; background: #8ECCF0}
    .centrovane-menu a {display: inline-block; padding: .3em 1em; text-decoration: none; background: #fff}
  </style>
  
  <div class="centrovane-menu">
    <a href="http://jecas.cz">Odkaz</a>
    <a href="http://jecas.cz">Delší odkaz</a>
    <a href="http://saintsrow.cz">Ještě mnohem delší</a>
  </div>
</div>

<p><b>Poznámka</b>: vlastnost <code>text-align</code> se dědí, tj. všechny elementy v předkovi s <code>text-align: center</code> budou obsah centrovat, nepřepíše-li se jim <code>text-align</code>.</p>

<h3 id="rozdily-inline-block">Rozdíly napříč prohlížeči</h3>
<p><b>Internet Explorery</b> do verse 7 (včetně) mají problémy s elementy, co jsou ve výchozím stavu blokové (<code>&lt;div&gt;</code>, <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, …). V těchto prohlížečích jim normálně <b>nelze nastavit hodnotu <code>display</code> na <code>inline-block</code></b> (elementy budou stále pod sebou — <a href="https://kod.djpw.cz/awb">ukázka</a>).</p>
<p>Nicméně docílit <code>inline-block</code>u pro blokové elementy v starších Explorerech (6 a 7) by <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=7&amp;topic=144085#9">mohlo jít</a> použitím <code>display: inline</code> a <a href="/haslayout">zapnutím <code>hasLayout</code>u</a> (třeba použitím <code>zoom: 1</code>) — <a href="https://kod.djpw.cz/hwb">ukázka</a>.</p>

<h2 id="line-height">Vertikální centrování řádku</h2>
<p>Máme-li jeden řádek textu, který má být uprostřed pevně dané výšky, řešení je <code>line-height</code> rovný výšce (případně se <code>height</code> může vypustit).</p>

<p>Podobného efektu lze docílit i <code>padding</code>em, ale musí se dopočítat na požadovanou výšku, což je složitější.</p>

<div class="live">
  <p style="background: #fff; line-height: 100px">Text <i>vysoký</i> 100 pixelů (<code>line-height: 100px</code>).</p>
</div>












<h2 id="margin-auto">Vodorovné centrování bloků (<code>margin: auto</code>)</h2>
<p>Pokud je nám <b>známa šířka</b>, stačí ji blokovému elementu nastavit spolu s <code>margin: auto</code> (nezkrácený zápis: <code>margin-left: auto; margin-right: auto</code>).</p>

<p>V případě, že element není blokový (<code>display: block</code>), musíme ho na blokový <i>přepnout</i>. Jinak centrování nebude fungovat. <a href="https://kod.djpw.cz/subb">Ukázka</a>.</p>

<p>Stejně tak nebude centrování přes <code>margin: auto</code> fungovat pro <a href="/float">obtékané elementy</a> (vlastnost <code>float</code>).</p>

<div class="live">
  <style>
    .centrovany-blok {margin: auto; width: 300px}
  </style>
  <pre class="centrovany-blok"><code>.centrovany-blok {
  <b>margin: auto</b>; 
  width: 300px
}</code></pre>
</div>

<p>Šířku je možné zadávat i v procentech, aby se hezky přizpůsobovala velikosti stránky, ale zůstala stále <b>vodorovně vycentrovaná</b>. Příjemné rovněž je, že lze využít (od IE 7) vlastnosti <code>min-width</code> a <code>max-width</code>.</p>

<div class="live">
  <style>
    .centrovany-blok-procenta {margin: auto; width: 50%; min-width: 200px; max-width: 1000px}
  </style>
  <pre class="centrovany-blok-procenta"><code>.centrovany-blok-procenta {
  <b>margin: auto</b>; 
  width: <i>50%</i>;
  min-width: 200px; 
  max-width: 1000px
}</code></pre>
</div>
<h3 id="centrovani-stranky">Případ užití</h3>
<p>Typicky se takto centrují celé webové stránky:</p>
<ol>
  <li>Obalí se nějakým <code>&lt;div&gt;</code>em,</li>
  <li>nastaví se mu např. <code>margin: auto; width: 960px</code>.</li>
</ol>













<h2 id="absolute">Centrování absolutním posicováním</h2>
<p>Další možnost, tentokrát pro vystředění <b>svislé i vodorovné</b>, je absolutní posice (tj. element s <a href="/position#absolute"><code>position: absolute</code></a>) — hodí se zejména pro elementy, které absolutní posici samy od sebe potřebují, potřebujeme, aby byly <i>vyjmuty z toku dokumentu</i>. Případně se tomuto vyjmutí nevyhneme — potřebujeme například fixní posici (<code>position: fixed</code>).</p>
<p>Typický příklad je třeba <a href="/magnific-popup">CSS vyskakovací okno / lightbox</a>.</p>

<h3 id="absolutni-znama-sirka">Pevná výška/šířka</h3>
Známe li rozměry bloku (pozn. absolutně posicovaný element je vždy <code>block</code>), který se má centrovat, je potřeba zvolit jedno z následujících řešení:

<h4>1) Odečítání <code>margin</code>u</h4>
<ol>
  <li>Nastaví se posice <code>left</code> a <code>top</code> na polovinu šířky/výšky rodiče (s <code>position: relative/absolute/fixed</code>), tj. <code>50%</code>,</li>
  <li>nastaví se rozměry,</li>
  <li>polovina šířky/výšky se <i>odečte</i> záporným <code>margin</code>em.</li>
</ol>

<div class="live no-source" style="height: 300px; position: relative">
  <style>
    .absolutne-centrovany {width: 300px; height: 200px; position: absolute; top: 50%; left: 50%; margin: -100px 0 0 -150px}
  </style>
  <pre class="absolutne-centrovany"><code>.absolutne-centrovany {
  position: absolute; 
  top: 50%; left: 50%; 
  height: 200px; width: 300px;  
  margin: -100px 0 0 -150px
}</code></pre>
</div>

<p>Rozměry šířky/výšky a posunů pomocí <code>marginu</code> lze taktéž zadávat procentuálně. Nicméně <code>min/max-width</code> logicky použít nejde — byly by potřeba nějaké vlastnosti jako <code>min/max-<b>margin</b></code>, a ty neexistují.</p>

<h4 id="absolutni-margin">2) Absolutní posice + <code>margin: auto</code></h4>
<p>Pokud se elementu nastaví:</p>
<ul>
  <li>absolutní (nebo fixní) posice,</li>
  <li>všechny souřadnice na <code>0</code> (<code>left</code>, <code>right</code>, <code>bottom</code>, <code>top</code>),</li>
  <li>přidá se <code>margin: auto</code></li>
  <li>a nakonec se zadají rozměry…</li>
</ul>
<p>Element bude vycentrovaný.</p>

<div class="live no-source" style="height: 300px; position: relative">
  <style>
    .absolute-margin-centrovany {width: 300px; height: 250px; position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto}
  </style>
  <pre class="absolute-margin-centrovany"><code>.absolute-margin-centrovany {
  position: absolute; 
  top: 0; left: 0; 
  bottom: 0; right: 0; 
  margin: auto;
  height: 250px; width: 300px
}</code></pre>
</div>

<p>Výhoda tohoto řešení je, že se nemusí dopočítávat záporné <code>margin</code>y a lze použít <code>min-*</code> a <code>max-*</code> vlastnosti.</p>

<p><b>Nevýhoda</b> je <b>slabší podpora napříč prohlížeči</b> — toto řešení funguje až od <b>Internet Exploreru 8</b>, řešení <i>odečítáním</i> funguje takřka <i>všude</i>.</p>

































<h2 id="neznama-sirka-vyska">Centrování elementu s neznámou výškou a šířkou</h2>


<h3 id="zadna-znama-vyska">Žádná známá výška</h3>

<p>Je-li cílem umístit do okna (s neznámou výškou – <code>height: 100%</code>) element s neznámou výškou, od <b>Internet Exploreru 8</b> jde využít triku s pseudo-elementem <code>:before</code>.</p>

<p><a href="https://kod.djpw.cz/zagb">Živá ukázka</a></p>

<p>Element může být i <a href="/position">posicovaný</a> <a href="https://kod.djpw.cz/abgb">absolutně</a> či <a href="https://kod.djpw.cz/bbgb">fixně</a>.</p>



<h3 id="neznama-vyska">Neznámá výška obsahu</h3>
<p>V případě, že máme obal, kde přesnou výšku <b>známe</b>, a v něm vnořený obsah, u kterého ale výšku <b>neznáme</b>, jsou v zásadě tři možnosti centrování:</p>
<ol>
  <li>Použít <code>table-cell</code> hodnotu vlastnosti <code>display</code>,</li>
  <li>obsah <b>vystředit JavaScriptem</b> — ten může přeměřit <code>offsetHeight</code> a podle toho element přesně naposicovat,</li>
  <li>rozměr zadat v jednotkách, co se přizpůsobí velikosti písma (například <code>em</code>), tak <b>aby to <i>hezky vycházelo</i></b>, pochopitelně se to při nějaké změně <i>rozsype</i>.</li>
</ol>

<p>První řešení (pomocí CSS) není moc komplikované.</p>

<div class="live">
  <style>
    .table-centrovani {height: 300px; display: table-cell; vertical-align: middle}
  </style>
  <div class="table-centrovani">
    <p>Jako <i>kontejner</i> pro obsah s neznámou výškou stačí vytvořit:</p><pre><code>.table-centrovani {
    height: 300px; 
    display: table-cell; 
    vertical-align: middle
}</code></pre></div>
</div>

<p>A vše v tomto <i>kontejneru</i> bude <b>od Internet Exploreru 8</b> hezky <b>vertikálně vystředěno</b>.</p>

<h4 id="starsi-ie">Řešení pro starší prohlížeče</h4>
<p>Pro starší Explorery lze využít triku, kdy se:</p>
<ol>
  <li>použije pomocný absolutně posicovaný obal,</li>
  <li>ten se posune do poloviny (<code>top: 50%</code>)</li>
  <li>a v něm už konečný obsah, který se má centrovat, pošoupneme o polovinu zpět nahoru (<code>position: relative; top: -50%</code>)</li>
</ol>
<p>Speicální kód pro tyto staré prohlížeče lze připojit třeba <a href="/podminene-komentare">podmíněnými komentáři</a> nebo jiným hackem.</p>
<p>
  <a href="https://kod.djpw.cz/qnb">Ukázka</a> (funkční <b>jen do</b> IE 7)
</p>

<h3 id="neznama-sirka">Neznámá šířka</h3>
<p>K <b>vodorovnému centrování elementu s neznámou šířkou</b> lze použít už <a href="#text-align">výše zmíněný</a> <code>display: inline-block</code>.</p>
<p>Obě řešení není problém zkombinovat a <b>vycentrovat element s neznámou výškou i šířkou a horizontálně i vertikálně</b> najednou.</p>

<div class="live">
  <style>
  .universal-center {height: 250px; width: 300px; vertical-align: middle;
display: table-cell; text-align: center; position: relative; background: #efefef;}

.universal-center-cover {=position: absolute; top: 50%; left: 0; width: 100%}

.universal-center-inner {display: inline-block; background: #fff; padding: 1em;
=position: relative; top: -50%}
  </style>
  <div class="universal-center">
  <div class="universal-center-cover">
    <span class="universal-center-inner">
      <p>
        Centrovaný <br> obsah <br> <button onclick="this.parentNode.innerHTML = 'Obsah v jednom širokém řádku'">Změnit</button>
      </p>
    </span>
  </div>
</div>
</div>

<h4>CSS</h4>
<pre><code>.universal-center {height: 250px; width: 300px; vertical-align: middle; display: table-cell; text-align: center; position: relative; background: #efefef;}
.universal-center-cover {=position: absolute; top: 50%; left: 0; width: 100%}
.universal-center-inner {display: inline-block; background: #fff; padding: 1em; =position: relative; top: -50%}</code></pre>
<p>Pro <b>Internet Explorer 7</b> je použit rovnítkový hack (<code>=</code>).</p>

<h4>HTML</h4>
<pre><code>&lt;div class="universal-center">
  &lt;div class="universal-center-cover">
    &lt;span class="universal-center-inner">
      &lt;p>
        Centrovaný &lt;br> obsah
      &lt;/p>
    &lt;/span>
  &lt;/div>
&lt;/div></code></pre>
<p>Nevalidní použití <code>&lt;span></code>u je z důvodu neochoty přepnout ve starších Explorerech z <code>display: block</code> na <code>inline-block</code>.</p>

<h2 id="flex">Centrování flexboxy</h2>
<p>Nejelegantnější je nejspíš použití <a href="/flexbox">flexboxů</a>, jenže podpora <b>až od IE 10</b> je většinou nedostatečná.</p>

<p><a href="https://kod.djpw.cz/thnb">Živá ukázka</a></p>

<h2 id="transformace">Transformace</h2>
<p>Ještě existuje způsob s využitím CSS transformace:</p>
<pre><code>element {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%)
}</code></pre>
<p>To má nejen jako flexbox špatnou podporu, ale i může rozbíjet vyhlazování textu. <b>Raději nepoužívat</b>.</p>