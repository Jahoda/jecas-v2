---
title: "Výpis náhodného obsahu"
headline: "Výpis náhodného textu"
description: "Jak na stránce náhodně vypsat obrázek, odkaz, reklamu, text nebo cokoliv jiného."
date: "2014-08-13"
last_modification: "2025-03-25"
status: 1
tags: ["hotova-reseni", "js", "napady", "php"]
format: "html"
---

<p>Čas od času je cílem na webu zobrazit z několika položek jen jednu. A to <b>náhodně</b>, například při každém <b>načtení stránky</b> jinou.</p>

<p>Oblíbená funkce z <a href="http://xkcd.com/221/">xkcd</a> proto nepostačí.</p>

<p><img src="http://imgs.xkcd.com/comics/random_number.png" alt="Náhodné číslo" class="border"></p>












<p>První, co je potřeba rozhodnout, je otázka, zda náhodný obsah generovat:</p>

<ul>
  <li>na straně <b>serveru</b> (PHP, MySQL),</li>
  <li>na straně <b>klienta</b> (JavaScript)</li>
</ul>

<p>Serverové řešení může být problematické skloubit s <b>cacheováním celé stránky</b>, kdy se náhodný prvek dostane do <i>cache</i> a do její <i>invalidace</i> bude na náhodném místě <b>stále ten stejný obsah</b>.</p>

<p>Pokud to vadí, tak se zdá výhodnější řešení v <b>JavaScriptu</b>.</p>




<h2 id="js">Náhodný obrázek v JS</h2>

<p>Nejjednodušší výběr náhodné položky z pole může vypadat následovně:</p>

<pre><code>var <b>polozky</b> = ["prvni", "druha", "treti"];
var <i>nahodne</i> = Math.floor(Math.random() * <b>polozky</b>.length);
alert(<b>polozky</b>[<i>nahodne</i>]);</code></pre>





<p>Záhy ale nejspíš zjistíme, že toto prosté pole nestačí. Budeme-li chtít vypsat například <b>náhodný odkaz</b> obsahující obrázek, bude elegantnější udělat pole o <b>více úrovních</b> místo duplikování celého HTML kódu „<code>&lt;a href=''>&lt;img src=''>&lt;/a></code>“ pro <b>každou položku</b>.</p>

<pre><code>var polozky = [
  {"<b>obrazek</b>" : "prvni.jpg", "<i>url</i>" : "http://jeacas.cz"},
  {"<b>obrazek</b>" : "druhy.jpg", "<i>url</i>" : "https://kod.djpw.cz"},
  {"<b>obrazek</b>" : "treti.jpg", "<i>url</i>" : "http://djpw.cz"}
];
var nahodne = Math.floor(Math.random() * polozky.length);
alert(polozky[nahodne].<b>obrazek</b>);
alert(polozky[nahodne].<i>url</i>);</code></pre>









<p><a href="https://kod.djpw.cz/oyeb">Samostatná ukázka</a></p>




<h3 id="jak">Jak to funguje?</h3>

<p>Konstrukce <code>Math.random()</code> vytvoří číslo mezi nulou a jedničkou.</p>

<div class="live">
  <p>(vygenerujte)</p>
  <button onclick="this.parentNode.getElementsByTagName('p')[0].innerHTML = Math.random()">Náhodné číslo</button>
</div>



<p>Když se takovým číslem vynásobí počet položek v poli a výsledek zaokrouhlí dolů (<code>Math.floor</code>), vyjde nám <i>index</i> v rozmezí, které potřebujeme.</p>





<h2 id="php">Náhodný obsah v PHP</h2>


<p>Kód z JS <a href="/php2js">převedeme do PHP</a>, kde navíc pro získání <b>náhodné položky pole</b> lze místo <b>generování náhodného čísla</b> využít funkci <code>array_rand</code>.</p>

<pre><code>$polozky = array(
  array("obrazek" => "prvni.jpg", "url" => "http://jecas.cz"),
  array("obrazek" => "druhy.jpg", "url" => "https://kod.djpw.cz"),
  array("obrazek" => "treti.jpg", "url" => "http://djpw.cz")
);
$nahodne = $polozky[array_rand($polozky)];
echo $nahodne["obrazek"];
echo $nahodne["url"];</code></pre>









<p>Získat náhodnou položku jde také zamícháním celého pole funkcí <code>shuffle</code> a použitím <b>první položky</b>. Nebo skutečným vygenerováním čísla indexu (funkce <code>mt_rand</code>) v závislosti na délce pole (funkce <code>count</code>):</p>

<pre><code>$nahodne = $polozky[mt_rand(0, count($polozky) - 1)];</code></pre>



<p>Řešení využívající funkci <code>array_rand</code> mi ale přijde <b>elegantnější</b>.</p>




<h2 id="sql">Náhodná položka v SQL</h2>

<p>V <b>MySQL</b> jde k vybrání použít <i>řazení podle</i> <code>RAND()</code>.</p>

<pre><code>SELECT neco 
FROM tabulka
ORDER BY <b>RAND()</b>
LIMIT 1</code></pre>





<p>Toto řešení ale bývá dost pomalé, takže se častěji používá generování náhodného limitu v PHP.</p>








<h2 id="vice">Více náhodných položek</h2>

<p>Jak docílit získání více náhodných položek, které ale budou unikátní?</p>

<p>V JS jde využít funkce <code>splice</code>, která odstraní položku z pole:</p>

<pre><code>var polozky = ["prvni", "druha", "treti", "ctvrta"];
var kopie = [...polozky];

var prvni = kopie.splice(Math.floor(Math.random() * kopie.length), 1)[0]; 
var druha = kopie.splice(Math.floor(Math.random() * kopie.length), 1)[0];

console.log(prvni, druha);</code></pre>



<p>V PHP stačí předat parametr funkci <code>array_rand</code>:</p>

<pre><code>$polozky = ["prvni", "druha", "treti", "ctvrta"];
$nahodne_klice = array_rand($polozky, 2); // Vrátí dva různé klíče

echo $polozky[$nahodne_klice[0]] . ", " . $polozky[$nahodne_klice[1]];
</code></pre>