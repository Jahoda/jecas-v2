---
title: "Přizpůsobení záložního fontu přes size-adjust"
headline: "Přizpůsobení záložního písma přes size-adjust"
description: "CSS vlastnost <code>size-adjust</code> zabraňuje poskakování textu u vlastních fontů."
date: "2021-11-30"
last_modification: "2021-11-30"
status: 0
tags: []
---

Nestačí-li použít na webu systémová písma (dostupná přímo v zařízení), jde použít *vlastní* fonty pomocí CSS pravidla [`@font-face`](/font-face):

```
@font-face {
  font-family: "Název písma";
  src: url("pismo.ttf");
}
```

Tím bude možné potom v `font-family` použít nově zaregistrované písmo.

Vlastní fonty historicky trpí řadou problémů.

Takový font se musí napřed stáhnout, což vede k tomu, že se prohlížeč / tvůrce webu musí rozhodnout, jak se zachovat:

  - během stahování fontu,

  - po úspěšném stažení fontu,

  - po neúspěšném / dlouhém stahování fontu

Je to takové dilema, protože pokud se do doby stažení vlastního fontu stránka zobrazí nějakým základním fontem dostupným v systému, po stažení vlastního písma nejspíš poskočí kvůli rozdílným proporcím a velikostem.

Často se to řešilo tím, že se do stažení vlastního písma vůbec nezobrazoval text – takže nestažení fontu znemožnilo číst text. V lepším případě s nějakou časovou prodlevou, aby při neúspěchu bylo možné něco na stránce číst.

Vlastnost `size-adjust` nahrává tomu, aby se vždy na stránce zobrazoval text, byť ze začátku písmem dostupným v systému s tím, že se velikostně a proporčně upraví vlastnímu písmu, aby se eliminovalo poskakování.

## Odkazy jinam

  - Web.dev: [CSS size-adjust for @font-face](https://web.dev/css-size-adjust/)