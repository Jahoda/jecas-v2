---
title: "HTML značka mark"
headline: "HTML značka <code>&lt;mark></code>"
description: "HTML značka <code>&lt;mark></code> slouží ke zvýraznění textu na stránce."
date: "2014-10-10"
last_modification: "2014-10-10"
status: 1
tags: ["HTML", "HTML značky"]
---

```
&lt;p>
  Značka MARK slouží ke &lt;mark>zvýraznění&lt;/mark> textu na stránce.
&lt;/p>
```

Její význam je čistě **sémantický**, nemá žádné zvláštní schopnosti (fungují u ní tedy jen **obecné atributy** – tj. `title`, `class`, `id` a podobně). V podporovaných prohlížečích má ve výchozím stylu žluté pozadí.

## Podpora

Element `&lt;mark>` funguje od **IE 9**, ale vzhledem k tomu, že nemá specifické chování, není výrazný problém ho používat i v **IE 8** a starších, kde se bude tvářit jako [ostatní neznámé značky](/vlastni-html-znacky#html5).

## Využití

Tag `&lt;mark>` by neměl být využíván ke zvýraznění **důležité části textu** a tedy nahrazovat `&lt;strong>` nebo `&lt;em>`, ale slouží ke zvýraznění *z nějakého jiného účelu*.

### Výsledky hledání

Asi nejčastější využití se nabízí pro zvýraznění textu, který uživatel na stránce **hledá**.

  - Zvýraznit nějaké slovo v HTML kódu pomocí PHP jde [následovně](http://php.vrana.cz/zvyrazneni-vysledku-vyhledavani.php).

  - V JavaScriptu existuje nástroj [findAndReplaceDOMText](https://github.com/padolsey/findAndReplaceDOMText) ([ukázka](http://kod.djpw.cz/qhgb)).

  - Vtipné, i když ne moc použitelné, je zvýraznění pomocí zapnutí `designMode` ([ukázka](http://kod.djpw.cz/phgb)).

### Zvýraznění v citacích

Významově se `&lt;mark>` dobře hodí k **vlastnímu zvýraznění** určité pasáže v **citaci** někoho jiného.

## Odkazy jinam

  - [The mark element](https://html.spec.whatwg.org/multipage/semantics.html#the-mark-element)

  - DevDocs: [&lt;mark>](http://devdocs.io/html/element/mark)