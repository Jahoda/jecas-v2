---
title: "Automatické vypínání disku ve Windows"
headline: "Automatické vypnutí disku ve Windows"
description: "Windows automaticky vypíná pevný disk po 20 minutách nečinnosti. Jak vypínání zrušit?"
date: "2015-03-25"
last_modification: "2015-03-25"
status: 1
tags: ["produktivita", "windows"]
format: "html"
---

<p>Z důvodu úspory energie se ve Windows 7 ve výchozím stavu automaticky vypínají pevné disky po <b>20 minutách nečinnosti</b>. Problém je, že se tato nečinnost váže na používání daného disku, nikoliv na používání systému.</p>

<p>V případě používání více disků (například SSD pro systém a HDD pro data) ono <b>automatické vypínání</b> vede k situaci, kdy se méně používaný disk často <b>vypíná a zapíná</b>.</p>

<p>„Aktivovat“ vypnutý disk totiž může i pouhé přetažení souboru přes složku nacházející se na vypnutém disku v průzkumníkovi, zobrazení dialogu pro uložení souboru a další věci, které přímo nesouvisejí s požadavky na data. Zapnutí disku potom obvykle trvá <b>spoustu milisekund</b>, během kterých se právě prováděná činnost zasekne, což každého profíka akorát tak otráví.</p>

<p>Z těchto důvodu se hodí úsporné vypínání disku zrušit.</p>

<p>Nastavit dobu vypnutí disků jde v <code>Ovládací panely\Hardware a zvuk\Možnosti napájení</code> po úpravě aktivního schématu.</p>

<figure><img src="/files/vypnuti-disku/nastaveni-schematu.png" alt="Schéma napájení" class="border">
<figcaption>Změna aktuálního schématu napájení</figcaption>
</figure>


















<p>Doba pro vypnutí pevných disků je v <b>pokročilém nastavení</b>.</p>

<figure><img src="/files/vypnuti-disku/zmenit-nastaveni.png" alt="Pokročilé nastavení napájení" class="border">
<figcaption>Vyvolání pokročilého nastavení</figcaption>
</figure>



























<p>Zamezit vypínání disku jde zadáním hodnoty <code>0</code> místo výchozích dvaceti minut.</p>

<figure><img src="/files/vypnuti-disku/vypnout-po.png" alt="Nastavení doby, po které se má disk vypnout" class="border">
<figcaption>Nastavení doby vypnutí pevného disku</figcaption>
</figure>