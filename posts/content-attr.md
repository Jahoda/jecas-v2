---
title: "CSS vlastnosti content a attr"
headline: "Úprava obsahu pomocí <code>content</code> a <code>attr</code>"
description: "Pomocí CSS vlastnosti <code>content</code> a <i>funkce</i> <code>attr</code> lze ovlivňovat z CSS výsledný textový obsah webu."
date: "2013-05-17"
last_modification: "2013-05-17"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<h2 id=content-attr>Vlastnost <code>content</code> a <code>attr()</code></h2>
<dl>
<dt id=content><code>content</code>
<dd><p>Použitím této vlastnosti lze přidávat do stránky obsah zapsaný v CSS pravidlech. Funkční od Internet Exploreru 8.
<pre><code>element:after {content: "Ahoj"}</code></pre>
<p>Zajímavá odlišnost je v prohlížeči Opera, kde lze použít <code>content</code> přímo na <code>element</code> (bez <code>:after</code>/<code>:before</code> a přepíše se tím jeho obsah). V jiných prohlížečích toto nefunguje.
<pre><code>p {content: "Ahoj"}
p:before {content: "&lt;"}
p:after {content: ">"}</code></pre>
<ul>
<li>V Opeře budou odstavce ve tvaru <code><b>&lt;</b><i>Ahoj</i><b>></b></code>, 
<li>v ostatních prohlížečích <code><b>&lt;</b>Původní text odstavce<b>></b></code>,
<li>ve starších prohlížečích <code>Původní text odstavce</code>.
</ul>
<dt id=attr><code>attr()</code>
<dd><p>Touto funkcí lze získat obsah libovolného atributu a využít toho v kombinaci s <code>content</code>.
<pre><code>&lt;style>
p:after {content: <b>attr(<i>title</i>)</b>}
&lt;/style>
&lt;p <i>title</i>='světe!'>Ahoj</code></pre>

<!-- Kód ukázky -->
<style>
span.test:after {content: attr(title)}
</style>
<p class='live'>Výsledek bude <code><span class='test' title=' světe!'>Ahoj</span></code> (živá ukázka).
<!-- / konec ukázky -->
<p>Spojování řetězců se dělá prostým řetězením. Tedy vypreparovat atributy z odkazu…
<pre><code>&lt;a href='http://jecas.cz' title='Je čas' class='odkaz'>Odkaz&lt;/a></pre></code>
<p>… a sestavit z nich větu bude vypadat následovně.
<pre><code>a:after {
	content: ' (Tento odkaz vede na „'attr(href) '“, má titulek „'
		attr(title) 
		'“ a' " třídu „"attr(class)'“.)'
}</pre></code>

<!-- Kód ukázky -->
<style>
a.test:after {	content: ' (Tento odkaz vede na „'attr(href) '“, má titulek „'
		attr(title) 
		'“ a' " třídu „"attr(class)'“.)'}
</style>
<p class='live'><b>Živá ukázka</b>: <a href='http://jecas.cz' title='Je čas' class='test'>Odkaz</a>
<!-- / konec ukázky -->

<p>Možnosti řetězení jsou skutečně benevolentní: mezi text v uvozovkách a <code>attr</code> lze dát cokoliv (mezeru, tabulátor, odřádkování) nebo také klidně nic.
</dl>

<h2 id=vlastni>Vlastní atributy</h2>
<p>Pravá <i>zábava</i> začíná s použitím vlastních atributů. Jedna možnost je použít tzv. <code>data-*</code> atributy, druhá si atribut kompletně vymyslet. Oboje funguje.
<pre><code>&lt;style>
p:after {content: ": „" attr(<b>mujAtribut</b>) ' ' attr(<i>data-mujAtribut</i>) '!“'}
&lt;/style>
&lt;p <b>mujAtribut</b>='Ahoj' <i>data-mujAtribut</i>='světe'>Říká</code></pre>

<!-- Kód ukázky -->
<style>
.test2:after {content: ": „" attr(mujAtribut) ' ' attr(data-mujAtribut) '!“'}
</style>
  <p class='live test2' mujAtribut='Ahoj' data-mujAtribut='světe'>Říká</p>
<!-- / konec ukázky -->
  
  <h2 id="obrazky">Pseudo-třídy <code>:before</code> a <code>:after</code> u obrázků</h2>
  
  <p>U obrázků (značka <code>&lt;img></code>) <b>není možné pseudo-třídy používat</b>. Následující kód pro <b>doplnění <code>alt</code>u k obrázku</b> tedy nebude fungovat:</p>
  
  <pre><code>img:after {content: attr(alt)}</code></pre>
  
<p><a href="http://kod.djpw.cz/bycb">Ukázka</a></p>