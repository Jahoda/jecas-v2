---
title: "Jak vytvořit tmavý režim / dark mode v CSS"
headline: "Jak vytvořit tmavý režim / dark mode v CSS"
description: "Jak co nejlépe vytvořit pro web tmavý režim, aby automaticky respektoval nastavení uživatele."
date: "2020-02-26"
last_modification: "2021-11-10"
status: 1
tags: ["CSS", "Hotová řešení", "Prohlížeče"]
---

V roce 2019 přišel **Apple s tmavým režimem v iPhonech**. To tmavé režimy značně zpopularisovalo.

Uživatelé si najednou nastavují tmavé zobrazení a očekávají, že se tomu přizpůsobí i web.

## Tmavý, nebo světlý?

Jestli je lepší, čitelnější nebo pro oči lepší tmavý/světlý web je těžká otázka. Zdá se, že každému vyhovuje něco jiného.

Zastánci tmavých režimů mají pocit, že jim světlý web vypálí oči. Zastánci světlých zase argumentují lepší čitelností při intensivním okolním světle.

A potom je tu skupina těch, kteří preferují **automatické nastavení** podle denní doby.

Naštěstí se vhodným řešením dá zavděčit všem…

## Nastavení v systému/prohlížeči

Lze se setkat se třemi možnostmi nastavení:

    světlé,

    tmavé,
  
  - automatické

Automaticky znamená, že se podle denní doby (většinou východ/západ slunce) režim změní.

Ve **Windows** jde nastavit pouze tmavý nebo světlý vzhled aplikace. *Nastavení → Přizpůsobení → Barvy → Zvolit výchozí režim aplikace*:

Toto nastavení potom přebírají prohlížeče.

V **macOS** existuje i automatický režim.

V **iOS** potom obdobně:

Web podporující změnu režimu dle nastavení systému by se při změně měl **ihned přebarvit**.

Světlé nebo tmavé zobrazení jde obvykle nastavit i přímo v prohlížeči.

## Detekce v CSS `@media` pravidlu

Přímo v CSS existuje [`@media` pravidlo](/media) detekující preferovaný režim.

### Tmavý režim

```
@media (prefers-color-scheme: dark) {
  /* styly pro tmavý režim */
}
```

### Světlý režim

```
@media (prefers-color-scheme: light) {
  /* styly pro světlý režim */
}
```

**Podpora v prohlížečích** je slušná. Chybí akorát v marginálních prohlížečích jako je **IE 11** nebo starý **Edge**.

Pokud se ale veškeré styly neuzavřou do těchto podmínek, ale jeden z nich se nechá mimo, zůstane v nepodporovaných prohlížečích alespoň výchozí styl.

## Zjištění podpory v JS

Detekce v JavaScriptu lze potom provést stejnými media pravidly v [`matchMedia`](/matchmedia):

```
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // uživatel preferuje tmavý režim
}
else {
  // uživatel preferuje světlý režim
}
```

Hodí se i detekce, jestli prohlížeč dokáže převzít informaci o nastavení ze systému/prohlížeče.

```
if (window.matchMedia('(prefers-color-scheme)').media === 'not all') { 
  // tmavý/světlý režim není podporován
}
```

A na základě toho (ne)zobrazovat přepínání mezi světlým a tmavým tématem.

### Reakce na změnu režimu

Na změnu režimu v systému/prohlížeči lze reagovat následovně:

```
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (event.matches) {
    // přepnuto na tmavý
  }
  else {
    // přepnuto na světlý
  }
})
```

Pro **Safari** je v roce 2020 potřeba volit jiný postup a použít `addListener` bez názvu události, který funguje i v ostatních prohlížečích:

```
window.matchMedia('(prefers-color-scheme: dark)').addListener(event => {
  if (event.matches) {
    // přepnuto na tmavý
  }
  else {
    // přepnuto na světlý
  }
})
```

Tato událost se zavolá ve 2 případech:

  - Uživatel si přepne v nastavení systému/prohlížeče preferovaný režim.

  - Režim se změní sám (např. automatická změna v **iOS** podle denní doby).

## Best practice

Jak ale v praxi nejlépe tmavý režim vytvořit?

Nejjednodušší řešení je přidat pár řádků kódu, které pomocí [CSS filtrů](/filter) otočí barvy:

```
@media (prefers-color-scheme: dark) {
  html {
    background: #1D1D1D;
    filter: invert(100%) contrast(90%) hue-rotate(180deg);
  }
}

```

Zapnout/vypnout

.theme-filter-dark {
  background: #1D1D1D;
    filter: invert(100%) contrast(90%) hue-rotate(180deg);
}

Pro seriosní použití to ale moc není :–)

