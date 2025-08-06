---
title: "Načtení obrázku, až když je potřeba"
headline: "Zpožděné načtení obrázku, až když je potřeba"
description: "Kromě potřeby nahrát obrázek dopředu (preload), aby byl v době použití 100% připravený, může být potřeba opačná – načíst jej, až v momentě, kdy je potřeba. Z důvodu nemrhání datovým přenosem."
date: "2013-05-16"
last_modification: "2013-05-16"
status: 1
tags: ["css", "hotova-reseni", "js", "lazy-loading"]
format: "html"
---

<h2 id=js>JavaScript</h2>
<p>V JS je situace poměrně jednoduchá. Stačí při vykonávání nějaké akce přidávat elementy s obrázky (<code>&lt;img&gt;</code>) nebo elementy s pozadím v CSS (<code>background</code>).</p>
<p>Například pro donačítání obrázků při dojetí na konec stránky (tzv. <b>lazy loading</b>) stačí porovnávat <code>offsetTop</code> a <code>scrollTop</code>:</p>
<pre><code>if (<i>element</i>.<b>offsetTop</b> &lt; document.documentElement.<b>scrollTop</b> + document.body.<b>scrollTop</b>) {
	// nějaká akce
}</code></pre>
<p>Sečtení <code>document.documentElement</code> s <code>document.body</code> slouží ke srovnání chování napříč prohlížeči.

<p>Existují i různá komplexnější řešení v jQuery, například:
<ul>
<li><a href='https://github.com/protonet/jquery.inview'>Element ‘inview’ Event Plugin</a> (<a href='http://tifftiff.de/jquery.inview/example/live_event.html'>demo</a>)
</ul>

<h2 id=css>CSS</h2>
<p>Máme-li třeba nějaké rozsáhlé <code>:hover</code> menu, kvůli kterému by by se zbytečně musel stahovat datově náročný obrázek, dává smysl jej načítat až při <i>použití</i>.

<h3 id=display-none>Použití <code>display: none</code></h3>
<pre><code>element {display: none; background: url(obrazek.png)}
element:hover {display: block}</code></pre>
<p>Nabízelo by se, že u elementu s <code>display: none</code> nebudou prohlížeče pozadí stahovat, leč dle monitorování síťových přenosů ve <a href='/vyvojarske-nastroje'>vývojářských nástrojích</a> všech rozšířených prohlížečů to tak funguje jen v Opeře a Firefoxu; Internet Explorer a Google Chrome takto skrytý obrázek stáhnou. Řešení není ani naposicování elementu někam pryč (<code>position: absolute; left: -9999px; top: -9999px}</code>.

<p>Všude funkční řešení je obrázek připojovat až při <code>:hover</code>u, tedy:
<pre><code>element {display: none}
element:hover {display: block; background: url(obrazek.png)}</code></pre>

<h3 id=ukazka>Funkční ukázka</h3>
<!-- Kód ukázky -->
<style>
.test span {display: none; width: 100px; height: 100px}
.test:hover span {display: block; background: url('http://jecas.cz/images/logo.png?smeti'); }
</style>

<button class='test'>Načte se při <code>:hover</code>u <span class='img'></span></button>
<!-- / konec ukázky -->