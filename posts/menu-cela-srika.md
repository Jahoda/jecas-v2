---
title: "Menu přes celou šířku"
headline: "Menu přes celou šířku"
description: "Jak vytvořit vodorovné menu s neznámým počtem položek přes celou šířku."
date: "2014-07-31"
last_modification: "2014-08-28"
status: 1
tags: ["CSS", "Hotová řešení", "Menu v CSS"]
---

Úkol je jasný. Vytvořit navigaci, která může mít **proměnlivý počet položek**. Cílem je, aby se položky přesně roztáhly ve vymezeném prostoru.

## Dělení šířky

První asi každého napadne vzít šířku navigace, vydělit ji počtem položek. Od takto vzniklé šířky v případě [obsahového box modelu](/box-model#content-box) odečteme `padding` s `border`em a je to.

(Dostat položky **vedle sebe** s možností zadat šířku jde řešit [obtékáním](/float) nebo přes `[display: inline-block](/display#inline-block)`).

    .menu-deleni {
      width: 300px;
      background: #ededed;
      overflow: hidden;
    }
    .menu-deleni a {
      float: left;
      width: 100px;
      text-align: center;
    }

    [Odkaz]()
    [Další odkaz]()
    [Odkaz]()

Problém je, že při změně počtu položek budeme muset všechny hodnoty **přepočítávat**. Podpora počítání přímo v CSS pomocí vlastnosti [`calc`](/calc) je až od **IE 9**.

## Různá šířka a ladění paddingu

V případě položek s **různou šířkou** je často k vidění vytváření menu laděním `padding`u od oka tak, *aby to jakž takž hezky vyšlo*.

    .menu-ladeni {
      width: 300px;
      background: #ededed;
      text-align: center;
    }
    .menu-ladeni a {
      display: inline-block;
      padding: 0 1.2em;
    }

    [Odkaz]()
    [Další odkaz]()
    [Odkaz]()

Docílit perfektního vzhledu funkčního napříč prohlížeči i s různými velikostmi písma je takřka nemožné.

## Použít tabulku

Mnohem funkčnější a elegantnější se zdá použití **tabulky**. Nemusí se nutně jednat o skutečnou **HTML tabulku**, ale od **IE 8** fungují CSS atrapy ([tabulkové hodnoty](/display#tabulkove) vlastnosti `display`).

    .menu-tabulka {
      width: 300px;
      background: #ededed;
      text-align: center;
      display: table;
    }
    .menu-tabulka a {
      display: table-cell;
    }
    .menu-tabulka.pevna-sirka {
      table-layout: fixed;
    }
    .menu-tabulka.vetsi-sirka {
      width: 400px;
    }

    [Odkaz]()
    [Další odkaz]()
    [Odkaz]()

  var t = document.getElementById("css-tabulka").getElementsByTagName("div")[0];

Není problém nastavit odkazům pevnou šířku (to jde nastavením `width` / využitím `table-layout: fixed`) nebo změnit šířku tabulky, aniž by se něco rozbilo. Tedy jde i vcelku pohodlně měnit počet odkazů a délku jejich textů.

## Flexboxy

Docílit efektu, který nabízí *CSS tabulka* by šlo i [flexboxy](/flexbox), ale jejich podpora je až od **IE 10**.