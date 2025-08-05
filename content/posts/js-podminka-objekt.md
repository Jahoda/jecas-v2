---
title: "JS podmínka v objektu"
headline: "JS podmínka v objektu"
description: "Jak v JavaScriptu zapsat podmínku uvnitř objektu."
date: "2023-01-05"
last_modification: "2023-01-06"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Například při posílání požadavků na API se přidávají různé parametry. Třeba u <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"><code>fetch</code></a> to může být metoda, kterou se má požadavek odeslat:</p>

<pre><code>fetch(url, {
  method: 'POST'
})</code></pre>




<p>Jak ale metodu nastavovat na <code>POST</code> jen při splnění podmínky?</p>

<p>Užitečný je pro tento případ tzv. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax">spread operátor</a> – <code>...</code> (hodí se i pro <a href="/js-klonovani-objektu#spread">klonování objektů</a>).</p>

<p>Jedna možnost je použít ternární operátor <code>?</code>:</p>

<pre><code>fetch(url, {
  ...(podminka ? { method: 'POST' } : [])
})</code></pre>

<p>A nechat pomocí <i>spread</i> operátoru <i>rozbalit</i> třeba prázdné pole, prázdný objekt, <code>null</code> nebo třeba nějaké číslo.</p>

<p>Nebo rovnou celý zápis zkrátit na:</p>

<pre><code>fetch(url, {
  ...(podminka &amp;&amp; { method: 'POST' })
})</code></pre>


<p>Díky tomu se vlastnost <code>method</code> vůbec nedostane do výsledného objektu.</p>