---
title: "Vlastní styl posuvníku"
headline: "Vlastní vzhled scrollbaru"
description: "Jaké jsou možnosti ve stylování vzhledu posuvníku."
date: "2014-12-14"
last_modification: "2017-08-08"
status: 1
tags: ["css", "scroll", "stylovani"]
format: "html"
---

<p>Posuvník je nedílnou součástí většiny webů. Jelikož je jeho vzhled řízení <b>prohlížečem</b> / <b>operačním systémem</b>, nemusí zapadat ke <b>vlastnímu vzhledu stránky</b> – pomocí CSS to jde změnit.</p>

<p>Změny stylu si je dobré pořádně rozmyslet, protože příliš kreativní vzhled může být <b>pro uživatele nejasný</b>.</p>

<p>V roce 2017 stále <b>není možné měnit vzhled posuvníku jen pomocí CSS</b> s dobrou podporou napříč prohlížeči.</p>


<h2 id="webkit">Webkit</h2>

<p>Asi nejpokročilejší možnosti nabízí prohlížeče používající jádro <b>Webkit</b>/<b>Blink</b> (<b>Chrome</b>, <b>Opera</b>). Jednotlivé prvky posuvníku jsou v podstatě <b>pseudo-elementy</b>, které jde stylovat běžnými CSS způsoby.</p>

<p>Bez uvedení konkrétnějšího selektoru před <code>::-webkit-scrollbar*</code> budou <b>nastylovány všechny posuvníky</b> na stránce se nacházející.</p>

<p>Posuvník je rozdělen na <b>několik částí</b>:</p>

<ol>
  <li><code>::-webkit-scrollbar</code> – tělo posuvníku</li>
  <li><code>::-webkit-scrollbar-button</code> – tlačítka pro posun nahoru/dolů</li>
  <li><code>::-webkit-scrollbar-track</code> – prostor mezi šipkami nahoru/dolů</li>
  <li><code>::-webkit-scrollbar-track-piece</code> – pozadí za jezdcem posuvníku</li>
  <li><code>::-webkit-scrollbar-thumb</code> – jezdec posuvníku</li>
  <li><code>::-webkit-scrollbar-corner</code> – roh mezi vodorovným a svislým posuvníkem</li>
  <li><code>::-webkit-resizer</code> – roh, za který lze měnit velikost</li>  
</ol>

<p>Zjednodušené vysvětlení:</p>

<p><img src="/files/styl-posuvniku/scrollbar.png" alt="Příklad posuvníku v Chrome" class="border"></p>























<p><a href="https://kod.djpw.cz/nwib">Živá ukázka</a></p>




<h2 id="ie">Internet Explorer</h2>

<p>V <b>Internet Exploreru</b> není posuvník sestaven z pseudo-elementů <code>::scrollbar-*</code>, ale používají se speciální CSS vlastnosti.</p>

<ul>
  <li><code>scrollbar-track-color: barva</code> – pozadí posuvníku</li>
  <li><code>scrollbar-face-color: barva</code> – barva jezdce posuvníku</li>
  <li><code>scrollbar-arrow-color: barva</code> – barva šipek</li> 
</ul>


<p>Pro barvu stínů/rámečku existují ještě další vlastnosti, některé se v <a href="/ie11"><b>Internet Exploreru 11</b></a> neprojevují:</p>

<ul> 
  <li><code>scrollbar-shadow-color: barva</code> – barvy stínu/rámečku kolem jezdce posuvníku</li>      
  <li><code>scrollbar-highlight-color: barva</code></li>
  <li><code>scrollbar-3dlight-color: barva</code> – barva levé a horní hrany posuvníku</li>
  <li><code>scrollbar-darkshadow-color: barva</code></li>  
</ul>


<p><a href="https://kod.djpw.cz/pwib">Živá ukázka</a></p>

<p>Popis jednotlivých částí posuvníku ve starých <b>IE</b>.</p>

<p><img src="/files/styl-posuvniku/scrollbar-ie.png" alt="Příklad posuvníku v Chrome" class="border"></p>



















<p>V <b>IE 11</b> je zajímavá vlastnost <code>scrollbar-base-color</code>, která na základě zadané barvy přizpůsobí všechny potřebné <b>odstíny</b> pro jednotlivé části posuvníku.</p>

<p><img src="/files/styl-posuvniku/ie-styl.png" alt="Přebarvení jedinou barvou v IE 11" class="border"></p>




















<p><a href="https://kod.djpw.cz/swib">Živá ukázka</a></p>

<p>O barvení posuvníku ve starších <b>IE</b>:</p>

<div class="external-content">
  <ul>
    <li>Jak psát web: <a href="http://www.jakpsatweb.cz/css/css-scroll-color.html">Barvení rolovací lišty

v prohlížečích pomocí CSS</a></li>
  </ul>
</div>

<h2 id="edge">Microsoft Edge</h2>

<p>Stylovat posuvník pomocí CSS <b>není možné</b>.</p>

<p>Žádost o přidání této funkcionality dostala v roce 2015 prioritu <i lang="en">medium</i>:</p>

<div class="external-content">
  <ul>
    <li>Windows Developer: <a href="https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/9081910-add-support-for-scrollbar-styling?page=2&per_page=20">Add Support for Scrollbar Styling</a></li>
  </ul>
</div>



<h2 id="firefox">Firefox</h2>

<p>Stylovat posuvník pomocí CSS <b>není možné</b>.</p>

<p>Absence stylování scrollbaru je evidována jako bug z roku 2000:</p>

<div class="external-content">
  <ul>
    <li>
Bugzilla: <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=77790">Style the scrollbar (binding ::-moz-horizontal-scrollbar to XBL)</a></li>
  </ul>
</div>


<h2 id="js">Posuvník v JavaScriptu</h2>

<p>Pro <b>jednotné zobrazení posuvníku napříč prohlížeči</b> je jediná spolehlivá možnost posuvník zajistit po svém pomocí JavaScriptu.</p>

<p>Aby bylo zachováno <b>standardní chování</b> – rychlost posunu, ovládání dotykem a setrvačnost, jde využít elementu s <code>overflow: auto</code> obaleného do elementu s nižší šířkou o rozměr posuvníku, čímž se výchozí <i>scrollbar</i> ořízne.</p>

<p><a href="https://kod.djpw.cz/twib">Živá ukázka</a></p>

<p>JavaScript potom slouží pouze pro <b>indikaci a drag &amp; drop posouvání</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://jamesflorentino.github.io/nanoScrollerJS/">nanoScroller.js</a> – plugin do jQuery</li>
    <li><a href="http://jscrollpane.kelvinluck.com/">jScrollPane</a> – vlastní posuvník napříč prohlížeči (jQuery)</li>
  </ul>
</div>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MSDN: <a href="http://samples.msdn.microsoft.com/workshop/samples/author/dhtml/refs/scrollbarColor.htm">Scrollbar Color Properties</a></li>
  <li>Webkit.org: <a href="https://www.webkit.org/blog/363/styling-scrollbars/">Styling Scrollbars</a></li>
  <li><a href="http://codemug.com/html/custom-scrollbars-using-css/">Custom scrollbars for IE, Chrome and Firefox using CSS</a></li>
  
  <li>CSS Tricks: <a href="http://css-tricks.com/custom-scrollbars-in-webkit/">Custom Scrollbars in WebKit</a></li>
</ul>