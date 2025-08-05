---
title: "Změna vzhledu stránky"
headline: "Změna designu bez znovunačtení stránky"
description: "Jak snadno umožnit uživateli přepínat různé vzhledy stránky, tmavou/světlou variantu apod."
date: "2013-05-26"
last_modification: "2013-05-26"
status: 1
tags: ["css", "hotova-reseni", "js", "prepinani-vzhledu"]
format: "html"
---

<p>Zásadní věc je, že styl se bude měnit pomocí CSS, kdy JavaScript <a href="/prepinani-trid">nastaví příslušnou třídu</a>.

<!-- Kód ukázky -->
<div class="live">
<script>
function setDesign(designName) {
  document.body.className = designName;
}
</script>

<p>Přebarvit záhlaví: <button onclick='setDesign("blue")'>Modrá</button>
<button onclick='setDesign("white")'>Šedivá</button>
<button onclick='setDesign("red")'>Červená</button>
<button onclick='setDesign("green")'>Zelená</button>
<button onclick='setDesign("yellow")'>Žlutá</button>
<button onclick='setDesign("")'>Výchozí</button>
</div>
<!-- / konec ukázky -->

<ol>
  <li>Různé <b>designy</b> budou buď ve zvláštních CSS souborech,
  <li>nebo přímo v jednom a všechny selektory pro daný vzhled budou začínat <b>společnou třídou</b>.
</ol>

<h2 id=tridy>Změna třídy <code>&lt;body></code>/<code>&lt;html></code></h2>
<p>Asi nejjednodušší řešení – v jednou souboru budou styly pro všechny dostupné <i>designy</i>.
<pre><code>.cervena h1 {color: red}
.zelena h1 {color: green}
.modra h1 {color: blue}</code></pre>
<p>A teď, když se JavaScriptem nastaví třída pro <code>&lt;body></code> na <code>cervena</code>, budou všechny nadpisy na stránce červené.
<pre><code>function setDesign(designName) {
	document.body.className = designName;
}</code></pre>
<pre><code>&lt;button onclick='setDesign("cervena")'>Červená&lt;/button></code></pre>

<h2 id=css>Změna CSS souboru</h2>
<p>Pokud by změna měla být komplexnější než pár barviček, nabízí se změnit celé CSS. To už ale nebude okamžité jako prohazování tříd (CSS soubor se musí načíst).

<p>Stačí elementu <code>&lt;link></code> přidat ID (nebo jej zaměřit přes jméno značky a číslo indexu (<code>getElementsByTagName</code>)) a podle toho měnit <code>element.href</code>.

<pre><code>&lt;link rel=stylesheet href="style.css" <b>id=css</b>>
&lt;script>
function changeCss(styleUrl) {
	document.getElementById("<b>css</b>").href = styleUrl;
	//document.getElementsByTagName("link")[1].href = styleUrl;
}
&lt;/script></code></pre>
<pre><code>&lt;button onclick='changeCss("cervena.css")'>Červená&lt;/button></code></pre>

<!-- Kód ukázky -->
<script>
function changeCss(styleUrl) {
	//document.getElementById("css").href = styleUrl;
	document.getElementsByTagName("link")[1].href = styleUrl;
}
</script>

<p class=live><button onclick='changeCss("http://diskuse.jakpsatweb.cz/templates/djpw.css")'>Přepnout na DJPW CSS</button>
  <button onclick='changeCss("http://jecas.cz/files/zmena-vzhledu/screen.css")'>Přepnout na Je čas CSS</button>

<!-- / konec ukázky -->


<p>V případě, že další styly budou jen doplňující k původnímu, bude třeba je přidávat a nechat je se <i>přebíjet</i>.
<pre><code>function addCss(styleUrl) {
	var file = document.createElement("link");
	file.href = styleUrl;
	file.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(file);
}</code></pre>
<pre><code>&lt;button onclick='addCss("cervena.css")'>Červená&lt;/button></code></pre>

<!-- Kód ukázky -->
<script>
function addCss(styleUrl) {
	var file = document.createElement("link");
	file.href = styleUrl;
	file.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(file);
}
</script>

<p class=live><button onclick='addCss("http://diskuse.jakpsatweb.cz/templates/djpw.css")'>Přidat DJPW CSS</button>
<button onclick='addCss("http://jecas.cz/files/zmena-vzhledu/screen.css")'>Přidat Je čas CSS</button>

<!-- / konec ukázky -->


<h2 id=ukladani-nacitani>Ukládání a načítání</h2>
<p>Aby vybrané téma <i>přežilo</i> přechod na další stránku, je zapotřebí nastavení někam uložit (cookie / <a href="/zalohovani-formularu#local-storage"><code>localStorage</code></a> / profil uživatele). A při načtení stránky hodnotu přečíst a podle ní CSS nastavit (ideálně na straně serveru).</p>


<style>
.blue .header,
.blue a:hover {
    background-color: #0D5255
}

.blue .header__inner {
    background: #127378
}

.white .header,
.white a:hover {
    background-color: #666
}

.white .header__inner {
    background: #999
}

.green .header,
.green a:hover {
    background-color: #0C870F
}

.green .header__inner {
    background: #0EA912
}

.red .header,
.red a:hover {
    background-color: #A81C34
}

.red .header__inner {
    background: #CE2B2F
}

.yellow .header,
.yellow a:hover {
    background-color: #9F9F00;
}

.yellow .header a {
    color: #000;
}

.yellow .header__inner {
    background: #E6E600
}
</style>
  
  
