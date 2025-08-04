---
title: "Media queries v JavaScriptu"
headline: "Media queries v JavaScriptu"
description: "Jak v JavaScriptu používat <code>@media</code> pravidla jako v CSS."
date: "2017-06-06"
last_modification: "2017-08-16"
status: 1
tags: ["JavaScript", "Hotová řešení", "Responsivní design"]
---

Pokud se zobrazení stránky liší dle rozměrů viewportu díky použití [`@media` pravidla](/media), je občas nutné tomu přizpůsobit i JavaScript.

Třeba nevolat zbytečné JS akce typu [fixování elementů](/fixed) a podobně.

## Detekce podle šířky

První možnost je zkrátka jednoduše [měřit šířku viewportu](/zjisteni-rozmeru#viewport):

```
var sirka = document.documentElement.clientWidth;
if (sirka > 1024) {
  // nějaký kód
}
```

Asi největší problém je v tom, že je šířka stránky v pixelech. Pokud se v CSS [`@media`](/media) pravidlech používají nějaké rozumnější jednotky (např. `em`), nejde to rozumně skloubit dohromady.

Druhý problém je v tom, že se **breakpointy nastavují zvlášť v JS i CSS**.

## Metoda `matchMedia`

Přímo v JS existuje metoda fungující obdobně jako media queries v CSS:

```
if (window.matchMedia("**(**max-width: 40em**)**").matches) {
  // kód pro viewport do 40 em
}
```

Podmínku je nutné uvést včetně závorek okolo.

## Podpora v prohlížečích

Dobře podporovaná vlastnost (funguje i v **IE 10** a novějších). Pro starší prohlížeče jde navíc použít polyfill, který podporu doplní.

    - [matchMedia.js](https://github.com/paulirish/matchMedia.js) – polyfill, pro reakci na změnu velikosti okna je potřeba i `matchMedia.addListener.js`

## Změna velikosti okna

Hodně užitečná je i schopnost sledovat změnu šířky okna/viewportu pomocí přidání *posluchače* přes `addListener` pro podmínku.

Není tak nutné využívat událost `onresize`. Navíc se **detekuje pouze změna** (jindy se funkce nezavolá), takže se nemusí stav šířky ukládat do nějaké proměnné, aby se daný kód nevolal zbytečně opakovaně.

```
var mql = window.matchMedia("(max-width: 40em)");

// funkce, která se zavolá při změně
mql.addListener(zmenaMedia);

// může se zavolat i po načtení stránky
zmenaMedia(mql);

// samotná funkce
function zmenaMedia(mql) {
  if (mql.matches) {
    // kód pro viewport do 40 em
  }
}
```

Kód uvnitř podmínky se spustí po načtení stránky v okně do `40em`. Případně se spustí **právě jednou** pokaždé, když se viewport zmenší pod stanovenou hranici. Při dalším zmenšování už se znovu neprovádí, protože nedošlo ke změně.

## Sdílení `@media` pravidel

K úvaze je, kterak sdílet hodnoty break-pointů mezi JS a CSS.

První možnost je mít nějaký **konfigurační soubor** se všemi break-pointy a ten v build procesu propsat do CSS i JS.

Jiná možnost je…

### Předávání aktivního pravidla v `content`

Asi jediná možnost, jak si z CSS předat něco čitelného JavaScriptem bez úprav HTML, je použít vlastnost [`content`](/content).

Jde například elementu nastavit různé hodnoty do vlastnosti `content` podle aktivního `@media` pravidla:

```
html:before {
  display: none;
  content: "desktop";
}

@media (max-width: 40em) {
  html:before {
    content: "mobile";
  }
}
```

Nyní stačí při změně šířky okna [zjišťovat výsledný styl](/zjisteni-css) pomocí `getComputedStyle`. Ve vlastnosti `content` u `html:before` bude `desktop` nebo `mobile` (v závislosti na šířce viewportu).

    - [Živá ukázka](http://kod.djpw.cz/mohc) – načtení media queries z CSS do JavaScript

Trochu paradoxní je, že tento postup nepotřebuje (při načtení stránky) JS metodu `matchMedia`. *Matchování* totiž proběhne už v CSS. Pro ošetření stavu při změně šířky by se ale už musel aktuální stav skriptem zjišťovat.

### Detekční element

Jiná možnost je pomocí *media queries* nastavit nějakému elementu určité styly a ty potom v JS kontrolovat.

Třeba zapínat/vypínat viditelnost a tu potom skriptem detekovat.

## Hotové řešení předání `@media` pravidel

Pro elegantnější práci s více `@media` podmínkami se nabízí do `content`u předat jednotlivá pravidla a podle toho si sestavit „spouštěče“ s využitím `matchMedia`.

Třeba jako [JSON](/json):

```
html:before {
    display: none;
    content: '{"**tablet**" : {"min-width" : "40em", "max-width" : "60em"}}';
}
```

    - [Živá ukázka](http://kod.djpw.cz/sajc) – hotová funkce parsující JSON z CSS

Použití je následovné:

```
MediaQueries.init({
    'tablet': function (matched) {
        if (matched) {
            // Jsem tablet
        }
        else {
            // Nejsem tablet
        }
    }
});
```

## Výkon

Je možné, že detekce přes `matchMedia` a spouštění nějaké akce jen při změně bude efektivnější s ohledem na výkon, než neustálé zjišťování aktuálního breakpointu ve `window.onresize`.

Stejně tak je možný opak.

Změřené to nemám. Pokud máte nějaké zkušenosti s výkonem `matchMedia`, dejte mi prosím vědět do komentářů.