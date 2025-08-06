---
title: "Zjištění skutečných rozměrů obrázku"
headline: "Skutečné rozměry obrázku"
description: "Jak může JavaScript zjistit skutečnou výšku a šířku obrázku."
date: "2013-08-22"
last_modification: "2013-08-22"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>V novějších prohlížečích, než je <b>Internet Explorer 8</b>, lze použít <code>obrazek.<b>naturalWidth</b></code>, respektive <code>obrazek.<b>naturalHeight</b></code>.</p>
<pre><code>&lt;img src="logo.png" <b>width=500 height=100</b> id=obrazek&gt;</code></pre>

<div class="live">
  <img src="/images/logo2.png" width=500 height=100 id=obrazek>
  <script>
    function skutecnyRozmer(obr) {
      alert("Skutečná šířka: " + obr.naturalWidth + " a výška: " + obr.naturalHeight);
    }
  </script>
</div>

<p><button onclick="skutecnyRozmer(document.getElementById('obrazek'))">Skutečný rozměr</button></p>

<p>Ve starších prohlížečích lze využít načtení pomocného obrázku pomocí <code>new Image()</code> (podobně jako při testování, zda <a href="/existence-obrazku">obrázek existuje</a>).</p>

<pre><code>function zjistitSkutecnyRozmer(obr) {
    var pomocnyObrazek = new Image();
    pomocnyObrazek.src = obr.src;
    return {
      sirka: pomocnyObrazek.width, 
      vyska: pomocnyObrazek.height
    };
  }
</code></pre>

<p><b>Použití:</b></p>
<pre><code>var obrazek = document.getElementById('obrazek');
var skutecna = zjistitSkutecnyRozmer(obrazek);
alert(
  "Skutečná šířka: " + skutecna.sirka + 
  " a výška: " + skutecna.vyska
);
</code></pre>

<div class="live">
  <img src="/images/logo2.png" width=500 height=100 id=obrazek2>
  <script>
    function zjistitSkutecnyRozmer(obr) {
      var pomocnyObrazek = new Image();
      pomocnyObrazek.src = obr.src;
      return {
        sirka: pomocnyObrazek.width, 
        vyska: pomocnyObrazek.height
      };
    }
    
    function vypisSkutecnyRozmer(obrazek) {
      var skutecna = zjistitSkutecnyRozmer(obrazek);
      alert("Skutečná šířka: " + skutecna.sirka + " a výška: " + skutecna.vyska);
    }
  </script>
</div>  
<p><button onclick="vypisSkutecnyRozmer(document.getElementById('obrazek2'))">Skutečný rozměr</button></p>

<!-- https://kod.djpw.cz/cegb -->