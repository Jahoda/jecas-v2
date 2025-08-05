---
title: "Hover efekty s box-shadow"
headline: "Hover efekty s <code>box-shadow</code>"
description: "Zajímavé <code>:hover</code> efekty s využitím CSS vlastnosti <code>box-shadow</code>."
date: "2014-08-11"
last_modification: "2014-08-11"
status: 1
tags: ["css", "hotova-reseni", "menu", "webove-animace"]
format: "html"
---

<p>CSS vlastnost pro <b>vytváření stínů</b> <a href="/box-shadow"><code>box-shadow</code></a> je popsána na samostatné stránce i s <b>generátorem stínů</b>.</p>

<p>Kromě klasických stínů jde použít <code>box-shadow</code> v kombinaci s <a href="/transition"><code>transition</code></a> i k zajímavým efektům po <b>najetí myši</b> (<a href="/css-selektory#uzivatelske-akce"><code>:hover</code></a>).</p>

<p>Jak to <b>funguje</b>?</p>

<ol>
  <li>
    <p>Stín se nastaví jako vnitřní (<code>inset</code>).</p>
    <pre><code>box-shadow: <b>inset</b> …;</code></pre>
  </li>
  <li>
    <p>Vynulují se <b>všechny hodnoty</b> (vodorovná posice, svislá posice, rozmazání, velikost).</p>
    
  </li>
  
  <li>
    <p>Při <code>:hover</code>u se svislá/vodorovná hodnota <b>změní</b> (kladně nebo záporně), čímž docílíme požadovaného efektu.</p>
    <pre><code>box-shadow: inset <b>100px</b> 0 0 0 #0D6AB7;</code></pre>
  </li>
  
  <li>
    <p>Plynulou změnu <code>box-shadow</code> během 300 milisekund (0,3 vteřiny) zajistí <code>transition</code>.</p>
    <pre><code>transition: box-shadow .3s;</code></pre>
  </li>
</ol>


<h2 id="vodorovne">Vodorovné přebarvení</h2>

<div class="live">
<style>
.vodorovne a {
    display: block;
    font-family: Segoe UI;
    color: #000;
    font-weight: bold;
    padding: 1em 0;
    width: 100px;
    text-align: center;
    text-decoration: none;
    background: #1081DD;
    transition: color .3s, box-shadow .3s;
    box-shadow: inset 0px 0 0 0 #0D6AB7;
}

.vodorovne a:hover {
    box-shadow: inset 100px 0 0 0 #0D6AB7;
    color: #fff;
    background: #1081DD;
}
</style>
  <div class="vodorovne">
    <a href="">Odkaz</a>
    <a href="">Odkaz</a>
    <a href="">Odkaz</a>      
  </div>
</div>

<p><a href="http://kod.djpw.cz/oxeb">Samostatná ukázka</a></p>



<h2 id="svisle">Svislé přebarvení</h2>


<h3 id="shora">Shora</h3>
<div class="live">
<style>
.svisle a {
    display: inline-block;
    font-family: Segoe UI;
    color: #000;
    font-weight: bold;
    padding: 1em 0;
    width: 100px;
    text-align: center;
    text-decoration: none;
    background: #1081DD;
    transition: color .3s, box-shadow .3s;
    box-shadow: inset 0px 0 0 0 #0D6AB7;
}

.svisle a:hover {
    box-shadow: inset 0 70px 0 0 #0D6AB7;
    color: #fff;
    background: #1081DD;
}
</style>
  <div class="svisle">
    <a href="">Odkaz</a>
    <a href="">Odkaz</a>
    <a href="">Odkaz</a>      
  </div>
</div>


<h3 id="zdola">Zdola</h3>

<div class="live">
<style>
.svisle-nahoru a {
    display: inline-block;
    font-family: Segoe UI;
    color: #000;
    font-weight: bold;
    padding: 1em 0;
    width: 100px;
    text-align: center;
    text-decoration: none;
    background: #1081DD;
    transition: color .3s, box-shadow .3s;
    box-shadow: inset 0px 0 0 0 #0D6AB7;
}

.svisle-nahoru a:hover {
    box-shadow: inset 0 -70px 0 0 #0D6AB7;
    color: #fff;
    background: #1081DD;
}
</style>
  <div class="svisle-nahoru">
    <a href="">Odkaz</a>
    <a href="">Odkaz</a>
    <a href="">Odkaz</a>      
  </div>
</div>


<h3 id="trochu">Jenom trochu</h3>

<div class="live">
<style>
.svisle-nahoru-malo a {
    display: inline-block;
    font-family: Segoe UI;
    color: #000;
    font-weight: bold;
    padding: 1em 0;
    width: 100px;
    text-align: center;
    text-decoration: none;
    background: #1081DD;
    transition: color .3s, box-shadow .3s;
    box-shadow: inset 0px 0 0 0 #0D6AB7;
}

.svisle-nahoru-malo a:hover {
    box-shadow: inset 0 -10px 0 0 #0D6AB7;
    color: #fff;
    background: #1081DD;
}
</style>
  <div class="svisle-nahoru-malo">
    <a href="">Odkaz</a>
    <a href="">Odkaz</a>
    <a href="">Odkaz</a>      
  </div>
</div>

<p><a href="http://kod.djpw.cz/oxeb">Samostatná ukázka</a></p>

<p>Podobný <code>:hover</code> efekt je možné vidět na <b>Twitteru</b>, ale tam je to řešené změnou tloušťky spodního okraje (<code>border-bottom-width</code>)</p>

<p><img src="/files/hover-efekty-box-shadow/twitter.gif" alt="Hover efekt na Twitteru" class="border"></p>

<p>Kromě slabší podpory pro <code>box-shadow</code> v prohlížečích (<b>IE 9</b>+) se zdá řešení používající stín výhodnější, protože se nemusí řešit <b>ovlivnění okolních elementů</b>.</p>