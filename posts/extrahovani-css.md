---
title: "Převod inline CSS na externí"
headline: "Převod CSS v HTML na externí styly"
description: "Jak z HTML vybrat id, třídy a inline styly a vytvořit z nich CSS předpis do externího souboru."
date: "2014-01-23"
last_modification: "2014-01-24"
status: 1
tags: ["css", "hotova-reseni", "html", "napady"]
format: "html"
---

<p>Nástroj <a href="http://extractcss.com/">extractCSS</a> dokáže v HTML kódu najít elementy, které mají nastavenou <a href="/id-class">třídu nebo ID</a> a vytvořit pro ně CSS předpis. Když element s <code>class</code>/<code>id</code> bude mít nějaké <b>inline styly</b> (např. <code>style="color: red"</code>), bude i toto rovnou převedeno do <i>externího</i> CSS.</p>

<h2>Využití</h2>
<p>K čemu je to dobré? Kromě <b>extrahování inline stylů</b> to může posloužit i ke zrychlení tvorby CSS k existujícímu HTML.</p>

<p>Navrhneme si strukturu HTML kódu s třídami a <b>extractCSS</b> z toho připraví kostru pro vytváření CSS.</p>

<h3>HTML</h3>
<pre><code>&lt;div class="obal">
  &lt;div class="hlavicka">&lt;/div>
  &lt;div class="obash">&lt;/div>
  &lt;div class="menu">&lt;/div>
  &lt;div class="paticka">&lt;/div>
&lt;/div></code></pre>

<p>To jde mimochodem s <a href="/emmet">nástrojem Emmet</a> zapsat jako <code>.obal>(.hlavicka+.obash+.menu+.paticka)</code>.</p>

<h3>CSS</h3>
<p><a href="http://extractcss.com/" class="button">extractCSS</a></p>
<p>Odpovídající a automaticky vygenerovaná CSS kostra bude vypadat následovně:</p>

<pre><code>.obal {
}

.hlavicka {
}

.obash {
}

.menu {
}

.paticka {
}</code></pre>