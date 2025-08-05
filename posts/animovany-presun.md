---
title: "Animovaný přesun elementu"
headline: "Animovaný přesun elementu"
description: "Jak jeden element přemístit do jiného s plynulou změnou umístění."
date: "2014-05-17"
last_modification: "2014-05-17"
status: 0
tags: []
format: "html"
---

<p>Pro lepší uživatelský dojem se může hodit nějaký prvek z bodu A do bodu B přesunou plynule JavaScriptem.</p>

<p>Třeba položka v e-shopu se po přidání do košíku může do něj visuálně přesunout. Uživatel tak získá přehled, kde se košík na stránce nachází.</p>




<h2 id="presun">Přesun elementu</h2>

<p>Vyjmout někde HTML element a vložit ho do jiného rodiče je v JavaScriptu velmi jednoduché:</p>

<pre><code>cil.appendChild(element);</code></pre>


<p>První myšlenka pro animovaný přesun tak může znít, že se spočítá cílové umístění, element se tam pouze visuálně přemístí transformací <code>translate</code> (nebo hůře <a href="/position#absolute">absolutním posicováním</a>) a po dokončení přesunu se provede skutečné přemístění v <a href="/dom">DOMu</a> přes <code>appendChild</code> a transformace se zruší.</p>


<p><a href="http://kod.djpw.cz/orsb">Živá ukázka</a> – přesun transformací a přehození elementu</p>

<p><a href="http://kod.djpw.cz/lhdb">Živá ukázka</a></p>






<h2 id="flip">FLIP – lepší řešení</h2>

<p>S ohledem na rychlost existuje ale lepší postup. Nazvaný zkratkou FLIP (First, Last, Invert, Play):</p>

<ul>
  <li></li>
</ul>

<ul>
  <li><a href="http://aerotwist.com/blog/flip-your-animations/">FLIP Your Animations</a></li>
</ul>