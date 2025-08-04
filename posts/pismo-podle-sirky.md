---
title: "Velikost písma podle šířky"
headline: "Velikost písma podle šířky"
description: "Jak přizpůsobovat velikost písma aktuální šířce stránky."
date: "2015-10-05"
last_modification: "2015-10-05"
status: 1
tags: ["Hotová řešení", "Responsivní design", "Písma"]
---

Při tvorbě **responsivního webu** může v některých případech bloků psaných **hodně velkým písmem** – třeba u [nadpisů](/nadpisy) – dávat smysl je u menších šířek obrazovky zmenšit.

Jak na to?

Zatímco třeba výška jde stanovit [procentuálně k šířce](/vyska-podle-sirky), procenta u vlastnosti `font-size` fungují jinak – stanovují poměr velikosti písma ke svému rodiči.

Existují ale různé způsoby, jak podle šířky **odvozovat i velikost písma**:

## Pravidlo `@media`

Asi nejčastější je použití [media queries](/mobilni-web#media-queries). Stanoví se break-pointy, kdy se písmo zmenší:

```
h1 {font-size: 320%}
@media (max-width: 60em) {
  h1 {font-size: 280%}
}
@media (max-width: 40em) {
  h1 {font-size: 250%}
}
@media (max-width: 30em) {
  h1 {font-size: 200%}
}
```

[Živá ukázka](http://kod.djpw.cz/npqb-) – změna velikosti písma pomocí `@media`

Tento postup se vyznačuje několika **skoky mezi velikostmi**. Teoreticky by šlo nějakým CSS preprocesorem vygenerovat desítky různých variant pro různé šířky, ale v případě více elementů na stránce to může být datově náročné.

## Jednotka viewport

Od **IE 9** fungují jednotky závislé na šířce nebo výšce viewportu. Nefungují ve staré **Opeře 12**, mobilní **Opeře Mini** a starých **Android Browserech** do verse 4.3.

```
h1 {
  font-size: 10vw;
}
```

Hodnota `1vw` (***v**iewport **w**idth*) odpovídá setině šířky *viewportu*, tedy `10vw` je desetina šířky. V případě zobrazení stránky ve FullHD (1920 pixelů na šířku) bude potom výše uvedený nadpis **192 pixelů velký**.

[Živá ukázka](http://kod.djpw.cz/ppqb-) – viewport jednotky pro písmo

Jednotku `vw` se nabízí zkombinovat s `@media` pravidly, aby se velikost nedostala do nesmyslně malých/velkých hodnot.

Mezi šířkou `25`–`60em` se bude velikost písma řídit **šířkou viewportu**, jinak se nastaví na pevnou maximální/minimální hodnotu:

```
h1 {
  font-size: 300%;
}
@media (min-width: 25em) and (max-width: 60em) {
  h1 {font-size: 6vw}
}
@media (max-width: 25em) {
  h1 {font-size: 160%}
}
```

[Živá ukázka](http://kod.djpw.cz/upqb-) – omezení hranic, kdy se velikost písma přizpůsobuje šířce

### Šířka elementu, ne viewportu

Problematické trochu je, když se má `font-size` počítat podle šířky **konkrétního elementu**, který neodpovídá šířce viewportu.

To bude typicky problematické u webu s **pružným layoutem a omezenou maximální šířkou stránky**. Zde nezbývá než opět použít *media-queries* a velikost písma závislou na šířce aplikovat jen někdy.

Vytvořit dobře funkční přizpůsobování s použitím jednotky `vw` tak může dát **dost práce s kalkulačkou** při stanovování hodnot.

Tento postup bude i složitý na případné **změny rozměrů bloků**, kdy bude nutné všechno přepočítat. Zpřehlednění může přinést funkce [`calc`](/calc). Ta ale nefunguje v `@media` pravidlech, takže bude lepší **provádět výpočty** s použitím CSS preprocesoru.

Nebo použít JavaScript:

## Počítání velikosti JavaScriptem

Pro starší prohlížeče nebo pro **přehlednější a pohodlnější počítání** poslouží JavaScript.

Šířka požadovaného elementu se zjistí z `offsetWidth` a potom stačí už jen určit **poměr šířky k velikosti písma** – a takovou hodnotou šířku vydělit.

```
var velikost = element.offsetWidth / pomer;
```

Pro omezení **minimální a maximální velikosti** jde použít `Math.min`/`max`:

```
var velikostPisma = Math.max(
  20, // minimální velikost
  Math.min(
    60, // maximální velikost
    velikost
  )
);
```

[Živá ukázka](http://kod.djpw.cz/ypqb-) – změna velikosti písma podle šířky v JavaScriptu

Největší problém JS řešení bude v tom, že do jeho vykonání bude mít písmo **jinou velikost**. To nejspíš způsobí nepěkné **poskočení** po přepočtu.

Existují i lehce sofistikovanější hotová řešení v JavaScriptu:

    - [FlowType.JS](http://simplefocus.com/flowtype/) – velikost písma podle šířky

    - [FitText](http://fittextjs.com/) – jQuery plugin zajišťující přizpůsobení velikosti písma

## Odkazy jinam

  - Smashing Magazine: [Truly Fluid Typography With vh And vw Units](https://www.smashingmagazine.com/2016/05/fluid-typography/)