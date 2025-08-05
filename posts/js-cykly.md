---
title: "Procházení elementů v JS"
headline: "Procházení značek v JavaScriptu"
description: "Jak cyklem procházet značky v JavaScriptu. Popis různých možností."
date: "2013-11-23"
last_modification: "2013-12-02"
status: 1
tags: ["js", "js-vyber-elementu"]
format: "html"
---

<p>Elementy se <b>společnými znaky</b> (stejný název tagu, stejný název třídy) lze získat buď metodami <code>getElement*</code>, nebo od <b>IE 8</b> metodou <a href="/queryselector"><code>querySelectorAll</code></a>. Oba postupy vrátí kolekci elementů.</p>

<p>Chceme-li se <i>získanými</i> značkami něco dělat (změnit jim <b>třídu</b>, přidat nějakou <b>funkci</b> do <code>onclick</code>u apod.), je potřeba je <b>projít cyklem</b>.</p>

<h2 id="for">Cyklus <code>for</code></h2>
<p>Časté řešení je běžný cyklus <code>for</code>, kde se prochází jednotlivé elementy do té doby, než se dosáhne počtu všech vybraných značek (<code>znacky.length</code>). (Pozor na překlep, <code>leng<font color=red>h</font>t</code> je špatně.)</p>

<p>Indexy značek se <b>číslují od nuly</b>, proto <code>var i = <b>0</b></code>.</p>

<pre><code>var znacky = document.getElementsByTagName("div");
for (var i = 0; i &lt; znacky.length; i++) {
  // znacky[i]
}</code></pre>

<p>V případě, že chceme položky <b>procházet odzadu</b>, bude <code>for</code> vypadat následovně (<a href="http://kod.djpw.cz/xws">ukázka</a>):</p>

<pre><code>for (var i = znacky.length - 1; i >= 0; i--) {
  // znacky[i]
}</code></pre>

<p>Tento postup <b>zezadu</b> by měl být <b>rychlejší</b> (nemusí se neustále procházet všechny značky a zjišťovat jejich počet — <code>znacky.length</code>).</p>

<p>Zrychlit první způsob cyklu <code>for</code> by šlo uložením <i>délky</i> do <b>pomocné proměnné</b> (<a href="http://kod.djpw.cz/ixs">ukázka</a>).</p>

<pre><code>for (var i = 0, delka = znacky.length; i &lt; delka; i++) {
  // znacky[i]
}</code></pre>

<h2 id="for-in">Cyklus <code>for … in</code></h2>
<p>Při použití <code>for</code>/<code>in</code> cyklu by projití všech elementů mohlo vypadat následovně (<a href="http://kod.djpw.cz/wws">ukázka</a>):</p>

<pre><code>for (var i in znacky) {
  // znacky[i]
}</code></pre>

<p>Nebezpečí hrozí při používání <code>for … in</code> pro <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=8&amp;topic=149917">procházení polí</a>. Druhá nevýhoda je, že směr procházení elementů <b>nemusí být shodný napříč prohlížeči</b>.</p>

<h2 id="while">Cyklus <code>while</code></h2>
<p>Po <code>for … in</code> má asi nejstručnější zápis. Někdy může být nevýhoda, že prochází značky <b>od konce</b> a <b>srozumitelnost zápisu</b> nemusí být pro každého (<a href="http://kod.djpw.cz/gxs">ukázka</a>).</p>
<pre><code>var i = znacky.length; 
while (i--) {
  // znacky[i]
}</code></pre>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Todd Motto: <a href="http://toddmotto.com/simple-foreach-implementation-for-objects-nodelists-arrays-with-automatic-type-looping/">Simple forEach implementation for Objects/NodeLists/Arrays with automatic type looping</a></li>
</ul>