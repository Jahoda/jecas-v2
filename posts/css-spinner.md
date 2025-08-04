---
title: "CSS spinner"
headline: "CSS spinner"
description: "Točící se kolečko pro znázornění načítání v čistém CSS."
date: "2013-12-01"
last_modification: "2016-10-31"
status: 1
tags: ["CSS", "Animace"]
---

Pro **znázornění** [průběhu načítání](/animace-nacitani) je možné použít od **IE 10** [animaci](/animace). Jak si nějakou připravit čistě v CSS pomocí [`animation`](/animation).

.kolecko {
    width: 50px; 
    height: 50px;
    -webkit-animation: tocit 1s infinite linear;
    animation: tocit 1s infinite linear;
    border-radius: 50%;
    border-bottom: 3px solid black;
}
@-webkit-keyframes tocit {
    to {-webkit-transform: rotate(360deg)}
}
@keyframes tocit {
    to {transform: rotate(360deg)}
}

[Samostatná ukázka](http://kod.djpw.cz/nhcb)

Funguje to tak, že se element zakulatí vlastností [`border-radius`](/border-radius). Na jednu stranu (např. `border-bottom`) se přidá rámeček.

.koleckoBezAnimace {
    width: 50px; 
    height: 50px;
    border-radius: 50%;
    border-bottom: 3px solid black;
}

A nekonečná animace tento *rámeček* bude [otáčet](/rotace) přes transformaci: `transform: rotate(360deg)`.

Pro transformaci i animaci je v prohlížečích s jádrem **Webkit** nutné použít [CSS prefixy](/css-prefixy).

## Starší prohlížeče

Pro starší prohlížeče (**IE 9** a starší) by se obdobná animace musela dělat [JavaScriptem](/js) nebo obrázkovým [GIFem](/format-obrazku#gif).

## Proč CSS animace

Animování pomocí CSS bývá nepatrně **rychlejší** než srovnatelné animace v JavaScriptu.

CSS animace může být i jednodušší na realisaci a úpravy vzhledu než tvorba GIFu.

## Hotové CSS animace načítání

  - [CSS spinner](http://lea.verou.me/2013/11/cleanest-css-spinner-ever/)

  - [Animace průběhu v odesílacím tlačítku](http://tympanus.net/Development/ProgressButtonStyles/)

  - [Různé styly animací](http://tobiasahlin.com/spinkit/)

  - [CSS Only Loading Spinners](http://www.paulund.co.uk/playground/demo/css-only-loading-spinner/)

  - [Progress.js](http://usablica.github.io/progress.js/) – znázornění průběhu v horní části stránky

  - [8 awesome pure CSS spinner / loader](https://www.dev-metal.com/8-awesome-spinners-loaders-pure-css/)

  - [Single Element CSS Spinners](http://projects.lukehaas.me/css-loaders/)

  - [Creating a Collection of CSS3 Animated Pre-loaders](http://webdesign.tutsplus.com/tutorials/creating-a-collection-of-css3-animated-pre-loaders--cms-21978) – jak animace načítání vytvořit

  - [SVG Loaders](http://samherbert.net/svg-loaders/)

  - [16 CSS3 and jQuery Loading Animations Solutions](http://designmodo.com/css3-jquery-loading-animations/)

  - [Loading.io](http://loading.io/) – nástroj pro vytvoření loadovacích animací v CSS/SVG/GIF