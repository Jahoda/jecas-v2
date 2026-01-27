---
title: "Text-stroke"
headline: "Text-stroke"
description: "CSS vlastnost <code>text-stroke</code> vytváří okraj písmen podobně jako vlastnost <code>border</code> u boxů."
date: "2014-04-07"
last_modification: "2014-05-05"
status: 1
tags: ["css", "css-vlastnosti", "typografie"]
format: "html"
---

<p><img src="/files/text-stroke/nadpis.png" alt="Vysvětlení vlastností color a text-stroke" class="border"></p>

<h2 id="pouziti">Použití</h2>

<p>Využití vlastnosti <code>text-stroke</code> se nabízí v podobě vytváření zajímavějších stylů písma bez používání obrázků.</p>

<pre><code>element {
  <b>-webkit-</b>text-stroke: 5px red;
}</code></pre>

<p>První hodnota je tloušťka rámečku, druhá hodnota potom barva. Zápis se tedy liší oproti <code>border</code>u absencí volby stylu čáry (<code style="border-top: 1px solid #000">solid</code>, <code style="border-top: 1px dotted #000">dotted</code>, <code style="border-top: 3px double #000">double</code> a podobně). Možná se této možnosti dočkáme v budoucnu.</p>

<h2 id="podpora">Popora</h2>

<p>Momentálně funguje pouze ve <b>Webkitu</b> (<b>Chrome 31</b>+ a nová <b>Opera 20</b>+), a to jen s <a href="/css-prefixy">CSS prefixem</a> <code>-webkit-</code>.</p>

<div class="live">
  <style>
    .nadpis {
        color: #0D6AB7;      
        -webkit-text-stroke: 2px #DA3F94;
        font-weight: bold;
        font-size: 40px;
    }
  </style>
  <p class="nadpis">Text s barevným okrajem.</p>
</div>

<p><a href="https://kod.djpw.cz/zadb">Samostatná ukázka</a> (v podporovaných prohlížečích se zobrazí cca to samé co na obrázku výše).</p>

<p>Aby se efekt rozumně projevil, je zapotřebí celkem velké písmo, zhruba 40 pixelů a víc.</p>