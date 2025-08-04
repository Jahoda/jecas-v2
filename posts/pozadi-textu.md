---
title: "Pozadí za textem"
headline: "Pozadí jenom za písmeny"
description: "Jak vytvořit nadpis, který má pozadí jen za písmeny."
date: "2015-03-18"
last_modification: "2015-03-19"
status: 1
tags: ["CSS", "Hotová řešení"]
---

Pro ozvláštnění [nadpisu](/nadpisy) nebo nějakého popisku může být zajímavé nastavit pozadí, aby bylo pouze za textem.

Zadání možná vypadá jednoduše, ale docílit kýženého efektu není úplně triviální.

## Pozadí

Jelikož je nadpis blokový element ([`display: block`](/display#block)), nastavené pozadí se *rozlije* po celém bloku.

    .nadpis {
      padding: .4em;
      background: #0D6AB7; 
      color: #fff;
      font-size: 200%;
    }
    
  Nadpis

Je tedy nutné přepnout `display` na `inline`. Zároveň použít nějaký obal, aby nadpis zabíral celý řádek.

    .nadpis-inline {
      display: inline;
    }

    Nadpis  

## Výška řádků

V případě, že se nadpis rozleze do více řádků, mohou být řádky na sebe nepěkně nalepeny.

    Nadpis 
 na více řádků

Je potřeba tedy zvýšit výšku řádku ([`line-height`](/font#line-height)). Bohužel stanovit:

  - velikosti písma (`font-size`),

  - odsazení (`padding`),

  - výšku řádku (`line-height`)

Aby to sedělo **přesně na 1 pixel** napříč prohlížeči vypadá neproveditelně.

Nezbývá než použít nějakou toleranci, aby na sebe řádky navazovaly.

    .nadpis-vyska {
      line-height: 190%;
    }

    Nadpis 
 na více řádků

## Odsazení na stranách

Ne úplně hezky působí absence odsazení na konci prvního a začátku druhého řádku, pokud se použije `padding`.

### `box-decoration`

Mimo **IE** a starou **Operu 12** to dokáže vyřešit CSS vlastnost [box-decoration-break](/box-decoration-break), která umí *rozkopírovat* styl na jednotlivé řádky.

    .box-decoration {
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      -ms-box-decoration-break: clone;
      -o-box-decoration-break: clone; 
    }

    Nadpis 
 na více řádků

### Stín

V případě jednobarevného pozadí by také odsazení teoreticky šlo vykouzlit přes [`box-shadow`](/box-shadow) a posunutí [`margin`em](/margin) o šířku stínu. Bohužel tento postup nefunguje ve **Firefoxu** (vytvoří stín pouze prvnímu řádku) a v [**IE 11**](/ie11) není stín úplně ostrý, takže se mezi stínem a obsahem zobrazují svislé pruhy.

    .box-shadow {
      margin: 0 10px;
    }
    .box-shadow div {
      padding-left: 0;
      padding-right: 0;
      box-shadow: 10px 0px 0px 0px #0D6AB7, -10px 0px 0px 0px #0D6AB7;
    }

    Nadpis 
 na více řádků

### Posicování

Alespoň levé odsazení by šlo zajistit například absolutně posicovaným elementem. Funguje mimo **Firefox**.

    .posicovani {
      padding: 0;      
      margin: 0 10px;
    }
    .posicovani div {
      padding-left: 0;
      padding-right: 0;
      position: relative;
    }
    .posicovani div:before {
      width: 10px;
      height: 100%;
      content: "";
      position: absolute;
      top: 0;
      left: -10px;
      background: #0D6AB7;
    }

    Nadpis 
 na více řádků

## Závěr

Vypadá to, že vytvořit zmíněný efekt s odsazením na stranách a dobrou podporou v prohlížečích nějakým rozumným způsobem úplně nejde.

Nebo jde a víte jak? **Napište mi, prosím, do komentářů**.