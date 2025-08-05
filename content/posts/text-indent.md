---
title: "Odsazení prvního řádku text-indent"
headline: "Odsazení prvního řádku <code>text-indent</code>"
description: "CSS vlastnost <code>text-indent</code> slouží k odsazení nebo předsazení prvního řádku."
date: "2015-08-27"
last_modification: "2015-09-23"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<div class="live">
  <style>
    .indent {
      text-indent: 1em;
    }
  </style>
  <p class="indent">První řádek <br> tohoto odstavce <br> bude více odsazen zleva.</p>
</div>

<p>Záporná hodnota zajistí naopak <b>předsazení prvního řádku</b> (v ukázce je přidán <code>padding</code>, aby obsah nevylezl z obalu):</p>

<div class="live">
  <style>
    .zaporny-indent {
      padding-left: 1em;
      text-indent: -1em;
    }
  </style>
  <p class="zaporny-indent">První řádek <br> tohoto odstavce <br> bude více <b>předsazen</b> zleva.</p>
</div>

<h2 id="zapis">Zápis</h2>

<pre><code>p {
  text-indent: 1em;
}</code></pre>




<p>Hodnotu odsazení/předsazení jde zadat v běžných délkových jednotkách nebo v procentech. Výchozí hodnota je <code>0</code> – nic se neodsazuje.</p>



<h3 id="dalsi">Další hodnoty</h3>

<p>Specifikace uvádí další hodnoty pro <code>text-indent</code>, které ale zatím <b>nikde nefungují</b>:</p>

<ul>
  <li id="each-line"><code>each-line</code> – odsadí i první řádek po řádkovém zlomu</li>
  
  <li id="hanging"><code>hanging</code> – invertuje obsah, co se má odsadit/předsadit</li>
</ul>



<h2 id="vyuziti">Využití</h2>

<p>U <b>textů v českých knihách nebo novinách</b> bývá zvykem, že se <b>odstavec tvoří</b> odsazením začátku řádku místo svislým odstupem, jak je běžné na webu.</p>


<img src="/files/odstavec/noviny-odstavec.jpg" alt="Příklad odstavců v novinách" class="border">




















<p><b>Znázorňovat odstavec</b> odsazením prvního řádku místo horního a dolního odsazení celého odstavce se hodí zejména v případech, kdy pro vertikální odsazení není dost místa – to se na rozdíl od novin a knih <b>webu moc netýká</b> – vyšší webová stránka další papír nestojí.</p>


<div class="internal-content">
  <ul>
    <li>Odstavec v HTML: <a href="/odstavec#prvni-radek">Odsazení prvního řádku</a></li>
  </ul>
</div>



<h3 id="skryvani">Skrývání textu</h3>

<p>V CSS kódu některých webových kodérů je možné vidět konstrukce typu:</p>

<pre><code>.skryty {
  text-indent: -9999px;
}</code></pre>




<p>Používalo se to ke skrytí textu pří používání obrázkových nadpisů a tlačítek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/obrazek-text#pristupny">Přístupný text v obrázku</a></li>
  </ul>
</div>

<p>Nejedná se o moc dobré řešení, protože bez načtených obrázků není text vidět. K podobnému výsledku tak jde dojít i elegantněji pomocí <a href="/aria"><code>aria-*</code></a> atributům.</p>




<h2 id="first-line">Selektor <code>::first-line</code></h2>

<p>Docílit dalších úprav prvního řádku kromě odsazení (přes <code>text-indent</code>) jde docílit CSS selektorem <a href="/css-selektory#first-letter-line"><code>::first-line</code></a>, který zaměří pouze první řádek.</p>

<div class="live">
  <style>
    .first-line:first-line {
      color: #DA3F94;
    }
  </style>
  <p class="first-line">První řádek <br> tohoto odstavce <br> má jinou barvu.</p>
</div>



<p>Pomocí tohoto selektoru ale zatím nejde v prohlížečích třeba zrovna přidat odsazení. Pseudo-element <code>::first-line</code> podporuje jen vlastnosti měnící písmo, styl textu, barvu a pozadí:</p>

<div class="external-content">
  <ul>
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::first-line"><code>::first-line</code></a></li>
  </ul>
</div>

<p>Při použití pouze jedné dvojtečky (<code>:first-line</code>) má perfektní podporu i ve starých prohlížečích.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/css/text-indent.html">Text-indent</a></li>
  
  <li>DevDocs: <a href="http://devdocs.io/css/text-indent"><code>text-indent</code></a></li>
</ul>