---
title: "CSS @supports"
headline: "CSS pravidlo <code>@supports</code>"
description: "Pravidlem <code>@supports</code> lze v CSS testovat dostupnost CSS vlastností."
date: "2013-11-21"
last_modification: "2017-08-14"
status: 1
tags: ["css", "css-pravidla", "hacky"]
format: "html"
---

<p>Ve všech prohlížečích <b>kromě IE</b> (ani v <a href="/ie11">IE 11</a>) je funkční pravidlo <code>@supports</code>. K čemu je to dobré?</p>




<pre><code>@supports (color: #000) {
  p {color: red}
}</code></pre>






<p>Pokud prohlížeč podporuje <b>vlastnost</b> <code>color</code> a je možné jí dát <b>hodnotu</b> <code>#000</code> (a pokud podporuje <code>@supports</code>, pochopitelně), nastaví se barva odstavce na <font color=red>červenou</font>. <a href="http://kod.djpw.cz/vns">Ukázka</a>.</p>



<h2 id="zapis">Zápis</h2>

<p>Pravidla <code>@supports</code> je možné kombinovat přes přkazy:</p>
<ul>
  <li><code>and</code> (musí splňovat <b>obě</b> podmínky),</li> 
  <li><code>or</code> (musí splňovat <b>alespoň jednu</b> z podmínek),</li>
  <li><code>not</code> (<b>nesmí splňovat</b>/podporovat danou vlastnost).</li>
</ul>






<h2 id="hacky">CSS hacky</h2>


<p>Jako užitečné využití mě v zásadě napadá jen <b>odlišení stylů pro různé prohlížeče</b> (CSS hackování), protože prohlížeče zpravidla nemají s <b>neznámou deklarací problémy</b>.</p>

<p>Pro <b>Internet Explorer</b> (všech versí) využijeme toho, že <code>@supports</code> nezná. A pro ostatní prohlížeče nachystáme nějakou symbolickou podmínku (třeba testování <code>color</code>).</p>





<pre><code>element {/* vlastnosti pro IE */}
@supports (color: #000) {
  element {/* přepsání vlastností pro ostatní prohlížeče */}
}</code></pre>







<p>Pro odlišení ostatních prohlížečů stačí testovat <a href="/css-prefixy">prefixované</a> vlastnosti (projdou jen v konkrétním prohlížeči).</p>


<pre><code>/* <b>IE</b> a starší prohlížeče */
@supports (-webkit-transform: none) {/* <b>Webkit</b> */}
@supports (-moz-transform: none) {/* <b>Firefox</b> */}
@supports (-ms-ime-align:auto) {/* <b>Edge</b> */}
@supports (-o-transform: none) {/* <b>Opera</b> */}</code></pre>







<p>Na následující <a href="http://kod.djpw.cz/aos">ukázce</a> bude mít odstavec v <b>IE</b>, <b>Opeře 12</b>, <b>Firefoxu 22+</b> a <b>Chromu 28+</b> různé barvy.</p>



<h3 id="nebezpeci">Nebezpečí a problémy</h3>

<p>Udržování hacků je do budoucna poměrně náročné, a proto je ideální se jim raději vyhnout.</p>

<p>Dále se může stát, že starší minifikátor kódu bude mít se <code>@supports</code> pravidlem problém.</p>



<h2 id="js">JavaScriptové testování podpory</h2>
<p>V prohlížečích znalých <code>@suppport</code>u (kromě <b>Opery 12</b>) je možné používat i elegantní <b>testování CSS vlastností</b> v JS (<a href="http://kod.djpw.cz/eos">ukázka</a>):</p>
<pre><code>if (CSS.supports("vlastnost", "hodnota")) {
}</code></pre>
