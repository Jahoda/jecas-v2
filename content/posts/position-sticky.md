---
title: "Jak funguje position: sticky"
headline: "Jak funguje CSS <code>position: sticky</code>"
description: "CSS position: sticky umožňuje bez JavaScriptu zafixovat element (menu, hlavičku) ke kraji okna při scrollování. Návod s příklady."
date: "2015-06-02"
last_modification: "2020-03-18"
status: 1
tags: ["css", "css-vlastnosti", "fixed", "scroll"]
format: "html"
---

<p><i lang="en">Sticky</i> je v překladu něco jako <i>lepkavý</i> – element se při rolování dokáže „přilepit“ k okraji.</p>

<pre><code>.sticky {
  position: sticky;
  top: 0;
}</code></pre>











<p>Vlastnost <a href="/position"><code>position</code></a> měla dlouhé roky 4 možné hodnoty:</p>

<ol>
  <li><code>position: static</code> – výchozí hodnota</li>
  <li><code>position: relative</code> – relativní posun oproti původnímu umístění bez ovlivnění okolí</li>
  <li><code>position: absolute</code> – vyjmutí z původního místa</li>
  <li><code>position: fixed</code> – vyjmutí z původního místa + zafixování</li>
</ol>

<p>Hodnota <code>sticky</code> je tak trochu kombinací výše uvedeného. </p>

<p>Když je <i>sticky</i> element uvnitř <i>viewportu</i>, chová se jako <code>static</code>/<code>relative</code>, tedy se nijak neprojevuje.</p>

<p>Po opuštění okna se potom chová jako <code>absolute</code> (zobrazení mimo přirozené umístění) a <code>fixed</code> (zafixování na jednom místě).</p>

<h2 id="podpora">Podpora</h2>

<p>Velmi dobře podporovaná vlastnost. Nefunguje v akorát v pomalu mizícím <b>IE 11</b>.</p>

<p>Řešení pro <b>IE 11</b> je buď použít JavaScript, nebo <i>sticky</i> oželet, pokud to není nezbytné pro ovládání webu.</p>

<p>Pro starší verse ostatních prohlížečů se hodí přidat <a href="/css-prefixy">CSS prefix</a> – <code>position: -webkit-static</code>.</p>

<div>

  <h2 id="pouziti">Použití</h2>

  <p>Použití je na první pohled velmi jednoduché, stačí elementu přidat <code>position: sticky</code> a nějaké umístění, např. <code>top: 0</code>.</p>

  <div class="live">
  <style>
    .sticky-element {
      position: sticky;
      position: -webkit-sticky;
      top: 0;
    }
  </style>
  <span class="sticky-element">
    Nefunkční sticky element
  </span>
  </div>

  <p>Jak je vidět na předchozím příkladu, nic to nedělá.</p>

  <div class="live sticky-element">Co takhle? Funkční sticky element.</div>
  
  <p><a href="https://kod.djpw.cz/bgvc">Samostatná živá ukázka</a> – nejjednodušší sticky element</p>

  <p>Trik je v tom, že <i>sticky</i> element si <b>automaticky určí svého rodiče jako oblast pro přilepování</b>.</p>

  <p>Pokud tedy v nadřazeném elementu není žádný další obsah, nic se nestane:</p>

  <pre><code>&lt;div&gt;
  &lt;div class="sticky-element"&gt;
    Nic se nestane
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
  
  <p>Je třeba to udělat následovně:</p>
  
  <pre><code>&lt;div&gt; &lt;!-- sticky kontejner --&gt;
  &lt;div class="sticky-element"&gt;
    Funkční sticky obsah
  &lt;/div&gt;
  Další obsah
&lt;/div&gt;</code></pre>

  <p>Toto chování se hodí k tomu, že se <i>sticky</i> element může zase odlepit, když celý jeho rodič (sticky kontejner) opustí viewport.</p>
</div>

<p><a href="https://kod.djpw.cz/kfvc">Živá ukázka</a> – přichytávání nadpisů</p>

<h3 id="umisteni">Umístění sticky elementu</h3>

<p>Obsah není nutné přichytávat jen nahoru (<code>top: 0</code>). Není problém použít <code>bottom: 0</code>:</p>

