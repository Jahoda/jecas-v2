---
title: "CSS mask"
headline: "CSS vlastnost <code>mask</code>"
description: "Vlastnost <code>mask</code> dokáže vytvářet elementy s texturou nebo nepravidelnými tvary."
date: "2014-10-17"
last_modification: "2015-02-14"
status: 1
tags: ["CSS", "CSS vlastnosti", "Obrázky"]
---

Má-li být na stránce nějaký **obsah nepravidelných tvarů** (něco jiného než obdélník), existují možnosti:

  - [`border-radius`](/border-radius) – zaoblené rohy, kterými jde vytvořit i kruh

  - [`clip`](/clip) – pomocí funkce `polygon` jde vytvořit nejrůznější oříznutí (**Chrome 24**+, **Opera 15**+)

CSS vlasnost `mask` se hodí pro vytvoření například obrázku s nepravidelným okrajem.

Takový obrázek je sice možné *natvrdo* nakreslit, ale má to značné nevýhody:

  - Každý obrázek se bude muset odpovídajícím způsobem **upravit**.

  - Při **změně tvaru** bude nutné všechny obrázky **přegenerovat**.

  - Kombinovat na jednom obrázku souvislé plochy jedné barvy (okolí) a malé plochy různých barev (fotka) je nevýhoda z hlediska [datové optimalisace obrázků](/optimalisace-obrazku). Ve formátu JPG bude přechod nekvalitní, v případě PNG bude datová velikost enormní.

## Překrytí

Lepší řešení bez `mask` je tedy naposicování samotného okraje přes původní obrázek.

Zobrazit/skrýt „masku“

    .obrazek-maska {
      position: relative;
    }
    .obrazek-maska span {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url(/files/mask/prekryv.png);
      background-size: 100%;
    }
    .obrazek-maska span.skryt {
      display: none;
    }

V hodně případech si jde s takovým postupem vystačit, bohužel trpí docela vážným nedostatkem – okraj **nemůže být průhledný** – musí tam být nějaká barva, aby překryla obrázek. V případě webu s jednobarevným pozadím to nevadí, ale jinak to není ideální.

## Oříznutí pomocí `mask`

Vlastnost `mask` všechny tyto problémy řeší. Bohužel v **IE** není podporována vůbec, ve **Firefoxu** podporuje pouze [SVG](/svg) a v **Chrome**/**Opeře**/**Safari** funguje částečně.

Kromě SVG a jiných obrázků jde použít i [CSS gradient](/gradient).

### Zápis

CSS vlastnost `mask` je zkratkou pro různé další `mask-*` vlastnosti.

```
element {
  mask: url(maska.png);
}
```

  - `mask-type` – může mít hodnoty `alpha` a `luminance`, které stanovují způsob, kterým se určí obsah, který zůstane vidět (zdá se mi, že nic nedělá)

  - `mask-image` – obrázek, který se použije jako maska

  - `mask-size` – velikost masky (funguje podobně jako [`background-size`](/obrazkove-pozadi))

  - `mask-position`, `mask-repeat` – stejné jako u `background-*`

  - `mask-border` – obdoba [`border-image`](/border-image)

[Živá ukázka](http://kod.djpw.cz/wjkb) (funguje jen v **Chrome**, nové **Opeře** apod.)

## Textura

Kromě „oříznutí“ obsahu lze využít masku i k *živému* **překrytí texturou**.

Výsledek v podporovaných prohlížečích:

[Živá ukázka](http://kod.djpw.cz/bkkb)

## Odkazy jinam

  - Viget: [Easy Textures with CSS Masks](http://viget.com/inspire/easy-textures-with-css-masks)

  - HTML5 Rocks: [CSS Masking](http://www.html5rocks.com/en/tutorials/masking/adobe/)

  - CSS-Tricks: [Clipping and Masking in CSS](http://css-tricks.com/clipping-masking-css/)

  - Adobe Web Platform Team: [Praktické použití `mask`](http://blogs.adobe.com/webplatform/2014/01/16/making-the-web-sweeter/)