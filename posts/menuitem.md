---
title: "Kontextová nabídka s menuitem"
headline: "Kontextová nabídka <code>&lt;menuitem></code>"
description: "HTML značka <code>&lt;menuitem></code> umožňuje vytvořit <i>nativní</i> kontextovnou nabídku."
date: "2014-10-07"
last_modification: "2014-10-07"
status: 1
tags: ["HTML", "HTML značky"]
---

Stručně řečeno umí značka `&lt;menuitem>` vytvořit nabídku, která se objeví po stisknutí **pravého tlačítka myši**, bez nutnosti používat JavaScript.

[Kontextová nabídka v JavaScriptu](/kontextova-nabidka) je popsána v samostatném článku.

## Podpora

Zatím funguje jen ve **Firefoxu** (od verse 8).

## Zápis

Nejjednodušší příklad, který vytvoří *kontextové menu* o jedné položce, vypadá následovně.

```
&lt;menu **type="context"** id="*kontextove-menu*">
  &lt;menuitem label="Popisek" onclick="alert(1)">
  &lt;/menuitem>
&lt;/menu>
```

  - Jako *obal* se používá stará dobrá značka `&lt;menu>`.

  - Atribut `type` nastavený na `context` určuje, že se jedná o kontextovou nabídku, což v **podporovaných prohlížečích** skryje vnitřek `&lt;menu>`.

  - Identifikátor (`id`) je důležitý pro pozdější **navázání kontextové nabídky** ke kontextu (nějakému elementu, kde se má menu zobrazit).

### Připojení k elementu

```
&lt;div **contextmenu**="*kontextove-menu*">
  Obsah
&lt;/div>
```

[Živá ukázka](http://kod.djpw.cz/xdgb) (funkční ve **Firefoxu 8+**)

## Značka `&lt;menuitem>`

Element `&lt;menuitem>` má řadu atributů.

  `label`
  
    Popisek nabídky.

  `onclick`
  
    JavaScriptová akce, co se provede po kliknutí. Kvůli přehlednosti je lepší **volat nějakou funkci** než přímo od atributu psát složitější JS kód.

  `icon`
  
    URL ikonky pro danou akci.

  `disabled`
  
    Deaktivuje položku.

## Více úrovní

Do značky `&lt;menu>` se dajší zanořovat další `&lt;menu>`. Když se vnořené značce `&lt;menu>` přidá atribut `label`, její obsah se stane nižší úrovní.

```
&lt;menu type="context" id="kontextove-menu">
  &lt;menu **label="Více"**>
    &lt;menuitem label="Popisek" onclick="alert(1)">
    &lt;/menuitem>
  &lt;/menu>
&lt;/menu>
```

[Živá ukázka](http://kod.djpw.cz/ydgb)

## Oddělení nabídek

Použitím `&lt;menu>` bez `label` atributu potom může vzniknout **nová sekce** oddělená vodorovným rámečkem.

```
&lt;menu type="context" id="kontextove-menu">
  &lt;menu>
    &lt;menuitem label="Popisek" onclick="alert(1)">
    &lt;/menuitem>
  &lt;/menu>
  &lt;menu>
    &lt;menuitem label="Popisek oddělený" onclick="alert(1)">
    &lt;/menuitem>
  &lt;/menu>
&lt;/menu>
```

[Živá ukázka](http://kod.djpw.cz/zdgb)

## Odkazy jinam

  - DevDocs: [&lt;menuitem>](http://devdocs.io/html/element/menuitem)

  - Mozilla Hacks: [HTML5 context menus in Firefox](https://hacks.mozilla.org/2011/11/html5-context-menus-in-firefox-screencast-and-code/)