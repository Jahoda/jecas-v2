---
title: "File_get_contents a timeout"
headline: "File_get_contents a timeout"
description: "Jak omezit maximální čas získávání obsahu stránky z URL."
date: "2014-05-10"
last_modification: "2014-05-11"
status: 1
tags: ["hotova-reseni", "php", "ziskavani-obsahu"]
format: "html"
---

<p>V případě, že je potřeba <a href="/stazeni-stranky">stáhnout obsah</a> z nějaké cizí stránky, hodí se k tomu PHP funkce <code>file_get_contents</code>.</p>

<h2 id="cekani">Čekání na odpověď</h2>

<p>Problém tohoto postupu nastane ve chvíli, kdy cílová stránka <b>nebude odpovídat</b>. V takovém případě se PHP bude marně snažit až do vyčerpání časového limitu (<i>Maximum execution time</i>), což může být třeba 30 vteřin.</p>

<p>Většinou to ale je tak, že když stránka nevrátí obsah do <b>několika stovek milisekund</b>, nejspíš ho nevrátí vůbec (má výpadek a podobně).</p>

<p>Proto u akcí, které vyvolává běžný návštěvník, je dobré <b>nastavit časový limit</b>. Běžný uživatel často nebude ochotný čekat déle než řádově <b>několik vteřin</b>.</p>

<h2 id="doporuceny-postup">Doporučený postup</h2>

<p>Získávání obsahu, které by mohlo <b>blokovat vykreslení stránky</b>, nastavit s nízkým časovým limitem a v případě neúspěchu zkusit data donačíst později <a href="/ajax">AJAXem</a>.</p>

<p>A nebo použít <i>cache</i>.</p>

<h2 id="timeout">Nastavení timeoutu</h2>

<pre><code><b>$context</b> = stream_context_create(
  array('http' =>
    array(
      'timeout' => 1 // Timeout ve vteřinách
    )
  )
);
$soubor = <i>@</i>file_get_contents(
  "http://example.com", 
  false, 
  <b>$context</b>
);
</code></pre>


<p>Timeout se funkci <code>file_get_contents</code> dá nastavit přes tzv. <i>context</i>, jenž se předá jako třetí argument.</p>

<p>Zajímavé chování má <b>časová jednotka</b> pro <code>timeout</code>, která v praxi trvá dvakrát víc sekund, než se nastaví. Uvedená ukázka má tedy skutečný <i>timeout</i> 2 sekundy.</p>

<p>V případě, že časový limit znemožní stažení stránky, vrátí <code>file_get_contents</code> varování:</p>

<pre><code>Warning: file_get_contents(…): 
  failed to open stream: HTTP request failed!</code></pre>
  
<p>To je proto <b>potlačeno zavináčem</b>. V případě chyby bude v proměnné <code>$soubor</code> hodnota <code>false</code> (jinak získaný obsah).</p>

<h2 id="https">HTTPS</h2>

<p>Přestože se v poli při vytváření kontextu (<code>stream_context_create</code>) píše <code>http</code>, získání obsahu včetně nastavení limitu může fungovat i na <b>HTTPS</b>.</p>

<h2 id="curl">cURL</h2>

<p>S využitím <a href="http://www.php.net/manual/en/ref.curl.php">cURL</a> se timeout nastavuje takto:</p>

<pre><code>function curlObsah($url) {
  $c = curl_init();
  curl_setopt($c, <b>CURLOPT_TIMEOUT</b>, 1);
  curl_setopt($c, CURLOPT_URL, $url);
  $result = curl_exec($c);
  curl_close($c);
  return $result;
}</code></pre>

<p>Existuje i nastavení <code>CURLOPT_TIMEOUT_MS</code> pro zadávání času v milisekundách. Nicméně často <b>nižší timeout než 1 vteřinu</b> není možné nastavit (nastavení v milisekundách by mělo fungovat od cURL 7.16.2 – od PHP 5.2.3).</p>

<p>Test obou postupů je na <a href="https://github.com/Jahoda/get-contents-timeout">GitHubu</a>.</p>