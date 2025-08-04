---
title: "Will-change"
headline: "Will-change"
description: "CSS vlastnost <code>will-change</code> dá prohlížeči najevo, že se s elementem bude něco dělat."
date: "2014-06-12"
last_modification: "2015-04-02"
status: 1
tags: ["CSS", "CSS vlastnosti", "Animace"]
---

Pro rychlé překreslování stránky se snaží stránku prohlížeče optimalisovat.

Výsledná stránka, co vidí člověk v prohlížeči, je kompilace z několika vrstev. Pokud na stránce probíhají nějaké animace se změnou umístění nebo velikosti, posun elementu v rámci téže vrstvy naruší její velkou část, která se musí následně složitě překreslovat.

V takovém případě je výhodnější, aby přesouvaný element byl v separátní vrstvě. Více o vykreslování stránky je v následujícím článku:

    - [Jak funguje vykreslování stránky](/vykreslovani)

Prohlížeče se snaží tento postup na rozdělení do vrstev inteligentně odhadovat. Proto bývá výhodnější používat **CSS transformace** než například [posicování](/position).

Použít `will-change` je potom dobré, aby prohlížeč věděl, že se bude element animovat a předem se na to připravit. Z pohledu plynulosti je lepší, když se animace **spustí později** (po přípravě, která zabere nějaký čas), ale bude plynulá, než když by se trhaně začalo animovat hned.

## Zápis

CSS vlastnost `will-change` může nabývat několika hodnot, které určují, co se to bude měnit.

  `will-change: auto`
  
    Výchozí hodnota, prohlížeč používá své standardní postupy pro optimalisaci.

  `will-change: scroll-position`
  
    Prohlížeč se připraví, že se bude scrollovat. Prohlížeče většinou nevykreslují celou stránku, ale jen viditelnou oblast a nějakou část kolem s ohledem na kompromis mezi rychlostí vykreslování a plynulosti při rolování.

  `will-change: contents`
  
    Očekává se změna obsahu elementu. Prohlížeč tak nemusí *cacheovat* jeho obsah, protože se změní.

  `will-change: transform`
  
    Očekává se CSS transformace.

  `will-change: opacity`
  
    Prohlížeč se připraví na změnu [průhlednosti](/opacity).

  `will-change: left, top`
  
    Hodí se pro element který *sleduje/kopíruje* pohyb myši.

Více hodnot lze oddělit čárkami.

## Přidávání a odebírání `will-change`

Informace pro prohlížeč, že se bude s elementem manipulovat sice urychlí animaci, na druhou stranu způsobí vyšší nároky na paměť počítače návštěvníka.

Ideální je proto `will-change` **přidávat až těsně před momentem, kdy se má něco dělat**. A zároveň tuto vlastnost důsledně odebírat po dokončení animace, kvůli šetření paměti.

Realisace v JavaScriptu může vypadat následovně:

```
var el = document.querySelector('.element'); 
el.addEventListener('mouseenter', hintBrowser);
el.addEventListener('animationEnd', removeHint); 
function hintBrowser() {
  this.style.willChange = 'transform, opacity';
}
function removeHint() {
  this.style.willChange = 'auto';
}
```

## Podpora v prohlížečích

Podporovány jsou prohlížeče kromě **Internet Exploreru**.

  - **Chrome 36+**

  - **Firefox 36+**

  - **Opera 24+**

  - **Android browser 37+**

  - **Chrome for Android 40+**

  - **Opera Mobile 24+**

## Využití

Uvažovat nad použitím `will-change` je dobré v momentě, kdy se bude zdát, že má stránka problém s výkonem.

Prohlížeče se neustále snaží vykreslování a překreslování optimalisovat bez nutnosti `will-change` používat. Navíc se stále zlepšuje HW a rychlost prohlížečů, což předpovídá, že `will-change` bude nutné používat méně a méně.

## Odkazy jinam

  - [Fix scrolling performance with CSS will-change property](https://fourword.fourkitchens.com/article/fix-scrolling-performance-css-will-change-property)

  - [Everything You Need to Know About the CSS will-change Property](https://dev.opera.com/articles/css-will-change-property/)

  - [An Introduction to the CSS will-change Property](http://www.sitepoint.com/introduction-css-will-change-property/)

  - DevDocs: [`will-change`](http://devdocs.io/css/will-change)