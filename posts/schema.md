---
title: "Strukturovaná data"
headline: "Strukturovaná data"
description: "Strukturovaná data slouží pro zlepšení čitelnosti HTML kódu pro roboty."
date: "2014-12-03"
last_modification: "2014-12-03"
status: 0
tags: []
format: "html"
---

<p>Ačkoliv se roboti (zejména) vyhledávačů snaží stále zlepšovat své porozumnění obsahu HTML stránky, lze tomu trochu pomoci vhodným použitím HTML značek a právě <b>strukturovaných dat</b>. Kromě termínu <i>strukturovaná data</i> se je možné setkat i s označením <i>mikrodata</i>, dříve potom i s <i>mikroformáty</i> či zkratkou <i>RDFa</i>.</p>

<p>Dobře podporovaná varianta strukturovaných dat s hodně možnostmi je <b>schema.org</b>, na kterém se spolupodílí Microsoft, Google, Yahoo a ruský dominantní vyhledávač Yandex.</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.schema.org/docs/schemas.html">Schema.org</a></li>
  </ul>
</div>


<h2 id="priklad">Příklad</h2>

<p>Pro vyznačení dat na stránce se používají 3 atributy:</p>

<ul>
  <li><code>item<b>scope</b></code> pro vyznačení <i>rámce</i> určitého typu dat,</li>
  
  <li><code>item<b>type</b></code> pro určení typu dat v daném <i>scope</i>,</li>
  
  <li><code>item<b>prop</b></code> pro označení konkrétních položek</li>
</ul>


<h3 id="blog">Příklad příspěvku na blogu</h3>

<p>Budeme-li tedy chytít vyznačit obsah <b>příspěvku na blogu</b>, může to vypadat následovně:</p>

<pre><code>&lt;div class="clanek" 
  itemscope 
  itemtype="<a href="http://schema.org/BlogPosting">http://schema.org/BlogPosting</a>"
>
  &lt;h1 itemprop="name headline">Nadpis článku&lt;/h1>
  &lt;time datetime="2014-12-09" itemprop="datePublished">
    9. prosince 2014
  &lt;/time>
  &lt;div itemprop="articleBody">
  &lt;p>Obsah článku&lt;/p>
  &lt;/div>
&lt;/div></code></pre>














<h2 id="vyhody">Výhody ve vyhledávačích</h2>

<p>Podle slov na <i>schema.org</i> berou na <b>strukturovaná data</b> vyhledávače <b>Bing</b>, <b>Google</b>, <b>Yahoo!</b> a <b>Yandex</b> ohledy.</p>

<p>Jelikož tyto <code>item*</code> atributy jsou <b>skryté v HTML kódu</b> a běžný návštěvník je neuvidí, <b>ideální vyhledávač</b> by takovou stránku <b>neměl zvýhodňovat</b> oproti té, co tyto atributy nepoužívá.</p>


<p>V reálném světě ale mají vyhledávače k ideálu dost daleko, takže stránku používající strukturovaných dat mohou <b>zpracovat jinak</b>.</p>

<p><b>John Mueller</b> z <a href="/google">Google</a> připustil, že by do budoucna strukturovaná data mohla být jedním z hodnitících faktorů:</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.seroundtable.com/google-structured-markup-ranking-purposes-20885.html">Google: Structured Markup May Become A Ranking Factor</a></li>
  </ul>
</div>



<p>Stačí se podívat na stránku pomocí nástroje pro testování strukturovaných dat, kde je většinou vidět, že jednotlivé prvky stránky nejsou <b>určeny nejlépe</b>.</p>

<div class="external-content">
  <ul>
    <li>Google Developers: <a href="https://developers.google.com/webmasters/structured-data/testing-tool/">Testing Tool</a></li>
    
    <li>Google Webmaster Tools: <a href="http://www.google.com/webmasters/tools/richsnippets">Nástroj na testování strukturovaných dat</a></li>
  </ul>
</div>



<h2 id="vzhled">Odlišený vzhled ve vyhledávání</h2>
<p>Hlavní lákadlo plynoucí z použití <i>schema.org</i> je ale nejspíš <b>odlišný vzhled</b> výsledků vyhledávání, kdy stránka používající mikrodata</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://www.blindfiveyearold.com/sitelinks-search-box">Sitelinks Search Box</a></li>
  <li><a href="http://www.tyinternety.cz/prirucka-marketera/jak-ziskat-vice-navstevniku-z-vyhledavacu-skrze-strukturovana-data/">Jak získat více návštěvníků z vyhledávačů skrze strukturovaná data</a></li>
  
  <li>Search Console Help: <a href="https://support.google.com/webmasters/answer/3069489?hl=en">About Structured Data Markup Helper</a></li>
  <li>GWT: <a href="https://support.google.com/webmasters/answer/176035">About microdata</a></li>
  
  <li>GWT: <a href="https://support.google.com/webmasters/answer/99170">About rich snippets and structured data</a></li>
  
  <li>GWT: <a href="https://support.google.com/webmasters/topic/4599102">Structured data types</a></li>
  
  <li>Wikipedie: <a href="http://en.wikipedia.org/wiki/Schema.org">Schema.org</a></li>
  
  <li><a href="http://microformats.org/">Mikroformáty</a></li>
  
  <li>Google: <a href="https://www.google.com/webmasters/markup-helper/">Pomocník pro práci se značkami strukturovaných dat</a></li>
  
  <li><a href="http://microdatagenerator.org/">Microdata Generator</a> – generátor strukturovaných dat pro lokální firmy</li>
  
  <li>Six Revisions: <a href="http://sixrevisions.com/html/semantic-html-web-content/">Semantic HTML for Web Content</a></li>  
</ul>