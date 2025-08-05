---
title: "Patička vždy dole"
headline: "Patička vždy dole"
description: "Jak vytvořit patičku, která bude vždy <i>přilepená</i> k dolnímu okraji."
date: "2013-10-27"
last_modification: "2013-10-27"
status: 0
tags: []
format: "html"
---

<p>Je-li nějaká ze stránek na webu trochu kratší (má méně obsahu), může působit rušivě, že <b>patička nebude úplně vespod</b>, protože krátký obsah ji neodsune. Možná řešení jsou různá.</p>

<h2 id="fixni-vyska">Fixní výška</h2>
<p>Pokud můžeme nastavit patičce nějakou výšku, stačí elementy <code>&lt;html&gt;</code> a <code>&lt;body&gt;</code> roztáhnout na 100 % (<code>min-height: 100%</code>), dolním <code>padding</code>em o výšce patičky si vytvořit prostor. A samotnou patičku do vzniknuvšího prostoru <a href="/position#absolute">absolutně naposicovat</a>.</p>

<h2 id="promenliva-vyska">Proměnlivá výška</h2>
<p>V případě proměnlivé výšky lze od <b>IE 8</b> použít <code>table-*</code> hodnoty pro vlastnost <code>display</code>.</p>

http://kod.djpw.cz/wtc