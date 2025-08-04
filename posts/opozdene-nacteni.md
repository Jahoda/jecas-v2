---
title: "Načtení obrázku, až když je potřeba"
headline: "Zpožděné načtení obrázku, až když je potřeba"
description: "Kromě potřeby nahrát obrázek dopředu (preload), aby byl v době použití 100% připravený, může být potřeba opačná – načíst jej, až v momentě, kdy je potřeba. Z důvodu nemrhání datovým přenosem."
date: "2013-05-16"
last_modification: "2013-05-16"
status: 1
tags: ["Lazy loading", "JavaScript", "CSS", "Hotová řešení"]
---

## JavaScript

V JS je situace poměrně jednoduchá. Stačí při vykonávání nějaké akce přidávat elementy s obrázky (`&lt;img&gt;`) nebo elementy s pozadím v CSS (`background`).

Například pro donačítání obrázků při dojetí na konec stránky (tzv. **lazy loading**) stačí porovnávat `offsetTop` a `scrollTop`:

```
if (*element*.**offsetTop** &lt; document.documentElement.**scrollTop** + document.body.**scrollTop**) {
	// nějaká akce
}
```

Sečtení `document.documentElement` s `document.body` slouží ke srovnání chování napříč prohlížeči.

Existují i různá komplexnější řešení v jQuery, například:

Element ‘inview’ Event Plugin (demo)

## CSS

Máme-li třeba nějaké rozsáhlé `:hover` menu, kvůli kterému by by se zbytečně musel stahovat datově náročný obrázek, dává smysl jej načítat až při *použití*.

### Použití `display: none`

```
element {display: none; background: url(obrazek.png)}
element:hover {display: block}
```

Nabízelo by se, že u elementu s `display: none` nebudou prohlížeče pozadí stahovat, leč dle monitorování síťových přenosů ve vývojářských nástrojích všech rozšířených prohlížečů to tak funguje jen v Opeře a Firefoxu; Internet Explorer a Google Chrome takto skrytý obrázek stáhnou. Řešení není ani naposicování elementu někam pryč (`position: absolute; left: -9999px; top: -9999px}`.

Všude funkční řešení je obrázek připojovat až při `:hover`u, tedy:
```
element {display: none}
element:hover {display: block; background: url(obrazek.png)}
```

### Funkční ukázka

.test span {display: none; width: 100px; height: 100px}
.test:hover span {display: block; background: url('http://jecas.cz/images/logo.png?smeti'); }

Načte se při `:hover`u