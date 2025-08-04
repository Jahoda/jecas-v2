---
title: "Odsazení prvního řádku text-indent"
headline: "Odsazení prvního řádku <code>text-indent</code>"
description: "CSS vlastnost <code>text-indent</code> slouží k odsazení nebo předsazení prvního řádku."
date: "2015-08-27"
last_modification: "2015-09-23"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

.indent {
      text-indent: 1em;
    }
  
  První řádek 
 tohoto odstavce 
 bude více odsazen zleva.

Záporná hodnota zajistí naopak **předsazení prvního řádku** (v ukázce je přidán `padding`, aby obsah nevylezl z obalu):

    .zaporny-indent {
      padding-left: 1em;
      text-indent: -1em;
    }
  
  První řádek ** tohoto odstavce 
 bude více předsazen** zleva.

## Zápis

```
p {
  text-indent: 1em;
}
```

Hodnotu odsazení/předsazení jde zadat v běžných délkových jednotkách nebo v procentech. Výchozí hodnota je `0` – nic se neodsazuje.

### Další hodnoty

Specifikace uvádí další hodnoty pro `text-indent`, které ale zatím **nikde nefungují**:

  - `each-line` – odsadí i první řádek po řádkovém zlomu

  - `hanging` – invertuje obsah, co se má odsadit/předsadit

## Využití

U **textů v českých knihách nebo novinách** bývá zvykem, že se **odstavec tvoří** odsazením začátku řádku místo svislým odstupem, jak je běžné na webu.

**Znázorňovat odstavec** odsazením prvního řádku místo horního a dolního odsazení celého odstavce se hodí zejména v případech, kdy pro vertikální odsazení není dost místa – to se na rozdíl od novin a knih **webu moc netýká** – vyšší webová stránka další papír nestojí.

    - Odstavec v HTML: [Odsazení prvního řádku](/odstavec#prvni-radek)

### Skrývání textu

V CSS kódu některých webových kodérů je možné vidět konstrukce typu:

```
.skryty {
  text-indent: -9999px;
}
```

Používalo se to ke skrytí textu pří používání obrázkových nadpisů a tlačítek:

    - [Přístupný text v obrázku](/obrazek-text#pristupny)

Nejedná se o moc dobré řešení, protože bez načtených obrázků není text vidět. K podobnému výsledku tak jde dojít i elegantněji pomocí [`aria-*`](/aria) atributům.

## Selektor `::first-line`

Docílit dalších úprav prvního řádku kromě odsazení (přes `text-indent`) jde docílit CSS selektorem [`::first-line`](/css-selektory#first-letter-line), který zaměří pouze první řádek.

    .first-line:first-line {
      color: #DA3F94;
    }
  
  První řádek 
 tohoto odstavce 
 má jinou barvu.

Pomocí tohoto selektoru ale zatím nejde v prohlížečích třeba zrovna přidat odsazení. Pseudo-element `::first-line` podporuje jen vlastnosti měnící písmo, styl textu, barvu a pozadí:

    - MDN: [`::first-line`](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-line)

Při použití pouze jedné dvojtečky (`:first-line`) má perfektní podporu i ve starých prohlížečích.

## Odkazy jinam

  - Jak psát web: [Text-indent](http://www.jakpsatweb.cz/css/text-indent.html)

  - DevDocs: [`text-indent`](http://devdocs.io/css/text-indent)