---
title: "Posun v poli přes okraje"
headline: "Posun v poli přes okraje"
description: "Jak se z poslední položky pole dostat na první a obráceně."
date: "2015-01-07"
last_modification: "2015-01-08"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Při vytváření např. <b>obrázkových galerií v JavaScriptu</b> je často cílem dosáhnout zdánlivě nekonečné smyčky, kdy při kliknutí na „<i>Další</i>“ po posledním obrázku následuje obrázek první a naopak při kliknutí na „<i>Předchozí</i>“ se před prvním obrázkem objeví ten poslední.</p>

<img class="border" src="/files/pole-posun/pole.png" alt="Posun v rámci pole">

<p>Základ takového kódu může vypadat následovně:</p>

<pre><code>var obrazky = document.<a href="/queryselector">querySelectorAll</a>("#galerie img");
var pocetObrazku = obrazky.length;
var aktualniObrazek = 1;</code></pre>

<p>Asi první řešení, co člověka napadne, je při změně hodnoty <code>aktualniObrazek</code>, kontrolovat, jestli není <b>mimo rozsah</b>.</p>

<ul>
  <li>není vyšší než počet obrázků (<code>pocetObrazku</code>),</li>
  
  <li>není nižší než <code>1</code> (první obrázek)</li>
</ul>

<p>Jde proto použít obyčejné <code>if</code> podmínky ve stylu:</p>

<pre><code>aktualniObrazek = aktualniObrazek + posun;
if (aktualniObrazek > pocetObrazku) {
  aktualniObrazek = 1;
}
else if (aktualniObrazek &lt; 1) {
  aktualniObrazek = pocetObrazku;
}</code></pre>

<p>V proměnné <code>posun</code> bude hodnota <code>1</code> pro posun dopředu a <code>-1</code> pro posun v zpátky.</p>

<p><a href="https://kod.djpw.cz/lijb">Živá ukázka</a></p>












<h2 id="vetsi-posun">Posun o více než 1</h2>

<p>Pokud je potřebné se v poli posouvat o <b>více než jednu položku</b>, bylo by původní řešení složitě rozšiřitelné. Bude tedy lepší vymyslet něco jiného.</p>


<h3 id="modulo">Modulo</h3>

<p>Šikovná funkce je pro tento případ <b>modulo</b>, které vrátí celočíselný <a href="http://cs.wikipedia.org/wiki/Zbytek_po_dělení">zbytek po dělení</a>. V JS se zapisuje znakem procenta <code>%</code>.</p>

<pre><code>10 % 3 = 1
7 % 4 = 3
10 % 5 = 0</code></pre>

<p>Pro posun po poli tedy stačí sečíst <code>pocetObrazku</code> + <code>aktualniObrazek</code> + <code>posun</code> a zjistit zbytek po vydělení hodnotou <code>pocetObrazku</code>.</p>

<pre><code>aktualniObrazek = 
  (pocetObrazku + aktualniObrazek + posun) % pocetObrazku;</code></pre>

<p>Když bude celkem 5 obrázků, aktuální bude 4 a cíl je se posunout o 2 dopředu:</p>

<pre><code>5 + 4 + 2 = 11
11 % 5 = <b>1</b></code></pre>

<p>Výsledek tak bude obrázek 1.</p>

<p>Pro případy, že by záporný <code>posun</code> byl větší než <code>pocetObrazku</code>, je vhodné aplikovat „<code>% (modulo) pocetObrazku</code>“ i na <code>posun</code>.</p>

<pre><code>aktualniObrazek = (
  pocetObrazku + aktualniObrazek + (<b>posun % pocetObrazku</b>)
) % pocetObrazku;</code></pre>

<p><a href="https://kod.djpw.cz/kijb">Živá ukázka</a></p>











<h2 id="indexy">Číslování indexů</h2>

<p>Při používání <b>číselných indexů</b> je nutné dbát na to, že bývají číslovány od nuly. Naopak živý člověk bude preferovat <b>číslování od jedničky</b>.</p>

<p>Čísla indexů vytvářejí trochu záludnou situaci, kdy počet prvků (<code>polozky.length</code>) bude třeba 5, ale nejvyšší index 4.</p>