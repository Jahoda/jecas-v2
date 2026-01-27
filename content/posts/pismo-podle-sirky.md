---
title: "Velikost písma podle šířky"
headline: "Velikost písma podle šířky"
description: "Jak přizpůsobovat velikost písma aktuální šířce stránky."
date: "2015-10-05"
last_modification: "2015-10-05"
status: 1
tags: ["hotova-reseni", "pisma", "responsive", "typografie"]
format: "html"
---

<p>Při tvorbě <b>responsivního webu</b> může v některých případech bloků psaných <b>hodně velkým písmem</b> – třeba u <a href="/nadpisy">nadpisů</a> – dávat smysl je u menších šířek obrazovky zmenšit.</p>

<p>Jak na to?</p>


<p>Zatímco třeba výška jde stanovit <a href="/vyska-podle-sirky">procentuálně k šířce</a>, procenta u vlastnosti <code>font-size</code> fungují jinak – stanovují poměr velikosti písma ke svému rodiči.</p>


<p>Existují ale různé způsoby, jak podle šířky <b>odvozovat i velikost písma</b>:</p>




<h2 id="media">Pravidlo <code>@media</code></h2>

<p><img src="/files/pismo-podle-sirky/zmena.gif" alt="Změna velikosti podle šířky" class="border"></p>












<p>Asi nejčastější je použití <a href="/mobilni-web#media-queries" lang="en">media queries</a>. Stanoví se break-pointy, kdy se písmo zmenší:</p>

<pre><code>h1 {font-size: 320%}
@media (max-width: 60em) {
  h1 {font-size: 280%}
}
@media (max-width: 40em) {
  h1 {font-size: 250%}
}
@media (max-width: 30em) {
  h1 {font-size: 200%}
}</code></pre>










<p><a href="https://kod.djpw.cz/npqb-">Živá ukázka</a> – změna velikosti písma pomocí <code>@media</code></p>

<p>Tento postup se vyznačuje několika <b>skoky mezi velikostmi</b>. Teoreticky by šlo nějakým CSS preprocesorem vygenerovat desítky různých variant pro různé šířky, ale v případě více elementů na stránce to může být datově náročné.</p>



<h2 id="viewport">Jednotka viewport</h2>

<p>Od <b>IE 9</b> fungují jednotky závislé na šířce nebo výšce viewportu. Nefungují ve staré <b>Opeře 12</b>, mobilní <b>Opeře Mini</b> a starých <b>Android Browserech</b> do verse 4.3.</p>

<pre><code>h1 {
  font-size: 10vw;
}</code></pre>





<p>Hodnota <code>1vw</code> (<i><b>v</b>iewport <b>w</b>idth</i>) odpovídá setině šířky <i>viewportu</i>, tedy <code>10vw</code> je desetina šířky. V případě zobrazení stránky ve FullHD (1920 pixelů na šířku) bude potom výše uvedený nadpis <b>192 pixelů velký</b>.</p>



<p><a href="https://kod.djpw.cz/ppqb-">Živá ukázka</a> – viewport jednotky pro písmo</p>


<p>Jednotku <code>vw</code> se nabízí zkombinovat s <code>@media</code> pravidly, aby se velikost nedostala do nesmyslně malých/velkých hodnot.</p>

<p>Mezi šířkou <code>25</code>–<code>60em</code> se bude velikost písma řídit <b>šířkou viewportu</b>, jinak se nastaví na pevnou maximální/minimální hodnotu:</p>

<pre><code>h1 {
  font-size: 300%;
}
@media (min-width: 25em) and (max-width: 60em) {
  h1 {font-size: 6vw}
}
@media (max-width: 25em) {
  h1 {font-size: 160%}
}</code></pre>









<p><a href="https://kod.djpw.cz/upqb-">Živá ukázka</a> – omezení hranic, kdy se velikost písma přizpůsobuje šířce</p>


<h3 id="sirka-elementu">Šířka elementu, ne viewportu</h3>

<p>Problematické trochu je, když se má <code>font-size</code> počítat podle šířky <b>konkrétního elementu</b>, který neodpovídá šířce viewportu.</p>



<p>To bude typicky problematické u webu s <b>pružným layoutem a omezenou maximální šířkou stránky</b>. Zde nezbývá než opět použít <i>media-queries</i> a velikost písma závislou na šířce aplikovat jen někdy.</p>


<p>Vytvořit dobře funkční přizpůsobování s použitím jednotky <code>vw</code> tak může dát <b>dost práce s kalkulačkou</b> při stanovování hodnot.</p>


<p>Tento postup bude i složitý na případné <b>změny rozměrů bloků</b>, kdy bude nutné všechno přepočítat. Zpřehlednění může přinést funkce <a href="/calc"><code>calc</code></a>. Ta ale nefunguje v <code>@media</code> pravidlech, takže bude lepší <b>provádět výpočty</b> s použitím CSS preprocesoru.</p>

<p>Nebo použít JavaScript:</p>




<h2 id="js">Počítání velikosti JavaScriptem</h2>

<p>Pro starší prohlížeče nebo pro <b>přehlednější a pohodlnější počítání</b> poslouží JavaScript.</p>


<p>Šířka požadovaného elementu se zjistí z <code>offsetWidth</code> a potom stačí už jen určit <b>poměr šířky k velikosti písma</b> – a takovou hodnotou šířku vydělit.</p>


<pre><code>var velikost = element.offsetWidth / pomer;</code></pre>


<p>Pro omezení <b>minimální a maximální velikosti</b> jde použít <code>Math.min</code>/<code>max</code>:</p>

<pre><code>var velikostPisma = Math.max(
  20, // minimální velikost
  Math.min(
    60, // maximální velikost
    velikost
  )
);</code></pre>








<p><a href="https://kod.djpw.cz/ypqb-">Živá ukázka</a> – změna velikosti písma podle šířky v JavaScriptu</p>

<p>Největší problém JS řešení bude v tom, že do jeho vykonání bude mít písmo <b>jinou velikost</b>. To nejspíš způsobí nepěkné <b>poskočení</b> po přepočtu.</p>


<p>Existují i lehce sofistikovanější hotová řešení v JavaScriptu:</p>

<div class="external-content">
  <ul>
    <li><a href="http://simplefocus.com/flowtype/">FlowType.JS</a> – velikost písma podle šířky</li>
    <li><a href="http://fittextjs.com/">FitText</a> – jQuery plugin zajišťující přizpůsobení velikosti písma</li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Smashing Magazine: <a href="https://www.smashingmagazine.com/2016/05/fluid-typography/">Truly Fluid Typography With vh And vw Units</a></li>
</ul>