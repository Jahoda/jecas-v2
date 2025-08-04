---
title: "Oříznutí textu"
headline: "Oříznutí dlouhého textu"
description: "Má-li se delší text vyjít do přesného místa, je třeba kousek textu uříznout."
date: "2013-10-30"
last_modification: "2013-10-31"
status: 1
tags: ["CSS", "Hotová řešení", "Animace"]
---

Pro **oříznutí jednořádkového textu čistě v CSS** stačí:

  - zrušit zalamování (`white-space: nowrap`),

  - omezit šířku (`width`),

  - element oříznout (`overflow: hidden`).

    .oriznuti {width: 220px; overflow: hidden; white-space: nowrap; background: #fff}

    Text, který bude na konci uříznutý a další text nebude vidět.

## Plynulé uříznutí do ztracena

Aby nebyl text nepěkně useknut **uprostřed písmene**, může vzhled zlepšit překrytí **plynulým přechodem**. To zajistí element s přechodem na pozadí, který se [absolutně naposicuje](/position#absolute). Napříč prohlížeči funkční CSS přechod lze [snadno vygenerovat](http://www.colorzilla.com/gradient-editor/).

  .oriznuti {width: 220px; overflow: hidden; white-space: nowrap; background: #fff; position: relative;}
  .prechod {
  position: absolute; right: 0; top: 0; width: 30px; height: 100%;
  background-image: -moz-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -ms-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -webkit-gradient(linear, 0 0, 100% 0, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0)));
  background-image: -webkit-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -o-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 );;
}

    Text, který bude na konci uříznutý a další text nebude vidět.

## Tři tečky (vlastnost `text-overflow`)

CSS umí přebytečný text nahradit výpustkou (`…`) při uvedení:

```
.text {text-overflow: ellipsis}
```

    .oriznuti {width: 220px; overflow: hidden; white-space: nowrap; background: #fff}

    Text, který bude na konci uříznutý a další text nebude vidět.

## Animované odkrývání textu

Ve výše uvedených řešeních je trochu nepraktické, že se k oříznutému textu **nepůjde dostat**. Co takhle **po najetí myší text posunout**, aby byl vidět celý?

.oriznuty {width: 220px; overflow: hidden; white-space: nowrap; 
    position: relative; height: 2em; background: #fff}
.prechod {
  z-index: 10;
  transition: 1s opacity;
  opacity: 1;
  position: absolute; right: 0; top: 0; width: 30px; height: 100%;
  background-image: -moz-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -ms-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -webkit-gradient(linear, 0 0, 100% 0, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0)));
  background-image: -webkit-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -o-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 );;
}

.oriznuty .text {position: absolute; right: 0; top: 0; 
  max-width: 220px;
transition: 2s max-width .5s}
.oriznuty:hover .text {max-width: 440px}
.oriznuty:hover .prechod {opacity: 0}

    Text, který bude na konci uříznutý a další text nebude vidět.

Využívá se triku s CSS vlastností [`transition`](/transition), kdy se [mění `max-width`](/animace-skryt#zmenseni). Pro přesnou animaci by proto bylo nejspíš nutné **použít JavaSript**.

## Oříznutí v PHP/MySQL

Oříznout text je možné i **na straně serveru**. Přesné ořezávání na serveru je ale složitější na údržbu. Stačí u textu třeba jen změnit velikost písma nebo jeho font a shodný počet znaků bude mít různé rozměry.

### PHP

```
$pocetZnaku = 10;
$text = mb_substr($text, 0, $pocetZnaku);
```

### MySQL

```
SELECT SUBSTR(sloupec, 1, 10) FROM tabulka;
```

Zkrácení textu s HTML značkami je [trochu komplikovanější](http://php.vrana.cz/zkraceni-textu-s-xhtml-znackami.php).