<p><a href="https://kod.djpw.cz/lfvc">Živá ukázka</a> – přichytávání patičky</p>
  
<p>V případě vodorovného scrollování se hodí i vlastnosti <code>right</code> nebo <code>left</code>.</p>

<p>Hodnoty potom mohou být běžné délkové jednotky, nemusí to být nutně jen <code>0</code>.</p>

<h3 id="z-index">Vlastnost <code>z-index</code></h3>

<p>Umístění v ose Z funguje stejně jako <a href="/z-index"><code>z-index</code></a> u ostatních způsobů posicování.</p>



<h2 id="vyuziti">Využití</h2>

<p><i>Lepkavá</i> posice je velmi užitečná k nahrazení leckdy komplikovaných JS řešení:</p>

<div class="internal-content">
  <ul>
    <li><a href="/fixni-menu">Fixní menu při rolování</a></li>
    <li><a href="/sidebar">Jak vytvořit fixovaný banner?</a></li>
  </ul>
</div>





<p>Podobné věci jde udělat pouze v CSS.</p>


<p><a href="https://kod.djpw.cz/agvc">Živá ukázka</a> – přichytávací fixní menu</p>













<h2 id="tabulky">Fixní sloupce a řádky tabulky</h2>

<p>Hodně užitečná je <code>sticky</code> posice u <a href="/html-tabulky">tabulek</a>. Jde tak elegantně zafixovat řádek i sloupec bez dalších omezení (výška/šířka obsahu).</p>

<p>U tabulek se sticky chová trochu jinak – <code>position: sticky</code> se aplikuje na buňky (<code>&lt;tr&gt;</code> a <code>&lt;th&gt;</code>) a celá tabulka je potom <i>sticky kontejner</i>.</p>

<p>Není možné fixovat přímo značku <code>&lt;thead&gt;</code>.</p>

<h3 id="fixni-radek">Fixní řádek</h3>

<p>Pro <b>zafixování řádku</b> nahoru tedy stačí jeho buňkám nastavit <code>position: sticky</code> a <code>top: 0</code>:</p>

<p><a href="https://kod.djpw.cz/ofvc">Živá ukázka</a> – fixní záhlaví tabulky</p>

<h3 id="fixni-sloupec">Fixní sloupec</h3>

<p>Pro <b>přichycení sloupce</b> je postup velmi podobný.</p>

<p>Sloupci, který má být fixovaný, se přidá <code>position: sticky</code> a <code>right: 0</code> nebo <code>left: 0</code> (podle toho, jestli jde o první/poslední sloupec řádku).</p>

<p>Aby celá stránka <b>neměla posuvník</b>, je třeba ještě obalit tabulku do něčeho s <code>overflow-x: auto</code>:</p>

<p><a href="https://kod.djpw.cz/vfvc">Živá ukázka</a> – fixní sloupec tabulky</p>








<h3 id="fixni-radek-sloupec">Fixní řádek i sloupec zároveň</h3>

<p>Kombinací obou postupů jde fixovat řádek i sloupec zároveň.</p>

<p>Je k tomu ale nejspíš nutné nastavit obalu tabulky pevnou nebo maximální výšku a <code>overflow: auto</code>, aby se měl řádek kam přichytit.</p>

<p>Pro maximální výšku se hodí použít viewport jednotky (např. <code>100vh</code> pro tabulku přes celou výšku).</p>

<p>Nevýhoda tohoto postupu je v tom, že jsou na stránce dva svislé posuvníky:</p>

<p><a href="https://kod.djpw.cz/ufvc">Živá ukázka</a> – tabulka s fixní řádkem i sloupcem.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46">CSS Position Sticky – How It Really Works!</a></li>
  <li>Google Developers: <a href="https://developers.google.com/web/updates/2017/09/sticky-headers">An event for CSS position:sticky</a></li>
  <li><a href="http://html5-demos.appspot.com/static/css/sticky.html">position: sticky</a></li>
  
  <li><a href="http://webdesign.tutsplus.com/tutorials/sticky-positioning-with-nothing-but-css--cms-24042">Sticky Positioning with Nothing but CSS</a></li>
  
  <li><a href="http://designmodo.com/sticky-navigation-css-jquery/">How to Create Sticky Navigation with CSS or jQuery</a></li>
</ul>