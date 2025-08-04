---
title: "JS querySelector"
headline: "Výběr elementů <code>querySelector</code>em"
description: "Metoda <code>querySelector</code> a <code>querySelectorAll</code> zjednodušuje výběr elementů v JavaScriptu."
date: "2013-11-22"
last_modification: "2013-11-30"
status: 1
tags: ["JavaScript", "Vybírání elementů"]
---

Chceme-li na stránce **najít pomocí JS** nějaký element, existuje několik možností.

  - Procházet DOM metodami typu `getElementsByTagName`.

  **Cílovému** elementu přidat [ID](/id-class) a **najít** ho přes:
  ```
var element = document.getElementById("idecko");
```

  Použít JS knihovnu jQuery/[Zepto](/framework-zepto), kde se dá používat běžné [CSS selektory](/css-selektory):
  ```
var element = $("#id");
var odkazyVTabulkach = $("table a");
```

  Použít právě `querySelector`/`querySelectorAll`, který umí od **IE 8** totéž bez nutnosti natahovat **několik desítek kB velkou knihovnu**.
  ```
var element = document.querySelector("#id");
var odkazyVTabulkach = document.querySelectorAll("table a");
```

## Podpora

Funguje *částečně* (nebo spíš *neúplně*) už v **IE 8**. Částečně v tom smyslu, že *zná* jen ty selektory, co fungují ve stejném prohlížeči i v CSS. Tedy jen částečně funguje třeba i v **IE 9**, kde nebude znát např. [pseudotřídu `:valid`](/css-selektory#validace) ([test](http://kod.djpw.cz/pts)).

Nicméně většina CSS selektorů už v IE 8 funguje. Proto je i třeba `querySelectorAll` výhodnější než metoda `getElementsBy**ClassName**`, která funguje až od **IE 9**.

## Zápis

Použití je obdobné jako `getElement(s)By*` metody. Rozdíl mezi `querySelector` a `querySelector**All**` spočívá v tom, že:

  - `document.querySelector(".trida")` — vrátí **první element** s třídou `trida`.

  - `document.querySelector**All**(".trida")` — vrátí **kolekci všech elementů** s třídou `trida`.

Procházet pole elementů je možné klasickým způsobem ([ukázka](http://kod.djpw.cz/rws)):

```
var znacky = document.querySelectorAll(".trida");
for (var i = 0; i &lt; znacky.length; i++) {
  // znacky[i]
}

```

## Zápis `$("element")`

S využitím `querySelector`u je možné docílit *dolarového* zápisu, který se stal populární v JS frameworcích ([ukázka](http://kod.djpw.cz/oobb)).

```
function $(selektor, el) {
  if (!el) el = document;
  var elementy = el.querySelectorAll(selektor);
  return elementy;
}
```

 1 ? elementy : elementy[0] -->