---
title: "CSS filter"
headline: "CSS <code>filter</code>"
description: "Jak vytvářet grafické filtry obrázků i jiných prvků na stránce."
date: "2014-04-20"
last_modification: "2015-01-21"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

Na `filter`u je hodně zajímavá skutečnost, že ho různě implementují **Internet Explorery** už od prastaré verse **4** do **IE 9** a současné prohlížeče.

S původní vlastností přišel Internet Explorer. Ukázky těchto filtrů (funkční do **IE 8**) jsou hezky [popsány na JPW](http://www.jakpsatweb.cz/css/css-filtry-priklady.html). *Nové* filtry ale fungují **úplně jinak**.

## Podpora

Nová podoba filtrů funguje s [prefixy](/css-prefixy) od **Chrome 18** a **Opery 17**. Od **Firefoxu 35** již bez prefixů, **Firefox 34** a starší podporuje pouze připojení SVG filtru přes `url`. V **IE** podpora chybí.

Filtry jde aplikovat i pouze na pozadí elementu pomocí podobné vlastnosti [`backdrop-filter`](/backdrop-filter).

## Seznam filtrů

V podporovaném prohlížeči **Chrome** a **nové Opeře** je možné efekty testovat přímo na této stránce (na elementu `&lt;body>`). Pro potřeby ukázek se filtry **neslučují**.

  `blur()`
  
    Vytvoří efekt rozmazání. Více o rozmazávání je v samostatném článku [Filtr blur](/blur).

    ```
element {
  filter: blur(2px);
}
```

    Zadávat je možné běžné **délkové jednotky** kromě procent.

    **Rozmazat:** 

  `brightness()`
  
    Umožňuje ztmavit a nebo naopak projasnit element. Dá se elegantně využít pro [universální `:hover` efekty](/universalni-hover#filter).

    ```
.ztmavit {
  filter: brightness(90%);
}
.zesvetlit {
  filter: brightness(110%);
}
```

      - `0%` – Minimální hodnota, element je černý.

      - `100%` – Střední hodnota, element je stejný jako bez filtru.

      - `200%` – Maximální hodnota, element je bílý.

    **Světlost:** 

  `contrast()`

    ```
.nizsi-kontrast {
  filter: contrast(90%);
}
.vyssi-kontrast {
  filter: contrast(110%);
}
```

    Hodnota se zadává v procentech. Postup je stejný jako u `brightness`.

    **Kontrast:** 

  `drop-shadow()`

    Element bude mít stín.

    ```
.stin {
  filter: drop-shadow(10px 10px 10px red);
}
```

    Nastavování stínu je stejné jako u vlastnosti [`box-shadow`](/box-shadow):

      - První hodnota je **vodorovná vzdálenost** od objektu, kde se stín umístí. Kladné hodnoty vytvářejí stín vpravo, záporné vlevo.

      - Druhá hodnota je totéž **svisle**. Kladná hodnota vytvoří stín pod elementem, záporná nad.

      - Třetí hodnota je **intensita stínu**.

      - Poslední hodnota je barva stínu.

  `grayscale()`

    Hodí se k vytváření černobílých elementů. V samostatném článku jsou další možnosti [černobílého efektu](/cernobily-obrazek).

    ```
.cernobily {
  filter: grayscale(100%);
}
```

    Hodnota `100%` vytvoří element 100% černobílý, nula by způsobila, že bude vypadat jako bez filtru.

   **Černobílý:** 

  `hue-rotate()`

    Dokáže *otočit barvy*. Co to znamená? Všechny barvy elementu/obrázku se přesunou do jiného spektra. Můžeme tak snadno **přebarvit celý web**.

    ```
.otocene-barvy {
  filter: hue-rotate(90deg);
}
```

    Hodnota se zadává jako úhel, tj. `0deg` až `360deg`.

    **Otočit barvy:** 

  `invert()`

    Invertuje barvy.

    ```
.negativ {
  filter: invert(100%);
}
```

    Nižší hodnoty než maximální stovka (`100%`) způsobí dle očekávání jen částečný efekt.

   **Invertovat barvy:** 

  `opacity()`

    Vytváří průhlednost. To umí i samotná [`opacity`](/opacity). Výhoda filtru `opacity` před **vlastností** by mohla být **HW akcelerace** v některých prohlížečích.

      - `0%` – element je úplně průhledný

      - `100%` – element vypadá jako bez filtru

    **Průhlednost:** 

  `saturate()`

    ```
.hodne-syty {
  -webkit-filter: saturate(200%);
}
```

    Ovlivňuje **sytost barev**.

      - `0%` – minimální sytost

      - `100%` – původní podoba

      - `200%` – maximální sytost

      **Sytost:** 

  `sepia()`

    Umožní vytvořit **efekt staré fotografie**.

    ```
.stara-fotografie {
  filter: sepia(100%);
}
```

      - `0%` – původní podoba

      - `100%` – maximální intensita efektu

    **Stará fotografie:** 

  `url()`

    Použití `url` je zvláštní druh filtru, který umožňuje aplikovat na element filtr z SVG.

## Zápis jednotek

Při zadávání filtrů si je možné povšimnout, že se používají:

  - Délkové jednotky (`px` apod.).

  - Stupně (`deg`).

  - Procenta.

A právě **místo procent** se mohou psát i čísla od 0 do 2.

  - `0` = `0%`

  - `0.5` = `.5` = `50%`

  - `1` = `100%`

  - `1.5` = `1.5` = `150%`

  - `2` = `200%`

## Odkazy

  - [MDN: filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

  - [DevDocs](http://devdocs.io/css/filter)

  - [W3C: Filter Effects Module Level 1](https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html)

  - [Understanding CSS Filter Effects](http://www.html5rocks.com/en/tutorials/filters/understanding-css/)

  - [CSSgram](http://una.im/CSSgram/) – knihovna filtrů z Instagramu

function nastavitFiltr(el) {
    var filtr = el.getAttribute("data-filter") + "(" + el.value + el.getAttribute("data-jednotky") + ")";
    document.body.style.cssText = "-webkit-filter:" + filtr + ";-moz-filter:" + filtr + "-ms-filter:" + filtr + ";filter:" + filtr;
}