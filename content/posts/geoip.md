---
title: "GeoIP v PHP"
headline: "Lokalisace podle IP"
description: "Jak na základě IP adresy lokalisovat návštěvníka webu."
date: "2014-05-11"
last_modification: "2014-05-16"
status: 1
tags: ["hotova-reseni", "php"]
format: "html"
---

<p>V některých případech se hodí <b>zjistit zemi</b>, ze které se návštěvník na web připojuje.</p>

<h2 id="proc">Proč lokalisovat?</h2>

<ul>
  
  <li>Nabídnutí vhodného jazyka webu / nabídnutí na lokalitu zaměřené nabídky.</li>
  
  <li>U webů pro primárně <b>českou/slovenskou klientelu</b> můžeme pro cizí návštěvníky zpřísnit <a href="/spam">ochranu před spamem</a>.</li>
</ul>

<p>Kromě zkoumání IP adresy se dá jazyk odhadnout z hlavičky <a href="/server#http-accept-language"><code>HTTP_ACCEPT_LANGUAGE</code></a> nebo použít geolokační JS API (to ale musí návštěvník povolit).</p>

<h2 id="php">GeoIP v PHP</h2>

<p>Pro určení země určité IP adresy potřebujeme dvě věci:</p>

<ol>
  <li>
    <p>Databasi IP adres.</p>
    <p>Ta může být i zdarma – <a href="http://dev.maxmind.com/geoip/legacy/geolite/#Downloads">GeoLite</a>.</p>
    <p><a href="http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz" class="button">Stáhnout</a></p>
  </li>
  
  <li>
    <p>PHP skript, jenž bude s touto DB pracovat.</p>
    <p><a href="https://github.com/maxmind/geoip-api-php/blob/master/src/geoip.inc"><code>geoip.inc</code></a></p>
  </li>
</ol>

<h3 id="pouziti">Použití</h3>

<p>Nyní stačí PHP soubor připoji a předat soubor s databásí.</p>

<pre><code>include("geoip.inc");
<b>$gi</b> = geoip_open("GeoIP.dat", GEOIP_STANDARD);</code></pre>

<p>Kód země (např. <code>CZ</code> pro Českou republiku) dané IP adresy potom vrátí funkce <code>geoip_country_code_by_addr</code>.</p>

<pre><code>$zeme = geoip_country_code_by_addr(
  <b>$gi</b>, 
  <i>$ipAdresa</i>
);</code></pre>

<p>Pro plný název země v angličtině (např. <code>Czech Republic</code>) slouží funkce <code>geoip_country_<b>name</b>_by_addr</code>. Použití je stejné jako při získávání dvojpísmenného kódu.</p>
