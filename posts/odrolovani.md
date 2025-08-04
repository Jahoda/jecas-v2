---
title: "Odrolování na element"
headline: "Odrolování na určitý HTML tag"
description: "Nestačí-li běžné odrolování na HTML #kotvu, přichází na řadu JavaScript."
date: "2013-05-20"
last_modification: "2013-05-24"
status: 1
tags: ["JavaScript", "Hotová řešení", "Scrollování"]
---

V JS stačí elementu, který se má odrolovat, nastavit vlastnost `scrollTop`/`scrollLeft` (pro odrolování shora, respektive zleva). Pro opačné strany (zdola, zprava) něco jako scrollBottom/scrollRight neexistuje, ale v podstatě není problém to dopočítat z výšky/šířky elementu). 

Nebo je možné použít metodu `scrollTo(X-souřadnice, Y-souřadnice)` (pro rolování celé stránky pomocí objektu `window`):
```
// Odrolovat na 50 px zleva a 100 px shora
window.scrollTo(50, 100);
```

document.write("Odrolovat na 20 px shora")

Posouvání nějakého elementu (např. s `overflow: auto`) vypadá následovně.
```
var element = document.getElementById("idecko");
// Odrolovat na 50 px shora
element.scrollTop = 50;
```

Na rozdíl od zadávání CSS hodnot (`element.style.top`) není třeba psát jednotky.

## O kolik je odrolováno

Prozradí logicky rovněž vlastnosti `scrollTop`/`scrollLeft` (přečtením namísto přenastavením).
Podobně jako u baterky je třeba sjednotit chování Chrome s ostatními prohlížeči pomocí:
```
var hodnota = document.documentElement.scrollTop + document.body.scrollTop
```

Chrome potřebuje `document.body`.

document.write("O kolik je?")

## Na konkrétní značku…

Tohle byla celkem nuda. Zajímavější je rolovat na nějaké dynamické hodnoty, tj. na souřadnice různých elementů.
Ty lze získat z vlastností `offsetTop`/`offsetLeft`, které obsahují souřadnice elementu vůči nejbližšímu předkovi, který souřadnice *nuluje* (má CSS vlastnost `position` jinou než `static` (výchozí), tj. např. `relative`). Dopočítat umístění vůči oknu u takového (zanořeného) elementu lze rekursí pomocí `offsetParent`.

Finální kód pro odrolování např. na 5. položku seznamu může vypadat následovně.
```
var seznam = document.getElementById("list");
seznam.scrollTop = seznam.getElementsByTagName("li")[4].offsetTop;

```

		- Položka 1

		- Položka 2

		- Položka 3

		- Položka 4

		- Položka 5

		- Položka 6

		- Položka 7

		- Položka 8

		- Položka 9

		- Položka 10

		- Položka 11

		- Položka 12

		- Položka 13

		- Položka 14

function odrolovat(kolikata)
{
var seznam = document.getElementById("list");
seznam.scrollTop = seznam.getElementsByTagName("li")[kolikata].offsetTop;
}

Odrolovat na: 5. položku, 1. položku, 8. položku