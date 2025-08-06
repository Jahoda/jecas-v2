---
title: "Zvýraznění aktivní kotvy"
headline: "Zvýraznění aktivované kotvy (<code>:target</code>)"
description: "Pokud se v rámci stránky používají odkazy na jednotlivé <code>#části</code>, může být vhodné zvýrazněním ukázat, kam odkaz mířil."
date: "2013-05-12"
last_modification: "2013-05-12"
status: 1
tags: ["css", "hotova-reseni", "scroll", "selektory-css"]
format: "html"
---

<!-- reset -->
<style>.content menu a {color: #fff}</style>
<div id="target">
<h2>Selektor <code>:target</code></h2>
<p>Od Internet Exploreru 9 (včetně) lze použít jednoduché řešení <b>bez JavaScriptu v prostém CSS</b>:</p>
<pre><code>:target {background: #FFCFA4;}</code></pre>
<p>Po <a href='#target'>kliknutí</a> se v podporovaných zařízeních celý tento blok zvýrazní. (<a href='#nic'>Zrušit</a>.)</p>
</div>

<h3 id=vyuziti>Využití</h3>
<p>Kromě zvýraznění aktivní kotvy lze <code>:target</code> použít k vytvoření „záložek“ přepínatelných bez načítání dalších stránek.</p>

<div class="live">
<!-- CSS ukázky -->
<style>
menu {margin: 0; padding: 0}
menu li {display: inline}
menu a {display: inline-block; background: #0D6AB7; padding: 10px; color: #fff; text-decoration: none; font-weight: bold; font-variant: small-caps;}
.tab {background: #efefef; border: 1px solid #ccc; padding: .3em; display: none;}
.tabs .default {display: block;}
.tab:target {display: block;}
</style>

<!-- HTML kód ukázky -->
<menu>
    <li><a href='#html'>HTML</a>
    <li><a href='#css'>CSS</a>
    <li><a href='#js'>JS</a>
    <li><a href='#php'>PHP</a>
</menu>      

<div class='tabs'>
	<div class='tab' id='html'>
		<p>HTML je značkovací jazyk.
	</div>
	<div class='tab' id='css'>
		<p>CSS není značkovací jazyk.
	</div>
	<div class='tab' id='js'>
		<p>JavaScript je klientský skriptovací jazyk.
	</div>
	<div class='tab' id='php'>
		<p>PHP je serverový skriptovací jazyk.
	</div>
</div>
<!-- / konec ukázky -->
</div>

<p>Podobného efektu lze dosáhnout i bez použití <code>:target</code>u. Stačí jednotlivým záložkám (elementy <code>.tab</code>) nastavit pevnou výšku. Jejich rodiči (element <code>.tabs</code>) <code>overflow: hidden</code> + tutéž pevnou výšku a zbytek už zařídí odkazy na kotvy.

<div class=live>
<!-- HTML kód ukázky -->
<style>
.obal {height: 50px; overflow: hidden}
.obal div {height: 50px; color: #fff}
#i {background: red}
#ii {background: blue}
#iii {background: green}  
</style>
<div class=obal>
    <div id=i>První</div>
    <div id=ii>Druhý</div>
    <div id=iii>Třetí</div>
</div>  

<p>Odkaz na <a href="#ii">druhý</a>, <a href="#iii">třetí</a> a <a href="#i">první</a>.</p>
<!-- / konec ukázky -->
</div>

<h2 id="js-zvyrazneni">Zvýraznění kotvy pomocí JS</h2>
Pro starší prohlížeče nezbývá než na <code>:target</code> zapomenout a do CSS přidat zvláštní <code>.target</code> třídu. <pre><code>:target, <b>.target</b> {/* styly pro zvýraznění */}</code></pre>
A tu potom přidávat JavaScriptem v závislosti na hodnotě kotvy, která se nachází v <code>location.hash</code>.

<p>Stačí-li zvýraznění jen po načtení stránky, kód je velmi prostý.</p>
<pre><code>var hash = location.hash.substr(1); // první znak je #
var element = document.getElementById(hash);
if (element) {
	element.className+= " target";
}</code></pre>
<p>Má-li JavaScript reagovat na průběžnou změnu <code>hash</code>e lze používat od IE 8 včetně <code>window.onhashchange</code> a pro starší časovač. Nebo mít používané <code>hash</code>e u elementů s přesnou výškou v nějakém neviditelném objektu a tam odchytávat <code>onscroll</code>.<p>
<p>Testovat dostupnost <code>onhashchange</code> lze pomocí.</p>
<pre><code>if ("onhashchange" in window) {
	// onhashchange funguje
}</code></pre>