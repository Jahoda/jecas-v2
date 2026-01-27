---
title: "Animace čísel"
headline: "Animace čísel"
description: "Animování číselných dat pomocí JavaScriptu."
date: "2014-01-19"
last_modification: "2014-01-20"
status: 1
tags: ["hotova-reseni", "js", "webove-animace"]
format: "html"
---

<p>Vytvářet na webu <a href="/webove-animace">animace</a> různých CSS vlastností je díky <a href="/transition"><code>transition</code></a> a <a href="/animation"><code>@animation</code></a> poměrně snadné, jak ale <i>animovat</i> čísla? To jest vytvořit <a href="/odpocitavani">odpočítávání</a>, kde se třeba desítka vymění za devítku, ta za osmičku a tak dále…</p>

<ol>
  <li>Jedna možnost je všechna čísla nastrkat do HTML kódu a šikovně je posouvat, až vytvoří <a href="/odpocitavani#css">výsledný efekt</a>. Pozor, vlastnost <a href="/content-attr"><code>content</code></a> <b>není možné animovat</b>.</li>

  <li>Při odpočítávání/dopočítávání větších čísel nebo dokonce čísel z desetinnými místy bude přece jenom elegantnější použít JS animaci, která bude přímo měnit obsah elementu <b>v HTML kódu</b>.</li>
</ol>

<h2>countUp.js</h2>
<p><a href="http://inorganik.github.io/countUp.js/" class="button">Stránka countUp.js</a> <a href="http://inorganik.github.io/countUp.js/" class="button">Demo</a></p>

<p>CountUp.js je hotové řešení plynulé změny čísel přes JavaScriptovou animaci.</p>

<!--
<div class="live">
  <script src="https://raw.githubusercontent.com/inorganik/countUp.js/master/dist/countUp.withPolyfill.min.js"></script>
  <div id="cislo" style="padding: 1em; background: #fff; font-family: Segoe UI; font-size: 200%">0</div>
  <script>
    var demo = new CountUp("cislo", 0, 1000, 2, 5);
    document.getElementById("cislo").onmouseover = function(){
      demo.start();
    };
    document.getElementById("cislo").onmouseout = function(){
      demo.stop();
      demo.reset();
    };    
  </script>
</div>
-->

<h3>Použití</h3>
<p>Použití je pohodlné. Po připojení <a href="https://github.com/inorganik/countUp.js/blob/master/countUp.js">skriptu</a> to vypadá následovně (pozn.: doba není v <b>milisekundách</b>, jak by se dalo čekat, ale ve <b>vteřinách</b>).</p>

<pre><code>var odpocet = new countUp("idElementu", prvniCislo, druheCislo, pocetDesetinnychMist, doba);
odpocet.start();</code></pre>

<p>Nakonec je možné animaci zastavit:</p>
<pre><code>odpocet.stop();</code></pre>

<p>Nebo resetovat.</p>
<pre><code>odpocet.reset();</code></pre>

<p>Pro použití na českém webu by bylo vhodné dle zvyklostí <b>prohodit desetinnou tečku</b> za čárku.</p>

<h3 id="podpora">Podpora v prohlížečích</h3>
<p>Animace jsou funkční i v <b>IE 6</b>.</p>