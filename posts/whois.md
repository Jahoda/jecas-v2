---
title: "Ověření dostupnosti domény"
headline: "Zjištění majitele domény"
description: "Jak PHP skriptem ověřit, zda je doména volná nebo kdo je její vlastník. "
date: "2014-06-12"
last_modification: "2014-06-16"
status: 1
tags: ["domeny", "hotova-reseni", "php"]
format: "html"
---

<p>Pro <b>české domény</b> stačí navštívit stránku <code>whois.nic.cz</code> PHP funkcí <code><a href="/stazeni-stranky#fsockopen">fsockopen</a></code>.</p>

<pre><code>&lt;?php
$domain = "seznam.cz"; // název domény
$server = "whois.nic.cz"; // adresa WHOIS serveru
$port = 43;
$timeout = 5;
$fp = @fsockopen(
	$server, 
	$port, 
	$errno, 
	$errstr, 
	$timeout
) or die($errno . ": " . $errstr);
fputs($fp, $domain . "\r\n");
$out = "";
while(!feof($fp)){
	$out .= fgets($fp);
}
fclose($fp);
echo $out; // výpis záznamu
?></code></pre>

<p>Aktuální <b>seznam všech ostatních WHOIS serverů</b> pro <a href="/tld">jednotlivé TLD</a> je možné <a href="http://www.whois365.com/en/listtld/">získat zde</a>.</p>