---
title: "Zvýraznění podle rolování"
headline: "Označení odkazu na kotvu, pokud je na ní odrolováno"
description: "U jednostránkových webů s <a href="/fixni-menu">fixní navigací</a> (s odkazy na #kotvy) může být vhodné právě viditelnou (aktivní) položku zvýraznit."
date: "2013-05-31"
last_modification: "2013-06-05"
status: 1
tags: ["hotova-reseni", "js", "menu", "scroll"]
format: "html"
---

<style>
body {position: relative;}
.menu {right: 0; position: absolute;}
menu {position: fixed; list-style: none; padding: 0}
menu a {background: #fff; display: block; padding: .2em 1em}

.menu a.active {color: #fff; text-decoration: none; background: #0D6AB7;}
</style>


<div class='menu'>
	<menu>
		<li><a href="#ukazka">Ukázka</a></li>
		<li><a href="#jak">Jak na to</a></li>
		<li><a href="#priklad">Hotová JS funkce</a></li>
		<li><a href="#moznosti">Další možnosti</a></li>
	</menu>
</div>

<div id="content">
	<div id="ukazka">
		<h2>Ukázka</h2>
		<p>Při odrolování na nadpis by se měla v menu (vpravo vedle stránky) <span class=active>zvýraznit</span> příslušná položka.</p>
		
	</div>
	<div id="jak">
		<h2>Jak na to</h2>
        <ol>
          <li>Při <b>rolování</b> (<code>window.onscroll</code>) se
          <li>zjistí o kolik pixelů je <b>odscrollováno</b> (vlastnost <code>scrollTop</code>),
          <li>zjistí se posice <b>souřadnice</b> hlídaného elementu (<code>offsetTop</code>),
          <li>elementu, který podmínky splňuje, se <b>nastaví třída</b> <code>active</code>.
        </ol>
	</div>
	<div id="priklad">
		<h2>Příklad</h2>
		<pre><code>function setActive() {
	// Vybereme &lt;div>y z #content, každý symbolisuje jeden oddíl
	var div = document.getElementById("content").getElementsByTagName("div");
	// Vybereme odkazy z prvního elementu menu
	// Odkazů na oddíly by mělo být stejně jako &lt;div>ů
	var a = document.getElementsByTagName("menu")[0].getElementsByTagName("a");
	// Sjednocení napříč prohlížeči -- Pro Webkit je "document.body"
	var top = document.documentElement.scrollTop + document.body.scrollTop;
	var el;
	// Projdeme všechny &lt;div>y
	for (var i = 0; i &lt; div.length; i++) {
		// Všem odkazům se zruší případná třída
		a[i].className = "";
		if (div[i].offsetTop &lt; top) {
			// Uložíme si do proměnné element ke zvýraznění
			el = a[i];
		}
	};
	if (el) {
		// Zvýraznění elementu
		el.className = "active";
	}
}
// Při události onscroll se bude zvýrazňovat
window.onscroll = setActive;</code></pre>
	</div>
	<div id="moznosti">
		<h2>Další možnosti</h2>
      <p>Jak je v této ukázce vidět, funguje to tak, že při najetí na <i>začátek</i> (tj. jen co kousíček elementu zmizí pod horní okraj) se elementu <b>přiřadí třída</b>.
        <p>To nemusí být ideální, protože u <i>nízkých</i> částí a vysokého okna prohlížeče se zvýraznění <b>nemusí vůbec projevit</b>.
<p>Východiskem je: 
<ol>
<li>všem částem (tedy <code>#content > div</code>) nastavit nějakou minimální výšku (<code>min-height</code>),
<li>element za „narolovaný“ považovat v momentě, kdy už se objeví dole na obrazovce (dopočítat se tohoto stavu lze vlastností <code>offsetHeight</code>).
</ol>

<h3 id=hash>Změna <code>#kotvy</code> v adresním řádku</h3>
<p>Spolu se zvýrazněním aktivního odkazu je možné zároveň změnit URL, tedy <code>location.hash</code>, podle právě viditelné oblasti.
  <p>Háček ale je, že při takové změně prohlížeč může znovu <b>poskočit na onu kotvu</b> a kazit tak plynulé rolování. Vyřešit tento problém by mohlo jít použitím <b>prefixu</b> pro všechna <code>id</code>. Ta by přepsal JavaScript. V adresním řádku potom bude <code>#kotva</code> a JavaScript zajistí, aby se zvýraznil element <code>#<b>prefix</b>-kotva</code>. Na původní kotvu prohlížeč nezareaguje, protože na stránce (modifikované skriptem) ve skutečnosti nebude (bude tam právě ta prefixovaná).
	</div>
</div>


<script type="text/javascript">
function setActive() {
	var div = document.getElementById("content").getElementsByTagName("div");
	var a = document.getElementsByTagName("menu")[0].getElementsByTagName("a");
	var top = document.documentElement.scrollTop + document.body.scrollTop;

	var el;
	for (var i = 0; i < div.length; i++) {
		a[i].className = "";
		if (div[i].offsetTop < top) {
			el = a[i];
		}
	};
	if (el) {
		el.className = "active";
	}
}

window.onscroll = setActive;
</script>

<h2 id=quirk>Rozdíly mezi <code>documentElement.scrollTop</code> a <code>body.scrollTop</code></h2>
  <ul><li>V <a href="/doctype#quirk">quirku</a> jsou v <b>IE</b> obě hodnoty stejné, v ostatních prohlížečích funguje jen <code>document.body.scrollTop</code>.
    <li>Ve standardním režimu ctí <b>Chrome</b> <code>document.body.scrollTop</code>, ostatní prohlížeče <code>document.documentElement.scrollTop</code>.
</ul>