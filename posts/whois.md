---
title: "Ověření dostupnosti domény"
headline: "Zjištění majitele domény"
description: "Jak PHP skriptem ověřit, zda je doména volná nebo kdo je její vlastník. "
date: "2014-06-12"
last_modification: "2014-06-16"
status: 1
tags: ["Hotová řešení", "PHP", "Domény"]
---

Pro **české domény** stačí navštívit stránku `whois.nic.cz` PHP funkcí `[fsockopen](/stazeni-stranky#fsockopen)`.

```
&lt;?php
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
?>
```

Aktuální **seznam všech ostatních WHOIS serverů** pro [jednotlivé TLD](/tld) je možné [získat zde](http://www.whois365.com/en/listtld/).