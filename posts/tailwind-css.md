---
title: "Tailwind CSS"
headline: "Tailwind CSS"
description: "CSS framework pro stylování webů přes utility třídy."
date: "2021-11-20"
last_modification: "2021-11-24"
status: 1
tags: ["CSS", "Produktivita", "Frameworky"]
---

Tailwind je CSS framework, který umožňuje kompletně nakódovat web bez toho, aby bylo potřeba psát jakékoliv CSS.

Zatímco například jiný populární framework [Bootstrap](/bootstrap-rychlokurs) přináší základní nastavení typografie a předpřipravené komponenty, Tailwind na to jde jinou cestou a *jen* nabízí obecné utility třídy pro kompletní vlastní stylování.

      [Tailwind CSS](https://tailwindcss.com)

## Utility třídy

Celá myšlenka je postavena na tom, že jsou v CSS předpřipravené jednoduché universální CSS třídy pro prakticky každou kombinaci vlastnost: hodnota.

CSS se potom nepíše k jednotlivým selektorům ve stylu:

```
.komponenta {
  text-align: center;
  padding: 1rem;
  color: red;
}
```

Místo toho se na HTML prvek rovnou aplikují příslušné třídy a do CSS se vůbec nezasahuje. Takže ekvivalentní zápis vypadá zhruba následovně:

```
&lt;div class="text-center p-4 text-red-500">
```

[Živá ukázka](https://play.tailwindcss.com/zCjotCfMRB)

Před lety se tento přístup nazýval jako [expresivní CSS](/expressive-css).

## Inline styly

Na první pohled to dost připomíná používání inline stylů přes HTML atribut `style`:

```
&lt;div class="text-align: center; padding: 1rem; color: red">
```

Má to ale oproti tomu značné výhody:

    Člověk je **omezen** na několik předpřipravených velikostí/rozměrů/barev apod. Takže je výsledek relativně **visuálně konsistentní**.

    Není možné si dělat úplně cokoliv (alespoň ve výchozí konfiguraci).

    Styly těchto předpřipravených tříd lze snadno hromadně změnit úpravou konfigurace.

    **Responsivita** – Tailwind třídy jsou [responsivní](/responsive) a používají [mobile first](/mobile-first) přístup.

    Bleskurychle tak lze vytvářet responsivní komponenty.

    Následující kód zarovná text na střed a od `sm` (výchozí šířka 640 px) vlevo díky [`@media` pravidlům](/media).

    ```
&lt;div class="text-center sm:text-left">
```

    **Uživatelské stavy** jako `:hover`, `:focus` a podobně. Zapisují se jednoduše s názvem stavu a dvojtečkou před vlastnost.

    ```
&lt;button class="bg-red-500 **hover:**bg-red-700">
```

    **[Tmavý režim](/dark-theme)** – stačí před třídu přidat `dark:`, je možné kombinovat i se stavy nebo responsivními breakpointy.

    Takže třída `lg:hover:dark:bg-red-700` se aplikuje na velkých obrazovkách ve tmavém režimu po najetí myší.

## Další užitečné vlastnosti

Tailwind nabízí další zajímavé vlastnosti usnadňující stylování, namátkou:

    **Odsazení** přes [`margin`](/margin) (`m-*`) a `padding` (`p-*`).

    Třídy pro layout pomocí [`float`u](/float) [flexu](/flexbox) nebo gridu.

    **[Animace](/animace), transformace** a [`transition`](/transition) – jsou připravené základní animace jako otáčení (`animate-spin`), pulsování (`animate-pulse`) a další.

    [Rotace](/rotace) objektu je otázka přidání třídy `rotate-*`.

    Díky `transition` mohou být přechody plynulé.

    [Živá ukázka](https://play.tailwindcss.com/SGIjrB67I6)

    [Stíny](/box-shadow) a [filtry](/filter).

Kompletní přehled je v [dokumentaci](https://tailwindcss.com/docs).

## Velikost CSS

Velikost minifikovaného spojeného Tailwind CSS souboru je někde kolem **3 MB** (gzipovaného cca 300 kB). To je na jednu stranu hrozně moc, na stranu druhou je doporučené používat knihovnu [PurgeCSS](https://purgecss.com), která je již zabudovaná.

Díky tomu se projde HTML kód a ponechají se pouze ty CSS třídy, které se používají.

Výsledkem je (v závislosti na projektu) obvykle **velmi malé výsledné CSS** v řádech jednotek či nízkých desítek kB.

Obvykle je výsledek datově lepší, než při psaní veškerého CSS do vlastních selektorů.

Odstraňovat nepoužité CSS umí Tailwind i tzv. *just in time* během vývoje, slouží k tomu JIT mode.

```
// tailwind.config.js
module.exports = {
 **mode: 'jit'**,
  purge: [
    // ...
  ],
  theme: {
    // ...
  }
  // ...
}
```

Nehrozí tak zpomalení a zanesení [DevTools](/vyvojarske-nastroje) hromadou zbytečných nepoužitých tříd.

## Opakování tříd v HTML

Používání vlastních CSS selektorů je dobré k tomu, že jde styly snadno znovupoužívat v HTML kódu.

Do kódu se píše něco jako:

```
&lt;div class="nadpis">
```

Místo neustálého opakování:

```
&lt;div class="text-center p-4 text-red-500">
```

Opakovat více stejných utility tříd v žádném případě **není dobré dělat** a Tailwind nabízí 2 možná řešení, jak se tomu vyhnout:

    Konstrukce `@apply` – třídy z HTML stačí přesunout do běžného CSS selektoru za klíčové slovo `@apply` a v kódu používat vlastní selektor místo utilit tříd:

    ```
.nadpis {
  @apply text-center p-4 text-red-500
}
```

    Případně lze vlastní selektory se styly zapsat přímo do [konfigurace](https://tailwindcss.com/docs/extracting-components#writing-a-component-plugin).

    **Šablonovací/komponentový systém** – při použití dobrého šablonovacího nástroje není `@apply` příliš potřeba používat.

    V JS frameworcích typu Reactu, Vue nebo Svelte se přímo z `&lt;div class="text-center p-4 text-red-500">` může udělat komponenta `&lt;Nadpis>` a opakovaně ji používat, kde je potřeba.

    Případně si třídy uložit někam do JS konstanty a naimportovat, kde je potřeba:

    ```
const nadpis = 'text-center p-4 text-red-400'
```

## (Ne)omezené možnosti

V Tailwindu jde nakódovat asi 99 % myslitelných věcí.

Díky hranatým závorkám jde ve specifických případech zapisovat i libovolné vlastní hodnoty.

Třeba posunout něco o 13 pixelů:

```
&lt;div class="relative top-[13px]">
```

Nebo si nastavit vlastní barvu:

```
&lt;div class="md:hover:text-[#ff0000]">
```

Navíc to všechno funguje se stavy, `@media` pravidly atd. Tailwind automaticky pro tyto konstrukce vygeneruje příslušné třídy.

Vlastní věci jde případně přidávat jako [pluginy do konfigurace](https://tailwindcss.com/docs/plugins).

A koneckonců pořád nic člověku nebrání použít přímo `style` atribut nebo vlastní selektor.

## WYSIWYG editory a uživatelský obsah

Zadává-li se obsah do stránky prostřednictvím nějakého [WYSIWYG editoru](/wysiwyg) nebo je zdrojem třeba text v [Markdownu](/markdown), nejsou běžné utility třídy moc použitelné.

Musely by se nějak naroubovat na strukturovaný obsah.

Tento problém řeší [typography plugin](https://github.com/tailwindlabs/tailwindcss-typography). Díky tomu stačí takový obsah obalit do rodiče s třídou `prose`:

```
&lt;div class="prose">
  Uživatelský obsah
&lt;/div>
```

A prvky uvnitř jako [nadpisy](/nadpisy), odstavce, [seznamy](/seznamy) atd. dostanou hezčí styl. [Ukázka](https://play.tailwindcss.com/cDEjmn2pcV)

Pokud výchozí styl nevyhovuje, jde ho snadno změnit v konfiguraci, opět bez žádného psaní vlastního CSS.

## Podpora v editorech

Tailwind CSS má i dobrou podporu v editorech. Existují rozšíření do VS Code i JetBrains editorů jako je [PhpStorm/WebStorm](/phpstorm-vs-webstorm).

Editor tak bude spolehlivě napovídat Tailwind utility třídy.

Dokonce i rovnou u nich zobrazovat výsledné CSS:

## Závěr

Pokud je možné v projektu používat vlastní komponenty (popř. sdílené části šablon) a odstraňovat při buildu nepoužívaný kód, neexistuje moc důvodů proč Tailwind nepoužít.

Prakticky všechny dřívější nevýhody utility tříd jsou vyřešeny.

I kdyby byl člověku nesympatický zápis stylů do HTML atributu `class` (popř. `className` v Reactu), může se Tailwind hodit alespoň na nějaké drobnosti jako grid, odsazení apod.

Díky PurgeCSS zůstane jen to použité a nenafoukne se tak datová velikost výsledného CSS.

Kromě výhody v rychlejší práci pro vývojáře bude nejspíš styl webu postavený v Tailwindu i lepší pro návštěvníka díky [rychlejšímu](/zrychlovani) načtení stránky.

### Proč Tailwind nepoužívat

Moc důvodů nevidím.

Možná jde jen o módní vlnu.

Ze začátku je trochu **nezvyk** psát specifické zkratky HTML tříd místo klasického CSS.

U starého projektu může být komplikovanější mít automatické promazávání nepoužívaných stylů nebo mít dobře znovupoužitelné JS komponenty s HTML třídami.

Pokud projekt **nepotřebuje vlastní stylování**, ale používá nějakou hotovou UI knihovnu – např. [Vuetify](https://vuetifyjs.com/en/) – asi není potřeba ještě připojovat Tailwind.

## Odkazy jinam

    Vzhůru dolů: [Tailwind CSS: další evoluční krok pro CSS frameworky](www.vzhurudolu.cz/prirucka/tailwind-css)