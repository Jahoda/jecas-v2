---
title: "Odrolování na element"
headline: "Odrolování na určitý HTML tag"
description: "Nestačí-li běžné odrolování na HTML #kotvu, přichází na řadu JavaScript."
date: "2013-05-20"
last_modification: "2013-05-24"
status: 1
tags: ["hotova-reseni", "js", "scroll"]
format: "html"
---

<p>V JS stačí elementu, který se má odrolovat, nastavit vlastnost <code>scrollTop</code>/<code>scrollLeft</code> (pro odrolování shora, respektive zleva). Pro opačné strany (zdola, zprava) něco jako scrollBottom/scrollRight neexistuje, ale v podstatě není problém to dopočítat z výšky/šířky elementu). 

<p>Nebo je možné použít metodu <code>scrollTo(X-souřadnice, Y-souřadnice)</code> (pro rolování celé stránky pomocí objektu <code>window</code>):
<pre><code>// Odrolovat na 50 px zleva a 100 px shora
window.scrollTo(50, 100);</code></pre>
<script>document.write("<p><button onclick='window.scrollTo(0, 20)'>Odrolovat na 20 px shora</button>")</script>

<p>Posouvání nějakého elementu (např. s <code>overflow: auto</code>) vypadá následovně.
<pre><code>var element = document.getElementById("idecko");
// Odrolovat na 50 px shora
element.scrollTop = 50;</code></pre>

<p class='note'>Na rozdíl od zadávání CSS hodnot (<code>element.style.top</code>) není třeba psát jednotky.

<h2 id=odrolovano>O kolik je odrolováno</h2>
<p>Prozradí logicky rovněž vlastnosti <code>scrollTop</code>/<code>scrollLeft</code> (přečtením namísto přenastavením).
<p>Podobně jako u <a href=/baterka>baterky</a> je třeba sjednotit chování Chrome s ostatními prohlížeči pomocí:
<pre><code>var hodnota = document.documentElement.scrollTop + document.body.scrollTop</code></pre>
<p>Chrome potřebuje <code>document.body</code>.

<script>document.write("<p><button onclick='alert(\"Top: \" + (document.documentElement.scrollTop + document.body.scrollTop) + \", Left: \" + (document.documentElement.scrollLeft + document.body.scrollLeft))'>O kolik je?</button>")</script>

<h2 id=offset>Na konkrétní značku…</h2>
<p>Tohle byla celkem nuda. Zajímavější je rolovat na nějaké dynamické hodnoty, tj. na souřadnice různých elementů.
<p>Ty lze získat z vlastností <code>offsetTop</code>/<code>offsetLeft</code>, které obsahují souřadnice elementu vůči nejbližšímu předkovi, který souřadnice <i>nuluje</i> (má CSS vlastnost <code>position</code> jinou než <code>static</code> (výchozí), tj. např. <code>relative</code>). <small>Dopočítat umístění vůči oknu u takového (zanořeného) elementu lze rekursí pomocí <code>offsetParent</code></small>.

<p>Finální kód pro odrolování např. na 5. položku seznamu může vypadat následovně.
<pre><code>var seznam = document.getElementById("list");
seznam.scrollTop = seznam.getElementsByTagName("li")[4].offsetTop;
</code></pre>

<!-- Kód ukázky -->
<ul class='live' id="list" style="max-height: 100px; overflow: auto; position: relative">
		<li style='color: green'>Položka 1</li>
		<li>Položka 2</li>
		<li>Položka 3</li>
		<li>Položka 4</li>
		<li style='color: red'>Položka 5</li>
		<li>Položka 6</li>
		<li>Položka 7</li>
		<li style='color: yellow'>Položka 8</li>
		<li>Položka 9</li>
		<li>Položka 10</li>
		<li>Položka 11</li>
		<li>Položka 12</li>
		<li>Položka 13</li>
		<li>Položka 14</li>
	</ul>
<script>
function odrolovat(kolikata)
{
var seznam = document.getElementById("list");
seznam.scrollTop = seznam.getElementsByTagName("li")[kolikata].offsetTop;
}
</script>
<p>Odrolovat na: <button onclick='odrolovat(4)'>5. položku</button>, <button onclick='odrolovat(0)'>1. položku</button>, <button onclick='odrolovat(7)'>8. položku</button>