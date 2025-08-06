---
title: "Rychlost a náročnost transition: all"
headline: "Výkon animací s <code>transition: all</code>"
description: "Je lepší psát <code>transition: all</code>, nebo vyjmenovávat vlastnosti, které se mají animovat?"
date: "2017-02-23"
last_modification: "2017-04-26"
status: 1
tags: ["css", "css-vlastnosti", "napady"]
format: "html"
---

<p>Pomocí CSS vlastnosti <a href="/transition"><code>transition</code></a> jde snadno vytvářet plynulé přechody mezi stavy přímo v CSS.</p>

<p>Následující kód způsobí, že po najetí bude <a href="/odkaz">odkaz</a> plynule přebarven z červené na modrou:</p>

<pre><code>a {
  color: red;
  transition: color .3s;
}
a:hover {
  color: blue;
}</code></pre>












<p>Při animování většího počtu CSS vlastností jde uvést klíčové slovo <code>all</code>:</p>

<pre><code>transition: <b>all</b> .3s;</code></pre>







<p>Odpadá tak nutnost vyjmenovávat více vlastností, co se mají animovat.</p>

<pre><code>transition: color .3s, opacity .3s, background-color .3s</code></pre>









<h2 id="rychlost">Rychlost</h2>

<p>Mohlo by se zdát, že vyjmenování všech vlastností, které se mají animovat, bude úspornější k systémovým prostředkům.</p>

<p>Podle mých testů (při <a href="/vykreslovani#mereni">měření v DevTools → <i>Timeline</i></a>) je ale rozdíl mezi vyjmenováním hodnot a použitím <code>all</code> naprosto zanedbatelný, navíc použití <code>all</code> je <b>nepatrně rychlejší</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/offc-">Živá ukázka #1</a> – animace tří CSS vlastností klíčovým slovem <code>all</code></li>
    
    <li><a href="https://kod.djpw.cz/pffc-">Živá ukázka #2</a> – totožná animace s výčtem vlastností</li>
  </ul>
</div>

<p>Zdá se tedy, že prohlížeče dokáží rozpoznat, které vlastnosti je možné animovat a zároveň u nich nastala změna.</p>

<h2 id="vyhody">Výhody <code>transition: all</code></h2>

<p>Otázka výkonu je tedy zanedbatelná.</p>

<p>Zajímavější je:</p>

<ol>
  <li>
    <p><b>stručnější zápis</b> – není potřeba všechny vlastnosti vyjmenovávat,</p>
  </li>
  <li>
    <p><b>společná délka animace</b> – většinou je žádoucí mít všechny přechody stejně dlouhé; potom není nutné dobu uvádět duplicitně,</p>
  </li>
  <li>
    <p><b>automatické přechody</b> – po přidání nové animovatelné vlastnosti bude automaticky animovaná</p>
  </li>
</ol>


<h2 id="nepouzivat">Proč nepoužívat <code>transition: all</code></h2>

<p>Důvody, proč se automatickému animování všeho co jde vyhnout, plynou z podstaty chování <code>transition: all</code>.</p>

<ol>
  <li>
    <p>Potřeba animovat jen něco. Použití <code>all</code> může zanimovat i vlastnosti, které se animovat nemají.</p>
  </li>
  <li>
    <p>Animovat různé vlastnosti různou dobu.</p>
  </li>
  <li>
    <p>Při vyjmenování vlastností může být kód čitelnější (je jasné, co má autor zájem animovat).</p>
  </li>
</ol>