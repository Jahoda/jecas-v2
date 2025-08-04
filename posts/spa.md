---
title: "Single page aplikace"
headline: "Single page application"
description: "Co je to SPA (single page application). Na jakém principu funguje."
date: "2015-02-04"
last_modification: "2015-02-05"
status: 1
tags: ["JavaScript", "Rady a nápady", "AJAX"]
---

**Single page application** (někdy také *one page application*) je typ webové aplikace, která většinou používá server pouze jako zdroj a úložiště dat. Data jsou potom kompletně vykreslována JavaScriptem.

Při prvním příchodu na stránku se tedy:

  - stáhnou potřebné JavaScripty,

  - vykonají se a určí, jaký obsah se má zobrazit,

  - stáhnou se požadovaná data,

  - vypíší se do HTML kostry aplikace,

  - naváží se události na ovládací prvky.

Při dalších interakcích se potom stahuje pouze samotný obsah. Bez podpory JavaScriptu je stránka **nefunkční**.

## Co dělá server

Serverová část SPA je obvykle jen jednoduché rozhraní, které zpracovává [AJAXové](/ajax) požadavky ze strany klienta. Průběh akce vypadá může vypadat následovně:

    Uživatel **klikne na tlačítko** a JS obsluha události [`onclick`](/udalosti-mysi#onclick) vyšle **požadavek na server**:

    ```
example.com/?zobrazit=kontakt
```

    Server najde příslušná data a **vypíše je** v [JSONu](/json) (výsledek mohou být obyčejné textové řetězce, čísla nebo HTML kód):

    ```
{
  "titulek" : "Kontakt",
  "komentaru" : 5,  
  "obsah" : "&lt;p>Kontaktujte nás&lt;/p>  
}
```

    Používat JSON není podmínkou, ale většinou je to nejsnazší způsob, jak později pohodlně pracovat s jednotlivými položkami.

    JavaScript získaná `data` **vloží** na příslušná místa do stránky (titulek, nadpis, obsah atd.).

    ```
document.title = data.titulek;
document.getElementsByTagName("h1")[0].innerHTML = data.titulek;
document.getElementById("obsah").innerHTML = data.obsah;
document.getElementById("pocet-komentaru").innerHTML = data.komentaru;
```

## Historie `history.pushState`

Aby v SPA fungovala funkce *Zpět* v prohlížečích, používá se fiktivní změna URL a do objektu `history` se ukládá obsah, který se potom může zobrazit bez nutnosti něco dál načítat.

    - [Změna URL bez obnovení stránky](/zmena-url) – popis ukládání a obnovování dat z historie

## Proč používat SPA

Hlavní výhoda SPA je rychlá odezva (po prvotním načtení a inicialisaci skriptů), protože se ze serveru následně **nestahuje celý HTML kód**, ale jen data, která se mění.

Kromě datové úspory nemusí prohlížeč neustále [překreslovat](/vykreslovani#prubeh) celou stránku, ale pouze **změněné části**.

Tento způsob stahování obsahu AJAXem jde využít i k [lazy-loadingu](/lazy-loading), kdy se obsah finální stránky vykreslí v několika krocích. U náročných stránek tím jde docílit rychlého zobrazení nejdůležitějšího obsahu – a další části (náročnější na výpočty) se načtou **nezávisle až později**.

Nakonec je SPA relativně jednoduchá na vytvoření, jelikož se logika aplikace vytváří pouze v JavaScriptu. Kód se nepíše jednou pro klienta a jednou pro server.

## Nevýhody

Zásadní nevýhodou *Single-page application* je v některých případech nefunkčnost bez JavaScriptu, což je pro určitý typ webů **zásadní překážka**.

Obsahový web vytvořený tímto způsobem bude obtížně zpracovatelný pro **roboty vyhledávačů**.

Problematický je obvykle i **delší čas prvního načtení** (musí se stáhnout potřebné skripty a až potom se začne stahovat vlastní obsah).

U některých typů webových aplikací tyto nevýhody ale nemusí vadit, případně je převýší výhody.