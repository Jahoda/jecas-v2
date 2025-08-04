---
title: "Odpočítávání času v JavaScriptu"
headline: "Odpočítávání času v HTML"
description: "Jak udělat na webu odpočítávání času. V JavaScriptu i v čistém CSS."
date: "2013-12-10"
last_modification: "2013-12-19"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "Animace"]
---

V případě, že na stránce potřebujeme **odpočítávat čas**, existují následující řešení **na straně klienta**.

## JavaScript

Pro odpočítávání v JS jde použít dvě funkce:

  - `setInterval`

  - `setTimeout`

První (`setInterval`) vytvoří nekonečné opakování v zadaném intervalu. Druhá `setTimeout` se vykoná jen jednou, když uplyne **nastavený čas** — nic ale nebrání po uplynutí času a provedení akce zavolat další `setTimeout`, takže i tak se dá vytvořit **nekonečné opakování**.

```
var **casovac** = setInterval(function() {
  // nějaká akce
}, *1000*)
```

Zápis pro `setTimeout` bude obdobný. Přiřadit časovač do **proměnné** `casovac` je vhodné k tomu, aby šel zrušit zadáním:

```
clearInterval(**casovac**);
```

Druhý argument s hodnotou `1000` je čas opakování (respektive spuštění pro `set**Timeout**`) a zadává se v jednotkách profíků — **milisekundách**. Tisíc milisekund je jedna vteřina, `500` milisekund je půl vteřiny a cca 30 milionů milisekund je **jeden rok**. Větší hodnoty je pro přehlednost vhodné psát jako násobky:

    `1000 * 5`
    5 vteřin

    `1000 * 60`
    1 minuta

    `1000 * 60 * 5`
    5 minut

    `1000 * 60 * 60 * 3`
    3 hodiny

    `1000 * 60 * 60 * 24 * 100`
    100 dní

    `1000 * 60 * 60 * 24 * 365 * 2`
    2 roky (přibližně)

  [Ukázka](http://kod.djpw.cz/wow) časovače (`setInterval`), který každou vteřinu vypíše do stránky „Ahoj“. 
  
  - Použití `set**Timeout**` by [vypadalo podobně](http://kod.djpw.cz/bpw).

  A vytvoření opakovaného `set**Timeout**`u [takto](http://kod.djpw.cz/cpw).

## Datum a odpočítávání

Využitím výše uvedených funkcí se dá vytvořit i odpočítávání do určitého dne.

Existuje spoustu různých **countdown skriptů**, mně se osvědčil tento, který umí i **české skloňování** (na ukázce odpočítává do 24. 12. 2063).

var vterina = 1000;
var minuta = vterina * 60;
var hodina = minuta * 60;
var den = hodina * 24;
var rok = den * 365.24219;

var slova = {
    roku: ["rok", "roky", "let"],
    dnu: ["den", "dny", "dnů"],
    hodin: ["hodina", "hodiny", "hodin"],
    minut: ["minuta", "minuty", "minut"],
    vterin: ["vteřina", "vteřiny", "vteřin"]
};

function sklonovani(pocet, co) {
    if (pocet == 1) return slova[co][0];
    if (pocet  0) return slova[co][1];
    return slova[co][2];
}

function odpocet(el) {
    var konec = new Date(el.getAttribute("data-konec"));
    var ted = new Date();
    var rozdil = konec - ted;
    if (rozdil  0) vypis += " " + pocet + " " + sklonovani(pocet, co);

    }

    el.innerHTML = vypis;
    setTimeout(function() {
      odpocet(el); 
    }, vterina);
}

  odpocet(document.getElementById('odpocet'));

[Samostatná ukázka](http://kod.djpw.cz/xby)

## CSS odpočítávání

S příchodem [CSS animací](/animation) (funkční od **IE 10**) se nabízí nové možnosti, jak jednoduché odpočítávání realisovat čistě v CSS ([samostatná ukázka](http://kod.djpw.cz/gfc)).

  @keyframes odpocitat {
    0%   {top: 0; background: #0D6AB7}
    100% {background: #DA3F94; top: -250px;}
  }
  @-webkit-keyframes odpocitat {
    0%   {top: 0; background: #0D6AB7}
    100% {background: #DA3F94; top: -250px;}
  }
  .odpocet span {
    display: block; background: blue; width: 50px; height: 50px;
    line-height: 50px;
    text-align: center; color: white;
    position: relative;
    animation: odpocitat 5s linear infinite;
    -webkit-animation: odpocitat 5s linear;
  }
  .odpocet {height: 50px; overflow: hidden}

    5
    4
    3
    2
    1
    0

Řešení spočívá ve vytvoření si pásu čteverčků s jednotlivými čísly, které se potom posouvají, čímž se vytvoří efekt odpočítávání.

Díky časovaným animacím je možné vytvořit i visuálně zajímavější „odpočítávání“. Třeba *hodiny*. ([Samostatná ukázka](http://kod.djpw.cz/sow))

  @keyframes rucicka {
    to {transform: rotate(360deg)}
  }
  @-webkit-keyframes rucicka {
    to {-webkit-transform: rotate(360deg)}
  }
  
  .hodiny {border-radius: 50%; border: 4px solid #0D6AB7; width: 100px; height: 100px; position: relative}
  .rucicka {background: #DA3F94; width: 40px; height: 4px; position: absolute; top: 50%; left: 50%; margin-top: -2px; margin-left: -40px; -webkit-animation: rucicka 10s infinite linear; animation: rucicka 10s infinite linear; -webkit-transform-origin: right center; transform-origin: right center;}
  
  .rucicka:before {content: ""; position: absolute; background: #1081DD; border-radius: 50%; width: 8px; height: 8px; right: -2px; top: -2px}
  .rucicka:after {content: ""; border: 4px solid transparent; border-right-color: #DA3F94; position: absolute; left: -8px; top: -2px; width: 10; height: 0;}

  - Šipička na konci ručičky je [nakreslená v CSS](/css-kresleni#trojuhelniky).

  - Puntík uprostřed a kruhový *obal* je vytvořen [kulatými rohy](/border-radius).

  - Pohyb ručičky zajišťuje animací řízena [rotace](/rotace).

Přidáním dalších ručiček a nastavením odpovídajícího času animace by šlo vytvořit plnohodnotné hodiny.