---
title: "Float v CSS"
headline: "Obtékání v CSS"
description: "Detailní popis obtékání (<code>float</code>) a clearování v CSS, stavba stránky pomocí obtékání, vysvětlení možných risik a úskalí."
date: "2013-09-17"
last_modification: "2013-09-24"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>K čemu je <code>float</code>? Zjednodušeně řečeno je to způsob, <b>jak dostat různé elementy stránky vedle sebe</b>.</p>

<h2>Vlastnost <code>float</code></h2>

<p><i>Rozplavání</i> elementu se zajistí hodnotou <code>float</code>, může mít tři hodnoty:</p>
<ul>
  <li><code>none</code> (výchozí; element neplave),</li>
  <li><code>left</code> (element se snaží <i>doplavat</i> co nejvíce doleva)</li>
  <li><code>right</code> (totéž, co <code>left</code>, jen plave doprava)</li>
</ul>

<h2 id="clear">Vlastnost <code>clear</code></h2>
<p>Vlastnost <code>clear</code> slouží k tomu, aby element <i>ukončil obtékání</i>, tj. takový element (a všechny elementy následující) se nebude snažit připlout k předcházejícím s <code>float: left</code> nebo <code>float: right</code>.</p>
<p>Clear může nabývat 4 hodnoty:</p>
<ul>
  <li><code>none</code> (výchozí),</li>
  <li><code>left</code> (element neobtéká elementy s <code>float: left</code>)</li>
  <li><code>right</code> (neobtéká elementy s <code>float: <b>right</b></code>)</li>
  <li><code>both</code> (neobtéká nic)</li>
</ul>

