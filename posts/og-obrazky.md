---
title: "Dynamické generování OG obrázků"
headline: "Dynamické generování OG obrázků"
description: "Jak generovat náhledové obrázky z HTML."
date: "2023-03-13"
last_modification: "2023-03-13"
status: 0
tags: []
format: "html"
---

<p>Pro sdílení odkazů na různých webových stránkách se hodí řešit jejich <a href="/nahled-odkazu">náhledy</a>.</p>

<p>Zejména sociální sítě se pro odkaz snaží dotáhnout další informace a nabídnout tak zajímavější náhled.</p>

<p>Ustálilo se k tomu používat <a href="https://ogp.me">Open Graph protocol</a>:</p>

<pre><code>&lt;meta property="og:url" content="https://jecas.cz/ai-programovani">
&lt;meta property="og:title" content="10+ věcí, jak AI pomáhá při programování">
&lt;meta property="og:description" content="AI dokáže výrazně zvýšit efektivitu programátora. Nevezme mu ale práci?">
&lt;meta property="og:image" content="https://jecas.cz/files/article/ai-programovani.png"></code></pre>


<p>Hezčí/poutavější náhledy mohou vést k <b>zvýšení návštěvnosti</b>. Proto není špatné jim věnovat trochu péče.</p>

<p>U převážně textového obsahu může být problém s jejich vytvářením.</p>

<ol>
  <li>
<p>První možnost je pro ruční vytvoření obrázku použít <a href="/sw-obrazky">grafický program</a>.</p>
  </li>
  
  <li>
    <p>Zajímavý způsob může být nechat obrázky generovat <a href="/ai-programovani">umělou inteligenci</a>.</p>
  </li>
  
  <li>
    <p>Pro více automatické řešení se hodí náhledový obrázek řešit v HTML.</p>
  </li>
</ol>


<h2 id="html">Převod HTML na obrázek</h2>

<p>Trik tkví v tom, že se náhledový obrázek vyskládá v HTML/CSS, a potom převede na <b>skutečný obrázek</b>.</p>

<p>K tomu jde použít třeba <a href="https://github.com/puppeteer/puppeteer">puppeteer</a>, který rozjde headless Chrome, a dokáže tak dělat screenshoty stránek.</p>

<p>Výrazně zajímavější je ale <a href="https://github.com/vercel/satori">Satori</a> od <a href="https://vercel.com">Vercelu</a>, které se obejde bez Chrome, a dokáže obrázek <b>vytvořit za pár milisekund</b>.</p>

<div class="external-content">
  <ul>
    <li>
      <a href="https://og-playground.vercel.app">OG Image Playground</a>
    </li>
  </ul>
</div>

<p>Podporuje všechny běžné CSS vlastnosti. Jde vkládat i obrázky nebo používat emoji. Nebo i připojit externí fonty.</p>


<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>
    Vercel: <a href="https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation">Open Graph (OG) Image Generation</a>
  </li>
  <li>
    <a href="https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images">Introducing OG Image Generation: Fast, dynamic social card images at the Edge</a>
  </li>
  
  <li>
    <a href="https://geoffrich.net/posts/svelte-social-image/">Create dynamic social card images with Svelte components</a>
  </li>
  
  <li>
    <a href="https://dev.to/theether0/dynamic-og-image-with-sveltekit-and-satori-4438">Dynamic OG image with SvelteKit and Satori</a>
  </li>
</ul>