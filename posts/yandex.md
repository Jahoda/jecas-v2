---
title: "Yandex prohlížeč"
headline: "Prohlížeč Yandex"
description: "Co nabízí webový prohlížeč Yandex Browser."
date: "2014-11-30"
last_modification: "2014-11-30"
status: 1
tags: ["Produktivita", "Prohlížeče"]
---

Prohlížeč Yandex používá vykreslovací jádro Blink (**Chrome**, **Opera 15+**). Několik let to byla celkem věrná kopie prohlížeče **Chromium** (open-source prohlížeč). Později přišel **Yandex** s novou podobou **rozhraní**, které se významně liší od ostatních prohlížečů.

[Web s alfaversí prohlížeče](http://browser.yandex.com/future/)

Hlavní rozdíl je **minimalisace** ovládacích prvků.

    Po spuštění prohlížeče jsou na pohyblivém pozadí viditelná jen tlačítka pro otevření **oblíbených webů** a velké pole pro **zadání URL nebo vyhledávání**.

    Při **prohlížení stránek** potom veškeré rozhraní sestává z **horní lišty** s názvem webu (po kliknutí se je možné dostat k URL – jinak není vůbec viditelná).

    **Přepínání mezi záložkami** je realisováno prostřednictvím panelů v dolní části. To je docela revoluční myšlenka (obvykle bývají *taby* nahoře), ale není s tím problém. Z pohledu použitelnosti by to mohlo být i výhodnější

    Hezké je zbarvování záhlaví a záložek do **barvy webu**. Jednotlivé taby přebírají barvu favicony, což zlepšuje přehlednost. Za záhlavím potom **prosvítá obsah stránky**, což vypadá zvlášť dobře u webů z **fixní hlavičkou**, která se visuálně *slije* se záhlavím.

    Přístup do **menu** je možný přes ikonu vpravo nahoře.

## Hlavní funkce

    **Gesta myší** jsou rovnou v prohlížeči a zapnuté. Některá gesta jsou ale trochu jinak, než je tomu běžné v **Opeře** (třeba nová záložka ↑). V nastavení není volba pro jejich vlastní definici.

    **Synchronisace** je možná přes **Yandex účet**. Po nainstalování si prohlížeč dokázal naimportovat obsah z **Chrome** (včetně přihlášení k webům).

    **Rozšíření** se dají používat z [prohlížeče Opera](https://addons.opera.com/en/extensions/). Není proto problém prohlížeč doplnit o **blokování reklam** nebo používat **správce hesel** typu LastPass. Přímo v nabídce *Extensions* jsou některá rozšíření doporučená.

  - Pro zrychlení načítání stránek na **horších připojeních** je přítomné **Opera Turbo**.

## Idetifikátor `user-agent`

Prohlížeč **Yandex** posílá v hlavičce *user-agent* řetězec `YaBrowser`.

```
Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 **YaBrowser**/14.10.2062.12544 Safari/537.36

```