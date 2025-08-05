---
title: "Zobrazení popisku při najetí myší"
headline: "Popisek po najetí myší"
description: "Kterak zobrazovat obsah v tooltipu po najetí myši."
date: "2013-09-24"
last_modification: "2013-09-24"
status: 1
tags: ["css", "hotova-reseni", "napady"]
format: "html"
---

<p>Jako <b>popis obrázku</b> nebo <b>nápověda</b> může sloužit obsah, který se objeví po najetí myší.</p>

<p>V čistém CSS lze využít <a href="/css-selektory#uzivatelske-akce">pseudotřídu <code>:hover</code></a>.</p>

<pre><code>element .skryvany {display: none}
element<b>:hover</b> .skryvany {display: block}</code></pre>

<div class="live">
  <style>
    .po-najeti span {display: none; background: #fff; color: #000}
    .po-najeti:hover span {display: inline}
  </style>
  <p class=po-najeti>Po najetí se objeví <span>text</span>.</p>
</div>

<p>Na tomto triviálním postupu je možné stavě i <a href="/vyskakovaci-menu">vyskakovací menu</a> nebo právě různé popisky. Záleží jen na fantasii…</p>

<h2>Hotový tooltip</h2>
<p>Příklad popisku u běžného textu:</p>
<div class="live">
  <style>
.najeti {position: relative}
.popisek {position: absolute; left: 50%; top: 100%; display: none; margin-left: -125px; width: 250px; border: 1px solid #666; padding: 10px; background: #fff; z-index: 100; box-shadow: rgba(0, 0, 0, 0.298) 0px 3px 8px 0px; transition: opacity .5s; -webkit-transition: opacity .5s; opacity: 0}
.najeti:hover .popisek {display: block; opacity: 1}
.popisek .sipka, .popisek .sipka-obal {position: absolute; top: -10px; left: 50%; margin-left: -5px; width: 0px; height: 0px; border: solid transparent; border-width: 0 10px 10px 10px; border-bottom-color: #000}
.popisek .sipka-obal {border-bottom-color: #fff; margin: 1px 0 0 -4px; border-width: 0 9px 9px 9px}

</style>
  <div class="najeti">
    <p>Popisek se objeví po najetí. Tooltip je <a href="/position#absolute">absolutně posicovaný</a> a centrován <a href="/centrovani#absolute">následovně</a>, stín je vytvořen CSS vlastností <code>box-shadow</code> a šipka je <a href="/css-kresleni">nakreslená v CSS</a>.</p>
    <div class='popisek'>
		<span class='sipka'></span><span class='sipka-obal'></span>
        <p>Popisek
	</div>
  </div>
</div>

<ul>
  <li>Popisek je možné <a href="/animace-skryt">animovat</a> pomocí <a href="/transition"><code>transition</code></a>.</li>
  <li>Má-li být možné do popisku <b>najet myší</b>, je třeba ho <i>nalepit</i> k oblasti, která popisek vyvolává — jinak tooltip po ztracení <code>:hover</code>u u rodiče zmizí.</li>
</ul>

<h2 id="obrazek">Popisky obrázkové galerie</h2>
<p>S popisky pod obrázky:</p>
<div class="live">
  <style>
    .galerie {}
    .obrazek {position: relative; float: left; width: 200px; margin-right: 10px}
.popisek {position: absolute; left: 50%; top: 100%; display: none; margin-left: -100px; width: 180px; border: 1px solid #666; padding: 10px; background: #fff; z-index: 100; box-shadow: rgba(0, 0, 0, 0.298) 0px 3px 8px 0px; transition: opacity .5s; -webkit-transition: opacity .5s; opacity: 0}
.obrazek:hover .popisek {display: block; opacity: 1}
.popisek .sipka, .popisek .sipka-obal {position: absolute; top: -10px; left: 50%; margin-left: -5px; width: 0px; height: 0px; border: solid transparent; border-width: 0 10px 10px 10px; border-bottom-color: #000}
.popisek .sipka-obal {border-bottom-color: #fff; margin: 1px 0 0 -4px; border-width: 0 9px 9px 9px}

.nahore .popisek {top: auto; bottom: 100%;}
.nahore .sipka, .nahore .sipka-obal {top: auto; bottom: -10px; border-width: 10px 10px 0 10px ; border-top-color: #000; border-bottom-color: transparent;}
.nahore .sipka-obal {border-top-color: #fff; border-width: 9px 9px 0  9px; margin: 0 0 1px -4px;}
</style>
  <div class="galerie">
    <div class="obrazek">
      <img src="/files/tooltip/dummy-200x150-BodyLanguage.jpg">
      <div class='popisek'>
          <span class='sipka'></span><span class='sipka-obal'></span>
          <p>Popisek obrázku
      </div>
    </div>
    <div class="obrazek">
      <img src="/files/tooltip/dummy-200x150-Centurion.jpg">
      <div class='popisek'>
          <span class='sipka'></span><span class='sipka-obal'></span>
          <p>Popisek obrázku
      </div>
    </div>
    <div class="obrazek">
      <img src="/files/tooltip/dummy-200x150-Eye.jpg">
      <div class='popisek'>
          <span class='sipka'></span><span class='sipka-obal'></span>
          <p>Popisek obrázku
      </div>
    </div>
    <div class="obrazek">
      <img src="/files/tooltip/dummy-200x150-Musicians.jpg">
      <div class='popisek'>
          <span class='sipka'></span><span class='sipka-obal'></span>
          <p>Popisek obrázku
      </div>
    </div>
  <div style="clear: both"></div>
  </div>
</div>    

<p>Nebo s popisky nad obrázky:</p>

<div class="live">
<div class="galerie">
    <div class="obrazek nahore">
      <img src="/files/tooltip/dummy-200x150-BodyLanguage.jpg">
      <div class='popisek'>
          <span class='sipka'></span><span class='sipka-obal'></span>
          <p>Popisek obrázku
      </div>
    </div>
    <div class="obrazek nahore">
      <img src="/files/tooltip/dummy-200x150-Centurion.jpg">
      <div class='popisek'>
          <span class='sipka'></span><span class='sipka-obal'></span>
          <p>Popisek obrázku
      </div>
    </div>
    <div class="obrazek nahore">
      <img src="/files/tooltip/dummy-200x150-Eye.jpg">
      <div class='popisek'>
          <span class='sipka'></span><span class='sipka-obal'></span>
          <p>Popisek obrázku
      </div>
    </div>
    <div class="obrazek nahore">
      <img src="/files/tooltip/dummy-200x150-Musicians.jpg">
      <div class='popisek'>
          <span class='sipka'></span><span class='sipka-obal'></span>
          <p>Popisek obrázku
      </div>
    </div>
  <div style="clear: both"></div>
  </div>
</div>

<h2 id="js">JavaScriptový tooltip</h2>
<p>V případě, že chceme vytvářet popisek z např. atributu <code>title</code>, je nutno <a href="/atribut-title">tooltip řešit přes JS</a>.</p>