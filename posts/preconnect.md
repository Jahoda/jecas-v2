---
title: "Preconnect – zrychlení stahování z více domén"
headline: "Preconnect – zrychlení stahování z více domén"
description: "Jak v prohlížečích zrychlit stahování souborů z jiné domény pomocí <code>preconnect</code>."
date: "2015-09-07"
last_modification: "2015-09-14"
status: 1
tags: ["zrychlovani"]
format: "html"
---

<p>Pro <b>získání obsahu</b> (HTML stránky, obrázku, stylu, skriptu, …) musí prohlížeč zjednodušeně udělat dvě věci:</p>

<ol>
  <li><b>Sestavit spojení</b></li>
  
  <li><b>Stáhnout obsah</b></li>
</ol>

<p>Do sestavení spojení patří vyhledání doménového jména (tzv. DNS Lookup), navázání TCP spojení a podobně.</p>

<p>Výhoda je, že tyto činnosti se provádí pouze jednou pro danou doménu, takže je prohlížeč nemusí provádět pro každý soubor, který stránka potřebuje (CSS, JS, obrázky, …).</p>

<p>Na druhou stranu potom <b>připojování souborů z různých domén</b> může logicky načítání prodloužit.</p>

<p>Zvlášť problematické je to třeba u <a href="/ceska-pisma">Google Fontů</a>, kdy prohlížeč nejprve stáhne CSS z jedné domény, aby následně stáhl nadefinovaná písma, která se nachází na doméně jiné.</p>

<p>U datově malých souborů a rychlého připojení často samotné stažení zabere menší čas než navázání spojení.</p>


<p><img src="/files/preconnect/bez.png" alt="Požadavků na více domén" class="border"></p>





<p>Pomocí <code>preconnect</code> jde prohlížeči napovědět, pro které všechny domény si má připojení připravit. Navázání spojení pro další domény tak může proběhnout paralelně s dřívějšími požadavky:</p>

<p><img src="/files/preconnect/preconnect.png" alt="Požadavků na více domén" class="border"></p>












<h2 id="podpora">Podpora</h2>

<p>Použití preconnect nápovědy podporují následující prohlížeče:</p>

<ul>
  <li><b>Chrome 46+</b>,</li>
  <li><b>Firefox 39+</b>,</li>
  <li><b>Opera 33+</b></li>
</ul>

<div class="external-content">
  <ul>
    <li>Can I use… <a href="http://caniuse.com/#search=preconnect">Resource Hints: preconnect</a></li>
  </ul>
</div>

<p>Existují různé způsoby, jak <i>preconnect</i> technicky implementovat:</p>




<h2 id="html">HTML značka <code>&lt;link></code></h2>

<p>Nejednodušší je přidat do hlavičky stránky <code>&lt;link></code> značku:</p>

<pre><code>&lt;link href='https://example.com' <b>rel='preconnect' crossorigin</b>></code></pre>





<h2 id="http">HTTP hlavička <code>Link</code></h2>

<p>Připravit <i>preconnect</i> jde i přímo v HTTP hlavičce. Tuto informaci dostane prohlížeč dříve než z HTML značky, což může být výhoda.</p>

<pre><code>Link: &lt;https://example.com>; rel=preconnect; crossorigin</code></pre>







<h2 id="js">JavaScript</h2>

<p>Při dynamickém připojování obsahu JavaScriptem stačí pro <i>preconnect</i> vytvořit HTML značku <code>&lt;link></code>:</p>

<pre><code>function preconnectTo(url) {
  var hint = document.createElement("link");
  hint.rel = "preconnect";
  hint.href = url;
  document.head.appendChild(hint);
}</code></pre>






<h2 id="odkazy">Odkazy jinam</h2>

<div class="external-content">
  <ul>
    <li>Ilya Grigorik: <a href="https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/">Eliminating Roundtrips with Preconnect</a></li>
</ul>
</div>
<div class="internal-content">
  <ul>
    <li><a href="/google-prefetch">Google zrychlil načítání na mobilech</a> – použití <code>&lt;link rel="prefetch"></code> pro přednačtení souborů</li>
  </ul>
</div>