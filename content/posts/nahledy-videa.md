---
title: "Náhledy videa"
headline: "Více náhledů videa"
description: "Jak při najetí myší na náhled videa zobrazovat další náhledy."
date: "2013-11-03"
last_modification: "2013-11-07"
status: 1
tags: ["css", "hotova-reseni", "video", "youtube"]
format: "html"
---

<p><b>Jeden obrázek</b> pro dostatečnou představu o obsahu vide nemusí stačit. Proto se nabízí <b>při najetí myší na obrázek</b> automaticky zobrazit náhledy z <b>jiné části videa</b>.</p>

<p>Pro optimalisaci počtu HTTP spojení a pro zajištění, že další obrázky <b>budou včas načtené</b>, může být vhodné umístit všechny náhledy z různých částí videa do jednoho obrázku (tzv. CSS spritu). V následujících ukázkách náhledů ze <b>serveru YouTube</b> ale budou použity <b>jednotlivé obrázky</b>, protože je tak YT <a href="/youtube-lazy-loading#nahledy">přímo nabízí</a>, nicméně zásadní rozdíl mezi řešením CSS spritem a jednotlivými obrázky není.</p>

<h2 id="smycka">Automatická smyčka náhledů</h2>
<p>První možnost je při najetí myší (v CSS <code>:hover</code>, v JavaScriptu <code>onmouseover</code>) <b>s prodlevou</b> obrázky prohazovat. To může řešit buď JS <b>časovač</b>, nebo <b>od IE 10</b> <a href="/animation">animace v CSS</a>. V <a href="https://kod.djpw.cz/bwc">ukázce</a> se používá JS časovač.</p>

<style>
  /* reset stylů webu */
  .live img {display: inline}
  .live a, .live a:hover {border: 0; background: none;}
</style>
<div class="live">
  <script>
    var casovac;
    function nahledy(img) {
      var i = 1;
      casovac = setInterval(function() {
        var predchozi = i + ".jpg";
        i++;
        if (i > 3) i = 1;    
        img.src = img.src.replace(predchozi, (i + ".jpg"));
      }, 500);
    }    
    function zrusit() {
      clearTimeout(casovac);
    }
  </script>
  <a href="http://www.youtube.com/watch?v=m_t4_6eHFdk">
    <img src="http://img.youtube.com/vi/m_t4_6eHFdk/1.jpg" 
      width="120"
      height="90"
      onmouseover="nahledy(this)" 
      onmouseout="zrusit()"
    >
  </a>
  <a href="http://www.youtube.com/watch?v=QWsrdhj06VM">
    <img src="http://img.youtube.com/vi/QWsrdhj06VM/1.jpg" 
      width="120"
      height="90"
      onmouseover="nahledy(this)" 
      onmouseout="zrusit()"
    >  
  </a>
  <a href="http://www.youtube.com/watch?v=es_-zAC0bHI">
    <img src="http://img.youtube.com/vi/es_-zAC0bHI/1.jpg" 
      width="120"
      height="90"
      onmouseover="nahledy(this)" 
      onmouseout="zrusit()"
    >  
  </a>  
</div>

<h2 id="najeti">Ruční procházení náhledů</h2>
<p>Předchozí řešení není úplně špatné, ale možná by bylo lepší, kdyby si šlo nějak <b>zvolit, který obrázek si chci prohlédnout</b>.</p>
<p>Nabízí se proto umístit <i>do náhledu</i> pro každý jeden obrázek nějakou plochu, která <b>po najetí</b> zobrazí vybraný náhled.</p>

<p>Řešení je <b>čistě v CSS</b> (<a href="https://kod.djpw.cz/gwc">samostatná ukázka</a>).</p>
<ol>
  <li>V obalovém <code>&lt;div></code>u jsou vedle sebe <a href="/position#absolute">absolutně naposicovány</a> plochy reagující na <code>:hover</code>.</li>
  <li>Kromě <b>prvního obrázku</b> jsou nejprve všechny ostatní skryté.</li>
  <li>Při <code>:hover</code>u na ploše se pomocí <a href="/css-selektory#primy-sourozenec">selektoru příméhou sourozence</a> zobrazí odpovídající obrázek, který v kódu <b>následuje</b> <i>plochu</i>.</li>
</ol>

<div class="live">
  <style>
    .nahled {width: 120px; height: 95px; overflow: hidden; position: relative; display: inline-block; zoom: 1; =display: inline}
    
    .nahled .plocha {position: absolute; width: 40px; height: 90px; left: 0; top: 0; z-index: 1;
      background: url(nesmysl-pro-ie); border-bottom: 5px solid #666;}
    .nahled .druha {left: 40px;}
    .nahled .treti {left: 80px;}
    
    .nahled img {display: none; position: absolute; left: 0; top: 0; z-index: 0}
    .nahled .prvni+img {display: block;}
    .nahled .plocha:hover+img {display: block;}
    .nahled .plocha:hover {border-color: red;}
  </style>
  <a href="http://www.youtube.com/watch?v=m_t4_6eHFdk">
    <span class="nahled">
      <span class="plocha prvni"></span><img src="http://img.youtube.com/vi/m_t4_6eHFdk/1.jpg">      
      <span class="plocha druha"></span><img src="http://img.youtube.com/vi/m_t4_6eHFdk/2.jpg">
      <span class="plocha treti"></span><img src="http://img.youtube.com/vi/m_t4_6eHFdk/3.jpg">
    </span>   
  </a>
  <a href="http://www.youtube.com/watch?v=QWsrdhj06VM">
    <span class="nahled">
      <span class="plocha prvni"></span><img src="http://img.youtube.com/vi/QWsrdhj06VM/1.jpg">      
      <span class="plocha druha"></span><img src="http://img.youtube.com/vi/QWsrdhj06VM/2.jpg">
      <span class="plocha treti"></span><img src="http://img.youtube.com/vi/QWsrdhj06VM/3.jpg">
    </span>   
  </a>
  <a href="http://www.youtube.com/watch?v=es_-zAC0bHI">
    <span class="nahled">
      <span class="plocha prvni"></span><img src="http://img.youtube.com/vi/es_-zAC0bHI/1.jpg">      
      <span class="plocha druha"></span><img src="http://img.youtube.com/vi/es_-zAC0bHI/2.jpg">
      <span class="plocha treti"></span><img src="http://img.youtube.com/vi/es_-zAC0bHI/3.jpg">
    </span>   
  </a>  
</div>

<h3 id="prazdny-element-ie">Prázdný element v IE</h3>
<p>V Explorerech je normálně ignorován element bez obsahu, pokud nemá pozadí. Řešení je nějaké nastavit a <b>neviditelnou aktivní oblast</b> vytvořit stoprocentním <a href="/opacity">zprůhledněním</a> (<code>opacity: 0; filter: alpha(opacity=0);</code>) nebo nastavením nějakého <b>obrázku na pozadí</b> — obrázek to může být <b>libovolný</b>:
<ul>
  <li>jednopixelový průhledný,</li> 
  <li>obrázek, co se na stránce již používá (aby se nevytvářel další HTTP požadavek), naposicovaný (<code>background-position</code>) někam minus 1000 pixelů mimo (aby nebyl vidět)</li>
  <li>nebo klidně <b>obrázek neexistující</b> (to je použito v ukázce).</li>
</ul>