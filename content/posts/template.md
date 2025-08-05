---
title: "HTML značka template"
headline: "HTML značka <code>&lt;template></code>"
description: "HTML tag <code>&lt;template></code> slouží k připravení HTML kódu, který později zpracuje JavaScript."
date: "2013-11-28"
last_modification: "2013-12-11"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Při vytváření aplikace v JavaScriptu se může hodit mít po ruce kód HTML, který se použije až později při nějaké události. <i>Šablony</i> pomocí <code>&lt;template></code> zatím fungují ve <b>Firefoxu</b> a <b>Chrome</b>. V <b>IE</b> ani <b>Opeře 12</b> ne.</p>

<h2 id="sablony">Šablona <code>&lt;template></code></h2>
<p>Cokoliv je umístěné do značky <code>&lt;template></code> podporující prohlížeče neřeší do té doby, než obsah JavaScript někde použije. Šablonu je možné umístit takřka <b>kamkoliv do kódu</b> (do <code>&lt;head></code>, <code>&lt;body></code>, do tabulky a podobně).</p>

<h3 id="vlastnosti">Vlastnosti šablony</h3>
<ul>
  <li><b>DOM</b> šablony se nevyhodnocuje.</li>
  <li><b>CSS</b> se na šablonu neaplikuje.</li>
  <li><b>Obrázky</b> se před použitím <b>nenačítají</b>.</li>
</ul>

<p>Použití <b>šablony</b> může vypadat následovně:</p>

<pre><code>&lt;template>
  &lt;p>Obsah ukrytý v šabloně&lt;/p>
&lt;/template></code></pre>

<p>„Aktivování“ obsahu šablony potom může proběhnout jeho <b>naklonováním</b> do stránky. Obsah z šablony je nutné dolovat přes <code>sablona.<b>content</b></code> (protože není v DOMu stránky).</p>

<pre><code>var sablona = document.querySelector('#id-sablony');
document.body.appendChild(sablona.content.cloneNode(true));</code></pre>

<p>Před <i>vložením</i> do stránky je možné šablony libovolně <b>JavaScriptem modifikovat</b>. Třeba <b>naplnit daty</b> nějak skriptem vypočtenými a podobně.</p>
<pre><code>sablona.content.querySelector("p").innerHTML = 'Ahoj';</code></pre>

<p><a href="http://kod.djpw.cz/onv">Ukázka</a></p>

<p>Poznámka: V obsahu šablony (vlastnost <code>content</code>) není možné nacházet elementy metodami typu <code>getElementsByTagName</code>, je <b>nutné použít</b> <a href="/queryselector"><code>querySelector</code></a>.</p>

<h3 id="preload">Přednačtení (preload)</h3>
<p>Načíst nějaký obsah z šablony <b>dopředu</b> nejspíš není možné.</p>

<p>Kvůli špatné podpoře šablony napříč prohlížeči <b>existují alternativy</b>…</p>

<h2 id="skryty-div">Skrytý element</h2>
<p>Obsahu se přidá <code>display: none</code>. Nevýhoda tohoto řešení je, že se tento element přidá do DOMu už při načtení, ačkoliv to není zatím potřeba. Zároveň se <b>stáhnou případné obrázky</b> v elementu umístěné.</p>

<h2 id="js-type-nesmysl">JS značka <code>&lt;script></code> s nesmyslným <code>type</code></h2>
<p>Zajímavější možnost je umístit obsah k <b>pozdějšímu použití</b> do značky <code>&lt;script></code>, které se dá nesmyslný <code>type</code>, takže její obsah prohlížeč jako JS kód nevyhodnotí.</p>

<pre><code>&lt;script id="sablona" type="nejaky/nesmysl">
  &lt;p>Skrytý obsah, který obnoví JavaScript.&lt;/p>
&lt;/script></code></pre>

<p>Obsah se později může vytáhnout přes <code>innerHTML</code>.</p>

<pre><code>document.getElementById("sablona").innerHTML</code></pre>

<p><a href="http://kod.djpw.cz/snv">Ukázka</a></p>