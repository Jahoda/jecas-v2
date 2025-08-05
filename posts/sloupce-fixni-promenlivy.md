---
title: "Jeden sloupec fixní, druhý proměnlivý"
headline: "Jeden sloupec fixní, druhý proměnlivý"
description: "Jak vytvořit dvousloupcové rozvržení, kde je jeden sloupec s pevnou šířkou a druhý se přizpůsobuje šířce okna."
date: "2015-06-15"
last_modification: "2015-09-29"
status: 1
tags: ["css", "hotova-reseni", "layout", "responsive"]
format: "html"
---

<p>I v případě <b>responsivního webu</b> s gumovým procentuálním layoutem, který se přizpůsobuje dostupné velikosti okna, je možné sem tam použít <b>sloupec s fixní šířkou</b>.</p>

<p><img src="/files/sloupce-fixni-promenlivy/sloupce.png" alt="Jeden fixní a druhý proměnlivý sloupec" class="border"></p>
















<p>Jak na to?</p>




<h2 id="margin">Záporný <code>margin</code></h2>

<p>První možnost je nejprve vytvořit dva obtékané sloupce (<a href="/float"><code>float</code></a>):</p>

<ul>
  <li><code>pravy</code> s pružnou 100% šířkou</li>
  <li><code>levy</code> s fixní šířkou 100 pixelů</li>
</ul>

