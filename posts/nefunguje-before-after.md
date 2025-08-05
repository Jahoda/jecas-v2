---
title: "Before a after u inputu"
headline: "Before a after u <code>&lt;input></code>u"
description: "Funguje, nebo nefunguje použití <code>:before</code> a <code>:after</code> u <code>&lt;input></code>ů?"
date: "2015-04-07"
last_modification: "2015-04-07"
status: 1
tags: ["css", "formulare", "selektory-css"]
format: "html"
---

<p>Tzv. pseudo-elementy <code>:before</code> a <code>:after</code> se hodí v situacích, kdy je potřeba vytvořit nějaký obsah bez úprav HTML kódu.</p>

<p>Této vlastnosti se hojně využívá při <a href="/css-kresleni">kreslení pomocí CSS</a> / <a href="/css-ikony">CSS ikon</a>, kde se díky tomu z jediného HTML elementu dají vytvořit velké věci.</p>

<p>Využívat <code>:before</code> a <code>:after</code> se zdálo být nemožné u elementů, které „nemají obsah“. To je:</p>

<ul>
  <li>většina <a href="/html-znacky#koncova-zakazana">nepárových značek</a> (<code>&lt;img></code>, <code>&lt;br></code>) – výjimka je většinou značka <code>&lt;hr></code>,</li>
  
  <li>formulářové prvky (<a href="/input"><code>&lt;input></code></a>, <a href="/textarea"><code>&lt;textarea></code></a>, <a href="/select"><code>&lt;select></code></a>)</li>
</ul>


<h2 id="checkbox-radio">Pseudo-elementy u některých typů <code>&lt;input></code>u</h2>

<p>Se zajímavým zjištěním přišel <b>Pepa Linha</b> – prohlížeče vycházející z <b>Webkitu</b> (<b>Opera 15+</b>, <b>Chrome</b>, <b>Safari</b>) umí vykreslit pseudo-elementy u <code>&lt;input type=checkbox></code>, <code>&lt;input type=radio></code> nebo <code>&lt;input type=range></code>.</p>

<p>To by při podpoře napříč prohlížeči byla užitečná věc, protože by šlo jednodušeji vytvářet vlastní styl přepínačů a zaškrtávacích políček.</p>

<div class="internal-content">
  <ul>
    <li><a href="/stylovani-checked">Pokročilé stylování checkboxu</a></li>
  </ul>
</div>

<p>Test <code>:after</code> u některých <code>&lt;input></code>ů:</p>

<div class="live">
<style>
.live input:after
{
    content: "funguje";
    margin-left: 8em;
    padding: .2em;
    color: #fff;
    background: #000;
}
</style>  
  <p>
    <label><input type="checkbox"> checkbox</label>
  </p>
  <p>
    <label><input type="radio"> radio</label>
  </p>
  <p>
    <label><input type="range"></label>
  </p>  
</div>

<p>Pokud u políček výše ↑ funguje <code>:before</code>/<code>:after</code>, objeví se to vedle nich popis <i>funguje</i>.</p>

<p>Příklad pseudo-elementu u více HTML značek:</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/afmb">Test pseudo-elementů u různých značek</a></li>
  </ul>
</div>


<h2 id="stara-opera">Stará Opera</h2>

<p><b>Opera</b> do verse <b>12</b> umí pseudo-elementy u značky <code>&lt;br></code> a naopak je neumí u vodorovné čáry <code>&lt;hr></code>.</p>

<p>Víte ještě o nějakých výjimkách? Dejte mi prosím vědět do komentářů.</p>