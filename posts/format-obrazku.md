---
title: "Jaký zvolit formát obrázku"
headline: "Jaký formát obrázku použít na webu"
description: "PNG, GIF, JPG? Který datový formát obrázku volit pro použití na webové stránce."
date: "2015-03-06"
last_modification: "2015-03-11"
status: 1
tags: ["Obrázky"]
---

Při vkládání grafiky a ilustračních obrázků na webové stránky existuje hned několik typů/formátů obrázků, které se hodí pro určité případy.

## Volba formátu

Zjednodušený způsob rozhodování je následující.

  - Jedná se o fotografii? Použít **JPG**. Nebo **PNG**, pokud nevadí datová velikost.

  - Sestává obrázek z více souvislých ploch stejné barvy a ostrých přechodů mezi nimi (např. černý text na bílém pozadí)? Použít **PNG** nebo **GIF**.

  - Jde hlavně o kvalitu? Použít **PNG**.

  - Je cílem průhlednost obrázku? Zvolit **GIF** nebo **PNG**. Pro částečnou průhlednost se hodí pouze **PNG**.

  - Má se obrázek hýbat? Nezbývá než použít **GIF**.

## Porovnání obrázků v různých formátech

Ze srovnání PNG (4 kB), JPG (10 kB) a GIFu (12 kB) formátu následujícího obrázku vychází nejlépe PNG při nejnižší datové velikosti.

Formáty GIF a JPG zobrazují oproti PNG nižší rozsah barev. JPG trpí nepěknými artefakty na místech přechodů dvou barev (například kolem písmen).

  Změnit na: 
  Obrázek PNG
  JPG formát
  Obrázek v GIF

(Po najetí myší se obrázek přiblíží a po kliknutí změní na následující.)

    p[data-image] img {
      display: none;
      
      transform: scale(1) translate(0, 0);
      transition: transform .2s;
    }
    p[data-image] {
      overflow: hidden;
    }    
    p[data-image=png] .png,
    p[data-image=jpg] .jpg,
    p[data-image=gif] .gif {
      display: block;
    }
    p[data-image]:hover img {
      transform: scale(1.8) translate(20%, -20%);
    }

### Fotografie

V případě fotografie jsou nedostatky JPG komprese běžným okem velmi málo rozeznatelné a navíc má JPG nižší datovou velikost než PNG (34 kB JPG vs. cca 80 kB PNG/GIF), což za lehce nižší kvalitu většinou stojí. GIF je kvůli nízkému počtu podporovaných barev (256) pro fotografie často nedostatečný.

  Změnit na: 
  Obrázek PNG
  JPG formát
  Obrázek v GIF

## JPG

Formát JPG se hodí na fotografie, u kterých se díky **ztrátové kompresi** dá ušetřit hodně datového objemu a lehká ztráta kvality při běžném pozorování příliš nevadí.

JPG formát byl navržen speciálně pro **fotografie**, takže většinou nenabízí uspokojivou kvalitu, pokud je obsahem něco jiného než fotka. Následující obrázek znázorňuje hlavní **rozdíl mezi JPG a PNG** při uložení textu na obrázku.

Kvůli nevyhnutelné ztrátě kvality při uložení není tedy JPG ani příliš vhodný pro ukládání **zdrojových souborů**.

