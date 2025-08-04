---
title: "Plynulý přechod mezi stránkami"
headline: "Plynulý přechod mezi stránkami"
description: "Jak vytvořit plynulý animovaný přechod mezi dvěma stránkami."
date: "2014-08-16"
last_modification: "2014-08-20"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "Animace"]
---

Snažíme-li se webovou stránku vytvářet s **ohledem na krásu** (s využitím [animací](/animace) a různých **plynulých přechodů**), může působit přechod mezi dvěma stránkami lehce rušivě. Zvlášť potom u **komplikovanějších layoutů** lze pozorovat nepěkné probliknutí, než si prohlížeč *přechroupe* HTML, CSS a JavaScript.

První možnost, jak se tomuto vyhnout, je použít [AJAX](/ajax) a veškerý obsah načítat *asynchronně*.

To díky [`history.pushState`](/zmena-url) sice jde řešit i s používáním normálních URL, ale stránka se stává **náchylnější k chybám**, kdy drobná chyba v JS může znefunkčnit celou navigaci na webu. Klasický přechod mezi stránkami je vlastně takový **restart** všech skriptů.

Kromě toho je *zajaxování* webu relativně pracné.

## Skrytí a zobrazení animací

Řešením proto může být:

  - Použití **skrývací** animace před opuštěním stránky.

  - Použití **zobrazovací** animace na začátku načtení stránky.

Potřebnou animaci stačí vytvořit pomocí `@keyframes` a přiřadit ji do vlastnosti [animation](/animation)). **Zpětný průchod** animací zajistí klíčové slovo `reverse`.

*Objevovací* animace se spustí při **načtení stránky**.

Animace *zmizení* bude vyvolána po kliknutí na odkaz mířící pryč. Získat všechny odkazy na stránce jde z `document.links`. Nabízelo by se možná použít událost [`onbeforeunload`](/onbeforeunload), nicméně nejspíš ji nejde rozumně časovat, takže by nešlo garantovat přehrání ukončovací animace.

## Živá ukázka

  - [Živá ukázka](http://jecas.cz/animovany-prechod/)

  - [GitHub](https://github.com/Jahoda/animovany-prechod)

## Odkazy jinam

  - [jquery.smoothState.js](https://github.com/miguel-perez/smoothState.js) ([použití v praxi](http://css-tricks.com/add-page-transitions-css-smoothstate-js/))