---
title: "HTML tlačítko <button>"
headline: "Značka <code>&lt;button></code>"
description: "Tlačítko <code>&lt;button></code> v HTML, možné problémy v Internet Exploreru a jak je vyřešit."
date: "2013-12-14"
last_modification: "2013-12-14"
status: 1
tags: ["formulare", "html", "html-tagy"]
format: "html"
---

<p>HTML značka <code>&lt;button></code> slouží k vytvoření tlačítka. Je hodně podobná značce <a href="/input"><code>&lt;input></code></a> s atributem <code>type</code> nastaveným na <code>button</code>, <code>submit</code> nebo <code>reset</code> — <code>&lt;button></code> má tyto typy <b>stejné</b>.</p>

<p>Typický zápis:</p>
<pre><code>&lt;button type="submit" name="tlacitko" value="hodnota">
  Text tlačítka
&lt;button></code></pre>
<div class="live">
  <button>Tlačítko (nic nedělá)</button>
</div>

<p>Element <code>&lt;button></code> jde docela dobře <a href="/odkaz-tlacitko">stylovat</a>.</p>

<h2 id="input-button">Použít <code>&lt;input></code>, nebo <code>&lt;button></code>?</h2>
<p>Podstatný rozdíl mezi značkami je, kromě <a href="/html-znacky">různých druhů</a> (<code>&lt;input></code> je povinně <b>nepárový</b>, <code>&lt;button></code> povinně <b>párový</b>), že do značky <code>&lt;button></code> je možné umístit další HTML kód.</p>

<h2 id="ie">Internet Explorer</h2>
<p>Ve starších versích <b>IE</b> nebo i v novějších v <a href="/doctype#quirk">QUIRK režimu</a> se kolem značky <code>&lt;button></code> točí řada rozdílů.</p>

<h3 id="vice-tlacitek">Více odesílacích tlačítek</h3>
<p>V <b>IE 6</b> a starších se při použití více <code>&lt;button></code> tlačítek neodešle jen to, na které bylo kliknuto, ale úplně všechna <code>&lt;button></code> tlačítka.</p>

<div class="live">
  <form action=?>
	<input name=kdo>
	<button type=submit name=vysledek value=Ano>Ano</button>
	<button type=submit name=vysledek value=Ne>Ne</button>
  </form>
</div>

<p>Po odeslání se v <b>IE 6</b> v URL objeví <code>…&amp;vysledek=Ano&amp;vysledek=Ne</code>, ačkoliv se zmáčklo jen jedno tlačítko.</p>

<h3 id="ie-value">Obsah značky místo <code>value</code></h3>
<p>Další nepěkná věc je, že starší <b>IE</b> odesílá jako hodnotu políčka obsah mezi <code>&lt;button></code> a <code>&lt;/button></code> místo atributu <code>value</code>, který má značka nastavený.</p>

<div class="live">
  <form action=?>
	<input name=kdo>
	<button type=submit name=vysledek value=Ano>Odeslat</button>
  </form>
</div>

<p>Tlačítko <i>Odeslat</i> má <code>value</code> nastavenou na <code>Ano</code>, přesto se v <b>IE 7</b> a starších (v QUIRKu do <b>IE 9</b> včetně) odešle obsah značky, tj. <code>Odeslat</code> (JavaScriptovou terminologií <code>innerHTML</code>).</p>

<h3 id="neodeslani">Neodeslaní bez kliknutí</h3>
<p>Další problém je neodeslání tlačítka v případě, kde se formulář odešle <kbd>Enter</kbd>em z jiného políčka. Tím trpí <b>IE 8</b> a starší (nezávisle na <code>&lt;!doctype></code>).</p>

<h2 id="co">Co s tím?</h2>
<ul>
  <li><p>Nepoužívat ve <b>formulářích</b> <code>&lt;button></code>, ale <a href="/input"><code>&lt;input></code></a> s odpovídajícím <code>type</code>m.</p></li>
  <li><p>Zpracovávat formuláře na straně serveru tak, aby podoba, ve které se <code>&lt;button></code> odešle, <b>nehrála roli</b>. Tj. zda byl formulář <b>odeslán</b> testovat <b>jiným políčkem</b>. (Případně si potřebná data, která by mohl odesílat <code>&lt;button></code> uložit do <code>&lt;input type=hidden></code> — ten funguje spolehlivě.</p></li>
</ul>