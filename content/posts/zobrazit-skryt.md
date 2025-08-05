---
title: "Skrývání a odkrývání"
headline: "Skrývání a odkrývání textu"
description: "Rozbalení a sbalení obsahu po kliknutí."
date: "2013-05-30"
last_modification: "2013-11-17"
status: 1
tags: ["css", "hotova-reseni", "js", "prepinani-vzhledu"]
format: "html"
---

<p>Pokud je na webu hodně textu, který nemusí návštěvníka tolik zajímat, může být vhodné takový text <b>rozbalit</b> až na vyžádání po <b>kliknutí</b> na <a href="/odkaz-tlacitko">tlačítko/odkaz</a>. Ideální postup, jak <b>zobrazit/skrýt</b> obsah, je JavaScriptem <b>pouze měnit CSS třídu</b> a vše ostatní řešit kaskádovými styly. <small>(Obdobným způsobem lze velice snadno i <a href='/zmena-vzhledu'>měnit vzhled</a> a podobně.)</small>

<h2>Řešení</h2>


<div class="live">
  <style>
    /* schování tlačítka */
    .js .live .schovat div {display: none}
    /* nastylování „ikony“ plus nebo mínus */
    .live button span:before {content: "+"; display: inline-block; margin-right: .5em; padding: 0 .4em; border-radius: 3px; background: #fff; color: #000}
    /* ikona minus bude mít pomlčku */
    .live button span.skryt:before {content: "–"}
    /* když je obsah schovaný, schováme popisek „Skrýt“ */
    .live .schovat .skryt {display: none}
    /* když je obsah zobrazený, schováme popisek „Zobrazit“ */
    .live .ukazat .zobrazit {display: none} 
  </style>
  <script>
    function prohodit(element, prvniTrida, druhaTrida) {
	  element.className = element.className == prvniTrida ? druhaTrida : prvniTrida;
    }
  </script>
  <div class='schovat'>
    <button onclick="prohodit(this.parentNode, 'schovat', 'ukazat')"><i></i><span class=zobrazit>Zobrazit</span><span class=skryt>Skrýt</span></button>
    <div>Text ke skrytí.</div>
  </div>
</div>


<ol>
<li>Vytvoříme element,
<pre><code>&lt;div class=<b>schovat</b>>
	&lt;div><i>Obsah</i>&lt;/div>
&lt;/div></code></pre>
  <li>pomocí CSS jeho obsah <b>skryjeme</b>
<pre><code>.<b>schovat</b> div {display: none}</code></pre>
<li>a nyní jen stačí přes JS prohazovat třídu.
<pre><code>function prohodit(element, prvniTrida, druhaTrida) {
	element.className = element.className == prvniTrida ? druhaTrida : prvniTrida;
}</code></pre>
<h3>Co použít jako <code>element</code></h3>
<ul>
<li>Je-li přepínací tlačítko (odkaz) poblíž obsahu (co se má skrývat/odkrývat), vše obalíme do společného <code>&lt;div></code>u, ke kterému se z tlačítka dostaneme přes <code>this.parentNode</code>.
<pre><code>&lt;button onclick="prohodit(<b>this.parentNode</b>, 'schovat', 'ukazat')">
	Zobrazit/Skrýt
&lt;/button></code></pre>
<li>Je-li tlačítko někde jinde, přidáme <code>&lt;div></code>u atribut <code>id</code> a použijeme <code>document.getElementById("id")</code>.
</ul>
</ol>

<p>Velkou výhodou změny třídy je to, že potom lze přes CSS pracovat i s přepínacím tlačítkem.
<pre><code>.schovat button {/* obsah je schovaný */}
.ukazat button {}</code></pre>

<h3>Plynulé skrývání a odkrývání</h3>
<p>Skrývání a zobrazování obsahu může být díky <a href="/animace-skryt">animaci i hezky plynulé</a>.</p>

<h2 id=no-js>Vypnutý JavaScript</h2>
<p>V případě <a href="/vypnuty-js">vypnutého JavaScriptu</a> by v každém případě <b>měl obsah býti vidět</b>.
<p>Asi nejelegantnější je nastavovat pomocí JS třídu pro nějaký hodně nadřazený element.
<pre><code>&lt;body>
&lt;script> document.body.className+=' js' &lt;/script></code></pre>
<p>… a všechny <i>skrývací akce</i> začínat selektorem <code>.js</code>:
<pre><code><b>.js</b> .schovat div {display: none}</code></pre>

<h2 id=rozklikavani>Rozklikávání/přepínání částí stránky</h2>
<p>Obdobným principem lze docílit <b>přepínání jednotlivých <i>skupin</i></b> na stránce. Kdy kliknutí na nadpis ostatní položky skryje a zobrazí právě tu, <b>na kterou bylo kliknuto</b>.</p>

<!-- Kód ukázky -->
<div class="live">
<style>
  .js .obal div div {display: none; padding: .3em .5em}
  .js .obal div.show div {display: block}
  .js .obal h3 {cursor: pointer}
  .obal div {background: #efefef}
  .obal div h3 {background: #0D6AB7; color: #fff; padding: .3em .5em}
  .obal div.show h3 {background: #1081DD}
</style>
<div class="obal" id="obal">
  <div>
    <h3>HTML</h3>
    <div><p>HTML kód je celkem obyčejný, jednotlivé přepínané části jsou <code>&lt;div></code>y; obsah, který se má zjevit až po rozkliknutí, je rovněž v samostatném obalu, který se při změně třídy nadřazeného <code>&lt;div></code>u zviditelní.</p></div>
  </div>
  <div>
    <h3>CSS</h3>
    <div><p>V CSS se využívá třídy <code>js</code>, kterou má <code>&lt;body></code>, tj. všechny styly, které používá JavaScript, jsou takto prefixovány.</p></div>
  </div>
  <div>
    <h3>JavaScript</h3>
    <div><p>JS navěsí na nadpisy (značky <code>&lt;h3></code>) funkci, která nejprve projde všechny obalové <code>&lt;div></code>y a <i>vymaže</i> jim případnou třídu viditelnosti. Následně se tomu právě zakliknutému třída (<code>className</code>) pro zobrazení přiřadí.</p></div>
  </div>
  <div class=show>
    <h3>Možné rozšíření</h3>
    <div>
      <p>Má-li nějaká část být zobrazena rovnou při načtení stránky, stačí prosté přiřazení třídy viditelnosti pro obalový element dané skupiny, tj. <code>&lt;div class=<b>show</b>></code>.
      <p>Díky nastavování třídy <code>show</code> lze podle ní velice snadno vzhledově odlišit rozkliknutou část od ostatních.</p>
    </div>
  </div>
</div>

<script>
var el = document.getElementById("obal");
el.className += " js";

function clearAll() {
	var div = el.getElementsByTagName("div");
	for (var i = 0; i < div.length; i++) {
		div[i].className = "";
	}
}

function init() {
	if (!el) return;
	var div = el.getElementsByTagName("div");

	for (var i = 0; i < div.length; i++) {
		if (div[i].parentNode != el) continue;
		div[i].getElementsByTagName("h3")[0].onclick = function () {
			var div = this.parentNode;
			var puvodni = div.className;
			clearAll();
			div.className = (div.className == "show" || puvodni == "show") ? "" : "show";
		}
	}
}

init();
</script>
</div>
<!-- / konec ukázky -->

<!-- Přepínání záložek v jQuery: http://kod.djpw.cz/hzw- -->