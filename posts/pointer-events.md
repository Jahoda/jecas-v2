---
title: "CSS pointer-events"
headline: "CSS <code>pointer-events</code>"
description: "Vlastnost <code>pointer-events</code> umožňuje zrušit reakci na události vyvolané myší."
date: "2013-11-29"
last_modification: "2013-12-05"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

V některých situacích, například při **rolování po stránce**, může být zbytečné, aby se u všech elementů, co mají efekt po najetí myši, na ten zlomek sekundy, kdy kursor bude nad elementem, `:hover` vyvolával.

CSS vlastnost `pointer-events` může toto chování zablokovat. Kromě **CSS události** umí blokovat i události v JavaScriptu (`onclick`, `onmouseover` apod.). Bohaté využití má u [**SVG**](/svg), kde funguje od **IE 9**. U HTML obsahu je podpora mimo starou **Operu 12** až od **[IE 11](/ie11)**.

    .pointer-events:hover {color: #DA3F94}
    .pointer-events-none {pointer-events: none}
  
  Odstavec má barevný `:hover` a při `onclick`u zobrazí JS hlášku.

  Stejný odstavec, ale nastavení `pointer-events: none` by tuto *parádu* mělo zrušit.

**Poznámka**: správně řečeno nejde o blokování událostí myši, ale obecně *ukazatele*.

## Hodnoty

  `auto`
  Výchozí hodnota. Jako by se nic nenastavilo.

  `none`
  Události vyvolané ukazatelem se neprojeví.
  
  SVG
  Pro SVG existuje [dalších 7 hodnot](http://www.w3.org/TR/SVG11/interact.html#PointerEventsProperty).

## Využití

S `pointer-events: none` se dá třeba zablokovat odkaz, tlačítko nebo [zrychlit rolování stránky](http://www.thecssninja.com/javascript/pointer-events-60fps) (i když u toho je otázka, zda by takové chování neměl zajišťovat přímo prohlížeč).