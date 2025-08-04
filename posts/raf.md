---
title: "Animace requestAnimationFrame"
headline: "Animace <code>requestAnimationFrame</code>"
description: "Animování pomocí <code>requestAnimationFrame</code> umožňuje vytvářet plynulejší a méně náročné animace."
date: "2015-09-30"
last_modification: "2015-09-30"
status: 0
tags: []
---

V ideálním případě je dobré použít **animace vytvořené přímo v CSS** – pomocí `@keyframes` a vlastnosti [`animation`](/animation) či přes přechody [`transition`](/transition).

Pro animace, na které je CSS krátké nebo má nedostatečnou podporu v prohlížečích, je nutné **použít JavaScript**.

## 60 FPS

Pomyslnou hranicí, aby byla animace **krásně plynulá**, je dosažení stabilních 60 snímků za sekundu (anglicky ***f**rames **p**er **s**econd*).

Nabízí se tedy použít časovač `setTimeout`, který se 60 krát za vteřinu rekursivně zavolá další krok animace:

```
var casovac;
function animace() {
  // Kód samotné animace
  …
  // Spuštění dalšího kroku animace
  casovac = setTimeout(
    animace,
    1000 / 60
  );
}

// Spuštění animace
animace();
```

Funkce `animace` se bude volat neustále v intervalu `1000 / 60`, což je cca každých **16 milisekund** (občas interval 16 ms z tohoto důvodu vidět ve zdrojových kódech).

### Problémy časovače

Použití prostého časovače `setTimeout` trpí několika problémy:

    Interval přesně **neodpovídá frekvenci monitoru**. Pokud je frekvence jiná než 60 Hz, neodpovídá jeden krok animace úměrně stejné době zobrazení na monitoru.

    Při nižší frekvenci monitoru logicky některé snímky vypadnou. Při vyšší, která nebude násobkem, potom některé kroky animace budou na více obnoveních a některé pouze na jednom.

    Pro **dojem plynulosti** je důležitější **konsistentní počet *framů* než jejich vysoký počet**. Když se počet snímků najednou sníží z vysoké hodnoty, lidské oko to bude vnímat jako zaseknutí. Bude-li počet snímků nížší neustále, výsledný dojem bude plynulý.

    Z tohoto důvodu mají některé počítačové hry tzv. **FPS lock** (zámek počtu snímků za sekundu) nastaven na 30 snímků. Hra vypadá plynuleji při stabilních 30 FPS než při 60 FPS, které se občas propadnou na 40 FPS. Ne jinak je tomu u animací v prohlížeči…

        - IGN: [Understanding the Importance of Frame Rate](http://www.ign.com/articles/2014/11/05/understanding-frame-rate-and-its-importance)

    U **animací** typicky **není tak podstatná doba běhu**, ale hlavně je užitečné, aby byly plynulé, když je návštěvník vidí.

    Pokud je **záložka s animujícím se webem neaktivní**, je zbytečné, aby časovač běžel (dnešní prohlížeče zpravidla v takovém případě automaticky snižují četnost časovače).

    Stejně tak v režimu úspory energie návštěvník ocení úspornější animaci s nižším FPS než přesně načasovanou animaci pomocí intervalu, která mu za chvíli vycucne baterii.

## Vysvětlení `requestAnimationFrame`

Použití `requestAnimationFrame` přenese starosti ohledně intervalu spouštění animace na prohlížeč. Ten potom další krok animace spustí v okamžiku, **kdy uzná za vhodné**.

## Podpora

Požadavek na snímek animace podporuje **IE 10+**, starší verse **Chrome**, **Firefoxu** a dalších ho podporují s [prefixy](/css-prefixy). Pro starší prohlížeče je použitelný polyfill, který použije pro animování hloupější časovač `setInterval`.

Nejjednodušší řešení vypadá takto:

```
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame || 
  window.setTimeout;
```

Animování potom vypadá následovně:

```
function animace() {
  // Kód samotné animace
  …
  // Spuštění dalšího kroku animace, až bude prohlížeč chtít
  rAF(animace);
}

// Spuštění animace, až se to bude hodit
rAF(animace);
```

## Odkazy jinam

    - Paul Irish: [requestAnimationFrame for Smart Animating](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) ([rAF.js polyfill](https://gist.github.com/paulirish/1579671))

    - Paul Irish: [requestAnimationFrame API: now with sub-millisecond precision](http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision)

    - CSS-Tricks: [Using requestAnimationFrame](https://css-tricks.com/using-requestanimationframe/)