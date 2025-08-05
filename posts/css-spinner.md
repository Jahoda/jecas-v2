---
title: "CSS spinner"
headline: "CSS spinner"
description: "Točící se kolečko pro znázornění načítání v čistém CSS."
date: "2013-12-01"
last_modification: "2016-10-31"
status: 1
tags: ["css", "webove-animace"]
format: "html"
---

<p>Pro <b>znázornění</b> <a href="/animace-nacitani">průběhu načítání</a> je možné použít od <b>IE 10</b> <a href="/animace">animaci</a>. Jak si nějakou připravit čistě v CSS pomocí <a href="/animation"><code>animation</code></a>.</p>

<div class="live">
<style>
.kolecko {
    width: 50px; 
    height: 50px;
    -webkit-animation: tocit 1s infinite linear;
    animation: tocit 1s infinite linear;
    border-radius: 50%;
    border-bottom: 3px solid black;
}
@-webkit-keyframes tocit {
    to {-webkit-transform: rotate(360deg)}
}
@keyframes tocit {
    to {transform: rotate(360deg)}
}
</style>
<div class="kolecko"></div>
</div>

<p><a href="http://kod.djpw.cz/nhcb">Samostatná ukázka</a></p>

<p>Funguje to tak, že se element zakulatí vlastností <a href="/border-radius"><code>border-radius</code></a>. Na jednu stranu (např. <code>border-bottom</code>) se přidá rámeček.</p>

<div class="live">
<style>
.koleckoBezAnimace {
    width: 50px; 
    height: 50px;
    border-radius: 50%;
    border-bottom: 3px solid black;
}
</style>
<div class="koleckoBezAnimace"></div>
</div>

<p>A nekonečná animace tento <i>rámeček</i> bude <a href="/rotace">otáčet</a> přes transformaci: <code>transform: rotate(360deg)</code>.</p>

<p>Pro transformaci i animaci je v prohlížečích s jádrem <b>Webkit</b> nutné použít <a href="/css-prefixy">CSS prefixy</a>.</p>

<h2 id="starsi-prohlizece">Starší prohlížeče</h2>
<p>Pro starší prohlížeče (<b>IE 9</b> a starší) by se obdobná animace musela dělat <a href="/js">JavaScriptem</a> nebo obrázkovým <a href="/format-obrazku#gif">GIFem</a>.</p>

<div class="live">
  <img src="/files/ajax/loading.gif" alt="Načítání">
</div>

<h2 id="proc">Proč CSS animace</h2>

<p>Animování pomocí CSS bývá nepatrně <b>rychlejší</b> než srovnatelné animace v JavaScriptu.</p>

<p>CSS animace může být i jednodušší na realisaci a úpravy vzhledu než tvorba GIFu.</p>

<h2 id="hotova-reseni">Hotové CSS animace načítání</h2>

<ul>
  <li><a href="http://lea.verou.me/2013/11/cleanest-css-spinner-ever/">CSS spinner</a></li>
  
  <li><a href="http://tympanus.net/Development/ProgressButtonStyles/">Animace průběhu v odesílacím tlačítku</a></li>
  
  <li><a href="http://tobiasahlin.com/spinkit/">Různé styly animací</a></li>
  
  <li><a href="http://www.paulund.co.uk/playground/demo/css-only-loading-spinner/">CSS Only Loading Spinners</a></li>
  
  <li><a href="http://usablica.github.io/progress.js/">Progress.js</a> – znázornění průběhu v horní části stránky</li>
  
  <li><a href="https://www.dev-metal.com/8-awesome-spinners-loaders-pure-css/">8 awesome pure CSS spinner / loader</a></li>
  
  <li><a href="http://projects.lukehaas.me/css-loaders/">Single Element CSS Spinners</a></li>
  
  <li><a href="http://webdesign.tutsplus.com/tutorials/creating-a-collection-of-css3-animated-pre-loaders--cms-21978">Creating a Collection of CSS3 Animated Pre-loaders</a> – jak animace načítání vytvořit</li>
  
  <li><a href="http://samherbert.net/svg-loaders/">SVG Loaders</a></li>
  
  <li><a href="http://designmodo.com/css3-jquery-loading-animations/">16 CSS3 and jQuery Loading Animations Solutions</a></li>
  
  <li><a href="http://loading.io/">Loading.io</a> – nástroj pro vytvoření loadovacích animací v CSS/SVG/GIF</li>
</ul>

