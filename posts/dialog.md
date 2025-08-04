---
title: "Dialog"
headline: "HTML značka <code>&lt;dialog></code>"
description: "K čemu je dobrá HTML značka <code>&lt;dialog></code>."
date: "2014-07-28"
last_modification: "2014-09-16"
status: 1
tags: ["HTML", "HTML značky"]
---

Při interakci webové aplikace s uživatelem se často hodí používat **více vrstev**, tj. zobrazit nějaký obsah *nad stránkou*.

Pro takové řešení se vžil název [lightbox](/lightbox), HTML značka `&lt;dialog>` by klasické *lightboxy* v JavaScriptu mohla nahradit.

## Podpora

Funguje od **Chrome 37** a **Opery 24**. V ostatních a starších prohlížečích se projeví jako [vlastní/neznámá HTML značka](/vlastni-html-znacky), tedy se obsah normálně zobrazí.

Podle specifikace HTML 5.1 by ale měla být odstraněna:

    - HTML 5.1: 7. Web application APIs: [Dialogs implemented using separate documents](https://www.w3.org/TR/html/webappapis.html#dialogs-implemented-using-separate-documents-with-showmodaldialog)

Je tedy otázka, jestli má značka `&lt;dialog>` budoucnost.

## Zápis

```
&lt;dialog>
  Obsah dialogu.
&lt;/dialog>
```

Výše uvedený kód v podporovaných prohlížečích zajistí, že obsah **bude skrytý** a čekat na otevření.

## JS API

Aby `&lt;dialog>` nečekal schovaný navždy, existují pro něj **dvě JS metody** pro otevření a zavření.

  - **otevření** – `dialog.show()`

  - **otevření modálního okna** – `dialog.showModal()`

  - **zavření** – `dialog.close()`

  Obsah dialogu

    Zavřít

  Otevřít `show`

  Otevřít `showModal`

[Samostatná ukázka](http://kod.djpw.cz/wrfb)

Rozdíl mezi `show` a `showModal` je v:

  - **umístění dialogu** – `showModal` vycentruje dialog vodorovně i svisle, `show` jen vodorovně, **svislá posice** se určí na základě umístění `&lt;dialog>`u v kódu,

  - možnost použít nativní **overlay** (překryvnou vrstvu) nad obsahem pod dialogem pomocí pseudoelementu `::backdrop`,

  - **přístupnosti okolního obsahu** – modální okno (`showModal`) neumožňuje pracovat s obsahem stránky mimo dialog,

  - modální dialog jde najednou otevřít **pouze jeden**.

## CSS

Z pohledu CSS je `&lt;dialog>` skryt pomocí `display: none`.

Při *otevření* – `dialog.show()` – dojde k nastavení příznaku `[open]`, který způsobí odkrytí (`display: block`) a [absolutní naposicování](/position#absolute) dialogu na střed okna.

**Odstraněním posicování** by se dalo docílit [běžného odkrývání textu](/zobrazit-skryt), ale proto existuje jiná značka – [`&lt;details>`](/details).

### Selektory

Pro zaměření otevřeného dialogu tedy můžeme použít:

```
dialog[open] {
  /* styly pro otevřené */
}
```

A naopak s využitím [selektoru negace](/css-selektory#negace):

```
dialog:not([open]) {
  /* styly pro zavřené */
}
```

Tyto selektory se mohou hodit spíš k odlišení prohlížečů podporujících `&lt;dialog>`. Stylovat totiž jinak můžeme přímo `dialog`, když do otevření stejně **nebude vidět**.

### Překryvná vrstva `::backdrop`

Pomocí `dialog::backdrop` jde vytvořit *pod* dialogem například pseudo-element (vrstvu), která **překryje zbytek obsahu**, jak napovídá výchozí styl v prohlížeči.

```
dialog::backdrop {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.0980392);
}
```

Vrstvu `::backdrop` lze použít jen při otevření přes `show**Modal**`, u samotné metody `show` použít nepůjde.

## Využití

Momentálně značka `&lt;dialog>` moc užitečná není. Pro nedostatečnou podporu stejně musíme zajistit požadovanou funkčnost přepínáním [tříd](/prepinani-trid)/[data-atributů](/toggle-data-atributy).

Navíc použití *skutečného* dialogu nějak výrazně tvorbu „lightboxu“ (například s ohledem na **datovou velikost**) nezlepší.

## Formulář v dialogu

Další vlastností `&lt;dialog>`u je použití speciálního **formuláře**.

Formulář bude mít jako *metodu* uvedeno `dialog`:

```
&lt;form method="**dialog**">
  &lt;button *value="hodnota"*>
    Tlačítko
  &lt;/button>
&lt;/form>
```

Což způsobí, že `value` tlačítka půjde po kliknutí zjistit v události `onclose` z vlastnosti `returnValue`:

```
&lt;dialog *onclose*="alert(this.**returnValue**)">
```

[Samostatná ukázka](http://kod.djpw.cz/yrfb) / [Zadání a zpracování textové hodnoty](http://kod.djpw.cz/zrfb)

## Odkazy jinam

  - HTML5Rocks.com: [dialog element: shipped in Chrome 37 Beta](http://updates.html5rocks.com/2014/07/dialog-element-shipped-in-Chrome-37-Beta)

  - Smashing Magazine: [Making Modal Windows Better For Everyone](http://www.smashingmagazine.com/2014/09/15/making-modal-windows-better-for-everyone/)

  - MDN: [CSS pseudo-element ::backdrop](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop)

  - Ukázka použití: [dialog element demo](http://demo.agektmr.com/dialog/)