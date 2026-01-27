---
title: "Svelte animace a přechody"
headline: "Svelte animace a přechody"
description: "Jak snadno ve Svelte cokoliv na stránce plynule animovat."
date: "2023-05-07"
last_modification: "2023-05-07"
status: 0
tags: ["svelte"]
format: "html"
---

<p>JS knihovna pro snadnou tvorbu reaktivního frontendu – <a href="https://svelte.dev">Svelte</a> – má přímo v sobě zabudované nástroje pro plynulé visuální přechody a animace.</p>


<p>Není potřeba nic dalšího instalovat, většinu běžné používaných přechodů má Svelte v sobě.</p>

<p>Nejjednodušší použití vypadá následovně:</p>

<pre><code>&lt;div transition:slide></code></pre>







<ol>
  <li>
    <p>Atribut <code>transition</code> značí, že se jedná přechod. Místo něj jde použít <code>in</code> a <code>out</code>, pokud mají být oba <i>směry</i> přechodu rozdílné.</p>
  </li>
  
  <li>
    <p>Za dvojtečkou následuje funkce, která se stará o samotnou animaci. Ta může být i vlastní, ale typicky se importuje ze Svelte, kde je spoustu animací už hotových:</p>
    
    <pre><code>import { slide } from 'svelte/transition'</code></pre>
  </li>
  
  <li>
    <p>Přechodové funkci jde předat případně nějaké parametry. Třeba dobu animování:</p>
    
    <pre><code>&lt;div transition:slide={{ duration: 300 }}></code></pre>
  </li>
</ol>


<p><a href="https://svelte.dev/repl/7ef3298c5782442296704f3b78008bb8?version=3.59.0">Živá ukázka</a></p>