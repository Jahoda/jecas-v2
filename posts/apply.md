---
title: "CSS mixiny pomocí @apply"
headline: "CSS mixiny pomocí <code>@apply</code>"
description: "Pomocí pravidla <code>@apply</code> jde v CSS vytvářet vlastní mixiny."
date: "2016-04-19"
last_modification: "2016-06-04"
status: 1
tags: ["CSS", "CSS funkce"]
---

Tzv. **CSS preprocesory** nabízí jako jednu z výhod oproti čistému CSS *mixiny*. Jedná se o znovupoužitelné kusy CSS pravidel, které jde přiřazovat požadovaným selektorům.

Změny jde potom provádět na jednom místě a kód se nemusí opakovat.

## Zápis

Nejprve je potřeba mixin deklarovat:

```
:root {
  --velky-cerveny: {
    color: red;
    font-size: 200%;
  }
}
```

Následně se zmíněná pravidla aplikují na kýžený selektor takto:

```
h1 {
  @apply --velky-cerveny
}
```

## Podpora

Pravidlo `@apply` nemá v roce 2016 rozumnou podporu v prohlížečích.

    Chrome Platform Status: CSS @apply Rule
 (Behind a flag in desktop Chrome 51)

Při používání PostCSS je ale možné použít plugin, kterou syntaxi s `@apply` převede do kompatibilní podoby:

    - [postcss-apply](https://github.com/pascalduez/postcss-apply)

## Odkazy jinam

  - Specifikace: [CSS @apply Rule](http://tabatkins.github.io/specs/css-apply-rule/)

  - [CSS @apply rule (native CSS mixins) ](https://blog.gospodarets.com/css_apply_rule)

  - [CSS from the Future](http://zeke.sikelianos.com/css-from-the-future/)