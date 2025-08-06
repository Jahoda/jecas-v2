---
title: "Hover efekty s text-shadow"
headline: "Hover efekty s <code>text-shadow</code>"
description: "Zajímavé <code>:hover</code> efekty s využitím CSS vlastnosti <code>text-shadow</code>."
date: "2014-08-12"
last_modification: "2014-08-12"
status: 1
tags: ["css", "hotova-reseni", "menu", "webove-animace"]
format: "html"
---

<p>Podobně jako lze k <code>:hover</code> efektům využít <a href="/hover-efekty-box-shadow">stíny boxu</a> (<code>box-shadow</code>), dost podobně se dá použít i <b>stín písma</b> – <code>text-shadow</code> (funguje od <b>IE 10</b>).</p>

<p>Symbolický zápis vlastnosti <code>text-shadow</code> je obdobný jako u <a href="/box-shadow"><code><b>box</b>-shadow</code></a>:</p>

<pre><code>element {
  text-shadow: <i>vodorovné</i> <i>svislé umístění</i> <i>rozmazání</i> <i>barva</i>;
}</code></pre>

<p>Pokud vynulujeme <b>rozmazání</b>, vznikne tak v podstatě <b>duplikát</b> původního textu, který může díky <a href="/transition"><code>transition</code></a> plynule přilétat nebo odlétat.</p>

<h2 id="shora">Shora</h2>

<div class="live">
  <style>
    .shora a {
        display: inline-block;
        font-family: Segoe UI;
        color: #000;
        font-weight: bold;
        padding: 1em 0;
        width: 100px;
        text-align: center;
        text-decoration: none;
        background: #1081DD;
        transition: color .3s, text-shadow .3s;
        text-shadow: 0 -40px 0 #000;
        overflow: hidden;
    }
    
    .shora a:hover {
        text-shadow: 0 0 0 #fff;
        color: #fff;
    }    
  </style>
  <div class="shora">
    <a href="">Odkaz</a>
    <a href="">Další odkaz</a>
    <a href="">Odkaz</a>
  </div>
</div>

<p><a href="https://kod.djpw.cz/rxeb">Samostatná živá ukázka</a></p>

<h2 id="zdola">Zdola</h2>

<div class="live">
  <style>
    .zdola a {
        display: inline-block;
        font-family: Segoe UI;
        color: #000;
        font-weight: bold;
        padding: 1em 0;
        width: 100px;
        text-align: center;
        text-decoration: none;
        background: #1081DD;
        transition: color .3s, text-shadow .3s;
        text-shadow: 0 40px 0 #000;
        overflow: hidden;
    }
    
    .zdola a:hover {
        text-shadow: 0 0 0 #fff;
        color: #fff;
    }    
  </style>
  <div class="zdola">
    <a href="">Odkaz</a>
    <a href="">Další odkaz</a>
    <a href="">Odkaz</a>
  </div>
</div>

<h2 id="zleva">Zleva</h2>

<div class="live">
  <style>
    .zleva a {
        display: block;
        font-family: Segoe UI;
        color: #000;
        font-weight: bold;
        padding: 1em 0;
        width: 100px;
        text-align: center;
        text-decoration: none;
        background: #1081DD;
        transition: color .3s, text-shadow .3s;
        text-shadow: -100px 0 0 #000;
        overflow: hidden;
    }
    
    .zleva a:hover {
        text-shadow: 0 0 0 #fff;
        color: #fff;
    }    
  </style>
  <div class="zleva">
    <a href="">Odkaz</a>
    <a href="">Odkaz</a>
    <a href="">Odkaz</a>
  </div>
</div>


<h2 id="najednou">Z více stran najednou</h2>

<p>Stínů textu může být více. Přiletět tedy může zároveň stín shora i zdola nebo třeba 4 stíny ze <b>všech stran</b>.</p>

<div class="live">
  <style>
    .shora-zdola a {
        display: inline-block;
        font-family: Segoe UI;
        color: #000;
        font-weight: bold;
        padding: 1em 0;
        width: 100px;
        text-align: center;
        text-decoration: none;
        background: #1081DD;
        transition: color .3s, text-shadow .3s;
        text-shadow: 0 40px 0 #000, 0 -40px 0 #000;
        overflow: hidden;
    }
    
    .shora-zdola a:hover {
        text-shadow: 0 0 0 #fff;
        color: #fff;
    }    
  </style>
  <div class="shora-zdola">
    <a href="">Odkaz</a>
    <a href="">Další odkaz</a>
    <a href="">Odkaz</a>
  </div>
</div>

<p><a href="https://kod.djpw.cz/sxeb">Ukázka</a></p>


<h3 id="vsechny-strany">Všechny strany</h3>

<div class="live">
  <style>
    .vsechny-strany a {
        display: inline-block;
        font-family: Segoe UI;
        color: #000;
        font-weight: bold;
        padding: 1em 0;
        width: 100px;
        text-align: center;
        text-decoration: none;
        background: #1081DD;
        transition: color .3s, text-shadow .3s;
        text-shadow: 0 40px 0 #000, 0 -40px 0 #000, 100px 0 0 #000, -100px 0 0 #000;
        overflow: hidden;
    }
    
    .vsechny-strany a:hover {
        text-shadow: 0 0 0 #fff;
        color: #fff;
    }    
  </style>
  <div class="vsechny-strany">
    <a href="">Odkaz</a>
    <a href="">Další odkaz</a>
    <a href="">Odkaz</a>
  </div>
</div>

<p><a href="https://kod.djpw.cz/txeb">Ukázka</a></p>