---
title: "Responsivní logo"
headline: "Responsivní logo stránky"
description: "Jak vytvořit logo, které se bude přizpůsobovat velikosti stránky."
date: "2014-11-15"
last_modification: "2016-02-19"
status: 1
tags: ["CSS", "Responsivní design", "Obrázky"]
---

Existují tři základní způsoby, **jak na stránku vložit logo**:

  - Jako obrázek značkou `&lt;img>`.
  
  - Pomocí CSS pozadí (vlastnost `background`).

  - Vytvořit logo fontem.

## Obrázek `&lt;img>`

Použít běžný obrázek je asi nejjednodušší. Zároveň je triviální řešení situace, kdy se obrázek nenačte – jde použít atribut `alt`.

```
&lt;img src="logo.png" **alt="Název"**>
```

Nenačtený obrázek jde do jisté míry i stylovat:

    .neexistujici {
      background: #DA3F94;
      font-size: 40px;
      color: #8ECCF0;
    }

**Výhoda** skutečného obrázku je kromě snadné realisace i v tom, že jde o **skutečný obrázek**, takže si ho:

  - všimnou [**vyhledávače**](/seo),

  - dokáží ho najít nástroje pro **sdílení na sociálních sítích**,

  - nezmizí při [**tisku**](/tisk),

  - uživatelé si ho dokáží **snadno zkopírovat/uložit**

Většina z toho jde řešit i při jiném řešení, ale tady je to rovnou bez extra práce navíc.

Zásadní **nevýhoda** loga vloženého značkou `&lt;img>` je ale v tom, že s ním **nejde nic moc dělat**. Při tvorbě [responsivního webu](/responsive) se někdy může hodit vyměnit logo za jiné, které se lépe vejde do dostupného prostoru.

Teoreticky by šlo vložit `&lt;img>` značek několik a pomocí pravidla `@media` mezi nimi přepínat, problém je ale v tom, že **není možné jednoduše zabránit stažení** obrázku zapsaného do `&lt;img>`, i když je skrytý pomocí CSS.

Obrázky vložené značkou `&lt;img>` se stahují vždy:

    - [Kdy začne stahování `&lt;img>` obrázku](/zacatek-stahovani-obrazku)

## Značka `&lt;picture>`

HTML značka `&lt;picture>` právě řeší problém `&lt;img>` pro načítání různých obrázků v závislosti na šířce s využitím [atributu `media`](/html-media):

```
&lt;picture>
  &lt;**source** media="(min-width: 45em)" srcset="logo-velke.png">
  &lt;**source** media="(min-width: 32em)" srcset="logo-stredni.png">
  &lt;*img* src="logo.png" alt="Popis obrázku">
&lt;/picture>
```

[Podporují](http://caniuse.com/#feat=picture) ji prohlížeče [**MS Edge**](/microsoft-edge), **Chrome 38+**, **Firefox 33+**, **Opera 25+**.

Nefunkčnost v **IE** nemusí tolik vadit, protože mobilní **IE**, kde je responsivní logo převážně potřeba (na desktopu tolik ne), nejsou tolik rozšířeny. Navíc se v nepodporovaných prohlížečích zobrazí obrázek v `&lt;img>` a zbytek bude ignorován.

Podpora může chybět hlavně v **Safari 9.2** a starších na **iOS**.

## CSS `background`

V současnosti s nejlepší podporou řeší responsivní logo **pozadí** – CSS vlastnost `background`.

Do HTML kódu se vloží prázdný element:

```
&lt;div class="logo">&lt;/div>
```

Případně rovnou odkaz, protože **logo by mělo být klikací** (odkazovat na hlavní stranu).

```
&lt;a class="logo" href="./">&lt;/a>
```

A logo se nastaví jako pozadí:

```
.logo {
  display: inline-block;
  width: 250px;
  height: 50px;
  background: url(logo.png);
}
```

### Media queries

Přepnutí loga při **menší šířce** se zajistí díky [media queries](/media):

```
@media (max-width: 45em) {
  .logo {
    background: url(logo-mensi.png);
  }
}
@media (max-width: 35em) {
  .logo {
    background: url(logo-nejmensi.png);
  }
}
```

### CSS sprite

Díky tomu, že je logo **nastavené jako pozadí**, jde navíc zakomponovat do [CSS spritu](/css-sprite) pro snížení počtu stahovaných souborů.

### Alternativní text

Problém tohoto přístupu s **prázdným elementem** je v absenci **alternativního textového obsahu**.

To jde vyřešit různě:

  - Atributem [`aria-label`](/aria#label).

  - Umístěním textu do loga a jeho následným skrytím.

  - Umístěním textu do loga a následným **překrytím** [absolutně](/position#absolute) posicovaným obrázkem přes původní text, tzv. [image replacement](/obrazek-text#optimalni). To je asi nejlepší řešení, které obstojně funguje i při **nenačtení obrázků**.

## Textové logo

Vůbec nejpohodlnější pro následné vytváření responsivního loga je textovou část *nakreslit* v CSS.

Obyčejnému textu jde v CSS přidat řadu efektů, aby **vypadal atraktivně**:

    - Text v obrázku: [Vzhled textu v CSS](/obrazek-text#vzhled-textu)

Tento postup jde použít ale jen v případě, že logo sestává z nějakého symbolu + textu napsaného běžným fontem.

Realisovat logo pomocí [font ikony](/font-ikony) a načítat kvůli němu zvláštní font přes [`@font-face`](/font-face) by ale už možná bylo zbytečné.

Textové logo má navíc další výhodu v tom, že z něj jde snadno kopírovat text – například **název webu**.

## SVG

Pro většinu log se hodí použít [vektorový formát SVG](/svg). Ten zajišťuje perfektní ostrost loga nezávisle na jeho rozměrech a často i nízkou datovou náročnost.

V závislosti na způsobu [vložení](/svg#vlozeni) může jít SVG logo i snadno přebarvovat (stejně jako textové logo).

## Odkazy jinam

  - 9elements: [Building a responsive image](https://medium.com/9elements/building-a-responsive-image-e4c6229fa1f6) – responsivní SVG logo

  - Sitepoint: [Rethinking Icon and Logo Design for the Responsive Web](http://www.sitepoint.com/rethinking-icon-logo-design-responsive-web/)

  - [Responsive Logos, Part 1: Tips for Adapting Logos for Small Screens](http://viget.com/inspire/responsive-logos-part-1-tips-for-adapting-logos-for-small-screens)