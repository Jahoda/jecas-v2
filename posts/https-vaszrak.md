---
title: "Jak jsme přecházeli na HTTPS s www.vaszrak.cz"
headline: "Jak proběhl přechod vaszrak.cz na HTTPS"
description: "Příklad konkrétního webu, který přešel z nezabezpečeného HTTP na HTTPS."
date: "2015-01-27"
last_modification: "2015-10-08"
status: 1
tags: ["Bezpečnost"]
---

Autorem článku je **Tomáš Smetka, DiS.** provozující web [vaszrak.cz](https://www.vaszrak.cz/).

  - [Aktualizace ke dni 7. 10. 2015](#aktualizace)

Minulý rok podpora vyhledávače Google vydala krátkou zprávu o zapojení tzv. SSL protokolu (web s `https://`) do fulltextového vyhledávání.     Na různých odborných diskusních fórech mnoho webmasterů řeší **vliv SSL na pozice klíčových slov** a problematiku přechodu na tento zabezpečený protokol.

    - [Přechod na HTTPS](/https) – souhrn poznatků při uvažování o HTTPS

V tomto článku uvedeme své **praktické zkušenosti** s převodem domény a obsahu 
  [www.vaszrak.cz](https://www.vaszrak.cz), jež jsme realizovali na začátku listopadu 2014.

Zmíněné webové stránky budujeme od poloviny roku 2011, obsahují kvalitní nezkopírované napsané texty a zpětné organické relevantní odkazy z autoritativních a menších tématicky zaměřených webů.    Od začátku jsme nikdy nepřistupovali na tzv. black hat SEO či jiné šedé praktiky, vždy jsme šli „čistou cestou“.

## Problematika přechodu

Jak již bylo napsáno i na tomto webu, přechod na HTTPS není zcela jednoduchý a má svá úskalí. Je třeba vždy **zvážit pro a proti**.

Hlavním problémem při přechodu byl **vyhledávač [Seznam](/seznam)**, který podle dostupných informací registroval web s `https://` **jako nový** i v případě korektního přesměrování 1:1 se správnou hlavičkou.       S **přechodem u [Google](/google)** podle informací potíže nejsou, nový web na HTTPS se zobrazuje v organickém vyhledávání přibližně **3. den**.

## Přechod v praxi

Převod na nový web probíhal v několika fázích.

### 1. Nákup SSL a nasazení

Pro naše účely nám nejvíce vyhovoval nákup **SSL certifikátu** na 
  [www.ssls.cz](https://www.ssls.cz), jelikož tento e-shop umožňuje možnost:

  - výběr [SNI](http://cs.wikipedia.org/wiki/Server_Name_Indication) certifikátu (osazení SSL pro více domén s jednou dedikovanou IP adresou),

  - rychlou **platbu online kartou**,

  - poměrně svižně odbornou technickou podporu.

Základní SSL stojí na tomto e-shopu **necelých 100 Kč** a pro naše testovací účely dostačující. Web hostujeme na hostingu 
  [Savana](http://www.savana.cz), který umožňuje instalaci přímo v administrativním rozhraní bez zásahu podpory. Postup nasazení SSL konkrétně na tomto hostingu rozepíšeme někdy příště.

### 2. Registrace nového webu s `https://` v nástroji Google Webmaster Tools.

V druhém kroku jsme zanesli do tohoto nástroje pro webmastery web s `https://` **jako nový a starý vymazali** (nelze spravovat domény s oběma protokoly současně). Bohužel, při registraci webu **dočasně ztratíte data** o vyhledávaných dotazech, pozice klíčových slov a jiných informací. **Nová data** se nám v nástroji začínala objevovat přibližně **po 14 dnech** od registrace. V souboru [`sitemap.xml`](/sitemap) jsme generovali doménu již s `https://`.

### 3. Změna odkazů na `https://`

V tomto kroku šlo o administrativu. Kontaktovali jsme naše partnery, kteří na web odkazovali a **zažádali o změnu odkazu** na HTTPS podobu. Pro ty, kteří přechod plánují, doporučuji **vést seznam partnerů**, popř. sledovat odkazy v Google Webmaster Tools.

U katalogů typu Firmy.cz, ZlateStranky.cz a pod. lze odkaz změnit v administraci. Je vhodné také pamatovat na sociální služby typu [Facebook](/facebook), [Twitter](/twitter) apod.

### 4.  Paralelní  spuštění domény s `http://` a `https://`

Jelikož jsme věděli o potížích při přechodu u vyhledávače Seznam, nenastavovali jsme záměrně přesměrování ihned, ale **nechali doménu paralelně** na `http://` a `https://` pro případ náhlého propadu návštěvnosti. Dále jsme také chtěli vědět, jak na tyto protokoly **zareaguje Seznam a Google**.

Fulltext Seznamu překvapivě zobrazoval na různá spojení web ve vyhledávání s `https://` i `http://`.       Vyhledávač Google `http://` ignoroval a téměř ihned zobrazil `https://`. S největší pravděpodobností **klade velký důraz na Google Webmaster Tools**. Tento stav jsme nechali spuštěný 30 dní.

### 5. Nastavení přesměrování

Po uplynutí 30 dní jsme stránky **přesměrovali** na `https://` v poměru 1:1 s hlavičkou *301 – Moved Permanently*. U Seznamu se toto přesměrování neprojevilo u všech stránek dodnes (*konec ledna 2015*), zobrazuje stále některé stránky s `http://`, některé s `https://`.

## Měření pozic ve vyhledávačích

      Pro periodické – měsíční měření pozic ve vyhledávačích jsme použili nástroj 
  [SEMOR](http://www.semor.cz). Do textové části měřených podstránek nebylo nijak zasahováno, probíhaly pouze průběžné úpravy zdrojového kódu (minifikace JS, drobné změny) Výsledky jsou následující:

  Datum měření1. 11. 141. 12. 141. 1. 15
  
  Klíčové slovo 
    Google.cz / Seznam.cz
  
  krátkozrakost28 / 928 / 1022 / 7
  
  dalekozrakost34 / 834 / 1231 / 2
  
  astigmatismus56 / 3858 / 3256 / 36
  
  oční klinika plzeň7 / 165 / 175 / 8
  
  oční klinika praha22 / 2025 / 2225 / 17
  
  oční klinika brno20 / 1923 / 1722 / 17
  
  oční klinika ostrava10 / 1710 / 1811 / 8
  
  oční klinika zlín9 / 108 / 117 / 10
  
  operace očí praha30 / 1722 / 5530 / 48
  
  lasik60+  / 4060+  / 4260+  / 40
  
  femtolasik6 / 17  / 18  / 1
  
  relex smile6 / 47  / 29  / 2
  
  ocni klinika46 / 2040  / 2136  / 23

  Klíčová slova byla vybrána z konkurenčních důvodů pouze obecná.

   Z měřených hodnot lze vyvodit, že **přechod na HTTPS nijak závratně pozice a ve výsledku i návštěvnost nemění**. Níže přikládáme návštěvnost z Google i Seznam z testovaného období.

Pro srovnání graf za stejné období předešlého roku.

## Technické potíže

Bohužel Seznam (resp. jeho [screenshotovací robot](/nahled-seznam)) dodnes nezobrazuje **náhled webových stránek**. Tento problém budeme konzultovat s technickým oddělení Fulltextu.   Dalším problémem vyhledávacího robota je **pomalá indexace nového obsahu**. Doporučuji např. při vydání článku či update textu přidat odkaz ručně pomocí formuláře
  [přidat URL](/pridat-url).

## Aktualizace ke dni 7. 10. 2015

Seznam.cz vydal na svém [blogu](http://fulltext.sblog.cz/2015/10/06/3254/) článek s doporučením nasadit https rotokol až na začátek roku 2016. Toto doporučení potvrzuji, na testovaných webových stránkách došlo k propadu návštěv z fulltextu Seznam.cz. Níže přikládám vývoj návštěvnost od nasazení Google Analytics k dnešnímu dni.

Vývoj budu nadále sledovat, ke konci tohoto roku bude článek aktualizován o nový graf.