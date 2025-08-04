---
title: "Zjištění FTP hesla v Total Commanderu"
headline: "Zjištění FTP hesla v Total Commanderu"
description: "Jak zjistit z Total Commanderu uložená hesla k FTP."
date: "2015-08-23"
last_modification: "2018-05-31"
status: 1
tags: ["Produktivita", "FTP", "Hesla"]
---

[Total Commander](http://www.ghisler.com/) je populární správce souborů. Mimo toho ho řada lidí používá pro **přístup k FTP**.

Přestože existují pohodlnější způsoby, jak **obsah nahrávat na server** (tzv. *deployment*) – třeba [SFTP plugin](/st-ftp) pro [Sublime Text](/st) – značná část lidí používá právě **TC**.

V minulosti Total Commander čelil řadě napadení, kdy zavirovaný počítač **uložená hesla k FTP** vyzradil útočníkům, kteří následně přidaly do stránek **škodlivý kód**.

Při používání **Total Commanderu** s uloženými hesly k FTP je tedy možné **zpětně zjistit** původní textovou podobu všech použitých hesel.

## Soubor s přístupy

Soubor s přístupy se jmenuje `wcx_ftp.ini` a je k nalezení ve složce:

```
C:\Users\**Uživatel**\AppData\Roaming\GHISLER
```

V něm jsou potom jednotlivé uložené FTP přístupy:

```
[example.com]
host=example.com
username=example
**password**=417AB8F35BF1FC25A75B02FF4E
```

Pokud je heslo k FTP účtu uložené, zobrazí se zašifrované za `password=`.

## Dešifrování hesla

Pro zjištění hesla existují následující programy:

### DecrypTC

Funguje v případě, že se v TC **nepoužívá master heslo**.

    - [DecrypTC 1.2](https://totalcmd.net/plugring/ftp_decrypt.html)

Stačí zkopírovat zašifrované heslo z `wcx_ftp.ini` a zvolit *Decrypt Password*.

### Tccrypt

Rozluští hesla při používání hlavního (master) hesla v Total Commanderu.

    - [Tccrypt: Tool to decrypt TC 7.5 passwords (with master pass)](http://www.ghisler.ch/board/viewtopic.php?t=22729)

## Rychlá a jednoduchá ochrana

Pro **snížení šance**, že někdo hesla z Total Commanderu zjistí, dešifruje a dostane se tak k FTP účtu, jde použít následující postup, který příliš nesníží komfort plynoucí z ukládání hesel:

Záměrně se do TC uloží heslo v **chybné podobě**, která půjde snadno a rychle upravit.

Bude-li heslo `lepsifytopuf`, uloží se místo toho třeba heslo `nejlepsifytopuf` – pro opravení potom stačí jen smazat první tři písmena. Postupy úprav jdou samozřejmě vymyslet různé. Hromadnému **napadení FTP účtů** by měla i tato drobná změna zabránit.