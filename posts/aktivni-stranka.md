---
title: "Je stránka aktivní?"
headline: "Je stránka aktivní?"
description: "Zjišťování, jestli je stránka aktivní a zda návštěvník něco dělá."
date: "2014-01-19"
last_modification: "2014-04-05"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Na stránce, kde funguje [AJAXové](/ajax) **automatické načítání obsahu** (typicky kontrola, zda něco nového nepřibylo) může být užitečné zjišťovat, zda je **stránka aktivní** nebo ne.

A podle toho následně upravovat **frekvenci kontrol** nového obsahu; při evidování **online statusu** považovat uživatele za *nečinného* a podobně.

## Hotové řešení

  - [Ifvisible.js](http://serkanyersen.github.io/ifvisible.js/) — hotový nástroj pro testování „nečinnosti“ / aktivované stránky

Na nejnižší úrovni jde [aktivování/deaktivování](/aktivovani-okna) detekovat na základě JS událostí `blur` a `focus`.