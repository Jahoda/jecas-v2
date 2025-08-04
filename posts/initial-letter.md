---
title: "CSS initial-letter"
headline: "CSS initial-letter"
description: "Vlastnost <code>initial-letter</code> slouží k vytvoření prvního písmena přes více řádek."
date: "2014-12-10"
last_modification: "2014-12-10"
status: 0
tags: []
---

Pro ozvláštnění textu může být někdy žádoucí začít text stránky **písmenem přes několik řádek**. Při řešení pomocí bez `initial-letter` je poměrně složité se dopočítat k potřebné velikosti počátečního písmena, aby **ladilo** s běžnými řádky.

Jako hodnoty pro `initial-letter` se udává počet řádků.

```
p::first-letter {
  initial-letter: 3;
}
```

Výše uvedený kód tedy vytvoří [první písmeno](/first-letter) přes `3` řádky.

Dá se přidat ještě **druhý parametr**, který upraví počet řádků nacházejících se vedle počátečního písmena.

```
p::first-letter {
  initial-letter: 3 **2**;
}
```

## Odkazy

  - W3C: [An Introduction to Initial Letters](http://dev.w3.org/csswg/css-inline/#sizing-drop-initials)

  - [Big, Beautiful Dropcaps with CSS initial-letter](http://demosthenes.info/blog/961/Big-Beautiful-DropCaps-with-CSS-initial-letter)