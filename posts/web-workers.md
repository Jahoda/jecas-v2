---
title: "Web Workers"
headline: "Web Workers"
description: "Web Workers je technologie, jak spustit nějaký JS kód, aniž by zdržoval reakce prohlížeče."
date: "2014-03-21"
last_modification: "2014-03-21"
status: 0
tags: []
---

Když je na stránce nějaký JavaScript, jeho vykonávání na dobou běhu skriptu **zasekne prohlížeč**. Většina skriptů je velmi rychlých, takže ty záseky jsou minimální, že je člověk skoro nepostřehne.

Pro složitější výpočty se hodí použít **Web Workers** (přeloženo do češtiny *weboví dělníci*), protože takový skript **může běžet na pozadí**, aniž by blokoval používání stránky.

## Podpora

Nejvíc chybí podpora v **IE 9** a starších. Ostatní běžně používané prohlížeče Workery podporují (**Chrome 4**, **Firefox 3.5**, **Opera 11.5** a novější).

Podpora jde otestovat následovně:

```
if (window.Worker) {
  // prohlížeč podporuje Web Workers
}
```

## Použití

Zvláštností *workeru* je, že spouští externí JS soubor.

Nejjednodušší použití tak je:

```
var w = new Worker("skript.js");
```

## Předávání informací

Většinou nestačí pouhé spuštění skriptu, ale je také potřeba **předávat informace** mezi stránkou a *dělníkem* (`script.js`).

### Z workeru na stránku

Ve skriptu dělníka k tomu slouží metoda `postMessage`:

```
postMessage("Zpráva z workeru");
```

Ta se potom *poslouchá* na stránce přes `onmessage`:

```
w.onmessage = function(event) {
  alert("Zpráva z workeru: " + event.data);
};
```

### Ze stránky do workeru

Druhým směrem je to velmi podobné. Obsah skriptu ve stránce:

```
w.postMessage("Zpráva pro dělníka");
```

*Dělník* zprávu zjistí rovněž pomocí `onmessage`:

```
onmessage = function(event) {
  console.log('Zpráva ze stránky: ' + event.data);
}
```

## Ukončení `terminate()`

Pokud je podezření, že dělník pracuje už dlouho, může být užitečné ho ukončit, slouží k tomu metoda `terminate`:

```
w.terminate();
```

Nabízí se kód pro ukončení vytvořit pomocí časovače při spuštění dělníka:

```
var w = new Worker("skript.js");
var casovac = setTimeout(function() {
  w.terminate();
}, 5 * 1000);
```

Výše uvedený kód ukončí worker po 5000 milisekundách běhu.

    - [Spuštění zacykleného JS pomocí WebWorkers](https://github.com/Jahoda/web-worker) – příklad použití pro spuštění zacykleného kódu bez zablokování prohlížeče

## Odkazy jinam

  - HMTL5rocks: [The Basics of Web Workers](http://www.html5rocks.com/en/tutorials/workers/basics/)

  - MDN: [Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

  - W3 Schools: [HTML5 Web Workers](http://www.w3schools.com/html/html5_webworkers.asp)