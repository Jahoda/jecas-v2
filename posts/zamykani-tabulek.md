---
title: "Zamykání tabulek"
headline: "Zamykání MySQL tabulek"
description: "K čemu slouží, kdy a proč používat zamykání tabulek příkazem <code>LOCK TABLE</code>."
date: "2014-03-10"
last_modification: "2014-03-11"
status: 1
tags: ["PHP", "PHP a PDO", "SQL"]
---

Zatímco [používání transakcí v PDO](/pdo-transakce) řeší problém, kdy skript selže před dokončením všech potřebných SQL dotazů. Zamykání tabulek slouží k zajištění konsistence při používání aplikace **více uživateli**.

Problematiku zamykání tabulek značná část tvůrců aplikací vůbec neřeší. Problém vzniklý nezamykáním se totiž **vyskytuje celkem vzácně**. O to hůře se ale může potom vzniklá neočekávaná situace řešit. Kromě toho u běžných typů webových aplikací jako je **redakční systém** nebo diskusní **fórum** nekonsistentní data zase tolik nevadí.

## V čem je problém?

Vznikne-li mezi *souvisejícími dotazy* vyšší časová prodleva. Může se do ní *dostat* jiný požadavek dalšího uživatele, který bude odbaven dřív, než se odbaví požadavek první. Druhý požadavek tedy tomu prvnímu *za běhu* změní data.

```
// Zjištění součtu všech položek
$dotaz = $pdo->prepare('SELECT sum(kolik) suma FROM polozky');
$dotaz->execute();
$data = $dotaz->fetch();
// Update celkového počtu
$dotaz = $pdo->prepare('UPDATE soucet SET celkem = ?');
$dotaz->execute(array($data["suma"]));
```

V případě, že mezi provedením `SELECT`u a `UPDATE` bude **prodleva**, do které se *trefí* jiný požadavek měnící tabulku `polozky`, celkový součet nebude souhlasit (zjišťoval se ještě před druhým požadavkem), změny provedené v prodlevě **se nezohlední**.

Kromě **zamykání tabulek** je problému někdy možné předejít.

    Použít vnořený dotaz:

    ```
UPDATE soucet SET celkem = (
  SELECT sum(kolik) FROM polozky
)
```

    Součty měnit v SQL *inkrementálně*:

    ```
UPDATE soucet SET celkem = celkem + **:zmenaHodnoty**
```

    Využít [unikátní klíče](http://php.vrana.cz/vyuziti-unikatnich-klicu-v-databazi.php) a podobně.

## Jak zamykat

(Popsaný postup se týká MySQL, úložiště InnoDB a PHP rozhraní pro práci s SQL – [PDO](/pdo).)

### `SELECT … FOR UPDATE`

Nejjednodušší je v **případě používání transakcí** přidat za dotaz `SELECT` příkaz `FOR UPDATE`. To způsobí, že v mezidobí mezi příkazy `SELECT` a `UPDATE` se pokus o vložení/úpravu **odloží** až po dokončení `UPDATE`.

Požadavek druhého uživatele tedy bude obsloužen až po dokončení požadavku uživatele prvního.

### `LOCK TABLES`

```
$pdo->exec('LOCK TABLES polozky WRITE');
```

Tento příkaz rovněž způsobí, že při pokusu měnit data (`INSERT`, `UPDATE`) z tabulky `polozky` v případě, že už pracuje jiný požadavek, se **počká na jeho dokončení**.

Po vykonání skriptu je možné ještě (všechny) tabulky zpátky odemknout:

```
$pdo->exec('UNLOCK TABLES');
```

(Poznámka: Při používání MySQL, InnoDB úložiště a výchozím nastavení `autocommit = 1` se nic nestane, když se `UNLOCK TABLES` vynechá. Podle [dokumentace](https://dev.mysql.com/doc/refman/5.6/en/lock-tables-and-transactions.html) má InnoDB vlastní zámek, který se odemkne při `commit`nutí nebo při **ukončení skriptu** (v případě defaultně zapnutého `autocommit` režimu).)

Tabulku/tabulky je možné **zamknout i pro čtení**, to dělá příkaz `READ` místo `WRITE`. Při takovém použití bude druhý požadavek čekat na dokončení prvního i v případě, že druhý požadavek chce pouze data číst.

## Zamykání a transakce

Chceme-li použít **zamykání i transakce** zároveň. Doporučený postup je následující:

    Vypnout `autocommit` (je možné řešení i se zapnutým `autocommit`em, ale prý to může způsobovat [deadlocky](http://cs.wikipedia.org/wiki/Deadlock)):

    ```
$pdo->setAttribute(PDO::ATTR_AUTOCOMMIT, 0);
```

    Zamknout tabulky:

    ```
$pdo->query('LOCK TABLES polozky WRITE');
```

    Provést *související dotazy*.

    Provést `COMMIT` a odemknout tabulky.

    ```
$pdo->query('COMMIT');
$pdo->query('UNLOCK TABLES');
```

    Případně ještě zpátky zapnout automatické *commitování*:

    ```
$pdo->setAttribute(PDO::ATTR_AUTOCOMMIT, 1);
```

exec('LOCK TABLES polozky WRITE');
$pdo->beginTransaction();
```

Potom provést související dotazy. A v případě úspěchu zavolat `commit`.

```
$pdo->commit();
```

-->

## Testování

### Transakce

Testovat, zda transakce správně fungují jde třeba tak, že rozbijeme nějaký dotaz před `commit`em. SQL dotazy před tím rozbitým by neměly ovlivnit data v MySQL. Kromě rozbití dotazu je možné i ukončit mezi *souvisejícími dotazy* skript (funkce `die()`, vyhodit výjimku a podobně).

### Zamykání tabulek

Zkusit vytvořit více požadavků zároveň je možné použitím PHP funkce `sleep`.

```
// První dotaz
if (isset($_GET["cekat"])) {
  sleep(5); // Počká se 5 vteřin
}
// Další dotaz
```

Teď si daný skript stačí spustit nejprve s parametrem v URL „`?cekat`“ a následně si ho zároveň spustit bez tohoto parametru. Při správném fungování bude druhý požadavek **čekat na odemčení tabulek**, takže doběhne až po prvním požadavku.

## Zamykání ve vnořených dotazech

Při používání vnořených dotazů je nutné [zamknout i alias](http://bugs.mysql.com/bug.php?id=31080).