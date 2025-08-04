---
title: "Immutable cacheování trvalých souborů"
headline: "Cache-Control: immutable – cache trvalých souborů"
description: "HTTP hlavičkou <code>Cache-Control: immutable</code> jde zamezit opětovanému kontrolování neměnných souborů a zrychlit tak načítání."
date: "2017-03-19"
last_modification: "2018-07-14"
status: 1
tags: ["Rady a nápady", "Zrychlování webu"]
---

Pro rychlé načítání webu je důležité všechny objekty, které prohlížeč stahuje, dobře cacheovat.

Dost často jde **statický obsah** cacheovat na hodně dlouho. Tam mohou patřit soubory jako (a možná ještě další):

  - styly,

  - skripty,

  - obrázky,

  - [videa](/video)

  - [fonty](/font-face),

  - [favicony](/favicon)

V případě tohoto statického obsahu to znamená cacheovat s co možná **nejdelší dobou expirace**. Prohlížeč potom při opakovaných požadavcích na tento obsah dostane odpověď *304 Not Modified* – signalisující, že nedošlo ke změně – a nemusí tak soubory znovu stahovat.

Pokud je potřeba obsah těchto souborů změnit, **změní se jim URL** (stačí klidně přidat nějaké časové razítko, otisk souboru nebo číslo verse za otazník):

```
&lt;link rel="stylesheet" href="styl.css**?v2**">
```

Prohlížeč potom stáhne nový soubor a bude ho zase cacheovat na hodně dlouhou dobu.

## Režie s 304 Not Modified

Ačkoliv hodně vzdálená expirace souboru ušetří opětovné přenášení dat, pořád to znamená **dotaz na server** a čekání na odpověď, že se nic nezměnilo.

U malých souborů může být tato režie i větší než samotné stahování obsahu.

Pokud je jasné, že se obsah na dané URL nikdy měnit nebude a případné změny se zajistí změnou URL, hodí se právě příznak *immutable* – česky „neměnný“.

Prohlížeč díky *immutable* příznaku bude vědět, že se daný soubor nikdy nezmění. U webů s hodně objekty (typicky obrázky), kde uživatelé často refreshují (např. sociální sítě), se tím značně zrychlí opakované načítání.

Toto klíčové slovo se uvádí v HTTP hlavičce `Cache-Control`:

```
Cache-Control: max-age=365000000, **immutable**
```

Parametr `max-age` uvádí dobu do expirace cache od prvním přístupu k souboru v **sekundách**.

## Podpora v prohlížečích

Příznak v hlavičce `immutable` jako první implementoval **Firefox 49** a funguje jen na [HTTPS](/https). Hlavičku `immutable` posílá např. Facebook.

**Chrome** se podle všeho snaží optimalisovat dotazy na neexpirované soubory při běžném načtení:

A od **Chrome 54** podporuje i tuto hlavičku. Podporu v ostatních prohlížečích se mi nepodařilo zjitit.

Nicméně uvést `immutable` do hlavičky je bezpečné a v nepodporovaných prohlížečích nic nerozbije, takže se nejspíš vyplatí i pouze pro **Firefox** a **Chrome**.

## Implementace

Nastavení dlouhé platnosti neměnných souborů může při použití souboru `.htaccess` vypadat následovně:

```
&lt;filesMatch ".(css|js|jpg|jpeg|png|gif|svg|ico)$">
  Header set Cache-Control "max-age=365000000, public, **immutable**"
&lt;/filesMatch>
```

Navíc je v příkladu ještě příznak `public`, který značí, že se jedná o veřejně přístupný obsah.

## Odkazy jinam

  - Bits Up!: [Cache-Control: immutable](https://bitsup.blogspot.cz/2016/05/cache-control-immutable.html)

  - Mozilla Hacks: [Using Immutable Caching To Speed Up The Web](https://hacks.mozilla.org/2017/01/using-immutable-caching-to-speed-up-the-web/)