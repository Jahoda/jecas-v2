---
title: "First-letter"
headline: "First-letter"
description: "CSS selektor <code>first-letter</code> zaměří první písmeno v elementu."
date: "2014-10-02"
last_modification: "2014-10-04"
status: 1
tags: ["css", "selektory-css"]
format: "html"
---

<h2 id="zapis">Zápis</h2>

<pre><code>element:first-letter {
  /* styl pro první písmeno */
}</code></pre>

<p><i>Správně</i> by se asi měly používat dvojtečky dvě (dvě dvojtečky značí pseudo-element), ale fungovalo by to potom jen od <b>IE 9</b>. S jedinou dvojtečkou funguje <code>first-letter</code> i v <b>IE 6</b> a novějších.</p>

<p>Jedná se tedy o široce podporovaný selektor.</p>

<div class="live">
  <style>
    .first-letter-odstavec:first-letter {
          color: red;
    }  
  </style>
  <p class="first-letter-odstavec">První písmeno bude červené.</p>
</div>



<h2 id="vyuziti">Využití</h2>

<p><b>Selektor prvního písmene</b> se hodí minimálně v následujících případech.</p>

<h3 id="prevedeni">Převedení prvního písmena na velké</h3>
    
<p>Kombinací <code>:first-letter</code> a <code>text-transform: uppercase</code> zvětšíme první písmeno nadpisu, odstavce nebo čehokoliv jiného bez <b>úpravy zdrojového kódu</b>.</p>

<div class="live">
  <style>
    .prvni-velke:first-letter {
          text-transform: uppercase;
    }
  </style>
  <p class="prvni-velke">odstavec v HTML kódu začíná malým písmenem, ale CSS první písmeno zvětší.</p>
</div>

<h3 id="zajimavejsi">Vytvoření zajímavějších stylů</h3> 
<p>Díky <code>first-letter</code> je možné umocnit efekt <i>kapitálek</i> (<code>font-variant: small-caps</code>). Hodí se například pro <b>zajímavější styl</b> nadpisů.</p>

<div class="live" style="font-size: 150%">
  <style>
    p.small-caps {
      font-variant: small-caps;
    }
    
    .first-letter:first-letter {
      font-size: 120%;
    }
  </style>
  
  <p class="small-caps">Text napsaný kapitálkami</p>
  
  <p class="small-caps first-letter">Toto první písmeno je více zvětšeno</p>
</div>
  
<h3 id="zvetseni-prvniho">Zvětšení písmene na začátku textu</h3>  
    
<p><a href="/float">Rozplaváním</a> prvního písmene a přidáním <a href="/margin"><code>margin</code>u</a> dosáhneme požadovaného efektu bez změny HTML kódu.</p>

<div class="live" style="max-width: 300px">
  <style>
    .velke-obtekane:first-letter {
          font-size: 360%;
          float: left;
          margin-top: .3em;
          margin-right: .1em;
    }
  </style>
  <p class="velke-obtekane">První písmeno bude výrazně zvětšené a další text kolem něj bude obtékat klidně dva řádky.</p>
  
</div>
  
<p>Nevýhoda je, že musíme skloubit:</p>
  
<ol>
  <li>velikost písma,</li>
  <li>styl písma,</li>
  <li>odsazení,</li>
  <li>výšku řádku</li>
</ol>    

<p>Aby to <i>nějak vypadalo</i>. Když se některá z výše uvedených hodnot změní, bude nejspíš nutné si hodnotami laborovat znovu.</p>

<p>Tento problém by v budoucnu <b>mohla řešit CSS vlastnost</b> <code>initial-letter</code>. Nyní to umí řešit skript <a href="https://github.com/adobe-webplatform/dropcap.js">dropcap.js</a>.</p>    














<h2 id="nefunkcni">Nefunkční <code>:first-letter</code></h2>

<p>Trochu zrada je, že <code>first-letter</code> nezaměří první písmeno elementu, který <b>není blokový</b>. Třeba pro obyčejný <code>&lt;span></code> to proto nebude fungovat.</p>

<p>Řešení je použít blokový element. Případně přidat <code>display: block</code> / <code>display: inline-block</code> pro element, kde je cílem <code>:first-letter</code> použít.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://blogs.adobe.com/webplatform/2014/10/02/drop-caps-are-beautiful/">Drop Caps Are Beautiful</a></li>
</ul>