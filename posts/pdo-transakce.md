---
title: "Transakce v MySQL"
headline: "MySQL a transakce v PDO"
description: "K čemu slouží, jak a proč používat transakce při používání MySQL v PDO."
date: "2014-03-05"
last_modification: "2014-03-10"
status: 1
tags: ["PHP", "PHP a PDO", "SQL"]
---

[PDO](/pdo) nabízí jednoduchý způsob **řešení transakcí**. Transakce jsou dobré k tomu, aby se nestalo, že třeba ze 3 souvisejících dotazů se dva provedou a poslední skončí chybou, čímž mohou vzniknout **nekonsistentní data**.

## Příklad

Po [připojení k MySQL](/pdo#pripojeni) provedeme jednoduchý úkon. Budou existovat dvě tabulky:

  - tabulka `polozky` se sloupci `id` a `kolik`,

  - tabulka `soucet` s jedním řádkem a sloupcem `celkem`

Cílem je vložit jeden záznam s hodnotou (např. 10) a přepočítat součet:

```
// Vložení položky
$dotaz = $pdo->prepare('INSERT INTO polozky (kolik) VALUES (?)');
$dotaz->execute(array('10'));
// Přepočítání součtu
$dotaz = $pdo->prepare('UPDATE soucet SET celkem = (
  SELECT sum(kolik) FROM polozky
)');
$dotaz->execute();
```

Problém tohoto kódu spočívá v tom, že v případě, že **přepočítávací** `UPDATE` selže nebo mezi oběma dotazy **bude nějaká chyba**, vzniknou **nekonsistentní data**. Položka se vloží, ale **celkový součet se nepřepočítá**, takže nebude souhlasit.

## Použití transakcí

Transakce zajistí, že se provede **všechno**, nebo **nic**.

```
// Připojení k DB
$pdo = new PDO($dsn, $user, $password);
// Začátek transakce
$pdo->beginTransaction();
```

*Založení* transakce způsobí, že se změny neprojeví do okamžiku, než se zavolá `commit`. Výchozí chování je tzv. *auto-commit* režim, kdy se všechny úspěšné dotazy rovnou promítnou do DB.

V praxi nám tedy stačí po provedení posledního dotazu ze *skupiny souvisejících dotazů* zkontrolovat, zda proběhl v pořádku a změny potvrdit:

```
$pdo->commit();
```

Je-li transakce *otevřená* a neprovede se `commit`, změny se zahodí při ukončení běhu skriptu. *Ručně* se dá k původnímu stavu databáse dostat příkazem `rollBack`.

```
$pdo->rollBack();
```

Metody `commit` i `rollBack` opět vrátí *auto-commit* režim.

## Různé typy úložiště

Je důležité zmínit, že transakce v MySQL nefungují pod **všemi typy úložišť dat** (storage engine). Pokud např. používáte **MyISAM**, tak místo reálného vstupu do transakce dostanete jen varování a při chybě nebude rollback fungovat. Naproti tomu **úložiště InnoDB** transakce podporuje. (Děkuji za doplnění **Ondrovi Geršlovi**.)