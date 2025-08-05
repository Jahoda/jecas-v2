---
title: "Tag <label> a atribut for"
headline: "Značka <code>&lt;label></code> a atribut <code>for</code>"
description: "Značka <code>&lt;label></code> slouží ke <i>svázání</i> popisku s formulářovým prvkem. Kdy použít atribut <code>for</code>?"
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["formulare", "html", "html-tagy"]
format: "html"
---

<p>Formulář se potom lépe ovládá, třeba v případě <code>checkbox</code>u je výrazným rozdíl v trefování se do malého čtverečku nebo do čtverečku s jeho popisem.

<ul class='none'>
  <li><input type=checkbox> Text bez <code>&lt;label></code>u
  <li><input type=checkbox id=a> <label for=a>Text s <code>&lt;label for='ID &lt;input>u'></code>
</ul>

<h2 id='zadny-for'>Co <code>&lt;input></code> v <code>&lt;label></code>u?</h2>
<p>Vyhnout se atributu <code>for</code> lze umístěním <code>&lt;input></code>u do <code>&lt;label></code>u.
<pre><code>&lt;label>&lt;input type=checkbox> Popisek&lt;/label></code></pre>

<p>Problém ale je, že takový kód se v <b>Internet Exploreru 6</b> (a starších) bude chovat jako bez <code>&lt;label></code>u.
<p>A přichází dilema, zda se na tento často okrajový prohlížeč vykašlat, nebo naopak i kvůli pár jeho uživatelům provést triviální úpravu…
<pre><code>&lt;label for=<b>a</b>>&lt;input type=checkbox id=<b>a</b>> Popisek&lt;/label></code></pre>