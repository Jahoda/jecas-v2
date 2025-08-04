---
title: "CSS sprite"
headline: "CSS sprite"
description: "Spojení všech obrázků do jednoho (CSS sprite) zrychlí načítání webu. Hotový generátor v PHP."
date: "2013-11-22"
last_modification: "2013-12-10"
status: 1
tags: ["CSS", "Hotová řešení", "PHP"]
---

Tzv. **CSS sprite** je technika pro **zrychlení webu**, kdy se (pokud možno) všechny obrázky na stránce vloží do **jednoho společného obrázku**. Úspora je v snížení **HTTP požadavků**, které zvlášť u připojení s dlouhou odezvou výrazně **zpomalují načítání**.

Je pomalejší načíst **X malých obrázků** než **jeden velký** (sprite).

## Data URL (`data:image/gif;base64,…`)

Jiná možnost, jak ušetřit HTTP požadavky, je vkládat obrázky přes [pseudo-protokol `data:*`](/data-uri).

Obrázek může zakódovat [online generátor](http://dopiaza.org/tools/datauri/index.php) nebo pár řádků PHP s využitím funkce `base64_encode`:

```
&lt;?php 
$obrazek = file_get_contents("logo.png");
echo "&lt;img src='data:image/png;base64," . 
      base64_encode($obrazek) . 
      "'>";
```

**Nevýhoda** tohoto řešení je, že:

  - není funkční v **IE 7** (v **IE 8** je limit 32 kB),

  - takto vložený obsah se **nebude kešovat**.

Nyní zpět k CSS spritům…

## Jak to funguje?

  - Všechny typově stejné obrázky (GIF, PNG, JPG) se spojí do jednoho.

  - V **CSS** se vytvoří element s nastavenými rozměry dle obrázku a výřezem ze *spritu*. Zobrazení správného obrázku zajistí `background-position`.

  - Do **HTML kódu** se vloží místo značky `&lt;img>` nějaký `&lt;span>`/`&lt;div>` (v CSS frameworcích je často k vidění i značka `&lt;i>`) s přiřazeným *výřezem* velkého obrázku.

Případně se části obrázků mohou nastavovat přímo jako pozadí elementů, ale vyžaduje to promyšlenější spojení jednotlivých obrázků.

  Příklad CSS sprite z **YouTube** a **Facebooku**:

### Posice obrázku

Obrázky na pozadí jsou nadefinovány v kaskádových stylech. Ideálně jednou společnou třídou pro všechny CSS obrázky. Konkrétní třída potom nastaví jen `background-position`.

#### CSS

```
.obrazek {
  background: url(css-sprite.png); 
  width: 16px; 
  height: 16px; 
  display: block;
}
.logo {
  background-position: 0 0;
}
```

#### HTML kód

```
&lt;span class='obrazek logo'>&lt;/span>
```

### Opakování obrázku

Vytvoření CSS spritu se trochu komplikuje, když se má nějaký obrázek na stránce **opakovat**.

  - Má-li se obrázek opakovat vodorovně (`repeat-x`) musí být přes celou **šířku** CSS spritu.

  - V případě opakování svisle (`repeat-y`) naopak musí být opakující se obrázek přes **celou výšku**.

## Příklad

Následující spirte je z [diskuse](http://diskuse.jakpsatweb.cz).

Při zjišťování souřadnic pro `background-position` si je třeba uvědomit, že posice **[0, 0]** je na obrázku vlevo nahoře. Pro další obrázky je proto nutné zadávat **záporné hodnoty**.

```
.ikona {
  background-position: *-***počet px zleva** *-***počet px shora**
}
```

Hodnoty můžou být i **kladné**, ale musí se použít *složitý* výpočet (odečíst posici od šířky/výšky spritu):

```
.ikona {
  background-position: šířka*-***počet px zleva** výška*-***počet px shora**
}
```

Nevýhoda kladných hodnot v `background-position` spočívá v závislosti na rozměru sloučeného obrázku. Když se ten změní (přidá se do něj další obrázek), bude se posice **muset přepočítat**. Záporné hodnoty tímto netrpí.

[](#)

    .ico {width: 16px; height: 16px; display: inline-block; background: url(/files/css-sprite/djpw-sprite.png)} /* Rozměry spritu: 389 × 150 px */
    .empty {background-position: -17px -73px}
    .sticky {background-position: 321px 77px} /* alternativně: -68px -73px */ 
  
  Některé *hotové* ikony: 

### Efekt po najetí

U `:hover` efektů (po najetí myši) nabízí posunutí pozadí CSS spritu výhodu, že se **nemusí stahovat další obrázek** a nehrozí tak případná prodleva, než se tak stane.

## Automatický CSS sprite

Vytvořit a udržovat obrázky v CSS sprite je přece jenom o něco složitější, než je klasický postup samostatných obrázků.

V případě **ručního vytváření** je vhodné separátní obrázky seskupit do spritu až **při dokončování stránky**. Nebo vytváření CSS spritů **zautomatisovat**…

### Online generátor CSS spritů

První možnost je využít nějakou online službu, kam se nahrají obrázky, a ta automaticky připraví potřebný CSS sprite, CSS definice a HTML kódy pro jednotlivé obrázky.

[Sprite sheet generator Stitches](http://draeton.github.io/stitches/)

### SpriteMe bookmarklet

Web [SpriteMe](http://spriteme.org/) umí projít už existující web a navrhnout, co by šlo předělat do spritů. A vytvoří potřebné obrázky i CSS definice.

### Compass

CSS rozšíření Compass umožňuje mj. i [automatickou tvrobu CSS spritů](http://compass-style.org/help/tutorials/spriting/).

### PageSpeed Module (`mod_pagespeed`)

Rozšíření webového serveru Apache, které se snaží **zrychlit stránky**. Jedna část se přímo zabývá [automatickým vytvářením CSS spritů](https://developers.google.com/speed/pagespeed/module/filter-image-sprite) z **PNG a GIF** obrázků.

Bohužel mi není známo, že by tento modul nějaký český hosting podporoval.

[PageSpeed Module](https://developers.google.com/speed/pagespeed/module)

## Generování spritů v PHP

Při vytváření webů v PHP by se hodilo i generování CSS spritů přímo v PHP.

### Je čas CSS sprite generátor

Napsal jsem jednoduchý generátor CSS spritů v PHP, který je možné **stáhnout**:

[Download](/files/css-sprite/php-generator.rar)

Skript potřebné HTML, CSS a spojený obrázek automaticky vygeneruje. Testováno jen pro **PNG obrázky** (měla by fungovat i **průhlednost**).

#### Postup

Týká se **vývoje stránky**. V ostrém provozu stačí překopírovat vygenerované CSS mezi ostatní styly:

  Skript `css-sprite.php` se umístit do složky s obrázky.

  Zároveň se přilinkuje jako **CSS soubor**:

    ```
&lt;link rel="stylesheet" href="./**css-sprite.php**">
```

  Nyní by následující kód měl vložit obrázek (příslušný výřez ze spritu).

  ```
&lt;div class="image nazev-obrazku-bez-pripony">&lt;/div>
```

  Výsledný spirte se ukládá to téže složky pod názvem `sprite.png`.

Hotový vygenerovaný obrázkový sprite by možná ještě šlo následně [datově optimalisovat](/optimalisace-obrazku).

## Odkazy jinam

  - [Sprite Cow](http://www.spritecow.com/) – pohodlný způsob, jak spojené obrázky *rozřezat*