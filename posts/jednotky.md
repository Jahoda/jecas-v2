---
title: "CSS jednotky"
headline: "Délkové jednotky"
description: "Jaké existují v CSS jednotky pro udávání rozměrů. Které z nich používat."
date: "2014-11-17"
last_modification: "2014-11-17"
status: 0
tags: []
---

Pro stanovení šířky, výšky, tloušťky (rámečku), odsazení ([`margin`](/margin)/`padding`), umístění, velikosti (písma) a další věci se používají **délkové jednotky**. V CSS jich je celá řada.

## Procenta

Procenta jde používat skoro vždycky. Výjimkou je například **tloušťka rámečku** (`border-width`) nebo `outline`. Záludné na jejich používání je, že si je třeba uvědomit **z čeho se počítají**.

```
.priklad {
  width: 50%;
  font-size: 120%;
  margin: 1%;
  padding: 1%;
}
```

### Rozměry boxu

Často se rozměr v procentech počítá z **šířky nadřazeného elementu**.

    50% × 50%

Pokud bude mít rodič šířku 200 pixelů, jeho potomek o šířce 50 % bude mít 100 pixelů. Při nastavování výšky to funguje analogicky.

    - [Box model](/box-model) může ovlivňovat výslednou šířku nebo výšku

Možná trochu **nečekané chování** nastane při počítání `margin`u nebo `padding`u – ty se totiž počítají **vždy z šířky**, takže i horní/spodní procentuální `margin`/`padding` bude odvozen od šířky.

Modrý prvek má `height: 0; padding-top: 50%`, což při výchozím obsahovém box-modelu způsobí, že bude vysoký jako polovina (50 %) šířky svého rodiče.

    - [Výška závislá na šířce](/vyska-podle-sirky) – využívá nulové výšky a `padding`u podle šířky

### Posicování

Při **absolutním** [posicování](/position) se hodnoty pro `left`/`right` a `top`/`bottom` počítají z šířky/výšky nejbližšího nadřazeného elementu s nestatickou posicí (`position: relative`/`absolute`/`fixed`), případně z šířky okna.

[Živá ukázka](http://kod.djpw.cz/kojb)

**Relativně** posicovaný element počítá běžně rozměry z šířky/výšky rodiče.

**Fixní** element je vždy posicovaný vůči oknu.

    - [Odsazení v procentech](http://kod.djpw.cz/elnb)

## Relativní, nebo absolutní?

Někdy se jednotky dělí na **absolutní a relativní**. Dělení je to trochu komplikované, protože svým způsobem je všechno relativní. I při použití pixelů se může změnit velikost textu přes nastavení v prohlížeči. Dnešní prohlížeče sice zpravidla používají primárně **zvětšení celé stránky**, ale většinou jde i měnit velikost písma nezávisle na zbytku stránky.

Případně zvětšit velikost přímo v systému. Příklad ve Windows 7.

## Rem, nebo em?

  - [REM vs EM – The Great Debate](http://zellwk.com/blog/rem-vs-em/)

  - DevDocs: [&lt;length>](http://devdocs.io/css/length)

  - [7 CSS Units You Might Not Know About](http://webdesign.tutsplus.com/articles/7-css-units-you-might-not-know-about--cms-22573)

  - [Instant Fluid Videos with Viewport Width Units](http://webdesign.tutsplus.com/tutorials/instant-fluid-videos-with-viewport-width-units--cms-22845)

  - [CSS Units: Angles, Time and Frequency](http://demosthenes.info/blog/980/CSS-Units-Angles-Time-and-Frequency)

  - [CSS Ruler](http://katydecorah.com/css-ruler/) – živý výsledek nastavení velikosti písma

## Viewport

  - [Viewport vs Percentage Units](http://bitsofco.de/2015/viewport-vs-percentage-units/)

  - Sitepoint: [A Look at Length Units in CSS](http://www.sitepoint.com/look-at-length-units-in-css/)