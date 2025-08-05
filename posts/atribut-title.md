---
title: "Stylování atributu title"
headline: "Vlastní styl bubliny <code>title</code>"
description: "Jaké jsou možnosti pro vlastní vzhled nápovědy, která se objevuje při vyplnění atributu <code>title</code>."
date: "2013-06-12"
last_modification: "2016-04-21"
status: 1
tags: ["css", "html-atributy", "napady", "stylovani"]
format: "html"
---

<p>Atribut <code>title</code> je <a href="/obecne-atributy">obecný HTML atribut</a> (lze jej přiřadit takřka ke všem značkám). A projevuje se zobrazením <i>bubliny</i> při najetí na HTML tag, který má <code>title</code> vyplněn.

<pre><code>&lt;p>&lt;span <b>title</b>='Já jsem text.'>Text&lt;/span> odstavce</code></pre>


<div class="live">
  <p title="Bublina">Tento text má nad sebou bublinu.</p>
</div>











<h2 id="ciste-css">Čisté CSS</h2>



<p>Od <b>Exploreru 8</b> není problém <a href="/content-attr">vypsat obsah atributu do stránky</a> po najetí myší.
<pre><code>span[title]:hover:after {
  content: attr(title); 
  /* vlastní vzhled */
}</code></pre>




<p>Pomocí vlastního stylu jde popisek třeba <a href="/position">naposicovat</a> nad slovo:</p>


<!-- Kód ukázky -->
<div class="live">
  <style>
    span[title] {position: relative; border-bottom: 1px dotted #000; cursor: help}
    span[title]:hover:after {border: 1px solid #0D6AB7; color: #fff; border-radius: .2em; background: #1081DD; content: attr(title); position: absolute; top: -2em; left: 0; padding: 0 .2em; width: 8em}
  </style>
  <p>Tento <span title="Nějaký text">text</span> má atribut <code>title</code>.</p>
</div>
<!-- / konec ukázky -->

<p>Pomocí <a href='/transition'><code>transition</code></a> by šlo ještě vykouzlit nějaký efekt postupného objevení nebo tak něco.</p>

<p>Bohužel se ale kromě pečlivě nastylovaného popisku <b>objeví zároveň i popisek klasický</b>, jak jej vykresluje standardně prohlížeč.</p>
  

<h3 id="vlastni-atribut">Vlastní název atributu</h3>  

<p>První možnost, jak nechtěný výchozí <code>title</code> řešit, je místo do <code>title</code> uvést popisek do <a href="/vlastni-html-znacky">vlastního atributu</a>:</p>
<!-- Kód ukázky -->
<div class="live">
  <style>
    span[vlastni-title] {position: relative; border-bottom: 1px dotted #000; cursor: help}
    span[vlastni-title]:hover:after {border: 1px solid #0D6AB7; color: #fff; border-radius: .2em; background: #1081DD; content: attr(vlastni-title); position: absolute; top: -2em; left: 0; padding: 0 .2em; width: 8em}
  </style>  
  <p>Tento <span vlastni-title="Nějaký text">text</span> má atribut <code>vlastni-title</code>.</p>
</div>
<!-- / konec ukázky -->

<p>Pokud je komplikované všechny <code>title</code> atributy na stránce <b>přepsat přímo v kódu</b>, může to udělat JS na straně klienta.</p>

<h2 id="js">Stornování JavaScriptem</h2>
<p>Výchozí <code>title</code> lze <i>vypnout</i>, tj. nastavit jej skriptem na prázdnou hodnotu.</p>

<p>Teoreticky by šlo popisek z <code>title</code> <b>přešoupnout do vlastního atributu</b> a ten použít místo <code>title</code> v CSS kódu výše uvedeném (<a href='http://kod.djpw.cz/pyp'>ukázka</a>).</p>

<p>Otázka ale je, zda když už se stejně JS do řešení zapojuje, nevytvořit popisek celý skriptem. Tedy udělat z <code>title</code> běžný element a ten umístit k elementu s popiskem při <a href="/udalosti-mysi#onmouseover"><code>onmouseover</code></a> (najetí myši).</p>
      
<p>Díky JS půjde i zajistit, aby se popisek inteligentně umisťoval do <i>viewportu</i> (CSS popisek bude klidně mimo stránku, když to tak vyjde).</p>

<p>Výhodné rovněž je popisek umístit rovnou do obalu stránky (nikoliv do elementu, který popisuje). Není potom problém používat <code>overflow: hidden</code> – CSS popisek přes <code>:before</code>/<code>:after</code> by to ořízlo.</p>
      



<h2 id="tooltip">Hotová řešení</h2>
<p>Z hotových řešení:
<ul>
  <li><a href="/tooltip">Popisek obrázku</a> (používá čisté CSS)</li>
  <li><a href="https://popper.js.org">POPPER.JS</a> (chytré umisťování tooltipů pomocí JS)</li>
  <li><a href="http://arashm.net/lab/simptip/">Simptip</a> (používá jen CSS, místo <code>title</code> se používá vlastní atribut)</li>
  <li><a href="https://github.com/ptech/zepto-tooltip">Zepto Tooltip</a> (popisek postavený nad frameworkem <a href="/framework-zepto">Zepto</a>, <a href="http://ptech.github.io/zepto-tooltip/">demo</a>)</li>
  <li><a href='http://www.opentip.org/'>Opentip</a> (používá jQuery a místo <code>title</code> vlastní atribut)</li>
  <li><a href='http://coding.smashingmagazine.com/2007/06/12/tooltips-scripts-ajax-javascript-css-dhtml/'>40+ různých tooltip skriptů</a></li>
</ul>





<h2 id="problem">Nejlepší <code>title</code> je žádný <code>title</code></h2>

<p>Ještě se nabízí <code>title</code> vůbec nepoužívat a popisek dát přímo do nějaké HTML značky nebo v případě textu do závorek. Dává to docela smysl.

<ol>
  <li>
    <p>Obsah atributu <code>title</code> <b>není moc přístupný</b>. Může být docela problém na <b>dotykových zařízeních</b> nebo <b>bez myši</b> se k jeho obsahu dostat.</p>
    
    <p>Třeba i iPadu/iPhone se jde dostat k <code>title</code> jen u <a href="/obrazky">obrázku</a>.</p>
  </li>
    <li>
      <p>Obsah je náchylnější k <b>přehlédnutí</b>.</p></li>
      <li>
        <p>Obsah atributu se <b>obtížně hledá</b> běžnou funkcí prohlížečů <b>Hledat</b> (<kbd>Ctrl</kbd> + <kbd>F</kbd>).</p></li>
        <li>
          <p>Text vložený přes <code>content</code> neumí většina prohlížečů označit.</p></li>
        <li>
          <p>Z těchto důvodů mu <b>vyhledávače</b> budou nejspíš přikládat nízkou váhu.</p></li>
</ol>



<h3 id="css-rozbaleni">Zobrazení <code>title</code> v závorce</h3>

<p>Čistě v CSS jde popisek z <code>title</code> <i>rozbalit</i> do závorky. Příklad pro populární značku <code>&lt;abbr></code> s atributem <code>title</code>:</p>

<pre><code>abbr[title] {
    border-bottom: 0;
}

abbr[title]:after {
    content: "(" attr(title) ")";
}</code></pre>











<p>Problémy s označováním a vyhledáváním textu z atributu ale přetrvávají.</p>