---
title: "Zjištění rozlišení v JS"
headline: "Zjištění rozměrů stránky"
description: "Jak v JavaScriptu zjistit šířku a výšku rozlišení obrazovky, velikost dostupné plochy (tzv. viewport) nebo rozměry elementu."
date: "2014-01-15"
last_modification: "2017-06-01"
status: 1
tags: ["JavaScript", "Rady a nápady", "Rozlišení"]
---

Co zajímavého je možné na stránce měřit ilustruje následující obrázek:

Všechny hodnoty jsou v **pixelech**, proto v případě jejich používání v nastavování CSS vlastností je nutné jednotky `px` přidat:

```
element.style.width = screen.width + **"px"**;
```

## Rozlišení uživatele

Zjištění **rozlišení obrazovky**. Kromě statistických účelů to není moc použitelné. Z praktického hlediska je zajímavější znát prostor okna, který je dostupný pro samotný web.

  `screen.width`
  
    Šířka obrazovky: 

  `screen.height`
  
    Výška obrazovky: 

  `screen.availWidth`
  
    Dostupná šířka: 

  `screen.availHeight`
  
    Dostupná výška: 

Hodnota `availHeight` se liší kvůli panelu v operačním systému.

## Poměr pixelů `pixelRatio`

Jedná s o poměr skutečných hardwarových pixelů vůči počtu pixelů, kterými se presentuje prohlížeč.

  `window.devicePixelRatio`
  
    Poměr pixelů: 

**Jiná hodnota než 1** typicky nastává u mobilních zařízení. Ta mají běžně na 5" displeji třeba FullHD rozlišení (1920 × 1080 pixelů). Pokud by byl poměr HW a SW pixelů 1:1, stránka by byla na mobilu nečitelná.

Obdobné chování je i u **4K monitorů** (3840 × 2160 pixelů), kde se stránky v prohlížečích tváří jako by byly v QHD rozlišení (2560 × 1440 px) při device-pixel-ratio 1.5.

## Rozměry viewportu

*Viewport* znamená „čistý“ rozměr okna, který je dostupný pro samotný web. Mění své rozměry při úpravách velikosti okna. Taktéž při zobrazování/vypínání různých panelů v prohlížeči.

  `document.documentElement.clientWidth`
  
    Šířka viewportu: 

  `document.documentElement.clientHeight`
  
    Výška viewportu: 

V některých prohlížečích je možné použít (**IE 9+**):

  `window.innerWidth`
  
    Šířka viewportu: 

  `window.innerHeight`
  
    Výška viewportu: 

## Velikost celé stránky

Zjistit celkové rozměry stránky (nebo samotného elementu) umí `offset*` hodnoty. Započítá se i obsah, ke kterému se musí **odrolovat**.

  `document.documentElement.offsetWidth`
  
    Šířka stránky: 

  `document.documentElement.offsetHeight`
  
    Výška stránky: 

  `document.documentElement.scrollWidth`
  
    Šířka stránky: 

  `document.documentElement.scrollHeight`
  
    Výška stránky: 

### document.body

Zjišťování rozměrů celé stránky přes [`documentElement`](/documentelement-body) nefunguje správně v **IE 9** a starších. Hodnota z `document.body` vypadá mnohem lépe.

  `document.body.offsetWidth`
  
    Šířka stránky: 

  `document.body.offsetHeight`
  
    Výška stránky: 

  `document.body.scrollWidth`
  
    Šířka stránky: 

  `document.body.scrollHeight`
  
    Výška stránky: 

## Rozměry elementu

Pro přeměření elementů jako [`&lt;div>`](/div-span#div), `&lt;p>` a podobně slouží rovněž `offset*` hodnoty.

Element k přeměření

  var premerit = document.getElementById('premerit');

  `element.offsetWidth`
  
    Šířka: 

  `element.offsetHeight`
  
    Výška: 

  function reCount() {
    var items = document.getElementsByTagName("tt");
    for (var i = 0; i