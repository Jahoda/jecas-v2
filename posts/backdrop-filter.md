---
title: "CSS backdrop-filter"
headline: "CSS <code>backdrop-filter</code>"
description: "Vlastnost <code>backdrop-filter</code> dokáže uplatnit filtr pro pozadí elementu."
date: "2019-07-31"
last_modification: "2021-03-15"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

[CSS filtry](/filter) se těší dobré podpoře napříč prohlížeči.

## Zápis

Vlastnost `backdrop-filter` slouží pro aplikování filtrů na pozadí elementu, **bez ovlivnění samotného obsahu**. Zápis je úplně stejný jako u `filter`:

```
element {
  backdrop-filter: nazevFiltru(parametr);
}
```

Aby se efekt mohl projevit, musí být element průhledný – je už jedno jestli pomocí [`opacity`](/opacity) nebo pozadí zapsaného např. průhlednou [RGBA barvou](/rgba), případně to  funguje i úplně bez pozadí.

  Rozmazaný text pomocí `filter`

    Rozmazaný obsah v pozadí

    Rozmazávač

[Samostatná živá ukázka](http://kod.djpw.cz/icsc)

## Podpora

Podpora není tak dobrá jako u obyčejného `filter`u.

Nefunguje v **IE 11** a **Firefoxu** (nejspíš začne fungovat v blízké budoucnosti).

## Využití

Může se zdát, že jde totéž co vlastností `backdrop-filter` zajistit obyčejným `filter`em. To je do jisté míry pravda, ale `backdrop-filter` přináší zjednodušení – odpadá nutnost vytvářet speciální elementy pro aplikování filtru na požadované místo stránky.

U klasického filtru je často problém v tom, že rozmazává i obsah. Bylo tak dřív nutné mít specifickou strukturu HTML kódu.

    .is-backdrop-filter .test-backdrop {
      backdrop-filter: blur(5px) brightness(80%);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .is-backdrop-filter .test-backdrop__inner {
      background: #fff;
      padding: 2em;
    }

      Rozmazat a ztmavit pozadí stránky

## Odkazy

  - [MDN: `backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)