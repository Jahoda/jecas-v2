---
title: "Rozdělování Vite/Rollup buildu do chunků"
headline: "Rozdělování Vite/Rollup buildu do chunků"
description: "Jak rozdělit build aplikace do souborů, aby byla co nejrychlejší. "
date: "2022-12-05"
last_modification: "2022-12-19"
status: 1
tags: ["JavaScript", "Rady a nápady", "Zrychlování webu"]
---

Je standardem, že se JavaScriptový kód vytvořený při vývoji významně liší od kódu, který potom běží v produkčním prostředí.

Při vývoji je praktické kód rozdělovat do mnoha malých souborů, kde jsou jednotlivé komponenty nebo metody.

Na produkci je to zase kvůli [rychlosti](/zrychlovani) lepší pospojovat. Případně kvůli kompatibilitě se staršími prohlížeči přidat [polyfilly](/polyfill) nebo dokonce JS kód psaný v novější syntaxi převést do kompatibilní podoby.

Obvykle se k tomu používá rychlý nástroj [Vite](/vite), který na pozadí používá [rollup.js](https://rollupjs.org/guide/en/).

Výsledný *build* se potom dělí do tzv. *chunků* (česky kusů).

## Jeden soubor

Výchozí chování je takové, že se všechno spojí do jednoho souboru.

Výsledkem je tak něco jako:

```
dist/src/index.html               1.84 KiB
dist/assets/index.f237c416.css   62.12 KiB / gzip: 10.96 KiB
dist/assets/index.ed3603d0.js  2361.14 KiB / gzip: 665.31 KiB   

```

U větší aplikace může celková velikost narůstat. Zvlášť při používání velkých externích knihoven.

Sám Rollup při výchozím nastavení upozorňuje na překročení velikosti 500 kB.

```
(!) Some chunks are larger than 500 KiB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/guide/en/#outputmanualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```

A navrhuje 2 řešení:

  - Použít **dynamické importy**.

  - Rozdělit build od chunků **manuálně**.

## Je jeden `*.js` soubor problém?

Spojit všechno do jednoho může znamenat extrémně velký soubor. Z toho vyplývá možná **dlouhá doba načítání**, protože než se stáhne, tak aplikace vůbec nic nemůže dělat.

Další nevýhoda je kešování u aplikací, které se často mění. Jakákoliv změna tak invaliduje úplně všechno.

Na druhou stranu může mít jeden jediný soubor výhodu v **účinnější Gzip/Brotli kompresi**. Ve finále se jeden soubor účinněji zkomprimuje a celkově se tak přenese méně dat.

Výhoda je i **rychlejší build aplikace**, protože Rollup nemusí moc přemýšlet co a jak rozdělit.

## Dynamické importy

Dynamickými importy se rozumí asynchronní funkce, která provádí samotný import. Takže místo klasického:

```
import Component from 'Component.svelte'
```

Vypadá funkce pro import následovně (a na požadovaném místě se zavolá):

```
async () => await import('Component.svelte')
```

Rollup takový import rozpozná, vytvoří pro něj zvláštní chunk a zajistí, že všechno bude správně fungovat.

O daný chunk se sníží velikost dříve jediného chunku a stáhne se až v momentě, kdy bude potřeba.

### Dynamický import Svelte komponenty

Ve [Svelte](https://svelte.dev) to vypadá následovně:

```
{#await import('Component.svelte') then Component}
  &lt;Component.default />
{/await}
```

### Co importovat dynamicky

Není úplně snadné stanovit jednoznačný postup, co importovat dynamicky. Mohlo by se například nabízet používat dynamické importy pro jednotlivé **routy aplikace**.

Bohužel tento postup dost pravděpodobně povede k obrovskému množství miniaturních chunků, které se vytvoří i pro sdílené společné komponenty.

Kromě toho se dost pravděpodobně sníží dojem z rychlosti, protože při změně adresy se nejdřív bude muset stáhnout příslušný JS soubor. Takže vznikne něpříjemná prodleva.

A celý build se časově prodlouží.

Rozumné použití se tak zdá být třeba pro **velké externí knihovny**, které se používají na několika málo místech – například WYSIWYG editor.

Pro zjištění velikosti balíčku se hodí stránka [Bundlephobia](https://bundlephobia.com).

Další věc jsou [překlady aplikace](/preklad) do různých jazyků. Tam obvykle stačí připojovat jen aktuální jazyk a ne X různých dalších lokalisací.

## Vlastní chunky (`manualChunks`)

Rozdělení na jednotlivé soubory jde kromě dynamickými importy zajistit i pomocí tzv. *manualChunks*.

Přímo v konfiguraci `vite.config.js`:

```
{
  ...
  build: {
    rollupOptions: {
      manualChunks: {
        luxon: ['luxon'],
        firebase: ['firebase/app', 'firebase/storage', 'firebase/auth', 'firebase/firestore'],
        icons: ['@steeze-ui/heroicons'],
      },
    },  
  }
}
```

Uvedený kód vyrobí 3 nové chunky s kódem externích **npm závislostí**.

Ty tak nebudou ve společném souboru s aplikací, díky čemuž se nebudou muset znovu stahovat při změně v jejím kódu, ale načtou se z *cache*.

## Preload

Rozdělení do chunků může pomoci prvnímu načtení, ale při práci s aplikací bude způsobovat prodlevu.

Řešením může být tzv. *preload*. Jedná se o techniku, kdy se soubory, které by mohly být potřeba, stáhnout s nižší prioritou.

Existují k tomu hotové pluginy:

  - [rollup-plugin-modulepreload](https://www.npmjs.com/package/rollup-plugin-modulepreload)

  - [vite-plugin-preload](https://www.npmjs.com/package/vite-plugin-preload)

## Aplikace za loginem

Pro vytvoření rychlé aplikace nebo webu je třeba řešit konkrétní případ.

Třeba u typické webové aplikace, která je dostupná jen pro přihlášené, se může hodit následující postup:

    Udělat maximálně rychlou přihlašovací obrazovku s minimem JS/CSS kódu.

    Ta se uživateli načte bleskurychle.

    Během vyplňování přihlašovacích údajů se může *preloadovat* zbytek aplikace.

    Při kliknutí na tlačítko *Přihlásit* tak už může být kód privátní sekce načtený a vše tak proběhne zdánlivě okamžitě.

## Závěr

Správné rozdělení chunků a určení, kdy se co má načítat, není vůbec snadné.

Do *rozumné* velikosti to nejspíš není potřeba příliš řešit. Přijatelná velikost se ale liší projekt od projektu a dle typu aplikace.

U webu bude 0,5 MB JS výrazně větší problém než u administrace nebo aplikace schované za loginem.

Vše je nutné testovat a měřit, třeba přes [vývojářské nástroje](/vyvojarske-nastroje).

## Odkazy

  - Vite: [Dynamic Import](https://vitejs.dev/guide/features.html#dynamic-import)

  - Rollup: [output.manualChunks](https://rollupjs.org/guide/en/#outputmanualchunks)