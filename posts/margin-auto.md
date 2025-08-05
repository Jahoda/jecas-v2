---
title: "Margin: auto"
headline: "Psát <code>margin: auto</code>, nebo <code>margin: 0 auto</code>?"
description: "CSS konstrukce <code>margin: auto</code> se obvykle používá pro vodorovné centrování bloku."
date: "2015-05-18"
last_modification: "2015-05-19"
status: 1
tags: ["css", "css-vlastnosti", "napady"]
format: "html"
---

<p>Má-li nějaký blokový element <b>nastavenou šířku</b>, jde ho pomocí levého a pravého <a href="/margin"><code>margin</code>u</a> nastaveného na hodnotu <code>auto</code> <b>vodorovně vycentrovat</b>.</p>


<div class="internal-content">
  <ul>
    <li><a href="/centrovani">Centrování v CSS</a> – popis různých způsobů centrování</li>
  </ul>
</div>

<p>Často je k vidění, že někdo centrování <code>margin</code>em zapisuje předpisem <code>margin: <b>0</b> auto</code>. Přitom nula pro horní a spodní odsazení se stejně tak aplikuje při hodnotě <code>auto</code> pro všechny strany. Zápis <code>margin: 0 auto</code> je tedy zbytečně komplikovaný a stačí použít:</p>

<pre><code>.centrovany {
  margin: auto;
}</code></pre>

<p>Výsledek je stejný. Tedy <code>margin-top</code> a <code>margin-bottom</code> budou nulové a element bude umístěn uprostřed.</p>

<p class="soft">Nejspíš jediná výjimka, kdy se výsledek <code>margin: auto</code> a <code>margin: 0 auto</code> liší, je <a href="/centrovani#absolutni-margin">centrování absolutním posicováním</a>.</p>





<h2 id="inherit">Zachování původního <code>margin</code>u</h2>

<p>Pokud je cílem element pouze vycentrovat a zachovat původní hodnoty odsazení, nabízí se dvě možnosti:</p>

<ol>
  <li>
    <p>Přepsat pouze krají hodnoty:</p>
    
    <pre><code>.centrovany {
  margin-left: auto;
  margin-right: auto;
}</code></pre>
  </li>
  
  <li>
    <p>Využít klíčového slova <code>inherit</code>. Funkční od <b>IE 8</b>.</p>
    
    
    <pre><code>.centrovany {
  margin: <b>inherit</b> auto;
}</code></pre>    
    
    <p>Hodnota <code>inherit</code> způsobí, že se hodnota podědí.</p>
  </li>
</ol>