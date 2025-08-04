---
title: "Slideshow obrázků"
headline: "Plynulá změna obrázků"
description: "Jak na stránce automaticky plynule měnit obrázky."
date: "2014-12-22"
last_modification: "2014-12-25"
status: 1
tags: ["JavaScript", "Hotová řešení", "Animace", "Obrázky"]
---

Ozvláštnit webovou stránku je možné **obrázkovou galerií**, kde se budou automaticky v určitém **časovém intervalu** prohazovat jednotlivé obrázky.

Rozhodně postup automatické změny nelze doporučit pro vytváření populárních prvků v hlavičkách stránek, kde se střídá důležitý obsah, na který má uživatel kliknout – tzv. **kolotoč** (*carousel*).

    - [Should I Use A Carousel?](http://shouldiuseacarousel.com/)

## Řešení

Cílem je tedy vytvořit box, kde se budou **střídat jednotlivé obrázky** s nějakou plynulou [animací](/webove-animace).

Pro lepší použitelnost se hodí přidat následující dvě funkce:

  - **zastavit přehrávání** při najetí na obrázek,

  - **přeskočit** na další při kliknutí

### Plynulá změna

Asi nejsnazší způsob, jak dosáhnout **plynulého přechodu**, bude změna [průhlednosti](/opacity). Všechny obrázky se dají do společného `&lt;div>`u a [absolutně](/position#absolute) se **naposicují přes sebe**.

Všechny kromě aktivního obrázku budou **100% průhledné** (`opacity: 0`). Aktivní bude naopak neprůhledný (`opacity: 1`). Přidáním [`transition`](/transition) pro průhlednost potom dosáhneme **efektu prolnutí**.

[Živá ukázka](http://kod.djpw.cz/qzib)

### Responsivní

Trochu komplikovanější bude vytvořit celou věc, aby byla [responsivní](/responsive). Nabízí se třeba pro první obrázek (selektor [`:first-child`](/first-last-child)) použít relativní/statickou posici, aby roztáhl obal.

.slideshow {
    width: 600px;
    position: relative;
    max-width: 100%;
}

.slideshow img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    filter: alpha(opacity=0);
    transition: opacity .4s;
}

.slideshow .show {
    opacity: 1;
    filter: alpha(opacity=100);
}

.slideshow .stoped {
    z-index: 1;
}

.slideshow :first-child {
    position: relative; 
    display: block;
}

(function(el, time) {
    var timer;
    var active = 0;
    var img = el.querySelectorAll("img");
    var imgCount = img.length;
    
    function change() {
        img[active].className = "";
      
        if (active == (imgCount - 1)) {
            active = 0;
        }
        else {
            active = active + 1;
        }
        img[active].className = "show";
    }
    
    timer = setInterval(change, time);
    
    el.onmouseover = function() {
        clearInterval(timer);
        img[active].className = "show stoped";
    };
    el.onmouseout = function() {
        timer = setInterval(change, time);
    };    
    el.onclick = change;
})(
    document.querySelector(".slideshow"), 
    3 * 1000 // Doba jednoho obrázku v milisekundách
);

[Samostatná živá ukázka](http://kod.djpw.cz/rzib)

## Možné problémy

Kvůli tomu, že se jednotlivé obrázky překrývají, není možné si snadno přes pravé tlačítko myši aktuální obrázek **uložit**. Ukázka tomu přechází zvýšením [`z-index`u](/position#z-index) při najetí.

V **IE 9** a starších nebude přechod plynulý kvůli nepodpoře `transition`.

Všechny obrázky se začnou načítat spolu se stránkou, ne až v momentě, kdy se mají zobrazit.

## Odkazy jinam

  - [Wrapping around Flickity for infinite looping](http://metafizzy.co/blog/wrapping-around/) – nekonečné vodorovné posouvání obsahu ([GitHub](https://github.com/metafizzy/flickity))

  - [Cross-Fading Background Images](http://demosthenes.info/blog/991/Cross-Fading-Background-Images) – prolínání obrázků