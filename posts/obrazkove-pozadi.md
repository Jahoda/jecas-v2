---
title: "Fotografie na pozadí"
headline: "Velký obrázek na pozadí stránky"
description: "Jak správně udělat obrázkové pozadí celé stránky, které se přizpůsobí velikosti okna."
date: "2013-08-12"
last_modification: "2013-08-14"
status: 1
tags: ["CSS", "Rady a nápady", "Obrázky"]
---

Pokud webová stránka nemusí být vždy přes celé okno nebo to nechceme, je prostor kolem ní umístit nějaký líbivý obrázek, texturu nebo fotografii.

Jak ale zajistit, aby to dobře vypadalo? Tedy se například řádně:

  - **roztáhla dle velikosti okna**,

  - **navazovala na sebe v případě opakování**

## Roztažení obrázku dle okna prohlížeče

Asi nejednodušší je obrázek nechat roztáhnout na 100 % šířky. Dosáhnout se toho dá použitím CSS vlastnosti `background-size`.

    .roztahnout-cele {background-size: 100% 100%}
    .roztahnout-sirku {background-size: 100%}
    .roztahnout-vysku {background-size: auto 100%}
    .roztahnout-cover {background-size: cover}
    .roztahnout-contain {background-size: contain}

  var roztahnout = document.getElementById("roztahnout");

      Roztáhnout – `background-size: 100% 100%`
    Roztáhnout na šířku – `background-size: 100%`
    Roztáhnout na výšku – `background-size: auto 100%`

Kromě přesných rozměrů lze ještě provést roztažení klíčovými slovy `cover` a `contain`.

      Roztáhnout „`cover`“ – `background-size: cover` – roztáhne se, aby se celý prostor vyplnil, část obrázku nemusí být vidět
    Roztáhnout „`contain`“ – `background-size: contain` – roztáhne se, aby se celý obrázek vešel se zachováním poměru stran

### Řešení pro starší prohlížeče

CSS vlastnost `background-size` funguje až od **Internet Exploreru 9**, pro starší existují minimálně **dvě různá řešení**.

  - Obrázek vložit jako obyčejný obrázek (`&lt;img&gt;`), nastavit mu stoprocentní rozměry a absolutně jej naposicovat za stránku.

  Použít `filter`:
  ```
filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(
src='**obrazek.jpg**',
sizingMethod='scale');
```

### Problém roztahování

Problematické při roztahování je, že většinou obrázek bude mít **jiné rozměry**, než zrovna má plocha, kterou má vyplnit.

  - Bude tedy buď **příliš malý** a roztažení **nebude dvakrát pěkné**,

  - nebo bude příliš **velký** a zmenšování bude **plýtvání daty**.

## Fixní posice

Občas je hezké ještě obrázek zafixovat, čímž bude pořád vidět i při odrolování stránky. Stačí nastavit obrázku fixní posici:

```
body {…; background-attachment: fixed}
```

## Centrování obrázku

Vycentrování obrázku řeší problém roztahování tím, že se při menších rozlišeních objeví z obrázku **jen menší část, výřez** v originální kvalitě.

```
body {
  background-image: url(velky-obrazek.jpg);
  background-position: **center**;
  background-repeat: no-repeat
}
```

  function zmenVelikost(sirka, vyska) {
  var centrovac = document.getElementById("centrovac");
    centrovac.style.width = sirka + "px";
    centrovac.style.height = vyska + "px";
  }

Změnit velikost:         Velikost 400×156Velikost 250×98Původní

## Opakování obrázku

Dobré je, když se obrázek může opakovat – tedy na sebe *navazuje*, potom lze s malým (**i datově**) obrázkem hezky zaplnit celé pozadí. Vyžaduje to ale přípravu takového obrázku už v **grafickém editoru** a u fotografií je to dost komplikované.

### Zrcadlení

Jakž takž může pomoci vhodný výřez a jeho zrcadlení — zajistí se tím, že bude fotografie *navazovat*. Ale jak je vidět na ukázce, ani to u nevhodného obrázku nevypadá úplně přirozeně.

## Přechod do ztracena

Problém opakování u fotografií můžeme vyřešit vytvořením přechodu do ztracena, kdy na fotku naváže jednobarevné pozadí nastavené přes `background-color`.

Na předchozím příkladu je tak zakončen vršek obrázku.

## Odkazy jinam

  - [Perfect Full Page Background Image](http://css-tricks.com/perfect-full-page-background-image/)

  - [Řešení roztahování pro starší IE v jQuery](http://louisremi.github.io/jquery.backgroundSize.js/demo/)

  - [Generátor trojúhelníkového pozadí](http://msurguy.github.io/triangles/)