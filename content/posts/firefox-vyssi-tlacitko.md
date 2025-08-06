---
title: "Vyšší tlačítko ve Firefoxu"
headline: "Vyšší tlačítko ve Firefoxu"
description: "Prohlížeč Firefox má zajímavou <i>vlastnost</i> u formulářových tlačítek. Dělá je vyšší než ostatní prohlížeče."
date: "2015-10-07"
last_modification: "2015-10-09"
status: 1
tags: ["css", "hotova-reseni", "stylovani"]
format: "html"
---

<p>Obecně není v CSS dobrým zvykem <b>nastavovat elementům výšku</b>. Jedinou výjimkou jsou <b>zaručeně jednořádkové prvky</b> – třeba formulářová tlačítka:</p>

<ul>
  <li><a href="/button"><code>&lt;button></code></a></li>
  <li><code>&lt;<a href="/input">input</a> type="submit"></code></li>
  <li><code>&lt;input type="button"></code></li>
  <li><code>&lt;input type="reset"></code></li>
</ul>




<p>Nastavit výšku je obecně ideální přes <code>line-height</code>, protože to rovnou zajistí <b>svislé vycentrování textu</b>.</p>

<div class="live">
  <p style="line-height: 70px; background: #fff; text-align: center;">Odstavec s nastavenou výškou 70 px</p>
</div>




<p><b>Firefox</b> však ze záhadných důvodů i při vynulování <code>border</code>u a <code>padding</code>u zobrazí <b>větší tlačítko</b>, než by měl:</p>

<p><img src="/files/firefox-vyssi-tlacitko/moz-focus-inner.png" alt="Vyšší tlačítko ve Firefoxu" class="border"></p>


















<h2 id="moz-focus-inner">Selektor <code>::moz-focus-inner</code></h2>


<p>Řešení je použít CSS selektor <code>::moz-focus-inner</code>, který slouží k znázornění <i>focusovaného</i> tlačítka. Bohužel ho ale zvětšuje. Vypnout zvětšování jde vynulováním rámečku:</p>


<pre><code>button::-moz-focus-inner {
  border: 0;
}</code></pre>



<p>V případě používání tlačítek vytvořených značkou <code>&lt;input></code> je universální zápis:</p>

<pre><code>button::-moz-focus-inner,
input[type=button]::-moz-focus-inner,
input[type=submit]::-moz-focus-inner,
input[type=reset]::-moz-focus-inner {
  border: 0;
}</code></pre>





<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/pvqb">Živá ukázka</a> – vyšší tlačítko ve <b>Firefoxu</b></li>
  </ul>
</div>

<p>Zvýraznění zaměřeného políčka je potom vhodné provést vlastnoručně pomocí <code>outline</code>:</p>


<pre><code>button:focus {outline: 1px dotted}</code></pre>



<h2 id="height"><code>height</code> místo <code>line-height</code></h2>

<p>Jiné řešení je nastavovat pro tlačítka <code>height</code>. V takovém případě by měla být výška dle zadání bez nutnosti resetovat <code>::-moz-focus-inner</code>:</p>


<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/xwqb">Živá ukázka</a> – srovnání velikosti tlačítek s <code>height</code></li>
  </ul>
</div>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS Tricks: <a href="https://css-tricks.com/forums/topic/button-padding-issue/">button padding issue</a></li>
  
  <li>David Walsh: <a href="http://davidwalsh.name/firefox-buttons">Firefox Button Height Fix</a></li>
  
  <li>StackOverflow: <a href="http://stackoverflow.com/questions/7928521/why-is-firefox-button-larger">Why is Firefox button larger?</a></li>
</ul>