---
title: "PDO"
headline: "MySQL přes PDO"
description: "PDO je PHP rozhraní pro pohodlnější práci s SQL databásí. Jaké přináší výhody a jak ho používat."
date: "2014-02-23"
last_modification: "2016-12-14"
status: 1
tags: ["php", "php-pdo", "sql"]
format: "html"
---

<p>Dlouhá léta bylo zvykem v PHP při komunikaci používat prostou funkci <code>mysql_query</code>. Té se předal SQL dotaz a tato funkce ho zavolala. Ošetření dat – <a href="/bezpecnost#sql-injection">ošetření před SQL injection</a> bylo zcela na <b>programátorovi</b>.</p>

<p>Zpracovávání a výpis dat potom zpravidla probíhal nějak takto:</p>

<pre><code>$result = mysql_query("SELECT jmeno, prijmeni FROM uzivatele");
$row = mysql_fetch_row($result);</code></pre>




<p>Funkce <code>mysql_query</code> je označená jako <b>zastaralá</b> a od PHP 5.5 vyhazuje chybu typu <code>E_DEPRECATED</code>. Tomu se lze vyhnout buď použitím funkcí <code>mysql<b>i</b>_*</code> – po nahrazení <code>mysql_query</code> za <code>mysql<b>i</b>_query</code> a podobně by vše mělo fungovat (postup přechodu na <code>mysql<b>i</b></code> <a href="http://www.fisir.tk/itblog/mysql_">popsal pan <b>Fisir</b></a>). Nebo se dá použít právě PDO.</p>



<h2 id="pripojeni">Připojení k MySQL</h2>

<pre><code>// Připojovací údaje
define('SQL_HOST', 'localhost');
define('SQL_DBNAME', 'database');
define('SQL_USERNAME', 'root');
define('SQL_PASSWORD', '');

$dsn = 'mysql:dbname=' . SQL_DBNAME . ';host=' . SQL_HOST . '';
$user = SQL_USERNAME;
$password = SQL_PASSWORD;

try {
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}</code></pre>
















<p>Zpracovávat chyby v SQL dotazech je možné pomocí <code>try</code> – <code>catch</code>. Nastavení <code>PDO::ATTR_ERRMODE</code>, které proběhlo přidáním atributu (<code>$pdo->setAttribute</code>) zajistí, že se v případě problému vyhodí výjimka.</p>



<h2 id="dotaz">Obyčejný dotaz</h2>

<p>Nejjednodušší ekvivalent <code>mysql_query</code> je použití metody <code>query</code>. Ale není potřeba ho znát, dá se celkem obstojně vystačit s <code>prepare</code> a <code>execute</code> (popsány níže).</p>


<pre><code>$dotaz = $pdo->query("SELECT jmeno, prijmeni FROM uzivatele");</code></pre>


<p>V proměnné <code>$dotaz</code> potom bude výsledek dotazu.</p>




<h2 id="predpripraveny-dotaz">Předpřipravený dotaz (prepared statement)</h2>

<p>Asi hlavní výhoda oproti <code>mysql_*</code> funkcím jsou <b>předpřipravené dotazy</b>. Což automaticky při správném použití chrání před <b>SQL injection</b>.</p>





<h3 id="select"><code>SELECT</code></h3>

<pre><code>// Připravení dotazu
$dotaz = $pdo->prepare("SELECT jmeno, prijmeni FROM uzivatele WHERE id = <b>?</b>");
// Vykonání dotazu
$vysledek = $dotaz->execute(array($idUzivatele));</code></pre>






<p>Celé to funguje tak, že na místa, kde chceme dosadit nějaké <b>proměnné z PHP</b> napíšeme jen otazníky. Vlastní data se potom předají jako pole metodě <code>execute</code>, která dotaz daty naplní a provede.</p>

<p>Nahrazování <i>otazníků</i> daty probíhá v pořadí dat v poli, které se předává do metody <code>execute</code>.</p>

<p>Kromě otazníků je možné používat i „PDO proměnné“ s dvojtečkou na začátku. U komplikovanějších dotazů to <b>může zvýšit čitelnost</b> a přehlednost kódu.</p>

<pre><code>// Připravení dotazu
$dotaz = $pdo->prepare("SELECT jmeno, prijmeni FROM uzivatele WHERE id = <b>:idUzivatele</b>");
// Vykonání dotazu
$vysledek = $dotaz->execute(array(
  "<b>:idUzivatele</b>" => $idUzivatele
));</code></pre>










<h3 id="insert"><code>INSERT</code></h3>

<pre><code>// Připravení dotazu
$dotaz = $pdo->prepare("INSERT into uzivatele (jmeno, prijmeni) VALUES(<b>?</b>, <b>?</b>)");
// Vykonání dotazu
$vysledek = $dotaz->execute(array(
  $jmeno, 
  $prijmeni
));</code></pre>







