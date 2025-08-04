---
title: "Animovaný přesun elementu"
headline: "Animovaný přesun elementu"
description: "Jak jeden element přemístit do jiného s plynulou změnou umístění."
date: "2014-05-17"
last_modification: "2014-05-17"
status: 0
tags: []
---

Pro lepší uživatelský dojem se může hodit nějaký prvek z bodu A do bodu B přesunou plynule JavaScriptem.

Třeba položka v e-shopu se po přidání do košíku může do něj visuálně přesunout. Uživatel tak získá přehled, kde se košík na stránce nachází.

## Přesun elementu

Vyjmout někde HTML element a vložit ho do jiného rodiče je v JavaScriptu velmi jednoduché:

```
cil.appendChild(element);
```

První myšlenka pro animovaný přesun tak může znít, že se spočítá cílové umístění, element se tam pouze visuálně přemístí transformací `translate` (nebo hůře [absolutním posicováním](/position#absolute)) a po dokončení přesunu se provede skutečné přemístění v [DOMu](/dom) přes `appendChild` a transformace se zruší.

[Živá ukázka](http://kod.djpw.cz/orsb) – přesun transformací a přehození elementu

[Živá ukázka](http://kod.djpw.cz/lhdb)

## FLIP – lepší řešení

S ohledem na rychlost existuje ale lepší postup. Nazvaný zkratkou FLIP (First, Last, Invert, Play):

  - 

  - [FLIP Your Animations](http://aerotwist.com/blog/flip-your-animations/)