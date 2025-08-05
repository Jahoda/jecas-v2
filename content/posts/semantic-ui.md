---
title: "Semantic UI"
headline: "Semantic UI"
description: "Semantic UI je CSS framework. Co nabízí a jak funguje?"
date: "2013-10-02"
last_modification: "2013-10-06"
status: 1
tags: ["css", "knihovny"]
format: "html"
---

<p><a href="http://semantic-ui.com/" class="button">Web Semantic UI</a></p>

<p>Jak název <i>semantic</i> možná už vypovídá, hlavní rozdíl oproti jiným frameworkům (jako je Bootstrap, Foundation nebo <a href="http://jecas.cz/kraken">Kraken</a>) je v <b>zápisu formátovacích tříd v přirozenějším jazyce</b>.</p>

<p>Místo ne úplně intuitivního zápisu v <b>Bootstrapu</b>:</p>
<pre><code>&lt;div class="row">
  &lt;div class="col-lg-4">1&lt;/div>
  &lt;div class="col-lg-4">2&lt;/div>
  &lt;div class="col-lg-4">3&lt;/div>
&lt;/div></code></pre>

<p>Se v <b>Semantic UI</b> používá:</p>
<pre><code>&lt;div class="ui three column grid">
  &lt;div class="column">1&lt;/div>
  &lt;div class="column">2&lt;/div>
  &lt;div class="column">3&lt;/div>
&lt;/div></code></pre>

<p>To je docela sympatické — nemusí se <b>dopočítávat žádné sloupce</b>, ale jednoduše se napíše „ui tří sloupcová mřížka“, přidají se tři sloupce a je to. Tento duch se táhne napříč celým projektem. Co se před-připravených částí týká, je k disposici přibližně totéž co v Bootstrapu:</p>

<ol>
  <li>grid systém (rozložení layoutu),</li>
  <li>tlačítka,</li>
  <li>ikony,</li>
  <li>nadpisy,</li>
  <li>tabulky,</li>
  <li>seznamy,</li>
  <li>navigace,</li>
  <li>drobečkové navigace,</li>
  <li>stavové hlášky,</li>
  <li>formuláře</li>
  <li>a mnoho dalšího.</li>
</ol>

<h2 id="stazeni">Stažení a <i>obsah</i> frameworku</h2>
<p>Po stažení <b>5MB archivu</b> v něm nalezneme několik složek. Najdeme například původní zdrojový kód pro CSS preprocesor LESS, z toho vygenerované CSS, soubory minifikované a konečně pro <b>finální nasazení</b> asi nejvhodnější — <b>zabalená a zmenšená</b> verse v adresáři <code>packed</code> (CSS a JS soubory <code>semantic.min.css</code>, resp <code>semantic.min.js</code>).</p>


<h2 id="pouzit">Použití</h2>
<p>Stačí připojit zmenšený CSS a JS soubor (o velikosti 213 kB, respektive 121 kB) a začít používat příslušné třídy. Pro JS vymoženosti je ještě potřeba jQuery.</p>
<p>V případě <b>využívání jen částí</b> by bylo vhodné si ty potřebné poskládat ze souborů v adresáři <code>minified</code>.</p>

<h2 id="podpora">Podpora napříč prohlížeči</h2>
<p>Zatím není valná. Autor ji sice uvádí jako <i>IE8+</i>, ale podle mých testů <b>framework Semantic UI</b> funguje jakžtakž až od <b>IE 9</b>, výsledek v <a href="/files/semantic-ui/ie8.png">Internet Exploreru 8 mi moc funkčně nepřipadá</a>.</p>
<p>Možná se to časem zlepší…</p>