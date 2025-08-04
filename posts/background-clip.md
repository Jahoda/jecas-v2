---
title: "Background-clip"
headline: "Background-clip"
description: "CSS vlastností <code>background-clip</code> jde omezit místo, kde zobrazí obrázek na pozadí."
date: "2014-11-15"
last_modification: "2014-11-16"
status: 1
tags: ["CSS", "CSS vlastnosti", "Obrázky"]
---

Standardní chování pozadí v HTML elementu je takové, že vyplní **celý prostor**. Včetně případného rámečku (`border`), což je k vidění u rámečku s průhlednou barvou (`border-color: transparent`) nebo s průsvitnou barvou přes [`rgba`](/rgba). Taktéž v případě, že je `border` čárkovaný (`dashed`), dvojitý (`double`) nebo tečkovaný (`dotted`).

Vlastnost `background-clip` toto chování umí změnit.

## Podpora

Funguje od **IE 9**. Kromě zvláštní hodnoty `text`, která umí oříznout obrázek podle textu, ta funguje pouze s [prefixem](/css-prefixy) `-webkit-`.

## Zápis

```
element {
  background-clip: *způsob*
}

```

*Způsob* může mít následující hodnoty:

  `border-box`

    Výchozí chování. Pozadí bude i za rámečkem.

      Text s obrázkovým pozadím.

  `padding-box`

    Pozadí se zarazí u rámečku.

      Text s obrázkovým pozadím.

  `content-box`

    Pozadí se zarazí před `padding`em elementu.

      Text s obrázkovým pozadím.

  `text`

    Asi nejzajímavější je volba **oříznutí pozadí podle textu**, což umožňuje nastavit písmenům obrázkové pozadí.

    Funguje zatím pouze v jádru Blink (**Chrome**, **Opera**). Obrázek se jako pozadí písmen objeví při zprůhlednění barvy (`color`) nebo po zprůhlednění vlastností `text-fill-color`.

    [Živá ukázka](http://kod.djpw.cz/anhb)

    Obrázek, jak to přbližně vypadá v podporujícím prohlížeči.

    S touto vlastností se dají dělat docela zajímavé efekty animováním pozadí (vlastností [`animation`](/animation) nebo [`transition`](/transition)).

## Odkazy jinam

  - DevDocs: [`background-clip`](http://devdocs.io/css/background-clip)

  - Zajímavé kousky s obrázkovým pozadí textu: [Text Backgrounds and Gradients with background-clip](http://scotch.io/tutorials/css/text-backgrounds-and-gradients-with-background-clip)

  - CSS-Tricks: [How To Do Knockout Text](https://css-tricks.com/how-to-do-knockout-text/)

.pozadi-ramecek {
    background: #8ECCF0;
    padding: .5em;
    margin: 1em 0;
    border: 5px dotted #1081DD;
}