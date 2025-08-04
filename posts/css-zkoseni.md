---
title: "Zkosení hrany v CSS"
headline: "Zkosení hrany v CSS"
description: "Jak vytvořit šikmou hranu (zkosení) CSS bloku."
date: "2015-10-27"
last_modification: "2015-10-28"
status: 1
tags: ["CSS", "Hotová řešení"]
---

Dlouhou dobu bylo v CSS možné (a známé) pouze vytváření objektů ve tvaru čtverců a obdélníků.

  Pomocí vlastnosti [`border-radius`](/border-radius) jde vytvářet **kulaté rohy** nebo [kulaté obrázky](/kruhovy-obrazek).

  - Vhodnou kombinací tloušťky a barvy rámečků jde kreslit [šipky/trojúhelníky](/css-sipky).

Jak vytvořit něco se **zkosenou hranou**?

## Pomocí `border` trojúhelníku

Pomocí vytvořeného trojúhelníku z rámečku jde zajistit šikmou hranu.

Trojúhelník je vytvořen pomocí pseudo-elementu `:after`, který je umístěn za obsah.

.sikmy {
    background: #0D6AB7;
    color: #fff;
    padding: 0 .5em;
    position: relative;
    display: inline-block;
    line-height: 2em;
}

.sikmy-trojuhelnik:after {
    content: "";
    border: 2em solid transparent; width: 0px; height: 0px; display: inline-block; position: absolute; border-left: 1em solid #0D6AB7; border-top: 0; left: 100%; top: 0;}
  
  Obsah se šikmou hranou

[Samostatná ukázka](http://kod.djpw.cz/morb) – šikmá hrana

**Podpora** tohoto řešení je vynikající (rámečky fungují všude). Horší je to s vyhlazováním – šikmá hrana může vypadat kostrbatě.

Taktéž nastavení požadovaného zkosení není úplně intuitivní. Nakonec je podmínkou, aby pozadí bloku bylo jednobarevné kvůli napojení.

## Oříznutí `clip`

Jako dělaná je pro tyto případ oříznutí CSS vlastnost [`clip-path`](/clip) s funkcí `polygon`:

```
.sikmy {
  clip-path: polygon(0 0, 100% 0, 75% 100%, 0 100%);
}
```

Ta bez problému funguje i s obrázkovým pozadím:

Výsledek:

    .sikmy-clip {
      padding-right: 2em;
      clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
      -webkit-clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
    }
  
  Obsah se šikmou hranou

Nevýhoda je **slabší podpora v prohlížečích**. Nepravidelné oříznutí podporuje **Chrome 24+**,  **Opera 15+** a **Safari 8+**. Pro lepší podporu je dobré použít [CSS prefixy](/css-prefixy).

## Zkosení `transform: skewX`

CSS transformace `skew` dokáže zkosit celý element. Zkosení zároveň deformuje i obsah – text – což je nežádoucí. Nabízí se tedy použít deformaci pouze pro pseudo-element, který se potom umístí na správné místo [absolutním posicováním](/position#absolute).

    .skew {
      z-index: 0;
    }
.skew:after {
      width: 2em; height: 100%; display: inline-block; position: absolute; background: inherit; content: ""; right: -1em; z-index: -1; transform: skewX(-30deg); -ms-transform: skewX(-30deg); -moz-transform: skewX(-30deg); -webkit-transform: skewX(-30deg); -o-transform: skewX(-30deg);}
  
  Obsah se šikmou hranou

CSS vlastnost `transform` a zkosení `skewX`/`skewY` je podporováno s prefixy už od **IE 9**, **Firefoxu 3.5**, **Chrome 4** a **Opera 11.5**.

Pomocí `z-index`u se zkosení umístí za obsah.

## Zkosení na obou stranách

Bylo-li by cílem mít zkosené hrany na obou stranách, šlo by element včetně písma zkosit a pouze samotný text vrátit zpět opačnou hodnotou:

    .zkosene-obe {
        display: inline-block; margin-left: 1em; margin-right: 1em;
        transform: skewX(-30deg); -ms-transform: skewX(-30deg); -moz-transform: skewX(-30deg); -webkit-transform: skewX(-30deg); -o-transform: skewX(-30deg);}
      .zkosene-obe span {
        display: inline-block;
        transform: skewX(30deg); -ms-transform: skewX(30deg); -moz-transform: skewX(30deg); -webkit-transform: skewX(30deg); -o-transform: skewX(30deg)
      }

    Obsah se šikmými hranami

[Samostatná ukázka](http://kod.djpw.cz/porb) – zkosení na obou stranách

Možná u tohoto postupu bude někde problém s **vyhlazováním písma**.

Bez použití pseudo-elementu by šlo případně jednu šikmou stranu oříznout:

[Živá ukázka](http://kod.djpw.cz/sorb) – oříznutí jedné zkosené hrany

## Rotace

Teoreticky by šlo vytvořit šikmou plochu i [rotací](/rotace), ale těžko říct, jestli to přináší nějaké výhody oproti zkosení. Podpora v prohlížečích je obdobná.

## Odkazy jinam

  - Viget: [Angled Edges with CSS Masks and Transforms](https://viget.com/inspire/angled-edges-with-css-masks-and-transforms)