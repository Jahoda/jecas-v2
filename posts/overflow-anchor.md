---
title: "Zachování posice scrollování overflow-anchor"
headline: "Zachování posice scrollování <code>overflow-anchor</code>"
description: "CSS vlastnost <code>overflow-anchor</code> umožňuje nastavit, jak si má prohlížeč pamatovat, kam bylo odscrollováno."
date: "2019-03-29"
last_modification: "2019-03-29"
status: 1
tags: ["CSS", "CSS vlastnosti", "Scrollování"]
---

Poměrně dlouhou dobu prohlížeče neřešily situace, kdy se na stránce stane *něco* takového, co způsobí **odrolování někam pryč**.

Typicky po následujících případech:

    U (především) mobilních zařízení se **změní orientace z výšky na šířku** nebo obráceně.

    Před obsahem se donačte nějaký prvek se zprvu **neznámými rozměry** a stránka poskočí. Například video, obrázek nebo reklama.

Návštěvník si tak prochází webem, stane se nějaká z výše uvedených věcí, a je ztracen, protože je ve *viewportu stránky* (aktuálně viditelné oblasti) úplně něco jiného, než tam bylo předtím.

Druhý případ s obsahem o neznámých rozměrech si povětšinou zkušený tvůrce webů dokáže ohlídat:

    - [Poskakování stránky](/poskakovani) – proč vadí a jak se ho zbavit

Řešit změnu orientace ale už nejde bez nějakého relativně komplikovaného počítání a [scrollování](/odrolovani) v JavaScriptu.

Naštěstí oba případy začaly **automaticky řešit přímo prohlížeče**. A prohlížeče **Chrome 56+** (leden 2017) a **Firefox 66+** (březen 2019) dokáží toto chování ovlivňovat CSS vlastností.

## CSS vlastnost `overflow-anchor`

Právě vlastnost `overflow-anchror` zapíná/vypíná toto *chytré* zapamatování odrolování. A nastavuje se pro elementy s posuvníkem (tedy pro celou stránku nebo pro něco s `overflow: auto` / `overflow: scroll`).

Kromě globálních hodnot `inherit`, `initial` a `unset` existují 2 specifické hodnoty:

    `overflow-anchor: auto`

    Prohlížeč se sám snaží chovat *chytře* (výchozí chování).

    `overflow-anchor: none`

    Zakáže automatické pokusy prohlížeče o lepší uživatelský zážitek. Hodí se jako pojistka u elementů, kde je nějaké vlastní JavaScriptové scrollování, pokud výchozí chování způsobuje problémy.

## Odkazy jinam

  MDN: overflow-anchor

  - Mozilla Hacks: [Scroll Anchoring in Firefox 66](https://hacks.mozilla.org/2019/03/scroll-anchoring-in-firefox-66/)