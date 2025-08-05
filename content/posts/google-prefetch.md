---
title: "Google zrychlil načítání na mobilech"
headline: "Google zrychlil načítání na mobilech"
description: "Jak Google zrychlil načítání stránek z výsledků hledání o 150 milisekund."
date: "2014-12-11"
last_modification: "2014-12-11"
status: 1
tags: ["google", "seo", "zrychlovani"]
format: "html"
---

<p>Funkce nazvaná <i>reactive prefetch</i> (volný český překlad by mohl být <i>přednačítání po akci</i>) je podporována zatím pouze v <b>Chrome</b> na Androidu. Funguje to tak, že při <b>kliknutí na výsledek vyhledávání</b> dostane prohlížeč informaci o kritických částech stránky – například CSS, které může <a href="/nacitani-css">blokovat vykreslování</a> – a začne je stahovat zároveň s obsahem stránky.</p>

<p><img src="/files/google-prefetch/klasicky.png" alt="Standardní načítání" class="border"></p>





<p>Místo standardního průběhu, kdy se čeká na <b>odezvu serveru</b> pro získání HTML stránky, které následně připojí CSS, umožní toto řešení <b>paralelně načítat</b> CSS už při kliknutí ve vyhledávání.</p>

<p><img src="/files/google-prefetch/prefecht.png" alt="Použití reactive prefetch" class="border"></p>













<p>Celé to může fungovat díky tomu, že Google zná stránku, kterou ve výsledcích vyhledávání zobrazuje. Dokáže u ní proto odhadnout <i>kritické styly</i> a podobně.</p>

<p>Dobré na tom je, že se <b>neplýtvá daty</b> jako u běžných <i>preloaderů</i>, kdy se dopředu načítá obsah, který by <b>mohl návštěvníka zajímat</b>, ale ještě nevykonal konkrétní akci pro jeho získání.</p>





<h2 id="reseni">Řešení v JavaScriptu</h2>


<p><img src="/files/google-prefetch/reactive-prefetch.png" alt="Reactive prefetch ve výsledcích vyhledávání" class="border"></p>


<p>Celé přednačtení potom spočívá ve vytvoření <code>&lt;link></code>u:</p>

<pre><code>&lt;link rel="<b>prefetch</b>" href="http://example.com/styl.css"></code></pre>

<p>To v JS může vypadat následovně:</p>

<pre><code>function reactivePrefetch(url) {
  var hint = document.createElement("link");
  hint.rel = "<b>prefetch</b>";
  hint.href = url;
  document.getElementsByTagName("head")[0].appendChild(hint);
}</code></pre>











<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Ilya Grigorik: <a href="https://plus.google.com/u/0/+IlyaGrigorik/posts/ahSpGgohSDo"> 
Google mobile search is getting faster - to be exact, 100-150 milliseconds faster!</a></li>
</ul>