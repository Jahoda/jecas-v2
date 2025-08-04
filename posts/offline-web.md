---
title: "Offline webová stránka"
headline: "Offline webová stránka"
description: "Jak umožnit návštěvníkům stažení celé webové stránky pro prohlížení offline, umístění na CD apod."
date: "2013-12-23"
last_modification: "2013-12-24"
status: 1
tags: ["JavaScript", "Hotová řešení", "Rady a nápady", "PHP", "Offline"]
---

Pro vytvoření verse webu ke stažení existuje několik možností.

## Stahovací programy

Asi nejjednodušší možnost je využití stahovacího programu, který prošmejdí celý web a uloží z něj statickou kopii **sestávající z HTML souborů**.

Osvědčený je třeba nástroj **HTTrack**.

[Web programu HTTrack](http://www.httrack.com/)

Takto je možné stáhnout prakticky libovolný statický i **dynamický** web.

## Statické stránky

Je-li celý web ve statických HTML stránkách, je situace prostá. Stačí obsah zkopírovat a máme **offline versi**.

## Dynamické stránky

U webu generovaného dynamicky nějakou serverovou technologií třeba z databáse je potom postup trochu komplikovanější. Tedy v případě, že chceme generovat **aktuální obsah pro stažení** (a nepoužít tedy HTTrack).

### Vygenerování statických stránek

V případě, že dynamická stránka **HTML výstup cachuje** do statických souborů, je rovněž hotovo. V opačném případě se hodí generování statické offline stránky ke kešování využít.

Zachytit a uložit obsah jde v PHP následovně:

```
ob_start();
echo "Nějaký výpis";
file_put_contents("nazev-souboru.html", ob_get_clean());
```

Hotové řešení včetně balení do [ZIP archivu](http://php.vrana.cz/verze-ke-stazeni.php).

## Celý web v jednom souboru

Docela zajímavá myšlenka je umístit celý web do **jednoho souboru HTML**. Jak na to?

  - Skripty a styly vložit jako interní.

  - Obrázky vložit přes [pseudoprotokol `data`](/data-uri).

  - Všechen obsah umístit do JavaScriptového objektu.

  - Přepsat adresy na volání JS funkce, která bude z objektu s daty načítat jednotlivé stránky.

[Ukázka tohoto webu](http://jecas.cz/files/download/jecas.cz.html) 

  - [Zjednodušená ukázka principu](http://kod.djpw.cz/fhv)

  - [Zdrojový PHP kód](https://github.com/Jahoda/web-jeden-soubor)

Nevýhoda tohoto postupu je, že se úplně nekamarádí s ukázkami v JavaScriptu na jednotlivých stránkách. Nicméně to u standardního webu nemusí vadit.

  - Zprovoznit „tlačítko zpět“ (ukládání do historie) [jde pomocí `history.pushState`](/zmena-url).

  - Okamžité vyhledávání/filtrování by šlo udělat přímo v JS.

## Cache manifest v HTML 5

HTML 5 přináší tzv. [cache manifest](http://en.wikipedia.org/wiki/Cache_manifest_in_HTML5). Tím je možné prohlížeči naznačit, že si má uvedené URL pamatovat a při nedostupném připojení (offline režimu) je zobrazovat z cache.