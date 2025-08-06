---
title: "Rychlejší efekty při rolování"
headline: "Rychlejší efekty při rolování"
description: "Jak zajistit, aby efekty reagující na rolování po stránce byly co nejplynulejší."
date: "2014-11-12"
last_modification: "2014-11-12"
status: 0
tags: []
format: "html"
---

<p>Nepoužívat událost <code>window.scroll</code>, ale časovou smyčku, která otestuje, zda došlo k posunu. Pokud k posunu nedojde (na základě <code>window.pageYOffset</code>), nebude se nic dělat.</p>

<p>Smyčku zajistí <a href="/requestanimationframe"><code>requestAnimationFrame</code></a> nebo fallback přes <code>setTimeout</code> pro starší prohlížeče.</p>

<p>Rolování je jedna z <b>nejčastějších náročných akcí</b>, které uživatel na stránce vykoná. Prohlížeč se po rozebrání <a href="/dom">DOMu</a> snaží určit, které části budou při rolování vypadat stále stejně. Z nich potom vytvoří <i>obrázek</i> (vrstvu). Těchto vrstev může být na stránce více a různě se seskupovat. Když se potom na stránce při rolování něco změní, prohlížeč překreslí jen danou část.</p>

<p>V ideálním případě toho prohlížeč při rolování <b>překresluje co nejméně</b>, což má positivní efekt na plynulost rolování.</p>

<p>Momentálně je to značný problém <i>parallax</i> efektů, kdy se při rolování s něčím hýbe.</p>


<h2 id="timeline">Přehled ve vývojářských nástrojích</h2>

<p>Ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> Chrome je na kartě <i>Timeline</i> možné pozorovat právě překreslování stránky. Nástroj umí i napsat rozměry překreslované oblasti a po <b>najetí myší</b> ji zvýraznit na stránce.</p>

<p>Rozhodně je dobré si tuto kartu při testování webu otevřít a operace, co sníží počet snímků za sekundu pod 60 snímků (60 fps), prozkoumat.</p>

<p><img src="/files/rolovani/timeline.png" alt="Časová osa vykreslování stránky" class="border"></p>




<h2 id="priklad">Příklad</h2>

<pre><code>var raf = window.requestAnimationFrame || 
  window.mozRequestAnimationFrame  ||
  window.webkitRequestAnimationFrame  ||
  setTimeout;

var menu = document.getElementById('fixed-menu');
var coords = menu.getBoundingClientRect();
window.onscroll = function() {

raf(function() {
odrolovano = document.documentElement.scrollTop + document.body.scrollTop;

document.title = coords.top + " --- " + odrolovano;
document.body.className = (
odrolovano > coords.top
) ? "body-fixed-menu" : "";
});
}</code></pre>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://gist.github.com/Warry/4254579">How to make faster scroll effects?</a></li>
  
  <li>HTML5 Rocks: <a href="http://www.html5rocks.com/en/tutorials/speed/animations/">Leaner, Meaner, Faster Animations with requestAnimationFrame</a></li>
  
  <li>HTML5 Rocks: <a href="http://www.html5rocks.com/en/tutorials/speed/scrolling/">Scrolling Performance</a></li>
  
  <li>HTML5 Rocks: <a href="http://www.html5rocks.com/en/tutorials/speed/rendering/">Jank Busting for Better Rendering Performance</a></li>
  
  <li>HTML5 Rocks: <a href="http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/">High Performance Animations</a></li>
  
  <li><a href="http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision">requestAnimationFrame API: now with sub-millisecond precision</a></li>
  
  <li><a href="http://ejohn.org/blog/learning-from-twitter/">Learning from Twitter</a></li>
  <li><a href="http://jankfree.org/">Jank Free: Let's Make the Web Silky Smooth!</a></li>
  
  <li><a href="https://github.com/w3c/frame-timing/wiki/Explainer">Explainer</a> – měření FPS na stránce</li>
  
  <li><a href="http://hugeinc.com/ideas/perspective/everybody-scrolls">Everybody Scrolls.</a></li>
  
  <li><a href="http://osvaldas.info/auto-hide-sticky-header">Auto-Hide Sticky Header</a></li>
</ul>