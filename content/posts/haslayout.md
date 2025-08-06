---
title: "IE hasLayout"
headline: "Vlastnost <code>hasLayout</code>"
description: "Co je zač CSS vlastnost <code>hasLayout</code> a k čemu ji využít."
date: "2013-10-02"
last_modification: "2013-10-04"
status: 1
tags: ["css", "hacky"]
format: "html"
---

<p>Týká se <b>jen Internet Explorerů</b>, oficiální definice zní: <i>hodnota indikuje, zda má element „layout“</i>. To není nic moc jasného.
<p>Osobně bych to popsal jako takovou <b>magickou vlastnost</b>, kterou má smysl zkusit zapnout jako poslední možnost při vytváření webu, když se v Internet Exploreru na rozdíl od ostatních prohlížečů <b>něco špatně zobrazuje</b>.</p>

<p>Někdy zapnutí <code>hasLayout</code>u umožní, co by jinak nešlo. Třeba:</p>
<ul>
  <li>nabídne další <a href="/float#after">způsob clearování</a>,</li>
  <li>umožní z výchozích blokových elementů udělat <a href="/centrovani#rozdily-inline-block"><code>inline-block</code></a>.</li>
</ul>

<h2 id="html">HTML značky s layoutem</h2>
<p>Ve výchozím stavu mají <code>hasLayout</code> zapnutý značky <code>&lt;html&gt;</code>, <code>&lt;body&gt;</code>, tabulky, obrázky (<code>&lt;img&gt;</code>), <code>&lt;iframe&gt;</code>, formulářové prvky a ještě pár zpravidla obstrarožních elementů.</p>
<p><b>Běžně používané značky</b> jako odkazy (<code>&lt;a&gt;</code>), <code>&lt;div&gt;</code>y, <code>&lt;span&gt;</code>y nebo <b>odstavce</b> (<code>&lt;p&gt;</code>) <code>hasLayout</code> zapnutý nemají.</p>

<h2 id="css">CSS vlastnosti zapínající layout</h2>
<p>Pro elementy, co mají <code>hasLayout</code> ve výchozím stavu vypnutý, existuje jeho <b>zapnutí přes CSS</b>. Není na to nějaké přepínátko, ale <code>hasLayout</code> zapínají <b>určité vlastnosti</b>.</p>

<p>Může to být <b>výška</b> (<code>height</code>), <b>šířka</b> (<code>width</code>), <b>obtékání</b> (<code><a href="/float">float</a></code>), <code>display: inline-block</code>, <b>absolutní posicování</b> (<code><a href="/position#absolute">position: absolute</a></code>) nastavené na <b>jinou než výchozí hodnotu</b> nebo <b>svislý</b> (od 90° pootočený) <b>text</b> — <code>writing-mode: tb-rl</code>.</p>
<p>Nakonec <b>zapnout layout</b> umí ještě vlastnost <code>zoom</code> — ta je výhodná v tom, že při nastavení na <code>1</code> nic neovlivní (<small>pokud se tedy dříve nepoužívala ke skutečnému zoomování</small>), ale jen zapne <code>hasLayout</code>.</p>

<pre><code>element {
  zoom: 1;
}</code></pre>

<p>Teoreticky by se mohla zapsat jen pro IE <a href="/podminene-komentare">podmíněným komentářem</a> (pokud nemá řvát CSS validátor) nebo nějakým jiným hackem (třeba rovnítkovým — <code>=zoom: 1</code> — to už ale validátor neumlčí). Nicméně neexplorerové ji ignorují, takže nevadí ani v originální podobě.</p>

<h2 id="odkazy">Odkazy</h2>
<ul>
  <li>Vlastnost <code>hasLayout</code> na <a href="http://msdn.microsoft.com/en-us/ie/ms530764(v=vs.85)">MSDN</a></li>
</ul>
