---
title: "Odkud návštěvník přišel"
headline: "Odkud návštěvník přišel"
description: "Jak zjistit odkazující stránku, ze které návštěvník přišel."
date: "2015-08-09"
last_modification: "2015-08-09"
status: 0
tags: []
---

Z různých důvodů se hodí mít přehled o zdrojích, které **přivádějí návštěvníky na web**.

**Odkud někdo odkazuje** se hodí vědět třeba v případě, že odkazující stránka reaguje na obsah webu a je žádoucí si toho všimnout a reagovat zpět.

Odkazující stránky jde zjistit různými způsoby. Převážně se liší rychlostí, kdy se o tom provozovatel webu dozví.

## Odkazující stránky v Google Search Console

Webová služba [**Google Search Console**](https://www.google.com/webmasters/tools/) (dříve *Google Webmaster Tools*) disponuje přehledem odkazů, které na daný web míří. Tento seznam se nachází pod *Návštěvnost z vyhledávání → Odkazy na vaše stránky*:

Přehled odkazující stránek ale není moc použitelný. Jsou zobrazovány pouze **domény** a seznam ani nejde například **filtrovat podle časového období**.

## Zjištění zpětných odkazů

Existuje řada služeb, které monitorují odkazy mezi weby a jsou schopny je zobrazovat.

Bývají placené, ale něco zobrazí i zdarma:

    - Nástroje pro kontrolu a analysování stránky: [Zpětné odkazy](/kontrola-stranky#zpetne-odkazy)

## Zdroj návštěvnosti v Google Analytics

V nástroji [Google Analytics](/ga) je tento přehled v nabídce *Akvizice → Všekerá návštěvnost → Odkazy*.

Pro zjišťování příchozí návštěvnosti i z jiných zdrojů jako jsou **vyhledávače, RSS neboo sociální sítě** slouží položka o řádek výš – *Zdroj/médium*.

[GA - návštěvnost - zdroje návštěvnosti ](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=13&amp;topic=164120)

## Vlastní řešení v PHP

Pomocí [PHP](/php) jde relativně jednoduše zaznamenávat odkazující stránky, ze kterých někdo přišel. Slouží k tomu HTTP hlavička referer – je dostupná v proměnné `$_SERVER`:

```
Odkazující stránka: &lt;?=$_SERVER["HTTP_REFERER"]?>
```

Tuto hodnotu stačí někam uložit (soubor/database) a to je všechno.

## Miniaplikace.blueboard.cz

Jednoduché hotové řešení nabízí počítadlo na miniaplikace.blueboard.cz. Po vložení krátkého skriptu do stránky kromě počtup přístupů zaznamenává i odkazující stránky.

Zobrazuje se jen 50 adres, ze kterých přišlo nejvíce lidí. To většinou pro menší weby stačí, protože významnější odkazy se do tohoto přehledu v pohodě dostanou.

## Toplist

Odkazující stránky umí zobrazit i počítadlo od Toplistu.