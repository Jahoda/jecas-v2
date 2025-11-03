---
title: "CSS pseudo element ::marker"
headline: "CSS pseudo element <code>::marker</code>"
description: "CSS pseudo element <code>::marker</code> umožňuje stylovat odrážky seznamů"
date: "2025-11-03"
last_modification: "2025-11-03"
status: 1
tags: ["css", "selektory-css", "css-vlastnosti"]
format: "html"
---

<p><code>::marker</code> je pseudo‑element pro stylování značek seznamů u <code>&lt;ul></code> a <code>&lt;ol></code>. Umožňuje měnit vzhled teček a číslování.</p>

<h2 id="zaklady">Základy použití</h2>

<pre><code>li::marker {
  color: #2563eb;
  font-size: 1.1em;
}
</code></pre>

<p>Výchozí tvar značky řídí <code>list-style-type</code> (<code>disc</code>, <code>circle</code>, <code>square</code>, <code>decimal</code>, <code>lower-roman</code>…). <code>::marker</code> pak upraví barvu a typografii.</p>

<div class="live internal-content">
  <style>
    .demo-list-colored li::marker { color: #0468c5 }
  </style>
  <ul class="demo-list-colored">
    <li>Vlastní barva odrážky</li>
    <li>Vlastní barva odrážky</li>
  </ul>
  </div>

<h2 id="co-lze-stylovat">Co lze stylovat</h2>

<ul>
  <li><b>Barvu</b>: <code>color</code></li>
  <li><b>Písmo</b>: všechny vlastnosti <code>font-*</code> a <code>font</code></li>
  <li><b>Mezery</b>: <code>white-space</code></li>
  <li><b>Obsah</b>: <code>content</code></li>
  <li>Pro odsazení použijte <code>padding-left</code> na seznamu nebo <code>list-style-position</code>.</li>
  </ul>

<h2 id="vymena-symbolu">Výměna symbolu přes content</h2>

<pre><code>ul li::marker { content: "– "; }
</code></pre>

<div class="live internal-content">
  <style>
    .demo-pomlcka li::marker { content: "– "; color: #0468c5}
  </style>
  <ul class="demo-pomlcka">
    <li>položka</li>
    <li>položka</li>
    <li>položka</li>
    <li>položka</li>
  </ul>
</div>

<p>Zajímavé může být použít <a href="/emoji">emoji</a>.</p>

<div class="live">
  <style>
    .demo-emoji li::marker { content: "✅"; color: #0468c5}
  </style>
  <ul class="demo-emoji">
    <li>položka</li>
    <li>položka</li>
    <li>položka</li>
    <li>položka</li>
  </ul>
</div>

<p>Pro číslované seznamy lze využít vestavěný čítač <code>list-item</code> a vytvářet hierarchické číslování:</p>

<pre><code>ol li::marker { content: counters(list-item, ".") ". "; }
</code></pre>

<div class="live internal-content">
  <style>
    .demo-counter li::marker { content: counters(list-item, ".") ". "; }
  </style>
  <ol class="demo-counter">
    <li>Položka
      <ol>
        <li>Podpoložka</li>
        <li>Podpoložka</li>
      </ol>
    </li>
    <li>Položka</li>
  </ol>
</div>


<h2 id="odsazeni-a-zarovnani">Odsazení a zarovnání</h2>

<pre><code>ul {
  list-style-position: outside;
  padding-left: 1.25rem;
}
</code></pre>

<p><code>outside</code> je výchozí a udržuje značku mimo text. <code>inside</code> posune značku do textového boxu, což ovlivní zalamování dlouhých řádků.</p>


<h2 id="tailwind">Použití s Tailwindem</h2>

<p>V <a href="/tailwind-css">Tailwindu</a> se marker používá následovně:</p>

<pre><code>&lt;ul class="list-disc pl-6 marker:text-blue-600 marker:font-medium">
  &lt;li>První položka&lt;/li>
  &lt;li>Druhá položka&lt;/li>
&lt;/ul></code></pre>

<h2 id="podpora">Podpora</h2>

<p>Moderní prohlížeče <b>Chrome, Firefox, Safari, Edge</b> <code>::marker</code> podporují.</p>

<p>Pokud se přes <code>marker</code> nezasahuje do obsahu, ale spíš mění barvy, většinou se s tím dá smířit a není potřeba řešit fallback.</p>

<p>V dřívějších dobách se odlišná barva odrážky a textu položky seznamu řešila typicky dalším obalovým elementem, přes <code>:before</code> nebo obrázkem.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://developer.mozilla.org/docs/Web/CSS/::marker">MDN: ::marker</a></li>
  <li><a href="https://www.smashingmagazine.com/2019/07/css-lists-markers-counters/">Smashing Magazine: CSS Lists, Markers, And Counters</a></li>
  <li><a href="https://kod.djpw.cz/rjod">Živá ukázka</a></li>
</ul>