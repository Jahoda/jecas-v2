---
title: "Animace requestAnimationFrame"
headline: "Animace <code>requestAnimationFrame</code>"
description: "Animování pomocí <code>requestAnimationFrame</code> umožňuje vytvářet plynulejší a méně náročné animace."
date: "2015-09-30"
last_modification: "2015-09-30"
status: 0
tags: []
format: "html"
---

<p>V ideálním případě je dobré použít <b>animace vytvořené přímo v CSS</b> – pomocí <code>@keyframes</code> a vlastnosti <a href="/animation"><code>animation</code></a> či přes přechody <a href="/transition"><code>transition</code></a>.</p>

<p>Pro animace, na které je CSS krátké nebo má nedostatečnou podporu v prohlížečích, je nutné <b>použít JavaScript</b>.</p>



<h2 id="fps">60 FPS</h2>

<p>Pomyslnou hranicí, aby byla animace <b>krásně plynulá</b>, je dosažení stabilních 60 snímků za sekundu (anglicky <i lang="en"><b>f</b>rames <b>p</b>er <b>s</b>econd</i>).</p>

<p>Nabízí se tedy použít časovač <code>setTimeout</code>, který se 60 krát za vteřinu rekursivně zavolá další krok animace:</p>

<pre><code>var casovac;
function animace() {
  // Kód samotné animace
  …
  // Spuštění dalšího kroku animace
  casovac = setTimeout(
    animace,
    1000 / 60
  );
}

// Spuštění animace
animace();</code></pre>













<p>Funkce <code>animace</code> se bude volat neustále v intervalu <code>1000 / 60</code>, což je cca každých <b>16 milisekund</b> (občas interval 16 ms z tohoto důvodu vidět ve zdrojových kódech).</p>




<h3 id="problemy">Problémy časovače</h3>

<p>Použití prostého časovače <code>setTimeout</code> trpí několika problémy:</p>

<ol>
  <li>
    <p>Interval přesně <b>neodpovídá frekvenci monitoru</b>. Pokud je frekvence jiná než 60 Hz, neodpovídá jeden krok animace úměrně stejné době zobrazení na monitoru.</p>
    
    <p>Při nižší frekvenci monitoru logicky některé snímky vypadnou. Při vyšší, která nebude násobkem, potom některé kroky animace budou na více obnoveních a některé pouze na jednom.</p>
  </li>
  
  <li>
    <p>Pro <b>dojem plynulosti</b> je důležitější <b>konsistentní počet <i>framů</i> než jejich vysoký počet</b>. Když se počet snímků najednou sníží z vysoké hodnoty, lidské oko to bude vnímat jako zaseknutí. Bude-li počet snímků nížší neustále, výsledný dojem bude plynulý.</p>
    
    <p>Z tohoto důvodu mají některé počítačové hry tzv. <b>FPS lock</b> (zámek počtu snímků za sekundu) nastaven na 30 snímků. Hra vypadá plynuleji při stabilních 30 FPS než při 60 FPS, které se občas propadnou na 40 FPS. Ne jinak je tomu u animací v prohlížeči…</p>
    
    <div class="external-content">
      <ul>
        <li>IGN: <a href="http://www.ign.com/articles/2014/11/05/understanding-frame-rate-and-its-importance">Understanding the Importance of Frame Rate</a></li>
      </ul>
    </div>
  </li>
  
  
  <li>
    <p>U <b>animací</b> typicky <b>není tak podstatná doba běhu</b>, ale hlavně je užitečné, aby byly plynulé, když je návštěvník vidí.</p>
    
    <p>Pokud je <b>záložka s animujícím se webem neaktivní</b>, je zbytečné, aby časovač běžel (dnešní prohlížeče zpravidla v takovém případě automaticky snižují četnost časovače).</p>
    
    <p>Stejně tak v režimu úspory energie návštěvník ocení úspornější animaci s nižším FPS než přesně načasovanou animaci pomocí intervalu, která mu za chvíli vycucne baterii.</p>
  </li>
</ol>







<h2 id="vysvetleni">Vysvětlení <code>requestAnimationFrame</code></h2>

<p>Použití <code>requestAnimationFrame</code> přenese starosti ohledně intervalu spouštění animace na prohlížeč. Ten potom další krok animace spustí v okamžiku, <b>kdy uzná za vhodné</b>.</p>





<h2 id="podpora">Podpora</h2>

<p>Požadavek na snímek animace podporuje <b>IE 10+</b>, starší verse <b>Chrome</b>, <b>Firefoxu</b> a dalších ho podporují s <a href="/css-prefixy">prefixy</a>. Pro starší prohlížeče je použitelný polyfill, který použije pro animování hloupější časovač <code>setInterval</code>.</p>

<p>Nejjednodušší řešení vypadá takto:</p>

<pre><code>var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame || 
  window.setTimeout;</code></pre>






<p>Animování potom vypadá následovně:</p>

<pre><code>function animace() {
  // Kód samotné animace
  …
  // Spuštění dalšího kroku animace, až bude prohlížeč chtít
  rAF(animace);
}

// Spuštění animace, až se to bude hodit
rAF(animace);</code></pre>












<h2 id="odkazy">Odkazy jinam</h2>

<div class="external-content">
  <ul>
    <li>Paul Irish: <a href="http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/">requestAnimationFrame for Smart Animating</a> (<a href="https://gist.github.com/paulirish/1579671">rAF.js polyfill</a>)</li>
    
    <li>Paul Irish: <a href="http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision">requestAnimationFrame API: now with sub-millisecond precision</a></li>
    
    <li>CSS-Tricks: <a href="https://css-tricks.com/using-requestanimationframe/">Using requestAnimationFrame</a></li>
  </ul>
</div>