---
title: "Spuštění JS načteného AJAXem"
headline: "Vykonání JS načteného AJAXem"
description: "Jak provést JavaScript, který je ve stránce načítané AJAXem."
date: "2015-10-18"
last_modification: "2015-10-21"
status: 1
tags: ["hotova-reseni", "js", "js-ajax"]
format: "html"
---

<p>S využitím <a href="/zmena-url"><code>history.pushState</code></a> a změnou URL bez znovunačtení stránky není problém celý web načítat <a href="/ajax">AJAXem</a>.</p>

<p>Jeden menší problém ale AJAXem stahovaný obsah má – <b>vykonání skriptů</b> ve značce <code>&lt;script></code>.</p>

<p>Stránka obsahující následující skript, který nastaví barvu jejího odstavce na červenou, se po načtení AJAXem nevykoná.</p>

<pre><code>&lt;p>Stránka&lt;/p>
&lt;script>
  document.querySelectorAll("p")[0].style.color = "red";
&lt;/script></code></pre>






<h2 id="eval">Příkaz <code>eval</code></h2>

<p>Callback funkce pro nastavení obsahu stránky, která dostane obsah AJAXem získané stránky, může vypadat následovně:</p>

<pre><code>function vypsat(data) {
  var obsah = document.getElementById("obsah");
  obsah.innerHTML = data;
  // oživení skriptů
  var scripty = obsah.getElementsByTagName('script');
  for (var i = 0; i &lt; scripty.length; i++) {
    <b>eval</b>(scripty[i].innerHTML);			
  }
}</code></pre>








<p>Na začátku se nastaví asynchronně získaný obsah do elementu <code>#obsah</code>. V něm se následně najdou značky <code>&lt;script></code> a jejich kód se provede pomocí <code>eval</code>u.</p>

<p>Odstavec z předchozí ukázky už bude červený.</p>




<h3 id="funkce">Volání funkce</h3>

<p>Co ale v případě, že bude mít stahovaná stránka ve značce <code>&lt;script></code> definici funkce, která se má později volat:</p>

<pre><code>&lt;p>Stránka&lt;/p>
&lt;script>
  function naCerveno() {
    document.querySelectorAll("p")[0].style.color = "red";
  }
&lt;/script>
&lt;button onclick="naCerveno()">Načerveno&lt;/button></code></pre>







<p>Použití <code>eval</code>u proměnnou/funkci <code>naCerveno</code> nevytvoří.</p>

<p><img src="/files/ajax-spusteni-skriptu/undefined.png" alt="Nedefinovaná proměnná" class="border"></p>











<h2 id="vytvoreni">Vytvoření <code>&lt;script></code>u</h2>

<p>Další možnost je dynamicky vytvořit nové značky <code>&lt;script></code>, vložit do nich příslušný kód a přidat je do stránky:</p>

<pre><code>// Vytvoření značky
var novyScript = document.createElement("script");
// Nastavení obsahu skriptu do innerHTML
novyScript.innerHTML = scripty[i].innerHTML;
// Přidání skriptu do stránky
document.body.appendChild(novyScript);</code></pre>






<p>Celý kód:</p>

<pre><code>function vypsat(data) {
  var obsah = document.getElementById("obsah");
  obsah.innerHTML = data;
  // oživení skriptů
  var scripty = obsah.getElementsByTagName('script');
  for (var i = 0; i &lt; scripty.length; i++) {
    var novyScript = document.createElement("script");
    novyScript.innerHTML = scripty[i].innerHTML;
    document.body.appendChild(novyScript);
  }
}</code></pre>












<p>Při tomto postupu není problém s voláním definované funkce.</p>



<h2 id="img-onload">Skript v <code>&lt;img onload></code></h2>

<p>Bez nutnosti procházet na stránce jednotlivé skripty a oživovat je se dá využít umístění skriptu do <code>on*</code> atributu, který se sám zavolá.</p>

<p>K tomu jde použít událost <code>onload</code> u obrázku. Pokud se jako <code>src</code> uvede soubor, který se stejně načítá, nezpůsobí to ani zbytečné stahování dat.</p>

<pre><code>&lt;img src="logo.png" <b>onload</b>="// JS kód"></code></pre>




<p>Použít by šla i událost <code>onerror</code>, ale bylo by kvůli ní nutné načíst něco neexistujícího.</p>

<p>Onload jde použít pouze ke spuštění nadeklarované funkce. V něm vytvořené funkce by se musely přiřazovat do <code>window</code>, aby byly dostupné:</p>

<pre><code>onload="window.naCerveno = function() {…}"</code></pre>








<h2 id="oddeleni">Oddělení JS a HTML</h2>

<p>Někteří lidé zastávají myšlenku <b>striktního oddělení HTML kódu a JavaScriptu</b>.</p>

<p>JS funkce jsou ve zvláštním souboru a jednotlivým elementům jsou až následně přiřazovány.</p>

<pre><code>element.onclick = naCerveno;</code></pre>

<p>Skript si tedy nejprve najde potřebný element a nastaví mu, co má dělat při požadované události.</p>

<div class="internal-content">
  <ul>
    <li><a href="/pripojeni-udalosti">Navázání událostí v JavaScriptu</a></li>
  </ul>
</div>

<p>Při tomto postupu stačí na AJAXem vypsaný obsah všechny události navázat.</p>