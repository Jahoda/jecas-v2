---
title: "Pravidla ukazatele any-pointer a any-hover"
headline: "CSS pravidla <code>any-pointer</code> a <code>any-hover</code>"
description: "CSS pravidla <code>@media</code> <code>any-pointer</code> a <code>any-hover</code> slouží k detekci přesnosti a typu ovládání."
date: "2015-03-11"
last_modification: "2019-12-04"
status: 1
tags: ["CSS", "Hotová řešení", "CSS pravidla"]
---

Kromě toho, že se koncová zařízení pro prohlížení webových stránek liší **rozměry obrazovky** (například od cca 4" mobilů po 50" televise), odlišují se také **způsobem ovládání**. Zjednodušeně se weby ovládají:

  - myší,

  - dotyky prstů,

  - dotykovým perem (stylusem)

Některá zařízení navíc umožňují způsoby ovládání kombinovat – typicky notebooky s dotykovou obrazovkou nebo tablet s připojenou myší.

Pro případné odlišení ovládacích prvků pomocí CSS v závislosti na **schopnostech ukazatele** byla zavedena `@media` pravidla `any-*`.

## Test podpory

Zatím je podporuje **Chrome 41+** a **Opera 28+**.

V podporovaných prohlížečích budou některá z následujících políček zelená v závislosti na dostupných způsobech ovládání.

### `any-hover`

`any-hover`

`any-hover: none`

`any-hover: on-demand`

`any-hover: hover`

### `any-pointer`

`any-pointer`

`any-pointer: coarse`

`any-hover: fine`

### `hover`

`hover: hover`

`hover: none`

[Samostatná živá ukázka](http://kod.djpw.cz/rypb) – rozlišení dotykového zařízení a ovládání myší

## Zápis

```
@media (any-hover: hover) {
  /* zařízení je schopno :hoveru */
}
```

Pravidla `any-*` se dělí na `hover` (najetí) a `pointer` (ukazatel).

## `any-hover`

První pravidlo dokáže detekovat, jestli je zařízení schopno `:hover`u.

  `@media (any-hover)`
  
    Zařízení dokáže nějak hover vytvořit.

  `@media (any-hover: none)`
  
    Hover není podporován.

  `@media (any-hover: on-demand)`
  
    Hover je možné vyvolat, byť komplikovanějším způsobem. Typicky mobilní prohlížeče vyvolávají `:hover` po **delším podržení prstu**.

  `@media (any-hover: hover)`
  
    Zařízení nemá žádný limit ve vyvolávání hoveru. Typicky počítač/notebook/tablet s myší.

## `any-pointer`

Pravidlo `any-pointer` slouží k vytvoření podmínky na **přesnost ukazatele**.

  `@media (any-pointer)`
  
    Zařízení má nějaký ukazatel.

  `@media (any-pointer: coarse)`
  
    Přesnost ukazatele není nic moc (*coarse* je anglicky *hrubý*). Týká se zejména ovládání prsty u dotykových obrazovek (mobily,  tablety, …).

  `@media (any-pointer: fine)`
  
    Ukazatel je velmi přesný. Typicky ovládání myší na desktopu/notebooku.

## `hover`

Existuje ještě pravidlo `hover` bez `any`:

```
@media (hover: hover) {
    /* primární ovládání umí hover (myš/touchpad) */
}

@media (hover: none) {
    /* primární ovládání neumí hover (dotyková obrazovka) */
}
```

Dle specifikace by `hover` mělo znamenat, že primární ovládání umí *hover*, zatímco `any-hover`, že nějaký způsob ovládání umí *hover*.

V praxi se mi nepodařilo zpozorovat rozdíl.

## Detekce dotykové obrazovky

Asi nejzajímavější využití `any-hover` a `any-pointer` je detekce dotykového způsobu ovládání, které je jinak obtížně proveditelné.

Jde sice provést něco jako:

```
if ('ontouchstart' in window) {
  // podporuje dotyky
}
```

Ale to skončí positivně i na noteboocích s dotykovou obrazovkou, kde je připojena myš / dostupný trackpoint nebo touchpad.

Detekovat `:hover` by se zase nabízelo například při `onmousemove`. Tuto událost ale z důvodů kompatibility provádějí i dotyková zařízení. Při *tapnutí* se vyvolají následující události v uvedeném pořadí:

  - touchstart

  - touchmove

  - touchend

  - mouseover

  - mousemove

  - mousedown

  - mouseup

  - click

Nabízí se tak pro určení *hoveru* na stránce poslouchat pohyb myši (`mousemove`) a v případě, že nejde o pohyb mezi `touchstart` a `click`, považovat zařízení za schopné hoveru.

### Toto zařízení

`Podporuje dotyky`

`Podporuje hover`

[Samostatná živá ukázka](http://kod.djpw.cz/bzpb) – detekce podpory dotyků a hoveru v JavaScriptu

Hlavní problém této detekce je v tom, že se provede až v okamžiku, když návštěvník **pohne myší**.

## Odkazy jinam

  - Dev.Opera: [Opera 28 released](https://dev.opera.com/blog/opera-28/)

  - Dev.Opera: [Interaction Media Features and their potential (for incorrect assumptions)](https://dev.opera.com/articles/media-features/)

  - Frontendisti.cz: [Detekce dotykové obrazovky](https://www.facebook.com/groups/frontendisti/permalink/1658422237702627/)

  - CSS specifikace: [any-pointer and any-hover](http://dev.w3.org/csswg/mediaqueries-4/#any-input)

  - ['any-pointer' and 'any-hover' Media Queries Sample](https://googlechrome.github.io/samples/media-hover-pointer/)

.live-any p {
    background: #FF9999;
    padding: .5em .3em;
    display: inline-block;
}
  .live-any code {
    background: none;
  }
/* any-hover */
@media (any-hover) {
	.live-any .any-hover {background: #99FF99}
}
@media (any-hover: none) {
	.live-any .any-hover-none {background: #99FF99}
}
@media (any-hover: on-demand) {
	.live-any .any-hover-on-demand {background: #99FF99}
}
@media (any-hover: hover) {
	.live-any .any-hover-hover {background: #99FF99}
}
@media (hover: hover) {
	.live-any .hover-hover {background: #99FF99}
}  
@media (hover: none) {
	.live-any .hover-none {background: #99FF99}
}  

/* any-pointer */
@media (any-pointer) {
	.live-any .any-pointer {background: #99FF99}
}
@media (any-pointer: coarse) {
	.live-any .any-pointer-coarse {background: #99FF99}
}
@media (any-pointer: fine) {
	.live-any .any-pointer-fine {background: #99FF99}
}

if ('ontouchstart' in window) {
    touchTest.style.background = "#99FF99";
}

var clicked;
var moveTest = function() {
    if (!clicked) {
        hoverTest.style.background = "#99FF99";
        document.documentElement.removeEventListener("mousemove", moveTest);
        document.documentElement.removeEventListener("touchstart", moveTest);
        document.documentElement.removeEventListener("click", moveTest);        
    }
};

document.documentElement.addEventListener("mousemove", moveTest);

document.documentElement.addEventListener("touchstart", function() {
    clicked = true;
});

document.documentElement.addEventListener("click", function() {
    clicked = false;
});