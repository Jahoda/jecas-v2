---
title: "Patička vždy dole"
headline: "Patička vždy dole"
description: "Jak vytvořit patičku, která bude vždy <i>přilepená</i> k dolnímu okraji."
date: "2013-10-27"
last_modification: "2013-10-27"
status: 0
tags: []
---

Je-li nějaká ze stránek na webu trochu kratší (má méně obsahu), může působit rušivě, že **patička nebude úplně vespod**, protože krátký obsah ji neodsune. Možná řešení jsou různá.

## Fixní výška

Pokud můžeme nastavit patičce nějakou výšku, stačí elementy `&lt;html&gt;` a `&lt;body&gt;` roztáhnout na 100 % (`min-height: 100%`), dolním `padding`em o výšce patičky si vytvořit prostor. A samotnou patičku do vzniknuvšího prostoru [absolutně naposicovat](/position#absolute).

## Proměnlivá výška

V případě proměnlivé výšky lze od **IE 8** použít `table-*` hodnoty pro vlastnost `display`.

http://kod.djpw.cz/wtc