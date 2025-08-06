---
title: "Zamykání tabulek"
headline: "Zamykání MySQL tabulek"
description: "K čemu slouží, kdy a proč používat zamykání tabulek příkazem <code>LOCK TABLE</code>."
date: "2014-03-10"
last_modification: "2014-03-11"
status: 1
tags: ["php", "php-pdo", "sql"]
format: "html"
---

<p>Zatímco <a href="/pdo-transakce">používání transakcí v PDO</a> řeší problém, kdy skript selže před dokončením všech potřebných SQL dotazů. Zamykání tabulek slouží k zajištění konsistence při používání aplikace <b>více uživateli</b>.</p>

<p>Problematiku zamykání tabulek značná část tvůrců aplikací vůbec neřeší. Problém vzniklý nezamykáním se totiž <b>vyskytuje celkem vzácně</b>. O to hůře se ale může potom vzniklá neočekávaná situace řešit. Kromě toho u běžných typů webových aplikací jako je <b>redakční systém</b> nebo diskusní <b>fórum</b> nekonsistentní data zase tolik nevadí.</p>

<h2 id="problem">V čem je problém?</h2>

<p>Vznikne-li mezi <i>souvisejícími dotazy</i> vyšší časová prodleva. Může se do ní <i>dostat</i> jiný požadavek dalšího uživatele, který bude odbaven dřív, než se odbaví požadavek první. Druhý požadavek tedy tomu prvnímu <i>za běhu</i> změní data.</p>


<pre><code>// Zjištění součtu všech položek
$dotaz = $pdo->prepare('SELECT sum(kolik) suma FROM polozky');
$dotaz->execute();
$data = $dotaz->fetch();
// Update celkového počtu
$dotaz = $pdo->prepare('UPDATE soucet SET celkem = ?');
$dotaz->execute(array($data["suma"]));</code></pre>

<p>V případě, že mezi provedením <code>SELECT</code>u a <code>UPDATE</code> bude <b>prodleva</b>, do které se <i>trefí</i> jiný požadavek měnící tabulku <code>polozky</code>, celkový součet nebude souhlasit (zjišťoval se ještě před druhým požadavkem), změny provedené v prodlevě <b>se nezohlední</b>.</p>

<p>Kromě <b>zamykání tabulek</b> je problému někdy možné předejít.</p>

<ol>
  <li>
    <p>Použít vnořený dotaz:</p>
    <pre><code>UPDATE soucet SET celkem = (
  SELECT sum(kolik) FROM polozky
)</code></pre>
  </li>
  
  <li>
    <p>Součty měnit v SQL <i>inkrementálně</i>:</p>
    <pre><code>UPDATE soucet SET celkem = celkem + <b>:zmenaHodnoty</b></code></pre>
  </li>
  
  <li>
    <p>Využít <a href="http://php.vrana.cz/vyuziti-unikatnich-klicu-v-databazi.php">unikátní klíče</a> a podobně.</p>
  </li>
</ol>

<h2 id="reseni">Jak zamykat</h2>

<p>(Popsaný postup se týká MySQL, úložiště InnoDB a PHP rozhraní pro práci s SQL – <a href="/pdo">PDO</a>.)</p>

<h3 id="select-for-update"><code>SELECT … FOR UPDATE</code></h3>
<p>Nejjednodušší je v <b>případě používání transakcí</b> přidat za dotaz <code>SELECT</code> příkaz <code>FOR UPDATE</code>. To způsobí, že v mezidobí mezi příkazy <code>SELECT</code> a <code>UPDATE</code> se pokus o vložení/úpravu <b>odloží</b> až po dokončení <code>UPDATE</code>.</p>

<p>Požadavek druhého uživatele tedy bude obsloužen až po dokončení požadavku uživatele prvního.</p>

<h3 id="lock-tables"><code>LOCK TABLES</code></h3>

<pre><code>$pdo->exec('LOCK TABLES polozky WRITE');</code></pre>

<p>Tento příkaz rovněž způsobí, že při pokusu měnit data (<code>INSERT</code>, <code>UPDATE</code>) z tabulky <code>polozky</code> v případě, že už pracuje jiný požadavek, se <b>počká na jeho dokončení</b>.</p>

<p>Po vykonání skriptu je možné ještě (všechny) tabulky zpátky odemknout:</p>

