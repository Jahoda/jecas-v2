---
title: "Identifikátor z písmen a čísel"
headline: "Identifikátor z písmen a čísel"
description: "Jak místo dlouhého číselného identifikátoru použít kratší kombinaci písmen a čísel."
date: "2014-11-21"
last_modification: "2014-11-22"
status: 1
tags: ["hotova-reseni", "napady", "php"]
format: "html"
---

<p>Pro identifikaci položek v databási se často používají <b>číselné identifikátory</b>. Je to pohodlné, protože díky volbě <i>Auto Increment</i> se o vytváření unikátních identifikátorů položek stará DB v podstatě sama.</p>

<p>Pokud se ale s číselným identifikátorem má <b>setkat člověk</b>, není to úplně ideální.</p>

<ol>
  <li><b>Význam</b> – z jakéhosi čísla není patrný konkrétní záznam, který číslo representuje.</li>
  
  <li><b>Délka</b> – při milionu záznamů bude mít identifikátor <b>7 znaků</b> (<code>1 000 000</code>)</li>
</ol>

<p>Číselné ID tedy kombinuje dvě nevýhody. Je nečitelné a dlouhé.</p>

<p>V případě, kdy máme pro <b>jednoznačné identifikování</b> k disposici čitelnější obsah, je lepší ho použít. To je třeba případ adres webový stránek, kdy se často v URL používá název stránky ochuzený o diakritiku, mezery a převedený na malá písmena.</p>

<div class="external-content">
  <ul>
    <li>PHP triky: <a href="http://php.vrana.cz/vytvoreni-pratelskeho-url.php">Vytvoření přátelského URL</a></li>
  </ul>
</div>


<h2 id="zkraceni">Zkrácení identifikátoru</h2>

<p>Pokud ale lepší identifikátor vymyslet nelze, můžeme alespoň odstranit problém s délkou. To je možné použitím alfanumerických znaků (písmen i čísel). Dělá to tak například <b>YouTube</b>, různé zkracovače adres nebo služby pro nahrávání obrázků.</p>

<p>Zatímco u čistě číselných ID může na jedné posici být pouze 10 různých znaků (<code>1</code>–<code>9</code> a <code>0</code>), při použití základních znaků abecedy <b>počet kombinací naroste</b>. Základní abeceda má <b>26 znaků</b>.</p>

<p>Na první pohled ten rozdíl nemusí vypadat významně, ale počet možných základních znaků se <b>umocňuje</b> celkovým počtem znaků identifikátoru.</p>

<p>Pro ID o 3 znacích bude platit:</p>

<ul>
  <li><b>Čísla</b> – 10 kombinací ^ 3 znaky = <b>1 000 položek</b></li>
  
  <li><b>Základní abeceda</b> – 26 kombinací ^ 3 znaky = <b>17 576 položek</b></li>
</ul>

<p>Do čtyřech znaků se potom při použití písmen vejde už skoro <b>0,5 milionu</b>, což je oproti <b>10 tisícům</b> čísel značná výhoda. Při pěti znacích už je to <b>11 milionů</b>.</p>

<p>V extrémním případě (používá například <b>YouTube</b>) můžeme identifikátor tvořit z:</p>

<ol>
  <li>čísel (10 znaků),</li>
  <li>malých písmen (26 znaků),</li>
  <li>velkých písmen (26 znaků),</li>
  <li>dalších znaků běžně používaných v URL (např. <code>-</code> a <code>_</code>)</li>
</ol>

<p>Tak se dostane na jedno místo <b>64 možností</b>. Do čtyř znaků se potom vejde přes <b>16 milionů kombinací</b> (<code>64 ^ 4</code>).</p>


<h2 id="prevod">Převod čísla na písmena</h2>

<p>Převádění písmen na číselná ID a obráceně může probíhat ihned po požadavku a v DB tak stále pracovat s klasickými čísly.</p>

<p>Dobře funkční je tato funkce <code>alphaID</code>:</p>

<p><a href="http://kvz.io/blog/2009/06/10/create-short-ids-with-php-like-youtube-or-tinyurl/" class="button">Hotové řešení</a></p>

<p>K disposici je implementace v mnoha programovacích jazycích (<b>PHP</b>, <b>JavaScript</b> a další).</p>

<h3 id="pouziti">Použití</h3>

<p>Při požadavku na <code>example.com/<b>fE2XnNGpF</b></code> se vezme řetězec <code>fE2XnNGpF</code>, předá se funkci <code>alphaID</code> s parametrem <code>true</code>.</p>

<pre><code>$idecko = alphaID('PpQXn7COf', true);</code></pre>

<p>V proměnné <code>$idecko</code> potom bude odpovídající číslo, podle kterého provedeme <b>dotaz do databáse</b> a podobně.</p>

<p>Získání zkráceného <i>kódu</i> vypadá takto (například pro <b>vygenerování odkazu</b>):</p>

<pre><code>$zkracenyKod = alphaID(9007199254740989);</code></pre>

<p>Funkce podporuje i nastavení <b>minimálního počtu znaků</b> či přidání náhodného řetězce, který ztíží možnost hádat číselné identifikátory z ID tvořených písmeny.</p>

