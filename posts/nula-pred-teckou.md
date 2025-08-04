---
title: "Nula před desetinnou tečkou u čísla"
headline: "Nula před desetinnou tečkou u čísla"
description: "Je lepší psát před desetinou tečnou u čísla <code>0.5</code> zbytečnou nulu, nebo ne?"
date: "2018-04-17"
last_modification: "2018-06-01"
status: 1
tags: ["CSS", "Rady a nápady", "Style guide"]
---

Při zápisu desetinných čísel bývá v programování volitelné uvádět nulu před desetinnou tečkou. Číslo `0.5` se tedy rovná `.5`.

V CSS se s tím jde setkat např. při používání `em` jednotek:

```
element {
  padding: .5em;
}
```

Výše uvedený kód je ekvivalentem:

```
element {
  padding: **0**.5em;
}
```

Je ale lepší nulu psát, nebo vynechávat?

    - [CSS zbytečnosti](/css-zbytecnosti) – další zbytečně psané znaky v CSS

Předně jsem toho názoru, že je to jedno, jen je dobré se domluvit na **jednotném stylu napříč projektem**.

## Vynechání počáteční `0`

Pro vynechání nuly hovoří 3 věci:

  Je to o jeden znak rychlejší na zápis.

  Nemusí se po síti k návštěvníkovi přenášet zbytečný znak.

  Pro prohlížeč může být teoreticky rychlejší nevyhodnocovat číselnou část před tečkou.

          W3C: [CSS syntax: number token diagram](https://www.w3.org/TR/css-syntax-3/#number-token-diagram)

Dvě poslední ze tří věcí může automaticky zajistit automatisace v podobě CSS pre/post-procesoru.

## Psaní s `0`

    Někomu může přijít psaní s nulou přehlednější:

```
element {
  padding: 5em 0 .5em;
}
```

Oproti:

```
element {
  padding: 5em 0.5em;
}
```

    Kdy až na tu mezeru relativně podobné kusy kódu dělají úplně něco jiného.

    Méně zkušeným lidem může přijít takový zápis [nejasný nebo nezvyklý](http://www.lamer.cz/quote/72668).

Přehlednost je v tomto případě dost subjektivní. Když si člověk zvykne zbytečnou nulu nepsat, přijde mu potom `0.5` také divné.

## Populární Style Guide

V style guidech větších skupin vývojářů se lze setkat s oběma přístupy:

    - Google HTML/CSS Style Guide: [Leading 0s](https://google.github.io/styleguide/htmlcssguide.html#Leading_0s) – **nepsat** počáteční nulu

    - Sass Guidelines: [nuly](https://sass-guidelin.es/cz/#nuly) – **psát** počáteční nulu

Těžko tak proto jednoznačně určit, že je ten nebo ten přístup lepší. 

**Co preferujete vy? A proč?**