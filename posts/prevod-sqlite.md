---
title: "Přechod na SQLite z MySQL"
headline: "Přechod na SQLite z MySQL"
description: "Jak převést data z MySQL do SQLite."
date: "2023-01-07"
last_modification: "2023-01-07"
status: 0
tags: []
---

## Konverse dat

Zkonvertovat MySQL do SQLite jde poměrně snadno.

Základem je udělat dump původní MySQL database. K tomu může posloužit klidně populární [Adminer](https://www.adminer.org/cs/) nebo phpMyAdmin.

Po získání souboru typu `dump_mysql.sql` přichází na řadu převod.

Osvědčil se mi skript [mysql2sqlite](https://github.com/dumblob/mysql2sqlite), jehož použití je následovné:

```
./mysql2sqlite dump_mysql.sql | sqlite3 mysqlite3.db
```

Selže-li pokus, možná bude potřeba nastavit práva.

```
chmod 755 mysql2sqlite
```

Výsledkem by měl být nový soubor `mysqlite3.db`.

## Používání SQLite se SvelteKitem

Pro práci s SQLite se hodí použít balíček [better-sqlite3](https://github.com/WiseLibs/better-sqlite3).

[Demo: a SvelteKit project that reads from a local SQLite database](https://github.com/kisaragi-hiu/demo-sveltekit-sqlite)

## Prohlížení dat

[DB Browser for SQLite](https://sqlitebrowser.org)

    [Hosting SQLite databases on Github Pages](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/)