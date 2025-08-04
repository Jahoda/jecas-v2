---
title: "Rel=noopener"
headline: "Rel=noopener"
description: "Atribut <code>noopener</code> dokáže zabránit manipulaci ze stránky otevřené do nového okna."
date: "2016-03-17"
last_modification: "2016-05-16"
status: 1
tags: ["HTML", "Bezpečnost", "HTML atributy", "Odkazy"]
---

HTML [odkazy](/odkaz) obsahující otevření do nového okna pomocí `target="_blank"` s sebou nesou jisté bezpečnostní risiko.

Stránka, která byla do nového okna otevřena, **může manipulovat s adresou stránky**, která ji otevřela.

Po návratu z následující stránky otevřené do nového okna se to této stránky přidá `#hash` do URL:

  [Odkaz na testovací stránku](http://kod.djpw.cz/mxxb-)

Vše zajistí jednoduchý JS kód:

```
opener.location = 'http://jecas.cz/noopener#hash';
```

    Povedlo se změnit URL.

#hash {display: none}
#hash:target {display: block}

## Zneužití

Zneužít toto chování jde třeba pro phishing, kdy bude uživatel přesměrován na podvodnou stránkou za cílem získat hesla.

Využít změnu adresy se může hodit i pro zobrazení reklamy při kliknutí na odkaz.

## Jen `target=_blank`?

Problém se netýká jen odkazů otevíraných automaticky do nového okna díky atributu `target`. Změna `opener.location` se projeví i v případě, že si nové okno otevře uživatel sám.

## Řešení

V podporovaných prohlížečích (**Chrome 49+**, **Opera 36+**) by mělo jít zakázat změnu adresy pomocí atributu `rel` a hodnoty `noopener`:

```
&lt;a href="http://example.com" rel="noopener">
```

Test:

  [Odkaz na testovací stránku](http://kod.djpw.cz/oxxb-)

    Povedlo se změnit URL.

#hash-noopener {display: none}
#hash-noopener:target {display: block}

Podle mých testů ale blokování nefunguje ani v **Chrome 50** a `hash` se změní.

## Odkazy jinam

  - [Target=”_blank” — the most underestimated vulnerability ever](https://medium.com/@jitbit/target-blank-the-most-underestimated-vulnerability-ever-96e328301f4c#.25ll0gfzh)

  About rel=noopener
What problems does it solve?
  - Specifikace: [Link type "`noopener`"](https://html.spec.whatwg.org/multipage/semantics.html#link-type-noopener)