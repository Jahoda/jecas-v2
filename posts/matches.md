---
title: "Selektor :matches"
headline: "Selektor <code>:matches</code>"
description: "CSS pseudotřída <code>:matches</code> slouží ke zjednodušení zápisu dlouhých výčtů selektorů."
date: "2015-01-09"
last_modification: "2015-01-09"
status: 1
tags: ["CSS", "CSS selektory"]
---

## Zápis

Pokud budeme například chtít mít **společný styl** pro `:hover` a `:focus` stavy odkazů v nějakém společném elementu, jde to napsat nějak takto:

```
.spolecny a:hover, 
.spolecny a:focus {
  /* pravidla */
}
```

Selektorem `:matches` jde tento zápis zpřehlednit bez nutnosti *se opakovat*.

```
.spolecny a:matches(:hover, :focus) {
  /* pravidla */
}
```

Tento selektor zachytí všechny odkazy v rodiči s třídou `spolecny`, které *vyhovují* pseudo-třídám `:hover` nebo `:focus`.

Dalším případem užití může být například stylování nadpisů v rámci `.obal`u.

```
.obal h1,
.obal h2,
.obal h3 {
  /* pravidla */
}
```

S použitím `:matches`:

```
.obal :matches(h1, h2, h3) {
  /* pravidla */
}
```

V rámci jednoho předpisu může být `:matches` použit i **vícekrát**. Tento kód se proto aplikuje na všechny `h1`, `h2` a `h3` v elementech `.obal` nebo `.jiny-obal`.

```
:matches(.obal, .jiny-obal) :matches(h1, h2, h3) {
  /* pravidla */
}
```

## Podpora v prohlížečích

Selektor `:matches` zatím není podporován, obdobně ale funguje selektor `:any` s [CSS prefixy](/css-prefixy) s podporou trochu lepší:

  - `:-webkit-any` – **Chrome 12+**, **Safari 5+**, **Opera 15+**

  - `:-moz-any` – **Firefox 4+**

[Živá ukázka](http://kod.djpw.cz/sijb)

**Poznámka**: Selektory s prefixy není možné sdružovat, musí se duplikovat. Tohle proto **fungovat nebude**:

```
a:-webkit-any(:hover, :focus)**,**
a:-moz-any(:hover, :focus) {
  /* nebude fungovat */
}
```

## Matches v JavaScriptu

V JavaScriptu obdobně slouží metoda `matchesSelector`. Zatím je podporovaná s prefixy, případně jde doplnit [`querySelectorem`](/queryselector).

[Živá ukázka](http://kod.djpw.cz/tijb) s využitím [polyfillu](/polyfill)

## Odkazy jinam

  - W3C: [The Matches-any Pseudo-class](http://dev.w3.org/csswg/selectors-4/#matches)

  - MDN: [`:any`](https://developer.mozilla.org/en-US/docs/Web/CSS/:any)

  - [rework-matches](https://github.com/michelle/rework-matches) – polyfill selektoru `:matches`