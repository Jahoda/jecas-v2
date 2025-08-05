---
title: "Značka <body> jako obal stránky"
headline: "Obal <code>&lt;body></code>, nebo <code>&lt;div id=container></code>?"
description: "Ve <a href=\"/doctype\">standardním režimu</a> lze značku <code>&lt;body></code> stylovat jako normální <code>&lt;div></code>. Má to cenu?"
date: "2013-06-12"
last_modification: "2013-06-13"
status: 1
tags: ["css", "napady"]
format: "html"
---

<p>Zadáme jednoduchý CSS kód.
<pre><code>body {margin: auto; width: 960px}</code></pre>

<p>K jednoduchému HTML:
<pre><code>&lt;!doctype html>
&lt;title>Titulek&lt;/title>
&lt;h1>Nadpis&lt;/h1>
&lt;p>Odstavec</code></pre>

<p>A máme <a href="/centrovani">vycentrovanou</a> 960 pixelů širokou stránku bez nějakého balastu v HTML. Není to skvělé? Funkční všude od Exploreru 6.

<h2>Jenže…</h2>
<dl>
<dt>Vícenásobné pozadí
<dd>Řešené kvůli starším prohlížečům několika obaly (každý obal má jeden obrázek) a najednou se celá stránka musí předělávat, protože <code>&lt;body></code> už není čím obalit.
<dt><a href='/magnific-popup'>Lightbox skript</a>
<dd>Má najednou problém se <i>připlácnout</i> na stránku, protože s omezenou šířkou <code>&lt;body></code> vůbec nepočítá.
</dl>

<p>Zdá se tedy, že používat obal <code>&lt;div id=container></code> má pořád smysl.