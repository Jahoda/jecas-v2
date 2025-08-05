---
title: "Jak udělat screenshot webu"
headline: "Screenshot webu"
description: "Jak z webové stránky vytvořit obrázek (screenshot)."
date: "2015-07-28"
last_modification: "2015-08-03"
status: 1
tags: ["napady", "obrazky", "produktivita"]
format: "html"
---

<p>Pro <b>zachycení obrázku webové stránky</b> existuje minimálně 6 následujících možností:</p>

<ol>
  <li id="print-screen">
    <p>Použít standardní <b>klávesu pro zachycení obrazovky</b> <kbd>PrintScreen</kbd> (na některých klávesnicích <kbd>Prt Scr</kbd>) a výsledek vložit do grafického editoru a uložit. Klávesovou zkratkou <kbd>Alt</kbd> + <kbd>PrintScreen</kbd> jde zachytit obsah pouze <b>aktuálního okna</b>.</p>      
  </li>
  
  <li id="program">
    <p><b>Speciální program</b> typu <i>Výstřižky</i> ve Windows, kde jde v obrázku provádět i jednoduché úpravy:</p>
    
    <p><img src="/files/screenshot/vystrizky.png" alt="Výstřižky ve Windows" class="border"></p>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <p>Další šikovný program na tvorbu screenshotů je <a href="http://getsharex.com/">ShareX</a>.</p>
    
    <p><img src="/files/screenshot/sharex.png" alt="Screenshoty pomocí ShareX" class="border"></p>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <p>Celý proces tvorby a sdílení screenshotů dokáže <b>ohromně zrychlit</b>. Po stisknutí některé z klávesových zkratek rovnou nahraje obrázek na vybrané úložiště a zkopíruje do schránky odkaz.</p>
  </li>
  
  
  <li id="edge">
    <p>Prohlížeč <a href="/microsoft-edge">Microsoft Edge</a> dostupný ve <a href="/windows-10">Windows 10</a> má přímo v sobě zabudovanou funkci pro <b>zachycení obrázku stránky</b> s možností zvýrazňování a psaní poznámek:</p>
    
    
    <p><img src="/files/screenshot/edge.png" alt="Výstřizky v MS Edge" class="border"></p>
    
    
    
    
    
    
    
       
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  </li>
  
  
  <li id="rozsireni">
    <p>Do prohlížečů podporující rozšíření jako je <b>Chrome</b>, <b>Opera</b> nebo <b>Firefox</b> existují doplňky pro <b>zachycení celé stránky</b> včetně obsahu „pod ohybem“, který se zobrazí až po odrolování.</p>
    
    <p>Existuje jich obrovské množství (stačí zadat <i lang="en">screenshot</i> nebo <i lang="en">screen capture</i> do hledání rozšíření). Osvědčil se mi nástroj <b>FireShot</b>:</p>
    
    <div class="external-content">
      <ul>
        <li><p><a href="http://getfireshot.com/">FireShot</a> – tvorba screenshotů celé stránky ve Firefoxu, Chrome, IE i Opeře</p></li>
      </ul>
    </div>
    
  <p><img src="/files/screenshot/fireshot.png" alt="Screenshoty webu pomocí FireShotu" class="border"></p>
    
    
    
    
    
    
    
       
        
  </li>
  
  <li id="api">
    <p>Pro <b>automatisované získávání obrázku webu</b> na straně serveru existuje řada služeb nabízející API.</p>
    
    <p>Obrázek se v takovém případě vygeneruje v prohlížeči někde na cizím serveru.</p>
    
    <div class="internal-content">
      <ul>
        <li>
          <p><a href="/nahled-webu">Jak získat náhled webu?</a> – seznam služeb pro tvorbu screenshotů</p>
        </li>
      </ul>
    </div>
  </li>
  
  <li id="canvas">
    <p>Přibližný obrázek webu jde <b>vytvořit v JavaScriptu</b> na straně klienta pomocí kreslení na plátno <a href="/canvas"><code>&lt;canvas></code></a>.</p>
    
    <p>Skriptem se projde celý <a href="/dom">DOM</a> stránky, zjistí se styly jednotlivých elementů (metoda <a href="/zjisteni-css"><code>getComputedStyle</code></a>) a podle toho se stránka prvek po prvku nakreslí na plátno.</p>
    
    <div class="external-content">
      <ul><li><p><a href="http://html2canvas.hertzen.com/">html2canvas</a> – hotové řešení převádějící HTML na obrázek</p></li></ul>
    </div>
    
    <p>Po kliknutí na následující tlačítko se textový obsah tohoto článku nakreslí do <code>&lt;canvas></code>u a přidá na konec stránky (může to chvíli trvat):</p>
    
    <div class="live">
      <script src="/files/screenshot/html2canvas.js"></script>
      <script>     
        function screenShot(sourceElement) {
            html2canvas(sourceElement).then(function(canvas) {
                sourceElement.appendChild(canvas);
            });
            
        }  
      </script>
      <div>
        <button onclick="screenShot(document.querySelector('.text')); return false;">Vytvořit screenshot</button>
      </div>
    </div>
  </li>
</ol>


<style>
  .text canvas {
      border: 5px solid #000;
      max-width: 100%;
  }</style>