---
title: "Generátor náhodných obrázků"
headline: "Generování náhodných obrázků"
description: "Pro vývoj a testování webů se hodí znát způsoby, jak v okamžiku vložit do stránky ilustrační obrázek."
date: "2013-07-18"
last_modification: "2015-02-04"
status: 1
tags: ["Rady a nápady", "Obrázky"]
---

## Dummy Image

[Web](http://dummyimage.com/)

Kromě pohodlného *vytváření* obrázků (či spíš placeholderů) zadáváním URL, je možné celou **službu stáhnout** a provozovat na vlastním serveru (využito na [kod.djpw.cz](http://kod.djpw.cz/puc)).

## Lorempixel

[Web](http://lorempixel.com/)

Lorempixel dokáže generovat skutečné, různě tématické, obrázky.

## Placehold.it

[Web](http://placehold.it/)

Syntaxe je shodná se službou **Dummy Image**. K disposici jsou jen nejzákladnější funkce.

## Dummy Image Generator

[Web](http://dummy-image-generator.com/)

Hodně propracovaný generátor. Hlavní výhoda oproti ostatním je možnost **vygenerovat a stáhnout celou kolekci** **ilustračních obrázků**.

Text s rozměry lze vypnout. Asi jediná vada na kráse je poměrně **rušivé jméno autora** na všech obrázcích, které zřejmě vypnout nejde.

## Satyr.io

[Web](http://satyr.io/)

Kromě standardního generování obrázku o určitých rozměrech nabízí další zajímavé funkce:

    Nastavení rozměrů na základě **poměru stran**:

    ```
http://satyr.io/980x16:9
```

    Pomalejší **odezva** obrázků. Následující obrázek se začne načítat až po 1 vteřině.

    ```
http://satyr.io/200x300/red?**delay=1000**
```

    Jde zadat i rozsah, ve kterém se má obrázek začít stahovat:

    ```
http://satyr.io/200x300?delay=1000-3000
```

    Pro testování pomalého připojení jde ale použít i přímo [vývojářské nástroje](/vyvojarske-nastroje) přímo v prohlížeči.

    Užitečná je i schopnost vytvořit **náhodnou velikost obrázku** na základě zadaného rozsahu:

    Satyr.io umí generovat i **vlajky různých zemí**:

## „Dummy“ obrázky v editoru

Pro [Sublime Text](/sublime-text) existuje plugin **Dummy Image Generator** ([jak plugin instalovat](/pluginy-sublime-text)) využívající [DummyImage.com](#dummy-image).