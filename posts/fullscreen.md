---
title: "Fullscreen"
headline: "Režim celé obrazovky"
description: "Jak je možné stránku přepnout do fullscreenu (režimu celé obrazovky)."
date: "2015-01-18"
last_modification: "2015-01-19"
status: 1
tags: ["css", "js", "selektory-css"]
format: "html"
---

<p>Prohlížeče mají obvykle tzv. <i>režim přes celou obrazovku</i>, kdy <b>zmizí ovládací prvky</b> prohlížeče i operačního systému a stránka se <b>zobrazí přes celý monitor</b>.</p>

<p>Obvykle se do <b>fullscreenu</b> přepíná klávesou <kbd>F11</kbd>. Přepnout zpět je možné opětovným stiskem <kbd>F11</kbd> (někdy i klávesou <kbd>Esc</kbd>).</p>

<p>Pomocí JS metody <code>requestFullscreen</code> jde přepnout do fullscreenu i <b>pouze určitý prvek stránky</b>.</p>



<h2 id="vyuziti">Využití</h2>

<p>Použít režim přes celou obrazovku se hodí v celé řadě případů – při použití HTML přehrávače značkou <code>&lt;video></code>, při vytváření HTML her nebo aplikací. U online editorů pro <b>psaní textu</b> jde fullscreenem vytvořit <i>režim nerušeného psaní</i>. Fullscreen se hodí i pro prohlížení <b>obrázkové galerie</b>.</p>





<h2 id="podpora">Podpora v prohlížečích</h2>

<p>V některých prohlížečích funguje pouze <b>s prefixy</b>.</p>

<ul>
  <li><b>Chrome 15+</b> (s prefixem <code>webkit</code>)</li>

  <li><b>Firefox 9+</b> (s prefixem <code>moz</code>)</li>

  <li><b>Internet Explorer 11+</b> (s prefixem <code>ms</code>)</li>

  <li><b>Opera 12.10</b></li>

  <li><b>Safari 5</b> (s prefixem <code>webkit</code>)</li>
</ul>

<p>Po přepnutí na celou obrazovku obvykle prohlížeč <b>zobrazí upozornění</b> s postupem, jak se přepnout zpátky.</p>

<figure>
  <img src="/files/fullscreen/chrome.png" alt="Upozornění v Chrome" class="border">
  <figcaption>Hláška v <b>Chrome</b></figcaption>
</figure>



<figure>
  <img src="/files/fullscreen/firefox.png" alt="Upozornění ve Firefoxu" class="border">
  <figcaption>Volby režimu celé obrazovky ve <b>Firefoxu</b></figcaption>
</figure>










<figure>
  <img src="/files/fullscreen/ie.png" alt="Upozornění v IE" class="border">
  <figcaption>Povolení fullscreenu v <b>Internet Exploreru</b></figcaption>
</figure>

<p>Upozornění po chvíli <b>zmizí</b> a uživatel to může <b>zapomenout</b>, takže je lepší přidat tlačítko, co fullscreen vypne.</p>



<h2 id="pouziti">Použití</h2>

<p>Následující funkce <code>zapnoutFullscreen</code> přepne předaný element do režimu přes celou obrazovku. Kód je tak komplikovaný kvůli prefixům pro různé prohlížeče.</p>

<pre><code>function zapnoutFullscreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } 
  else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  } 
  else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } 
  else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  }
}</code></pre>

<script>
function zapnoutFullscreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } 
  else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  } 
  else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } 
  else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  }
}  
</script>


<h3 id="vypnuti">Vypnutí fullscreenu</h3>

<p>Pro ukončení režimu celé obrazovky existuje metoda <code>exitFullscreen</code>. Opět má různou podobu napříč prohlížeči.</p>

<ul>
  <li><b>Firefox</b> – <code>moz<b>Cancel</b>FullScreen()</code>,</li>
   
  <li><b>Webkit</b> – <code>webkitExitFullscreen()</code>,</li>
  
  <li><b>IE</b> – <code>msExitFullscreen()</code></li>  
</ul>


<h2 id="ukazka">Ukázka</h2>

<p><button onclick="zapnoutFullscreen(this.parentNode.parentNode)">Přepnout samotný článek do fullscreenu</button></p>

<p>Jak je vidět na funkci předchozího tlačítka, výchozí podoba elementu v <b>režimu na celou obrazovku</b> nemusí vypadat nejlépe.</p>

<p>Bez úprav je pozadí fullscreenu v některých prohlížečích <font style="background: black; color: white">černé</font> (<b>Firefox</b>, <b>IE</b>), takže na něm není černý text bez explicitně nastaveného kontrastního pozadí vidět. Dále je potom nemožné obsahem elementu <b>rolovat</b>.</p>


<h2 id="css">CSS selektor <code>:fullscreen</code></h2>

<p>Pro pohodlné stylování existuje v CSS pseudo-třída <code>:fullscreen</code>. Nestačí ji psát jen s <a href="/css-prefixy">CSS prefixy</a>, ale <b>Firefox</b> a <b>Webkit</b> mají v názvu vlastnoti spojovník, tj. <code>-moz-full<b>-</b>screen</code> a <code>-webkit-full<b>-</b>screen</code>.</p>

<p>Selektory s prefixy nelze řetězit za sebe, ale deklarace se musí duplikovat:</p>

<pre><code>element:-webkit-full-screen {/* styly */}
element:-moz-full-screen {/* styly */}
element:-ms-fullscreen {/* styly */}</code></pre>



<p>Pseudo-třídu <code>:fullscreen</code> dostane <b>pouze element</b>, na který se použije JS metoda <code>requestFullscreen</code>.</p>

<p><a href="http://kod.djpw.cz/wpjb-">Živá ukázka</a></p>






<h2 id="blokovani-klaves">Blokování kláves</h2>

<p>Aby se dalo fullscreenu „zbavit“ nemusí po jeho aktivaci fungovat odchytávání kláves <kbd>Esc</kbd> nebo <kbd>F11</kbd>, které slouží k jeho ukončení.</p>

<div class="internal-content">
  <ul>
    <li><a href="/klavesy">Ovládání webu klávesami v JavaScriptu</a></li>
  </ul>
</div>

<p>Kód <kbd>Esc</kbd> je <code>27</code> a <kbd>F11</kbd> <code>122</code>, v režimu přes celou obrazovku je napříč prohlížeči nejde odchytávat (<kbd>Esc</kbd> ruší fullscreen, <kbd>F11</kbd> v <b>Chrome</b> funguje jako <kbd>Esc</kbd>).</p>

<p><a href="http://kod.djpw.cz/cqjb-">Živá ukázka</a></p>





<h2 id="ramy">Fullscreen z <code>&lt;iframe></code></h2>

<p>Zapnout fullscreen nejde „ven“ z <b>vnořeného rámu</b>.</p>




<h2 id="automaticke">Automatické přepnutí na celou obrazovku</h2>

<p>Přepnout do fullscreenu bez <b>přímé akce uživatele</b> není možné.</p>

<p><a href="http://kod.djpw.cz/hqjb-">Živá ukázka</a></p>

<p>Vysvětluje to <b>chybové varování</b>, které takový pokus vyvolá:</p>

<blockquote>
  <p>Failed to execute 'requestFullScreen' on 'Element': API can only be initiated by a user gesture.</p>
</blockquote>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode">Using fullscreen mode</a></li>
  
  <li>WHATWG: <a href="https://fullscreen.spec.whatwg.org/">Fullscreen API</a></li>
  
</ul>

<!-- i-l-u-s-t-r-a-c-e: http://kod.djpw.cz/xpjb -->