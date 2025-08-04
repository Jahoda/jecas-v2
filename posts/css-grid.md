---
title: "CSS grid"
headline: "CSS grid"
description: "Jak funguje CSS grid a proč ho používat."
date: "2022-03-07"
last_modification: "2022-03-07"
status: 0
tags: []
---

Historicky existovaly různé způsoby, jak vytvořit [layout stránky](/layout) – tím je myšleno různé rozvržení do sloupců a řádků.

V minulosti se k tomu používaly:

  - [rámy](/ramy#frameset) (značka `&lt;frameset>`),

  - [HTML tabulky](/html-tabulky) nebo CSS tabulky `display: table` (tzv. *tabulkový layout*)

  - [posicování](/position) (absolutní nebo fixní)

  - obtékání pomocí [`float`](/float) vlastnosti,

  - [flexboxy](/flexbox)

CSS grid je tedy už asi šestý evoluční pokus vytváření layoutu.

Kombinací různých triků a občas i [JavaScriptu](/js) je možné s trochou šikovnosti udělat libovolný layout pomocí kteréhokoliv způsobu.

Díky CSS gridu se tento proces výrazně zjednodušil. Kromě toho se jedná o první řešení čistě pro layout, všechny ostatní předchozí způsoby jde **považovat spíš za hacky** určené původně k něčemu jinému.

Z toho plynou některé výhody.

## Proč nepoužívat CSS grid

Asi jediný důvod proč v roce **2022** nepoužívat CSS grid je **podpora hodně starých prohlížečů** s minimálním tržním podílem.

Jelikož s CSS gridem přišel původně **Microsoft** ve svém prohlížeči **Internet Explorer 10** (vydání říjen 2012), je jediným ne úplně marginálním nepodporujícím prohlížečem mobilní **Opera Mini**.

Jinak jde o široce podporovanou vlastnost.

Jediný oříšek je, že starší **IE** podporují starší specifikaci CSS gridu. Je proto jednak potřeba doplnit [prefixy](/css-prefixy) a některé věci používat jinak.

## Flex vs. grid

Hodně lidí používá pro stavbu layoutu flex (`display: flex`).

Je to způsob, jak relativně pohodlně stavět layouty včetně různých věcí jako [stejně vysokých sloupců](/stejne-vysoke-sloupce), kombinování sloupců s fixní i proměnlivou šířkou a podobě.

U flexu jde i snadno měnit **pořadí jednotlivých elementů**.

Koneckonců i populární CSS framework [Bootstrap](/bootstrap-rychlokurs) má svůj grid založený na flexboxu.

Flex má ale oproti gridu jednu zásadní nevýhodu – ze své podstaty komplikuje prohlížečům [vykreslování stránky](/vykreslovani).

Vykreslování layoutu ve flexu trpí podobným problémem, kterým kdysi trpěly tabulkové layouty – prohlížeč **musí čekat za stažení** celého obsahu flex kontejneru.

Proč?

Protože klidně úplně poslední element ve flex rodiči může významně ovlivnit layout celé stránky – může to být třeba boční panel, který odsune obsah, změní mu šířku atd.

Prohlížeč tedy buď musí čekat na stažení komplet HTML dané oblasti, nebo stránku během načítání postupně překreslovat – pokud zvolí tuto strategii, **bude web během načítání poskakovat** (tzv. *layout shift*).

CSS grid tento problém řeší tím, že už obal layoutu vymezí jednotlivé části webu. Prohlížeč si tak může vyhradit místo a průběžně vykreslovat, aniž by cokoliv poskakovalo.

Tento problém ale není v praxi zase tolik dramatický – existuje spousta webů, které neoptimální řešení pomocí flexu používají.

Pokud je HTML obsah flex obalu datově malý, server odpovídá rychle a i připojení je rychlé, nehrozí významný problém.

Vzhledem k tomu, že není možné vždy vše z toho zajistit, **je lepší používat CSS grid**.

## Jak CSS grid funguje

Grid se *zapíná* vlastností [`display`](/display):

```
.grid { display: grid }
```

Pro vytvoření samotné mřížky potom slouží `grid-template-*` vlastnosti pro řádky a sloupce.

Nejjednodušší třísloupcový layout (se stejně vysokými sloupci) tak může mít například následující předpis:

```
.grid {
  display: grid;
  grid-template-columns: 200px .7fr .3fr;
}
```

[Živá ukázka](http://kod.djpw.cz/npfd)

Za povštimnutí stojí jednotka `fr` (z anglického *fraction* – zlomek). V případě gridu se jedná o podíl na dostupném místě.

Výše uvedený předpis tedy vytvoří první sloupec o šířce 200 pixelů a další dva které si rozdělí zbývající prostor v poměru 70 ku 30 %.

V tomto případě se sloupce zaberou dle pořadí v HTML kódu.

Pro nastavení řádků slouží vlastnost `grid-template-row`.

### `gird-template-areas`

Aby se potom jednotlivé elementy v gridu dobře přiřazovaly na příslušná místa, existuje ještě vlastnost `gird-template-areas`.

Ta slouží k pojmenování jednotlivých částí gridu:

```
.grid {
    display: grid;
    grid-template-columns: 200px .7fr .3fr;
    grid-template-rows: 100px 1fr 50px;
    grid-template-areas: 
        "header header header"
        "menu content sidebar"
        "footer footer footer";
}
```

Tímto vzniknout oblasti header, menu, content, sidebar a footer.

Na potřebné místo se libovolný element dostane pomocí `grid-area`:

```
.header {
    grid-area: header;
}
```

[Živá ukázka](http://kod.djpw.cz/spfd)

To je celé.

První výhoda je, že je to celé **hezky přehledné**.

Druhá super vlastnost je použití v [responsivním designu](/responsive) – v závislosti na [`@media` pravidlech](/media) si jde hezky nadefinovat různé rozložení pro různé šířky a jednotlivé elementy podle toho klidně umístit do jiných oblastí.

## Generátor CSS gridu

Psát celý grid ručně může být trochu otrava. Existují ale generátory, kde si jde layout naklikat a rovnou použít výsledný kód:

    - [Interactive CSS grid generator](https://grid.layoutit.com)