---
title: "Letter-spacing"
headline: "Letter-spacing"
description: "CSS vlastnost <code>letter-spacing</code> upravuje vzdálenost mezi písmeny."
date: "2015-08-27"
last_modification: "2015-09-21"
status: 1
tags: ["CSS", "CSS vlastnosti", "Písma"]
---

.velke-mezery {
      letter-spacing: 1em;
    }
  
  Písmena mají velké mezery.

## Zápis

```
element {
  letter-spacing: 1em;
}
```

Výchozí hodnota je `0`/`normal`. Vyšší hodnotou se rozestupy mezi písmeny zvětší. Záporné hodnoty naopak písmena více přiblíží k sobě:

    .male-mezery {
      letter-spacing: -1px;
    }
  
  Písmena jsou nalepená na sebe.

Při nastavení moc velké záporné hodnoty se dějí divné věci:

  −20 px10 px

  Velikost mezer mezi písmeny

  ```
element {
  letter-spacing: 0px;
}
```

## Podpora v prohlížečích

Široce podporovaná vlastnost ve všech běžně používaných prohlížečích. Chování při velké záporné hodnotě se může lišit.

## Využití

Zvětšení mezer mezi písmeny jde použít pro **zvýraznění/odlišení** textu. V dávné minulosti se to občas používalo na **psacím stroji** prokládáním textu běžnou mezerou.

### Zvýraznění v textu

Většinou si sice jde vystačit se zvýrazněním **tučným** nebo *šikmým*, ale právě využití proložení písmen může být další možnost.

V takovém případě je vhodné proložení písmen doplnit i odsazením zleva a zprava pomocí `padding`u, aby byly zřetelné **hranice slov**.

### Ozvláštnění nadpisů

Změnou mezer mezi písmeny jde vytvořit visuálně zajímavější nadpis i s běžným fontem.

    .jako-nadpis {
      font-size: 30px;
      letter-spacing: -3px;
      word-spacing: 3px;
    }

    Nadpis s menšími mezerami

### Záložní písmo

Při používání webových fontů trvá nějakou dobu jejich načtení. Do té doby, než se načtou, lze jejich vzhled prostorově připodobnit změnou odstupů.

### Ruční proložení mezerami

Odstupy mezi písmenky jde realisovat i klasickou mezerou:

  P r o l o ž e n í   t e x t u   m e z e r a m i

**Není to ale dobré řešení**, protože automatické programy (hlasové čtečky, vyhledávání) **nemusí poznat hranice slov**.

Dále je to pracné a nakonec by bylo i komplikovanější zajistit mezery mezi slovy – více mezer se v HTML spojí v jednu, takže by se musela požívat **pevná mezera** ([entita](/entity) `&amp;nbsp;`) a podobně.

## Odkazy

  - Jak psát web: [Letter-spacing](http://www.jakpsatweb.cz/css/letter-spacing.html)