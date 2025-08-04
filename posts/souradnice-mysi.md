---
title: "Zjištění souřadnic kursoru"
headline: "Zjištění souřadnic myši"
description: "Jak v JavaScriptu zjistit aktuální souřadnice myši (kursoru)."
date: "2013-09-14"
last_modification: "2013-11-14"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

V některých situací (jako třeba u [efektu baterky](/baterka) nebo [kontextové nabídky](/kontextova-nabidka)) je třeba skriptem sledovat, **kde je umístěn kursor**. Universální JS funkce sjednocující chování napříč prohlížeči (hlavně **IE** a ostatní prohlížeče) může vypadat takto:

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

Použití je potom následovné:

```
var souradnice = getPosition(e);
```

  - V `souradnice.x` bude **X-ová souřadnice** (nebo také `left` hodnota).

  - V `souradnice.y` bude **Y-ová souřadnice** (nebo také `top` hodnota).

Při nastavování CSS se **nesmí zapomenout** na přidání jednotky `px`.

```
neco.style.left = souradnice.x + "px";
neco.style.top = souradnice.y + "px";
```

Při používání funkce je nutné předávat `event`.

```
&lt;script>
function funkce(**e**) {
  var souradnice = getPosition(**e**);
}
&lt;/script>
&lt;p onclick='funkce(**event**)'>
```