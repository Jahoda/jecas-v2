---
title: "Stylování inputu range"
headline: "Stylování <code>&lt;input type=range></code>"
description: "Jak docílit vlastního vzhledu range „slideru“."
date: "2014-11-07"
last_modification: "2023-03-13"
status: 1
tags: ["Stylování elementů", "Formuláře"]
---

Formulářový prvek [`&lt;input>`](/input) dokáže s různými podobami atributu `type` nabývat různých podob.

Jedna z nich je i `&lt;input type=range>`:

Výchozí vzhled se liší dle prohlížečů, ale vypadá nějak takto (Chrome, Firefox, Safari):

## Vlastnost `accent-color`

V Chrome a Firefoxu, dokáže `accent-color` obarvit `&lt;input type=range>`. V Safari bohužel ne.

Pokud stačí vzhled táhla sjednotit jen barveně se zbytkem stránky, může to být rychlé a snadné řešení.

## Pokročilejší stylování

Nestačí-li tato drobná změna, existují další možnosti.

Pro **Chrome** a **Safari** jde použít následující selektory:

    `input[type=range]::-webkit-slider-thumb` – style ukazatele

    `input[type=range]::-webkit-slider-runnable-track` – styl pozadí

Podmínkou, aby stylování fungovalo je *vypnout* [`appearance`](/appearance):

```
input[type=range],
input[type=range]::-webkit-slider-runnable-track,
input[type=range]::-webkit-slider-thumb {
    appearance: none;
}
```

Výsledek potom může být následující:

    .custom-range input[type=range],
    .custom-range input[type=range]::-webkit-slider-runnable-track,
    .custom-range input[type=range]::-webkit-slider-thumb {
        appearance: none;
    }
    
    .custom-range input[type=range] {
      background: transparent;
    }

    .custom-range input[type=range]::-webkit-slider-runnable-track {
        background: #DCDCDC;
        border-radius: 12px;
        height: 12px;
    }

    .custom-range input[type=range]::-moz-range-track {
        background: #DCDCDC;
        border-radius: 12px;
        height: 12px;
    }    

    .custom-range input[type=range]::-webkit-slider-thumb {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        border: 5px solid #fff;
        background: #00B873;
        box-shadow: 0 0 0 1px #DCDCDC;
        position: relative;
        top: -8px;
    }  

    .custom-range input[type=range]::-moz-range-thumb {
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        border: 5px solid #fff;
        background: #00B873;
        box-shadow: 0 0 0 1px #DCDCDC;
        position: relative;
        top: -8px;
    }      

[Samostatná živá ukázka](http://kod.djpw.cz/izid)

Ukázka **nefunguje** ve **Firefoxu**, ten má pro stylování vlastní selektory:

    `input[type=range]::-moz-range-track`

    `input[type=range]::-moz-range-thumb`

Pozor, není možné je spojit dohromady. Pokus o něco jako:

```
input[type=range]::-moz-range-track,
input[type=range]::-webkit-slider-runnable-track {
}
```

Způsobí nefunkčnost v **Chrome** a **Safari**.

Řešení je tak kód zduplikovat nebo použít nějaký [CSS preprocesor](/preprocesory), co problém s duplicitou vyřeší.

[Samostatná živá ukázka](http://kod.djpw.cz/lzid) – funkční v **Chrome**, **Firefoxu**, **Safari**, **Edge**

      [range-input.css](https://range-input-css.netlify.app) – generátor CSS pro vlastní styl range

## Internet Explorer

Potřebujete-li řešit stylování i v **IE**, jde to tam přes další [prefixované](/css-prefixy) vlastnosti:

```
input[type=range]::-ms-track {}
input[type=range]::-ms-fill-lower {}
input[type=range]::-ms-fill-upper {}
input[type=range]::-ms-thumb {}
```

## Další stylování

Ještě pár věcí jde *vymáčknout* z CSS pro stylování range:

### Vertikální

### Popisky

Přes [`&lt;datalist>`](/datalist) jde dodělat popisky:

[Samostatná živá ukázka](http://kod.djpw.cz/pzid)

Zdá se ale, že pokročilejší stylování obsahu v `&lt;datalist>` není možné v **Safari**.

## Shadow DOM

Pro stylování range (a i obecně) si doporučuji zapnout ve [vývojářských nástrojích](/vyvojarske-nastoje) **Shadow DOM**.

Do nastavení se jde dostat klávesou F1 při otevřených DevTools.

Výsledek to má tento:

## JavaScript

Nestačí-li tyto možnosti stylování, nezbývá, než použít JS.

Doporučil bych v takovém případě vycházet z nativního `&lt;input type=range>` a JavaScriptem pouze doplnit potřebnou funkcionalitu.

Možná se to nezdá, ale prvek range má poměrně dost funkcionality, kterou by bylo třeba doprogramovat. Focus, ovládání klávesnicí atd.

Osvědčené čistě JS řešení je [noUiSlider](https://github.com/leongersen/noUiSlider):

Docela zajímavě vypadá [UI-Range](https://github.com/yairEO/ui-range), který se snaží většinu věcí řešit přes CSS.

## Odkazy jinam

    MDN: [&lt;input type="range">](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)

    [Styling Cross-Browser Compatible Range Inputs with CSS](http://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/)

    [How to Style Input Type Range in Chrome, Firefox, and IE](http://brennaobrien.com/blog/2014/05/style-input-type-range-in-every-browser.html)

- [Styling Cross-Browser Compatible Range Inputs with Sass / SCSS](https://github.com/darlanrod/input-range-scss)

  - [Create a nice-looking input range with only CSS!!](https://sipsandbits.com/2020/10/21/create-a-nice-looking-input-range-with-only-css/)