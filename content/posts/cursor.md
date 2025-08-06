---
title: "CSS cursor"
headline: "Kursor myši"
description: "Jak pomocí CSS měnit kursor myši nebo si vytvořit kursor vlastní."
date: "2014-11-01"
last_modification: "2014-11-14"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>CSS vlastnost <code>cursor</code> umí u daného elementu změnit vzhled klasického ukazatele myši. Kromě několika kursorů známých z prostředí <b>operačního systému</b> jde taktéž připojit vlastní obrázkový ukazatel.</p>


<h2 id="vsechny">Všechny možné hodnoty</h2>

<p>Následující tabulka obsahuje všechny možné hodnoty kursoru včetně ukázky (po najetí myší).</p>


<table>
  <tr>
    <th>Zápis</th>
    <th>Význam a ukázka</th>
  </tr>
<tr id="auto">
	<td><code>cursor: auto</code></td>
	<td style="cursor: auto">Kursor se přizpůsobí kontextu</td>
</tr>	
<tr id="default">
	<td><code>cursor: default</code></td>
	<td style="cursor: default">Výchozí šipka</td>
</tr>	  
<tr id="none">
	<td><code>cursor: none</code></td>
	<td style="cursor: none">Kursor zmizí, nefunguje ve staré <b>Opeře</b></td>
</tr>	
<tr id="context-menu">
	<td><code>cursor: context-menu</code></td>
	<td style="cursor: context-menu">Kontextové menu. Pouze <b>IE</b> a stará <b>Opera</b></td>
</tr>	
<tr id="help">
	<td><code>cursor: help</code></td>
	<td style="cursor: help">Nápověda</td>
</tr>	
<tr id="pointer">
	<td><code>cursor: pointer</code></td>
	<td style="cursor: pointer">Ručička jako u odkazů</td>
</tr>	
<tr id="progress">
	<td><code>cursor: progress</code></td>
	<td style="cursor: progress">Načítání s kursorem šipky</td>
</tr>	
<tr id="wait">
	<td><code>cursor: wait</code></td>
	<td style="cursor: wait">Samotné <i>přesýpací hodiny</i></td>
</tr>	
<tr>
  <th colspan="2">Výběr</th>
</tr>  
<tr id="cell">
	<td><code>cursor: cell</code></td>
	<td style="cursor: cell">Výběr buňky</td>
</tr>	
<tr id="crosshair">
	<td><code>cursor: crosshair</code></td>
	<td style="cursor: crosshair">Kříž</td>
</tr>	
<tr id="text">
	<td><code>cursor: text</code></td>
	<td style="cursor: text">Výběr textu (výchozí kursor u obyčejného textu)</td>
</tr>	
<tr id="vertical-text">
	<td><code>cursor: vertical-text</code></td>
	<td style="cursor: vertical-text">Vertikální výběr textu</td>
</tr>	
<tr>
  <th colspan="2">Drag &amp; Drop</th>
</tr>  
<tr id="alias">
	<td><code>cursor: alias</code></td>
	<td style="cursor: alias">Vytvoření zástupce (aliasu)</td>
</tr>	
<tr id="copy">
	<td><code>cursor: copy</code></td>
	<td style="cursor: copy">Kopírování</td>
</tr>	
<tr id="move">
	<td><code>cursor: move</code></td>
	<td style="cursor: move">Přesun</td>
</tr>	
<tr id="no-drop">
	<td><code>cursor: no-drop</code></td>
	<td style="cursor: no-drop">Obsah není možné pustit</td>
</tr>	
<tr id="not-allowed">
	<td><code>cursor: not-allowed</code></td>
	<td style="cursor: not-allowed">Obsah není možné chytit (<b>Firefox</b> a <b>Chrome</b> zobrazují stejně jako <code>no-drop</code>)</td>
</tr>	
<tr>
  <th colspan="2">Změna velikosti</th>
</tr>
<tr id="e-resize">
	<td><code>cursor: e-resize</code></td>
	<td style="cursor: e-resize">šipky znázorňující možnost změny velikosti ↓</td>
