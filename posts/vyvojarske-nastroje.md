---
title: "Vývojářské nástroje v prohlížečích"
headline: "Nástroje pro vývojáře v prohlížečích"
description: "Pro testování a ladění webu existují (nebo je lze snadno doplnit) ve všech rozšířených prohlížečích vývojářské nástroje."
date: "2013-05-17"
last_modification: "2013-05-18"
status: 1
tags: ["Produktivita", "Prohlížeče"]
---

## Internet Explorer

Nové IE mají vývojářský panel v základu, stačí stisknout klávesu F12. [Internet Explorer 11](/ie11) má **vývojářské nástroje** značně přepracované a obsahují [nové užitečné funkce](/ie11#vyvojarske-nastroje).

### IE 11

### IE 10

### IE Tester

Pro starší Explorery nebo IETester existuje doplněk DebugBar. V IETesteru se spouští kombinací kláves Alt + B.

## Google Chrome

Taktéže nabízí developerské nástroje pod klávesou F12

## Mozilla Firefox

Do tohoto prohlížeče je vhodné nainstalovat plugin Firebug, potom se rovněž bude spouštět klávesou F12.

## Opera

V Opeře se používá přítomný nástroj **Opera Dragonfly**. Jelikož v Opeře byla klávesa `F12` zabraná, lze ve výchozím nastavení použít *pohodlnou* zkratku Ctrl + Shift + I.

## Základní funkce

Ačkoliv je každý nástroj jiný, základní nejužitečnější funkce jsou podobné.

Prozkoumávání elementů
V případě, že nějaká část stránky nevypadá podle představ, touto funkcí se jí lze podívat na zoubek.

Ve Firefoxu (Firebugu) a Chrome, je při kliknutí pravého tlačítka dostupná volba „Prozkoumat/zkontrolovat prvek“.
V IE je tato volba pod ikonou šipky (nebo dostupná klávesovou zkratkou Ctrl + B).
V Opeře na kartě „Dokument“.

Po vybrání prvku se potom v levé části rozbalí umístění prvku v HTML stromu a v pravé části lze prohlížet, editovat, vypínat a přidávat kaskádové styly.

Připojení/síť
Na této kartě je k disposici přehled o průběhu načítání stránky. Lze tak vyzkoumat, co stránku nejvíce brzdí, kolik se přenese dat a kolik se použije HTTP požadavků. Pro detailnější přehled je užitečný doplněk PageSpeed (pro Chrome a Firefox).
Kromě toho lze touto funkcí jednoduše zjistit skutečné adresy multimediálních souborů (videí, obrázků, zvuků), které se stahují přes nějaký tajemný vložený objekt.
  
  Užitečná je možnost **omezit rychlost připojení**. Jenom je dobré ji nezapomenout vypnout, když testování skončí.

Chybová konsola
Pro odhalování chyb v JavaScriptu věc k nezaplacení. V Opeře je pod kartou „Chyby“ nebo ji lze otevřít do nového okna mimo Dragonfly zkratkou Ctrl + Shift + O. V ostatních prohlížečích pod stejnojmennou kartou.

Zakázání JS, cache, obrázků, …

V Exploreru lze pod položkou „Zakázat“ vypnout CSS a JS; pod položkou „Obrázky“ zase grafické obohacení stránky; a v nabídce pod položkou „Mezipaměť“ je možné vypnout cache (zvolit „Vždy aktualisovat ze serveru“).
Ve Firebugu lze zakazovat po kliknutí na malou šipku vedle jednotlivých záložek.
V Chrome jsou tyto možnosti v nastavení, do kterého se lze dostat kliknutím na ozubené kolečko vpravo dole.
A v Opeře v Dragonfly těžko říct… Ale lze si jednoduše přidat tlačítka nebo nainstalovat WebDevToolbar.-->

## Odkazy jinam

devtoolsecrets.com
Přehled funkcí ve vývojářských nástrojích (anglicky). S možností filtrovat jednotlivé funkce pro každý prohlížeč zvlášť.