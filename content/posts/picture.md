---
title: "Picture"
headline: "HTML zančka <code>&lt;picture></code>"
description: "Jak se používá HTML značka pro vkládání responsivních obrázků <code>&lt;picture></code>."
date: "2014-08-31"
last_modification: "2014-08-31"
status: 0
tags: []
format: "html"
---

<p>Značka <code>&lt;picture></code> slouží k elegantnějšímu vytváření <a href="/responsivni-obrazky">responsivních obrázků</a> bez různých JavaScriptových nebo serverových řešení.</p>


<h2 id="podpora">Podpora</h2>

<p>Funguje od:</p>

<ul>
  <li><b>Chrome 38</b></li>
  <li><b>Firefox 33</b></li>
  <li><b>Opera 25</b></li>
</ul>



<h2 id="zapis">Zápis</h2>

<pre><code>&lt;picture>
  &lt;<b>source</b> media="(min-width: 45em)" srcset="obrazek-velky.jpg">
  &lt;<b>source</b> media="(min-width: 32em)" srcset="obrazek-stredni.jpg">
  &lt;<i>img</i> src="obrazek.jpg" alt="Popis obrázku">
&lt;/picture></code></pre>

<p><b>Alternativní obrázky</b> se tedy umisťují do atributu <code>srcset</code> značky <code>&lt;source></code>. Kdy se mají použít určuje HTML atribut <a href="/html-media"><code>media</code></a>. Za povšimnutí stojí stará dobrá značka <code>&lt;img></code>, která slouží jako <i>fallback</i> pro prohlížeče neznalé značek <code>&lt;picture></code> a <code>&lt;source></code> i jako obrázek pro podporované prohlížeče v případě, že se <code>media</code> podmínky nesplní.</p>


<h2 id="source">Značka <code>&lt;source></code></h2>


<h2 id="vyuziti">Využití</h2>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://demosthenes.info/blog/1059/Responsive-Image-Hinting-Using-the-w-Descriptor">Responsive Image Hinting: Using the w Descriptor</a></li>
  
  <li>Dev.Opera: <a href="https://dev.opera.com/articles/native-responsive-images/">Native Responsive Images</a></li>
  
  <li>Chromium Blog: <a href="http://blog.chromium.org/2014/08/chrome-38-beta-new-primitives-for-next.html
">Chrome 38 Beta: New primitives for the next-generation web</a></li>
  
  <li>HTML5 Rocks: <a href="http://www.html5rocks.com/en/tutorials/responsive/picture-element/">Built-in Browser Support for Responsive Images</a></li>
  
  <li>Cloud Four Blog: <a href="http://blog.cloudfour.com/dont-use-picture-most-of-the-time/">Don’t use &lt;picture> (most of the time)</a></li>

  <li>Cloud Four Blog: <a href="http://blog.cloudfour.com/image-resizing-services/">Image Resizing Services</a></li>
  
  <li>CSS-Tricks: <a href="http://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/">Responsive Images: If you’re just changing resolutions, use srcset.</a></li>
  
  <li>Andi Dysart: <a href="http://davidwalsh.name/responsive-images">Responsive Images: The Ultimate Guide</a></li>
  
  <li>An A List Apart Article: <a href="http://alistapart.com/article/responsive-images-in-practice">Responsive Images in Practice</a></li>
  
  <li><a href="http://thenewcode.com/23/The-Missing-Piece-Using-the-HTML5-Responsive-Image-sizes-Attribute">The Missing Piece: Using the HTML5 Responsive Image sizes Attribute</a></li>
  
</ul>