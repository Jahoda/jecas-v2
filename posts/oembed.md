---
title: "Získání obsahu stránky přes oEmbed"
headline: "Získání obsahu stránky přes oEmbed"
description: "Formát oEmbed slouží k pohodlnému získání obsahu stránky bez nutnosti jejího parsování."
date: "2015-12-13"
last_modification: "2015-12-14"
status: 1
tags: ["hotova-reseni", "php", "ziskavani-obsahu"]
format: "html"
---

<p>Při vkládání odkazů uživateli (typicky do komentářů, příspěvků v diskusních fórech nebo na sociálních sítí) už se v dnešní době málokdo spokojí s prostým odkazem.</p>

<p>Lepší je něco takového:</p>

<p><img src="/files/oembed/nahled.png" alt="Náhled odkazu na Facebooku" class="border"></p>













<p>Pokud se má na odkazující stránce zobrazit náhled odkazu, musí se odkazovaná stránka stáhnout.</p>

<div class="internal-content">
  <ul>
    <li><a href="/stazeni-stranky">Získání obsahu cizí stránky</a> – jak v PHP a JavaScriptu získat obsah z cizí webové stránky</li>
  </ul>
</div>

<p>Tímto postupem se získá pouze HTML kód, ze kterého je nutné následně vyzobat potřebný obsah.</p>


<h2 id="titulek">Získání titulku stránky v PHP</h2>

<p>Například titulek stránky jde v <a href="/php">PHP</a> získat několika způsoby:</p>

<h3 id="regexp">Regulární výrazy</h3>

<pre><code>$page = file_get_contents("<b>http://example.com</b>");
preg_match("/&lt;title>(.*)&lt;\/title>/i", $page, $matches);
echo $matches[1];</code></pre>







<h3 id="dom">Práce s DOMem</h3>

<p>Nebo funkcemi pro práci s HTML <a href="/dom">DOMem</a>.</p>

<pre><code>$dokument = new DOMDocument();
@$dokument->loadHTMLFile('<b>http://example.com</b>');
$title = $dokument->getElementsByTagName('title');
echo $title->item(0)->nodeValue;</code></pre>






<p>Nebo s využitím XPath:</p>

<pre><code>$dokument = new DOMDocument();
@$dokument->loadHTMLFile('<b>http://example.com</b>');
$xpath = new DOMXPath($dokument);
echo $xpath->query('//title')->item(0)->nodeValue;</code></pre>





<p>Obdobným způsobem by šlo ze stránky dostávat i další věci.</p>


<h3 id="og">Open Graph</h3>

<pre><code>&lt;meta property="og:title" content="Titulek"></code></pre>

<p>Pro lepší podobu sdílení odkazu na sociálních sítích obsahuje řada webů tzv. <i>og:* meta tagy</i>, kde je typicky uveden titulek, popisek a obrázek článku.</p>

<div class="external-content">
  <ul>
    <li><a href="http://ogp.me/">The Open Graph protocol</a></li>
  </ul>
</div>



<p>Příklad použití <code>&lt;meta></code> značek pro zobrazení náhledu odkazu:</p>

<div class="internal-content">
  <ul>
    <li><a href="/nahled-twitter">Náhled odkazu na Twitteru a Facebooku</a></li>
  </ul>
</div>


<p>Získání obsahu z <code>og:</code> značek může být spolehlivější než z obecných HTML značek.</p>

<p>V PHP existuje funkce <code>get_meta_tags</code>, ale zrovna s <code>&lt;meta property></code>, které Open Graph používá, si neporadí. Nejsnazší je asi použít XPath:</p>

<pre><code>$dokument = new DOMDocument();
@$dokument->loadHTMLFile('http://jecas.cz');
$xpath = new DOMXPath($dokument);
$ogTitle = $xpath->query("<b>//meta[@property='og:title']</b>")->item(0);
echo $ogTitle->getAttribute("content");</code></pre>










<h2 id="oembed">Formát oEmbed</h2>

<p>Parsování uvedené výše má řadu problémů:</p>

<ol>
  <li>
    <p><b>Stahuje se zbytečně více dat</b>, než by stačilo. Pro získání jedné značky <code>&lt;title></code> se stahuje úplně celá HTML stránka.</p>
  </li>  
  <li>
    <p>Zvlášť v případě pokročilejšího parsování je regulární výraz velmi <b>citlivý na změnu cílové stránky</b> a snadno tak přestane fungovat.</p>
  </li>
</ol>

