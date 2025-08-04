---
title: "Instalace Apache, PHP a MySQL za 30 vteřin"
headline: "Instalace Apache, PHP a MySQL za 30 vteřin"
description: "Jak si ve Windows spustit vlastní Apache, PHP a MySQL na svém PC za půl minuty."
date: "2014-05-12"
last_modification: "2017-05-26"
status: 1
tags: ["Produktivita", "PHP", "SQL"]
---

Pro **programování v PHP** se většinou hodí mít možnost spouštět skripty na vlastním počítači, tzv. na *localhostu*. Je sice možné používat **vzdálený webhosting** a soubory upravovat a zkoušet přímo tam, ale lokální server mívá **lepší odezvu**.

## Vlastní, nebo hotové řešení?

Jedna možnost, jak vlastního serveru docílit, je instalace jednotlivých aplikací vlastnoručně. Tedy nainstalovat si:

  - **Apache** (webový server)

  - **PHP** (podpora skriptování)

  - **MySQL** (database)

A *nějak* to nastavit, aby to dohromady fungovalo.

Dle mého názoru je to **zbytečně pracné a zdlouhavé**. Pohodlnější je použít hotový balík, který všechno nainstaluje sám a další nastavování je povětšinou dostupné z **grafického rozhraní** a ne jen prostřednictvím konfiguračních souborů.

## WampServer

Osobně se mi osvědčil WampServer.

[Stáhnout WAMP Server](http://www.wampserver.com/en/)

Po stažení a prostém nainstalování jsou důležité následující údaje.

  Složka pro umístění skriptů
  
    ```
C:\wamp\www
```

  Zobrazení obsahu
  
    ```
[http://localhost](http://localhost)
```

  Přihlašovací údaje k MySQL

      - Server: `localhost`

      - Jméno: `root`

      - Heslo: (prázdné)

## Správa MySQL

Pro práci s DB (vytváření tabulek a podobně) je předinstalovaný nástroj **phpMyAdmin** (`http://localhost/phpmyadmin/`).

Osobně ale dávám přednost [Admineru](http://adminer.org). Stačí [stáhnout](http://www.adminer.org/#download) *pouze českou versi pro MySQL*

## Nastavení serveru

V případě, že se nastavení serveru na našem webhostingu liší od výchozího nastavení WAMPu, není problém si pohodlně zapínat různá **rozšíření a moduly**.

Veškeré nastavování (stejně jako spouštění/zastavování/restartování služeb) probíhá po kliknutí **levým tlačítkem** na ikonu WAMPu v hlavním panelu Windows vedle hodin.

### Apache

U Apache se dá přímo zaškrtávat moduly, které mají běžet. V dnešní době je prakticky nezbytné například zapnout `rewrite_module` pro přepisování adres. Pro *cacheování* se potom hodí `expires_module`.

Ruční nastavování je možné provádět v souboru `httpd.conf` (vede na něj odkaz z menu WAMPu).

### PHP

PHP má odděleno nastavení a rozšíření (*PHP settings* a *PHP extensions*):

Pro [získávání obsahu cizích stránek](/stazeni-stranky) se hodí v **nastavení** zapnout `allow_url_fopen`. K přístupu k serverům běžícím na HTTPS se zase hodí zapnout *exstenzi* `php_openssl` a pro **pracování s obrázky** potom `php_gd2`.

Nastavování přes **konfigurační soubor** se provádí v souboru `php.ini` (také na něj vede odkaz z nabídky).

## VirtualHosts

Při souběžném provozování více projektů se může hodit používat tzv. *virtual hosty*.

Díky tomu jde docílit hezčích adres než `localhost/projekt`. Třeba v podobě běžné domény – např. `projekt.cz` nebo `projekt.local`.

**Jak na to?**

    V souboru `hosts` ve Windows (umístění `C:\Windows\System32\drivers\etc`) přidat na konec souboru:

  ```
127.0.0.1 projekt.local
```

    To zajistí, že se požadavek na „`projekt.local`“ pošle na lokální umístění (adresa `127.0.0.1`), tedy *localhost*.

    V souboru `httpd-vhosts.conf` nastavit umístění souborů pro danou *doménu*. K `httpd-vhosts.conf` se jde proklikat z nabídky WAMPu v kategorii *Apache* nebo je umístěn v `C:\wamp64\bin\apache\apache2.4.23\conf\extra`.

    Jednotlivé *virual hosty* jdou nastavit následovně:

    ```
&lt;VirtualHost *:80>
	ServerName projekt.local
	DocumentRoot c:/projekt/
	&lt;Directory  "c:/projekt/">
		Options +Indexes +Includes +FollowSymLinks +MultiViews
		AllowOverride All
		Require local
	&lt;/Directory>
&lt;/VirtualHost>
```

Nyní by se po restartu Apache a zadání `projekt.local` do adresního řádku měl zobrazit obsah z `c:/projekt`.

## Řešení problémů

### Obsazený port

Může se stát, že WAMP z ničeho nic **přestane fungovat**. Typicky po nainstalování nějaké aplikace, která obsadí port 80 (ten používá WAMP ve výchozím nastavením).

V případě, že je **blokování portu** důvod, proč server neběží, se při testu portu 80 zobrazí název aplikace, která dělá problémy.

Řešení je tedy takovou aplikaci odinstalovat, vypnout, změnit u ní číslo portu nebo totéž změnit u *Apache*.

Službu *Microsoft-IIS/7.5* z obrázku je možné vypnout v *Ovládací panely\Systém a zabezpečení\Nástroje pro správu\Správce Internetové informační služby*.

### Změna portu

WAMP přímo nabízí možnost číslo portu změnit. Po kliknutí pravým tlačítkem na ikonku WAMPu v oznamovací oblasti, je tato možnost pod volbou *Tools → Use a port other than 80*.

Do zobrazeného dialogu stačí zadat jiné číslo (např. `8080`). Adresa serveru potom nebude `localhost` ale `localhost:**8080**`.

## Odkazy jinam

  - Pehapko.cz: [Instalace prostředí pro běh PHP skriptů](http://pehapko.cz/sprava-serveru/instalace)

  - Programujte.com: [Samostatná ruční instalace všech služeb](http://programujte.com/clanek/2014021500-instalace-nejnovejsi-verze-apache-2-4-php-5-5-mysql-5-6-phpunit-xdebug-a-memcached-na-windows-8/)