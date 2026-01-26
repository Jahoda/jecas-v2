---
title: "Noscript"
headline: "HTML značka <code>&lt;noscript></code>"
description: "Značka noscript zobrazí obsah pouze když je vypnutý JavaScript."
date: "2015-11-03"
status: 1
tags: ["html", "html-tagy", "javascript"]
format: "html"
---

<p>Značka <code>&lt;noscript></code> slouží k zobrazení <b>alternativního obsahu</b> v případě, že prohlížeč nepodporuje nebo nemá zapnutý <a href="/js">JavaScript</a>.</p>

<h2 id="pouziti">Použití</h2>

<pre><code>&lt;noscript>
  &lt;p>Pro správné fungování stránky zapněte JavaScript.&lt;/p>
&lt;/noscript></code></pre>

<p>Obsah uvnitř <code>&lt;noscript></code> se zobrazí <b>pouze</b> když:</p>

<ul>
  <li>Prohlížeč nepodporuje JavaScript,</li>
  <li>uživatel má JavaScript <b>vypnutý</b>,</li>
  <li>prohlížeč blokuje skripty (např. rozšíření NoScript).</li>
</ul>

<h2 id="umisteni">Umístění</h2>

<p>Značku <code>&lt;noscript></code> lze použít jak v <code>&lt;head></code>, tak v <code>&lt;body></code>:</p>

<pre><code>&lt;head>
  &lt;noscript>
    &lt;link rel="stylesheet" href="noscript.css">
  &lt;/noscript>
&lt;/head></code></pre>

<p>V hlavičce může obsahovat pouze značky <code>&lt;link></code>, <code>&lt;style></code> a <code>&lt;meta></code>.</p>

<h2 id="lazy-loading">Využití pro lazy loading</h2>

<p>Zajímavé využití <code>&lt;noscript></code> je při <a href="/lazy-loading-obrazky">lazy loadingu obrázků</a>. Obsah uvnitř této značky se <b>nestahuje automaticky</b>, dokud není potřeba:</p>

<pre><code>&lt;noscript>
  &lt;img src="obrazek.png" alt="Popis">
&lt;/noscript></code></pre>

<p>Na rozdíl od skrytého <code>&lt;img></code> přes CSS se obrázek uvnitř <code>&lt;noscript></code> <b>nestáhne</b>, dokud ho JavaScript nevytáhne a nevloží do DOM.</p>

<div class="internal-content">
  <ul>
    <li><a href="/zacatek-stahovani-obrazku">Kdy začne stahování obrázku</a> – proč je <code>&lt;noscript></code> jediné spolehlivé řešení</li>
  </ul>
</div>

<h2 id="detekce">Detekce JavaScriptu</h2>

<p>Pro stylování stránky podle přítomnosti JS je lepší použít třídu na <code>&lt;html></code>:</p>

<pre><code>&lt;html class="no-js">
&lt;script>
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');
&lt;/script></code></pre>

<p>Pak lze v CSS stylovat:</p>

<pre><code>.no-js .pouze-s-js { display: none; }
.js .bez-js { display: none; }</code></pre>
