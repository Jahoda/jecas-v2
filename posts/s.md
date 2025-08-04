---
title: "Přeškrtnutí značkou S"
headline: "Škrtnutí značkou <code>&lt;s></code>"
description: "Značka <code>&lt;s></code> slouží k označení obsahu, který už je zastaralý nebo není relevantní."
date: "2014-10-31"
last_modification: "2014-10-31"
status: 1
tags: ["HTML", "HTML značky", "Hotová řešení"]
---

HTML element `&lt;s>` má počáteční i koncovou značku [povinnou](/html-znacky#povinne). Jedná se o značku řádkovou – podobně jako například `&lt;span>`. Nemá **specifické atributy**, podporuje pouze ty *globální*/obecné (`title`, `class`, `id` a podobně).

```
&lt;s>Obsah&lt;/s>
```

Funguje snad ve všech prohlížečích, ve výchozím stylu je obsah **přeškrtnutý** (`text-decoration: line-through`).

  Obsah značky `&lt;s>` je přeškrtnutý.

## Využití

Značka `&lt;s>` má **sémantický význam** pro označení obsahu, který je již neaktuální či nerelevantní. Nabízí se například pro označení původní ceny před slevou.

```
&lt;p>
  &lt;s>Fytopuf stojí 900 Kč.&lt;/s>
&lt;/p>
&lt;p>
  Fytopuf je nyní jen za 800 Kč.
&lt;/p>
```

[Ukázka](http://kod.djpw.cz/rahb)

## Podobné značky

Repertoár HTML značek obsahuje ještě další dvě, které mají stejný výchozí styl (jsou přeškrtnuté).

  - `&lt;strike>`

  - `&lt;del>`

Značka `&lt;strike>` je tzv. *obsolete* (zastaralá/překonaná), protože podle HTML specifikace nemá na rozdíl od `&lt;s>` sémantický význam.

Element `&lt;del>` potom slouží pro označení obsahu, který **byl ze stránky vymazán**. Má zvláštní atributy `datetime` (pro označení času smazání) a `cite` pro uvedení URL zdůvodňující **důvod smazání**.

## Rozdíl `&lt;s>` a `&lt;del>`

Do jisté míry se dá říci, že obě značky jsou si významově **hodně podobné**. Asi největší odlišnost je, že značka `&lt;s>` by se na rozdíl od `&lt;del>` neměla používat ke znázorňování změn stránky – k tomu je určena právě značka `&lt;del>` v kombinaci s jejím protějškem – značkou `&lt;ins>`.

## Šikmé přeškrtnutí

Pokud se nespokojíme s výchozím přeškrtnutím přes `text-decoration: line-through`, můžeme si udělat přeškrtnutí vlastní. Třeba absolutně posicovaným `border`em přes obsah.

Šikmého škrtnutí dosáhneme [otočením](/rotace) čáry o několik stupňů.

.sikme s {
    position: relative;
    text-decoration: none;
}

.sikme s:before {
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 50%;
    border-top: 1px solid #000;
    -webkit-transform:rotate(-5deg);
    -moz-transform:rotate(-5deg);
    -ms-transform:rotate(-5deg);
    -o-transform:rotate(-5deg);
    transform:rotate(-5deg);
}

Fytopuf stojí 900 Kč

[Živá ukázka](http://kod.djpw.cz/sahb)

Když kromě `:before` použijeme i `:after`, dá se snadno docílit **dvojitého škrtnutí**.

[Živá ukázka](http://kod.djpw.cz/tahb)

### Starší prohlížeče

Co se stane v prohlížečích, co **neznají** *transformaci* pro otočení (**IE 8**)? Přeškrtnutí bude zkrátka **rovné**, což ale nemusí tolik vadit.

## Odkazy jinam

  - W3C: [The `s` element](https://html.spec.whatwg.org/multipage/semantics.html#the-s-element)

  - [DevDocs: `&lt;s>`](http://devdocs.io/html/element/s)