---
title: "Posicování v CSS"
headline: "CSS vlastnost <code>position</code>"
description: "CSS rozlišuje statickou, relativní, absolutní a fixní posici. K čemu je co dobré?"
date: "2013-09-09"
last_modification: "2015-10-06"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<h2 id=static>Statická (<code>position: static</code>)</h2>

<p>Výchozí hodnota všech elementů. Má tedy smysl jen pro <i>přebíjení</i> dříve přenastavených hodnot…</p>

<p>Vlastnosti <code>top</code>, <code>left</code>, <code>right</code> a <code>bottom</code> jsou ignorovány.</p>




<h2 id="relative">Relativní (<code>position: relative</code>)</h2>

<p>Umožňuje snadno posunout element ze svého přirozeného umístění.</p>

<pre><code>element {position: relative; top: -2px; left: -2px}</code></pre>



<p class="live">Tučné <b id="reltest" style="position: relative; top: -2px; left: -2px">slovo</b> je relativně posunuto o 2 pixely nahoru a vlevo.</p>
<script>var reltest = document.getElementById("reltest");</script>

<p><button onclick="reltest.style.position = reltest.style.position == 'relative' ? 'static' : 'relative'">Zapnout/vypnout relativní posici</button></p>



<h3>Využití</h3>

<p>Občas se hodí k <a href="/stejne-vysoke-sloupce#ramecek">drobným posunům</a>, výhoda je, že relativním posunem <b>není ovlivňován</b> žádný další prvek na stránce — tudíž všechno ostatní zůstane na svém místě. Relativně posicovaný element zabere na původním místě prostor, ale klidně je ve skutečnosti někde jinde.</p>

  <p>Problém ale může být, že výchozí umístění relativně posicovaného elementu <b>je ovlivňována okolím</b>, proto je <code>position: relative</code> krajně nevhodné třeba pro stavbu celého layoutu, ač by se to na první pohled mohlo zdát jako dobrý nápad.</p>

<style>
.relativni-layout div {background: #efefef; padding: 10px; border: 1px solid #ccc;
  margin: 10px; line-height: 20px}

.levy {width: 100px}
.pravy {width: 400px; position: relative;
  top: -52px; left: 130px
}
</style>
<div class="live relativni-layout" id="relayout">
  <div class="levy">Levý</div>
  <div class="pravy">Pravý</div>
</div>
<script>var relayout = document.getElementById("relayout").getElementsByTagName("div")[0];</script>

<p>Nicméně stačí <button onclick="relayout.innerHTML = relayout.innerHTML == 'Levý' ? 'Levý<br>dlouhý' : 'Levý'">přidat nějaký obsah</button> do levého sloupce, což změní výšku, což odsune pravý element níže, a celá <i>křehká sestava</i> se rozpadne.</p>

<p>Občas se relativní posun může hodit k <b>rychlému <i>zalepení</i> rozhozeného vzhledu</b>, ale z výše uvedeného důvodu to moc systémové řešení není.</p>

<p>Mnohem častěji se <code>position: relative</code> používá při posicování absolutním pro omezení rámce, kde se absolutně posicuje.</p>


<h2 id="absolute">Absolutní (<code>position: absolute</code>)</h2>

<p>Zatímco elementy s hodnotami <code>static</code> a <code>relative</code> jsou ovlivňovány okolím a stejně tak okolní elementy ovlivňují – <i>zabírají jim místo</i> – <b>absolutní posice</b> element <b>vyjme z běžného toku dokumentu</b>.</p>

<p>Najednou se všechno s neabsolutní posicí začne (skoro) chovat jako by tam absolutně posicovaný element vůbec nebyl.</p>

<pre><code>element {position: absolute; top: -5px; left: 20px}</code></pre>
<p class="live" style="position: relative">Tučné <b style="position: absolute; top: -5px; left: 20px" id="abstest">slovo</b> je absolutně umístěno.</p>
<script>var abstest = document.getElementById("abstest");</script>

<p><button onclick="abstest.style.position = abstest.style.position == 'absolute' ? 'static' : 'absolute'">Zapnout/vypnout absolutní posici</button></p>





<h3 id=hranice>Hranice</h3>

<p>Konkrétní umístění (vlastnosti <code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code>) se nepočítají nijak náhodně, ale od nejbližšího elementu, který <i>vytváří hranice</i> — to je libovolný nadřazený element s <code>position: relative</code>, <code>position: absolute</code> nebo <code>position: fixed</code>.</p>

