---
title: "Proč končím s PHP"
headline: "Proč končím s PHP"
description: "Je PHP mrtvé? Proč jsem ho přestal používat."
date: "2020-03-29"
last_modification: "2020-03-29"
status: 0
tags: []
---

K PHP jsem se dostal někdy v roce **2005**, tehdy to byla asi nejsnazší cesta, **jak psát web**.

Člověk mohl relativně bez znalosti programování smysluplně [skládat stránky dohromady](/include), zdarma to hostovat na [Webu zdarma](https://www.webzdarma.cz).

Případně celkem levně na nějakém z mnoha sdílených [hostingů](/hosting).

V PHP existovala (a někdy i dodnes existuje) řada hotových aplikací, redakčních systému nebo tehdy populárních diskusních fór.

    [WordPress](/wordpress)

    [phpBB](https://www.phpbb.com)

Původně byl v PHP napsán i [Facebook](/facebook).

## Co zabilo PHP

Při pohledu na [statistiky GitHubu](https://octoverse.github.com/2022/top-programming-languages) s používanými programovacími jazyky, je u **PHP** vidět meziročně sestupný trend.

Čím to?

Podle mě za to může rozšíření [AJAXu](/ajax), kdy se změnil způsob, jak uživatel se stránkou komunikuje.

Zatímco dřív každé kliknutí znamenalo **sestavení nového HTML kódu** na straně serveru, poslání ho ke klientovi a znovunačtení celé stránky, JavaScript umožnil reagovat na uživatele okamžitě přímo v prohlížeči.

Případně ze serveru stahovat jen potřebné části dat.

Z toho plyne, že **v PHP není možné vytvořit tak dobrý uživatelský zážitek jako v JS**.

Nástup **reaktivních frameworků** jako je **React**, **Angular**, **Vue.js**, **Svelte** a podobně následně začal nabízet i celkem rozumný způsob vývoje.

Rozšíření History API umožnilo [plnohodnotně měnit URL bez znovunačtení stránky](/zmena-url).

Vynález [TypeScriptu](https://www.typescriptlang.org) a různých dalších kompilátorů potom aspoň trochu polidštil programování v JavaScriptu.

Skončila tím doba slepování HTML řetězců v **jQuery** v jednom obrovském souboru `main.js`.

## Frontend vs. backend

V dřívějších dobách se to nerozlišovalo. Zažil jsem i doby, kdy *dělat frontend* znamenalo připravit HTML/CSS šablony, které potom backendista implementoval do PHP aplikace a šablonovacího systému.

Pokročilejší frontendista je potom dokázal implementovat i sám, ale samotný návrh aplikace, routování a podobné věci byl pořád na backendu v PHP.

Dnes se frontendem zpravidla rozumí všechno, co běží v prohlížeči.

Takže React je dnes nové PHP.

## PHP nestačí

## Ne vše musí být webová aplikace

## Server side rendering