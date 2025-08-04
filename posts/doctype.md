---
title: "Doctype"
headline: "HTML značka <code>&lt;!doctype></code>"
description: "Jaký (a jestli vůbec) psát <code>&lt;!doctype></code> do stránky?"
date: "2013-06-11"
last_modification: "2016-02-23"
status: 1
tags: ["HTML", "CSS", "HTML značky", "Rady a nápady"]
---

```
&lt;!doctype html>
```

HTML `&lt;!doctype>` je zvláštní část kódu, která se obvykle zapisuje na začátek HTML stránek.

V minulosti se hodila pro přepínání režimů prohlížečů. V dnešní době se prakticky vždy hodí používat **standardní režim**, kterého jde docílit jednoduchým tvarem:

```
&lt;!doctype html>
```

Při neuvedení `&lt;!doctype>` se použije tzv. quirk režim (nestandardní režim zpětné kompatibility).

## Standardní režim

Standardní mód zajistí co možná nejjednotnější chování napříč nejpoužívanějšími prohlížeči. A umožní (hlavně v případě starých **IE**) využívat nové vlastnosti. Je tedy docela vhodné jej používat.

## Rozdíly vykreslovacích režimů

### Rozdíly v box-modelech

Nejzásadnější rozdíl je v počítání rozměrů bloků, tzv. [box modelu](/box-model) v **Internet Exploreru**.

  - Režim **standardní** / *obsahový* / `box-sizing: content-box` přičítá k rozměrům [výšky](/height)/šířky elementu i rozměry `padding`ů a `border`ů,

  - Režim **nestandardní** / quirk / okrajový / `box-sizing: border-box` respektuje zadané rozměry šířky/výšky a rámečky a odsazení provede „uvnitř“.

Jako výhodnější box-model se zdá být ten nestandardní, kde je šířka nastavená vlastností `width` konečná a rozměry `border`u a `padding`u na ní nemají vliv.

Některé komplikované CSS konstrukce se v okrajovém modelu (quirk) **řeší lépe** než v obsahovém (standardní režim) nebo jsou **ve standardním režimu neřešitelné** (bez přepnutí box-modelu).

Od **IE 8** a prakticky ve všech ostatních prohlížečích jde box-model přepnout na úrovní CSS následujícím předpisem s využitím vlastnosti [`box-sizing`](/box-sizing):

```
*, *:before, *:after {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

```

Ve starších **IE** byla jediná možnost, jak docílit *výhodnějšího* okrajového box-modelu, použít quirk režim. Pro starší Explorery sice existuje ještě `[boxsizing.htc](https://github.com/Schepp/box-sizing-polyfill)`, ale nejspíš to nebude fungovat 100% jako opravdový okrajový (`border-box`) box-model.

Prohlížeče mimo **IE** mají box-model stále stejný nezávisle na (ne)uvedení `&lt;doctype>`.

### Dědičnost velikosti písma v tabulce

V quirk režimu obsah [tabulky](/html-tabulky) nezdědí velikost písma od svého rodiče.

Text v tabulce a mimo tabulku tak bude mít jinou velikost. Ve standardním režimu ji bude mít stejnou.

```
&lt;div style="120%">
  Text mimo tabulku
  &lt;table>
    &lt;tr>
      &lt;td>Text v tabulce
    &lt;/tr>
  &lt;/table>
&lt;div>
```

Zbavit se tohoto chování jde pomocí `[font-size](/font#size): 100%` pro tabulku.

[Živá ukázka](http://kod.djpw.cz/cuub)

### Nepovinné jednotky `px`

V quirku se CSS jednotky uvedené bez rozměrů budou automaticky považovat za pixely. Následující zápis tak bude plně funkční:

```
element {
  width: 100;
  height: 100;
}
```

Při používání standardního režimu je nutné napsat `100**px**`.

### Další rozdíly

Výše uvedené rozdíly jsou nejzásadnější, existují ale ještě další odlišnosti:

    - Quirksmode.org: [Quirks mode and strict mode](http://www.quirksmode.org/css/quirksmode.html)

    - MDN: [Quirks Mode and Standards Mode](https://developer.mozilla.org/en-US/docs/Quirks_Mode_and_Standards_Mode)

## Zpětně kompatibilní režim (quirk)

Quirk je v překladu rozmar, výstřelek nebo vrtoch.

Quirk režim se používal hlavně v minulosti, protože sjednocoval chování starých **Explorerů** (neznalých obsahového box-modelu – starší než **IE 6**). Nemuselo se potom tolik ladit pro různé verse IE.

Později (**IE 6**–**IE 7**) byl quirk možnost, jak záměrně docílit v **Internet Explorerech** okrajového box-modelu.

## „Almost Standards“

Některé prohlížeče mají ještě „skoro standardní“ režim, ten se ale liší jen velmi nepatrně od normálního standardního. (Více o tom na [MDN](https://developer.mozilla.org/en-US/docs/Gecko's_Almost_Standards_Mode).)

## Historie `&lt;!doctype>`

Před HTML 5 se objevovaly různé obskurní *doctype* jako:
```
&lt;!doctype html public "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
&lt;!doctype html "-//W3C//DTD HTML 4.01//EN">
```

Či dokonce XHTML podoby:

```
&lt;!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

Vzhledem k tomu, že `&lt;!doctype>` slouží pouze k **přepnutí režimu**, používá se dnes převážně stručná podoba:

```
&lt;!doctype html>
```

### Přepínání versí HTML

Dříve se mohlo zdát, že `&lt;!doctype>` slouží k přepínání versí (X)HTML.

To se ale nikdy nedělo a neděje, protože prohlížeče verse HTML nebo CSS nerozlišují.

Kromě přepínání vykreslovacího režimu tak má *doctype* vliv pouze na [validátor](/validita).

## Standardní, ne standartní

V českém jazyce se přídavné jméno slova „standard“ píše s D.