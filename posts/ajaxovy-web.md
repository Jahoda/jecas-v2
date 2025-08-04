---
title: "Web v AJAXu"
headline: "AJAXová stránka"
description: "Jak vytvořit obsahový web, kde se obsah bude načítat bez obnovení celé stránky pomocí AJAXu."
date: "2014-12-16"
last_modification: "2014-12-16"
status: 0
tags: []
---

Pro zlepšení **uživatelského dojmu** z webu může posloužit načítání stránek [AJAXem](/ajax). Smysl to může mít i u běžného **obsahového webu**.

Díky **načtení obsahu AJAXem** může být přechod mezi stránkami **rychlejší**.

  - Stačí přenášet jen obsah, **který se mění**.

  - Překreslovat se bude jen **část stránky**, která se změnila. Namísto kompletního [vykreslení stránky](/vykreslovani) od nuly.

Na prvním bodu většinou ani moc nezáleží – velikost výsledných HTML kódů se obvykle pohybují v **desítkách kilobytů**, což příliš velký prostor pro úsporu **nepřináší**. Překreslování jen **změněné části** ale většinou velmi znatelně přechod po webu **zrychlí**.

## Podpora v prohlížečích

Zásadní věc je podpora [změny URL JavaScriptem](/zmena-url) pomocí `history.pushState` – **IE 10+**.

To umožní i při obsloužení změny obsahu AJAXem **změnit URL** do podoby, která se může načíst i bez JS. Bez této funkce bych se do **obsahového webu** načítající stránky AJAXem **nepouštěl**.

Je sice jakž takž možné použít tzv. *hashbang* – `#!`, ale je značně **problematické načítat** takovou stránku, když na ni někdo s *hashbangem* odkáže – nejdřív se totiž musí načíst obsah bez *hashbangu* (server na obsah za `#` nevidí) a až potom JavaScriptem načít **pořadovaný obsah**.

U JS aplikací, kde se všechen obsah vytváří až v JS, toto nevadí, ale u obsahového webu je to nešikovné řešení.

## Signalisace načítání

Je dobré znázornit, že se po kliknutí na odkaz něco děje. Při klasickém přecházení mezi stránkami to automaticky **řeší prohlížeč**. Při změně obsahu AJAXem to musíme řešit vlastní signalisací.

**Znázorňovat načítání** nemusí být dobré **ihned po kliknutí**. Pokud web funguje normálně, mělo by načtení obsahu **být tak rychlé** (desítky až nízké stovky milisekund), že by znázornění načítání stejně jen probliklo.

Uživatelé bývají zvyklí, že se po kliknutí na odkaz **chvíli nic neděje**, nabízí se tedy načítání znázorňovat třeba až **0,5 vteřiny** od vyvolání akce.

## Přednačítání

Zrychlit dojem z webu může ještě **přednačítání**. Celý proces změny obsahu rozložíme do dvou kroků.

  - **stažení/zpracování** obsahu,

  - **zobrazení** obsahu

Má to svoje výhody i nevýhody. Umožní to **rychlejší změnu obsahu**, ale může **plýtvat daty** (načte se něco, co uživatel nakonec nebude chtít zobrazit).

Rozumné může být přednačtení při najetí myší ([`onmouseover`](/udalosti-mysi#onmouseover)) nebo stisknutí tlačítka ([`onmousedown`](/udalosti-mysi#onmousedown)). Zvlášť při stisknutí tlačítka myši nad odkazem je **vysoká šance**, že uživatel dokončí kliknutí (neodjede myší pryč) a můžeme tak získat třeba **100 milisekund**, které běžné kliknutí trvá (stisknutí a uvolnění tlačítka). Tedy v době dokončení kliknutí už mít načteno.

## Jiná hotová řešení

  - [InstantClick](http://instantclick.io/preloading)

  - [Turbolinks](https://github.com/rails/turbolinks)

  - [FastClick](https://github.com/ftlabs/fastclick) – sníží zdržení po kliknutí na mobilních zařízeních