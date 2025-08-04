---
title: "HTML značka <details>"
headline: "HTML značka <code>&lt;details></code>"
description: "K čemu slouží HTML značky <code>&lt;details></code> a <code>&lt;summary></code>."
date: "2014-09-01"
last_modification: "2014-09-02"
status: 1
tags: ["HTML", "HTML značky"]
---

Stručně řečeno fungují tyto značky k [rozklikávání obsahu](/prepinani-vzhledu) bez nutnosti používat JavaScript.

## Použití

```
&lt;details **open**>
  &lt;summary>Název položky&lt;/summary>
  &lt;p>Samotný obsah&lt;/p>
&lt;/details>
```

Značka `&lt;details>` má atribut `open`, který zajistí **automatické rozbalení** po načtení stránky.

Element `&lt;summary>` je potom **volitelný** a umožňuje stanovit text (nadpis) pro rozbalení obsahu. Zajímavostí je, že při jeho **absenci** se sice vyrobí jakýsi automatický `&lt;summary>` s textem *Podrobnosti* (v závislosti na jazyku prohlížeče), ale **není možné ho stylovat**.

## Podpora

Zamýšleným způsobem fungují tyto značky zatím pouze ve **Webkitu** (od versí **Opera 23**, **Chrome 27**, **Safari 6.1**).

Existuje i přímý [fallback](https://gist.github.com/remy/370590) pro starší prohlížeče.

## Ukázka

  Název položky
  Samotný obsah

[Samostatná živá ukázka](http://kod.djpw.cz/zifb) (ukázka s [JS fallbackem](http://kod.djpw.cz/ajfb))

## Využití

Kromě úkolů, které obvykle používají JS řešení [přepínání CSS třídy](/prepinani-trid) nebo postupu [zneužívající `checkbox`](/css-rozbalovani), vypadá zajímavě především **libovolné zanořování** ([ukázka](http://kod.djpw.cz/bjfb)).

Přepínání mezi souvisejícími bloky tak, aby se [ostatní zavřely](/zobrazit-skryt#rozklikavani), zatím možné není.

Jelikož se v nepodporovaných prohlížečích značky `&lt;details>` a `&lt;summary>` **nijak neprojeví** (chovají se jako [vlastní HTML značky](/vlastni-html-znacky) – např. v **IE 8** se musí skriptem pomoci, aby je šlo stylovat), nabízí se je používat s JS doplňkem pro **starší prohlížeče** už dnes.

Osobně bych to příliš **nedoporučoval** protože:

  - V **podporujících prohlížečích** se bude muset odstranit podpora, aby se používalo stejné – na JS nebo `checkbox`u závislé řešení.

  - Zařídit **odkrývací/skrývací animaci** je momentálně dost omezené (jde maximálně animovat otevření – [ukázka](http://kod.djpw.cz/cjfb)).

## Odkazy

  - Whatwg.org: [Specifikace](http://www.whatwg.org/specs/web-apps/current-work/multipage/forms.html#the-details-element)

  - Can I use: [Podpora v prohlížečích](http://caniuse.com/#feat=details)