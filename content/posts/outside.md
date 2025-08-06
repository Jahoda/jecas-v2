---
title: "Pseudo-element ::outside"
headline: "Pseudo-element ::outside"
description: "Obalení elementu dalším prvkem."
date: "2015-02-17"
last_modification: "2015-02-17"
status: 0
tags: []
format: "html"
---

<p>Při tvoření složitějších CSS konstrukcí je často nevyhnutelné použít několik <b>obalujících</b> elementů.</p>

<pre><code>&lt;div class="obal-obalu-obsahu">
  &lt;div class="obal-obsahu">
    &lt;div class="obsah">
    &lt;/div>
  &lt;/div>
&lt;/div></code></pre>






<p>A následně CSS ve stylu:</p>

<pre><code>.obsah {}
.obal-obsahu {}
.obal-obalu-obashu {}</code></pre>





<h2 id="zapis">Zápis</h2>

<p>Návrh CSS specifikace pro případy obalení počítá s pseudo-elementem <code>::outside</code>, kterým půjde <i>obalit</i> HTML element <b>bez nutnosti přidávat obal</b> do HTML kódu.</p>

<pre><code>.obsah {}
.obsah<b>::outside</b> {}</code></pre>



<p>Pro více obalů než jeden je potom možné uvést číslo jako parametr do závorky:</p>

<pre><code>.obsah {}
.obash::outside {}
.obsah::outside<b>(2)</b> {}</code></pre>







<h2 id="podpora">Podpora</h2>

<p>Pseudo-element <code>::outside</code> napodporuje žádný prohlížeč.</p>





<h2 id="nahrada">Řešení v JavaScriptu</h2>

<p>Docílit obalení čehokoliv bez úprav HTML je tak možné jedině v JavaScriptu. V jQuery k tomu slouží funkce <code>wrap</code>:</p>

<pre><code>$('.obsah').wrap('&lt;div class="obal-obsahu" />');</code></pre>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>W3C: <a href="http://www.w3.org/TR/css3-content/#wrapping">CSS3 Generated and Replaced Content Module</a></li>
</ul>