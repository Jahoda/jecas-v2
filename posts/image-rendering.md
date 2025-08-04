---
title: "Image-rendering"
headline: "Image-rendering"
description: "CSS vlastnost <code>image-rendering</code> ovlivňuje způsob, kterým se v prohlížeči zvětšují/zmenšují obrázky."
date: "2014-10-15"
last_modification: "2015-03-13"
status: 1
tags: ["CSS", "CSS vlastnosti", "Obrázky"]
---

V případě, že obrázek na stránce má jiné než **skutečné rozměry**, které mu byly nastaveny v grafickém editoru, musejí se [webové prohlížeče](/webove-prohlizece) vypořádat se změnou velikosti.

Pro změnu velikosti obrázků existuje řada algoritmů:

  Různé editory i různé prohlížeče používají různé algoritmy pro zmenšení obrázků. Jednodušší algoritmy jsou rychlejší a na fotografie je optimální jiný algoritmus, než na perokresbu, proto lepší grafické editory umožňují volbu algoritmu pro zmenšení.

  – [Bubák](http://teststranek.kvalitne.cz/)

Příklad různých algoritmů pro změnu velikosti v programu Irfan View.

Pro obdobný ruční výběr algoritmu **v prohlížečích** slouží právě vlastnost `image-rendering`.

## Využití

Jiné než výchozí hodnoty se zdají být vhodné spíš pro [pixel art](http://en.wikipedia.org/wiki/Pixel_art), ale mohou se hodit i pro obrázek s **QR kódem**.

  Srovnání zvětšení malého QR kódu s ruzně nastaveným renderováním

Pro fotografie a většinu obrázků je nejlepší **výchozí chování**, které prohlížeče používají i bez explicitního použití `image-rendering`u.

  Srovnání zvětšení malé fotografie s ruzně nastaveným renderováním

### Kde se dá úprava renderování použít?

Vlastnost `image-rendering` je aplikována na:

  - obrázky v `&lt;img>`,

  - kreslicí plátno [`&lt;canvas>`](/canvas),

  - pozadí elementů `background-image`

## Způsoby renderování obrázku

### `image-rendering: auto`

Výchozí chování. Při zvětšení obrázek působí rozmazaně, ale nejsou přímo patrné jednotlivé pixely. Pro fotografie se jedná o nejlepší (nebo možná spíš nejméně špatný) způsob – ideální je mít obrázek v **dostatečném rozlišení**.

Nevýhoda tohoto algoritmu nastává u obrázků s ostrými barevnými přechody, které budou rozmazané.

Takto vypadá čtvereček s kolečkem uprostřed  o rozměrech 10 × 10 při desetinásobném zvětšení.

### `image-rendering: pixelated`

Alternativou je hodnota `pixelated`, která docílí toho, že výsledek bude vypadat jako by pouze sestával z větších pixelů.

Zápis `image-rendering: pixelated` funguje pouze v **Chrome**/**Opeře**. I v ostatních prohlížečích je ale možné dosáhnout stejného vzhledu.

  - **IE** používá konstrukci `-ms-interpolation-mode: nearest-neighbor`

  Ve staré **Opeře**, **Firefoxu** a starším **Chrome**/**Safari** funguje stejně jako `pixelated` hodnota `crisp-edges`:
    ```
image-rendering: -moz-crisp-edges;
image-rendering: -o-crisp-edges;
image-rendering: -webkit-optimize-contrast;
```

Na výsledném obrázku jsou patrné jednotlivé pixely. Dříve tento způsob používaly prohlížeče jako výchozí, kvůli úspoře výkonu.

    .pixely {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: pixelated;
      -ms-interpolation-mode: nearest-neighbor;  
    }

[Samostatná ukázka](http://kod.djpw.cz/nllb)

### `image-rendering: crisp-edges`

Nakonec existuje ještě hodnota `crisp-edges`, která sice v některých prohlížečích funguje, chová se ale stejně jako `pixelated`.

Podle návrhu CSS specifikace by měla pixely na sebe *napojit*, aby nebylo vidět jednotlivé kostičky, což by se asi nejvíc hodilo právě pro ten **pixel art**.

## Odkazy jinam

  - HTML5Rocks: [image-rendering: pixelated](http://updates.html5rocks.com/2015/01/pixelated)

  - MDN: [image-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering)

  - Specifikace W3: [Determing How To Scale an Image: the ‘image-rendering’ property](http://dev.w3.org/csswg/css-images-3/#the-image-rendering)

  - Can I Use: [Podpora v prohlížečích](http://caniuse.com/#feat=css-crisp-edges)