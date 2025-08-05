---
title: "Zjištění rozlišení v JS"
headline: "Zjištění rozměrů stránky"
description: "Jak v JavaScriptu zjistit šířku a výšku rozlišení obrazovky, velikost dostupné plochy (tzv. viewport) nebo rozměry elementu."
date: "2014-01-15"
last_modification: "2017-06-01"
status: 1
tags: ["js", "napady", "rozliseni"]
format: "html"
---

<p>Co zajímavého je možné na stránce měřit ilustruje následující obrázek:</p>

<p><img src="/files/zjisteni-rozmeru/screen-offset-client.png" alt="Zjištění rozlišení v JavaScriptu" class="border"></p>































<p>Všechny hodnoty jsou v <b>pixelech</b>, proto v případě jejich používání v nastavování CSS vlastností je nutné jednotky <code>px</code> přidat:</p>

<pre><code>element.style.width = screen.width + <b>"px"</b>;</code></pre>








<h2>Rozlišení uživatele</h2>

<p>Zjištění <b>rozlišení obrazovky</b>. Kromě statistických účelů to není moc použitelné. Z praktického hlediska je zajímavější znát prostor okna, který je dostupný pro samotný web.</p>
<dl>
  <dt><code>screen.width</code></dt>
  <dd>
    <p>Šířka obrazovky: <tt class="live" data-eval="screen.width"></tt></p>
  </dd>
  
  <dt><code>screen.height</code></dt>
  <dd>
    <p>Výška obrazovky: <tt class="live" data-eval="screen.height"></tt></p>
  </dd>  
  
  <dt><code>screen.availWidth</code></dt>
  <dd>
    <p>Dostupná šířka: <tt class="live" data-eval="screen.availWidth"></tt></p>
  </dd>
  
  <dt><code>screen.availHeight</code></dt>
  <dd>
    <p>Dostupná výška: <tt class="live" data-eval="screen.availHeight"></tt></p>
  </dd>  
</dl>

<p>Hodnota <code>availHeight</code> se liší kvůli panelu v operačním systému.</p>




<h2 id="pixel-ratio">Poměr pixelů <code>pixelRatio</code></h2>

<p>Jedná s o poměr skutečných hardwarových pixelů vůči počtu pixelů, kterými se presentuje prohlížeč.</p>

<dl>  
  <dt><code>window.devicePixelRatio</code></dt>
  <dd>
    <p>Poměr pixelů: <tt class="live" data-eval="window.devicePixelRatio"></tt></p>
  </dd>
</dl>

<p><b>Jiná hodnota než 1</b> typicky nastává u mobilních zařízení. Ta mají běžně na 5" displeji třeba FullHD rozlišení (1920 × 1080 pixelů). Pokud by byl poměr HW a SW pixelů 1:1, stránka by byla na mobilu nečitelná.</p>

<p>Obdobné chování je i u <b>4K monitorů</b> (3840 × 2160 pixelů), kde se stránky v prohlížečích tváří jako by byly v QHD rozlišení (2560 × 1440 px) při device-pixel-ratio 1.5.</p>



<h2 id="viewport">Rozměry viewportu</h2>
<p><i>Viewport</i> znamená „čistý“ rozměr okna, který je dostupný pro samotný web. Mění své rozměry při úpravách velikosti okna. Taktéž při zobrazování/vypínání různých panelů v prohlížeči.</p>

<dl>
  <dt><code>document.documentElement.clientWidth</code></dt>
  <dd>
    <p>Šířka viewportu: <tt class="live" data-eval="document.documentElement.clientWidth"></tt></p>
  </dd>
  
  <dt><code>document.documentElement.clientHeight</code></dt>
  <dd>
    <p>Výška viewportu: <tt class="live" data-eval="document.documentElement.clientHeight"></tt></p>
  </dd>  
</dl>

<p>V některých prohlížečích je možné použít (<b>IE 9+</b>):</p>