<p>Nejlepší je si to vyzkoušet:</p>
<!-- http://kod.djpw.cz/hbc -->
<div class="live">
<script>
function obnovit() {
  var prvni = document.getElementById("prvni");
  var druhy = document.getElementById("druhy");
  var treti = document.getElementById("treti");
  
  var oddil = document.getElementById("obal").
                getElementsByTagName("div");
  
  for (var i = 0; i < oddil.length; i++) {
    var vlastnost = oddil[i].getElementsByTagName("select");
    oddil[i].style.cssText = "float: " + vlastnost[0].value +
      "; clear: " + vlastnost[1].value;
  }
}
</script>
<style>
.obal {padding: 10px; background: #8CCBF0}

.obal p, .obal ul {padding: 0; margin: 0; list-style: none}
.obal div {padding: 10px; border: 1px solid #efefef; width: 150px;
  
}

.prvni {background: #E36FAF}
.druhy {background: #34A3E4}
.treti {background: #7F8DCD}  
</style>
<div class="obal" id="obal">
  <div class="prvni" id="prvni"><p>První element</p>
    <ul>
      <li><code>float:</code>
        <select onchange="obnovit()">
          <option value="none">none</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </li>
      <li><code>clear:</code>
        <select onchange="obnovit()">
          <option value="none">none</option>
          <option value="both">both</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </li>
    </ul>
  </div>
  <div class="druhy" id="druhy"><p>Druhý element</p>
  <ul>
      <li><code>float:</code>
        <select onchange="obnovit()">
          <option value="none">none</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </li>
      <li><code>clear:</code>
        <select onchange="obnovit()">
          <option value="none">none</option>
          <option value="both">both</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </li>
    </ul>
  </div>
  
  <div class="treti" id="treti"><p>Třetí element</p>
  <ul>
      <li><code>float:</code>
        <select onchange="obnovit()">
          <option value="none">none</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </li>
      <li><code>clear:</code>
        <select onchange="obnovit()">
          <option value="none">none</option>
          <option value="both">both</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </li>
    </ul>
  </div>
</div>
</div>

<h3>Zajímavé poznatky ohledně obtékání a <code>clear</code>ování</h3>
<ol>
  <li>Budou-li mít všechny elementy nastaveny <code>float</code> jinak než na <code>none</code>, <b><i>vyplavou</i> z rodičovského elementu</b> — proti tomu lze použít právě vlastnosti <code>clear</code>.</li>
  <li>Má-li element s nastaveným <code>clear</code>em zároveň <code>float</code>, vyplavání nezabrání.</li>
  <li>Nastavením prvnímu elementu <code>float: right</code> a druhému <code>float: left</code> lze <b>prohodit pořadí sloupců</b>.</li>
  <li>Pokud se elementy <b>do dostupného místa nevejdou</b>, obtékání se očekávaným způsobem neprojeví.</li>
  <li>Element s nastaveným <code>float</code>em se stane blokovým, je-li ve výchozím stavu řádkový, proto je zbytečné nastavovat <code>display: block</code>.</li>
  <li>Ve starších prohlížečích než Explorer 8 nelze <code>clear</code>ovat s <code>inline</code> elementem.</li>
</ol>

<h2 id="layout">Jednoduchý <code>float</code>ovaný layout</h2>
<p>Jednoduchý dvousloupcový layout stránky pomocí obtékání může vypadat následovně (ještě je přidáno <a href="/centrovani#centrovani-stranky">centrování</a>):</p>
<p><a href="http://kod.djpw.cz/rec" class="button">Ukázka</a>
  <p><i>(<a href="/stejne-vysoke-sloupce#obrazek">Stejně vysoké sloupce</a> by šlo vyřešit obrázkem.)</i></p>
<h3>HTML</h3>
<pre><code>&lt;div class="stranka">
	&lt;div class="hlavicka">
		&lt;p>Logo&lt;/p>
	&lt;/div>
	&lt;div class="obsah">
		&lt;h1>Název stránky&lt;/h1>
		&lt;p>Obsah&lt;/p>
	&lt;/div>
	&lt;div class="menu">
		&lt;ul>
			&lt;li>&lt;a href="#">Odkaz&lt;/a>&lt;/li>
		&lt;/ul>
	&lt;/div>
	&lt;div class="paticka">
		&lt;p>Patička&lt;/p>
	&lt;/div>
&lt;/div></code></pre>
<h3>CSS</h3>
<pre><code>.stranka {margin: auto; width: 960px; background: #ccc}
.hlavicka {background: #1081DD; padding: 1em}
.obsah {float: right; width: 600px; padding-left: 30px; background: #E36FAF}
.menu {float: left; width: 330px;  background: #0E5EAD}
.paticka {clear: both; background: #7F8DCD; padding: 1em}</code></pre>

<h3>Poznámky</h3>
<ul>
  <li>Při <b>počítání šířky</b>, je-li použit i <code>padding</code> nebo <code>border</code>, je třeba dát pozor na <a href="/box-model"><code>box-model</code></a>.</li>
  <li>Po obtékaných (<code>float</code>ovaných) elementech je <b>nutno <code>clear</code>ovat</b>.</li>
</ul>

<h2 id="clearovani">Clearování</h2>
<p>Kromě obyčejného <b>ukončení obtékání</b> přes <code>clear: both</code> (<code>&lt;div style="clear: both"&gt;&lt;/div&gt;</code>) existují ještě další možnosti.</p>

<dl>
  <dt id="br"><code>&lt;br clear=all&gt;</code></dt>
  <dd><p>V dobách před CSS mohli <i>plavat</i> například obrázky a <code>&lt;br clear=all&gt;</code> jejich obtékání ukončovalo.</p>
  <p>Funguje dodnes a je to velmi rychlý způsob, jak obtékání ukončit.</p></dd>
  <dt id="overflow"><code>overflow: hidden</code></dt>
  <dd><p>U clearování pomocí přenastavení <code>overflow</code> z výchozí hodnoty <code>visible</code> (<code>overflow: hidden|auto|scroll</code>) pro rodiče <code>float</code>ovaných elementů je skoro s podivem, že to funguje.</p>
    <p>Vhodné řešení, pokud se nám nechce / není možné <b>měnit HTML kód</b> (<a href="http://kod.djpw.cz/sec">ukázka</a>).</p>
    <pre><code>&lt;div style="overflow: hidden"&gt;
  &lt;div style="float: left; width: 50%"&gt;&lt;/div&gt;
  &lt;div style="float: right; width: 50%"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
  </dd>
  <dt id="after"><code>.rodic:after</code></dt>
  <dd><p>Od <b>Internet Exploreru 8</b> lze centrovat elementem vytvořeným <a href="/css-selektory#before-after">pseudo-elementem <code>:after</code></a>.</p>
  <pre><code>.rodic:after {
	content: ".";
	display: block;
	clear: both;
	visibility: hidden;
	line-height: 0;
	height: 0;
}</code></pre>
    <p>Ve starších Explorerech lze <code>clear</code>ovat <a href="/haslayout">zapnutím <code>hasLayout</code>u</a>, tedy například:</p>
    <pre><code>.rodic {
	zoom: 1
}</code></pre>
    <p>Tím získáme rovněž řešení, kdy se nemusí zasahovat do HTML kódu a přidávat <i>čistič</i> (<a href="http://kod.djpw.cz/cfc">ukázka</a>).</p>
  </dd>
</dl>

<h2 id="obtekany-textem">Element (obrázek) obtékaný textem</h2>
<style>
.v-textu {width: 300px}
.obtekany {width: 50px; height: 50px; margin-right: 10px; background: #34A3E4; float: left}
</style>
<p class=v-textu>Umístíme-li nějaký element s <code>float</code>em <span class="obtekany"></span><b>do běžného textu</b>, text bude kolem elementu obtékat. Může to být například i obrázek.</p>

<h3 id=zacatek-konec>Obtékaný elment před nebo za textem</h3>
<p>V případě, že obtékaný text má být úplně vlevo nebo úplně vpravo od textu, řešení je následující:</p>
<style>
  .pred-za {list-style: none}
  .pred-za .obtekany {width: 15px; height: 15px}
</style>
<ul class=pred-za>
  <li><span class="obtekany" style="float: left"></span>Má-li být vlevo, umístí se do kódu před text s <code>float: left</code>.</li>  
  <li><span class="obtekany" style="float: right"></span>Má-li být vpravo, umístí se do kódu před text s <code>float: right</code>.</li>
</ul>


<h2 id="presne-obtekani">Přesné nepravidelné obtékání</h2>
<script>
function prohodit(element, trida) {
	element.className = element.className == trida ? "" : trida;
}
</script>
<style>
.presne-obtekani {
  width: 400px;
  background: #F4F4F4 url(http://jecas.cz/files/float/kimi.jpg) right top no-repeat;
}

  .zvyraznit u {background: rgba(255, 255, 255, .5); margin-left: -4px; border-left: 4px solid red}

.presne-obtekani u {
  float: right;
  clear: right;
  height: 2em;
}

.w2 {width: 2em}
.w3 {width: 3em}
.w4 {width: 4em}
.w5 {width: 5em}
.w6 {width: 6em}
.w7 {width: 7em}
.w8 {width: 8em}
.w9 {width: 9em}
.w10 {width: 10em}
.w11 {width: 11em}
</style>
<div class="presne-obtekani">
  <div>
    <u class="w4"></u>
    <u class="w5"></u>
    <u class="w5"></u>
    <u class="w5"></u>
    <u class="w4"></u>
    <u class="w5"></u>
    <u class="w6"></u>
    <u class="w9"></u>
    <u class="w11"></u>
    <p>Text obtékající relativně přesně obrázek. Obrázek je nastaven jako 
      <code>background: url(obrazek.jpg)</code> rodiči, kde je tento text.<p>
    <p>V kódu před textem jsou elementy s <code>float: right</code> a různou šířkou, 
      které zabírají prostor nad částí obrázku, která nemá být překryta.</p>
    <p><button onclick='prohodit(this.parentNode.parentNode, "zvyraznit")'>Zvýraznit <i>překážející</i> elementy</button></p>
  </div>  
</div>
<p><a href="http://kod.djpw.cz/dfc" class="button">Samostatná ukázka</a></p>

<h2 id="neznama-sirka">Obtékání s neznámou šířkou</h2>
<p>Mohou se obtékat i <b>elementy s neurčenou šířkou</b>, je to ale takové nejisté, neb nevíme, kdy se ten či ten element roztáhne a sloupce tak skončí nechtěně pod sebou.</p>

<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li><a href="http://www.jakpsatweb.cz/css/float.html">Floatování na JPW</a></li>
  
  <li><a href="http://bitsofco.de/2015/how-floating-works/">How Floating Works</a> – jak funguje obtékání</li>
</ul>