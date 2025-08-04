---
title: "Onclick z klávesnice"
headline: "Událost <code>onclick</code> na různých elementech"
description: "Test události <code>onclick</code> na různých elementech při vyvolání myší i klávesnicí."
date: "2013-10-17"
last_modification: "2013-10-17"
status: 1
tags: ["JavaScript", "Formuláře", "Prohlížeče"]
---

Při začleňování nějaké JS události vyvolávané kliknutím (`onclick`) je třeba brát v úvahu, že uživatel **navigující se klávesnicí** (což například u **formulářů** nemusí být marginální procento) některé `onclick`y běžně nevyvolá nebo je **dokonce vůbec vyvolat nemůže**.

    `&lt;span&gt;` s `tabindex`em, 
    `&lt;span&gt;` **bez** `tabindex`u, 
    [odkaz `&lt;a&gt;` **bez** `tabindex`u](#).

`&lt;input&gt;`
`&lt;input type=checkbox&gt;`
`&lt;input type=submit&gt;`
`&lt;input type=radio&gt;`
`&lt;input type=button&gt;`
  - `&lt;input type=image&gt;`

`&lt;select onclick&gt;` s `tabindex`em + `&lt;option onclick&gt;`

— volba —
2
3

`&lt;option onclick&gt;`

— volba —
2
3

`&lt;textarea onclick&gt;`

`&lt;textarea onclick&gt;`
Button

`&lt;img tabindex&gt;`

- `&lt;form onclick&gt;`

## Poznámky

  - Při **přechodu mezi políčky** klávesou Tab se `onclick` nevyvolá. Při *skočení* do políčka se ale vyvolá `onfocus`.

  - Běžné (neformulářové) elementy jde roz`onclick`ovat přidáním `tabindex`u.

  **Opera** umí vyvolat `onclick` z klávesnice snad úplně na čemkoliv mimo elementů, **kam se píše text** (`&lt;input type=text>`, `&lt;textarea>`) nebo `&lt;select&gt;`u. (Při procházení `Tab`em (když je element o`tabindex`ovaný) i přes `Shift`.) Dokonce ten `onclick` vyvolá na `&lt;option&gt;`u, i když se jen vybere šipkami ze `&lt;select&gt;`u (bez nějakého výběru z roletového seznamu).
    **IE v [quirku](/doctype#quirk)** to umí snad na všem, čemu se přidá `tabindex`. A na většině `&lt;input&gt;`ů (snad mimo `radio` a `checkbox`). Na `&lt;select&gt;`u ne.
  - **Explorer ve standardním režimu** navíc `onclick`uje i na `&lt;input type=text&gt;`.

      **Firefox a Chrome** se chovají víceméně podobně. `Onclick`ují na odesílacích prvcích (`&lt;input type=image|submit|button&gt;`, `&lt;button&gt;`) a odkazech.

- **Chrome** nekliká na `&lt;option>`ech.