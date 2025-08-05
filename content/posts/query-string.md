---
title: "Query string v URL"
headline: "Query string v URL"
description: "Řetězec dotazu je část URL za otazníkem obsahující nejrůznější parametry."
date: "2025-03-24"
last_modification: "2025-03-24"
status: 0
tags: []
format: "html"
---

<pre><code>https://example.com/produkty?<b>orderBy=price</b></code></pre>


<p>Obsah query stringu se obvykle zapisuje ve tvaru <code>parametr=hodnota</code> a více těchto dvojic se oddělí ampersandem (<code>&amp;</code>):</p>



<pre><code>https://example.com/produkty?orderBy=price<b>&amp;</b>sort=desc</code></pre>


<p>Historicky existovala v HTML značka <code>&lt;isindex></code>, která umožnila zadat uživateli vstup a ten se potom poslal na server za otazníkem.</p>

<p>Server tak mohl nabídnout například vyhledávání.</p>

<p>Je dost možné, že právě proto se tyto parametry v URL někdy označují i jako <i>search params</i>. A v JavaScriptu se dají získat z <code>window.location.<b>search</b></code> nebo moderněji z <code>URLSearchParams</code>.</p>




<p>Svého času se tyto parametry v URL využívali i pro kompletní routování v PHP aplikacích. Celá aplikace klidně mohla být jediný soubor <code>index.php</code>, který přes obsah v URL za otazníkem rozhodoval, co se má vykreslit.</p>

<pre><code>https://example.com?page=kontakt</code></pre>





<p>Postupem času se přešlo k hezčím URL, kde jsou tyto parametry nenesoucí přílišnou hodnotu vypuštěny.</p>

<pre><code>https://example.com/kontakt</code></pre>




<p>Parametry v URL se tak používají zejména pro <b>vyhledávání, filtrování</b>, <a href="/strankovan">stránkování</a>, předávání identifikátorů nebo invalidace cache.</p>


<pre><code>https://www.google.com/search?q=je+cas</code></pre>






<h2 id="seo">SEO</h2>

<p>Z pohledu vyhledávače je každá URL s jiným obsahem query stringu <i>samostatná stránka</i>.</p>

<p>Z toho plyne risiko duplicitních stránek.</p>


<pre><code>https://example.com/produkty
https://example.com/produkty?a
https://example.com/produkty?b</code></pre>






<p>Všechny tyto stránky mohou vracet stejný obsah, ale vyhledávač se musí rozhodnout, kterou z nich upřednostnit.</p>

<p>Dokonce i následující URL mohou teoreticky vracet různý obsah:</p>

<pre><code>https://example.com/produkty?orderBy=price&amp;sort=desc
https://example.com/produkty?sort=desc&amp;orderBy=price</code></pre>


<p>Většinou se to řeší <b>kanonickým odkazem</b>, který jasně definuje, která varianta je preferovaná:</p>

<pre><code>&lt;link href="https://example.com/kontakt" rel="canonical"></code></pre>


https://www.npmjs.com/package/query-string
https://github.com/beynar/kit-query-params
https://github.com/paoloricciuti/sveltekit-search-params



<ul>
  <li>
    JPW: <a href="https://www.jakpsatweb.cz/clanky/fosilie-isindex.html">Živá fosílie HTML - ISINDEX</a>
  </li>
</ul>