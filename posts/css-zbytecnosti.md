---
title: "CSS zbytečnosti"
headline: "CSS zbytečnosti"
description: "CSS konstrukce, které nejspíš píšete zbytečně."
date: "2015-05-21"
last_modification: "2015-05-22"
status: 1
tags: ["CSS", "Rady a nápady"]
---

Během objevování a **učení se** kaskádovým stylům (CSS) si člověk snadno přivykne na **zbytečně komplikované konstrukce**, které začne používat z neznalosti. Potom si na ně navykne a ze setrvačnosti je často používá, i když už CSS docela rozumí…

## `margin: 0 auto`

Hodnotu horního a spodního [`margin`u](/margin) není při vodorovném [centrování](/centrovani) třeba explicitně uvádět.

Prosté:

```
margin: auto
```

Funguje naprosto identicky.

Nejspíš jediná výjimka, kdy se výsledek „`margin: auto`“ a „`margin: 0 auto`“ liší, je [centrování absolutním posicováním](/centrovani#absolutni-margin).

    - [Psát `margin: auto`, nebo `margin: 0 auto`?](/margin-auto)

## Nula před desetinnou tečkou

Jak tomu tak bývá, v programování jde při zápisu **desetinných čísel** vypustit nulu na začátku.

```
.5 +.5 = 1
```

Jde to praktikovat i v CSS:

```
margin: .5em;
```

## Jednotky u hodnoty `0px`

Je-li nějaká hodnota nastavena na nulu, je zbytečné uvádět jednotky (`0px`, `0em` a podobně). Nula bude pořád nula.

```
element {
  height: 0px;
}
```

## Uvozovky kolem URL/písem

```
element {
  background: url(**"**obrazek.png**"**);
  font-family: **'**Název písma**'**;
}
```

Při zadávání URL obrázku do CSS funkce `url` jsou [uvozovky](/uvozovky) nepovinné.

Při uvádění fontu ([`font-family`](/font#font-family)) jsou uvozovky nutné jen v případě, že název písma obsahuje čísla a speciální symboly.

## Středník

Jednotlivé CSS deklarace bývají oddělovány středníkem (`;`). Středník **není nutné psát** za poslední deklarací pro daný [selektor](/css-selektory).

```
.uzasnyStyl {
  color: red;
  text-align: center
}
```

Při používání **strukturovaného CSS** to ale dost zavání zapomenutím středníku při připsání dalšího předpisu.

U **řádkového CSS** to problém není.

```
.uzasnyStyl {color: red; text-align: center}
```

## Obtékaný element se stane blokovým

Je-li element plovoucí (tj. má nastaven [`float`](/float)), stane se automaticky blokovým ([`display: block`](/display#block)).

```
.obtekany {
  float: left;
  display: block;
}
```

Blokovým se stane i element s výslovně nastaveným `display: inline`, `display: inline-block` nebo `display: table-cell` a podobně.

Výjimka je obtékaný element s `display: table` – tabulkové zobrazení se zachová. Obdobně se chová hodnota `list-item`, která je výchozí u odrážek seznamů. Rozplavaná položka seznamu bude stále `display: list-item`.

    - Položka

## Absolutně posicovaný element se stane blokovým

Je-li element [posicován](/position) absolutně nebo fixně, stane se z něj automaticky `display: block` bez nutnosti to uvádět.

```
.posicovany {
  position: absolute;
  display: block;
}
```

## Dopočítávání hodnot

CSS vlastnosti mající varianty pro všechny strany `*-top`, `*-right`, `*-bottom` a `*-left` jde zadávat do sdružené vlastnosti.

Konstrukce:

`margin: 1em .5em .3em;`

Odpovídá:

```
margin-top: 1em;
margin-right: .5em;
margin-bottom: .3em;
margin-left: .5em;
```

    - [Dopočítávání CSS hodnot](/css-dopocitavani) – samostatný článek věnovaný se dopočítávání

## Zkratky CSS vlastností

Řada CSS vlastností má tzv. **zkratku**.

```
border-width: 1px;
border-style: solid;
border-color: red;
```

Předchozí rámeček tak jde zapsat jako:

```
border: 1px solid red;
```

I při použití zkratky není třeba uvádět všechny hodnoty. Pro zrušení rámečku tak stačí:

`border: 0;`

Obdobně pro zrušení odrážek [seznamu](/list-style) stačí použít `list-style: none`, místo `list-style**-type**: none`, jak bývá často k vidění.

## Příliš konkrétní selektory

Řekněme, že je cílem v následujícím HTML kódu zaměřit odkaz (značku `&lt;a>`).

```
&lt;div class="menu">
  &lt;ul>
    &lt;li>&lt;a href="">Odkaz&lt;/a>&lt;/li>
  &lt;/ul>
&lt;/div>
```

    Jedna extrémní varianta je selektor typu:

    ```
div.menu ul li a {}
```

    Na opačné straně stojí:

    ```
.menu a {}
```

Obecně bývá lepší používat spíš druhý způsob s jednodušším selektorem.

  - Má kratší zápis.

  - Nemá zbytečně **vysokou prioritu**. Kvůli případnému přepisování vlastností je dobré držet *sílu selektorů* co nejnižší.

  - Jednodušší selektor je rychlejší na vyhodnocení. To je spíš teoretická výhoda – i komplikovaný selektor bude pořád hodně rychlý.

## Dědičnost barvy

Rámečky `border`, ale i `outline`, [`box-shadow`](/box-shadow) nebo [`text-shadow`](/text-shadow) dokáží dědit barvu, která se nachází ve vlastnosti `color`.

  Rámeček převzal barvu z `color`

  Stín převzal barvu z `color`

## Uvádění šířky

Blokový element dle výchozích stylů automaticky vyplní všechnu dostupnou šířku.

Nastavovat pro vnořený element **stejnou šířku jako má jeho rodič** je tudíž zbytečné.

```
&lt;div style="width: 400px">
  &lt;div style="width: 400px">
    Vnořený element
  &lt;/div>
&lt;/div>
```

Totéž platí pro nastavování šířky na 100 % pro **roztažení přes celou plochu** – to je výchozí chování blokového elementu.

## Zbytečné CSS prefixy

K vidění bývá používání [CSS prefixů](/css-prefixy) pro vlastnosti, které daný prohlížeč s prefixem nikdy nepodporoval – například `-ms-transition`.

Podobný případ je vlastnost `-moz-opacity` – od **Firefoxu 0.9** (rok 2004) funguje prosté [`opacity`](/opacity).

## Poděkování

Na sesbírání jednotlivých zbytečností se podíleli: [habendorf](http://www.1-webdesign.cz/), [Bubák](http://teststranek.kvalitne.cz/), [Keil](http://ciwe.cz) a [Chamurappi](http://webylon.info/).