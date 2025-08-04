---
title: "HTML značka ruby"
headline: "HTML značka <code>&lt;ruby></code>"
description: "HTML značka <code>&lt;ruby></code> slouží k označení výslovností symbolů východních asijských znaků."
date: "2016-01-29"
last_modification: "2016-01-29"
status: 1
tags: ["HTML", "HTML značky"]
---

Uvnitř elementu `&lt;ruby>` se používá celá řada dalších značek:

## `&lt;rt>`

Text přiřazený k symbolu se obaluje do značky `&lt;rt>` a v podporovaných prohlížečích se potom zobrazí nad symbolem.

  漢 Kan
  字 ji

## `&lt;rp>`

Jako fallback pro prohlížeče neznalé ruby existuje značka `&lt;rp>`. Do ní jde umístit obsah, který se v podporovaných prohlížečích nezobrazí, ale v nepodporovaných ano.

Díky tomu se text přiřazený k symbolu může zobrazit třeba v závorce:

```
&lt;ruby>
  漢 **&lt;rp>(&lt;/rp>** &lt;rt>Kan&lt;/rt>&lt;rp>)&lt;/rp>
  字 &lt;rp>(&lt;/rp>&lt;rt>ji&lt;/rt>&lt;rp>)&lt;/rp>
&lt;/ruby>
```

## `&lt;rb>`

Značku `&lt;rb>` je možné použít pro označení symbolu.

## `&lt;rtc>`

Slouží pro umístění anotace. Specifikace uvádí následující příklad:

```
&lt;ruby>
  &lt;rb>旧&lt;rb>金&lt;rb>山
  &lt;rt>jiù&lt;rt>jīn&lt;rt>shān
  &lt;rtc>San Francisco
&lt;/ruby>
```

Ten se v podporovaných prohlížečích (např. **Firefox 44**) zobrazí následovně ([ukázka](http://kod.djpw.cz/eztb)):

## Odkazy jinam

    - W3C specifikace: [The `ruby` element](http://www.w3.org/TR/html5/text-level-semantics.html#the-ruby-element)