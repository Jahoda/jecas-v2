---
title: "Napodívání přes <datalist>"
headline: "Našeptávání značkou <code>&lt;datalist&gt;</code>"
description: "Pro napovídání možností při vyplňování <code>&lt;input&gt;</code>u lze v HTML 5 použít značku <code>&lt;datalist&gt;</code>."
date: "2013-11-05"
last_modification: "2013-11-10"
status: 1
tags: ["HTML", "HTML značky", "Formuláře"]
---

Pro zpříjemnění vyplňování **políček formulářů** je vhodné při psaní **napovídat možné hodnoty**. Od **IE 10** existuje možnost jak napovídání řešit bez JavaScriptu.

Nejspíš kvůli zpětné kompatibilitě se veškerý obsah `&lt;datalist&gt;`u zapisuje do atributů `value` značek `&lt;option&gt;` (jinak by se obsah k napovídání umístěný do [neznámých HTML značek](/vlastni-html-znacky) v nepodporovaných prohlížečích objevil).

## Připojení `&lt;datalist>`u

Připojit **data pro napovídání** je možné nejspíš jen pro `&lt;input type="text">`, pro `type="number"` a **napovídání čísel** to nefunguje. **Samotné propojení** `&lt;input>`u s `&lt;datalist>`em se provádí pojmenováním `&lt;datalist>`u atributem `id` a přiřazením názvu `id` do atributu `list` u `&lt;input>`u.

  Text 

  Číslo `number` 

  Číslo `text` 

## Závislé `datalist`y

[Samostatná živá ukázka](http://kod.djpw.cz/pmeb)

## Napovídání napříč prohlížeči

Jak už bylo zmíněno, v **IE 9 a starších** to nefunguje vůbec, v podporovaných prohlížečích se chování různí.

  - **IE 10** a **Opera** zobrazí `&lt;datalist>` po kliknutí do políčka, **Chrome** a **Firefox** až **po dvojkliku**.

  - **Firefox** umí možnosti filtrovat jako **skutečný vyhledávač** (položku „Nějaký t**ex**t“ nabídne i při napsání `ex`), ostatní prohlížeče filtrují jen podle písmen na začátku.

Zdá se tedy být vhodnější stále **napovídání řešit JavaScriptem**. Třeba nástrojem [Select2](/vzhled-formularu#js).