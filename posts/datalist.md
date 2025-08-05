---
title: "Napodívání přes <datalist>"
headline: "Našeptávání značkou <code>&lt;datalist&gt;</code>"
description: "Pro napovídání možností při vyplňování <code>&lt;input&gt;</code>u lze v HTML 5 použít značku <code>&lt;datalist&gt;</code>."
date: "2013-11-05"
last_modification: "2013-11-10"
status: 1
tags: ["formulare", "html", "html-tagy"]
format: "html"
---

<p>Pro zpříjemnění vyplňování <b>políček formulářů</b> je vhodné při psaní <b>napovídat možné hodnoty</b>. Od <b>IE 10</b> existuje možnost jak napovídání řešit bez JavaScriptu.</p>

<p>Nejspíš kvůli zpětné kompatibilitě se veškerý obsah <code>&lt;datalist&gt;</code>u zapisuje do atributů <code>value</code> značek <code>&lt;option&gt;</code> (jinak by se obsah k napovídání umístěný do <a href="/vlastni-html-znacky">neznámých HTML značek</a> v nepodporovaných prohlížečích objevil).</p>

<h2 id="pripojeni">Připojení <code>&lt;datalist></code>u</h2>
<p>Připojit <b>data pro napovídání</b> je možné nejspíš jen pro <code>&lt;input type="text"></code>, pro <code>type="number"</code> a <b>napovídání čísel</b> to nefunguje. <b>Samotné propojení</b> <code>&lt;input></code>u s <code>&lt;datalist></code>em se provádí pojmenováním <code>&lt;datalist></code>u atributem <code>id</code> a přiřazením názvu <code>id</code> do atributu <code>list</code> u <code>&lt;input></code>u.</p>

<div class="live">
  <datalist id="clanky">
    <option value="Fixní menu při rolování">
    <option value="JavaScriptová simulace atributu ismap">
    <option value="Oříznutí dlouhého textu">
    <option value="Jak vybrat vhodnou doménu?">
    <option value="Jednoduchá galerie v CSS">
  </datalist>
  <datalist id="cisla">
    <option value="100">
    <option value="10">
    <option value="50">
  </datalist>  
  <p><label>Text <input list="clanky" type=text></label></p>
  <p><label>Číslo <code>number</code> <input list="cisla" type=number></label></p>
  <p><label>Číslo <code>text</code> <input list="cisla" type=text></label></p>
</div>

<h2 id="zavisle">Závislé <code>datalist</code>y</h2>

<p><a href="http://kod.djpw.cz/pmeb">Samostatná živá ukázka</a></p>


<h2 id="napovidani">Napovídání napříč prohlížeči</h2>
<p>Jak už bylo zmíněno, v <b>IE 9 a starších</b> to nefunguje vůbec, v podporovaných prohlížečích se chování různí.</p>

<ul>
  <li><b>IE 10</b> a <b>Opera</b> zobrazí <code>&lt;datalist></code> po kliknutí do políčka, <b>Chrome</b> a <b>Firefox</b> až <b>po dvojkliku</b>.</li>
  <li><b>Firefox</b> umí možnosti filtrovat jako <b>skutečný vyhledávač</b> (položku „Nějaký t<b>ex</b>t“ nabídne i při napsání <code>ex</code>), ostatní prohlížeče filtrují jen podle písmen na začátku.</li>
</ul>

<p>Zdá se tedy být vhodnější stále <b>napovídání řešit JavaScriptem</b>. Třeba nástrojem <a href="/vzhled-formularu#js">Select2</a>.</p>