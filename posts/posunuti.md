---
title: "Posun obsahu v CSS"
headline: "Posunutí obsahu v CSS"
description: "Jak posunout jakýkoliv element někam jinam."
date: "2015-05-13"
last_modification: "2015-05-14"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady"]
---

V CSS existuje řada možností jak něco někam posunout.

## Margin

```
.posunuty {
  margin-top: 1em;
}
```

Asi nejčastější způsob, jak se elementy odsouvají, je využití vlastnosti [`margin`](/margin).

  Obsah
  
  Odsunutý obsah

Hodnota `margin`u může být i záporná, čímž se dají různé elementy **dostat přes sebe**.

  Obsah
  
  Odsunutý obsah překrývá jiný element  

V kombinaci s `padding`em jde toto chování šikovně využít třeba pro **zvětšování klikacích ploch**, kdy se hodnota `padding`u odečte.

  Text jakože tlačítko text

Při používání `margin`u může být problém, že se jeho hodnoty [slučují](/margin#spojovani).

## Relativní posicování

```
.posunuty {
  position: relative;
  top: 1em;
}
```

Rozdíl [relativního posicování](/position#relative) od `margin`u je hlavně v tom, že element s `position: relative` stále zabírá prostor na původním umístění.

  Obsah
  posunutý
  relativním posicováním

## Transformace `translate`

```
.posunuty {
  transform: translate(.5em, .4em);
}
```

Pro zvýšení rychlosti zejména animací byla zavedena CSS vlastnost `transform`. Prohlížeče dokáží elementy s transformací lépe optimalisovat. Hlavně díky tomu, že transformace **neovlivňuje své okolí**. Nefunguje ale v **IE 8**.

    .posun-transformace {
      display: inline-block;
      -webkit-transform: translate(.5em, .4em);
      -moz-transform: translate(.5em, .4em);
      -ms-transform: translate(.5em, .4em);
      transform: translate(.5em, .4em);
    }
  
  Obsah
  posunutý
  transformací translate

## Absolutní posicování

Posunu jde docílit i posicováním absolutním. Specifikum této techniky je, že absolutně posicovaný element **nebude zabírat místo**. Stejně tak se chová i `position: fixed`, jen je obsah navíc fixovaný na stránce.

  Obsah
    posunutý
    absolutním posicováním    

## Padding

Pro posunutí jde použít i `padding`. Jelikož je `padding` součástí vnitřku elementu, hodí se spíš při použití pro rodičovský element.

    .padding-obal {
        padding: 4em 1em;
    }
    .padding-obsah {
      background: #efefef;
    }

    Obsah odsazený `padding`em rodičovského elementu.

Výhoda v užívání `padding`u před `margin`em je v tom, že se dokáže díky [okrajovému box-modelu](/box-sizing#border-box) (`box-sizing: border-box`) započítávat do výšky/šířky.

## Rámeček `border`

Jedná se spíš o zřídka využitelnou metodu, ale hodí se v situacích, kdy se `margin` nemá od čeho *odrazit*. To se může stát u elementu s `clear: both`, co je za něčím [obtékaným](/float).

  Plovoucí obsah
  Obsah s clear, kde se margin neprojeví.

Jde to obejít mimo jiné právě nastavením průhledného rámečku.

  Plovoucí obsah
  Obsah s clear, odsunutý rámečkem.

## Stín

Trochu kuriosní způsob je využití stínu – CSS vlastnost [`text-shadow`](/text-shadow). Stínem textu bez rozmazání jde v podstatě vytvořit kopii původního obsahu a kamkoliv ji přesunout.

  Červená podoba tohoto textu je stín.

Stínů může být víc, čehož využívá:

    - [Hover efekty s `text-shadow`](/hover-efekty-text-shadow) – zajímavé hover efekty využívající stín textu

Nevýhoda je, že stín nejde označit kursorem myši a funguje až v **IE 10**.