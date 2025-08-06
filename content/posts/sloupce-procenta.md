---
title: "Převod sloupců na procenta"
headline: "Převod sloupců na procenta"
description: "Jak převést fixní sloupcové rozložení na procenta, která se budou přizpůsobovat šířce okna."
date: "2015-08-14"
last_modification: "2015-09-26"
status: 1
tags: ["css", "layout", "responsive"]
format: "html"
---

<p>Při <a href="/prevod-responsivni-design">převodu starého webu na responsivní</a> je typicky nutné <b>převést pevný vícesloupcový layout v pixelech</b> na procenta, která se dokáží přizpůsobovat aktuálně dostupné šířce.</p>

<p>V podstatě k tomu stačí kalkulačka a schopnost počítat s procenty.</p>



<h2 id="kalkulacka">Kalkulačka</h2>

<p>Pro zrychlení procesu jsem si vytvořil automatický převodník v JavaScriptu:</p>

<div class="live nosource kalkulacka">
<form oninput="naprocenta(this)" id="polozky">
<p id="sablona">
    <label>Sloupec <input type="number" value="250" min="0"><code></code><button onclick="odebrat(this)">× Odebrat</button></label>
</p>

<p>
    <label>Sloupec <input type="number" value="500" min="0"><code></code><button onclick="odebrat(this)">× Odebrat</button></label>
</p>   

<p>
    <label>Sloupec <input type="number" value="150" min="0"><code></code><button onclick="odebrat(this)">× Odebrat</button></label>
</p>   
</form>

<button onclick="pridatPole()">+ Přidat sloupec</button>

</div>  
  
  
<h2 id="mezera">Drobná mezera</h2>

<p>Pokud procentuální hodnota vyjde s hodně desetinnými místy, může být <b>problém se zaokrouhlováním</b>, kdy ve finále nedají sloupce dohromady přesně 100 %.</p>

<p>První řešení je lehce změnit poměr sloupců použitím hodnot v procentech bez desetinných míst.</p>

<p>V případě obtékaných (<code><a href="/float">float: left</a></code>) sloupců většinou vadí mezera vpravo za posledním blokem, takže pro poslední sloupec stačí použít <code>float: right</code>. Zaměřit poslední sloupec jde od <b>IE 9</b> CSS selektorem <a href="/css-selektory#prvni-posledni-potomek"><code>:last-child</code></a>:</p>

<pre><code>.sloupec {
  float: left;
} 
.sloupec:last-child {
  float: right;
}</code></pre>





  
  
  
  
  
  
  
<script>
var polozky = document.getElementById('polozky');
var pocetMist = 1;

function zaokrouhlit(cislo) {
  return Math.round(cislo * 1) / 1;
    return parseFloat(cislo.toFixed(pocetMist));
}

function naprocenta(form) {
    var inputy = form.getElementsByTagName("input");
    var pocet = inputy.length;
    var celkem = 0;
    for (var i = 0; i < pocet; i++) {
        celkem += parseInt(inputy[i].value * 1);
    }
    
    var soucet = 0;
    var posledni;
    for (var j = 0; j < pocet; j++) {
      if ((inputy[j].value * 1) <= 0) continue;
        var procent = zaokrouhlit((inputy[j].value * 1) / celkem * 100);
        soucet += procent;
        inputy[j].nextSibling.innerHTML = procent + "%";
        posledni = inputy[j];
    }
   if (posledni) {
     posledni.nextSibling.innerHTML = parseFloat(posledni.nextSibling.innerHTML) + (100 - soucet) + "%";
   }
}

var prvniPolozka = document.getElementById('sablona');
var sablona = prvniPolozka.cloneNode(true);

function pridatPole() {
    var kopie = sablona.cloneNode(true);
    polozky.appendChild(kopie);
    kopie.getElementsByTagName("input")[0].value = "0";
    kopie.getElementsByTagName("input")[0].focus();
    kopie.getElementsByTagName("input")[0].select();
}

function odebrat(el) {
    var polozka = el.parentNode;
    polozka.parentNode.removeChild(polozka);
    naprocenta(polozky);
}
  
naprocenta(polozky);
</script>  

<style>
  .kalkulacka code {
    width: 5em;
    text-align: center;
    display: inline-block;
    margin: 0 1em;
  }</style>

<!-- samostatná ukázka: https://kod.djpw.cz/ekqb -->

