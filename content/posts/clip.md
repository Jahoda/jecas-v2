---
title: "Oříznutí CSS clip"
headline: "Oříznutí CSS vlastností <code>clip</code>"
description: "CSS vlastnost <code>clip</code> slouží k oříznutí obsahu elementu."
date: "2014-10-17"
last_modification: "2014-10-19"
status: 1
tags: ["css", "css-funkce", "css-vlastnosti"]
format: "html"
---

<p>Už před rokem 2000 (od <b>IE 4</b>) bylo možné <a href="/position#absolute">absolutně posicované</a> elementy oříznout ve tvaru obdélníku. <a href="http://www.jakpsatweb.cz/css/clip.html">Více na JPW</a>.</p>

<p>V roce 2014 začíná být pomalu možné provádět i ořezávání <b>nepravidelných tvarů</b> vlastností <code>clip-path</code>. Výhoda a velký rozdíl také je, že pro oříznutí už nemusí být element absolutně posicovaný.</p>



<h2 id="podpora">Podpora</h2>

<p>Nepravidelné oříznutí podporuje <b>Chrome 24+</b>, <b>Opera 15+</b> a <b>Safari 8+</b>.</p>




<h2 id="zapis">Zápis</h2>

<p>Tvar je možné zadat jako <b>polygon</b>.</p>

<p>Nejjednodušší útvar je proto <b>trojůhelník</b>.</p>

<pre><code>element {
  clip-path: polygon(
    50% 0%, 
    0% 100%, 
    100% 100%
  );
}</code></pre>

<p>Výsledek:</p>

<p><img src="/files/clip/polygon.png" alt="Oříznutí trojúhelníkem" class="border"></p>

<p>Funkci <code>polygon</code> se předávají jednotlivé body. Každý bod má dvě hodnoty – souřadnici zleva a souřadnici shora. Hodnotu je možné zadávat v <b>obvyklých délkových jednotkách</b>. Pro oříznutí, co se přizpůsobuje velikosti elementu, je vhodné použít <b>procenta</b>.</p>


<p>Zadané hodnoty mohou být i <b>mimo hranice</b> ořezávaného elementu (záporné nebo větší než 100 %). Oříznutí se ale aplikuje jen na element, co ho má nastavené.</p>

<p>Oříznutí je <b>skutečné</b>, tj. například po najetí myši bude oříznutý obsah reagovat jen na ploše, která po oříznutí zbyla.</p>

<p><a href="https://kod.djpw.cz/xpgb">Živá ukázka</a></p>


<h2 id="nastroje">Nástroje</h2>

<p>Protože kreslit polygon pro oříznutí by byla nuda, existují nástroje, kde si jde potřebnou <i>cestu</i> naklikat.</p>

<a class="button" href="http://bennettfeely.com/clippy/">Clippy — CSS clip-path maker</a>


