---
title: "CSS 3 selektory v IE 6, 7, 8"
headline: "CSS 3 selektory ve starých IE"
description: "Doplnění podpory CSS 3 selektorů do starých prohlížečů pomocí JavaScriptu."
date: "2013-06-22"
last_modification: "2013-09-25"
status: 1
tags: ["css", "selektory-css", "webove-prohlizece"]
format: "html"
---

<p>Pokročilejší <a href="/css-selektory">CSS 3 selektory</a> fungují často až v novějších Internet Explorerech (např. od verse 9). Kromě řešení ve stylu <i>vystačit si se základními selektory</i> (což, mimochodem, nemusí být špatná volba — podobně jako u <a href="/vlastni-html-znacky">používání vlastních HTML značek</a>). Existuje ještě možnost <b>doplnit podporu JavaScriptem</b>.</p>

<h2 id="selectivizr">Selectivizr</h2>
<p><a href="http://selectivizr.com/" class="button">Stránka projektu :select[ivizr]</a></p>
<p>Selectivizr funguje velmi jednoduše. Stačí připojit v požadovaných prohlížečích (tj. <a href="/podminene-komentare">podmíněnými komentáři</a> <i>obalený</i>) speciální JS soubor, který se o vše postará.</p>

<pre><code>&lt;!--[if (gte IE 6)&(lte IE 8)]>
   &lt;script type="text/javascript" src="selectivizr.js">&lt;/script>
&lt;![endif]--></code></pre>

<p>Zároveň <b>Selectivizr</b> vyžaduje nějakou z JS knihoven — podpora nejvíce selektorů je s frameworkem <a href="http://mootools.net/">Mootools</a> nebo <a href="http://javascript.nwbox.com/NWMatcher/">NWMatcher</a>. To je bohužel další argument <b>snažit se si bez pokročilých selektorů vystačit</b>. Vyplatí se ušetřit si pár běžných selektorů tříd, ale nutit uživatele starších prohlížečů <b>stahovat knihovnu + opravující skript</b> a tím ještě <b>brzdit obstarožní prohlížeč</b>?</p>

