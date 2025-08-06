---
title: "Šachovnicový výpis položek"
headline: "Šachovnicový výpis položek"
description: "Jak vypsat položky sestávající ze dvou sloupců, aby se pořadí sloupců střídalo."
date: "2014-10-29"
last_modification: "2014-11-01"
status: 1
tags: ["css", "hotova-reseni", "tabulky"]
format: "html"
---

<p>Cílem je vytvořit výpis položek, kdy obrázek a jeho popis je na střídačku. Na lichém řádku je popis vlevo a obrázek vpravo, na sudém řádku obráceně.</p>

<ul>
  <li>Výška obrázku i textu je <b>neznámá</b>.</li>
  
  <li>Někdy může být vyšší obrázek, jindy text.</li>
  
  <li>Výška řádku je určena tím, <b>co je vyšší</b>.</li>
  
  <li>Nižší položka je potom svisle <a href="/centrovani">centrovaná</a>.</li>
  
  <li>Při zobrazení na malé obrazovce, kdy se obrázek a popis nevejdou vedle sebe, má být vždy popis nad obrázkem.</li>
</ul>

<p>Mělo by to vypadat nějak takto:</p>

<p><img src="/files/sachovnicovy-vypis/ukazka.png" alt="Šachovnicový výpis položek s různou výškou" class="border"></p>



























<h2 id="centrovani">Centrování</h2>

<p>Kvůli svislému centrování je jasné, že bude třeba použít <a href="/display#tabulkove">tabulkové hodnoty vlastnosti <code>display</code></a>. Šlo by použít i <a href="/flexbox">flexboxy</a>, ale ty fungují až od <b>IE 10</b>.</p>

<p>Vytvoří se tedy <i>CSS tabulka</i>:</p>

<pre><code>.tabulka {
    display: table; 
    width: 100%;
}
.radek {
    display: table-row;
}
.bunka {
    display: table-cell; 
    vertical-align: middle; 
    width: 50%; 
    text-align: center;
}</code></pre>

<p><a href="https://kod.djpw.cz/yygb">Živá ukázka</a></p>

<p>Pro zobrazení na malých zařízeních se potom tabulka <a href="/responsivni-tabulky#rozlamani">„rozláme“</a>.</p>

<pre><code>@media (max-width: 600px) {
    .bunka, .radek, .tabulka {
        display: block; 
        width: auto; 
        text-align: left;
    }
}</code></pre>
























<h2 id="prohozeni">Prohození sloupců</h2>

<p>Po vycentrování zbývá <i>jen</i> prohodit sloupce sudých řádků. Od <b>IE 9</b> pro jejich zaměření funguje <a href="/css-selektory#n-ty-potomek">selektor n-tého potomka</a>:</p>

<pre><code>.radek:<b>nth-child</b>(even) {
  /* styly pro sudý řádek */
}</code></pre>

<p>To <code>even</code> znamená anglicky sudý, lichý je potom <code>odd</code>. Pro případnou funkčnost v <b>IE 8</b> je nutné příslušné třídy přidat <i>ručně</i> (serverovým skriptem).</p>







<h3 id="translate">Vlastnost <code>transform: translate</code></h3>

<p>Od <b>IE 9</b> jde používat tzv. <i>CSS transformace</i>. Jedna z nich se jmenuje <code>translate</code> a umí <b>přesouvat objekty na stránce</b>.</p>

<p>Na sudých řádcích potom takto můžeme obsah vlevo dostat doprava posunutím o 100 % šířky:</p>

<pre><code>transform: translate(<b>100%</b>, 0);</code></pre>

<p>Analogicky dostat obsah zprava doleva. Tentokrát odečtením 100 % šířky:</p>

<pre><code>transform: translate(<b>-100%</b>, 0)</code></pre>

<p>Druhý parametr funkce <code>translate</code> určuje svislé posunutí, to je nulové, protože potřebujeme posouvat jen <b>vodorovně</b>.</p>

<p><a href="https://kod.djpw.cz/fzgb">Živá ukázka</a></p>






<h3 id="relativni">Relativní posicování</h3>

<p>Podobného efektu jde ale obdobným způsobem docílit i <a href="/position#relative">relativním posicováním</a> s daleko lepší podporou.</p>

<p><a href="https://kod.djpw.cz/gzgb">Živá ukázka</a></p>




<h3 id="direction">Změna směru textu</h3>

<p>S originálním řešením přišel <a href="http://webylon.info"><b>Chamurappi</b></a>. To spočívá ve využití CSS vlastnosti <code>direction</code>, která určuje, jestli je text psán (standardně) zleva doprava (<code>ltr</code> – left to right) nebo naopak zprava doleva (<code>rtl</code> – right to left).</p>

<p>Když totiž tabulce nastavíme <code>direction</code> <i>zprava do leva</i>, prohodí se pořadí sloupců. Pro buňky se <code>direction</code> zase vrátí, aby se text <b>správně zobrazoval</b>, a sloupce jsou elegantně prohozeny.</p>

<p>Měnit <code>direction</code> je nutné pro <b>celou tabulku</b>, nestačí to jen pro samostatný řádek.</p>

<p><a href="https://kod.djpw.cz/hzgb">Živá ukázka</a></p>

<p>Tento postup jde kromě <b>skutečných tabulek</b> využít i u „CSS tabulek“, čímž vznikne asi nejlepší řešení tohoto problému.</p>

<p><a href="https://kod.djpw.cz/izgb">Živá ukázka</a></p>

<!-- TL: http://www.tlachtace.cz/privatni-tematicke-3/coding-gypsy-4086/2/#p178994 -->