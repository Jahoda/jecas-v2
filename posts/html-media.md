---
title: "Atribut media"
headline: "HTML atribut <code>media</code>"
description: "HTML atribut <code>media</code> funguje u značky <code>&lt;a></code> podobně jako Media Queries v CSS."
date: "2014-05-21"
last_modification: "2014-05-27"
status: 1
tags: ["HTML", "HTML atributy"]
---

```
&lt;a href="odkaz" **media**="*max-width: 480px*">
  Odkaz bude vidět jen při šířce do 480 px
&lt;/a>
```

Hodnota HTML atributu `media` bude obdobná jako u [CSS pravidla `@media`](/mobilni-web#media-queries) a měla by i tak fungovat.

[Živá ukázka](http://kod.djpw.cz/cndb)

## Podpora

Bohužel zatím neznám prohlížeč, kde by atribut `media` fungoval.

## Využití

Do jisté míry by takto šly řešit [responsivní obrázky](/responsivni-obrazky) a jejich **datová optimalisace**. Na stránce by bylo víc obrázků s obrázky a *media queries* by zařídily zobrazení (načtení) jen toho, který **nejlépe vyhovuje** cílovému zařízení.

```
&lt;a href="maly-obrazek.png" media="**max**-width: 480px">
  &lt;img src="maly-obrazek.png">
&lt;/a>
&lt;a href="velky-obrazek.png" media="**min**-width: 480px">
  &lt;img src="velky-obrazek.png">
&lt;/a>

```

Taktéž by tento mechanismus mohl sloužit k *opodmínkování* odkazu na **mobilní versi webu** nebo naopak na *velký* web.

## Odkazy jinam

  - MDN: [Atribut media u značky `&lt;a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-media)

  - MDN: [CSS media queries](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries)