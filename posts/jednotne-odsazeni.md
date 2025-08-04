---
title: "Jednotné odsazení v CSS"
headline: "Jednotné odsazení v CSS"
description: "Jak postupovat, aby napříč webem byly mezi elementy stejné rozestupy."
date: "2015-10-06"
last_modification: "2016-02-18"
status: 1
tags: ["CSS", "Rady a nápady"]
---

U rozsáhlejší webové stránky nebo aplikace je typicky na stránce několik bloků, mezi kterými je odsazení. Zajistit, aby jednotlivé **mezery nebyly náhodné**, ale měly nějaký řád, dá docela práci.

Problém je kvůli:

  - Slučování CSS vlastnosti `margin`.

  - Neprojevení se `margin`u, nemá-li rodič `padding`, `border` apod.

## Příklad

Typicky je obsah stránky v nějakém obalu:

```
&lt;div class="obal">
&lt;/div>
```

Běžný text se potom píše do odstavce:

```
&lt;div class="obal">
  &lt;p>Text&lt;/p>
  &lt;p>Text&lt;/p>
&lt;/div>
```

Odstavce mají ve výchozích stylech horní a dolní [`margin`](/margin). Hodnoty `margin`u mezi odstavci se potom slučují – rozestup se rovná vyššímu z odsazení. V případě stejného odsazení se vezme jen jedna hodnota.

  Text

  Text

Aby obsah nebyl nalepený na `.obal`, přidá se mu nějaký `padding`, stejný pro všechny strany:

  Text

  Text

To najednou způsobí, že se projeví horní a dolní odsazení `margin`em, který mají odstavce. Ve výsledku je tedy odsazení zdola a shora **dvojnásobné oproti krajům**.

Co teď s tím? Vynulovat horní a dolní `padding` obalu?

```
.obal {
  padding: 0 1em;
}
```

Potom se přece zase přestane `margin` vnořených odstavců nahoře a dole projevovat.

  Text

  Text

## Oříznutí `overflow: hidden`

Docílit projevu `margin`u na okrajích jde třeba pomocí `overflow: hidden`. To je ale problematické v případě, že by bylo potřeba, aby něco z obalu vylézalo ven.

  Text

  Text

## Rámeček a záporný `margin`

Odsazení se projeví i při **použití rámečku**. Jde tedy přidat tenký `border` v barvě okolí nahoru a dolu a následně jeho rozměry odečíst záporným marginem:

  Text

  Text

Tento postup ale spoléhá na to, že je pozadí za *obalem* jednobarevné. V případě použití průhledného rámečku by za ním bylo pozadí obalu – tedy by odsazení bylo visuálně větší o šířku rámečku.

## První/poslední element

Mohlo by se nabízet řešení, kdy se prvnímu a poslednímu elementu zruší horní, respektive dolní `marign`. Se selektory [`:first-child`/`last-child`](/first-last-child) to není problém:

```
.obal :first-child {margin-top: 0}
.obal :last-child {margin-bottom: 0}
```

Na první pohled to vypadá dobře:

  Text

  Text

Bohužel nastane problém v případě, že obsah s `margin`em nebude přímo v `.obal`u, ale bude v ještě nějakém jiném elementu:

  Text

  Text

    Text odstavce v dalším obalu

### Pouze horní/dolní `margin`

Pokud by byla šance, že se uhlídá, aby `margin-top` prvního elementu (`:first-child`) byl nulový, jde používat dále jen `margin-top`).

V klasickém případě, kdy se pod sebou sejde vrchní element se spodním odsazením a spodní element s horním – rozměr se stejně **sloučí** – mezera bude rovna vyššímu z `margin`ů.

  Text

  Text

## Další obal s `margin`em

Docela prosté řešení je použít vnořený element, který u obalu rozměr horního a spodního `padding`u odečte záporným `margin`em:

    Text

    Text

## Zobrazení jako tabulka

Margin vnitřních elementů se projeví i v případě, že bude `.obal` zobrazen jako tabulka – [`display: table`](/display#tabulkove):

  Text

  Text

## Element jako odsazení

V případě, že odsazení od krajů u obalu **bude větší** než odsazení používané u jeho potomků, docela spolehlivé řešení je odsazení nahoře a dole uvnitř obalu vytvořit prázdnými elementy.

Nižší `margin`y potomků `.obal`u se sloučí s vyššími hodnotami odsazovacích elementů. Pro projevení odsazení se malinká část `margin`u odsazovacích elementů přidá do jejich `padding`u:

  Text

  Text

## Sežrání `margin`u

Protože není jisté, jaký spodní `margin` posledního elementu bude. Jde pomocí dalšího elementu vytvořit *margino-žrouta* – `&lt;div>`, který má velký `margin`, aby spolehlivě stanovil hodnotu po sloučení. Tato známá hodnota může být potom odečtena záporným `margin`em na opačné straně.

  Text

  Text

## Nepoužívat `margin`

Možné řešení je `margin` vůbec nepoužívat a rozestupy řešit všude `padding`em.

Není potom nutné přemýšlet nad slučováním a neprojevením se `margin`u, ale počítat s tím, že se odsazení sčítá.

[Živá ukázka](http://kod.djpw.cz/rqub)

V řadě případů to ale znamená komplikovanější HTML kód – používat zvláštní obaly jen pro odsazení.

## Závěr

Při psaní článku jsem zkoumal řadu webů, jestli jednotné odsazení nějak řeší. Zpravidla neřeší a odsazení jsou svým způsobem náhodná dle hesla „jak to vyjde“.

Zamysleli jste se někdy nad tímto problémem a oblíbili si nějaké řešení? Napište mi to, prosím.

  .priklad-odsazeni {
    padding: 0 1em;
  }

  .priklad-odsazeni-zrout-element-nahore {
    overflow: hidden;
    padding-top: .1em;
    margin-bottom: 10em;
    margin-top: -9.2em;
  }
  .priklad-odsazeni-zrout-element-dole {
    overflow: hidden;
    padding-bottom: .1em;
    margin-top: 10em;    
    margin-bottom: -9.2em
  }  

  .priklad-odsazeni-element-nahore {
    overflow: hidden;
    padding-top: .1em;
    margin-bottom: .9em;
  }
  .priklad-odsazeni-element-dole {
    overflow: hidden;
    padding-bottom: .1em;
    margin-top: .9em;    
  }

  .priklad-obal-tabulka {
    padding: 0 1em;
    box-sizing: border-box;
    width: 100%;
    display: table;
  }

  .priklad-obal-margin-vnitrni {
      margin: -1em 0;
  }

  .priklad-obal {
    background: #efefef;
  }
  .priklad-obal p {
    margin: 1em 0;
  }
  .priklad-obal-padding {
    padding: 1em;
  } 
  .priklad-obal-padding-nulovany {
    padding: 0 1em;
  }  
  .priklad-obal-overflow {
    padding: 0 1em;
    overflow: hidden;
  }    
  .priklad-obal-padding-border {
    padding: 0 1em;
    border-top: 1px solid blue;
    border-bottom: 1px solid blue;
    margin-top: -1px;
    margin-bottom: -1px;
  }      
  
  .priklad-last-first > :first-child {margin-top: 0}
  .priklad-last-first > :last-child {margin-bottom: 0}
  
  .priklad-jeden-margin {
    padding: 1em;    
  }
  .priklad-jeden-margin > :first-child {
    margin-top: 0;
  }
  .priklad-jeden-margin p {
      margin: 0;
      margin-top: 1em;
  }
  
  .priklad-outline {
    outline: 1px dotted red;
  }