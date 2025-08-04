---
title: "Barva ukazatele caret-color"
headline: "Barva ukazatele <code>caret-color</code>"
description: "CSS vlastnost <code>caret-color</code> dokáže obarvit blikající ukazatel ve formulářových polích."
date: "2019-04-18"
last_modification: "2019-04-18"
status: 1
tags: ["Formuláře"]
---

Pro znázornění umístění, kde člověk zrovna píše, existuje tzv. *caret* (visuálně zpravidla blikající ukazatel).

Vlastnost `caret-color` dokáze tento ukazatel **přebarvit** nebo třeba **úplně skrýt**.

## Podpora

Dobře podporovaná vlastnost fungující prakticky všude kromě **IE** a **MS Edge** (do verse nepoužívající **Chromium**).

## Použití

```
element {
  caret-color: red;
}
```

Projevuje se potom nějak takto:

  bílý ukazatel
  
  žádný ukazatel

Může se projevit elementů umožňujících zadávat uživateli vstup, tj. [`&lt;input>`](/input), [`&lt;textarea>`](/textarea) nebo cokoliv s [atributem `contenteditable`](/uprava-stranky-designmode).

## Využití

Asi pouze v hodně ojedinělých případech. Barva ukazatele ve výchozím chování odpovídá hodnotě [`currentColor`](/currentcolor) – je tedy stejná jako barva textu. Takové chování je většinou dostatečně dobré.

Nastavení **málo kontrastního** nebo dokonce průhledného *caretu* (`caret-color: transparent`) potom může uživatele dost mást.

## Odkazy jinam

  - MDN: [`caret-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color)

  - CSS-Tricks: [`caret-color`](https://css-tricks.com/almanac/properties/c/caret-color/)