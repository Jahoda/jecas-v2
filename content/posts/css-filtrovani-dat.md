---
title: "Filtrování dat v CSS"
headline: "Jednoduché filtrování dat v čistém CSS"
description: "Při filtrování malého množství položek si lze od Internet Exploreru 9 vystačit jen s CSS."
date: "2013-05-18"
last_modification: "2013-05-18"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<!-- Kód ukázky -->
<style>
input:not(:checked) ~ ul li {display: none}
input#all:checked ~ ul li {display: list-item}
input#rbr:checked ~ ul .rbr {display: list-item}
input#ferrari:checked ~ ul .ferrari {display: list-item}
input#mercedes:checked ~ ul .mercedes {display: list-item}
input#mclaren:checked ~ ul .mclaren {display: list-item}
</style>

<div class='live'>
	<input type=radio name=team value="all" id='all' checked><label for='all'>Vše</label>
	<input type=radio name=team value="rbr" id='rbr'><label for='rbr'>Red Bull Racing</label>
	<input type=radio name=team value="ferrari" id='ferrari'><label for='ferrari'>Scuderia Ferrari</label>
	<input type=radio name=team value="mercedes" id='mercedes'><label for='mercedes'>Mercedes GP</label>
	<input type=radio name=team value="mclaren" id='mclaren'><label for='mclaren'>McLaren</label>
	<ul>
		<li class="ferrari mercedes">Michael Schumacher</li>
		<li class="mclaren ferrari">Fernando Alonso</li>
		<li class="mclaren ferrari">Kimi Räikkönen</li>
		<li class="mclaren mercedes">Lewis Hamilton</li>
		<li class="mclaren">Jenson Button</li>
		<li class="rbr">Sebastian Vettel</li>
		<li class="mclaren rbr">David Coulthard</li>
		<li class="rbr">Mark Webber</li>
	</ul>
</div>
<!-- / konec ukázky -->

<h2 id=jak>Jak?</h2>
<p>Využívá se:
<ol>
<li><a href='/css-selektory#checked'>selektoru <code>:checked</code></a> (pro vybraný formulářový prvek <code>radio</code> nebo <code>checkbox</code>),
<li><a href='/css-selektory#libovolny-sourozenec'>selektoru <code>~</code></a> (libovolný sourozenec),
<li>obyčejných tříd – každá položka má třídy podle příslušné skupiny (jedna položka může (ale nemusí) patřit do více skupin).
<pre><code>&lt;li class="<i>ferrari</i> <i>mercedes</i>">Michael Schumacher&lt;/li></code></pre>
</ol>
<p>Na začátku se všechny položky skryjí (<code>display: none</code>) a při
<pre><code>input<b>#id-inputu</b>:checked ~ ul <i>.nazev-prislusne-tridy</i> {display: list-item}</code></pre>
<p>… se opět objeví.
<p>Důležité je, aby se bylo <i>jak dostat</i> z <code>input:checked</code> na jednotlivé položky, <code>&lt;input></code> proto nemůže být hlouběji zanořen.


<h2 id=starsi>Starší prohlížeče</h2>
<p>Aby se v nepodporovaných prohlížečích zobrazil alespoň seznam bez možnosti filtrování, položky se schovávají přes <code>:not(:checked)</code>. Pokud je tedy prohlížeč dokáže skrýt, dokáže je i zobrazit.
<p>Vyřešit funkčnost pro starší Explorery a jiné by mohl vyřešit jednoduše JS:
<ul>
<li>Při kliknutí na <code>&lt;input></code> nastavit pro jeho rodiče (<code>this.parentNode</code>) třídu (<code>className</code>) třeba dle identifikátoru (<code>this.id</code>),
<li>zjednodušit CSS a položky zobrazovat při <code>.trida-rodice .trida-skupiny {}</code>.
</ul>
<p>A nebo vytvořit plnohodnotný formulář a data posílat  vyfiltrovat na server.
  
<h2>Vyhledávání textu na stránce</h2>
<p>Se špetkou JavaScriptu je možné na webu <a href="/css-vyhledavani">vyhledávat</a>.</p>