<p>Formát oEmbed se tyto problémy snaží řešit universálním API pro nabízení embedovaného obsahu.</p>

<div class="external-content">
  <ul>
    <li><a href="http://oembed.com/">oEmbed</a> – stránka projektu</li>
  </ul>
</div>

<p>Podporované služby potom nabízí tzv. <i lang="en">endpoint</i>, kam se pošle adresa, pro kterou je třeba získat obsah a ta ho vrátí:</p>

<h3 id="yt">Získání YouTube videa</h3>

<p>Celou URL stránky s videem stačí poslat na endpoint:</p>

<pre><code>http://www.youtube.com/oembed?url=<b>https://www.youtube.com/watch?v=6HT-yirOGoo</b></code></pre>

<p>A ten vrátí následující <a href="/json">JSON</a>.</p>

<pre><code>{  
   "type":"video",
   "thumbnail_width":480,
   "provider_name":"YouTube",
   "title":"Responsivn\u00ed navigace",
   "thumbnail_height":360,
   "provider_url":"https:\/\/www.youtube.com\/",
   "version":"1.0",
   "height":270,
   "author_name":"Bohumil Jahoda",
   "html":"\u003ciframe width=\"480\" height=\"270\" src=\"https:\/\/www.youtube.com\/embed\/6HT-yirOGoo?feature=oembed\" frameborder=\"0\" allowfullscreen\u003e\u003c\/iframe\u003e",
   "author_url":"https:\/\/www.youtube.com\/user\/bohumiljahoda",
   "width":480,
   "thumbnail_url":"https:\/\/i.ytimg.com\/vi\/6HT-yirOGoo\/hqdefault.jpg"
}</code></pre>














<p>Jak je vidět v JSONu, k disposici je i HTML kód pro vložení videa přímo do stránky.</p>

<p>Na stránce oEmbed je seznam služeb, které tento formát podporují.</p>

<div class="external-content">
  <ul>
    <li><a href="http://oembed.com/providers.json">providers.json</a> – seznam dostupných zdrojů</li>
  </ul>
</div>

<p>Mezi zdroji je kromě YouTube, třeba i Instagram, SoundCloud nebo Flickr.</p>

<p><a href="/facebook">Facebook</a> tam chybí, ačkoliv oEmbed endpointem disponuje:</p>

<div class="external-content">
  <ul>
    <li><a href="https://developers.facebook.com/docs/plugins/oembed-endpoints">Facebook: oEmbed Endpoints for Embeddable Facebook Content</a></li>
  </ul>
</div>

<p>Stejně tak <a href="/twitter">Twitter</a>, který ale vyžaduje ID aplikace: </p>

<div class="external-content">
  <ul>
    <li><a href="https://dev.twitter.com/rest/reference/get/statuses/oembed">Twitter GET statuses/oembed</a></li>
  </ul>
</div>


<h2 id="wordpress">WordPress</h2>

<p>V redakčním systému <a href="/wordpress">WordPress</a> se je možné s použitím této techniky embedování setkat při psaní příspěvků. Vložené URL u známých služeb jsou automaticky nahrazeny příslušným obsahem.</p>

<div class="external-content">
  <ul>
    <li><a href="https://codex.wordpress.org/Embeds">WordPress Codex: Embeds</a></li>
  </ul>
</div>


<h2 id="noembed">Noembed</h2>

<p>Pro embedování obsahu ze zdrojů, které nejsou na stránce oEmbed, je možné použít Noembed.</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.noembed.com/">Noembed</a> — oEmbed everything</li>
  </ul>
</div>

<p>Výsledek dokáže vracet i ve formátu <a href="/ajax#jsonp">JSONP</a>, takže ani není nutné výstup z endpointu zpracovávat vlastním serverem, ale vše se může odehrávat v JavaScriptu.</p>

<p>Po vložení URL ze schránky (<kbd>Ctrl</kbd> + <kbd>V</kbd>) do následujícího pole by se u známých služeb měl zobrazit výsledek:</p>

<div class="live">
  <script>
    function noembed(url) {
      var endpoint = 'http://noembed.com/embed?url=' + url + '&callback=vypsat';
      var skript = document.createElement("script");
      skript.src = endpoint;
      document.body.appendChild(skript);
    }
    function vypsat(data) {
      document.getElementById("vystup").innerHTML = data.html;
    }
  </script>
  <label>Vložit URL:
  <input onpaste="var that = this; setTimeout(function(){noembed(that.value)})"></label>
  <div id="vystup"></div>
</div>