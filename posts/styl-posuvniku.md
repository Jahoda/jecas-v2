---
title: "Vlastní styl posuvníku"
headline: "Vlastní vzhled scrollbaru"
description: "Jaké jsou možnosti ve stylování vzhledu posuvníku."
date: "2014-12-14"
last_modification: "2017-08-08"
status: 1
tags: ["CSS", "Stylování elementů", "Scrollování"]
---

Posuvník je nedílnou součástí většiny webů. Jelikož je jeho vzhled řízení **prohlížečem** / **operačním systémem**, nemusí zapadat ke **vlastnímu vzhledu stránky** – pomocí CSS to jde změnit.

Změny stylu si je dobré pořádně rozmyslet, protože příliš kreativní vzhled může být **pro uživatele nejasný**.

V roce 2017 stále **není možné měnit vzhled posuvníku jen pomocí CSS** s dobrou podporou napříč prohlížeči.

## Webkit

Asi nejpokročilejší možnosti nabízí prohlížeče používající jádro **Webkit**/**Blink** (**Chrome**, **Opera**). Jednotlivé prvky posuvníku jsou v podstatě **pseudo-elementy**, které jde stylovat běžnými CSS způsoby.

Bez uvedení konkrétnějšího selektoru před `::-webkit-scrollbar*` budou **nastylovány všechny posuvníky** na stránce se nacházející.

Posuvník je rozdělen na **několik částí**:

  - `::-webkit-scrollbar` – tělo posuvníku

  - `::-webkit-scrollbar-button` – tlačítka pro posun nahoru/dolů

  - `::-webkit-scrollbar-track` – prostor mezi šipkami nahoru/dolů

  - `::-webkit-scrollbar-track-piece` – pozadí za jezdcem posuvníku

  - `::-webkit-scrollbar-thumb` – jezdec posuvníku

  - `::-webkit-scrollbar-corner` – roh mezi vodorovným a svislým posuvníkem

  - `::-webkit-resizer` – roh, za který lze měnit velikost

Zjednodušené vysvětlení:

[Živá ukázka](http://kod.djpw.cz/nwib)

## Internet Explorer

V **Internet Exploreru** není posuvník sestaven z pseudo-elementů `::scrollbar-*`, ale používají se speciální CSS vlastnosti.

  - `scrollbar-track-color: barva` – pozadí posuvníku

  - `scrollbar-face-color: barva` – barva jezdce posuvníku

  - `scrollbar-arrow-color: barva` – barva šipek

Pro barvu stínů/rámečku existují ještě další vlastnosti, některé se v [**Internet Exploreru 11**](/ie11) neprojevují:

  - `scrollbar-shadow-color: barva` – barvy stínu/rámečku kolem jezdce posuvníku
      
  - `scrollbar-highlight-color: barva`

  - `scrollbar-3dlight-color: barva` – barva levé a horní hrany posuvníku

  - `scrollbar-darkshadow-color: barva`

[Živá ukázka](http://kod.djpw.cz/pwib)

Popis jednotlivých částí posuvníku ve starých **IE**.

V **IE 11** je zajímavá vlastnost `scrollbar-base-color`, která na základě zadané barvy přizpůsobí všechny potřebné **odstíny** pro jednotlivé části posuvníku.

[Živá ukázka](http://kod.djpw.cz/swib)

O barvení posuvníku ve starších **IE**:

    Jak psát web: Barvení rolovací lišty

v prohlížečích pomocí CSS

## Microsoft Edge

Stylovat posuvník pomocí CSS **není možné**.

Žádost o přidání této funkcionality dostala v roce 2015 prioritu *medium*:

    - Windows Developer: [Add Support for Scrollbar Styling](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/9081910-add-support-for-scrollbar-styling?page=2&per_page=20)

## Firefox

Stylovat posuvník pomocí CSS **není možné**.

Absence stylování scrollbaru je evidována jako bug z roku 2000:

Bugzilla: [Style the scrollbar (binding ::-moz-horizontal-scrollbar to XBL)](https://bugzilla.mozilla.org/show_bug.cgi?id=77790)

## Posuvník v JavaScriptu

Pro **jednotné zobrazení posuvníku napříč prohlížeči** je jediná spolehlivá možnost posuvník zajistit po svém pomocí JavaScriptu.

Aby bylo zachováno **standardní chování** – rychlost posunu, ovládání dotykem a setrvačnost, jde využít elementu s `overflow: auto` obaleného do elementu s nižší šířkou o rozměr posuvníku, čímž se výchozí *scrollbar* ořízne.

[Živá ukázka](http://kod.djpw.cz/twib)

JavaScript potom slouží pouze pro **indikaci a drag &amp; drop posouvání**.

    - [nanoScroller.js](http://jamesflorentino.github.io/nanoScrollerJS/) – plugin do jQuery

    - [jScrollPane](http://jscrollpane.kelvinluck.com/) – vlastní posuvník napříč prohlížeči (jQuery)

## Odkazy jinam

  - MSDN: [Scrollbar Color Properties](http://samples.msdn.microsoft.com/workshop/samples/author/dhtml/refs/scrollbarColor.htm)

  - Webkit.org: [Styling Scrollbars](https://www.webkit.org/blog/363/styling-scrollbars/)

  - [Custom scrollbars for IE, Chrome and Firefox using CSS](http://codemug.com/html/custom-scrollbars-using-css/)

  - CSS Tricks: [Custom Scrollbars in WebKit](http://css-tricks.com/custom-scrollbars-in-webkit/)