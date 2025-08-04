---
title: "HTML Imports"
headline: "HTML Imports"
description: "HTML importy umožňují připojit/vložit do stránky jiný HTML dokument."
date: "2013-11-17"
last_modification: "2013-11-27"
status: 1
tags: ["HTML", "Rady a nápady"]
---

- **CSS** soubor je možné připojit přes: `&lt;link href="styl.css" type="text/css" rel="stylesheet">`

  - **JavaScriptový** soubor připojí zase: `&lt;script src="skript.js">&lt;/script>`
 
  - A připojit **obrázek** lze přes: `&lt;img src="obrazek.jpg">`

**HTML importy** umožňují obdobným způsobem vložit z jedné HTML stránky **jinou HTML stránku**.

```
&lt;link rel="**import**" href="importovana-stranka.html">
```

Hezké je, že takto vložená stránka se *vloží* se vším všudy, tedy se načtou i skripty, styly nebo obrázky v **importované stránce** připojené. Zároveň je zajištěno, že se každý takový *objekt* **načte jen jednou**, i když se bude připojovat vícekrát.

## Podpora

Importování HTML souborů zatím funguje **jen v Chromu** po povolení **Enable HTML Imports** v `about:flags`. Testovat **podporu** HTML Imports může následující kód.

```
if ('import' in document.createElement('link')) {
  // HTML import funguje
}
```

## Využití

Dobrá podpora této funkce napříč [prohlížeči](/prohlizece) by mohla výrazně **zpříjemnit** začleňování **cizích hotových řešení** do vlastní aplikace. Různé **frameworky** sestávají běžně z několika JS a CSS souborů, které se musí při`&lt;link&gt;`ovat nebo při`&lt;script src>`ovat. Řešení s `&lt;link rel=import>` by toto **elegantně řešilo**.

```
&lt;link rel="import" href="**framework.html**">
```

Připojovat lze podobně jako u [AJAX](/ajax)u jen **obsah ze stejné domény** nebo přes [Cross-origin resource sharing](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing).

## Použití

Import **ne**funguje jako běžné `include` [známé z PHP](/include) — tedy neznamená to vypsat obsah importované stránky v místě použití `&lt;link rel=import>`, ale jen dá vědět prohlížeči, **že si má daný obsah připravit** (skripty, styly, obrázky atd. načíst; z HTML vytvořit DOM). Výhodné chování je, že `import`em připojené skripty **neblokují další načítání**.

Obsah z připojeného HTML souboru **získáme pomocí JS následovně**:

```
var link = document.querySelector('link[rel="import"]');
var obsah = link.**import**;
```

Když máme obsah, stačí ho běžným způsobem **naklonovat do dokumentu**:

```
document.body.appendChild(obsah.cloneNode(true));
```

Nad obsahem z `link.import` lze provádět standardní metody DOMu typu `getElementById`.

## JS v importovaném souboru

JS kód v souboru, který je importován, se na rozdíl od HTML nebo CSS projeví rovnou, tj. je **proveden ihned** po načtení.

Při skriptování je potom:

  - *nadřazený* dokument (ze kterého se import volá) dostupný přes `document`,

  - obsah importovaného přes `document.currentScript.ownerDocument`.

## Odkazy

  - W3C: [Specifikace HTML Imports](http://www.w3.org/TR/2013/WD-html-imports-20130514/)

  HTML5 Rocks: HTML Imports
#include for the web