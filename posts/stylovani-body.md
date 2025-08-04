---
title: "Značka <body> jako obal stránky"
headline: "Obal <code>&lt;body></code>, nebo <code>&lt;div id=container></code>?"
description: "Ve <a href=\"/doctype\">standardním režimu</a> lze značku <code>&lt;body></code> stylovat jako normální <code>&lt;div></code>. Má to cenu?"
date: "2013-06-12"
last_modification: "2013-06-13"
status: 1
tags: ["CSS", "Rady a nápady"]
---

Zadáme jednoduchý CSS kód.
```
body {margin: auto; width: 960px}
```

K jednoduchému HTML:
```
&lt;!doctype html>
&lt;title>Titulek&lt;/title>
&lt;h1>Nadpis&lt;/h1>
&lt;p>Odstavec
```

A máme [vycentrovanou](/centrovani) 960 pixelů širokou stránku bez nějakého balastu v HTML. Není to skvělé? Funkční všude od Exploreru 6.

## Jenže…

Vícenásobné pozadí
Řešené kvůli starším prohlížečům několika obaly (každý obal má jeden obrázek) a najednou se celá stránka musí předělávat, protože `&lt;body>` už není čím obalit.
Lightbox skript
Má najednou problém se *připlácnout* na stránku, protože s omezenou šířkou `&lt;body>` vůbec nepočítá.

Zdá se tedy, že používat obal `&lt;div id=container>` má pořád smysl.