</tr>	
<tr id="n-resize">
	<td><code>cursor: n-resize</code></td>
	<td style="cursor: n-resize"></td>
</tr>	
<tr id="ne-resize">
	<td><code>cursor: ne-resize</code></td>
	<td style="cursor: ne-resize"></td>
</tr>	
<tr id="nw-resize">
	<td><code>cursor: nw-resize</code></td>
	<td style="cursor: nw-resize"></td>
</tr>	
<tr id="s-resize">
	<td><code>cursor: s-resize</code></td>
	<td style="cursor: s-resize"></td>
</tr>	
<tr id="se-resize">
	<td><code>cursor: se-resize</code></td>
	<td style="cursor: se-resize"></td>
</tr>	
<tr id="sw-resize">
	<td><code>cursor: sw-resize</code></td>
	<td style="cursor: sw-resize"></td>
</tr>	
<tr id="w-resize">
	<td><code>cursor: w-resize</code></td>
	<td style="cursor: w-resize"></td>
</tr>	
<tr id="ew-resize">
	<td><code>cursor: ew-resize</code></td>
	<td style="cursor: ew-resize"></td>
</tr>	
<tr id="ns-resize">
	<td><code>cursor: ns-resize</code></td>
	<td style="cursor: ns-resize"></td>
</tr>	
<tr id="nesw-resize">
	<td><code>cursor: nesw-resize</code></td>
	<td style="cursor: nesw-resize"></td>
</tr>	
<tr id="nwse-resize">
	<td><code>cursor: nwse-resize</code></td>
	<td style="cursor: nwse-resize"></td>
</tr>	
<tr id="col-resize">
	<td><code>cursor: col-resize</code></td>
	<td style="cursor: col-resize">Změna velikosti sloupce</td>
</tr>	
<tr id="row-resize">
	<td><code>cursor: row-resize</code></td>
	<td style="cursor: row-resize">Změna velikosti výšky řádku</td>
</tr>	
<tr id="all-scroll">
	<td><code>cursor: all-scroll</code></td>
	<td style="cursor: all-scroll">Scrollování do všech stran (<b>Firefox</b> a <b>Chrome</b> zobrazují stejně jako <code>move</code>)</td>
</tr>	
<tr>
  <th colspan="2">Zoomování</th>
</tr>  
<tr id="zoom-in">
	<td><code>cursor: zoom-in</code></td>
	<td style="cursor: zoom-in">Přiblížení</td>
</tr>	
<tr id="zoom-out">
	<td><code>cursor: zoom-out</code></td>
	<td style="cursor: zoom-out">Oddálení</td>
</tr>	
  
<tr>
  <th colspan="2">Uchopení</th>
</tr>  
<tr id="grab">
	<td><code>cursor: grab</code><br><code>cursor: -webkit-grab</code></td>
	<td style="cursor: grab; cursor: -webkit-grab">Možnost uchopit (<b>Chrome</b> vyžaduje prefix)</td>
</tr>	
<tr id="grabbing">
	<td><code>cursor: grabbing</code><br><code>cursor: -webkit-grabbing</code></td>
	<td style="cursor: grabbing; cursor: -webkit-grabbing">Obsah už byl uchopen</td>
</tr>	
</table>


<h2 id="caste">Častěji používané</h2>

<p>Z dlouhého seznamu všech možných hodnot stojí za pozornost hlavně následující:</p>

