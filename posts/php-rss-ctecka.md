---
title: "RSS čtečka v PHP"
headline: "RSS čtečka v PHP"
description: "Jak si v PHP naprogramovat RSS čtečku."
date: "2013-08-16"
last_modification: "2013-08-16"
status: 0
tags: []
format: "html"
---

<p>Pro sledování svých oblíbených webů používám RSS. V době, kdy autoři stránek publikují nové články na <a href="/facebook">Facebooku</a> a <a href="/twitter">Twitteru</a>, to může působit staromódně, ale RSS má pořád některé výhody:</p>

<ul>
  <li>Zprávy z RSS neobsahují tolik „šumu“ jako osobní profily autorů webů, ale jsou v nich pouze články.</li>  
  <li>Člověk má jistotu, že se k němu nový obsah dostane.</li>
</ul>

<h2 id="hotova">Hotová RSS čtečka</h2>

<p>Existuje řada online RSS čteček nebo je možné si <b>stáhnout a nainstalovat RSS čtečku v PHP</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://tt-rss.org/gitlab/fox/tt-rss/wikis/home">Tiny Tiny RSS</a> – celkem známý PHP skript pro RSS</li>
    <li><a href="https://feedly.com/i/welcome">Feedly</a> – populární online RSS</li>
  </ul>
</div>

<p>Osobně mi ale žádné z řešení nevyhovuje, tak jsem se rozhodl napsat vlastní.</p>


<p>Tento článek píšu během jeho vývoje, takže je možné, že se nepovede.</p>


<p>Při programování něčeho, co jsem dříve nedělal se snažím <b>začínat od nejpodstatnějších částí aplikace</b>. V případě RSS to bude:</p>

<ol>
  <li>Získání seznamu zdrojů.</li>
  <li>Načtení a <b>parsování RSS zdroje</b>.</li>
</ol>

<p>Když se tohle nepovede, nemá smysl pokračovat, protože bez toho zkrátka RSS fungovat nemůže.</p>



<h2 id="seznam">Seznam zdrojů</h2>

<p>Primárně používám RSS čtečku ze <a href="/opera">staré <b>Opery 12</b></a>. Ta umožňuje export seznamu zdrojů do universálního formátu <b>OPML</b> (<i lang="en">Outline Processor Markup Language</i>).</p>

<p><b>Vyexportovat</b> seznam zdrojů jde v <i>Menu → Nastavení → Import a Export → Exportovat seznam zdrojů novinek</i>:</p>

<p><img src="/files/php-rss-ctecka/export-opml-opera.png" alt="Export OPML v Opeře" class="border"></p>























<p>Získat OPML seznam je možné ve většině RSS čteček.</p>



<h3 id="opml">OPML export</h3>

<p>Soubor <code>*.opml</code> je jednoduché XML.</p>

<p>Zajímavé jsou z něj položky <code>&lt;outline></code> v <code>&lt;body></code>, které obsahují názvy a adresy zdrojů.</p>

<pre><code>&lt;?xml version="1.0" encoding="utf-8"?>
&lt;opml version="1.0">
  &lt;head>
    &lt;title>Newsfeeds exported from Opera Mail/12.17 (Win32)&lt;/title>
  &lt;/head>
  &lt;body>
    &lt;<b>outline</b>
      text="Je čas.cz" 
      title="Je čas.cz" 
      type="rss" 
      xmlUrl="http://jecas.cz/rss" 
    />
  &lt;/body>
&lt;/opml>
</code></pre>














<p>Projít celý seznam jde velmi snadno pomocí PHP funkce <code>simplexml_load_file</code>. V cyklu <code>foreach</code> se vyberou všechny položky <code>&lt;outline></code> a vypíše jejich URL zdroje a název:</p>

<pre><code>&lt;?php
$import = <b>simplexml_load_file</b>("opera-newsfeeds.opml");
foreach($import->body->outline as $feed): ?>
  &lt;div class="feed-list--item">
    &lt;h1>
      &lt;a href="&lt;?=<i>$feed['xmlUrl']</i>?>">
        &lt;?=<i>$feed['title']</i>?>
      &lt;/a>
    &lt;/h1>
  &lt;/div>
&lt;?php endforeach ?></code></pre>












<h2 id="nacteni">Načtení RSS zdroje</h2>

