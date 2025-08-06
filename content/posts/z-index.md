---
title: "Z-index"
headline: "Z-index"
description: "K čemu je CSS vlastnost <code>z-index</code> a jak mít v jejím užívání systém."
date: "2015-10-04"
last_modification: "2018-01-04"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>Vlastnost <code>z-index</code> slouží pro upravení chování <b>překrývání elementů přes sebe</b>. Písmeno <code>z</code> v názvu značí osu Z.</p>

<p>Má vliv pouze na <a href="/position">posicované</a> elementy, tj. hodnota <code>position</code> jiná než výchozí <code>static</code> (například <code>absolute</code>, <code>relative</code> nebo <code>fixed</code>).</p>


<h2 id="vychozi">Výchozí chování <code>z-index</code>u</h2>

<p>Výchozí chování CSS je takové, že element později umístěný v <a href="/html">HTML</a> kódu bude nejvíc nahoře (nejvíc vepředu v ose Z).</p>

<p>Čtvereček na ukázce tak překryje <i>první element</i>:</p>

<div class="live">
  <style>
    .relativni-1 {
      position: relative;
    }
    .absolutni-1 {
      position: absolute;
      top: 2em;
      width: 1em;
      height: 1em;
      background: #1081DD;
    }
  </style>
  <p class="relativni-1">První element</p>
  <div class="absolutni-1"></div>
</div>

<p>Při opačném pořadí v kódu bude čtvereček <b>pod</b> <i>druhým elementem</i>:</p>

<div class="live" style="position: realtive">
  <div class="absolutni-1"></div>
  <p class="relativni-1">Druhý element</p>  
</div>

<p>Toto chování překrývání se týká pouze nestaticky posicovaných prvků. Cokoliv s výchozím <code>position: static</code> bude překryto čímkoliv s <code>relative</code>/<code>absolution</code>/<code>fixed</code>, <b>nezávisle na umístění v kódu</b>:</p>


<div class="live" style="position: realtive">
  <div class="absolutni-1"></div>
  <p>Druhý element se statickou posicí</p>  
</div>


<h2 id="zapis">Zápis <code>z-index</code>u</h2>

<p>Hodnoty <code>z-index</code>u nabývají následujících hodnot:</p>

<dl>
  <dt id="auto"><code>auto</code></dt>
  <dd>
    <p>Výchozí hodnota. Totéž jako žádný <code>z-index</code>.</p>
  </dd>
  <dt id="zaporny"><code>z-index: -1</code></dt>
  <dd>
    <p>Záporný <code>z-index</code> typicky vede ke schování elementu za obsah.</p>
  </dd>
  <dt id="kladny"><code>z-index: 1</code></dt>
  <dd>
    <p>Kladná hodnota potom zajistí posun elementu před ostatní.</p>
  </dd>
  <dt id="nula"><code>z-index: 0</code></dt>  
  <dd>
    <p>Pouze vytvoří novou <i>skupinu</i>, ve které se počítají <code>z-index</code>y.</p>
  </dd>
</dl>

<h3 id="nula-auto">Rozdíl mezi <code>z-index: auto</code> a <code>0</code></h3>

<p>Na první pohled se může zdát, že hodnoty <code>auto</code> i <code>0</code> dělají to samé. Tedy nedělají nic.</p>

<p>Není tomu tak. Nulová hodnota způsobí vytvoření nové skupiny.</p>

<p>Vlastnost <code>z-index</code> totiž postihuje i vnořené nestatické elementy uvnitř svého rodiče.</p>

<p>V případě neuvedení <code>z-indexu</code> nebo <code>z-index: auto</code> bude světlemodrý element, který je potomkem tmavěmodrého, překrývat růžový element (protože 1000 > 1).</p>

<p><img src="/files/z-index/z-index-auto.png" alt="Z-index: auto" class="border"></p>















<p>V případě uvedení <code>z-index: 0</code> by se vytvořila z tmavěmodrého elementu nová skupina, kde se úrovně počítají od nuly a nebylo by tak možné se z ní dostat nad růžový element:</p>


<p><img src="/files/z-index/z-index-0.png" alt="Z-index: 0" class="border"></p>




















<h2 id="test">Test chování <code>z-index</code>u</h2>

<p>Překrývání elementů při změně <code>z-index</code>u je možné pozorovat na následující ukázce.</p>


<div class="live nosource zIndexLive" style="min-height: 190px">

  <div class="z-index">
      <div class="prvni"><code>auto</code><br><button onclick="umisteni(this, -1)">&minus;</button><button onclick="umisteni(this, 1)">+</button></div>
    <div class="druhy"><code>auto</code><br><button onclick="umisteni(this, -1)">&minus;</button><button onclick="umisteni(this, 1)">+</button></div>
    <div class="treti"><code>auto</code><br><button onclick="umisteni(this, -1)">&minus;</button><button onclick="umisteni(this, 1)">+</button></div>
  </div>
