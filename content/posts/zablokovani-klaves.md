---
title: "Zablokování kláves"
headline: "Zablokování některých kláves"
description: "Zablokování určitých kláves (šipek) pomocí JavaScriptu."
date: "2013-05-11"
last_modification: "2013-05-11"
status: 1
tags: ["js"]
format: "html"
---

<p>Na stránce by nemělo jít <b>rolovat pomocí šipek</b>. Je to dost nepříjemné, lepší by bylo klávesám přidat raději nějakou zajímavou funkci (třeba umožnit menu s více úrovněmi ovládat jen z klávesnice).</p>
<p>Zablokovány jsou <b>šipky i ve formulářích</b>. Omezit blokování jen na <b>některé značky</b> lze řešit výjimkou pomocí <code>event.target</code> nebo <code>event.srcElement</code>.</p>

<div class="live">
  <script>
    document.onkeydown = function(e) {
        var event = window.event || e;
        var kod = event.keyCode;
        
        // http://www.javascripter.net/faq/keycodes.htm
        // 37      Left arrow
        // 38      Up arrow
        // 39      Right arrow
        // 40      Down arrow
    
        if (kod >= 37  && kod <= 40) {
            return false;
        }
    }
  </script>
  <input value="test">
</div>
