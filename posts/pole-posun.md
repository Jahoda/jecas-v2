---
title: "Posun v poli přes okraje"
headline: "Posun v poli přes okraje"
description: "Jak se z poslední položky pole dostat na první a obráceně."
date: "2015-01-07"
last_modification: "2015-01-08"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Při vytváření např. **obrázkových galerií v JavaScriptu** je často cílem dosáhnout zdánlivě nekonečné smyčky, kdy při kliknutí na „*Další*“ po posledním obrázku následuje obrázek první a naopak při kliknutí na „*Předchozí*“ se před prvním obrázkem objeví ten poslední.

Základ takového kódu může vypadat následovně:

```
var obrazky = document.[querySelectorAll](/queryselector)("#galerie img");
var pocetObrazku = obrazky.length;
var aktualniObrazek = 1;
```

Asi první řešení, co člověka napadne, je při změně hodnoty `aktualniObrazek`, kontrolovat, jestli není **mimo rozsah**.

  - není vyšší než počet obrázků (`pocetObrazku`),

  - není nižší než `1` (první obrázek)

Jde proto použít obyčejné `if` podmínky ve stylu:

```
aktualniObrazek = aktualniObrazek + posun;
if (aktualniObrazek > pocetObrazku) {
  aktualniObrazek = 1;
}
else if (aktualniObrazek &lt; 1) {
  aktualniObrazek = pocetObrazku;
}
```

V proměnné `posun` bude hodnota `1` pro posun dopředu a `-1` pro posun v zpátky.

[Živá ukázka](http://kod.djpw.cz/lijb)

## Posun o více než 1

Pokud je potřebné se v poli posouvat o **více než jednu položku**, bylo by původní řešení složitě rozšiřitelné. Bude tedy lepší vymyslet něco jiného.

### Modulo

Šikovná funkce je pro tento případ **modulo**, které vrátí celočíselný [zbytek po dělení](http://cs.wikipedia.org/wiki/Zbytek_po_dělení). V JS se zapisuje znakem procenta `%`.

```
10 % 3 = 1
7 % 4 = 3
10 % 5 = 0
```

Pro posun po poli tedy stačí sečíst `pocetObrazku` + `aktualniObrazek` + `posun` a zjistit zbytek po vydělení hodnotou `pocetObrazku`.

```
aktualniObrazek = 
  (pocetObrazku + aktualniObrazek + posun) % pocetObrazku;
```

Když bude celkem 5 obrázků, aktuální bude 4 a cíl je se posunout o 2 dopředu:

```
5 + 4 + 2 = 11
11 % 5 = **1**
```

Výsledek tak bude obrázek 1.

Pro případy, že by záporný `posun` byl větší než `pocetObrazku`, je vhodné aplikovat „`% (modulo) pocetObrazku`“ i na `posun`.

```
aktualniObrazek = (
  pocetObrazku + aktualniObrazek + (**posun % pocetObrazku**)
) % pocetObrazku;
```

[Živá ukázka](http://kod.djpw.cz/kijb)

## Číslování indexů

Při používání **číselných indexů** je nutné dbát na to, že bývají číslovány od nuly. Naopak živý člověk bude preferovat **číslování od jedničky**.

Čísla indexů vytvářejí trochu záludnou situaci, kdy počet prvků (`polozky.length`) bude třeba 5, ale nejvyšší index 4.