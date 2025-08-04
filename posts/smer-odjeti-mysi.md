---
title: "Směr odjetí myši"
headline: "Směr přijetí/odjetí myši z elementu"
description: "Jak zjistit, kterým směrem myš opustila element nebo odkud na něj přijela?"
date: "2013-05-30"
last_modification: "2013-11-09"
status: 1
tags: ["JavaScript"]
---

Pro vytváření působivějších [animací](/animace) při najetí nebo odjetí myší z elementu může být zajímavé zjistit směr, kterým kursor přijel/odjel.

Jak na to? Na jednotlivé strany umístit [absolutně posicovaná](/position#absolute) „čidla“.

    .smer {height: 200px; width: 400px; margin: 1em; background: yellow; position: relative}
    .smer .cidlo {position: absolute; opacity: .5}
    .smer .top {background: red; width: 100%; height: 10px; top: 0}
    .smer .right {background: blue; height: 100%; width: 10px; right: 0; top: 0}
    .smer .bottom {background: green; width: 100%; height: 10px; bottom: 0; left: 0;}
    .smer .left {background: black; height: 100%; width: 10px; top: 0; left: 0}
    .smer p {text-align: center; line-height: 200px;}

    function odkud(smer) {
      document.getElementById("vypis-smeru").innerHTML = smer;
    }
    function dovnitrVen(kam) {
      document.getElementById("dovnitr-ven").innerHTML = kam;
    }

Problém může nastat, když průjezd myší proběhne **ve velmi vysoké rychlosti**. Čím větší bude plocha oněch čidel, tím zachytí větší rychlost. Nicméně větší velikost zase způsobí větší  **nepřesnosti v rozích**, protože *čidla* není možné šikmo uříznout, takže příjezd myší 10 pixelů zdola v levém rohu se bude hlásit jako „zleva“.

    .obrazek {position: relative; width: 200px; height: 100px; overflow: hidden; display: inline-block;}
    .popisek {position: absolute; background: rgba(255, 255, 255, .7); line-height: 30px; width: 100%; opacity: 0; left: 0}
    .obrazek .cidlo {position: absolute}
    .obrazek .top {width: 100%; height: 20px; top: 0}
    .obrazek .right {height: 100%; width: 20px; right: 0; top: 0}
    .obrazek .bottom {width: 100%; height: 20px; bottom: 0; left: 0;}
    .obrazek .left {height: 100%; width: 20px; top: 0; left: 0}
    
    @keyframes zleva {
      from {right: 100%; display: block;}
      to {right: 0}
    }
    @keyframes zprava {
      from {left: 100%}
      to {left: 0}
    }
    @keyframes shora {
      from {top: 0}
      to {top: 70px}
    }
    @keyframes zdola {
      from {bottom: 0}
      to {bottom: 70px}
    }    
    .zleva .popisek {animation: zleva .3s linear forwards; left: auto; top: 35px; opacity: 1}
    .zprava .popisek {animation: zprava .3s linear forwards; left: auto; top: 35px; opacity: 1}
    .shora .popisek {animation: shora .3s linear forwards; left: 0; opacity: 1}
    .zdola .popisek {animation: zdola .3s linear forwards; left: 0; opacity: 1}    

    function najeto(el, smer) {
      el.parentNode.className = (el.parentNode.className == "") ? smer : "";
    }

      Popisek obrázku

[DJPW](http://diskuse.jakpsatweb.cz/?action=vthread&forum=8&topic=149113)-->