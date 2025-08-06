---
title: "Grafický editor v prohlížeči"
headline: "Grafický editor v prohlížeči"
description: "Jaké jsou možnosti pro provádění úprav obrázků (zvýraznění, přidání popisků apod.) přímo v prohlížeči."
date: "2014-11-06"
last_modification: "2014-11-24"
status: 1
tags: ["js", "napady", "obrazky"]
format: "html"
---

<p>Při tvorbě základního <b>grafického editoru</b> přímo v prohlížeči máme v zásadě 3 možnosti.</p>

<ol>
  <li>
    <p>Jako pozadí plátna použít <b>původní obrázek</b> a nad ním vytvářet úpravy překrýváním <a href="/position#absolute">absolutně posicovanými</a> HTML elementy.</p>
    
    <p>Při volbě <i>Uložit</i> potom souřadnice, rozměry nebo text poslat na server, kde se obrázek překreslí.</p>
    
    <p>Jedná se o hodně pracnou metodu, neboť se <i>kreslení</i> bude muset realisovat dvakrát.</p>
  </li>
  
  <li>
    <p>Použít element <a href="/canvas"><code>&lt;canvas></code></a>. Do toho lze kreslit poměrně snadno a není problém výsledek uložit převedením na <a href="/data-uri">data URL</a> (<code>canvas.toDataURL()</code>), z čehož výsledný obrázek vyrobí krátký PHP skript, který se může volat <a href="/ajax">AJAXem</a>:</p>
    
    <pre><code>if (isset($_GET["data"])) {
  $img = str_replace('data:image/png;base64,', '', $_GET["data"]);
  $img = str_replace(' ', '+', $img);
  $data = base64_decode($img);
  $filename = md5($data) . ".png";
  file_put_contents($filename, $data);
  echo $filename; // vrátí název souboru
}</code></pre>
    
    <p>Zásadní nevýhoda <code>&lt;canvas></code>u tkví v tom, že je <b>nízkoúrovňový</b> – jednotlivé objekty se ihned po nakreslení stanou <b>součástí obrázku</b>. Je proto značně komplikované provádět primitivní úkony jako <b>přesun nakresleného objektu</b>, protože se musí <i>počítat</i> pixel po pixelu a celé plátno neustále <b>překreslovat od nuly</b>.</p>
    
    <div class="external-content">
      <ul>
        <li><a href="http://jsfiddle.net/Zevan/QZejF/3/">Jednoduchá ukázka přesunu s překreslováním</a></li>
        <li><a href="http://www.html5canvastutorials.com/labs/html5-canvas-drag-and-drop-resize-and-invert-images/">HTML5 Canvas Drag, Drop, and Resize Images</a> – přesun objektů v <code>&lt;canvas></code>u pomocí <a href="http://kineticjs.com/">KineticJS</a></li>
      </ul>
    </div>
  </li>
  
  <li>
    <p>Použít <a href="/svg"><b>SVG</b></a>, kde je každý objekt representován značkou v <a href="/dom">DOMu</a>, a před uložením ho nakreslit do <code>&lt;canvas></code>u, který se potom převede na data URL a uloží.</p>
    
    <div class="external-content">
      <ul>
        <li><a href="http://jsvectoreditor.googlecode.com/svn/trunk/index.html">Ukázka vektorového editoru používající SVG</a></li>
        
        <li><a href="http://raphaeljs.com/">Raphaël</a> – JS knihovna zjednodušující práci s vektorovou grafikou</li>
        
        <li><a href="http://editor.method.ac/">Method Draw</a></li>
        
        <li><a href="https://code.google.com/p/svg-edit/">svg-edit</a> (<a href="http://svg-edit.googlecode.com/svn/branches/stable/editor/svg-editor.html">demo</a>)</li>
      </ul>
    </div>
    <p><a href="https://kod.djpw.cz/jehb">Živá ukázka</a> převodu SVG na <i>data URL</i></p>
  </li>
</ol>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://www.photopea.com">Photopea</a> – online <i>Photoshop</i> – dokáže otevří PSD soubory</li>
</ul>