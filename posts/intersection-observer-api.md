---
title: "Intersection Observer API"
headline: "Intersection Observer API"
description: "Jak dělat lazy-loading prvků na stránce moderním způsobem s využitím Intersection Observer API."
date: "2017-09-11"
last_modification: "2017-09-11"
status: 0
tags: []
---

Pro snížení množství stahovaného obsahu a zrychlení webu bývá výhodné používat **lazy-loading** – načítat obsah (zejméně externí jako jsou obrázky, videa apod.) až v momentě, když je potřeba.

Typicky až v momentě, když se k danému prvku **odroluje**.

## Historický přístup `getBoundingClientRect`

V JavaScriptu existuje metoda `getBoundingClientRect`, která dokáže vrátit pro libovolný element jeho umístění vůči **viewportu**.

```
var element = document.querySelector('.neco');
var rect = element.getBoundingClientRect();
```

Do proměnné `rect` se dostane následující objekt (hodnoty jsou pouze příklad):

```
▼ ClientRect
  bottom: -376
  height: 36
  left: 8
  right: 927
  top: -412
  width: 919
```

Z toho je následně možné při odrolování (událost `onscroll`) zjistit, jestli se element [nachází ve viewportu](/zjisteni-rozmeru#viewport).

## Použití `IntersectionObserver`

S využitím *Intersection Observer API* se jde vyhnout nutnosti zjišťovat umístění v `onscroll` události.

    - [Test Intersection Observer API](http://kod.djpw.cz/qjkc-) – živá ukázka nejjednoduššího použití

## Podpora

Podporovány jsou aktuální verse prohlížečů (**Chrome 51**, **Edge 15**, **Firefox 55**).

Pro ostatní prohlížeče jde použít polyfill, který využívá právě `getBoundingClientRect`.

    - [Intersection Observer Polyfill](https://github.com/jeremenichelli/intersection-observer-polyfill)

## Využití

Intersection Observer API se hodí ke všem případům, kde je na stránce nějak potřeba reagovat na její odscrollovanou. Tedy k věcem jako je:

  - stále viditelná hlavička nebo menu nemizející při odrolování,

  - [lazy loading](/lazy-loading) [obrázků](/lazy-loading-obrazky) a jiných externích prvků stránky (např. hotové řešení [lozad.js](https://github.com/ApoorvSaxena/lozad.js) nebo [lazyload](https://github.com/verlok/lazyload)),

  - zvýraznění aktivní části stránky v [*table of contents*,](/toc)

  - visuální efekty během rolování apod.

## Odkazy jinam

  - MDN: [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

  - Mozilla Hacks: [Intersection Observer comes to Firefox](https://hacks.mozilla.org/2017/08/intersection-observer-comes-to-firefox/) ([živá ukázka](https://codepen.io/callahad/pen/YxXpyN))

  - [Infinite Scrolling with IntersectionObserver API](https://codepen.io/mgiulio/pen/VjrYzZ) – nekonečné scrollování