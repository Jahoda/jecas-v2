---
title: "Build jednoduchého JS pro staré prohlížeče"
headline: "Build jednoduchého JS pro staré prohlížeče"
description: "Jak zajistit transformaci jednoduchého JavaScriptu i pro staré prohlížeče jako IE 11."
date: "2022-07-13"
last_modification: "2022-12-22"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

V dnešní době se zpravidla **výrazně liší** JavaScript, ve kterém se něco píše, a výsledek, který potom běží v prohlížeči.

Teoreticky je možná psát pouze jeden kód a ten nijak pro produkční použití neupravovat, ale má to několik problémů:

      **Nekompatibilita** – v novějších prohlížečích funguje řada hezkých JS konstrukcí, které v **IE 11** ne.

    To jsou věci jako například:

        Psaní `const` a [`let` místo `var`](/js-var-let).

        Optional chaining operator (`objekt?.vlastnost?.dalsiVlastnost`)

        Arrow functions (`const funkce = () => 'vrácená hodnota'`)

        Template Literals (``textový řetězec a v něm ${promenna}``)

      **Horší čitelnost/udržitelnost** – pokud se naopak kód píše v kompatibilním režimu, nepoužívání novějších JS praktik vede k hůře čitelnému kódu.

      **Velikost** – pro vývoj čitelný kód je zbytečně velký.

    Prohlížeč nepotřebuje rozumně pojmenované funkce a proměnné. Vystačí si v pohodě s tím, že místo `vystiznyNazevFunkce()` bude `a()`.

      **TypeScript** – pro větší kontrolu nad kódem se hodí používat typy. TypeScript díky tomu dokáže upozornit na spoustu potenciálních chyb.

Cílem je tedy psát kód se všemi vymoženostmi nového JS v TypeScriptu. A z toho nakonec dostat obyčejný JavaScript funkční i v **IE 11**.

## Bez frameworků

Dnešní standard je většinou použít nějakou reaktivní JS knihovnu jako je **React**, **Vue** nebo **Svelte**.

U těch je kompatibilní build dávno vyřešen.

V některých případech je ale framework zbytečný, který by zbytečně navyšoval celkovou velikost.

## Babel

Když jde o kompilaci do zpětně kompatibilního JS, nejznámější řešení je [Babel](https://babeljs.io).

Má i [online nástroj](https://babeljs.io/repl), kde je možné si vyzkoušet, co udělá.

Instalace je jednoduchá:

```
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

Pro TypeScript ještě:

```
npm install --save-dev @babel/preset-typescript
```

Prohnat přes něj JS soubor jde potom snadno jednoduchým npm skriptem (v `package.json`):

```
{
  ...
  "scripts": {
      "babel": "babel puvodni-soubor.ts --out-file dist/vystupni-soubor.js"
  }
  ...
}
```

Transformaci pro **IE 11** je třeba nastavit např. v souboru `.babelrc`:

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": ['defaults', 'IE 11']
      }
    ],
    "@babel/preset-typescript"
  ]
}
```

## SWC

[SWC](https://swc.rs) (Speedy Web Compiler) je mnohem méně známá a údajně 20–70krát rychlejší alternativa Babelu.

Pro vyzkoušení jde použít [online nástroj](https://swc.rs/playground).

## Vite

[Vite](/vite) je nástroj pro super rychlé vývojové prostředí a build.

Hodí se především pro větší aplikace napsané v Reactu/Vue/Svelte, ale má i [library mode](https://vitejs.dev/guide/build.html#library-mode).

Díky tomu jde obyčejný kód v TS spojit do jednoho souboru.

Přes plugin [vite-plugin-babel](https://github.com/owlsdepartment/vite-plugin-babel) zajistit funkčnost ve starých prohlížečích.

## Dělení do souborů

Pro přehlednost a snažší týmovou práci je užitečné dělit části kódu do samostatných souborů.

Ty potom ve výsledku spojit.

K tomu jde použít třeba **Vite** nebo [esbuild](https://esbuild.github.io):

### Esbuild

Stačí nainstalovat:

```
npm install --save-exact esbuild
```

A přidat skripty pro vývoj a build:

```
{
  ...
  "scripts": {
    "esbuild": "esbuild src/main.ts --bundle --outfile=dist/vystupni-soubor.js --define:DEBUG=false",
    "esbuild:dev": "esbuild src/main.ts --bundle --outfile=dist/vystupni-soubor.js --define:DEBUG=true",
  }
  ...
}
```

## Testy

Psát kód bez testů je dost otrava. Takže je rozumné přidat [Jest](https://jestjs.io) nebo [Vitest](https://vitest.dev).

## Code style

Aby měl kód nějakou kulturu, hodí se nějak **automaticky formátovat kód**. Není potom potřeba při code review někomu připomínat, že používá taby místo mezer a podobně.

Osvědčil se mi [Prettier](https://prettier.io), protože podporuje hromady formátů, má jednoduchou instalaci a nastavení a dobrou podporu v editorech.

## Kompilace a minifikace

[Closure Compiler](https://closure-compiler.appspot.com/home) dokáže ušetřit hodně dat díky tomu, že zkrátí všechny možné názvy identifikátorů. Dokáže i zjednodušit některý kód a vyházet nepoužívaný kód.

Z následující funkce:

```
const nazevFunkce = (prvniParametr, druhyParametr) => {
  const objekt = {
    prvniVlastnost: prvniParametr * 2,
    druhaVlastnost: druhyParametr * 3
  }
  return `text ${objekt.prvniVlastnost} ${objekt.druhaVlastnost}`
}

window["a"] = nazevFunkce
```

Udělá:

```
window.a=function(b,c){return"text "+2*b+" "+3*c};
```

Instalace je následující:

```
npm i google-closure-compiler
```

A kompilace se spustí skriptem:

```
"closure": "java -jar node_modules/google-closure-compiler-java/compiler.jar --js=vstupni-soubor.js --js_output_file=vystupni-soubor.js",
```