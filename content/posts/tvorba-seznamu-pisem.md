---
title: "Seznam českých Google písem – making of"
headline: "Seznam českých Google písem – making of"
description: "Postup, kterým jsou vybírána a určována písma s českou diakritikou z Google Fonts."
date: "2014-01-22"
last_modification: "2014-01-22"
status: 1
tags: ["napady", "php", "pisma", "typografie"]
format: "html"
---

<p><a href="/ceska-pisma">Seznam cca 250 českých písem</a> pro použití na webu jsem pochopitelně nevytvářel ručně. Jak ale automaticky zjistit, jestli daný font umí znaky s háčky a čárkami. A jak to celé udělat?</p>

<h2 id="seznam-fontu">Seznam všech fontů</h2>
<p>V první řadě bylo třeba získat všechna Google písma. To jde snadno přes <a href="https://developers.google.com/fonts/docs/developer_api">API</a>.</p>

<pre><code>&lt;?php
$webfonts = json_decode(
  file_get_contents("https://www.googleapis.com/webfonts/v1/webfonts?fields=items%2Ffamily&amp;key=<b>API klíč</b>"), 
  true);</code></pre>

<p>Potom si je lze vypsat cyklem:</p>

<pre><code>foreach ($webfonts["items"] as $pismo) {
  $pismo["family"]; // název fontu
}</code></pre>

<h2 id="pripojeni-pisma">Připojení písma</h2>
<p>Každé písmo je možné připojit <b>vložením CSS souboru</b>, který se dále odkazuje na existující písma. Přišlo mi trochu nešetrné připojovat stovky CSS definic písem, které připojí další stovky fontů.</p>

<p>Zjistil jsem, že URL pro jeden CSS soubor (při oddělování <code>|</code> může být v jednom CSS více fontů) s písmy může mít bezpečně asi 1600 znaků, takže se takto požadavky rozdělují.</p>

<h2 id="zjisteni-znaku">Zjištění českých znaků</h2>
<p>Testování diakritiky probíhá tak, že se pro každé písmo vytvoří dva elementy:</p>

<ul>
  <li>jeden má znaky s diakritikou <code>ěščřžýáéňóůú</code>,</li>
  <li>druhý stejné znaky bez diakritiky <code>escrzyaenouu</code></li>
</ul>

<p>Potom se jim nastaví testované písmo a <b>JavaScriptem se přepočítá</b> <code>offsetWidth</code> (šířka výsledného elementu). Vychází se z toho, že v případě podpory diakritiky bude šířka stejná.</p>

<p>Některé znaky jako <code>í</code>, <code>ť</code> nebo <code>ď</code> se netestují, protože mají různé rozměry od svých bez-háčkových a bez-čárkových variant i v běžných písmech (např. Arial).</p>

<p>Nakonec proběhne vyfiltrování, kdy JS vyháže elementy, kde se <code>offsetWidth</code> nerovná. A výsledný HTML kód už tvoří <a href="/ceska-pisma">finální seznam</a>.</p>

<h2 id="nefunguje">Občas to nefunguje</h2>

<p>Ano, některá písma to určuje chybně. Nicméně úspěšnější automatický postup zatím neznám…</p>