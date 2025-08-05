---
title: "JS querySelector"
headline: "Výběr elementů <code>querySelector</code>em"
description: "Metoda <code>querySelector</code> a <code>querySelectorAll</code> zjednodušuje výběr elementů v JavaScriptu."
date: "2013-11-22"
last_modification: "2013-11-30"
status: 1
tags: ["js", "js-vyber-elementu"]
format: "html"
---

<p>Chceme-li na stránce <b>najít pomocí JS</b> nějaký element, existuje několik možností.</p>

<ul>
  <li>Procházet DOM metodami typu <code>getElementsByTagName</code>.</li>
  <li><b>Cílovému</b> elementu přidat <a href="/id-class">ID</a> a <b>najít</b> ho přes:
  <pre><code>var element = document.getElementById("idecko");</code></pre></li>
  <li>Použít JS knihovnu jQuery/<a href="/framework-zepto">Zepto</a>, kde se dá používat běžné <a href="/css-selektory">CSS selektory</a>:
  <pre><code>var element = $("#id");
var odkazyVTabulkach = $("table a");</code></pre>
  </li>
  <li>Použít právě <code>querySelector</code>/<code>querySelectorAll</code>, který umí od <b>IE 8</b> totéž bez nutnosti natahovat <b>několik desítek kB velkou knihovnu</b>.
  <pre><code>var element = document.querySelector("#id");
var odkazyVTabulkach = document.querySelectorAll("table a");</code></pre>
  </li>
</ul>

<h2 id="podpora">Podpora</h2>
<p>Funguje <i>částečně</i> (nebo spíš <i>neúplně</i>) už v <b>IE 8</b>. Částečně v tom smyslu, že <i>zná</i> jen ty selektory, co fungují ve stejném prohlížeči i v CSS. Tedy jen částečně funguje třeba i v <b>IE 9</b>, kde nebude znát např. <a href="/css-selektory#validace">pseudotřídu <code>:valid</code></a> (<a href="http://kod.djpw.cz/pts">test</a>).</p>

<p>Nicméně většina CSS selektorů už v IE 8 funguje. Proto je i třeba <code>querySelectorAll</code> výhodnější než metoda <code>getElementsBy<b>ClassName</b></code>, která funguje až od <b>IE 9</b>.</p>

<h2 id="zapis">Zápis</h2>
<p>Použití je obdobné jako <code>getElement(s)By*</code> metody. Rozdíl mezi <code>querySelector</code> a <code>querySelector<b>All</b></code> spočívá v tom, že:</p>

<ol>
  <li><code>document.querySelector(".trida")</code> — vrátí <b>první element</b> s třídou <code>trida</code>.</li>
  <li><code>document.querySelector<b>All</b>(".trida")</code> — vrátí <b>kolekci všech elementů</b> s třídou <code>trida</code>.</li>  
</ol>

<p>Procházet pole elementů je možné klasickým způsobem (<a href="http://kod.djpw.cz/rws">ukázka</a>):</p>
<pre><code>var znacky = document.querySelectorAll(".trida");
for (var i = 0; i &lt; znacky.length; i++) {
  // znacky[i]
}
</code></pre>

<h2 id="dolar">Zápis <code>$("element")</code></h2>
<p>S využitím <code>querySelector</code>u je možné docílit <i>dolarového</i> zápisu, který se stal populární v JS frameworcích (<a href="http://kod.djpw.cz/oobb">ukázka</a>).</p>
<pre><code>function $(selektor, el) {
  if (!el) el = document;
  var elementy = el.querySelectorAll(selektor);
  return elementy;
}</code></pre>
<!-- return elementy.length > 1 ? elementy : elementy[0] -->