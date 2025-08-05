---
title: "CSS obrázková galerie"
headline: "Jednoduchá galerie v CSS"
description: "Galerie obrázků bez JavaScriptu pomocí CSS."
date: "2013-10-10"
last_modification: "2013-10-10"
status: 1
tags: ["css", "hotova-reseni", "obrazky"]
format: "html"
---

<p>Pro <b>obrázkovou galerii</b> o pár obrázcích může stačit prosté řešení čistě v HTML a CSS.</p>

<style>
  .large a:hover {background: none}
  .large div:target {outline: none}  
</style>

<div class="live">
<style>
  /* zrušení orámování odkazu v Exploreru */
  img {border: 0;}
  a:focus {outline: 0}
  .large {height: 400px; overflow: hidden; position: relative;}
  .large div {height: 400px; width: 600px; position: relative;}
  .large div a {position: absolute; top: 0; height: 100%; width: 50%; text-decoration: none; background: url('http://img.dummy-image-generator.com/abstract/dummy-600x400-Circus-plain.jpg') -1000px -1000px no-repeat; /* nějaký obrázek, jinak plocha nekliká v Exploreru */}
  .large div a span {position: absolute; top: 190px; padding: 10px; line-height: 20px; width: 30px; background: #fff; color: #000; visibility: hidden}
  .large div a:hover span {visibility: visible;}
  .large div a.next, .large div a.next span {right: 0}
  .large div a.prev, .large div a.prev span {left: 0}
  
  .thumb {margin-top: 1em}  
  .thumb a {margin-right: 10px; border: 5px solid #000; display: inline-block;}
  .thumb img {display: block; width: 120px; height: 80px}
  .thumb a:hover {border-color: red;}  
</style>

<div class='large'>
	<div id="prvni">
		<img src='http://img.dummy-image-generator.com/abstract/dummy-600x400-Circus-plain.jpg'>
		<a href="#druhy" class='next'><span>&gt;</span></a>
	</div>
	<div id="druhy">
		<a href="#prvni" class='prev'><span>&lt;</span></a>
		<img src='http://img.dummy-image-generator.com/abstract/dummy-600x400-Rope-plain.jpg'>
		<a href="#treti" class='next'><span>&gt;</span></a>
	</div>
	<div id="treti">
		<a href="#druhy" class='prev'><span>&lt;</span></a>
		<img src='http://img.dummy-image-generator.com/abstract/dummy-600x400-Comb-plain.jpg'>
	</div>		
</div>
<div class='thumb'>
	<a href='#prvni'><img src='http://img.dummy-image-generator.com/abstract/dummy-600x400-Circus-plain.jpg'></a>
	<a href='#druhy'><img src='http://img.dummy-image-generator.com/abstract/dummy-600x400-Rope-plain.jpg'></a>
	<a href='#treti'><img src='http://img.dummy-image-generator.com/abstract/dummy-600x400-Comb-plain.jpg'></a>
</div>  
</div>

<p>Galerie využívá obalu s nastavenou výškou a <code>overflow: hidden</code>, ve kterém jsou obrázky, na které lze odkázat <code>#kotvou</code> — v takovém případě prohlížeč <i>odroluje</i> na požadovaný obrázek. V novějších prohlížečích (od <b>IE9</b>) by šlo použít <a href="/css-selektory#zamereni">selektor</a> <a href="/zvyrazneni-kotvy"><code>:target</code></a>.</p>

<p>Jelikož jsou všechny obrázky <b>v plné velikosti přímo na stránce</b>, načtou se všechny při vstupu na stránku a nemá tedy příliš smysl řešit vytváření náhledů (maximálně kvůli lepší ostrosti miniatur).</p>
<p>Tento postup je výhodný v tom, že při prohlížení <b>budou všechny obrázky už načtené</b>, nevýhoda je <b>plýtvání daty</b> v případě, kdy návštěvník všechny obrázky zvětšit nechce.</p>

<p>Pro <b>více obrázků na jedné stránce</b> je proto nejspíš vhodnější <a href="/magnific-popup">lightbox galerie</a> — Magnific Popup umí dokonce řídit, kolik obrázků se má přednačítat.</p>