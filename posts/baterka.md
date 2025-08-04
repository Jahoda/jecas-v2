---
title: "Baterka v CSS a JavaScriptu"
headline: "Vytvoření efektu baterky v CSS a JS"
description: "Jak jednoduše vytvořit na stránce efekt baterky? Tedy ztmavit web a prohlížet ho jakýmsi průzorem."
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení"]
---

.js .baterka {
    display: none;
    position: absolute; 
    top: 0; 
    left: 0; 
    background: url("/files/baterka/baterka.png") center center no-repeat; 
    width: 100%; 
    height: 100%; 
    opacity: 0.7; -moz-opacity: 0.7; filter:alpha(opacity=70);
}

var b = document.getElementById("baterka");

function getPosition(e) {
    e = e || window.event;
    var cursor = {x:0, y:0};

    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } 
    else {
        cursor.x = e.clientX + 
            (document.documentElement.scrollLeft || 
            document.body.scrollLeft) - 
            document.documentElement.clientLeft;
        cursor.y = e.clientY + 
            (document.documentElement.scrollTop || 
            document.body.scrollTop) - 
            document.documentElement.clientTop;
    }
    return cursor;
}
  
document.onmousemove = function(e){ moveLight(e); }
document.onmousewheel = function(){ moveLight(); } /* IE7, IE8 */
if(document.addEventListener){ /* Chrome, Safari, Firefox */
    document.addEventListener('DOMMouseScroll', moveLight, false);
}

function moveLight(e) {
    var cursorPos = getPosition(e);
    b.style.backgroundPosition = (cursorPos.x - 2500) + "px " + (cursorPos.y - 2500) + "px";
}

Vypnout baterku
Zapnout baterku

Řešení je možná jednodušší, než se zdá.

Základem je velký černý obrázek s průhlednou dírou uprostřed (asi by mohl mít větší rozměr než 5000 × 5000 px),
ten se nastaví elementu roztaženému přes celou stránku jako `background-image`,
  pomocí [`opacity`](/opacity) (popřípadě pro starší Explorery `filter:alpha(opacity=**XX**)`) se nastaví úroveň *tmy*,
JavaScript bude tento obrázek posouvat dle pohybu myši a tím vytvářet výsledný efekt.

## Funkce pro zjištění posice kursoru

To je nějaká hotová funkce sjednocující chování napříč prohlížeči.
```
function getPosition(e) {
    e = e || window.event;
    var cursor = {x:0, y:0};

    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } 
    else {
        cursor.x = e.clientX + 
            (document.documentElement.scrollLeft || 
            document.body.scrollLeft) - 
            document.documentElement.clientLeft;
        cursor.y = e.clientY + 
            (document.documentElement.scrollTop || 
            document.body.scrollTop) - 
            document.documentElement.clientTop;
    }
    return cursor;
}
```

## CSS

```
.baterka {
    position: absolute; 
    top: 0; 
    left: 0; 
    background: url("baterka.png") center center no-repeat; 
    width: 100%; 
    height: 100%; 
    opacity: 0.7; -moz-opacity: 0.7; filter:alpha(opacity=70); /* průhlednost na 70 % */
}
```

## JavaScript

```
document.onmousemove = function(e) {
    var cursorPos = getPosition(e); // zjištění posice kursoru
    /* Nastavení posice obrázku, 2500 je polovina šířky „obrázku s dírou“ */
    b.style.backgroundPosition = (cursorPos.x - 2500) + "px " + (cursorPos.y - 2500) + "px";
};
```