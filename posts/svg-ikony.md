---
title: "Jak správně používat SVG ikony"
headline: "Jak správně používat SVG ikony"
description: "Proč používat ikony v SVG a jak to udělat správně funkční ve všech prohlížečích od IE 9. Best-practice návod."
date: "2018-07-20"
last_modification: "2018-07-20"
status: 0
tags: []
format: "html"
---

<p>Používání ikon se historicky dost měnilo. Na začátku byly malované <a href="/obrazky#jpg">JPG obrázky</a> vložené značkou <code>&lt;img></code>, vystřídaly je PNG/GIF obrázky připojené CSS vlastností <code>background</code> (kvůli šetření počtu HTTP requestů potom spojené do <a href="/css-srite">jednoho spritu</a>), aby uvolnily místo používání <a href="/fonticony">font-ikon</a>.</p>


<h2 id="xlink"><code>xlink:href</code> vs. <code>href</code></h2>

<p>Specifikace SVG 2 <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/href">nahrazuje</a> <code>x:link:href</code> za prosté <code>href</code>.</p>

<p>Bohužel tento kratší zápis má horší podporu v prohlížečích – nefunguje např. v <b>Safari 11</b> (březen 2018), takže nezbývá než používat <code>xlink:href</code> nebo oboje.</p>

<div class="external-content">
  <ul>
    <li>StackOverflow: <a href="https://stackoverflow.com/questions/43961807/svg-use-not-working-in-safari">SVG use not working in Safari</a></li>
  </ul>
</div>

<h2 id="latte">Hotové řešení v Nette</h2>

<p>Uvedený postup je implementován jako Latte makro v balíčku <a href="https://github.com/dada-amater/latte-svg/">latte-svg</a>.</p>

<p>Požadovaná skupina ikon se připojí jako fallback pro starší IE:</p>

<pre><code>{svgFallback icon-group}</code></pre>

<p>Ikony se potom vkládají následujícím způsobem:</p>

<pre><code>{svg ikona, css-trida, skupina-ikon}</code></pre>


<h2 id="jak">Jak</h2>

<p>Preferuji externí SVG sprite, kde se jednotlivé ikonky vkládají přes „use“. S fallbackem pro IE, kde jsou všechny ikonky v HTML kódu.</p>

<p>Proč to má smysl i na HTTP/2? U spritu bývá typicky účinější gzip komprese, takže se ušetří data. Navíc ne všechny prohlížeče HTTP/2 podporují.</p>

<h2 id="vicebarevne">Vícebarevné ikony</h2>

<p>Někdy je potřeba, aby ikona měla víc barev.</p>

<p>Asi nejhezčí řešení pro ikony vkládané přes <code>&lt;use></code> jsou CSS proměnné. Nefungují ale v <b>IE 11</b>.</p>

<p>Možné řešení je vložit takovou ikonu celou do HTML kódu a jednotlivým částem měnit barvu vlastností <code>fill</code>.</p>

<p>Pokud stačí <b>vícebarevnost jen v jednom případě</b> a v případě druhém (např. po najetí myši) mohou být ikony jednobarevné, jde použít tak trochu hack v podobě CSS filtrů:</p>

<pre><code>.tlacitko:hover {
  background: black;
}
.tlacitko:hover .ikona {
  filter: brightness(0) invert(1);
}</code></pre>

<p><a href="http://kod.djpw.cz/xpvc">Živá ukázka</a></p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>
    <a href="https://frontstuff.io/multi-colored-svg-symbol-icons-with-css-variables">Multi-Colored SVG Symbol Icons with CSS Variables</a>
  </li>
</ul>