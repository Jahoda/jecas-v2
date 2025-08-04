---
title: "Pseudo-element ::outside"
headline: "Pseudo-element ::outside"
description: "Obalení elementu dalším prvkem."
date: "2015-02-17"
last_modification: "2015-02-17"
status: 0
tags: []
---

Při tvoření složitějších CSS konstrukcí je často nevyhnutelné použít několik **obalujících** elementů.

```
&lt;div class="obal-obalu-obsahu">
  &lt;div class="obal-obsahu">
    &lt;div class="obsah">
    &lt;/div>
  &lt;/div>
&lt;/div>
```

A následně CSS ve stylu:

```
.obsah {}
.obal-obsahu {}
.obal-obalu-obashu {}
```

## Zápis

Návrh CSS specifikace pro případy obalení počítá s pseudo-elementem `::outside`, kterým půjde *obalit* HTML element **bez nutnosti přidávat obal** do HTML kódu.

```
.obsah {}
.obsah**::outside** {}
```

Pro více obalů než jeden je potom možné uvést číslo jako parametr do závorky:

```
.obsah {}
.obash::outside {}
.obsah::outside**(2)** {}
```

## Podpora

Pseudo-element `::outside` napodporuje žádný prohlížeč.

## Řešení v JavaScriptu

Docílit obalení čehokoliv bez úprav HTML je tak možné jedině v JavaScriptu. V jQuery k tomu slouží funkce `wrap`:

```
$('.obsah').wrap('&lt;div class="obal-obsahu" />');
```

## Odkazy jinam

  - W3C: [CSS3 Generated and Replaced Content Module](http://www.w3.org/TR/css3-content/#wrapping)