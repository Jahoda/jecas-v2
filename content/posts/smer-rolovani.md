---
title: "Detekce směru scrollování"
headline: "Zjištění směru rolování"
description: "Jak JavaScriptem zjistit, jakým směrem uživatel na stránce roluje."
date: "2014-09-23"
last_modification: "2014-09-23"
status: 1
tags: ["hotova-reseni", "js", "scroll"]
format: "html"
---

<h2 id="onscroll">Událost <code>onscroll</code></h2>

<p>JS událost, která se provede při každém <b>posunu po stránce</b>, se jmenuje <code>onscroll</code>.</p>

<pre><code>window.onscroll = function () {
  // kód se vykoná při rolování
}</code></pre>



<h2 id="scroll">Vlastnosti <code>scrollTop</code> a <code>scrollLeft</code></h2>
<p>Údaje o odrolování jsou ve vlastnostech:</p>

<ul>
  <li><code>scrollTop</code> – odrolováno <b>shora</b></li>
  <li><code>scrollLeft</code> – <b>zleva</b></li>
</ul>

<p>Pokud nás zajímá rolování vrámci celé stránky, budeme zjišťovat <code>scrollTop</code> a <code>scrollLeft</code> u elementu <code>&lt;body></code>.</p>

<pre><code>var zleva = document.documentElement.scrollLeft + document.body.scrollLeft;
var shora = document.documentElement.scrollTop + document.body.scrollTop;</code></pre>

<p>Proč se pro spočítání <code>scrollX</code> sčítá <code>document.body</code> s <code>document.documentElement</code>? Je to kvůli <b>Chrome</b>, kde je potřebná hodnota v <code>document.body.scrollX</code>, zatímco v ostatních prohlížečích v <code>document.documentElement.scrollX</code>.</p>



<h2 id="smer">Určení směru</h2>

<p>Směr rolování určíme na základě změny hodnot <code>zleva</code> a <code>shora</code> při porovnávání s předchozím rolováním.</p>

<ul>
  <li>V případě, že se nerovná minulá a současná <b>vodorovná</b> (<code>scrollLeft</code>) posice => roluje se do strany.</li>
  <li>V případě, že se nerovná minulá a současná <b>svislá</b> (<code>scrollTop</code>) posice => roluje se svisle.</li>
</ul>

<p>Porovnáním <b>větší</b>/<b>menší</b> potom zjistíme i směr.</p>

<p><a href="https://kod.djpw.cz/pwfb">Živá ukázka</a> (při rolování se vypíše směr)</p>