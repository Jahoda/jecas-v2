---
title: "Stylování tabulky"
headline: "Stylování HTML tabulek"
description: "Jednoduché barvení a další stylování značky <code>&lt;table></code>."
date: "2013-05-23"
last_modification: "2013-06-15"
status: 1
tags: ["css", "stylovani", "tabulky"]
format: "html"
---

<style>
/* reset na výchozí hodnoty */
table {background: #fff; table-layout: auto; border-collapse: separate}
table.stylovani-tabulky td {background: none}
</style>
<h2>Barvení</h2>
<p>Obarvit řádek lze nastavením <code>background</code>u pro řádek (<code>&lt;tr></code>) nebo přímo pro buňku (<code>&lt;td></code>).

<pre><code>tr.pozadi {background: red}
/* nebo */
td.pozadi {background: red}
</code></pre>

<p>Při barvení sloupců už zbývá jen <code>&lt;td></code> nebo použít značky <code>&lt;col></code> a nastavit jim třídu. Takto se vybarví 4. sloupec.
<pre><code>&lt;table>
	&lt;col span=3>
	&lt;col class=pozadi>
	&lt;tr>
		&lt;td>
		…
&lt;/table></code></pre>

<!-- Kód ukázky -->
<div class=live>
<style>
.pozadi {background: red}
</style>

<table class="stylovani-tabulky">
	<col span=3>
	<col class=pozadi>
	<tr>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
	<tr class='pozadi'>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
	<tr>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
</table>
</div>
<!-- / konec ukázky -->


<h2 id=first-child>Pseudo-třída <code><a href='/css-selektory#prvni-posledni-potomek'>first-child</a></code></h2>
<p>Tímto si lze výrazně ulehčit práci, vlastnost <code>:first-child</code> funguje už od Exploreru 7.
<pre><code>td:first-child + td {background: yellow}
</code></pre>
<p>A druhý sloupec bude žlutý.
<!-- Kód ukázky -->
<div class=live>
<style>
.test td:first-child + td {background: yellow}
</style>

<table class="test stylovani-tabulky">
	<tr>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
	<tr>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
</table>
</div>
<!-- / konec ukázky -->


<p>V CSS 3 je k disposici přímo <a href="/css-selektory#n-ty-potomek">selektor n-tého prvku</a>, s možností například přímo odlišit sudý a lichý řádek. Funguje ale až od <b>IE 9</b>:
<pre><code>tr:nth-child(odd) {background: green}</code></pre>

<p>Ve starších prohlížečích lze tuto funkčnost simulovat právě pomocí <code>first-child</code> / selektoru sourozence (<code>něco <b>+</b> něco</code>). I když pro hodně velkou tabulku kód značně nabobtná. V takovém případě může být lepší použít řešení na <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=9&amp;topic=2111#sude-liche-radky">straně serveru</a>.

<h2 id=hover>Pseudo-třída <code>:hover</code></h2>
<p>Zvýraznit celý řádek při <b>najetí myší</b> lze pomocí <code>tr:hover {background: green}</code>. Funkční od Exploreru 7.

<!-- Kód ukázky -->
<div class=live>
<style>
table.hover tr:hover td {background: green}
</style>

<table class="hover">
	<tr>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
	<tr>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
</table>
</div>
<!-- / konec ukázky -->

<p>Jak po najetí zvýraznit příslušné řádky i sloupce:</p>


<div class="internal-content">
  <ul>
    <li><a href="http://jecas.cz/zvyrazneni-tabulky">Zvýraznění sloupců/řádků tabulky </a></li>
  </ul>
</div>


<h2 id=border>Rámečky řádků/buněk pomocí <code>border</code></h2>
<p>Tady panuje menší zrada, tj. při slévání rámečků (zmíně níže) ve starších Explorerech (do verse 7) nelze rámeček přidat přímo <code>&lt;tr></code>, ale je třeba jej nastavit pro <code>tr td</code>. Při neslévání (<code>border-collapse: separate</code>) to přímo přes <code>&lt;tr></code> nejde v žádném prohlížeči.

<!-- Kód ukázky -->
<div class=live>
<style>
tr.ramecek-cerveny {border-top: 2px solid red}
tr.ramecek-zeleny td {border-top: 2px solid green}
</style>
<p>Ve starších IE než 8 by měl být vidět jen rámeček zelený.
<table style="border-collapse: collapse">
	<tr class='ramecek-cerveny'>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
	<tr class='ramecek-zeleny'>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
</table>
</div>
<!-- / konec ukázky -->


<h2 id=layout>Vlastnosti <code>table-layout</code> a <code>border-collapse</code></h2>
<dl>
<dt><code>table-layout</code>
  <dd><p>Výchozí hodnota je <code>auto</code>, je možné přepnout na <code>fixed</code> – to zajistí, že tabulka bude více respektovat zadané rozměry sloupců.</p>

<dt><code>border-collapse</code>
  <dd><p>Výchozí hodnota je <code>separate</code>, je možné přepnout na <code>collapse</code> – to zajistí „slití“ rámečků k sobě.</p>
<div class=live>
<table style="border-collapse: collapse">
	<tr>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
	<tr>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
</table>
</div>
<p>Normálně jsou rámečky následující (dvojité – <code>separate</code>):
<div class=live>
<table style="border-collapse: separate">
	<tr>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
	<tr>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
		<td>Text</td>
	</tr>
</table>
</div>
</dd>
</dl>
  
<h2 id="fixni-zahlavi">Fixní záhlaví tabulky</h2>  
<p>U dlouhých tabulek může být žádoucí záhlaví <b>zafixovat</b> a dlouhý obsah omezit výškou a přidat mu <b>posuvník</b>.</p>

<p>Řešení spočívá v rozdělení tabulky na dvě části (<code>&lt;thead></code> – záhlaví a <code>&lt;tbody></code> – obsah s posuvníkem).</p>

<div class="live">
  <style>
    .fixni th, .fixni td {width: 200px}
    .fixni thead {display: block;}
    .fixni tbody {overflow-y: scroll; max-height: 100px; display: block}
  </style>
  <table class="fixni">
    <thead>
      <tr>
        <th>Jméno</th><th>E-mail</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Běžný Uživatel</td>
        <td>bezny@uzivatel.cz</td>
      </tr>
      <tr>
        <td>Franta Fytopuf</td>
        <td>franta@fytopuf.cz</td>
      </tr>  
      <tr>
        <td>Nejlepší Trenér</td>
        <td>strouhanka@kobercovka.cz</td>
      </tr>  
      <tr>
        <td>Žerou Děti</td>
        <td>junior@plzen-wd40.cz</td>
      </tr>        
    </tbody>
  </table>
</div>