Když pominu to, že některé barvy a obrázky nedopadnou takovou změnou dobře, další věc je, že **nestačí jen invertovat barvy**.

Barvy totiž slouží i k znázornění důležitosti a fakt, že jde zdůraznit část stránky použitím světlejší barvy, platí stejně u tmavého i světlého webu stejně – tato logika není invertovaná.

Proto je pro dobrý výsledek dobré barvy nastavit ručně.

### CSS proměnné

Pro pořádné vytvoření tmavého režimu (nebo obecně snadné změny stylu) je ideální používat [CSS proměnné](/var).

Pokud se tmavý režim doplňuje do již hotového webu, je vhodné na ně přejít. Použití je potom následující:

```
:root {
  --background-color: #ededed;
  --text-color: #212121;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #111;
    --text-color: #ededed;
  }
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

    Nejprve se nadeklarují výchozí proměnné světlého režimu pro selektor `:root`.

    Bývá zvykem pro CSS proměnné používat [kořenový selektor `:root`](/css-selektory#korenovy), ten u HTML stránky odpovídá selektoru `html`, jen je silnější ([ukázka](http://kod.djpw.cz/wowc)).

    Teoreticky je universálnější – třeba kdyby se styly potom připojily do [`&lt;svg>`](/svg), kde žádný `&lt;html>` element není. V praxi se tedy může použít klidně i `html`.

    Potom se pro *preferovaný tmavý režim* proměnné přepíší na tmavé varianty.

    Nyní se všude v kódu pro barvy používají CSS proměnné.

### Převod SASS proměnných

Pokud se na webu používaly proměnné v preprocesoru (např. SASS):

```
a {
  color: $color-link;
}
```

Je možné je převést na použití `var(--color-link)` nahrazením tohoto regulárního výrazu `\$(color[\w-]*)` na `var(--$1)`.

#### Co s `rgba()`

V případě preprocesorů je běžné psát pro průhledné barvy:

```
a {
  color: rgba($color-link, .7);
}
```

S CSS proměnnou nastane problém, protože tohle na ní nejde aplikovat. Řešení je třeba převod do RGB formátu. Jde k tomu použít jednoduchý SASS mixin. A proměnnou barvy potom použít uvnitř `rgba`:

```
@function hexToRgb($color) {
    @return red($color), green($color), blue($color);
}
:root {
  --color-rgb-background: #{hexToRgb(#666)};
}
div {
  background: rgba(var(--color-rgb-background), .5);
}
```

### Fallback CSS proměnných

Protože třeba v **IE 11** CSS proměnné nefungují, hodí se použít nějaký fallback. Existuje šikovný PostCSS plugin [postcss-css-variables](https://www.npmjs.com/package/postcss-css-variables). Ten dokáže vlastnosti s proměnnými zduplikovat a `var(--color-neco)` nahradit skutečnou hodnotou.

```
postcss([
  cssvariables({
    preserve: true,
  }),
])
```

Hodit se může i možnost nakonfigurovat proměnné přímo:

```
postcss([
  cssvariables({
    preserve: true,
    variables: {'--color-background', '#111')},
    preserveInjectedVariables: false,
  }),
])
```

Výsledkem je potom následující kód:

```
neco {
  background: #111;
  background: var(--color-background);
}

```

Nové prohlížeče použijí proměnnou, staré fallback.

## Ruční přepínání

Říká se, že** každá položka v nastavení je selhání designéra**. Z tohoto pohledu se nabízí žádnou možnost přepínání mezi vzhledy nemít a nechat to na nastavení systému/prohlížeče.

Je otázka, proč by člověku, co má v systému nastaven tmavý režim, vadilo, že se tomu přizpůsobí web.

Nabízí se jen situace, kdy jsou uživatelé zvyklí na světlý web a najednou se jim přepne do tmavé podoby.

Pro možnost autodetekce i ručního přepínání zároveň je vhodné použít nějaký mixin vkládající kód pro vynucený i automatický tmavý režim:

```
@mixin inDark {
    .theme-dark {
        @content;
    }

    .theme-system {
        @media (prefers-color-scheme: dark) {
            @content;
        }
    }
}
```

A použití:

```
@include inDark {
    --color-background: #111;
}
```

To zajistí následující chování:

    Bude-li mít značka `&lt;html>` třídu `theme-dark`, nastaví se tmavé proměnné.

    Bude-li mít značka `&lt;html>` třídu `theme-system`, nastaví se tmavé proměnné jen když bude uživatel preferovat tmavý režim.

    Nebude-li mít `&lt;html>` žádnou třídu, použijí se výchozí světlé barvy.

Nyní stačí už jen [přepínat třídy JavaScriptem](/prepinani-trid). 

### Duplicitní deklarace barev

Jak je vidět z kódu, deklarace CSS proměnných bude v kódu dvakrát. Mohlo by se nabízet detekovat styl čistě v JS a až podle toho třídu nastavovat. Bohužel to má nevýhodu v problikávání při načítání, než se stihne JS spustit.

Takže jedině takový JS nedávat do externího souboru, ale umístit ho do kódu před samotný obsah webu.

### Uložení nastavení

K úvaze je, kam uložit nastavení vzhledu. Záleží na typu aplikace. U klasické aplikace renderující se na straně serveru jsou výhodnější [cookies](/cookies) než třeba [`localStorage`](/localstorage), protože kvůli prevenci probliknutí po změně je nutné znát situaci už na backendu.

U [SPA](/spa) je `localStorage` v pohodě.

Nastavení se i může ukládat do profilu, pokud se uživatel přihlašuje.

## Řešení obvyklých problémů

Při převádění již existujícího světlého webu do tmavých barev dost možná  narazíte na následující problémy:

### Barvy ikon a obrázků

Asi nejpracnější část výroby tmavého režimu, pokud nejsou ikony řešeny vhodným způsobem.

Ideální je používat nějaké ikony, které jde **snadno přebarvovat**. Takže třeba SVG vložené inline do HTML kódu nebo pomocí `&lt;use>` z SVG spritu:

```
&lt;svg>
  &lt;use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="sprite.svg#icon">&lt;/use>
