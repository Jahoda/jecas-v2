---
title: "Flat UI"
headline: "Flat UI framework"
description: "Flat UI nabízí hotové uživatelské rozhraní založené na Bootstrapu, má smysl jej používat?"
date: "2013-08-02"
last_modification: "2013-08-03"
status: 1
tags: ["Frameworky"]
---

[Webová stránka nástroje Flat UI](http://designmodo.github.io/Flat-UI/)

Pokud chceme rychle s minimem námahy docílit ne úplně fádního vzhledu stránky, mohou být hotová CSS dobrá volba.

Flat UI používá Bootstrap (a hromadu dalších knihoven založených na jQuery) a tvoří tak relativně zajímavé prvky pro uživatelské rozhraní.

*Flat* v názvu asi značí grafický styl prostý různých stínů, přechodů nebo rámečků.

## Nevýhody

### Podpora

Není funkční ani v Internet Exploreru 9, není funkční bez JavaScriptu. Hlavně u těch přepínačů (`radio`/`checkbox`) je to nepochopitelné, když by to [krásně šlo](/stylovani-checked) i v čistém CSS s lepší funkčností napříč prohlížeči.

### Použitelnost

Celé se to dost špatně ovládá klávesnicí, k některým prvkům ukázky se nelze doTabovat, natož je přepnout. Prvkům chybí výraznější `focus`.

### Rychlost

V základní podobě Flat UI dost plýtvá HTTP spojeními. Načítat 14 JS souborů je šílenost. Před skutečným použitím by se musely skripty spojit.

## Závěr

Použití Flat UI vidím v rychlém prototypování, ale pro reálné použití je lepší vytvořit místo toho něco funkčního.