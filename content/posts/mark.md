---
title: "HTML značka mark"
headline: "HTML značka <code>&lt;mark></code>"
description: "HTML značka <code>&lt;mark></code> slouží ke zvýraznění textu na stránce."
date: "2014-10-10"
last_modification: "2014-10-10"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<pre><code>&lt;p>
  Značka MARK slouží ke &lt;mark><mark>zvýraznění</mark>&lt;/mark> textu na stránce.
&lt;/p></code></pre>

<p>Její význam je čistě <b>sémantický</b>, nemá žádné zvláštní schopnosti (fungují u ní tedy jen <b>obecné atributy</b> – tj. <code>title</code>, <code>class</code>, <code>id</code> a podobně). V podporovaných prohlížečích má ve výchozím stylu <span style="background: yellow">žluté pozadí</span>.</p>


<h2 id="podpora">Podpora</h2>

<p>Element <code>&lt;mark></code> funguje od <b>IE 9</b>, ale vzhledem k tomu, že nemá specifické chování, není výrazný problém ho používat i v <b>IE 8</b> a starších, kde se bude tvářit jako <a href="/vlastni-html-znacky#html5">ostatní neznámé značky</a>.</p>



<h2 id="vyuziti">Využití</h2>

<p>Tag <code>&lt;mark></code> by neměl být využíván ke zvýraznění <b>důležité části textu</b> a tedy nahrazovat <code>&lt;strong></code> nebo <code>&lt;em></code>, ale slouží ke zvýraznění <i>z nějakého jiného účelu</i>.</p>


<h3 id="hledani">Výsledky hledání</h3>

<p>Asi nejčastější využití se nabízí pro zvýraznění textu, který uživatel na stránce <b>hledá</b>.</p>

<ul>
  <li>Zvýraznit nějaké slovo v HTML kódu pomocí PHP jde <a href="http://php.vrana.cz/zvyrazneni-vysledku-vyhledavani.php">následovně</a>.</li>
  <li>V JavaScriptu existuje nástroj <a href="https://github.com/padolsey/findAndReplaceDOMText">findAndReplaceDOMText</a> (<a href="https://kod.djpw.cz/qhgb">ukázka</a>).</li>
  <li><small>Vtipné, i když ne moc použitelné, je zvýraznění pomocí zapnutí <code>designMode</code> (<a href="https://kod.djpw.cz/phgb">ukázka</a>).</small></li>
</ul>

<h3 id="citace">Zvýraznění v citacích</h3>

<p>Významově se <code>&lt;mark></code> dobře hodí k <b>vlastnímu zvýraznění</b> určité pasáže v <b>citaci</b> někoho jiného.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://html.spec.whatwg.org/multipage/semantics.html#the-mark-element">The mark element</a></li>
  
  <li>DevDocs: <a href="http://devdocs.io/html/element/mark">&lt;mark></a></li>
</ul>


<!-- obrázek: https://kod.djpw.cz/rhgb -->