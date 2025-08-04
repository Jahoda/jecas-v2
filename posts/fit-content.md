---
title: "Fit-content"
headline: "Fit-content"
description: "CSS vlastnost <code>fit-content</code> nastaví šířku podle obsahu."
date: "2015-01-15"
last_modification: "2015-01-25"
status: 1
tags: ["CSS", "Rady a nápady", "Menu v CSS"]
---

Výchozí chování blokových elementů (`display: block`) je snaha se **roztáhnout přes celou šířku**.

    .div {
      background: #0D6AB7; 
      color: #fff;
      padding: 1em;
    }
  
  obsah

Takový postup vůbec neřeší, jak je široký obsah. Pomocí `fit-content` se dá nastavit šířka (`width`), aby respektovala šířku obsahu:

```
element {
  width: fit-content;
}
```

    .fit-content {
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
    }
  
  obsah

[Živá ukázka](http://kod.djpw.cz/svjb) – centrování menu s neznámou šířkou pomocí `fit-content`

## Podpora

Ve **Firefoxu** a **Webkitech** funguje s [prefixy](/css-prefixy):

```
element {
  width: **-webkit-**fit-content;
  width: **-moz-**fit-content;
  width: fit-content;
}
```

Podpora v jednotlivých versích prohlížečů:

  - **Firefox 4+**,

  - **Chrome 22+**,

  - **Safar 6.1+**,

  - **Opera 15+**

**Webkit** podporuje ještě alternativní zápis:

```
element {
  width: **intrinsic**;
}
```

[Živá ukázka](http://kod.djpw.cz/rvjb)

Pro prohlížeče nepodporující `fit-content` existují následující možnosti.

## `display: inline-block`

Přizpůsobit rozměry obsahu jde například pomocí `display: inline-block`:

    .inline-block {
      display: inline-block;
    }
  
  obsah

V případě, že je cílem takový obsah [vycentrovat](/centrovani), jde použít prosté `text-align: center` pro rodiče.

[Živá ukázka](http://kod.djpw.cz/ovjb)

Problém řešení s `inline-block` mohou být [bílé znaky](/inline-block-whitespace).

## `display: table`

Obdobně jako `width: fit-content` zafunguje i `display: table`.

[Živá ukázka](http://kod.djpw.cz/pvjb)