---
title: "Text-stroke"
headline: "Text-stroke"
description: "CSS vlastnost <code>text-stroke</code> vytváří okraj písmen podobně jako vlastnost <code>border</code> u boxů."
date: "2014-04-07"
last_modification: "2014-05-05"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

## Použití

Využití vlastnosti `text-stroke` se nabízí v podobě vytváření zajímavějších stylů písma bez používání obrázků.

```
element {
  **-webkit-**text-stroke: 5px red;
}
```

První hodnota je tloušťka rámečku, druhá hodnota potom barva. Zápis se tedy liší oproti `border`u absencí volby stylu čáry (`solid`, `dotted`, `double` a podobně). Možná se této možnosti dočkáme v budoucnu.

## Popora

Momentálně funguje pouze ve **Webkitu** (**Chrome 31**+ a nová **Opera 20**+), a to jen s [CSS prefixem](/css-prefixy) `-webkit-`.

    .nadpis {
        color: #0D6AB7;      
        -webkit-text-stroke: 2px #DA3F94;
        font-weight: bold;
        font-size: 40px;
    }
  
  Text s barevným okrajem.

[Samostatná ukázka](http://kod.djpw.cz/zadb) (v podporovaných prohlížečích se zobrazí cca to samé co na obrázku výše).

Aby se efekt rozumně projevil, je zapotřebí celkem velké písmo, zhruba 40 pixelů a víc.