<dl>
  <dt><code>window.innerWidth</code></dt>
  <dd>
    <p>Šířka viewportu: <tt class="live" data-eval="window.innerWidth"></tt></p>
  </dd>
  
  <dt><code>window.innerHeight</code></dt>
  <dd>
    <p>Výška viewportu: <tt class="live" data-eval="window.innerHeight"></tt></p>
  </dd>  
</dl>

<h2 id="cela-velikost">Velikost celé stránky</h2>
<p>Zjistit celkové rozměry stránky (nebo samotného elementu) umí <code>offset*</code> hodnoty. Započítá se i obsah, ke kterému se musí <b>odrolovat</b>.</p>
<dl>
  <dt><code>document.documentElement.offsetWidth</code></dt>
  <dd>
    <p>Šířka stránky: <tt class="live" data-eval="document.documentElement.offsetWidth"></tt></p>
  </dd>
  
  <dt><code>document.documentElement.offsetHeight</code></dt>
  <dd>
    <p>Výška stránky: <tt class="live" data-eval="document.documentElement.offsetHeight"></tt></p>
  </dd>  
</dl>

<dl>
  <dt><code>document.documentElement.scrollWidth</code></dt>
  <dd>
    <p>Šířka stránky: <tt class="live" data-eval="document.documentElement.scrollWidth"></tt></p>
  </dd>
  
  <dt><code>document.documentElement.scrollHeight</code></dt>
  <dd>
    <p>Výška stránky: <tt class="live" data-eval="document.documentElement.offsetHeight"></tt></p>
  </dd>  
</dl>

<h3>document.body</h3>
<p>Zjišťování rozměrů celé stránky přes <a href="/documentelement-body"><code>documentElement</code></a> nefunguje správně v <b>IE 9</b> a starších. Hodnota z <code>document.body</code> vypadá mnohem lépe.</p>
<dl>
  <dt><code>document.body.offsetWidth</code></dt>
  <dd>
    <p>Šířka stránky: <tt class="live" data-eval="document.body.offsetWidth"></tt></p>
  </dd>
  
  <dt><code>document.body.offsetHeight</code></dt>
  <dd>
    <p>Výška stránky: <tt class="live" data-eval="document.body.offsetHeight"></tt></p>
  </dd>  
</dl>

<dl>
  <dt><code>document.body.scrollWidth</code></dt>
  <dd>
    <p>Šířka stránky: <tt class="live" data-eval="document.body.scrollWidth"></tt></p>
  </dd>
  
  <dt><code>document.body.scrollHeight</code></dt>
  <dd>
    <p>Výška stránky: <tt class="live" data-eval="document.body.offsetHeight"></tt></p>
  </dd>  
</dl>

<h2 id="rozmery-elementu">Rozměry elementu</h2>
<p>Pro přeměření elementů jako <a href="/div-span#div"><code>&lt;div></code></a>, <code>&lt;p></code> a podobně slouží rovněž <code>offset*</code> hodnoty.</p>

<textarea id="premerit" style="padding: 1em; border: 0; background: #efefef; resize: both;">Element k přeměření</textarea>
<script>
  var premerit = document.getElementById('premerit');
</script>

<dl>
  <dt><code>element.offsetWidth</code></dt>
  <dd>
    <p>Šířka: <tt class="live" data-eval="premerit.offsetWidth"></tt></p>
  </dd>
  
  <dt><code>element.offsetHeight</code></dt>
  <dd>
    <p>Výška: <tt class="live" data-eval="premerit.offsetHeight"></tt></p>
  </dd>  
</dl>

<script>
  function reCount() {
    var items = document.getElementsByTagName("tt");
    for (var i = 0; i < items.length; i++) {
      items[i].innerHTML = eval(items[i].getAttribute("data-eval"));
    }
  }
  
  window.onload = window.onresize = premerit.onmouseup = reCount;
</script>