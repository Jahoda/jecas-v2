---
title: "Automatické zoomování inputů na iOS"
headline: "Automatické zoomování inputů na iOS"
description: "Jak se vypořádat s automatickým přibližováním stránky u formulářových prvků na iPhonech."
date: "2016-04-19"
last_modification: "2016-05-30"
status: 1
tags: ["CSS", "Prohlížeče", "Responsivní design"]
---

I v případě responsivní stránky s řádně nastavenou [`&lt;meta name="viewport">`](/meta-viewport) značkou může nastat nepříjemná situace.

```
&lt;meta name="viewport" content="width=device-width,initial-scale=1">
```

Na iOS v iPhone se po označení políčka `&lt;input>`, `&lt;textarea>` nebo `&lt;select>` celá stránka přiblíží.

**Důvod?** Formulářová políčka mají výchozí [velikost textu](/font#size) menší než běžný text. Výchozí velikost textu bývá 16 px, ale formulářových políček jen **13 px**.

Na iPhone jsou všechna políčka s textem pod 16 px zvětšována.

## Velikost na 16 px

Možné řešení, které ale ovlivní zobrazování stránky, je nastavit velikost prvků alespoň na 16 px. Není nutné používat přímo jednotky `px`. Jde použít klidně procenta nebo `em`, pokud výsledek bude 16 pixelů a víc.

Docela elegantní je klíčové slovo `initial`. Následující kód by měl problém vyřešit:

```
input, 
textarea,
select {
  font-size: initial;
}
```

### Možné problémy

Asi největší nevýhoda je, že oprava nechtěného zoomování **změní vzhled**.

Mají-li formulářové prvky počítány odsazení nebo rámečky v jednotkách `em`, změna velikosti písma ovlivní i odsazení. To může být dobře i špatně.

## Zákaz zoomování

Nejsnazší řešení je zkrátka zakázat možnost manipulovat s velikostí stránky.

Jde toho docílit `&lt;meta>` tagem `viewport`:

```
&lt;meta name="viewport" 
  content="width=device-width, initial-scale=1.0, **maximum-scale=1.0, user-scalable=0**"
>
```

Má to ale dost velký problém. **Zákaz zoomování** je jeden ze způsobů, jak zničit mobilní uživatele.

Existují případy, kdy návštěvník ocení, že mu půjde stránka zvětšit.

    - Jak zničit mobilní uživatele podruhé: [Zakažte jim zoomování](http://www.vzhurudolu.cz/blog/48-znicit-mobilistu-2#10-zakazte-jim-zoomovani)

## Dočasný zákaz zoomu

Asi jediná možnost, jak zoomování zabránit bez zvětšování písma je dočasně zakázat zoom.

Když se zoomování stránky zakáže značkou *viewport* při události [`ontouchend`](/udalosti-mysi#ontouchstart) u formulářového pole, podaří se zazoomování zabránit.

K úvaze je, kdy opět vrátit původní viewport a umožnit tak opět zoomování.

Tato událost nemůže nastat těsně po *zablokování* (automatický zoom by se stejně projevil), takže se nabízí nejspíš:

    Událost `onblur` (opuštění políčka).

    Použít [časovač](/odpocitavani#js) `setTimeout`, který pár stovek [milisekund](/ms) po konci dotyku vrátí původní viewport.

U `onblur`u je problém, že právě vyplňování políčka může být důvod k přiblížení – uživatel se například potřebuje přesně trefit mezi určitá písmena.

Jako relativně funkční doba časovače se zdá 500 ms:

    - [Živá ukázka](http://kod.djpw.cz/jzwb) – zabránění automatickému zoomu políčka

Bohužel na základě testů se toto zakazování na skutečných zařízeních **chová dost nepředvídatelně** a není 100%.

## Závěr

Ostatní zařízení tuto přibližovací *vlastnost* nemají.

Přestože je automatické zoomování na iOS možné JavaScriptem blokovat (byť nespolehlivě), jistější postup je jako obvykle použít CSS a při návrhu webu počítat s tím, že formulářové prvky budou alespoň 16 pixelů velké.

Zákaz zoomu je potom asi nejhorší možné řešení.