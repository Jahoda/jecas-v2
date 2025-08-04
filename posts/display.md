---
title: "CSS display"
headline: "CSS display"
description: "CSS vlastnost <code>display</code> ovlivňuje způsob vykreslování HTML elementu."
date: "2014-02-26"
last_modification: "2014-05-22"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

## Základní hodnoty

Nejčastěji používané hodnoty jsou:

  `display: none`
  
    Element bude v kódu, ale na stránce se nezobrazí. Z pohledu CSS se bude tvářit, že na stránce vůbec není.

    ```
/* elementy s třídou „skryt“ nebudou vidět */
.skryt {
  display: none
}
```

    Používá se většinou pro různé [skrývání a odkrývání textu](/zobrazit-skryt) JavaScriptem.

    Skrytí obsahu je možné i dalšími způsoby než pomocí `display: none`:

      V případě, že nevadí (nebo je žádoucí), že element stále zabírá své místo na stránce, ale není vidět:
        
          - `visibility: hidden`

          - `[opacity](/opacity): 0`

      Skutečné skrytí:
        
          - `display: none`

          - vystrčení [absolutní posicováním](/position#absolute): `position: absolute; top: -999em; left: -999em`

    Skrývání obsahu se hlavně v minulosti používalo i k **ošálení vyhledávačů**, kdy se na stránku napsal pro vyhledávače lákavý obsah, který by ale návštěvníka nezajímal, a skryl se pomocí `display: none`. Asi nemá smysl zdůrazňovat, že se jedná o **nepovolenou** praktiku.

  `display: inline`
  
    Řádkových elementů je asi většina, patří sem značky pro **formátování textu** (`&lt;b>`, `&lt;i>` / `&lt;strong>`, `&lt;em>`, `&lt;code>` a podobně). Dále všechny [vlastní/neznámé HTML značky](/vlastni-html-znacky) a *neutrální* značka `&lt;span>`.

    Kromě lehce pozměněného výchozího stylu (**tučný**, *kursiva*, `neproporcionální font`) `inline` značky nedělají skoro nic. Jednotlivé řádkové elementy jsou proto na stránce volně vedle sebe. Pod sebe je dostane jen **automatické** zalomení koncem řádku nebo značka pro zalomení `&lt;br>`.

  `display: block`
  
    Konstrukce `display: block` je výchozí hodnota některých elementů – říká se jim podle toho **blokové elementy**. Patří mezi ně nadpisy, odstavce, značka `&lt;div>` a pár dalších značek.

    Blokové elementy se vyznačují tím, že:

      - je možné nastavit výšku a šířku (`height` a `width`),

      - dva blokové elementy umístěné v kódu za sebou se na stránce objeví podsebou.

    Element, který dle **výchozích stylů prohlížeče** blokovým není, se může blokem stát i bez přidání `display: block`. V jakém případě?

      - Všechny [obtékané elementy](/float) se stávají bloky.

      - Všechny absolutně nebo fixně posicované elementy se stávají rovněž bloky.

  `display: inline-block`
  
    Kombinací řádkových (`inline`) a blokových (`block`) elementů je `display: inline-block`.

    Prvky s touto vlastností:

      - Se zobrazují vedle sebe (jako `inline`).

      - Mohou mít nastavenou šířku a výšku.

    Rozdíl mezi `inline-block` a `inline` je tedy v možnosti **zadávat rozměry**.

    Používání `inline-block`u je tak způsob, jak dostat elementy s nastavenými rozměry vedle sebe **bez použití obtékání** (`float`). Je ale nutno dát pozor na tzv. [bílé znaky](/inline-block-whitespace) (mezery) mezi prvky s `inline-block`.

## Tabulkové hodnoty `display`e

Další skupinou jsou hodnoty pro vytváření [tabulek](/tabulky). Ano, tabulku je možné poskládat kromě značek `&lt;table>`, `&lt;tr>`, `&lt;td>` atd. i z **libovolných jiných elementů**.

Tabulkové hodnoty vlastnosti `display` fungují od **IE 8**. Jejich fungování jde připodobnit k HTML značkám souvisejícími s tabulkami.

  `display: table`
  
    Značka `&lt;table>`.

  `display: table-row`
  
    Řádek tabulky. Značka `&lt;tr>`.

  `display: table-cell`
  
    Buňka tabulky. Značka `&lt;td>`.

  `display: table-caption`
  
    Značka `&lt;caption>`.

  `display: table-column`
  
    Sloupec tabulky. Značka `&lt;col>`.

  `display: table-column-group`
  
    Značka `&lt;colgroup>`.

  `display: table-header-group`
  
    Záhlaví tabulky. Značka `&lt;thead>`.

  `display: table-row-group`
  
    Značka `&lt;tbody>`.

  `display: table-footer-group`
  
    Zápatí tabulky. Značka `&lt;tfoot>`.

Většina tabulkových hodnot `display`e se **moc nepoužívá**. Chceme-li na stránce mít tabulku, je lepší použít přímo:

```
&lt;table>
  &lt;tr>
    &lt;td>Buňka&lt;/td>
  &lt;/tr>
&lt;/table>

```

Nicméně například pro umístění různě širokých boxů, které mají **vyplnit celou šířku**, je to poměrně vhodné řešení.

[Ukázka](http://kod.djpw.cz/hldb)

## Flexboxy

Další dvě hodnoty vlastnosti `display` souvisejí s [flexboxy](/flexbox). Fungují od **IE 10**.

  `display: flex`
  
    Element bude blokový s možností upravovat ho s využitím flexbox modelu.

  `display: inline-flex`
  
    Totéž jako `display: flex`, jen pro **řádkové** elementy.

## Grid

Vlastnost `grid` je podobně jako `flex` určena pro snazší tvorbu layoutu. Grid (v překladu mřížka) funguje zatím pouze v **Ineternet Exploreru 10** a novějších (s [prefixem `-ms-`](/css-prefixy)).

Umožňuje **bez zásahů do HTML kódu** čistě v CSS vytvořit libovolný layout. Pravidlo `display: grid` se nastavuje společnému rodiči elementů, které jsou součástí *gridu*.

Pro rodiče s `grid`em se nadefinují jednotlivé části, do kterých se pohodlně přiřazují potomci.

[Živá ukázka](http://kod.djpw.cz/fldb) (pouze **IE 10+**)

  `display: grid`
  
    Element bude blokový s možností používat v něm mřížku.

  `display: inline-grid`
  
    Totéž jako `display: grid`, jen pro **řádkové** elementy.

## Run-in

  `display: run-in`

    Poměrně málo známá hodnota `display`. Umožňuje, aby element *vtekl* do následujícího sourozence.

    [Ukázka](http://kod.djpw.cz/gldb) (**IE 8+**, **Opera 12**)

## Odkazy

  - W3C: [Specifikace grid layoutu](http://dev.w3.org/csswg/css-grid/)