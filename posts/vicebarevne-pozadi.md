---
title: "Vícebarevné pozadí"
headline: "Absolutně posicované pozadí"
description: "Jednoduché řešení vícebarevného pozadí absolutním posicováním."
date: "2013-06-21"
last_modification: "2013-06-22"
status: 1
tags: ["CSS", "Hotová řešení"]
---

Pokud by se pozadí nějakého elementu mělo skládat z různých barev, je nejjednodušší použít vícebarevný obrázek velkých rozměrů a nechat jej opakovat. Jak si poradit i bez obrázku pomocí CSS?

.obal {position: relative; color: #fff; z-index: 0; padding: 1em}
.pozadi {position: absolute; right: 0; top: 0; width: 50%; height: 100%; z-index: -1; background: #0D6AB7;}
.tmave {background: #1081DD; left: 0;}

	Řešení spočívá ve vytvoření absolutně posicovaných boxů `pozadi` (v `obal`u s `position: relative`) s rozměry 50 % na šířku a 100 % na výšku (funkční od Internet Exploreru 7). Jeden se umístí doleva (`left: 0`) a druhý doprava (`right: 0`).

`z-index`
Naprosto podstatné pro funkčnost je správné užití `z-index`u, tj. schovat *pozadí* za text, ale ne za další element.

```
.obal {position: relative; z-index: 0}
.pozadi {position: absolute; z-index: -1}
```