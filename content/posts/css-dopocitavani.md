---
title: "Dopočítávání CSS hodnot"
headline: "Dopočítávání CSS hodnot"
description: "Jak funguje dopočítávání hodnot v kaskádových stylech."
date: "2014-11-25"
last_modification: "2014-12-03"
status: 1
tags: ["css", "napady"]
format: "html"
---

<p>Zajímává součást CSS je doplňování neuvedených vlastností a hodnot.</p>



<h2 id="ctyri">Čtyři strany</h2>

<p>První případ je nastavování hodnot pro <b>čtyři strany</b>, typicky pro vlastnosti <code>padding</code>, <a href="/margin"><code>margin</code></a>, <code>border-color/width/style</code>, <code>outline-color/width/style</code> a podobně.</p>

<p>Tyto vlastnosti jsou <b>zkratkami</b> pro <code>*-top</code>, <code>*-right</code>, <code>*-bottom</code> a <code>*-left</code> (v uvedeném pořadí).</p>

<p>Zapíšeme-li:</p>

<pre><code>div {
  margin: 1em 2em 3em 4em;
}</code></pre>

<p>Je to ekvivalent (nezkráceného) zápisu.</p>

<pre><code>div {
  margin-top: 1em;
  margin-right: 2em;
  margin-bottom: 3em;
  margin-left: 4em;
}</code></pre>

<p>Společná vlastnost (zkratka) ale může mít nastaveno kromě čtyř hodnot i méně — 3, 2 nebo jednu.</p>











<h3 id="jedna">Jedna hodnota</h3>

<pre><code>div {
  margin: <b>1em</b>;
}</code></pre>

<p>Nastaví <b>všem stranám</b> totéž:</p>

<pre><code>div {
  margin-top: <b>1em</b>;
  margin-right: <b>1em</b>;
  margin-bottom: <b>1em</b>;
  margin-left: <b>1em</b>;
}</code></pre>


<div class="internal-content">
<p>Jedna hodnota nastavená na <code>auto</code> se často používá při <a href="/centrovani#margin-auto">centrování</a>.</p>
</div>








<h3 id="dve">Dvě hodnoty</h3>

<pre><code>div {
  margin: <b>1em</b> <i>2em</i>;
}</code></pre>

<p>První hodnota nastaví obě svislé vlastnosti (<code>*-top</code> a <code>*-bottom</code>), druhá potom vodorovné (<code>*-right</code> a <code>*-left</code>).</p>

<pre><code>div {
  margin-top: <b>1em</b>;
  margin-right: <i>2em</i>;
  margin-bottom: <b>1em</b>;
  margin-left: <i>2em</i>;
}</code></pre>










<h3 id="tri">Tři hodnoty</h3>

<pre><code>div {
  margin: 1em <i>2em</i> <b>3em</b>;
}</code></pre>

<p>Od dvou hodnot se liší tím, že třetí hodnota přepíše <code>*-bottom</code>. Vodorovné hodnoty (<code>*-right</code>/<code>*-left</code>) se budou rovnat – podle druhé hodnoty:</p>

<pre><code>div {
  margin-top: 1em;
  margin-right: <i>2em</i>;
  margin-bottom: <b>3em</b>;
  margin-left: <i>2em</i>;
}</code></pre>















<h2 id="zkratky">Zkratky</h2>

<p>Zajímavé věci se potom dějí u zkratek více vlastností s ohledem na <b>výchozí/zděděné hodnoty</b>.</p>

<p>Třeba následující kód vytvoří (nejspíš) <span style="border: solid">3 pixely tlustý černý rámeček</span>. <a href="https://kod.djpw.cz/kiib">Nevěříte</a>?</p>

<pre><code>div {
  border: solid;
}</code></pre>

<p>Cca tři pixely (<code>medium</code>) jsou výchozí tloušťka rámečku a barva se zdědí z <a href="/currentcolor"><code>currentColor/color</code></a>.</p>




<h2 id="resetovani">Resetování</h2>

<p>Použití <i>zkratky</i> má další zajímavý efekt — <b>zresetuje nenastavené specifické vlastnosti</b>.</p>

<pre><code>div {  
  border-width: 10px;
  border-style: solid;
  border-color: red;
  border: dotted;
}</code></pre>

<p>Tento <code>&lt;div></code> tedy nebude mít <span style="border: 10px dotted red">10px tečkovaný červený rámeček</span>, ale <span style="border: dotted">3px tečkovaný černý</span>. Všechny konkrétnější deklarace se přepíší – <a href="https://kod.djpw.cz/liib">ukázka</a>.</p>

<p>Poznámka: <b>IE 7</b> a starší neuvedené hodnoty neresetují, ale dědí, takže ukázka v nich bude 10px tlustá, červená a <b>tečkovaná</b> (<code>dotted</code>).</p>









<h2 id="poradi">Záleží na pořadí?</h2>

<p>CSS se snaží fungovat chytře a <b>hádat</b> vlastnosti, ke kterým hodnota patří. Tento kód proto vytvoří <span style="border: red solid 5px">5px rámeček</span>, ačkoliv je pořadí značně <b>nestandardní</b> (obyvykle se uvádí obráceně – tloušťka styl barva).</p>

<pre><code>div {
  border: red solid 5px;
}</code></pre>

<p>Je až možná trochu překvapivé, jak často se dá z <b>kontextu</b> odvodit, co daná hodnota nastavuje.</p>

<p>Není ale asi úplně šťastné na to spoléhat. Třeba u nastavování písma nebude následující kód fungovat podle očekávání:</p>

<pre><code>div {
  font: 'Arial';
}</code></pre>

<p>Při použití zkratky <code>font</code> musí být vždy uvedena minimálně <b>velikost a písmo</b>.</p>













<h2 id="zneplatneni">Zneplatnění</h2>

<p>CSS funguje v prohlížečích tak, že když v deklaraci vlastnosti nejde něco <b>čemu nerozumí</b>, celou deklaraci <b>zahodí</b>.</p>

<pre><code>div {
  border: 1px solid <b>neznamaBarva</b>;
}</code></pre>

<p>Jde toho využít pro <a href="/hacky">hack</a> <b>starších prohlížečů</b>.</p>

<p>Zajímavé využití zmínil <a href="http://webylon.info"><b>Chamurappi</b></a> na <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=19&amp;topic=160223#4">Diskusi JPW</a>, kdy se použije <a href="/vice-obrazku#multiple-backgrounds">„vícenásobný“ obrázek</a> pro rozhodnutí, zda se má vložit <b>PNG/SVG</b>. Vícenásobná pozadí fungují stejně jako SVG od <b>IE 9</b>, takže starší prohlížeče nastavení SVG obrázku zahodí.</p>

<pre><code>.symbol {
  background: url("symbol.png");
  background: url("symbol.svg"), transparent;
}</code></pre>

<div class="internal-content">
  <ul>
    <li><a href="/svg#fallback">SVG fallbacky</a> – přehled všech možných způsobů</li>
  </ul>
</div>