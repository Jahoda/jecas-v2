---
title: "Atribut download"
headline: "HTML atribut <code>download</code>"
description: "HTML atribut <code>download</code> zlepšuje uživatelský dojem ze stahovaného souboru."
date: "2014-04-15"
last_modification: "2022-07-25"
status: 1
tags: ["HTML", "HTML atributy"]
---

## Zápis

```
&lt;a href="adresa-souboru" **download="Název souboru"**>
  Odkaz
&lt;/a>
```

## Podpora

Atribut `download` funguje jen v některých prohlížečích.

  - **Chrome 14+**

  - **Firefox 20+**

  - **Opera 15+**

## Využití

Atribut pro **stahování souborů** má hned dvě užitečné funkce.

    Umožňuje **nastavit název souboru** po stažení na disk.

    Cíl odkazu (`href`) tedy může být klidně nějaký nesmyslný hash, avšak (v podporovaných prohlížečích) se uloží pod uživatelsky přívětivým jménem, které do `download`u nastavíme.

    **Příponu souboru** je do `download`u možné zadat, ale **není to nutné** (přípona se potom převezme ze stahovaného souboru). Stejně tak není nutné zadávat samotný název (převezme se z názvu souboru).

    Atribut `download` vyvolá **dialog pro stahování** i u souboru známého typu (obrázek, HTML stránka).

    Ano, přidáním `download`u jde snadno nabídnout **stažení HTML stránky**.

    Řeší to tedy problém, kdy je cílem nabídnout soubor známého typu rovnou ke stažení. V PHP se to řeší třeba následovně:

    ```
header("Content-Type: application/download");
header("Content-Disposition: attachment; filename=$soubor");
header("Content-Length: " . filesize($soubor));
readfile($soubor);
```

    Stahování lze vyvolat **na straně klienta**. Stačí obsah uložit do odkazu přes [data URL](/data-uri) a přidat `download`. Po kliknutí prohlížeč nabídne stahování. [Ukázka](http://kod.djpw.cz/ducb-) stažení obrázku nakresleného do [`&lt;canvas>`u](/canvas).

## Ukázka

V podporovaných prohlížečích je možné vyzkoušet `download` přímo v akci:

    Stáhnout obrázek

    Stáhnout stránku

## Stažení souboru v JavaScriptu

Využít `download` atributu jde i v JS. Je tak možné uživateli umožnit cokoliv stáhnout po kliknutí jako soubor. [Ukázka](http://kod.djpw.cz/kngd)

```
function download(text, filename) {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}
```