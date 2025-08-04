---
title: "JS document.head"
headline: "JS <code>document.head</code>"
description: "Přístup k hlavičce stránky v JavaScriptu je možný konstrukcí <code>document.head</code>."
date: "2014-12-11"
last_modification: "2014-12-12"
status: 1
tags: ["JavaScript", "Rady a nápady"]
---

Podobně jako se dá se k tělu stránky – značce `&lt;body>` dostat pomocí [`document.body`](/documentelement-body), existuje podobný způsob i pro hlavičku (`&lt;head>`).

```
var hlavicka = document.head;
```

## Využití

Použít `document.head` se nabízí typicky pro **zkrácení kódu** přidávajícího do hlavičky styly nebo skripty.

```
var styl = document.createElement("link");
styl.rel = "stylesheet";
styl.href = url;
**document.head**.appendChild(styl);
```

## Podpora

Jelikož `document.head` funguje až od **IE 9**, nemusí se s ohledem na **IE 8** a starší tento *zkrácený zápis* vyplatit. Lepší je volit dobře podporovanou konstrukci:

```
document.getElementsByTagName("head")[0]
```

[Test `document.head`](http://kod.djpw.cz/jnib)

## Odkazy jinam

  - W3C: [document.head](https://html.spec.whatwg.org/multipage/dom.html#dom-document-head)

  - MDN: [Document.head](https://developer.mozilla.org/en-US/docs/Web/API/document.head)