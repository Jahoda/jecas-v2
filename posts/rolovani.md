---
title: "Rychlejší efekty při rolování"
headline: "Rychlejší efekty při rolování"
description: "Jak zajistit, aby efekty reagující na rolování po stránce byly co nejplynulejší."
date: "2014-11-12"
last_modification: "2014-11-12"
status: 0
tags: []
---

Nepoužívat událost `window.scroll`, ale časovou smyčku, která otestuje, zda došlo k posunu. Pokud k posunu nedojde (na základě `window.pageYOffset`), nebude se nic dělat.

Smyčku zajistí [`requestAnimationFrame`](/requestanimationframe) nebo fallback přes `setTimeout` pro starší prohlížeče.

Rolování je jedna z **nejčastějších náročných akcí**, které uživatel na stránce vykoná. Prohlížeč se po rozebrání [DOMu](/dom) snaží určit, které části budou při rolování vypadat stále stejně. Z nich potom vytvoří *obrázek* (vrstvu). Těchto vrstev může být na stránce více a různě se seskupovat. Když se potom na stránce při rolování něco změní, prohlížeč překreslí jen danou část.

V ideálním případě toho prohlížeč při rolování **překresluje co nejméně**, což má positivní efekt na plynulost rolování.

Momentálně je to značný problém *parallax* efektů, kdy se při rolování s něčím hýbe.

## Přehled ve vývojářských nástrojích

Ve [vývojářských nástrojích](/vyvojarske-nastroje) Chrome je na kartě *Timeline* možné pozorovat právě překreslování stránky. Nástroj umí i napsat rozměry překreslované oblasti a po **najetí myší** ji zvýraznit na stránce.

Rozhodně je dobré si tuto kartu při testování webu otevřít a operace, co sníží počet snímků za sekundu pod 60 snímků (60 fps), prozkoumat.

## Příklad

```
var raf = window.requestAnimationFrame || 
  window.mozRequestAnimationFrame  ||
  window.webkitRequestAnimationFrame  ||
  setTimeout;

var menu = document.getElementById('fixed-menu');
var coords = menu.getBoundingClientRect();
window.onscroll = function() {

raf(function() {
odrolovano = document.documentElement.scrollTop + document.body.scrollTop;

document.title = coords.top + " --- " + odrolovano;
document.body.className = (
odrolovano > coords.top
) ? "body-fixed-menu" : "";
});
}
```

## Odkazy jinam

  - [How to make faster scroll effects?](https://gist.github.com/Warry/4254579)

  - HTML5 Rocks: [Leaner, Meaner, Faster Animations with requestAnimationFrame](http://www.html5rocks.com/en/tutorials/speed/animations/)

  - HTML5 Rocks: [Scrolling Performance](http://www.html5rocks.com/en/tutorials/speed/scrolling/)

  - HTML5 Rocks: [Jank Busting for Better Rendering Performance](http://www.html5rocks.com/en/tutorials/speed/rendering/)

  - HTML5 Rocks: [High Performance Animations](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)

  - [requestAnimationFrame API: now with sub-millisecond precision](http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision)

  - [Learning from Twitter](http://ejohn.org/blog/learning-from-twitter/)

  - [Jank Free: Let's Make the Web Silky Smooth!](http://jankfree.org/)

  - [Explainer](https://github.com/w3c/frame-timing/wiki/Explainer) – měření FPS na stránce

  - [Everybody Scrolls.](http://hugeinc.com/ideas/perspective/everybody-scrolls)

  - [Auto-Hide Sticky Header](http://osvaldas.info/auto-hide-sticky-header)