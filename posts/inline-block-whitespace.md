---
title: "Inline-block a bílé znaky"
headline: "Inline-block a bílé znaky"
description: "Při zadávání šířky elementům s <code>display: inline-block</code> je nutné myslet na <i>bílé znaky</i> (whitespace)."
date: "2014-04-24"
last_modification: "2014-04-27"
status: 1
tags: ["css", "hotova-reseni"]
format: "html"
---

<p>Mějme jednoduchý cíl: umístit do řádku 3 odkazy, každý 100 px široký s 5px mezerou mezi nimi. Výsledná celková šířka by proto měla být 310 px (šířka: 3 * 100 px + odsazení: 2 * 5 px).</p>

<style>
  .obal a {background: #1081DD!important; color: #fff!important}
</style>
<div class="live">
<style>
.obal {
    width: 310px;
    background: #DA3F94;
}
.obal a {
    text-align: center;
    background: #1081DD;
    display: inline-block;
    width: 100px;
    margin-right: 5px;
}
.obal a.posledni {
    margin-right: 0;
}
</style>
<div class="obal">
    <a href="#">Odkaz</a>
    <a href="#">Odkaz</a>
    <a class="posledni" href="#">Odkaz</a>
</div>
</div>

<p>Proč se to tedy do obalu o šířce 310 pixelů ↑ nevejde a třetí odkaz <b>odskočí na další řádek</b>?</p>

<p>Na vině jsou <b>mezery/odřádkování mezi jednotlivými odkazy</b> (<a href="http://kod.djpw.cz/gvcb">samostatná ukázka</a>).</p>

<pre><code>&lt;a href="#">Odkaz&lt;/a><b> </b>&lt;a href="#">Odkaz&lt;/a></code></pre>

<h2 id="reseni">Řešení</h2>

<p>První možnost je v HTML kódu mezery odstranit (<a href="http://kod.djpw.cz/hvcb">ukázka</a>):</p>

<pre><code>&lt;a href="#">Odkaz&lt;/a>&lt;a href="#">Odkaz&lt;/a></code></pre>

<p>Případně pro lepší přehlednost posunout <b>koncovou značku</b> (<a href="http://kod.djpw.cz/kigb">ukázka</a>).</p>

<pre><code>&lt;a href="#">Odkaz&lt;/a
>&lt;a href="#">Odkaz&lt;/a></code></pre>

<p>Nebo zakomentovat (<a href="http://kod.djpw.cz/ivcb">ukázka</a>). Moc elegantní se mi to ale nezdá.</p>

<pre><code>&lt;a href="#">Odkaz&lt;/a>&lt;!--
 -->&lt;a href="#">Odkaz&lt;/a></code></pre>

<p>Ještě je možné se mezer zbavit <b>nulovou velikostí písma</b> (<code>font-size: 0</code>) pro rodiče a následným <i>obnovením</i> velikosti pro položky s <code>inline-block</code> (<a href="http://kod.djpw.cz/ligb">ukázka</a>). Není to ale úplně spolehlivé a nenávratně se tím rozhodí <b>relativní velikosti písma</b>.</p>

<p>Jinak se nabízí na <code>inline-block</code> resignovat a použít:</p>

<ul>
  <li>Tabulkové zobrazení <code>display: table-cell</code> (<a href="http://kod.djpw.cz/jvcb">ukázka</a>). Funkční od <b>IE 8</b>.</li>
  <li>Odkazy <a href="/float"><code>float</code>ovat</a> (<a href="http://kod.djpw.cz/lwcb">ukázka</a>). Funkční všude.</li>
</ul>