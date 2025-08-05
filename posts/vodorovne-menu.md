---
title: "Vodorovné menu"
headline: "Horizontální navigace"
description: "Různé možnosti, jak vytvořit vodorovné menu s odkazy vedle sebe."
date: "2013-10-26"
last_modification: "2013-10-27"
status: 1
tags: ["css", "hotova-reseni", "menu"]
format: "html"
---

<p>Asi nejjednodušší možnost vytvoření navigace s odkazy vedle sebe je prosté <i>naházení</i> odkazů do <code>&lt;div&gt;</code>u.</p>

<script>
  function trida(el, trida) {
    if (el.className.match(trida)) {
      el.className = el.className.replace(trida, "");
    }
    else {
      el.className += " " + trida;
    }
  }
</script>

<div class="live">
  <style>
    .nepodtrhnout a {text-decoration: none; border-bottom: 0}
    .barvy a {background: #fff}
    .padding a {padding: .3em}
    .vycentrovat {text-align: center}
  </style>
  <div class="menu" id="menu1">
    <a href="#">Odkaz</a>
    <a href="#">Odkaz</a>
    <a href="#">Odkaz</a>
    <a href="#">Odkaz</a>
    <a href="#">Odkaz</a>
  </div>
  <script>
    var menu1 = document.getElementById("menu1");
  </script>
</div>

<p>To není úplně špatné:</p>
<ul>
  <li>jednotlivé odkazy můžeme <button onclick="trida(menu1, 'nepodtrhnout')">zbavit podtržení</button> (<code>text-decoration: none</code>),</li>
  <li>nějak hezky <button onclick="trida(menu1, 'barvy')">obarvit</button> (<code>background: #fff</code>),</li>
  <li>přidat <button onclick="trida(menu1, 'padding')">odsazení</button> (<code>padding: .3em</code>),</li>
  <li>nebo <button onclick="trida(menu1, 'vycentrovat')">položky vycentrovat</button> (<code>text-align: center</code> pro nadřazený element)</li>
</ul>

<p>Jakmile ale bude potřeba <b>měnit výšku nebo šířku</b> jednotlivých odkazů, narazíme na problém, protože odkazy jsou řádkové. Naštěstí existují způsoby, jak dostat vedle sebe i bloky.</p>

<h2 id="inline-block">Inline-block</h2>
<p>Přidáním <code>display: inline-block</code> pro získáme <b>výhodu řádkových i blokových elementů</b> najednou.</p>

<div class="live">
  <style>
    .menu2 a {text-decoration: none; border-bottom: 0; background: #fff; padding: .3em; display: inline-block}
    .vycentrovat {text-align: center}
    .rozmery a {width: 100px; line-height: 40px}
  </style>
  <div class="menu2" id="menu2">
    <a href="#">Odkaz</a>
    <a href="#">Odkaz</a>
    <a href="#">Odkaz</a>
    <a href="#">Odkaz</a>
    <a href="#">Odkaz</a>
  </div>
  <script>
    var menu2 = document.getElementById("menu2");
  </script>
</div>

<p>Vše bude fungovat jako dřív a navíc půjde <button onclick="trida(menu2, 'rozmery')">měnit rozměry</button>. Bezproblémové <button onclick="trida(menu2, 'vycentrovat')">centrování</button> je samozřejmost.</p>

<h2 id="float">Obtékání</h2>
<p>Druhá možnost je položky menu nechat <a href="/float">obtékat</a>. Nicméně nevidím důvod pro použití obtékání místo řešení s <code>inline-block</code>. Nenapadá mě žádná výhoda takového postupu.</p>
<p>Snad jen může být problém v mezerách mezi položkami, které vzniknou při <code>inline-block</code> řešení a umístěním každného odkazu v HTML kódu na zvláštní řádek. Řešením je <b>umístit všechny odkazy ihned za sebe</b> nebo odřádkování zakomentovat.</p>
<pre><code>   &lt;a href=#&gt;Odkaz&lt;/a&gt;&lt;!--
--&gt;&lt;a href=#&gt;Odkaz&lt;/a&gt;</code></pre>
<p>Nebo nakonec opravdu použít ten <code>float</code>.</p>

<div class="live">
  <style>
    .floatovane {list-style: none; padding: 0; margin: 0; overflow: hidden;}
    .floatovane li {display: inline}
    .floatovane a {text-decoration: none; border-bottom: 0; background: #fff; padding: .3em; float: left; width: 100px; line-height: 40px; text-align: center;}
    
  </style>
  <menu class="floatovane">
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Odkaz</a></li>
  </menu>
</div>
<p>Kromě nevýhody, že je nutné řešit <a href="/float#clear">clearování</a> bude obtíženější obtékané menu <a href="/centrovani">vycentrovat</a>.</p>

<h2 id="semantika">Sémantika</h2>
<p>Někdo by mohl namítat, že menu patří do značky <code>&lt;menu&gt;</code> nebo alespoň seznamu (<code>&lt;ul&gt;</code>) a odkazy do položek <code>&lt;li&gt;</code>. Osobně se domnívám, že takové strukturování <b>prakticky nikdo neocení</b> a je to jen práce navíc. Ale nic neřešitelného to také nepředstavuje.</p>
<p>V podstatě stačí jen vynulovat <code>margin</code> a <code>padding</code>, odstranit odrážky (<code>listy-style: none</code>) a z položek udělat třeba řádkové elementy (<code>display: inline</code>).</p>

<div class="live">
  <style>
    .menu3 {list-style: none; padding: 0; margin: 0; text-align: center}
    .menu3 li {display: inline}
    .menu3 a {text-decoration: none; border-bottom: 0; background: #fff; padding: 5px; display: inline-block; width: 100px; line-height: 40px}
    .fixni-menu {position: fixed; left: 50%; margin-left: -280px; top: 0; z-index: 100; background: #1081DD; padding: 5px}
    .fixni-menu a {color: #fff}    
  </style>
  <menu class="menu3" id="menu3">
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Odkaz</a></li>
    <li><a href="#">Odkaz</a></li>
  </menu>
  <script>
    var menu3 = document.getElementById("menu3");
  </script>
</div>

<h2 id="fixni">Fixní menu</h2>
<p>Vodorovné menu není problém na stránce <button onclick="trida(menu3, 'fixni-menu')">zafixovat</button> (<a href="/position#fixed"><code>position: fixed</code></a>), může být samozřejmě i <a href="/fixni-menu">fixované jen někdy</a> podobně jako <a href="/sidebar">boční panel</a>.</p>
<p><b>Vycentrování fixního menu</b> lze zajistit přes <code>left: 50%; margin-left: -(polovina šířky)</code>.</p>