---
title: "Kreslení v CSS"
headline: "„Kreslení“ pomocí CSS"
description: "Jak vytvářet jednoduché tvary místo obrázků prostým CSS?"
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<h2>Kreslit (pomocí CSS), nebo nekreslit?</h2>
<p>Vždy je potřeba zvážit, zda má smysl vytvářet komplikované konstrukce místo použití <b>prostého obrázku</b>.

<h3>Výhody CSS</h3>
<p>Výhody <i>kreslení</i> pomocí CSS mohou být:
<dl>
<dt>Jednoduchost vytvoření
<dd>Je jednodušší napsat <code>background: red</code> než si v grafickém editoru kreslit červený obrázek, ukládat jej a potom psát <code>background: url(cerveny-obrazek.png)</code>.
<dt>Datová náročnost
<dd>Barevné pozadí místo obrázku bude nepochybně datově úspornější než obrázkové pozadí stejné barvy.
<dt>Snadná modifikace
<dd>Bude snazší původní CSS vlastnost přepsat na <code>background: blue</code> než v editoru překreslit červený obrázek na modrý.
  
  <dt>Změna velikosti</dt>
  <dd>
    <p><i>Nakreslené</i> prvky se mohou přizpůsobovat <b>různým velikostem</b> okna a typům displejů bez <b>ztráty kvality</b>. U obrázků to umí řešit vektorová grafika (např. <a href="/svg"><b>SVG</b></a> od <b>Internet Exploreru 9</b>).</p>
  </dd>
</dl>

<h3>Výhody obrázků</h3>
<dl>
<dt>Jednoduchost vytvoření
<dd>Je jednodušší nakreslit v editoru komplikovaný obrázek než v CSS kombinovat několik vlastností a ladit je napříč prohlížeči.
<dt>Datová náročnost
<dd>U obrázků lezoucí z <a href='http://www.colorzilla.com/gradient-editor/'>různých CSS generátorů</a> asi o datové úspornosti raději nemluvit.
<dt>Snadná modifikace
<dd>Bude snazší mnoho původních CSS vlastností přepsat nebo jinak vygenerovat než v editoru překreslit obrázek? Asi ne.
</dl>

<p><b>Universální řešení tedy nejspíš neexistuje</b> a je potřeba individuálně zohlednit ten který prvek, pravděpodobnost jeho modifikace atd. (K tématu: <a href='http://djpw.cz/139552'>DJPW: Patří procedurální grafika do CSS?</a>).

<h2 id="moznosti">Samotné kreslení</h2>
<p>Když pomineme bizarní možnosti jako totální CSS pixel art nebo triviality jako čára nebo čtverec, nabízí se.

<h3 id="trojuhelniky">Trojúhelníky</h3>
<p>Jeden z fíglů je využít toho, že nastavení silné tloušťky rámečku svým napojováním může vytvořit šikmý tvar.</p>
<div class="live">
<div style='outline: 1px solid #000; width: 40px; height: 50px; border-bottom: 20px solid red; border-top: 20px solid #fff; border-left: 40px solid blue;'></div>
</div>
<p>A teď stačí samotný obsah odstranit nastavením nulové výšky…
<pre><code>.flag {
  width: 200px;
  height: 0;
  border-bottom: 100px solid red; 
  border-top: 100px solid #fff; 
  border-left: 200px solid blue;
  overflow: hidden;
}</code></pre>
<p>A máme třeba vlajku.

<div class="live">
<!-- Ukázky vlajky ČR -->
<div style='outline: 1px solid #000; width: 40px;
             height: 0;
             border-bottom: 20px solid red; 
             border-top: 20px solid #fff; 
             border-left: 40px solid blue;
             overflow: hidden;'></div>
<!-- / konec ukázky -->
</div>    

<p>A když necháme jen rámeček na jedné straně (ostatní rámečky budou mít průhlednou barvu – <code>border-color: transparent</code>), dosáhneme kýženého trojúhelníku, který lze upravováním tlouštěk rámečků všelijak modifikovat.

