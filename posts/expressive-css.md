---
title: "Expressive CSS"
headline: "Expressive CSS"
description: "Expressive CSS je postup psaní CSS, kde se jednotlivé styly přiřazují pomocí tříd v HTML."
date: "2016-03-18"
last_modification: "2016-03-20"
status: 1
tags: ["css", "napady"]
format: "html"
---

<p>Mezi kodéry je poměrně silně zakořeněna myšlenka, že názvy tříd by měly nést význam elementu místo popisu vzhledu.</p>

<p>Tedy místo:</p>

<pre><code>&lt;div class="nahore">&lt;/div>
&lt;div class="levy-sloupec">
  &lt;p class="cerveny">Důležitý odstavec červenou&lt;/p>
&lt;/div>
&lt;div class="pravy-sloupec">&lt;/div></code></pre>







<p>Psát něco jako:</p>

<pre><code>&lt;div class="menu">&lt;/div>
&lt;div class="obsah">
  &lt;p class="dulezity">Důležitý odstavec červenou&lt;/p>
&lt;/div>
&lt;div class="souvisejici">&lt;/div></code></pre>





<p>Má to tu výhodu, že v případě přesunutí obsahu zleva doprava nebo přebarvení odstavce na zelenou se nemusí měnit HTML kód. On by se tedy nemusel měnit ani v prvním případě, ale vznikly by potom lehce komické deklarace:</p>

<pre><code>.levy-sloupec {
  float: right;
}
.cerveny {
  color: green;
}</code></pre>









<h2 id="myslenka">Myšlenka Expressive CSS</h2>

<div class="external-content">
  <ul>
    <li><a href="http://johnpolacek.github.io/expressive-css/">Expressive CSS</a> – stránka projektu</li>
  </ul>
</div>

<p>Používání Expressive CSS postupu potom dotahuje používání presentačních tříd absolutně.</p>

<p><a href="/position#absolute">Absolutně</a> posicovaný element do levého dolního rohu s bílým textem a dvojnásobným odsazením (<code>padding</code>) se vytvoří následovně:</p>

<pre><code>&lt;div class="abs pos-bottom pos-left text-white pad-2"> 
</code></pre>



<h3 id="inline">Inline styly?</h3>

<p>Na první pohled to může vypadat jako <i>inline styly</i>:</p>

<pre><code>&lt;div style="
position: absolute; bottom: 0; left: 0; color: white; padding: 2em
"></code></pre>





<p>Rozdíl oproti inline stylům je v tom, že například velikost odsazení nebo barvy jde měnit hromadně v externím CSS.</p>

<p>A ostatní vlastnosti?</p>

<p>Stejně většinou bývají specifické pro jediný selektor, a tak vyjde dost podobně, jestli se bude měnit CSS vlastnost u selektoru <code>.paticka</code> v externím CSS nebo se upraví přímo třída v HTML.</p>



<h2 id="vyhoda">Výhody</h2>

<p>Výhoda postupu s expresivními třídami může být v rychlejším vývoji webu, kdy stačí do HTML kódu sázet předpřipravené třídy a do CSS vůbec nezasahovat.</p>



<p>Stejně tak v případě úprav není nutné zkoumat, kde se jaká vlastnost odkud dědí, ale pouze se přepíší třídy v HTML atributu <code>class</code>.</p>


<p>Docela běžný je tento způsob při používaní CSS frameworku typu <a href="/bootstrap-rychlokurs">Bootstrap</a> pro grid (rozložení layoutu stránky), kdy se také visuální podoba stránky určuje přidáváním připravených CSS tříd.</p>

<p>Používání expresivních tříd se může hodit i při práci v týmu s méně zkušenými kodéry, kteří díky tomu dokáží snadněji upravovat a měnit vzhled stránky.</p>

<h3 id="datova-velikost">Datová velikost</h3>

<p>Používání těchto tříd má ještě výhodu v datově menším CSS, protože cokoliv jde z CSS tříd sestavovat v HTML bez nutnosti psát nové styly.</p>



<h2 id="nevyhody">Nevýhody</h2>

<p>Expressive CSS rozhodně není universální nejlepší řešení pro všechny případy. Například klade vysoké nároky na šablonovací systém generující HTML kód.</p>





<h3 id="sablony">HTML šablony</h3>

<p>Je nutné, aby šablony dodržovaly zásadu DRY (<i lang="en">Don't repeat yourself</i>) – tedy se stejný kód neopakoval. V opačném případě by hromadné změny stylu stejného kódu na více místech byly dost komplikované.</p>


<p>Při „klasickém“ přístupu se klidně na několika místech použije obyčejné:</p>

<pre><code>&lt;div class="komponenta"></code></pre>

<p>A vzhled jde jednotně změnit v externím CSS.</p>

<p>U statického webu, kde se kód vypisuje ručně, by používání expresivních tříd bylo spíš na obtíž a složitě udržovatelné.</p>



<h3 id="obecny-postup">Obecný postup</h3>

<p>Další možné úskalí je v nestandardnosti používání expresivního CSS. Díky <a href="/vyvojarske-nastroje">vývojářským nástrojům</a> není problém rychle prototypovat web přímo v prohlížeči včetně ukládání úprav zpět do CSS.</p>

<p>Stejně tak různé další nástroje počítají především s klasickým postupem oddělování HTML a CSS.</p>


<h2 id="redesign">Redesign webu</h2>

<p>Případný redesign stránky při používání expresivních tříd se může nejprve zdát jako mnohem komplikovanější. Při obvyklém popisování elementů pomocí tříd jde teoreticky provést celou změnu vzhledu bez zásahu do HTML kódu.</p>

<p>Na druhou stranu při redesignu webu s využitím <i>Expressive CSS</i> jde redesign provést zase  <b>bez změny CSS</b> – pouze se změní HTML třídy.</p>

<p>Redesign při obvyklém používání tříd, kde se nemusí sáhnout na HTML, je navíc spíš výjimečný. Kromě toho se řada webů při potřebě redesignu stejně vytváří od nuly. Nebo se nikdy redesignovat nebude.</p>






<h2 id="kombinovani">Kombinování</h2>

<p>Relativně běžné je lehké kombinování klasického přístupu s expresivními třídami.</p>

<p>Řada projektů má různé obecné třídy pro provádění rychlých úprav, jako je zarovnávání, <a href="/float">obtékání</a>, clearování nebo nastavování šířek pro urychlení vývoje.</p>

<pre><code>.w10 { width: 10px; }
.w20 { width: 20px; }
.w30 { width: 30px; }
.w40 { width: 40px; }</code></pre>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>John Polacek: <a href="http://johnpolacek.com/content-display-patterns/">Content &amp; Display Patterns with Expressive CSS</a></li>
  <li>Codrops: <a href="http://tympanus.net/codrops/2013/01/22/defending-presentational-class-names/">Defending Presentational Class Names</a></li>
  <li><a href="https://tailwindcss.com">Tailwind CSS</a> – framework pro tvorbu UI bez psaní CSS</li>
</ul>