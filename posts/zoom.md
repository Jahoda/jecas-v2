---
title: "CSS zoom"
headline: "Zvětšení a zmenšení v CSS"
description: "Jak v CSS zoomovat (zvětšovat a zmenšovat) elementy."
date: "2013-12-09"
last_modification: "2015-02-15"
status: 1
tags: ["CSS", "CSS vlastnosti", "Hotová řešení"]
---

Již v prastarých **Internet Explorerech** bylo možné cokoliv zvětšit nestandardní CSS vlastností `zoom`. V **IE**, **Chrome** a nové **Opeře** funguje `zoom` dodnes. Pro zvětšení/zmenšení se zadává buď poměr změny velikosti, nebo procenta.

```
.dvakrat-vetsi {
  zoom: 2;
  /* totéž jako */
  zoom: 200%;
}
```

[Živá ukázka](http://kod.djpw.cz/dkkb)

CSS vlastnost `zoom` funguje v podstatě stejně, jako by se danému elementu zvětšily nebo zmenšily rozměry, písmo a podobně.

Vlastností `zoom` upravený element tak **ovlivní i své okolí**.

## Transformace `scale`

Modernější a podporovaný i ve **Firefoxu** je způsob změny velikosti pomocí CSS transformace `scale`. Element upravený transformací **neovlivňuje své okolí**, což činí úpravy méně náročné na výpočetní výkon (nemusí se přepočítávat umístění okolí).

    - [Jak funguje vykreslování stránky](/vykreslovani) – co prohlížeč dělá se stránkou při načítání a změnách

Z neovlivňování okolí plyne fakt, že zvětšený element bude okolí překrývat.

## Zápis

```
.dvakrat-vetsi {
  transform: scale(2);
}
```

Funkce `scale` může element zvětšovat zvlášť ve směru vodorovném a zvlášť ve směru svislém při zadání dvou parametrů.

```
.dvakrat-sirsi-ctyrikrat-vyssi {
  transform: scale(2, 4);
}
```

Pro změnu velikosti pouze v ose X nebo ose Y existují ještě funkce:

  - `scaleX()`

  - `scaleY()`

```
.dvakrat-sirsi-ctyrikrat-vyssi {
  transform: scaleX(2) scaleY(4);
}
```

    button {
      -webkit-transition: -webkit-transform .5s;
      -moz-transition: .5s -moz-transform;
      -o-transition: .5s -o-transform;
      transition: .5s transform;
    }

    function zvetsit(el) {
      var pomer = (Math.random() * 8) + 0.2;
      var transformace = "scale(" + pomer + ")";
      el.style.webkitTransform = transformace;
      el.style.mozTransform = transformace;
      el.style.oTransform = transformace;
      el.style.MsTransform = transformace;
      el.style.transform = transformace;
    }

    Náhodně změnit velikost

Hezké na změně velikosti pomocí `tranform: scale` je možnost animace pomocí [`transition`](/transition). Stačí přidat jeden řádek (plus případné vlastnosti s [CSS prefixy](/css-prefixy)) a změny velikosti jsou **plynulé**.

```
element {
  transition: 5.s **transform**;
}
```

## Podpora v prohlížečích

Transformace pro zvětšení nebo zmenšení fungují od:

  - **IE 9**,

  - **Chrome 4**,

  - **Opera 11.5**,

  - **Firefox 3.5**,

  - **Safari 3.1**

Pro podporu i ve starších prohlížečích se používají CSS prefixy:

```
.zvetseny {
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
  -o-transform: scale(1.5);
  -ms-transform: scale(1.5);
  transform: scale(1.5);
}
```

## Využití

Transformace `scale` se asi nejvíc hodí pro animované efekty.

### Plynulé zobrazení přes celou obrazovku

Po kliknutí na tlačítko se přes celou obrazovku plynule zobrazí obsah.

#hlaska {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #0D6AB7;
    color: #fff;
    text-align: center;
    transform: scale(0);
    transition: transform .5s;
    display: none;
    z-index: 100;
}
#hlaska.zobrazit {
    transform: scale(1);
}

Zobrazit

    Obsah přes celou obrazovku.

    Skrýt

### Náhled webu

Zmenšením webu v `&lt;iframe>` jde vytvořit okamžitý náhled webu.

  function zobrazitRam(form) {
    document.getElementById("ram").src = form.url.value;
  }

  URL:  Načíst

  .nahled {
      transform: scale(.25);
      transform-origin: 0 0;
      width: 200;
      height: 100px;
  }

Není to ale úplně ideální řešení, protože:

  - stránka může **blokovat zobrazení v rámu**,

  - celý obsah stránky se bude muset **stáhnout**, což bude poměrně datově náročné

Náhled webu se dá snadno získat i jako obrázek:

    - [Jak získat náhled webu?](/nahled-webu)

Pomocí zvětšování/zmenšování jde docílit i různých pěkných efektů.

    - [Magnifier.js](http://mark-rolich.github.io/Magnifier.js/) – zvětšování části obrázku

    - [Zoomerang](http://yyx990803.github.io/zoomerang/) – zvětšení čehokoliv na stránce po kliknutí