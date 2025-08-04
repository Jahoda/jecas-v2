---
title: "Přesun Wordpressu"
headline: "Přestěhování Wordpressu na jiný server"
description: "Jak přenést web běžící na redakčním sytému Wordpressu na jiný server."
date: "2014-08-26"
last_modification: "2015-05-26"
status: 1
tags: ["Rady a nápady", "WordPress", "Redakční systémy"]
---

## Záloha ze starého webu

Z původního serveru, odkud se Wordpress stěhuje, je nutné:

    **Vyexportovat databasi** – na (skoro) každém hostingu bývá k disposici *PHPMyAdmin*. Stejně dobře jde použít [Adminer](http://adminer.org). Výhoda *Admineru* je, že si ho člověk sám **nahraje na server** a nemusí zkoumat, jak se dostat do PHPMyAdminu.

    Přihlašovací údaje je ideální získat z konfiguračního souboru Wordpressu. Ten se jmenuje `wp-config.php` a je v hlavním adresáři. Potřebné přihlašovací údaje jsou:

    ```
/** MySQL database username */
define('DB_USER', '**uživatelské jméno**');

/** MySQL database password */
define('DB_PASSWORD', '**heslo**');

/** MySQL hostname */
define('DB_HOST', '**server**');
```

    V Admineru po přihlášení a výběru DB stačí zvolit odkaz *Export* a nastavení ponechat výchozí nebo případně nastavit *Výstup* na *gzip* (to je komprese, takže teoreticky může být export datově menší).

    **Stáhnout si soubory z FTP** – nějakým FTP programem (například **Total Commander**) pro pozdější nahrání obsahu celého webu na nové umístění.

## Přesun na nový server

Na nový server stačí **nahrát přes FTP** soubory, *Importovat* obsah do DB a v souboru `wp-config.php` nastavit přihlašovací údaje k DB pro nový server.

Import database jde kromě klasického nahrání přes **rozhraní prohlížeče** udělat i pomocí uploadu exportu z DB do složky s *Adminerem* a pojmenováním `adminer` (`adminer.sql` nebo `adminer.sql.gz` v případě *gzip* výstupu). To se může hodit zvlášť v případě, kdy je vyexportovaná database **příliš velká** a nešla by kvůli tomu uploadovat pomocí prohlížeče.

V ideálním případě by nyní měl web fungovat jako předtím.

## Přesun na jinou doménu

Při změně domény je nejjednodušší funkcí *Najít a nahradit* upravit dump z database (vyexportovaný soubor `*.sql`).

Nahradit všechny výskyty `nazev-stare-domeny.cz` za `nova-domena.cz`.

U větších exportů může být problematické pracovat s datově velkým souborem v textovém editoru. Potom je řešení nahrazení v MySQL funkcí `REPLACE`.

## Možné problémy

Zatímco *čistý Wordpress* by neměl při přesunu dělat problémy. Ne tak to platí pro pluginy.

Může se tak po přesunu stát, že nějaký plugin způsobí *Bílou obrazovku smrti*, kdy se na adrese webu vůbec nic neobjeví.

Pro zjištění příčin pomocí **vypsání chybových hlášek** je nutné zapnout *debugovací režim* v souboru `wp-config.php`:

```
define('WP_DEBUG', **true**);
```

Typicky to způsobují pluginy, které si někam ukládají **absolutní cesty** svého umístění. Třeba u doplňku **Quick cache** se kvůli tomu musí přepsat adresa v konstantě `QUICK_CACHE_PLUGIN_FILE` v souboru `/wp-content/advanced-cache.php`.

Některé pluginy mohou *rozbít* Wordpress do té míry, že nepůjde spustit ani administraci a tam je **přeinstalovat**. Proto je sázka na jistotu pluginy před přesouváním odstranit.

Po zprovoznění WP na novém serveru se nesmí zapomenout v `wp-congif.php` **vypnout testovací režim**:

```
define('WP_DEBUG', **false**);
```

## Pozor na zapnutou cache

Pokud se něco při přesunu rozbilo a je zapnuté zobrazování chyb (`WP_DEBUG` nastavené na `true`) a případná chyba se opraví, nemusí se **projevit výsledek** vlivem zapnutého cacheování pomocí nějakého pluginu.

Člověk potom chybu opraví, ale stále se objevuje stejná chybová hláška z cache. Pro odladění je tedy dobré cache vypnout. Jde to rovněž v souboru `wp-config.php`.

```
define('WP_CACHE', **FALSE**);
```

## Pouze bílá stránka

Pokud se i přes vypnutí cache a zapnutí zobrazování chyb zobrazuje místo webu **prázdná bílá stránka**, může být na vině neaktuální stav DB, který vznikne při updatu samotného WordPressu.

Řešením je přejít do administrace (dostupné na URL: `nazevwebu.cz/**admin**`) a aktualisaci database tam dokončit, čímž by web měl začít fungovat.

## Změna prefixů tabulek

Pokud se z nějakého důvodu musí **změnit prefix** (výchozí je `wp_`) jednotlivých tabulek v DB (například hosting nepodporuje vytvoření více databasí), přináší to jisté komplikace.

V SQL exportu je nejprve nutné **hromadně změnit názvy tabulek**:

Tj. příkazy typu:

```
INSERT INTO `wp_options`
```

Nahradit za:

```
INSERT INTO `**prefix**_options`
```

A podobně. Při změně z výchozího `wp_` je ideální nahrazovat řetězec „``wp`“ na „``prefix`“.

Odkazy na název buněk jsou na několika místech *zadrátovány* v datech v DB. Je to udělané tak nešťastně, že nestačí provést změnu v proměnné `$table_prefix` v souboru `wp-config.php`:

```
$table_prefix  = 'prefix_';
```

Při zkopírování původní database a změně prefixů v DB i v konfiguračním souboru se po přihlášení zobrazí následující chybová hláška.

  Nemáte dostatečné oprávnění pro přístup na tuto stránku.

Případně anglicky:

  You do not have sufficient permissions to access this page.

Pro nápravu je nutné provést pár změn i v přímo datech SQL exportu. Týká se to tabulky `wp_options`, kde je nutné změnit `wp_user_roles` na `**prefix**_user_roles`.

Možná je ještě potřeba provést stejné úpravy v tabulce `wp_usermeta` u klíčů `wp_capabilities` a `wp_user_level`.