<pre><code>$pdo->exec('UNLOCK TABLES');</code></pre>

<p>(Poznámka: Při používání MySQL, InnoDB úložiště a výchozím nastavení <code>autocommit = 1</code> se nic nestane, když se <code>UNLOCK TABLES</code> vynechá. Podle <a href="https://dev.mysql.com/doc/refman/5.6/en/lock-tables-and-transactions.html">dokumentace</a> má InnoDB vlastní zámek, který se odemkne při <code>commit</code>nutí nebo při <b>ukončení skriptu</b> (v případě defaultně zapnutého <code>autocommit</code> režimu).)</p>

<p>Tabulku/tabulky je možné <b>zamknout i pro čtení</b>, to dělá příkaz <code>READ</code> místo <code>WRITE</code>. Při takovém použití bude druhý požadavek čekat na dokončení prvního i v případě, že druhý požadavek chce pouze data číst.</p>

<h2 id="transakce">Zamykání a transakce</h2>

<p>Chceme-li použít <b>zamykání i transakce</b> zároveň. Doporučený postup je následující:</p>

<ol>
  <li>
    <p>Vypnout <code>autocommit</code> (je možné řešení i se zapnutým <code>autocommit</code>em, ale prý to může způsobovat <a href="http://cs.wikipedia.org/wiki/Deadlock">deadlocky</a>):</p>
    <pre><code>$pdo->setAttribute(PDO::ATTR_AUTOCOMMIT, 0);</code></pre>
  </li>
  <li>
    <p>Zamknout tabulky:</p>
    <pre><code>$pdo->query('LOCK TABLES polozky WRITE');</code></pre>
  </li>
  <li>
    <p>Provést <i>související dotazy</i>.</p>
  </li>
  <li>
    <p>Provést <code>COMMIT</code> a odemknout tabulky.</p>
    <pre><code>$pdo->query('COMMIT');
$pdo->query('UNLOCK TABLES');</code></pre>
  </li>
  <li>
    <p>Případně ještě zpátky zapnout automatické <i>commitování</i>:</p>
    <pre><code>$pdo->setAttribute(PDO::ATTR_AUTOCOMMIT, 1);</code></pre>
  </li>
</ol>

<!--
<ol>
  <li>Zamknout tabulku.</li>
  <li>Otevřít transakci.</li>
</ol>

<p>Toto pořadí je důležité. Když se prohodí, tak bude fungovat jen zamykání, ale <b>transakce už nikoliv</b>. Zamknutí tabulek totiž zároveň <i>commituje</i>, takže by se transakce ihned ukončila.</p>

<pre><code>$pdo->exec('LOCK TABLES polozky WRITE');
$pdo->beginTransaction();</code></pre>

<p>Potom provést související dotazy. A v případě úspěchu zavolat <code>commit</code>.</p>

<pre><code>$pdo->commit();</code></pre>-->

<h2 id="testovani">Testování</h2>

<h3 id="testovani-transakce">Transakce</h3>

<p>Testovat, zda transakce správně fungují jde třeba tak, že rozbijeme nějaký dotaz před <code>commit</code>em. SQL dotazy před tím rozbitým by neměly ovlivnit data v MySQL. Kromě rozbití dotazu je možné i ukončit mezi <i>souvisejícími dotazy</i> skript (funkce <code>die()</code>, vyhodit výjimku a podobně).</p>

<h3 id="testovani-zamykani">Zamykání tabulek</h3>

<p>Zkusit vytvořit více požadavků zároveň je možné použitím PHP funkce <code>sleep</code>.</p>

<pre><code>// První dotaz
if (isset($_GET["cekat"])) {
  sleep(5); // Počká se 5 vteřin
}
// Další dotaz</code></pre>

<p>Teď si daný skript stačí spustit nejprve s parametrem v URL „<code>?cekat</code>“ a následně si ho zároveň spustit bez tohoto parametru. Při správném fungování bude druhý požadavek <b>čekat na odemčení tabulek</b>, takže doběhne až po prvním požadavku.</p>

<h2 id="vnorene-dotazy">Zamykání ve vnořených dotazech</h2>

<p>Při používání vnořených dotazů je nutné <a href="http://bugs.mysql.com/bug.php?id=31080">zamknout i alias</a>.</p>