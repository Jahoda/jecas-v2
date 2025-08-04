---
title: "Svelte animace a přechody"
headline: "Svelte animace a přechody"
description: "Jak snadno ve Svelte cokoliv na stránce plynule animovat."
date: "2023-05-07"
last_modification: "2023-05-07"
status: 0
tags: []
---

JS knihovna pro snadnou tvorbu reaktivního frontendu – [Svelte](https://svelte.dev) – má přímo v sobě zabudované nástroje pro plynulé visuální přechody a animace.

Není potřeba nic dalšího instalovat, většinu běžné používaných přechodů má Svelte v sobě.

Nejjednodušší použití vypadá následovně:

```
&lt;div transition:slide>
```

    Atribut `transition` značí, že se jedná přechod. Místo něj jde použít `in` a `out`, pokud mají být oba *směry* přechodu rozdílné.

    Za dvojtečkou následuje funkce, která se stará o samotnou animaci. Ta může být i vlastní, ale typicky se importuje ze Svelte, kde je spoustu animací už hotových:

    ```
import { slide } from 'svelte/transition'
```

    Přechodové funkci jde předat případně nějaké parametry. Třeba dobu animování:

    ```
&lt;div transition:slide={{ duration: 300 }}>
```

[Živá ukázka](https://svelte.dev/repl/7ef3298c5782442296704f3b78008bb8?version=3.59.0)