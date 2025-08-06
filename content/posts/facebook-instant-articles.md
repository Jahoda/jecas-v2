---
title: "Jak na Facebook Instant Articles"
headline: "Jak na Facebook Instant Articles"
description: "Instant Articles je technologie pro rychlé zobrazování obsahu na Facebooku. Jak začít?"
date: "2016-04-18"
last_modification: "2016-04-19"
status: 1
tags: ["facebook", "zrychlovani"]
format: "html"
---

<p>Vzhledem k tomu, že na špatném mobilním připojení mohou být běžné webové stránky pomalé, vznikají pokusy o nabídnutí obsahu co možná nejrychleji.</p>





<p><a href="/google">Google</a> přišel s technologií <a href="/amp-html">AMP HTML</a>.  Pokus o rychlé zobrazování obsahu od Facebooku se potom jmenuje <b>Instant Articles</b>:</p>

<div class="external-content">
  <ul>
    <li><a href="https://developers.facebook.com/docs/instant-articles">Instant Articles</a> – oficiální dokumentace</li>
  </ul>
</div>


<h2 id="zacit">Jak začít</h2>

<p>Nejprve je nutné <i>okamžité články</i> <a href="https://www.facebook.com/instant_articles/signup">povolit</a> pro danou Facebook stránku:</p>


<p><img src="/files/facebook-instant-articles/enable.png" alt="Povolení IA" class="border"></p>











<p>Tím se odkryje možnost v nastavení Facebook stránky:</p>


<p><img src="/files/facebook-instant-articles/settings.png" alt="Nastavení Instant Articles" class="border"></p>































<p>V nastavení je potom krok za krokem popsán postup, jak instantních článku docílit.</p>




<h2 id="pozadavky">Požadavky</h2>

<p>Je nutné prokázat vlastnictví stránky přidáním <code>&lt;meta></code> značky do jejího kódu.</p>


<p>Na rozdíl od AMP se obsah článků při použití Instant Articles ukládá na servery Facebooku. Načíst nové články jde asi nejsnadněji pomocí RSS. Jde použít i Facebook API.</p>





<h3 id="rss">RSS zdroj pro Instant Articles</h3>


<p>Oproti standardnímu RSS zdroji vyžadují Instant Articles navíc plný obsah článku ve značce <code>&lt;content:encoded></code>. Je k tomu nutné použít obal pomocí CDATA.</p>

<p>Jeden článek v RSS zdroji vhodný pro IA tak bude vypadat třeba následovně:</p>


<pre><code>&lt;item>
  &lt;title>Odkaz pro poslání SMS&lt;/title>
  &lt;link>http://jecas.cz/sms-odkaz&lt;/link>
  &lt;guid>http://jecas.cz/sms-odkaz&lt;/guid>
  &lt;description>Jak dát na stránku odkaz pro předvyplnění SMS.&lt;/description>
  <b>&lt;content:encoded></b>
    &lt;![CDATA[
      Obsah &lt;b>včetně&lt;/b> HTML značek.
    ]]>
  &lt;/content:encoded>
  &lt;pubDate>2016-04-05T07:29:07+0200&lt;/pubDate>
  &lt;author>Bohumil Jahoda&lt;/author>
&lt;/item></code></pre>















<p>Povinné jsou pouze prvky <code>&lt;title></code>, <code>&lt;link></code> a <code>&lt;/content:encoded></code>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://developers.facebook.com/docs/instant-articles/publishing/setup-rss-feed">Publishing Through Your RSS feed</a></li>
  </ul>
</div>


<p>Dále je kvůli značce <code>&lt;content></code> potřeba do elementu <code>&lt;rss></code> přidat odkaz na jmenný prostor:</p>


<pre><code>&lt;rss version="2.0"
xmlns:content="http://purl.org/rss/1.0/modules/content/"></code></pre>



<p>Úpravy pro použití na Facebooku mohou způsobit, že RSS zdroj bude nevalidní.</p>

<div class="external-content">
  <ul>
    <li><a href="https://validator.w3.org/feed/">Feed Validation Service</a> – validátor RSS zdrojů</li>
  </ul>
</div>

<p>Například nebude vyhovovat formát značky <code>&lt;author></code>. Značka <code>&lt;pubDate></code> potom vyžaduje datum ve formátu <i>ISO-8601</i> místo <i>RFC-822</i>.</p>

<p>Při použití <a href="/nette">Nette</a> a šablonovacího systému Latte jde požadované datum vypsat následovně:</p>

<pre><code>&lt;pubDate>
  {$datumClanku|date:'Y-m-d\\TH:i:sO'}
&lt;/pubDate></code></pre>





<p>Zdá se tedy výhodnější vytvořit speciální variantu RSS jen pro Facebook.</p>

<p>Do RSS se také dostane plný obsah příspěvku. Pokud to vadí, jde přidat i HTTP ověření, aby plný obsah z RSS nemohl stahovat někdo nepovolaný.</p>


<p>Po přidání RSS zdroje s články by se jejich obsah měl za chvíli načíst.</p>


