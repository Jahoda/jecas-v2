---
title: "CSS mapa s popisky"
headline: "Body s popisky na mapě"
description: "Statická obrázková mapa s vlastními body a <code>:hover</code> popisky."
date: "2013-05-12"
last_modification: "2013-05-12"
status: 1
tags: ["css", "hotova-reseni", "mapy"]
format: "html"
---

<div class="live">
<!-- CSS ukázky -->
<style>
.map {position: relative; width: 600px; height: 350px}
.map ul {list-style: none}
.map li {position: absolute; background: #107FDB; ; border: 1px solid transparent}
.map .about {display: none; margin: 0}
.map li > a {text-decoration: none; color: #fff; font-weight: bold; position: relative; padding: 0 20px 0 2px; background: #107FDB}
.map li > a span {position: absolute; top: 50%; margin-top: -5px; right: 2px; background: #fff; width: 10px; height: 10px; border: 1px solid #107FDB}
.map .right > a {padding: 0 2px 0 20px}
.map .right > a span {left: 2px;}
.map li:hover .about {display: block; padding: .3em; background: #fff; border: 1px solid #ccc}
.map li:hover > a {background: #107FDB}
.map li:hover {border-color: #fff}
</style>

<!-- HTML kód ukázky -->
<div class='map'>
    <img src='/files/body-na-mape/mapa-cr.png' ismap>
    <ul>
        <li style='left: 450px; top: 200px'><a href='#1'>Vidlákov<span></span></a> <p class='about'>Navržená struktura organizace ve značné míře podmiňuje vytvoření forem působení.</p>
        <li style='left: 90px; top: 180px'><a href='#2'>Prdelákov<span></span></a> <p class='about'>Tímto způsobem počátek každodenní práce na poli formování pozice.</p>
        <li style='left: 280px; top: 300px' class='right'><a href='#3'>Psojedy<span></span></a> <p class='about'>(<a href='http://www.youtube.com/watch?v=tb4GO21hSGM'>nejsou na mapě</a>)</p>
        <li style='left: 360px; top: 140px' class='right'><a href='#4'>Kolín<span></span></a> <p class='about'>Krátký popis</p>
        <li style='left: 250px; top: 110px'><a href='#5'>Kotěhůlky<span></span></a> <p class='about'>Popis</p>
    </ul>
</div>
<!-- / konec ukázky -->
</div>

<h2>Hlavní vlastnosti</h2>
<ol>
	<li>Nezávislé na JS,
	<li>rozumný HTML kód – jednotlivé body jsou seznam:
		<pre><code>&lt;ul>
	&lt;li>&lt;a href="">Název bodu&lt;span>&lt;/span>&lt;a> 
	&lt;p class='about'>Popis&lt;/p>
&lt;/ul></code></pre>
      <li>částečná použitelnost při <b>nedostupnosti obrázku</b>,
	<li>jednoduchá modifikace nepřílišnou závislostí na obrázku (nemusí se body do mapy natvrdo překreslovat).
	<li>funkční od IE 7 včetně.
</ol>

<h2>Řešení</h2>
<ul>
  <li>Relativně <a href="/position">posicovaný</a> kontejner o rozměru obrázku,
	<li>absolutně posicované položky seznamu (body na mapě),
      <li>při <code>:hover</code>u na <code>&lt;li></code> se objevuje odstavec s <a href="/tooltip">popisem</a>,
        <li>samotný bod je prázdný <code>&lt;span></code> s rozměry 10 × 10 px, zakulacení lze od IE 9 včetně řešit vlastností <code><a href="/border-radius">border-radius</a></code> v šířce čtverečku,
	<li>pomocí třídy <code>.right</code> lze přepnout umístění čtverečku zleva do prava.
</ul>


<h2 id='souradnice'>Zjištění souřadnic</h2>
<p>Souřadnice lze zjistit pomocí atributu <a href='/ismap'><code>ismap</code></a> (souřadnice by se měli zobrazovat ve stavovém řádku prohlížeče za otazníkem a mřížkou<a href="#note1">*</a>).</p>
<a href='#'><img src='/files/body-na-mape/mapa-cr.png' ismap style="cursor: crosshair"></a>
<p>A dle toho vhodně upravit umístění:
<pre><code>&lt;li style='left: <font color=green>250px</font>; top: <font color=red>110px</font>'>&lt;a href='#5'>Místo&lt;span></span></a> &lt;p class='about'>Popis&lt;/p></code></pre>


<ul class='notes'>
	<li id='note1'>Pokud se neobjevuje stavový řádek, po kliknutí se souřadnice přenesou do řádku adresního.
</ul>