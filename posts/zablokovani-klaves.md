---
title: "Zablokování kláves"
headline: "Zablokování některých kláves"
description: "Zablokování určitých kláves (šipek) pomocí JavaScriptu."
date: "2013-05-11"
last_modification: "2013-05-11"
status: 1
tags: ["JavaScript"]
---

Na stránce by nemělo jít **rolovat pomocí šipek**. Je to dost nepříjemné, lepší by bylo klávesám přidat raději nějakou zajímavou funkci (třeba umožnit menu s více úrovněmi ovládat jen z klávesnice).

Zablokovány jsou **šipky i ve formulářích**. Omezit blokování jen na **některé značky** lze řešit výjimkou pomocí `event.target` nebo `event.srcElement`.

    document.onkeydown = function(e) {
        var event = window.event || e;
        var kod = event.keyCode;
        
        // http://www.javascripter.net/faq/keycodes.htm
        // 37      Left arrow
        // 38      Up arrow
        // 39      Right arrow
        // 40      Down arrow
    
        if (kod >= 37  && kod