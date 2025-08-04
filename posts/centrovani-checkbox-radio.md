---
title: "Zarovnání checkboxů a radiobuttonů"
headline: "Zarovnání checkboxů a radiobuttonů"
description: "Jak perfektně zarovnat popisek s checkboxem a radio přepínačem."
date: "2016-11-29"
last_modification: "2016-11-29"
status: 0
tags: []
---

Ovládací prvky typu [`checkbox`](/input#type-checkbox)  nebo [`radio`](/input#type-radio)  jsou běžnou součástí webových formulářů. Hezky je zarovnat s popisky je ale docela oříšek.

## Výchozí styly

Jeden z možných a relativně úspěšných postupů je do stylů těchto `&lt;input>`ů nezasahovat.

Výchozí styly prohlížečů zajišťují relativně zarovnané zobrazení – pokud se jedná o výchozí velikost písma (typicky 16 pixelů).

U většího/menšího písma ale zarovnání nesedí:

### Jaké jsou výchozí styly?

Zarovnání je zajištěno vlastností [`margin`](/margin):

```
input[type="checkbox" i] {
    margin: 3px 3px 3px 4px;
}
```

Použití `margin`u v kombinaci s hodnotami v pixelech naznačují, že při změně velikosti písma přestane fungovat.

### Centrování výchozího

Vycentrovat svisle výchozí radio/checkbox není úplně snadné. Nejspolehlivější je vertikální centrování pomocí absolutního posicování.

Druhá možnost je vytvořit předpis pro několik základních velikostí písma a přesného zarovnání docílit [relativním posicováním](/position#relative).

## Vlastní checkbox/radio

Stoprocentní řešení je nepoužívat systémové prvky a checkboxy/radia si vytvořit kompletně vlastní.

  - [Živá ukázka](http://kod.djpw.cz/aedc) – různé velikosti 

  - [Živá ukázka](http://kod.djpw.cz/cedc)