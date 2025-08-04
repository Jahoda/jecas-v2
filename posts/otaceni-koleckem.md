---
title: "Zoomování kolečkem"
headline: "Směr rolování kolečkem"
description: "Jak podle směru otáčení kolečka myši měnit velikost obsahu."
date: "2014-11-15"
last_modification: "2015-02-02"
status: 1
tags: ["JavaScript", "Hotová řešení", "JS události"]
---

Například u obrázku může být šikovné umožnit jeho zvětšení/zmenšení na základě směru **točení kolečka myši**.

## Připojení události

Obsluha události pro zachytávání točení kolečka se liší ve **Firefoxu** a ostatních prohlížečích.

```
&lt;div 
  id="idecko" 
  **onmousewheel**="zoom(event)"
>
```

Připojení téže funkce `zoom` pro **Firefox** s využitím [`addEventListener`](/pripojeni-udalosti#event-listener):

```
if (document.addEventListener) { 
  var div = document.getElementById("idecko");
  div.addEventListener("**DOMMouseScroll**", zoom, false);
}
```

## Směr otáčení

Zjistit směr, kterým člověk roluje kolečkem, jde z objektu `event`. Funkce, která bude vracet hodnotu `-1` pro oddalování a `1` pro přibližování, vypadá následovně. (První řádek sjednocuje práci s `event`em.)

```
function zoom(e) {
  e = e || window.event;
  var sjednocenySmer = e.wheelDelta || -e.detail;
  var smer = Math.max(-1, Math.min(1, sjednocenySmer));
}
```

Funkce do proměnné `smer` nastaví `1` při rolování nahoru a `-1` při rolování dolů.

[Živá ukázka](http://kod.djpw.cz/pbkb)

## Zoomování

Když už funguje odchytávání kolečka, nic nebrání realisaci přibližování. Dobré je při přiblížení brát v úvahu **posici kursoru** – tj. aby na místě kursoru byla stále ta samá oblast.

Pro **pochopení** věcí, co je nutné udělat při zvětšování/zmenšování, poslouží následující obrázek.

Obrázek má původně rozměry 100 × 100 pixelů a poměr zvětšení/zmenšení bude 20 %.

  - zvětšení o 20 procent proběhne vynásobením rozměrů číslem `1.20`,

  - zmenšení o 20 % se zajistí vynásobením číslem `1/1.20` (myslím, že v matematice se tomu říká převrácená hodnota)

Při zvětšení o 20 % se velikost původně 100px obrázku změní na 120 pixelů. Následně je nutné vyřešit správné posunutí. Z obrázku výše je patrné, že původní umístění kursoru 70 px od kraje obrázku připadá po vynásobení `1.2` na přibližně 85 px (70 * 1,2 = 84). Tedy umístění zleva by mělo vyjít na **-14 px**.

Zvětšený obrázek je tedy nutné posunout o rozdíl těchto dvou hodnot.

V podobě JS kódu to vypadá následovně:

```
obrazek.x += (mys.x * -pomer + mys.x);
```

Obrázek je nejprve při načtení stránky umístěn hned na kraji (`obrazek.x` je rovno `0`). Souřadnice X myši (`mys.x`) je 70 px a poměr při zvětšování 1,2.

```
(70 * (-1,2)) + 70 =
-84 + 70 =
-14
```

[Test principu](http://kod.djpw.cz/qbkb) (místo rolování se kliká)

Nyní stačí jen spojit obě ukázky v jednu.

[Živá ukázka](http://kod.djpw.cz/obkb)

## Navazující zlepšení

Při umožnění změny velikosti je většinou nutné stanovit **minimální/maximální úroveň přiblížení**, aby obrázek nemohl v podstatě zmizet při velkém oddálení.

Pro lepší pohodlí se hodí přidat i možnost **přesouvání obrázku** pomocí [drag &amp; drop](/drag-drop).

V novější prohlížečích je **výkonnější** zvětšovat a přesouvat objekty pomocí CSS vlastnosti `transform`.

Docílit **plynulé změny** velikosti při zoomu jde pomocí [`transition`](/transition).

Pro zvětšování/zmenšování na mobilních zařízeních se obvykle používá gesto dvěma prsty, které je nutné implementovat v JS. Anglicky se toto gesto nazývá *pinch to zoom*.