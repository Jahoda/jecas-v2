---
title: "JSON"
headline: "JSON"
description: "JSON je universální formát pro ukládání dat. Jak ho používat?"
date: "2014-05-20"
last_modification: "2016-01-06"
status: 1
tags: ["js", "php"]
format: "html"
---

<p>Zkratka <b>JSON</b> znamená <i lang="en">JavaScript Object Notation</i> – česky by se dala přeložit třeba jako <i>styl zápisu JavaScriptového objektu</i>. Z toho plyne, že má něco společného s JS, ale v dnešní době se používá jako universální strojově čitelný formát pro výměnu dat.</p>

<p>Hlavní výhoda JSONu je v jeho snadném zpracovávání.</p>




<h2 id="js">Zápis objektu v JS</h2>

<p>Příklad zápisu objektu přiřazeného do proměnné v JavaScriptu může vypadat následovně. Objekt je ve složených závorkách a jednotlivé dvojice „klíč : hodnota“ se oddělují čárkou:</p>

<pre><code>var objekt = {
  "klic" : "hodnota",
  "jinyNazev" : "další hodnota"
}</code></pre>







<p>Z vlastnosti <code>klic</code> výše uvedeného objektu jde získat nastavenou hodnotu jako:</p>

<pre><code>alert(objekt.klic); // hodnota</code></pre>


<p>Získávat hodnoty z JSON objektu je tedy velmi pohodlné.</p>




<h3 id="zanorovani">Zanořování dat</h3>

<p>V praxi jsou soubory ve JSONu mnohem složitější. Do klíče jde kromě hodnoty přiřadit další pole:</p>

<pre><code>var objekt = {
  "klic" : {
    "zanorenyKlic" : "hodnota",
    "jinyZanorenyNazev" : "další hodnota"
  }
}</code></pre>






<p>Hodnota v tomto případě půjde získat jako <code>objekt.klic.zanorenyKlic</code>.</p>



<h3 id="vice-polozek">Více položek</h3>

<p>Přísluší-li k jednomu klíči více položek, používají se hranaté závorky <code>[]</code>.</p>

<pre><code>var objekt = <b>[</b>
  {
    "klic" : "hodnota",
    "jinyNazev" : "další hodnota"
  },
  {
    "klic" : "hodnota 2",
    "jinyNazev" : "další hodnota 2"
  }  
<b>]</b></code></pre>











<p>Data z objektu se v tomto případě dostanou pomocí číselného indexu:</p>

<pre><code>alert(objekt<b>[0]</b>.klic); // hodnota</code></pre>




<h3 id="bez-klice">Hodnoty bez klíče</h3>

<p>Existuje-li více položek, které nepotřebují klíč, použijí se hranaté závorky:</p>

<pre><code>var objekt = {
  "klic" : [
      "hodnota",
      "další"
  ],
  "jinyKlic" : "další hodnota"
};</code></pre>







<p>Získat hodnoty půjde opět pomocí číselného indexu:</p>

<pre><code>alert(objekt.klic<b>[0]</b>); // hodnota</code></pre>



<h3 id="parse">Parsování JSONu</h3>

<p>Při získání dat ve formátu JSON pomocí <a href="/ajax">AJAXu</a> je potřeba převést tento textový obsah do JS objektu.</p>

<p>V případě úspěšně získaných dat přes AJAX se potom <i>callback</i> funkci předají data převedená na objekt pomocí <code>JSON.parse</code>:</p>

<pre><code>callbackFunkce(JSON.parse(xhr.responseText));</code></pre>

<p>Pro <b>IE 7</b> a starší se převod prováděl funkcí <code>eval</code>:</p>

<pre><code>callbackFunkce(eval('(' + xhr.responseText + ')'));</code></pre>


<p>Opakem <code>JSON.parse</code> je <code>JSON.stringify</code> – zajistí převod JS proměnné/objektu na textový řetězec.</p>





<h2 id="data">Data v JSONu</h2>

<p>JSON je v dnešní době asi nejrozšířenějším způsobem získávání dat napříč servery.</p>

<p>Kromě toho jde používat jako úložiště dat. Některé programy ho používají pro konfigurační soubory.</p>



<p>Soubor ve formátu JSON vypadá nějak takto:</p>

<pre><code>{
  "klic" : "hodnota",
  "jinyNazev" : "další hodnota"
}</code></pre>





<p>Pro <a href="/ziskavani-obsahu">získání obsahu</a> z cizích stránek se hodí hledat, jestli neexistuje v JSONu – zpracování je potom mnohem jednodušší než parsování HTML kódu.</p>




<h2 id="json-js">JSON vs. JS objekt</h2>

<p>Objekt v JavaScriptu vypadá podobně jako JSON, ale existují mezi nimi <b>rozdíly v syntaxi</b>. Obecně platí, že JSON jde použít jako JS objekt, ale už nemusí platit, že objekt z JavaScriptu bude validní JSON.</p>


<h3 id="uvozovky">Uvozovky</h3>

