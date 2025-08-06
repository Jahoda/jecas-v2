---
title: "Oříznutí textu"
headline: "Oříznutí dlouhého textu"
description: "Má-li se delší text vyjít do přesného místa, je třeba kousek textu uříznout."
date: "2013-10-30"
last_modification: "2013-10-31"
status: 1
tags: ["css", "hotova-reseni", "webove-animace"]
format: "html"
---

<p>Pro <b>oříznutí jednořádkového textu čistě v CSS</b> stačí:</p>
<ul>
  <li>zrušit zalamování (<code>white-space: nowrap</code>),</li>
  <li>omezit šířku (<code>width</code>),</li>
  <li>element oříznout (<code>overflow: hidden</code>).</li>
</ul>

<div class="live">
  <style>
    .oriznuti {width: 220px; overflow: hidden; white-space: nowrap; background: #fff}
  </style>
  <div class="oriznuti">
    Text, který bude na konci uříznutý a další text nebude vidět.
  </div>
</div>

<h2 id="plynule">Plynulé uříznutí do ztracena</h2>
<p>Aby nebyl text nepěkně useknut <b>uprostřed písmene</b>, může vzhled zlepšit překrytí <b>plynulým přechodem</b>. To zajistí element s přechodem na pozadí, který se <a href="/position#absolute">absolutně naposicuje</a>. Napříč prohlížeči funkční CSS přechod lze <a href="http://www.colorzilla.com/gradient-editor/">snadno vygenerovat</a>.</p>

<div class="live">
  <style>
  .oriznuti {width: 220px; overflow: hidden; white-space: nowrap; background: #fff; position: relative;}
  .prechod {
  position: absolute; right: 0; top: 0; width: 30px; height: 100%;
  background-image: -moz-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -ms-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -webkit-gradient(linear, 0 0, 100% 0, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0)));
  background-image: -webkit-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -o-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 );;
}
  </style>
  <div class="oriznuti">
  <span class="prechod"></span>
  <div class="text">
    Text, který bude na konci uříznutý a další text nebude vidět.
  </div>
</div>
</div>

<h2 id="text-overflow">Tři tečky (vlastnost <code>text-overflow</code>)</h2>
<p>CSS umí přebytečný text nahradit výpustkou (<code>…</code>) při uvedení:</p>
<pre><code>.text {text-overflow: ellipsis}</code></pre>

<div class="live">
  <style>
    .oriznuti {width: 220px; overflow: hidden; white-space: nowrap; background: #fff}
  </style>
  <div class="oriznuti" style="text-overflow: ellipsis">
    Text, který bude na konci uříznutý a další text nebude vidět.
  </div>
</div>

<h2 id="odkryti">Animované odkrývání textu</h2>
<p>Ve výše uvedených řešeních je trochu nepraktické, že se k oříznutému textu <b>nepůjde dostat</b>. Co takhle <b>po najetí myší text posunout</b>, aby byl vidět celý?</p>

<div class="live">
<style>
.oriznuty {width: 220px; overflow: hidden; white-space: nowrap; 
    position: relative; height: 2em; background: #fff}
.prechod {
  z-index: 10;
  transition: 1s opacity;
  opacity: 1;
  position: absolute; right: 0; top: 0; width: 30px; height: 100%;
  background-image: -moz-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -ms-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -webkit-gradient(linear, 0 0, 100% 0, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0)));
  background-image: -webkit-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: -o-linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-image: linear-gradient(right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 );;
}

.oriznuty .text {position: absolute; right: 0; top: 0; 
  max-width: 220px;
transition: 2s max-width .5s}
.oriznuty:hover .text {max-width: 440px}
.oriznuty:hover .prechod {opacity: 0}
 

</style>
<div class="oriznuty">
  <span class="prechod"></span>
  <div class="text">
    Text, který bude na konci uříznutý a další text nebude vidět.
  </div>
</div>
</div>

<p>Využívá se triku s CSS vlastností <a href="/transition"><code>transition</code></a>, kdy se <a href="/animace-skryt#zmenseni">mění <code>max-width</code></a>. Pro přesnou animaci by proto bylo nejspíš nutné <b>použít JavaSript</b>.</p>

<h2 id="server">Oříznutí v PHP/MySQL</h2>
<p>Oříznout text je možné i <b>na straně serveru</b>. Přesné ořezávání na serveru je ale složitější na údržbu. Stačí u textu třeba jen změnit velikost písma nebo jeho font a shodný počet znaků bude mít různé rozměry.</p>
<h3 id="php">PHP</h3>
<pre><code>$pocetZnaku = 10;
$text = mb_substr($text, 0, $pocetZnaku);</code></pre>

<h3 id="sql">MySQL</h3>
<pre><code>SELECT SUBSTR(sloupec, 1, 10) FROM tabulka;</code></pre>
<p>Zkrácení textu s HTML značkami je <a href="http://php.vrana.cz/zkraceni-textu-s-xhtml-znackami.php">trochu komplikovanější</a>.</p>

<!-- 

https://kod.djpw.cz/euc
https://kod.djpw.cz/fuc
https://kod.djpw.cz/guc

-->