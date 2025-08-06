---
title: "Generátor náhodných obrázků"
headline: "Generování náhodných obrázků"
description: "Pro vývoj a testování webů se hodí znát způsoby, jak v okamžiku vložit do stránky ilustrační obrázek."
date: "2013-07-18"
last_modification: "2015-02-04"
status: 1
tags: ["napady", "obrazky"]
format: "html"
---

<h2 id="dummy-image">Dummy Image</h2>

<p><a href="http://dummyimage.com/" class="button">Web</a></p>

<p>Kromě pohodlného <i>vytváření</i> obrázků (či spíš placeholderů) zadáváním URL, je možné celou <b>službu stáhnout</b> a provozovat na vlastním serveru (využito na <a href="https://kod.djpw.cz/puc">kod.djpw.cz</a>).</p>


<div class="live"><img src="http://dummyimage.com/200x100/0D6AB7/fff"></div>








<h2 id="lorempixel">Lorempixel</h2>

<p><a href="http://lorempixel.com/" class="button">Web</a></p>

<p>Lorempixel dokáže generovat skutečné, různě tématické, obrázky.</p>

<div class="live"><img src="http://lorempixel.com/200/100"></div>









<h2 id="placehold-it">Placehold.it</h2>

<p><a href="http://placehold.it/" class="button">Web</a></p>

<p>Syntaxe je shodná se službou <b>Dummy Image</b>. K disposici jsou jen nejzákladnější funkce.</p>

<div class="live"><img src="http://placehold.it/200x100/0D6AB7/fff"></div>















<h2 id="dummy-image-generator">Dummy Image Generator</h2>

<p><a href="http://dummy-image-generator.com/" class="button">Web</a></p>

<p>Hodně propracovaný generátor. Hlavní výhoda oproti ostatním je možnost <b>vygenerovat a stáhnout celou kolekci</b> <b>ilustračních obrázků</b>.</p>

<p>Text s rozměry lze vypnout. Asi jediná vada na kráse je poměrně <b>rušivé jméno autora</b> na všech obrázcích, které zřejmě vypnout nejde.</p>

<div class="live"><img src="http://img.dummy-image-generator.com/abstract/dummy-200x100-DesiccationCracks.jpg"></div>













<h2 id="satyr">Satyr.io</h2>

<p><a href="http://satyr.io/" class="button">Web</a></p>

<p>Kromě standardního generování obrázku o určitých rozměrech nabízí další zajímavé funkce:</p>

<ol>
  <li>
    <p>Nastavení rozměrů na základě <b>poměru stran</b>:</p>
    
    <pre><code>http://satyr.io/980x16:9</code></pre>
  </li>
 
  
  <li>
    <p>Pomalejší <b>odezva</b> obrázků. Následující obrázek se začne načítat až po 1 vteřině.</p>
    
    <pre><code>http://satyr.io/200x300/red?<b>delay=1000</b></code></pre>
    
    <p>Jde zadat i rozsah, ve kterém se má obrázek začít stahovat:</p>
    
    <pre><code>http://satyr.io/200x300?delay=1000-3000</code></pre>
    
    <p>Pro testování pomalého připojení jde ale použít i přímo <a href="/vyvojarske-nastroje">vývojářské nástroje</a> přímo v prohlížeči.</p>
  </li>
  
  
  <li>
    <p>Užitečná je i schopnost vytvořit <b>náhodnou velikost obrázku</b> na základě zadaného rozsahu:</p>
    <div class="live"><img src="http://satyr.io/100-150x80-100"></div>
  </li>
  
  
  
  
  
  <li>
    <p>Satyr.io umí generovat i <b>vlajky různých zemí</b>:</p>
    
    <div class="live">
      <img src="http://satyr.io/40?flag=cze">
      <img src="http://satyr.io/40?flag=de"></div>
  </li>
</ol>




<h2 id="editor">„Dummy“ obrázky v editoru</h2>

<p>Pro <a href="/sublime-text">Sublime Text</a> existuje plugin <b>Dummy Image Generator</b> (<a href="/pluginy-sublime-text">jak plugin instalovat</a>) využívající <a href="#dummy-image">DummyImage.com</a>.</p>