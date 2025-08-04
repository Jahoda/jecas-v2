---
title: "Horní a dolní index v HTML"
headline: "Horní a dolní index v HTML"
description: "Pro zapisování horních a dolních indexů slouží v HTML značky <code>&lt;sup></code> a <code>&lt;sub></code>."
date: "2015-08-22"
last_modification: "2015-08-22"
status: 1
tags: ["HTML", "HTML značky"]
---

Horníindex a 
  dolníindex

Používání indexů pomocí značek `&lt;sup>` a `&lt;sub>` by mělo mít **sémantický význam**, není tedy vhodné tyto elementy používat pouze pro **odlišení vzhledu**.

## Horní index `&lt;sup>`

Název z anglického *superscript*. Značka pro horní index je občas použitelná pro:

  zápis **čtverečních metrů** – 10 m2, případně i metrů (nebo jiných jednotek) krychlových – 10 mm3

  **odkaz na zdroj** – dolní index[1](#sub), což používá například **Wikipedie**.

  zápis **matematických příkladů** – 5 * 32

  **anglické číslovky** – 1st, 2nd, 3rd, 4th

Použití **horního indexu** jde často obejít použitím zvláštního symbolu / [HTML entity](/entity):

  - `&amp;sup1;` – na první&sup1;

  - `&amp;sup2;` – na druhou&sup2;

  - `&amp;sup3;` – na třetí&sup3;

U dolního indexu nebo jiných čísel než 1, 2 a 3 obdobný postup neexistuje.

[**Joker**](http://www.it-joker.cz/) na [diskusi](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=4&amp;topic=164295#3) doplnil, že **Unicode** obsahuje zvláštní blok [Superscripts and subscripts](http://www.fileformat.info/info/unicode/block/superscripts_and_subscripts/list.htm), který obsahuje (mj.) znaky pro číslice horních i dolních indexů.

## Dolní index `&lt;sub>`

V angličtině *subscript*. Spodní index má využití hlavně u **chemických vzorců** – například N2O.

## Typografie

Při oželení **perfektní typografie** se jde bez horního/dolního indexu obejít a psát 10 m2, 5 * 3^2 nebo N2O, ale nebude to vypadat tak dobře.

## Stylování indexů

Z pohledu CSS je `&lt;sup>`/`&lt;sub>` řádkový element ([`display: inline`](/display#inline)) s menším písmem ([`font-size`](/font#size)) a odlišným zarovnání na řádku – `vertical-align`.

Do podoby horního/dolního indexu tak jde snadno nastylovat cokoliv jiného:

  .index {font-size: 80%}
  .index--horni {vertical-align: super}
  .index--dolni {vertical-align: sub}

  Horníindex a dolníindex

V hodnotách `vertical-align` je trochu zrada, protože pro **dolní index** se CSS hodnota jmenuje stejně jako značka – `sub`.

```
.index--dolni {vertical-align: sub}
```

Pro **horní index** to je ale `super`.

```
.index--horni {vertical-align: super}
```

## Rozhozená výška řádků

Použití indexů pomocí značek `&lt;sup>` a `&lt;sub>` trpí tím, že mění výšku celého řádku. U entit `&amp;sup2;` a `&amp;sup3;` problém není:

[Živá ukázka](http://kod.djpw.cz/gfpb)

Existuje několik možných řešení:

    **Nulová výška řádku** (funkční od **IE 8**)

    ```
sup, sub {
  line-height: 0;
}
```

    **Relativní posicování** – indexy se nejprve zarovnají do základní posice (`baseline`) a potom relativně posunou:

    ```
sub, sup {
  vertical-align: baseline;
  position: relative;
  top: 0.4em
}
sup {top: -0.4em}
```

    Tento postup funguje i v prastarých **IE**.

  [Srovnávací ukázka](http://kod.djpw.cz/hfpb)

    **Kombinace** – nástroj [Normalize.css](http://necolas.github.io/normalize.css/) obsahuje následující:

    ```
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {top: -0.5em}
sub {bottom: -0.25em}
```

    Nevím přesně proč, protože předchozí dva jednodušší postupy fungují.

## Jak si zapamatovat `&lt;sup>` a `&lt;sub>`

Rozlišit co je horní a dolní index jde i bez znalosti angličtiny podle umístění bříška posledního písmena. Když je bříško nahoře, jde o index horní `&lt;sup>`, když dole, tak spodní `&lt;sub>`.

## Odkazy jinam

  - Jak psát web: [Úprava textu](http://www.jakpsatweb.cz/html/text.html#sub)

  - Lukáš Havrlant: [Stylování horních a dolních indexů](http://atd.havrlant.net/stylovani-hornich-a-dolnich-indexu.html)

  - DevDocs: [`&lt;sub>`](http://devdocs.io/html/element/sub), [`&lt;sup>`](http://devdocs.io/html/element/sup)

  - CSS Tricks: [Prevent Superscripts and Subscripts from Affecting Line-Height](https://css-tricks.com/snippets/css/prevent-superscripts-and-subscripts-from-affecting-line-height/)