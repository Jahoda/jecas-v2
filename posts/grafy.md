---
title: "JS grafy na webu"
headline: "Vytváření grafů v JavaScriptu"
description: "Snadná tvorba sloupcových, koláčových a dalších (i animovaných) grafů v JavaScriptu."
date: "2013-07-03"
last_modification: "2014-08-29"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Chceme-li stránku oživit nějakým **grafem** místo *nudného* výpisu čísel, existují různé možnosti.

  - Vygenerovat obrázek grafu **na straně serveru**.

  - [Nakreslit](/css-kresleni) graf v HTML a CSS. Pro sloupcové grafy je to [docela jednoduché](/progress). I komplikovanější grafy je možné nakreslit po kouskách spousty pár-pixelovými elementy ([ukázka](http://kod.djpw.cz/ivc)).

  - Použít **hotové JS řešení**, kterému se jen předhodí data a o vykreslení grafu je postaráno.

Existují různá hotová řešení, která působivě vypadající graf včetně animace dokáží po předání dat vytvořit. Většinou se používá [**SVG**](/svg) nebo [`&lt;canvas>`](/canvas).

## Chart.js

Umožňuje grafy rozanimovat, když se na ně odroluje.

[Web](http://www.chartjs.org/)

## Google Charts

Komplexní nástroj Googlu se spousty možnostmi.

[Web](https://developers.google.com/chart/)

Hodí se pro vytváření grafů, jak už název napovídá, které znázorňují nějaký vývoj v čase.

[Web](http://timechart.toolset.io/)

-->

## Chartmander

  - animace,

  - popisky,

  - používá `&lt;canvas>`

[Web](http://11th.github.io/Chartmander/)

## Highcharts

  - Používá SVG,

  - hodně pokročilý nástroj, který nabízí graf snad na všechno,

  - umí i vytvářet graf [přímo z HTML tabulky](http://www.highcharts.com/demo/column-parsed),

  - pro **nekomerční weby zdarma**.

[Web](http://www.highcharts.com/) [Dema](http://www.highcharts.com/demo/)

## Brace Charts

  - Jednoduché grafy, které se dají vyvářet prostým připojením obrázku a předáním parametrů do jeho URL.

  - Výsledné obrázky jsou v SVG.

  - 10 000 zobrazení je zdarma.

[Web](https://github.com/asm-products/chartspree)

## C3.js

Různé typy grafů si je možné prohlédnout na stránce [příkladů](http://c3js.org/examples.html).

[Web](http://c3js.org/)

## CHARTIST.JS

Responsivní SVG grafy s možností CSS animací.

[Web](http://gionkunz.github.io/chartist-js/index.html)

## MetricsGraphics.js

Knihovna využívající [D3](http://d3js.org/) je vhodná pro presentaci dat závislých na čase.

[Web](http://metricsgraphicsjs.org/)

## ECharts

Grafy pro velká data. Funguje od **IE 6**.

[Web](http://echarts.baidu.com/index-en.html)

## Odkazy jinam

  - [12 JavaScript Libraries for Data Visualization](http://www.sitepoint.com/twelve-javascript-libraries-data-visualization/)

  - Sitepoint: [The 15 Best JavaScript Charting Libraries](http://www.sitepoint.com/15-best-javascript-charting-libraries/)