<p>Při vkládání se často hodí <b>získat ID vloženého záznamu</b>, jde to následovně:</p>

<pre><code>$insertId = $pdo->lastInsertId();</code></pre>


<h3 id="update"><code>UPDATE</code></h3>

<pre><code>// Připravení dotazu
$dotaz = $pdo->prepare("UPDATE uzivatele SET jmeno = <b>?</b>, prijmeni = <b>?</b> WHERE id = <b>?</b>");
// Vykonání dotazu
$vysledek = $dotaz->execute(array(
  $jmeno, 
  $prijmeni,
  $idUzivatele
));</code></pre>










<h3 id="delete"><code>DELETE</code></h3>

<pre><code>// Připravení dotazu
$dotaz = $pdo->prepare("DELETE FROM uzivatele WHERE id = <b>?</b>");
// Vykonání dotazu
$vysledek = $dotaz->execute(array(
  $idUzivatele
));</code></pre>








<h2 id="prochazeni-dat">Procházení dat</h2>

<p>Když potřebná data získáme z databáse, je potřeba je nějak zpracovat a vypsat v PHP.</p>

<h3 id="fetchAll">Více řádků</h3>

<pre><code>$dotaz = $pdo->prepare("SELECT <b>jmeno</b>, <b>prijmeni</b> FROM uzivatele");
$dotaz->execute();
$uzivatele = $dotaz->fetchAll();

foreach ($uzivatele as $uzivatel) {
  echo $uzivatel["<b>jmeno</b>"] . " " . $uzivatel["<b>prijmeni</b>"];
}
</code></pre>

<h3 id="fetch">Jeden řádek</h3>

<pre><code>$dotaz = $pdo->prepare("SELECT <b>jmeno</b>, <b>prijmeni</b> FROM uzivatele WHERE id = ?");
$dotaz->execute(array($idUzivatele));
$uzivatel = $dotaz->fetch();

echo $uzivatel["<b>jmeno</b>"] . " " . $uzivatel["<b>prijmeni</b>"];</code></pre>


<h3 id="fetchColumn">Jedena položka</h3>

<pre><code>$dotaz = $pdo->prepare("SELECT 1 FROM uzivatele WHERE jmeno = ?");
$dotaz->execute(array($jmenoUzivatele));
$existujeJmeno = $dotaz->fetchColumn();

echo $existujeJmeno ? "Jméno existuje" : "Jméno neexistuje";</code></pre>

<h2 id="vicenasobny-insert">Vícenásobný <code>INSERT</code></h2>

<p>Máme-li nějaké pole s hodně daty, které se mají najednou vložit do databáse. Je možné si buď nejprve připravit SQL dotaz (<code>$pdo->prepare</code>) a v cyklu provádět <code>execute</code> s příslušnými daty, nebo si připravit dotaz plný otazníků a <b>provést ho najednou</b>.</p>

<pre><code>$pripravaDotazu = "INSERT INTO uzivatele (jmeno, prijmeni) VALUES ";
$otazniky = array_fill(0, count($poleDat), "(?, ?)");
$pripravaDotazu .= implode(",", $otazniky);

$polozky = array();
foreach ($poleDat as $polozka) {
  array_push($polozky, $polozka['jmeno']);
  array_push($polozky, $polozka['prijmeni']);
}
$dotaz = $pdo->prepare($pripravaDotazu);
$vysledek = $dotaz->execute($polozky);</code></pre>

<p>Co tento kód dělá? Nejprve připraví dotaz. Pro každou položku z <code>$poleDat</code> se připraví dva otazníky v dotazu. Potom se celé vícerozměrné pole projde a vytvoří se z něj jednoúrovňové, které se předá do metody <code>execute</code>.</p>


<h2 id="close">Ukončení spojení</h2>

<p>Spojení s DB se v PHP automaticky ukončí při doběhnutí skriptu. Zavírat spojení tak není nezbytné. Někdy se to ale hodí:</p>

<p>Pokud se s daty získanými z databáse plánují provádět složité výpočty a je jisté, že už není potřeba provádět další operace, hodí se spojení uzavřít.</p>

<p>DB server může mít omezený maximální počet spojení, jehož překročení vyústí v chybu:</p>

<pre><code>Connection failed: SQLSTATE[42000] [1226] 
User 'uzivatel' has exceeded the 'max_user_connections' resource (current value: 25)</code></pre>

<p>Řádným ukončováním spojení jde toto risiko snížit.</p>

<p>Jak na to? Nastavením <code>$pdo = null</code>, tedy přiřazením <code>null</code> do PDO objektu.</p>

<pre><code>$pdo = new PDO($dsn, $user, $password); // vytvoření spojení
// operace s DB (select, insert, update apod.)
$pdo = null; // ukončení spojení</code></pre>

<p>Za doplnění informace o ukončení SQL spojení v PDO děkuji <b>Vojtěchu Nekvapilovi</b>.</p>