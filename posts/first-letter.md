---
title: "First-letter"
headline: "First-letter"
description: "CSS selektor <code>first-letter</code> zaměří první písmeno v elementu."
date: "2014-10-02"
last_modification: "2014-10-04"
status: 1
tags: ["CSS", "CSS selektory"]
---

## Zápis

```
element:first-letter {
  /* styl pro první písmeno */
}
```

*Správně* by se asi měly používat dvojtečky dvě (dvě dvojtečky značí pseudo-element), ale fungovalo by to potom jen od **IE 9**. S jedinou dvojtečkou funguje `first-letter` i v **IE 6** a novějších.

Jedná se tedy o široce podporovaný selektor.

    .first-letter-odstavec:first-letter {
          color: red;
    }  
  
  První písmeno bude červené.

## Využití

**Selektor prvního písmene** se hodí minimálně v následujících případech.

### Převedení prvního písmena na velké

Kombinací `:first-letter` a `text-transform: uppercase` zvětšíme první písmeno nadpisu, odstavce nebo čehokoliv jiného bez **úpravy zdrojového kódu**.

    .prvni-velke:first-letter {
          text-transform: uppercase;
    }
  
  odstavec v HTML kódu začíná malým písmenem, ale CSS první písmeno zvětší.

### Vytvoření zajímavějších stylů

Díky `first-letter` je možné umocnit efekt *kapitálek* (`font-variant: small-caps`). Hodí se například pro **zajímavější styl** nadpisů.

    p.small-caps {
      font-variant: small-caps;
    }
    
    .first-letter:first-letter {
      font-size: 120%;
    }

  Text napsaný kapitálkami

  Toto první písmeno je více zvětšeno

### Zvětšení písmene na začátku textu

[Rozplaváním](/float) prvního písmene a přidáním [`margin`u](/margin) dosáhneme požadovaného efektu bez změny HTML kódu.

    .velke-obtekane:first-letter {
          font-size: 360%;
          float: left;
          margin-top: .3em;
          margin-right: .1em;
    }
  
  První písmeno bude výrazně zvětšené a další text kolem něj bude obtékat klidně dva řádky.

Nevýhoda je, že musíme skloubit:

  - velikost písma,

  - styl písma,

  - odsazení,

  - výšku řádku

Aby to *nějak vypadalo*. Když se některá z výše uvedených hodnot změní, bude nejspíš nutné si hodnotami laborovat znovu.

Tento problém by v budoucnu **mohla řešit CSS vlastnost** `initial-letter`. Nyní to umí řešit skript [dropcap.js](https://github.com/adobe-webplatform/dropcap.js).

## Nefunkční `:first-letter`

Trochu zrada je, že `first-letter` nezaměří první písmeno elementu, který **není blokový**. Třeba pro obyčejný `&lt;span>` to proto nebude fungovat.

Řešení je použít blokový element. Případně přidat `display: block` / `display: inline-block` pro element, kde je cílem `:first-letter` použít.

## Odkazy jinam

  - [Drop Caps Are Beautiful](http://blogs.adobe.com/webplatform/2014/10/02/drop-caps-are-beautiful/)