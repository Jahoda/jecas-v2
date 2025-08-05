---
title: "Parsování HTML v PHP"
headline: "Parsování HTML v PHP"
description: "Jak v PHP parsovat HTML stránku a získat z ní potřebná data."
date: "2013-11-04"
last_modification: "2016-01-20"
status: 1
tags: ["hotova-reseni", "php", "ziskavani-obsahu"]
format: "html"
---

<p>V případě, že je potřeba získat z nějaké stránky data pro vlastní použití, bývá v ideálním případě k disposici obsah ve strojově čitelné podobě:</p>

<ol>
  <li><p>Ve formátu <a href="/json">JSON</a>.</p></li>
  <li>
    <p>Pro přímé vložení obsahu se používá <a href="/oembed">oEmbed</a>.</p>
  </li>
  <li>
    <p>Existují i méně používané formáty jako <a href="http://cs.wikipedia.org/wiki/CSV">CSV</a> (jednotlivé položky jsou odděleny čárkami), <a href="http://cs.wikipedia.org/wiki/SOAP">SOAP</a> (založený na XML) a podobně.</p>
  </li>
</ol>

<p>Není-li strojově čitelný formát k disposici, je nutné <b>parsovat HTML</b>.</p>



<h2 id="rexexp">Regulární výrazy</h2>

<p>První možnost je požadovaná data vyzobat regulárními výrazy.</p>

<p>V PHP se k tomu používají funkce <a href="http://php.net/manual/en/function.preg-match.php"><code>preg_match</code></a> nebo <a href="http://php.net/manual/en/function.preg-match-all.php"><code>preg_match_all</code></a>.</p>

<p>Regulární výrazy je potřeba šít přesně na míru konkrétnímu zdrojovému kódu stahovaného webu. Vzhledem k tomu, že svou roli zde hraje každý znak, změna HTML kódu cílové stránky snadno způsobí nefunkčnost.</p>



<h3 id="obsah-znacky">Získání obsahu značky</h3>

<p>Pro ilustraci poslouží následující příklad pro získání titulku stránky:</p>

<pre><code>$page = file_get_contents("http://example.com");
preg_match("/&lt;title>(.*)&lt;\/title>/i", $page, $matches);
echo $matches[1];</code></pre>





<p>Nejprve se funkcí <code>file_get_contents</code> <a href="/stazeni-stranky">stáhne obsah externí stránky</a>, načež se funkcí <code>preg_match</code> vybere obsah značky <a href="/html-kostra#title"><code>&lt;title></code></a>.</p>


<p>Řada lidí se regulárních výrazů bojí. Naštěstí existují další způsoby:</p>


<h2 id="dom">PHP DOM</h2>

<p>V PHP existují funkce pro práci přímo s <a href="/dom">HTML DOMem</a>. V takovém případě se ze získaného HTML řetězce nejprve sestaví DOM (<i lang="en">Document Object Model</i>) a nad ním jde potom používat metody typu <a href="/getelement"><code>getElement*</code></a> známé z JavaScriptu.</p>

<p>Jedná se o třídu <a href="http://php.net/manual/en/class.domdocument.php">DOMDocument</a>.</p>

<p>Při použití této třídy je postup získávání obsahu trochu méně závislý na změnách zdrojového kódu. Už nejde o každý znak v HTML, ale o podobu výsledného DOMu.</p>

<p>Oproti JavaScriptu asi nejvíce chybí <a href="/queryselector"><code>querySelector</code></a> umožňující vybírat HTML značky pomocí <a href="/css-selektory">CSS selektorů</a>.</p>

<p>Získat obsah značky <code>&lt;title></code> pomocí PHP metod DOMu jde následovně:</p>

<pre><code>$dokument = new DOMDocument();
@$dokument->loadHTMLFile('http://example.com');
$title = $dokument->getElementsByTagName('title');
echo $title->item(0)->nodeValue; // hodnota první položky</code></pre>









<p>Externí stránku lze načíst přímo přes <code>loadHTMLFile</code>.</p>



<h3 id="vypsani-odkazu">Vypsání všech odkazů</h3>

<p>Jednotlivé vybrané značky mají další metody, třeba <code>getAttribute</code>, která umožňuje získat hodnotu HTML atributu.</p>

<p>Procházet kolekci elementů jde cyklem <code>foreach</code>.</p>

<p>Následující příklad vypíše všechny odkazy na této stránce:</p>

