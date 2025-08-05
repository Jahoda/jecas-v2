---
title: "Stažení cizí stránky"
headline: "Získání obsahu cizí stránky"
description: "Jak v PHP a JavaScriptu získat obsah z cizí webové stránky."
date: "2013-10-16"
last_modification: "2013-10-16"
status: 1
tags: ["hotova-reseni", "php", "ziskavani-obsahu"]
format: "html"
---

<h2>Získání obsahu</h2>
<p>Chceme-li na vlastním webu <b>pracovat s cizími daty</b>, existuje k tomu v PHP hned několik způsobů.</p>

<h3 id="file_get_contents">Funkce <code><a href="http://php.net/manual/en/function.file-get-contents.php">file_get_contents</a></code></h3>
<p>Použití je prosté:</p>
<pre><code>$data = file_get_contents("http://jecas.cz/stazeni-stranky");</code></pre>
<p>V proměnné <code>$data</code> potom bude celý obsah stránky <code>http://jecas.cz/stazeni-stranky</code>.</p>
<p>Nevýhoda je, že <b>řada hostingů tuto funkci pro stažení stránky z jiné domény blokuje</b>. Jedná se o nastavení <code><a href="http://www.php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen">allow_url_fopen</a></code>.</p>

<h3 id="fsockopen">Funkce <code><a href="http://php.net/manual/en/function.fsockopen.php">fsockopen</a></code></h3>
V případech, kdy <code>file_get_contents</code> není pro <b>stahování z jiné domény</b> k disposici, většinou funguje následující:
<pre><code>$host = "jecas.cz";
$adresa = "stazeni-stranky";
$fp = @fsockopen ($host, 80, $errno, $errstr, 10); 
fputs ($fp, "GET /".$adresa." HTTP/1.0\r\nHost: ".$host."\r\n\r\n"); 
$data = '';
while (!feof($fp)) { 
  $data .= fgets($fp, 2048);
} 
fclose ($fp);</code></pre>
<p>S rozdělením URL na <code>$host</code> a <code>$adresa</code> může pomoci funkce <code><a href="http://php.net/manual/en/function.parse-url.php">parse_url</a></code>. V proměnné <code>$data</code> by opět měl být celý obsah stránky <code>http://jecas.cz/stazeni-stranky</code>.</p>

<h2 id="zpracovani-dat">Zpracování dat</h2>
<p>Výše uvedeným způsobem získaný obsah je možné i <b>rovnou vypsat</b> (čehož je využito například v <a href="/php-proxy">proxy skriptu</a>).</p>
<pre><code>echo $data;</code></pre>
<p>Nebo třeba <b>přečíst obsah určitých HTML značek</b>. K tomu se hodí regulární výrazy a funkce <code><a href="http://php.net/manual/en/function.preg-match.php">preg_match</a></code> (popř. <code>preg_match_<b>all</b></code>).</p>
<p>Nejjednoduší <b>regulární výraz</b> pro přečtení prvního nadpisu <code>&lt;h1&gt;</code> by mohl vypadat následovně:</p>
<pre><code>$tagRegExp = '~&lt;(h1).*>(.*?)&lt;/\\1>~iU';
preg_match($tagRegExp, $data, $matches);
$nadpis = $matches[2];</code></pre>
<p><small>V <code>$matches[0]</code> je celý nadpis včetně značek a v <code>$matches[1]</code> zase název značky, proto <code>$matches[2]</code>.</small></p>

<h2 id="js">Získání cizí stránky JavaScriptem</h2>
<p>JS neumožňuje přímo stahování stránky z cizí domény, jediná možnost je <b>vypomoci si výše uvedeným serverovým skriptem</b> — ten stránku „stáhne“ na vlastní doménu a JavaScript se k němu potom může dostat prostým <a href="/ajax">AJAXem</a>, který v rámci domény funguje.</p>

<p>Nebo je možné použít <a href="/ajax#jsonp">JSONP</a>.</p>