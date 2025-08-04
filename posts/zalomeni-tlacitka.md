---
title: "Zalomení tlačítka na více řádků"
headline: "Zalomení tlačítka na více řádků"
description: "Jak zabránit nechtěnému zalomení tlačítka na více řádků."
date: "2015-07-23"
last_modification: "2015-09-25"
status: 1
tags: ["CSS", "Hotová řešení"]
---

Při formátování [odkazu jako tlačítka](/odkaz-tlacitko) se může stát nepěkná věc, kdy se tlačítko roztáhne na více řádků:

    .live a.jako-tlacitko {
      border-radius: 5px;
      padding: .5em;
      background: #0D6AB7;
      color: #fff;
    }
  
  Nějaký obsah následovaný [tlačítkem s hodně dlouhým textem](#)

## Řešení

### Inline-block

První možnost je nastavit hodnotu vlastnosti [`display`](/display) na `inline-block`:

    .inline-block {
      display: inline-block;
    }
  
  Nějaký obsah následovaný [tlačítkem s hodně dlouhým textem](#)

Řádkově-blokové zobrazení má i výchozí element `&lt;button>`, proto tímto problémem na rozdíl od řádkového odkazu netrpí.

### Zakázat zalamování

Vlastností `white-space` jde ovlivnit chování bílých znaků – například zrušit možnost zalomení pomocí hodnoty `nowrap`:

    .white-space {
      white-space: nowrap;
    }
  
  Nějaký obsah následovaný [tlačítkem s hodně dlouhým textem](#)

Tento postup trochu zlobí ve staré **Opeře 12**, kde část tlačítka zůstala na předchozím řádku.

### Tvrdá mezera

[**Tibor Soviš**](https://twitter.com/tiso) doplnil čistě HTML řešení pomocí **tvrdých mezer** – [entity](/entity) `&amp;nbsp;`. Přímo znak nedělitelné mezery jde [zapsat na české klávesnici](/ceska-klavesnice#kody) jako Levý Alt + 0160.

  Nějaký obsah následovaný [tlačítkem&nbsp;s&nbsp;hodně&nbsp;dlouhým&nbsp;textem](#)

Takové řešení ale může být pracnější než prostá CSS deklarace. V **Opeře 12** se tento postup projevuje totožným problémem jako `white-space: nowrap`.

  [zalomení
tlačítka](#)

-->