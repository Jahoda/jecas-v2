---
title: "Přístup k prvkům formuláře v JS"
headline: "Přístup k prvkům formuláře v JS"
description: "Jakými způsoby je možné získávat hodnoty prvků formuláře v JavaScriptu."
date: "2014-03-23"
last_modification: "2014-03-24"
status: 1
tags: ["formulare", "js"]
format: "html"
---

<p>
  V případě, že chceme nějakým způsobem pracovat s políčky formuláře (kontrolovat jejich hodnotu, zjišťovat <a href="/pocet-znaku">počet znaků</a> nebo třeba odeslat obsah <a href="/input"><code>&lt;input></code>ů</a> na server <a href="/ajax">AJAXem</a>), je hned několik různých možností, jak k políčkům nebo formuláři přistupovat.
</p>

<ol>
  <li>
    <p>
      Přidat políčkům/formuláři <a href="/id-class"><code>id</code></a> a hledat je metodou <code>getElementById</code>:
    </p>
    
    <pre><code>var policko = document.getElementById('<b>id-policka</b>')</code></pre>
    
    <p>Od <b>IE 8</b> případně využitím <a href="/queryselector"><code>querySelector</code>u</a>.</li>
  
  <li>Používat názvy formuláře a názvy položek (atributy <code>name</code>).</li>
</ol>

<h2 id="nazvy">Název formuláře a názvy polí</h2>

<pre><code>&lt;form action=".?" <b>name</b>="<i>jmenoFormulare</i>">
    &lt;input type="text" <b>name</b>="<i>jmenoPolicka</i>">
    &lt;button <b>name</b>="<i>jmenoTlacitka</i>">Tlačítko&lt;/button>
&lt;/form></code></pre>

<p>Pro tento formulář platí, že:</p>

<ol>
  <li>
    <p>K <b>formuláři</b> se dostaneme prostým uvedením jeho jména.</p>
    
    <pre><code><b>jmenoFormulare</b>.style.background = "red";</code></pre>
    
    <p>Tento kód tedy pozadí formuláře změní na červenou.</p>
  </li>
  <li>
    <p>K <b>prvkům formuláře</b>, ať se jedná o vstupní políčka nebo odesílací tlačítka, se dostaneme následovně:</p>
    
    <pre><code>var policko = jmenoFormulare.<b>jmenoPolicka</b>;
var tlacitko = jmenoFormulare.<b>jmenoTlacitka</b>;</code></pre>
  </li>
</ol>

<p><a href="https://kod.djpw.cz/omcb">Samostatná ukázka</a> nastavení barev formuláři při přístupu přes hodnoty atributů <code>name</code>.</p>

<h3 id="jiny-zpusob">Alternativní způsob</h3>

<p>Kromě psaní přímo názvů formuláře a jeho prvků existuje přístup přes <code>document.forms</code>:</p>

<pre><code>var formular = document.forms["<b>jmenoFormulare</b>"];</code></pre>

<p>Pro prvky formuláře bude tento styl zápisu vypadat následovně:</p>

<pre><code>var policko = document.forms["<i>jmenoFormulare</i>"]["<b>jmenoPolicka</b>"];
var tlacitko = document.forms["<i>jmenoFormulare</i>"]["<b>jmenoTlacitka</b>"];</code></pre>

<p>Kromě názvů se ještě dá využít <b>číselných indexů</b>:</p>

<pre><code>var prvniFormular = document.forms["<b>0</b>"];
var prvniPolickoPrvnihoFormulare = document.forms["<b>0</b>"]["<b>0</b>"];</code></pre>

<p>Číselné indexy se hodí hlavně při <a href="/js-cykly">procházení elementů cyklem</a>.</p>

<h2 id="prochazeni-cyklem">Procházení formulářů a jejich prvků cyklem</h2>

<h3 id="vsechny-formulare">Projití všemi formuláři</h3>
<pre><code>var formulare = document.forms;
for (var i = 0; i &lt; formulare.length; i++) {
  // formulare[i];
}</code></pre>

<h3 id="vsechny-prvky">Projití všemi prvky formuláře</h3>

<pre><code>var prvkyFormulare = document.forms["formular"];
for (var i = 0; i &lt; prvkyFormulare.length; i++) {
  // prvkyFormulare[i];
}</code></pre>

<h2 id="value">Získání hodnoty</h2>

<p>Většinou nás z formulářových políček zajímá hlavně <b>hodnota</b>, tj. vlastnost <code>value</code>. Lehce se na to zapomene.</p>

<pre><code>var hodnota = jmenoFormulare.jmenoPrvku.<b>value</b>;</code></pre>

<h3 id="cislo">Číslo</h3>

<p>V případě, že je potřeba s hodnotou políčka pracovat jako s číslem, je na místě obsah <code>value</code> převést. Existují různé způsoby:</p>

<ol>
  <li>Přenásobit jedničkou:
  <pre><code>var ciselnaHodnota = policko.value * 1;</code></pre></li>
  
  <li>Použít funkci <code>Number</code> nebo <code>parseInt</code>/<code>parseDouble</code> (v závislosti, zda je možné zadat celé/desetinné číslo):
  <pre><code>var ciselnaHodnota = Number(policko.value);
var ciselnaHodnota = parseInt(policko.value);</code></pre>
  </li>
</ol>

<h2 id="odeslani">Odeslání formuláře</h2>

<p>Při odeslání formuláře se zavolá událost <code>onsubmit</code>. Toho lze využít v případě, že je potřeba odesílání řídit JavaScriptem. Například <b>zkontrolovat položky</b> a v případě neúspěchu vypsat chybovou hlášku a odeslání zablokovat pomocí <code>return false</code>.</p>

<p>Pro zpracovávání formuláře skriptem je elegantní přidat do <code>onsubmit</code>u zavolání vlastní funkce a předat jí formulář jako argument.</p>

<pre><code>&lt;form action=".?" <b>onsubmit</b>="return <i>kontrola</i>(this)">
  &lt;input type="text" name="<i>jmenoPolicka</i>"></code></pre>

<p>Funkce pro kontrolu. K jednotlivým prvkům se pohodlně dostaneme.</p>

<pre><code>function <i>kontrola</i>(formular) {
  alert(formular.<i>jmenoPolicka</i>.value);
  return false;
}</code></pre>


<p><a href="https://kod.djpw.cz/ancb">Živá ukázka</a>.</p>

<h3 id="onclick">Událost <code>onclick</code></h3>

<p>Častá <i>chyba</i> je odesílání vázat <b>jen</b> na <a href="/udalosti-mysi">JS události myši</a> jako <code>onclick</code>, protože tyto události nezachytí například odeslání klávesou <kbd>Enter</kbd>.</p>