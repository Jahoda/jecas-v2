---
title: "Sublime Text FTP"
headline: "FTP v Sublime Text"
description: "Jak se připojovat k FTP v editoru Sublime Text."
date: "2014-05-08"
last_modification: "2014-05-09"
status: 1
tags: ["Produktivita", "Sublime Text", "FTP"]
---

V případě, že chceme používat FTP v [Sublime Textu](/sublime-text), tj.:

  - Nahrávat soubory **přímo z editoru** na server.

  - Synchronisovat soubory mezi serverem a localhostem.

  - Upravovat soubory přímo na serveru.

… existuje pro **ST** plugin **SFTP**.

Pro [nainstalování puginu](/pluginy-sublime-text) je potřebný *Package Control*. Potom si v `Preferences → Package Control → Package Control: Install Package` stačí vyhledat `SFTP` a nainstalovat.

Plugin SFTP není podobně jako Sublime Text zdarma, občas se objeví hláška, že by se měl zakoupit, leč obé je možné *prodlužovat do nekonečna.*

## Nastavení

Když je plugin nainstalován, první je nutné *namapovat* složku pro SFTP. Pravý klik na složku → SFTP/FTP → Map to Remote…

Nyní by se měl otevřít konfigurační soubor `sftp-config.json`. V něm stačí v podstatě zadat jen `host` (adresa serveru), `user` (uživatelské jméno) a popř. `password` (heslo). Heslo se **vyplňovat nemusí**, ale bude se v takovém případě muset zadávat při každém připojení.

Zajímavá je i část `ignore_regexes`, kde se dá vyčlenit některé soubory nebo složky ze synchronisace.

## Synchronisace

Nyní je všechno nastaveno a stačí sesynchronisovat lokální složku s FTP. Pravý klik na složku → SFTP/FTP → Sync Local -> Remote…

Funkce *Sync* se od běžného *Upload* nebo *Download* liší tím, že před zahájením přenosu souborů se zjistí, které **soubory se změnily**. Nepřenáší se tedy tupě všechno, ale jen to, co je potřeba.

Plugin **SFTP** má sice i funkci *Browse Remote…* ovšem procházení FTP přes dialogové okno není úplně moc pohodlné.