---
title: "Funkce getElementById a getElementsByTagName"
headline: "Metody <code>getElementById</code> a <code>getElementsByTagName</code>"
description: "Vybírání elementů v JavaScriptu metodami <code>getElementById</code>, <code>getElementsByTagName</code> a <code>getElementsByClassName</code>."
date: "2014-03-31"
last_modification: "2014-03-31"
status: 1
tags: ["JavaScript", "Vybírání elementů"]
---

Chceme-li v JavaScriptu pracovat s nějakým HTML elementem, který už na stránce existuje, dají se k tomu použít `getElement*` metody.

Používání těcho metod se týká hlavně psaní kódu pro prohlížeče **IE 7** a starší, které ještě neznají metody [querySelector/querySelectorAll](/queryselector) – vybírání elementů pomocí běžných [CSS selektorů](/css-selektory).

V novějších prohlížečích (**IE 8**+) je `querySelector:`

  - kratší na zápis,

  - universálnější, takže jsou pohodlnější případné změny.

## `getElementById`

Vrátí první element s požadovaným ID. (Poznámka: podle HTML specifikace by na stránce mělo být jedno ID použito jen jednou, nicméně JavaScript (a koneckonců ani CSS) nemá výrazný problém s nedodržením.)

```
var element = document.getElementById("**idecko**");
```

## `getElementsByTagName`

Vybere všechny HTML značky s daným názvem. Při zápisu těchto metod se často plete písmeno `s` za „`getElement`“. U metody `getElementBy**Id**` se „`s`“ nepíše, u `getElement*s*By**TagName**` naopak ano (i v případě, že je potřeba vybrat pouze první element daného názvu).

Následující tvary jsou **proto chybné**:

  - `document.getElement**s**ById`

  - `document.getElemen**t**ByTagName`

  - `document.getElemen**t**ByClassName`

### Procházení elementů

Jelikož `getElementsByTagName` nevrátí konkrétní element, ale pole elementů (tzv. `nodeList`). Je potřeba kolekci elementů [projít cyklem](/js-cykly) nebo použít číselné indexy (jsou číslovány od nuly):

```
var prvniDiv = document.getElementsByTagName("div")**[0]**;
var tretiDiv = document.getElementsByTagName("div")**[2]**;
```

Jednoduchý průchod všemi `&lt;div>`y stránky.

```
var znacky = document.getElementsByTagName("div");
for (var i = 0; i &lt; znacky.length; i++) {
  // znacky[i]
}
```

## `getElementsByClassName`

Tato metoda se chová podobně jako `getElementsByTagName`, jen vybírá, jak už název vypovídá, podle názvu třídy.

```
var zlute = document.getElementsBy**Class**Name("zlute");

Výše uvedený kód přiřadí do proměnné `zlute` kolekci elementů s CSS třídou „`zlute`“. Procházení cyklem je shodné jako u předchozí metody.

Z důvody slabší podpory (**IE 9** a novější), než je u `querySelector`u, ale nedává používání `getElementsByClassName` moc smysl.

## Skládání `getElement` metod

Metody `getElement` je možné řetězit. První element s třídou `zluty` v druhém `&lt;div>`u v elementu s ID `idecko` vybere následující kód:

var element = document.getElementById("idecko")
                      .getElementsByTagName("div")[1]
                      .getElementsByClassName("zluty")[0];
```

[Ukázka](http://kod.djpw.cz/socb).

Zde už je elegance `querySelector`u jasně patrná. Ekvivalentní kód s jeho využitím by mohl být:

```
var element = document.querySelector(
  "#idecko > div:nth-child(2) > .zluty:first-child"
);
```

[Ukázka](http://kod.djpw.cz/tocb). I když to vyžaduje znalost pokročilejších CSS selektorů. A podpora napříč prohlížeči je limitována nejen podporou `querySelectoru` (**IE 8+**), ale i [selektoru n-tého potomka](/css-selektory#n-ty-potomek) (**IE 9** a novější).

Ještě větší rozdíl je u komplikovanějších selektorů jako třeba přímý potomek (`.rodic > .potomek`), selektor sourozence (`.prvni + .druhy`) a podobně. Zde už je nutné bez `querySelector`u testovat `parentNode`, `previousSibling`, `nextSibling`, regulárními výrazy `className` u komplikovanějších **atributových selektorů** a podobně.

## Ověření existence elementu

V případě, že chceme s vybraným elementem nějak pracovat, a **není úplně jisté, že bude existovat**, je vhodné ověřit existenci. Přístup k vlastnostem neexistujícího elementu vyhazuje chyby. Potřebná podmínka je primitivní.

```
var element = document.getElementById("idecko");
if (element) {
  element.style.display = "block";
}
```