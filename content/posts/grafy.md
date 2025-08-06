---
title: "JS grafy na webu"
headline: "Vytváření grafů v JavaScriptu"
description: "Snadná tvorba sloupcových, koláčových a dalších (i animovaných) grafů v JavaScriptu."
date: "2013-07-03"
last_modification: "2014-08-29"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Chceme-li stránku oživit nějakým <b>grafem</b> místo <i>nudného</i> výpisu čísel, existují různé možnosti.</p>
<ol>
  <li>Vygenerovat obrázek grafu <b>na straně serveru</b>.</li>
  <li><a href="/css-kresleni">Nakreslit</a> graf v HTML a CSS. Pro sloupcové grafy je to <a href="/progress">docela jednoduché</a>. I komplikovanější grafy je možné nakreslit po kouskách spousty pár-pixelovými elementy (<a href="https://kod.djpw.cz/ivc">ukázka</a>).</li>
  <li>Použít <b>hotové JS řešení</b>, kterému se jen předhodí data a o vykreslení grafu je postaráno.</li>
</ol>

<p>Existují různá hotová řešení, která působivě vypadající graf včetně animace dokáží po předání dat vytvořit. Většinou se používá <a href="/svg"><b>SVG</b></a> nebo <a href="/canvas"><code>&lt;canvas></code></a>.</p>



<h2 id="chart-js">Chart.js</h2>
<p><img class="border" src="/files/grafy/chart-js.png" alt="Graf v Chart.js"></p>
<p>Umožňuje grafy rozanimovat, když se na ně odroluje.</p>

<p><a class=button href="http://www.chartjs.org/">Web</a></p>
























<h2 id="google-charts">Google Charts</h2>
<p><img class="border" src="/files/grafy/google-charts.png" alt="Graf v Google Charts"></p>

<p>Komplexní nástroj Googlu se spousty možnostmi.</p>

<p><a href="https://developers.google.com/chart/" class="button">Web</a></p>





<!--
<h2 id="timechart">Timechart</h2>

<p><img class="border" src="/files/grafy/timechart.png" alt="Graf v Timechart"></p>

<p>Hodí se pro vytváření grafů, jak už název napovídá, které znázorňují nějaký vývoj v čase.</p>

<p><a class=button href="http://timechart.toolset.io/">Web</a></p>
-->







<h2 id="chartmander">Chartmander</h2>

<p><img class="border" src="/files/grafy/chartmander.png" alt="Graf v Chartmander"></p>

<ul>
  <li>animace,</li>
  <li>popisky,</li>
  <li>používá <code>&lt;canvas></code></li>
</ul>

<p><a href="http://11th.github.io/Chartmander/" class="button">Web</a></p>



























<h2 id="highcharts">Highcharts</h2>

<p><img class="border" src="/files/grafy/highcharts.png" alt="Graf v Chartmander"></p>

<ul>
  <li>Používá SVG,</li>
  <li>hodně pokročilý nástroj, který nabízí graf snad na všechno,</li>
  <li>umí i vytvářet graf <a href="http://www.highcharts.com/demo/column-parsed">přímo z HTML tabulky</a>,</li>
  <li>pro <b>nekomerční weby zdarma</b>.</li>
</ul>

<p><a href="http://www.highcharts.com/" class="button">Web</a> <a href="http://www.highcharts.com/demo/" class="button">Dema</a></p>














<h2 id="brace-charts">Brace Charts</h2>
<p><img class="border" src="/files/grafy/brace-charts.png" alt="Graf s použitím Brace Charts"></p>

<ul>
  <li>Jednoduché grafy, které se dají vyvářet prostým připojením obrázku a předáním parametrů do jeho URL.</li>
  <li>Výsledné obrázky jsou v SVG.</li>
  <li>10 000 zobrazení je zdarma.</li>
</ul>

<div class="live">
  <img src="http://chartspree.io/pie.svg?Things=5&Stuff=2" width="100">
</div>

<p><a href="https://github.com/asm-products/chartspree" class="button">Web</a></p>
















<h2 id="c3js">C3.js</h2>

<p>Různé typy grafů si je možné prohlédnout na stránce <a href="http://c3js.org/examples.html">příkladů</a>.</p>

<p><img class="border" src="/files/grafy/c3js.png" alt="Graf s použitím C3.js"></p>

<p><a href="http://c3js.org/" class="button">Web</a></p>






















<h2 id="chartist-js">CHARTIST.JS</h2>

<p>Responsivní SVG grafy s možností CSS animací.</p>

<p><img class="border" src="/files/grafy/chartist-js.png" alt="Graf s použitím CHARTIST"></p>

<p><a href="http://gionkunz.github.io/chartist-js/index.html" class="button">Web</a></p>






















<h2 id="metricsgraphics">MetricsGraphics.js</h2>

<p>Knihovna využívající <a href="http://d3js.org/">D3</a> je vhodná pro presentaci dat závislých na čase.</p>

<p><img src="/files/grafy/metricsgraphics.png" alt="MetricsGraphics.js" class="border"></p>

<p><a href="http://metricsgraphicsjs.org/" class="button">Web</a></p>
















<h2 id="echarts">ECharts</h2>

<p>Grafy pro velká data. Funguje od <b>IE 6</b>.</p>

<p><img src="/files/grafy/echarts.png" alt="ECharts" class="border"></p>

<p><a href="http://echarts.baidu.com/index-en.html" class="button">Web</a></p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://www.sitepoint.com/twelve-javascript-libraries-data-visualization/">12 JavaScript Libraries for Data Visualization</a></li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/15-best-javascript-charting-libraries/">The 15 Best JavaScript Charting Libraries</a></li>
</ul>