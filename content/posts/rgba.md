---
title: "Průhledné pozadí rgba()"
headline: "Zápis průhledné barvy <code>rgba()</code>"
description: "Zadávání barev v CSS pomocí <code>rgba()</code> umožňuje vytvořit průhledné jednobarevné pozadí."
date: "2014-02-15"
last_modification: "2014-05-23"
status: 1
tags: ["css", "css-funkce"]
format: "html"
---

<pre><code>element {
  background: rgba(255, 255, 255, 0.5);
}
</code></pre>

<p>První tři parametry (v rozsahu <code>0–255</code>) jsou intensity červené (<code>r</code>), zelené (<code>g</code>) a modré (<code>b</code>) barvy. Čtvrtý parametr je <i>alpha</i> — průhlednost. Průhlednost se zadává v rozmezí <code>0–1</code>, nulu před desetinnou tečkou je možné vypustit, tj. „<code>0.5</code>“ je totéž co „<code>.5</code>“.</p>

<p>Tento způsob nastavování barvy funguje od <b>IE 9</b>, pro starší prohlížeče existuje jednoduchý <i>fallback</i>, kdy se podobná barva, ale <b>bez průhlednosti</b>, zadá před tu průhlednou.</p>

<pre><code>element {
  background: gray; /* pro IE 8 a starší */
  background: rgba(255, 255, 255, 0.5);
}
</code></pre>

<h2 id="proc">Proč průhledné barvy?</h2>

<p>Kromě vytváření <a href="/opacity">průhledného obsahu</a> existuje ještě jeden důvod. Vhodným kombinováním:</p>

<ul>
  <li><b>průhledné černé</b> – <code>rgba(0, 0, 0, .5)</code></li>
  <li>a <b>průhledné bílé</b> – <code>rgba(255, 255, 255, .5)</code></li>
</ul>

<p>Je možné vytvořit barvy typu „o trochu tmavší/světlejší“. Celá stránka potom jde <i>přebarvit</i> na jednom místě – na pozadí. Ostatní elementy se relativně přizpůsobí.</p>

<div class="live">
  <style>
    .obal {background: red; padding: .5em}
    .obal div {padding: .1em .5em; color: #fff;}   
    .svetly {background: rgba(255, 255, 255, .5)}
    .tmavy {background: rgba(0, 0, 0, .5)}
    .stredni {background: rgba(0, 0, 0, .2)}
  </style>
  <script>
    function styl(barva) {
        document.getElementById("obal").style.background = barva;
    }
  </script>
  <div class="obal" id="obal">
    <p>
        <button onclick="styl('red')">Červená</button> <button onclick="styl('blue')">Modrá</button> <button onclick="styl('green')">Zelená</button>
    </p>    
    <div class="svetly">
        <p>Světlý obsah</p>
    </div>    
    <div class="tmavy">
        <p>Tmavy obsah</p>
    </div>    
    <div class="stredni">
        <p>Něco mezi</p>
    </div>
</div></div>

<p><a href="https://kod.djpw.cz/xybb">Samostatná ukázka</a>.</p>

<h2 id="ie8">IE 8 a starší</h2>

<p>Pro podporu v <b>IE 8</b> a starších je možné použít například <a href="/gradient">gradient filtr</a> (se stejnou počáteční i koncovou barvou), kterému se dá nastavit <b>průhlednost</b> (určují ji první dva znaky barvy).</p>

<h3 id="zesvetleni">Zesvětlení</h3>
<pre><code>filter: progid:DXImageTransform.Microsoft.gradient(
  GradientType=0,
  startColorstr='#<b>4c</b>ffffff', 
  endColorstr='#<b>4c</b>ffffff'
)</code></pre>

<h3 id="ztmaveni">Ztmavení</h3>
<pre><code>filter: progid:DXImageTransform.Microsoft.gradient(
  GradientType=0,
  startColorstr='#<b>4c</b>000000', 
  endColorstr='#<b>4c</b>000000'
)</code></pre>

<p><a href="https://kod.djpw.cz/yldb">Ukázka pro IE 8</a></p>

<p>Nesmí se zapomenout, že <b>IE 9</b> podporuje filtry i <code>rgba</code>, takže by se efekt při současném použití zdvojil. Nabízí se tedy <b>průhledný filtr</b> připojit s využitím <a href="/podminene-komentare">podmíněných komentářů</a> jen pro <b>IE 8</b>.</p>