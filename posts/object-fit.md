---
title: "Object-fit"
headline: "Object-fit"
description: "CSS vlastnost <code>object-fit</code> umí přizpůsobit obrázek pevné velikosti."
date: "2015-01-21"
last_modification: "2018-09-13"
status: 1
tags: ["CSS", "CSS vlastnosti", "Obrázky"]
---

Pokud na stránce má být něco jako **mřížka z obrázků** a obrázky jsou různě velké, vlastnost `object-fit` přináší jednoduché a elegantní řešení.

Bez `object-fit` si je někdy možné vystačit s nastavení pouze jednoho rozměru (šířky nebo výšky) s tím, že druhý se **dopočítá** – tak je možné alespoň **zachovat poměr stran**.

[Živá ukázka](http://kod.djpw.cz/dmoc)

Pokud by se nastavil **pevný rozměr** pro každý obrázek, **deformace** by byla značná:

[Živá ukázka](http://kod.djpw.cz/emoc)

## Vlastnost `object-fit`

CSS vlastnost `object-fit` má několik hodnot – jsou hodně podobné jako [`background-size`](/obrazkove-pozadi).

Za `&lt;img>` obrázkem může prosvítat jeho pozadí nastavené standardně přes:

```
img {background: **barva**}
```

    function objectFit(hodnota) {
      var styl = ".obrazky img {object-fit: " + hodnota + "; -o-object-fit: " + hodnota + "; width: 180px; height: 150px}";
      document.getElementById("obrazky").innerHTML = styl;
    }

    .obrazky {overflow: hidden}
    .obrazky img {float: left; background: #efefef; outline: 1px solid #fff}

  `object-fit: fill` 
  
    Nastavit Obrázek se roztáhne (a případně zdeformuje) dle zadaných rozměrů. Jako při prostém nastavení `width` a `height`.

  `object-fit: contain`  
  
    **Nastavit Obrázek si zachová poměr stran a roztáhne se tak, aby byl alespoň přes celou jednu stranu**. Může se tedy zmenšit i zvětšit.

  `object-fit: scale-down`  
  
    **Nastavit Chová se hodně podobně jako `contain` – zachovává poměr stran, ale nezvětšuje obrázek nad jeho skutečné rozměry**.

  `object-fit: cover`  
  
    **Nastavit Asi nejzajímavější hodnota. Přizpůsobí obrázek tak, že bude vyplněn celý prostor**. Bude tedy zvětšen nebo zmenšen Kromě toho je obrázek zarovnán na střed.

  `object-fit: none`  
  
    **Nastavit Podobné chování jako `cover`, jen obrázek zůstane v původní velikosti**.

[Samostatná živá ukázka](http://kod.djpw.cz/amoc) s použitím `object-fit: contain`

## Podpora v prohlížečích

  - **Chrome 31**,

  - **Firefox 36**,

  - **Safari 7.1**,

  - **Edge 16** (pouze na značce `&lt;img>`)

  - **Opera 12** s prefixem `-o-` (nefunguje úplně korektně)

Pro starší prohlížeče existuje [polyfill](/polyfill), ale je poměrně datově velký.

    - [object-fit](https://github.com/anselmh/object-fit)

Funkcionalitu `object-fit` lze s dobrou podporou v prohlížečích suplovat nahrazením `&lt;img>` obrázku za CSS pozadí a `background-size`.

```
&lt;style>
.obrazek {
  display: block;
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
}
&lt;/style>
&lt;div class="obrazek" style="background-image: url(obrazek.jpg)">&lt;/div>
```

[Živá ukázka](http://kod.djpw.cz/fmoc)

## Odkazy jinam

  - CSS Tricks: [A Quick Overview of `object-fit` and `object-position`](https://css-tricks.com/on-object-fit-and-object-position/)