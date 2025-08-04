---
title: "Vite – super rychlý dev server / build"
headline: "Vite – super rychlý dev server / build"
description: "Vite je nástroj pro neuvěřitelně rychlý dev server, hot reload a build JS/CSS."
date: "2021-03-01"
last_modification: "2021-03-01"
status: 1
tags: ["JavaScript", "Produktivita"]
---

V dnešní době se čím dál tím víc dbá na tzv. DX (*Developer Experience*) – tedy přívětivost pro vývojáře. Aby vývojář nemusel kvůli každé změně minutu čekat, složitě obnovovat stránku a proklikávat aplikaci.

Ve frontendovém světě CSS a JavaScriptu to typicky znamená, že se úpravy v kódu **ihned projevují** v živém prostředí prohlížeče, ideálně se zachováním stavu.

První pokusy o živou aplikaci změn se datují někam do roku **2013** (např. [LiveStyle](/zivy-nahled-css), [LiveReload](/livereload)).

Následně se hojně používaly nástroje jako [Grunt](https://gruntjs.com) a [gulp.js](https://gulpjs.com).

Později se stal celkem standardem [webpack](https://webpack.js.org) se svým dev serverem. Mezi méně používané buildovací nástroje patří ještě třeba [Parcel](https://parceljs.org) (zakládá si na minimální konfiguraci) nebo [rollup.js](https://rollupjs.org/guide/en/).

U větších projektů nastává typicky problém v tom, že **všechno trvá dlouho**. Zvlášť na slabších strojích může dev server servírující assety (CSS/JS/obrázky apod.) startovat klidně **několik minut** (tzv. studený start).

Následně jakákoliv změna trvá třeba v jednotkách až desítkách vteřin (tzv. hot reload).

V roce **2020** vzniknul nástroj [esbuild](https://esbuild.github.io), který je napsaný v jazyku Go a dokáže build zrychlit v některých případech i **100 &times;**.

V témže roce autor knihovny **Vue.js** – Evan You – vytvořil s využitím esbuildu právě **Vite** (je to slovo z francouzštiny a znamená rychlý, čte se to jako *vít*).

      [Vite](https://vitejs.dev) – Next Generation Frontend Tooling

## Instalace nového projektu

Použití je jednoduché. Instalace jde provést přes NPM nebo Yarn.

```
npm init @vitejs/app
```

```
yarn create @vitejs/app
```

Vite dokáže fungovat s populárními knihovnami jako **Vue.js** nebo **React** (včetně podpory TypeScriptu), případně i v čistém JavaScriptu.

Spuštění dev serveru je potom klasické přes:

```
npm run dev
```

Jak je vidět, je to až neuvěřitelně rychlé.

Oproti spuštění prázdného Vue.js projektu s webpackem:

Následné změny v kódu jsou téměř instantní.

## Migrace z Vue CLI

U projektu používající [Vue CLI](https://cli.vuejs.org) (CLI znamená *Command Line Interface* – příkazový řádek) spočívá migrace na Vite v následujícím:

```
npm install vite @vitejs/plugin-vue --save-dev
npm install @vue/compiler-sfc --save-dev

```

Přesunutí/zkopírování souboru `index.html` ze složky `public` do rootu projektu (do složky, kde je `package.json`) s drobnou úpravou – připojení `main.js` skriptu pod hlavní `&lt;div>` aplikace:

```
&lt;div id="app">&lt;/div>
**&lt;script type="module" src="/src/main.js">&lt;/script>**
```

Vytvoření konfiguračního souboru `vite.config.js` v rootu projektu:

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})

```

Přidání skriptu pro start dev serveru do `package.json` do sekce `scripts`:

```
"scripts": {
  **"dev": "vite"**,
```

Nyní by se v ideálním případě mohl rozběhnout bleskurychlý Vite dev server.

### Relativní cesty

Výchozí instalace má problém s relativními cestami v importech využívající zavináč (`@`) na začátku. Tohle nebude fungovat:

```
import HelloWorld from '**@/**components/HelloWorld.vue'
```

Řešit to jde třeba instalací pluginu pro aliasy:

```
npm install vite-aliases --save-dev

```

A úpravou `vite.config.js` pro jejich použití:

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { getAliases } from 'vite-aliases'

const aliases = getAliases({
  prefix: '@/',
})

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: aliases,
  },
  plugins: [vue()],
})

```

## Proč je to tak rychlé?

Jak je možné, že je najednou build aplikace rychlejší o několik řádů?

První důvod je používání nativních [JavaScript modulů](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (ES 6 modulů).

To jsou takové ty konstrukce `export default něco` a `import { něco } from 'neco.js'`.

A novější prohlížeče kromě **IE 11** podporují dynamické skládání aplikace pomocí importování těchto modulů.

Celá aplikace může být rozdělena do mnoha `*.js` souborů, které se importují, když je prohlížeč potřebuje.

Před **nativním fungování JS modulů** to řešil právě třeba webpack, který musel celou aplikaci projít, rozdělit ji do tzv. bundlů (jednotlivé části aplikace) a nakonec je ve správných situací připojovat.

Tato věc díky JS modulům odpadá, protože to umí rovnou prohlížeče.

Druhá věc je nejspíš použití jazyka Go, ve kterém je napsaný **esbuild**, protože Go je výrazně rychlejší než JavaScript.

## Má smysl přejít?

Otázka ohledně přechodu na **Vite** není úplně jednoduchá, ač se může znát nárůst v rychlosti enormní.

První otázka je, jestli se člověku vůbec povede existující projekt zmigrovat v rozumném čase. Zvlášť pokud je v projektu hromada vlastní konfigurace webpacku, může to být dost práce.

Další věc je podpora různých dalších balíčků, co s webpackem spolehlivě fungují, ale s Vite nemusí.

Např. ve **Vue CLI** je vyřešené testování, které ve Vite zatím chybí.

Vzhledem k velkému rozšíření mezi vývojáři bude snazší hledat a najít řešení problémů ve webpacku.

Z principu fungování JS modulů může potom nastat problém v případě snahy podporovat **IE 11**, protože tam rychlé vývojové prostředí používající nativní JS moduly nebude fungovat.

Není sice problém vytvořit build funkční v **IE 11**, ale vývojové prostředí v takovém případě moc neodpovídá produkčnímu.

## Ruční zprovoznění hot reloadu

Aby fungoval hot reload při použití bez frameworku, je potřeba přidat obsluhující funkci.

Pro začátek postačí prázdná. Do souboru `main.js`:

```
if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
        console.log('updated', newModule)
    })
}
```

## Závěr

Vite/esbuild jsou hodně zajímavé nástroje pro zpříjemnění a zrychlení práce vývojáře.

Pokud se vám povede Vite zapojit do vývoje existujícího projektu, bude to plus.

Stavět nový projekt, asi bych stále preferoval Vue CLI (zejména kvůli testům), ale klidně bych doplnil Vite pro rychlý dev server.

Naštěstí není problém mít webpack i Vite vedle sebe a rozhodnout se kdykoliv, jaký dev server si pro vývoj pustit.