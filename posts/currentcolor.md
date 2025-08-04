---
title: "CSS barva currentColor"
headline: "CSS barva <code>currentColor</code>"
description: "Klíčové slovo <code>currentColor</code> obsahuje aktuální barvu elementu."
date: "2014-11-27"
last_modification: "2014-11-28"
status: 1
tags: ["CSS", "Rady a nápady"]
---

„Barva“ `currentColor` se používá jako jiné hodnoty pro **nastavení barvy v CSS**.

```
element {
  border: 1px solid **currentColor**; 
}
```

Element bude mít rámeček v *aktuální barvě*. Hodnota `currentColor` bývá u řady vlastností výchozí, takže je možné její uvedení vypustit. Následující konstrukce se proto zobrazí stejně jako ta předchozí.

```
element {
  border: 1px solid; 
}
```

## Podpora

Klíčové slovo / „barva“ `currentColor` funguje od **IE 9**. Ve starších prohlížečích je možné využít **výchozí barvy** (bez přímého uvedení).

## Využití

Použitím `currentColor` si můžeme usnadnit práci při kopírování barev. Typický příklad nastane u tlačítka, kterému chceme při `:hover`u a `:focus`u změnit barvu písma i rámečku:

    .zmenaBarvy {
      color: #0D6AB7;
      border: 2px solid #0D6AB7;
      background: #fff;
      font-weight: bold;
    }
    .zmenaBarvy:hover {
      color: #DA3F94;
      border-color: #DA3F94;
      background: #fff;
    }
    .zmenaBarvy:focus, .zmenaBarvy:active {
      color: #0B8A14;
      border-color: #0B8A14;
      background: #fff;
    }    
  
  Tlačítko

V CSS pro každý stav budeme deklarovat tutéž barvu pro písmo (color) i rámeček (`border-color`).

```
button {
  color: **blue**;
  border: 2px solid **blue**;
}
button:hover {
  color: **red**;
  border-color: **red**;
}
button:focus, button:active {
  color: **green**;
  border-color: **green**;
}
```

Zabránit nutnosti duplikovat barvy mohou [CSS proměnné](/var) nebo **proměnné v preprocesorech**. Použití `currentColor` ale umožní udělat totéž **mnohem elegantněji** – nastavit jako barvu `currentColor` (nebo *nic* – vůbec ji neuvést) a měnit pouze `color`.

```
button {
  color: **blue**;
  border: 2px solid **currentColor**;
}
button:hover {
  color: **red**;
}
button:focus, button:active {
  color: **green**;
}
```

    .currentColor {
      color: #0D6AB7;
      border: 2px solid currentColor;
      background: #fff;
      font-weight: bold;
    }
    .currentColor:hover {
      color: #DA3F94;
      background: #fff;
    }
    .currentColor:focus, .currentColor:active {
      color: #0B8A14;
      background: #fff;
    }    
  
  Tlačítko

Jelikož se barva (`color`) **dědí**, lze tohoto chování využít i pro **vnořené elementy** nebo [pseudo-elementy](/css-selektory#before-after).

[Samostatná ukázka](http://kod.djpw.cz/aeib) využití `currentColor`

Klíčové slovo `currentColor` je u řady vlastností **zbytečné uvádět**. Kvůli podpoře pro **IE 8** a starších dokonce nežádoucí.

  - `border: 1px solid`

  - `outline: 1px solid`

  - `[box-shadow](/box-shadow): 10px 5px 5px`

  - `[text-shadow](/text-shadow): 10px 10px 5px`

[Živá ukázka](http://kod.djpw.cz/vfib) bez uvádění barev

## Odkazy jinam

  - [Extending the Color Cascade with the CSS currentColor Variable](http://blogs.adobe.com/dreamweaver/2015/02/extending-the-color-cascade-with-the-css-currentcolor-variable.html)