---
title: "Vyšší tlačítko ve Firefoxu"
headline: "Vyšší tlačítko ve Firefoxu"
description: "Prohlížeč Firefox má zajímavou <i>vlastnost</i> u formulářových tlačítek. Dělá je vyšší než ostatní prohlížeče."
date: "2015-10-07"
last_modification: "2015-10-09"
status: 1
tags: ["CSS", "Stylování elementů", "Hotová řešení"]
---

Obecně není v CSS dobrým zvykem **nastavovat elementům výšku**. Jedinou výjimkou jsou **zaručeně jednořádkové prvky** – třeba formulářová tlačítka:

  - [`&lt;button>`](/button)

  - `&lt;[input](/input) type="submit">`

  - `&lt;input type="button">`

  - `&lt;input type="reset">`

Nastavit výšku je obecně ideální přes `line-height`, protože to rovnou zajistí **svislé vycentrování textu**.

  Odstavec s nastavenou výškou 70 px

**Firefox** však ze záhadných důvodů i při vynulování `border`u a `padding`u zobrazí **větší tlačítko**, než by měl:

## Selektor `::moz-focus-inner`

Řešení je použít CSS selektor `::moz-focus-inner`, který slouží k znázornění *focusovaného* tlačítka. Bohužel ho ale zvětšuje. Vypnout zvětšování jde vynulováním rámečku:

```
button::-moz-focus-inner {
  border: 0;
}
```

V případě používání tlačítek vytvořených značkou `&lt;input>` je universální zápis:

```
button::-moz-focus-inner,
input[type=button]::-moz-focus-inner,
input[type=submit]::-moz-focus-inner,
input[type=reset]::-moz-focus-inner {
  border: 0;
}
```

    - [Živá ukázka](http://kod.djpw.cz/pvqb) – vyšší tlačítko ve **Firefoxu**

Zvýraznění zaměřeného políčka je potom vhodné provést vlastnoručně pomocí `outline`:

```
button:focus {outline: 1px dotted}
```

## `height` místo `line-height`

Jiné řešení je nastavovat pro tlačítka `height`. V takovém případě by měla být výška dle zadání bez nutnosti resetovat `::-moz-focus-inner`:

    - [Živá ukázka](http://kod.djpw.cz/xwqb) – srovnání velikosti tlačítek s `height`

## Odkazy jinam

  - CSS Tricks: [button padding issue](https://css-tricks.com/forums/topic/button-padding-issue/)

  - David Walsh: [Firefox Button Height Fix](http://davidwalsh.name/firefox-buttons)

  - StackOverflow: [Why is Firefox button larger?](http://stackoverflow.com/questions/7928521/why-is-firefox-button-larger)