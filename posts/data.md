---
title: "HTML element DATA"
headline: "HTML element <code>&lt;data></code>"
description: "HTML značka <code>&lt;data></code> slouží k označení strojově čitelných dat na webu."
date: "2015-01-02"
last_modification: "2015-02-22"
status: 1
tags: ["HTML", "HTML značky"]
---

V určitých případech se může hodit umístit nějaká data, která **nejsou na stránce přímo vidět**, do HTML kódu stránky. Typicky s nimi potom bude manipulovat JavaScript.

## Zápis

Značka `&lt;data>` má volitelný atribut `value`.

```
&lt;data value="hodnota">
  Obsah značky
&lt;/data>
```

Obsah mezi `&lt;data>` a `&lt;/data>` se standardně vypíše (a to i ve starých prohlížečích, které budou značku brát jako neznámou / [vlastní značku](/vlastni-html-znacky)). Element `&lt;data>` je řádkový (`display: inline`).

Použít `&lt;data>` jde i v režimu bez obsahu, potom se na stránce nezobrazí nic.

```
&lt;data id="data" value="hodnota">&lt;/data>
```

## Využití

Dosáhnout podobného výsledku jde i jinými značkami a [vlastními HTML atributy](/vlastni-html-atributy). Značka `&lt;data>` má ale pro takové případy speciální sémantický význam.

Pro některé případy dat existují vhodnější značky než obecný element `&lt;data>`. Třeba pro zapsání času existuje značka [`&lt;time>`](/time).

## Přístup v JavaScriptu

Značka `&lt;data>` je podporovaná pouze ve **Firefoxu 22**+. Tam se dá získat hodnota přímo z vlastnosti `value` (podobně jako u [`&lt;input>`](/input)).

```
document.getElementById("data").value
```

V ostatních prohlížečích je `&lt;data>` element neznámý (`HTMLUnknownElement`), jediné řešení je tedy použít metodu `getAttribute`.

```
document.getElementById("data").getAttribute("value")
```

    - [Živá ukázka](http://kod.djpw.cz/hukb) – test podpory značky `&lt;data>`

## Odkazy

  - MDN: [`&lt;data>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data)