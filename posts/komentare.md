---
title: "Jak přidat komentáře na web"
headline: "Komentáře na webu"
description: "Jak jednoduše provozovat komentáře pod články na svých stránkách."
date: "2014-08-06"
last_modification: "2015-05-09"
status: 1
tags: ["Produktivita", "Rady a nápady"]
---

Může nastat, že je žádoucí, aby na stránce mohli návštěvníci **zanechat komentář**. Před umožněním komentování je dobré počítat s několika věcmi.

    **Moderování komentářů** – web může přitahovat diskutující, kteří nebudou svým projevem vyhovovat představám provozovatele. Nežádoucí komentáře bude nutné mazat. Některé systémy z opatrnosti před spamem mohou vyžadovat **schvalování komentářů**, což zabere čas.

    **Ochrana proti spamu** – dřív nebo později se v komentářích pravděpodobně objeví nevyžádané příspěvky a bude nutné se [bránit proti spamu](/spam).

    **Ztráta ilusí** – diskutující na webu mohou obsah **ostře kritisovat**. Někdy je častější, že návštěvníci více kritisují / upozorňují na chyby, než že chválí autora, což někoho může demotivovat od dalšího psaní.

## Vlastní, nebo cizí komentáře?

Buď jde komentáře provozovat na vlastním serveru, nebo využít nějakou externí službu třetí strany.

### Vlastní komentáře

Používá-li web nějaký redakční systém typu [WordPress](/wordpress), je v něm systém pro komentáře přítomný. U kompletně vlastního řešení ale vyžaduje možnost **přidávat komentáře** jisté znalosti programování a databasí (+ podporu těchto věcí na webovém serveru).

  Příklad formuláře pro komentování ve WordPressu

Výhoda vlastního řešení spočívá hlavně v tom, že je nad obsahem komentářů **plná kontrola**. Komentáře mohou přinášet hodnotný obsah (například s ohledem na [SEO](/seo)). Při používání externí služby je tento **obsah na cizích serverech** a například při zániku služby bude nutné řešit migraci dat (v lepším případě, kdy bude ukončení známé dopředu).

Jelikož cizí komentáře zpravidla fungují **na základě JavaScriptu**, který se připojí do stránky a zobrazí komentáře, může být problém vůbec se samotným **indexováním komentářů vyhledávači**. S vlastními komentáři problém s dohledatelností ve vyhledávačích nehrozí.

Nakonec v případě vlastního řešení půjde upravit **výpis komentářů** prakticky libovolným způsobem.

### Externí komentářová služba

Hlavní výhodou cizí služby je, že se člověk **nemusí o moc věcí starat**. Zaregistruje se u poskytovatele komentářů a přidá na svou stránku několik řádek kódu (připojení JS souboru, co načte a zobrazí komentáře).

Vzhledem k tomu, že o ukládání dat komentářů se stará *někdo jiný*, komentáře jde tímto způsobem přidat i do **statické HTML stránky**. To může snížit náklady na [hosting](/hosting), protože nebude nutná žádná podpora **PHP**, **MySQL** a podobně.

Plně JavaScriptová povaha komentářů výrazně **sníží počet spamů** ze strany robotů, kteří umějí odesílat HTML formuláře, ale s JS si úplně dobře neporadí.

Další zásadní výhodou je u rozšířených komentářových služeb **sdílený účet napříč weby** používajícími daný systém. Návštěvník, co už systém použil, je tak rovnou přihlášený, což zvýší jeho **ochotu komentovat** – nemusí nic vyplňovat, jen napsat komentář.

Tato vlastnost má jednu nevýhodu pro *opatrné uživatele*. Provozovatel externí služby získá pro každého návštěvníka **přehled o všech navštívených webech**, které jeho službu používají.

Jisté risiko existuje i pro tvůrce webu – skript vkládající komentování na stránku získá prakticky **plnou kontrolu nad webem**. Je nutné věřit, že toho provozovatel nezneužije a nebude napaden útočníkem, který by toto zneužil.

## Komentářové služby

