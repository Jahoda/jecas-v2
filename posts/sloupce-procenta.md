---
title: "Převod sloupců na procenta"
headline: "Převod sloupců na procenta"
description: "Jak převést fixní sloupcové rozložení na procenta, která se budou přizpůsobovat šířce okna."
date: "2015-08-14"
last_modification: "2015-09-26"
status: 1
tags: ["CSS", "Responsivní design", "Layout"]
---

Při [převodu starého webu na responsivní](/prevod-responsivni-design) je typicky nutné **převést pevný vícesloupcový layout v pixelech** na procenta, která se dokáží přizpůsobovat aktuálně dostupné šířce.

V podstatě k tomu stačí kalkulačka a schopnost počítat s procenty.

## Kalkulačka

Pro zrychlení procesu jsem si vytvořil automatický převodník v JavaScriptu:

    Sloupec ``× Odebrat

    Sloupec ``× Odebrat

    Sloupec ``× Odebrat

+ Přidat sloupec

## Drobná mezera

Pokud procentuální hodnota vyjde s hodně desetinnými místy, může být **problém se zaokrouhlováním**, kdy ve finále nedají sloupce dohromady přesně 100 %.

První řešení je lehce změnit poměr sloupců použitím hodnot v procentech bez desetinných míst.

V případě obtékaných (`[float: left](/float)`) sloupců většinou vadí mezera vpravo za posledním blokem, takže pro poslední sloupec stačí použít `float: right`. Zaměřit poslední sloupec jde od **IE 9** CSS selektorem [`:last-child`](/css-selektory#prvni-posledni-potomek):

```
.sloupec {
  float: left;
} 
.sloupec:last-child {
  float: right;
}
```

var polozky = document.getElementById('polozky');
var pocetMist = 1;

function zaokrouhlit(cislo) {
  return Math.round(cislo * 1) / 1;
    return parseFloat(cislo.toFixed(pocetMist));
}

function naprocenta(form) {
    var inputy = form.getElementsByTagName("input");
    var pocet = inputy.length;
    var celkem = 0;
    for (var i = 0; i   

  .kalkulacka code {
    width: 5em;
    text-align: center;
    display: inline-block;
    margin: 0 1em;
  }