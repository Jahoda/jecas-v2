---
title: "CSS counter"
headline: "CSS <code>counter</code>"
description: "Automatické číslování v CSS za pomocí <code>counter-increment</code>, <code>counter-reset</code> a <code>counter</code>."
date: "2014-04-12"
last_modification: "2014-04-12"
status: 1
tags: ["CSS", "CSS vlastnosti", "CSS funkce"]
---

Když do stránky umístíme číslovaný seznam `&lt;ol>`, budou mít jednotlivé položky `&lt;li>` **automatické číslování**. Není do kódu nutné čísla ručně psát, ale zajistí je prohlížeč.

    - První

    - Druhý

    - Třetí

Atributem `start` pro `&lt;ol>` je navíc možné nastavit počáteční číslo, které se bude *inkrementovat* (zvyšovat).

    - Čtvrtý

    - Pátý

To jsou zhruba všechny možnosti, které nabízí přímo HTML. Na všechno ostatní je tu `counter` v CSS.

## Funkčnost v prohlížečích

Funguje v **IE 8** a novějších.

## Použití

Nasimulování číslování v běžném `&lt;ol>` by vypadalo následovně ([ukázka](http://kod.djpw.cz/rrcb)):

```
ol {
  counter-reset: **seznam**;
}
li:before {
  counter-increment: **seznam**;
  content: counter(**seznam**) ". ";
}
```

Funkčnost je následující:

  `counter-reset`
  
    Vyresetuje *počítadlo* s názvem `seznam` na číslo `0`. Jednotlivé čítače lze do sebe libovolně **zanořovat** a vytvářet i více úrovní.

    Ve většině prohlížečů (kromě staré **Opery 12**) je nutné `counter-reset` použít, jinak nebude počítadlo fungovat.

  `counter-increment`
  
    Zvýší nebo sníží pořadové číslo čítače `seznam`. Výchozí chování je **zvýšit o jedničku**.

    Naopak **odečítání** nebo vyšší krok lze nastavit číslem za názvem čítače.

    ```
element:before {
  counter-increment: seznam **+2** druhySeznam **-4;**
  content: counter(seznam) "." counter(druhySeznam)
}
```

    Výše uvedený kód tedy zvýší čítač `seznam` o `2` a čítač `druhySeznam` sníží o `4`. Ano, dá se **zvyšovat více čítačů naráz**. Že tento (nejspíš absurdní) příklad funguje dokládá [živá ukázka](http://kod.djpw.cz/srcb).

  `counter`
  Funkce `counter` potom slouží k přečtení hodnoty čítače. Tato hodnota se jako obsah `:before`/`:after` pseudo-elementu nastaví přes CSS vlastnost [`content`](/content).

## Číslování kapitol

Zajímavější příklad `counter`u je například číslování nadpisů. [Ukázka](http://kod.djpw.cz/wucb).

## Styl číslování

Jako druhý parametr *funkce* `counter` se dá předat podoba čísla/symbolu číslování. Možné hodnoty jsou stejné jako u `list-style-type`. Pochopitelně v případě použití **nečíselných stylů** se čítače nijak neprojeví. Tedy visuálně. V pozadí se čítač navýší, i když by byl skryt hodnotou `none`.

```
element:before {
  counter-increment: citac;
  content: counter(citac, **upper-roman**);
}
```

Tento čítač bude používat **římské číslice**. Ty mohou být velká (`upper-roman`) nebo malá (`lower-roman`). Stejně tak jde použít *číslování* písmeny (`upper-alpha` a `lower-alpha`).

Upravená [živá ukázka](http://kod.djpw.cz/vucb) to hezky ilustruje.

## Odkazy jinam

  - [Specifikace čítačů na W3C](http://www.w3.org/TR/css3-content/#counters)

  - [Hodnoty `list-style-type` na JPW](http://www.jakpsatweb.cz/css/list-style-type.html)