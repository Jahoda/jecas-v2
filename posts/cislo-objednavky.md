---
title: "Zabezpečení čísla objednávky"
headline: "Jak zabezpečit číslo objednávky v e-shopu"
description: "Jakým způsobem bezpečně sestavit číslo objednávky zboží v e-shopu."
date: "2015-08-31"
last_modification: "2015-09-10"
status: 1
tags: ["hotova-reseni", "napady", "php", "zabezpeceni"]
format: "html"
---

<p>U internetového obchodu bývá zvykem, že objednané zboží dostane nějaký identifikátor – <b>číslo objednávky</b> – podle kterého ho jde sledovat a podobně.</p>

<p>Číslo objednávky se může dostat i do URL vedoucí na přehled objednaného zboží, který zákazník dostane e-mailem:</p>

<pre><code>example.com/objednavka/<b>123</b></code></pre>




<h2 id="bezpecnost">Soukromí a bezpečnost</h2>

<p>Tvar identifikátoru sestávající z pořadového čísla jako ukázka výše trpí zásadním problémem – ruční změnou URL si jde <b>prohlížet všechny objednávky</b> obsahující citlivé údaje jako kontakty na zákazníky.</p>


<p>Nic v takovém případě nebrání, aby si kdokoliv jednoduchým skriptem <b>stáhl všechny provedené objednávky</b>.</p>


<p>Kromě využitelnosti těchto informací pro konkurenci nebo vyzrazení osobních údajů návštěvníků (jméno, e-mail, telefon, adresa apod.) hrozí i kompromitování nakupujících v případě obchodu prodávajícího choulostivý sortiment zboží.</p>

<p>I v případě, že vyzrazení není kritické, si jde nezabezpečením minimálně uříznout ostudu u veřejnosti.</p>




<h2 id="reseni">Řešení</h2>

<p>První možnost je stránku s objednávkou <b>zobrazovat až po přihlášení</b>. Tento postup může být trochu obtěžující – uživatel by se <b>musel registrovat</b> a navíc objednávka nepůjde rovnou <b>sdílet předáním odkazu</b>.</p>



<h3 id="nahodne-id">Nepredikovatelný identifikátor</h3>

<p>Pro vytvoření bezpečného odkazu pro zobrazení objednávky je potřeba <b>vygenerovat identifikátor</b>, který případný útočník <b>nedokáže předvídat</b>.</p>


<p>K tomu je nutné generovat <a href="/nahodne-cislo">náhodná čísla</a>. To jde v <a href="/php">PHP</a> jednoduše takto:</p>

<pre><code>$identifikator = md5(uniqid(mt_rand(), true));</code></pre>


<p><small>Takto získané ID nebude 100% unikátní. Funkce <code>mt_rand</code> navíc není 100% neodhadnutelná. Pro běžné použití by to ale mělo stačit. Více informací: <a href="http://stackoverflow.com/questions/1846202/php-how-to-generate-a-random-unique-alphanumeric-string/13733588#13733588">How to generate a random, unique, alphanumeric string?</a></small></p>

<p>Výsledný identifikátor bude vypadat třeba takto: <code>41fd4f4b03a249c661b2dfb174e53ea6</code></p>

<p>To je značně nepraktické například při <b>telefonním kontaktu se zákazníkem</b>, když by měl sdělovat číslo své objednávky.</p>


<h3 id="slozeny">Složený identifikátor</h3>

<p>Docela rozumné řešení je zkombinovat číslo objednávky s náhodnými daty. Například:</p>

<pre><code>pořadové číslo + náhodných 5 písmen</code></pre>


<p>Jelikož má anglická abeceda 26 znaků, zajistí těchto 5 písmen celkem skoro <b>12 milionů kombinací</b> (26<sup>5</sup>) podob adres, na kterých může být daná objednávka dostupná.</p>

<p>Vygenerovat takový řetězec půjde následovně (znaky s ASCII kódy 65 až 90 jsou velká písmena):</p>

<pre><code>&lt;?php
function nahodnyRetezec($delka = 5) {
  $id = "";
  for ($i = 1; $i &lt;= $delka; $i++) { 
    $id .= chr(mt_rand(65, 90));
  }
  return $id;
}</code></pre>









<p>Tento náhodný identifikátor se následně uloží do DB k objednávce.</p>

<p>URL objednávky tak bude například:</p>

<pre><code>example.com/objednavka/123PGHCY</code></pre>

<p>Pro rozluštění adresy objednávky <code>122</code> by potom útočník potřeboval v průměru skoro 6 milionů pokusů.</p>

<p>Při zobrazení stránky s objednávkou stačí z adresy <b>čísla a písmena oddělit</b>. To jde několika způsoby:</p>

<ol>
  <li><p>Pro čísla použít <code>intval</code> a písmena získat jako posledních 5 znaků funkcí <code>substr</code>:</p>
  <pre><code>$id = intval($adresa);
$key = substr($adresa, -5);</code></pre>
  </li>
  
  <li>
    <p>Získat číselné ID funkcí <code>intval</code> a toto číslo následně odstranit funkcí <code>str_replace</code>:</p>
    
    <pre><code>$id = intval($adresa);
$key = str_replace($id, "", $adresa);</code></pre>
    
    <p>Toto řešení není závislé na přesném počtu písmen v identifikátoru.</p>
  </li>
  
  
  <li>
    <p>Použít <b>regulární výrazy</b>:</p>
    
    <pre><code>preg_match_all('/^(\d+)(\w+)$/', $adresa, $matches);
$id = $matches[1][0];
$key = $matches[2][0];</code></pre>
  </li>
</ol>

<p>Nyní stačí vyhledat objednávku, kde se číselný i písmenový identifikátor shodují (příklad SQL dotazu při použití <a href="/pdo">PDO</a>):</p>

<pre><code>SELECT * 
FROM objednavky 
WHERE `id` = ? AND `key` = ?</code></pre>