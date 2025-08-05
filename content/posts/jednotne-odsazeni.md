---
title: "Jednotné odsazení v CSS"
headline: "Jednotné odsazení v CSS"
description: "Jak postupovat, aby napříč webem byly mezi elementy stejné rozestupy."
date: "2015-10-06"
last_modification: "2016-02-18"
status: 1
tags: ["css", "napady"]
format: "html"
---

<p>U rozsáhlejší webové stránky nebo aplikace je typicky na stránce několik bloků, mezi kterými je odsazení. Zajistit, aby jednotlivé <b>mezery nebyly náhodné</b>, ale měly nějaký řád, dá docela práci.</p>

<p>Problém je kvůli:</p>

<ol>
  <li>Slučování CSS vlastnosti <code>margin</code>.</li>
  <li>Neprojevení se <code>margin</code>u, nemá-li rodič <code>padding</code>, <code>border</code> apod.</li>
</ol>



<h2 id="priklad">Příklad</h2>

<p>Typicky je obsah stránky v nějakém obalu:</p>
<pre><code>&lt;div class="obal">
&lt;/div></code></pre>




<p>Běžný text se potom píše do odstavce:</p>


<pre><code>&lt;div class="obal">
  &lt;p>Text&lt;/p>
  &lt;p>Text&lt;/p>
&lt;/div></code></pre>




<p>Odstavce mají ve výchozích stylech horní a dolní <a href="/margin"><code>margin</code></a>. Hodnoty <code>margin</code>u mezi odstavci se potom slučují – rozestup se rovná vyššímu z odsazení. V případě stejného odsazení se vezme jen jedna hodnota.</p>


<div class="live">
<div class="priklad-obal">
  <p>Text</p>
  <p>Text</p>
</div>
</div>




<p>Aby obsah nebyl nalepený na <code>.obal</code>, přidá se mu nějaký <code>padding</code>, stejný pro všechny strany:</p>

<div class="live">
<div class="priklad-obal priklad-obal-padding">
  <p>Text</p>
  <p>Text</p>
</div>
</div>





<p>To najednou způsobí, že se projeví horní a dolní odsazení <code>margin</code>em, který mají odstavce. Ve výsledku je tedy odsazení zdola a shora <b>dvojnásobné oproti krajům</b>.</p>


<p>Co teď s tím? Vynulovat horní a dolní <code>padding</code> obalu?</p>

<pre><code>.obal {
  padding: 0 1em;
}</code></pre>





<p>Potom se přece zase přestane <code>margin</code> vnořených odstavců nahoře a dole projevovat.</p>

<div class="live">
<div class="priklad-obal priklad-obal-padding-nulovany">
  <p>Text</p>
  <p>Text</p>
</div>
</div>




<h2 id="overflow">Oříznutí <code>overflow: hidden</code></h2>

<p>Docílit projevu <code>margin</code>u na okrajích jde třeba pomocí <code>overflow: hidden</code>. To je ale problematické v případě, že by bylo potřeba, aby něco z obalu vylézalo ven.</p>


<div class="live">
<div class="priklad-obal priklad-obal-overflow">
  <p>Text</p>
  <p>Text</p>
</div>
</div>






<h2 id="ramecek">Rámeček a záporný <code>margin</code></h2>

<p>Odsazení se projeví i při <b>použití rámečku</b>. Jde tedy přidat tenký <code>border</code> v barvě okolí nahoru a dolu a následně jeho rozměry odečíst záporným marginem:</p>


<div class="live">
<div class="priklad-obal priklad-obal-padding-border">
  <p>Text</p>
  <p>Text</p>
</div>
</div>



<p>Tento postup ale spoléhá na to, že je pozadí za <i>obalem</i> jednobarevné. V případě použití průhledného rámečku by za ním bylo pozadí obalu – tedy by odsazení bylo visuálně větší o šířku rámečku.</p>



<h2 id="first-last-child">První/poslední element</h2>

<p>Mohlo by se nabízet řešení, kdy se prvnímu a poslednímu elementu zruší horní, respektive dolní <code>marign</code>. Se selektory <a href="/first-last-child"><code>:first-child</code>/<code>last-child</code></a> to není problém:</p>

<pre><code>.obal :first-child {margin-top: 0}
.obal :last-child {margin-bottom: 0}</code></pre>





<p>Na první pohled to vypadá dobře:</p>


<div class="live">
<div class="priklad-obal priklad-obal-padding priklad-last-first">
  <p>Text</p>
  <p>Text</p>
</div>
</div>



<p>Bohužel nastane problém v případě, že obsah s <code>margin</code>em nebude přímo v <code>.obal</code>u, ale bude v ještě nějakém jiném elementu:</p>


<div class="live">
<div class="priklad-obal priklad-obal-padding priklad-last-first">
  <p>Text</p>
  <p>Text</p>
  <div>
    <p>Text odstavce v dalším obalu</p>
  </div>
</div>
</div>




<h3 id="jeden-margin">Pouze horní/dolní <code>margin</code></h3>

<p>Pokud by byla šance, že se uhlídá, aby <code>margin-top</code> prvního elementu (<code>:first-child</code>) byl nulový, jde používat dále jen <code>margin-top</code>).</p>

<p>V klasickém případě, kdy se pod sebou sejde vrchní element se spodním odsazením a spodní element s horním – rozměr se stejně <b>sloučí</b> – mezera bude rovna vyššímu z <code>margin</code>ů.</p>


<div class="live">
<div class="priklad-obal priklad-jeden-margin">
  <p>Text</p>
  <p>Text</p>
</div>
</div>