<dl>
  <dt><code style="cursor: pointer">cursor: pointer</code></dt>
  <dd>
    <p>Vypadá jako odkaz, taže se hodí k zvýraznění <a href="/odkaz-tlacitko">neodkazů</a> (popř. tlačítek), na které lze kliknout.</p>
  </dd>
  
  <dt><code style="cursor: help">cursor: help</code></dt>
  <dd>
    <p>Zobrazení nápovědy po najetí na text. Často se kompinuje s <span title='Nápověda' style='cursor: help; border-bottom: 1px dotted #000'>tečkovaným podtržením</span>.</p>
    
    <pre><code>.help {
  cursor: help; 
  border-bottom: 1px dotted #000;
}</code></pre>
    
    <p>Nutno ale zajistit, aby se k obsahu v <code>title</code> dostal člověk na mobilním zařízení.</p>
  </dd>
  
  <dt><code style="cursor: wait">cursor: wait</code>/<code style="cursor: progress">cursor: progress</code></dt>
  <dd>
    <p>Může posloužit jako snadná indikace načítání. Třeba při čekání na <a href="/ajax">AJAXový</a> požadavek.</p>   
  </dd>  
  
  <dt><code style="cursor: not-allowed">cursor: not-allowed</code></dt>
  <dd>
    <p>Hodí se jako doprovodná indikace zablokovaného tlačítka nebo políčka, kam se <a href="/zablokovani-inputu">nesmí psát</a>.</p>
  </dd>
</dl>



<h2 id="vlastni">Vlastní kursor myši</h2>

<pre><code>body {
  cursor: url('vlastni-kursor.cur'), default;
}</code></pre>


<h3 id="formaty">Podporované formáty</h3>

<p>Vytvořit si vlastní kursor jde připojením obrázkového souboru. <b>Firefox</b>, <b>Chrome</b> a nová <b>Opera</b> podporují téměř libovolné <a href="/format-obrazku">formáty obrázků</a> (PNG, GIF, JPG, <a href="/svg">SVG</a>), ikony (ICO) nebo skutečné kursory (CUR).</p>

<p>Maximální povolená velikost je 128 × 128, větší <b>bude ignorován</b>.</p>

<p><b>IE</b> podporuje pouze ICO, CUR a ANI (ten umožňuje i animaci – <a href="https://kod.djpw.cz/xkhb">ukázka</a> pouze pro <b>IE</b> – funguje i v <a href="/ie11"><b>IE 11</b></a>).</p>

<div class="external-content">
  <p>Převést PNG na ikonu umí například online nástroj <a href="http://www.convertico.com/">ConvertIco</a>.</p>
</div>


<p>Při zápisu vlastního kursoru je <b>nutné</b> za URL obrázku uvést klasický typ pro případ, že by se obrázek (ještě) nenačetl. Bez toho <b>vlastní kursor nebude fungovat</b>.</p>


<pre><code>body {
  cursor: url('vlastni-kursor.cur'), <b>default</b>;
}</code></pre>


<h3 id="souradnice">Souřadnice</h3>

<p>Pro určení místa, kde má kursor reagovat je možné přímo za <code>url</code> s obrázkem uvést souřadnice.</p>

<p>Výchozí chování je, že kursor <i>kliká</i> vlevo nahoře. Zvyšováním hodnot souřadnic tak můžeme přesunout na aktivní plochu doprava dolů.</p>

<p>V případě, že má kursor reagovat uprostřed, zadáme poloviční hodnoty šířky a výšky.</p>

<pre><code>body {
  cursor: url('vlastni-kursor.cur') <b>16 16</b>, default;
}</code></pre>

<p>Bohužel ale nastavení souřadnic rozbije kursor v <b>Internet Exploreru</b> (celá deklarace bude neplatná).</p>



<div class="live">
<p style="cursor: url('/files/cursor/tuzka.cur'), default">Element má vlastní kursor jako *.cur.</p>
  
  <p style="cursor: url('/files/cursor/kursor.ico'), default">Element má vlastní kursor jako *.ico.</p>
  
<p style="cursor: url('/files/cursor/kursor.png'), default;">Element má vlastní kursor jako *.png o rozměrech 32 × 32.</p>
    
<p style="cursor: url('/files/cursor/velky-kursor.png') 64 64, default;">Element má vlastní kursor jako *.png rozměrů 128 × 128 a nastaveny souřadnice doprostřed.</p>
</div>

<p><a href="https://kod.djpw.cz/rkhb">Samostatná ukázka</a></p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/cursor/url">Using URL values for the cursor property</a></li>
  <li>Teststranek: <a href="http://teststranek.kvalitne.cz/css-kurzory/">Test vlastních kurzorů</a></li>
</ul>