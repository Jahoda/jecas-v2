---
title: "Margin: auto"
headline: "Psát <code>margin: auto</code>, nebo <code>margin: 0 auto</code>?"
description: "CSS konstrukce <code>margin: auto</code> se obvykle používá pro vodorovné centrování bloku."
date: "2015-05-18"
last_modification: "2015-05-19"
status: 1
tags: ["CSS", "CSS vlastnosti", "Rady a nápady"]
---

Má-li nějaký blokový element **nastavenou šířku**, jde ho pomocí levého a pravého [`margin`u](/margin) nastaveného na hodnotu `auto` **vodorovně vycentrovat**.

    - [Centrování v CSS](/centrovani) – popis různých způsobů centrování

Často je k vidění, že někdo centrování `margin`em zapisuje předpisem `margin: **0** auto`. Přitom nula pro horní a spodní odsazení se stejně tak aplikuje při hodnotě `auto` pro všechny strany. Zápis `margin: 0 auto` je tedy zbytečně komplikovaný a stačí použít:

```
.centrovany {
  margin: auto;
}
```

Výsledek je stejný. Tedy `margin-top` a `margin-bottom` budou nulové a element bude umístěn uprostřed.

Nejspíš jediná výjimka, kdy se výsledek `margin: auto` a `margin: 0 auto` liší, je [centrování absolutním posicováním](/centrovani#absolutni-margin).

## Zachování původního `margin`u

Pokud je cílem element pouze vycentrovat a zachovat původní hodnoty odsazení, nabízí se dvě možnosti:

    Přepsat pouze krají hodnoty:

    ```
.centrovany {
  margin-left: auto;
  margin-right: auto;
}
```

    Využít klíčového slova `inherit`. Funkční od **IE 8**.

    ```
.centrovany {
  margin: **inherit** auto;
}
```

    Hodnota `inherit` způsobí, že se hodnota podědí.