---
title: "Výška podle šířky v CSS"
headline: "Výška závislá na šířce"
description: "Jak v CSS nastavit výšku v závislosti na procentuální i pevné šířce."
date: "2014-09-10"
last_modification: "2014-09-10"
status: 1
tags: ["css", "hotova-reseni", "napady"]
format: "html"
---

<p>Při tvorbě webu, který má být <a href="/mobilni-web">responsivní</a>, se můžeme dostat do situace, kdy je šířka neznámá (zadána <b>v procentech</b>) a výšku potřebujeme takovou, aby se v určitém poměru odvozovala od výšky.</p>

<p><img src="/files/vyska-podle-sirky/stanoveni-vysky.png" alt="Stanovení výšky podle šířky" class="border"></p>

<p><small><b>Poznámka</b>: Nastavování výšky (<code>height</code>) často značí špatný postup. V případě, že v elementu s <i>natvrdo</i> nastavenou výškou bude nějaký text, je prakticky nemožné zajistit, aby se při <b>různých velikostech písma</b> řádně vešel.</small></p>


<h2 id="reseni">Řešení</h2>

<p>Celý trik spočívá v tom, že procentuální hodnota vlastnosti <code>padding</code> se <b>počítá z šířky rodiče</b>. Stačí tedy:</p>

<ol>
  <li>výšku vynulovat (<code>height: 0</code>),</li>
  <li>spodní <code>padding</code> nastavit na požadovaný procentuální podíl na šířce,</li>
  <li>použít obsahový <a href="/box-model">box model</a> (<code>box-sizing: content-box</code> – výchozí), který sčítá okraje a právě <code>padding</code> připočítává do výsledných rozměrů (výška je ale nulová, takže ji celou zajistí právě <code>padding</code>).</li>
</ol>

<pre><code>.box {
  height: 0;
  padding-bottom: 25%;
}</code></pre>

<p>Níže uvedený <code>&lt;div></code> má vždy čtvrtinovou výšku (25 %) oproti šířce, přesvědčte se změnou šířky jeho rodiče.</p>
<script>
  function upravitSirku(el) {
    document.querySelector(".podle-vysky").parentNode.style.width = el.value + "%";
  }
</script>
<p><span class="live">0 % <input oninput="upravitSirku(this)" onchange="upravitSirku(this)" type="range" min="0" max="100" id="rozmazani" value="100"> 100 %</span></p>

<div class="live">
  <style>
    .podle-vysky {
      height: 0;
      padding-bottom: 25%;
      background: #0D6AB7;
    }
  </style>
  <div class="podle-vysky"></div>
</div>



<h2 id="pevna-sirka">Pevná šířka v pixelech</h2>

<p>Je-li potřeba, aby byla výška závislá na šířce, ale ta má být <b>zadaná v pixelech</b>, není to problém. Obal elementu, co má mít výšku podle šířky, zkrátka bude mít rozměry v <code>px</code>. <a href="http://kod.djpw.cz/aofb">Ukázka</a>.</p>



<h2 id="proc-padding-bottom">Proč spodní <code>padding?</code></h2>

<p><b>Natáhnout výšku</b> je možné i horním <code>padding</code>em nebo kombinací (<code>padding-top</code> + <code>padding-bottom</code>). V případě samostatného <code>padding-top</code> to však má nevýhodu, že do elementu nepůjde rozumně <b>vkládat obsah</b>, protože celý začátek obsahu zabere právě <code>padding</code>.</p>

<p>Teoreticky to jde řešit odečtením <a href="/margin"><code>margin</code>u</a> (<a href="http://kod.djpw.cz/cofb">ukázka</a>) nebo <a href="/position: absolute">absolutně posicovaným</a> dalším elementem uvnitř (<a href="http://kod.djpw.cz/dofb">ukázka</a>).</p>

<p>Použít kombinaci může mít smysl právě pro <b>cílené odsazení</b> obsahu shora bez dalšího vnořeného <code>&lt;div></code>u (<a href="http://kod.djpw.cz/bofb">ukázka</a>).</p>



<h2 id="preteceni">Přetečení</h2>

<p>V případě, že by se obsah náhodou nevešel do vymezeného prostoru, nabízí se:</p>

<ul>
  <li><b>oříznutí</b> (<code>overflow: hidden</code> – <a href="http://kod.djpw.cz/fofb">ukázka</a>),</li>
  <li><b>zobrazení rolovací lišty</b> (<code>overflow: auto</code> – <a href="http://kod.djpw.cz/gofb">ukázka</a>), k tomu se ale hodí spíš ono <i>absolutní posicování</i>, jinak by se spodní <code>padding</code> započítal do výšky a vytvořil by ve <b>Webkitu</b> nežádoucí prostor na konci obsahu (<a href="http://kod.djpw.cz/eofb">ukázka</a>).</li>
</ul>


<h2 id="js">Řešení v JavaScriptu</h2>

<p>Ve stanoveném podílu lze výšku nastavovat i <b>JavaScriptem</b>. Jako výška se v takovém případě použije vydělená vlastnost <code>clientWidth</code>.</p>

<pre><code>el.style.height = (el.clientWidth / 4) + "px";</code></pre>

<p><a href="http://kod.djpw.cz/hofb">Ukázka obou postupů</a></p>