<p>Je možné mít ještě jeden <i lang="en">Development</i> zdroj určený pro testování funkčnosti.</p>




<h3 id="logo">Logo</h3>

<p>Logo je jedinou věcí, kterou je třeba upravit ve stylech Instant Articles. Musí se nahrát <a href="/format-obrazku#png">PNG obrázek</a> o rozměrech 690 × 132 pixelů a víc.</p>

<p>Jinak jde vzhled článku omezeně upravovat v editoru na Facebooku (zejména barva písma).</p>




<h2 id="kontrola">Kontrola článků</h2>


<p>Prohlédnout si naimportované články potom jde na stránce <i>Publishing Tools → Instant Articles</i>:</p>


<p><img src="/files/facebook-instant-articles/publishing-tools.png" alt="Nastavení Instant Articles" class="border"></p>



























<p>V případě problémů s články se zobrazuje žlutý vykřičník. Při zvolení editace jsou chyby znázorněny a popsány.</p>



<h3 id="clanek">Pravidla pro obsah článku</h3>

<p>Je možné, že obsah produkovaný pro běžnou HTML stránku nebude pro Instant Articles vyhovovat. Následuje popis některých problémů, které je třeba řešit.</p>

<ol>
  <li>
    <p>Všechny <b><a href="/odkaz">odkazy</a> musí být absolutní</b>. Tedy:</p>
    
    
    
    <pre><code>&lt;a href="/jiny-clanek"></code></pre>
    
    <p>Nahradit na:</p>
    
    
    <pre><code>&lt;a href="<b>http://example.com</b>/jiny-clanek"></code></pre>
    
    <p>Totéž platí pro HTML #kotvy.</p>
  </li>
  
  
  
  
  
  
  
  
  <li>
    <p><a href="/nadpisy"><b>Nadpisy</b></a> mohou být pouze o úrovních <code>&lt;h1></code> a <code>&lt;h2></code>.</p>
    
    <p>U běžných stránek bývá obvyklé, že <code>&lt;h1></code> je název článku a nižší nadpisy značí podnadpisy. V Instant Articles je hlavní nadpis v části <code>&lt;header></code>, takže se nabízí všechny úrovně o jednu posunout.</p>
  </li>  
  <li>
    <p>V kódu by neměly být prázdné elementy. To platí i pro obrázky obalené do odstavce:</p>
    <pre><code>&lt;p>&lt;img src="obrazek.png">&lt;/p></code></pre>
    
    <p><img src="/files/facebook-instant-articles/prazdne.png" alt="Prázdný element" class="border"></p>





  </li>
  
    
  <li>
    <p>Cílové obrázky vložené značkou <code>&lt;img></code> musí existovat (nesmí vracet chybu 404 apod.).</p>
    
    <p><img src="/files/facebook-instant-articles/404.png" alt="Neexistující obrázek" class="border"></p>



    <p>Obrázky musí být obaleny značkou <a href="/popis-obrazku#figure"><code>&lt;figure></code></a>. Nemohou volně ležet v obsahu. Ideálně by měly mít i popisek v <code>&lt;figcaption></code>.</p>
  </li>
  
  <li>
    <p>HTML <a href="/seznamy">seznamy</a> mohou obsahovat pouze nadpisy a odstavce. Každá položka seznamu je omezena na maximálně jeden element.</p>
    
    <p><img src="/files/facebook-instant-articles/list-item.png" alt="Požadavky na seznamy" class="border"></p>


    
    <p>Není tedy možné do jednoho <code>&lt;li></code> vložit dva odstavce, není možné zanořit více seznamů do sebe a není možné v seznamech používat obrázky.</p>

  </li>
  
  <li>
    <p>Není možné používat značku <a href="/svg"><code>&lt;svg></code></a>.</p>
    
    <p><img src="/files/facebook-instant-articles/svg.png" alt="SVG v Facebook IA" class="border"></p>

  </li>
</ol>

<p>U stránek s pokročilejším formátováním tak příprava pro Instant Articles dá nějakou práci.</p>



<h3 id="schvaleni">Schválení</h3>

<p>Aby mohl být obsah dostupný přes IA, musí se nejprve nahrát alespoň 10 článků, které musí být ručně schváleny. Má to trvat jednotky dní.</p>






<h2 id="zaver">Závěr</h2>


<p>Okamžité články jde zatím z pohledu <b>konsumenta obsahu</b> používat jen v posledních versích Facebook aplikace pro iOS a Android.</p>


<p>U AMP platí, že nejrychlejší stránku je možné udělat bez AMP. V případě Instant Articles je situace trochu jiná, protože obsah článků je <b>uložen na serveru Facebooku</b>, čímž se minimálně ušetří doba potřebná k navázání spojení s novou doménou.</p>


<p>Navázání okamžitých článků na nativní FB aplikaci přináší značnou výhodu díky tomu, že při kliknutí na odkaz není nutné přeskakovat do prohlížeče a potom se složitě přepínat zpátky.</p>