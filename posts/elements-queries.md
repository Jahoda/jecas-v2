---
title: "CSS Elements Queries"
headline: "CSS Elements Queries"
description: "Jak zajistit různý vzhled elementů v závislosti na jejich rozměru."
date: "2015-11-13"
last_modification: "2018-06-22"
status: 1
tags: ["CSS", "Rady a nápady", "Responsivní design"]
---

Základním prvkem responsivního CSS je [pravidlo `@media`](/media), které umožňuje aplikovat různé styly v závislosti na velikosti dostupné plochy v okně prohlížeče.

```
@media (max-width: 40em) {
  /* kód pro šířku do 40 em */
}
```

Pro tuto techniku se používá název **Media Queries**.

**Element Queries** je zatím teoretický koncept, jak zvláštní styly připojit v závislosti na velikosti konkrétního elementu.

## Příklad problému

Pro zjednodušení jde uvažovat dvousloupcový layout, který se při šířce pod 40 em přeskládá pod sebe. [Ukázka](http://kod.djpw.cz/ucsb).

```
.sloupec {
  width: 50%;
  float: left;
}
@media (max-width: 40em) {
  .sloupec {
    width: 100%;
  }
}
```

Na toto přeskládání typicky budou navázány další úpravy elementů uvnitř sloupců.

Co ale v případě, že bude nutné **přidat sloupec třetí**?

Všechna `@media` pravidla pro vnitřní obsah budou mimo a bude je nutné předělat.

Ještě horší situace nastane v případě, že nějaký další sloupec bude volitelný (např. reklamní bannery pro nepřihlášené uživatele), najednou se musí vytvořit pro celý web dvě sady `@media` pravidel.

## Řešení s element query

Mnohem elegantnější a universálnější by tak bylo psát něco jako:

```
.obal-dvou-sloupcu**:media(max-width: 40em)** .sloupec {
  width: 100%;
}
```

Element `.sloupec` by měl potom `100%` šířku v případě že `.obal-dvou-sloupcu` je menší než 40 em.

## Problém implementace

Implementovat **Element Queries** do prohlížečů je trošku oříšek, protože vnitřní elementy mohou měnit rozměry svých rodičů a obráceně, čímž vzniká problém, zda bylo dřív vejce nebo slepice.

## Řešení v JavaScriptu

Zjistit aktuální rozměry jde snadno JavaScriptem. Například šířka je v `element.offsetWidth`.

Na základě toho jde v CSS přiřadit nějakou třídu, která zajistí požadovaný styl.

Problém řešení využívající JS je v tom, že zjišťování rozměrů a aplikace stylů způsobí překreslení stránky.

## Hotové řešení

Právě JS využívá hotové řešení [CSS Element Queries](https://github.com/marcj/css-element-queries) ([ukázka](http://marcj.github.io/css-element-queries/)):

Tento skript přidává elementům, které mají reagovat na změnu své velikosti, atributy `min`/`max-width`/`height`, které jde potom používat v CSS jako selektory:

```
.element {
  …
}

.element[min-width~="480px"] {
  …
}

.element[min-width~="480px"] .vnitrek {
  …
}
```

Řešení se snaží být relativně šetrné na výkon a funguje již od **IE 10**.

Nevýhoda je jeho závislost na JS, takže obsah využívající element queries po načtení a provedení skriptu **poskočí**, pokud tedy náhodou rozměry neodpovídají výchozí variantě (bez [atributového selektoru](/css-selektory#atributovy)).

## Flexboxy

Od **IE 10** jde v některých případech – jako je třeba [responsivní mřížka](/responsivni-mrizka) – vyřešit problém použitím [flexboxů](/flexbox).

Elementům se nastaví `flex-grow: 1` a pevná šířka (ne v procentech). Počet elementů se potom automaticky přizpůsobuje, aby vyplnil dostupný prostor, s tím, že se přibližně drží nastavená šířka.

    - [Obtékané boxy s proměnlivou šířkou](/responsivni-obtekane-boxy#flex)

## Odkazy jinam

  - [Beyond Media Queries — It’s Time to Get Elemental](http://www.sitepoint.com/beyond-media-queries-time-get-elemental/)

  - [Media Queries Are Not The Answer: Element Query Polyfill](http://www.smashingmagazine.com/2013/06/media-queries-are-not-the-answer-element-query-polyfill/)

  - [Thoughts on Media Queries for Elements](http://www.jonathantneal.com/blog/thoughts-on-media-queries-for-elements/)