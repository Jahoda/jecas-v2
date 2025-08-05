---
title: "Událost oninput"
headline: "JS událost <code>oninput</code>"
description: "JavaScriptová událost <code>oninput</code> zachytí práci s formulářovými políčky."
date: "2014-05-01"
last_modification: "2014-05-12"
status: 1
tags: ["js", "js-udalosti"]
format: "html"
---

<p>Odchytávání stavu, že uživatel <i>něco dělá</i> s formulářovým elementem <a href="/input"><code>&lt;input></code></a> není úplně jednoduché.</p>

<h2 id="onchange">Událost <code>onchange</code></h2>

<h3 id="input-text"><code>&lt;input type=text></code></h3>
<p>Například událost <code>onchange</code> u značky <code>&lt;input></code> reaguje, až když se ztratí <code>:focus</code>.</p>

<div class="live"><input onchange="zmena(this)"></div>

<h3 id="input-range"><code>&lt;input type=range></code></h3>
<p>U <a href="/input#type-range"><code>&lt;input type=range></code></a> je potom pro některé prohlížeče změna už samotné přesouvání jezdce a jinde se <code>onchange</code> vyvolá až při uvolnění tlačítka myši.</p>

<div class="live"><input type="range" onchange="zmena(this)" min=0 max=10 step=2></div>

<h3 id="select"><code>&lt;select></code></h3>
<div class="live">
  <select onchange="zmena(this)">
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>
</div>

<h3 id="input-radio"><code>&lt;input type=radio></code></h3>

<div class="live">
  <input type="radio" name="radio" onchange="zmena(this)"><input type="radio" name="radio" onchange="zmena(this)">
</div>

<h2 id="onkey">Události <code>onkeyup</code>, <code>onkeydown</code>, <code>onkeypress</code></h2>

<p>Pokud jsme tedy v textovém <code>&lt;input></code>u chtěli reagovat na každé <b>napsané písmeno</b>, bylo nutné odchytávat <b>stisk klávesy</b>.</p>

<h3 id="onkeyup"><code>onkeyup</code></h3>

<div class="live"><input onkeyup="zmena(this)"></div>

<h3 id="onkeydown"><code>onkeydown</code></h3>
<div class="live"><input onkeydown="zmena(this)"></div>

<h3 id="onkeypress"><code>onkeypress</code></h3>
<div class="live"><input onkeypress="zmena(this)"></div>


<h3 id="onpaste"><code>onpaste</code></h3>
<p>Problém pochopitelně nastane, když návštěvník bude chtít obsah vkládat ze <b>schránky</b> přes <b>kontextové menu</b> myší a podobně. Potom je řešení potřebnou událost spustit i při <code>onpaste</code> a pro případ, že se obsah přesune do pole myší ještě pro <code>onfocus</code>.</p>
<div class="live"><input onpaste="zmena(this)" onfocus="zmena(this)"></div>


<h2 id="oninput">Událost <code>oninput</code></h2>

<p>Událost <code>oninput</code>, funkční od <b>IE 9</b> by tuto nejednotnost měla řešit a spouštět se vždy, když se s políčkem nějak pracuje.</p>

<p>Kromě staré <b>Opery 12</b> všechny prohlížeče vyvolají <code>oninput</code> jen u textového pole, <code>&lt;input type=range></code> a <code>&lt;textarea></code>.</p>

<h3 id="textove-pole">Textové políčko</h3>
<div class="live"><input oninput="zmena(this)"></div>

<h3 id="posuvnik">Posuvník</h3>
<div class="live"><input type="range" oninput="zmena(this)" min=0 max=10 step=2></div>

<h3 id="textarea">Textarea</h3>

<div class="live"><textarea name="" id="" cols="30" rows="10" oninput="zmena(this)"></textarea></div>

<h3 id="zaskrtavatko">Zaškrtávátko</h3>
<p>U následujících prvků už <code>oninput</code> v nových prohlížečích nic nedělá.</p>

<div class="live"><input type="checkbox" oninput="zmena(this)"></div>

<h3 id="prepinac">Přepínač</h3>

<p>V <b>Opeře 12</b> je zajímavé, že se <code>oninput</code> vyvolá na obou <code>&lt;input></code>ech.</p>

<div class="live">
  <input type="radio" name="radio2" oninput="zmena(this)"><input type="radio" name="radio2" oninput="zmena(this)">
</div>

<h3 id="roleta">Roletový výběr</h3>
<div class="live">
  <select oninput="zmena(this)">
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>
</div>


<style>
  .live .zmena {display: inline-block; background: #fff; padding: 0 .2em; margin: 0 .2em}
</style>
<script>
  function zmena(el) {
    var span = document.createElement("span");
    span.className = "zmena";
    span.innerHTML = "Změna";
    el.parentNode.appendChild(span);
  }
</script>