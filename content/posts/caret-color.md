---
title: "Barva ukazatele caret-color"
headline: "Barva ukazatele <code>caret-color</code>"
description: "CSS vlastnost <code>caret-color</code> dokáže obarvit blikající ukazatel ve formulářových polích."
date: "2019-04-18"
last_modification: "2019-04-18"
status: 1
tags: ["formulare"]
format: "html"
---

<p>Pro znázornění umístění, kde člověk zrovna píše, existuje tzv. <i>caret</i> (visuálně zpravidla blikající ukazatel).</p>

<p>Vlastnost <code>caret-color</code> dokáze tento ukazatel <b>přebarvit</b> nebo třeba <b>úplně skrýt</b>.</p>





<h2 id="podpora">Podpora</h2>

<p>Dobře podporovaná vlastnost fungující prakticky všude kromě <b>IE</b> a <b>MS Edge</b> (do verse nepoužívající <b>Chromium</b>).</p>





<h2 id="pouziti">Použití</h2>

<pre><code>element {
  caret-color: red;
}</code></pre>


<p>Projevuje se potom nějak takto:</p>

<div class="live">
  <input type="text" style="caret-color: red" value="červený ukazatel">
  
  <div contenteditable style="caret-color: white">bílý ukazatel</div>
  
  <textarea style="caret-color: transparent">žádný ukazatel</textarea>
</div>












<p>Může se projevit elementů umožňujících zadávat uživateli vstup, tj. <a href="/input"><code>&lt;input></code></a>, <a href="/textarea"><code>&lt;textarea></code></a> nebo cokoliv s <a href="/uprava-stranky-designmode">atributem <code>contenteditable</code></a>.</p>


<h2 id="vyuziti">Využití</h2>

<p>Asi pouze v hodně ojedinělých případech. Barva ukazatele ve výchozím chování odpovídá hodnotě <a href="/currentcolor"><code>currentColor</code></a> – je tedy stejná jako barva textu. Takové chování je většinou dostatečně dobré.</p>


<p>Nastavení <b>málo kontrastního</b> nebo dokonce průhledného <i>caretu</i> (<code>caret-color: transparent</code>) potom může uživatele dost mást.</p>

<!-- náhled: https://kod.djpw.cz/txqc -->


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color"><code>caret-color</code></a></li>
  
  <li>CSS-Tricks: <a href="https://css-tricks.com/almanac/properties/c/caret-color/"><code>caret-color</code></a></li>
</ul>