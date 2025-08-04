---
title: "Šachovnicový výpis položek"
headline: "Šachovnicový výpis položek"
description: "Jak vypsat položky sestávající ze dvou sloupců, aby se pořadí sloupců střídalo."
date: "2014-10-29"
last_modification: "2014-11-01"
status: 1
tags: ["CSS", "Hotová řešení", "Tabulky"]
---

Cílem je vytvořit výpis položek, kdy obrázek a jeho popis je na střídačku. Na lichém řádku je popis vlevo a obrázek vpravo, na sudém řádku obráceně.

  - Výška obrázku i textu je **neznámá**.

  - Někdy může být vyšší obrázek, jindy text.

  - Výška řádku je určena tím, **co je vyšší**.

  - Nižší položka je potom svisle [centrovaná](/centrovani).

  - Při zobrazení na malé obrazovce, kdy se obrázek a popis nevejdou vedle sebe, má být vždy popis nad obrázkem.

Mělo by to vypadat nějak takto:

## Centrování

Kvůli svislému centrování je jasné, že bude třeba použít [tabulkové hodnoty vlastnosti `display`](/display#tabulkove). Šlo by použít i [flexboxy](/flexbox), ale ty fungují až od **IE 10**.

Vytvoří se tedy *CSS tabulka*:

```
.tabulka {
    display: table; 
    width: 100%;
}
.radek {
    display: table-row;
}
.bunka {
    display: table-cell; 
    vertical-align: middle; 
    width: 50%; 
    text-align: center;
}
```

[Živá ukázka](http://kod.djpw.cz/yygb)

Pro zobrazení na malých zařízeních se potom tabulka [„rozláme“](/responsivni-tabulky#rozlamani).

```
@media (max-width: 600px) {
    .bunka, .radek, .tabulka {
        display: block; 
        width: auto; 
        text-align: left;
    }
}
```

## Prohození sloupců

Po vycentrování zbývá *jen* prohodit sloupce sudých řádků. Od **IE 9** pro jejich zaměření funguje [selektor n-tého potomka](/css-selektory#n-ty-potomek):

```
.radek:**nth-child**(even) {
  /* styly pro sudý řádek */
}
```

To `even` znamená anglicky sudý, lichý je potom `odd`. Pro případnou funkčnost v **IE 8** je nutné příslušné třídy přidat *ručně* (serverovým skriptem).

### Vlastnost `transform: translate`

Od **IE 9** jde používat tzv. *CSS transformace*. Jedna z nich se jmenuje `translate` a umí **přesouvat objekty na stránce**.

Na sudých řádcích potom takto můžeme obsah vlevo dostat doprava posunutím o 100 % šířky:

```
transform: translate(**100%**, 0);
```

Analogicky dostat obsah zprava doleva. Tentokrát odečtením 100 % šířky:

```
transform: translate(**-100%**, 0)
```

Druhý parametr funkce `translate` určuje svislé posunutí, to je nulové, protože potřebujeme posouvat jen **vodorovně**.

[Živá ukázka](http://kod.djpw.cz/fzgb)

### Relativní posicování

Podobného efektu jde ale obdobným způsobem docílit i [relativním posicováním](/position#relative) s daleko lepší podporou.

[Živá ukázka](http://kod.djpw.cz/gzgb)

### Změna směru textu

S originálním řešením přišel [**Chamurappi**](http://webylon.info). To spočívá ve využití CSS vlastnosti `direction`, která určuje, jestli je text psán (standardně) zleva doprava (`ltr` – left to right) nebo naopak zprava doleva (`rtl` – right to left).

Když totiž tabulce nastavíme `direction` *zprava do leva*, prohodí se pořadí sloupců. Pro buňky se `direction` zase vrátí, aby se text **správně zobrazoval**, a sloupce jsou elegantně prohozeny.

Měnit `direction` je nutné pro **celou tabulku**, nestačí to jen pro samostatný řádek.

[Živá ukázka](http://kod.djpw.cz/hzgb)

Tento postup jde kromě **skutečných tabulek** využít i u „CSS tabulek“, čímž vznikne asi nejlepší řešení tohoto problému.

[Živá ukázka](http://kod.djpw.cz/izgb)