Nejpopulárnější z externích služeb umožňujících snadné přidání komentářů na stránky jsou uvedené níže. Všechny umožňují **diskuse ve vláknech** nebo různé způsoby řazení příspěvků, moderování a podobně.

### Facebook komentáře

Pro komentování jde použít **účet na Facebooku**. To je na jednu stranu výhoda (profil na [Facebooku](/facebook) má hodně lidí), na stranu druhou jsou návštěvníci bez Facebook účtu vyloučeni z diskuse.

  - [Facebook Comments Plugin](https://developers.facebook.com/docs/plugins/comments) – stránka pro získání kódu přidávajícího komentáře na web

  - [Ukázka Facebook komentářů](http://kod.djpw.cz/mbnb)

Velkou výhodou Facebook komentářů je **sdílení přímo na Facebooku**.

Když tuto volbu komentující člověk zaškrtne, odkaz na stránku s komentářem se zobrazí jeho přátelům / lidem, kteří ho sledují. Může to tedy být způsob, jak získat další **návštěvnost**.

V nové versi Facebook komentářů Graph API v2.3 (nahrazuje starou podobu 23. června 2015) už políčko pro zveřejnění rovnou zaškrtnuté není.

Nebo je? Napište, prosím.

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/cs_CZ/sdk.js#xfbml=1&version=v2.3&appId=257803581070077";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));  

### Disqus

Relativně rozšířenou službou pro komentáře je i **Disqus**. Příjemné na něm je, že automaticky přebírá barvy webu, takže do stránky hezky zapadne bez nějakého konfigurování.

  - [Hlavní stránka Disqus](https://disqus.com) – jde tam získat kód pro vložení diskusí na stránky

  - [Živá ukázka Disqus komentářů](http://kod.djpw.cz/nbnb)

Pro uživatele nabízí spoustu způsobů (Facebook, Twitter, Google Plus), kterými komentář podepsat – jde použít i obyčejný **e-mail a jméno** v režimu *Napsat komentář jako host*.

Do komentářů jde **přidávat obrázky** i text příspěvků **formátovat HTML značkami**.

Disqus posílá v případě okomentování **e-mailové notifikace**, takže se o komentářích správce webu / diskutující snadno dozví.

Se **spamem** se vypořádává velmi dobře – za roky používání na tomto webu bylo případů spamu naprosté minimum.

### IntenseDebate

Možná méně známá a rozšířená, ale rovněž kvalitní komentářová služba je **IntenseDebate**.

Má ale lehce komplikované rozhraní.

  - [Hlavní stránka IntenseDebate](https://intensedebate.com/)

  - [Ukázka komentování pomocí IntenseDebate](http://kod.djpw.cz/obnb)

## Programování vlastních komentářů

Při vytváření kompletně vlastního komentářového systému je dobré pamatovat na následující.

    Dát si **pozor na bezpečnost**, hlavně na [risiko XSS díry](/bezpecnost#xss). Kdokoliv může díky komentářům vložit na stránku obsah. Je proto bezpodmínečně nutné tento vstup ošetřit, aby nešlo **vložit škodlivý JavaScript**.

    Je nutné ošetřit všechna pole, ne jen samotný text příspěvku.

    Možnost komentovat zvyšuje šanci využít případnou [CSRF díru](/bezpecnost#csrf) – pokud jde nějakou administrátorskou akci provést prostým otevřením odkazu, stačí když útočník přidá URL do příspěvku a nic netušící administrátor odkaz otevře.

    **Bránit se proti spamu a tapetování**. Nemělo by jednomu uživateli jít zaslat hromadu příspěvků za pár minut.

    Umožnit **sledovat nové příspěvky**. Měla by existovat možnost, jak se diskutující dozví, že na něj někdo reagoval.

    Užitečný je **náhled** anebo **možnost provádět úpravy** po odeslání. Možnost editovat stačí jen na nejbližší dobu od odeslání. Historii editací je užitečné ukládat.

    **Zvýraznění nepřečtených komentářů** je prakticky nutností u diskusí, kde je vyšší počet příspěvků.