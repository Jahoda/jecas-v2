---
title: "JS náhrada atributu ismap"
headline: "JavaScriptová simulace atributu <code>ismap</code>"
description: "HTML atribut <a href="http://www.jakpsatweb.cz/clanky/fosilie-ismap.html"><code>ismap</code></a> umí zjistit souřadnice při kliknutí na obrázek. Jak na to v JS?"
date: "2013-10-21"
last_modification: "2013-10-21"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<h2>Zjištění souřadnic při kliknutí</h2>
<p>Při <b>kliknutí na obrázek</b> se od souřadnic kliknutí počítaných v rámci celé stránky (<code>event.pageX</code>/<code>Y || event.clientX</code>/<code>Y</code>) odečte umístění souřadnic obrázku (<code>obrazek.offsetLeft</code>/<code>Top</code>).</p>
<div class="live">
  <div style="border: 1px solid #fff; cursor: crosshair; position: relative; width: 135px" id=obr>
    <img src="/images/logo2.png">
  </div>
  <dl>
    <dt>X<dd><input name=x id=x>
    <dt>Y<dd><input name=y id=y>
  </dl>
<script>
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
</script>

</div>