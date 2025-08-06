---
title: "Maximální počet CSS selektorů"
headline: "Maximální možný počet CSS selektorů"
description: "Jaké jsou v prohlížečích omezení pro velikost (složitost) CSS souborů."
date: "2018-03-08"
last_modification: "2018-03-12"
status: 1
tags: ["css", "selektory-css", "webove-prohlizece"]
format: "html"
---

<p>V praxi na to většina lidí nejspíš nenarazí, ale existují jisté limity pro počet CSS selektorů.</p>

<h2 id="ie9">Internet Explorer 9 a starší</h2>

<p>Aktuálně je limituje hlavně <b>IE 9</b> (a nižší) s maximálním počtem <b>4095</b> selektorů. Další selektor v pořadí již bude ignorován.</p>

<p>Tento limit je většinou dostatečný, nicméně pro složitější a rozsáhlejší weby už nemusí stačit. Zvlášť při použití nějakého CSS <a href="/knihovny">frameworku</a> nebo při generování CSS se počet selektorů může tomuto limitu přiblížit.</p>

<p>Spočítat CSS selektory dokáže např. následující nástroj:</p>

<div class="external-content">
  <ul>
    <li><a href="http://snippet.bevey.com/css/selectorCount.php">CSS selector counter</a></li>
  </ul>
</div>

<p>Do tohoto limitu se podle všeho nepočítají <a href="/media"><code>@media</code></a> pravidla:</p>

<div class="external-content">
  <ul>
    <li>StackOverflow: <a href="https://stackoverflow.com/questions/25052610/how-are-media-queries-counted-in-ies-css-selectors-limit">How are media queries counted in IE's CSS selectors limit?
</a></li>
  </ul>
</div>


<p>V případě, že je selektorů 4096 a víc, nezbývá než je rozdělit do více souborů. Zde jsou limity následující:</p>

<ul>
  <li>lze připojit až 31 externích stylů,</li>
  <li>každý styl může přes <code>@import</code> připojit dalších 31 externích stylů,</li>
  <li><code>@import</code>y lze zanořovat do 4 úrovní</li>
</ul>

<p>Z toho plyne, že při rozdělování je limit dostatečný.</p>

<h3 id="automatisace">Automatisace limitu</h3>

<p>Pokud se všechny styly <a href="/slouceni-js-css">spojují do jednoho souboru</a> a hrozí, že by se počet selektorů přiblížil hranici 4095, může se hodit Node.js plugin <a href="https://github.com/accordionpeas/css-selector-limit">css-selector-limit</a>.</p>


<h2 id="nove">Nové prohlížeče</h2>

<p>Od <b>IE 10</b> jsou limity vyšší — selektorů může být až <b>65 534</b>. Dále platí:</p>

<ul>
  <li>připojit jde až 4095 externích stylů,</li>
  <li>každý může na<code>@import</code>ovat dalších 4095,</li>
  <li>zanořovat <code>@import</code>y jde do 4095 úrovní</li>
</ul>


<div class="external-content">
  <ul>
    <li>IEInternals: <a href="https://blogs.msdn.microsoft.com/ieinternals/2011/05/14/stylesheet-limits-in-internet-explorer/">Stylesheet Limits in Internet Explorer</a></li>
  </ul>
</div>



<p>Pro ostatní prohlížeče se mi žádné přesné limity nepodařilo dohledat.</p>

<p>Zdá se, že počet 4096 je relativně bezpečný.</p>

<p>V <b>Chrome</b> může záležet také na délce selektoru, navíc bývá problém u selektorů na jednom řádku. Takže místo:</p>

<pre><code>.selektor1, .selektor2, …, .selektor1000 {}</code></pre>




<p>Pomůže napsat:</p>

<pre><code>.selektor1,
.selektor2,
…,
.selektor1000 {}</code></pre>

<div class="external-content">
  <ul>
    <li>StackOverflow: <a href="https://stackoverflow.com/questions/20828995/how-long-can-a-css-selector-be">How long can a CSS selector be?
</a></li>
  </ul>
</div>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Space Ninja: <a href="https://spaceninja.com/2015/03/31/ie-css-limits/">The Many Exciting CSS Limits of Internet Explorer</a></li>
</ul>