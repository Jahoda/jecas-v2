---
title: "Transakce v MySQL"
headline: "MySQL a transakce v PDO"
description: "K čemu slouží, jak a proč používat transakce při používání MySQL v PDO."
date: "2014-03-05"
last_modification: "2014-03-10"
status: 1
tags: ["php", "php-pdo", "sql"]
format: "html"
---

<p><a href="/pdo">PDO</a> nabízí jednoduchý způsob <b>řešení transakcí</b>. Transakce jsou dobré k tomu, aby se nestalo, že třeba ze 3 souvisejících dotazů se dva provedou a poslední skončí chybou, čímž mohou vzniknout <b>nekonsistentní data</b>.</p>


<h2 id="priklad">Příklad</h2>
<p>Po <a href="/pdo#pripojeni">připojení k MySQL</a> provedeme jednoduchý úkon. Budou existovat dvě tabulky:</p>

<ol>
  <li>tabulka <code>polozky</code> se sloupci <code>id</code> a <code>kolik</code>,</li>
  <li>tabulka <code>soucet</code> s jedním řádkem a sloupcem <code>celkem</code></li>
</ol>

<p>Cílem je vložit jeden záznam s hodnotou (např. 10) a přepočítat součet:</p>

<pre><code>// Vložení položky
$dotaz = $pdo->prepare('INSERT INTO polozky (kolik) VALUES (?)');
$dotaz->execute(array('10'));
// Přepočítání součtu
$dotaz = $pdo->prepare('UPDATE soucet SET celkem = (
  SELECT sum(kolik) FROM polozky
)');
$dotaz->execute();</code></pre>

<p>Problém tohoto kódu spočívá v tom, že v případě, že <b>přepočítávací</b> <code>UPDATE</code> selže nebo mezi oběma dotazy <b>bude nějaká chyba</b>, vzniknou <b>nekonsistentní data</b>. Položka se vloží, ale <b>celkový součet se nepřepočítá</b>, takže nebude souhlasit.</p>


<h2 id="pouziti">Použití transakcí</h2>
<p>Transakce zajistí, že se provede <b>všechno</b>, nebo <b>nic</b>.</p>

<pre><code>// Připojení k DB
$pdo = new PDO($dsn, $user, $password);
// Začátek transakce
$pdo->beginTransaction();</code></pre>

<p><i>Založení</i> transakce způsobí, že se změny neprojeví do okamžiku, než se zavolá <code>commit</code>. Výchozí chování je tzv. <i>auto-commit</i> režim, kdy se všechny úspěšné dotazy rovnou promítnou do DB.</p>

<p>V praxi nám tedy stačí po provedení posledního dotazu ze <i>skupiny souvisejících dotazů</i> zkontrolovat, zda proběhl v pořádku a změny potvrdit:</p>

<pre><code>$pdo->commit();</code></pre>

<p>Je-li transakce <i>otevřená</i> a neprovede se <code>commit</code>, změny se zahodí při ukončení běhu skriptu. <i>Ručně</i> se dá k původnímu stavu databáse dostat příkazem <code>rollBack</code>.</p>

<pre><code>$pdo->rollBack();</code></pre>

<p>Metody <code>commit</code> i <code>rollBack</code> opět vrátí <i>auto-commit</i> režim.</p>

<h2 id="uloziste">Různé typy úložiště</h2>

<p>Je důležité zmínit, že transakce v MySQL nefungují pod <b>všemi typy úložišť dat</b> (storage engine). Pokud např. používáte <b>MyISAM</b>, tak místo reálného vstupu do transakce dostanete jen varování a při chybě nebude rollback fungovat. Naproti tomu <b>úložiště InnoDB</b> transakce podporuje. (Děkuji za doplnění <b>Ondrovi Geršlovi</b>.)</p>