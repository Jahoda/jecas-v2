---
title: "CSS backdrop-filter"
headline: "CSS <code>backdrop-filter</code>"
description: "Vlastnost <code>backdrop-filter</code> dokáže uplatnit filtr pro pozadí elementu."
date: "2019-07-31"
last_modification: "2021-03-15"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p><a href="/filter">CSS filtry</a> se těší dobré podpoře napříč prohlížeči.</p>


<h2 id="zapis">Zápis</h2>

<p>Vlastnost <code>backdrop-filter</code> slouží pro aplikování filtrů na pozadí elementu, <b>bez ovlivnění samotného obsahu</b>. Zápis je úplně stejný jako u <code>filter</code>:</p>

<pre><code>element {
  backdrop-filter: nazevFiltru(parametr);
}</code></pre>

<p>Aby se efekt mohl projevit, musí být element průhledný – je už jedno jestli pomocí <a href="/opacity"><code>opacity</code></a> nebo pozadí zapsaného např. průhlednou <a href="/rgba">RGBA barvou</a>, případně to  funguje i úplně bez pozadí.</p>

<div class="live">
  <p style="filter: blur(1px)">Rozmazaný text pomocí <code>filter</code></p>
</div>

<div class="live">
  <div style="position: relative">
    <p>Rozmazaný obsah v pozadí</p>
    <p style="backdrop-filter: blur(1px); position: absolute; top: -.5em; outline: 1px solid #DA3F94">Rozmazávač</p>
  </div>
</div>

<p><a href="https://kod.djpw.cz/icsc">Samostatná živá ukázka</a></p>












<h2 id="podpora">Podpora</h2>

<p>Podpora není tak dobrá jako u obyčejného <code>filter</code>u.</p>

<p>Nefunguje v <b>IE 11</b> a <b>Firefoxu</b> (nejspíš začne fungovat v blízké budoucnosti).</p>



<h2 id="vyuziti">Využití</h2>

<p>Může se zdát, že jde totéž co vlastností <code>backdrop-filter</code> zajistit obyčejným <code>filter</code>em. To je do jisté míry pravda, ale <code>backdrop-filter</code> přináší zjednodušení – odpadá nutnost vytvářet speciální elementy pro aplikování filtru na požadované místo stránky.</p>

<p>U klasického filtru je často problém v tom, že rozmazává i obsah. Bylo tak dřív nutné mít specifickou strukturu HTML kódu.</p>

<div class="live">
  <style>
    .is-backdrop-filter .test-backdrop {
      backdrop-filter: blur(5px) brightness(80%);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .is-backdrop-filter .test-backdrop__inner {
      background: #fff;
      padding: 2em;
    }
  </style>
  <div class="test-backdrop">
    <div class="test-backdrop__inner">
      <button onclick="toggle(document.body, 'is-backdrop-filter')">Rozmazat a ztmavit pozadí stránky</button>
    </div>
  </div>
</div>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter">MDN: <code>backdrop-filter</code></a></li>
</ul>
