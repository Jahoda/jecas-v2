---
title: "Kreslení v CSS"
headline: "„Kreslení“ pomocí CSS"
description: "Jak vytvářet jednoduché tvary místo obrázků prostým CSS?"
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["CSS", "Hotová řešení"]
---

## Kreslit (pomocí CSS), nebo nekreslit?

Vždy je potřeba zvážit, zda má smysl vytvářet komplikované konstrukce místo použití **prostého obrázku**.

### Výhody CSS

Výhody *kreslení* pomocí CSS mohou být:

Jednoduchost vytvoření
Je jednodušší napsat `background: red` než si v grafickém editoru kreslit červený obrázek, ukládat jej a potom psát `background: url(cerveny-obrazek.png)`.
Datová náročnost
Barevné pozadí místo obrázku bude nepochybně datově úspornější než obrázkové pozadí stejné barvy.
Snadná modifikace
Bude snazší původní CSS vlastnost přepsat na `background: blue` než v editoru překreslit červený obrázek na modrý.
  
  Změna velikosti
  
    *Nakreslené* prvky se mohou přizpůsobovat **různým velikostem** okna a typům displejů bez **ztráty kvality**. U obrázků to umí řešit vektorová grafika (např. [**SVG**](/svg) od **Internet Exploreru 9**).

### Výhody obrázků

Jednoduchost vytvoření
Je jednodušší nakreslit v editoru komplikovaný obrázek než v CSS kombinovat několik vlastností a ladit je napříč prohlížeči.
Datová náročnost
U obrázků lezoucí z různých CSS generátorů asi o datové úspornosti raději nemluvit.
Snadná modifikace
Bude snazší mnoho původních CSS vlastností přepsat nebo jinak vygenerovat než v editoru překreslit obrázek? Asi ne.

**Universální řešení tedy nejspíš neexistuje** a je potřeba individuálně zohlednit ten který prvek, pravděpodobnost jeho modifikace atd. (K tématu: DJPW: Patří procedurální grafika do CSS?).

## Samotné kreslení

Když pomineme bizarní možnosti jako totální CSS pixel art nebo triviality jako čára nebo čtverec, nabízí se.

### Trojúhelníky

Jeden z fíglů je využít toho, že nastavení silné tloušťky rámečku svým napojováním může vytvořit šikmý tvar.

A teď stačí samotný obsah odstranit nastavením nulové výšky…
```
.flag {
  width: 200px;
  height: 0;
  border-bottom: 100px solid red; 
  border-top: 100px solid #fff; 
  border-left: 200px solid blue;
  overflow: hidden;
}
```

A máme třeba vlajku.

A když necháme jen rámeček na jedné straně (ostatní rámečky budou mít průhlednou barvu – `border-color: transparent`), dosáhneme kýženého trojúhelníku, který lze upravováním tlouštěk rámečků všelijak modifikovat.

### Zaoblení a kruhy

**Zaoblené části** lze od **IE 9** vytvářet vlastností [border-radius](/border-radius).

### CSS generátory

Umí vytvářet různé [přechody](/gradient), [stíny](/box-shadow), [kulaté rohy](/border-radius) a další. Např. css3generator.com.

### Kreslení písmeny

První možnost je použít obyčejné znaky jako třeba `&lt;`, `&gt;`, `×` a při vhodném fontu, velikosti a stylu máme šipku doleva, doprava a křížek.
Druhá potom připojení zvláštního fontu, který místo běžných písmen obsahuje grafické symboly a ikony. Příklad. 
  
### Ikony v čistém CSS

[Ikony](/css-ikony) je teoreticky možné kreslit i [přímo v CSS](http://nicolasgallagher.com/pure-css-gui-icons/demo/).

## Zajímavé kresby

### Kde jsou hranice?

V zásadě je možné [nakreslit cokoliv](http://www.webdesignshock.com/50-impressive-css-drawings/), i když u složitějších konstrukcí to kromě jakési *exhibice* nedává moc smysl.

### Další *obrázky*

  - [Eric Cartman](http://codepen.io/LFeh/pen/qzDCJ)

  - [Bender](http://liveweave.com/GoGhKy)

  - [Chrome logo](http://codepen.io/kevinjannis/pen/pyuix)

  - [CSS Mac Plus](http://hop.ie/blog/macplus/)

  - [8 Pure CSS Flat Mobile Devices](http://marvelapp.github.io/devices.css/)

  - [Pure CSS Taj Mahal](http://codepen.io/jannypie/full/kbdDg)

## Odkazy jinam

  - [A Single Div](http://a.singlediv.com/) – úžasné *kresby* s využitím jediného `&lt;div>`u (hodně využívá [`box-shadow`](/box-shadow) a [gradienty](/gradient))

  - [Single Div Drawings with CSS](https://hacks.mozilla.org/2014/09/single-div-drawings-with-css/)

  - [Generative Art with CSS](https://generative-art-with-css.commons.host)