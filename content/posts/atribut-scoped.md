---
title: "HTML atribut scoped"
headline: "HTML atribut <code>scoped</code>"
description: "HTML 5.1 přichází s možností validně používat element <code>&lt;style></code> i mimo část <code>&lt;head></code>."
date: "2013-06-23"
last_modification: "2014-11-15"
status: 1
tags: ["html", "html-atributy", "napady"]
format: "html"
---

<p>Tedy používat jej tam, kde to odjakživa také funguje, tj. kdekoliv ve stránce. Aby to nebylo tak jednoduché, <a href='http://www.w3.org/html/wg/drafts/html/master/single-page.html#attr-style-scoped'>podle návrhu</a> jsou ohledně <code>&lt;style></code> dva způsoby použití:</p>

<ol>
  <li>normálně <b>v hlavičce</b> (jako doposud),</li>
  <li><b>kdekoliv</b> ve stránce právě s atributem <code>scoped</code></li>
</ol>

<p>Atribut <code>scoped</code> je boolean.</p>
  

<h2 id="podpora">Podpora</h2>

<p>Atribut <code>scoped</code> funguje od <b>Firefoxu 21</b>. Na okamžik se objevil i ve <b>Chrome</b> (po zapnutí experimentálních vlastností), ale v <b>Chrome 37</b> už tato možnost <b>byla vyřazena</b>.</p>

<div class="external-content">
  <ul>
    <li>Vývojáři jádra Blink (používá <b>Chrome</b> a <b>Opera 15+</b>): <a href="https://groups.google.com/a/chromium.org/forum/#!searchin/blink-dev/scoped/blink-dev/R1x18ZLS5qQ/Bjuh_cENhlQJ">Intent to remove &lt;style scoped></a></li>
  </ul>
</div>
  

<h2>Využití</h2>

<p>V podporovaných prohlížečích <code>&lt;style scoped></code> zajistí aplikaci daného CSS jen v rámci svého rodiče (na příkladu element <code>&lt;div></code>). Deklarace <code>p {color: red}</code> proto nepřebarví všechny <b>všechny odstavce</b> na stránce, ale jen ten v daném <i>scope</i> (prostoru ohraničeného nejbližším nadřazeným elementem – s pojmem <i>scope</i> se je možné setkat i v <a href="/scope">JavaScriptu</a> nebo jiných programovacích jazycích).</p>
  
<pre><code>&lt;head&gt;
  &lt;style&gt;
    p {color: blue}
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;p&gt;Modrý odstavec&lt;/p&gt;
  &lt;div&gt;
    &lt;style <b>scoped</b>&gt;
      p {color: red}
    &lt;/style&gt;      
  &lt;p&gt;Červený odstavec&lt;/p&gt;
  &lt;/div&gt;
&lt;/body></code></pre>

<p><a href="http://kod.djpw.cz/fmhb">Živá ukázka</a></p>

<p>Zatím se ale nabízí spíš využití ve formě <b>umlčení HTML 5 validátoru</b> při používání <code>&lt;style></code> v těle dokumentu. Je zde ale risiko, že prohlížeče začnou <code>scoped</code> podporovat. A takto zapsaný styl začne fungovat jinak, než bylo očekáváno.</p>