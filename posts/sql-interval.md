---
title: "Záznamy z SQL za poslední hodinu, den, měsíc"
headline: "Záznamy z SQL za poslední hodinu, den, měsíc"
description: "Jak vybrat z SQL databáse záznamy za poslední minutu, hodinu, den, týden, měsíc atd."
date: "2014-05-02"
last_modification: "2014-05-02"
status: 1
tags: ["SQL"]
---

Při psaní aplikace **využívající databási** (např. MySQL) se dřív nebo později setkáme s potřebou vypisovat data za určité období do minulosti.

Vytvořit si požadované **datum pro porovnávání** je sice možné například v PHP, ale jako **elegantnější řešení** se mi jeví použití `SUBDATE`, `NOW` a `INTERVAL` přímo v SQL.

Funkce `SUBDATE` odečte od aktuálního data (`NOW`) stanovený interval.

Interval se zadává pomocí čísla a klíčového slova pro časový úsek (`MINUTE`, `HOUR`, `DAY`, `YEAR`). Pozor, klíčové slovo je **vždy v jednotném čísle**, tedy ne `DAY**S**`, `HOUR**S**` a podobně.

## Za poslední minutu

```
SELECT * FROM tabulka
WHERE datum > SUBDATE(NOW(), INTERVAL **1 MINUTE**)
```

## Za poslední hodinu

```
SELECT * FROM tabulka
WHERE datum > SUBDATE(NOW(), INTERVAL **1 HOUR**)
```

## Za poslední den (24 hodin)

```
SELECT * FROM tabulka
WHERE datum > SUBDATE(NOW(), INTERVAL **1 DAY**)
```

## Za poslední měsíc

```
SELECT * FROM tabulka
WHERE datum > SUBDATE(NOW(), INTERVAL **1 MONTH**)
```

## Za poslední rok

```
SELECT * FROM tabulka
WHERE datum > SUBDATE(NOW(), INTERVAL **1 YEAR**)
```

V případě, že je potřeba vypsat záznamy *za poslední měsíc* a tabulka obsahuje i **záznamy s datem v budoucnosti** (vyšším než aktuálním) – třeba u článků, které mají teprve vyjít, je potřeba **použít `BETWEEN`**.

```
SELECT * FROM tabulka
WHERE datum BETWEEN **NOW()** AND SUBDATE(NOW(), INTERVAL **1 DAY**)
```

## Následující den

Někdy je naopak potřeba vypsat záznamy, které mají datum v **následujícím období**. I tady už je nutné použít `BETWEEN` a záporný `INTERVAL`.

```
SELECT * FROM tabulka
WHERE datum BETWEEN **NOW()** AND SUBDATE(NOW(), INTERVAL **-1 DAY**)
```