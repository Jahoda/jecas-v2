---
title: "Zjištění barvy obrázku"
headline: "Zjištění barvy obrázku"
description: "Jak v JavaScriptu i PHP zjistit hlavní barvu obrázku."
date: "2014-02-23"
last_modification: "2016-03-18"
status: 1
tags: ["hotova-reseni", "js", "obrazky", "php"]
format: "html"
---

<p>V řadě případů se může hodit automaticky určit <b>barvu obrázku</b>:</p>

<ol>
  <li>určení <b>barvy produktu v e-shopu</b>,</li>
  
  <li>nastavení barvy <b>ladící k obrázku</b>,</li>
  
  <li>určení barvy <b>kontrastní k obrázku</b></li>
</ol>


<h2 id="js">Zjištění barvy v JavaScriptu</h2>

<p>V JavaScriptu je nejsnazší použít <code>&lt;canvas></code> – nakreslit do něj zkoumaný obrázek zmenšený do velikosti 1 × 1. Barva tohoto pixelu potom bude něco jako <b>průměrná barva obrázku</b> (ve skutečnosti záleží na použitém algoritmu pro zmenšování obrázků).</p>

<p>Je nutné, aby obrázek <b>byl ze stejné domény</b> nebo zapsaný pomocí <i>data URL</i>. Ukázka pro několik obrázků:</p>

<div class="live no-source" id="zjisteniBarvy">
  <img src="/files/barva-obrazku/1.jpg">
  <img src="/files/barva-obrazku/2.jpg">
  <img src="/files/barva-obrazku/3.jpg">
  <canvas id="cc" style="display: none"></canvas>
  <style>
  #zjisteniBarvy img {border-right: 3em solid transparent;}
  </style>
  <script>
    function barvaObrazku(img) {
        var canvas = document.getElementById("cc");
        var ctx = canvas.getContext("2d");
        canvas.width = 1;
        canvas.height = 1;
        ctx.drawImage(img, 0, 0, 1, 1);
        var pixel = ctx.getImageData(0, 0, 1, 1);
        var p = pixel.data; 
        var barva = p[0] + "," + p[1] + "," + p[2];    
        return "rgb(" + barva + ")";
    }  
    var images = zjisteniBarvy.querySelectorAll("img");
    for (var i = images.length; i--;) {
      images[i].style.borderColor = barvaObrazku(images[i]);
    }
  </script>
</div>
<p><a href="https://kod.djpw.cz/imvb">Živá ukázka</a></p>


<h3 id="dominantni">Dominantní barva</h3>

<p>Zjistit <b>průměrnou barvu obrázku</b> nemusí být vždy úplně ideální. V případě hodně kontrastního obrázku budou <b>průměrné barvě</b> vzdáleny obě barvy.</p>

<p>Proto je zajímavější hledat <b>převládající barvu</b>. Případně některé barvy <b>ignorovat</b> – pokud jsou například obrázky produktů focené na <b>bílém pozadí</b>, je ideální toto pozadí nebrat v úvahu.</p>


<div class="external-content">
  <ul>
    <li><a href="https://github.com/briangonzalez/rgbaster.js">RGBaster</a> – knihovna pro hledání <b>dominantní barvy</b></li>    
    <li><a href="https://github.com/briangonzalez/jquery.adaptive-backgrounds.js">jquery.adaptive-backgrounds.js</a> – jQuery plugin využívající RGBaster</li>    
    <li><a href="https://github.com/lokesh/color-thief">Color Thief</a> – knihovna pro hledání dominantní nebo representativní barevné palety</li>
  </ul>
</div>

<h2 id="php">PHP</h2>

<p>Implementace hledání dominantní barvy existují i v PHP:</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/ksubileau/color-thief-php">Color Thief PHP</a></li>
  </ul>
</div>

<p>Jak je vidět na výsledku, zjištění dominantní barvy přináší lepší výsledky:</p>

<p><img class="border" src="/files/barva-obrazku/dominantni-barva.jpg" alt="Dominantní barva obrázku"></p>




















<p>Kromě převládající barvy jde zjistit i barevnou paletu obrázku:</p>

<p><img class="border" src="/files/barva-obrazku/paleta.jpg" alt="Barevná paleta obrázku"></p>





















<p>Zjistit převládající barvu může být hodně výpočetně náročné.</p>

<p>Pokud obrázky nahrává uživatel, nabízí se <i>využít</i> jeho výpočetní výkon a barvu určovat na straně klienta pomocí JavaScriptu.</p>


<h3 id="prumerna">Průměrná barva v PHP</h3>

<p>Výpočetně rychlejší je zjištění průměrné barvy a někdy mohou být výsledky uspokojivé. Jde toho docílit projitím všech pixelů <a href="/format-obrazku#jpg">JPG</a> obrázku.</p>

<pre><code>function averageColor($sourceImage) {
	$image = imagecreatefromjpeg($sourceImage);
	$colors = array("r" => 0, "g" => 0, "b" => 0);
	$total = 0;
	for ($x = 0; $x &lt; imagesx($image); $x++) {
		for ($y = 0; $y &lt; imagesy($image); $y++) {
			$rgb = imagecolorat($image, $x, $y);
			$colors["r"] += ($rgb >> 16) & 0xFF;
			$colors["g"] += ($rgb >> 8) & 0xFF;
			$colors["b"] += $rgb & 0xFF;
			$total++;
		}
	}
	return array(
		round($colors["r"] / $total),
		round($colors["g"] / $total),
		round($colors["b"] / $total)
	);
}</code></pre>

<p>Použití:</p>

<pre><code>&lt;?php
$sourceImage = "obrazek.jpg";
$color = averageColor($sourceImage);
?>
&lt;img src="&lt;?=$sourceImage?>" style="
	background: rgb(&lt;?=implode(',', $color)?>)
"></code></pre>

<!--
<h2 id="odkazy">Odkazy jinam</h2>

<ul>
</ul>-->