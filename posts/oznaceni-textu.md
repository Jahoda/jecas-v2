---
title: "Označení textu kliknutím"
headline: "Označení kódu nebo textu po kliknutí"
description: "Jak označit text nebo zdrojový kód jedním kliknutím. Je to vůbec rozumné?"
date: "2013-11-11"
last_modification: "2013-11-12"
status: 1
tags: ["JavaScript", "Hotová řešení", "Rady a nápady"]
---

Na **webových stránkách o programování** nebo u webových služeb, které nabízejí **kód pro vložení na vlastní web**, se můžeme setkat s chováním, kdy se celý kód označí po **jediném kliknutí** na něj.

## Označení celého textu po 1 kliknutí

V případě, že se text umístí do `&lt;textarea>`, stačí pouhé vyvolání `select`u po kliknutí (`onclick`).

  Po kliknutí se vše označí.

## Označení celého obsahu `&lt;div>`u

Nemá-li obsah k **označení** vypadat jako formulářové pole, první možnost je `&lt;textarea>` [přestylovat](/vzhled-formularu#inputy) do podoby běžného obsahu a opět využít `this.select()`.

V případě, že se má jednat o **běžný neformulářový element**, nabízí se:

### Vlastnost `selection`

Pro získávání **vybraného textu**, ale i jeho označování slouží funkce `selection`. Použití označování obsahu se výrazně **liší napříč prohlížeči**.

    function oznacit(el) {
      /* Kód pro Internet Explorery */
      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(el);
        range.select();
      } 
      /* Kód pro ostatní prohlížeče */
      else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(el);
        window.getSelection().addRange(range);
      }
    }
  
  ```
Kód se po kliknutí označí.
```

### Použít `contenteditable`

Teoreticky by ještě šlo využít toho, že pokud z elementu uděláme [editovatelný obsah](/uprava-stranky-designmode), můžeme nad ním využívat funkci `selectAll`. Ale použití `selection` se mi zdá rozumnější.

    function oznacitEditable() {      
      document.execCommand('selectAll', false, null);
    }
  
  ```
Po kliknutí se vše označí.
```

## Výchozí chování

Při jakékoliv funkci, která **mění výchozí chování** prohlížeče, je třeba myslet na to, zda nenadělá více **škody** než užitku.

Co se týče označování textu, tak je běžné, že:

  - jedno kliknutí neudělá **nic**,

  - dvojklik označí **slovo**,

  - trojklik označí **odstavec**.

Zavádění označování po jednom kliknutí či dvojkliku, tedy výchozí chování naruší. Mimo jiné zjednodušení výběru textu zcela **znemožní používat dvojklik** pro označení slova — tato **nepěkná věc** je k vidění třeba u kódů [Nette dokumentace](http://doc.nette.org/cs/installation).

Proto je potřeba zvážit, zda v označovaného kódu/textu nebude někdo chtít **označovat obvyklým způsobem**.