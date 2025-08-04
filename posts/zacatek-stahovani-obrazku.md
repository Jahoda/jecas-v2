---
title: "Kdy začne stahování <img> obrázku"
headline: "Kdy začne stahování <code>&lt;img></code> obrázku"
description: "Kdy se začne stahovat obrázek připojený značkou <code>&lt;img></code>."
date: "2015-11-03"
last_modification: "2015-11-04"
status: 1
tags: ["HTML", "Prohlížeče", "Obrázky", "Zrychlování webu"]
---

```
&lt;img style="**display: none**" src="obrazek.png">
```

Stáhne se neviditelný soubor s obrázkem, nebo ne?

A co takto jako CSS pozadí?

```
&lt;div style="background: url(obrazek.png); **display: none**">
&lt;/div>
```

Chování CSS `background`u se liší napříč prohlížeči (viz níže). Všechny prohlížeče se ale shodují v tom, že obrázek ve značce `&lt;img>` se **stáhne vždy**. I když je skrytý přes CSS [`display: none`](/display#none).

Je tomu tak nejspíš proto, že se prohlížeče snaží pro rychlejší načítání **stahovat externí objekty co nejdříve**. Tedy už v případě, kdy dorazí HTML kód.

Pokud by se `&lt;img>` s `display: none` neměl stahovat, musel by se nejdříve vyřešit jeho styl. To by znamenalo počkat na stažení CSS souborů a i blokujících JavaScriptů, následně by se sestavil CSSOM (*CSS Object Model*) a až teprve potom by se rozhodlo o stažení obrázku.

Více o vykreslování je v článku:

    - [Jak funguje vykreslování stránky](/vykreslovani) – co prohlížeč dělá s webovou stránkou při vykreslování.

Prohlížeče tedy raději `&lt;img>` stáhnou, i když se nakonec nezobrazí.

Ze stejného důvodu rychlejšího startu načítání **není nejlepší řešení** připojovat `*.css` a `*.js` soubory [asynchronně JavaScriptem](/nacitani-css#async). Prohlížeč tyto soubory nezačne načítat tak brzo, jak by mohl, kdyby byly v HTML. Musí napřed spustit JS kód.

## Resource Hints

Pro ještě **rychlejší start načítání externích souborů** prohlížeče zavádějí tzv. *resource hints*. Jedná se o zvláštní HTTP hlavičky, které server pošle prohlížeči ještě před samotným HTML kódem.

Prohlížeč tak může začít stahovat požadované soubory ještě před tím, než mu dorazí jediný znak HTML kódu.

Slouží k tomu HTTP hlavička `Link` s nastavením `preconnect`/`prefetch`:

    - [Google zrychlil načítání na mobilech](/google-prefetch) – pomocí `prefetch`

    - [Preconnect – zrychlení stahování z více domén](/preconnect)

Specifikace počítá ještě s hodnotami `dns-prefetch` a `prerender` (renderování stránky dopředu):

    - W3C: [Resource Hint](https://w3c.github.io/resource-hints/)

## Jak zabránit stažení `&lt;img>`

Tato chytrá vlastnost prohlížečů je značnou překážkou při [lazy loadingu obrázků](/lazy-loading-obrazky), kdy je potřeba automatickému načtení obrázku zabránit.

Podle mých testů je jediné řešení funkční napříč prohlížeči značka **`&lt;noscript>`**:

```
&lt;noscript>
  &lt;img src="obrazek.png">
&lt;/noscript>
```

Případně tedy nepoužívat `&lt;img src>`, ale doplnit tuto konstrukci až JavaScriptem, když je obrázek potřeba.

Tímto způsobem se řeší lazy-loading v [AMP HTML](/amp-html), kde je pro obrázek zvláštní značka `&lt;amp-img>`.

### Pokusy

Následující pokusy o zabránění selhávají:

  Skrytí přes `display: none`.

  Použití značky [`&lt;template>`](/template) funguje pouze v **Chrome** / nové **Opeře**.

    Nestažení obrázku nezabrání ani [atribut `hidden`](/hidden).

    Obrázek se stáhne, i když je nepoužitý uvnitř značky `&lt;object>`.

    Vypsání neexistujícího skriptu skriptem kolem obrázku stažení nezabrání.

[Živá ukázka](http://kod.djpw.cz/ovrb) – test pokusů o zabránění načtení obrázku

## Stahování CSS pozadí

**Internet Explorer**, **[Edge](/microsoft-edge)**, **Chrome** a **Opera 15+** stahují obrázky i u elementů s `display: none`.

```
&lt;div style="background: url(obrazek.png); **display: none**">
&lt;/div>
```

Soubor `obrazek.png` z ukázky nebude stažen ve **Firefoxu** a staré **Opeře 12**.

Na funkci nemá vliv, jestli je styl obrázku zapsán *inline* stylem v HTML atributu `style` nebo přiřazen pomocí třídy.

Obrázky v CSS předpisu pro **nepoužité elementy** se ale už nestahují vůbec nikde.

```
.nepouzita-trida {
  /* obrázek se nestáhne, dokud se třída nepoužije */
  background: url(obrazek.png);
}
```

Obrázek z CSS se stáhne až v momentě, kdy se daný předpis na stránce použije.

### Pravidlo `@media`

Obrázky na pozadí v `@media` podmínkách se potom chovají jako nepoužité předpisy.

```
.trida {
  background: url(velky.png);
}
@media (max-width: 50em) {
  .trida {
    background: url(maly.png);
  }
}
```

Do šířky `50em` se stáhne **pouze** obrázek `maly.png`, jinak pouze `velky.png`.

Změna velikosti okna již načtené stránky a aplikování různých předpisů v `@media` potom teprve vyvolá načtení jiného obrázku z příslušného `@media` bloku.

## CSS sprite v `&lt;img>`

Zajímavou věc jde pozorovat ve výsledcích vyhledávání na [Google](/google).

Google logo je zdánlivě vložené značkou `&lt;img>`, ale ve skutečnosti se jedná o [sprite obrázek](/css-sprite):

Pomocí [posicování](/position) a oříznutí je z tohoto obrázku vidět jen samotné logo:

Nabízí se vysvětlení, že je to právě kvůli rychlejšímu startu stahování obrázků.