<div class="live">
<!-- Ukázky trojúhelníku -->
<div style='width: 40px;
             height: 0;
             border-bottom: 20px solid transparent; 
             border-top: 20px solid transparent; 
             border-left: 40px solid blue;
             overflow: hidden;'></div>
<div style='width: 40px;
             height: 0;
             border-bottom: 20px solid transparent; 
             border-top: 20px solid transparent; 
             border-left: 200px solid blue;
             overflow: hidden;'></div>
<div style='width: 40px;
             height: 0;
             border-bottom: 20px solid transparent; 
             border-top: 20px solid transparent; 
             border-left: 10px solid blue;
             overflow: hidden;'></div>
<!-- / konec ukázky -->
</div>    

<h3 id="zaobleni">Zaoblení a kruhy</h3>
<p><b>Zaoblené části</b> lze od <b>IE 9</b> vytvářet vlastností <a href="/border-radius">border-radius</a>.</p>
<div class="live">
  <div style="border-radius: 50%; width: 100px; height: 100px; background: blue; display: inline-block"></div>
  <div style="border-radius: 50% 40% 30% 20%; width: 100px; height: 100px; background: blue; display: inline-block"></div>
</div>

<h3 id=generatory>CSS generátory</h3>
<p>Umí vytvářet různé <a href="/gradient">přechody</a>, <a href="/box-shadow">stíny</a>, <a href="/border-radius">kulaté rohy</a> a další. Např. <a href='http://css3generator.com/'>css3generator.com</a>.

<h3 id=pisma>Kreslení písmeny</h3>
<p>První možnost je použít obyčejné znaky jako třeba <code>&lt;</code>, <code>&gt;</code>, <code>×</code> a při vhodném fontu, velikosti a stylu máme šipku doleva, doprava a křížek.
<p>Druhá potom připojení zvláštního fontu, který místo běžných písmen obsahuje grafické symboly a ikony. <a href='http://fortawesome.github.io/Font-Awesome/'>Příklad</a>. 
  
<h3 id="css-ikony">Ikony v čistém CSS</h3>
<p><a href="/css-ikony">Ikony</a> je teoreticky možné kreslit i <a href="http://nicolasgallagher.com/pure-css-gui-icons/demo/">přímo v CSS</a>.</p>


<h2 id="kresby">Zajímavé kresby</h2>
<h3 id="hranice">Kde jsou hranice?</h3>
<p>V zásadě je možné <a href="http://www.webdesignshock.com/50-impressive-css-drawings/">nakreslit cokoliv</a>, i když u složitějších konstrukcí to kromě jakési <i>exhibice</i> nedává moc smysl.</p>

<h3 id="dalsi">Další <i>obrázky</i></h3>
<ul>
  <li><a href="http://codepen.io/LFeh/pen/qzDCJ">Eric Cartman</a></li>
  <li><a href="http://liveweave.com/GoGhKy">Bender</a></li>
  <li><a href="http://codepen.io/kevinjannis/pen/pyuix">Chrome logo</a></li>
  <li><a href="http://hop.ie/blog/macplus/">CSS Mac Plus</a></li>
  <li><a href="http://marvelapp.github.io/devices.css/">8 Pure CSS Flat Mobile Devices</a></li>
  <li><a href="http://codepen.io/jannypie/full/kbdDg">Pure CSS Taj Mahal</a></li>
</ul>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://a.singlediv.com/">A Single Div</a> – úžasné <i>kresby</i> s využitím jediného <code>&lt;div></code>u (hodně využívá <a href="/box-shadow"><code>box-shadow</code></a> a <a href="/gradient">gradienty</a>)</li>
  
  <li><a href="https://hacks.mozilla.org/2014/09/single-div-drawings-with-css/">Single Div Drawings with CSS</a></li>
  
  <li><a href="https://generative-art-with-css.commons.host">Generative Art with CSS</a></li>
</ul>