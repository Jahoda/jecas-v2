---
title: "CSS ikony"
headline: "CSS ikony"
description: "Ikony bez obrázků v čistém CSS."
date: "2013-11-24"
last_modification: "2013-12-30"
status: 1
tags: ["css", "hotova-reseni", "napady"]
format: "html"
---

<p>Chceme-li stránkou obohatit a zpřehlednit ikonami, existují různé možnosti:</p>

<ul>
  <li>
    <p>Použít <b>běžný obrázek</b> (ideálně jako <a href="/css-sprite">CSS sprite</a>).</p></li>
  <li>
    <p>Použít tzv. <a href="/font-ikony"><i>font icons</i></a> (<b>ikony z písma</b>). To funguje tak, že se na stránku připojí speciální font, který místo běžných znaků obsahuje <b>grafické symboly</b> ikon.</p></li>
  <li>
    <p><i>Nakreslit</i> ikonu přímo <b>v CSS</b>.</p></li>
</ul>

<p>Obecné techniky <a href="/css-kresleni"><i>kreslení</i> v CSS</a> už jsem popisoval. Při tvorbě <b>CSS ikon</b> je <i>jen</i> stačí vhodně kombinovat.</p>

<p>U složitějších podob ikon, kde je potřeba více elementů, si lze vypomoci přes <a href="/css-selektory#before-after"><code>:before</code>/<code>:after</code></a>. A ušetřit tím pár značek, které by jinak <b>musely být v kódu</b>.</p>

<p>Z jednoho elementu tedy můžeme udělat <b>tři</b>, případně přidat další element a získat tak <b>šest částí</b>, což už stačí i na složité výtvory. Ne jen <b>primitivní šipku</b>.</p>

<div class="live">
  <style>
    .ico {width: 36px; height: 36px; display: inline-block; position: relative; background: #fff;}
    .ico:before, .ico:after {position: absolute; content: ""} 
    .sipka:before {border: 10px solid transparent; border-bottom-color: #1081DD; left: 8px; top: -5px}
    .sipka:after {width: 4px; height: 20px; background: #1081DD; left: 16px; top: 10px}
  </style>
  <i class="ico sipka"></i>
</div>

<h2 id="vyhody">Výhody a nevýhody</h2>
<p>Výhody <b>ikonek v CSS</b> jsou:</p>

<ol>
  <li>šetření <b>HTTP požadavků</b> (stačí přidat do CSS definici ikon, nic dalšího <b>se nemusí stahovat</b>),</li>
  <li>snadná <b>změna barev a rozměrů</b> bez ztráty kvality (pokud s tím ikonky počítají).</li>
</ol>

<p>Jako nevýhody lze považovat:</p>

<ol>
  <li>
    <p><b>Komplikovanější upravování</b> a rozšiřování. Je jednodušší překreslit obrázek, než laborovat s CSS v <code>:before</code> a <code>:after</code> <i>elementech</i> a obávat se limitu daným <b>počtem elementů</b> pro ikony stanovených.</p></li>
  
  <li>
    <p><b>Slabší podpora</b> některých pro kreslení podstatných CSS vlastností (například <a href="/border-radius">kulaté rohy</a>). <b>Plnohodnotnou podobu</b> je reálné očekávat až od <b>IE 9</b>.</p></li>
  
  <li>
    <p>Další věc je <b>datová velikost</b>. Při komplikovanějších podobách využívajících lehce nestandardní CSS vlastnosti, může být <b>CSS kód ikony</b> zaneřáděn duplicitními deklaracemi lišící se jen <a href="/css-prefixy">prefixy</a>. A ve výsledku tak být objemnější než běžný <b>obrázek</b>.</p></li>
  
  <li>
    <p>Nakonec bude u CSS ikon mnohem slabší výběr <b>hotových setů ikon</b> rovnou k použití.</p></li>
</ol>
  
<h2 id="hotove-ikony">Hotové ikony</h2>
<p>Odkazy na zajímavější kolekce CSS ikon.</p>

<h3 id="uiplayground">UIPlayGround CSS 3 Icons</h3>
<p><a href="http://www.uiplayground.in/css3-icons/" class="button">Web</a></p>
<p><img src="/files/css-ikony/uiplayground.png" alt="UIPlayGround CSS 3 Icons" class="border"></p>

<h2 id="odkazy">Odkazy jinam</h2>

<h3 id="svg">SVG ikony</h3>
<ul>
  <li><a href="http://tympanus.net/codrops/2013/11/27/svg-icons-ftw">SVG Icons FTW</a></li>
  <!--<li><a href="http://iconmelon.com/">SVG ikony</a> (od <b>IE 9</b>).</li>-->
  <li><a href="http://ianfeather.co.uk/ten-reasons-we-switched-from-an-icon-font-to-svg/">Proč používat SVG ikony</a></li>
</ul>

<h3 id="font">Font ikony</h3>
<ul>
  <li><a href="http://fontastic.me/">Fontastic</a></li>
  <li><a href="http://elusiveicons.com/">Elusive Icons: The iconic font and CSS toolkit</a></li>
</ul>