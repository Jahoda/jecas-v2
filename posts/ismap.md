---
title: "JS náhrada atributu ismap"
headline: "JavaScriptová simulace atributu <code>ismap</code>"
description: "HTML atribut <a href=\"http://www.jakpsatweb.cz/clanky/fosilie-ismap.html\"><code>ismap</code></a> umí zjistit souřadnice při kliknutí na obrázek. Jak na to v JS?"
date: "2013-10-21"
last_modification: "2013-10-21"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

## Zjištění souřadnic při kliknutí

Při **kliknutí na obrázek** se od souřadnic kliknutí počítaných v rámci celé stránky (`event.pageX`/`Y || event.clientX`/`Y`) odečte umístění souřadnic obrázku (`obrazek.offsetLeft`/`Top`).

    X
    Y

var obr = document.getElementById("obr");
var x = document.getElementById("x");
var y = document.getElementById("y");

obr.onclick = function(e) {
    var event = e || window.event;
    var cX = (event.pageX || event.clientX) - obr.offsetLeft;
    var cY = (event.pageY || event.clientY) - obr.offsetTop;
    
    x.value = cX;
    y.value = cY;
    
    location.hash = "?" + cX + "," + cY;
};