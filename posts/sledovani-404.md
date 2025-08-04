---
title: "Sledování chyb 404"
headline: "Sledování 404 chybových stránek"
description: "Jak zjistit adresy, které neexistují a končí chybovou stránkou 404 a co s nimi udělat."
date: "2015-07-21"
last_modification: "2015-07-26"
status: 1
tags: ["Rady a nápady", "WordPress", "Google Analytics"]
---

U každého navštěvovanějšího webu se dřív nebo později stane, že se návštěvník dostane na adresu, pro kterou **neexistuje obsah**.

Zobrazení neexistujícího obsahu může být způsobeno třemi způsoby:

  - **Autorem webu**, který nějaký obsah smaže, změní mu URL nebo udělá chybu v odkazu.

  - **Návštěvníkem webu**, který se pokusí adresu ručně zadat nebo udělá chybu při odkazování na web.

  - **Robotem** snažícím se navštívit URL, které používají známé redakční systémy (např. adresa `wp-admin` – administrace [WordPressu](/wordpress)).

Z těchto důvodů je dobré mít o **404 chybách přehled**. Pro jejich zjištění jde použít následující způsoby:

## Google Analytics

Pokud se na stránce měří návštěvnost službou [Google Analytics](/ga), je skoro vyhráno. Tedy v případě, že chybová stránka má **titulek, podle kterého ji lze jednoznačně identifikovat** – například:

  - *Stránka nebyla nalezena*,

  - *Stránka nenalezena*,

  - *Nenalezeno*,

  - *404 Not Found*,

  - *404 stránka nenalezena*

**Titulek stránky** se nachází zpravidla nad adresním řádkem:

Nebo jde získat ze zdrojového kódu stránky:

Tento titulek následně stačí vyhledat v Google Analytics ve volbě *Chování → Obsah webu → Všechny stránky → Název webu* a do **vyhledávacího políčka** zadat titulek **stránky 404**.

Po vyhledání by se měl objevit jediný výsledek, který po rozkliknutí zobrazí **adresy, které k chybové stránce vedly**.

Pro jecas.cz to za jeden rok vypadá následovně:

V případě, že by nějaká URL měla **hodně zobrazení**, dávalo by smysl na ní vytvořit relevantní obsah nebo ji na relevantní obsah **trvale přesměrovat**.

Pro pozdější pohodlné sledování chybových adres je dobré si pro tento výpis **vytvořit zkratku**:

Stačí jen zadat název:

### Události v Google Analytics

Pokud nemá chybová stránka **unikátní titulek** a je problém ho změnit, jde informaci o navštívení neexistující adresy zaznamenávat pomocí událostí v Google Analytics:

    - [Měření událostí v Google Analytics](/ga-mereni#mereni-udalosti)

## 404 chyby ve WordPressu

Monitorování chyb 404 nabízí například doplněk **SEO Ultimate**. Tento plugin obsahuje i spoustu dalších funkcí.

**404 Monitor** potom loguje všechny adresy, které vedly k chybě 404. K chybové adrese jde zobrazit i odkazující stránku a [hlavičku user-agent](/ua).

## Chybové stránky v Nette

Základní kostra (*sandbox*) [Nette Frameworku](http://nette.org) automaticky loguje 404 chyby. Standardně jsou ukládány do souboru `log/access.log`.

Tento soubor je asi dobré čas od času smazat, protože může záhy **narůst do značných rozměrů**.

Vytvořený záznam po přístupu na neexistující stránku může vypadat následovně:

```
[2015-07-24 14-09-35] 
HTTP code 404:  in ArticlePresenter.php:34  
@  http://jecas.cz/nesmysl
```

## Access log

Webové servery obvykle vytváří seznam se všemi **přístupy na soubory** umístěné na stránce. V seznamu logů je uveden i **kód odpovědi** – např.:

  - 200 – stránka se úspěšně načetla,

  - 301 – přesměrování,

  - 404 – nenalezeno

U webového **serveru Apache** může jeden záznam logu vypadat takto (pro přehlednost rozděleno na řádky):

```
68.180.230.246 - - 
[24/Jul/2015:01:13:10 +0200] 
"GET /pozadovana-adresa HTTP/1.1" 
**404** 
1316 
"odkazujici-stranka" 
"Mozilla/5.0"
```

Stačí z něj tedy vyfiltrovat přístupy s kódem 404.

Celý řádek access logu obsahuje:

  - IP adresu,

  - datum,

  - požadovanou URL a typ požadavku – GET/POST,

  - kód odpovědi,

  - velikost odpovědi v bytech,

  - odkazující stránku – [referrer](/referer),
  
  - identifikátor prohlížeče [user-agent](/ua)

Související odkazy:

    - Jak psát web: [Logy ze serveru](http://www.jakpsatweb.cz/seo/logy.html)

    - Apache HTTP Server Version 2.2: [Log Files](https://httpd.apache.org/docs/2.2/logs.html)

    - StackOverflow: [Understanding Apache Access Log](http://stackoverflow.com/questions/9234699/understanding-apache-access-log)

## Google Search Console

Nefunkční stránky z pohledu [Googlu](/google) jde zjistit pomocí nástroje *Search Console* (dříve Google Webmaster Tools):

Po výběru zkoumaného webu je tato možnost v *Procházení → Chyby procházení → Nenalezeno*.

Jednotlivé adresy jde rozkliknout a dozvědět se více podrobností – zejména **odkud se na neexistující stránku odkazuje**:

## Kontrola odkazů programem Xenu

Program [Xenu](http://home.snafu.de/tilman/xenulink.html) dokáže projít web a hledat na něm **nefunkční odkazy**.

Jde tak odhalit **interní odkazy**, které končí chybou 404.

## Vliv chybových stránek na SEO

Google ignoruje obsah chybových stránek. Chybovou stránkou je myšleno cokoliv, co vrací hlavičku *404 Not Found* nebo *410 Gone*.

Obsah 404 stránky je tedy pouze pro **návštěvníka**.

    - [Google ignoruje obsah „404 stránky“](/google-404)