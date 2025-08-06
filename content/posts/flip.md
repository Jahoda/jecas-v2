---
title: "CSS flip (animované otočení)"
headline: "CSS flip a animace"
description: "Jak v CSS otočit obsah kolem svislé nebo vodorovné osy."
date: "2014-09-04"
last_modification: "2014-09-11"
status: 1
tags: ["css", "hotova-reseni", "webove-animace"]
format: "html"
---

<p>Od <b>IE 9</b> fungují v prohlížečích transformace za použití CSS vlastnosti <code>transform</code>. Jedním z mnoha, co tato vlastnost nabízí, je <b>svislé a vodorovné otočení</b>.</p>

<p>Pro <b>Chrome 35</b>, <b>IE 9</b> a <b>Safari 8</b> jsou nutné <a href="/css-prefixy">prefixy</a>. Ve staré <b>Opeře 12</b> otočení podle osy nefunguje (podporuje jen klasické <a href="/rotace">otočení</a>).</p>


<h2 id="zapis">Zápis</h2>

<pre><code>.svisle-otoceni {
  transform: rotate<b>Y</b>(20deg);
}
.vodorovne-otoceni {
  transform: rotate<b>X</b>(20deg);
}</code></pre>

<p>Funkce <code>rotate<b>Y</b></code> a <code>rotate<b>X</b></code> zajistí otočení kolem svislé, respektive vodorovné osy. Hodnota se zadává jako <b>úhel</b>. Kromě animací mají smysl hlavně hodnoty 0–180, potom nebo předtím (hodnota může být i záporná) se otočení opakuje.</p>

<script>
  function el(id) {
    return document.getElementById(id);
  }
  function upravitOtoceni() {
    var div = document.querySelector(".otoceni-podle-osy");
    div.style.transform = div.style.webkitTransform = div.style.msTransform = div.style.oTransform = "rotateX(" + el("hodnotaX").value + "deg)" + " rotateY(" + el("hodnotaY").value + "deg) ";
    div.style.transformOrigin = div.style.webkitTransformOrigin = div.style.msTransformOrigin = div.style.oTransformOrigin = el("osaX").value + "% " +  el("osaY").value + "%"; 
  }
</script>
<p><b>Vodorovné otočení:</b><span class="live">0 deg <input oninput="upravitOtoceni()" onchange="upravitOtoceni()" type="range" min="0" max="180" id="hodnotaY" value="0"> 180 deg</span></p>

<p><b>Svislé otočení:</b><span class="live">0 deg <input oninput="upravitOtoceni()" onchange="upravitOtoceni()" type="range" min="0" max="180" id="hodnotaX" value="0"> 180 deg</span></p>

<p><b>Vodorovná osa:</b><span class="live">0 % <input oninput="upravitOtoceni()" onchange="upravitOtoceni()" type="range" min="0" max="100" id="osaY" value="50"> 100 %</span></p>

<p><b>Svislá osa:</b><span class="live">0 % <input oninput="upravitOtoceni()" onchange="upravitOtoceni()" type="range" min="0" max="100" id="osaX" value="50"> 100 %</span></p>

<div class="live">
  <style>
    .otoceni-podle-osy {
      width: 200px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background: #0D6AB7;
      color: #fff;
      font-size: 200%;
      transform: rotateY(20deg);
    }
  </style>
  <div class="otoceni-podle-osy">Text</div>
</div>

<p>Vlastností <code>transform<b>-origin</b></code> je možné upravit umístění osy, podle které se bude box překlápět.</p>

<p>Hodnotu je ideální zadávat v pixelech nebo procentech. Výchozí umístění je uprostřed (<code>50%</code>). Osu je možné mít i <b>mimo element</b>. První hodnota je posice <b>vodorovné osy</b>, druhá hodnota potom <b>svislé</b>.</p>

<pre><code>element {
  transform-origin: 50% 50%; /* výchozí */
}</code></pre>


<h2 id="perspektiva">3D perspektiva</h2>

<p>Zajímavěji může efekt vypadat při použití <i>3D perspektivy</i>.</p>

<p>To funguje v <b>Chrome</b>, <b>Firefoxu</b> a <b>nové Opeře</b>. Čím nižší hodnota se zadá, tím je „3D efekt“ mocnější.</p>

<pre><code>element {
  /* Webkit */
  -webkit-perspective: 500; 
  /* Firefox */
  -moz-transform-style: preserve-3d; 
  -moz-transform: perspective(500px);
}</code></pre>


<p>Otočení jde animovat pomocí <a href="/transition"><code>transition</code></a>. V podporovaných prohlížečích se po najetí myší na „Text“ provede otočení.</p>

<div class="live">
<style>
.otoceni-3d {
    width: 200px;
    
    -webkit-perspective: 500;
    -moz-transform-style: preserve-3d; 
    -moz-transform: perspective(500px);
}

.otoceni-3d > div {
    
    line-height: 100px;
    text-align: center;
    font-size: 80px;
    background: #0D6AB7;
    color: #fff;
    transition: all .5s;
    
    transform: rotateY(00deg);
    transform-origin: 100%;
    transform-style: preserve-3d;
}

.otoceni-3d:hover > div {
    transform: rotateY(180deg);
    
}
</style>
<div class="otoceni-3d">
    <div class="predni">
        Text
    </div>
</div>
</div>

<p><a href="https://kod.djpw.cz/epfb">Samostatná ukázka</a></p>



<h2 id="prakticke-pouziti">Praktické použití</h2>

<p>Díky této <b>transformaci</b> jde vytvořit poměrně efektní změnu obsahu po najetí myši. (V nepodporovaných prohlížečích se změna odehraje bez animace.)</p>

<p><img src="/files/flip/animace-otoceni.gif" alt="Ukázka animace" class="border"></p>

<p><a href="https://kod.djpw.cz/fpfb">Živá ukázka</a></p>