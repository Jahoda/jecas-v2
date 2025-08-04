---
title: "HTML tabulky"
headline: "HTML tabulky"
description: "Vytváření tabulek v HTML. Kompletní přehled všech tabulkových značek."
date: "2016-01-26"
last_modification: "2016-02-02"
status: 1
tags: ["HTML", "HTML značky", "Tabulky"]
---

## Tabulkový layout

Dlouhou dobu v minulosti byly HTML tabulky rozumnou možností, jak na stránce zobrazit obsah vedle sebe. Pomocí tabulek se tak stavěly celé [layouty](/layout) webových stránek.

Taková technika byla běžná ještě někdy kolem roku 2005, kdy pro stavbu rozvržení stránky převládlo CSS – zejména obtékání sloupců pomocí vlastnosti [`float`](/float).

Od vymizení prohlížeče **IE 6** potom přestává dávat smysl používat tabulky pro něco jiného než tabulková data. Tabulkové zobrazení se sice pořád hodí, ale je pohodlnější použít neutrální značky `&lt;div>` a [tabulkové hodnoty](/display#tabulkove) CSS vlastnosti `display`.

## Využití tabulek

Řada webových tvůrců si špatně vyložila trend v nahrazování tabulek pomocí CSS, a tak i data, která jasně patří do tabulky, řeší elementy [`&lt;div>`](/div-span) s příslušnými styly.

Tabulek se **není potřeba bát** a je možné je používat.

Bohužel pro tabulky – jejich používání není moc vhodné při tvorbě responsivního designu.

## Mobilní smrt tabulek

S příchodem [responsivního designu](/responsive) se v HTML dramaticky omezilo používání rozsáhlých tabulek.

Na malou obrazovku mobilu bývá často problém vměstnat tabulku o více než dvou sloupcích.

Zobrazovaná data je tak nutné podle dostupné šířky přeskupovat, a to je pohodlnější s neutrálními značkami `&lt;div>` a `&lt;span>`.

Existují sice postupy, jak si na mobilu poradit s rozsáhlejší tabulkou, ale nic moc dobrého vymyslet nejde:

    - [Responsivní tabulky](/responsivni-tabulky) – co udělat s tabulkami, aby se rozumně zobrazovaly na mobilech/tabletech

## HTML značky tabulky

Nejjednodušší tabulku jde vytvořit třemi značkami – `&lt;table>`, `&lt;tr>` a `&lt;td>` (tabulka, řádek, buňka).

Pro komplikovanější výtvory se hodí znát ještě `&lt;th>` (buňka v hlavičce), `&lt;thead>`, `&lt;tbody>` a `&lt;tfoot>` (členění tabulky na záhlaví, tělo a zápatí).

K uvedení popisku tabulky potom existuje značka `&lt;caption>`.

Nakonec pro snadnou správu sloupců tabulky slouží zřídka používané značky `&lt;col>` (sloupec) a `&lt;colgroup>` (skupina sloupců).

### `&lt;table>`

Obal celé tabulky. Bez jeho uvedení se ostatní tabulkové značky budou ignorovat.

Z historických důvodů funguje na značce `&lt;table>` řada presentačních atributů pro nastavení rámečku, pozadí, zarovnávání a další. Všechny jsou zavržené a lze je bez problému nahradit CSS ekvivalenty.

    - [Stylování HTML tabulek](/stylovani-tabulky)

### `&lt;tr>`

*Table row* je řádek tabulky. Podle specifikace má povinnou počáteční a volitelnou koncovou značku. V praxi si prohlížeče poradí i při vynechání počáteční značky, takže jednořádkovou tabulku jde zapsat jako:

```
&lt;table>
  &lt;td>První buňka
  &lt;td>Druhá buňka
&lt;/table>
```

Většinou je ale řádků potřeba více, takže je nutné `&lt;tr>` používat.

[Ukázka](http://kod.djpw.cz/xbub) – tabulka bez `&lt;tr>`

### `&lt;td>`

Samotná buňka tabulky, kam se píše obsah. Koncová značka je volitelná.

Zajímavé jsou atributy `rowspan` a `colspan` sloužící k slučování buněk tabulky.

V následujícím příkladu bude buňka v prvním řádku tabulky roztažena přes dva sloupce řádku následujícího ([ukázka](http://kod.djpw.cz/fytb)):

```
&lt;table>
  &lt;tr>
    &lt;td **colspan**="2">
      Přes dva sloupce
    &lt;/td>
  &lt;/tr>
  &lt;tr>
    &lt;td>První&lt;/td>
    &lt;td>Druhá&lt;/td>
  &lt;/tr>
&lt;/table>

```

Sloučení buněk po řádcích by vypadalo následovně ([ukázka](http://kod.djpw.cz/gytb)):

```
&lt;table>
  &lt;tr>
    &lt;td **rowspan**="2">
      Přes dva řádky
    &lt;/td>
    &lt;td>Vedle&lt;/td>
  &lt;/tr>
  &lt;tr>    
    &lt;td>Pod vedle&lt;/td>
  &lt;/tr>
&lt;/table>

```

### `&lt;th>`

Zvláštní typ buňky, který funguje obdobně jako `&lt;td>` (včetně slučování pomocí `colspan` a `rowspan`). Používá se pro označení názvu popisující data v sloupci (typicky v záhlaví). V prohlížečích se automaticky zobrazuje tučně.

### `&lt;thead>`

Záhlaví tabulky. Vkládá se do značky `&lt;table>`. Zajímavost značky pro záhlaví je v tom, že obsahu bude nahoře i v případě, že je fysicky v kódu až dole.

Značka je nepovinná. Nemusí se vůbec uvádět, protože tabulka může být i bez záhlaví.

### `&lt;tbody>`

Tělo tabulky. Značka je nepovinná. Pokud jsou v tabulce řádky a buňky mimo `&lt;thead>` nebo `&lt;tfoot>`, tělo tabulky se v [HTML DOMu](/dom) vytvoří automaticky i bez uvedení `&lt;tbody>` v kódu.

Značku `&lt;tbody>` jde umístit do tabulky několikrát, může se to hodit:

  Občas se hodí, že `&lt;tbody>` může být v jedné tabulce vícekrát. Dají se tak logicky seskupit bloky řádků a několikrát mi to usnadnilo programování v javascriptu či stylování.

  — Kajman

### `&lt;tfoot>`

Slouží pro zápatí tabulky. Patří do značky `&lt;table>` a obsah v `&lt;tfoot>` se zobrazí na konci tabulky nezávisle na umístění v HTML kódu.

### `&lt;caption>`

Slouží pro popisek vysvětlující obsah tabulky.

Ve výchozím stavu se zobrazuje nad tabulkou nezávisle na umístění v HTML kódu.

Toto umístění jde změnit ne moc známou a používanou CSS vlastností `caption-side` od **Internet Exploreru 8**.

```
caption {
  caption-side: bottom;
}
```

Dříve se to dělalo HTML atributem `align="bottom"`. Ve **Firefoxu** jde `&lt;caption>` umístit i vlevo či vpravo hodnotami `left` a `right`.

[Ukázka](http://kod.djpw.cz/mytb)

### `&lt;col>`

Značka `&lt;col>` se zdá být skoro k ničemu. Jde ale použít k pohodlnějšímu stylování všech buněk ve sloupci.

V následující [ukázce](http://kod.djpw.cz/hytb) budou mít buňky „Druhá“ šedivé pozadí.

```
&lt;table>
  &lt;col>&lt;col style="background: gray">
  &lt;tr>
    &lt;td>První&lt;/td>&lt;td>Druhá&lt;/td>
  &lt;/tr>
  &lt;tr>
    &lt;td>První&lt;/td>&lt;td>Druhá&lt;/td>
  &lt;/tr>  
&lt;/table>

```

Značka `&lt;col>` se tak hodí pro elegantní [zvýraznění sloupců tabulky](/zvyrazneni-tabulky) JavaScriptem po najetí myší.

Přes atribut `span` jde obsáhnout jedním `&lt;col>`em více sloupců. Následující kód proto obarví dva sloupce tabulky do šedivé barvy:

```
&lt;col **span="2"** style="background: gray">
```

Díky pokročilým [CSS selektorům n-tého elementu](/css-selektory#n-ty-potomek) jde ale celkem snadno barvit sloupce jen pomocí CSS:

```
td:nth-child(2) {
  background: gray
}
```

### `&lt;colgroup>`

Element `&lt;colgroup>` slouží jako obal jednotlivých značek `&lt;col>`. Při jeho neuvedení v HTML kódu a použití značek `&lt;col>` se `&lt;colgroup>` vytvoří automaticky sám.

Když se do tabulky vloží bez `&lt;col>`, bude fungovat stejně jako značka `&lt;col>`.

„Skupin sloupců“ může být v kódu i víc.

Pro pochopení rozdílu `&lt;colgroup>` a `&lt;col>` poslouží následující [ukázka](http://kod.djpw.cz/jytb).