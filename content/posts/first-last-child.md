---
title: "Selektory :first-child a :last-child"
headline: "Selektory  <code>:first-child</code> a <code>:last-child</code>"
description: "Pro zaměření první/poslední položky v CSS lze místo přidávání tříd použít <code>:first</code>/<code>last-child</code>."
date: "2013-05-11"
last_modification: "2013-05-11"
status: 1
tags: ["css", "selektory-css"]
format: "html"
---

<p>Kromě starších Internet Explorerů (tam <a href="/css3-ie">jde doplnit podporu JavaScriptem</a>) funkční ve všech běžných prohlížečích.</p>
<style>
.test span:first-child {color: blue;}
.test span:last-child {color: red;}
</style>

<h2>CSS</h2>
<pre>.test span:first-child {color: blue;}
.test span:last-child {color: red;}
</pre>

<h2>HTML</h2>
<pre class="test">
&lt;div class='test'>
	<span>&lt;span>Odkaz 1 (<code>:first-child</code> modře od IE 7)&lt;/span></span>
	<span>&lt;span>Odkaz 2&lt;/span></span>
	<span>&lt;span>Odkaz 3&lt;/span></span>
	<span>&lt;span>Odkaz 4&lt;/span></span>
	<span>&lt;span>Odkaz 5 (<code>:last-child</code> červeně od IE 9)&lt;/span></span>
&lt;/div>	
</pre>

<h2>Další selektory</h2>
<p>Seznam <a href="/css-selektory">všech CSS selektorů</a> je na samostatné stránce.</p>