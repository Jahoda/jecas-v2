---
title: "Moduly v JavaScriptu"
headline: "Vytváření modulů v JavaScriptu"
description: "Jak psát složitější věci v JavaScriptu. Obalit společné funkce do „modulů“."
date: "2013-12-12"
last_modification: "2014-02-26"
status: 1
tags: ["hotova-reseni", "js", "napady"]
format: "html"
---

<p>Pro využívání JS na stránce není nutné vymýšlet nějaké třídy, dokonce ani funkce.</p>

<p>Nejjednodušší příkazy je možné psát <b>přímo do atributů událostí</b> (<code>onmouseover</code>, <code>onclick</code>, <code>onsubmit</code> a podobně).</p>

<pre><code>&lt;button onclick='alert("test")'>Tlačítko&lt;/button></code></pre>

<p>Nebo <b>přímo do stránky</b> do značky <code>&lt;script></code> (případně do externího JS):</p>

<pre><code>&lt;script>
  alert("test");
&lt;/script></code></pre>

<p>Při složitějších skriptech začne dávat smysl <b>používat funkce</b>. Kromě řešení opakujícího se kódu to má tu výhodu, že funkce vytvoří nový <i>scope</i>, což ohraničí kód funkce před „narušením z venku“ a naopak. Nestane se potom, že by si různé řádky nesouvisejících skriptů třeba <b>přepisovaly proměnné</b> (více o <a href="/scope">scope</a> v samostatném článku).</p>

<pre><code>function funkce(parametr) {
  var hlaska = "Vypisuji: " + parametr;
  alert(hlaska);
}</code></pre>

<p>Pokud by byla deklarována proměnná <code>hlaska</code> mimo funkci, nebude tato proměnná (mimo funkci) přepsána (<a href="http://kod.djpw.cz/etbb">ukázka</a>).</p>

<pre><code>var hlaska = "Ahoj";
function funkce() {
  var hlaska = "Dobrý den"; 
}
funkce();
// Vypíše "Ahoj"
alert(hlaska);</code></pre>

<p>Takto je možné stavět i rozsáhlé věci — zkrátka se připojí jeden JS soubor plný funkcí a ty se různé volají. Pro přehlednost se související funkce mohou rozdělit do zvláštních <code>*.js</code> souborů (a pro rychlejší načítání <a href="/slouceni-js-css">automaticky opět sloučit do jednoho</a>).</p>

<p>Nevýhoda tohoto postupu je v tom, že všechny nesouvisející funkce jsou v jednom <i>scope</i>. A pokud by nějaké související funkce chtěly sdílet společné proměnné, mohou opět kolidovat s funkcemi nesouvisejícími a jejich proměnnými.</p>

<h2 id="moduly">Moduly</h2>
<p>Řešením je související kód obalit do společného <i>scope</i> a utvořit tzv. <b>modul</b>.</p>

<p>Příklad jednoduchého <i>modulu</i> je následující kód pro vložení textu do HTML odstavce.</p>

<pre><code>var Modul = {
  slovo : "vypisuji",
  funkce : function(parametr) {
    document.getElementById("vypis").innerHTML += this.veta + " " + parametr + " ";
  }
}</code></pre>

<ol>
  <li>V rámci modulu existuje <i>proměnná</i> <code>slovo</code> a <i>funkce</i> <code>funkce</code>.</li>
  <li>V rámci modulu se k proměnným/funkcím dá dostat přes:    
    <ul>
      <li>Název modulu a vlastnost — <code>Modul.slovo</code></li>
      <li>Nebo využít klíčové slovo <code>this</code> — <code>this.slovo</code></li>
    </ul>
  </li>
</ol>


<p>Z kódu mimo tento modul se dostaneme ke všem <i>vlastnostem</i> (těm položkám <i>vlevo od dvojtečky</i>) pochopitelně jen přes uvedení názvu modulu.</p>

<pre><code>&lt;button onclick="Modul.funkce('parametr')">Tlačítko&lt;/button></code></pre>

<p><a href="http://kod.djpw.cz/jtbb">Živá ukázka</a></p>

<h3 id="jiny-zpusob">Jiný způsob</h3>

<p>Docílit podobného výsledku je možné i jiným postupem — obalením souvisejících funkcí do další funkce, která funkce, které se využívají <i>zvnějšku</i>, vrátí pomocí příkazu <code>return</code>.</p>

<p>Zároveň se tato obalová funkce rovnou zavolá (to ty závorky <code>()</code> za uzavírací „<code>}</code>“), aby se výše uvedené provedlo.</p>

<pre><code>var Modul = function() {
  var slovo = "vypisuji";
  var funkce = function(parametr) {
    document.getElementById("vypis").innerHTML += slovo + " " + parametr + " ";
  }
  return {funkce: funkce};
}();</code></pre>

<p>Tento kód dělá to samé, co dříve uvedený, s tím rozdílem, že se nepůjde dostat k <code>Modul.slovo</code> (ven se vrací jen funkce <code>funkce</code>).</p>

<p><a href="http://kod.djpw.cz/itbb">Živá ukázka</a>.</p>

<p>Výhoda tohoto postupu je v tom, že kvůli nutnosti <code>return</code>ovat obsah přístupný zvenčí, je ihned patrné, jak se modul používá. Proto je vhodné vracet opravdu jen to, co se dál využívá. Zároveň není možné <b>manipulovat s modulem zvenčí</b> způsobem, který nebyl zamýšlen.</p>

<p>Další výhoda je snazší <i>překlopení</i> původního kód v prostých funkcí do podoby modulů.</p>


<h2 id="zapis-funkci">Různý zápis funkcí</h2>
<p><b>Poznámka</b>: Následující zápis funkce.</p>
<pre><code>var funkce = function(parametr) {
  // něco
}</code></pre>

<p>Je v podstatě shodný s <i>původním</i> zápisem:</p>

<pre><code>function funkce(parametr) {
  // něco
}</code></pre>

<p>Pan <b>e</b> doplnil rozdíl, který mezi těmito zápisy panuje. V případě vytváření funkcí přes <code>var funkce = function(){}</code> bude tato funkce dostupná až pod jejím vytvořením. V případě, že bychom ji volali v kódu výše, bude <code>undefined</code>.</p>

<pre><code>funkce(); // undefined
var funkce = function() {
  alert("F");
}
funkce(); // alert(F)</code></pre>

<p>Druhů způsob s tímto problém nemá. <a href="http://kod.djpw.cz/pqcb">Ukázka</a>.</p>