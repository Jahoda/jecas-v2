---
title: "Framework Zepto.js"
headline: "JavaScriptový framework Zepto.js"
description: "Odlehčená JS knihovna nabízející základní funkce jQuery ve zmenšené podobě."
date: "2013-05-15"
last_modification: "2013-05-15"
status: 1
tags: ["JavaScript", "Frameworky"]
---

Je-li potřeba na stránce při jejím *oživování*  využívat nějakou „nadstavbu“ JavaScriptu (typicky pro zkrácené zaměřování elementů pomocí `$("#id")`, používání AJAXu atd.) a stačí jen základní funkce z [knihovny jQuery](http://jquery.com/), může stejnou práci odvést [knihovna Zepto.js](http://zeptojs.com/).

Výhoda je, že knihovna Zepto (minifikovaná a gzipovaná) je až čtyřikrát menší než jQuery (minifikované a gzipované) a měla by tedy být rychlejší.

Že má Zepto podobné API s jQuery dokládá například možnost zvolit mezi oběma knihovnami u Magnific Popup lghtbox skriptu.

## Podpora Internet Exploreru

Na tu Zepto vesele resignuje:

Jen pro moderní prohlížeče, knihovna Zepto zastává názor neopravovat chyby pravěkých „prohlížečů“

Ostatně i 2.x verse jQuery je určena až pro IE 9 a novější.
Nicméně to nemusí být problém, Internet Explorery dostanou místo Zepto frameworku staré dobré jQuery a díky kompatibilitě by mohl web běhat jako na drátkách napříč prohlížeči.

## Pořád moc velké

V případě, že využijeme jen některé části frameworku, je možné si [vygenerovat variantu jen s něčím](http://github.e-sites.nl/zeptobuilder/).

Nebo rovnou **používat čistý JavaScript**. Pro pohodlné vybírání elementů může posloužit [metoda `querySelector`](/queryselector#dolar) a třeba [AJAX](/ajax) řeší pár řádků prostého JavaScriptu.