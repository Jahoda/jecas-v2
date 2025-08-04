---
title: "Adresa a mapa"
headline: "Adresa a mapa"
description: "Jak správně zadávat na webové stránce svou adresu a jako zajistit její zobrazení na mapě."
date: "2014-01-13"
last_modification: "2014-02-22"
status: 1
tags: ["Rady a nápady", "Mapy"]
---

Pro zápis adres existuje speciální HTML značka `&lt;address>` (dvě d a dvě s).

    address.bez {font-style: normal}

    Thunovská 178/10

    Praha 1
 
    118 00

Ve výchozím nastavení se zobrazuje kursivou, což jde snadno změnit/zurušit změnou `font-style` na `normal`.

## Adresu by mělo jít vyhledat

Zásadní požadavek pro uvedenou textovou adresu je v tom, aby při **zkopírování a zadání** do **mapové aplikace** byla řádně vyhodnocena. A na mapě se daná adresa zobrazila **na správném místě**.

To může někdy komplikovat zmatené číslování, které se v Čechách používá, kdy ve městech mívají domy **číslo popisné i  číslo orientační** (obvykle se oddělují lomítkem).

Při uvedení **pouze orientačního čísla** (zpravidla to druhé za lomítkem) může snadno dojít k nejednoznačnosti, kdy existuje druhá budova s **číslem popisným**, které se shoduje s **orientačním** číslem budovy první.

## Interaktivní náhled mapy

Mapové služby jako:

  - [Mapy.cz](http://mapy.cz)

  - [Google Maps](http://maps.google.cz)

Nabízejí vložení *živé* mapy do stránky prostřednictvím rámu (konkrétně `&lt;iframe>`).

### Mapy.cz

Mapy.cz mají tuto funkci vpravo nahoře.

### Google Maps

U Google Maps je podobná funkce lehce ukrytá.

## Obrázek a odkaz

Osobně ale doporučuji raději z mapy udělat screenshot, **vyříznout z něj podstatnou část** a tu uložit jako obrázek na vlastní server. S tím, že tento obrázek se vloží do odkazu mířící na velkou mapu.

```
&lt;a href="http://mapy.cz/s/9eh7">
  &lt;img src="obrazek-mapy.png" width="šířka" height="výška" alt="Naše poloha na mapě">
&lt;/a>
```

Proč?

  - Načtení funkční interaktivní mapy do `&lt;iframe>` zbytečně **prodlouží načítání stránky**.

  - Návštěvník si mapu stejně nejspíš rozklikne do **plnohodnotné velké podoby**.

(Neplatí pochopitelně pro webové stránky, kde je interaktivní mapa [hlavní součástí](http://www.mechaniky.cz/) stránky.)

## Statické API

[**Chamurappi**](http://webylon.info) mě upozornil, že Google Mapy v *[licenci](http://maps.google.com/help/terms_maps.html) zakazují „kopírování, překládání, úpravy nebo vytváření odvozeného díla obsahu nebo jeho části“ a jsou schopní to připomínat*.

Lepší řešení tedy bude použít [statické API](https://developers.google.com/maps/documentation/staticmaps/?hl=cs). To je ještě výhodnější, protože se nemusíme řezat s obrázkem, ale vložit si ho přímo do stránky z Google Maps. Výhodnější je tedy pro **malé weby**, které nevyužijí moc požadavků, protože od určité hranice je **API placené**.

  Adresa:  Překreslit
  Zoom: 

``

function prekreslit(adresa, zoom) {
    var url = "http://maps.googleapis.com/maps/api/staticmap?center=" + encodeURIComponent(adresa) + "&size=400x200&sensor=false&zoom=" + encodeURIComponent(zoom);
    document.getElementById("mapa").src = url;
    document.getElementById("url-mapy").innerHTML = url;
}

## Odkazy

  - [OpenLayers: Free Maps for the Web](http://openlayers.org/)

  - [20 Free and Premium Vector World Maps](http://designmodo.com/vector-world-maps/)