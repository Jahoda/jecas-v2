---
title: "Kulatý obrázek"
headline: "Kruhový obrázek"
description: "Různé možnosti vytvoření kruhového obrázku."
date: "2013-08-05"
last_modification: "2013-08-05"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<p>Někdy se může hodit mít na stránce obrázek kulatý, jaké existují možnosti?</p>

<h2 id=prekresleni>Překreslení v grafickém editoru</h2>
<p>Nejtrivialnější možnost je obrázek překreslit. Problém je, že to není moc universální (co až nebude kulatý vzhled žádoucí?).</p>
<img src="/files/article/kruhovy-obrazek.png" alt="Ilustrační obrázek">

<h2 id=border-radius>Kulaté okraje (<code>border-radius</code>)</h2>
<p>Od <b>Internet Exploreru 9</b> lze použít CSS vlastnost <code><a href="/border-radius">border-radius</a></code>. Stačí ji nastavit buď v polovině šířky obrázku, nebo jako 50 %.</p>
<pre><code>#obrazek {border-radius: 50%}</code></pre>

<!-- Kód ukázky -->
<style>
  #obrazek {border-radius: 50%; transition: all .5s}
  #obrazek:hover {border-radius: 0} /* transition je jen pro efekt */
</style>
<p><img style="" src="/files/kruhovy-obrazek/obrazek.png" alt="Ilustrační obrázek" id="obrazek"></p>
<!-- konec ukázky -->

<h2 id="prekryti">Překrytí obrázekm</h2>
<p>Pro starší prohlížeče je funkční řešení vytvořit obrázek s průhledným kruhem unitř a původní obrázek takto překrýt.</p>

<h3>HTML</h3>
<pre><code>&lt;div class='prekryti'>
	&lt;span>&lt;/span>
	&lt;img src='<a href="/files/kruhovy-obrazek/obrazek.png">obrazek.png</a>' width=<b>100</b> height=<b>100</b>>
&lt;/div></code></pre>

<h3>CSS</h3>
<pre><code>img {display: block;}
.prekryti {position: relative;}
.prekryti span {background: url(<a href="/files/kruhovy-obrazek/prekryt.png">prekryt.png</a>); width: <b>100</b>px; height: <b>100</b>px; position: absolute}</code></pre>

<h3>Ukázka</h3>
<!-- Kód ukázky -->
<style>
img {display: block;}
.prekryti {position: relative;}
  .prekryti span {background: url(/files/kruhovy-obrazek/prekryt.png); width: 100px; height: 100px; position: absolute; opacity: 1; transition: opacity .5s}
  .prekryti:hover span {opacity: 0} /* transition je jen pro efekt */
</style>
<div class='prekryti'>
	<span></span>
	<img src='/files/kruhovy-obrazek/obrazek.png' width=100 height=100>
</div>
<!-- konec ukázky -->