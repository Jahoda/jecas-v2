---
title: "Jak získat náhled webu?"
headline: "Získání náhledu/obrázku webu"
description: "Jak lze automaticky získat obrázkový náhled webové stránky."
date: "2013-06-25"
last_modification: "2013-06-25"
status: 1
tags: ["Seznam", "Hotová řešení", "Rady a nápady"]
---

**Zobrazení náhledu stránky** je možné docílit několika způsoby s využitím různých hotových nástrojů.

## Využití náhledů ze Seznamu

Screenshotátor Seznamu prochází stránky a ukládá jejich screenshoty. Můžeme toho využít ve vlastní prospěch. Obrázek v rozlišení 100 × 75 pixelů snadno získáme na URL:
```
http://fimg.seznam.cz/?spec=ft100x75&amp;url=**http://jecas.cz**
```

## ShrinkTheWeb

Jedná se o webovou službu, která po jednoduché registraci umožní rovněž velmi pohodlně získávat obrázky webů. Do 5 000 požadavků za měsíc je služba zdarma.

-->

Stránka ShrinkTheWeb

## Websnapr

Podobná služba nabízející zdarma dokonce 100 000 náhledů měsíčně. V tarifu zdarma ale přidává vodoznak.
Stránka Websnapr

## Snapito!

Vytváří malé náhledy i obrázek celého webu. Po zadání e-mailu a hesla, nabízí pohodlné API.

-->
Stránka Snapito!

## Web Screenshots

Zajímavá služba tvořící obrázky celé stránky, limit je 10 stránek na hodinu. Naneštěstí tato služba nemá API, takže by bylo potřeba napsat si vlastní rozhraní pro získávání obrázků.
Web Screenshots

## URL2PNG

Zde dostupné pohodlné API je, nicméně služba není zdarma (měsíčně $30 za 3 500 obrázků).
Stránka služby URL2PNG

## Browsershots &amp; BrowserStack

Tyto služby umí dělat i náhledy úplně celé stránky, bohužel:

**Browsershots.org** má složitěji použitelné API a na obrázky se dlouho čeká,
**BrowserStack.com** zase není zdarma.

## Stažení obrázku k sobě na server v PHP

Může vypadat následovně.
```
&lt;?php
$url = "jecas.cz";
$nahled = file_get_contents("http://adresa-sluzby.com/?url=$url");
file_put_contents("cesta/k/nahledum" . $url. ".jpg", $nahled);
```

## Živý náhled stránky

Je to spíš taková kuriosita, ale zmenšeninu webu je možné vytvořit i ze stránky vložené do `&lt;iframe>` a jeho **zmenšením v CSS**: `transform: scale(.3)` (s příslušnými [prefixy](/css-prefixy)). [Ukázka](http://kod.djpw.cz/wqv).

Takový *náhled* bude živý. Nevýhoda je, že to dost zpomalí načítání stránky, kde bude *náhled* umístěn, protože se bude načítat i ta kompletní stránka v rámu.

Kromě toho řada stránek **vložení do rámu blokuje** hlavičkou `X-FRAME-OPTIONS`.