---
title: "Parsování URL v JavaScriptu"
headline: "Parsování URL v JavaScriptu"
description: "Jak elegantně parsovat adresy webových stránek v JavaScriptu."
date: "2014-10-06"
last_modification: "2017-02-01"
status: 1
tags: ["JavaScript", "Rady a nápady"]
---

V případě, že máme URL a potřebujeme z ní JavaScriptem **získat jednotlivé části** jako například:

  - protokol,

  - název domény,

  - cestu k souboru,

  - parametry za otazníkem ([*query string*](http://en.wikipedia.org/wiki/Query_string)),

  - hash (obsah za `#`)

Je řešení buď používat **regulární výrazy**, nebo využít toho, že všechny tyto údaje umí JavaScript snadno vytáhnout ze značky `&lt;a>`.

  V prohlížečích novějších než **IE 11**, jde použít rovnou [URL API](#url).

Vytvoříme-li proto odkaz a nastavíme-li mu požadovanou URL, potřebné údaje získáme velmi elegantně.

```
var adresa = "http://example.com/cesta/skritp.php?promena=1#kotva";
var odkaz = document.createElement("a");
odkaz.href = adresa;
```

      Parsovat

    var odkaz = document.createElement("a");
    var vystup = document.getElementById("vystup");
    
    function nastavit(el) {
      odkaz.href = el.url.value;   
      var vlastnosti = ["protocol", "hostname", "pathname", "search", "hash", "port"];
      var obsah = "";
      for (var i = 0; i " + vlastnosti[i] + "`" + odkaz[vlastnosti[i]] + "`";
      }
      vystup.innerHTML = "" + obsah + "";      
    }

  `protocol`
  
    Bude dostupný ve vlastnosti `odkaz.protocol`, zpravidla `http:` nebo `https:` (včetně dvojtečky).

  `hostname`
  
    Název domény bude v `odkaz.hostname`.

  `pathname`
  
    Cesta ke skriptu – `odkaz.pathname`.

  `search`
  
    Obsah za otazníkem – `odkaz.search`.

  `hash`
  
    Obsah za mřížkou včetně té mřížky – `odkaz.hash`.

  `port`
  
    Získat je možné i port (je-li uveden v URL) – `odkaz.port`. To ale bývá velmi zřídka.

[Zjednodušená ukázka](http://kod.djpw.cz/bphb-) pro testování ve starých prohlížečích.

## URL API

  V nových prohlížečích (mimo **IE**) existuje [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL). Tím odpadá potřeba parsovat URL přes vytváření odkazu, ale jde jít hezky na přímo.

  ```
const url = new URL("http://example.com:8080/cesta/skript.php?promena=1#kotva")
```

  Výstupem je:

```
hash: "#kotva"
host: "example.com:8080"
hostname: "example.com"
href: "http://example.com:8080/cesta/skript.php?promena=1#kotva"
origin: "http://example.com:8080"
password: ""
pathname: "/cesta/skript.php"
port: "8080"
protocol: "http:"
search: "?promena=1"
searchParams: URLSearchParams {}
username: ""
```

Pokud parametr předávaný do `URL` nemusí být validní, nabízí se to celé obalit do `try` – `catch` bloku:

Přísnější validace URL tak může vypadat třeba takto:

```
export const validateUrl = (webUrl: string) => {
  try {
    const url = new URL(webUrl)

    const isProtocolValid = ['http:', 'https:'].includes(url.protocol)

    const hostnameParts = url.hostname.split('.')
    const isTldExist = hostnameParts.filter(part => part.length > 0).length > 1

    const tld = hostnameParts[hostnameParts.length - 1]
    const isTldNaN = isNaN(parseInt(tld))

    const isTldTwoMoreChars = tld.length >= 2

    return isProtocolValid &amp;&amp; isTldExist &amp;&amp; isTldNaN &amp;&amp; isTldTwoMoreChars
  } catch (_e) {
    return false
  }
}  

```

  ### Punycode

  Punycode je zjednodušeně řečeno převod diakritiky v doméně na základní (ASCII) znaky.

  Funkce `URL` to dělá automaticky. Takže z domény obsahující `é` (e s čárkou) `https://éxample.com` vznikne `https://xn--xample-9ua.com/`.

  Takovou doménu jde detakovat třeba pomocí podmínky:

  ```
if (url.hostname.includes('xn--'))
```

## Parsování URL v PHP

V jazyku PHP k **parsování adres** slouží funkce [`parse_url`](http://php.net/manual/en/function.parse-url.php).