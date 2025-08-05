---
title: "Rotace"
headline: "Rotace obsahu"
description: "Napříč prohlížeči funkční řešení vytvoření svislého textu (otočeného o 90 stupňů)."
date: "2013-09-10"
last_modification: "2013-09-11"
status: 1
tags: ["css", "css-vlastnosti", "hotova-reseni"]
format: "html"
---

<p>V novějších prohlížečích (od Exploreru 9) lze pro <b>otočení textu</b> nebo jiného libovolného elementu použít CSS vlastnost <code>transform: rotate(-90deg)</code>. Pro některé prohlížeče je nutné použít prefix.</p>

<div class="live">
  <style>
    .otocit {transform: rotate(-90deg); -webkit-transform: rotate(-90deg); -ms-transform: rotate(-90deg); width: 4em}
  </style>
  <p class=otocit>Svisle napsaný text</p>
</div>


<blockquote>
  <p>Transformaci <code>rotate</code> <b>nejde aplikovat</b> na řádkové elementy (<a href="/display#inline"><code>display: inline</code></a>). Je potřeba nastavit <code>block</code> nebo <code>inline-block</code>.</p>
</blockquote>

<h2 id="transform-origin">Vlastnost <code>transform-origin</code></h2>
<p>Tato vlastnost umožní změnit střed otáčení. Výchozí je uprostřed (<code>center center</code>).</p>

<div class="live no-source">
  <script>
function otocit(stupne) {  
  var o = document.getElementById("kolik");
  otocny.style.transform = otocny.style.WebkitTransform  = otocny.style.msTransform = "rotate(" + stupne + "deg)";
  o.innerHTML = stupne;
}


function prepocitat() {
  var x = document.getElementById("x-offset");
  var y = document.getElementById("y-offset");
  otocny.style.transformOrigin = otocny.style.WebkitTransformOrigin = otocny.style.msTransformOrigin = x.value + " " + y.value;
  
  otocny.className = x.value + "-" + y.value;
} 
  </script>
  <style>
#otocit {
  background: navy;
  width: 100px;
  line-height: 30px;
  margin: 1em;
  color: #fff;
  text-align: center;
  position: relative;
}

#otocit u {
  position: absolute;
  background: red;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  z-index: 20;
}

.left-top u {left: -5px; top: -5px}
.left-bottom u {left: -5px; bottom: -5px}
.left-center u {left: -5px; top: 10px}

.right-top u {right: -5px; top: -5px}
.right-bottom u {right: -5px; bottom: -5px}
.right-center u {right: -5px; top: 10px}

.center-top u {left: 50%; margin-left: -5px; top: -5px}
.center-bottom u {left: 50%; margin-left: -5px; bottom: -5px}
.center-center u {left: 50%; margin-left: -5px; top: 10px}
  </style>
  <ul><li>
  <label>Otočit o 
  <input type="range" min=-360 max=360 step=10 value=0 
    onchange="otocit(this.value)">
    <b id="kolik">0</b> stupňů
 </label>
  <li>
  <label>X-offset
    <select id="x-offset" onchange="prepocitat()">
      <option value=left>left</option>
      <option value=right>right</option>
      <option value=center selected>center</option>
    </select></label>
    <li>
  <label>Y-offset
    <select id="y-offset" onchange="prepocitat()">
      <option value=top>top</option>
      <option value=bottom>bottom</option>
      <option value=center selected>center</option>
    </select></label>
  </ul>
  <div id="otocit" class="center-center">Text <u></u></div>
  <script>
var otocny = document.getElementById("otocit");
  </script>
</div>

<p>Kromě klíčových slov je možné zadávat <i>offset</i> v procentech (<code>50% 50%</code> odpovídá <code>center center</code>) nebo libovolných jiných jednotkách.</p>

<h2 id="stare-ie">CSS filtr rotace pro starší prohlížeče</h2>
<p>Pro starší Explorery je řešení ještě snazší — stačí pro otočení použít filtr.</p>
<pre><code>element {
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3)
}</code></pre>

<h3>Výsledek</h3>

<div class="live">
  <style>
    .otoceny {
      -webkit-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      transform: rotate(-90deg);
      =filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
      width: 4em
    }
  </style>
  <p class=otoceny>Svisle napsaný text</p>
</div>

<h3>Kód</h3>
<p><i>Krásně</i> zahnojený prefixy, ale měl by napříč prohlížeči zajisit svislé otočení textu.</p>
<pre><code>element {
      -webkit-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      transform: rotate(-90deg);
      =filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
      width: 4em
    }</code></pre>

<h3 id="filtr-matrix">Filtr <code>Matrix</code></h3>
<p>Kromě toho <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=3&amp;topic=151932#4">podporují starší Explorerové</a> filtr <code>Matrix</code>, kterým jde provést libovolnou 2D transformaci, tedy i otočení.</p>
<p>Existuje hezký nástroj, který umí CSS transformace převádět do IE a <i>jeho</i> <code>Matrix</code>u.</p>
<p><a href="http://www.useragentman.com/IETransformsTranslator/" class="button">IE's CSS3 
Transforms Translator</a></p>

<h2 id="odkazy">Odkazy</h2>
<ul>
  <li><a href="http://css-tricks.com/rotated-table-column-headers/">Svislé záhlaví tabulek</a></li>
</ul>