---
title: "CSS toggle()"
headline: "CSS funkce <code>toggle()</code>"
description: "Nefunguje zatím snad nikde, měla by sloužit k pohodlnému zadávání hodnot pro zanořené elementy stejného názvu."
date: "2013-06-06"
last_modification: "2013-06-07"
status: 1
tags: ["css", "css-funkce"]
format: "html"
---

<p>Pokud se má nějak měnit styl s ohledem na zanoření, není současně podporované CSS moc elegantní. Zvláště pokud by bylo úrovní opravdu hodně, může být kód nekonečný.
<pre><code>ul {list-style-type: disc}
ul ul {list-style-type: circle}
ul ul ul {list-style-type: square}</code></pre>
<p>A k tomu by mělo být právě <code>toggle</code>:
<pre><code>ul ul { list-style-type: toggle(disc, circle, square, box); }</code></pre>
<p>Stačí jeden řádek a styly se budou neustále opakovat.

<h2>Ukázka (nejspíš nikde nefunguje)</h2>
<!-- Ukázka -->
<style>
ul { list-style-type: disc; }
ul ul { list-style-type: toggle(disc, circle, square, box); }
</style>
<div class='live'>
<ul>
	<li>Položka 1</li>
	<ul>
		<li>Položka 1</li>
		<li>Položka 2</li>
		<ul>
			<li>Položka 1</li>
		</ul>
		<li>Položka 1</li>
	</ul>
	<li>Položka 1</li>
	<li>Položka 2</li>
</ul>
</div>
<!-- / konec ukázky -->

<h2 id=zdroje>Zdroje a související odkazy</h2>
<ul>
<li>Specifikace: <a href='http://www.w3.org/TR/css3-values/#toggle'>W3C: CSS Values and Units Module Level 3</a>
</ul>