<p>Když není problém získat adresy zdrojů, může se začít s jejich načítáním.</p>

<p>Soubor se zprávami daného webu je opět jednoduchý <b>XML soubor</b>.</p>

<p>Validní podoba RSS, kterou jsem někde kdysi zkopíroval pro jecas.cz, vypadá následovně:</p>

<pre><code>&lt;?xml version="1.0" encoding="utf-8"?> 
&lt;rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  &lt;channel>
    &lt;title>Je čas.cz&lt;/title>
    &lt;link>http://jecas.cz&lt;/link>
    &lt;atom:link href="http://jecas.cz/rss" rel="self" type="application/rss+xml" />
    &lt;description>Poznámky k webdesignu.&lt;/description>
    &lt;language>cs&lt;/language>
    <b>&lt;item></b>
      <i>&lt;title>Vyšší tlačítko ve Firefoxu&lt;/title></i>
      <i>&lt;link>http://jecas.cz/firefox-vyssi-tlacitko&lt;/link></i>
      &lt;guid>http://jecas.cz/firefox-vyssi-tlacitko&lt;/guid>
      <i>&lt;description>Prohlížeč Firefox má zajímavou vlastnost u formulářových tlačítek. Dělá je vyšší než ostatní prohlížeče.&lt;/description></i>
    &lt;/item>
  &lt;/channel>
&lt;/rss></code></pre>



















<p>Z RSS zdroje je tedy možné zjistit nějaké <b>informace o kanálu</b> (název, stránka, popis), ale zajímavější budou zatím položky <code>&lt;item></code>, které obsahují jednotlivé články.</p>

<p>Projdou se stejně jako OPML zdroj funkcí <code>simplexml_load_file</code>.</p>

<pre><code>&lt;?php
$feed = simplexml_load_file("http://jecas.cz/rss");
foreach ($feed->channel->item as $item): ?>
  &lt;h2>
    &lt;a href="&lt;?=$item->link?>">
      &lt;?=$item->title?>
    &lt;/a>
  &lt;/h2>
  &lt;div>
    &lt;?=$item->text?>
  &lt;/div>
&lt;?php endforeach ?></code></pre>














<p>Řada zdrojů obsahuje ještě datum vydání – <code>$item->pubDate</code> – není ale povinný.</p>




<h2 id="asynchronni">Asynchronní načítání zpráv</h2>

<p>Protože získávání zpráv ze zdroje může nějakou dobu trvat, bude lepší zprávy jednotlivých zdrojů načítat <b>asynchronně JavaScriptem</b> – tedy pomocí <a href="/ajax">AJAXu</a>.</p>



<p>Skript pro parsování RSS tak bude samostatný soubor přebírající adresu zdroje z <code>$_GET["url"]</code>.</p>


<p>K seznamu zdrojů se potom připojí jednoduchá JS obsluha, která po kliknutí pošle ajaxový požadavek na skript pro přečtení <code>*.xml</code> souboru se zprávami.</p>

<pre><code>var feeds = document.querySelectorAll(".feed-list a");
var feedsLength = feeds.length;
for (var i = 0; i &lt; feedsLength; i++) {
  feeds[i].onclick = (function(el) {
    return function() {
      ajax(
        "fetchFeed.php?url=" + encodeURIComponent(el.href),
        function(data) {
          // vypsání dat
        }
      );
      return false;				
    }
  })(feeds[i]);
};</code></pre>
















<h2 id="osetrovani-chyb">Ošetřování výjimek a chyb</h2>

<p>Výše uvedené kódy neřeší krajní situace, kdy něco nebude fungovat. Server se zdrojem nebude odpovídat, RSS nebude validní a podobně.</p>

<p>Další potenciální problém je <b>neošetřování dat</b> z RSS zdroje. Některé weby v RSS používají HTML kód, což zavání <a href="/bezpecnost#xss">XSS dírou</a>.</p>

<p>Vypisovaný <i>text</i> by měl projít funkcí <code>htmlspecialchars</code>:</p>

<pre><code>$text = htmlspecialchars($text, ENT_QUOTES);</code></pre>







<h2 id="demo">Demo</h2>

<div class="internal-content">
  <ul>
    <li><a href="/files/php-rss-ctecka/rss-demo1/">Ukázka dosavadní podoby RSS čtečky</a></li>
  </ul>
</div>