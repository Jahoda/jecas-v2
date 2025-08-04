---
title: "Plynulé odrolování"
headline: "Plynulé scrollování na obsah"
description: "Jak vytvořit plynulé odrolování na určitou část stránky."
date: "2014-10-03"
last_modification: "2025-04-01"
status: 1
tags: ["JavaScript", "CSS", "Scrollování"]
---

Na delší stránce, kde se na jednotlivé části odkazuje pomocí kotev (typicky u **jednostránkových webů**), může být hezké dané přesunutí udělat **plynule**. Výchozí chování prohlížečů je takové, že po kliknutí na odkaz:

```
&lt;a href="#nazev">Odkaz&lt;/a>
```

Se okamžitě přeskočí na příslušný obsah.

```
&lt;div id="nazev">
  …
```

## CSS vlastnost `scroll-behavior`

Dříve se tyto věci řešily relativně složitými JavaScripty, dnes to vyřeší jeden řádek CSS:

```
html { scroll-behavior: smooth; }
```

A všechny přesuny na stránce budou plynulé.

[Živá ukázka](https://kod.djpw.cz/dond)

Funguje to dokonce i v dalších scrollovatelných oblastech vytvořených pres `overflow: auto`. [Ukázka](https://kod.djpw.cz/eond).

Plynulé rolování **je plně v režii prohlížeče**, takže už nejde nastavovat věci jako rychlost rolování nebo jeho celkovou dobu.

  - MDN: [`scroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)

### #hash v adresním řádku

Věc k úvaze je, zda nevadí promítání `#hash`e do adresy. Někdy to může být nevýhoda, protože méně zkušený návštěvník často nevědomky odkáže na **konkrétní část** v domnění, že odkazuje celou stránku.

Toto je třeba zvážit s ohledem na typ konkrétní stránky. Na některých stránkách se spoustou odkazů na kotvy dokonce bývá běžné, že se kotvy v adresním řádku **automaticky mění** během posouvání stránkou, potom to může být žádoucí.

Ale určitě existují případy, kdy je lepší naopak nechávat adresu *čistou*. Potom přichází do hry JavaScript.

## Řešení v JavaScriptu

V JS jde k nejen plynulému rolování použít metodu [`scrollIntoView`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView):

```
document.getElementById("dolu").scrollIntoView({ behavior: "smooth" })
```

Metoda `scrollIntoView` má řadu možností nastavení.

    Pomocí `{behavior: "instant"}` jde změnit rolování na okamžité místo plynulého.

    Přes `block`/`inline` jde nastavovat chování pro vodorovné a svislé rolování, co se týče *zarovnání*.

        `start` – cílový element bude nahoře/vlevo

        `center` – uprostřed

        `end` - dole/vpravo

        `nearest` – zajímavá vlastnost zajišťující, že se zarovná tam, kde bude potřeba méně scrollovat

Příklad může být:

```
document.getElementById("dolu").scrollIntoView({
  block: "nearest",
  behavior: "smooth"
})
```

Užitečné jsou i vlastnosti `scroll-margin-top` a `scroll-margin-bottom` pro posunutí elementů mimo fixní prvky (např. fixní hlavička webu).

## Historie plynulého scrollování v JavaScriptu

Když tento článek v roce **2014** vznikal, situace byla dost odlišná. Plynulé scrollování se muselo **ručně animovat**. Pro zajímavost zde zůstává tento text v původním znění:

S použitím **jQuery** je to otázka pár řádků kódu.

[Ukázka](http://kod.djpw.cz/cjhb)

V čistém JS není narozdíl od jQuery funkce pro animování. Dá se vytvořit třeba tak, že se na základě požadovaného počtu snímků za vteřinu (například 60) vypočítá počet kroků na základě požadované doby animace.

```
var dobaAnimace = 200; // 200 milisekund
var delkaKroku = 1000 / 60; // 60 snímků za vteřinu (1000 ms)
var pocetKroku = dobaAnimace / delkaKroku;
```

Délka jednoho kroku bude přibližně 16 (`1000 / 60 = 16,66`), kroků pro 200ms animaci potom bude 12 (`200 / (1000 / 60) = 12`).

Následně je potřeba zjistit o kolik je odrolováno v době kliknutí na odkaz.

```
var odrolovano = document.documentElement.scrollTop + 
  document.body.scrollTop;
```

Umístění cíle zjistíme elegantně z vlastnosti `top` získané metodou `getBoundingClientRect`, která vrátí kladnou nebou zápornou vzdálenost k cíli od **horní hrany** (což je předchozí `odrolovano`).

```
var souradniceCile = cil.getBoundingClientRect();
var vzdalenostCile = souradniceCile.top;
```

Nyní stačí na základě počtu kroků spočítat **posun pro každý krok** – `vzdalenostCile` se vydělí počtem kroků.

```
var rozdilKroku = vzdalenostCile / pocetKroku;
```

V proměnné `rozdilKroku` tak nyní bude hodnota, kterou je nutné přičítat k hodnotě `odrolovano`. To nám dá pro každý krok hodnotu pro částečný **posun směrem k cíli**. Se známou novou hodnotou pro posun už jen použijeme `window.scrollTo`.

[Celá ukázka](http://kod.djpw.cz/ijhb)

### Délka animace

Doba, za kterou se stránka plynule posune, by neměla být **vysoká**, protože by takový efekt nepříjemně zdržoval.

Relativně rozumná délka animací mi přijde někde okolo **200 milisekund**. Animace by měla mít nějaký smysl. V tomto případě například pomůže uživateli odhadnout jakým směrem nebo jak daleko *byl odrolován*.

Dobré je také nemít průběh animace **lineární**, ale průběh ke konci zpomalovat.

### Řešení Smooth Scroll

Po napsání vlastní funkce jsem objevil pokročilejší hotové řešení.

[Smooth Scroll](https://github.com/cferdinandi/smooth-scroll) ([demo](http://cferdinandi.github.io/smooth-scroll/))

Které například nabízí možnost zvolit různý průběh doby animace nebo odrolování přizpůsobit [fixní navigaci](/fixni-menu), kdy nastává problém při [odkazování na kotvu](/kotva-fixni-menu) i bez **plynulého rolování**.