<p>Nejvyšší hranicí je <i>okno prohlížeče</i>, proto v případě, že se na stránce relativní nebo absolutní posice zatím nepoužívají, přidání čemukoliv <code>position: absolute; left: 0; top: 0</code> <i>vyhodí</i> tento element do levého horního rohu.</p>



<h3>Bez umístění</h3>

<p>Zvláštní případ použití je <code>position: absolute</code> bez zadání konkrétního umístění (<code>left</code>, <code>top</code>, <code>bottom</code>, <code>right</code>). V takovém případě zůstane element na svém místě, ale neovlivňuje své okolí.</p>

<p class="live" style="position: relative">Tučné <b style="position: absolute" id="abstest2">slovo</b> je absolutně umístěno bez umístění.</p>
<script>var abstest2 = document.getElementById("abstest2");</script>

<p><button onclick="abstest2.style.position = abstest2.style.position == 'absolute' ? 'static' : 'absolute'">Zapnout/vypnout absolutní posici</button></p>


<h3>Využití</h3>

<p>Absolutní posicování má výhodu, že lze obsah v kódu uvedený někde na konci umístit na začátek stránky. Rovněž se <code>position: absolute</code> hodí všude tam, kde je potřeba něco umístit na přesné místo, <b>nezávisle na okolí</b>.</p>

<p>Na druhou stranu to může být i nevýhoda — absolutně posicovaný element je vyjmut z toku dokumentu, a tudíž <b>nemůže reagovat na změny rozměrů</b> ostatních prvků.</p>

<p>Absolutní posici jde teoreticky i <a href="/stejne-vysoke-sloupce#absolute">relativně rozumně</a> využít ke stavbě rozložení stránky, i když obtékání bývá zpravidla výhodnější.


  
    
  
<h2 id="fixed">Fixní posice (<code>position: fixed</code>)</h2>

<p>Poslední druh umístění je fixní. To je dobré k tomu, když má nějaký element být viděn neustále (nezávisle na případném odrolování stránky).</p>


<p><small>Tato vlastnost není podporovaná v Internet Exploreru běžícím v <a href="/doctype#quirk">QUIRK režimu</a>.</small></p>


<p>Od absolutního posicování se kromě fixování elementu liší ještě v tom, že cokoliv s <code>position: fixed</code> má jako <i>hranici</i> okno prohlížeče. Tedy <b>není možné vytvořit <i>hranici</i> vlastní</b>.</p>



<h3>Využití</h3>

<p>Fixovaná posice se hodí pro neustále viditelnou navigaci, hlavičku či nějakou reklamu.</p>
<p>Nastavit element jako fixní je také možné až v momentě, kdy by měl <a href="/sidebar">zmizet z viditelné části obrazovky</a> (obdobně se dá i vytvořit <a href="/fixni-menu">fixní menu</a>).</p>



<h2 id="sticky">Sticky posice (<code>position: sticky</code>)</h2>

<p>Nejnovější hodnota vlastnosti <code>position</code> sloužící k přilepení elementu ke kraji okna při scrollování. Věnuje se jí celý samostatný článek:</p>

<div class="internal-content">
  <ul>
    <li>
      <a href="/position-sticky">Jak funguje CSS <code>position: sticky</code></a>
    </li>
  </ul>
</div>


<h2 id="z-index">Překrývání <code>z-index</code></h2>
<ul>
  <li>
    <p>Jednotlivé elementy se mohou překrývat, což řeší vlastnost <code>z-index</code>.</p>
  </li>

  <li>
    <p>Bez jejího použití jsou nejvýše ty elementy, které jsou <b>později v kódu</b>. Jejím užitím lze toto chování změnit.</p></li>

  <li>
    <p>V případě <b>záporné hodnoty</b> (např. <code>z-index: -1</code>) se absolutně posicovaný element dostane za běžný text.</p></li>
  
  <li>
    <p>Vlastnost <code>z-index</code> se projeví <b>jen</b> u elementů s absolutní, relativní nebo fixní posicí. Pokud je tedy překrýváno něco, co nechceme, a není to posicované, řešení je přidat <code>position: relative</code> a vyšší <code>z-index</code>.</p>
  
    <p>Relativní posice totiž bez uvedení <code>left</code>/<code>top</code>/<code>bottom</code>/<code>right</code> <b>nezmění umístění elementu</b>. Je ale třeba dát pozor na to, že <code>position: relative</code> změní počátek pro posicování <b>absolutní</b>.</p>
  </li>
</ul>

<h3>Ukázka</h3>
<p>Jednotlivé elementy jsou v kódu v pořadí červená, modrá, zelená; kliknutím lze <code>z-index</code> zvýšit.</p>

