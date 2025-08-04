---
title: "Column – obsah ve sloupcích"
headline: "Vícesloupcový text a <code>column</code>"
description: "CSS vlastnost <code>column</code> umožňuje rozdělení textu do více sloupců."
date: "2013-06-19"
last_modification: "2015-08-04"
status: 1
tags: ["CSS", "CSS vlastnosti", "Hotová řešení"]
---

V novinách nebo časopisech je běžné, že je text **rozdělen do více sloupečků**. Pro docílení tohoto efektu na webové stránce existují CSS vlastnosti `column-*`.

## Podpora

Tvorba sloupců s využít CSS vlastností `column-*` funguje od **Internet Exploreru 9**. V **Chrome**/**Opeře** je nutno použít [CSS prefix](/css-prefixy) `-webkit-`, ve **Firefoxu** zase `-moz-`. Ve staré **Opeře 12** funguje samotné `column-*` jako v **IE 9** a novějších.

Ukázka rozdělení [seznamu `&lt;ul>`](/seznamy):

    - První

    - Druhá

    - Třetí

    - Čtvrtá

    - Pátá

    - Šestá

    - Sedmá

    - Osmá

    - Devátá

## Vlastnost `column-*`

Pro nastavení sloupců existují následující vlastnosti:

  ZnačkaVýznam
  `column-count`počet sloupců
`column-gap`šíře mezery mezi sloupci 

`column-rule`styl oddělovače sloupců, funguje podobně jako `border` (analogicky lze rozdělit na 3 vlastnosti `column-rule-color`, `column-rule-style` a `column-rule-width`).
`column-width`šířka jednoho sloupce
  `columns`zkratka; sdružení `column-count` a `column-width` do jedné vlastnosti
`column-span`
`column-fill`-->

### Změna počtu sloupců

Užitečné chování CSS `column` spočívá v tom, že se počet sloupců dokáže **sám průběžně měnit** podle dostupného prostoru. V případě, že se zadá šířka (`column-width`), se tento rozměr chápe jako minimální, kdy se při zúžení sloupeček odebere.

    - [Živá ukázka](http://kod.djpw.cz/htob) – při změně dostupné velikosti se mění počet sloupců

## Používat sloupce?

Stručně řečeno: **Ne**.

Web funguje jinak než časopis nebo noviny – **není rozdělen na jednotlivé stránky**, ale text plyne nerozděleně shora dolů.

Použití více sloupců bude tedy pro návštěvníky většinou **nezvyklé a nepřehledné**.

Možná existují výjimky, kdy je použití více sloupců užitečné, ale moc mě jich nenapadá (budu rád, když mi dáte tip do komentářů).

    - [Responsivní navigace pomocí `column`](http://kod.djpw.cz/mtob-) – příklad navigace měnící počet sloupců

## Více sloupců ve starších prohlížečích

Ve starších prohlížečích existují dvě možnost řešení:

  - *Přesypávání* obsahu JavaScriptem.

  - Hackování v CSS.

Následující ukázka je funkční od **Internet Exploreru 7**. Používá se primitivní metoda selektoru sourozence ve stylu `li+li+li+li+li+li` a [relativní posicování](/position#relative).
  
Od páté položky v seznamu se začne tvořit **nový sloupec**.

      ul.sloupcovemenu {width: 100%; margin: 0; padding: 5px; height: 10em; text-align: center; list-style: none}
      ul.sloupcovemenu {overflow: hidden}
      ul.sloupcovemenu li {line-height: 2em; width: 50%; display: block;}
      ul.sloupcovemenu li {border-right: 1px solid #0D6AB7; float: left; clear: left;}
      ul.sloupcovemenu li+li+li+li+li+li {float: right; clear: right; position: relative; top: -10em; border: none}

    - První

    - Druhá

    - Třetí

    - Čtvrtá

    - Pátá

    - Šestá

    - Sedmá

    - Osmá

    - Devátá

## Responsivní tabulka ve sloupcích

V SCSS:

```
.table-column {
    display: block;
    width: 100%;

    &amp;__body {
        display: block;
        width: 100%;

        @include respond(880, 1039) {
            column-count: 2;
        }

        @include respondMin(1140) {
            column-count: 2;
        }

        @include respondMin(1440) {
            column-count: 3;
        }
    }

    &amp;__row {
        display: table;
        width: 100%;
        break-inside: avoid;
    }

    &amp;__cell {
        display: table-cell;
        border-top: 1px solid silver;

        &amp;--join {
            padding: 0;
        }
    }
}
```