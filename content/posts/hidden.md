---
title: "Hidden atribut"
headline: "HTML atribut <code>hidden</code>"
description: "HTML atribut <code>hidden</code> jde použít pro skrytí obsahu."
date: "2015-02-16"
last_modification: "2015-02-16"
status: 1
tags: ["html", "html-atributy"]
format: "html"
---

<pre><code>&lt;p hidden>
  Obsah odstavce nebude vidět.
&lt;/p></code></pre>



<p>Jedná se o tzv. <b>globální atribut</b> – tedy jde použít u všech HTML elementů. Element s atributem <code>hidden</code> nebude na stránce vidět – jako by měl nastaveno <code><a href="/display">display</a>: none</code>.</p>




<h2 id="podpora">Podpora</h2>

<p>Použití <code>hidden</code> zneviditelní obsah od <b>IE 11</b>. Pro starší <b>Internet Explorery</b> jde teoreticky použít <a href="/css-selektory#atributovy">atributový selektor</a>:</p>

<pre><code>[hidden] {
    display: none;
}</code></pre>




<h2 id="vyuziti">Využití</h2>

<p>Atribut <code>hidden</code> neslouží ke <a href="/zobrazit-skryt">skrývání/odkrývání textu</a>, jak by se mohlo zdát. Neměl by se používat ani k <i>přepínání záložek</i>.</p>

<p>Je vhodný k označení obsahu, který ještě nebo už <b>není relevantní</b>. Využití má tedy hlavně u <b>JS aplikací</b>, kdy jsou na stránce různé bloky kódu, které se nevyužívají najednou.</p>


<h3 id="priklad">Příklad použití</h3>

<p>Specifikace uvádí příklad s přihlášením, kdy je zobrazen přihlašovací formulář a skrytý obsah.</p>

<p><img src="/files/hidden/atribut-hidden.gif" alt="Příklad použití atributu hidden" class="border"></p>

<p>Obsah bude skrytý pomocí <code>hidden</code>.</p>

<pre><code>&lt;form id="prihlaseni">
…
&lt;/form>
&lt;div id="obsah" <b>hidden</b>>
…
&lt;/div></code></pre>








<p>Po přihlášení se potom <code>hidden</code> prohodí (nastaví pro přihlašovací formulář a zruší pro obsah):</p>

<pre><code>document.getElementById("prihlaseni").hidden = true;
document.getElementById("obsah").hidden = false;</code></pre>

<p><a href="http://kod.djpw.cz/kmkb">Živá ukázka</a></p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>WHATWG: <a href="https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute">The <code>hidden</code> attribute</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden"><code>hidden</code></a></li>
</ul>