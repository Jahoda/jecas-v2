---
title: "CSS flex"
headline: "Flexboxy"
description: "Flexibilní stylování boxů je jednoduší a schopnější alternativa k obtékání (<code>float</code>), ale zatím hudba budoucnosti…"
date: "2013-06-20"
last_modification: "2013-06-20"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

## Float

Je-li potřeba umístit nějaké prvky **vedle sebe**, většinou se k tomu používá [obtékání elementů](/float). Přidá se `float: left/right`, nastaví se šířka (`width`) a jednotlivé prvky se tak dostanou vedle sebe. (Pod nimi se potom obtékání ukončí – `clear: both`.)

&lt;p style='float: left; width: 50%; background: #ccc'>

&lt;p style='float: left; width: 50%; background: yellow'>

.tldr .live, .tldr .demo div {display: none}

## Flex

Totéž se dá vyřešit vlastnostmi kolem `flex`. Funguje to ovšem zatím **jen od Exploreru 10**. Kromě Opery ve všech prohlížečích (ve Firefoxu, Chrome i IE 10) jen s prefixy (`-moz-` a `-webkit-`, `-ms-`) a pomalu v každém prohlížeči pod jiným názvem. Ve Firefoxu funguje jen něco.
Nepoužíváte-li proto zmíněné prohlížeče, můžete si ukázky s klidem vypnout.

document.write("Zobrazit/skrýt ukázky");

&lt;div style='display: flex; display: -webkit-flex; display: -moz-box; display: -ms-flexbox'>

&lt;p style='width: 50%; background: #ccc'>

&lt;p style='width: 50%; background: yellow'>

&lt;/div>

Výhoda je, že se nemusí uvádět šířka, přizpůsobí se obsahu.

&lt;p style='width: 50%; background: #ccc'>

&lt;p style='background: yellow'>

&lt;p style='background: #ccc'>

&lt;p style='background: yellow'>

&lt;p style='background: #ccc; width: 40%'>

&lt;p style='background: yellow'>

&lt;p style='background: #ccc'>

### `flex-direction`: Sloupce nebo řádky

Vlastnost `flex-direction` se nastavuje pro flex-obal (tj. rodiče (`display: flex`) flex-položek) a určuje způsob uspořádání.

HodnotaVýznam
`flex-direction: row`v řádku – výchozí
`flex-direction: row-reverse`v řádku v obráceném pořadí
`flex-direction: column`v sloupci
`flex-direction: column-reverse`v sloupci v obráceném pořadí

### `justify-content`: Vodorovné zarovnání

Vlastnost `justify-content` určí způsob rozmístění flex-položek ve flex-obalu, pokud nemají plnou šířku. Dává smysl jen při zobrazení v řádku – `flex-direction: row(-reverse)`.

