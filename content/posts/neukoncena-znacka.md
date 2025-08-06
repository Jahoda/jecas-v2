---
title: "Jak najít neukončenou značku?"
headline: "Jak najít neuzavřenou značku?"
description: "Neuzavřená HTML značka může způsobovat problémy. Jak ji najít?"
date: "2015-11-04"
last_modification: "2015-11-06"
status: 1
tags: ["html", "napady"]
format: "html"
---

<p><img src="/files/neukoncena-znacka/neuzavreny.png" alt="Neuzavřený element" class="border"></p>











<p><b>Špatně uzavřené značky</b> je jedna z mála věcí, ke které se hodí použít validátor:</p>

<div class="external-content">
  <ul>
    <li><a href="http://validator.webylon.info/">Český validátor</a></li>
    
    <li><a href="https://html5.validator.nu/">Validator.nu (X)HTML5 Validator</a></li>
  </ul>
</div>

<p>Elementy neuzavřené nebo uzavřené jinak, než je cílem, mohou způsobovat <b>špatné zobrazení</b>.</p>

<p>V případě nevysvětlitelných problémů s CSS je proto dobré zkontrolovat výsledné HTML validátorem.</p>

<p>Případně mít takovou kontrolu přímo v editoru (nazývá se to <i lang="en">linter</i>):</p>

<p><img src="/files/neukoncena-znacka/linter.png" alt="Neuzavřený element" class="border"></p>
















<p><a href="https://kod.djpw.cz/bwrb">Živá ukázka</a> s neukončeným <code>&lt;div></code>em</p>



<h2 id="hledani">Hledání neuzavřené značky</h2>

<p>Validátor sice problém odhalí, ale <b>konkrétní místo neprozradí</b>. Nemá moc jak, protože neví, kde je cílem, aby ukončovací značka byla.</p>

<p>Že je se zanořením problém, jde zjistit ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> zkoumáním <a href="/dom">DOMu</a>:</p>


<p><img src="/files/neukoncena-znacka/devtools.png" alt="Neuzavřený element" class="border"></p>























<p>Element <code>div.paticka</code> je uvnitř <code>div.stranka</code>, protože není uzavřený <code>div.popis</code>.</p>

<p>U dlouhého kódu se neuzavřená značka hledá dost těžko. A nezbývá než to dělat <b>ručně</b>.</p>

<p>V praxi se mi nejvíc osvědčil postup, kdy se kód bere po velkých blocích a jednotlivé bloky se testují samostatně. Tak jde vylučovací metodou celkem rychle najít problém.</p>





<h2 id="prevence">Předcházení neuzavřeným značkám</h2>

<p>Protože se špatně uzavřené značky obtížně hledají, je dobré jim předcházet:</p>

<ol>  
  <li>
    <p><b>Linter</b> v editoru dokáže problém odhalit hned po jeho vzniku. Při jeho používání by se tak problém nikdy neměl stát.</p>
    
    <p>Do <b>Sublime Text</b> k tomu slouží <a href="/pluginy-sublime-text#linter">plugin</a> (nejen pro HTML).</p>
  </li>  
  
  <li>
    <p><b>HTML komentář</b> za koncovou značkou může značně pomoci.</p>
    
    <pre><code>&lt;div class="header">
  …
&lt;/div>&lt;!-- /.header --></code></pre>
    
    <p>S nástrojem <a href="/emmet#komentar">Emmet</a> v editoru <a href="/st">Sublime Text</a> to jde dělat automaticky.</p>
  </li>  
  

  
  <li>
    <p><b>Dělit HTML soubory</b> – tento postup je dobrý při používání šablonovacího systému. Výsledné HTML se potom sestavuje z více malých souborů.</p>
    
    <p>Při tomto postupu je zásadní, aby v rámci jednoho souboru bylo vždy vše otevřeno a uzavřeno. Jinak bude odhalování chyb ještě těžší.</p>
  </li>
</ol>