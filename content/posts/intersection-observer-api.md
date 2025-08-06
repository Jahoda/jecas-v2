---
title: "Intersection Observer API"
headline: "Intersection Observer API"
description: "Jak dělat lazy-loading prvků na stránce moderním způsobem s využitím Intersection Observer API."
date: "2017-09-11"
last_modification: "2017-09-11"
status: 0
tags: []
format: "html"
---

<p>Pro snížení množství stahovaného obsahu a zrychlení webu bývá výhodné používat <b>lazy-loading</b> – načítat obsah (zejméně externí jako jsou obrázky, videa apod.) až v momentě, když je potřeba.</p>

<p>Typicky až v momentě, když se k danému prvku <b>odroluje</b>.</p>






<h2 id="historie">Historický přístup <code>getBoundingClientRect</code></h2>

<p>V JavaScriptu existuje metoda <code>getBoundingClientRect</code>, která dokáže vrátit pro libovolný element jeho umístění vůči <b>viewportu</b>.</p>

<pre><code>var element = document.querySelector('.neco');
var rect = element.getBoundingClientRect();</code></pre>









<p>Do proměnné <code>rect</code> se dostane následující objekt (hodnoty jsou pouze příklad):</p>

<pre><code>▼ ClientRect
  bottom: -376
  height: 36
  left: 8
  right: 927
  top: -412
  width: 919</code></pre>











<p>Z toho je následně možné při odrolování (událost <code>onscroll</code>) zjistit, jestli se element <a href="/zjisteni-rozmeru#viewport">nachází ve viewportu</a>.</p>




<h2 id="pouziti">Použití <code>IntersectionObserver</code></h2>

<p>S využitím <i lang="en">Intersection Observer API</i> se jde vyhnout nutnosti zjišťovat umístění v <code>onscroll</code> události.</p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/qjkc-">Test Intersection Observer API</a> – živá ukázka nejjednoduššího použití</li>
  </ul>
</div>



<h2 id="podpora">Podpora</h2>

<p>Podporovány jsou aktuální verse prohlížečů (<b>Chrome 51</b>, <b>Edge 15</b>, <b>Firefox 55</b>).</p>

<p>Pro ostatní prohlížeče jde použít polyfill, který využívá právě <code>getBoundingClientRect</code>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/jeremenichelli/intersection-observer-polyfill">Intersection Observer Polyfill</a></li>
  </ul>
</div>

<h2 id="vyuiziti">Využití</h2>

<p>Intersection Observer API se hodí ke všem případům, kde je na stránce nějak potřeba reagovat na její odscrollovanou. Tedy k věcem jako je:</p>

<ol>
  <li>stále viditelná hlavička nebo menu nemizející při odrolování,</li>
  
  <li><a href="/lazy-loading">lazy loading</a> <a href="/lazy-loading-obrazky">obrázků</a> a jiných externích prvků stránky (např. hotové řešení <a href="https://github.com/ApoorvSaxena/lozad.js">lozad.js</a> nebo <a href="https://github.com/verlok/lazyload">lazyload</a>),</li>
  
  <li>zvýraznění aktivní části stránky v <a href="/toc"><i lang="en">table of contents</i>,</a></li>
  
  <li>visuální efekty během rolování apod.</li>
</ol>

<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">Intersection Observer API</a></li>
  
  <li>Mozilla Hacks: <a href="https://hacks.mozilla.org/2017/08/intersection-observer-comes-to-firefox/">Intersection Observer comes to Firefox</a> (<a href="https://codepen.io/callahad/pen/YxXpyN">živá ukázka</a>)</li>
  
  <li><a href="https://codepen.io/mgiulio/pen/VjrYzZ">Infinite Scrolling with IntersectionObserver API</a> – nekonečné scrollování</li>
</ul>