---
title: "Barva označeného textu"
headline: "Styl označeného textu"
description: "Pseudo-element <code>::selection</code> umožňuje změnit styl kursorem označeného textu."
date: "2015-01-12"
last_modification: "2015-01-12"
status: 1
tags: ["CSS", "Stylování elementů", "CSS selektory"]
---

Výchozí styl výběru je většinou modré pozadí a bílý text. Pomocí stylu pro `::selection` je možné toto chování změnit. Kromě důvodu čistě estetického, aby výběr **ladil k designu** stránky, existuje i praktický důvod – na stránce s modrým pozadím a bílým textem nebude **standardní styl dobře vidět**.

Před změnou si je dobré uvědomit, že uživatelé jsou na **výchozí styl** zvyklí, takže změna může přinést nejistotu.

    .selection-test::-moz-selection {
      color: #8ECCF0; 
      background: #DA3F94;
    }
    .selection-test::selection {
      color: #8ECCF0; 
      background: #DA3F94;
    }
  
  Tento odstavec má nestandardní styl při výběru.

Některé prohlížeče – **Firefox** a **Internet Explorer** – dokáží výchozí barevný styl `::selection` automaticky **invertovat** (bílé pozadí, modrý text), aby byl kontrastní k pozadí.

Kromě staré **Opery 12** jde měnit barvu výběru i ve **formulářových polích** ([`&lt;input>`](/input)/[`&lt;textarea>`](/textarea)).

## Zápis

Styl označení textu jde nastavit globálně pro **celou stránku**:

```
::selection {
  /* styly pro všechny výběry na stránce */
}
```

Nebo i pro zvláštní elementy.

```
.zvlastni-element::selection {
  /* styly pro .zvlastni-element */
}
```

### Povolené vlastnosti

Pseudo-element `::selection` má zabudovanou ochranu před **příliš kreativními designéry**, měnit tak jde pouze:

  - `color` – barva písma

  - `background-color` – barva pozadí (nejde použít obrázek a podobně), jde použít zápis zkratkou `background`

  - [`text-shadow`](/text-shadow) – stín textu (nefunguje v **IE** a staré **Opeře 12**)

## Podpora

Měnit styl označeného textu je možné od **IE 9**. **Firefox** vyžaduje použít `-moz-` [prefix](/css-prefixy). Selektor s prefixem nelze spojit se selektorem bez něj. Tohle proto **nebude fungovat**:

```
::selection, ::-moz-selection {
  /* nebude fungovat */
}
```

Oba zápisy je nutné **duplikovat**:

```
::selection {
  color: yellow;
  background: red;
}
::**-moz-**selection {
  color: yellow;
  background: red;
}
```

[Živá ukázka](http://kod.djpw.cz/skjb-)