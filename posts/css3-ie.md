---
title: "CSS 3 selektory v IE 6, 7, 8"
headline: "CSS 3 selektory ve starých IE"
description: "Doplnění podpory CSS 3 selektorů do starých prohlížečů pomocí JavaScriptu."
date: "2013-06-22"
last_modification: "2013-09-25"
status: 1
tags: ["CSS", "CSS selektory", "Prohlížeče"]
---

Pokročilejší [CSS 3 selektory](/css-selektory) fungují často až v novějších Internet Explorerech (např. od verse 9). Kromě řešení ve stylu *vystačit si se základními selektory* (což, mimochodem, nemusí být špatná volba — podobně jako u [používání vlastních HTML značek](/vlastni-html-znacky)). Existuje ještě možnost **doplnit podporu JavaScriptem**.

## Selectivizr

[Stránka projektu :select[ivizr]](http://selectivizr.com/)

Selectivizr funguje velmi jednoduše. Stačí připojit v požadovaných prohlížečích (tj. [podmíněnými komentáři](/podminene-komentare) *obalený*) speciální JS soubor, který se o vše postará.

```
&lt;!--[if (gte IE 6)&(lte IE 8)]>
   &lt;script type="text/javascript" src="selectivizr.js">&lt;/script>
&lt;![endif]-->
```

Zároveň **Selectivizr** vyžaduje nějakou z JS knihoven — podpora nejvíce selektorů je s frameworkem [Mootools](http://mootools.net/) nebo [NWMatcher](http://javascript.nwbox.com/NWMatcher/). To je bohužel další argument **snažit se si bez pokročilých selektorů vystačit**. Vyplatí se ušetřit si pár běžných selektorů tříd, ale nutit uživatele starších prohlížečů **stahovat knihovnu + opravující skript** a tím ještě **brzdit obstarožní prohlížeč**?