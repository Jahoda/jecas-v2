---
title: "CSV soubor"
headline: "CSV soubor"
description: ""
date: "2019-11-20"
last_modification: "2019-11-20"
status: 0
tags: []
---

**CSV** je zkratka *comma separated values*, tedy česky hodnoty oddělené čárkami.

Nejčastěji se používá pro export/import dat. A umí s ním pracovat **MS Excel** či jiné tabulkové aplikace.

Vypadá to nějak takto:

```
hodnota,hodnota
"Další hodnota","Další hodnota"
```

Bohužel je zde v **Excelu** problém, že CSV není vždy úplně oddělené čárkou. Ve Windows se Excel řídí nastavením systému, konkrétně nastavením oddělovače seznamu a oddělovače desetiných čísel.

Výchozí nastavení v českém **Windows** je středník `;` pro seznamy a čárka `,` pro desetinná čísla.

Kvůli tomu se standardní CSV v **Excelu** při běžném otevření nenačte správně. Byl by potřeba zápis oddělený středníky:

```
hodnota**;**hodnota
"Další hodnota"**;**"Další hodnota"
```

Ten ale zase nebude správně fungovat v prostředích, kde je oddělovač seznamů čárka a desetinných míst tečka.

**Co s tím?**

## Nastavení oddělovače

V některých versích MS Excelu funguje přidání tohoto na první řádek:

```
sep=,
```

Bohužel to nefunguje v různých jiných tabulkových programech, kde se to zobrazí jako data.

## Import/export CSV v Excelu

Jak tyto problémy obejít je CSV do Excelu importovat.