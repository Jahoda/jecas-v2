---
title: "Dopočítávání CSS hodnot"
headline: "Dopočítávání CSS hodnot"
description: "Jak funguje dopočítávání hodnot v kaskádových stylech."
date: "2014-11-25"
last_modification: "2014-12-03"
status: 1
tags: ["CSS", "Rady a nápady"]
---

Zajímává součást CSS je doplňování neuvedených vlastností a hodnot.

## Čtyři strany

První případ je nastavování hodnot pro **čtyři strany**, typicky pro vlastnosti `padding`, [`margin`](/margin), `border-color/width/style`, `outline-color/width/style` a podobně.

Tyto vlastnosti jsou **zkratkami** pro `*-top`, `*-right`, `*-bottom` a `*-left` (v uvedeném pořadí).

Zapíšeme-li:

```
div {
  margin: 1em 2em 3em 4em;
}
```

Je to ekvivalent (nezkráceného) zápisu.

```
div {
  margin-top: 1em;
  margin-right: 2em;
  margin-bottom: 3em;
  margin-left: 4em;
}
```

Společná vlastnost (zkratka) ale může mít nastaveno kromě čtyř hodnot i méně — 3, 2 nebo jednu.

### Jedna hodnota

```
div {
  margin: **1em**;
}
```

Nastaví **všem stranám** totéž:

```
div {
  margin-top: **1em**;
  margin-right: **1em**;
  margin-bottom: **1em**;
  margin-left: **1em**;
}
```

Jedna hodnota nastavená na `auto` se často používá při [centrování](/centrovani#margin-auto).

### Dvě hodnoty

```
div {
  margin: **1em** *2em*;
}
```

První hodnota nastaví obě svislé vlastnosti (`*-top` a `*-bottom`), druhá potom vodorovné (`*-right` a `*-left`).

```
div {
  margin-top: **1em**;
  margin-right: *2em*;
  margin-bottom: **1em**;
  margin-left: *2em*;
}
```

### Tři hodnoty

```
div {
  margin: 1em *2em* **3em**;
}
```

Od dvou hodnot se liší tím, že třetí hodnota přepíše `*-bottom`. Vodorovné hodnoty (`*-right`/`*-left`) se budou rovnat – podle druhé hodnoty:

```
div {
  margin-top: 1em;
  margin-right: *2em*;
  margin-bottom: **3em**;
  margin-left: *2em*;
}
```

## Zkratky

Zajímavé věci se potom dějí u zkratek více vlastností s ohledem na **výchozí/zděděné hodnoty**.

Třeba následující kód vytvoří (nejspíš) 3 pixely tlustý černý rámeček. [Nevěříte](http://kod.djpw.cz/kiib)?

```
div {
  border: solid;
}
```

Cca tři pixely (`medium`) jsou výchozí tloušťka rámečku a barva se zdědí z [`currentColor/color`](/currentcolor).

## Resetování

Použití *zkratky* má další zajímavý efekt — **zresetuje nenastavené specifické vlastnosti**.

```
div {  
  border-width: 10px;
  border-style: solid;
  border-color: red;
  border: dotted;
}
```

Tento `&lt;div>` tedy nebude mít 10px tečkovaný červený rámeček, ale 3px tečkovaný černý. Všechny konkrétnější deklarace se přepíší – [ukázka](http://kod.djpw.cz/liib).

Poznámka: **IE 7** a starší neuvedené hodnoty neresetují, ale dědí, takže ukázka v nich bude 10px tlustá, červená a **tečkovaná** (`dotted`).

## Záleží na pořadí?

CSS se snaží fungovat chytře a **hádat** vlastnosti, ke kterým hodnota patří. Tento kód proto vytvoří 5px rámeček, ačkoliv je pořadí značně **nestandardní** (obyvykle se uvádí obráceně – tloušťka styl barva).

```
div {
  border: red solid 5px;
}
```

Je až možná trochu překvapivé, jak často se dá z **kontextu** odvodit, co daná hodnota nastavuje.

Není ale asi úplně šťastné na to spoléhat. Třeba u nastavování písma nebude následující kód fungovat podle očekávání:

```
div {
  font: 'Arial';
}
```

Při použití zkratky `font` musí být vždy uvedena minimálně **velikost a písmo**.

## Zneplatnění

CSS funguje v prohlížečích tak, že když v deklaraci vlastnosti nejde něco **čemu nerozumí**, celou deklaraci **zahodí**.

```
div {
  border: 1px solid **neznamaBarva**;
}
```

Jde toho využít pro [hack](/hacky) **starších prohlížečů**.

Zajímavé využití zmínil [**Chamurappi**](http://webylon.info) na [Diskusi JPW](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=19&amp;topic=160223#4), kdy se použije [„vícenásobný“ obrázek](/vice-obrazku#multiple-backgrounds) pro rozhodnutí, zda se má vložit **PNG/SVG**. Vícenásobná pozadí fungují stejně jako SVG od **IE 9**, takže starší prohlížeče nastavení SVG obrázku zahodí.

```
.symbol {
  background: url("symbol.png");
  background: url("symbol.svg"), transparent;
}
```

    - [SVG fallbacky](/svg#fallback) – přehled všech možných způsobů