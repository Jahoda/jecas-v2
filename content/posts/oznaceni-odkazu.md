---
title: "Označení externích odkazů"
headline: "Označení interních a externích odkazů"
description: "Odlišení interních a externích odkazů a odkazů na soubory čistě v CSS."
date: "2013-10-15"
last_modification: "2013-10-15"
status: 1
tags: ["css", "hotova-reseni", "odkazy", "selektory-css"]
format: "html"
---

<style>
  /* reset */
  .text .live a[href^="/"] {background: none}
</style>
<p>S vyhynutím <b>IE 6</b> je bezpečně možné používat přímo v CSS <a href="/css-selektory#atributovy">selektory atributů</a>.</p>

<p>To vytváří prostor pro relativně jednoduchý způsob zaměření odkazů vedoucí:</p>
<ol>
  <li>na <b>cizí web</b>,</li>
  <li>na jinou <b>interní stránku</b>,</li>
  <li>na <b>soubor určitého typu</b>.</li>
</ol>

<p>Pro tyto účely je zajímavý selektor hledající <b>začátek</b> nebo <b>konec</b> atributu <code>href</code>.</p>

<dl>
  <dt>Adresa začíná…</dt>
  <dd><pre><code>E[atribut<b>^</b>="hodnota"]</code></pre></dd>
  <dt>Adresa končí…</dt>
  <dd><pre><code>E[atribut<b>$</b>="hodnota"]</code></pre></dd>
</dl>

<h2 id="externi">Odkaz na cizí web</h2>
<p>Pokud se pro <b>interní odkazy</b> neuvádí absolutní cesta a pro <b>externí</b> ano, bude v drtivé většině případů <b>externí odkaz</b> cokoliv začínající na <code>http://</code> nebo <code>https://</code>.</p>
<pre><code>a[href^="http://"], a[href^="https://"] {color: red}</code></pre>
<p>Pokud by se <b>absolutní cesty</b> používaly i pro interní odkazy, stačí pro danou doménu výše uvedené pravidlo <i>přebít</i>.</p>
<pre><code>a[href^="http://jecas.cz"] {color: green}</code></pre>

<div class="live">
  <div class="cizi">
    <style>
.cizi a[href^="http://"], .cizi a[href^="https://"] {color: red}
.cizi a[href^="http://jecas.cz"] {color: green}
    </style>
    <ul>
      <li><a href="http://saintsrow.cz">Saints Row</a>
      <li><a href="http://djpw.cz">DJPW</a> 
      <li><a href="http://jecas.cz">Je čas</a>  
    </ul>
  </div>
</div>

<h2 id="interni">Odkaz na vlastní web</h2>
<p><b>Relativní odkaz</b> na <b>vlastní web</b> bude začínat zpravidla na <code>/</code> nebo <code>.</code></p>
<pre><code>a[href^="/"], a[href^="."] {color: green}</code></pre>

<div class="live">
  <div class="vlastni">
    <style>
.vlastni a[href^="/"], .vlastni a[href^="."] {color: green}    
    </style>
    <ul>
      <li><a href="http://saintsrow.cz">Saints Row</a>
      <li><a href="http://djpw.cz">DJPW</a> 
        <li><a href="/opacity">Průhlednost</a>
          <li><a href="./opera">Opera</a>
    </ul>
  </div>
</div>

<h2 id="koncovka">Odkaz na soubor</h2>
<p>Při odkazování na soubor určitého typu lze nastavit specifický styl podle přípony, tedy konce odkazu. V tomto případě bude odkaz na PNG soubor červený.</p>
<pre><code>a[href$=".png"] {color: red}</code></pre>

<div class="live">
  <style>.soubor a[href$=".png"] {color: red}</style>
  <div class="soubor">
    <p>Odkaz na <a href="/blur">stránku</a> a <a href="/files/blur/ie9.png">obrázek</a>.</p>
  </div>
</div>

<h2 id="ikona">Ilustrační ikona</h2>
<p>Odkaz je ještě možné vyzdobit ikonou. Od <b>Internet Exploreru 7</b> ji lze docela úspěšně brát z <code>favicon.ico</code>.</p>
<p>Nejprve nadefinovat pro <b>externí odkazy</b> umístění obrázku:</p>
<pre><code>.ikona a[href^="http://"] {
  background: left center no-repeat; padding-left: 20px; background-size: 16px
}</code></pre>
<p>A pro jednotlivé stránky nastavit <code>favicon.ico</code> jako obrázek na pozadí.</p>
<pre><code>a[href^="<b>http://jecas.cz</b>"] {background-image: url(<b>http://jecas.cz/favicon.ico</b>)}</code></pre>

<div class="live">
  <style>
    .ikona a[href^="http://"] {background: left center no-repeat; padding-left: 20px; background-size: 16px}
    .ikona a[href^="http://saintsrow.cz"] {background-image: url(http://saintsrow.cz/favicon.ico)}
    .ikona a[href^="http://diskuse.jakpsatweb.cz"] {background-image: url(http://diskuse.jakpsatweb.cz/favicon.ico)}
    .ikona a[href^="http://seznam.cz"] {background-image: url(http://seznam.cz/favicon.ico)}
    .ikona a[href^="http://jecas.cz"] {background-image: url(http://jecas.cz/favicon.ico)}    
  </style>
  <div class="ikona">
    <ul>
          <li><a href="http://saintsrow.cz">Saints Row</a>
      <li><a href="http://diskuse.jakpsatweb.cz">DJPW</a> 
        <li><a href="http://jecas.cz">Je čas</a>
          <li><a href="http://seznam.cz">Seznam.cz</a>
    </ul>
  </div>
</div>

<p>V případě, že se z dané stránky na <b>jiné weby</b> s faviconou odkazuje často, je vhodné všechny ikony <b>spojit do jednoho <a href="/css-sprite">CSS spritu</a></b>.</p>

<h2 id="popisek">Textový popisek</h2>
<p>Kromě ikony můžeme i něco připsat vlastností <code><a href="/content-attr">content</a></code>.</p>
<pre><code>a[href^="http://jecas.cz"]:before {content: "jecas.cz"; background: #0D6AB7; color: #fff}</code></pre>

<div class="live">
  <style>.odkaz a[href^="http://jecas.cz"]:before {content: "jecas.cz"; background: #0D6AB7; color: #fff}</style>
  <div class="odkaz">
    <p><a href="http://jecas.cz/livereload">Automatické obnovení stránky</a></p>
  </div>
</div>