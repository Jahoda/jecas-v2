---
title: "CSS vlastnost appearance"
headline: "CSS <code>appearance</code>"
description: "Systémový vzhled elementů pomocí CSS vlastnosti <code>appearance</code>."
date: "2016-11-01"
last_modification: "2016-11-01"
status: 1
tags: ["css", "css-vlastnosti", "stylovani"]
format: "html"
---

<p>Kromě neutrálních značek <a href="/div-span"><code>&lt;div></code> a <code>&lt;span></code></a>, které se bez patřičného stylování zobrazují bez zvláštních stylů, existují elementy, které visuální podobu přebírají z operačního systému – typicky prvky <a href="/formulare">formulářů</a>.</p>

<p>Vlastností <code>appearance</code> jde tento vzhled přiřadit <i>normálním</i> HTML značkám. (<i lang="en">Appearance</i> znamená v angličtině vzhled.)</p>

<p>Symbolický zápis může vypadat následovně:</p>

<pre><code>.jako-tlacitko {
  appearance: button; 
}</code></pre>







<p>Po přiřazení této třídy pro běžný <code>&lt;div></code> vznikne něco jako <a href="/button"><code>&lt;button></code></a>.</p>

<div class="live">
  <div style="-webkit-appearance: button; -moz-appearance: button; appearance: button">
    Text v „tlačítku“
  </div>
</div>


<p>Jedná se <b>pouze</b> o visuální změnu. Veškeré chování je jinak stejné jako u obyčejného elementu.</p>


<h2 id="podpora">Podpora</h2>

<p>Podpora chybí v <b>Internet Exploreru</b> / <a href="/microsoft-edge"><b>MS Edge</b></a> a pro <b>Chrome</b>/<b>Operu</b>/<b>Safari</b>/<b>Firefox</b> je nutné použí <a href="/css-prefixy">CSS prefixy</a>. Navíc se od sebe liší hodnoty pro <code>-webkit-</code> a <code>-moz-</code> prefix.</p>

<p>Možných hodnot existuje obrovské množství:</p>

<div class="external-content">
  <ul>
    <li>DevDocs: <a href="http://devdocs.io/css/-webkit-appearance"><code>-webkit-appearance</code></a></li>
    <li>DevDocs: <a href="http://devdocs.io/css/-moz-appearance"><code>-moz-appearance</code></a></li>
  </ul>
</div>

<p>V praxi jakž takž rozumně fungují hodnoty nastavující tlačítko, <a href="/input#type-checkbox">checkbox</a> a <a href="/input#type-radio">radio přepínač</a>.</p>

<ul>
  <li><code>appearance: button</code> – <span style="-webkit-appearance: button; -moz-appearance: button">Tlačítko</span></li>
  <li><code>appearance: checkbox</code> – <span style="-webkit-appearance: checkbox; -moz-appearance: checkbox">&nbsp;&nbsp;&nbsp;</span> checkbox</li>
  <li><code>appearance: radio</code> – <span style="-webkit-appearance: radio; -moz-appearance: radio">&nbsp;&nbsp;&nbsp;</span> checkbox</li>
</ul>


<h2 id="none"><code>appearance: none</code></h2>

<p>Možná nejzajímavější hodnota vlastnosti <code>appearance</code> je <code>none</code>. Ta totiž dokáže vypnout výchozí vzhled formulářových prvků a umožnit jejich vlastní stylování.</p>

<pre><code>input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}</code></pre>

<p>Výsledek může vypadat třeba takto:</p>

<div class="live">
  <style>
    #vlastni-checkbox {
      -webkit-appearance: none;
      -moz-appearance: none; 
      width: 1.5em; 
      height: 1.5em; 
      background: #fff;
      border: 2px solid #0D6AB7;
      border-radius: 5px;
      vertical-align: bottom;
    }
    #vlastni-checkbox:checked {
      background: #0D6AB7;
    }
  </style>
  <input type="checkbox" id="vlastni-checkbox">
  <label for="vlastni-checkbox">Vlastní styl checkboxu</label>
</div>

<p>Vzhledem k nespolehlivosti vlastnosti <code>appearance</code> je ale pořád osvědčenější postup používat atrapy pomocí <a href="/label-for">značky <code>&lt;label></code></a>:</p>

<div class="internal-content">
  <ul>
    <li><a href="/stylovani-checked">Pokročilé stylování <code>checkbox</code>u</a></li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS Tricks: <a href="https://css-tricks.com/almanac/properties/a/appearance/"><code>appearance</code></a></li>
</ul>