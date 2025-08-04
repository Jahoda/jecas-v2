---
title: "Aktivování/deaktivování okna"
headline: "Zachycení aktivování a deaktivování okna v JS"
description: "V JavaScriptu lze relativně snadno reagovat na aktivování nebo deaktivování okna/záložky/tabu."
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Vše, co je potřeba, jsou vlastnosti `onfocus` a `onblur`.

```
window.**onfocus** = function () {
    // co se má dělat po aktivování
};

window.**onblur** = function () {
    // co se má dělat po *de*aktivování
};
```

Pokud se má něco spustit **hned po načtení**, slouží k tomu událost `onload`.

## Podpora

Funkční napříč prohlížeči.

## A k čemu je to dobré?

Jestliže se na stránce něco [JS časovačem](/odpocitavani) přes [AJAX](/ajax) **automaticky obnovuje**, může dávat smysl při deaktivování stránky (`onblur`) akci pozastavit a při aktivování (`onfocus`) ji opět pustit.
  Ovšem chce to udělat z rozmyslem. Měla-li by se při deaktivování okna například **přerušit přehrávaná hudba**, kterou chce návštěvník poslouchat na pozadí, asi ho to moc nepotěší…