---
title: "Horní a dolní index v HTML"
headline: "Horní a dolní index v HTML"
description: "Pro zapisování horních a dolních indexů slouží v HTML značky <code>&lt;sup></code> a <code>&lt;sub></code>."
date: "2015-08-22"
last_modification: "2015-08-22"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<div class="live">
  Horní<sup>index</sup> a 
  dolní<sub>index</sub>
</div>

<p>Používání indexů pomocí značek <code>&lt;sup></code> a <code>&lt;sub></code> by mělo mít <b>sémantický význam</b>, není tedy vhodné tyto elementy používat pouze pro <b>odlišení vzhledu</b>.</p>



<h2 id="sup">Horní index <code>&lt;sup></code></h2>

<p>Název z anglického <i lang="en">superscript</i>. Značka pro horní index je občas použitelná pro:</p>

<ul>
  <li><p>zápis <b>čtverečních metrů</b> – <span class="live">10 m<sup>2</sup></span>, případně i metrů (nebo jiných jednotek) krychlových – <span class="live">10 mm<sup>3</sup></span></p></li>  
  
  <li><p><b>odkaz na zdroj</b> – <span class="live">dolní index<sup><a href="#sub">1</a></sup></span>, což používá například <b>Wikipedie</b>.</p></li>    
  
  <li><p>zápis <b>matematických příkladů</b> – <span class="live">5 * 3<sup>2</sup></span></p></li>
  
  <li><p><b>anglické číslovky</b> – <span class="live">1<sup>st</sup></span>, <span class="live">2<sup>nd</sup></span>, <span class="live">3<sup>rd</sup></span>, <span class="live">4<sup>th</sup></span></p></li>
</ul>

<p>Použití <b>horního indexu</b> jde často obejít použitím zvláštního symbolu / <a href="/entity">HTML entity</a>:</p>

<ul>  
  <li><code>&amp;sup1;</code> – na první&sup1;</li>
  
  <li><code>&amp;sup2;</code> – na druhou&sup2;</li>
  
  <li><code>&amp;sup3;</code> – na třetí&sup3;</li>
</ul>

<p>U dolního indexu nebo jiných čísel než 1, 2 a 3 obdobný postup neexistuje.</p>

<p><a href="http://www.it-joker.cz/"><b>Joker</b></a> na <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=4&amp;topic=164295#3">diskusi</a> doplnil, že <b>Unicode</b> obsahuje zvláštní blok <a href="http://www.fileformat.info/info/unicode/block/superscripts_and_subscripts/list.htm">Superscripts and subscripts</a>, který obsahuje (mj.) znaky pro číslice horních i dolních indexů.</p>



<h2 id="sub">Dolní index <code>&lt;sub></code></h2>

<p>V angličtině <i lang="en">subscript</i>. Spodní index má využití hlavně u <b>chemických vzorců</b> – například <span class="live">N<sub>2</sub>O</span>.</p>



<h2 id="typografie">Typografie</h2>

<p>Při oželení <b>perfektní typografie</b> se jde bez horního/dolního indexu obejít a psát <span class="live">10 m2</span>, <span class="live">5 * 3^2</span> nebo <span class="live">N2O</span>, ale nebude to vypadat tak dobře.</p>

<h2 id="stylovani">Stylování indexů</h2>

<p>Z pohledu CSS je <code>&lt;sup></code>/<code>&lt;sub></code> řádkový element (<a href="/display#inline"><code>display: inline</code></a>) s menším písmem (<a href="/font#size"><code>font-size</code></a>) a odlišným zarovnání na řádku – <code>vertical-align</code>.</p>

<p>Do podoby horního/dolního indexu tak jde snadno nastylovat cokoliv jiného:</p>


<div class="live">
<style>
  .index {font-size: 80%}
  .index--horni {vertical-align: super}
  .index--dolni {vertical-align: sub}
</style>
  <p>Horní<span class="index index--horni">index</span> a dolní<span class="index index--dolni">index</span></p>
</div>

<p>V hodnotách <code>vertical-align</code> je trochu zrada, protože pro <b>dolní index</b> se CSS hodnota jmenuje stejně jako značka – <code>sub</code>.</p>

<pre><code>.index--dolni {vertical-align: sub}</code></pre>

<p>Pro <b>horní index</b> to je ale <code>super</code>.</p>

<pre><code>.index--horni {vertical-align: super}</code></pre>



<h2 id="vyska-radku">Rozhozená výška řádků</h2>

<p>Použití indexů pomocí značek <code>&lt;sup></code> a <code>&lt;sub></code> trpí tím, že mění výšku celého řádku. U entit <code>&amp;sup2;</code> a <code>&amp;sup3;</code> problém není:</p>

<p><img src="/files/horni-dolni-index/vyska-radku.png" alt="Rozhození výšky řádku" class="border"></p>










<p><a href="https://kod.djpw.cz/gfpb">Živá ukázka</a></p>


<p>Existuje několik možných řešení:</p>

<ol>
  <li>
    <p><b>Nulová výška řádku</b> (funkční od <b>IE 8</b>)</p>
    <pre><code>sup, sub {
  line-height: 0;
}</code></pre>
  </li>
  
  <li>
    <p><b>Relativní posicování</b> – indexy se nejprve zarovnají do základní posice (<code>baseline</code>) a potom relativně posunou:</p>
    
    <pre><code>sub, sup {
  vertical-align: baseline;
  position: relative;
  top: 0.4em
}
sup {top: -0.4em}</code></pre>
    
    
    
  
    <p>Tento postup funguje i v prastarých <b>IE</b>.</p>
    
  <p><a href="https://kod.djpw.cz/hfpb">Srovnávací ukázka</a></p>
    
    
  </li>
  
  
  <li>
    <p><b>Kombinace</b> – nástroj <a href="http://necolas.github.io/normalize.css/">Normalize.css</a> obsahuje následující:</p>
    
    <pre><code>sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {top: -0.5em}
sub {bottom: -0.25em}</code></pre>    
    
    
    
    
    
    
    
    
    <p>Nevím přesně proč, protože předchozí dva jednodušší postupy fungují.</p>
  </li>
</ol>


<h2 id="zapamatovat">Jak si zapamatovat <code>&lt;sup></code> a <code>&lt;sub></code></h2>

<p>Rozlišit co je horní a dolní index jde i bez znalosti angličtiny podle umístění bříška posledního písmena. Když je bříško nahoře, jde o index horní <code>&lt;sup></code>, když dole, tak spodní <code>&lt;sub></code>.</p>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/html/text.html#sub">Úprava textu</a></li>
  
  <li>Lukáš Havrlant: <a href="http://atd.havrlant.net/stylovani-hornich-a-dolnich-indexu.html">Stylování horních a dolních indexů</a></li>
  
  <li>DevDocs: <a href="http://devdocs.io/html/element/sub"><code>&lt;sub></code></a>, <a href="http://devdocs.io/html/element/sup"><code>&lt;sup></code></a></li>
  
  <li>CSS Tricks: <a href="https://css-tricks.com/snippets/css/prevent-superscripts-and-subscripts-from-affecting-line-height/">Prevent Superscripts and Subscripts from Affecting Line-Height</a></li>
</ul>