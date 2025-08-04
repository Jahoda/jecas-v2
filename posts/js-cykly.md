---
title: "Procházení elementů v JS"
headline: "Procházení značek v JavaScriptu"
description: "Jak cyklem procházet značky v JavaScriptu. Popis různých možností."
date: "2013-11-23"
last_modification: "2013-12-02"
status: 1
tags: ["JavaScript", "Vybírání elementů"]
---

Elementy se **společnými znaky** (stejný název tagu, stejný název třídy) lze získat buď metodami `getElement*`, nebo od **IE 8** metodou [`querySelectorAll`](/queryselector). Oba postupy vrátí kolekci elementů.

Chceme-li se *získanými* značkami něco dělat (změnit jim **třídu**, přidat nějakou **funkci** do `onclick`u apod.), je potřeba je **projít cyklem**.

## Cyklus `for`

Časté řešení je běžný cyklus `for`, kde se prochází jednotlivé elementy do té doby, než se dosáhne počtu všech vybraných značek (`znacky.length`). (Pozor na překlep, `lenght` je špatně.)

Indexy značek se **číslují od nuly**, proto `var i = **0**`.

```
var znacky = document.getElementsByTagName("div");
for (var i = 0; i &lt; znacky.length; i++) {
  // znacky[i]
}
```

V případě, že chceme položky **procházet odzadu**, bude `for` vypadat následovně ([ukázka](http://kod.djpw.cz/xws)):

```
for (var i = znacky.length - 1; i >= 0; i--) {
  // znacky[i]
}
```

Tento postup **zezadu** by měl být **rychlejší** (nemusí se neustále procházet všechny značky a zjišťovat jejich počet — `znacky.length`).

Zrychlit první způsob cyklu `for` by šlo uložením *délky* do **pomocné proměnné** ([ukázka](http://kod.djpw.cz/ixs)).

```
for (var i = 0, delka = znacky.length; i &lt; delka; i++) {
  // znacky[i]
}
```

## Cyklus `for … in`

Při použití `for`/`in` cyklu by projití všech elementů mohlo vypadat následovně ([ukázka](http://kod.djpw.cz/wws)):

```
for (var i in znacky) {
  // znacky[i]
}
```

Nebezpečí hrozí při používání `for … in` pro [procházení polí](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=8&amp;topic=149917). Druhá nevýhoda je, že směr procházení elementů **nemusí být shodný napříč prohlížeči**.

## Cyklus `while`

Po `for … in` má asi nejstručnější zápis. Někdy může být nevýhoda, že prochází značky **od konce** a **srozumitelnost zápisu** nemusí být pro každého ([ukázka](http://kod.djpw.cz/gxs)).

```
var i = znacky.length; 
while (i--) {
  // znacky[i]
}
```

## Odkazy jinam

  - Todd Motto: [Simple forEach implementation for Objects/NodeLists/Arrays with automatic type looping](http://toddmotto.com/simple-foreach-implementation-for-objects-nodelists-arrays-with-automatic-type-looping/)