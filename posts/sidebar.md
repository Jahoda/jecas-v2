---
title: "Fixní postranní panel"
headline: "Jak vytvořit fixovaný banner?"
description: "JavaScriptové řešení prvku, který při rolování zůstane stále viditelný."
date: "2012-10-10"
last_modification: "2013-06-12"
status: 1
tags: ["fixed", "hotova-reseni", "js"]
format: "html"
---

<!-- Kód ukázky -->
<style>
  .fixni-panel {position: absolute; left: 0; top: 120px; z-index: 0}
  .fixni-panel div {background: #0D6AB7; color: #fff; text-align: center; width: 120px; height: 600px; }
  .fixni-panel .fixed {position: fixed; top: 0}
</style>

<div class='fixni-panel'>
	<div id="sidebar">
		<p>Fixovaný text změnou <code>position</code> na <code>fixed</code>.
	</div>
</div>

<script>
var sidebar = document.getElementById('sidebar');

window.onscroll = function () {
  sidebar.className = (
    document.documentElement.scrollTop + document.body.scrollTop > sidebar.parentNode.offsetTop
    && document.documentElement.clientHeight > sidebar.offsetHeight
  ) ? "fixed" : "";
}
</script>
<!-- / konec ukázky -->

<p>Některé prvky na stránce může být vhodné umístit s <a href="/position#fixed">fixní posicí</a>. Zajistí se tím to, že budou <b>stále viditelné</b>.
<p>Smysl to může mít pro:
<ol>
  <li>důležité <b>navigační prvky</b>,
    <li>odkazy pro <b>sdílení stránky</b> na sociálních sítí,
      <li><b>reklamy / reklamní bannery</b>
</ol>

<p>Umístit něco fixovaně není žádný kumšt:
<pre><code>element {position: fixed}</code></pre>
<p>… a je to. Co ale v případě, že <b>má element mít nejprve nějakou normální posici</b>? Přijde na řadu JavaScript, který v momentě, kdy daný prvek začne mizet, přepne posici na fixovanou.

<h2>Řešení</h2>
<ol>
  <li>Při <b>rolování stránky</b> (<code>window.onscroll</code>)
<li>se porovná o kolik je odrolováno (<code>scrollTop</code>) s posicí elementu (<code>offsetTop</code>)
<li>a podle toho se (ne)nastaví třída, která element zafixuje (díky tomu lze i fixovanému elementu velmi snadno měnit vzhled).
</ol>

<h3>CSS</h3>
<pre><code>.sidebar {position: absolute; right: 0; top: 100px}
.sidebar div {background: #0D6AB7; text-align: center; width: 120px; height: 600px; }
.sidebar .fixed {position: fixed; right: 0; top: 0}</code></pre>

<h3>HTML</h3>
<pre><code>&lt;div class='sidebar'>
	&lt;div id="sidebar">
		(Obsah)
	&lt;/div>
&lt;/div></code></pre>

<h3>JavaScript</h3>
<p>Druhá část podmínky (za <code>&amp;&amp;</code>) porovnává výšku fixovaného boxu s výškou okna. Asi nemá smysl v takovém případě fixovat.
<pre><code>var sidebar = document.getElementById('sidebar');
window.onscroll = function () {
  sidebar.className = (
    document.documentElement.scrollTop + document.body.scrollTop > sidebar.parentNode.offsetTop
    && document.documentElement.clientHeight > sidebar.offsetHeight
  ) ? "fixed" : "";
}</code></pre>

<h2 id=uskali>Možná úskalí</h2>
<p>CSS vlastnost <code>fixed</code> vztahuje umístění elementu k <b>oknu prohlížeče</b>, nikoliv k nejbližšímu elementu s absolutní/relativní posicí.