---
title: "Column – obsah ve sloupcích"
headline: "Vícesloupcový text a <code>column</code>"
description: "CSS vlastnost <code>column</code> umožňuje rozdělení textu do více sloupců."
date: "2013-06-19"
last_modification: "2015-08-04"
status: 1
tags: ["css", "css-vlastnosti", "hotova-reseni"]
format: "html"
---

<p>V novinách nebo časopisech je běžné, že je text <b>rozdělen do více sloupečků</b>. Pro docílení tohoto efektu na webové stránce existují CSS vlastnosti <code>column-*</code>.</p>



<h2 id="podpora">Podpora</h2>

<p>Tvorba sloupců s využít CSS vlastností <code>column-*</code> funguje od <b>Internet Exploreru 9</b>. V <b>Chrome</b>/<b>Opeře</b> je nutno použít <a href="/css-prefixy">CSS prefix</a> <code>-webkit-</code>, ve <b>Firefoxu</b> zase <code>-moz-</code>. Ve staré <b>Opeře 12</b> funguje samotné <code>column-*</code> jako v <b>IE 9</b> a novějších.</p>

<p>Ukázka rozdělení <a href="/seznamy">seznamu <code>&lt;ul></code></a>:</p>

<div class="live">
  <ul style='list-style: none; padding: 0; text-align: center; column-count: 2; -webkit-column-count: 2; -moz-column-count: 2; column-rule: 1px solid #0D6AB7; -webkit-column-rule: 1px solid #0D6AB7; -moz-column-rule: 1px solid #0D6AB7'>
    <li>První</li>
    <li>Druhá</li>
    <li>Třetí</li>
    <li>Čtvrtá</li>
    <li>Pátá</li>
    <li>Šestá</li>
    <li>Sedmá</li>
    <li>Osmá</li>
    <li>Devátá</li>
  </ul>
</div>  


<h2 id=column>Vlastnost <code>column-*</code></h2>

<p>Pro nastavení sloupců existují následující vlastnosti:</p>

<table>
<tr>
  <th width=150>Značka<th>Význam</th>
  <tr><td><code>column-count</code><td>počet sloupců</td></tr>
<tr><td><code>column-gap</code><td>šíře mezery mezi sloupci </td></tr>

<tr><td><code>column-rule</code><td>styl oddělovače sloupců, funguje podobně jako <code>border</code> (analogicky lze rozdělit na 3 vlastnosti <code>column-rule-color</code>, <code>column-rule-style</code> a <code>column-rule-width</code>).</td></tr>
<tr><td><code>column-width</code><td>šířka jednoho sloupce</td></tr>
  <tr><td><code>columns</code><td>zkratka; sdružení <code>column-count</code> a <code>column-width</code> do jedné vlastnosti</td></tr>
<!--<tr><td><code>column-span</code><td>
<tr><td><code>column-fill</code><td>-->
</table>



<h3 id="zmena-poctu">Změna počtu sloupců</h3>

<p>Užitečné chování CSS <code>column</code> spočívá v tom, že se počet sloupců dokáže <b>sám průběžně měnit</b> podle dostupného prostoru. V případě, že se zadá šířka (<code>column-width</code>), se tento rozměr chápe jako minimální, kdy se při zúžení sloupeček odebere.</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/htob">Živá ukázka</a> – při změně dostupné velikosti se mění počet sloupců</li>
  </ul>
</div>



<h2 id="pouzivat">Používat sloupce?</h2>

<p>Stručně řečeno: <b>Ne</b>.</p>

<p>Web funguje jinak než časopis nebo noviny – <b>není rozdělen na jednotlivé stránky</b>, ale text plyne nerozděleně shora dolů.</p>

<p>Použití více sloupců bude tedy pro návštěvníky většinou <b>nezvyklé a nepřehledné</b>.</p>

<p>Možná existují výjimky, kdy je použití více sloupců užitečné, ale moc mě jich nenapadá (budu rád, když mi dáte tip do komentářů).</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/mtob-">Responsivní navigace pomocí <code>column</code></a> – příklad navigace měnící počet sloupců</li>
  </ul>
</div>



  
<h2 id="starsi">Více sloupců ve starších prohlížečích</h2>  

<p>Ve starších prohlížečích existují dvě možnost řešení:</p>

<ol>
  <li><i>Přesypávání</i> obsahu JavaScriptem.</li>
  
  <li>Hackování v CSS.</li>
</ol>

<p>Následující ukázka je funkční od <b>Internet Exploreru 7</b>. Používá se primitivní metoda <a href='/css-selektory#primy-sourozenec'>selektoru sourozence</a> ve stylu <code>li+li+li+li+li+li</code> a <a href="/position#relative">relativní posicování</a>.
  
<p>Od páté položky v seznamu se začne tvořit <b>nový sloupec</b>.</p>
  <div class="live">
    <style>
      ul.sloupcovemenu {width: 100%; margin: 0; padding: 5px; height: 10em; text-align: center; list-style: none}
      ul.sloupcovemenu {overflow: hidden}
      ul.sloupcovemenu li {line-height: 2em; width: 50%; display: block;}
      ul.sloupcovemenu li {border-right: 1px solid #0D6AB7; float: left; clear: left;}
      ul.sloupcovemenu li+li+li+li+li+li {float: right; clear: right; position: relative; top: -10em; border: none}
  </style>
    <ul class="sloupcovemenu">
    <li>První</li>
    <li>Druhá</li>
    <li>Třetí</li>
    <li>Čtvrtá</li>
    <li>Pátá</li>
    <li>Šestá</li>
    <li>Sedmá</li>
    <li>Osmá</li>
    <li>Devátá</li>
  </ul>
  </div>


<h2 id="tabulka">Responsivní tabulka ve sloupcích</h2>

<p>V SCSS:</p>

<pre><code>.table-column {
    display: block;
    width: 100%;

    &amp;__body {
        display: block;
        width: 100%;

        @include respond(880, 1039) {
            column-count: 2;
        }

        @include respondMin(1140) {
            column-count: 2;
        }

        @include respondMin(1440) {
            column-count: 3;
        }
    }

    &amp;__row {
        display: table;
        width: 100%;
        break-inside: avoid;
    }

    &amp;__cell {
        display: table-cell;
        border-top: 1px solid silver;

        &amp;--join {
            padding: 0;
        }
    }
}</code></pre>