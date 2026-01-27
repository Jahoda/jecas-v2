---
title: "Přizpůsobení záložního fontu přes size-adjust"
headline: "Přizpůsobení záložního písma přes size-adjust"
description: "CSS vlastnost <code>size-adjust</code> zabraňuje poskakování textu u vlastních fontů."
date: "2021-11-30"
last_modification: "2021-11-30"
status: 0
tags: ["typografie"]
format: "html"
---

<p>Nestačí-li použít na webu systémová písma (dostupná přímo v zařízení), jde použít <i>vlastní</i> fonty pomocí CSS pravidla <a href="/font-face"><code>@font-face</code></a>:</p>

<pre><code>@font-face {
  font-family: "Název písma";
  src: url("pismo.ttf");
}</code></pre>












<p>Tím bude možné potom v <code>font-family</code> použít nově zaregistrované písmo.</p>


<p>Vlastní fonty historicky trpí řadou problémů.</p>


<p>Takový font se musí napřed stáhnout, což vede k tomu, že se prohlížeč / tvůrce webu musí rozhodnout, jak se zachovat:</p>

<ol>
  <li>během stahování fontu,</li>
  <li>po úspěšném stažení fontu,</li>
  <li>po neúspěšném / dlouhém stahování fontu</li>
</ol>


<p>Je to takové dilema, protože pokud se do doby stažení vlastního fontu stránka zobrazí nějakým základním fontem dostupným v systému, po stažení vlastního písma nejspíš poskočí kvůli rozdílným proporcím a velikostem.</p>

<p>Často se to řešilo tím, že se do stažení vlastního písma vůbec nezobrazoval text – takže nestažení fontu znemožnilo číst text. V lepším případě s nějakou časovou prodlevou, aby při neúspěchu bylo možné něco na stránce číst.</p>




<p>Vlastnost <code>size-adjust</code> nahrává tomu, aby se vždy na stránce zobrazoval text, byť ze začátku písmem dostupným v systému s tím, že se velikostně a proporčně upraví vlastnímu písmu, aby se eliminovalo poskakování.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Web.dev: <a href="https://web.dev/css-size-adjust/">CSS size-adjust for @font-face</a></li>
</ul>