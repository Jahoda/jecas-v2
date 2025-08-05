---
title: "CSS mixiny pomocí @apply"
headline: "CSS mixiny pomocí <code>@apply</code>"
description: "Pomocí pravidla <code>@apply</code> jde v CSS vytvářet vlastní mixiny."
date: "2016-04-19"
last_modification: "2016-06-04"
status: 1
tags: ["css", "css-funkce"]
format: "html"
---

<p>Tzv. <b>CSS preprocesory</b> nabízí jako jednu z výhod oproti čistému CSS <i>mixiny</i>. Jedná se o znovupoužitelné kusy CSS pravidel, které jde přiřazovat požadovaným selektorům.</p>

<p>Změny jde potom provádět na jednom místě a kód se nemusí opakovat.</p>





<h2 id="zapis">Zápis</h2>

<p>Nejprve je potřeba mixin deklarovat:</p>

<pre><code>:root {
  --velky-cerveny: {
    color: red;
    font-size: 200%;
  }
}</code></pre>













<p>Následně se zmíněná pravidla aplikují na kýžený selektor takto:</p>

<pre><code>h1 {
  @apply --velky-cerveny
}</code></pre>










<h2 id="podpora">Podpora</h2>

<p>Pravidlo <code>@apply</code> nemá v roce 2016 rozumnou podporu v prohlížečích.</p>

<div class="external-content">
  <ul>
    <li>Chrome Platform Status: <a href="https://www.chromestatus.com/feature/5753701012602880">CSS @apply Rule
</a> (Behind a flag in desktop Chrome 51)</li>
  </ul>
</div>

<p>Při používání PostCSS je ale možné použít plugin, kterou syntaxi s <code>@apply</code> převede do kompatibilní podoby:</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/pascalduez/postcss-apply">postcss-apply</a></li>
  </ul>
</div>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Specifikace: <a href="http://tabatkins.github.io/specs/css-apply-rule/">CSS @apply Rule</a></li>
  
  <li><a href="https://blog.gospodarets.com/css_apply_rule">CSS @apply rule (native CSS mixins) </a></li>
  
  <li><a href="http://zeke.sikelianos.com/css-from-the-future/">CSS from the Future</a></li>
</ul>