<pre><code>$dokument = new DOMDocument();
@$dokument->loadHTMLFile('http://jecas.cz/php-parsovani-html');
$odkazy = $dokument->getElementsByTagName('a');
foreach ($odkazy as $odkaz) {
  echo "&lt;li>" . $odkaz->getAttribute("href");
}</code></pre>









<h3 id="vypsani-html">Vypsání HTML obsahu značky</h3>

<p>Položky DOMu v PHP nemají vlastnost <code>innerHTML</code> jako v JavaScriptu. Pro získání HTML kódu tak slouží metoda <code>saveHTML</code> volaná nad <code>DOMDocument</code>em – předává se jí požadovaný element:</p>

<pre><code>$dokument->saveHTML($odkaz);</code></pre>





<h2 id="xpath">XPath</h2>

<p>Nejsilnější možnosti pro vybírání obsahu nabízí <a href="http://php.net/manual/en/class.domxpath.php">XPath</a> (v něčem je i mocnější než CSS selektory).</p>

<p>XPath se naroubuje na <code>DOMDocument</code>:</p>

<pre><code>$dokument = new DOMDocument();
@$dokument->loadHTMLFile('http://example.com');
$xpath = new DOMXPath($dokument);</code></pre>





<p>Následně jde titulek stránky vybrat pomocí prostého:</p>

<pre><code>echo $xpath->query('//title')->item(0)->nodeValue;</code></pre>


<h3 id="css">XPath vs. CSS</h3>

<p>Pro rychlé pochopení, jak v XPath funguje výběr elementů, je ideální srovnání se selektory v CSS:</p>

<table>
  <tr>
    <th>CSS</th>    <th>XPath</th>
  </tr>
  <tr>
    <td><code>*</code></td>    <td><code>//*</code></td>
  </tr>
  <tr>
    <td><code>div</code></td>    <td><code>//div</code></td>
  </tr>  
  <tr>
    <td><code>div h1</code></td>    <td><code>//div//h1</code></td>
  </tr>  
  <tr>
    <td><code>div > h1</code></td>    <td><code>//div<b>/</b>h1</code></td>
  </tr>  
  <tr>
    <td><code>div#id</code></td>    <td><code>//div[@id='id']</code></td>
  </tr>  
  <tr>
    <td><code>div.trida</code></td>    <td><code>//div[@class='trida']</code></td>
  </tr>    
  <tr>
    <td><code>div[title]</code></td>    <td><code>//div[@title]</code></td>
  </tr>  
  <tr>
    <td><code>p:first-child</code></td>    <td><code>//p[1]</code></td>
  </tr>   
  <tr>
    <td><code>h1 + p</code></td>    <td><code>//h1/following-sibling::p[1]</code></td>
  </tr>     
</table>

<p>Jak je vidět, libovolný potomek se značí <code>//</code>, přímý potomek potom jen jedním <code>/</code>, atributy se uvádějí do hranatých závorek se zavináčem.</p>

<h3 id="trida">Výběr podle třídy</h3>

<p>Vybírání elementu podle třídy je při použití XPath odlišné oproti pravidlům CSS. V případě více přiřazených tříd se element nevybere – XPath vyžaduje přesnou shodu hodnoty atributu.</p>

<p>Chování blíže podobné CSS jde zajistit tímto zdlouhavým zápisem (<a href="http://stackoverflow.com/questions/8808921/selecting-a-css-class-with-xpath/9133579#9133579">vysvětlení</a>):</p>

<pre><code>//*[contains(concat(" ", normalize-space(@class), " "), " trida ")]</code></pre>

<p>Při použití stručnějšího zápisu:</p>

<pre><code><code>//*[contains(@class, 'trida')]</code></code></pre>

<p>By se chybně zachytil i element s třídou <code>jina-trida</code>.</p>

<p>Další možnosti XPathu jsou popsány v následujícím přehledu:</p>

<div class="external-content">
  <ul>
    <li><a href="http://ricostacruz.com/cheatsheets/xpath.html">Xpath cheatsheet</a></li>
  </ul>
</div>

<h2 id="css-selektory">CSS selektory v PHP</h2>

<p>Možnost používat v PHP přímo CSS selektory nabízí několik hotových knihoven. Je ale možné, že budou pomalejší než XPath.</p>

<div class="external-content">
  <ul>
    <li><a href="http://simplehtmldom.sourceforge.net/">PHP Simple HTML DOM Parser</a></li>
    <li>Symfony: <a href="https://github.com/symfony/css-selector">CssSelector Component</a></li>
</ul>
</div>

<!--
<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  
  <li>David Walsh: <a href="http://davidwalsh.name/domdocument">Using DOMDocument to Modify HTML with PHP</a></li>
</ul>-->