.demo div > div, .demo div > span {padding: 0 1em; background: yellow; border: 1px solid #000}

HodnotaVýznam
`justify-content: flex-start`zleva – výchozí
PrvníDruhýTřetí
`justify-content: flex-end`zprava
PrvníDruhýTřetí
`justify-content: center`na střed
PrvníDruhýTřetí
`justify-content: space-between`rozpočítají se flex-položky, aby se stejnoměrně rozprostřely po prostoru
PrvníDruhýTřetí
`justify-content: space-around`podobné jako předchozí, jen se nechá prostor i na krajích.
PrvníDruhýTřetí

### `align-items`: Zarovnání položek

Vlastnost `align-items`, nastavovaná pro flex-obal, se chová odlišně při řádkové a sloupcové orientaci boxů (`flex-direction`).

Při `flex-direction: row`
Určuje svislé zarovnání nebo roztažení elementu v řádce. Projeví se v případě, že nejsou všechny boxy stejně vysoké.

Při `flex-direction: column`
Určuje vodorovné zarovnání nebo roztažení.

HodnotaVýznam

`align-items: flex-start`zleva/shora (záleží na `flex-direction`) – výchozí
PrvníDruhýTřetí

`align-items: flex-end`zprava/zdola
PrvníDruhýTřetí

`align-items: center`na střed
PrvníDruhýTřetí

`align-items: baseline`přesně nevím, funguje dost podobně jako `flex-start`
PrvníDruhýTřetí-->

`align-items: stretch`roztažení elementu
PrvníDruhýTřetí

### `flex-wrap`: Zalamování

Pokud je ve flex-obalu tolik flex-položek, že už se nevejdou, je možné je pomocí `flex-wrap` zalomit.

HodnotaVýznam
`flex-wrap: nowrap`nic se nezalomí
`flex-wrap: wrap`zalomí se
`flex-wrap: wrap-reverse`zalomí se v obráceném pořadí

První
 elementDruhýTřetí
elementČtvrtýPátýŠestý

### Pořadí elementů

Hodně elegantní je možnost nastavování řazení. Stačí si je očíslovat vlastností `order` a mohou být v kódu libovolně uspořádány. Nastavuje se pro flex-položky.
```
&lt;p style="order: 1">Bude první
&lt;p style="order: 3">Bude třetí
&lt;p style="order: 2">Bude druhý

```

### Úprava zarovnání

Jednotlivé flex-položky dědí zarovnání od flex-obalu. Vlastnost `align-self` umí nastavení flex-obalu přebít. Hodnoty jsou stejné jako u `align-item`, jen je navíc výchozí vlastnost `auto` (tj. řídit se nastavením obalu).

### Poměry roztahování

Vlastnostmi `flex-grow`, `flex-shrink` a `flex-basis` nebo zkráceně `flex: grow shrink basis` lze pro flex-položku nastavit, jak bude růst či ubývat vůči ostatním při přebytku, respektive nedostatku místa.
Hodnota `flex-grow` a `flex-shrink` se nastavuje od 0 do 1 a udává *ochotu* při roztahování a zmenšování se.
Pomocí `flex-basis` se nastaví výchozí šířka/výška (v závislosti na `flex-direction`), kterou by element rád měl, když se nebude muset zmenšovat nebo zvětšovat.

## Vyzkoušejte

Pro lepší pochopení je ideální si flexibilní boxy vyzkoušet:

  [Flexy Boxes](http://the-echoplex.net/flexyboxes)
  [Flexbox Playground](http://demo.agektmr.com/flexbox/)

## Využití

Při dostatečné podpoře v prohlížečích bude možné takto:

stavět celý layout webu,
  řešit komplikované úlohy jako [centrování položek s neznámou šířkou](/centrovani#neznama-sirka-vyska), stejně vysoké sloupce a jiné půjde velmi jednoduše,
zjednoduší se přizpůsobování stránky šířce okna prohlížeče.

## Odkazy jinam

- [MDN: Using CSS flexible boxes](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)

- [W3C: CSS Flexible Box Layout Module](http://dev.w3.org/csswg/css-flexbox/)

- [The Ultimate Flexbox Cheat Sheet](http://www.sketchingwithcss.com/samplechapter/cheatsheet.html)

  - [Boxes That Fill Height (Or More) (and Don’t Squish)](http://css-tricks.com/boxes-fill-height-dont-squish/) — vyplnění výšky flexboxy

  - [Řešení různých problémů přes `flex`](http://philipwalton.github.io/solved-by-flexbox/)

  - [Flex box navigace](http://css-tricks.com/flexbox-bar-navigation/)

  - [Flexbox in the real world](http://www.planningforaliens.com/blog/2014/03/11/real-world-flexbox/)

  - [Flexbox in 5 minutes](http://devbryce.com/site/flexbox/)

  - SmashingNagazine: [The Flexbox Reading List: Techniques and Tools](https://www.smashingmagazine.com/2016/02/the-flexbox-reading-list/)