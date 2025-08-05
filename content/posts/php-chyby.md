---
title: "Jak vypnout/zapnout zobrazování chyb v PHP"
headline: "(Ne)zobrazování chyb v PHP"
description: "V PHP jde nastavit typy chyb, které se zobrazují. Jak to udělat správně?"
date: "2019-04-08"
last_modification: "2019-04-08"
status: 0
tags: []
format: "html"
---

<p>Pro nastavení zobrazování chyb (tzv. <i lang="en">error reporting</i>) existuje v PHP 16 předdefinovaných konstant:</p>

<ol>
  <li><code>E_ERROR</code></li>
<li><code>E_WARNING</code></li>
<li><code>E_PARSE</code></li>
<li><code>E_NOTICE</code></li>
<li><code>E_CORE_ERROR</code></li>
<li><code>E_CORE_WARNING</code></li>
<li><code>E_COMPILE_ERROR</code></li>
<li><code>E_COMPILE_WARNING</code></li>
<li><code>E_USER_ERROR</code></li>
<li><code>E_USER_WARNING</code></li>
<li><code>E_USER_NOTICE</code></li>
<li><code>E_STRICT</code></li>
<li><code>E_RECOVERABLE_ERROR</code></li>
<li><code>E_DEPRECATED</code></li>
<li><code>E_USER_DEPRECATED</code></li>
<li><code>E_ALL</code></li>
</ol>













<p>Jak ale hlášení chyb nastavit?</p>



<p>Obecně platí, že:</p>

<ul>
  <li>
    <p>Pro <b>vývoj</b> se hodí <b>co největší přísnost</b>, protože i nekritické chyby mohou signalisovat potenciální risiko v kódu. Možnou budoucí nekompatibilitu apod.</p>
  </li>
  
  <li>
    <p>Pro <b>produkci</b> naopak nezobrazovat <b>vůbec nic</b>, protože výchozí PHP hlášky jsou:</p>
    
    <ol>
      <li>ne úplně přívětivé pro uživatele,</li>
      <li>mohou zbytečně odhalovat části aplikace (např. adresářovou strukturu)</li>
    </ol>
  </li>
  
  <li>
    <p>Výjimka může být <b>starší aplikace</b>, kde by zapnutí všech chybových hlášek svým množstvím paralysovalo vývojáře.</p>
  </li>
</ul>

<h2 id="typy">Základní typy chyb</h2>

<p>Zjednodušeně lze chyby zařadit do 4 kategorií:</p>

<ul>
  <li>
    <p><b>Fatální chyby</b> – ukončí běh PHP, takže další kód po chybě se už nezpracuje. Typicky jde o <i>parse errory</i> (chybu v syntaxi – např. chybějící <code>;</code>) nebo o volání neexistujících funkcí nebo tříd.</p>
  </li>
  
  <li>
    <p><b>Varování</b> – kód pokračuje ve zpracování, ale jde o poměrně zásadní problém, který při ignorování může způsobit nepředvídané chyby aplikace. Příklad je třeba dělení nulou (<code>1/0</code>) nebo vkládání neexistujícíh souborů příkazem <code>include</code>.</p>
  </li>
  
  <li>
    <p><b>Poznámky</b> (<i lang="en">Notice</i>) – </p> 
  </li>
</ul>


<h2 id="vsechny">Zobrazení všech chyb</h2>

<pre><code>ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);</code></pre>

<h2 id="zadne">Vypnutí zobrazování chyb</h2>

<pre><code>error_reporting(0);</code></pre>

https://stackify.com/display-php-errors/