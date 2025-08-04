---
title: "Zvýraznění syntaxe kódu"
headline: "Obarvení zdrojového kódu"
description: "Barvení zdrojových kódů na webových stránkách."
date: "2014-03-12"
last_modification: "2014-03-12"
status: 0
tags: []
---

Na webech, kde se **objevuje zdrojový kód**, bývá zvykem, že je pro lepší přehlednost obarven jako při používání programátorského textového editoru.

  Zvýrazňování zdrojového kódu se anglicky nazývá spojením *Syntax Highlighting*, nástroj pro zvýraznění potom obvykle jako *Syntax Highlighter*.

Kód s barevně odlišenou syntaxí potom může vypadat následovně:

## Jak zvýraznit kód

Existuje řada možností, jak dosáhnout obarveného kódu:

    **Zvýrazňování na straně serveru** (například v PHP).

    Barvení **v prohlížečí návštěvníka pomocí JavaScriptu**.

    **Export obarveného kódu z programátorského editoru**.

    Vložení [screenshotu](/screenshot) s kódem z programátorského editoru (značně nepraktické kvůli obtížnému kopírování).

## Zvýrazňování syntaxe v JS

Existuje řada hotových řešení pro obarvení kódu v prohlížeči návštěvníka (tzv. na straně klienta).

Výhoda je ve **snadné instalaci** – obvykle stačí připojit jeden JS soubor, jedno CSS a barvení může začít.

Zdrojový kód článku tak neobsahuje hromady obalujících značek pro zvýraznění jeho jednotlivých částí.

### JUSH – JavaScript Syntax Highlighter

[JavaScript Syntax Highlighter](http://jush.sourceforge.net/)

Hlavní schopností je zvýrazňování bloků kódu, kde se **míchá několik různých programovacích jazyků** (např. HTML, PHP, SQL, CSS a JavaScript).

Další zajímavá vlastnost je vytváření **odkazů do dokumentace** z klíčových slov. Kvůli tomu je ale JUSH trochu datově větší (cca 60 kB při GZIP kompresi).

### Prism.js

[prismjs.com](http://prismjs.com/)

## Barvení kódu v PHP

I zvýrazňování na straně serveru má své výhody. Především odstraňuje nehospodárné zvýrazňování stále té stejné stránky při každém načtení.

U delších kódů může být **znatelná prodleva**, než se pomocí JavaScriptu obarví; to se při zvýrazňování na straně serveru nestane – tedy v případě, že je výsledné HTML s obarveným kódem ukládáno do cache, aby se nemuselo stále znovu a znovu zvýrazňovat na serveru při **každém načtení stránky**.

http://scotch.io/bar-talk/get-beautiful-syntax-highlighting-for-your-website-code

  - Sitepoint.com: [Everything You Need to Know About HTML’s ‘pre’ Element](http://www.sitepoint.com/everything-need-know-html-pre-element/)

  - [25 Syntax Highlighters: Tried and Tested](http://webdesign.tutsplus.com/articles/25-syntax-highlighters-tried-and-tested--cms-23931) – nástroje pro barvení kódu na webu i v editorech

  - Martin Zlámal: [Použití Texy s FSHL](http://zlml.cz/pouziti-texy-s-fshl)