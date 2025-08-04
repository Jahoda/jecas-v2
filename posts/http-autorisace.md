---
title: "HTTP autorisace v .htaccess"
headline: "HTTP autorisace v <code>.htaccess</code>"
description: "Jak souborem <code>.htaccess</code> jednoduše omezit přístup na stránku heslem."
date: "2015-08-19"
last_modification: "2015-10-10"
status: 1
tags: ["Hotová řešení", "Hesla"]
---

Je-li cílem **omezit přístup na stránku** pouze pro uživatele, kteří znají **jméno a heslo**, existuje řada způsobů:

  - Naprogramovat si přihlašování na straně serveru.

  - Vytvořit stránku na tajné URL. (Zde je velmi snadné vyzrazení.)

  - Použít autorisaci na straně serveru.

Webový server **Apache** nabízí poměrně snadný způsob, jak primitivním způsobem **stránku zaheslovat**.

Jde využít **HTTP autorisace**, která v prohlížeči vyvolá speciální formulář, takže se ani není potřeba obtěžovat s vytvářením vlastního.

## Příklad

### `.htaccess`

V souboru `.htaccess` umístěném ve složce, kam se má omezit přístup, bude následující:

```
AuthType Basic
AuthName "Název autorisace"
AuthUserFile "/cesta/k/souboru/**.htpasswd**"
Require valid-user
```

Cesta k souboru `.htpasswd` musí být **absolutní (plná)**, nikoliv relativní ([doplnil](https://twitter.com/CechVeVietnamu/status/653055278456291330) Čech ve Vietnamu).

Za zmínku stojí soubor `.htpasswd`, kde jsou uložena přihlašovací data:

### `.htpasswd`

Soubor `.htpasswd` vypadá symbolicky takto:

```
jmeno:heslo
```

Heslo je nutné hashovat. Stačí k tomu použít nějaký online nástroj:

    - [Javascript Htpasswd Generator](http://lakin.weckers.net/code/htpasswd/)

    - [htpasswd generator - password encryption](http://aspirine.org/htpasswd_en.html)

    - [Generátor hesla do .htpasswd](http://generator-hesel.station.cz/)

    - [Htpasswd Generator – Create htpasswd](http://www.htaccesstools.com/htpasswd-generator/)

## Problémy v prohlížečích

Některé prohlížeče nemají **rozhraní pro přihlášení**, takže se z nich do webů zaheslovaných pomocí `.htaccess` vůbec nejde dostat.

To je případ například [mobilního **MS Edge**](/edge-mobile). V některých případech (třeba na **iPadu**) jde autorisací projít zadáním „`jmeno:heslo@`“ před doménu.

Použití tohoto způsobu zaheslování je proto spíš **nouzové řešení**.

## Odkazy jinam

  - Apache HTTP Server: [Authentication and Authorization](http://httpd.apache.org/docs/2.2/howto/auth.html)