<div class="live">
  <style>
    .obal--1 {overflow: hidden}
    .obal--1 .sloupec {float: left; color: #fff}
    .obal--1 .pravy {background: #DA3F94; width: 100%}
    .obal--1 .levy {background: #1081DD; width: 100px}    
  </style>
  <div class="obal--1">    
    <div class="sloupec pravy">Pravý pružný sloupec</div>
    <div class="sloupec levy">Levý fixní sloupec</div>    
  </div>
</div>

<p>Nyní se sloupci s pružnou 100% šířkou nastaví záporný krajní <a href="/margin"><code>margin</code></a> o fixní šířce druhého sloupce, čímž se dostanou vedle (přes) sebe:</p>

<div class="live">
  <style>
    .obal--margin {overflow: hidden}
    .obal--margin .sloupec {float: left; color: #fff}
    .obal--margin .pravy {float: right; background: #DA3F94; width: 100%; margin-left: -100px}
    .obal--margin .levy {background: #1081DD; width: 100px; opacity: .8}    
  </style>
  <div class="obal--margin">
    <div class="sloupec pravy">Pravý pružný sloupec</div>   
    <div class="sloupec levy">Levý fixní sloupec</div>
  </div>
</div>

<p>Aby se obsah sloupců <b>nepřekrýval</b>, přidá se pravému pružnému sloupci levý <code>padding</code> o stejné hodnotě jako je šířka fixního sloupce nebo hodnota záporného <code>margin</code>u. Pro zachování šířky je nutné použít obsahový box-model – <code><a href="/box-sizing#border-box">box-sizing: border-box</a></code>, jinak by se odsazení k šířce přičetlo a sloupce by se vedle sebe opět nevešly.</p>

<div class="live">
  <style>
    .obal--2 {overflow: hidden}
    .obal--2 .sloupec {float: left; color: #fff}
    .obal--2 .pravy {float: right; background: #DA3F94; width: 100%; margin-left: -100px; padding-left: 100px; box-sizing: border-box}
    .obal--2 .levy {background: #1081DD; width: 100px; opacity: .8}    
  </style>
  <div class="obal--2">
    <div class="sloupec pravy">Pravý pružný sloupec</div>   
    <div class="sloupec levy">Levý fixní sloupec</div>
  </div>
</div>

<p>Jak je na ukázce díky <a href="/opacity">průhlednosti</a> vidět, oba sloupce se stále překrývají. To ale ničemu nevadí, jen není dobré pravému sloupci nastavovat pozadí, ale použít ho pouze pro <b>vyhrazení prostoru</b>, kam se vloží další <code>&lt;div></code>.</p>

<p>Větší hodnotou levého <code>padding</code>u než levého <code>margin</code>u jde snadno vyrobit <b>odsazení mezi sloupci</b>:</p>

<div class="live">
  <style>
    .obal {overflow: hidden}
    .obal .sloupec {float: left; color: #fff}
    .obal .pravy {float: right; width: 100%; margin-left: -100px; padding-left: 110px; box-sizing: border-box}
    .obal .levy {background: #1081DD; width: 100px; opacity: .8}    
    .obal .pravy-vnitrek {background: #DA3F94}
  </style>
  <div class="obal">
    <div class="sloupec pravy">
      <div class="pravy-vnitrek">Pravý pružný sloupec</div>
    </div>   
    <div class="sloupec levy">Levý fixní sloupec</div>
  </div>
</div>


<h3 id="vpravo">Fixní sloupec vpravo</h3>

<p>Měl-li by být fixní sloupec vpravo, stačí jen nahradit <code>left</code> za <code>right</code> v odsazení (<code>margin</code> a <code>padding</code>) a obtékání (<code>float</code>):</p>

<div class="live">
  <style>
    .obal-vpravo {overflow: hidden}
    .obal-vpravo .sloupec {float: right; color: #fff}
    .obal-vpravo .levy {float: left; width: 100%; margin-right: -100px; padding-right: 110px; box-sizing: border-box}
    .obal-vpravo .pravy {background: #1081DD; width: 100px; opacity: .8}    
    .obal-vpravo .levy-vnitrek {background: #DA3F94}
  </style>
  <div class="obal-vpravo">
    
    <div class="sloupec levy">
      <div class="levy-vnitrek">Levý pružný sloupec</div>
    </div>   
    <div class="sloupec pravy">Pravý fixní sloupec</div>
  </div>
</div>

<p>Na pořadí v HTML kódu nezáleží. První může být levý i pravý sloupec, což se hodí pro následné zrušení sloupců pro <b>zobrazení na mobilech</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/hkqb">Samostatná živá ukázka</a> – obtékané sloupce s fixní a proměnlivou šířkou</li>
  </ul>
</div>


<h2 id="tabulka">Tabulka</h2>

<p>Docílit podobného výsledku jde také pomocí tabulky. Tedy přesněji <a href="/display#table">tabulkových hodnot</a> vlastnosti <code>display</code>.</p>

<p>Pokud se nastaví tabulce 100% šířka a jednomu ze sloupců fixní, druhému sloupci se dopočítá.</p>

<p>Řešitelné je i <a href="/sachovnicovy-vypis#prohozeni">prohození sloupců</a> v HTML kódu.</p>


<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/jkqb">Živá ukázka</a> – fixní a gumový sloupec pomocí <code>display: table</code></li>
  </ul>
</div>

<p>Tabulky bez zadaných rozměrů ale <b>není moc dobré používat pro layout</b>, protože prohlížeč do stažení celého obsahu neví, jak bude ve finále tabulka vypadat.</p>

<p>Stejným problémem trpí i <a href="/flexbox">flexboxy</a>.</p>

<p>Nejelegantnější řešení nabízí <a href="/display#grid-layout">grid layout</a> od Microsoftu, je ale zatím podporován pouze v <b>IE 10+</b> a <a href="/microsoft-edge"><b>MS Edge</b></a>.</p>



<h2 id="posicovani">Absolutní posicování</h2>

<p>V případě, že je jisté, který ze sloupců bude vždy nižší, může se ten nižší <a href="/position#absolute">absolutně naposicovat</a> do <code>padding</code>em vyhrazeného prostoru.</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/kkqb">Živá ukázka</a> – absolutně posicovaný sloupec s fixní šířkou</li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://radiatingstar.com/make-a-layout-with-fluid-and-fixed-size-columns">Make a Layout With Fluid and Fixed-size Columns</a></li>
  
  <li><a href="http://stackoverflow.com/questions/5195836/2-column-div-layout-right-column-with-fixed-width-left-fluid">2 column div layout: right column with fixed width, left fluid</a></li>  
</ul>

<style>
  .sloupec,
  .pravy-vnitrek,
  .levy-vnitrek {
    padding: 1.5em 1em; box-sizing: border-box;
  }
  .obal .pravy {
    padding-top: 0;
    padding-right: 0;
  }
  .obal-vpravo .levy {
    padding-top: 0;
    padding-left: 0;
  }</style>