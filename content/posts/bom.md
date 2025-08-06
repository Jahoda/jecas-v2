---
title: "Nastavení kódování BOMem"
headline: "Určení kódování BOMem"
description: "Co je to BOM a jak nastavuje kódování pro správné zobrazování českých znaků."
date: "2015-05-15"
last_modification: "2015-05-15"
status: 1
tags: ["napady", "php", "produktivita"]
format: "html"
---

<p>Pro správné nastavení češtiny v HTML souborech jde mimo jiné použít tzv. BOM (<i>Byte order mark</i>). Jedná se o sekvenci neviditelných znaků na začátku souboru, která se obvykle používá k označení souboru v <b>kódování UTF</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://cs.wikipedia.org/wiki/Byte_order_mark">Byte order mark</a> – technický popis BOMu na české Wikipedii</li>
  </ul>
</div>


<h2 id="jak">Jak přidat/odebrat BOM</h2>

<h3 id="sublime-text">Sublime Text</h3>

<p>V editoru <a href="/st">Sublime Text</a> je taková volba v nabídce <i>File → Save with Encoding → UTF-8 with BOM</i>.</p>
    
<p><img src="/files/bom/sublime-text-bom.png" alt="Uložení s BOMem v Sublime Text" class="border"></p>
    






<h3 id="pspad">PSPad</h3>

<p>V <b>PSPadu</b> jde nastavit <b>přidávání BOMu</b> v <i>Nastavení → Nastavení programu… → Program 2 → Ident. byty v kódování UTF-8</i>.</p>

<p><img src="/files/bom/pspad-bom.png" alt="Uložení s BOMem v PSPadu" class="border"></p>
    































<h2 id="php">Problémy BOMu v PHP</h2>

<p>Používat BOM je problematické při programování v PHP, kdy může jeho užití způsobovat <b>chybovou hlášku</b>:</p>

<blockquote><code>Warning: 
Cannot add header information - headers already sent by</code></blockquote>




<p>Případně při použití session:</p>

<blockquote><code>Warning: session_start(): 
Cannot send session cookie - headers already sent by</code></blockquote>



<p>Nebo při nastavení cookie:</p>

<blockquote><code>Warning: 
Cannot modify header information - headers already sent by</code></blockquote>



<p>Nastavují-li se v PHP nějaké HTTP hlavičky (což nastane i při využívání cookie), je tak nutné učinit <b>před vypsáním obsahu</b>. Jelikož se sekvence BOMu nachází před začátkem PHP a BOM je považován za obsah, nejde podmínku <b>hlaviček před obsahem</b> v takovém případě splnit.</p>



<p>Symbolický zápis:</p>

<pre><code><b>neviditelný BOM</b>
&lt;?php
// PHP kód nastavující hlavičky</code></pre>
   
    
    
    
    
<p>Z tohoto důvodu je nejspíš lepší <b>BOM nepoužívat</b> a kódování určit v HTML meta značkou charset:</p>

<pre><code>&lt;meta charset="utf-8"></code></pre>

<p>Nebo kódování a typ obsahu nastavit <b>HTTP hlavičkou</b> přímo v PHP:</p>

<pre><code>&lt;?php
header("Content-type: text/html; charset=utf-8");</code></pre>