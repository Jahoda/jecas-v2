---
title: "Scope v JavaScriptu"
headline: "Scope v JavaScriptu"
description: "Co to je a k čemu slouží „scope“ při programování v JavaScriptu."
date: "2013-12-29"
last_modification: "2014-02-18"
status: 1
tags: ["js"]
format: "html"
---

<p>Česky by se <i>scope</i> dalo přeložit asi jako „rámec působnosti“. V JavaScriptu to zjednodušeně znamená <b>odkud jsou jaké proměnné viditelné</b>.</p>

<p>První tzv. <i>globální scope</i> (<code>object Window</code>) je automaticky v každém JS kódu. Vytvářením <b>funkcí</b> si můžeme snadno vytvořit další v tomto globálním.</p>

<pre><code>var promenna = "Ahoj"; // Proměnná v globálním scope
var funkce = function() {
  var druhaPromenna = "Nazdar"; // Proměnná v lokálním scope funkce
}</code></pre>

<p>Celé to funguje tak, že:</p>

<ol>
  <li>Z globálního scope se nedostaneme k proměnné <code>druhaPromenna</code>.</li>
  <li>Z lokálního scope se ale k proměnné <code>promenna</code> <i>nadřazeného</i> globálního scope <b>dostaneme</b>.</li>
  <li>Uvnitř funkce <code>funkce</code> můžeme číst nebo měnit hodnotu <code>promenna</code>.</li>
  <li>Ale mimo naší funkci bude proměnná <code>druhaPromenna</code> nedostupná.</li>
</ol>


<p>Zároveň nehrozí, že se proměnná uvnitř funkce <b>omylem přepíše stejně nazvanou proměnnou</b> z nadřazeného bloku (<i>scope</i>). To je asi hlavní výhoda a smysl.</p>

<p>Jednotlivá scope se do sebe mohou prakticky <b>libovolně zanořovat</b> — tj. vytvořit další funkci uvnitř další funkce atd. Pořád platí výše uvedená jednoduchá pravidla.</p>



<!--<p>Kromě funkcí vytvoří nové lokální scope i <a href="/js-cykly">cykly</a> (<a href="http://kod.djpw.cz/otbb">ukázka</a>).</p>-->







<h2 id="nejjednodussi">Nejjednodušší scope</h2>

<p>V některých kódech <b>hotových knihoven</b> (nebo u <b>uživatelských JS</b> pro prohlížeče) můžeme pozorovat, že jsou obaleny nějak takto:</p>

<pre><code>(function() {
  // vlastní kód
})();
</code></pre>

<p>To právě vytvoří <b>nepojmenovanou funkci</b>, která se rovnou zavolá, ale všechen kód se bude odehrávat ve <b>vlastním privátním scope</b>. Proto se na <a href="http://kod.djpw.cz/ptbb">ukázce</a> proměnná v globálním <i>rámci</i> nepřenastaví na jinou hodnotu.</p>







<h2 id="this">Klíčové slovo <code>this</code></h2>
<p>Klíčové slovo <code>this</code> se hodí jako <i>zkratka</i> k nadřazenému objektu:</p>

<pre><code>var objekt = {};
objekt.funkce = function() {
  // v <b>this</b> bude <i>objekt</i>
}
objekt.dalsiFunkce = function() {
  // zavolat předchozí funkci můžeme jako:
  // 1) objekt.funkce();
  // 2) <b>this</b>.funkce();
}
</code></pre>

<p>Často se to používá při nastavování (<code>onNěco</code>) událostí:</p>

<pre><code>document.getElementById("tlacitko").onclick = function() {
  // nějaká akce
  // element, na který bylo kliknuto je v this
}</code></pre>

<p><a href="http://kod.djpw.cz/qtbb">Ukázka</a>.</p>


<p>Pozor, pokud v této funkci vytvoříme funkci další (zanoříme další scope), v <code>this</code> bude už něco jiného.</p>

<pre><code>document.getElementById("tlacitko").onclick = function() {
  // v <b>this</b> je tlačítko
  var funkce = function() {
    // v <b>this</b> je globální scope (object Window)
  }
}</code></pre>

<p>Řešení je si <code>this</code> uložit do lokální proměnné.</p>


<pre><code>document.getElementById("tlacitko").onclick = function() {
  var tlacitko = this;
  var funkce = function() {
    // v proměnné <b>tlacitko</b> je tlačítko
  }
}</code></pre>


























<h2 id="cyklus">Číslo indexu v cyklu</h2>

<p>Často potřebujeme nějaké sadě elementů přiřadit v <a href="/js-cykly">cyklu</a> akci a zároveň v té akci pracovat s <b>indexem</b>.</p>

<pre><code>var odkazy = document.getElementsByTagName("a");
for (var i = 0; i &lt; odkazy.length; i++) {
  odkazy[i].onclick = function() {
    alert(i);
  }
}</code></pre>

<p>Uvedený kód možná trochu překvapivě u všech odkazů vypíše stejné číslo – <b>index po posledním průchodu cyklem</b>. <a href="http://kod.djpw.cz/hegb">Živá ukázka</a></p>

<p>Řešení je vytvořit další <i>scope</i>.</p>

<pre><code>for (var i = 0; i &lt; odkazy.length; i++) {
  odkazy[i].onclick = (function(cisloIndexu) {
    return function() {alert(cisloIndexu)};
  })(i)
}</code></pre>

<p><a href="http://kod.djpw.cz/jegb">Živá ukázka</a></p>