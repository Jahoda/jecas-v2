---
title: "Černobílý efekt obrázku"
headline: "Černobílý styl obrázku"
description: "Jak v CSS zajistit černobílý styl běžného obrázku. Napříč prohlížeči stále panují rozdíly."
date: "2013-06-14"
last_modification: "2013-06-14"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<h2>Internet Explorer 6–9</h2>

<p>V Explorerech lze od pradávna využít vlastnost <code>filter</code>:
  
<pre><code>element {filter: gray}</code></pre>





<h2 id=chrome>Google Chrome</h2>
<p>V Chrome funguje <i>nová</i> <a href="/css-prefixy">prefixovaná</a> vlastnost <a href="/filter"><code>filter</code></a>.
<pre><code>-webkit-filter: grayscale(100%)</code></pre>






<h2 id=firefox>Firefox</h2>
<p>Ve Firefoxu pro změnu funguje zadání filtru jako <a href="/svg">SVG</a>:
<pre><code>element {
filter: url("data:image/svg+xml;utf8,&lt;svg xmlns=\'http://www.w3.org/2000/svg\'>&lt;filter id=\'grayscale\'>&lt;feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/>&lt;/filter>&lt;/svg>#grayscale")
}</code></pre>

<!-- Kód ukázky -->
<style>
.cernobily {
	filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
	filter: gray;
	-webkit-filter: grayscale(1)
}
</style>

<div class=live>
<p>Funkční v IE 6-9, Firefox, Chrome
<div class=cernobily>
	<a href=#><img src="/files/article/opera.png"></a>
</div>
</div>
<!-- / konec ukázky -->

<h2 id=ie10>Internet Explorer 10 a Opera</h2>

<p>Paradoxní situace nastává u IE 10, kde už staré dobré filtry nefungují. A nové filtry <b>ještě</b> nefungují (ani s prefixem <code>-ms-</code>). Jedno řešení je <a href="/podminene-komentare#ie10">shodit Explorer do režimu 9</a> (<code>gray</code> filtr je jeden z mála, spolu s <a href="/opacity">průhledností</a>, co takto funguje), druhé použít na stránce <code>&lt;svg></code>.</p>
<p>V Opeře pochopitelně zbývá jen druhá možnost. Taktéž řešení pomocí SVG bude funkční i v Chromu a Firefoxu (ne ale v IE 9 a starších).

<h3 id=svg>Řešení pomocí <code>&lt;svg></code> v HTML</h3>
<ol>
<li>Vytvoří se <code>&lt;svg></code> kontejner,
<li>vytvoří se nějaké ty <a href="http://blogs.msdn.com/b/ie/archive/2011/10/14/svg-filter-effects-in-ie10.aspx">filtry</a> (lze použít <a href="http://ie.microsoft.com/testdrive/Graphics/hands-on-css3/hands-on_svg-filter-effects.htm">generátor</a>),
<li>vloží se obrázek jako <code>&lt;image></code>, na který se použije výše vytvořený filter.
</ol>

<h4>Ukázka</h4>
<!-- Kód ukázky -->
<div class=live>
<svg id="svgroot" viewbox="0 0 493 100" preserveaspectratio="xMidYMin"  width="493" height="100">
	<defs>
		<filter id="pictureFilter" >
			<feColorMatrix type="matrix" values=".343 .669 .119 0 0 .249 .626 .130 0 0 .172 .334 .111 0 0 .000 .000 .000 1 0" />
			<feGaussianBlur stdDeviation="0" />
			<feColorMatrix type="saturate" values="0.1" />
		<filter />     
	</defs>
	<image x="0" y="0" width="493" height="100" xlink:href="http://diskuse.jakpsatweb.cz/img/logo.png" filter="url(#pictureFilter)"></image>
</svg>
</div>
<!-- / konec ukázky -->

<h2 id=pseudo>Pseudo černobílost</h2>
<p>Lehce podobný efekt lze vytvořit překrytím obrázku průhledným elementem s černým pozadím.

<!-- Kód ukázky -->
<style>
.jakocernobily {background: #666; display: block; width: 100px; overflow: hidden}
.jakocernobily img {opacity: .3; filter: alpha(opacity=30)}
.jakocernobily a:hover img {opacity: 1; filter: alpha(opacity=100) }
</style>

<div class=live>
<div class=jakocernobily>
	<a href=#><img src="/files/article/zmena-vzhledu.png"></a>
</div>
</div>
<!-- / konec ukázky -->

<h2 id=budoucnost>Hudba budoucnosti</h2>
<p>V budoucnu by ideálně mělo v prohlížečích fungovat prosté <code>filter: grayscale(100%)</code>, jak nyní (byť s prefixem) funguje v Chrome. Případně alespoň s prefixem pro daný prohlížeč.

<h2 id=zdroje>Zdroje a odkazy</h2>
<ul>
<li><a href="http://www.karlhorky.com/2012/06/cross-browser-image-grayscale-with-css.html">Černobílé obrázky napříč prohlížeči</a> (anglicky), <a href="http://jsfiddle.net/KDtAX/487/">ukázka</a>,
<li><a href="http://www.html5rocks.com/en/tutorials/filters/understanding-css/">O <i>nových</i> filtrech v CSS 3</a> (anglicky),
<li><a href="http://labs.voronianski.com/css3-grayscale/">Ukázka bez HTML značky <code>&lt;svg></code></a> (nefunkční v IE 10 a Opeře),
<li><a href="http://stackoverflow.com/questions/14813142/internet-explorer-10-howto-apply-grayscale-filter">Jak vytvořit černobílý filtr v IE 10</a> (anglicky),
<li><a href="http://blogs.msdn.com/b/ie/archive/2011/10/14/svg-filter-effects-in-ie10.aspx">Od Microsoftu o SVG filtrech v IE 10</a>
</ul>