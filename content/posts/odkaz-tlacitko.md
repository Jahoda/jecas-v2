---
title: "Odkaz jako tlačítko"
headline: "Odkaz vypadající jako tlačítko"
description: "Odkaz jako tlačítko, nebo tlačítko jako odkaz? Postup, jak z odkazu vyrobit tlačítko a naopak."
date: "2013-08-16"
last_modification: "2013-08-20"
status: 1
tags: ["css", "formulare", "hotova-reseni", "odkazy"]
format: "html"
---

<h2 id="button">Element <code>&lt;button&gt;</code></h2>

<p>Asi nejjednodušší způsob vytvoření odkazu, který vypadá jako tlačítko je použití značky <code>&lt;button&gt;</code> uvnitř odkazu. Problém je, že <b>Internet Explorer 8</b> a starší takový odkaz neproklikne.</p>
<pre><code>&lt;a href="#"&gt;&lt;button&gt;Text „odkazu“&lt;/button&gt;&lt;/a&gt;</code></pre>
<p><a href="http://jecas.cz"><button>Je čas (neproklikne IE 8)</button></a></p>
<p>Jde to řešit JavaScriptem:</p>
<p><a href="http://jecas.cz"><button onclick="document.location= this.parentNode.href">Je čas (proklikne i starý IE)</button></a></p>
<p>Ale lepší bude…</p>

<h2 id="stylovani">Úprava CSS</h2>
<p>Druhá možnost je použít CSS a odkaz nastylovat jako tlačítko nebo naopak udělat tlačítko vypadající jako běžný odkaz.</p>

<h3 id="odkaz">Odkaz jako tlačítko</h3>
<p>Budeme vycházet z toho, že běžné tlačítko má minimálně:</p>
<ul>
  <li>pozadí (<code>background</code>),</li>
  <li>rámeček (<code>border</code>),</li>
  <li>nějaký <code>padding</code>,</li>
  <li>má <code>:hover</code>, <code>:active</code> a <code>:focus</code> <a href="/vzhled-formularu">efekty</a>,</li>
  <li>není podtržené <code>text-decoration: none</code>,</li>
  <li><b>nemá</b> <span style='cursor: pointer'>kursor ručičky</span> (<code>cursor: pointer</code>),</li>
  <li>může mít jiný <code>font</code>,</li>
  <li>může mít kulaté rohy (<code>border-radius</code> – IE9+).</li>
</ul>

<pre><code>a.tlacitko {padding: .5em; background: #D62988; border: 1px solid #B41F71; color: #fff; cursor: default; text-decoration: none; border-radius: 5px}
a.tlacitko:hover {background: #E371AF}
a.tlacitko:active {position: relative; top: 1px; left: 1px}</code></pre>

<div class="live">
  <style>a.tlacitko {padding: .5em; background: #D62988; border: 1px solid #B41F71; color: #fff; cursor: default; text-decoration: none; border-radius: 5px}
  a.tlacitko:hover {background: #E371AF}
  a.tlacitko:active {position: relative; top: 1px; left: 1px}
  </style>
  <p>To je <a href="http://jecas.cz" class="tlacitko">odkaz</a> — vypadá jako tlačítko.</p>
</div>

<h3 id="tlacitko">Tlačítko jako odkaz</h3>
<p>Při obráceném postupu je naopak potřeba tlačítko <i>odstrojit</i> do podoby odkazu — tj. výše uvedené (rámečky, pozadí, odsazení apod.) <i>resetovat</i> a nastavit do podoby odkazu.</p>

<div class="live">
  <style>
    .ne-tlacitko {background: none; color: #D62988; padding: 0; border: 0; text-decoration: underline; cursor: pointer; font: inherit}
  </style>
  <p>To je <button class="ne-tlacitko">tlačítko</button> — ale vypadá podobně jako <a href="http://jecas.cz/">odkaz</a>.</p>
</div>

<pre><code>.ne-tlacitko {background: none; color: #D62988; padding: 0; border: 0; text-decoration: underline; cursor: pointer; font: inherit}</code></pre>
