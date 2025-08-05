---
title: "Skloňování v CSS"
headline: "„Programování“ v HTML a CSS"
description: "I bez úprav logiky serverového skriptu lze lecčeho dosáhnout samotným CSS."
date: "2013-05-16"
last_modification: "2013-06-06"
status: 1
tags: ["css", "hotova-reseni", "napady"]
format: "html"
---

<h2>Skloňování</h2>
<p>Redakční systém neumí správně česky skloňovat, dává ale informaci o počtu celkových komentářů? Celkový počet tedy použijeme jako CSS třídu a <a href='/content-attr'>vlastností <code>content</code></a> podle počtu vypíšeme správný tvar. Zároveň je třeba v prohlížečích, co <code>content</code> podporují (IE 8+), skrýt špatný tvar slova. Přesněji řečeno ve starších Explorerech špatný tvar zobrazit, aby tam bylo <i>alespoň něco</i>.

<style>
.kometare span span {display: none; =display: inline;}
.kometare span:before {content: "komentářů";}
.kometare .celkem-1:before {content: "komentář"}
.kometare .celkem-2:before, .kometare .celkem-3:before, .kometare .celkem-4:before {content: "komentáře";}
</style>

<div class=live>
<ul class=kometare>
<li>0 <span class='celkem-0'><span>komentářů</span></span></li>
<li>1 <span class='celkem-1'><span>komentářů</span></span></li>
<li>2 <span class='celkem-2'><span>komentářů</span></span></li>
<li>3 <span class='celkem-3'><span>komentářů</span></span></li>
<li>4 <span class='celkem-4'><span>komentářů</span></span></li>
<li>5 <span class='celkem-5'><span>komentářů</span></span></li>
<li>50 <span class='celkem-50'><span>komentářů</span></span></li>
</ul>
</div>

<h3>HTML</h3>
<p>V HTML se pouze obalí tvar určený k vylepšení skloňování.
<pre><code>&lt;p><b>3</b> &lt;span class='celkem-<b>3</b>'>&lt;span>komentářů&lt;/span>&lt;/span></code></pre>

<h3>CSS</h3>
<p>
<pre><code>/* skrytí vnitřního &lt;span>u a jeho zobrazení ve <span class=help title='Pomocí rovnítkového hacku'>starších IE</span> */
.kometare span span {display: none; <b>=</b>display: inline;}
/* všechny neurčené počty budou mít tvar „komentářů“ */
.kometare span:before {content: "komentářů";}
/* určení tvarů pro jeden až 4 */
.kometare .celkem-1:before {content: "komentář"}
.kometare .celkem-2:before, 
.kometare .celkem-3:before, 
.kometare .celkem-4:before {content: "komentáře";}</code></pre>


<h2 id=zvyrazneni>Zvýraznění aktuální položky</h2>
<p>Obdobným způsobem lze zajistit zvýraznění aktuální stránky. Stačí použít jako nadřazenou třídu nějakou dostupnou proměnnou stránku identifikující.

<pre><code>&lt;p class='strankovani <b>strana1</b>'>
	&lt;a href='?strana=1' class='strana1'>Strana 1&lt;/a>
	&lt;a href='?strana=2' class='strana2'>Strana 2&lt;/a>
	&lt;a href='?strana=3' class='strana3'>Strana 3&lt;/a></code></pre>
<p>A po přidání jednoduchého (ale únavně se opakujícího) CSS se bude odkaz na aktuální stranu zobrazovat tučně.
<pre><code>.strana1 .strana1, 
.strana2 .strana2,
.strana3 .strana3 {font-weight: bold}
</code></pre>