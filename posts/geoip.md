---
title: "GeoIP v PHP"
headline: "Lokalisace podle IP"
description: "Jak na základě IP adresy lokalisovat návštěvníka webu."
date: "2014-05-11"
last_modification: "2014-05-16"
status: 1
tags: ["Hotová řešení", "PHP"]
---

V některých případech se hodí **zjistit zemi**, ze které se návštěvník na web připojuje.

## Proč lokalisovat?

  - Nabídnutí vhodného jazyka webu / nabídnutí na lokalitu zaměřené nabídky.

  - U webů pro primárně **českou/slovenskou klientelu** můžeme pro cizí návštěvníky zpřísnit [ochranu před spamem](/spam).

Kromě zkoumání IP adresy se dá jazyk odhadnout z hlavičky [`HTTP_ACCEPT_LANGUAGE`](/server#http-accept-language) nebo použít geolokační JS API (to ale musí návštěvník povolit).

## GeoIP v PHP

Pro určení země určité IP adresy potřebujeme dvě věci:

    Databasi IP adres.

    Ta může být i zdarma – [GeoLite](http://dev.maxmind.com/geoip/legacy/geolite/#Downloads).

    [Stáhnout](http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz)

    PHP skript, jenž bude s touto DB pracovat.

    [`geoip.inc`](https://github.com/maxmind/geoip-api-php/blob/master/src/geoip.inc)

### Použití

Nyní stačí PHP soubor připoji a předat soubor s databásí.

```
include("geoip.inc");
**$gi** = geoip_open("GeoIP.dat", GEOIP_STANDARD);
```

Kód země (např. `CZ` pro Českou republiku) dané IP adresy potom vrátí funkce `geoip_country_code_by_addr`.

```
$zeme = geoip_country_code_by_addr(
  **$gi**, 
  *$ipAdresa*
);
```

Pro plný název země v angličtině (např. `Czech Republic`) slouží funkce `geoip_country_**name**_by_addr`. Použití je stejné jako při získávání dvojpísmenného kódu.