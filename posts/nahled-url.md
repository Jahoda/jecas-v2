---
title: "Náhled URL"
headline: "Náhled URL"
description: "Jak získat obrázkový náhled a další informace pro libovolnou URL."
date: "2022-12-19"
last_modification: "2022-12-20"
status: 1
tags: ["Hotová řešení", "Získávání obsahu"]
---

Zadává-li uživatel někam webovou adresu, může se pro zvýšení komfortu k adrese rovnou zobrazovat náhled. Textový či obrázkový.

Jedna možnost je napsat si vlastní skript, který stáhne obsah dané URL a *něco* se z toho snažit vyparsovat.

Druhá možnost je použít nějaké hotové řešení:

## Titulek stránky

Pro získání textového názvu stránky, jde použít minislužbu [url-title-api](https://github.com/plibither8/url-title-api).

Použití je triviální, stačí zadat URL za lomítko:

```
https://title.mihir.ch/**https://jecas.cz**
```

Výstupem bude textový obsah:

```
Je čas.cz – moderní tvorba webových stránek
```

## Favicona

Pro získání obrázku ikony webu (tzv. [favicony](/favicon)) jde použít službu od Google:

```
https://t3.gstatic.com/faviconV2?client=SOCIAL&amp;type=FAVICON&amp;fallback_opts=TYPE,SIZE,URL&amp;size=64&amp;url=**http://jecas.cz**
```

Výstup:

## Logo stránky

Další zajímavá služba je Clearbit Logo API
.

Použití je následovné:

```
https://logo.clearbit.com/**jecas.cz**?size=64
```

Podle popisu získává logo z různých zdrojů (Twitter, Facebook, Wikipedie nebo `&lt;meta>` značek).

Výsledek:

## Peekalink

[Peekalink](https://www.peekalink.io) už vyžaduje registraci a je potřeba implementovat přes vlastní backend, který se ověřuje přes API klíč.

Do určitého počtu požadavků (100 za hodinu) je zdarma.

Výstupem je JSON typu:

```
{
  "url": "https://jecas.cz/",
  "domain": "jecas.cz",
  "lastUpdated": "2022-12-19T18:14:58.794822Z",
  "nextUpdate": "2022-12-20T18:14:58.781606Z",
  "contentType": "html",
  "mimeType": "text/html",
  "redirected": false,
  "title": "Je čas.cz – moderní tvorba webových stránek",
  "description": "Poznámky o moderním webdesignu, hotová řešení, experimenty a návody.",
  "name": "JECAS.CZ",
  "trackersDetected": false,
  "icon": {
    "url": "https://cdn.peekalink.io/public/images/57bdea21-83eb-4697-a8a9-d3ca43f9f7ed/554822e9-3c01-45b1-81e6-de97d044f586.jpg",
    "width": 57,
    "height": 57
  },
  "image": {
    "url": "https://cdn.peekalink.io/public/images/41d61f08-e2cc-4b08-9553-19a5d32bd2e3/e086e043-c69d-4ebe-b502-1bb386ca9b1c.jpg",
    "width": 200,
    "height": 200
  }
}
```