<h2 id="obal">Další obal s <code>margin</code>em</h2>

<p>Docela prosté řešení je použít vnořený element, který u obalu rozměr horního a spodního <code>padding</code>u odečte záporným <code>margin</code>em:</p>

<div class="live">
<div class="priklad-obal priklad-obal-padding">
  <div class="priklad-obal-margin-vnitrni">
    <p>Text</p>
    <p>Text</p>
  </div>
</div>
</div>





<h2 id="tabulka">Zobrazení jako tabulka</h2>

<p>Margin vnitřních elementů se projeví i v případě, že bude <code>.obal</code> zobrazen jako tabulka – <a href="/display#tabulkove"><code>display: table</code></a>:</p>

<div class="live">
<div class="priklad-obal priklad-obal-tabulka">
  <p>Text</p>
  <p>Text</p>
</div>
</div>





<h2 id="element-odsazeni">Element jako odsazení</h2>

<p>V případě, že odsazení od krajů u obalu <b>bude větší</b> než odsazení používané u jeho potomků, docela spolehlivé řešení je odsazení nahoře a dole uvnitř obalu vytvořit prázdnými elementy.</p>


<p>Nižší <code>margin</code>y potomků <code>.obal</code>u se sloučí s vyššími hodnotami odsazovacích elementů. Pro projevení odsazení se malinká část <code>margin</code>u odsazovacích elementů přidá do jejich <code>padding</code>u:</p>

<div class="live">
<div class="priklad-obal priklad-odsazeni">
  <div class="priklad-odsazeni-element-nahore"></div>
  <p>Text</p>
  <p>Text</p>
  <div class="priklad-odsazeni-element-dole"></div>
</div>
</div>




<h2 id="pozirace">Sežrání <code>margin</code>u</h2>

<p>Protože není jisté, jaký spodní <code>margin</code> posledního elementu bude. Jde pomocí dalšího elementu vytvořit <i>margino-žrouta</i> – <code>&lt;div></code>, který má velký <code>margin</code>, aby spolehlivě stanovil hodnotu po sloučení. Tato známá hodnota může být potom odečtena záporným <code>margin</code>em na opačné straně.</p>


<div class="live">
<div class="priklad-obal priklad-odsazeni">
  <div style="border-top: .1em solid transparent"></div>
  <div class="priklad-odsazeni-zrout-element-nahore"></div>
  <p>Text</p>
  <p>Text</p>
  <div class="priklad-odsazeni-zrout-element-dole"></div>
  <div style="border-top: .1em solid transparent"></div>
</div>
</div>


<h2 id="nepouzivat-margin">Nepoužívat <code>margin</code></h2>

<p>Možné řešení je <code>margin</code> vůbec nepoužívat a rozestupy řešit všude <code>padding</code>em.</p>

<p>Není potom nutné přemýšlet nad slučováním a neprojevením se <code>margin</code>u, ale počítat s tím, že se odsazení sčítá.</p>

<p><a href="http://kod.djpw.cz/rqub">Živá ukázka</a></p>

<p>V řadě případů to ale znamená komplikovanější HTML kód – používat zvláštní obaly jen pro odsazení.</p>




<h2 id="zaver">Závěr</h2>

<p>Při psaní článku jsem zkoumal řadu webů, jestli jednotné odsazení nějak řeší. Zpravidla neřeší a odsazení jsou svým způsobem náhodná dle hesla „jak to vyjde“.</p>

<p>Zamysleli jste se někdy nad tímto problémem a oblíbili si nějaké řešení? Napište mi to, prosím.</p>


<style>
  .priklad-odsazeni {
    padding: 0 1em;
  }
  
  
  
  
  
  .priklad-odsazeni-zrout-element-nahore {
    overflow: hidden;
    padding-top: .1em;
    margin-bottom: 10em;
    margin-top: -9.2em;
  }
  .priklad-odsazeni-zrout-element-dole {
    overflow: hidden;
    padding-bottom: .1em;
    margin-top: 10em;    
    margin-bottom: -9.2em
  }  
      
      
      
      
      
  
  .priklad-odsazeni-element-nahore {
    overflow: hidden;
    padding-top: .1em;
    margin-bottom: .9em;
  }
  .priklad-odsazeni-element-dole {
    overflow: hidden;
    padding-bottom: .1em;
    margin-top: .9em;    
  }
  
  
  .priklad-obal-tabulka {
    padding: 0 1em;
    box-sizing: border-box;
    width: 100%;
    display: table;
  }
  
  
  .priklad-obal-margin-vnitrni {
      margin: -1em 0;
  }
  
  
  
  
  .priklad-obal {
    background: #efefef;
  }
  .priklad-obal p {
    margin: 1em 0;
  }
  .priklad-obal-padding {
    padding: 1em;
  } 
  .priklad-obal-padding-nulovany {
    padding: 0 1em;
  }  
  .priklad-obal-overflow {
    padding: 0 1em;
    overflow: hidden;
  }    
  .priklad-obal-padding-border {
    padding: 0 1em;
    border-top: 1px solid blue;
    border-bottom: 1px solid blue;
    margin-top: -1px;
    margin-bottom: -1px;
  }      
  
  .priklad-last-first > :first-child {margin-top: 0}
  .priklad-last-first > :last-child {margin-bottom: 0}
  
  .priklad-jeden-margin {
    padding: 1em;    
  }
  .priklad-jeden-margin > :first-child {
    margin-top: 0;
  }
  .priklad-jeden-margin p {
      margin: 0;
      margin-top: 1em;
  }
  
  .priklad-outline {
    outline: 1px dotted red;
  }</style>