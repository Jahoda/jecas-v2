---
title: "Klávesové zkratky v JS"
headline: "Ovládání webu klávesami v JavaScriptu"
description: "Odchytávání stisknutých kláves a vytváření klávesových zkratek v JavaScriptu."
date: "2014-03-05"
last_modification: "2014-03-18"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Ve webových aplikacích se občas hodí umožnit uživatelům některé funkce ovládat z **klávesnice**. Většinou by to neměl být jediný způsob, jak danou funkci použít, ale spíš usnadňující doplněk.

## Odchytávání kláves

Zjišťovat, co uživatel stisk za klávesu, je většinou nejvhodnější přes `document.onkeydown`. Pro určení konkrétní klávesy se musí pro některé prohlížeče předat objekt `event` a sjednotit ho s `window.event`.

```
document.onkeydown = function(e) {
  var event = window.event || e;
  var kod = event.keyCode;
  alert(kod);
}
```

  Kód poslední stisklé klávesy: (něco stiskněte)

  document.onkeydown = function(e) {
  var event = window.event || e;
  var kod = event.keyCode;
  document.getElementsByTagName("tt")[0].innerHTML = (kod);
}

Nyní stačí při požadovaném kódu provádět příslušnou akci.

## Číselné kódy kláves

Často používané **kódy kláves**.

    Kód
    Klávesa

    `27`
    Esc

    `37`
    ←

    `39`
    →

    `38`
    ↑

    `40`
    ↓

    `116`
    F5

    `13`
    Enter

    `32`
    Space (mezerník)

    `8`
    Backspace

    `46`
    Delete

    `9`
    Tab

## Klávesy Shift, Ctrl a Alt

Pro vytváření klávesových zkratek existují další speciální vlastnosti objektu `event`.

    Kód
    Klávesa
    Vlastnost

    `16`
    Shift
    `event.shiftKey`

    `17`
    Ctrl
    `event.metaKey || event.ctrlKey` (sjednocení pro Mac OS)

    `18`
    Alt
    `event.altKey`

Pro odchytávání **složených klávesových zkratek** potom stačí něco jako:

```
if (event.keyCode == 83 &amp;&amp; (event.metaKey || event.ctrlKey)) {
// Zkratka Ctrl + S
}
```

Tedy hlídat číslo klávesy a zároveň *speciální* klávesu.

## Formulářová pole

Někdy **je žádoucí**, aby některé klávesové zkratky **nefungovaly při psaní ve formuláři**. Bylo by docela nepraktické, kdyby například ovládání fotogalerie šipkami blokovalo přesun kursoru v [`&lt;input>`u](/input). Nebo při stisknutí klávesy S se provedla příslušná akce místo napsání znaku.

Řešení je zjišťovat *cílový* element. Opět se způsob liší napříč prohlížeči.

```
var target = event.srcElement || event.target;
```

Použití:

```
if (target.tagName == "INPUT") {
  // jsme v &lt;input>u
}
```

[Živá ukázka](http://kod.djpw.cz/rkcb) povolení zpracování zkratky Ctrl + S mimo formulářová políčka.

## Přidávání více zkratek

Při používání více zkratek je vhodné vymyslet nějaký **elegantnější postup**. Třeba si vytvořit JS objekt se všemi zkratkami a jejich akcemi a ten předat funkci, která bude požadované funkce volat podle čísla klávesy.

```
var zkratky = {
  27 : function() {
    // ESC
  },
  37 : function() {
    // Left
  }
};
// Volání funkce při document.onkeydown
zkratky[kodKlavesy]();
```

[Živá ukázka](http://kod.djpw.cz/clcb).

## Odkazy jinam

  - [Keys.js](http://bitwalker.github.io/keys.js/)

  - [Keyboard Shortcuts for Pagination](http://osvaldas.info/keyboard-shortcuts-for-pagination)

  - [Combokeys](https://github.com/mightyiam/combokeys) – snadná implementace klávesových zkratek pro JS akce