---
title: "CSS filter"
headline: "CSS <code>filter</code>"
description: "Jak vytvářet grafické filtry obrázků i jiných prvků na stránce."
date: "2014-04-20"
last_modification: "2015-01-21"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>Na <code>filter</code>u je hodně zajímavá skutečnost, že ho různě implementují <b>Internet Explorery</b> už od prastaré verse <b>4</b> do <b>IE 9</b> a současné prohlížeče.</p>

<p>S původní vlastností přišel Internet Explorer. Ukázky těchto filtrů (funkční do <b>IE 8</b>) jsou hezky <a href="http://www.jakpsatweb.cz/css/css-filtry-priklady.html">popsány na JPW</a>. <i>Nové</i> filtry ale fungují <b>úplně jinak</b>.</p>

<h2 id="podpora">Podpora</h2>
<p>Nová podoba filtrů funguje s <a href="/css-prefixy">prefixy</a> od <b>Chrome 18</b> a <b>Opery 17</b>. Od <b>Firefoxu 35</b> již bez prefixů, <b>Firefox 34</b> a starší podporuje pouze připojení SVG filtru přes <code>url</code>. V <b>IE</b> podpora chybí.</p>

<p>Filtry jde aplikovat i pouze na pozadí elementu pomocí podobné vlastnosti <a href="/backdrop-filter"><code>backdrop-filter</code></a>.</p>

<h2 id="seznam">Seznam filtrů</h2>

<p>V podporovaném prohlížeči <b>Chrome</b> a <b>nové Opeře</b> je možné efekty testovat přímo na této stránce (na elementu <code>&lt;body></code>). Pro potřeby ukázek se filtry <b>neslučují</b>.</p>

