---
title: "Zjištění barvy obrázku"
headline: "Zjištění barvy obrázku"
description: "Jak v JavaScriptu i PHP zjistit hlavní barvu obrázku."
date: "2014-02-23"
last_modification: "2016-03-18"
status: 1
tags: ["JavaScript", "Hotová řešení", "Obrázky", "PHP"]
---

V řadě případů se může hodit automaticky určit **barvu obrázku**:

  - určení **barvy produktu v e-shopu**,

  - nastavení barvy **ladící k obrázku**,

  - určení barvy **kontrastní k obrázku**

## Zjištění barvy v JavaScriptu

V JavaScriptu je nejsnazší použít `&lt;canvas>` – nakreslit do něj zkoumaný obrázek zmenšený do velikosti 1 × 1. Barva tohoto pixelu potom bude něco jako **průměrná barva obrázku** (ve skutečnosti záleží na použitém algoritmu pro zmenšování obrázků).

Je nutné, aby obrázek **byl ze stejné domény** nebo zapsaný pomocí *data URL*. Ukázka pro několik obrázků:

  #zjisteniBarvy img {border-right: 3em solid transparent;}

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

[Živá ukázka](http://kod.djpw.cz/imvb)

### Dominantní barva

Zjistit **průměrnou barvu obrázku** nemusí být vždy úplně ideální. V případě hodně kontrastního obrázku budou **průměrné barvě** vzdáleny obě barvy.

Proto je zajímavější hledat **převládající barvu**. Případně některé barvy **ignorovat** – pokud jsou například obrázky produktů focené na **bílém pozadí**, je ideální toto pozadí nebrat v úvahu.

    - [RGBaster](https://github.com/briangonzalez/rgbaster.js) – knihovna pro hledání **dominantní barvy**
    
    - [jquery.adaptive-backgrounds.js](https://github.com/briangonzalez/jquery.adaptive-backgrounds.js) – jQuery plugin využívající RGBaster
    
    - [Color Thief](https://github.com/lokesh/color-thief) – knihovna pro hledání dominantní nebo representativní barevné palety

## PHP

Implementace hledání dominantní barvy existují i v PHP:

    - [Color Thief PHP](https://github.com/ksubileau/color-thief-php)

Jak je vidět na výsledku, zjištění dominantní barvy přináší lepší výsledky:

Kromě převládající barvy jde zjistit i barevnou paletu obrázku:

Zjistit převládající barvu může být hodně výpočetně náročné.

Pokud obrázky nahrává uživatel, nabízí se *využít* jeho výpočetní výkon a barvu určovat na straně klienta pomocí JavaScriptu.

### Průměrná barva v PHP

Výpočetně rychlejší je zjištění průměrné barvy a někdy mohou být výsledky uspokojivé. Jde toho docílit projitím všech pixelů [JPG](/format-obrazku#jpg) obrázku.

```
function averageColor($sourceImage) {
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
}
```

Použití:

```
&lt;?php
$sourceImage = "obrazek.jpg";
$color = averageColor($sourceImage);
?>
&lt;img src="&lt;?=$sourceImage?>" style="
	background: rgb(&lt;?=implode(',', $color)?>)
">
```