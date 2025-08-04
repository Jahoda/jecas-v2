---
title: "Stažení cizí stránky"
headline: "Získání obsahu cizí stránky"
description: "Jak v PHP a JavaScriptu získat obsah z cizí webové stránky."
date: "2013-10-16"
last_modification: "2013-10-16"
status: 1
tags: ["Hotová řešení", "PHP", "Získávání obsahu"]
---

## Získání obsahu

Chceme-li na vlastním webu **pracovat s cizími daty**, existuje k tomu v PHP hned několik způsobů.

### Funkce `[file_get_contents](http://php.net/manual/en/function.file-get-contents.php)`

Použití je prosté:

```
$data = file_get_contents("http://jecas.cz/stazeni-stranky");
```

V proměnné `$data` potom bude celý obsah stránky `http://jecas.cz/stazeni-stranky`.

Nevýhoda je, že **řada hostingů tuto funkci pro stažení stránky z jiné domény blokuje**. Jedná se o nastavení `[allow_url_fopen](http://www.php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen)`.

### Funkce `[fsockopen](http://php.net/manual/en/function.fsockopen.php)`

V případech, kdy `file_get_contents` není pro **stahování z jiné domény** k disposici, většinou funguje následující:
```
$host = "jecas.cz";
$adresa = "stazeni-stranky";
$fp = @fsockopen ($host, 80, $errno, $errstr, 10); 
fputs ($fp, "GET /".$adresa." HTTP/1.0\r\nHost: ".$host."\r\n\r\n"); 
$data = '';
while (!feof($fp)) { 
  $data .= fgets($fp, 2048);
} 
fclose ($fp);
```

S rozdělením URL na `$host` a `$adresa` může pomoci funkce `[parse_url](http://php.net/manual/en/function.parse-url.php)`. V proměnné `$data` by opět měl být celý obsah stránky `http://jecas.cz/stazeni-stranky`.

## Zpracování dat

Výše uvedeným způsobem získaný obsah je možné i **rovnou vypsat** (čehož je využito například v [proxy skriptu](/php-proxy)).

```
echo $data;
```

Nebo třeba **přečíst obsah určitých HTML značek**. K tomu se hodí regulární výrazy a funkce `[preg_match](http://php.net/manual/en/function.preg-match.php)` (popř. `preg_match_**all**`).

Nejjednoduší **regulární výraz** pro přečtení prvního nadpisu `&lt;h1&gt;` by mohl vypadat následovně:

```
$tagRegExp = '~&lt;(h1).*>(.*?)&lt;/\\1>~iU';
preg_match($tagRegExp, $data, $matches);
$nadpis = $matches[2];
```

V `$matches[0]` je celý nadpis včetně značek a v `$matches[1]` zase název značky, proto `$matches[2]`.

## Získání cizí stránky JavaScriptem

JS neumožňuje přímo stahování stránky z cizí domény, jediná možnost je **vypomoci si výše uvedeným serverovým skriptem** — ten stránku „stáhne“ na vlastní doménu a JavaScript se k němu potom může dostat prostým [AJAXem](/ajax), který v rámci domény funguje.

Nebo je možné použít [JSONP](/ajax#jsonp).