---
title: "Pravidla ukazatele any-pointer a any-hover"
headline: "CSS pravidla <code>any-pointer</code> a <code>any-hover</code>"
description: "CSS pravidla <code>@media</code> <code>any-pointer</code> a <code>any-hover</code> slouží k detekci přesnosti a typu ovládání."
date: "2015-03-11"
last_modification: "2019-12-04"
status: 1
tags: ["css", "css-pravidla", "hotova-reseni"]
format: "html"
---

<p>Kromě toho, že se koncová zařízení pro prohlížení webových stránek liší <b>rozměry obrazovky</b> (například od cca 4" mobilů po 50" televise), odlišují se také <b>způsobem ovládání</b>. Zjednodušeně se weby ovládají:</p>

<ul>
  <li>myší,</li>
  <li>dotyky prstů,</li>
  <li>dotykovým perem (stylusem)</li>
</ul>


<p>Některá zařízení navíc umožňují způsoby ovládání kombinovat – typicky notebooky s dotykovou obrazovkou nebo tablet s připojenou myší.</p>


<p>Pro případné odlišení ovládacích prvků pomocí CSS v závislosti na <b>schopnostech ukazatele</b> byla zavedena <code>@media</code> pravidla <code>any-*</code>.</p>



<h2 id="test">Test podpory</h2>

<p>Zatím je podporuje <b>Chrome 41+</b> a <b>Opera 28+</b>.</p>

<p>V podporovaných prohlížečích budou některá z následujících políček zelená v závislosti na dostupných způsobech ovládání.</p>




<div class="live-any">
<h3><code>any-hover</code></h3>

<p class="any-hover"><code>any-hover</code></p>
<p class="any-hover-none"><code>any-hover: none</code></p>
<p class="any-hover-on-demand"><code>any-hover: on-demand</code></p>
<p class="any-hover-hover"><code>any-hover: hover</code></p>  

<h3><code>any-pointer</code></h3>

<p class="any-pointer"><code>any-pointer</code></p>
<p class="any-pointer-coarse"><code>any-pointer: coarse</code></p>
<p class="any-pointer-fine"><code>any-hover: fine</code></p>

<h3><code>hover</code></h3>

<p class="hover-hover"><code>hover: hover</code></p>
<p class="hover-none"><code>hover: none</code></p>
</div>


<p><a href="https://kod.djpw.cz/rypb">Samostatná živá ukázka</a> – rozlišení dotykového zařízení a ovládání myší</p>


<h2 id="zapis">Zápis</h2>


<pre><code>@media (any-hover: hover) {
  /* zařízení je schopno :hoveru */
}</code></pre>


<p>Pravidla <code>any-*</code> se dělí na <code>hover</code> (najetí) a <code>pointer</code> (ukazatel).</p>



<h2 id="hover"><code>any-hover</code></h2>

<p>První pravidlo dokáže detekovat, jestli je zařízení schopno <code>:hover</code>u.</p>


<dl>
  <dt id="any-hover"><code>@media (any-hover)</code></dt>
  <dd>
    <p>Zařízení dokáže nějak hover vytvořit.</p>
  </dd>
  
  <dt id="any-hover-none"><code>@media (any-hover: none)</code></dt>
  <dd>
    <p>Hover není podporován.</p>
  </dd>
  
  <dt id="any-hover-on-demand"><code>@media (any-hover: on-demand)</code></dt>
  <dd>
    <p>Hover je možné vyvolat, byť komplikovanějším způsobem. Typicky mobilní prohlížeče vyvolávají <code>:hover</code> po <b>delším podržení prstu</b>.</p>
  </dd>  
  
  <dt id="any-hover-hover"><code>@media (any-hover: hover)</code></dt>
  <dd>
    <p>Zařízení nemá žádný limit ve vyvolávání hoveru. Typicky počítač/notebook/tablet s myší.</p>
  </dd>  
</dl>


<h2 id="pointer"><code>any-pointer</code></h2>

<p>Pravidlo <code>any-pointer</code> slouží k vytvoření podmínky na <b>přesnost ukazatele</b>.</p>

<dl>
  <dt id="any-pointer"><code>@media (any-pointer)</code></dt>
  <dd>
    <p>Zařízení má nějaký ukazatel.</p>
  </dd>
  
  <dt id="any-pointer-coarse"><code>@media (any-pointer: coarse)</code></dt>
  <dd>
    <p>Přesnost ukazatele není nic moc (<i lang="en">coarse</i> je anglicky <i>hrubý</i>). Týká se zejména ovládání prsty u dotykových obrazovek (mobily,  tablety, …).</p>
  </dd> 
  
  
  <dt id="any-pointer-fine"><code>@media (any-pointer: fine)</code></dt>
  <dd>
    <p>Ukazatel je velmi přesný. Typicky ovládání myší na desktopu/notebooku.</p>
  </dd>   
</dl>




<h2 id="hover"><code>hover</code></h2>

<p>Existuje ještě pravidlo <code>hover</code> bez <code>any</code>:</p>

<pre><code>@media (hover: hover) {
    /* primární ovládání umí hover (myš/touchpad) */
}

