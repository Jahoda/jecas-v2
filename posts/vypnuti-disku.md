---
title: "Automatické vypínání disku ve Windows"
headline: "Automatické vypnutí disku ve Windows"
description: "Windows automaticky vypíná pevný disk po 20 minutách nečinnosti. Jak vypínání zrušit?"
date: "2015-03-25"
last_modification: "2015-03-25"
status: 1
tags: ["Produktivita", "Windows"]
---

Z důvodu úspory energie se ve Windows 7 ve výchozím stavu automaticky vypínají pevné disky po **20 minutách nečinnosti**. Problém je, že se tato nečinnost váže na používání daného disku, nikoliv na používání systému.

V případě používání více disků (například SSD pro systém a HDD pro data) ono **automatické vypínání** vede k situaci, kdy se méně používaný disk často **vypíná a zapíná**.

„Aktivovat“ vypnutý disk totiž může i pouhé přetažení souboru přes složku nacházející se na vypnutém disku v průzkumníkovi, zobrazení dialogu pro uložení souboru a další věci, které přímo nesouvisejí s požadavky na data. Zapnutí disku potom obvykle trvá **spoustu milisekund**, během kterých se právě prováděná činnost zasekne, což každého profíka akorát tak otráví.

Z těchto důvodu se hodí úsporné vypínání disku zrušit.

Nastavit dobu vypnutí disků jde v `Ovládací panely\Hardware a zvuk\Možnosti napájení` po úpravě aktivního schématu.

Změna aktuálního schématu napájení

Doba pro vypnutí pevných disků je v **pokročilém nastavení**.

Vyvolání pokročilého nastavení

Zamezit vypínání disku jde zadáním hodnoty `0` místo výchozích dvaceti minut.

Nastavení doby vypnutí pevného disku