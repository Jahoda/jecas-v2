---
title: "Picture"
headline: "HTML zančka <code>&lt;picture></code>"
description: "Jak se používá HTML značka pro vkládání responsivních obrázků <code>&lt;picture></code>."
date: "2014-08-31"
last_modification: "2014-08-31"
status: 0
tags: []
---

Značka `&lt;picture>` slouží k elegantnějšímu vytváření [responsivních obrázků](/responsivni-obrazky) bez různých JavaScriptových nebo serverových řešení.

## Podpora

Funguje od:

  - **Chrome 38**

  - **Firefox 33**

  - **Opera 25**

## Zápis

```
&lt;picture>
  &lt;**source** media="(min-width: 45em)" srcset="obrazek-velky.jpg">
  &lt;**source** media="(min-width: 32em)" srcset="obrazek-stredni.jpg">
  &lt;*img* src="obrazek.jpg" alt="Popis obrázku">
&lt;/picture>
```

**Alternativní obrázky** se tedy umisťují do atributu `srcset` značky `&lt;source>`. Kdy se mají použít určuje HTML atribut [`media`](/html-media). Za povšimnutí stojí stará dobrá značka `&lt;img>`, která slouží jako *fallback* pro prohlížeče neznalé značek `&lt;picture>` a `&lt;source>` i jako obrázek pro podporované prohlížeče v případě, že se `media` podmínky nesplní.

## Značka `&lt;source>`

## Využití

## Odkazy jinam

  - [Responsive Image Hinting: Using the w Descriptor](http://demosthenes.info/blog/1059/Responsive-Image-Hinting-Using-the-w-Descriptor)

  - Dev.Opera: [Native Responsive Images](https://dev.opera.com/articles/native-responsive-images/)

  Chromium Blog: [Chrome 38 Beta: New primitives for the next-generation web](http://blog.chromium.org/2014/08/chrome-38-beta-new-primitives-for-next.html
)
  
  - HTML5 Rocks: [Built-in Browser Support for Responsive Images](http://www.html5rocks.com/en/tutorials/responsive/picture-element/)

  - Cloud Four Blog: [Don’t use &lt;picture> (most of the time)](http://blog.cloudfour.com/dont-use-picture-most-of-the-time/)

  - Cloud Four Blog: [Image Resizing Services](http://blog.cloudfour.com/image-resizing-services/)

  - CSS-Tricks: [Responsive Images: If you’re just changing resolutions, use srcset.](http://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/)

  - Andi Dysart: [Responsive Images: The Ultimate Guide](http://davidwalsh.name/responsive-images)

  - An A List Apart Article: [Responsive Images in Practice](http://alistapart.com/article/responsive-images-in-practice)

  - [The Missing Piece: Using the HTML5 Responsive Image sizes Attribute](http://thenewcode.com/23/The-Missing-Piece-Using-the-HTML5-Responsive-Image-sizes-Attribute)