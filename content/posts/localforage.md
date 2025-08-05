---
title: "Co je to localForage?"
headline: "Co je to localForage?"
description: "K čemu slouží a jak se používá localForage úložiště."
date: "2014-02-12"
last_modification: "2016-05-05"
status: 1
tags: ["js", "knihovny"]
format: "html"
---

<p>Úložiště <code>localForage</code> je JS knihovna (velká cca 10 kB zagzipovaná) zjednodušující ukládání dat <b>na straně klienta</b>.</p>

<div class="external-content">
  <ul>  
    <li>Mozilla: <a href="http://mozilla.github.io/localForage/#localforage">localForage</a></li></ul>
</div>


<p>Pro ukládání dat do prohlížeče existují 4 způsoby:</p>

<ol>
  <li><code>IndexedDB</code>,</li>
  <li><code>WebSQL</code>,</li>
  <li><a href="/localstorage"><code>localStorage</code></a>,</li>
  <li><a href="/cookies">cookies</a></li>
</ol>


<p>Do cookies lze rozumně ukládat maximálně 4 kB dat, která se přenáší při každém požadavku na server, proto se pro větší data příliš nehodí. <code>IndexedDB</code> a <code>WebSQL</code> nejsou úplně dobře podporované napříč prohlížeči a nemají úplně přívětivé API.</p>

<p>Lokální úložiště se používá elegantně, ale <b>není asynchronní</b> (takže blokuje provádění kódu, než se z disku získají data). Taktéž do něj nelze ukládat binární data.</p>


<p>Knihovna <code>localForage</code> tedy přináší výhody asynchronních <code>IndexedDB</code>/<code>WebSQL</code> s rozhraním jako má <code>localStorage</code>. Úložiště <code>localStorage</code> se používá jako záložní způsob pro starší prohlížeče.</p>




<h2 id="odkazy">Odkazy jinam</h2>
<ul>  

  <li><a href="https://hacks.mozilla.org/2014/02/localforage-offline-storage-improved/">localForage: Offline Storage, Improved</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB">Using IndexedDB</a></li>
  
  <li><a href="http://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/">IndexedDB, WebSQL, LocalStorage – what blocks the DOM?</a> – IndexedDB blokuje DOM více než localStorage</li>
</ul>