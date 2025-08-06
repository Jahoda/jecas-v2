---
title: "JS document.head"
headline: "JS <code>document.head</code>"
description: "Přístup k hlavičce stránky v JavaScriptu je možný konstrukcí <code>document.head</code>."
date: "2014-12-11"
last_modification: "2014-12-12"
status: 1
tags: ["js", "napady"]
format: "html"
---

<p>Podobně jako se dá se k tělu stránky – značce <code>&lt;body></code> dostat pomocí <a href="/documentelement-body"><code>document.body</code></a>, existuje podobný způsob i pro hlavičku (<code>&lt;head></code>).</p>

<pre><code>var hlavicka = document.head;</code></pre>




<h2 id="vyuziti">Využití</h2>

<p>Použít <code>document.head</code> se nabízí typicky pro <b>zkrácení kódu</b> přidávajícího do hlavičky styly nebo skripty.</p>

<pre><code>var styl = document.createElement("link");
styl.rel = "stylesheet";
styl.href = url;
<b>document.head</b>.appendChild(styl);</code></pre>





<h2 id="podpora">Podpora</h2>

<p>Jelikož <code>document.head</code> funguje až od <b>IE 9</b>, nemusí se s ohledem na <b>IE 8</b> a starší tento <i>zkrácený zápis</i> vyplatit. Lepší je volit dobře podporovanou konstrukci:</p>

<pre><code>document.getElementsByTagName("head")[0]</code></pre>

<p><a href="https://kod.djpw.cz/jnib">Test <code>document.head</code></a></p>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>W3C: <a href="https://html.spec.whatwg.org/multipage/dom.html#dom-document-head">document.head</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/document.head">Document.head</a></li>
</ul>