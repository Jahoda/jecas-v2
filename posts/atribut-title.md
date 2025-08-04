---
title: "Stylování atributu title"
headline: "Vlastní styl bubliny <code>title</code>"
description: "Jaké jsou možnosti pro vlastní vzhled nápovědy, která se objevuje při vyplnění atributu <code>title</code>."
date: "2013-06-12"
last_modification: "2016-04-21"
status: 1
tags: ["CSS", "Stylování elementů", "Rady a nápady", "HTML atributy"]
---

Atribut `title` je [obecný HTML atribut](/obecne-atributy) (lze jej přiřadit takřka ke všem značkám). A projevuje se zobrazením *bubliny* při najetí na HTML tag, který má `title` vyplněn.

```
&lt;p>&lt;span **title**='Já jsem text.'>Text&lt;/span> odstavce
```

  Tento text má nad sebou bublinu.

## Čisté CSS

Od **Exploreru 8** není problém [vypsat obsah atributu do stránky](/content-attr) po najetí myší.
```
span[title]:hover:after {
  content: attr(title); 
  /* vlastní vzhled */
}
```

Pomocí vlastního stylu jde popisek třeba [naposicovat](/position) nad slovo:

    span[title] {position: relative; border-bottom: 1px dotted #000; cursor: help}
    span[title]:hover:after {border: 1px solid #0D6AB7; color: #fff; border-radius: .2em; background: #1081DD; content: attr(title); position: absolute; top: -2em; left: 0; padding: 0 .2em; width: 8em}
  
  Tento text má atribut `title`.

Pomocí `transition` by šlo ještě vykouzlit nějaký efekt postupného objevení nebo tak něco.

Bohužel se ale kromě pečlivě nastylovaného popisku **objeví zároveň i popisek klasický**, jak jej vykresluje standardně prohlížeč.

### Vlastní název atributu

První možnost, jak nechtěný výchozí `title` řešit, je místo do `title` uvést popisek do [vlastního atributu](/vlastni-html-znacky):

    span[vlastni-title] {position: relative; border-bottom: 1px dotted #000; cursor: help}
    span[vlastni-title]:hover:after {border: 1px solid #0D6AB7; color: #fff; border-radius: .2em; background: #1081DD; content: attr(vlastni-title); position: absolute; top: -2em; left: 0; padding: 0 .2em; width: 8em}
    
  Tento text má atribut `vlastni-title`.

Pokud je komplikované všechny `title` atributy na stránce **přepsat přímo v kódu**, může to udělat JS na straně klienta.

## Stornování JavaScriptem

Výchozí `title` lze *vypnout*, tj. nastavit jej skriptem na prázdnou hodnotu.

Teoreticky by šlo popisek z `title` **přešoupnout do vlastního atributu** a ten použít místo `title` v CSS kódu výše uvedeném (ukázka).

Otázka ale je, zda když už se stejně JS do řešení zapojuje, nevytvořit popisek celý skriptem. Tedy udělat z `title` běžný element a ten umístit k elementu s popiskem při [`onmouseover`](/udalosti-mysi#onmouseover) (najetí myši).

Díky JS půjde i zajistit, aby se popisek inteligentně umisťoval do *viewportu* (CSS popisek bude klidně mimo stránku, když to tak vyjde).

Výhodné rovněž je popisek umístit rovnou do obalu stránky (nikoliv do elementu, který popisuje). Není potom problém používat `overflow: hidden` – CSS popisek přes `:before`/`:after` by to ořízlo.

## Hotová řešení

Z hotových řešení:

  - [Popisek obrázku](/tooltip) (používá čisté CSS)

  - [POPPER.JS](https://popper.js.org) (chytré umisťování tooltipů pomocí JS)

  - [Simptip](http://arashm.net/lab/simptip/) (používá jen CSS, místo `title` se používá vlastní atribut)

  - [Zepto Tooltip](https://github.com/ptech/zepto-tooltip) (popisek postavený nad frameworkem [Zepto](/framework-zepto), [demo](http://ptech.github.io/zepto-tooltip/))

  - Opentip (používá jQuery a místo `title` vlastní atribut)

  - 40+ různých tooltip skriptů

## Nejlepší `title` je žádný `title`

Ještě se nabízí `title` vůbec nepoužívat a popisek dát přímo do nějaké HTML značky nebo v případě textu do závorek. Dává to docela smysl.

    Obsah atributu `title` **není moc přístupný**. Může být docela problém na **dotykových zařízeních** nebo **bez myši** se k jeho obsahu dostat.

    Třeba i iPadu/iPhone se jde dostat k `title` jen u [obrázku](/obrazky).

      Obsah je náchylnější k **přehlédnutí**.

        Obsah atributu se **obtížně hledá** běžnou funkcí prohlížečů **Hledat** (Ctrl + F).

          Text vložený přes `content` neumí většina prohlížečů označit.

          Z těchto důvodů mu **vyhledávače** budou nejspíš přikládat nízkou váhu.

### Zobrazení `title` v závorce

Čistě v CSS jde popisek z `title` *rozbalit* do závorky. Příklad pro populární značku `&lt;abbr>` s atributem `title`:

```
abbr[title] {
    border-bottom: 0;
}

abbr[title]:after {
    content: "(" attr(title) ")";
}
```

Problémy s označováním a vyhledáváním textu z atributu ale přetrvávají.