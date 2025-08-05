---
title: "Sublime Text 3 pluginy"
headline: "Pluginy v Sublime Text"
description: "Už tak <a href='/sublime-text'>kvalitní editor</a> lze instalací vhodných rozšířeních učinit ještě lepším. Jak a jaké pluginy nainstalovat?a href='/sublime-text'"
date: "2013-08-02"
last_modification: "2014-07-09"
status: 1
tags: ["produktivita", "st"]
format: "html"
---

<p>Pro instalování většiny pluginů či balíčků je potřeba tzv. <a href="http://wbond.net/sublime_packages/package_control">Package Control</a>, který se musí nainstalovat úplně na začátek.</p>

<h2 id="package-control">Instalace Package Control</h2>

<p>Pro instalaci tohoto správce balíčků stačí zkopírovat do <i>console</i> v Sublime Text (otevře se po stisknutí <kbd>Ctrl</kbd> + <kbd>;</kbd> – klávesa úplně vlevo nahoře) kód, který jde získat na následující stránce:</p>

<div class="external-content">
  <ul>
    <li><a href="https://packagecontrol.io/installation">Package Control – Installation</a> – instalační kódy pro Sublime Text 2 i 3</li>
  </ul>
</div>

<p>To by mělo být vše. Po <b>restartování</b> editoru půjde v případě, že se vše povedlo, instalovat doplňky.</p>


<h2 id="rucni">Ruční instalace</h2>

<h3 id="st2">Sublime Text 2</h3>

<p>Instalace ve Windows pro Sublime Text 2 je oproti ST 3 výrazně <a href="http://wbond.net/sublime_packages/package_control/installation#Manual_Instructions">jednodušší</a>. Stačí si <a href="https://sublime.wbond.net/Package%20Control.sublime-package">stáhnout balíček</a>, zkopírovat jej nejčestěji do: <code>C:\Users\<b>Uživatel</b>\AppData\Roaming\Sublime Text 2\Installed Packages</code> a restartovat.</p>




<h3 id="st3">Sublime Text 3</h3>

<p>Zde je to pro uživatele, co nepoužívají GIT, dost otravné, protože jinak <i>Package Control</i> zřejmě instalovat nelze.</p>

<p>Musí se do Windows doinstalovat, například:</p>

<ol>
  <li><a href="http://msysgit.github.io/">Git for Windows</a>,</li>
  <li><a href="http://windows.github.com/">GitHub Windows</a></li>
</ol>

<p>Potom je třeba otevřít příkazovou řádku a postupně tam nakopírovat <a href="http://wbond.net/sublime_packages/package_control/installation#ST3">následující</a>.</p>
<pre><code>cd "C:\Users\<b>Uživatel</b>\AppData\Roaming\Sublime Text 2\Packages"
git clone https://github.com/wbond/sublime_package_control.git "Package Control"
cd "Package Control"
git checkout python3</code></pre>

<p>Zdaří-li se, mělo by se po restartování ST (Sublime Text) objevit v nabídce <i>Preferences</i> úplně dole možnost <i>Package Control</i> — to je prostředek pro instalování konkrétních doplňků.</p>



<h2 id="instalace">Instalace doplňků</h2>

<p>Rozšiřující balíčky si lze <a href="http://wbond.net/sublime_packages/community">prohlížet zde</a>, potom je třeba si zapamatovat název a ten vyhledat plus nainstalovat přímo ze Sublime Text — <code>Preferences → Package Control → Package Control: Install Package</code>.</p>




<h2 id="pluginy">Pár zajímavých doplňků</h2>

<dl>
  <dt>Emmet</dt>
  <dd>
    <p>Zjednodušení psaní HTML a CSS kódu, více v <a href="/emmet">samostatném článku</a>.</p>
  </dd>
  
  <dt><a href="http://weslly.github.io/ColorPicker/">ColorPicker</a></dt>
  <dd>
    <p><img src="/files/pluginy-sublime-text/color-picker.png" alt="Color-picker v Sublime Text" class="border"></p>
    <p>Jednoduché <i>kapátko</i> (nástroj pro míchání barev). Vyvolává se zkratkou <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd>.</p></dd>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <dt id="color-highlighter">Color Highlighter</dt>
  <dd>
    <p>Kromě pohodlného vybírání barev se hodí i jejich grafické <b>znázornění přímo v kódu</b>.</p>
    <p><img src="/files/pluginy-sublime-text/zobrazeni-barvy.png" alt="Obarvení barvy v Sublime Text" class="border"></p>
  </dd>
 
  
  <dt><a href="/zivy-nahled-css">Emmet LiveStyle</a></dt>
  <dd>
    <p>Přináší možnost v reálném čase sledovat <a href="/zivy-nahled-css">výsledky zapsaného CSS</a>.</p>
  </dd>
  
  <dt>JavaScript &amp; NodeJS Snippets</dt>
  <dd><p>Kolekce <a href="https://github.com/zenorocha/sublime-snippets-js">snippetů</a> usnadňující zápis obvyklých JS kódů.</p>
    <p>Pár ukázek:</p>
  <ul>
    <li><code>cl</code> — <code>console.log();</code></li>
    <li><code>ac</code> — <code>document.appendChild('');</code></li>
    <li><code>si</code>/<code>st</code> — <code>setInterval</code>/<code>setTimeout</code></li>
    <li><code>qs</code>/<code>qsa</code> — <a href="/queryselector"><code>querySelector</code></a></li>
  </ul>
  </dd>
  
  <dt id="docblockr">DocBlockr</dt>
  <dd>
    <p><img src="/files/pluginy-sublime-text/docblockr.png" alt="Generování dokumentačních komentářů" class="border"></p>
    <p>Pohodlně generuje komentáře k funkcím/metodám/proměnným. Stačí před kód, který chceme okomentovat, napsat <code>/**</code> a zmáčknout <kbd>Tab</kbd>.</p>
  </dd>
  
  <dt id="AllAutocomplete">AllAutocomplete</dt>
  <dd>
    <p>Sublime Text standardně napovídá již použité názvy v rámci jednoho souboru. Plugin AllAutocomplete to zajišťuje napříš <b>všemi otevřenými soubory</b>.</p>
  </dd>
  
  <dt id="linter">Linter</dt>
  
  <dd>
    <p>„Linter“ pluginy slouží k odhalování chyb v kódu ještě <b>před spuštěním</b>. Při vytvoření syntaktické chyby se vedle řádku zobrazí vykřičník a ve <b>stavovém řádku</b> chybové hlášení.</p>
    
    <p><img src="/files/pluginy-sublime-text/linter.png" alt="PHP linter" class="border"></p> 
    
    <ul>
      <li>Pro PHP jde použít plugin <a href="http://benmatselby.github.io/sublime-phpcs/">phpcs</a></li>
      
      <li>Pro JavaScript <a href="http://www.sublimelinter.com/en/latest/">Sublime Linter</a></li>
      
      <li>Pro HTML <a href="https://github.com/SublimeLinter/SublimeLinter-html-tidy">SublimeLinter-html-tidy</a></li>
    </ul>
  </dd>
  
</dl>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Tipy na další pluginy a nastavení: <a href="http://wesbos.github.io/Sublime-Text-Power-User-Talk/">Sublime Text Power User</a></li>
</ul>