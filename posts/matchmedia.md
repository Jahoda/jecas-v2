---
title: "Media queries v JavaScriptu"
headline: "Media queries v JavaScriptu"
description: "Jak v JavaScriptu používat <code>@media</code> pravidla jako v CSS."
date: "2017-06-06"
last_modification: "2017-08-16"
status: 1
tags: ["hotova-reseni", "js", "responsive"]
format: "html"
---

<p>Pokud se zobrazení stránky liší dle rozměrů viewportu díky použití <a href="/media"><code>@media</code> pravidla</a>, je občas nutné tomu přizpůsobit i JavaScript.</p>


<p>Třeba nevolat zbytečné JS akce typu <a href="/fixed">fixování elementů</a> a podobně.</p>



<h2 id="sirka">Detekce podle šířky</h2>

<p>První možnost je zkrátka jednoduše <a href="/zjisteni-rozmeru#viewport">měřit šířku viewportu</a>:</p>

<pre><code>var sirka = document.documentElement.clientWidth;
if (sirka > 1024) {
  // nějaký kód
}</code></pre>








<p>Asi největší problém je v tom, že je šířka stránky v pixelech. Pokud se v CSS <a href="/media"><code>@media</code></a> pravidlech používají nějaké rozumnější jednotky (např. <code>em</code>), nejde to rozumně skloubit dohromady.</p>


<p>Druhý problém je v tom, že se <b><span lang="en">breakpointy</span> nastavují zvlášť v JS i CSS</b>.</p>



<h2 id="match-media">Metoda <code>matchMedia</code></h2>

<p>Přímo v JS existuje metoda fungující obdobně jako media queries v CSS:</p>


<pre><code>if (window.matchMedia("<b>(</b>max-width: 40em<b>)</b>").matches) {
  // kód pro viewport do 40 em
}</code></pre>









<p>Podmínku je nutné uvést včetně závorek okolo.</p>


<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Dobře podporovaná vlastnost (funguje i v <b>IE 10</b> a novějších). Pro starší prohlížeče jde navíc použít polyfill, který podporu doplní.</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/paulirish/matchMedia.js">matchMedia.js</a> – polyfill, pro reakci na změnu velikosti okna je potřeba i <code>matchMedia.addListener.js</code></li>
  </ul>
</div>








<h2 id="zmena-velikost">Změna velikosti okna</h2>

<p>Hodně užitečná je i schopnost sledovat změnu šířky okna/viewportu pomocí přidání <i>posluchače</i> přes <code>addListener</code> pro podmínku.</p>

<p>Není tak nutné využívat událost <code>onresize</code>. Navíc se <b>detekuje pouze změna</b> (jindy se funkce nezavolá), takže se nemusí stav šířky ukládat do nějaké proměnné, aby se daný kód nevolal zbytečně opakovaně.</p>

<pre><code>var mql = window.matchMedia("(max-width: 40em)");

// funkce, která se zavolá při změně
mql.addListener(zmenaMedia);

// může se zavolat i po načtení stránky
zmenaMedia(mql);

// samotná funkce
function zmenaMedia(mql) {
  if (mql.matches) {
    // kód pro viewport do 40 em
  }
}</code></pre>


















<p>Kód uvnitř podmínky se spustí po načtení stránky v okně do <code>40em</code>. Případně se spustí <b>právě jednou</b> pokaždé, když se viewport zmenší pod stanovenou hranici. Při dalším zmenšování už se znovu neprovádí, protože nedošlo ke změně.</p>



<h2 id="sdileni">Sdílení <code>@media</code> pravidel</h2>

<p>K úvaze je, kterak sdílet hodnoty break-pointů mezi JS a CSS.</p>

<p>První možnost je mít nějaký <b>konfigurační soubor</b> se všemi break-pointy a ten v build procesu propsat do CSS i JS.</p>

<p>Jiná možnost je…</p>





<h3 id="content">Předávání aktivního pravidla v <code>content</code></h3>

<p>Asi jediná možnost, jak si z CSS předat něco čitelného JavaScriptem bez úprav HTML, je použít vlastnost <a href="/content"><code>content</code></a>.</p>

<p>Jde například elementu nastavit různé hodnoty do vlastnosti <code>content</code> podle aktivního <code>@media</code> pravidla:</p>


<pre><code>html:before {
  display: none;
  content: "desktop";
}

@media (max-width: 40em) {
  html:before {
    content: "mobile";
  }
}</code></pre>











<p>Nyní stačí při změně šířky okna <a href="/zjisteni-css">zjišťovat výsledný styl</a> pomocí <code>getComputedStyle</code>. Ve vlastnosti <code>content</code> u <code>html:before</code> bude <code>desktop</code> nebo <code>mobile</code> (v závislosti na šířce viewportu).</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/mohc">Živá ukázka</a> – načtení media queries z CSS do JavaScript</li>
  </ul>
</div>


<p>Trochu paradoxní je, že tento postup nepotřebuje (při načtení stránky) JS metodu <code>matchMedia</code>. <i>Matchování</i> totiž proběhne už v CSS. Pro ošetření stavu při změně šířky by se ale už musel aktuální stav skriptem zjišťovat.</p>


<h3 id="element">Detekční element</h3>

<p>Jiná možnost je pomocí <i lang="en">media queries</i> nastavit nějakému elementu určité styly a ty potom v JS kontrolovat.</p>

<p>Třeba zapínat/vypínat viditelnost a tu potom skriptem detekovat.</p>



<h2 id="predani-pravidel">Hotové řešení předání <code>@media</code> pravidel</h2>




<p>Pro elegantnější práci s více <code>@media</code> podmínkami se nabízí do <code>content</code>u předat jednotlivá pravidla a podle toho si sestavit „spouštěče“ s využitím <code>matchMedia</code>.</p>

<p>Třeba jako <a href="/json">JSON</a>:</p>

<pre><code>html:before {
    display: none;
    content: '{"<b>tablet</b>" : {"min-width" : "40em", "max-width" : "60em"}}';
}</code></pre>








<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/sajc">Živá ukázka</a> – hotová funkce parsující JSON z CSS</li>
  </ul>
</div>

<p>Použití je následovné:</p>

<pre><code>MediaQueries.init({
    'tablet': function (matched) {
        if (matched) {
            // Jsem tablet
        }
        else {
            // Nejsem tablet
        }
    }
});</code></pre>












<h2 id="vykon">Výkon</h2>

<p>Je možné, že detekce přes <code>matchMedia</code> a spouštění nějaké akce jen při změně bude efektivnější s ohledem na výkon, než neustálé zjišťování aktuálního breakpointu ve <code>window.onresize</code>.</p>

<p>Stejně tak je možný opak.</p>

<p>Změřené to nemám. Pokud máte nějaké zkušenosti s výkonem <code>matchMedia</code>, dejte mi prosím vědět do komentářů.</p>