---
title: "Menu reagujicí na kliknutí"
headline: "Rozklikávací menu"
description: "JavaScriptové menu otvírající/zavírající se po kliknutí."
date: "2013-06-25"
last_modification: "2013-06-26"
status: 1
tags: ["hotova-reseni", "js", "menu"]
format: "html"
---

<style>
/* reset místních stylů */ 
.popup a {border: 0}
</style>

<!-- Kód ukázky -->
<div class="live">
<style>
.popup ul {height: 2em}
.popup ul ul {height: auto}
.popup {background: #0D6AB7; border: 2px solid #0D6AB7}
.popup li {margin-left: 1em; float: left}
.popup li li {display: block; float: none; margin: 0}
.popup a {float: left; width: 200px; text-decoration: none; text-align: center; background: #1081DD; color: #fff; line-height: 2em}
.popup ul ul a {width: 100%; display: inline-block}
.popup li a:hover {background: #efefef; color: #000}
/* submenu */
.popup ul ul {display: none; position: absolute; top: 100%; left: -1px; background: #fff; border: 1px solid #0D6AB7; border-top: 0; width: 200px}
.popup li {position: relative; }
.popup ul {padding: 0; margin: 0; list-style: none}
/* rozbalení */
.popup .show a {background: #fff; color: #000}
.popup .show li, li.show {background: #fff; color: #000}
.popup .show ul {display: block}

</style>
<script>

document.documentElement.onclick = closeAll;

function showHide(e, el) {
	var el = el.parentNode;

	if (el.className != "show") {
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
	}
	closeAll();
	el.className = el.className == '' ? 'show' : '';
}

function closeAll() {
	var items = document.getElementById("menu").getElementsByTagName("li");
	for (var i = items.length - 1; i >= 0; i--) {
		items[i].className = "";
	};
}

</script>

<div class='popup' id='menu'>
<ul>
  <li><a onclick="showHide(event, this)" href="#">Rozbalit</a>
		<ul>
          <li><a href="#prvni">Odkaz</a></li>
          <li><a href="#">Odkaz</a></li>
          <li><a href="#">Odkaz</a></li>
          <li><a href="#">Odkaz</a></li>
        </ul>
  </li>
  <li><a onclick="showHide(event, this)" href="#">Rozbalit</a>
		<ul>
          <li><a href="#">Odkaz</a></li>
          <li><a href="#">Odkaz</a></li>
          <li><a href="#">Odkaz</a></li>
          <li><a href="#">Odkaz</a></li>
		</ul>
  </li>
</ul>
</div>
</div>
<!-- / konec ukázky -->

<h2>Požadavky</h2>
<ol>
  <li>Rozbalení/sbalení při kliknutí na položku,</li>
  <li>sbalení při kliknutí někam mimo.</li>
</ol>


<h2 id=reseni>Postup řešení</h2>
<p>Základ je jednoduché <a href="/zobrazit-skryt">prohazování třídy</a>. S tím, že rozbalovaná část je absolutně posicovaná.</p>
<p>Celé to komplikuje až <i>vypínání</i> menu při kliknutí mimo.</p>
<ol>
  <li>Vytvoří se funkce pro schování libovolné položky z <code>#menu</code> (odstraní případnou třídu, která submenu zviditelňuje),
  <pre><code>function closeAll() {
	var items = document.getElementById("<b>menu</b>").getElementsByTagName("li");
	for (var i = items.length - 1; i >= 0; i--) {
		items[i].className = "";
	};
}</code></pre>
  </li>
  <li>ta se zavolá při kliknutí někam do stránky.
  <pre><code>document.documentElement.onclick = closeAll;</code></pre></li>
</ol>

<h3 id=bubble>„Probublávání“</h3>
<p>Bohužel při kliknutí na položku, která rozkrývá podseznam, událost probublá i na <code>documentElement</code>, takže se submenu vzápětí ihned skryje.</p>
<p>Řešení je <i>vypnutí</i> této vlastnosti. Ve starších Explorerech funguje jen:</p>
<pre><code>event.cancelBubble = true;</code></pre>
<p>Ve všech novějších prohlížečích potom:</p>
<pre><code>event.stopPropagation();</code></pre>
<p>Aby to nebylo tak jednoduché, Firefox (Gecko) potřebuje na rozdíl od ostatních prohlížečů <code>event</code> předat do funkce.</p>
<pre><code>&lt;a onclick="funkce(<b>event</b>)" href="#">Rozbalit&lt;/a></code></pre>
<p>Kód sjednocující chování napříč prohlížeči proto značně nabobtná.</p>
<pre><code>function nazevFunkce(e) {<!--
	var e = e || window.event; // sjednocení pro Firefox -->
	e.cancelBubble = true; // vypnutí pro starší Explorery
	if (e.stopPropagation) e.stopPropagation(); // vypnutí pro ostatní
    // vlastní kód funkce
}</code></pre>
<p>Výhoda potom je, že máme kód funkční ve všech prohlížečích (minimálně od IE 6).</p>