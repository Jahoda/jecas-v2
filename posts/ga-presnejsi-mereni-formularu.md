---
title: "Přesnější měření  konversí v Google Analytics"
headline: "Přesnější měření  formulářů v Google Analytics"
description: "Jednoduchá cesta, jak spárovat zdroje odeslaných formulářů na webu s Google Analytics.  "
date: "2016-02-16"
last_modification: "2016-02-22"
status: 1
tags: ["Rady a nápady", "Google Analytics"]
---

Autorem článku je [Tomáš Smetka](https://www.smetka.net).

## Měření v Google Analytics 

[Google Analytics](/ga) vám po správném nastavení cílů umožní měřit, z jakých zdrojů k vám lidé přicházejí a projeví zájem o vaši službu – dejme tomu odesláním poptávkového formuláře či zavoláním. Měření formulářů může probíhat více způsoby – událostmi, zobrazení „thank you page“, parametry v URL apod.

Bohužel, reálné měření není příliš přesné (vyjímaje e-commerce), odeslání formuláře ještě neznamená, že návštěvník reálně vašich služeb využil.  

## Jak konverze zpřesnit

Na jednoduchém příkladu si ukážeme, jak odeslané formuláře **spárovat s Google Analytics**.

Dejme tomu, že provozujete luxusní kadeřnictví, investujete do on-line marketingu a chcete vědět, nakolik se vám investice reálně vrací.

Na webových stránkách máte umístěný on-line objednávkový formulář, pomocí kterého se potencionální zákazník může objednat.

V Google Analytics si nastavíte měření cílů, konverze se započítá po odeslání formuláře a zobrazení „thank you page“ (např. `/objednani-dokonceno`). Google Analytics této konverzi přiřadí zdroj návštěvy (cpc, organic, email apod.). Vy však víte, že se někteří objednaní zákazníci např. nedostaví, čímž je investice do marketingu reálně zmařená. Primárně tento stav nemůžete ovlivnit, nicméně můžete vyhodnotit kanály, které jsou pro vás přínosnější.

Je tu však možnost, jak měření zpřesnit. Ve formuláři můžete posílat **náhodně vygenerovaný kód** (popř. ID objednávky), který se po odeslání propíše také do URL – např. `/objednani-dokonceno?zakaznik=abcd`.

Tento kód pošlete spolu se zprávou do e-mailu, a tím si objednávku unikátně označíte v Google Analytics i v e-mailu. Úpravu formuláře je nutné svěřit vývoji.

**Související čtení** ohledně generování náhodných čísel a maskování identifikátorů objednávek:

    - [Zobrazení náhodného čísla](/nahodne-cislo)

    - [Jak zabezpečit číslo objednávky v e-shopu](/cislo-objednavky)

## Párování objednávek 

Nyní je nutné objednávky spárovat s daty v Google Analytics. V GA si otevřete záložku *Chování → Obsah webu → Všechny stránky*. Zobrazí se všechny stránky, které kdy Google Analytics zaznamenal. Ve vyhledávacím poli vložte URL stránky za lomítkem bez náhodného klíče – „`?zakaznik=`“.

Ve filtru „Sekundární dimenze“ poté zvolte „Zdroj / médium“, následně GA vrátí seznam stránek, resp. „objednávek“.

Tento přehled si stáhněte. V horní části GA klikněte na „Export“, poté zvolte „Excel (XLSX)“. Prohlížeč vám přehled stáhne do Excel listu, ve kterém je uveden seznam stránek se zdroji a  URL obsahuje ID objednávky.

Nyní je nutné data spárovat s vašimi objednávkami. Dle ID si přiřaďte jméno, příjmení či další informace, poté si můžete spočítat reálný přínos různých on-line kanálů.

## Sofistikovanější a pohodlnější řešení 

Výše jsem popsal naprosto triviální postup aplikovatelný z praxe u jednoduchých webů. Tímto způsobem můžete zjistit, že lidé, kteří reálně přišli z Skliku přinášejí nižší tržby než lidé z Google AdWords či naopak a využívat tak lépe kanály.

Dnes doporučuji odeslané formuláře ukládat do databáze, data z Google Analytics můžete nahrát do vašeho on-line systému a nechat je párovat přímo aplikací. Tento postup vyžaduje hlubší znalosti na straně vývoje.

## Úskalí a doporučení 

Náhodný klíč, popřípadě ID jsem doporučuji z následujícího důvodu – Google Analytics oficiálně **zakazuje identifikovat uživatele**. Postupu, při kterém se  do URL propisuje jméno, příjmení či e-mail, bych se raději vyhnul.

Na webovou analytiku je také třeba pohlížet v kontextu. Je nutné brát v potaz asistované konverze, **first vs. last click**, offline konverze z mobilních telefonů atd.

Zdroje vyexportovaných stránek z postupu výše jsou z last clicku (poslední zdroj). První zdroj může být naprosto jiný, zákazník se o vás mohl dozvědět např. z katalogu firmy.cz, poté se proklikl z organického vyhledávání a nakonec  z Google AdWords. Tento poslední zdroj se také zobrazí u dané objednávky.

## Další zdroje

	Měření
	volání na telefonní čísla na webu
	Měření
	offline konverzí
	Porovnání
	metrik konverzí v Analytics a AdWords