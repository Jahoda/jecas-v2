---
title: "Nejbližší nadřazený element – closest"
headline: "Nejbližší předek elementu  – <code>closest</code>"
description: "JavaScriptovou metodou <code>closest</code> jde získat nejbližší nadřazený element vyhovující selektoru."
date: "2015-03-11"
last_modification: "2015-03-14"
status: 1
tags: ["js"]
format: "html"
---

<p>Pokud je skriptem vybrán nějaký element, jde se dostat pomocí <code>parentNode</code> k jeho nejbližšímu předkovi.</p>

<pre><code>&lt;div class="predek">
  &lt;div id="potomek">
  &lt;/div>
&lt;/div></code></pre>




<p>Pro tento HTML kód to v JS vypadá následovně:</p>

<pre><code>var potomek = document.getElementById("potomek");
var predek = potomek.<b>parentNode</b>;</code></pre>



<p>Hodí se to například při <a href="/prepinani-trid">přepínání třídy</a> společnému obalu tlačítka a obsahu, který se má <a href="/zobrazit-skryt">zobrazit/skrýt</a>. Značný problém tohoto postupu je ale v tom, že je JS kód <b>hodně závislý na změně HTML</b> – stačí přidat třeba další obal, a vše přestane fungovat.</p>

<p>Pomocí <code>closest</code> jde nadřazený element specifikovat CSS selektorem (selektor se zadává podobně jako u <a href="/queryselector"><code>querySelector</code>/<code>querySelectorAll</code></a>).</p>



<h2 id="zapis">Zápis</h2>

<p>Metoda <code>closest</code> má jeden povinný parametr, což je CSS selektor.</p>

<pre><code>&lt;div class="predek">
  &lt;div>
    &lt;div id="potomek">
    &lt;/div>
  &lt;/div>
&lt;/div></code></pre>








<p>Pro tento HTML kód, kde je mezi potomkem a předkem další <code>&lt;div></code>, jde provést následující:</p>

<pre><code>var potomek = document.getElementById("potomek");
var predek = potomek.<b>closest('.predek')</b>;</code></pre>

<p>Kód vybere nejbližší nadřazený element, co má třídu <code>predek</code>.</p>

<p>Zajímavé a trochu zrádné je, že se element může dostat i „sám na sebe“, bude-li vyhovovat zadanému selektoru.</p>

<pre><code>potomek.closest('<b>div</b>');</code></pre>

<p>Tato konstrukce tedy opět vybere potomka (protože se jedná o <code>&lt;div></code>, čímž bude vyhovovat zadanému selektoru).</p>





<h2 id="podpora">Podpora</h2>

<p>Metoda <code>closest</code> je zatím podporována pouze v následujících prohlížečích:</p>

<ul>
  <li><b>Firefox 35</b>,</li>
  <li><b>Chrome 41</b>,</li>
  <li><b>Opera 18</b></li>
</ul>

<p>Pro nepodporované prohlížeče jde podpora doskriptovat pomocí <code>parentNode</code> a <code>querySelectoru</code> nebo <a href="/matches#js"><code>matches</code></a>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/pmlb">Polyfill funkce closest</a></li>
  </ul>
</div>





<h2 id="jquery"><code>closest()</code> v jQuery</h2>

<p>JS knihovna jQuery disponuje obdobou nativní funkce <code>closest</code>.</p>

<div class="external-content">
  <ul>
    <li>jQuery API: <a href="http://api.jquery.com/closest/">.closest()</a></li>
  </ul>
</div>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/closest">Element.closest()</a></li>
</ul>