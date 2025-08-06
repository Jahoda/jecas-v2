---
title: "CSS šipky (trojúhelníky)"
headline: "Generátor CSS šipek"
description: "Generátor šipek/trojúhelníků přímo v CSS pomocí okrajů. Funkční i ve starých IE."
date: "2014-01-15"
last_modification: "2014-01-18"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<p>Nastavením vyšší šířky <b>okrajů</b> a vynulováním <b>výšky a šířky</b> můžeme docílit vykreslení trojúhelníku přímo v CSS (více o <a href="/css-kresleni">kreslení pomocí CSS</a>).</p>

<p>Jelikož zápis není na první pohled úplně intuitivní, hodí se pro vytváření potřebných šipek použít generátor výsledného CSS.</p>

<div class="live">
  <style>.nahled {border: 1px solid #fff; display: inline-block; margin: .1em}</style>
<style id="sipky"></style>
  
<script>
function vykreslit() {
  var border = document.getElementById("borderWidth").value;
  var borderSide = document.getElementById("borderSideWidth").value;
  var color = document.getElementById("color").value;
  var css = ".sipka {border: " + border + " solid transparent; width: " + document.getElementById("width").value + "; height: " + document.getElementById("height").value + "; display: inline-block; position: relative}\n";
  var posun = (parseInt(border)/2) + "px";
  css += ".sipka.dolu {border-top: " + borderSide + " solid " + color + "; top: " + posun + "}\n";
  css += ".sipka.vlevo {border-right: " + borderSide + " solid " + color + "; left: -" + posun + "}\n";
  css += ".sipka.vpravo {border-left: " + borderSide + " solid " + color + "; left: " + posun + "}\n";  
  css += ".sipka.nahoru {border-bottom: " + borderSide + " solid " + color + "; top: -" + posun + "}\n";    
  document.getElementById("vystup").innerHTML = css;
  document.getElementById("sipky").innerHTML = css;
}
</script>  

<form action="?" onsubmit="vykreslit(); return false" id="generator">
<label>Šířka okraje: <input id="borderWidth" type="text" value="20px"></label><br>
<label>Šířka barevného okraje: <input id="borderSideWidth" type="text" value="20px"></label><br>
<label>Šířka (<code>width</code>): <input id="width" type="text" value="0px"></label><br>
<label>Výška (<code>height</code>): <input id="height" type="text" value="0px"></label><br>
<label>Barva: <input id="color" type="color" value="#DA3F94"></label><br>
  
  <p><button type="submit">Přegenerovat</button></p>

<div class="nahled"><div class="sipka dolu"></div></div>  
<div class="nahled"><div class="sipka vlevo"></div></div>
<div class="nahled"><div class="sipka vpravo"></div></div>
<div class="nahled"><div class="sipka nahoru"></div></div>


<pre><code id="vystup"></code></pre>
</form>
<script>
  vykreslit();
  var inputs = document.getElementById("generator").getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onchange = inputs[i].onkeyup = vykreslit;
  }
</script>
</div>

<p><a href="https://kod.djpw.cz/pfbb">Samostatný generátor</a>.</p>