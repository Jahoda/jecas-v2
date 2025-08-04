---
title: "Box-sizing"
headline: "Box-sizing"
description: "CSS vlastnost <code>box-sizing</code> dokáže změnit vypočítávání rozměrů boxu."
date: "2014-01-27"
last_modification: "2014-01-27"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

## `content-box`

Ve [standardním režimu](/doctype) se ve výchozím stavu počítají rozměry boxů tak, že se k nastavené šířce přičte šířka okraje (`padding`) a tloušťka rámečku (`border-width`) — nazývá se to modelem **obsahovým** (`box-sizing: **content**-box`).

Následující element tedy bude mít výslednou šířku 112 pixelů (1 + 5 + 100 + 5 + 1).

```
element {width: 100px; padding: 5px; border: 1px solid #000}
```

## `border-box`

Druhý typ počítání (a v mnoha situacích výhodnější) je `box-sizing: **border**-box` — tzv. **okrajový box-model**. Při jeho aplikování na výše uvedený kód získáme element o šířce přesně 100 pixelů. A šířky `padding`u a `border`u se promítnou *dovnitř* elementu. Tedy pro samotný obsah zbude 88 pixelů (100 - 1 - 5 - 5 - 1).

Změna [box modelu](/box-model) vlastností `box-sizing` funguje od **IE 8** (do **Firefoxu 28** pouze s [`-moz-` prefixem](/css-prefixy)). Kvůli historickým Webkitům můžeme přidat prefix i pro ně.

```
element {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
```

### Okrajový box model pro všechny elementy

V případě, že řešíme správné zobrazení od **IE 8** včtetně, můžeme si pomocí [hvězdičkového selektoru](/css-selektory#hvezdickovy) box model přepnout na `border-box` i při zachování standardního režimu.

```
*, *:after, *:before {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
```

V **IE 7** a starších je možné okrajového modelu dosáhnout v quirk režimu, což ale znemožní využívat funkcí, které fungují jen v režimu standardním. Takže to se moc nevyplatí.