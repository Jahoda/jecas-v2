---
title: "Oříznutí CSS clip"
headline: "Oříznutí CSS vlastností <code>clip</code>"
description: "CSS vlastnost <code>clip</code> slouží k oříznutí obsahu elementu."
date: "2014-10-17"
last_modification: "2014-10-19"
status: 1
tags: ["CSS", "CSS vlastnosti", "CSS funkce"]
---

Už před rokem 2000 (od **IE 4**) bylo možné [absolutně posicované](/position#absolute) elementy oříznout ve tvaru obdélníku. [Více na JPW](http://www.jakpsatweb.cz/css/clip.html).

V roce 2014 začíná být pomalu možné provádět i ořezávání **nepravidelných tvarů** vlastností `clip-path`. Výhoda a velký rozdíl také je, že pro oříznutí už nemusí být element absolutně posicovaný.

## Podpora

Nepravidelné oříznutí podporuje **Chrome 24+**, **Opera 15+** a **Safari 8+**.

## Zápis

Tvar je možné zadat jako **polygon**.

Nejjednodušší útvar je proto **trojůhelník**.

```
element {
  clip-path: polygon(
    50% 0%, 
    0% 100%, 
    100% 100%
  );
}
```

Výsledek:

Funkci `polygon` se předávají jednotlivé body. Každý bod má dvě hodnoty – souřadnici zleva a souřadnici shora. Hodnotu je možné zadávat v **obvyklých délkových jednotkách**. Pro oříznutí, co se přizpůsobuje velikosti elementu, je vhodné použít **procenta**.

Zadané hodnoty mohou být i **mimo hranice** ořezávaného elementu (záporné nebo větší než 100 %). Oříznutí se ale aplikuje jen na element, co ho má nastavené.

Oříznutí je **skutečné**, tj. například po najetí myši bude oříznutý obsah reagovat jen na ploše, která po oříznutí zbyla.

[Živá ukázka](http://kod.djpw.cz/xpgb)

## Nástroje

Protože kreslit polygon pro oříznutí by byla nuda, existují nástroje, kde si jde potřebnou *cestu* naklikat.

[Clippy — CSS clip-path maker](http://bennettfeely.com/clippy/)