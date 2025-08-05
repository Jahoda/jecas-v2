---
title: "Plynulý přechod mezi stránkami"
headline: "Plynulý přechod mezi stránkami"
description: "Jak vytvořit plynulý animovaný přechod mezi dvěma stránkami."
date: "2014-08-16"
last_modification: "2014-08-20"
status: 1
tags: ["css", "hotova-reseni", "js", "webove-animace"]
format: "html"
---

<p>Snažíme-li se webovou stránku vytvářet s <b>ohledem na krásu</b> (s využitím <a href="/animace">animací</a> a různých <b>plynulých přechodů</b>), může působit přechod mezi dvěma stránkami lehce rušivě. Zvlášť potom u <b>komplikovanějších layoutů</b> lze pozorovat nepěkné probliknutí, než si prohlížeč <i>přechroupe</i> HTML, CSS a JavaScript.</p>

<p>První možnost, jak se tomuto vyhnout, je použít <a href="/ajax">AJAX</a> a veškerý obsah načítat <i>asynchronně</i>.</p>

<p>To díky <a href="/zmena-url"><code>history.pushState</code></a> sice jde řešit i s používáním normálních URL, ale stránka se stává <b>náchylnější k chybám</b>, kdy drobná chyba v JS může znefunkčnit celou navigaci na webu. Klasický přechod mezi stránkami je vlastně takový <b>restart</b> všech skriptů.</p>

<p>Kromě toho je <i>zajaxování</i> webu relativně pracné.</p>



<h2 id="skryti-zobrazeni">Skrytí a zobrazení animací</h2>

<p><img src="/files/plynuly-prechod/animovany-prechod.gif" alt="Plynulý přechod mezi stránkami" class="border"></p>

<p>Řešením proto může být:</p>

<ol>
  <li>Použití <b>skrývací</b> animace před opuštěním stránky.</li>
  <li>Použití <b>zobrazovací</b> animace na začátku načtení stránky.</li>
</ol>

<p>Potřebnou animaci stačí vytvořit pomocí <code>@keyframes</code> a přiřadit ji do vlastnosti <a href="/animation">animation</a>). <b>Zpětný průchod</b> animací zajistí klíčové slovo <code>reverse</code>.</p>

<p><i>Objevovací</i> animace se spustí při <b>načtení stránky</b>.</p>

<p>Animace <i>zmizení</i> bude vyvolána po kliknutí na odkaz mířící pryč. Získat všechny odkazy na stránce jde z <code>document.links</code>. Nabízelo by se možná použít událost <a href="/onbeforeunload"><code>onbeforeunload</code></a>, nicméně nejspíš ji nejde rozumně časovat, takže by nešlo garantovat přehrání ukončovací animace.</p>

<h2 id="ziva-ukazka">Živá ukázka</h2>

<ul>
  <li><a href="http://jecas.cz/animovany-prechod/">Živá ukázka</a></li>
  <li><a href="https://github.com/Jahoda/animovany-prechod">GitHub</a></li>
</ul>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://github.com/miguel-perez/smoothState.js">jquery.smoothState.js</a> (<a href="http://css-tricks.com/add-page-transitions-css-smoothstate-js/">použití v praxi</a>)</li>
</ul>