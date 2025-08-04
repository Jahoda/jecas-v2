---
title: "Rychlost a náročnost transition: all"
headline: "Výkon animací s <code>transition: all</code>"
description: "Je lepší psát <code>transition: all</code>, nebo vyjmenovávat vlastnosti, které se mají animovat?"
date: "2017-02-23"
last_modification: "2017-04-26"
status: 1
tags: ["CSS", "CSS vlastnosti", "Rady a nápady"]
---

Pomocí CSS vlastnosti [`transition`](/transition) jde snadno vytvářet plynulé přechody mezi stavy přímo v CSS.

Následující kód způsobí, že po najetí bude [odkaz](/odkaz) plynule přebarven z červené na modrou:

```
a {
  color: red;
  transition: color .3s;
}
a:hover {
  color: blue;
}
```

Při animování většího počtu CSS vlastností jde uvést klíčové slovo `all`:

```
transition: **all** .3s;
```

Odpadá tak nutnost vyjmenovávat více vlastností, co se mají animovat.

```
transition: color .3s, opacity .3s, background-color .3s
```

## Rychlost

Mohlo by se zdát, že vyjmenování všech vlastností, které se mají animovat, bude úspornější k systémovým prostředkům.

Podle mých testů (při [měření v DevTools → *Timeline*](/vykreslovani#mereni)) je ale rozdíl mezi vyjmenováním hodnot a použitím `all` naprosto zanedbatelný, navíc použití `all` je **nepatrně rychlejší**.

    - [Živá ukázka #1](http://kod.djpw.cz/offc-) – animace tří CSS vlastností klíčovým slovem `all`

    - [Živá ukázka #2](http://kod.djpw.cz/pffc-) – totožná animace s výčtem vlastností

Zdá se tedy, že prohlížeče dokáží rozpoznat, které vlastnosti je možné animovat a zároveň u nich nastala změna.

## Výhody `transition: all`

Otázka výkonu je tedy zanedbatelná.

Zajímavější je:

    **stručnější zápis** – není potřeba všechny vlastnosti vyjmenovávat,

    **společná délka animace** – většinou je žádoucí mít všechny přechody stejně dlouhé; potom není nutné dobu uvádět duplicitně,

    **automatické přechody** – po přidání nové animovatelné vlastnosti bude automaticky animovaná

## Proč nepoužívat `transition: all`

Důvody, proč se automatickému animování všeho co jde vyhnout, plynou z podstaty chování `transition: all`.

    Potřeba animovat jen něco. Použití `all` může zanimovat i vlastnosti, které se animovat nemají.

    Animovat různé vlastnosti různou dobu.

    Při vyjmenování vlastností může být kód čitelnější (je jasné, co má autor zájem animovat).