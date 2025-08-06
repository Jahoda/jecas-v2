---
title: "CSS counter"
headline: "CSS <code>counter</code>"
description: "Automatické číslování v CSS za pomocí <code>counter-increment</code>, <code>counter-reset</code> a <code>counter</code>."
date: "2014-04-12"
last_modification: "2014-04-12"
status: 1
tags: ["css", "css-funkce", "css-vlastnosti"]
format: "html"
---

<p>Když do stránky umístíme číslovaný seznam <code>&lt;ol></code>, budou mít jednotlivé položky <code>&lt;li></code> <b>automatické číslování</b>. Není do kódu nutné čísla ručně psát, ale zajistí je prohlížeč.</p>

<div class="live">
  <ol>
    <li>První</li>
    <li>Druhý</li>
    <li>Třetí</li>
  </ol>
</div>

<p>Atributem <code>start</code> pro <code>&lt;ol></code> je navíc možné nastavit počáteční číslo, které se bude <i>inkrementovat</i> (zvyšovat).</p>

<div class="live">
  <ol start="4">
    <li>Čtvrtý</li>
    <li>Pátý</li>
  </ol>
</div>

<p>To jsou zhruba všechny možnosti, které nabízí přímo HTML. Na všechno ostatní je tu <code>counter</code> v CSS.</p>

<h2 id="prohlizece">Funkčnost v prohlížečích</h2>

<p>Funguje v <b>IE 8</b> a novějších.</p>

<h2 id="pouziti">Použití</h2>

<p>Nasimulování číslování v běžném <code>&lt;ol></code> by vypadalo následovně (<a href="https://kod.djpw.cz/rrcb">ukázka</a>):</p>

<pre><code>ol {
  counter-reset: <b>seznam</b>;
}
li:before {
  counter-increment: <b>seznam</b>;
  content: counter(<b>seznam</b>) ". ";
}</code></pre>

<p>Funkčnost je následující:</p>

<dl>
  <dt id="reset"><code>counter-reset</code></dt>
  <dd>
    <p>Vyresetuje <i>počítadlo</i> s názvem <code>seznam</code> na číslo <code>0</code>. Jednotlivé čítače lze do sebe libovolně <b>zanořovat</b> a vytvářet i více úrovní.</p>
    
    <p>Ve většině prohlížečů (kromě staré <b>Opery 12</b>) je nutné <code>counter-reset</code> použít, jinak nebude počítadlo fungovat.</p>
  </dd>
  
  <dt id="increment"><code>counter-increment</code></dt>
  <dd>
    <p>Zvýší nebo sníží pořadové číslo čítače <code>seznam</code>. Výchozí chování je <b>zvýšit o jedničku</b>.</p>
    
    <p>Naopak <b>odečítání</b> nebo vyšší krok lze nastavit číslem za názvem čítače.</p>
    
    <pre><code>element:before {
  counter-increment: seznam <b>+2</b> druhySeznam <b>-4;</b>
  content: counter(seznam) "." counter(druhySeznam)
}</code></pre>
    
    <p>Výše uvedený kód tedy zvýší čítač <code>seznam</code> o <code>2</code> a čítač <code>druhySeznam</code> sníží o <code>4</code>. Ano, dá se <b>zvyšovat více čítačů naráz</b>. Že tento (nejspíš absurdní) příklad funguje dokládá <a href="https://kod.djpw.cz/srcb">živá ukázka</a>.</p>
  </dd>
  
  <dt id="counter"><code>counter</code></dt>
  <dd>Funkce <code>counter</code> potom slouží k přečtení hodnoty čítače. Tato hodnota se jako obsah <code>:before</code>/<code>:after</code> pseudo-elementu nastaví přes CSS vlastnost <a href="/content"><code>content</code></a>.</dd>
  </dl>

<h2 id="kapitoly">Číslování kapitol</h2>

<p>Zajímavější příklad <code>counter</code>u je například číslování nadpisů. <a href="https://kod.djpw.cz/wucb">Ukázka</a>.</p>

<h2 id="styl">Styl číslování</h2>

<p>Jako druhý parametr <i>funkce</i> <code>counter</code> se dá předat podoba čísla/symbolu číslování. Možné hodnoty jsou stejné jako u <code>list-style-type</code>. Pochopitelně v případě použití <b>nečíselných stylů</b> se čítače nijak neprojeví. Tedy visuálně. V pozadí se čítač navýší, i když by byl skryt hodnotou <code>none</code>.</p>

<pre><code>element:before {
  counter-increment: citac;
  content: counter(citac, <b>upper-roman</b>);
}</code></pre>

<p>Tento čítač bude používat <b>římské číslice</b>. Ty mohou být velká (<code>upper-roman</code>) nebo malá (<code>lower-roman</code>). Stejně tak jde použít <i>číslování</i> písmeny (<code>upper-alpha</code> a <code>lower-alpha</code>).</p>

<p>Upravená <a href="https://kod.djpw.cz/vucb">živá ukázka</a> to hezky ilustruje.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://www.w3.org/TR/css3-content/#counters">Specifikace čítačů na W3C</a></li>
  <li><a href="http://www.jakpsatweb.cz/css/list-style-type.html">Hodnoty <code>list-style-type</code> na JPW</a></li>
</ul>