<div class="live no-source" style="position: relative; min-height: 100px">
  <div class="z-index">
  <div class="prvni" onclick="umisteni(this)">0</div>
  <div class="druhy" onclick="umisteni(this)">0</div>
  <div class="treti" onclick="umisteni(this)">0</div>
</div>
</div>

<p>Jak je vidět z ukázky, při nastavování <code>z-index</code>ů je třeba myslet na to, že <i>pozdější vyhrává</i>.</p>

<p>Další zajímavosti ohledně <code>z-index</code>u jsou v anglickém článku:</p>

<div class="external-content">
  <ul>
    <li><a href="http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/what-you-may-not-know-about-the-z-index-property/">What You May Not Know About the Z-Index Property</a> – co jste možná nevěděli o vlastnosti <code>z-index</code></li>
  </ul>
</div>


<h2 id="tlbr"><code>top</code>, <code>left</code>, <code>bottom</code>, <code>right</code></h2>

<p>CSS vlastnosti <code>top</code>, <code>left</code>, <code>bottom</code> a <code>right</code> se používají pouze pro posicování.</p>

<p>U statického elementu (<code>position: static</code>) nedělají nic.</p>

<p>Hodnota za těmito vlastnostmi určuje <b>vzdálenost</b> shora (<code>top</code>), zleva (<code>left</code>), zdola (<code>bottom</code>), zprava (<code>right</code>).</p>

<p>Následující element bude <b>10 pixelů</b> od horní hranice vymezené nadřazeným posicovaným elementem.</p>

<pre><code>element {
  position: absolute;
  top: 10px;
}</code></pre>


<h3 id="zaporna">Záporná hodnota</h3>

<p>Délková hodnota může být i záporná, tím se element dostane <b>mimo hranice</b> (v případě, že nebude oříznut pomocí <code>overflow: hidden</code>).</p>

<pre><code>element {
  position: absolute;
  top: <b>-10px</b>;
}</code></pre>







<h3 id="stoprocent">100% hodnota</h3>

<p>Někdy se používají konstrukce:</p>

<pre><code>top: 100%</code></pre>

<p>Tím se horní hrana absolutně posicovaného elementu dostane přesně pod dolní hranu posicovaného rodiče.</p>

<p>Analogicky to funguje pro <code>left</code>, <code>bottom</code> a <code>right</code>.</p>





<h3 id="priorita">Priorita směrů</h3>

<ul>
  <li>Umístění zleva (<code>left</code>) má přednost před <code>right</code>.</li>
  <li>Umístění shora (<code>top</code>) má přednost před <code>bottom</code>.</li>
</ul>

<p>Tento element tedy bude umístěn 10 pixelů zleva a shora:</p>

<pre><code>element {
  width: 10px;
  height: 10px;
  <b>left: 10px;</b>
  right: 10px;
  <b>top: 10px;</b>
  bottom: 10px;
}</code></pre>









<p><a href="https://kod.djpw.cz/kuqb">Živá ukázka</a> – přebíjení směrů posicování</p>

<p>Jde si tím <b>zkrátit zápis při posicování dvou prvků</b>, kdy jeden má být vlevo a druhý vpravo:</p>

<pre><code>.levy, .pravy {
  position: absolute;
  right: 0;
  width: 10px;
  /* další společné styly */
}
.levy {
  left: 0;
}</code></pre>









<p>Nemusí se tak psát:</p>

<pre><code>.levy, .pravy {
  …
  left: 0;
}
.pravy {
  left: auto;
  right: 0;
}</code></pre>








<p>Toto chování platí pouze pro případ, že <b>absolutně posicovaný element  má nastaveny rozměry</b>. V opačném případě uvedení hodnot všech stran způsobí <b>roztažení</b>.</p>

<p><a href="https://kod.djpw.cz/muqb">Živá ukázka</a> – roztažení elementu</p>

  <style>
.z-index div {position: absolute; width: 50px; height: 50px;
  text-align: center; line-height: 50px; color: #fff; cursor: pointer;
  z-index: 0; border-radius: 50%}
.z-index div:hover {border: 2px solid #000; margin: -2px}
.z-index p {background: #fff}
.prvni {background: red; left: 5px; top: 5px}
.druhy {background: blue; left: 45px; top: 5px}
.treti {background: green; left: 25px; top: 40px}
  </style>
  <script>
function umisteni(el) {
  el.innerHTML++;
  el.style.zIndex = el.innerHTML;
}
  </script>