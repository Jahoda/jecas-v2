---
title: "Plynulé skrytí elementu"
headline: "Animované skrytí obsahu"
description: "Pomocí CSS <a href=\"/transition\"><code>transition</code></a> je možné <a href=\"/zobrazit-skryt\">skrývání a odkrývání textu</a> plynule <a href='/animace'>animovat</a> (od IE 10)."
date: "2013-09-14"
last_modification: "2013-09-17"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "Animace", "Přepínání vzhledu"]
---

Vymyslet se dají různé efekty jako zprůhlednění, snížení výšky na nulu, odlet a podobně.

function prohodit(element, trida) {
	element.className = element.className == trida ? "" : trida;
}

## Zmenšení výšky nebo šířky

### Zmenšení výšky

Pokud známe výšku elementu (např. `100px`), stačí animovat z `height: 100px` na `height: 0`.

Když má element `padding`, `margin` nebo `border`, je vhodné vynulovat i tyto vlastnosti.

Pro **čistě CSS** zmenšovací animaci elementu s **neznámými rozměry** je možné použít místo `width` či `height` jejich `max-*` varianty:

  - pro zmenšení **výšky** na nulu použít `max-height`,

  - pro zmenšení **šířky** na nulu použít `max-width`

Velikost `max-width/height` ve stavu viditelném se nastaví na vyšší hodnotu, než je skutečná očekávaná výška, ideálně, aby byla větší co nejméně, jinak nebude významnou část doby běhu animace viditelný výsledek.

Když se `max-height` *přežene*, animace mezi `100px` a `180px` nebude nijak pozorovatelná.

```
element {max-height: 2em; transition: max-height 1s}
element.skryt {max-height: 0}

```

    .zmenseni p.zmensit {max-height: 2em; overflow: hidden; transition: max-height 1s}
    .zmenseny p.zmensit {max-height: 0}
  
  Zobrazit/skrýt změnou výšky
    Odstavec, který se nezmenší.

  Obsah plynule skrývaný.

    Odstavec, který se také nezmenší.

### Snížení šířky

    .zuzeni p.zmensit {max-width: 15em; height: 2em; overflow: hidden; white-space: nowrap; transition: max-width 1s}
    .zuzeny p.zmensit {max-width: 0}
  
  **Zobrazit/skrýt změnou šířky**
    Odstavec, který se nezmenší.

  Obsah plynule skrývaný.

    Odstavec, který se také nezmenší.

### „Vyčištění“ prostoru

U jiných zmizení než snížení výšky zůstane po elementu zabraný prostor.

Vyčištění lze tedy zajistit třeba právě **snížením výšky** (`max-height: 0`). Něco jako `display: none` není možné v čistém CSS použít — vlastnost `display` nelze animovat.

Snížení výšky není problém zkombinovat s ostatními efekty zmizení — po *hlavní* skrývací animaci se může spustit rychlá *čisticí* animace.

Druhá možnost je použít JavaScript a při vyvolání animace vytvořit časovač, který v době skončení CSS animace nastaví elementu `display: none`.

## Průhlednost (`opacity`)

Pro plynulé snížení nebo zvýšení průhlednosti stačí prosté.

```
element {opacity: 1; transition: opacity 1s}
element.skryt {opacity: 0}
```

U ukázce je přidané *vyčištění* snížením výšky.

    .pruhlednost p {opacity: 1; max-height: 1.5em; margin: 1em 0; transition: opacity .5s .3s, max-height 1s, margin .8s .2s}
    .pruhledny p {opacity: 0; max-height: 0; margin: 0; transition: opacity .5s, max-height 1s .2s, margin .8s}
  
  Zobrazit/skrýt změnou průhlednosti
  Obsah plynule skrývaný.

## Zmizení transformací

CSS nabízí v nových prohlížečích tzv. transformace. Jedna z nich se týká *měřítka* elementu.

```
element {transform: scale(1); transition: transform 1s}
element.skryt {transform: scale(0)}
```

    .transformace p.zmensit {-webkit-transform: scale(1); -moz-transform: scale(1); transform: scale(1); transition: all .5s}
    .transformovany p.zmensit {-webkit-transform: scale(0); -moz-transform: scale(0); transform: scale(0)}
  
  **Zobrazit/skrýt změnou měřítka**
    Odstavec, který se nezmenší.

  Obsah plynule skrývaný.

    Odstavec, který se také nezmenší.

## Odlétnutí

Použitím [relativní posice](/position#relative) a změnou souřadnic vytvoříme plynulé odjetí elementu. (Opět by měl element odlétnou minimálně o svojí šířku/výšku.)

```
element {position: relative; left: 0; transition: left 1s}
element.skryt {left: -15em}
```

    .odlet p {position: relative; left: 0; transition: left 1s}
    .odletly p {left: -15em}
  
  Zobrazit/skrýt odlétnutím
    Odstavec, který odlétne.

## Starší prohlížeče

Starší prohlížeče (tj. starší než **Internet Explorer 10**) nepodporující [`transition`](/transition) skryjí element bez animace.

V takových prohlížečích lze [docílit animace jedině JavaScriptem](/animace#js).