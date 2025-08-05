---
title: "Generátor náhodných čísel"
headline: "Zobrazení náhodného čísla"
description: "Jak vygenerovat náhodné číslo z určitého rozsahu v JavaScriptu a PHP."
date: "2015-02-15"
last_modification: "2015-02-21"
status: 1
tags: ["hotova-reseni", "js", "php"]
format: "html"
---

<div class="live">
  <style>
    .nahodne button {
      min-width: 4em;
      padding: .5em;
      font-size: 150%;
      margin: auto;
      display: block;
    }
  </style>
  <p class="nahodne">
    <button onclick="
    this.innerHTML = Math.floor((Math.random() * 10) + 1)
    ">
      Náhodné číslo 1 až 10
    </button>  
  </p>
  <p class="nahodne">
    <button onclick="
    this.innerHTML = Math.floor((Math.random() * 2)) ? 'Ano' : 'Ne'
    ">
      Ano, nebo ne?
    </button>  
  </p>
</div>

<h2 id="generator">Generátor kódu pro náhodná čísla</h2>

<p>Následující generátor po zadání nejnižšího a nejvyššího čísla připraví JS/PHP kód, který slouží k vygenerování náhodného čísla z daného rozsahu.</p>

<div class="live no-source">
<form oninput="prepocitat(this)" onsubmit="prepocitat(this); return false">
  <p><label>Od: <input type="number" name="od" value="1"></label> (včetně)</p>
  <p><label>Do: <input type="number" name="do" value="10"></label> (včetně)</p>
  <p><label>Počet možných čísel: <input type="number" name="kolik" value="10" disabled></label></p>
  <button>Vygenerovat</button><span id="priklad"></span>  
  
  <p><b>JavaScript</b>:</p>
  <pre><code>var nahodne = Math.floor((Math.random() * <span id="kolik">10</span>) + <span id="od">1</span>);</code></pre>
  
  <p><b>PHP</b>:</p>
  <pre><code>mt_rand(<span id="od-php">1</span>, <span id="do-php">10</span>);</code></pre>  
</form>
</div>




<h2 id="js">Náhodné číslo v JavaScriptu</h2>

<p>V JS se pro generování náhodného čísla používá <code>Math.random()</code>.</p>

<pre><code>var nahodne = Math.random();</code></pre>



<p>V proměnné <code>nahodne</code> bude něco mezi 0 a 1, například <code>0.6577748781199532</code>. Vyjít může i přesná nula, ale vždy bude číslo menší než 1.</p>

<p>Protože je zpravidla nutné mít čísla celá, násobí se to celé počtem požadovaných čísel. Tj. pro vygenerování deseti čísel:</p>

<pre><code>nahodne = nahodne * 10;</code></pre>




<p>Obsah <code>nahodne</code> teď bude něco jako <code>6.577748781199532</code>. Pro dosažení celých čísel se potom provede <b>zaokrouhlení</b>.</p>

<pre><code>nahodne = Math.floor(nahodne);</code></pre>


<p>A výsledkem je <code>6</code>. Metoda <code>Math.floor</code> zaokrouhluje dolů, takže výsledek bude nabývat hodnot 0 až 9. Použití jiného způsobu zaokrouhlení (<code>Math.round</code>/<code>Math.ceil</code>) by vedlo k nerovnoměrnému rozdělení jednotlivých čísel.</p>

<p>Následný obrázek srovnává četnosti jednotlivých čísel při různých způsobech zaokrouhlení.</p>

<p><img src="/files/nahodne-cislo/cetnost.png" alt="Četnosti čísel" class="border"></p>















<p><a href="http://kod.djpw.cz/etkb">Skript pro výpočet četnosti</a></p>

<p>Je-li cílem dostat místo 0–9 číslo z rozsahu 1 až 10, stačí přičíst jedničku.</p>

<pre><code>nahodne = nahodne + 1;</code></pre>



<h2 id="php">Náhodné číslo PHP</h2>

<p>V PHP existuje funkce <code>mt_rand</code>, které se přímo zadává rozsah čísel, ze kterých se má výsledek vygenerovat.</p>

<p>Obě čísla parametrů znamenají <b>včetně</b>, takže následující kód vygeneruje čísla 1–10.</p>

<pre><code>mt_rand(1, 10);</code></pre>




<h2 id="stejne">Stále stejné náhodné číslo</h2>

<p>Zvlášť při malém počtu čísel a malém počtu opakování se může stát, že bude nějaké číslo padat podezřele často.</p>

<figure>
  <img src="/files/nahodne-cislo/cetnost-10.png" alt="Graf četnosti malého počtu generování" class="border">
  <figcaption>Četnost náhodných čísel z rozsahu 0–9 při pouhých deseti opakováních</figcaption>
</figure>







<p>Pokud prvek náhody nemusí být matematicky <b>přesný</b>, ale jde hlavně o dojem uživatele, dá se tomu trochu pomoci. Například zabránit vygenerování téhož čísla dvakrát po sobě.</p>

<p><a href="http://kod.djpw.cz/otkb">Ukázka</a> – nikdy se nevygeneruje stejné číslo dvakrát za sebou</p>

<p>Pokud je navíc cílem <b>zobrazit všechny náhodné</b> položky, hodí se ještě požadovat, aby se nějaké číslo mohlo vygenerovat podruhé až v okamžiku, kdy každé číslo z rozsahu už alespoň jednou padlo.</p>

<p><a href="http://kod.djpw.cz/stkb">Živá ukázka</a></p>

<p>V případě <b>PHP</b> je nutné vygenerovaná náhodná čísla někam ukládat – například do pole <code>$_SESSION</code>.</p>




<h2 id="vyuziti">Využití</h2>

<p>Na základě vygenerování náhodného čísla se dá potom i <a href="/random">vypisovat náhodný obsah</a>.</p>


<script>
  var priklad = document.getElementById("priklad");
  var kolik = document.getElementById("kolik");
  var od = document.getElementById("od");
  var odPhp = document.getElementById("od-php");
  var doPhp = document.getElementById("do-php");
  function prepocitat(form) {
    form.kolik.value = form.do.value - form.od.value + 1;
    // JS
    kolik.innerHTML = form.kolik.value;
    od.innerHTML = form.od.value;
    
    // PHP
    odPhp.innerHTML = form.od.value;
    doPhp.innerHTML = form.do.value;
    
    priklad.innerHTML = Math.floor((Math.random() * parseFloat(form.kolik.value)) + parseFloat(form.od.value));
  }
</script>

<style>
  #priklad {
    margin-left: 1em;
  }
</style>