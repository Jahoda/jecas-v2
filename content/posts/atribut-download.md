---
title: "Atribut download"
headline: "HTML atribut <code>download</code>"
description: "HTML atribut <code>download</code> zlepšuje uživatelský dojem ze stahovaného souboru."
date: "2014-04-15"
last_modification: "2022-07-25"
status: 1
tags: ["html", "html-atributy"]
format: "html"
---

<h2 id="zapis">Zápis</h2>
<pre><code>&lt;a href="adresa-souboru" <b>download="Název souboru"</b>>
  Odkaz
&lt;/a></code></pre>

<h2 id="podpora">Podpora</h2>

<p>Atribut <code>download</code> funguje jen v některých prohlížečích.</p>

<ul>
  <li><b>Chrome 14+</b></li>
  <li><b>Firefox 20+</b></li>
  <li><b>Opera 15+</b></li>
</ul>

<h2 id="vyuziti">Využití</h2>

<p>Atribut pro <b>stahování souborů</b> má hned dvě užitečné funkce.</p>

<ol>
  
  <li>
    <p>Umožňuje <b>nastavit název souboru</b> po stažení na disk.</p>
    
    <p>Cíl odkazu (<code>href</code>) tedy může být klidně nějaký nesmyslný hash, avšak (v podporovaných prohlížečích) se uloží pod uživatelsky přívětivým jménem, které do <code>download</code>u nastavíme.</p>
    
    <p><b>Příponu souboru</b> je do <code>download</code>u možné zadat, ale <b>není to nutné</b> (přípona se potom převezme ze stahovaného souboru). Stejně tak není nutné zadávat samotný název (převezme se z názvu souboru).</p>
  </li>
  
  <li>
    
    <p>Atribut <code>download</code> vyvolá <b>dialog pro stahování</b> i u souboru známého typu (obrázek, HTML stránka).</p>
    
    <p>Ano, přidáním <code>download</code>u jde snadno nabídnout <b>stažení HTML stránky</b>.</p>
    
    <p>Řeší to tedy problém, kdy je cílem nabídnout soubor známého typu rovnou ke stažení. V PHP se to řeší třeba následovně:</p>
    
    <pre><code>header("Content-Type: application/download");
header("Content-Disposition: attachment; filename=$soubor");
header("Content-Length: " . filesize($soubor));
readfile($soubor);</code></pre>
  </li>
  
  <li>
    <p>Stahování lze vyvolat <b>na straně klienta</b>. Stačí obsah uložit do odkazu přes <a href="/data-uri">data URL</a> a přidat <code>download</code>. Po kliknutí prohlížeč nabídne stahování. <a href="http://kod.djpw.cz/ducb-">Ukázka</a> stažení obrázku nakresleného do <a href="/canvas"><code>&lt;canvas></code>u</a>.
    </p>
  </li>
</ol>

<h2 id="ukazka">Ukázka</h2>

<p>V podporovaných prohlížečích je možné vyzkoušet <code>download</code> přímo v akci:</p>

<div class="live">
  <a 
    href="http://jecas.cz/files/article/atribut-download.png" 
    download="Atribut download"
  >
    Stáhnout obrázek
  </a>
  <br>
  <a 
    href="http://jecas.cz/atribut-download" 
    download
  >
    Stáhnout stránku
  </a>
</div>








<h2 id="js">Stažení souboru v JavaScriptu</h2>

<p>Využít <code>download</code> atributu jde i v JS. Je tak možné uživateli umožnit cokoliv stáhnout po kliknutí jako soubor. <a href="http://kod.djpw.cz/kngd">Ukázka</a></p>

<pre><code>function download(text, filename) {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}</code></pre>