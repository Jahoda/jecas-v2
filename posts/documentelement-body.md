---
title: "Body a documentElement v JS"
headline: "Elementy <code>documentElement</code> a <code>body</code> v JavaScriptu"
description: "Co se skrývá pod <code>document.body</code> a <code>document.documentElement</code>. Jaká je podpora v prohlížečích."
date: "2014-02-10"
last_modification: "2014-02-20"
status: 1
tags: ["JavaScript", "Rady a nápady"]
---

Obě konstrukce jsou *zkratky* pro výběr elementu `&lt;body>`, respektive `&lt;html>`. Vrací totéž co příslušně použité `getElementsByTagName` metody.

## Podpora v prohlížečích

Na [diskusi](http://diskuse.jakpsatweb.cz/?action=vthread&forum=8&topic=154936) se objevilo podezření, že `document.body` nefunguje správně v **Internet Exploreru**. Není tomu tak.

  Výběr elmentu `&lt;body>` funguje pomocí `document.body` ve všech běžných prohlížečích stejně jako `document.getElementsByTagName("body")[0]`.

  Obdobně pro výběr `&lt;html>` funguje `document.documentElement` ve všech běžných prohlížečích stejně jako `document.getElementsByTagName("html")[0]`.

Nezávisle na [vykreslovacích režimech](/doctype).

  - [Ukázka ve standardním režimu](http://kod.djpw.cz/bubb)

  - [Ukázka v QUIRKu](http://kod.djpw.cz/aubb)

## Využití

Zápisy `document.body` a `document.documentElement` jsou kratší než `getElement*` metody. Jinak je celkem jedno, co se použije.