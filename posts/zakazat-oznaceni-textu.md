---
title: "Jak zakázat označování textu"
headline: "Zakázání označování textu"
description: "Standardně jde na webu označovat text. Jak jeho výběru myší zabránit?"
date: "2015-03-22"
last_modification: "2015-03-23"
status: 1
tags: ["HTML", "CSS", "CSS vlastnosti", "Rady a nápady", "HTML atributy"]
---

Na webové stránce je běžné, že jde její textový obsah **označovat**. Většinou je možnost označování dobrá, protože návštěvník si čas od času může chtít nějaké slovo **označit a vyhledat vyhledávačem** nebo zkrátka zkopírovat někam jinam.

V případě ovládacích prvků je ale označování někdy **nežádoucí**.

Text některých ovládacích prvků, kde se očekává, že na ně uživatel klikne, jako je odkaz nebo tlačítko, proto obvykle nejdou v prohlížečích označit standardním způsobem tažením kursoru myši.

  [Text odkazu](#)

  Text tlačítka

Ve většině prohlížečích jde text odkazu označit při tažení myší v místě nad odkazem. Označit text tlačítka jde potom snad jedině v **Chrome** / nové **Opeře 15+**.

## Atribut `unselectable`

Do **Opery 12** a v **Internet Explorerech** zamezí označování atribut `unselectable` s hodnotou `on`.

```
&lt;p **unselectable="on"**>
  Obsah nepůjde vybrat.
  &lt;span>Toto vybrat půjde&lt;/span>
&lt;/p>
```

Zakázání výběru se **nevztahuje na potomky** elementu s `unselectable`, takže ve výše uvedeném kódu by obsah `&lt;span>`u šel normálně označit.

Asi nejsnazší řešení tohoto problému je [projití](/js-cykly) všech potomků s `unselectable` a doplnění tohoto atributu pro všechny potomky JavaScriptem.

## CSS vlastnost `user-select`

Zamezit označování jde i CSS vlastností `user-select: none`. Následujícím zápisem tak jde doplnit podporu `unselectable="off"` do **Firefoxu**, **Chrome 6+** a **Opery 15+**. V **IE 10** a [**IE 11**](/ie11) potom fungují oba postupy (HTML atribut i CSS vlastnost).

```
[unselectable] {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}
```

## Ukázka znemožnění výběru

    [unselectable] {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
    }    

    Tučný **obsah odstavce** nejde označit.

Chování napříč prohlížeči je hodně proměnlivé.

  - Ve **Firefoxu** nejde text označit ani zkopírovat.

  - V ostatních prohlížečích se při začátku označování mimo zakázaný element povede obsah označit. V **Chrome** se v takovém případě na zablokovaném elementu označení neprojeví jen visuálně, při zkopírování se do schránky dostane i neoznačitelný obsah.

    - [Samostatná ukázka zamezení výběru textu](http://kod.djpw.cz/jslb)

## Kdy označení zakázat

Měnit výchozí chování prohlížeče (tj. text jde označit) bývá většinou spíš na škodu. Rozhodně není dobré se tímto způsobem snažit bránit před [kopírováním obsahu](/kopirovani).

Nemožnost označit text může být pro návštěvníka dost **frustrující**. Zakazovat výběr by proto mělo následovat až v případě, kdy se při běžném používání aplikace něco **nechtěně označuje**.

Zákaz označování se hodí hlavně u prvků, které něco dělají při [`onclick`u](/udalosti-mysi#onclick) a nejsou to odkazy nebo tlačítka. Při rychlém kliknutí vícekrát po sobě by se potom označoval text, což nepůsobí dobře.

Chování u běžného `&lt;span>`u, který při kliknutí mění svou barvu, jde pozorovat na následující ukázce.

    .prepinac {
      background: #fff;
      display: inline-block;
      padding: .5em;
      cursor: pointer;
    }
    .prepinac-zvyraznit {
      background: #efefef;
    }

    „Tlačítko“ bez zakázání výběru

    Zakázání výběru

## Odkazy jinam

  - MDN: [user-select](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)

  - Cam I Use: [user-select](http://caniuse.com/#search=user-select)

  - Six Revisions: [Disable Text Selection with CSS](http://sixrevisions.com/css/disable-text-selection/)