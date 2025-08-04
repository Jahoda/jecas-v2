---
title: "Hover efekty s box-shadow"
headline: "Hover efekty s <code>box-shadow</code>"
description: "Zajímavé <code>:hover</code> efekty s využitím CSS vlastnosti <code>box-shadow</code>."
date: "2014-08-11"
last_modification: "2014-08-11"
status: 1
tags: ["CSS", "Hotová řešení", "Animace", "Menu v CSS"]
---

CSS vlastnost pro **vytváření stínů** [`box-shadow`](/box-shadow) je popsána na samostatné stránce i s **generátorem stínů**.

Kromě klasických stínů jde použít `box-shadow` v kombinaci s [`transition`](/transition) i k zajímavým efektům po **najetí myši** ([`:hover`](/css-selektory#uzivatelske-akce)).

Jak to **funguje**?

    Stín se nastaví jako vnitřní (`inset`).

    ```
box-shadow: **inset** …;
```

    Vynulují se **všechny hodnoty** (vodorovná posice, svislá posice, rozmazání, velikost).

    Při `:hover`u se svislá/vodorovná hodnota **změní** (kladně nebo záporně), čímž docílíme požadovaného efektu.

    ```
box-shadow: inset **100px** 0 0 0 #0D6AB7;
```

    Plynulou změnu `box-shadow` během 300 milisekund (0,3 vteřiny) zajistí `transition`.

    ```
transition: box-shadow .3s;
```

## Vodorovné přebarvení

.vodorovne a {
    display: block;
    font-family: Segoe UI;
    color: #000;
    font-weight: bold;
    padding: 1em 0;
    width: 100px;
    text-align: center;
    text-decoration: none;
    background: #1081DD;
    transition: color .3s, box-shadow .3s;
    box-shadow: inset 0px 0 0 0 #0D6AB7;
}

.vodorovne a:hover {
    box-shadow: inset 100px 0 0 0 #0D6AB7;
    color: #fff;
    background: #1081DD;
}

    [Odkaz]()
    [Odkaz]()
    [Odkaz]()      

[Samostatná ukázka](http://kod.djpw.cz/oxeb)

## Svislé přebarvení

### Shora

.svisle a {
    display: inline-block;
    font-family: Segoe UI;
    color: #000;
    font-weight: bold;
    padding: 1em 0;
    width: 100px;
    text-align: center;
    text-decoration: none;
    background: #1081DD;
    transition: color .3s, box-shadow .3s;
    box-shadow: inset 0px 0 0 0 #0D6AB7;
}

.svisle a:hover {
    box-shadow: inset 0 70px 0 0 #0D6AB7;
    color: #fff;
    background: #1081DD;
}

    [Odkaz]()
    [Odkaz]()
    [Odkaz]()      

### Zdola

.svisle-nahoru a {
    display: inline-block;
    font-family: Segoe UI;
    color: #000;
    font-weight: bold;
    padding: 1em 0;
    width: 100px;
    text-align: center;
    text-decoration: none;
    background: #1081DD;
    transition: color .3s, box-shadow .3s;
    box-shadow: inset 0px 0 0 0 #0D6AB7;
}

.svisle-nahoru a:hover {
    box-shadow: inset 0 -70px 0 0 #0D6AB7;
    color: #fff;
    background: #1081DD;
}

    [Odkaz]()
    [Odkaz]()
    [Odkaz]()      

### Jenom trochu

.svisle-nahoru-malo a {
    display: inline-block;
    font-family: Segoe UI;
    color: #000;
    font-weight: bold;
    padding: 1em 0;
    width: 100px;
    text-align: center;
    text-decoration: none;
    background: #1081DD;
    transition: color .3s, box-shadow .3s;
    box-shadow: inset 0px 0 0 0 #0D6AB7;
}

.svisle-nahoru-malo a:hover {
    box-shadow: inset 0 -10px 0 0 #0D6AB7;
    color: #fff;
    background: #1081DD;
}

    [Odkaz]()
    [Odkaz]()
    [Odkaz]()      

[Samostatná ukázka](http://kod.djpw.cz/oxeb)

Podobný `:hover` efekt je možné vidět na **Twitteru**, ale tam je to řešené změnou tloušťky spodního okraje (`border-bottom-width`)

Kromě slabší podpory pro `box-shadow` v prohlížečích (**IE 9**+) se zdá řešení používající stín výhodnější, protože se nemusí řešit **ovlivnění okolních elementů**.