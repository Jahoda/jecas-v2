---
title: "Google zrychlil načítání na mobilech"
headline: "Google zrychlil načítání na mobilech"
description: "Jak Google zrychlil načítání stránek z výsledků hledání o 150 milisekund."
date: "2014-12-11"
last_modification: "2014-12-11"
status: 1
tags: ["SEO", "Google", "Zrychlování webu"]
---

Funkce nazvaná *reactive prefetch* (volný český překlad by mohl být *přednačítání po akci*) je podporována zatím pouze v **Chrome** na Androidu. Funguje to tak, že při **kliknutí na výsledek vyhledávání** dostane prohlížeč informaci o kritických částech stránky – například CSS, které může [blokovat vykreslování](/nacitani-css) – a začne je stahovat zároveň s obsahem stránky.

Místo standardního průběhu, kdy se čeká na **odezvu serveru** pro získání HTML stránky, které následně připojí CSS, umožní toto řešení **paralelně načítat** CSS už při kliknutí ve vyhledávání.

Celé to může fungovat díky tomu, že Google zná stránku, kterou ve výsledcích vyhledávání zobrazuje. Dokáže u ní proto odhadnout *kritické styly* a podobně.

Dobré na tom je, že se **neplýtvá daty** jako u běžných *preloaderů*, kdy se dopředu načítá obsah, který by **mohl návštěvníka zajímat**, ale ještě nevykonal konkrétní akci pro jeho získání.

## Řešení v JavaScriptu

Celé přednačtení potom spočívá ve vytvoření `&lt;link>`u:

```
&lt;link rel="**prefetch**" href="http://example.com/styl.css">
```

To v JS může vypadat následovně:

```
function reactivePrefetch(url) {
  var hint = document.createElement("link");
  hint.rel = "**prefetch**";
  hint.href = url;
  document.getElementsByTagName("head")[0].appendChild(hint);
}
```

## Odkazy jinam

  Ilya Grigorik:  
Google mobile search is getting faster - to be exact, 100-150 milliseconds faster!