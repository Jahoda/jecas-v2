---
title: "Beacon API"
headline: "Beacon API"
description: "Beacon API umožňuje asynchronně zaslat data na server při opuštění stránky."
date: "2014-12-03"
last_modification: "2014-12-09"
status: 1
tags: ["JavaScript", "Hotová řešení", "Rady a nápady"]
---

```
window.addEventListener('unload', function() {
  navigator.sendBeacon(**url**, *data*);
});
```

## Podpora v prohlížečích

  - **Chrome 39**

  - **Firefox 31**

  - **Opera 26**

## Využití

V některých případech je potřeba **poslat na server** nějaká data před opuštěním stránky, typicky:

    Uložení [rozepsaných dat](/zalohovani-formularu) na server k uživatelskému profilu.

    Skripty pro **monitorování návštěvnosti** / **chování na webu** potřebují požadavek před opuštěním k zaznamenání **určením konce návštěvy**.

Situace před **Beacon API** nabízela cca 3 způsoby řešení.

    Data průběžně posílat na základě [časovače](/odpocitavani). To zvýší počet požadavků a není jisté, že se odešle **aktuální stav**.

    Odeslat data asynchronně [AJAXem](/ajax) před opuštěním stránky (událost `unload`). Prohlížeče ale často takový obsah **nestihnou odeslat**.

    Odeslat data **synchronně** (zajistí to třetí parametr u metody `open` u  `XMLHttpRequest`u nastavený na `false`):

    ```
var xhr = new XMLHttpRequest();
xhr.open('GET', '/ulozit.php?data=něco', **false**);
xhr.send(null);
```

    Nevýhoda je v tom, že na tento požadavek bude **prohlížeč čekat**.

## Ukázka použití

**Beacon API** tedy umožní **spolehlivě uložit** potřebný obsah bez **blokování** opuštění stránky (`unload`).

Metoda `navigator.sendBeacon` má dva parametry – adresu skriptu a data. Data je také možné pochopitelně přidat na přímo do URL. Požadavek na ukládací skript se přes `sendBeacon` **odesílá metodou POST**.

```
function log() {
  navigator.sendBeacon(
    "ulozit.php", 
    JSON.stringify(
      {
        'prvni': 'hodnota',
        'druha': 'jiná hodnota'
      }
    )
  );
}
```

Tuto funkci `log` je potom vhodné použít **před opuštěním stránky** (`onload`).

```
window.addEventListener('unload', log);
```

Ale nic nebrání jejímu použití při kliknutí na tlačítko – zkrátka u akcí, kde **nepotřebujeme odpověď**.

```
&lt;button onclick="log()">
  Tlačítko
&lt;/button>
```

### Zpracování dat v PHP

Dostat se k datům odeslaných výše uvedenou JS funkcí `log` a připsat je do souboru může v PHP vypadat následovně:

```
$payload = file_get_contents('[php://input](http://php.net/manual/en/wrappers.php.php#wrappers.php.input)');
$data = json_decode($payload, true);
file_put_contents(
  "data.txt", 
  date('H:i:s') . ": " . $data['prvni'] . $data['druha'] . "\n", 
  FILE_APPEND
);
```

    - [Celé řešení na GitHubu](https://github.com/Jahoda/sendBeacon)

## Použití v Google Analytics

V nástroji pro měření návštěvností – [Google Analytics](/ga) je možné předat parametr [`useBeacon`](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#useBeacon), který v podporovaných prohlížečích použije Beacon API.

```
ga('send', 'event', 
  'click', 
  'download-me', 
  **{useBeacon: true}**
);
```

Zaslání požadavku do GA před opuštěním stránky jde potom docílit zkombinováním `useBeacon` s událostí `unload`.

```
window.addEventListener('unload', function() {
  ga('send', 'event', 
    'Unload', 
    location.pathname,  
    {useBeacon: true}
  );
});
```

## Odkazy jinam

  - [Zabránění zavření stránky událostí `onbeforeunload`](/onbeforeunload)

  - W3C: [Beacon API](https://w3c.github.io/beacon/)

  - MDN: [navigator.sendBeacon()](https://developer.mozilla.org/en-US/docs/Web/API/navigator.sendBeacon)