</div>  


<h2 id="system">Systém v indexech</h2>


<p>Docela problematické je udržet v číslech indexů nějaký systém. Typicky kodér v momentě, kdy potřebuje něco překrýt, použije nějaké číslo v řádu desítek nebo stovek, aby měl jistotu, že to zafunguje. Třeba:</p>

<pre><code>.ikona {
  z-index: 999;
}</code></pre>



<p>Potom je například potřeba přidat na stránku fixní lištu:</p>

<pre><code>.lista {
  z-index: 10;
}</code></pre>





<p>A problém bude na světě. Drobná ikonka bude překrývat lištu.</p>

<p>Potenciálně problematické elementy lze rozdělit do následujících skupin:</p>

<ol>
  <li>Drobné posicované elementy.</li>
  
  <li><a href="/fixed">Fixní</a> lišty a panely.</li>
  
  <li><a href="/lightbox">Lightboxy</a> a překryvná okna.</li>
  
  <li>Dialogová okna, <a href="/vlastni-alert">hlášky</a>, <a href="/css-spinner">indikace načítání</a>.</li>
</ol>


<p>Teoreticky by se mohlo nabízet mít pro každou skupinu stanovené rozmezí. Například:</p>

<pre><code>.obycejny-element {z-index: 100}
.fixni-lista {z-index: 200}
.lightbox {z-index: 300}
.hlaska {z-index: 400}
.nacitani {z-index: 401}</code></pre>






<p>Bohužel při používání stylů a skriptů třetích stran kvůli tomu může nastat problém.</p>


<p>Lepší postup mi tak přijde držet <code>z-index</code> co nejnižší (podobně jako sílu <a href="/css-selektory">CSS selektorů</a>) a zvedat ho po jedničkách, když už nejde jinak.</p>


<p>Vysoký <code>z-index</code> jde případně v jistém smyslu <a href="#nula-auto"><i>resetovat</i></a> přidáním obalu s nízkým nebo nulovým <code>z-index</code>em. I to má ale problém, protože se potom z vnořeného elementu nepůjde dostat <i>výš</i>, ani kdyby to bylo potřeba.</p>


<h2 id="min-max">Minimální/maximální hodnota</h2>

<p>Podle specifikace je hodnota <code>z-index</code>u typu <i>integer</i>. To znamená rozsah od &minus;2 147 483 648 až do 2 147 483 647.</p>

<p>Maximální hodnota je tedy <b>2147483647</b>. Využívají toho některé externí skripty třetích stran (třeba fixní lišta „ověřeno zákazníky“ od Heureka), které si webmasteři připojují do stránky. Zajistí se tak v případě posicování překrytí původního obsahu.</p>

<p>Některé starší prohlížeče se liší v této maximální hodnotě:</p>

<ul>
  <li>Maximální hodnota v <b>Safari 3</b> a starších je <b>16777271</b>.</li>
  <li><b>Firefox 2</b> a starší při překročení hodnoty <b>2147483647</b> skryje element.</li>
  <li><b>Firefox 3</b> při překročení nastaví hodnotu na <b>0</b>.</li>
  <li>Ostatní prohlížeče berou překročení jako maximální hodnotu integeru.</li>
</ul>
  
  
<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li><a href="http://bitsofco.de/2015/how-z-index-works/">How z-index Works</a></li>
</ul>  

<style>
.z-index div {position: absolute; width: 100px; height: 100px;
    text-align: center; padding-top: 1em; color: #fff; border-radius: 50%; box-sizing: border-box}
.sz-index div:hover {border: 2px solid #000; margin: -2px}
.z-index p {background: #fff}
.prvni {background: #0D6AB7; left: 5px; top: 5px}
.druhy {background: #DA3F94; left: 90px; top: 5px}
.treti {background: #1081DD; left: 50px; top: 80px}
</style>
<script>
function umisteni(el, smer) {
var parent = el.parentNode;
var kod = parent.getElementsByTagName("code")[0];
var value = kod.innerHTML;
if (value == "auto") {
  value = (smer == 1) ? 0 : -1;
}
else if ((value == 0 && smer == -1) || (value == -1 && smer == 1)) {
  value = "auto";
}
else {
  value = parseInt(value) + smer;
}
kod.innerHTML = value;
parent.style.zIndex = value;
}
</script>
<style>
  .live {
    position: relative;
  }
  .zIndexLive {
    background: transparent;
  }
  .zIndexLive button {
    transition: .2s;
  }
  .zIndexLive button:hover {
    background: #fff;
        color: #000;
  }
</style>
  