@media (hover: none) {
    /* primární ovládání neumí hover (dotyková obrazovka) */
}</code></pre>


<p>Dle specifikace by <code>hover</code> mělo znamenat, že primární ovládání umí <i lang="en">hover</i>, zatímco <code>any-hover</code>, že nějaký způsob ovládání umí <i lang="en">hover</i>.</p>

<p>V praxi se mi nepodařilo zpozorovat rozdíl.</p>



<h2 id="detekce-dotyku">Detekce dotykové obrazovky</h2>

<p>Asi nejzajímavější využití <code>any-hover</code> a <code>any-pointer</code> je detekce dotykového způsobu ovládání, které je jinak obtížně proveditelné.</p>

<p>Jde sice provést něco jako:</p>

<pre><code>if ('ontouchstart' in window) {
  // podporuje dotyky
}</code></pre>





<p>Ale to skončí positivně i na noteboocích s dotykovou obrazovkou, kde je připojena myš / dostupný trackpoint nebo touchpad.</p>


<p>Detekovat <code>:hover</code> by se zase nabízelo například při <code>onmousemove</code>. Tuto událost ale z důvodů kompatibility provádějí i dotyková zařízení. Při <i>tapnutí</i> se vyvolají následující události v uvedeném pořadí:</p>

<ol>
  <li>touchstart</li>
  <li>touchmove</li>
  <li>touchend</li>
  <li>mouseover</li>
  <li>mousemove</li>
  <li>mousedown</li>
  <li>mouseup</li>
  <li>click</li>
</ol>






<p>Nabízí se tak pro určení <i>hoveru</i> na stránce poslouchat pohyb myši (<code>mousemove</code>) a v případě, že nejde o pohyb mezi <code>touchstart</code> a <code>click</code>, považovat zařízení za schopné hoveru.</p>

<div class="live-any">
<h3>Toto zařízení</h3>

<p id="touchTest"><code>Podporuje dotyky</code></p>
<p id="hoverTest"><code>Podporuje hover</code></p>
</div>

<p><a href="https://kod.djpw.cz/bzpb">Samostatná živá ukázka</a> – detekce podpory dotyků a hoveru v JavaScriptu</p>

<p>Hlavní problém této detekce je v tom, že se provede až v okamžiku, když návštěvník <b>pohne myší</b>.</p>

<!-- stará ukázka: https://kod.djpw.cz/azpb -->

<!--
<p>Mohlo by se zdát, že by šla použít událost <code>mouseenter</code>. I tu ale dotyková zařízení dokáží vyvolat.</p>

<p><a href="https://kod.djpw.cz/rzpb">Živá ukázka</a> – detekce hoveru pomocí <code>mouseenter</code></p>
-->



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Dev.Opera: <a href="https://dev.opera.com/blog/opera-28/">Opera 28 released</a></li>
  
  <li>Dev.Opera: <a href="https://dev.opera.com/articles/media-features/">Interaction Media Features and their potential (for incorrect assumptions)</a></li>
  
  <li>Frontendisti.cz: <a href="https://www.facebook.com/groups/frontendisti/permalink/1658422237702627/">Detekce dotykové obrazovky</a></li>
  
  <li>CSS specifikace: <a href="http://dev.w3.org/csswg/mediaqueries-4/#any-input">any-pointer and any-hover</a></li>
  
  <li><a href="https://googlechrome.github.io/samples/media-hover-pointer/">'any-pointer' and 'any-hover' Media Queries Sample</a></li>
</ul>


<style>
.live-any p {
    background: #FF9999;
    padding: .5em .3em;
    display: inline-block;
}
  .live-any code {
    background: none;
  }
/* any-hover */
@media (any-hover) {
	.live-any .any-hover {background: #99FF99}
}
@media (any-hover: none) {
	.live-any .any-hover-none {background: #99FF99}
}
@media (any-hover: on-demand) {
	.live-any .any-hover-on-demand {background: #99FF99}
}
@media (any-hover: hover) {
	.live-any .any-hover-hover {background: #99FF99}
}
@media (hover: hover) {
	.live-any .hover-hover {background: #99FF99}
}  
@media (hover: none) {
	.live-any .hover-none {background: #99FF99}
}  

/* any-pointer */
@media (any-pointer) {
	.live-any .any-pointer {background: #99FF99}
}
@media (any-pointer: coarse) {
	.live-any .any-pointer-coarse {background: #99FF99}
}
@media (any-pointer: fine) {
	.live-any .any-pointer-fine {background: #99FF99}
}
</style>


<script>
if ('ontouchstart' in window) {
    touchTest.style.background = "#99FF99";
}

var clicked;
var moveTest = function() {
    if (!clicked) {
        hoverTest.style.background = "#99FF99";
        document.documentElement.removeEventListener("mousemove", moveTest);
        document.documentElement.removeEventListener("touchstart", moveTest);
        document.documentElement.removeEventListener("click", moveTest);        
    }
};

document.documentElement.addEventListener("mousemove", moveTest);

document.documentElement.addEventListener("touchstart", function() {
    clicked = true;
});

document.documentElement.addEventListener("click", function() {
    clicked = false;
});  
</script>