<p>Většina hodnot uvnitř JSON objektu, má-li být JSON validní, musí být v <b>dvojitých <a href="/uvozovky">uvozovkách</a></b>.</p>

<p>Výjimkou jsou hodnoty v podobě čísel, <code>true</code>, <code>false</code> a <code>null</code>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://jsonlint.com/">JSONLint</a> – validátor a formátovač JSONu</li>
  </ul>
</div>

<p>V JavaScriptovém objektu jde klíče uvádět s jednoduchými uvozovkami nebo dokonce bez nich.</p>

<pre><code>var objekt = {
  klic : "hodnota",
  'jinyKlic' : "jiná hodnota"
}</code></pre>





<h3 id="funkce">Funkce</h3>

<p>JS objekt dále může na rozdíl od JSONu kromě řetězce, čísla, <code>true</code>, <code>false</code> a <code>null</code> obsahovat i funkci:</p>

<pre><code>var objekt = {
  klic : function(parametr) {
    alert(parametr);
  }
}</code></pre>






<p>Použití:</p>

<pre><code>objekt.klic("hodnota"); // hodnota</code></pre>




<h2 id="php">JSON v PHP</h2>

<p>Jazyk PHP má pro práci se JSONem dvě funkce:</p>

<ul>
  <li><code>json_encode($pole)</code> – převede PHP pole do JSONu</li>
  <li><code>json_decode($text)</code> – převede textová data z JSONu do PHP objektu</li>
  <li><code>json_decode($text, true)</code> – převede textová data z JSONu do PHP <b>pole</b></li> 
</ul>




<p>Kromě PHP objektu jde používat i pouze obyčejné pole – toho se dosáhne druhým parametrem nastaveným na <code>true</code> ↑.</p>


<h3 id="php-decode">Zpracování JSONu v PHP</h3>

<p>Získání hodnoty z JSONu může vypadat následovně:</p>

<pre><code>&lt;?php
$json = '{
  "klic" : "hodnota",
  "jinyNazev" : "další hodnota"
}';
$objekt = json_decode($json);
echo $objekt->klic; // hodnota</code></pre>









<h2 id="jsonp">JSONP</h2>

<p>JSONP je „JSON s vycpávkou“ (písmeno P značí <i>padding</i>). Používá se v situacích, kdy je potřeba získat JavaScriptem data z cizí domény.</p>



<p><a href="/ajax">AJAX</a> je typicky omezen pouze na totožnou doménu, takže by se získat JSON z cizí stránky nezdařilo. JSONP to obchází tak, že jsou požadovaná data obalena do volání JS funkce a cizí URL s tímto obsahem se připojí jako běžný externí skript.</p>


<p>Připojit externí skript jde v JS následujícím způsobem. Obvykle se u JSONP může parametrem <code>callback</code> nastavit název vlastní funkce:</p>

<pre><code>var s = document.createElement("script");
s.src = "http://example.com/data.json?callback=<b>vlastniFunkce</b>";
document.head.appendChild( s );</code></pre>






<p>Příklad JSONP souboru:</p>

<pre><code>vlastniFunkce({
  "klic" : "hodnota",
  "jinyNazev" : "další hodnota"
});</code></pre>





<p>Po stažení obsahu se zavolá funkce <code>vlastniFunkce</code> a jako parametr dostane data. Vlastní funkce už je deklarována na stránce, která se snaží získat obsah:</p>

<pre><code>function vlastniFunkce(data) {
  alert(data.klic); // hodnota
}</code></pre>






<h3 id="bezpecnost">Bezpečnost JSONP</h3>

<p>Vzhledem k tomu, že se do stránky připojuje cizí skript, je používání JSONP risikové. Autor stránky, která poskytuje data ve formátu JSONP, může získat značnou kontrolu nad stránkou, která si tento skript připojuje.</p>

<blockquote>
  <p>Cizí JavaScript může prakticky libovolně manipulovat se obsahem stránky.</p>
</blockquote>



<p>Používat JSONP je tak dobré jen z prověřených zdrojů. Ani to nezajišťuje 100% bezpečí, protože původně prověřený JSONP může být časem napaden útočníkem.</p>




<h2 id="api">JSON API</h2>

<p>JSON se často používá u <a href="/spa">Single page aplikací</a>. Taková aplikace sestává z jediné HTML stránky a všechna data ze serveru se získávají v JSON formátu a o jejich zobrazení se stará JavaScript.</p>

<p>Server nabízející obsah v JSONu se tedy vůbec nestará o presentační podobu, ale pouze <i>tupě</i> vrací data ke zpracování.</p>

<p>Používat JSON API se v jistých případech hodí i u serverových aplikací. Část zobrazující data může být v takovém případě nezávislá na části data připravující.</p>





<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://www.json.org/json-cz.html">JSON.org</a> – Úvod do JSON</li>
  <li><a href="http://thenewcode.com/339/JavaScript-Fundamentals-JSON-Explained">JavaScript Fundamentals: JSON Explained</a></li>
  <li><a href="http://davidwalsh.name/unwrapping-jsonp">Unwrapping JSON-P</a></li>
</ul>
