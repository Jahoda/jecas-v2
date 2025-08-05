---
title: "Pole v JavaScriptu"
headline: "Pole v JavaScriptu"
description: "Jak se v JS pracuje s poli, rozdíl mezi polem a NodeListem."
date: "2013-12-10"
last_modification: "2013-12-10"
status: 0
tags: []
format: "html"
---

<h2 id="hotove">Hotová řešení běžných operací</h2>

<pre><code>var pole = [1, 2, 3, 4, 5];</code></pre>

<h3 id="smazat">Smazání prvku z pole</h3>

<pre><code>pole.splice(index, 1);</code></pre>

<h3 id="prvni">Přesunutí prvku na první místo</h3>

<pre><code>pole.unshift(pole.splice(index, 1)[0]);</code></pre>

<h3 id="pop">Odstranění posledního prvku <code>pop()</code></h3>

<pre><code>pole.pop()
// [1, 2, 3, 4]</code></pre>

http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/