---
title: "Jak vytvořit ovál/elipsu v CSS"
headline: "Elipsa/ovál v CSS"
description: "Jak pomocí CSS nakresli ovál."
date: "2015-04-19"
last_modification: "2015-07-11"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<p>V některých případech se hodí <a href="/css-kresleni">kreslit pomocí CSS</a> – může to být rychlejší než příprava obrázku v grafickém editoru.</p>

<p>Kruh jde vytvořit pomocí <a href="/border-radius">zakulacení rohů</a> (CSS vlastnost <code>border-radius</code>).</p>

<div class="live">
  <style>
    .kruh {
      border-radius: 100px;
      width: 100px;
      height: 100px;
      background: #0D6AB7;
    }
  </style>
  <div class="kruh"></div>
</div>

<p>Udělat z kruhu <b>ovál</b> jde potom změnou proporcí elementu (poměr výšky a šířky).</p>

<p><label>Změnit šířku: <input type="range" min="0" max="300" value="200" oninput="pomer(this.value, document.querySelector('.oval'))"></label></p>

<div class="live">
  <style>
    .oval {
      border-radius: 100px;
      width: 200px;
      height: 100px;
      background: #0D6AB7;
    }
  </style>
  <div class="oval"></div>
</div>

<p>Pro vytvoření <b>elipsy</b> poslouží možnost uvést druhý radius za lomítko.</p>

<pre><code>border-radius: <span id="vypis">100px / 50px</span>;
height: <span id="vypisVysky">100px</span>;
width: <span id="vypisSirky">200px</span>;
</code></pre>
<form oninput="zmenit(this)">
  <p><label>Změnit výšku: <input type="range" min="0" max="300" value="100" name="vyska"></label></p>
  
  <p><label>Změnit šířku: <input type="range" min="0" max="300" value="200" name="sirka"></label></p>  
  
  <p><label>Změnit první radius: <input type="range" min="0" max="300" value="100" name="radius1"></label></p>
  
  <p><label>Změnit druhý radius: <input type="range" min="0" max="300" value="50" name="radius2"></label></p>
</form>
  
<div class="live">
  <style>
    .elipsa {
      border-radius: 100px / 50px;
      width: 200px;
      height: 100px;
      background: #0D6AB7;
    }
  </style>
  <div class="elipsa"></div>
</div>

<script>
  function pomer(sirka, el) {
    el.style.width = parseInt(sirka) + "px";
  }
  
  function zmenit(f) {
    var elipsa = document.querySelector('.elipsa');
    var sirkaVypis = f.sirka.value + "px";
    var vyskaVypis = f.vyska.value + "px";
    elipsa.style.width = sirkaVypis;
    elipsa.style.height = vyskaVypis;
    var radius = f.radius1.value + "px / " + f.radius2.value + "px";
    elipsa.style.borderRadius = radius;
    document.getElementById("vypis").innerHTML = radius;
    document.getElementById("vypisSirky").innerHTML = sirkaVypis;
    document.getElementById("vypisVysky").innerHTML = vyskaVypis;
  }
</script>
