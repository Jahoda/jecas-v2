---
title: "HTML lang – cs, sk, en a další kódy jazyků"
headline: "HTML atribut <code>lang</code> – kódy cs, sk, en"
description: "Jak správně nastavit HTML atribut lang. Kódy jazyků: cs pro češtinu, sk pro slovenštinu, en pro angličtinu. Příklady použití a seznam hodnot."
date: "2014-09-21"
last_modification: "2014-09-21"
status: 1
tags: ["html", "html-atributy"]
format: "html"
---

<p>Jedná se o <b>universální atribut</b> (lze ho tedy použít na libovolné HTML značce, i když u některých to nedává smysl) a <b>určuje jazyk</b>, ve kterém je příslušný obsah.</p>

<p>Většinou bývá celá stránka jen v jednom jazyce, takže <code>lang</code> spatříme nejčastěji u značky <code>&lt;html></code>:</p>

<pre><code>&lt;html <b>lang</b>="cs">
  &lt;p>
    Celý obsah stránky je česky
  &lt;/p></code></pre>

<p>Není nic proti ničemu následně <code>lang</code> umístit do vnořené značky <code>&lt;div></code>, formuláře nebo čehokoliv jiného.</p>

<pre><code>&lt;html lang="en">
  &lt;div <b>lang</b>="cs">
    Kus obsahu v češtině.
  &lt;/div>
&lt;/html></code></pre>

<p>Funguje to potom tak, že jazyk dané oblasti vždy určuje <b>nejbližší nadřazený element</b> s <code>lang</code>.</p>

<p>Kódy jazyků by měly být ve formátu <i>ISO 639–1</i> (<a href="http://www.loc.gov/standards/iso639–2/php/English_list.php">seznam kódů</a>). Tj. například:</p>

<ul>
  <li><code>cs</code> – čeština</li>
  <li><code>sk</code> – slovenština</li>
  <li><code>en</code> – angličtina</li>
  <li><code>de</code> – němčina</li>
  <li><code>fr</code> – francouzština</li>
  <li><code>es</code> – španělština</li>
  <li><code>it</code> – italština</li>
  <li><code>ru</code> – ruština</li>
</ul>



<h2 id="vyuziti">Využití</h2>

<p>Proč se ale <b>zdržovat</b> s určením jazyka? Je určení jazyka i využitelné v <b>praxi</b>?</p>

<ol>
  <li>
    <p>Určení jazyka může pomoci <b>vyhledávači</b> nebo <b>překladači</b> (např. <a href="https://translate.google.com/">Překladač Google</a>). Oba typy nástrojů sice mají vymyšleny systémy pro <b>automatickou detekci</b>, ale v jistých případech mohou selhat.</p>
  </li>
  
  <li>
    <p><b>Kontrola pravopisu</b> je dostupná ve všech běžných prohlížečích. V případě, že má uživatel více <b>slovníků</b>, lze použitím <code>lang</code>u nastavit preferovaný jazyk pro kontrolu.</p>
    
    <p>Týká se to kontroly ve <b>formulářových polích</b> (<a href="/input"><code>&lt;input></code></a> a <a href="/textarea"><code>&lt;textarea></code></a>) nebo <a href="/uprava-stranky-designmode"><code>contenteditable</code></a>.</p>
    
    <p>Tato funkčnost dle mých testů funguje momentálně jen ve <b>Firefoxu</b>. <a href="https://kod.djpw.cz/kvfb">Pokusná stránka</a> – v podporovaném prohlížeči při dostupnosti českého i anglického slovníku díky <code>&lt;html <b>lang="en"</b>></code> podtrhá jako chyby češtinu.</p>
  </li>
  
  <li>
    <p><b>Hlasové čtečky</b> by rovněž mohly volbu jazyka provést na základě atributu <code>lang</code>.</p>
  </li>
  
  <li>
    <p>Z pohledu CSS použití <code>lang</code>u nabídne selektor <a href="/css-selektory#lang"><code>:lang()</code></a> (funkční od <b>IE 8</b>).</p>
    
    <p>U <b>vícejazyčného webu</b> se hodí mít dostupnou informaci o jazyku dostupnou z CSS/JavaScriptu. Atribut <code>lang</code> je nejspíš elegantnější řešení než <a href="/id-class">třídy nebo ID</a>.</p>
  </li>
  
  <li>
    <p>CSS vlastnost <a href="/hyphens"><code>hyphens</code></a> (= dělení slov na konci řádku spojovníkem) může na základě informace o jazyku fungovat korektně podle pravidel daného jazyka.</p>
  </li>
  
</ol>

<p>Nakonec se nabízí využití pro <b>změnu klávesnice</b> na základě jazyka například u mobilních zařízení, aby lépe vyhovovala danému jazyku (diakritika), ale s tím jsem se zatím nesetkal.</p>



<h2 id="doporuceni">Doporučení</h2>

<p>Doporučuji tedy atribut <code>lang</code> <b>správně</b> používat. To <i>správně</i> je dost důležité, protože chybné použití – nastavení jiného <code>lang</code>u, než je jazyk stránky – nadělá více škody než užitku.</p>

<p>To se může hravě stát při <b>okopírování</b> cizí HTML kostry z anglického prostředí pro použití na české stránce.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>W3C: <a href="http://www.w3.org/International/questions/qa-lang-why.en">Why use the language attribute?</a></li>
  
  <li>W3C: <a href="http://www.w3.org/International/questions/qa-html-language-declarations">Declaring language in HTML</a></li>
</ul>