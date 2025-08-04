---
title: "CSS background"
headline: "CSS <code>background</code>"
description: "Jak nastavit pomocí CSS obrázkové pozadí."
date: "2014-09-22"
last_modification: "2014-09-22"
status: 0
tags: []
---

-webkit-background-clip: text; -- http://codepen.io/dghez/pen/ItxKE

## Umístění pozadí `background-position`

Nastavit umístění obrázku jde pomocí klíčových slov `top`, `right`, `bottom`, `left` a `center`.

```
background-position: top left;
```

Rovněž také délkovými jednotkami:

```
background-position: 10px 10px;
```

Délkové jednotky se počítají zleva a shora, takže umístit přesně obrázek zprava nebo zdola je komplikovanější:

    Novější prohlížeče podporují uvedení klíčového slova pro směr:

    ```
background-position: **right** 10px top;
```

    Pro pevné rozměry elementu jde potřebná hodnota zleva/shora spočítat z šířky obrázku tak, aby ve výsledku byl obrázek požadovanou vzálenost od pravého/dolního okraje.

    Přibližného výsledku jde docílit s použitím procent:

    ```
background-position: 95% top;
```

    - CSS Tricks: [Positioning Offset Background Images](http://css-tricks.com/positioning-offset-background-images/)