---
title: "Responsivní vyhledávání"
headline: "Responsivní hledací formulář"
description: "Jak vytvořit responsivní vyhledávací formulář, kde se políčko a tlačítko přizpůsobuje šířce."
date: "2015-07-02"
last_modification: "2015-11-18"
status: 1
tags: ["Hotová řešení", "Formuláře", "Responsivní design"]
---

Webové stránky často obsahují **políčko pro hledání** – obvykle ho návštěvníci čekají vpravo nahoře a jedná se o další prvek, jak usnadnit a zrychlit navigaci po celém webu.

Při vytváření [responsivního vzhledu](/responsive) je nutné nějak řešit přizpůsobení hledacího formuláře dostupné šířce.

## Podoba vyhledávacích formulářů

V nejjednodušší podobě sestává hledání z jednoho textového [`&lt;input>`u](/input) a odesílacího tlačítka ([`&lt;button>`](/button)) s popisem **Hledat**.

  Hledací políčko na Jak psát web

Zažitý symbol pro hledání je obrázek **lupy**, proto může být vhodné ho do políčka pro hledání doplnit.

  Formulář pro hledání na Zdrojáku

Pomocí atributu [`placeholder`](/placeholder) jde do políčka pro zadání výrazu doplnit k hledání nápovědu.

  Hledání na e-shopu Alza.cz

  Hledání na e-shopu CZC.cz

Některé weby upustily od používání tlačítka s popiskem **Hledat**, které nahradily ikonou lupy.

  Formulář pro hledání na [Googlu](/google)

  I český [Seznam](/seznam) nahradil tlačítko *Hledat* ikonou

  Hledání na Games.cz

  Vyhledávání na Programujte.com

Pokud hledání **obsahuje našeptávač**, nemusí být tlačítko ani příliš výrazné, protože ho člověk často ani nepoužije – uspokojí ho výsledek z automatického napovídání.

  Hledání na [Twitteru](/twitter)

K vidění jsou i maximálně minimalistické hledací formuláře, které žádné tlačítko ani nemají. Spoléhají na potvrzení hledání klávesou Enter. Takové chování se ale už může setkat s nepochopením ovládání.

  Políčko pro hledání na StackOverflow

## Mít, nebo nemít hledání?

Je potřeba mít hledání na stránce vždy?

U **jednoduchých webů** s pár stránkami, kde se na každou jde dostat jedním kliknutím, většinou možnost hledání příliš pohodlí nezvyšuje. U komplikovanější struktury je ale **hledací formulář** užitečnou pomůckou, jak se dostat k požadovanému obsahu.

## Vytvoření responsivního hledání

V případě nejstandardnějšího hledacího formuláře je cílem, aby se šířka políčka + tlačítka **přizpůsobovala dostupné šířce**.

Jinak řečeno: textové pole vyplní prostor, který zbude vedle tlačítka *Hledat* s pevnou šířkou.

Existuje více možností, jak toho docílit. Dobře funkční postup je použít [tabulkové hodnoty](/display#tabulkove) vlastnosti `display` a textovému políčku nastavit 100% šířku.

Kvůli `padding`u a okrajům se hodí použít [okrajový boxmodel](/box-sizing#border-box).

    .search {
        display: table;
    }
    .search-field,
    .search-control {
        display: table-cell;
        width: 100%;
    }
    .search-input {
        width: 100%;      
    }
    .search-input,
    .search-button {
      box-sizing: border-box;
    }

          Search

Změnit maximální šířku: 

[Samostatná živá ukázka](http://kod.djpw.cz/baob)

## Rozbalení vyhledávání

Kvůli úspoře místa jde u mobilů navíc uvažovat o sbalení vyhledávání do malého tlačítka, které teprve formulář odkryje.

    - [Skrývání a odkrývání textu](/zobrazit-skryt)

Z hlediska použitelnosti je dobré, aby vyhledávací políčko po odkrytí dostalo `focus`, aby do něj **šlo rovnou psát**.

## Překrytí stránky hledáním

V případě, že je formulář pro hledání hodně velký nebo obsahuje našeptávání, potřebuje na mobilu **maximální možný prostor**. Nabízí se ho tedy zobrazit nad obsahem stránky.

[Živá ukázka](http://kod.djpw.cz/jzob)

## Odkazy jinam

  - Speckyboy.com: [How to Increase Online Sales with Better Search Usability](http://speckyboy.com/2015/07/07/how-to-increase-online-sales-with-better-search-usability/) – jak zlepšit použitelnost vyhledávání

    .live .search {
        display: table;
        max-width: 80%;
    }
  .live .search-input,
  .live .search-button {
      padding: .5em;
      line-height: 1;
      height: 3em;
  background-image: none;
  }

  function zmenit(sirka) {
    document.querySelector("#omezit .search").style.maxWidth = sirka + "%";
  }