Při exportu v grafickém editoru je možné nastavit úroveň komprese, čímž jde snižovat datovou velikost na úkor kvality.

  Příklad nastavení kvality JPG při exportu v [IrfanView](http://www.irfanview.cz/)

## PNG

PNG je vhodné typicky pro webovou/počítačovou grafiku. Jeho komprese je bezztrátová, čili výsledek 100% odpovídá originálu.

Nevýhoda je vysoká datová velikost oproti JPG při **ukládání fotografií**.

Pomocí PNG jde vytvářet i **průhledné obrázky**. Průhlednost může být úplná nebo částečná – někdy označováno jako *průhlednost* a *průsvitnost*.

(Kliknutím na obrázek se změní jeho prosvítající pozadí.)

Tzv. průsvitnost / poloprůhlednost / podpora *alfa kanálu* u PNG standardně funguje od **IE 7**.

## GIF

GIF jde často používat jako alternativu k PNG – je rovněž **bezztrátový**. Nevýhoda oproti PNG je ale jeho **maximální počet barev omezený na 256**, což často nemusí stačit. Kromě toho má GIF horší kompresi a není možné ho udělat průsvitný (chybí podpora alfa kanálu), podporována je jen obyčejná průhlednost.

Nedává tedy příliš smysl dát přednostu GIFu před PNG. S jedinou výjimkou, což je **animace**, kde není na výběr („animované PNG“ – tzv. APNG má slabou podporu v prohlížečích).

Obrázek v GIFu je universální způsob s nejlepší podporou napříč prohlížeči pro umístění něčeho, co se má hýbat.

    - [Video-záznam obrazovky do GIFu](/video-gif) – uložení videa do GIFu

## Volba formátu v praxi

### Do čeho uložit screenshot

Pro snímky obrazovky se většinou hodí použít PNG, v případě použití JPG bude výsledek pokažen již zmíněnými artefakty kolem textu.

### Smíšený obrázek

Asi největší problém přináší smíšení fotografie s textem. Dochází k situaci, kdy by:

  - pro fotku byl vhodný JPG,

  - pro text byl vhodný PNG

Je nutné zvolit kompromis – tedy spojit nevýhody obou řešení. Mít datově obrovský ale kvalitní PNG nebo malé JPG s artefakty kolem textu.

Ideální je nesourodé části obrázků rozdělit na dva obrázky a spojit je až visuálně pomocí HTML/CSS.

## Rozměry obrázku

Ideální je obrázky na stránce zobrazovat v jejich skutečném rozlišení. Prohlížeče je sice umí zvětšit nebo zmenšit, lepší kvality se ale většinou dosáhne přímou **úpravou v grafickém editoru**.

Někdy ale není na výběr či je zachování skutečného rozlišení příliš komplikované.

## Datová velikost

Po videu a animovaných reklamách bývají obrázky datově nejnáročnějším prvkem webových stránek. Úprava obrázků tak často nabízí velký prostor pro **zrychlení načítání stránky** s minimální či žádnou změnou kvality.

    - [Hromadné datové zmenšení obrázků](/optimalisace-obrazku) – nástroje pro výrazné snížení velikosti obrázků bez ztráty kvality

## Další formáty

Postupně se prosazují ještě další formáty pro obrázky, které ty stávající v mnohém vylepšují.

  **SVG** – vektorové obrázky netrpí ztrátou kvality při změně rozměrů (**IE 9+**) a umožňují úpravy pomocí CSS nebo JS

        [Rozsáhlý přehled informací o SVG](/svg)

  **WebP** – nabízí lepší ztrátovou i bezztrátovou kompresi, průhlednost i průsvitnost a menší soubory při zachování stejné kvality než při použití JPG (pouze **Chrome** a nová **Opera**)

  **JPEG XR** – obdoba WebP funkční pouze v **Internet Exploreru** od verse 9

Zatím ale nemají tak dobrou podporu v prohlížečích. Formáty PNG, JPG a GIF ji mají prakticky 100%.

## Odkazy jinam

  - W3C: [GIF or PNG?](http://www.w3.org/QA/Tips/png-gif)

    Wikipedie: 
    
      - [PNG](http://cs.wikipedia.org/wiki/Portable_Network_Graphics)

      - [JPEG](http://cs.wikipedia.org/wiki/JPEG)

    - [GIF](http://cs.wikipedia.org/wiki/GIF)

      - [SVG](http://cs.wikipedia.org/wiki/Scalable_Vector_Graphics)

    - [WebP](http://en.wikipedia.org/wiki/WebP)

    - [JPEG XR](http://en.wikipedia.org/wiki/JPEG_XR)

  - Sitepoint: [Saving Bandwidth by Using Images the Smart Way](http://www.sitepoint.com/saving-bandwidth-by-using-images-the-smart-way/)

  var aktivni;
  var obal = document.getElementById("obrazky");
  function zmenit(typ) {
    obal.setAttribute("data-image", typ);
  }
  var obalObr = document.getElementById("obrazky-fotka");
  function zmenitFotku(typ) {
    obalObr.setAttribute("data-image", typ);
  }  
  
  function prebartvit(el) {
    el.style.backgroundColor = "rgb(" +
      Math.floor((Math.random() * 256) + 0) + "," +
      Math.floor((Math.random() * 256) + 0) + "," +
      Math.floor((Math.random() * 256) + 0) + ")";
  }