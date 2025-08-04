---
title: "Přesun CMS Joomla!"
headline: "Přestěhování systému Joomla!"
description: "Jak zkopírovat web běžící na redakčním sytému Joomla! na jiný server."
date: "2015-01-27"
last_modification: "2015-01-31"
status: 1
tags: ["Rady a nápady", "Redakční systémy"]
---

## Záloha ze starého webu

Z původního serveru, odkud se Joomla! stěhuje, je nutné provést:

    **Export database** – na webhostingu bývá většinou k disposici *PHPMyAdmin*. Dá se využít i [Adminer](http://adminer.org). Plus *Admineru* je, že jde snadno **uploadovat na server**, takže není nutné zkoumat, jak se přihlásit do PHPMyAdminu.

    Přihlašovací údaje k DB jsou v konfiguračním souboru CMS Joomla. Jeho název je `configuration.php` a je v hlavním adresáři. Údaje pro **přihlášení do database** jsou:

    ```
public $host = '**server**';
public $user = '**uživatel**';
public $password = '**heslo**';
public $db = '**název DB**';
```

    Po zalogování v Admineru a výběru database stačí vybrat *Export*.

    **Stáhnout zdrojové soubory z FTP** – nějakým FTP programem (například **FileZilla** nebo **Total Commander**) pro následné nahrání obsahu na nový server.

## Převod na nový server

Na nový server stačí **přes FTP** zkopírovat soubory, *Importovat* obsah do database a v souboru `configuration.php` nastavit nové přihlašovací údaje k databasi pro nový server.

Import DB jde kromě klasického nahrání přes **rozhraní prohlížeče** udělat i pomocí uploadu exportu z DB do složky s *Adminerem* a pojmenováním `adminer` (`adminer.sql` nebo `adminer.sql.gz` v případě *gzip* výstupu). To se může hodit zvlášť v případě, kdy je vyexportovaná database **příliš velká** a nešla by kvůli tomu uploadovat pomocí prohlížeče.

## Změna cesty

Při změně domény nebo přesun na jiný hosting se dost možná změní cesta k logům a dočasným souborům, cesty se dají přepsat opět v souboru `configuration.php`.

```
public $log_path = '/home/www/example.com/logs';
public $tmp_path = '/home/www/example.com/tmp';
```

V ideálním případě by po následujících úpravách měl web **fungovat jako předtím**.

## Řešení problémů

Může se stát, že stránka nebude fungovat, potom je dobré **zapnout zobrazování chyb** ([chybových hlášek](/chyby)). Pokud je povolené zobrazování chyb v nastavení serveru (vlastnost `display_errors`), v Joomle jde zapnout následovně.

```
public $error_reporting = "development";
```

Po úpravách potom vrátit na:

```
public $error_reporting = "none";
```