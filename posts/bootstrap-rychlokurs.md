---
title: "5minutový rychlokurs Bootstrapu"
headline: "5minutový rychlokurs Bootstrapu"
description: "Jak za 5 minut vytvořit web pomocí CSS frameworku Bootstrap."
date: "2016-01-22"
last_modification: "2016-01-23"
status: 1
tags: ["CSS", "Frameworky", "Rady a nápady"]
---

Bootstrap je populární CSS framework – stručně řečeno sada připravených hotových stylů, které lze pohodlně aplikovat na HTML kód a vytvořit tak ne úplně odpudivě vypadající stránku během pár minut bez nutnosti psát nebo znát CSS.

Pro některé vymoženosti je potřeba ještě `*.js` soubor, ale není to podmínkou.

## Výchozí styly prohlížeče

Používá-li stránka pouze prosté HTML, výsledné zobrazení obstará výchozí styl prohlížeče.

    - [Příklady výchozích hodnot CSS v prohlížečích](/css-reset#vychozi)

Ten zajistí, že například [nadpisy](/nadpisy) budou větším a tučným písmem, [odkaz](/odkaz) bude barevně odlišen, [tabulka](/tabulky) bude vypadat jako tabulka a podobně.

Výchozí formátování některých HTML elementů je vidět na následující [ukázce](http://kod.djpw.cz/sutb):

## Připojení Bootstrapu

Není-li chuť nebo čas se věnovat vymýšlení vlastního originálního vzhledu, trochu lepšího zobrazení se docílí prostým připojením CSS souboru `bootstrap.css`.

Pro zrychlení instalace není potřeba CSS soubor Bootstrapu ani stahovat, ale dá se připojit z [CDN](https://www.bootstrapcdn.com/) ([Content delivery network](/cdn)) vložením `&lt;link>` značky do [hlavičky](/html-kostra#head):

```
&lt;link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
```

Soubor `bootstrap.min.css` má po zagzipování docela přijatelných cca 25 kB.

Stránka se při načtení tohoto CSS zobrazí… [jinak](http://kod.djpw.cz/avtb):

Zatím se nedá úplně říct, že by vypadala mnohem lépe než ve výchozím zobrazení. Znatelného zlepšení se dosáhne až použitím vestavěných CSS tříd:

## Připravené styly

Studovat, jak se co v Bootstrapu dělá, je ideální procházením ukázek/příkladů. Jejich rozcestník je na následující stránce:

    - Bootstrap: [Getting started: Examples](http://getbootstrap.com/getting-started/#examples)

Při objevení nějakého prvku, který by se hodil na stránce použít, stačí použít funkci prohlížeče *Prozkoumat*, která zobrazí HTML kód ve [vývojářských nástrojích](/vyvojarske-nastroje). Tato možnost se objeví po kliknutí pravým tlačítkem na element (obrázek pochází z **Chrome**):

Tím se zobrazí HTML kód, kterým se po zkopírování do vlastníh HTML dosáhne stejného efektu jako na ukázkové stránce:

Tak jde snadno původní ukázku během pár minut zkrášlit ([ukázka](http://kod.djpw.cz/uutb)):

## Užitečné komponenty

Vzhledem k tomu, že o základní nastavení typografie se postará Bootstrap automaticky, lze si u jednoduchého webu vystačit jen s pár komponentami.

### Obal obsahu stránky

Obsah je běžně nalepený na okraje. Po přidání obalu dostane stránka maximální šířku a bude vodorovně [centrovaná](/centrovani):

```
&lt;div class="container">
  Obsah stránky
&lt;/div>
```

### Tlačítka

Pro tlačítka jsou připraveny styly pro různé velikosti a typy akcí (liší se barvami):

```
&lt;button class="btn btn-success">
  Odeslat
&lt;/button>
```

Styl tlačítek jde aplikovat i na odkazy `&lt;a href="…">`.

### Tabulky

Lépe formátovaných tabulek se docílí prostým přidáním třídy `table`.

```
&lt;table class="table">
```

Třída `table-striped` zajistí pruhovanou tabulku (odlišení lichých a sudých řádků):

```
&lt;table class="table **table-striped**">
```

Záhlaví tabulky se automaticky vytvoří po použití HTML značky `&lt;thead>`.

### Hlášky

Pokud web vypisuje nějaký obsah uživateli na základě jeho akce (např. odeslání formuláře), jsou k disposici varovné a potvrzující hlášky:

```
&lt;div class="alert **alert-success**">
  Obsah byl úspěšně odeslán.
&lt;/div>
```

Barevná podoba hlášky se určuje druhou třídou `alert-*`. Jde použít `alert-success`, `alert-info`, `alert-warning` a `alert-danger`:

### Formuláře

[Formuláře](/formulare) se označují třídou `form` u elementu `&lt;form>`. Řádkový formulář se vytvoří třídou `form-inline`.

Jednotlivá políčka [`&lt;input>`](/input) by měla mít `class="form-control"`. Skupina políček se obaluje třídou `form-group`.

Více o tvorbě formulářů je v následujícím přehledu:

    - Bootstrap Components: [Forms](http://v4-alpha.getbootstrap.com/components/forms/)

## Programátoři navrhují design

O Bootstrapu se někdy mluví jako o nástroji, který umožňuje programátorům vytvářet aplikace, které nejsou jako od programátorů.

Bohužel to platí jen částečně. Vzhledově skutečně jde pomocí Bootstrapu dosáhnout profesionálně vypadajícího vzhledu (byť v dnešní době značně tuctového). Co se ale týče dobré použitelnosti, využití Bootstrapu a jeho komponent ji v žádném případě negarantuje.