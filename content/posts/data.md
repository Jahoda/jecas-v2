---
title: "HTML element DATA"
headline: "HTML element <code>&lt;data></code>"
description: "HTML značka <code>&lt;data></code> slouží k označení strojově čitelných dat na webu."
date: "2015-01-02"
last_modification: "2015-02-22"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>V určitých případech se může hodit umístit nějaká data, která <b>nejsou na stránce přímo vidět</b>, do HTML kódu stránky. Typicky s nimi potom bude manipulovat JavaScript.</p>




<h2 id="zapis">Zápis</h2>

<p>Značka <code>&lt;data></code> má volitelný atribut <code>value</code>.</p>

<pre><code>&lt;data value="hodnota">
  Obsah značky
&lt;/data></code></pre>




<p>Obsah mezi <code>&lt;data></code> a <code>&lt;/data></code> se standardně vypíše (a to i ve starých prohlížečích, které budou značku brát jako neznámou / <a href="/vlastni-html-znacky">vlastní značku</a>). Element <code>&lt;data></code> je řádkový (<code>display: inline</code>).</p>

<p>Použít <code>&lt;data></code> jde i v režimu bez obsahu, potom se na stránce nezobrazí nic.</p>

<pre><code>&lt;data id="data" value="hodnota">&lt;/data></code></pre>






<h2 id="vyuziti">Využití</h2>

<p>Dosáhnout podobného výsledku jde i jinými značkami a <a href="/vlastni-html-atributy">vlastními HTML atributy</a>. Značka <code>&lt;data></code> má ale pro takové případy speciální sémantický význam.</p>

<p>Pro některé případy dat existují vhodnější značky než obecný element <code>&lt;data></code>. Třeba pro zapsání času existuje značka <a href="/time"><code>&lt;time></code></a>.</p>



<h2 id="js">Přístup v JavaScriptu</h2>

<p>Značka <code>&lt;data></code> je podporovaná pouze ve <b>Firefoxu 22</b>+. Tam se dá získat hodnota přímo z vlastnosti <code>value</code> (podobně jako u <a href="/input"><code>&lt;input></code></a>).</p>

<pre><code>document.getElementById("data").value</code></pre>

<p>V ostatních prohlížečích je <code>&lt;data></code> element neznámý (<code>HTMLUnknownElement</code>), jediné řešení je tedy použít metodu <code>getAttribute</code>.</p>

<pre><code>document.getElementById("data").getAttribute("value")</code></pre>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/hukb">Živá ukázka</a> – test podpory značky <code>&lt;data></code></li>
  </ul>
</div>


<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data"><code>&lt;data></code></a></li>
</ul>