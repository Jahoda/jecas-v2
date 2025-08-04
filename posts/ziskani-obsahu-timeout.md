---
title: "File_get_contents a timeout"
headline: "File_get_contents a timeout"
description: "Jak omezit maximální čas získávání obsahu stránky z URL."
date: "2014-05-10"
last_modification: "2014-05-11"
status: 1
tags: ["Hotová řešení", "PHP", "Získávání obsahu"]
---

V případě, že je potřeba [stáhnout obsah](/stazeni-stranky) z nějaké cizí stránky, hodí se k tomu PHP funkce `file_get_contents`.

## Čekání na odpověď

Problém tohoto postupu nastane ve chvíli, kdy cílová stránka **nebude odpovídat**. V takovém případě se PHP bude marně snažit až do vyčerpání časového limitu (*Maximum execution time*), což může být třeba 30 vteřin.

Většinou to ale je tak, že když stránka nevrátí obsah do **několika stovek milisekund**, nejspíš ho nevrátí vůbec (má výpadek a podobně).

Proto u akcí, které vyvolává běžný návštěvník, je dobré **nastavit časový limit**. Běžný uživatel často nebude ochotný čekat déle než řádově **několik vteřin**.

## Doporučený postup

Získávání obsahu, které by mohlo **blokovat vykreslení stránky**, nastavit s nízkým časovým limitem a v případě neúspěchu zkusit data donačíst později [AJAXem](/ajax).

A nebo použít *cache*.

## Nastavení timeoutu

```
**$context** = stream_context_create(
  array('http' =>
    array(
      'timeout' => 1 // Timeout ve vteřinách
    )
  )
);
$soubor = *@*file_get_contents(
  "http://example.com", 
  false, 
  **$context**
);

```

Timeout se funkci `file_get_contents` dá nastavit přes tzv. *context*, jenž se předá jako třetí argument.

Zajímavé chování má **časová jednotka** pro `timeout`, která v praxi trvá dvakrát víc sekund, než se nastaví. Uvedená ukázka má tedy skutečný *timeout* 2 sekundy.

V případě, že časový limit znemožní stažení stránky, vrátí `file_get_contents` varování:

```
Warning: file_get_contents(…): 
  failed to open stream: HTTP request failed!
```

To je proto **potlačeno zavináčem**. V případě chyby bude v proměnné `$soubor` hodnota `false` (jinak získaný obsah).

## HTTPS

Přestože se v poli při vytváření kontextu (`stream_context_create`) píše `http`, získání obsahu včetně nastavení limitu může fungovat i na **HTTPS**.

## cURL

S využitím [cURL](http://www.php.net/manual/en/ref.curl.php) se timeout nastavuje takto:

```
function curlObsah($url) {
  $c = curl_init();
  curl_setopt($c, **CURLOPT_TIMEOUT**, 1);
  curl_setopt($c, CURLOPT_URL, $url);
  $result = curl_exec($c);
  curl_close($c);
  return $result;
}
```

Existuje i nastavení `CURLOPT_TIMEOUT_MS` pro zadávání času v milisekundách. Nicméně často **nižší timeout než 1 vteřinu** není možné nastavit (nastavení v milisekundách by mělo fungovat od cURL 7.16.2 – od PHP 5.2.3).

Test obou postupů je na [GitHubu](https://github.com/Jahoda/get-contents-timeout).