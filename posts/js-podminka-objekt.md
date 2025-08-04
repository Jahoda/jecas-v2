---
title: "JS podmínka v objektu"
headline: "JS podmínka v objektu"
description: "Jak v JavaScriptu zapsat podmínku uvnitř objektu."
date: "2023-01-05"
last_modification: "2023-01-06"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Například při posílání požadavků na API se přidávají různé parametry. Třeba u [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to může být metoda, kterou se má požadavek odeslat:

```
fetch(url, {
  method: 'POST'
})
```

Jak ale metodu nastavovat na `POST` jen při splnění podmínky?

Užitečný je pro tento případ tzv. [spread operátor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) – `...` (hodí se i pro [klonování objektů](/js-klonovani-objektu#spread)).

Jedna možnost je použít ternární operátor `?`:

```
fetch(url, {
  ...(podminka ? { method: 'POST' } : [])
})
```

A nechat pomocí *spread* operátoru *rozbalit* třeba prázdné pole, prázdný objekt, `null` nebo třeba nějaké číslo.

Nebo rovnou celý zápis zkrátit na:

```
fetch(url, {
  ...(podminka &amp;&amp; { method: 'POST' })
})
```

Díky tomu se vlastnost `method` vůbec nedostane do výsledného objektu.