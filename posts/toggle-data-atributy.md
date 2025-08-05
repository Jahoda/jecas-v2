---
title: "Skrývání a odkrývání s data-atributy"
headline: "Skrývání a odkrývání s data-atributy"
description: "Zobrazování a skrývání obsahu elegantněji s využitím vlastních atributů."
date: "2014-02-06"
last_modification: "2014-05-06"
status: 1
tags: ["js", "prepinani-vzhledu"]
format: "html"
---

<p>Skrývání a odkrývání obsahu lze vytvořit <a href="/zobrazit-skryt">pomocí JavaScriptu</a> (a <a href="/prepinani-trid">přepínání tříd</a>) nebo i <a href="/css-rozbalovani">čistě v CSS</a> (od <b>IE 9</b> pomocí atributu <a href="/css-selektory#checked"><code>:checked</code></a>).</p>

<p>Další postup může být si přepínatelný obsah označit <a href="/vlastni-html-atributy">vlastními atributy</a> a nechat JavaScript, ať se o to postará (s využitím <a href="/queryselector"><code>querySelector</code>u</a> – <b>IE 8</b> a novější – to jde poměrně jednoduše).</p>

<h2 id="pouziti">Použití</h2>

<ul>
  <li>K <b>rozklikávacímu tlačítku</b> napíšu <code>data-toggle-control="<b>obsah</b>"</code>.</li>
  <li>K příslušnému obsahu <code>data-toggle="<b>obsah</b>"</code>.</li>
  
  <li>A když má být obsah rovnou otevřený, tak se k tlačítku přidá <code>data-control-on</code>.</li>
</ul>

<p>A je to.</p>

<pre><code>&lt;button 
  data-toggle-control="<b>obsah</b>"
  data-control-on>
  Tlačítko
&lt;/button>

&lt;div data-toggle="<b>obsah</b>">
  Obsah
&lt;/div>
</code></pre>

<ul>
  <li><a href="http://kod.djpw.cz/jzbb">Živá ukázka</a></li>
  <li>Kód na <a href="https://github.com/Jahoda/js-data-attr-toggle">GitHubu</a></li>
</ul>

<p>Poznámka: skrývání obsahu by se teoreticky správně mělo provádět jen při <a href="/vypnuty-js">zapnutém JS</a>.</p>

<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li><a href="http://scotch.io/tutorials/javascript/how-to-use-ngshow-and-nghide">How To Use ngShow and ngHide</a></li>
</ul>