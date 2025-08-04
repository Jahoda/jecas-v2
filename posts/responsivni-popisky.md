---
title: "Responsivní popisky odkazů"
headline: "Responsivní popisky tlačítek"
description: "Jak na různě velkých obrazovkách měnit popisky odkazů a tlačítek."
date: "2016-04-08"
last_modification: "2016-04-10"
status: 1
tags: ["Responsivní design", "Odkazy"]
---

Při šetření místa na malých obrazovkách může být nevyhnutelné řešit zmenšení prvků jako jsou tlačítka, odkazy nebo položky v menu.

## Zmenšení velikosti

Jako první se nabízí zmenšit velikost textu pomocí [`font-size`](/font#size).

Problém tohoto postupu je, že malé písmo bude… malé. 

Kromě horší čitelnosti bude malý odkaz i špatně trefitelný prstem na dotykovém displeji.

Docela populární řešení této situace je používání **tlačítek s ikonkou** doplněných malým popiskem:

  - Plocha zůstane rozumně velká.

  - Význam tlačítka jde pochopit jen ze symbolu ikony.

Tento koncept používá třeba [Twitter](/twitter):

## Oříznutí textu

Asi nejsnazší možnost je odkazu/tlačítku nastavit maximální rozměry a zbytek nekompromisně **oříznout**. Díky `text-overflow: ellipsis` jde automaticky doplnit na konec trojtečku.

  Kdo bude přistižen, bude mu ustřižen.

Bohužel v takovém případě může utrpět srozumitelnost. Zvlášť u dotykových zařízení je komplikované umístit plný text popisku do [atributu `title`](/obecne-atributy#title), protože se k němu uživatelé nejspíš nedostanou.

    - [Oříznutí dlouhého textu](/oriznuti-textu) – různé způsoby oříznutí řádku textu

## Jiné texty

Jiná možnost je v závislosti na šířce viewportu (např. podle [`@media` pravidel](/media)) měnit varianty popisků.

  - Na velkém monitoru tak zobrazit například *Přidat nový fytopuf*,

  - na menším jen *Přidat fytopuf*

  - a na nejmenší obrazovce jen *Nový*.

Jak na to?

### Duplicitní odkazy

Asi nejsnazší je odkazy/tlačítka zkrátka zduplikovat:

```
&lt;a href="akce" class="desktop">
  Přidat nový fytopuf
&lt;/a>
&lt;a href="akce" class="mobile">
  Nový
&lt;/a>
```

A podle `@media` určit, která z variant se má zobrazovat:

```
.mobile {display: none}
@media (max-width: 50em) {
  .mobile {display: inline}
  .desktop {display: none}
}
```

Toto řešení není úplně ideální pro [vyhledávače](/seo) nebo hlasové čtečky, které mohou odkaz zaznamenat dvakrát.

Nabízí se tak pro informačně chudší obsah použít atribut [`aria-hidden`](/aria#hidden):

```
&lt;a href="akce" class="mobile" **aria-hidden="true"**>
  Nový
&lt;/a>
```

### Obalení slov

V některých případech může stačit řešení, kdy se některá slova popisku obalí [`&lt;span>`em](/div-span#span) a na mobilu skryjí:

```
&lt;a href="akce">
  Přidat&lt;span class="desktop"> nový fytopuf&lt;/span>
&lt;/a>
```

Na mobilech se potom skryje řetězec „ nový fytopuf“:

```
@media (max-width: 50em) {
  .desktop {display: none}
}
```

Toto řešení není moc universální – spoléhá na to, že v úsporném popisku bude slovní spojení, které je i v tom dlouhém pro desktop.

Další problém nejspíš nastane v případě vícejazyčného webu, kdy bude muset být text [překladu](/preklad) rozdělen na dvě části nebo používat zástupné znaky pro doplnění HTML značek:

```
"Přidat %s nový fytopuf %s", "&lt;span class='desktop'>", "&lt;/span>"
```

### Text v atributu

Relativně výhodné tak může být umístit různé popisky do `data-*` atributů a pomocí [`:before`/`:after`](/css-selektory#before-after) je vyvolat díky vlastnosti [`content`](/content-attr):

```
&lt;a href="akce" class="button" **data-title="Nový"**>
  &lt;span>Přidat nový fytopuf&lt;/span>
&lt;/a>
```

Popisek pro různé šířky se umístí do vlastního `data-*` atributu, plné znění popisku se obalí `&lt;span>`em, aby šel dlouhý obsah skrýt, a zbytek zařídí CSS:

```
@media (max-width: 50em) {
  .button:after {
    content:attr(data-title);
  }
  .button span {
    display: none;
  }
}
```

Podpora v prohlížečích je limitována od **IE 9** kvůli media queries a od **IE 8** kvůli `:before`.

[Samostatná živá ukázka](http://kod.djpw.cz/rgwb-)

## Různé překlady

Celou situaci ještě komplikují různé [jazykové verse](/jazyk), kvůli kterým je prakticky nemožné spoléhat na nějakou šířku textu.

Příklad délky pozvánek k události na [Facebooku](/facebook) v němčině a angličtině:

Dobrý poměr universálnosti, srozumitelnosti a pracnosti tak nabízí používání ikonek a oříznutí textu.