---
title: "Tabulky v JavaScriptu"
headline: "Tabulky v JavaScriptu"
description: "Jak pracovat s tabulkami v JS. Popis metod <code>insertRow</code>, <code>insertCell</code>, <code>deleteRow</code> a dalších."
date: "2014-07-02"
last_modification: "2014-07-08"
status: 1
tags: ["JavaScript", "Tabulky"]
---

Při tvorbě webové aplikace se můžeme dostat do stavu, že bude třeba skriptem sestavit **HTML tabulku**, kromě běžných metod pro vytváření elementů, jako je `createElement` nebo přímé vlepení celé tabulky do `innerHTML`, existují i speciální metody přímo pro tabulky.

## Vložení řádku `insertRow`

V případě, že na stránce existuje již tabulka, kterou jen zbývá naplnit daty, je vhodná metoda `insertRow`.

```
var radek = tabulka.insertRow(1);
```

Tento kód vytvoří řádek za prvním řádkem existující tabulky. Parametr `1` určuje, že se řádek přidá za **prvním původním řádkem**.

Tabulku je možné použít buď existující.

```
var tabulka = document.getElementById("id-tabulky");
```

Nebo pokud tabulka neexistuje, vytvořit ji následovně:

```
var tabulka = document.createElement("table");
```

## Odstranění řádku `deleteRow`

Analogicky jde řádek naopak odstranit metodou `deleteRow`:

```
tabulka.deleteRow(1);
```

## Vložení buňky `insertCell`

Po vložení řádku je většinou nutné ho naplnit daty – buňkami. To zajistí metoda `insertCell`.

```
var bunka = radek.insertCell(0);
```

Výše uvedený kód vloží do řádku **první buňku**.

## Odstranění buňky `deleteCell`

Odstarění buňky vypadá potom takto:

```
radek.deleteCell(0);
```

## Vložení obsahu buňky

Je-li již vytvořena tabulka, řádek i buňka, stačí ji naplniti obsahem. K tomu se většinou hodí metoda `innerHTML`.

```
bunka.innerHTML = "Obsah, může obsahovat &lt;b>HTML&lt;/b>";
```

## Vlastnosti `rowSpan` a `colSpan`

Je-li příhodné některou z buněk roztáhnout přes více řádků či sloupců, není problém nastavit JavaScriptem HTML atributy `rowspan` či `colspan`.

Jen je nutné použít *camelCase*.

```
bunka.colSpan = 4;
```

Výše uvedený JS kód je ekvivalent HTML:

```
&lt;td colspan="4">
```

[Živá ukázka](http://kod.djpw.cz/hjeb) naplnění jednoduché tabulky.

## Tabulky a `createElement`

Vytvoření tabulky metodami `createElement` a `appendChild`.

U starších prohlížečů (**IE 7**) není možné vkládat řádky přímo do `&lt;table>`, ale musí se použít `&lt;thead>`, `&lt;tbody>` nebo `&lt;tfoot>`.

[Živá ukázka](http://kod.djpw.cz/gjeb)

Zaměřit `&lt;tbody>` značku jde kromě metody [`getElementsByTagName`](/getelement#tagname) i přes `tBodies`.

## Počet řádků

Počet řádků tabulky jde zjistit z:

```
var pocetRadku = tabulka.rows.length;
```

## Kolekce tabulek

Tabulky mají některá klíčová slova, která vracejí jednotlivé části tabulek.

  `cells`
  
    Vrátí kolekci všech buněk, tj. `&lt;td>` i `&lt;th>`.

  `rows`
  
    Vrátí kolekci řádků (značky `&lt;tr>`).

  `tBodies`
  
    Vrátí kolekci `&lt;tbody>` elementů.

## Záhlaví a zápatí

  `tHead`
  
    V `tabulka.tHead` je záhlaví tabulky.

    Jde vytvořit metodou `createTHead` a odstranit přes `deleteTHead`.

  `tFoot`
  
    V `tabulka.tFoot` je zápatí tabulky.

    Jde vytvořit metodou `createTFoot` a odstranit přes `deleteTFoot`.