&lt;/svg>
```

A v ikoně používat pro přebarvitelné části v atributech `fill` a `stroke` hodnotu [`currentColor`](/currentcolor). Šlo by i používat přímo CSS proměnné, ale byl by s nim problém kvůli nepodpoře ve starších prohlížečích.

Potom už jde ikonky snadno přebarvit:

```
svg {
  fill: var(--color-text);
}
```

Dobře přebarvitelné jsou i staré dobré [font ikony](/font-ikony), ale ty trpí řadou různých problémů, že je používat nedoporučuji.

#### Přebarvení CSS filtrem

U jiných než vektorových obrázků (PNG, JPG, GIF) je jediná možnost použít již zmíněnou vlastnost `filter`.

Průhledný obrázek jako třeba logo jde převést na bílou následovně:

```
.theme-dark .logo {
  filter: invert(.5) brightness(2);
}
```

Případně obráceně na černou:

```
.theme-dark .logo {
  filter: invert(.5) brightness(0);
}
```

### Velký počet barev

Hodně webů trpí nešvarem v podobě velkého počtu barevných odstínů. Většinou to vzniká tak, že se barvy chaoticky střílí od oka. Ve finále jsou potom na webu vysoké desítky až stovky různých barev.

Je dobré se podívat na všechny použité barvy – třeba nástrojem [CSS Color Extractor](http://www.css-color-extractor.com/) – a pokusit se je sjednotit.

Usnadní to práci a udržování dvou (popř. více) barevných schémat.

### Barva prohlížeče `theme-color`

Zvlášť na mobilech je populární [přebarvovat horní lištu](/barva-mobilniho-prohlizece).

```
&lt;meta name="theme-color" content="#1081DD">
```

I tuto lištu se pravděpodobně hodí barvit podle použitého režimu, aby ladila ke zbytku stránky.

Není problém barvu přepínat JavaScriptem, takže může reagovat i na přepínání a detekci režimu.

Akorát to nejde jen v CSS, ale musí se skriptem měnit atribut `content` – [živá ukázka](http://kod.djpw.cz/ksed).

## Jak je přechod náročný?

Ačkoliv to tak může vypadat, vytvořit tmavý režim k již existujícímu světlému webu není úplně práce na odpoledne. A může vyžadovat velkou porci změn ve zdrojovém kódu.

Příklad z jednoho projektu:

## Kde se inspirovat

Jaké zvolit odstíny černé a šedé? Příklad populárních webů a aplikací, kde existuje světlý/tmavý režim.

  - [facebook.com](https://www.facebook.com),

  - [twitter.com](https://twitter.com/),

  - [stackoverflow.com](https://stackoverflow.com),

  - [youtube.com](https://www.youtube.com)

## Odkazy jinam

    [Darken &amp; Lighten colors in pure CSS using variables](https://gist.github.com/tunguskha/e4dceb7080bfeea486cd476e9631a413)

    [How to combine SASS color functions and CSS Variables](https://codyhouse.co/blog/post/how-to-combine-sass-color-functions-and-css-variables)

  - [Příklad generování CSS proměnných ze SASS proměnných](https://www.sassmeister.com/gist/024661b7927d7bce4874204cdbeb5eed)

  - [Generátor filtrů pro přebarvení černé](https://codepen.io/sosuke/pen/Pjoqqp)