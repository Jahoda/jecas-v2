---
title: "Proměnné v CSS"
headline: "Proměnné v CSS – <code>var()</code>"
description: "Proměnné přímo v CSS přes funkci <code>var()</code>."
date: "2013-12-17"
last_modification: "2013-12-17"
status: 1
tags: ["css", "css-funkce"]
format: "html"
---

<p><b>Firefox 29</b> začal podporovat deklaraci a používání proměnných přímo v <b>čistém CSS</b> (bez CSS preprocesorů).</p>

<h2 id="pouziti">Použití</h2>
<ol>
  <li>
    <p>Nejprve je potřeba proměnnou <b>nadeklarovat</b>:</p>
    <pre><code>body {
  <b>var-</b><i>promenna</i>: 1em;
}</code></pre>
    <p>To se dělá klíčovým slovem <code>var</code>, spojovníkem a samotným názvem.</p>
  </li>
  
  <li>
    <p>Při použití se jako hodnota CSS vlastnosti proměnná vyvolá.</p>
    <pre><code>p {
  padding: <b>var</b>(<i>promenna</i>);
}</code></pre>  
    <p><a href="https://kod.djpw.cz/uzx">Ukázka</a></p>
  </li>
</ol>

<h2 id="vlastnosti">Vlastnosti CSS proměnných</h2>

<h3 id="dedicnost">Dědičnost</h3>
<p>I proměnné se v CSS <b>dědí</b>. Aby u nějakého elementu šla proměnná vyvolat, musí být deklarována u rodiče. Pro proměnné platné napříč <b>celým dokumentem</b> se hodí použít selektor značky <code>&lt;html></code> (nebo <a href="/css-selektory#korenovy"><code>:root</code></a>).</p>

<h3 id="prebijeni">Přebíjení proměnných</h3>
<p>Podobně funguje i <b>přebíjení</b>. Hodnotu proměnné je možné libovolně přepisovat. Projeví se ale jen v potomcích elementu, který ji <b>přepisuje</b>.</p>

<p>Na následující <a href="https://kod.djpw.cz/wzx">ukázce</a> proto bude v <b>prohlížeči podporujícím proměnné</b> prostřední odstavec modře orámován.</p>

<h3 id="nedeklarovana">Nenastavená proměnná</h3>
<p>V případě, že proměnná, kterou chceme pomocí <code>var()</code> vyvolat, neexistuje, je možné uvést <i>fallback</i> jako druhý argument této funkce:</p>

<pre><code>p {
  color: var(neexistuje, green);
}</code></pre>

<p>Pokud proměnná <code>neexistuje</code> nebude existovat, barva se nastaví na <code>green</code>.</p>

<h3 id="funkce">Používání s dalšími CSS funkcemi</h3>
<p>Proměnné je možné propojit třeba s <a href="/calc">funkcí <code>calc()</code></a> a rozměry počítat <b>násobením</b> nějaké základní hodnoty (<a href="https://kod.djpw.cz/aay">ukázka</a>).</p>

<pre><code>:root {var-hodnota: 100px}
p {width: calc(var(hodnota) * 2)}</code></pre>

<p>Naopak používání <code>calc()</code> při deklarování proměnných, zdá se, zatím nefunguje.</p>

<h2 id="js">CSS proměnné a JavaScript</h2>
<p>S CSS proměnnými by mělo jít manipulovat pomocí JavaScriptu (<code>style.var</code>).</p>

<dl>
  <dt id="get"><code>get</code></dt>
  <dd>
    <p>Získat <b>hodnotu</b> proměnné u <code>element</code>u zařídí:</p>
    <pre><code>element.style.var.get("promenna");</code></pre>
  </dd>
  
  <dt id="set"><code>set</code></dt>
  <dd>
    <p>Nastaví CSS proměnnou:</p>
    <pre><code>element.style.var.set("promenna", "hodnota");</code></pre>
  </dd>
  
  <dt id="has"><code>has</code></dt>
  <dd>
    <p>Zkontroluje, jestli má element proměnnou nastavenou:</p>
    <pre><code>if (element.style.var.has("promenna")) {
  // má proměnnou „promenna“
}</code></pre>
  </dd>
  
  <dt id="delete"><code>delete</code></dt>
  <dd>
    <p>Odstraní proměnnou s daným názvem.</p>
    <pre><code>element.style.var.delete("promenna");</code></pre>
  </dd>
</dl>

<!-- Přepínání vzhledu: https://kod.djpw.cz/jhpc -->
