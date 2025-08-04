---
title: "Routování URL ve SvelteKitu"
headline: "Routování URL ve SvelteKitu"
description: "Jak ve SvelteKitu řešit routování adres. Příklady z praxe."
date: "2024-05-31"
last_modification: "2024-05-31"
status: 0
tags: []
---

[SvelteKit](https://kit.svelte.dev) disponuje tzv. *filesystem-based* routerem. To znamená, že pro jednotlivé stránky webu se nevytváří žádná konfigurace, ale vše je založeno na adresářové struktuře.

  Ještě je možné rozdělit *filesystem-based* na:

    *File-based*

    ```
src/
└── routes/
    ├── index.js
    ├── about.js
    └── contact.js
```

    *Directory-based*

    ```
src/
└── routes/
    ├── +page.svelte
    ├── about/
    │   └── +page.svelte
    └── contact/
        └── +page.svelte
```

  SvelteKit dříve používal hybrid mezi oběma přístupy, potom ale přešel na *directory-based*. Tedy co část cesty v URL mezi lomítky, to samostatná složka.

  Z toho plyne asi hlavní nevýhoda tohoto přístupu, že se skoro všechno v projektu jmenuje `+page.svelte`.

  Obejít tento problém jde členěním obsahu stránek do **pojmenovaných komponent**.

## Layouty

Pro sdílení společných částí a kódu slouží soubory `+layout.svelte`. Takový kód se aplikuje na všechny stránky a podstránky, které jsou ve složce a podsložkách daného `+layout.svelte` souboru.

Pro lepší organisaci a dědičnost layoutů je vhodné související celky členit do skupin. Ty se tvoří další složkou v závorkách.

```
src/
└── routes/
    ├── **(public)**/
    │   ├── +layout.svelte
    │   ├── +page.svelte
    │   ├── about/
    │   │   └── +page.svelte
    │   └── contact/
    │       └── +page.svelte
    └── **(private)**/
        ├── +layout.svelte
        ├── profile/
        │   └── +page.svelte
        └── settings/
            └── +page.svelte
```

Tyto složky v (kulatých závorkách) nemají žádný vliv na podobu URL, slouží jen k seskupení pro pohodlnější práci.

### Vyskočení z layoutu

Pojmenované skupiny se hodí i k opuštění dědičnosti layoutů.

Jednotlivé `+layout.svelte` soubory zanořené do složek se do sebe zanořují.

Pomocí `@` v názvu layoutu jde toto chování změnit.

    `+layout@.svelte` – zruší všechny nadřazené layouty

      `+layout@(private).svelte` – nastaví nadřazený layout na ten ze skupiny `(private)`

## Dynamické parametry

Dost časo je potřeba mít některé části URL dynamické – ve SvelteKitu k tomu slouží složky s hranatými závorkami.

Stačí např. vyvořit soubor `+page.svelte` ve složce `src/routes/blog/[slug]`, čímž všechny požadavky typu `blog/prvni-clanek`, `blog/jiny-clanek` apod. skončí na této stránce.

V proměnné (storu) `$page.params.slug` bude k disposici slug článku, podle kterého se může dál *něco dělat*.

Zde je třeba myslet na to, že hodnota `$page.params.slug` se neaktualisuje automaticky při **přechodu na jinou stránku**.

Pokud na to něco spoléhá, je třeba použít konstrukci typu:

```
$: slug = $page.params.slug
```

A dál pracovat s proměnnou `slug`.

## Odkazování na stránky

SvelteKit nemá přímo v sobě pokročilejší mechanismus, jak vytvářet odkazy na jednotlivé stránky.

Děje se tak prostým [odkazem](/odkaz) `&lt;a href>`.

To má dost **značnou nevýhodu**, že není zajištěno, že odkázaná stránka existuje.

Alespoň drobné usnadnění nabízí funkce `resolveRoute`:

```
&lt;a href="{resolveRoute('/blog/[slug]', { slug: 'prvni-clanek' })}">
  Odkaz
&lt;/a>
```

Bohužel nijak nekontroluje, jestli daná routa opravdu existuje.

Doporučuji proto balíček [vite-plugin-kit-routes](https://www.kitql.dev/docs/tools/06_vite-plugin-kit-routes), který ze všech rout vygeneruje soubor s typovou kontrolou.

Zápis je obdobný jako s `resolveRoute`, ale je zajištěno, že stránka existuje:

```
&lt;a href="{route('/blog/[slug]', { slug: 'prvni-clanek' })}">
  Odkaz
&lt;/a>
```

### Query parametry

Pro věci jakou jsou třeba filtry nebo [stránkování](/strankovani) může být rozumné nepoužívat *klasicke-hezke-url*, ale informace přenášet *?za=otaznikem*.

SvelteKit nabízí přístup k těmto [*search params*](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams) v `$page.url.searchParams`.

Pro příjemnější práci s těmito parametry doporučuji knihovnu [sveltekit-search-params](https://github.com/paoloricciuti/sveltekit-search-params).

Ta nabízí jednoduché rozhraní, které automaticky zajišťuje obousměrnou synchronisaci dat s URL:

```
&lt;script lang="ts">
  import { queryParam } from 'sveltekit-search-params';
  const username = queryParam('username');
&lt;/script>
&lt;input bind:value={$username} />
```

## Aktivní stránka

Adresu současné stránky jde vytáhnout z `$page.url.pathname`. Zvýraznit aktuální stránku jde tak jednoduchou podmínkou (přidá CSS třídu `active`):

```
&lt;a class:active={$page.url.pathname === '/about'} href="/about">
  Odkaz
&lt;a>
```

Zjednodušit si používání jde třeba derivovaným storem:

```
import { page } from '$app/stores'
import { derived } from 'svelte/store'

export const isCurrent = derived([page], ([$page]) => {
  return (pathname: string) => {
    return $page.url.pathname === pathname
  }
})
```

Použití:

```
&lt;a class:active={$isCurrent('/about')} href="/about">
  Odkaz
&lt;a>
```

Případně s vite-plugin-kit-routes:

```
&lt;a class:active={$isCurrent(route('/about'))} href="route('/about')">
  Odkaz
&lt;a>
```

U rout s **dynamickými parametry** se nabízí porovnávat `$page.route.id`. Pozor, propisují se tam i skupiny v závorkách.

Takže na adrese `blog/prvni-clanek` může být v `$page.route.id` např. následující hodnota:

```
/(private)/blog/[slug]
```

## Chybové stránky

V případě nenalezení obsahu k dané routě je třeba zobrazit [chybovou stránku](/sledovani-404).

To jde zajistit velmi snadno souborem `+error.svelte`.

## Změna URL přes `goto`

Občas je potřeba měnit adresu stránky jiným způsobem než kliknutím na odkaz. Třeba po odeslání formuláře nebo vyhodnocením nějaké logiky.

SvelteKit k tomu má funkci `goto`.

```
&lt;button on:click="{() => goto(route('/blog/[slug]', { slug: 'prvni-clanek' }))}">
  Tlačítko
&lt;/button>
```

Z možného nastavení je užitečné hlavně:

    `replaceState` – nahradí současnou stránky v historii

    `noScroll` – neprovede odrolování nahoru

```
goto('/adresa', { replaceState: true, noScroll: true })
```

## Akce po navigaci

Někdy je potřeba provést po navigaci akci – například zavřít hamburger menu na mobilu po kliknutí na okdaz. K tomu slouží `afterNavigate`:

```
&lt;script lang="ts">
  import { afterNavigate } from '$app/navigation';
  let menuToggle: boolean = false;

  afterNavigate(() => (menuToggle = false));
&lt;/script>
```

## Modály

Trend aplikací je používat modály.

Dobré zároveň je, když má modál vlastní URL. Má to řadu výhod:

    Na daný obsah jde **odkázat**. Uložit si odkaz do oblíbených nebo ho někomu poslat.

    V případě chyby jde **obnovit stránku** a uživatel zůstane na místě, kde byl.

    SvelteKit dokáže podle rout optimalisovat výsledný build.

Asi nejčistší možnost je používat layouty. Ze stránky (`+page.svelte`), ze které se má modál zobrazit, se udělá `+layout.svelte` (`+page.svelte` zůstane prázdné).

Na místo v kódu pro zobrazení modálu se dá značka `&lt;slot />`.

Samotný modál se potom zanoří do podadresáře (`modal/+page.svelte`).

Jiný způsob je řídit zobrazení/skrytí modálu přes query parametr v URL.

Případně si vystačit jen se zobrazením na základě proměnné bez ukládání stavu.

  [Živá ukázka](https://svelte.dev/repl/f8f2512f35a740e1b78e361809c6f8ca?version=4.2.17)

## Animace

Velmi snadno lze vytvořit plynulé přechody

## Menu