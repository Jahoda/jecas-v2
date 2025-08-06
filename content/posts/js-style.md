---
title: "Změna stylů JavaScriptem"
headline: "Změna stylů JavaScriptem"
description: "Jak JavaScriptem nastavovat CSS pro změnu vzhledu jednotlivých elementů."
date: "2014-01-31"
last_modification: "2015-11-13"
status: 1
tags: ["css", "js", "napady"]
format: "html"
---

<p>Ke stylu jednotlivých elementů je v JS přístup prostřednictvím vlastnosti <code>style</code>.</p>


<pre><code>var element = document.getElementById("idecko");
element.<b>style</b>.color = "red";</code></pre>


<p>Pro CSS vlastnosti s pomlčkou (spojovníkem) se potom spojovník vypustí a následující písmeno po něm zvětší (příklad pro vlastnost <code>background-color</code>):</p>

<pre><code>element.style.background<b>C</b>olor = "red";</code></pre>



<h2 id="prefixy">CSS prefixy</h2>

<p>Rovněž <a href="/css-prefixy">prefixované</a> vlastnosti jdou JavaScriptem měnit.</p>

<p>Logika je stejná – vypustit spojovník a následující písmeno zvětšit. Vlastnost <code><b>-</b>webkit<b>-</b>animation</code> tak bude <code><b>W</b>ebkit<b>A</b>animation</code>:</p>

<pre><code>element.style.WebkitAnimation = "animace";</code></pre>



<p>Odlišná je situace v <b>IE</b>, kde je první písmeno malé:</p>

<pre><code>element.style.<b>m</b>sTransform = "…";</code></pre>






<h2 id="cssText">CSS text</h2>

<p>V případě, že je potřeba u jednoho elementu měnit více vlastností, je možné nastavovat vlastnost po vlastnosti:</p>

<pre><code>element.style.color = "red";
element.style.padding = "1em";</code></pre>




<p>Nebo použít <code>cssText</code>, kam se píše normální CSS:</p>

<pre><code>element.style.<b>cssText</b> = "color: red; padding: 1em";</code></pre>



<h3 id="vein">veinjs</h3>

<p>Elegantnější nastavování vlastností nabízí například knihovna veinjs.</p>

<pre><code>vein.inject('h1.myHeader', {'color': 'red', 'font-size': '3em'});</code></pre>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/israelidanny/veinjs">veinjs</a> – elegantní nastavování CSS v JavaScriptu</li>
  </ul>  
</div>


<p>Podobný zápis umí i funkce <code><a href="http://api.jquery.com/css/">css()</a></code> v <b>jQuery</b>.</p>


<h2 id="tridy">Změna CSS třídy</h2>

<p>Pokud se nastavovaný vzhled nějak <b>nezjišťuje a nepočítá skriptem</b>, nabízí se v JS pouze měnit CSS třídy a příslušné styly mít v CSS souboru.</p>

<div class="internal-content">
  <ul>
    <li><a href="/prepinani-trid">Přepínání tříd v JS</a> – jak JavaScriptem měnit třídy</li>
  </ul>
  
</div>

<p>Například:</p>

<pre><code>element.className += " nazevTridy";</code></pre>

<p>A v CSS:</p>

<pre><code>.nazevTridy {
  /* styly */;
}</code></pre>









<h2 id="pripojeni-css">Připojení CSS</h2>

<p>Má-li se skriptem vypočítaný styl aplikovat pro <b>velké množství elementů</b>, není potřeba procházet všechny elementy a nastavovat jim vlastnosti/třídy, ale jde skriptem vytvořit přímo CSS a připojit ho do stránky:</p>

<pre><code>var css = "p {color: red}";
var styl = document.createElement("style");
styl.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(styl);</code></pre>

<p><a href="https://kod.djpw.cz/kcsb">Ukázka</a></p>







<p>Pro <b>IE 8</b> a starší i nové prohlížeče zároveň je funkční následující postup:</p>

<pre><code>var css = "p {color: red}";
var div = document.createElement('div');
div.innerHTML = '&lt;span>&amp;nbsp;&lt;/span>&lt;style>' + css + '&lt;/style>';
document.getElementsByTagName('head')[0].appendChild(div.childNodes[1]);</code></pre>





<p><a href="https://kod.djpw.cz/lcsb">Ukázka</a></p>


<p>Tento postup jde použít třeba pro <a href="/css-vyhledavani#vyhledavani">vyhledávání pomocí CSS selektorů</a>.</p>



<h2 id="cteni">Přečtení hodnoty</h2>

<p>Vlastnost <code>style</code> nejde používat pro zjištění stylu:</p>

<pre><code>&lt;style>
  p {color: red}
&lt;/style></code></pre>




<p>Odstavec bude červený, ale v jeho <code>style.color</code> nebude nic:</p>

<pre><code>console.log(odstavec.style.color); // nic</code></pre>



<p>Zjišťovat skutečný styl jde přes <code>getComputedStyle</code>:</p>

<div class="internal-content">
  <ul>
    <li><a href="/zjisteni-css">Zjištění výsledného CSS v JavaScriptu</a></li>
  </ul>
</div>