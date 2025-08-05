---
title: "CSS Elements Queries"
headline: "CSS Elements Queries"
description: "Jak zajistit různý vzhled elementů v závislosti na jejich rozměru."
date: "2015-11-13"
last_modification: "2018-06-22"
status: 1
tags: ["css", "napady", "responsive"]
format: "html"
---

<p>Základním prvkem responsivního CSS je <a href="/media">pravidlo <code>@media</code></a>, které umožňuje aplikovat různé styly v závislosti na velikosti dostupné plochy v okně prohlížeče.</p>

<pre><code>@media (max-width: 40em) {
  /* kód pro šířku do 40 em */
}</code></pre>









<p>Pro tuto techniku se používá název <b lang="en">Media Queries</b>.</p>

<p><b lang="en">Element Queries</b> je zatím teoretický koncept, jak zvláštní styly připojit v závislosti na velikosti konkrétního elementu.</p>



<h2 id="priklad">Příklad problému</h2>

<p>Pro zjednodušení jde uvažovat dvousloupcový layout, který se při šířce pod 40 em přeskládá pod sebe. <a href="http://kod.djpw.cz/ucsb">Ukázka</a>.</p>

<pre><code>.sloupec {
  width: 50%;
  float: left;
}
@media (max-width: 40em) {
  .sloupec {
    width: 100%;
  }
}</code></pre>















<p>Na toto přeskládání typicky budou navázány další úpravy elementů uvnitř sloupců.</p>

<p>Co ale v případě, že bude nutné <b>přidat sloupec třetí</b>?</p>


<p>Všechna <code>@media</code> pravidla pro vnitřní obsah budou mimo a bude je nutné předělat.</p>



<p>Ještě horší situace nastane v případě, že nějaký další sloupec bude volitelný (např. reklamní bannery pro nepřihlášené uživatele), najednou se musí vytvořit pro celý web dvě sady <code>@media</code> pravidel.</p>


<h2 id="eq">Řešení s element query</h2>

<p>Mnohem elegantnější a universálnější by tak bylo psát něco jako:</p>

<pre><code>.obal-dvou-sloupcu<b>:media(max-width: 40em)</b> .sloupec {
  width: 100%;
}</code></pre>




<p>Element <code>.sloupec</code> by měl potom <code>100%</code> šířku v případě že <code>.obal-dvou-sloupcu</code> je menší než 40 em.</p>







<h2 id="problem">Problém implementace</h2>

<p>Implementovat <b lang="en">Element Queries</b> do prohlížečů je trošku oříšek, protože vnitřní elementy mohou měnit rozměry svých rodičů a obráceně, čímž vzniká problém, zda bylo dřív vejce nebo slepice.</p>




<h2 id="js">Řešení v JavaScriptu</h2>

<p>Zjistit aktuální rozměry jde snadno JavaScriptem. Například šířka je v <code>element.offsetWidth</code>.</p>

<p>Na základě toho jde v CSS přiřadit nějakou třídu, která zajistí požadovaný styl.</p>

<p>Problém řešení využívající JS je v tom, že zjišťování rozměrů a aplikace stylů způsobí překreslení stránky.</p>





<h2 id="hotove">Hotové řešení</h2>

<p>Právě JS využívá hotové řešení <a href="https://github.com/marcj/css-element-queries">CSS Element Queries</a> (<a href="http://marcj.github.io/css-element-queries/">ukázka</a>):</p>


<p>Tento skript přidává elementům, které mají reagovat na změnu své velikosti, atributy <code>min</code>/<code>max-width</code>/<code>height</code>, které jde potom používat v CSS jako selektory:</p>

<pre><code>.element {
  …
}

.element[min-width~="480px"] {
  …
}

.element[min-width~="480px"] .vnitrek {
  …
}</code></pre>














<p>Řešení se snaží být relativně šetrné na výkon a funguje již od <b>IE 10</b>.</p>

<p>Nevýhoda je jeho závislost na JS, takže obsah využívající element queries po načtení a provedení skriptu <b>poskočí</b>, pokud tedy náhodou rozměry neodpovídají výchozí variantě (bez <a href="/css-selektory#atributovy">atributového selektoru</a>).</p>


<h2 id="flexboxy">Flexboxy</h2>

<p>Od <b>IE 10</b> jde v některých případech – jako je třeba <a href="/responsivni-mrizka">responsivní mřížka</a> – vyřešit problém použitím <a href="/flexbox">flexboxů</a>.</p>

<p>Elementům se nastaví <code>flex-grow: 1</code> a pevná šířka (ne v procentech). Počet elementů se potom automaticky přizpůsobuje, aby vyplnil dostupný prostor, s tím, že se přibližně drží nastavená šířka.</p>

<div class="internal-content">
  <ul>
    <li><a href="/responsivni-obtekane-boxy#flex">Obtékané boxy s proměnlivou šířkou</a></li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://www.sitepoint.com/beyond-media-queries-time-get-elemental/">Beyond Media Queries — It’s Time to Get Elemental</a></li>
  
  <li><a href="http://www.smashingmagazine.com/2013/06/media-queries-are-not-the-answer-element-query-polyfill/">Media Queries Are Not The Answer: Element Query Polyfill</a></li>
  
  <li><a href="http://www.jonathantneal.com/blog/thoughts-on-media-queries-for-elements/">Thoughts on Media Queries for Elements</a></li>
</ul>