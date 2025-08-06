---
title: "Web Workers"
headline: "Web Workers"
description: "Web Workers je technologie, jak spustit nějaký JS kód, aniž by zdržoval reakce prohlížeče."
date: "2014-03-21"
last_modification: "2014-03-21"
status: 0
tags: []
format: "html"
---

<p>Když je na stránce nějaký JavaScript, jeho vykonávání na dobou běhu skriptu <b>zasekne prohlížeč</b>. Většina skriptů je velmi rychlých, takže ty záseky jsou minimální, že je člověk skoro nepostřehne.</p>

<p>Pro složitější výpočty se hodí použít <b>Web Workers</b> (přeloženo do češtiny <i>weboví dělníci</i>), protože takový skript <b>může běžet na pozadí</b>, aniž by blokoval používání stránky.</p>




<h2 id="podpora">Podpora</h2>

<p>Nejvíc chybí podpora v <b>IE 9</b> a starších. Ostatní běžně používané prohlížeče Workery podporují (<b>Chrome 4</b>, <b>Firefox 3.5</b>, <b>Opera 11.5</b> a novější).</p>

<p>Podpora jde otestovat následovně:</p>

<pre><code>if (window.Worker) {
  // prohlížeč podporuje Web Workers
}</code></pre>









<h2 id="pouziti">Použití</h2>

<p>Zvláštností <i>workeru</i> je, že spouští externí JS soubor.</p>

<p>Nejjednodušší použití tak je:</p>

<pre><code>var w = new Worker("skript.js");</code></pre>




<h2 id="predavani">Předávání informací</h2>

<p>Většinou nestačí pouhé spuštění skriptu, ale je také potřeba <b>předávat informace</b> mezi stránkou a <i>dělníkem</i> (<code>script.js</code>).</p>



<h3 id="worker">Z workeru na stránku</h3>

<p>Ve skriptu dělníka k tomu slouží metoda <code>postMessage</code>:</p>

<pre><code>postMessage("Zpráva z workeru");</code></pre>

<p>Ta se potom <i>poslouchá</i> na stránce přes <code>onmessage</code>:</p>

<pre><code>w.onmessage = function(event) {
  alert("Zpráva z workeru: " + event.data);
};</code></pre>








<h3 id="stranka">Ze stránky do workeru</h3>

<p>Druhým směrem je to velmi podobné. Obsah skriptu ve stránce:</p>

<pre><code>w.postMessage("Zpráva pro dělníka");</code></pre>

<p><i>Dělník</i> zprávu zjistí rovněž pomocí <code>onmessage</code>:</p>

<pre><code>onmessage = function(event) {
  console.log('Zpráva ze stránky: ' + event.data);
}</code></pre>







<h2 id="ukonceni">Ukončení <code>terminate()</code></h2>

<p>Pokud je podezření, že dělník pracuje už dlouho, může být užitečné ho ukončit, slouží k tomu metoda <code>terminate</code>:</p>

<pre><code>w.terminate();</code></pre>


<p>Nabízí se kód pro ukončení vytvořit pomocí časovače při spuštění dělníka:</p>

<pre><code>var w = new Worker("skript.js");
var casovac = setTimeout(function() {
  w.terminate();
}, 5 * 1000);</code></pre>





<p>Výše uvedený kód ukončí worker po 5000 milisekundách běhu.</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/Jahoda/web-worker">Spuštění zacykleného JS pomocí WebWorkers</a> – příklad použití pro spuštění zacykleného kódu bez zablokování prohlížeče</li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>HMTL5rocks: <a href="http://www.html5rocks.com/en/tutorials/workers/basics/">The Basics of Web Workers</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Using Web Workers</a></li>
  
  <li>W3 Schools: <a href="http://www.w3schools.com/html/html5_webworkers.asp">HTML5 Web Workers</a></li>
</ul>

