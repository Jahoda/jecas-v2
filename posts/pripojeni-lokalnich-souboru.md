---
title: "Úprava CSS/JS na ostrém serveru"
headline: "Připojení lokálního CSS/JS na ostrý server"
description: "Jak na ostrý server připojit pro vývoj a testování lokální styly nebo skripty."
date: "2014-10-02"
last_modification: "2015-08-20"
status: 1
tags: ["Produktivita", "Rady a nápady"]
---

Existují různé způsoby, jak se vypořádat s **implementací úprav** do živé (již běžící) webové stránky.

Ideální je zpravidla mít identickou kopii ostrého webu pro vývoj a testování, ne vždy ale je takového stavu reálné dosáhnout.

Asi nejextrémnější způsob úprav je spojení vývojové (*development*), testovací (*testing*) a produkční části (*production*) do jedné a **provádění úprav přes FTP** přímo na ostrém serveru.

    Ilustrační obrázek provádění oprav přímo v produkčním prostředí

  Tomuhle workflow se vyhýbám jako čert kříži. :)

  I malé úpravy menších webů dělám nejdříve na lokální kopii, a pak přes FTP nahrávám ven. Díky [Sublime SFTP](/st-ftp) je to workflow podobně jednoduché jako editace na serveru. Jsem ale klidnější, že nic nerozbiju.

  [Martin Michálek](http://www.vzhurudolu.cz/martin)

Ačkoliv pro řadu lidí je způsob **upravování přímo na ostrém serveru** pravděpodobně hodný zavržení, pro rychlé úpravy méně významných webů takové řešení může dávat smysl. Je to **rychlé** a případné výpadky během úprav u málo navštěvovaného webu **příliš lidí nepostihnou**.

Weboví tvůrci, kteří pracují hlavně s **CSS nebo JavaScriptem**, mají navíc tu výhodu, že si potřebné **CSS/JS soubory** mohou připojit k ostrému webu z vlastního lokálního PC nebo vlastního serveru, bez toho, aby úpravy ovlivnily návštěvníky.

Existuje několik možností:

## Mapování souboru v Chrome

V prohlížeči **Chrome** jde ve [vývojářských nástrojích](/vyvojarske-nastroje) na kartě zdroje (*Sources*) připojit lokální složku se soubory:

    **Přidání složky** – po kliknutí pravým tlačítkem se objeví možnost pro přidání složky.

    **Povolení přístupu do složky**

    **Namapování souboru z lokální složky**

    Je třeba kliknou pravým tlačítkem na lokální soubor a zvolit *Map to network resource…*

    **Vybrání lokálního souboru**

    Následně potom vybrat soubor ze serveru, který se má *nahradit*:

Nyní by se měl obsah souboru `lokalni-styl.css` rovnou projevovat během úprav ve vývojářských nástrojích.

Obsah jde i uložit klávesovou zkratkou Ctrl + S. Stejně tak jde soubor upravovat i v běžném editoru (třeba [Sublime Text](/st)), jenom pro projevení změn je po uložení v editoru nutné kliknout do editačního prostoru souboru ve vývojářských nástrojích, což je trochu nepohodlné.

## Živý náhled LiveStyle

Doplněk *LiveStyle* do prohlížeče **Chrome** a **Sublime Text** jde použít i pro vzdálené úpravy na serveru.

    - [Živý náhled editovaného CSS](/zivy-nahled-css) – přemapování CSS souboru z webu na CSS otevřené v Sublime Text

Řešení je to tedy pouze pro CSS. Bohužel namapování lokálního souboru nepřežije obnovení stránky / nebo přechod na jinou – v takovém případě se opět styly **načtou ze serveru** – změny v lokálním CSS se objeví až po další úpravě.

Při dramatičtějších úpravách nemusí výsledek úplně odpovídat realitě.

## Fiddler

Autor nejlepšího českého [blogu o programování](http://programio.havrlant.cz/) – **Lukáš Havrlant** – přišel s myšlenkou použít nástroj **Fiddler**.

    [Fiddler](http://www.telerik.com/fiddler) – The free web debugging proxy 
 for any browser, system or platform

Fiddler dokáže monitorovat síťový přenos, zkoumat HTTP hlavičky a další věci, kromě toho umí i **podstrčit při požadavku na danou URL jiný obsah**, což se pro připojení lokálního CSS nebo JS perfektně hodí.

Tato funkce se jmenuje *AutoResponder*. Postup je následující:

  - Po spuštění Fiddleru načíst požadovanou stránku. To zajistí, že se ve Fiddleru objeví načítané soubory.

  - Vybrat v levé části soubor, který se má nahradit.

  - Přepnout se na kartu **AutoResponder** a aktivovat automatické odpovědi (*Enable automatic responses*).

  - Přidat pravidlo pro nahrazení souboru. Důležité je zaškrtnout *Unmatched requests passthrough* a nezaškrtnou *Match only once* vpravo dole.

Hlavní výhoda tohoto postupu je **funkčnost napříč všemi prohlížeči**. Stačí nastavit jednou a ve všech prohlížečích na daném PC se bude soubor stahovat z lokálního umístění.

Použití Fiddleru jde navíc i zkombinovat s programem **LiveReload** a zajistit si tak **automatické obnovení prohlížeče** při změnách souborů ze sledované složky.

    - [Automatické obnovení stránky při uložení](/livereload) – instalace, nastavení a používání LiveReloadu

### Možné problémy

  CSS/JS soubor se nebere z lokálního úložiště

    Po spuštění Fiddleru může být nutné **restartovat prohlížeč**, jinak se nemusí zachycené požadavky zobrazovat.

  Úprava webu běžícího na HTTPS
  
    Stránka běžící na [HTTPS](/https) vyžaduje, aby Fiddler dešifroval obsah. Je k tomu nutné přijmout jeho certifikát.

## Uživatelské styly a skripty

Do novějších prohlížečů existují doplňky pro **připojení uživatelského CSS/JS**. Těmi jde rovnou *přebít* obsah na straně serveru (načítají se až po stylech a skriptech ze serveru).

Přebíjení je ale značná **nevýhoda u CSS**, kde například nepůjde nežádoucí deklarace smazat, ale budou se muset *vyresetovat*/přenastavit.

## Úpravy na straně serveru

V serverovém skriptu běžícím na ostrém webu jde udělat *výhybku* pomocí detekce IP adresy.

### PHP podmínka pro IP adresu

V PHP se IP adresa získá z [pole `$_SERVER`](/server#remote-addr). Celé řešení může vypadat následovně:

```
&lt;?php
if ($_SERVER["REMOTE_ADDR"] !== "[**Moje IP adresa**](/ip/)"):
?>
&lt;link rel="stylesheet" href="styl.css">
&lt;?php
else:
?>
&lt;link rel="stylesheet" href="**http://localhost/**styl.css">
&lt;?php
endif;
?>
```

Jiné CSS jde potom připojit:

  - z lokálního serveru (tzv. *localhostu*),

  - z jiného serveru,

  - jako jiný CSS soubor ze stejného serveru

Analogický bude postup pro JavaScripty.

Aby nehrozil problém se starým obsahem **kvůli cacheování**, jde do adresy souboru vygenerovat nějaké náhodné smetí, které zajistí vždy čerstvou podobu souboru:

```
&lt;script>
document.write("&lt;script src=\"http://localhost/skript.js?" + Math.random() + "\">&lt;\/script>");
&lt;/script>
```

### Podstrčení souborem `.htaccess`

Bylo-li by **komplikované přidávat podmínku** do serverových skriptů pro připojení různých souborů na základě IP adresy, jde něco obdobného zanést do souboru `.htaccess`.

Řekněme, že CSS soubory budou v adresáři `styly` a JS v adresáři `skripty`. Následující přepis v `.htaccess` zajistí, aby se pro zadanou IP adresu hledaly soubory ve složkách `testovaci-styly` a `testovaci-skripty`:

```
RewriteEngine On
RewriteCond %{REMOTE_HOST} ^127\.0\.0\.1
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^styly/(.+\.css)$ testovaci-styly/$1

RewriteCond %{REMOTE_HOST} ^127\.0\.0\.1
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^skripty/(.+\.js)$ testovaci-skripty/$1
```

## Lokální kopie

Asi nejprostší je postup, kdy se statické HTML a příslušné CSS/JS zkrátka **uloží na disk** a po odladění se styly a skripty nahrají zpět na ostrý server.

Aby se nemusely **stahovat úplně všechny** připojené soubory (i obrázky a podobně), jde si vypomoci značkou [`&lt;base>`](/base) a změnit jen `&lt;link href>`y a `&lt;script src>y` souborů, které je potřeba upravovat.

Tento způsob bude ale pro úpravu webu o hodně podstránkách **dost komplikovaný**, protože se bude muset stáhnout a upravit každá jedna stránka.