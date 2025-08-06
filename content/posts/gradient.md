---
title: "CSS gradient"
headline: "Gradienty v CSS"
description: "Jak vytvořit barevný přechod (gradient) přímo v CSS bez použití obrázku."
date: "2014-03-04"
last_modification: "2014-03-25"
status: 1
tags: ["css", "css-funkce", "obrazky"]
format: "html"
---

<p>Barevné přechody je v CSS možné vytvářet přes:</p>

<ol>
  <li>vlastnost <code>filter</code> pro <b>IE 9</b></li>
  <li><code>background-image</code> pro <b>IE 10</b> a novější</li>
</ol>

<p>V prohlížečích starších než <b>Opera 12.1</b>, <b>Firefox 16</b>, <b>Chrome 26</b> se používají ještě <a href="/css-prefixy">CSS prefixy</a>.</p>

<h2 id="priklad">Příklad</h2>

<p>Nejjednodušší použití CSS gradientu může vypadat v případě lineárního přechodu takto:</p>

<pre><code>.prechod {
  background-image: <b>linear-gradient</b>(#0D6AB7, #DA3F94);
}</code></pre>

<div class="live no-source">
  <style>
    .prechod {
      background-image: linear-gradient(
        #0D6AB7, 
        #DA3F94
      );
    }
  </style>
  <div class="prechod">&nbsp;</div>
</div>

<h2 id="linear">Lineární gradient</h2>

<p>Funkci <code>linear-gradient</code> se předávají různé parametry ovlivňující výchozí podobu celého přechodu. Symbolický zápis veškerých možností vypadá následovně.</p>

<pre><code>.prechod {
  background-image: linear-gradient(
    <b>směr</b>, 
    <b>první barva</b> <i>umístění</i>,
    <b>druhá barva</b> <i>umístění</i>
  )
}</code></pre>

<h3 id="smer">Směr</h3>

<p>První parametr určuje, jakým směrem se má přechod ubírat. Výchozí nastavení je shora dolů.</p>

<ul>
  <li><code>to top</code> – zdola nahoru,</li>  
  <li><code>to bottom</code> – shora dolů,</li>  
  <li><code>to right</code> – zleva doprava,</li>  
  <li><code>to left</code> – zprava doleva</li>  
</ul>

<p>Kromě toho existují i šikmé směry, například <code>to bottom right</code>:</p>

<div class="live">
  <style>
    .prechod-sikmy {
      background-image: linear-gradient(to bottom right, #0D6AB7, #DA3F94);
    }
  </style>
  <div class="prechod-sikmy">&nbsp;<br>&nbsp;</div>
</div>

<h3 id="umisteni-barvy">Umístění barev</h3>

<p>Délkovými jednotkami (pixely, procenta apod.) je možné nastavit, kde se daná barva má <i>aplikovat</i>.</p>

<p>Výchozí chování je, že první barva začíná (tj. <code>0%</code>) a druhá končí (tj. <code>100%</code>).</p>

<p>Takto se přechod změní při nastavení procent na <code>60</code> a <code>90</code>.</p>

<div class="live">
  <style>
    .prechod-umisteni {
      background-image: linear-gradient(
        to bottom right, 
        #0D6AB7 60%, 
        #DA3F94 90%
      );
    }
  </style>
  <div class="prechod-umisteni">&nbsp;<br>&nbsp;</div>
</div>

<h3 id="vice-barev">Více barev</h3>

<p>Přechod může mít <b>libovolný počet</b> barev.</p>

<div class="live">
  <style>
    .prechod-vice-barev {
      background-image: linear-gradient(
        to bottom right, 
        #1081DD, 
        #8ECCF0 40%, 
        #0D6AB7 60%, 
        #DA3F94 90%
      );
    }
  </style>
  <div class="prechod-vice-barev">&nbsp;<br>&nbsp;</div>
</div>

<h2 id="radial">Radiální gradient</h2>

<p>Další typ <i>gradientu</i> je kruhový (radiální). Zápis je obdobný jako u lineárního.</p>

<pre><code>.prechod-radialni {
  background-image: <b>radial-gradient</b>(#0D6AB7, #DA3F94);
}</code></pre>

<div class="live no-source">
  <style>
    .prechod-radialni {
      background-image: radial-gradient(
        #0D6AB7, 
        #DA3F94
      );
    }
  </style>
  <div class="prechod-radialni">&nbsp;<br>&nbsp;<br>&nbsp;</div>
</div>

<h3 id="tvar">Tvar</h3>

<p>První parametr udává <i>tvar</i> kruhového přechodu.</p>

<ul>
  <li><code>ellipse</code> – výchozí podoba, přechod se roztáhne přes celý prostor elementu.</li>
  <li><code>circle</code> – přechod bude mít podobu kruhu.</li>
</ul>

<div class="live">
  <style>
    .prechod-circle {
      background-image: radial-gradient(
        circle,
        #0D6AB7, 
        #DA3F94
      );
    }
  </style>
  <div class="prechod-circle">&nbsp;<br>&nbsp;<br>&nbsp;</div>
</div>

<p>V případě, že chceme mít vidět celý kruh (když element s přechodem na pozadí není čtvercový), stačí přidat za tvar (<code>circle</code>) <code>closest-side</code>:</p>

<div class="live">
  <style>
    .prechod-closest-side {
      background-image: radial-gradient(
        circle closest-side,
        #0D6AB7, 
        #DA3F94
      );
    }
  </style>
  <div class="prechod-closest-side">&nbsp;<br>&nbsp;<br>&nbsp;</div>
</div>

<h3 id="umisteni">Umístění</h3>

<p><b>Umístění barev</b> funguje stejně jako u <i>lineárního přechodu</i>. Je ale možné změnit střed, odkud přechod <i>začíná</i>, zapsáním <code>at top|bottom|left|right</code> a <i>šikmých</i> kombinací.</p>

<div class="live">
  <style>
    .prechod-at {
        width: 100px;
        height: 100px;
      background-image: radial-gradient(
        circle at top right,
        #0D6AB7, 
        #DA3F94
      );
    }
  </style>
  <div class="prechod-at"></div>
</div>

<h2 id="repeating">Opakující se gradient</h2>

<p>Poslední typ gradientu je <b>opakování přechodu do nekonečna</b>.</p>

<pre><code>.prechod-opakovani {
  background-image: <b>repeating-linear-gradient</b>(
    #0D6AB7, #DA3F94 50%
  );
}</code></pre>

<div class="live no-source">
  <style>
    .prechod-repeating {
      height: 100px;
      background-image: repeating-linear-gradient(
        #0D6AB7,
        #DA3F94 50%
      );
    }
  </style>
  <div class="prechod-repeating"></div>
</div>

<p>Opakovat se může přechod lineární i radiální:</p>

<ul>
  <li><code>repeating-<b>linear</b>-gradient</code>,</li>
  <li><code>repeating-<b>radial</b>-gradient</code></li>
</ul>

<h3 id="prouzky">Proužky</h3>

<p>Zajímavější využití <b>opakujících se přechodů</b> je vytvoření proužků.</p>

<div class="live">
  <style>
    .prechod-prouzky {
      height: 100px;
      background-image: repeating-linear-gradient(
        #0D6AB7,
        #0D6AB7 10%,
        #DA3F94 10%,
        #DA3F94 20%
      );
    }
  </style>
  <div class="prechod-prouzky"></div>
</div>

<h3 id="otoceni">Otočení</h3>

<p>Jde i přechod otočit (např. <code>-45deg</code>) a vytvořit tak třeba <b>šikmé pruhy</b>:</p>

<div class="live">
  <style>
    .prechod-otoceny {
      height: 100px;
      background-image: repeating-linear-gradient(
        -45deg,
        #0D6AB7,
        #0D6AB7 5px,
        #DA3F94 5px,
        #DA3F94 10px
      );
    }
  </style>
  <div class="prechod-otoceny"></div>
</div>

<h2 id="filter">Přechody vlastností filter</h2>

<p>Pro <b>IE 9</b> a starší je možné některé přechody vytvořit vlastností <code>filter</code>. Vytvořit se tak dá ale nejspíš <b>jen přechod lineární</b>:</p>

<pre><code>.prechod {
  filter: progid:DXImageTransform.Microsoft.Gradient(
    startColorStr="#0D6AB7", 
    endColorStr="#DA3F94"
  );
}</code></pre>

<p>Více o <a href="http://msdn.microsoft.com/en-us/library/ms532997(v=vs.85).aspx">gradientech přes <code>filter</code></a>.</p>

<h2 id="fallback">Fallback</h2>

<p><i>Fallback</i> pro plnohodnotné CSS přechody tedy může být:</p>

<ol>
  <li>CSS vlastnost <code>filter</code> pro <b>IE 9</b> a starší (třeba s méně dokonalým přechodem).</li>
  <li>Prostá barva bez přechodu. Když se gradient nastaví jako <code>background-image</code>, nastavená vlastnost <code>background-color</code> <i>přežije</i>.</li>
  <li>Obyčejný obrázek.</li>
</ol>

<p>V případě každého webu je pochopitlně nutno zvážit, co se <a href="/prohlizece-optimalisace#kalkulace">vyplatí realisovat</a>.</p>

<h2 id="generator">Generátor CSS gradientů</h2>

<p>Pro pohodlnou tvorbu gradientů existují tzv. generátory gradientů.</p>

<ul>
  <li>ColorSpace: <a href="https://mycolor.space/gradient3">Generate a 3-Color-Gradient
</a></li>
  
  <li><a href="http://www.colorzilla.com/gradient-editor/">Ultimate CSS Gradient Generator</a></li>
  <li><a href="http://ie.microsoft.com/testdrive/graphics/cssgradientbackgroundmaker/">CSS Gradient Background Maker</a></li>
</ul>

<p>Nutno přiznat, že výsledný kód plný prefixů není <b>úplně elegantní</b> (<a href="https://kod.djpw.cz/fncb">ukázka</a>).</p>