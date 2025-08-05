---
title: "DOM"
headline: "DOM (Document Object Model)"
description: "Co je to v prostředí HTML stránky DOM (Document Object Model) a jak se liší od zdrojového kódu."
date: "2013-12-29"
last_modification: "2014-02-13"
status: 1
tags: ["html"]
format: "html"
---

<p>Stručně řečeno je <b>DOM</b> nějaká <b>stromová struktura</b>, kterou si prohlížeč vytvoří po zpracování stránky. Podívat se na něj je možné pomocí <a href="/vyvojarske-nastroje">vývojářských nástrojů</a> (bývá zpravidla na první kartě).</p>

<p><img src="/files/jak-funguje-html/html-vysledek.png" alt="Zobrazení výsledného DOMu ve vývojářských nástrojích" class="border"></p>

<h2 id="zdrojovy-kod">DOM není zdrojový kód</h2>
<p>Ač to tak možná na první pohled vypadá, <i>Document Object Model</i> není to samé co zdrojový kód stránky.</p>

<p><b>Liší se</b> v základu ve dvou věcech.</p>

<ol>
  <li>Některé <a href="/html-znacky">druhy značek</a> nemusí v <b>zdrojovém HTML kódu</b> být zapsány, ale v DOMu se vytvoří (třeba značky <code>&lt;html></code>, <code>&lt;head></code>, <code>&lt;body></code> nebo <code>&lt;tbody></code> u tabulek).</li>
  
  <li>JavaScript může podobu DOMu, která vzešla z HTML zdroje, dále <b>upravovat</b>.</li>
</ol>

<p>Kromě vývojářských nástrojů se přibližná podoba po zpracování <b>HTML i JS kódů</b> získá vypsáním <a href="/innerhtml"><code>innerHTML</code></a>.</p>

<div class="live">
  <div>
    <script>document.write("<p>Odstavec vypsaný skriptem</p>");</script>
    <p>Odstavec v HTML
  </div>  
  <button onclick="alert(this.parentNode.getElementsByTagName('div')[0].innerHTML)">Výsledný zdrojový kód</button>
</div>


<h2 id="zdroj-vs-dom">Zdrojový kód vs. DOM</h2>

<p>Například tento zdrojový kód. Obsahuje otevírací HTML značku pro odstavec (<code>&lt;p></code>) a trochu JS, který přidá do stránky nadpis (<code>&lt;h1></code>). (<a href="http://kod.djpw.cz/utbb">Ukázka</a>.)</p>

<pre><code>&lt;p>Odstavec
&lt;script>
  var nadpis = document.createElement("h1");
  nadpis.innerHTML = "Nadpis stránky";
  document.body.appendChild(nadpis);
&lt;/script></code></pre>

<p>Vytvoří následující podobu DOMu.</p>

<p><img src="/files/dom/vysledny-dom.png" alt="Výsledná podoba DOMu" class="border"></p>

<h2 id="upravy">Úpravy DOMu</h2>
<p>Co je myšleno takovou úpravou DOMu pomocí JavaScriptu?</p>

<ul>
  <li>Změna, přidávání nebo odebírání <b>atributů</b> (<code>element.className = 'novaTrida'</code>, <code>setAttribute</code>, <code>removeAttribute</code>).</li>
  <li>Přidávání nebo odebírání <b>elementů</b> (metody <code>appendChild</code>, <code>removeChild</code> a podobně).</li>
  <li>Změna <b>obsahu</b> elementů (<code>innerHTML</code>, <code>innerText</code>/<code>textContent</code>).</li>
</ul>

<h2 id="vyber-elementu">Výběr elementů</h2>

<p>Pro výběr potřebného elementu z HTML DOMu existuje v JavaScriptu několik možností.</p>

<ul>
  <li><p>Od <b>IE 8</b> se dá používat <a href="/queryselector"><code>querySelector</code></a> a běžné <a href="/css-selektory">CSS selektory</a>.</p></li>
  <li><p>Oblíbené jsou metody <code>getElement*</code>:</p>
    <ul>
      <li><code>document.getElementById("idecko")</code> — vybere jeden element s ID <code>idecko</code></li>
      <li><code>document.getElement<b>s</b>ByTagName("div")</code> — vybere <b>kolekci</b> značek <code>&lt;div></code></li>
      <li><code>document.getElement<b>s</b>ByClassName("trida")</code> — vybere <b>kolekci</b> elementů s třídou <code>trida</code> (funguje až od <b>IE 9</b>)</li>
    </ul>
    <p>Kolekce získané metodami <code>getElement<b>s</b></code> se potom většinou <a href="/js-cykly">procházejí cykly</a>.</p>
  </li>
  <li><p>Obrázky na stránce je možné získat z <code>document.images</code> (<a href="http://kod.djpw.cz/vtbb">ukázka</a>).</p></li>
  <li><p>K formulářům se dostaneme přes <code>document.jmenoFormulare</code> a k jejich políčkům přes <code>document.jmenoFormulare.jmenoPolicka</code> (<a href="http://kod.djpw.cz/wtbb">ukázka</a>).</p></li>
</ul>

<p>Ještě existují další možnosti, ale ty se zase tak moc nepoužívají a koneckonců jdou nahradit <code>querySelectorem</code> / <code>getElement*</code> metodami.</p>

<h2 id="php">DOM v PHP</h2>

<p>Podobné metody jako v JS jde používat i v PHP pro získávání dat z HTML (třeba tak vytahovat data z <a href="/stazeni-stranky">cizích stránek</a> získaných funkcí <code>file_get_contents</code>).</p>

<p><a href="http://cz2.php.net/book.dom" class="button">PHP DOM</a></p>

<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li><a href="http://coding.smashingmagazine.com/2014/01/13/better-javascript-library-for-the-dom/">Writing A Better JavaScript Library For The DOM</a> — knihovna, která vylepšuje klasický DOM</li>
</ul>