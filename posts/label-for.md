---
title: "Tag <label> a atribut for"
headline: "Značka <code>&lt;label></code> a atribut <code>for</code>"
description: "Značka <code>&lt;label></code> slouží ke <i>svázání</i> popisku s formulářovým prvkem. Kdy použít atribut <code>for</code>?"
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["HTML", "HTML značky", "Formuláře"]
---

Formulář se potom lépe ovládá, třeba v případě `checkbox`u je výrazným rozdíl v trefování se do malého čtverečku nebo do čtverečku s jeho popisem.

   Text bez `&lt;label>`u
   Text s `&lt;label for='ID &lt;input>u'>`

## Co `&lt;input>` v `&lt;label>`u?

Vyhnout se atributu `for` lze umístěním `&lt;input>`u do `&lt;label>`u.
```
&lt;label>&lt;input type=checkbox> Popisek&lt;/label>
```

Problém ale je, že takový kód se v **Internet Exploreru 6** (a starších) bude chovat jako bez `&lt;label>`u.
A přichází dilema, zda se na tento často okrajový prohlížeč vykašlat, nebo naopak i kvůli pár jeho uživatelům provést triviální úpravu…
```
&lt;label for=**a**>&lt;input type=checkbox id=**a**> Popisek&lt;/label>
```