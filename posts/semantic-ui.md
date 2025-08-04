---
title: "Semantic UI"
headline: "Semantic UI"
description: "Semantic UI je CSS framework. Co nabízí a jak funguje?"
date: "2013-10-02"
last_modification: "2013-10-06"
status: 1
tags: ["CSS", "Frameworky"]
---

[Web Semantic UI](http://semantic-ui.com/)

Jak název *semantic* možná už vypovídá, hlavní rozdíl oproti jiným frameworkům (jako je Bootstrap, Foundation nebo [Kraken](http://jecas.cz/kraken)) je v **zápisu formátovacích tříd v přirozenějším jazyce**.

Místo ne úplně intuitivního zápisu v **Bootstrapu**:

```
&lt;div class="row">
  &lt;div class="col-lg-4">1&lt;/div>
  &lt;div class="col-lg-4">2&lt;/div>
  &lt;div class="col-lg-4">3&lt;/div>
&lt;/div>
```

Se v **Semantic UI** používá:

```
&lt;div class="ui three column grid">
  &lt;div class="column">1&lt;/div>
  &lt;div class="column">2&lt;/div>
  &lt;div class="column">3&lt;/div>
&lt;/div>
```

To je docela sympatické — nemusí se **dopočítávat žádné sloupce**, ale jednoduše se napíše „ui tří sloupcová mřížka“, přidají se tři sloupce a je to. Tento duch se táhne napříč celým projektem. Co se před-připravených částí týká, je k disposici přibližně totéž co v Bootstrapu:

  - grid systém (rozložení layoutu),

  - tlačítka,

  - ikony,

  - nadpisy,

  - tabulky,

  - seznamy,

  - navigace,

  - drobečkové navigace,

  - stavové hlášky,

  - formuláře

  - a mnoho dalšího.

## Stažení a *obsah* frameworku

Po stažení **5MB archivu** v něm nalezneme několik složek. Najdeme například původní zdrojový kód pro CSS preprocesor LESS, z toho vygenerované CSS, soubory minifikované a konečně pro **finální nasazení** asi nejvhodnější — **zabalená a zmenšená** verse v adresáři `packed` (CSS a JS soubory `semantic.min.css`, resp `semantic.min.js`).

## Použití

Stačí připojit zmenšený CSS a JS soubor (o velikosti 213 kB, respektive 121 kB) a začít používat příslušné třídy. Pro JS vymoženosti je ještě potřeba jQuery.

V případě **využívání jen částí** by bylo vhodné si ty potřebné poskládat ze souborů v adresáři `minified`.

## Podpora napříč prohlížeči

Zatím není valná. Autor ji sice uvádí jako *IE8+*, ale podle mých testů **framework Semantic UI** funguje jakžtakž až od **IE 9**, výsledek v [Internet Exploreru 8 mi moc funkčně nepřipadá](/files/semantic-ui/ie8.png).

Možná se to časem zlepší…