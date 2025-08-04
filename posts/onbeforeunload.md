---
title: "Upozornění před opuštěním stránky"
headline: "Upozornění před zavřením stránky"
description: "Javascriptová událost <code>onbeforeunload</code> umožňuje pozastavit uzavření/obnovení stránky."
date: "2013-10-09"
last_modification: "2015-07-02"
status: 1
tags: ["JavaScript", "Rady a nápady", "JS události"]
---

Pokud je na webové stránce nějaké složitější aplikační nastavení nebo jen rozepsaný formulář, může být kromě [průběžného zálohování](/zalohovani-formularu) vhodné **nechat případné uzavření potvrdit**.

Kromě ušlechtilých myšlenek, kdy `onbeforeunload` *zachrání* uživatele před nechtěným uzavřením prohlížeče nebo **obnovením stránky**, je taktéž možné návštěvníka zablokováním **naštvat**, což se nezřídka děje na všelijakých pochybných stránkách — **třeba zrovna na této**. :–)

Událost `onbeforeunload` (*před-od-načtením*) funguje ve všech prohlížečích kromě staré **Opery 12** a některých mobilních prohlížečů, někdy jde použít alespoň `window.onunload`.

## Použití

```
window.onbeforeunload = function() {
  return "Zpráva před odchodem";
}
```

Tento kód zablokuje obnovení nebo zavření stránky a v **IE** a **Chromu** vypíše *„Zpráva před odchodem“*, ve Firefoxu by šlo použít třeba `alert`.

Kromě zablokování zavření nebo obnovení a vypsání zprávy je možné provést i nejrůznější jiné akce jako třeba již zmíněné **uložení rozepsaného formuláře** do lokálního úložiště, **odeslání rozepsaného formuláře**, **přesměrování** na nějakou jinou stránku a další.

## Zobrazení nabídky před opuštěním

U webů, které něco prodávají nebo nabízejí, jde okamžik před **opuštěním/zavřením webu** využít k poslední šanci, jak ještě návštěvníka **přemluvit k nákupu**, **získat na něj kontakt** a podobně.

    MaxTraffic Blog: [13 Simple and Surprisingly Effective Exit Pop-up Examples](http://maxtraffic.com/blog/13-simple-and-surprisingly-effective-exit-pop-up-examples/)

    — co umístit do zprávy před opuštěním stránky

window.onbeforeunload = function() {
  return "Zpráva před odchodem (onbeforeunload)";
}

window.onunload = function() {
  alert("Zpráva před odchodem (onunload)");
}