---
title: "HTML Canvas"
headline: "HTML <code>&lt;canvas></code>"
description: "Canvas je HTML značka pro kreslení v prohlížeči pomocí JavaScriptu."
date: "2014-11-06"
last_modification: "2016-01-04"
status: 1
tags: ["html", "html-tagy", "js"]
format: "html"
---

<p>Anglický výraz <i lang="en">canvas</i> jde přeložit do češtiny jako <b>plátno</b>.</p>

<p>Před <code>&lt;canvas></code>em byl prakticky jediný způsob, jak něco JavaScriptem na stránce nakreslit, vytváření HTML elementů a jejich vhodné stylování.</p>

<div class="internal-content">
  <ul>
    <li><a href="/css-kresleni">Kreslení v CSS</a> – vytváření různých tvarů v CSS</li>
  </ul>
</div>

<p>Canvas umožňuje libovolně kreslit doslova pixel po pixelu.</p>





<h2 id="podpora">Podpora</h2>

<p>Kreslení do <code>&lt;canvas></code>u je široce podporováno napříč prohlížeči.</p>

<p>Nejméně zastaralý prohlížeč, kde podpora chybí, je <b>Internet Explorer 8</b>.</p>

<p>Mobilní prohlížeč <b>Opera Mini</b> potom neumí <code>&lt;canvas></code> animovat.</p>





<h2 id="zapis">Zápis</h2>

<p>Značka <code>&lt;canvas></code> sama o sobě nedělá prakticky nic.</p>

<p>Kromě <a href="/obecne-atributy">globálních atributů</a> (<code>id</code>, <code>title</code> a podobně) podporuje pouze nastavení rozměrů přes <code>width</code> a <code>height</code> (jednotky <code>px</code> se neuvádí, byť se s jejich přítomností dokáží prohlížeče vypořádat).</p>


<pre><code>&lt;canvas width="300" height="300" id="platno">
  &lt;p>Prohlížeč nepodporuje canvas.&lt;/p>
&lt;/canvas></code></pre>



<p>Do obsahu značky jde umístit obsah pro prohlížeče, co <code>&lt;canvas></code> neznají – tedy například <b>IE 8</b> a starší.</p>





<h2 id="kresleni">Kreslení</h2>

<p>Aby se plátno nějak projevilo, musí se na něj něco nakreslit. To se dělá JavaScriptem:</p>

<pre><code>var canvas = document.getElementById("platno");
var ctx = canvas.getContext("2d");</code></pre>


<p>První řádek <a href="/getelement">vybere</a> značku <code>&lt;canvas></code>, druhý si vytáhne její 2D kontext (existuje ještě 3D kontext).</p>

<p>Do <i>kontextu</i> je nyní možné psát a kreslit. <a href="http://kod.djpw.cz/oiqb">Ukázka</a>:</p>

<div class="live">
  <canvas width="300" height="110" id="platno">
    <p>Prohlížeč nepodporuje canvas.</p>
  </canvas>
  <script>
    var platno = document.getElementById("platno");
    var ctx = platno.getContext("2d");
    
    ctx.fillStyle = "#0D6AB7";
    ctx.fillRect(10, 10, 100, 100);
    
    ctx.fillStyle = "#1081DD";
    ctx.fillRect(0, 0, 100, 100);
    
    ctx.moveTo(110, 60);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#0D6AB7';
    ctx.lineTo(280, 60);
    ctx.stroke();
    
    ctx.fillStyle = "#0D6AB7";
    ctx.font = 'bold 30pt Arial';
    ctx.fillText('Je čas', 150, 50);
    
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(50, 50, 20, 0, 2 * Math.PI, false);
    ctx.fill();    
  </script>
</div>

<p>Pro lepší pochopení jsou ideální ukázky na stránce html5canvastutorials.com, kde jde přímo upravovat kód a rovnou vidět, jak se výsledek mění:</p>

<div class="external-content">
  <ul>
      <li><a href="http://www.html5canvastutorials.com/">HTML5 Canvas Tutorials</a> – živé ukázky kreslení různých tvarů do <code>&lt;canvas></code>u</li>
  </ul>
</div>

<h2 id="specifika">Specifika „plátna“</h2>

<p>Kreslení do <i>canvasu</i> je maximálně nízkoúrovňové. Pokud se na plátno nakreslí čára, plátno to <i>nijak neví</i> – pouze se v něm přebarvily pixely na místě, kudy čára vede.</p>

<p>Zpětně tedy není možné zjistit, kudy čára vedla, a třeba ji jednoduše přesunout jinam. Canvas funguje podobně jako staré malování ve <a href="/windows">Windows</a>.</p>

<p>V praxi se to řeší tak, že jsou informace o nakreslených položkách uloženy v JS objektu a při změnách se celé plátno překreslí.</p>

<p>Kreslení do <code>&lt;canvas></code>u je hodně rychlé, takže překreslování moc nevadí.</p>

<h2 id="vyuziti">Využití</h2>

<h3 id="upravy">Úprava obrázků</h3>

<p>Asi nejzajímavější je využití pro úpravu obrázků. Díky <code>&lt;canvas></code>u existuje řada grafických editorů fungujících přímo v prohlížeči:</p>


<div class="internal-content">
  <ul>
    <li><a href="/graficky-editor">Grafické editory v prohlížeči</a> – využívající <i>canvas</i> nebo <a href="/svg">SVG</a></li>
  </ul>
</div>

<p>Pro <b>základní úpravy obrázků</b>, jako je změna rozměrů, otočení nebo převrácení, není díky plátnu a JS nutné tyto operace provádět na straně serveru. To šetří výkon serveru a zlepšuje rychlost odezvy u uživatele, protože se každá úprava nemusí přenášet tam a zase zpátky.</p>

<h3 id="grafy">Grafy</h3>

<p>Pro kreslení grafů pomocí JS je <i>canvas</i> možné řešení. Pro interaktivní grafy je ale jednodušší používat SVG – jednotlivé prvky grafu u SVG jsou prvky <a href="/dom">DOMu</a>, takže je pohodlnější na ně navázat různé <a href="/js-udalosti">JS události</a>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/grafy">Vytváření grafů v JavaScriptu</a></li>
  </ul>
</div>


<h3 id="hry">Hry</h3>

<p>Většina <b>náročnějších her</b> běžících v prohlížeči vykresluje svůj obsah do plátna tvořeného značkou <code>&lt;canvas></code>.</p>

<p>Pro prohlížečové hry existují hotové enginy (2D i 3D), takže není obvykle nutné se starat o vykreslování na té nejnižší úrovni.</p>

<p>Jednodušší 2D hry se obejdou i bez <i>canvasu</i> a vystačí si s prostou manipulací HTML elementů.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul> 
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">Canvas API</a></li>  
  <li><a href="http://thenewcode.com/19/Introduction-to-HTML5-canvas">Introduction to HTML5 canvas</a></li>  
</ul>