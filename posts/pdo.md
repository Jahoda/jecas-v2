---
title: "PDO"
headline: "MySQL přes PDO"
description: "PDO je PHP rozhraní pro pohodlnější práci s SQL databásí. Jaké přináší výhody a jak ho používat."
date: "2014-02-23"
last_modification: "2016-12-14"
status: 1
tags: ["PHP", "PHP a PDO", "SQL"]
---

Dlouhá léta bylo zvykem v PHP při komunikaci používat prostou funkci `mysql_query`. Té se předal SQL dotaz a tato funkce ho zavolala. Ošetření dat – [ošetření před SQL injection](/bezpecnost#sql-injection) bylo zcela na **programátorovi**.

Zpracovávání a výpis dat potom zpravidla probíhal nějak takto:

```
$result = mysql_query("SELECT jmeno, prijmeni FROM uzivatele");
$row = mysql_fetch_row($result);
```

Funkce `mysql_query` je označená jako **zastaralá** a od PHP 5.5 vyhazuje chybu typu `E_DEPRECATED`. Tomu se lze vyhnout buď použitím funkcí `mysql**i**_*` – po nahrazení `mysql_query` za `mysql**i**_query` a podobně by vše mělo fungovat (postup přechodu na `mysql**i**` [popsal pan **Fisir**](http://www.fisir.tk/itblog/mysql_)). Nebo se dá použít právě PDO.

## Připojení k MySQL

```
// Připojovací údaje
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
}
```

Zpracovávat chyby v SQL dotazech je možné pomocí `try` – `catch`. Nastavení `PDO::ATTR_ERRMODE`, které proběhlo přidáním atributu (`$pdo->setAttribute`) zajistí, že se v případě problému vyhodí výjimka.

## Obyčejný dotaz

Nejjednodušší ekvivalent `mysql_query` je použití metody `query`. Ale není potřeba ho znát, dá se celkem obstojně vystačit s `prepare` a `execute` (popsány níže).

```
$dotaz = $pdo->query("SELECT jmeno, prijmeni FROM uzivatele");
```

V proměnné `$dotaz` potom bude výsledek dotazu.

## Předpřipravený dotaz (prepared statement)

Asi hlavní výhoda oproti `mysql_*` funkcím jsou **předpřipravené dotazy**. Což automaticky při správném použití chrání před **SQL injection**.

### `SELECT`

```
// Připravení dotazu
$dotaz = $pdo->prepare("SELECT jmeno, prijmeni FROM uzivatele WHERE id = **?**");
// Vykonání dotazu
$vysledek = $dotaz->execute(array($idUzivatele));
```

Celé to funguje tak, že na místa, kde chceme dosadit nějaké **proměnné z PHP** napíšeme jen otazníky. Vlastní data se potom předají jako pole metodě `execute`, která dotaz daty naplní a provede.

Nahrazování *otazníků* daty probíhá v pořadí dat v poli, které se předává do metody `execute`.

Kromě otazníků je možné používat i „PDO proměnné“ s dvojtečkou na začátku. U komplikovanějších dotazů to **může zvýšit čitelnost** a přehlednost kódu.

```
// Připravení dotazu
$dotaz = $pdo->prepare("SELECT jmeno, prijmeni FROM uzivatele WHERE id = **:idUzivatele**");
// Vykonání dotazu
$vysledek = $dotaz->execute(array(
  "**:idUzivatele**" => $idUzivatele
));
```

### `INSERT`

```
// Připravení dotazu
$dotaz = $pdo->prepare("INSERT into uzivatele (jmeno, prijmeni) VALUES(**?**, **?**)");
// Vykonání dotazu
$vysledek = $dotaz->execute(array(
  $jmeno, 
  $prijmeni
));
```

Při vkládání se často hodí **získat ID vloženého záznamu**, jde to následovně:

```
$insertId = $pdo->lastInsertId();
```

### `UPDATE`

```
// Připravení dotazu
$dotaz = $pdo->prepare("UPDATE uzivatele SET jmeno = **?**, prijmeni = **?** WHERE id = **?**");
// Vykonání dotazu
$vysledek = $dotaz->execute(array(
  $jmeno, 
  $prijmeni,
  $idUzivatele
));
```

### `DELETE`

```
// Připravení dotazu
$dotaz = $pdo->prepare("DELETE FROM uzivatele WHERE id = **?**");
// Vykonání dotazu
$vysledek = $dotaz->execute(array(
  $idUzivatele
));
```

## Procházení dat

Když potřebná data získáme z databáse, je potřeba je nějak zpracovat a vypsat v PHP.

### Více řádků

```
$dotaz = $pdo->prepare("SELECT **jmeno**, **prijmeni** FROM uzivatele");
$dotaz->execute();
$uzivatele = $dotaz->fetchAll();

foreach ($uzivatele as $uzivatel) {
  echo $uzivatel["**jmeno**"] . " " . $uzivatel["**prijmeni**"];
}

```

### Jeden řádek

```
$dotaz = $pdo->prepare("SELECT **jmeno**, **prijmeni** FROM uzivatele WHERE id = ?");
$dotaz->execute(array($idUzivatele));
$uzivatel = $dotaz->fetch();

echo $uzivatel["**jmeno**"] . " " . $uzivatel["**prijmeni**"];
```

### Jedena položka

```
$dotaz = $pdo->prepare("SELECT 1 FROM uzivatele WHERE jmeno = ?");
$dotaz->execute(array($jmenoUzivatele));
$existujeJmeno = $dotaz->fetchColumn();

echo $existujeJmeno ? "Jméno existuje" : "Jméno neexistuje";
```

## Vícenásobný `INSERT`

Máme-li nějaké pole s hodně daty, které se mají najednou vložit do databáse. Je možné si buď nejprve připravit SQL dotaz (`$pdo->prepare`) a v cyklu provádět `execute` s příslušnými daty, nebo si připravit dotaz plný otazníků a **provést ho najednou**.

```
$pripravaDotazu = "INSERT INTO uzivatele (jmeno, prijmeni) VALUES ";
$otazniky = array_fill(0, count($poleDat), "(?, ?)");
$pripravaDotazu .= implode(",", $otazniky);

$polozky = array();
foreach ($poleDat as $polozka) {
  array_push($polozky, $polozka['jmeno']);
  array_push($polozky, $polozka['prijmeni']);
}
$dotaz = $pdo->prepare($pripravaDotazu);
$vysledek = $dotaz->execute($polozky);
```

Co tento kód dělá? Nejprve připraví dotaz. Pro každou položku z `$poleDat` se připraví dva otazníky v dotazu. Potom se celé vícerozměrné pole projde a vytvoří se z něj jednoúrovňové, které se předá do metody `execute`.

## Ukončení spojení

Spojení s DB se v PHP automaticky ukončí při doběhnutí skriptu. Zavírat spojení tak není nezbytné. Někdy se to ale hodí:

Pokud se s daty získanými z databáse plánují provádět složité výpočty a je jisté, že už není potřeba provádět další operace, hodí se spojení uzavřít.

DB server může mít omezený maximální počet spojení, jehož překročení vyústí v chybu:

```
Connection failed: SQLSTATE[42000] [1226] 
User 'uzivatel' has exceeded the 'max_user_connections' resource (current value: 25)
```

Řádným ukončováním spojení jde toto risiko snížit.

Jak na to? Nastavením `$pdo = null`, tedy přiřazením `null` do PDO objektu.

```
$pdo = new PDO($dsn, $user, $password); // vytvoření spojení
// operace s DB (select, insert, update apod.)
$pdo = null; // ukončení spojení
```

Za doplnění informace o ukončení SQL spojení v PDO děkuji **Vojtěchu Nekvapilovi**.