<dl>
  <dt id="blur"><code>blur()</code></dt>
  <dd>
    <p>Vytvoří efekt rozmazání. Více o rozmazávání je v samostatném článku <a href="/blur">Filtr blur</a>.</p>
    <pre><code>element {
  filter: blur(2px);
}</code></pre>
    
    <p>Zadávat je možné běžné <b>délkové jednotky</b> kromě procent.</p>
    
    <p class="live nosource"><b>Rozmazat:</b> <input type="range" data-jednotky="px" data-filter="blur" min="0" max="5" value="0" onchange="nastavitFiltr(this)"></p>     
  </dd>
  
  <dt id="brightness"><code>brightness()</code></dt>
  <dd>
    <p>Umožňuje ztmavit a nebo naopak projasnit element. Dá se elegantně využít pro <a href="/universalni-hover#filter">universální <code>:hover</code> efekty</a>.</p>
    
    <pre><code>.ztmavit {
  filter: brightness(90%);
}
.zesvetlit {
  filter: brightness(110%);
}</code></pre>
    
    <ul>
      <li><code>0%</code> – Minimální hodnota, element je černý.</li>
      <li><code>100%</code> – Střední hodnota, element je stejný jako bez filtru.</li>
      <li><code>200%</code> – Maximální hodnota, element je bílý.</li>
    </ul>
    
    <p class="live nosource"><b>Světlost:</b> <input type="range" data-jednotky="%" data-filter="brightness" min="0" max="200" value="100" onchange="nastavitFiltr(this)"></p>     
  </dd>
  
  <dt id="contrast"><code>contrast()</code></dt>
  
  <dd>
    <pre><code>.nizsi-kontrast {
  filter: contrast(90%);
}
.vyssi-kontrast {
  filter: contrast(110%);
}</code></pre>
    
    <p>Hodnota se zadává v procentech. Postup je stejný jako u <code>brightness</code>.</p>
    
    <p class="live nosource"><b>Kontrast:</b> <input type="range" data-jednotky="%" data-filter="contrast" min="0" max="200" value="100" onchange="nastavitFiltr(this)"></p> 
  </dd>
  
  <dt id="drop-shadow"><code>drop-shadow()</code></dt>
  
  <dd>
    
    <p>Element bude mít stín.</p>
    
    <pre><code>.stin {
  filter: drop-shadow(10px 10px 10px red);
}</code></pre>
    
    <p>Nastavování stínu je stejné jako u vlastnosti <a href="/box-shadow"><code>box-shadow</code></a>:</p>
    
    <ol>
      <li>První hodnota je <b>vodorovná vzdálenost</b> od objektu, kde se stín umístí. Kladné hodnoty vytvářejí stín vpravo, záporné vlevo.</li>
      
      <li>Druhá hodnota je totéž <b>svisle</b>. Kladná hodnota vytvoří stín pod elementem, záporná nad.</li>
      
      <li>Třetí hodnota je <b>intensita stínu</b>.</li>
      
      <li>Poslední hodnota je barva stínu.</li>
    </ol>
    
  </dd>
  
  <dt id="grayscale"><code>grayscale()</code></dt>
  
  <dd>
    
    <p>Hodí se k vytváření černobílých elementů. V samostatném článku jsou další možnosti <a href="/cernobily-obrazek">černobílého efektu</a>.</p>
    
    <pre><code>.cernobily {
  filter: grayscale(100%);
}</code></pre>
    
    <p>Hodnota <code>100%</code> vytvoří element 100% černobílý, nula by způsobila, že bude vypadat jako bez filtru.</p>
    
   <p class="live nosource"><b>Černobílý:</b> <input type="range" data-jednotky="%" data-filter="grayscale" min="0" max="100" value="0" onchange="nastavitFiltr(this)"></p>     
  </dd>
  
  <dt id="hue-rotate"><code>hue-rotate()</code></dt>
  
  <dd>
    
    <p>Dokáže <i>otočit barvy</i>. Co to znamená? Všechny barvy elementu/obrázku se přesunou do jiného spektra. Můžeme tak snadno <b>přebarvit celý web</b>.</p>
    
    <pre><code>.otocene-barvy {
  filter: hue-rotate(90deg);
}</code></pre>
    
    <p>Hodnota se zadává jako úhel, tj. <code>0deg</code> až <code>360deg</code>.</p>
    
    <p class="live nosource"><b>Otočit barvy:</b> <input type="range" data-jednotky="deg" data-filter="hue-rotate" min="0" max="360" value="0" onchange="nastavitFiltr(this)" oninput="nastavitFiltr(this)"></p>
  </dd>
  
  <dt id="invert"><code>invert()</code></dt>
  <dd>
    
    <p>Invertuje barvy.</p>
    
    <pre><code>.negativ {
  filter: invert(100%);
}</code></pre>
    
    <p>Nižší hodnoty než maximální stovka (<code>100%</code>) způsobí dle očekávání jen částečný efekt.</p>
    
   <p class="live nosource"><b>Invertovat barvy:</b> <input type="range" data-jednotky="%" data-filter="invert" min="0" max="100" value="0" onchange="nastavitFiltr(this)"></p> 
  </dd>
  
  <dt id="opacity"><code>opacity()</code></dt>
  
  <dd>
    
    <p>Vytváří průhlednost. To umí i samotná <a href="/opacity"><code>opacity</code></a>. Výhoda filtru <code>opacity</code> před <b>vlastností</b> by mohla být <b>HW akcelerace</b> v některých prohlížečích.</p>
    
    <ul>
      
      <li><code>0%</code> – element je úplně průhledný</li>
      
      <li><code>100%</code> – element vypadá jako bez filtru</li>
    </ul>
    
    <p class="live nosource"><b>Průhlednost:</b> <input type="range" data-jednotky="%" data-filter="opacity" min="0" max="100" value="100" onchange="nastavitFiltr(this)"></p>    
  </dd>
  
  <dt id="saturate"><code>saturate()</code></dt>
  
  <dd>
    
    <pre><code>.hodne-syty {
  -webkit-filter: saturate(200%);
}</code></pre>
    
    <p>Ovlivňuje <b>sytost barev</b>.</p>
    
    <ul>
      <li><code>0%</code> – minimální sytost</li>
      <li><code>100%</code> – původní podoba</li>
      <li><code>200%</code> – maximální sytost</li>
    </ul>
    
      <p class="live nosource"><b>Sytost:</b> <input type="range" data-jednotky="%" data-filter="saturate" min="0" max="200" value="100" onchange="nastavitFiltr(this)"></p>
  </dd>
  
  <dt id="sepia"><code>sepia()</code></dt>
  
  <dd>
    <p>Umožní vytvořit <b>efekt staré fotografie</b>.</p>
    
    <pre><code>.stara-fotografie {
  filter: sepia(100%);
}</code></pre>
    
    <ul>
      
      <li><code>0%</code> – původní podoba</li>
      
      <li><code>100%</code> – maximální intensita efektu</li>
    </ul>
    
    <p class="live nosource"><b>Stará fotografie:</b> <input type="range" data-jednotky="%" data-filter="sepia" min="0" max="100" value="0" onchange="nastavitFiltr(this)"></p>    
  </dd>
   
  <dt id="url"><code>url()</code></dt>
  
  <dd>
    
    <p>Použití <code>url</code> je zvláštní druh filtru, který umožňuje aplikovat na element filtr z SVG.</p>
  </dd>
</dl>

<h2 id="jednotky">Zápis jednotek</h2>

<p>Při zadávání filtrů si je možné povšimnout, že se používají:</p>

<ul>
  
  <li>Délkové jednotky (<code>px</code> apod.).</li>
  <li>Stupně (<code>deg</code>).</li>
  <li>Procenta.</li>
  
</ul>

<p>A právě <b>místo procent</b> se mohou psát i čísla od 0 do 2.</p>

<ul>
  <li><code>0</code> = <code>0%</code></li>
  <li><code>0.5</code> = <code>.5</code> = <code>50%</code></li>
  <li><code>1</code> = <code>100%</code></li>
  <li><code>1.5</code> = <code>1.5</code> = <code>150%</code></li>
  <li><code>2</code> = <code>200%</code></li>
</ul>

<h2 id="odkazy">Odkazy</h2>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/filter">MDN: filter</a></li>
  <li><a href="http://devdocs.io/css/filter">DevDocs</a></li>
  <li><a href="https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html">W3C: Filter Effects Module Level 1</a></li>
  <li><a href="http://www.html5rocks.com/en/tutorials/filters/understanding-css/">Understanding CSS Filter Effects</a></li>
  
  <li><a href="http://una.im/CSSgram/">CSSgram</a> – knihovna filtrů z Instagramu</li>
</ul>

<script>
function nastavitFiltr(el) {
    var filtr = el.getAttribute("data-filter") + "(" + el.value + el.getAttribute("data-jednotky") + ")";
    document.body.style.cssText = "-webkit-filter:" + filtr + ";-moz-filter:" + filtr + "-ms-filter:" + filtr + ";filter:" + filtr;
}
</script>