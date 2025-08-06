---
title: "Zoomování kolečkem"
headline: "Směr rolování kolečkem"
description: "Jak podle směru otáčení kolečka myši měnit velikost obsahu."
date: "2014-11-15"
last_modification: "2015-02-02"
status: 1
tags: ["hotova-reseni", "js", "js-udalosti"]
format: "html"
---

<p>Například u obrázku může být šikovné umožnit jeho zvětšení/zmenšení na základě směru <b>točení kolečka myši</b>.</p>


<h2 id="udalost">Připojení události</h2>

<p>Obsluha události pro zachytávání točení kolečka se liší ve <b>Firefoxu</b> a ostatních prohlížečích.</p>

<pre><code>&lt;div 
  id="idecko" 
  <b>onmousewheel</b>="zoom(event)"
></code></pre>





<p>Připojení téže funkce <code>zoom</code> pro <b>Firefox</b> s využitím <a href="/pripojeni-udalosti#event-listener"><code>addEventListener</code></a>:</p>

<pre><code>if (document.addEventListener) { 
  var div = document.getElementById("idecko");
  div.addEventListener("<b>DOMMouseScroll</b>", zoom, false);
}</code></pre>






<h2 id="smer">Směr otáčení</h2>

<p>Zjistit směr, kterým člověk roluje kolečkem, jde z objektu <code>event</code>. Funkce, která bude vracet hodnotu <code>-1</code> pro oddalování a <code>1</code> pro přibližování, vypadá následovně. (První řádek sjednocuje práci s <code>event</code>em.)</p>

<pre><code>function zoom(e) {
  e = e || window.event;
  var sjednocenySmer = e.wheelDelta || -e.detail;
  var smer = Math.max(-1, Math.min(1, sjednocenySmer));
}</code></pre>







<p>Funkce do proměnné <code>smer</code> nastaví <code>1</code> při rolování nahoru a <code>-1</code> při rolování dolů.</p>

<p><a href="https://kod.djpw.cz/pbkb">Živá ukázka</a></p>



<h2 id="zoom">Zoomování</h2>

<p>Když už funguje odchytávání kolečka, nic nebrání realisaci přibližování. Dobré je při přiblížení brát v úvahu <b>posici kursoru</b> – tj. aby na místě kursoru byla stále ta samá oblast.</p>

<p>Pro <b>pochopení</b> věcí, co je nutné udělat při zvětšování/zmenšování, poslouží následující obrázek.</p>


<p><img src="/files/otaceni-koleckem/nakres.png" alt="Umístění obrázku při zvětšování" class="border"></p>
















<p>Obrázek má původně rozměry 100 × 100 pixelů a poměr zvětšení/zmenšení bude 20 %.</p>

<ul>
  <li>zvětšení o 20 procent proběhne vynásobením rozměrů číslem <code>1.20</code>,</li>
  
  <li>zmenšení o 20 % se zajistí vynásobením číslem <code>1/1.20</code> (myslím, že v matematice se tomu říká převrácená hodnota)</li>
</ul>

<p>Při zvětšení o 20 % se velikost původně 100px obrázku změní na 120 pixelů. Následně je nutné vyřešit správné posunutí. Z obrázku výše je patrné, že původní umístění kursoru 70 px od kraje obrázku připadá po vynásobení <code>1.2</code> na přibližně 85 px (70 * 1,2 = 84). Tedy umístění zleva by mělo vyjít na <b>-14 px</b>.</p>

<p>Zvětšený obrázek je tedy nutné posunout o rozdíl těchto dvou hodnot.</p>

<p>V podobě JS kódu to vypadá následovně:</p>

<pre><code>obrazek.x += (mys.x * -pomer + mys.x);</code></pre>




<p>Obrázek je nejprve při načtení stránky umístěn hned na kraji (<code>obrazek.x</code> je rovno <code>0</code>). Souřadnice X myši (<code>mys.x</code>) je 70 px a poměr při zvětšování 1,2.</p>

<pre><code>(70 * (-1,2)) + 70 =
-84 + 70 =
-14</code></pre>





<p><a href="https://kod.djpw.cz/qbkb">Test principu</a> (místo rolování se kliká)</p>

<p>Nyní stačí jen spojit obě ukázky v jednu.</p>

<p><a href="https://kod.djpw.cz/obkb">Živá ukázka</a></p>




<h2 id="zlepseni">Navazující zlepšení</h2>

<p>Při umožnění změny velikosti je většinou nutné stanovit <b>minimální/maximální úroveň přiblížení</b>, aby obrázek nemohl v podstatě zmizet při velkém oddálení.</p>

<p>Pro lepší pohodlí se hodí přidat i možnost <b>přesouvání obrázku</b> pomocí <a href="/drag-drop">drag &amp; drop</a>.</p>

<p>V novější prohlížečích je <b>výkonnější</b> zvětšovat a přesouvat objekty pomocí CSS vlastnosti <code>transform</code>.</p>

<p>Docílit <b>plynulé změny</b> velikosti při zoomu jde pomocí <a href="/transition"><code>transition</code></a>.</p>

<p>Pro zvětšování/zmenšování na mobilních zařízeních se obvykle používá gesto dvěma prsty, které je nutné implementovat v JS. Anglicky se toto gesto nazývá <i>pinch to zoom</i>.</p>
