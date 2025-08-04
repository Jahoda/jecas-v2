---
title: "Předchozí/další element v JavaScriptu"
headline: "Předchozí/další element v JavaScriptu"
description: "Získání následujícího nebo předchozího sourozence pomocí <code>nextSibling</code> a <code>previousSibling</code>."
date: "2015-03-15"
last_modification: "2015-05-24"
status: 1
tags: ["JavaScript", "Rady a nápady"]
---

## Následující sourozenec `nextSibling`

Při vyhledávání elementů pomocí JavaScriptu slouží `nextSibling` pro získání **následujícího sourozence**.

Problém je, že jako následující sourozenec je brán kromě HTML elementů i textový obsah.

Bude-li existovat násludjící kód:

```
&lt;div class="prvni">1&lt;/div>
&lt;div class="druhy">2&lt;/div>
```

JavaScriptová konstrukce využívající `nexSibling` nezachytí element `.druhy`:

```
document.querySelector(".prvni").**nextSibling**;
```

V tomto případě budou zachyceny **bílé znaky** mezi elementy.

Dostat se na element `.druhy` by znamenalo:

    Použít `nextSibling` dvakrát:

    ```
document.querySelector(".prvni").**nextSibling.nextSibling**;
```

    Zrušit bílé znaky mezi HTML značkami.

    ```
&lt;div class="prvni">1&lt;/div>&lt;div class="druhy">2&lt;/div>
```

## Následující element – `nextElementSibling`

Situaci, kdy `nextSibling` vrátí bílé znaky, řeší `next**Element**Sibling`, který bere v potaz pouze HTML elementy.

```
document.querySelector(".prvni").**nextElementSibling**;
```

Vlastnost `nextElementSibling` funguje od **IE 9** a pro starší prohlížeče jde doskriptovat s využitím `nextSibling`.

```
var nextElementSibling = function(el) {
    do {
        el = el.nextSibling;
    } while (el &amp;&amp; el.nodeType !== 1);
    return el;
};
```

Použití:

```
var druhy = nextElementSibling(
  document.querySelector(".prvni")
);
```

[Živá ukázka](http://kod.djpw.cz/mjnb)

## Předchozí – `previousSibling` a `previousElementSibling`

Metody pro získání předchozího sourozence nebo předchozího elementu fungují obdobně jako `next*Sibling`.

```
document.querySelector(".druhy").**previousSibling**;
```

Případně pro získání předchozího **elementu**.

```
document.querySelector(".druhy").**previousElementSibling**;
```

## Další/předchozí v jQuery

V **jQuery** existují pro předchozí a další element klíčová slova `prev` a `next` a fungují jako `nextElementSibling`/`previousElementSibling`.

Následující:

```
$(".prvni").next();
```

Předchozí:

```
$(".druhy").prev();
```

## Odkazy jinam

  - MDN: [NonDocumentTypeChildNode.nextElementSibling](https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling)