---
title: "Obtékané boxy s proměnlivou šířkou"
headline: "Obtékané boxy s proměnlivou šířkou"
description: "Jak udělat, aby se obtékané boxy přizpůsobovaly proměnlivé velikosti okna."
date: "2014-01-21"
last_modification: "2016-01-27"
status: 1
tags: ["CSS", "Hotová řešení", "Responsivní design"]
---

Při tvorbě responsivního webu, kdy se [šířka stránky](/sirka-stranky) odvozuje od velikosti okna, je vhodné jednotlivým boxům nastavit rozměry v procentech. Díky tomu se optimálně využije dostupná šířka.

Pomocí [pravidel `@media`](/mobilni-web#media-queries) se potom zvyšováním procentuální šířky při menší dostupné šířce okna docílí postupného snižování počtu sloupců:

## Řešení

### 5 sloupců

Při maximální šířce budou na stránce 5 sloupců (100 % / 5 = 20 %):

```
.box {
  float: left;
  width: 20%;
}
```

### 4 sloupce

Při zmenšení šířky se sníží počet sloupců na čtyři o šířce 25 procent (100 % / 4 = 25 %):

```
@media screen and (max-width: **50em**) {
  .box {width: 25%}
}
```

Šířka `@media` pravidla se zadává v jednotkách `em`, aby se případně dobře **přizpůsobovala velikosti písma**, kterou si návštěvník nastavil v operačním systému nebo prohlížeči.

Při použití pixelů by při zvětšením/zmenšení písma hodnoty neodpovídaly:

    - Responsivní design webu: [Rozměry media queries v pixelech](/responsivni-web#px)

### 3 sloupce

Při nastavování šířky pro 3 sloupce začne být menší problém dopočítat výslednou hodnotu, protože 100 % nejde třemi dělit beze zbytku.

Nejpřesnější možné hodnoty pro takové dělení jde nejspíš dosáhnout CSS funkcí [`calc`](/calc) funkční od **IE 9**:

```
.box {
  width: calc(100% / 3);
}
```

Pro starší prohlížeče založené na **Webkitu** potom ještě s [prefixem `-webkit-`](/css-prefixy):

```
.box {
  width: calc(100% / 3);
  width: **-webkit-**calc(100% / 3);
}

```

Jako záložní pro prohlížeče nepodporující `calc` jde navíc uvést hodnotu spočítanou na kalkulačce.

```
.box {
  width: **33.3333333%**;
  width: calc(100% / 3);
  width: **-webkit-**calc(100% / 3);
}

```

Potom si člověk výsledek zobrazí v **IE** / [**MS Edge**](/microsoft-edge) a zjistí, že se při určitých šířkách mřížka špatně zobrazuje:

    - [Chyba zaokrouhlování procent u `calc` v IE/Edge](http://kod.djpw.cz/seqb-)

Zbavit se tohoto problému jde třeba odečtením setiny pixelu ve funkci `calc`. Výsledný kód dobře funkční i v **IE**:

```
@media screen and (max-width: 40em) {
  .box {
    width: 33.3333333%; 
    width: calc(100% / 3 - 0.01px);
    width: -webkit-calc(100% / 3 **- 0.01px**);     
  }
}
```

### 2 a 1 sloupec

Pro jeden a dva sloupce je už nastavení šířky snadné:

```
@media screen and (max-width: 30em) {
  .box {width: 50%}
}
@media screen and (max-width: 20em) {
  .box {width: 100%}
}
```

    [Živá ukázka výsledku](http://kod.djpw.cz/djqb-) – proměnlivý počet obtékaných boxů s šířkou v procentech

## Stejná výška

Aby přeskládávání obtékaných boxů dobře fungovalo, je vhodné, když všechny boxy mají **stejnou výšku**.

Nastavovat obsahu pevnou výšku vlastností [`height`](/height) zpravidla nevěstí nic dobrého, protože při zvětšení písma nebo různě dlouhém obsahu mohou nastat problémy.

Přebytečný text jde třeba [oříznout](/oriznuti-radek) po určitém počtu řádků.

Jsou-li v obtékaných boxech [obrázky](/obrazky), hodí se použít trik s dopočítáváním výšky podle šířky, aby při načítání stránka neposkakovala:

    - [Nastavení výšky responsivního obrázku](/rozmery-responsivniho-obrazku)

### Různá výška

Pan [**habendorf**](http://1-webdesign.cz/) doplnil řešení, co dělat v případě, kdy je nutné, aby boxy měly proměnlivou výšku.

Je k tomu potřeba použít na konci řádku CSS vlastnost [`clear`](/float#clear). Problém je, že při různém počtu boxů na řádek není jasné, kde je konec řádku.

Takže se mezi jednotlivé boxy nastrkají elementy pro clearování, které se potom v příslušných `@media` pravidlech skryjí/zobrazí, když je to potřeba.

  Jeden sloupec neřeším – tam netřeba floatovat. Za každej druhej blok vrazim něco (`br`, `hr`) `.cleaner .cleaner_2col`, za třetí `.cleaner .cleaner_3col` a za čtvrtej `.cleaner .cleaner_4col.`

  `.cleaner` si nadefinuju a ty `.cleaner_xcol` už jen `display: none` dle potřeby.

V novějších prohlížečích si jde poradit bez změny HTML kódu pomocí pseudo-elementu [`:before`/`:after`](/css-selektory#before-after) (**IE8+**) a selektorů [`:nth-child`](/css-selektory#n-ty-potomek) (**IE9+**).

## Zarovnání do bloku

V případě položek, které mají mít fixní rozměry, je možné použít zarovnání do bloku:

```
.obal {
  text-align: justify;
}
.polozka {
  display: inline-block;
  width: 100px;
}
```

To zajistí vytvoření rozestupů mezi položkami, aby vyplnily celou šířku. Bohužel to neřeší poslední řádek, který se v případě, že na něj zbude méně položek, zobrazí odlišně.

[Živá ukázka](http://kod.djpw.cz/uasb) – zarovnání do bloku

## Flexboxy?

Dosáhnout podobného výsledku jde kromě obtékání i s [flexboxy](/flexbox).

Při nastavení `flex-wrap: wrap` pro obal jednotlivých boxů a `flex-grow: 1` spolu s pevnou šířkou (nikoliv v procentech) pro jednotlivé položky se dosáhne automatického  přizpůsobování položek dostupnému prostoru bez nutnosti nastavovat různou šířku v `@media` pravidlech.

Bude ale stejně potřeba řešit situaci, kdy na posledním řádku zbude počet boxů neodpovídající počtu sloupců.

[Živá ukázka](http://kod.djpw.cz/uytb)

    - CSS Tricks: [Designing A Product Page Layout with Flexbox](https://css-tricks.com/designing-a-product-page-layout-with-flexbox/)