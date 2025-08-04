---
title: "Query string v URL"
headline: "Query string v URL"
description: "Řetězec dotazu je část URL za otazníkem obsahující nejrůznější parametry."
date: "2025-03-24"
last_modification: "2025-03-24"
status: 0
tags: []
---

```
https://example.com/produkty?**orderBy=price**
```

Obsah query stringu se obvykle zapisuje ve tvaru `parametr=hodnota` a více těchto dvojic se oddělí ampersandem (`&amp;`):

```
https://example.com/produkty?orderBy=price**&amp;**sort=desc
```

Historicky existovala v HTML značka `&lt;isindex>`, která umožnila zadat uživateli vstup a ten se potom poslal na server za otazníkem.

Server tak mohl nabídnout například vyhledávání.

Je dost možné, že právě proto se tyto parametry v URL někdy označují i jako *search params*. A v JavaScriptu se dají získat z `window.location.**search**` nebo moderněji z `URLSearchParams`.

Svého času se tyto parametry v URL využívali i pro kompletní routování v PHP aplikacích. Celá aplikace klidně mohla být jediný soubor `index.php`, který přes obsah v URL za otazníkem rozhodoval, co se má vykreslit.

```
https://example.com?page=kontakt
```

Postupem času se přešlo k hezčím URL, kde jsou tyto parametry nenesoucí přílišnou hodnotu vypuštěny.

```
https://example.com/kontakt
```

Parametry v URL se tak používají zejména pro **vyhledávání, filtrování**, [stránkování](/strankovan), předávání identifikátorů nebo invalidace cache.

```
https://www.google.com/search?q=je+cas
```

## SEO

Z pohledu vyhledávače je každá URL s jiným obsahem query stringu *samostatná stránka*.

Z toho plyne risiko duplicitních stránek.

```
https://example.com/produkty
https://example.com/produkty?a
https://example.com/produkty?b
```

Všechny tyto stránky mohou vracet stejný obsah, ale vyhledávač se musí rozhodnout, kterou z nich upřednostnit.

Dokonce i následující URL mohou teoreticky vracet různý obsah:

```
https://example.com/produkty?orderBy=price&amp;sort=desc
https://example.com/produkty?sort=desc&amp;orderBy=price
```

Většinou se to řeší **kanonickým odkazem**, který jasně definuje, která varianta je preferovaná:

```
&lt;link href="https://example.com/kontakt" rel="canonical">
```

https://www.npmjs.com/package/query-string
https://github.com/beynar/kit-query-params
https://github.com/paoloricciuti/sveltekit-search-params

    JPW: [Živá fosílie HTML - ISINDEX](https://www.jakpsatweb.cz/clanky/fosilie-isindex.html)