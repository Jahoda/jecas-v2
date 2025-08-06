---
title: "CSS zoom"
headline: "Zvětšení a zmenšení v CSS"
description: "Jak v CSS zoomovat (zvětšovat a zmenšovat) elementy."
date: "2013-12-09"
last_modification: "2015-02-15"
status: 1
tags: ["css", "css-vlastnosti", "hotova-reseni"]
format: "html"
---

<p>Již v prastarých <b>Internet Explorerech</b> bylo možné cokoliv zvětšit nestandardní CSS vlastností <code>zoom</code>. V <b>IE</b>, <b>Chrome</b> a nové <b>Opeře</b> funguje <code>zoom</code> dodnes. Pro zvětšení/zmenšení se zadává buď poměr změny velikosti, nebo procenta.</p>

<pre><code>.dvakrat-vetsi {
  zoom: 2;
  /* totéž jako */
  zoom: 200%;
}</code></pre>






<p><a href="https://kod.djpw.cz/dkkb">Živá ukázka</a></p>

<p>CSS vlastnost <code>zoom</code> funguje v podstatě stejně, jako by se danému elementu zvětšily nebo zmenšily rozměry, písmo a podobně.</p>

<p>Vlastností <code>zoom</code> upravený element tak <b>ovlivní i své okolí</b>.</p>



<h2 id="scale">Transformace <code>scale</code></h2>

<p>Modernější a podporovaný i ve <b>Firefoxu</b> je způsob změny velikosti pomocí CSS transformace <code>scale</code>. Element upravený transformací <b>neovlivňuje své okolí</b>, což činí úpravy méně náročné na výpočetní výkon (nemusí se přepočítávat umístění okolí).</p>

<div class="internal-content">
  <ul>
    <li><a href="/vykreslovani">Jak funguje vykreslování stránky</a> – co prohlížeč dělá se stránkou při načítání a změnách</li>
  </ul>
</div>

<p>Z neovlivňování okolí plyne fakt, že zvětšený element bude okolí překrývat.</p>


<h2 id="zapis">Zápis</h2>

<pre><code>.dvakrat-vetsi {
  transform: scale(2);
}</code></pre>

<p>Funkce <code>scale</code> může element zvětšovat zvlášť ve směru vodorovném a zvlášť ve směru svislém při zadání dvou parametrů.</p>

<pre><code>.dvakrat-sirsi-ctyrikrat-vyssi {
  transform: scale(2, 4);
}</code></pre>

<p>Pro změnu velikosti pouze v ose X nebo ose Y existují ještě funkce:</p>

<ul>
  <li><code>scaleX()</code></li>
  <li><code>scaleY()</code></li>
</ul>


<pre><code>.dvakrat-sirsi-ctyrikrat-vyssi {
  transform: scaleX(2) scaleY(4);
}</code></pre>


<div class="live">
  <style>
    button {
      -webkit-transition: -webkit-transform .5s;
      -moz-transition: .5s -moz-transform;
      -o-transition: .5s -o-transform;
      transition: .5s transform;
    }
  </style>
  <script>
    function zvetsit(el) {
      var pomer = (Math.random() * 8) + 0.2;
      var transformace = "scale(" + pomer + ")";
      el.style.webkitTransform = transformace;
      el.style.mozTransform = transformace;
      el.style.oTransform = transformace;
      el.style.MsTransform = transformace;
      el.style.transform = transformace;
    }
  </script>
  <p>
    <button onclick="zvetsit(this)">Náhodně změnit velikost</button>
  </p>
</div>

<p>Hezké na změně velikosti pomocí <code>tranform: scale</code> je možnost animace pomocí <a href="/transition"><code>transition</code></a>. Stačí přidat jeden řádek (plus případné vlastnosti s <a href="/css-prefixy">CSS prefixy</a>) a změny velikosti jsou <b>plynulé</b>.</p>

<pre><code>element {
  transition: 5.s <b>transform</b>;
}</code></pre>


<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Transformace pro zvětšení nebo zmenšení fungují od:</p>

<ul>
  <li><b>IE 9</b>,</li>
  <li><b>Chrome 4</b>,</li>
  <li><b>Opera 11.5</b>,</li>
  <li><b>Firefox 3.5</b>,</li>
  <li><b>Safari 3.1</b></li>
</ul>

<p>Pro podporu i ve starších prohlížečích se používají CSS prefixy:</p>

<pre><code>.zvetseny {
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
  -o-transform: scale(1.5);
  -ms-transform: scale(1.5);
  transform: scale(1.5);
}</code></pre>









<h2 id="vyuziti">Využití</h2>

<p>Transformace <code>scale</code> se asi nejvíc hodí pro animované efekty.</p>


<h3 id="cela-obrazovka">Plynulé zobrazení přes celou obrazovku</h3>

<p>Po kliknutí na tlačítko se přes celou obrazovku plynule zobrazí obsah.</p>

<div class="live">
<style>
#hlaska {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #0D6AB7;
    color: #fff;
    text-align: center;
    transform: scale(0);
    transition: transform .5s;
    display: none;
    z-index: 100;
}
#hlaska.zobrazit {
    transform: scale(1);
}
</style>
<button 
  onclick="document.getElementById('hlaska').style.display = 'block'; setTimeout(function(){document.getElementById('hlaska').className = 'zobrazit'}, 10)">Zobrazit</button>
<div id="hlaska">
  <p>
    Obsah přes celou obrazovku.
  </p>    
  <p>
    <button onclick="document.getElementById('hlaska').className = ''">Skrýt</button>
  </p>
</div>  
</div>


<h3 id="nahled-webu">Náhled webu</h3>

<p>Zmenšením webu v <code>&lt;iframe></code> jde vytvořit okamžitý náhled webu.</p>

<script>
  function zobrazitRam(form) {
    document.getElementById("ram").src = form.url.value;
  }
</script>
<form onsubmit="zobrazitRam(this); return false">
  <p><label>URL: <input type="url" value="http://jakpsatweb.cz" name="url"></label> <button>Načíst</button></p>
</form>

<div class="live">
  <style>
  .nahled {
      transform: scale(.25);
      transform-origin: 0 0;
      width: 200;
      height: 100px;
  }
  </style>
  <div class="nahled">
    <iframe id="ram" width="800" height="400" frameborder="0">
    </iframe>
  </div>  
</div>

<p>Není to ale úplně ideální řešení, protože:</p>

<ul>
  <li>stránka může <b>blokovat zobrazení v rámu</b>,</li>
  
  <li>celý obsah stránky se bude muset <b>stáhnout</b>, což bude poměrně datově náročné</li>
</ul>

<p>Náhled webu se dá snadno získat i jako obrázek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/nahled-webu">Jak získat náhled webu?</a></li>
  </ul>
</div>

<p>Pomocí zvětšování/zmenšování jde docílit i různých pěkných efektů.</p>

<div class="external-content">
  <ul>
    <li><a href="http://mark-rolich.github.io/Magnifier.js/">Magnifier.js</a> – zvětšování části obrázku</li>
    
    <li><a href="http://yyx990803.github.io/zoomerang/">Zoomerang</a> – zvětšení čehokoliv na stránce po kliknutí</li>
  </ul>
</div>



