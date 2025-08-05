---
title: "Zalamování slov"
headline: "Zalamování dlouhých slov"
description: "Jak si poradit s dlouhými slovy, které by mohly narušit layout stránky."
date: "2014-07-03"
last_modification: "2017-05-16"
status: 1
tags: ["css", "hotova-reseni", "napady"]
format: "html"
---

<p>Při vytváření layoutu webové stránky i aplikace čelíme výzvě, jak vyřešit stav, kdy se text nevejde do stanoveného prostoru. Zvlášť v případě, kdy mají <b>návštěvníci</b> možnost <b>vkládat obsah na stránku</b>, je tento problém rozhodně nutné řešit.</p>

<div class="live">
  <style>
    .obal-sloupce {
      width: 100px;
      padding: 0 .5em;
      background: #fff;
    }
  </style>
  <div class="obal-sloupce">
    <p>Krátký obsah</p>
  </div>
  <div class="obal-sloupce">
    <p>NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde</p>
  </div>
</div>

<p>Na ukázce je vidět, jak i při nastavení šířky text z obalu vyleze.</p>





<h2 id="reseni">Možná řešení</h2>


<h3 id="word-wrap">CSS vlastnost <code>word-wrap</code></h3>

<pre><code>element {
  word-wrap: break-word;
}</code></pre>

<div class="live">
  <div class="obal-sloupce" style="word-wrap: break-word">
    <p>NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde</p>
  </div>
</div>















<h3 id="tabulky">Zalamování textu v tabulkách</h3>

<p>Problém s tímto řešením může nastat v <a href="/tabulky"><b>tabulce</b></a>, kde <code>word-wrap</code> zdánlivě nic nedělá.</p>

<div class="live">
  <table class="obal-sloupce" style="word-wrap: break-word">
    <tr>
      <td><p>NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde</p></td>
    </tr>    
  </table>
</div>




<p>Řešení je nastavit <b>buňce</b> maximální šířku (<code>max-width</code>) třeba na nulu:</p>

<div class="live">
  <table class="obal-sloupce" style="word-wrap: break-word">
    <tr>
      <td style="max-width: 0"><p>NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde</p></td>
    </tr>    
  </table>
</div>











<p>Nebo použít <b>fixní layout</b> tabulky (<code>table-layout: fixed</code>):</p>

<div class="live">
  <table class="obal-sloupce" style="word-wrap: break-word; table-layout: fixed">
    <tr>
      <td><p>NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde</p></td>
    </tr>    
  </table>
</div>










<h3 id="word-break">Vlastnost <code>word-break</code></h3>

<p>I v jiných případech nemusí fungovat <code>word-wrap</code>. Třeba element s <a href="/display#inline-block"><code>display: inline-block</code></a> obsahující dlouhé slovo klidně vyleze ze svého rodiče.</p>

<p>Tento problém vyřeší <code>word-break</code>.</p>

<pre><code>element {
  word-break: break-all;
}</code></pre>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/yahc">Živá ukázka</a> – zalamování dlouhých slov v <code>inline-block</code></li>
  </ul>
</div>


<h3 id="hyphens">CSS vlastnost <code>hyphens</code></h3>

<p>Vlastnost <a href="/hyphens"><code>hyphens</code></a> s problémem nijak nepomůže.</p>


<h3 id="overflow">Oříznutí <code>overflow: hidden</code></h3>

<pre><code>element {
  overflow: hidden;
}</code></pre>

<p>Přetékání nastavené na hodnotu <code>hidden</code> sice problém vyřeší, ale obsah <i>zmizí</i>.</p>

<div class="live">
  <div class="obal-sloupce" style="overflow: hidden">
    <p>NějakéHodněDlouhéSlovoCoSeDoSloupceNevejde</p>
  </div>
</div>

<p>Další tipy jsou v samostatném článku <a href="/oriznuti-textu">Oříznutí textu</a>.</p>


<h3 id="php">Rozdělení na straně serveru</h3>

<p>V PHP je možné funkcí <code>wordwrap</code> automaticky rozdělit dlouhá slova v textu.</p>

<pre><code>// Slovo delší 50 znaků rozdělí mezerou
$text = wordwrap($text, 50, " ", true);</code></pre>

<p>U tohoto řešení je si potřeba dát pozor na pár věcí:</p>

<ol>
  <li>
    <p>Používat ho jen na <b>výstupu</b>. To zjednoduší případnou změnu čísla udávajícího počet znaků.</p>
  </li>
  
  <li>
    <p>Rozlámání slov <b>rozbije odkazy</b>. Zatímco dlouhá slova nemají moc opodstatnění, v případě odkazů je situace jiná. Typicky mívají minimálně desítky znaků, někdy se ale může délka blížit i stovce (tato stránka má URL dlouhou <script>document.write((window.location+"").length)</script> znaků).</p>
    
    <p>Řešením je odkazy převádět na klikací a <b>text odkazu zkrátit</b>. Osobně mi ale přijde lepší <b>použít CSS</b>, protože ani slova rozlámaná na určitý počet nejsou zárukou správného zobrazení. Stačí mít v prohlížeči nebo operačním systému <b>větší písmo</b> a přesně spočítaný počet znaků bude k ničemu.</p>
  </li>
</ol>


<h2 id="vyska-radku">Výška řádku <code>line-height</code></h2>

<p>Při možnosti, že se text rozdělí na více řádku, je <b>velmi vhodné</b> použít rozumnou hodnotu CSS vlastnosti <code>line-height</code>.</p>

<p>Jinak budou jednotlivé řádky na sebe nepěkně nalepeny.</p>

<div class="live">
  <p style="line-height: .8em">Dva ošklivě<br> nalepené řádky.</p>
</div>
