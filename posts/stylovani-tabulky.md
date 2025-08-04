---
title: "Stylování tabulky"
headline: "Stylování HTML tabulek"
description: "Jednoduché barvení a další stylování značky <code>&lt;table></code>."
date: "2013-05-23"
last_modification: "2013-06-15"
status: 1
tags: ["CSS", "Stylování elementů", "Tabulky"]
---

/* reset na výchozí hodnoty */
table {background: #fff; table-layout: auto; border-collapse: separate}
table.stylovani-tabulky td {background: none}

## Barvení

Obarvit řádek lze nastavením `background`u pro řádek (`&lt;tr>`) nebo přímo pro buňku (`&lt;td>`).

```
tr.pozadi {background: red}
/* nebo */
td.pozadi {background: red}

```

Při barvení sloupců už zbývá jen `&lt;td>` nebo použít značky `&lt;col>` a nastavit jim třídu. Takto se vybarví 4. sloupec.
```
&lt;table>
	&lt;col span=3>
	&lt;col class=pozadi>
	&lt;tr>
		&lt;td>
		…
&lt;/table>
```

.pozadi {background: red}

		Text
		Text
		Text
		Text

		Text
		Text
		Text
		Text

		Text
		Text
		Text
		Text

## Pseudo-třída `first-child`

Tímto si lze výrazně ulehčit práci, vlastnost `:first-child` funguje už od Exploreru 7.
```
td:first-child + td {background: yellow}

```

A druhý sloupec bude žlutý.

.test td:first-child + td {background: yellow}

		Text
		Text
		Text
		Text

		Text
		Text
		Text
		Text

V CSS 3 je k disposici přímo [selektor n-tého prvku](/css-selektory#n-ty-potomek), s možností například přímo odlišit sudý a lichý řádek. Funguje ale až od **IE 9**:
```
tr:nth-child(odd) {background: green}
```

Ve starších prohlížečích lze tuto funkčnost simulovat právě pomocí `first-child` / selektoru sourozence (`něco **+** něco`). I když pro hodně velkou tabulku kód značně nabobtná. V takovém případě může být lepší použít řešení na [straně serveru](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=9&amp;topic=2111#sude-liche-radky).

## Pseudo-třída `:hover`

Zvýraznit celý řádek při **najetí myší** lze pomocí `tr:hover {background: green}`. Funkční od Exploreru 7.

table.hover tr:hover td {background: green}

		Text
		Text
		Text
		Text

		Text
		Text
		Text
		Text

Jak po najetí zvýraznit příslušné řádky i sloupce:

    - [Zvýraznění sloupců/řádků tabulky ](http://jecas.cz/zvyrazneni-tabulky)

## Rámečky řádků/buněk pomocí `border`

Tady panuje menší zrada, tj. při slévání rámečků (zmíně níže) ve starších Explorerech (do verse 7) nelze rámeček přidat přímo `&lt;tr>`, ale je třeba jej nastavit pro `tr td`. Při neslévání (`border-collapse: separate`) to přímo přes `&lt;tr>` nejde v žádném prohlížeči.

tr.ramecek-cerveny {border-top: 2px solid red}
tr.ramecek-zeleny td {border-top: 2px solid green}

Ve starších IE než 8 by měl být vidět jen rámeček zelený.

		Text
		Text
		Text
		Text

		Text
		Text
		Text
		Text

## Vlastnosti `table-layout` a `border-collapse`

`table-layout`
  Výchozí hodnota je `auto`, je možné přepnout na `fixed` – to zajistí, že tabulka bude více respektovat zadané rozměry sloupců.

`border-collapse`
  Výchozí hodnota je `separate`, je možné přepnout na `collapse` – to zajistí „slití“ rámečků k sobě.

		Text
		Text
		Text
		Text

		Text
		Text
		Text
		Text

Normálně jsou rámečky následující (dvojité – `separate`):

		Text
		Text
		Text
		Text

		Text
		Text
		Text
		Text

## Fixní záhlaví tabulky

U dlouhých tabulek může být žádoucí záhlaví **zafixovat** a dlouhý obsah omezit výškou a přidat mu **posuvník**.

Řešení spočívá v rozdělení tabulky na dvě části (`&lt;thead>` – záhlaví a `&lt;tbody>` – obsah s posuvníkem).

    .fixni th, .fixni td {width: 200px}
    .fixni thead {display: block;}
    .fixni tbody {overflow-y: scroll; max-height: 100px; display: block}

        JménoE-mail

        Běžný Uživatel
        bezny@uzivatel.cz

        Franta Fytopuf
        franta@fytopuf.cz

        Nejlepší Trenér
        strouhanka@kobercovka.cz

        Žerou Děti
        junior@plzen-wd40.cz