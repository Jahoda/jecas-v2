---
title: "Vertical-align"
headline: "CSS zarovnání <code>vertical-align</code>"
description: "Vertikální zarovnání řádku nebo buňky tabulky."
date: "2015-11-17"
last_modification: "2016-02-11"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

CSS vlastnost `vertical-align` slouží k **svislému zarovnávání**. Ošemetné na ní je, že funguje jen za určitých podmínek.

      Zarovnává se umístění [`inline`](/display#inline)/`inline-block` elementu na řádek.

      Zarovnává se obsah buňky tabulky (ať již element [`&lt;td>`](/html-tabulky) nebo cokoliv s `display: table-cell`).

## Zarovnání řádku

Zarovnání se často hodí pro elementy nižší než řádek jako ikonky:

    - [Ikona vedle odkazu](/odkaz-ikona) – jak přidat a zarovnat ikonku vedle odkazu

Další případ, kde se `vertical-align` používá jsou [horní a dolní indexy](/horni-dolni-index), které ve výchozím zobrazení rozhazují výšku řádků:

### Možné hodnoty

Na následující ukázce je vidět zarovnání malého čtverečku do řádku klíčovými slovy:

.radek {
  background: #efefef;
  padding: 0 .4em;
  margin: .4em;
  font-size: 120%;
  line-height: 2;
}
.radek span {
  width: .4em;
  height: .4em;
  background: #000;
  display: inline-block;
}

  Zarovnání  `baseline` (výchozí)
  Zarovnání  `sub` (dolní index)
  Zarovnání  `super` (horní index)
  Zarovnání  `middle` (střed)
  Zarovnání  `top` (nahoru na řádek)
  Zarovnání  `bottom` (dolů na řádek)
  Zarovnání  `text-top` (nahoru dle textu)
Zarovnání  `text-bottom` (dolů dle textu)

V některých případech se mohou některé způsoby zarovnání chovat totožně. Typicky, když je nízká výška řádku ([`line-height`](/font#line-height)), bude `top` a `text-top` na stejném místě.

Nízký řádek
Vyšší řádek

Byl-li by zarovnávaný element velký přes celý řádek nebo i víc, `vertical-align` se bude projevovat trochu podivně.

 span", "height", "3em")'>Vysoký element
 span", "height", ".4em")'>Malý čtvereček

[Samostatná živá ukázka](http://kod.djpw.cz/yiub)

Kromě klíčových slov je možné používat i délkové jednotky a procenta. Ty se odvíjí od výchozího umístění `baseline`. Kladné hodnoty posunou element směrem nad *baseline*, záporné pod baseline.

## Zarovnání v tabulce

Kromě řádku jde zarovnávat i obsah v buňce tabulky.

Zpravidla se používají hodnoty `top`, `bottom` a `middle` nastavované pro buňky:

.tabulka-va td {
  height: 5em;
}

    middle
    top
    výchozí

    bottom

[Samostatná živá ukázka](http://kod.djpw.cz/ziub)

## Zarovnání v `&lt;div>`u

Konstrukce `vertical-align: middle` se dá použít pro svislé [centrování](/centrovani):

.zarovnat {
    height: 15em;
    width: 20em;
    background: #efefef;
    display: table-cell;
    vertical-align: middle;
}

.blok {
    background: #ccc;
}

    Svisle centrovaný blok

Světle šedý obal má nastavenou výšku, `display: table-cell` a `vertical-align: middle`.

[Samostatná živá ukázka](http://kod.djpw.cz/ajub)

Naprosto klíčové je použít tabulkové zobrazení `table-cell` pro obalující `&lt;div>`, jinak se `vertical-align` neprojeví.

  function nastavit(selektor, vlastnost, hodnota) {
    var elementy = document.querySelectorAll(selektor);
    for (var i = elementy.length; i--;) {
      elementy[i].style.cssText += vlastnost + ":" + hodnota;
    }
  }