---
title: "Výpis zdrojového kódu"
headline: "Výpis zdrojového kódu"
description: "Jak na HTML stránce vypisovat zdrojové kódy."
date: "2014-10-31"
last_modification: "2015-07-12"
status: 1
tags: ["HTML", "HTML značky"]
---

Ze sémantického hlediska jsou důležité hlavně dvě značky:

  - `&lt;code>`

  - `&lt;pre>`

  - `&lt;var>`

## Značka `&lt;code>`

Slouží pro **zdrojový kód** zapsaný v řádku. Výchozí zobrazení značky `&lt;code>` je řádkové a zobrazuje se `neproporcionálním` písmem (`[font-family](/font#family): monospace`).

Příklad řádkového použití `&lt;code>`:

```
&lt;p>
  Pro nastavení rámečku slouží 
  CSS vlastnost **&lt;code>**border**&lt;/code>**
&lt;/p>
```

## Značka `&lt;pre>`

Pokud se jedná o blok kódu, obalí se `&lt;code>` ještě do značky `&lt;pre>`:

```
**&lt;pre>&lt;code>**zdrojový kód
přes více řádků**&lt;/code>&lt;/pre>**
```

Značka `&lt;pre>` slouží pro text, u kterého **záleží na bílých znacích** (mezery, tabulátory, odřádkování). Není nutné ji tedy používat spolu s `&lt;code>`, pokud v ní není kód, ale *předformátovaný* obsah.

Standardní chování v HTML bere jakékoliv bílé znaky (i v několika opakování za sebou) jako **jednu mezeru**.

```
&lt;p>
  Text s    hodně mezerami,
  tabulátory a novými
  řádky.
&lt;/p>
```

Proto tento kód bude ve výsledku celkem normální.

  .bile-znaky {white-space: pre}

  Text s    hodně mezerami,
  tabulátory a novými
  řádky.

Z pohledu CSS má ale `&lt;pre>` nastaven vlastnost `white-space` na `pre`, což způsobí **zachování všech bílých znaků**.

    Změnit nastavení bílých znaků

Toto chování je ale u **zdrojových kódů** žádoucí.

## Značka `&lt;var>`

Řádková značka `&lt;var>` slouží k označení proměnné. Zobrazuje se kursivou.

Proměnná může být v matematickém vzorci:

```
&lt;p>
  &lt;var>x&lt;/var> = &lt;var>y&lt;/var> + 1
&lt;p>
```

Případně i ve zdrojovém kódu. Příklad JS kódu:

```
var &lt;var>promenna&lt;/var> = 1;
```

Značka `&lt;var>` se moc často nepoužívá.

## Ošetření HTML řídicích znaků

Aby prohlížeče neinterpretovaly zdrojový kód jako HTML, je potřeba odstranit (převést na [entity](/entity)) tzv. **řídicí znaky**. Ty v praxi existují dva:

  - `&lt;` – slouží pro **otevření/uzavření HTML značky**

  - `&amp;` – označuje začátek **entit**

Znak `&lt;` se zapíše entitou „`&amp;lt;`“, `&amp;` potom jako „`&amp;amp;`“.

V PHP jde tento převod zajistit funkcí `htmlspecialchars`.

### `&lt;xmp>`

Značky `&lt;xmp>` a i [`&lt;textarea>`](/textarea) mají jednu společnou a zajímavou funkci – HTML kód, který bude uvnitř, **nebude interpretován** jako HTML – s výjimkou ukončovacích značek (`&lt;/xmp>`, respektive `&lt;/textarea>`) těchto elementů.

```
&lt;xmp>
  &lt;p>Zde může být HTML, které &lt;b>nebude&lt;/b> interpretováno.&lt;/p>
&lt;xmp>
```

[Živá ukázka](http://kod.djpw.cz/kqib)

### `&lt;plaintext>`

Značka `&lt;plaintext>` potom funguje jako `&lt;xmp>` jen ji není možné uzavřít. Veškerý obsah za ní až do konce dokumentu se **nebude interpretovat jako HTML**.

[Živá ukázka](http://kod.djpw.cz/jqib)

### `&lt;listing>`

Ještě existuje další zastaralá značka – `&lt;listing>` – v ní se HTML kód normálně objeví, chová se hodně podobně jako `&lt;pre>`.

  Používá ji **Chamurappi** na [Webylonu](http://webylon.info/).

[Živá ukázka](http://kod.djpw.cz/lqib)

## Podobné značky

V HTML existují ještě podobné značky.

### `&lt;samp>`

Zobrazuje se jako řádkový neproporcionálním písmem, tedy obdobně jako `&lt;code>`.

V překladu znamená *vzorek* (z anglického *sample*). Hodí se pro obalení **výstupu z počítačového programu** – tedy například **chybové hlášky**, výstupu z příkazové řádky a podobně.

Pro použití jako bloku je třeba `&lt;samp>` zkombinovat s `&lt;pre>`.

```
&lt;pre>&lt;samp>Fatal error: Maximum execution time of 5 seconds exceeded in&lt;/pre>&lt;/samp>
```

### `&lt;tt>`

Značka `&lt;tt>` je už *obsolete* – tj. zastaralá, překonaná a **neměla by se používat**. Zobrazuje se stejně jako `&lt;code>` nebo `&lt;span>` v řádku a neproporcionálním písmem.

**Yuhů** ji popsal následovně:

  Teletypový terminál. Že nevíte, co to je? Já také ne. (Nabízí se výraz "dálnopis", což ale problematiku spíše zatemňuje. Asi je to text konzoly vzdáleného připojení terminálu.) Zobrazováno strojopisem, tedy obvykle písmem Courier (ale ne vždy).

  Yuhů, [Úprava textu](http://www.jakpsatweb.cz/html/text.html#tt)

Příklad z [DevDocs](http://devdocs.io/html/element/tt):

```
&lt;p>
  Enter the following at the telnet 
  command prompt: &lt;code>set localecho&lt;/code>
  &lt;br>
  The telnet client should display: 
  &lt;tt>Local Echo is on&lt;/tt>
&lt;/p>
```