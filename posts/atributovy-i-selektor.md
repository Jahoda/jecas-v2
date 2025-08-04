---
title: "Atributový case-insensitive selektor"
headline: "Atributový case-insensitive selektor"
description: "Pomocí příznaku <code>i</code> jde zapsat atributový selektor nezávislý na velikosti písmen."
date: "2016-03-17"
last_modification: "2016-03-19"
status: 1
tags: ["CSS", "CSS selektory"]
---

Při stylování HTML pomocí CSS musí odpovídat velikosti písmen v HTML atributu a CSS selektoru.

Element `&lt;div class="trida">` jde zaměřit selektorem `.trida`, ale už ne třeba přes `.TRIDA`. Toto chování jde v případě [atributového selektoru](/css-selektory#atributovy) změnit:

```
div[class="TrIdA" **i**] {
  /* styly */
}
```

Výše uvedené styly se v podporovaných prohlížečích aplikují na `&lt;div class="trida">`, `&lt;div class="TRIDA">` a podobně.

[Živá ukázka](http://kod.djpw.cz/nmvb)

## Podpora v prohlížečích

Příznak `i` začaly podporovat prohlížeče **Chrome 49** a **Opera 36**.

### Zpětná kompatibilita

V nepodporovaných prohlížečích se tato konstrukce chová jako syntaktická chyba a celá deklarace se zahodí. Vše se zahodí i v případě, že se k selektoru napíše něco podporovaného:

```
div[class="TRIda" i],
.trida {
    color: red;
}
```

Ani v tomto případě nebude mít `&lt;div class="trida">` červenou barvu.

## Využití

Na první pohled se nezávislost na velikosti písmen u atributového selektoru zdá jako poměrně nepotřebná věc. Těžko najít důvod proč by dodržování jednotné velikosti písmen bylo problematické.

V případě jednoduchého [vyhledávání/filtrování dat v CSS](/css-vyhledavani), kdy jsou klíčová slova v `data-*` atributu a filtruje se pomocí CSS selektoru, může ale příznak `i` usnadnit trochu práce:

```
[data-slova*="fytopuf" i]
```

Výše uvedený selektor zaměří element:

```
&lt;span data-slova="Fytopuf je nejlepší">
```

A stejně tak i:

```
&lt;span data-slova="Kupte si fytopuf">
```

### Hack

Druhá možnost je [hackování](/hacky) chování prohlížečů. K selektoru s `i` jde uvést pravidla, která budou nepodporované prohlížeče ignorovat.