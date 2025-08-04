---
title: "Jak správně používat SVG ikony"
headline: "Jak správně používat SVG ikony"
description: "Proč používat ikony v SVG a jak to udělat správně funkční ve všech prohlížečích od IE 9. Best-practice návod."
date: "2018-07-20"
last_modification: "2018-07-20"
status: 0
tags: []
---

Používání ikon se historicky dost měnilo. Na začátku byly malované [JPG obrázky](/obrazky#jpg) vložené značkou `&lt;img>`, vystřídaly je PNG/GIF obrázky připojené CSS vlastností `background` (kvůli šetření počtu HTTP requestů potom spojené do [jednoho spritu](/css-srite)), aby uvolnily místo používání [font-ikon](/fonticony).

## `xlink:href` vs. `href`

Specifikace SVG 2 [nahrazuje](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/href) `x:link:href` za prosté `href`.

Bohužel tento kratší zápis má horší podporu v prohlížečích – nefunguje např. v **Safari 11** (březen 2018), takže nezbývá než používat `xlink:href` nebo oboje.

    - StackOverflow: [SVG use not working in Safari](https://stackoverflow.com/questions/43961807/svg-use-not-working-in-safari)

## Hotové řešení v Nette

Uvedený postup je implementován jako Latte makro v balíčku [latte-svg](https://github.com/dada-amater/latte-svg/).

Požadovaná skupina ikon se připojí jako fallback pro starší IE:

```
{svgFallback icon-group}
```

Ikony se potom vkládají následujícím způsobem:

```
{svg ikona, css-trida, skupina-ikon}
```

## Jak

Preferuji externí SVG sprite, kde se jednotlivé ikonky vkládají přes „use“. S fallbackem pro IE, kde jsou všechny ikonky v HTML kódu.

Proč to má smysl i na HTTP/2? U spritu bývá typicky účinější gzip komprese, takže se ušetří data. Navíc ne všechny prohlížeče HTTP/2 podporují.

## Vícebarevné ikony

Někdy je potřeba, aby ikona měla víc barev.

Asi nejhezčí řešení pro ikony vkládané přes `&lt;use>` jsou CSS proměnné. Nefungují ale v **IE 11**.

Možné řešení je vložit takovou ikonu celou do HTML kódu a jednotlivým částem měnit barvu vlastností `fill`.

Pokud stačí **vícebarevnost jen v jednom případě** a v případě druhém (např. po najetí myši) mohou být ikony jednobarevné, jde použít tak trochu hack v podobě CSS filtrů:

```
.tlacitko:hover {
  background: black;
}
.tlacitko:hover .ikona {
  filter: brightness(0) invert(1);
}
```

[Živá ukázka](http://kod.djpw.cz/xpvc)

## Odkazy

    [Multi-Colored SVG Symbol Icons with CSS Variables](https://frontstuff.io/multi-colored-svg-symbol-icons-with-css-variables)