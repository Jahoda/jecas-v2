---
title: "Box-sizing"
headline: "Box-sizing"
description: "CSS vlastnost <code>box-sizing</code> dokáže změnit vypočítávání rozměrů boxu."
date: "2014-01-27"
last_modification: "2014-01-27"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<h2 id="content-box"><code>content-box</code></h2>

<p>Ve <a href="/doctype">standardním režimu</a> se ve výchozím stavu počítají rozměry boxů tak, že se k nastavené šířce přičte šířka okraje (<code>padding</code>) a tloušťka rámečku (<code>border-width</code>) — nazývá se to modelem <b>obsahovým</b> (<code>box-sizing: <b>content</b>-box</code>).</p>

<p>Následující element tedy bude mít výslednou šířku 112 pixelů (1 + 5 + 100 + 5 + 1).</p>

<pre><code>element {width: 100px; padding: 5px; border: 1px solid #000}</code></pre>

<h2 id="border-box"><code>border-box</code></h2>
<p>Druhý typ počítání (a v mnoha situacích výhodnější) je <code>box-sizing: <b>border</b>-box</code> — tzv. <b>okrajový box-model</b>. Při jeho aplikování na výše uvedený kód získáme element o šířce přesně 100 pixelů. A šířky <code>padding</code>u a <code>border</code>u se promítnou <i>dovnitř</i> elementu. Tedy pro samotný obsah zbude 88 pixelů (100 - 1 - 5 - 5 - 1).</p>

<p>Změna <a href="/box-model">box modelu</a> vlastností <code>box-sizing</code> funguje od <b>IE 8</b> (do <b>Firefoxu 28</b> pouze s <a href="/css-prefixy"><code>-moz-</code> prefixem</a>). Kvůli historickým Webkitům můžeme přidat prefix i pro ně.</p>

<pre><code>element {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}</code></pre>

<h3 id="pro-vsechny">Okrajový box model pro všechny elementy</h3>
<p>V případě, že řešíme správné zobrazení od <b>IE 8</b> včtetně, můžeme si pomocí <a href="/css-selektory#hvezdickovy">hvězdičkového selektoru</a> box model přepnout na <code>border-box</code> i při zachování standardního režimu.</p>

<pre><code>*, *:after, *:before {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}</code></pre>

<p>V <b>IE 7</b> a starších je možné okrajového modelu dosáhnout v quirk režimu, což ale znemožní využívat funkcí, které fungují jen v režimu standardním. Takže to se moc nevyplatí.</p>