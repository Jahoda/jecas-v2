---
title: "Jade"
headline: "Jade"
description: "Jade je šablonovací systém převáděný do HTML."
date: "2016-02-19"
last_modification: "2016-05-13"
status: 1
tags: ["html", "produktivita"]
format: "html"
---

<p>U komplikovanějších (ale i jednoduchých) webů a aplikací si jde usnadnit práci používáním šablonovacího systému. Šablony Jade kromě základních věcí, jako jsou proměnné, podmínky nebo cykly, nabízí i alternativní zápis HTML.</p>

<p>Jade vznikl původně pro Node.js, ale existují i implementace v PHP.</p>

<div class="external-content">
  <ul>
    <li><a href="http://jade-lang.com/">Jade</a> (oficiální web)</li>
    <li><a href="https://github.com/everzet/jade.php">jade.php</a> (Jade v PHP)</li>
  </ul>
</div>



<h2 id="zapis">Zápis</h2>

<p>Asi nejzajímavější je alternativní psaní HTML elementů a atributů:</p>

<pre><code>div.clanek
  p Text v odstavci a 
    a(href="/clanek") odkaz
    |  na článek.</code></pre>






<p>Tento kód vytvoří následující HTML:</p>

<pre><code>&lt;div class="clanek">
  &lt;p>Text v odstavci a &lt;a href="/clanek">odkaz&lt;/a> na článek.&lt;/p>
&lt;/div></code></pre>





<p>Z ukázky plyne několik zákonitostí:</p>

<ol>
  <li>
    <p>Nepoužívají se ostré závorky běžné v &lt;HTML>, ale samotné názvy značek.</p>
  </li>
  <li>
    <p>Koncové značky se vynechávají všude – zanoření se vytváří odsazením.</p>
  </li>
  <li>
    <p>Třídy a identifikátory jdou zapsat rovnou k elementu <code>div.trida</code>, <code>span#idecko</code>.</p>
  </li>
  <li>
    <p>Ostatní atributy se zapisují do závorek:</p>
    <pre><code>element(atribut="hodnota")</code></pre>
    <p>Více atributů se odděluje čárkou:</p>
    <pre><code>element(atribut="hodnota", druhyAtribut="hodnota")</code></pre>
  </li>
  
  
  
  <li>
    <p>Každý text na začátku řádku se chápe jako název elementu. Toto chování je někdy nežádoucí. Připojit text přímo do elementu jde pomocí roury <code>|</code> (na <a href="/ceska-klavesnice">české klávesnice</a> zkratka <kbd>Pravý Alt</kbd> + <kbd>W</kbd>).</p>
    
    <p>Pokud element obsahuje pouze text, jde použít tečka:</p>
    
    <pre><code>p<b>.</b>
  Odstavec zapsaný v kódu
  na
  více řádků</code></pre>
    
    <p>Výsledek bude:</p>
    
    <pre><code>&lt;p>
  Odstavec zapsaný v kódu
  na
  více řádků
&lt;/p></code></pre>
  </li>
</ol>









<p>Na první pohled tedy <b>Jade</b> nabízí úspornější psaní HTML. Je otázka, jestli je to taková výhoda. Při používání <a href="/emmet">Emmetu</a> jde totéž jako v Jade napsat následovně:</p>

<pre><code>.clanek>p({Text v odstavci a }+a[href="/clanek"]{odkaz}+{ na článek.})</code></pre>

<p>A rozbalit klávesou <kbd>Tab</kbd>.</p>

<p>Výhodný ale může být oproti HTML úspornější obsah ve zdrojovém souboru.</p>




































<h2 id="programovani">Programování</h2>

<p>Šikovná vlastnost Jade je možnost generovat HTML kód na základě skriptu. V HTML šablonách se čas od času některé části opakují a Jade umožňuje dodržet zásadu DRY (<i lang="en">Don't repeat yourself</i>) takřka 100%.</p>

<h3 id="promenne">Proměnné</h3>

<p>Pro opakující se texty jde použít proměnné.</p>

<pre><code>- var promenna = "Fytopuf";
div
  p Obsah proměnné se vypíše přes #{promenna}.</code></pre>



<h3 id="cykly">Cykly</h3>

<p>Data je možné případně i vypisovat cyklem.</p>


<p>Používá se k tom konstrukce <code>for</code>. Obsah v cyklu se vypíše pomocí <code>=</code>.</p>

<pre><code>- var jmena = ["Franta", "Pepa", "Jednička"];
for jmeno in jmena
    div= jmeno
</code></pre>


<h3 id="mixiny">Mixiny</h3>

<p>Jde vytvářet i mixiny. Třeba pro universální vkládání obrázků by mohlo existovat něco jako:</p>

<pre><code>mixin obrazek(url, popis)
  img(src="#{url}" alt="#{popis}")</code></pre>



<p>Použití by bylo následovné:</p>

<pre><code>+obrazek("obrazek.png", "Popisek obrázku")</code></pre>

<h2 id="odkazy">Odkazy</h2>
<ul>
  <li>Sitepoint: <a href="http://www.sitepoint.com/jade-tutorial-for-beginners/">A Jade Tutorial for Beginners</a></li>
  <li>Sitepoint: <a href="http://www.sitepoint.com/introduction-jadephp/">Introduction to JadePHP</a></li>
</ul>