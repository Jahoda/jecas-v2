---
title: "Zrychlení AJAXové aplikace o 100 ms"
headline: "Zrychlení AJAXové aplikace o 100 ms"
description: "Jak u AJAXové aplikace snadno zrychlit odezvu na kliknutí o 100 milisekund."
date: "2014-12-16"
last_modification: "2014-12-24"
status: 1
tags: ["js", "js-ajax", "zrychlovani"]
format: "html"
---

<p>Pokud stránka funguje tak, že při kliknutí na <b>odkaz/tlačítko</b> (<a href="/udalosti-mysi#oncick"><code>onclick</code></a>) zavolá <a href="/ajax">AJAXový</a> požadavek, který změní část obsahu stránky, můžeme celé odbavení jednoduše zkrátit v průměru o 100 a více milisekund.</p>

<p>Vše, co je potřeba udělat, je rozložit akci do dvou kroků.</p>

<ol>
  <li><b>stažení</b> dat,</li>
  
  <li><b>zobrazení</b> obsahu</li>
</ol>


<h2 id="kliknuti">Jak funguje kliknutí</h2>

<p>Standardní průběh kliknutí je takový, že uživatel:</p>

<ol>
  <li><b>najede</b> na tlačítko/odkaz (<code>onmouseover</code>),</li>
  
  <li><b>stiskne</b> levé tlačítko myši (<code>onmouse<b>down</b></code>),</li>
  
  <li><b>uvolní</b> tlačítko myši (<code>onmouse<b>up</b></code>)</li>
</ol>

<p>Pointa je v tom, že tyto tři kroky mohou trvat běžně kolem <b>0,5 vteřiny</b> (mezi stisknutím a uvolněním tlačítka cca <b>100 milisekund</b>). Pokud tedy obsah začneme načítat už při (1) <b>najetí myší</b> nebo (2) <b>stisknutí tlačítka</b>, může být v době (3) <b>uvolnění tlačítka</b> už připravený (stažený).</p>

<p>Samotné <b>přejetí myší</b> ale může vykonat řadu „planých poplachů“, kdy se data budou načítat zbytečně. Jde tomu pomoci menší prodlevou mezi najetím a přednačítáním.</p>

<p>Při stisknutí tlačítka je sice také možné <b>zrušit akci</b> odjetím pryč, ale počet takových případů nebude příliš vysoký.</p>

<p>Vyzkoušejte si, <b>jak dlouho vám zabere</b> kliknutí od najetí na tlačítko nebo od jeho stisknutí. Celková doba je závislá i na <b>velikosti prvku</b>.</p>

<div class="live">
<script>
var start, tlacitko;
function zacatek() {
    start = new Date().getTime();
}
function konec(el) {
    var casKonec = new Date().getTime();
    el.innerHTML = casKonec - start + " ms (od stisknutí: " + (casKonec - tlacitko) + " ms)";
}
function kliknuto() {
    tlacitko = new Date().getTime();
}
</script>
<p>Kliknutí od najetí trvalo: <button onmouseover="zacatek()" onmousedown="kliknuto()" onmouseup="konec(this)">Kliknout</button></p>  
</div>

<p>O tento čas můžeme snadno snížit <b>odezvu aplikace</b>.</p>



<h2 id="reseni">Řešení</h2>

<p>Při konkrétním použití mohou nastat dva případy.</p>

<ol>
  <li>Přednačtení se stihne <b>před dokončením akce</b> (uvolnění tlačítka).</li>
  
  <li>Načítání bude <b>pokračovat i po dokončení akce</b>.</li>
</ol>

<p>Pro konkrétní řešení si tedy uložíme dva stavy:</p>

<ol>
  <li>obsah je připraven – <code>pripravenaData</code></li>
  <li>na získaný obsah se má přejít – <code>prejit</code></li>
</ol>

<p>Při <b>stisknutí</b> tlačítka se nastaví, že nejsou data připravená a zavolá se funkce pro načtení:</p>

<pre><code>pripravenaData = false;
nacist(url);</code></pre>

<p>Funkce <code>nacist</code> začne <b>načítat obsah</b> a v případě dokončení změní proměnnou <code>pripravenaData</code>.</p>

<pre><code>pripravenaData = true;</code></pre>


<p>Při <b>uvolnění</b> tlačítka (dokončení akce) se v případě, že jsou data už načtena, <b>zobrazí obsah</b>.</p>

<pre><code>if (pripravenaData) {
  // zobrazit obsah
}</code></pre>

<p>Pokud by obsah <b>ještě načten nebyl</b>, změní se proměnná <code>prejit</code> na <code>true</code>. V takovém případě na základě kladné hodnoty <code>prejit</code> funkce <code>nacist</code> rovnou zobrazí obsah.</p>

<p>Celý postup demonstruje živá ukázka. Kde se po stisknutí tlačítka myši začne načítat obsah do přednačítacího <code>&lt;div></code>u a po dokončení akce se přesune na <b>cílové umístění</b>.</p>

<p><a href="http://kod.djpw.cz/bzib">Živá ukázka</a></p>


<h3 id="zpusob">Způsob přednačítání</h3>

<p>K úvaze je, zda si (před)načtený obsah pouze <b>uložit do proměnné</b> nebo vypsat do <b>pomocného elementu</b>. V případě vypsání do pomocného <code>&lt;div></code>u se začnou rovnou načítat i případné <b>externí objekty</b> a nový obsah se může <a href="/vykreslovani">vykreslit</a> už před dokončením akce, což také nejspíš <b>zrychlí výsledný dojem</b>.</p>


<h3 id="dotyk">Dotyková zařízení</h3>

<p>U dotykových zařízení jde místo <code>onmousedown</code> a <code>onmouseup</code> použít  jejich <a href="/udalosti-mysi#dotykove"><code>ontouch*</code> obdoby</a>.</p>


<h3 id="klavesy">Otevírání do nového okna</h3>

<p>V desktopových prohlížečích je běžné, že uživatelé otevírají odkazy do nové záložky nebo do nové záložky na pozadí klávesami <kbd>Shift</kbd>/<kbd>Ctrl</kbd> + kliknutí.</p>

<p>Případně si kliknutím <b>pravého tlačítka</b> chtějí zkopírovat adresu odkazu a podobně.</p>

<p>V takových případech je nejspíš zbytečné <b>cokoliv přednačítat</b> a při stisku jiného tlačítka než levého nebo při přidržení některých kláves proto nic nedělat.</p>

<pre><code>if (e.which > 1 || e.metaKey || e.ctrlKey) {
  return;
}</code></pre>

<div class="internal-content">
  <ul>
    <li><a href="/udalosti-mysi#onmousedown">Kódy tlačítek u <code>onmousedown</code></a></li>
    
    <li><a href="/klavesy#shift-ctrl">Klávesy <kbd>Shift</kbd>, <kbd>Ctrl</kbd> a <kbd>Alt</kbd></a></li>
  </ul>
</div>
