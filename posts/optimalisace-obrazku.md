---
title: "Automatická datová optimalisace obrázků"
headline: "Hromadné datové zmenšení obrázků"
description: "Chceme-li zrychlit načítání své stránky, datová optimalisace obrázků může pomoci."
date: "2013-08-16"
last_modification: "2016-03-28"
status: 1
tags: ["Hotová řešení", "Rady a nápady", "Zrychlování webu"]
---

## PageSpeed Insights

Problematické obrázky, tj. co by se daly zmenšit, najdeme nástrojem [PageSpeed Insights](http://developers.google.com/speed/pagespeed/insights/), pokud by nějaké šlo datově srazit, objeví se následující:

## TinyPNG / TinyJPG

Možnost datově zmenšit obrázek bez **ztráty kvality** nabízí i TinyPNG / TinyJPG.

  [TinyPNG](https://tinypng.com/)
  [TinyJPG](https://tinyjpg.com/)

Příjemné na těchto službách je, že nabízejí [API pro vývojáře](https://tinypng.com/developers).

Optimalisaci obrázků tak jde **zautomatisovat** v redakčním systému. 500 obrázků měsíčně je zdarma.

## Optimizilla.com

Umožňuje nastavit, kolik barev obrázek potřebuje.

[Web Optimizilla.com](http://optimizilla.com)

Má trochu pomalejší odezvu.

## Kraken.io

Zajímavý nástroj hlavně v [placené versi](https://kraken.io/pro). Za 5 dolarů měsíčně nabízí funkce jako hromadné zmenšování obrázků na základě **zadaných URL**, automatické zmenšení všech obrázků na stránce, API či plugin do **Wordpressu**.

[Kraken.io](https://kraken.io/web-interface)

## pngquant

Knihovna pro optimalisaci obrázků, kterou používá TinyPNG nebo Kraken.io.

[pngquant](http://pngquant.org/)

Ke stažení je i podoba pro spouštění z **příkazové řádky**.

## Hromadná optimalisace na Windows

U rozsáhlého projektu může být zdlouhavé používat online služby nebo si psát skripty, které lokální soubory optimalisují.

Na [Windows](/windows) se mi osvědčil následující postup:

### Program PNGoo

Jedná se o GUI ke komprimačnímu nástroji pngquant.

[Stáhnout PNGoo](https://pngquant.org/PNGoo.0.1.1.zip)

Po rozbalení a spuštění programu se zobrazí okno programu, kam stačí přidat soubory a spustit proces kliknutím na *Go!*.

### Výběr souborů

Většinou budou PNG obrázky ve více složkách. Proto bude nutné si otevřít složku s projektem v průzkumníkovi a pomocí hledání `*.png` vyfiltrovat PNG obrázky.

Celý výsledek stačí pomocí Ctrl + A označit a přesunout myší do okna PNGoo.

Po kliknutí na *Go!* začne proces převodu, předtím se nabízí pro jistotu původní složku **zálohovat**, protože obrázky se ve výchozím nastavení přepíší.

Proces může v závislosti na počtu obrázku trvat hodně dlouho a program PNGoo průběh nijak nesignalisuje.

V případě úspěšného dokončení by mělo být možné pozorovat značnou datovou úsporu.

## Změna rozměrů obrázků

Kromě optimalisace pro snížení velikosti může pomoci i **zmenšení rozměrů**.

Pokud se obrázek bude zobrazovat ve velikosti 100 × 100 pixelů, zdá se zbytečné, aby měl třeba 1000 × 1000 px.

Dobře **hromadně zmenšovat** obrázky umí program [IrfanView](/windows-programy#irfan-view). Taktéž jde použít online službu:

    - [Batch Image Resizing Made Easy](http://birme.net/) – hromadná online úprava velikosti obrázků

Dříve platilo, že by měl mít obrázek takovou velikost, ve které se nakonec zobrazí. Situaci ale změnily displeje s **vyšší hustotou pixelů**, které jsou schopny větších rozměrů využít.

Najednou mají smysl i 2–4 větší obrázky.

Jelikož je zmenšení obrázku **nevratné**, není rozumné obrázek v původní velikosti smazat.

## Odkazy jinam

  - [Reducing JPG File size](https://medium.com/@duhroach/reducing-jpg-file-size-e5b27df3257c#.tkric6ffg) – jak dramaticky snížit velikost JPG obrázků bez (významné) ztráty kvality

Losslessly compressing http://jecas.cz/files/article/cernobily-obrazek.png could save 4.2KiB (57% reduction).
Losslessly compressing http://jecas.cz/images/rss.png could save 2.9KiB (90% reduction).
Losslessly compressing http://jecas.cz/images/home.png could save 2.7KiB (89% reduction).
Losslessly compressing http://jecas.cz/files/article/mobilni-web.png could save 2KiB (48% reduction).
var nahradit = document.getElementById("nahradit");

  Vyzobat adresy

Aplikace bude chvliku pracovat, načež stáhneme výsledný archiv, ideálně se zachováním adresářové struktury (*Keep directory structure*), takže jeho obsah potom stačí jen rozbalit na server a staré (neoptimalisované) obrázky **přepsat**.

-->