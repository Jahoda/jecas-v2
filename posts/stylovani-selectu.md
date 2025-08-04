---
title: "Stylování <select>u"
headline: "Stylování <code>&lt;select&gt;</code>u"
description: "Roletový seznam nabízí omezené možnosti v úpravách vzhledu. Které to jsou a jak je rozšířit?"
date: "2013-08-16"
last_modification: "2016-07-03"
status: 1
tags: ["CSS", "Stylování elementů", "Rady a nápady"]
---

## Odsazení `padding`

Funguje od Exploreru 8 na značce `&lt;select&gt;`, na `&lt;option&gt;`u umí `padding` jen Firefox. 

  .padding {padding: 1em}

      HTML
      CSS
      JavaScript

## Barvy

Obarvení `&lt;select&gt;`u je možné ve všech prohlížečích. Je možné barvit i konkrétní `&lt;option&gt;` položky. Pokud se tak neučiní, převezmou položky barvu `&lt;select&gt;`u.

    -- vybrat --
    HTML
      CSS
      JavaScript

Jak je vidět z ukázky, nastavení pozadí (`background`) způsobí [přepnutí na *oldschool* vzhled](/vzhled-formularu#select), téhož je možné *docílit* vlastností `border`.

## Rámeček `border`

S rámečky není problém. Firefox je umí i pro jednotlivé položky.

V prohlížečích, které podporují kulaté rohy přes [`border-radius`](/border-radius), není problém ani zakulacení.

    -- vybrat --
    HTML
      CSS
      JavaScript

## Šířka a výška

Přenastavení rozměrů je taktéž široce podporováno.
Problém je s výškou, kdy různé prohlížeče text různě zarovnávají (není možné použít `line-height`). 
Zarovnat text u širokého `&lt;select&gt;`u pomocí `text-align: center` funguje jen v **Opeře 12**.
Firefox jako jediný umí nastavit výšku i pro položky výběru.

    -- vybrat --
    HTML
      CSS
      JavaScript

## Písmo

Ohledně písma lze nastavit prakticky vše — **tučné písmo**, *kursivu* apod., velikost, barvu (jak je zmíněno výše), atd.

Opět to je možné **kromě Firefoxu jen pro celý výběr**, tj. pro `&lt;select&gt;`.

    -- vybrat --
    HTML
      CSS
      JavaScript

## Zvýraznění položky

Při najetí na `&lt;select&gt;` lze klasicky aplikovat `:hover`. Otevřený `&lt;select&gt;` získává `:focus`.

  - V Explorerech do verse 9 včetně nefunguje `:hover`, do verse 8 včetně ani `:focus`.

  - Nastavit vlastní styl pro `:hover` jednotlivých položek se zdá být nemožné.

    .hover {background: #000; color: #fff; border: 5px solid #fff; border-radius: 5px; font-weight: bold; text-transform: lowercase; font-size: 200%; font-style: italic}
    .hover:hover {background: red!important; width: 300px}
    .hover:focus {border-color: red}

    -- vybrat --
    HTML
      CSS
      JavaScript

## Vlastní styl šipky

Standardním způsobem není možné změnit styl šipky znázorňující rozevření seznamu (například jí změnit barvu).

Existují ale způsoby, jak to obejít:

### `appearance: none`

CSS vlastnost `appearance` nastavená na hodnotu `none` dokáže *vypnout* výchozí styl formulářového políčka. Tím se mimo jiné docílí, že se nezobrazí šipka pro rozevření.

Vlastní šipku jde potom snadno absolutně naposicovat na požadované místo. Šipka jde vytvořit i přímo v CSS:

    - [Generátor CSS šipek](/css-sipky)

Aby na místě posicované šipky šlo `&lt;select>` prokliknout, je třeba přidat `pointer-events: none`.

  .select-cover {
      width: 200px;
      overflow: hidden;
      position: relative;
  }

  .select-cover select,
  .select-cover option {
      width: 200px;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      padding: 0 .4em;
      line-height: 1.5em;
      font-size: 100%;
      border: 0;
  }

  .select-cover:before {
      content: "";
      pointer-events: none;
      border: 6px solid transparent; 
      width: 0px; 
      height: 0px; 
      display: inline-block;
      position: absolute; 
      border-top: 8px solid #da3f94; 
      top: 50%;
      margin-top: -4px;
      right: .5em;
  }

        První
        Druhá
        Třetí

[Samostatná ukázka](http://kod.djpw.cz/tnzb)

## Závěr

Jak je vidět, stylování je **docela omezené**. Pro plnou kontrolu je třeba [použít atrapu](/vzhled-formularu#js) a `&lt;select&gt;` ovládat JavaScriptem. Problém je, že vytvořit funkčnost shodnou s obyčejným formulářem je docela komplikované. A hotová řešení často věci jako ovládání klávesnicí apod. neumožňují.

Problémům se stylováním se jde často úplně vyhnout, protože selectbox není úplně ideální formulářový prvek a často jde nahradit uživatelsky příjemnějším ovládacím prvkem:

    - [Proč nepoužívat `&lt;select>`](/select-pouzitelnost)

## Odkazy jinam

  - jQuery UI: [Selectmenu](https://jqueryui.com/selectmenu/)

  - [Cross-browser styles for consistent select element styling](https://github.com/filamentgroup/select-css) ([demo](http://filamentgroup.github.io/select-css/demo/))