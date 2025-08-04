---
title: "Preconnect – zrychlení stahování z více domén"
headline: "Preconnect – zrychlení stahování z více domén"
description: "Jak v prohlížečích zrychlit stahování souborů z jiné domény pomocí <code>preconnect</code>."
date: "2015-09-07"
last_modification: "2015-09-14"
status: 1
tags: ["Zrychlování webu"]
---

Pro **získání obsahu** (HTML stránky, obrázku, stylu, skriptu, …) musí prohlížeč zjednodušeně udělat dvě věci:

  - **Sestavit spojení**

  - **Stáhnout obsah**

Do sestavení spojení patří vyhledání doménového jména (tzv. DNS Lookup), navázání TCP spojení a podobně.

Výhoda je, že tyto činnosti se provádí pouze jednou pro danou doménu, takže je prohlížeč nemusí provádět pro každý soubor, který stránka potřebuje (CSS, JS, obrázky, …).

Na druhou stranu potom **připojování souborů z různých domén** může logicky načítání prodloužit.

Zvlášť problematické je to třeba u [Google Fontů](/ceska-pisma), kdy prohlížeč nejprve stáhne CSS z jedné domény, aby následně stáhl nadefinovaná písma, která se nachází na doméně jiné.

U datově malých souborů a rychlého připojení často samotné stažení zabere menší čas než navázání spojení.

Pomocí `preconnect` jde prohlížeči napovědět, pro které všechny domény si má připojení připravit. Navázání spojení pro další domény tak může proběhnout paralelně s dřívějšími požadavky:

## Podpora

Použití preconnect nápovědy podporují následující prohlížeče:

  - **Chrome 46+**,

  - **Firefox 39+**,

  - **Opera 33+**

    - Can I use… [Resource Hints: preconnect](http://caniuse.com/#search=preconnect)

Existují různé způsoby, jak *preconnect* technicky implementovat:

## HTML značka `&lt;link>`

Nejednodušší je přidat do hlavičky stránky `&lt;link>` značku:

```
&lt;link href='https://example.com' **rel='preconnect' crossorigin**>
```

## HTTP hlavička `Link`

Připravit *preconnect* jde i přímo v HTTP hlavičce. Tuto informaci dostane prohlížeč dříve než z HTML značky, což může být výhoda.

```
Link: &lt;https://example.com>; rel=preconnect; crossorigin
```

## JavaScript

Při dynamickém připojování obsahu JavaScriptem stačí pro *preconnect* vytvořit HTML značku `&lt;link>`:

```
function preconnectTo(url) {
  var hint = document.createElement("link");
  hint.rel = "preconnect";
  hint.href = url;
  document.head.appendChild(hint);
}
```

## Odkazy jinam

    - Ilya Grigorik: [Eliminating Roundtrips with Preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/)

    - [Google zrychlil načítání na mobilech](/google-prefetch) – použití `&lt;link rel="prefetch">` pro přednačtení souborů