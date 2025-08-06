---
title: "Tabulky v JavaScriptu"
headline: "Tabulky v JavaScriptu"
description: "Jak pracovat s tabulkami v JS. Popis metod <code>insertRow</code>, <code>insertCell</code>, <code>deleteRow</code> a dalších."
date: "2014-07-02"
last_modification: "2014-07-08"
status: 1
tags: ["js", "tabulky"]
format: "html"
---

<p>Při tvorbě webové aplikace se můžeme dostat do stavu, že bude třeba skriptem sestavit <b>HTML tabulku</b>, kromě běžných metod pro vytváření elementů, jako je <code>createElement</code> nebo přímé vlepení celé tabulky do <code>innerHTML</code>, existují i speciální metody přímo pro tabulky.</p>



<h2 id="insertRow">Vložení řádku <code>insertRow</code></h2>

<p>V případě, že na stránce existuje již tabulka, kterou jen zbývá naplnit daty, je vhodná metoda <code>insertRow</code>.</p>

<pre><code>var radek = tabulka.insertRow(1);</code></pre>

<p>Tento kód vytvoří řádek za prvním řádkem existující tabulky. Parametr <code>1</code> určuje, že se řádek přidá za <b>prvním původním řádkem</b>.</p>

<p>Tabulku je možné použít buď existující.</p>

<pre><code>var tabulka = document.getElementById("id-tabulky");</code></pre>

<p>Nebo pokud tabulka neexistuje, vytvořit ji následovně:</p>

<pre><code>var tabulka = document.createElement("table");</code></pre>

<h2 id="deleteRow">Odstranění řádku <code>deleteRow</code></h2>

<p>Analogicky jde řádek naopak odstranit metodou <code>deleteRow</code>:</p>

<pre><code>tabulka.deleteRow(1);</code></pre>



<h2 id="insertCell">Vložení buňky <code>insertCell</code></h2>

<p>Po vložení řádku je většinou nutné ho naplnit daty – buňkami. To zajistí metoda <code>insertCell</code>.</p>

<pre><code>var bunka = radek.insertCell(0);</code></pre>

<p>Výše uvedený kód vloží do řádku <b>první buňku</b>.</p>



<h2 id="deleteCell">Odstranění buňky <code>deleteCell</code></h2>

<p>Odstarění buňky vypadá potom takto:</p>

<pre><code>radek.deleteCell(0);</code></pre>



<h2 id="innerHTML">Vložení obsahu buňky</h2>

<p>Je-li již vytvořena tabulka, řádek i buňka, stačí ji naplniti obsahem. K tomu se většinou hodí metoda <code>innerHTML</code>.</p>

<pre><code>bunka.innerHTML = "Obsah, může obsahovat &lt;b>HTML&lt;/b>";</code></pre>




<h2 id="rowSpan-colSpan">Vlastnosti <code>rowSpan</code> a <code>colSpan</code></h2>

<p>Je-li příhodné některou z buněk roztáhnout přes více řádků či sloupců, není problém nastavit JavaScriptem HTML atributy <code>rowspan</code> či <code>colspan</code>.</p>

<p>Jen je nutné použít <i>camelCase</i>.</p>

<pre><code>bunka.colSpan = 4;</code></pre>

<p>Výše uvedený JS kód je ekvivalent HTML:</p>

<pre><code>&lt;td colspan="4"></code></pre>

<p><a href="https://kod.djpw.cz/hjeb">Živá ukázka</a> naplnění jednoduché tabulky.</p>



<h2 id="createElement">Tabulky a <code>createElement</code></h2>

<p>Vytvoření tabulky metodami <code>createElement</code> a <code>appendChild</code>.</p>

<p>U starších prohlížečů (<b>IE 7</b>) není možné vkládat řádky přímo do <code>&lt;table></code>, ale musí se použít <code>&lt;thead></code>, <code>&lt;tbody></code> nebo <code>&lt;tfoot></code>.</p>

<p><a href="https://kod.djpw.cz/gjeb">Živá ukázka</a></p>

<p>Zaměřit <code>&lt;tbody></code> značku jde kromě metody <a href="/getelement#tagname"><code>getElementsByTagName</code></a> i přes <code>tBodies</code>.</p>



<h2 id="rows-length">Počet řádků</h2>

<p>Počet řádků tabulky jde zjistit z:</p>

<pre><code>var pocetRadku = tabulka.rows.length;</code></pre>



<h2 id="kolekce">Kolekce tabulek</h2>

<p>Tabulky mají některá klíčová slova, která vracejí jednotlivé části tabulek.</p>

<dl>
  <dt id="cells"><code>cells</code></dt>
  <dd>
    <p>Vrátí kolekci všech buněk, tj. <code>&lt;td></code> i <code>&lt;th></code>.</p>
  </dd>
  
  <dt id="rows"><code>rows</code></dt>
  <dd>
    <p>Vrátí kolekci řádků (značky <code>&lt;tr></code>).</p>
  </dd>
  
  <dt id="tbodies"><code>tBodies</code></dt>
  <dd>
    <p>Vrátí kolekci <code>&lt;tbody></code> elementů.</p>
  </dd>
</dl>



<h2 id="zahlavi-zapati">Záhlaví a zápatí</h2>

<dl>
  <dt id="thead"><code>tHead</code></dt>
  <dd>
    <p>V <code>tabulka.tHead</code> je záhlaví tabulky.</p>
    
    <p>Jde vytvořit metodou <code>createTHead</code> a odstranit přes <code>deleteTHead</code>.</p>
  </dd>
  
  <dt id="tfoot"><code>tFoot</code></dt>
  <dd>
    <p>V <code>tabulka.tFoot</code> je zápatí tabulky.</p>
    
    <p>Jde vytvořit metodou <code>createTFoot</code> a odstranit přes <code>deleteTFoot</code>.</p>
  </dd>  
</dl>