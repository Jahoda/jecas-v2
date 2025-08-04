---
title: "CSS hyphens"
headline: "CSS <code>hyphens</code>"
description: "Vlastnosti <code>hyphens</code> ovlivňuje rozdělování slov spojovníkem na konci řádku."
date: "2013-11-29"
last_modification: "2013-11-29"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

V HTML je možné určitými znaky vytvořit uprostřed slova místo, kde se může **zalomit řádek** uprostřed slova.

  - entitou `&amp;shy;`,

  - číselnou entitou `&amp;#173;`,

  - číselnou entitou `&amp;#8203;`,

  - další mezery jsou na [Wikipedii](http://en.wikipedia.org/wiki/Space_(punctuation)#Spaces_in_Unicode).

```
&lt;p>
  Text odstavce, který se může za**&amp;shy;**lo**&amp;shy;**mit uprostřed slova „zalomit“.
&lt;/p>
```

CSS vlastnost `hyphens` může nabývat hodnoty:

  `none`
  Prohlížeč bude *příležitosti k zalomení* (např. entitu `&amp;shy;` uprostřed slova) ignorovat.

  `manual`
  **Výchozí** hodnota. Slova se zalamují v místech, kde je *příležitost* vytvořená zalamovací entitou.

  `auto`
  Prohlížeč může slovo rozdělit spojovníkem, kde **uzná za vhodné**. Prohlížeče, které umí rozdělovat slo-va po slabikách, při nastavení `hyphens: auto` toto rozdělování *zapnou* i bez nutnosti zanést kód **rozdělovacími entitami**.  

Zajímavá je kombinace `hyphens: auto` s `text-align: justify` (zarovnání do bloku). Výsledný text vypadá lépe, protože **zalamování slov** nevytváří takové *řeky* (nepěkně velké mezery mezi slovy).

## Podpora

Momentálně nejlepší podpora (s [prefixy](/css-prefixy)) pro český text je v **IE 10** a **[IE 11](/ie11)**. **Opera** a **Chrome** nastavení `hyphens`, zdá se, ignoruje. A ve **Firefoxu** se u češtiny chová `manual` i `auto` stejně (v jiných jazycích rozdělovat umí).

[Živá ukázka](http://kod.djpw.cz/kwt) (zdroj [*českého* lipsum textu](/lipsum)), varianta [zarovnaná do bloku](http://kod.djpw.cz/pwt).

## Doporučení

Příliš nedoporučuji **zanášet kód entitami pro rozdělování**. Může to způsobit problém při **hledání slov na stránce**, při **kopírování textu** nebo (možná) u **vyhledávačů** (související diskuse [Má někdo zkušenosti s entitou shy?](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=13&amp;topic=104038)).

## Odkazy

  - W3C: [CSS specifikace `hyphens`](http://dev.w3.org/csswg/css-text/#hyphens)

  - [Hyphenator](http://code.google.com/p/hyphenator/) (JS doplňující entity `&amp;shy;`)