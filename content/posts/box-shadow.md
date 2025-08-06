---
title: "Box-shadow"
headline: "Box-shadow"
description: "Vlastnost <code>box-shadow</code> umí vytvořit CSS stín kolem elementu."
date: "2014-04-24"
last_modification: "2019-10-14"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>Pro vytvoření stínu kolem textu slouží CSS vlastnost <a href="/text-shadow"><code>text-shadow</code></a>.</p>

<h2 id="podpora">Podpora</h2>

<p>Dobře podporovaná vlastnost napříč všemi běžnými prohlížeči.</p>

<h2 id="zapis">Zápis</h2>

<pre id="test" style="box-shadow: 10px 5px 5px #1081DD;"><code>element {
  box-shadow: <span id="test-css"><b>10px 5px</b> <i>5px</i> red</span>;
}</code></pre>

<script>
  function el(id) {
    return document.getElementById(id);
  }
  function upravitStin() {
    var css = (el("umisteni").checked ? (el("umisteni").value + " ") : "") + el("x").value + "px " + el("y").value + "px " + el("rozmazani").value + "px " + el("velikost").value + "px " + el("barva").value;
    el("test").style.boxShadow = css;
    el("test-css").innerHTML = css;
  }
</script>

<dl>
  
  <dt id="inset">Vnitřní stín</dt>
  <dd>
    <p>Jako první hodnotu je ještě možné <label class="live no-source"><input type="checkbox" id="umisteni" value="inset" onchange="upravitStin()">zadat <code>inset</code></label>, což vytvoří stín uvnitř elementu.</p>
    
    <p>Tuto hodnotu jde uvést i jako poslední. V některých prohlížečích funguje i kdekoliv jinde mezi umístěním a barvou, ale minimálně <b>Edge</b> nebo <b>Safari</b> si s tím neporadí.</p>
  </dd>
  
  <dt id="offset">Umístění</dt>
  <dd>
    <p>V ukázce výše první dvě hodnoty udávají umístění stínu.</p>
    
    <ul>
      <li>
        <p>První hodnota je <b>horisontální</b> (vodorovná). Čím větší hodnota bude nastavená, tím <b>vpravo</b> bude stín větší. Přehodit stín <b>doleva</b> je možné zadáním záporné hodnoty. <span class="live no-source">-100 <input oninput="upravitStin()" onchange="upravitStin()" type="range" min="-100" max="100" id="x" value="10"> 100</span>        </p>
      </li>
      <li>
        <p>Druhá hodnota je <b>vertikální</b> (svislá). Nastavuje velikost stínu <b>dole</b>. Nebo <b>nahoře</b> při zadání záporné hodnoty. <span class="live no-source">-100 <input oninput="upravitStin()" onchange="upravitStin()" type="range" min="-100" max="100" id="y" value="10"> 100</span></p>
      </li>
    </ul>
  </dd>
  
  <dt id="blur">Rozmazání</dt>
  <dd>
    <p>Další hodnota určuje, jak moc bude stín rozmazaný. Při nulové hodnotě tedy bude vypadat jako obyčejný rámeček. <span class="live no-source">0 <input oninput="upravitStin()" onchange="upravitStin()" type="range" min="0" max="100" id="rozmazani" value="5"> 100</span></p>
    
  </dd>
  
  <dt id="spread">Velikost</dt>
  <dd>
    <p>Dokáže roztáhnout stín všemi směry. <span class="live no-source">0 <input oninput="upravitStin()" onchange="upravitStin()" type="range" min="0" max="100" id="velikost" value="0"> 100</span></p>
  </dd>
  
  <dt id="color">Barva</dt>
  <dd>
    <p>Poslední hodnota je barva stínu. <span class="live no-source"><input oninput="upravitStin()" onchange="upravitStin()" type="color" value="#1081DD" id="barva"></span></p>    
  </dd>
</dl>

<h2 id="pokrocile">Pokročilé</h2>

<h3 id="pruhlednost">Průhledný stín</h3>

<p>Barvu stínu je možná zadávat přes <a href="/opacity#rgba"><code>rgba()</code></a>, to může vytvořit poloprůhledný stín.</p>

<h3 id="kulate-rohy">Kulaté rohy</h3>

<p>Vlastnost <code>box-shadow</code> ctí i <a href="/border-radius"><code>border-radius</code></a>. Kolem kulatého rohu proto bude kulatý stín.</p>




<h2 id="vice">Vícenásobné stíny</h2>

<p>Pro jeden element je možné zadat více stínů. Stačí je oddělit čárkami.</p>

<pre><code>element {
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1), 
              0 2px 2px rgba(0, 0, 0, .1), 
              0 4px 4px rgba(0, 0, 0, .1), 
              0 8px 8px rgba(0, 0, 0, .1);
}</code></pre>


<p>Je poměrně běžné tímto způsobem docílit <i>hezčích</i>/plynulejších stínů:</p>

<div class="live">
<style>
  .obycejny-stin {
    box-shadow: 0 4px 4px rgba(0, 0, 0, .3);
  }
  
  .hezci-stin {
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1), 
                0 2px 2px rgba(0, 0, 0, .1), 
                0 4px 4px rgba(0, 0, 0, .1), 
                0 8px 8px rgba(0, 0, 0, .1);
  }  
</style>  
<p class="obycejny-stin" style="padding: 1em">
  Obyčejný jeden stín
</p>
<p class="hezci-stin" style="padding: 1em">
  Hezčí vícenásobný stín
</p>
</div>

<p>Více třeba v samostatném článku:</p>

<div class="external-content">
  <ul>
    <li>Tobias Bjerrome Ahlin: <a href="https://tobiasahlin.com/blog/layered-smooth-box-shadows/">Smoother &amp; sharper shadows with layered box-shadows</a></li>
  </ul>
</div>

<h2 id="historie">Historie</h2>

<p>CSS stíny fungují od <b>IE 9</b>. Ve starších Internet Explorerech šlo stín vytvořit přes <a href="http://msdn.microsoft.com/en-us/library/ms533086(v=vs.85).aspx"><i>starou</i> CSS vlastnost <code>filter</code></a>. Pro starší <b>Webkit</b>, <b>Firefox</b> nebo <b>Operu</b> se používala vlastnost s <a href="/css-prefixy">CSS prefixy</a>.</p>

<p>Když <code>box-shadow</code> ještě moc nefungoval, řešily se stíny buď obrázky, nebo mnoha obalovými elementy, které měly například 1px rámečky, což stín simulovalo.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="http://bigspaceship.github.io/shine.js/">Shine.js</a> – dynamické generování stínů v JavaScriptu.</li>
  <li><a href="https://brumm.af/shadows">brumm.af/shadows</a> – nástroj pro generování hezkých stínů</li>
</ul>