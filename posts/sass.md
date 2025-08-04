---
title: "Preprocesor SASS/SCSS v praxi"
headline: "Preprocesor SASS/SCSS v praxi"
description: "Rychlokurs z praxe proč a jak začít psát CSS s využitím preprocesoru SASS."
date: "2017-05-29"
last_modification: "2017-05-29"
status: 0
tags: []
---

Pro usnadnění psaní CSS existuje řada tzv. **CSS preprocesorů** – jedná se o nástroje, které z nějaké jiné, ale zpravidla CSS velmi podobné, syntaxe kompilují finální styly, kterým rozumí prohlížeč.

Díky tomu jde psát CSS pohodlnějším způsobem. Hlavní přednost je možnost lépe dodržovat zásadu DRY (*don't repeat yourself*) – tedy neopakovat stejný kód.

Nevýhoda je nutnost řešit **build proces** finálních CSS v deployovacím procesu.

## SASS vs. SCSS

Zdrojové soubory mohou být psány buď v syntaxi SASS (přípona `*.sass`) nebo SCSS (přípona `*.scss`).

Liší se syntaxí a SCSS se více **podobá obyčejnému CSS**. Validní CSS soubor je zároveň **automaticky validní SCSS**. Díky tomu jde snadno celý projekt psaný v čistém CSS překlopit do SASSu (s SCSS syntaxí).

```
/* příklad validního CSS i SCSS zároveň */
a **{**
  color: red**;**
  font-weight: bold**;**
**}**
```

Syntaxe SASS je trochu jiná – nepoužívá složené závorky pro zanořování (místo toho je odsazování) a nevyžaduje psát středníky mezi deklaracemi.

```
/* příklad SASS syntaxe */
a
  color: red
  font-weight: bold
```

Pro začátek je tak asi lepší zvolit **SCSS syntaxi** – je více podobná CSS.

Pokročilejší tvůrce zase může lákat SASS syntaxe, protože vypouští nepotřebné znaky a vede tak k úspornějšímu kódu.

## Rozdíly oproti CSS

Při pohledu do SCSS souboru jde pozorovat oproti CSS řadu rozdílů:

### Proměnné

Tím nejsou myšleny nativní [CSS proměnné přes `var`](/var), ale vlastní proměnné, které se potom zkompilují do obyčejného CSS (bez `var`).

Používají se nejčastěji pro barvy nebo breakpointy v [media queries](/media).

Nejprve se nadeklarují:

```
$blue: #1081DD;
$dark-blue: #0D6AB7;
$light-blue: #8ECCF0;

$small: 40em;

```

Nyní je možné kdekoliv používat:

```
@media (max-width: $small) {
  body {
    background-color: $dark-blue;
  }
}
```

### Importování souborů

V běžném CSS je poměrně běžné psát všechny styly do jediného souboru, který se potom připojí na všechny stránky. Tento postup se obejde bez nutnosti řešit všelijaké [spojování CSS](slouceni-js-css).

Jelikož se SCSS stejně musí zkompilovat do finálního CSS, není problém zdrojové soubory dělit do jednotlivých souborů.

Používá se k tomu stejně jako v CSS příkaz `@import` (v CSS se většinou moc nepoužívá, protože v externím CSS brání paralelnímu stahování a má tak negativní vliv na [rychlost stránky](/zrychlovani)).

Hlavní soubor projektu (např. `main.scss`) potom typicky obsahuje pouze `@import`y jednotlivých částí:

```
@import "helpers/mixins"; /* znovupoužitelné mixiny */

@import "base/variables"; /* definice proměnných */
@import "base/document"; /* základní definice dokumentu */

@import "components/buttons"; /* samostatná komponenta tlačítek */
```

Veškeré styly se tak *rozsekají* do **jednotlivých souborů** podle logických souvisejících celků.

**Proč?**

Napomáhá to přehlednosti, orientaci, znovupoužitelnosti atd. Bývá příjemnější pracovat se soubory s desítkami řádků než s tisíci.

Například styly tohoto webu se (v době psaní článku) skládají z cca 50 `*.scss` souborů. U větších webů to mohou být klidně stovky.

### Komentáře

V SCSS jde používat i řádkové komentáře používané třeba v [PHP](/php) nebo [JavaScriptu](/js):

```
// Řádkový komentář, který v čistém CSS rozbije následující deklaraci

/*
Blokový komentář
funguje v SCSS i CSS.
*/
```

### Zanořování bloků selektorů

V SCSS jde napsat něco jako:

```
p {
  color: red;
  
  a {
    color: blue;
  }
}
```

Výsledkem bude následující výstup:

```
p {color: red}
p a {color: blue}
```

Zvlášť užitečná je tato schopnost při využití [`@media` pravidel](/media):

```
.nejaka-super-trida {
  color: red;
  
  @media (max-width: $small) {
    color: blue;
  }
}
```

Výstup / zápis v čistém CSS by vypadal takto:

```
.nejaka-super-trida {color: red}
@media (max-width: 40em) {
  .nejaka-super-trida {color: blue}
}
```

V SCSS je hezké, jak odpadne nutnost duplikovat CSS selektor uvnitř `@media` bloku.

### Magický ampersand

Ušetřit psaní dokáže magický `&amp;`, zvlášť při psaní podle [metodiky BEM](/bem):

```
.block {
  position: relative;
  
  &amp;__element {
    color: blue;
    
    &amp;--modifikator {
      color: red;
    }
  }
}
```

Výsledné CSS bude:

```
.block {
  position: relative;
}
.block__element {
  color: blue;
}
.block__element--modifikator {
  color: red;
}
```

Velmi se to hodí i u pseudo tříd a pseudo elementů:

```
a {
  color: red;
  
  &amp;:hover {
    color: blue;
  }
  
  &amp;:after {
    content: "…";
  }
}
```

Výsledkem je:

```
a {
  color: red;
}
a:hover {
  color: blue;
}
a:after {
  content: "...";
}

```

**Pozor na přehnané zanořování!** Zanořování je na používání lákavé, ale má to jisté nevýhody:

    Při nepoužívání BEMu vznikají hodně silné selektory, které potom může být problém přebít.

    V delším SCSS souboru je náročné najít potřebný selektor, když všechno začíná na `&amp;__`.

    Z tohoto důvodu může být přehlednější bloky moc nezanořovat (maximálně jednu až dvě úrovně) nebo celé názvy selektorů raději vypisovat. Trochu to ale odporuje zásadě DRY (neopakovat kód).

    Lepší řešení je spíš rozsekat styly do samostatných komponent v samostatných souborech.

## Mixiny, include a extend

### Mixin `@mixin`

Mixin je něco jako funkce. Jde mu zadat nějaké parametry a on podle toho vrátí kód.

Většina příkladů použití *mixinu* uvádí přidávání [CSS prefixů](/css-prefixy) (`-webkit-`, `-moz` apod.). To ale není moc rozumné řešení, protože to mnohem elegantněji dokáže vyřešit [autoprefixer](https://github.com/postcss/autoprefixer) (plugin k potřebným vlastnostem automaticky přidává prefixy).

Mixin se v praxi může hodit třeba na [clearfix](/float#after).

Docela užitečný může být mixin pro [animace](/animation) – třeba pro jednoduchou pulsující animaci, které lze nastavit měřítko:

```
@mixin pulseAnimation($scale) {
  @keyframes pulseAnimation#{$scale} {
    from {
      transform: scale(1);
    }
    to {
      transform: scale($scale);
    }
  }
  
  animation: infinite .5s alternate pulseAnimation#{$scale};
}

```

Při použití se vygenerují potřebné `@keyframes` + CSS vlastnost `animation`. Pro vložení mixinu slouží příkaz `@include`.

```
.block {
  @include pulseAnimation(2);
}
```

Výsledkem bude pulsující animace od měřítka 1 do měřítka 2 – [živá ukázka](http://kod.djpw.cz/cnhc).

Obecně se mixiny hodí hlavně pro **automatické generování parametrizovaného kódu**.

### Rozšiřování `@extend`

Používat `@extend` jde s běžnými selektory. Funguje to tak, že např. třída, ve které se použije `@extend`, se přidá k selektoru třídy za `@extend`:

```
.prvni-trida {
  color: red;
}

.druha-trida {
  **@extend .prvni-trida**;
}
```

Výstupem bude:

```
.prvni-trida, **.druha-trida** {
  color: red;
}
```

Tedy místo zkopírování celého kódu jako u *mixinů* se pouze zkopíruje selektor.

V praxi je `@extend` ale celkem problematický.

    Může být na první pohled lákavé si extendovat celé bloky kódu a potom některé vlastnosti přebíjet. Vzhledem k tomu, že `@extend`y jdou do sebe zanořovat, může tento postup vést k velkému chaosu.

    Extendování selektorů **nejde použít** uvnitř `@media` bloku.

  - Na první pohled se může zdát dobré, že ty samé bloky v kódu nemusí být vícekrát. S tím si ale celkem **poradí GZIP komprese**, která opakující se kód dost datově zmenší.

Z těchto důvodů je tedy lepší `@extend` nepoužívat a vystačit si s `@include`.

Nebo k elementům v HTML přiřazovat klidně více tříd. Tj. nepoužít `@extend`, ale místo toho:

```
&lt;div class="prvni-trida druha-trida">
  …
&lt;/div>
```

Co se stane, když se tento postup dotáhne do extrému, popisuje článek:

    - [Expressive CSS](/expressive-css) – stylování webů (skoro jen) prostřednictvím CSS tříd

### Extendování `%blok`u

Pokud se blok místo CSS selektoru označí procentem, půjde extendovat stejně jako třeba třída, ale nebude mít žádný dostupný selektor:

```
%blok {
  color: red;
}

.trida {
  @extend %blok;
}
```

Výstupem bude:

```
.trida {color: red}
```

Asi nikdy jsem to nepoužil.

### Prázdné deklarace

Hezká vlastnost je vypouštění zbytečného kódu z finálního výstupu. Takže z následujícího kódu nic nezbude:

```
.super-trida {
}
```

## Vestavěné funkce

### Barvy

Hezká vlastnost je schopnost zadávat průhledné barvy v [`rgba`](/rgba) bez nutnosti psát v RGBA. Tohle normálně funguje:

```
background-color: rgba(black, .5);
background-color: rgba(#000, .5);
```

Další užitečná věc je transformace barev. Třeba ztmavení/zesvětlení barvy o X procent:

```
.box {
  background: yellow;
  color: blue;
  
  &amp;:hover {
    background: darken(yellow, 5);
    color: darken(blue, 15);
  }
}
```

    - [Sass: Color Functions](https://sass-lang.com/documentation/functions/color) – popis všech operací s barvami

## Cykly for, foreach a while

Vyhnout se opakování kódu jde s využitím cyklů. Asi nejzajímavější je `@foreach`. Jde tak elegantně vypsat např. různé helper offsety:

```
$offsets: (
    'small': 20px,
    'medium': 40px,
    'large': 60px
);

@each $offset in $offsets {
  .offset-#{nth($offset, 1)} {
    margin-top: nth($offset, 2);
  }
}
```

Výsledkem bude:

```
.offset-small {
  margin-top: 20px;
}

.offset-medium {
  margin-top: 40px;
}

.offset-large {
  margin-top: 60px;
}

```

    - [Živá ukázka](https://www.sassmeister.com/gist/6c0234de43d8012594e7dccbfc5ae895) – generování CSS z SCSS ve `@foreach` cyklu

Články o pokročilejších využitích těchto technik:

    - The Sass Way: [Sass control directives: @if, @for, @each and @while](http://thesassway.com/intermediate/if-for-each-while)

    - [Using Sass Maps](https://www.sitepoint.com/using-sass-maps/)

## Vyzkoušet SASS

Pro okamžité zkoušení SCSS/SASS syntaxe existuje šikovná služba:

    - [SassMeister](https://www.sassmeister.com) – online nástroj kompilující SCSS do CSS

## Jak začít SASS používat

Začít SASS používat na projektu vyžaduje určité **vstupní nastavení**. Je potřeba, aby *něco* přeložilo SASS/SCSS do CSS, co bude fungovat v prohlížečích.

Možností je hned několik:

  - příkazová řádka,

  - editor,

  - externí aplikace

Asi nejsnazší řešení je použít aplikaci typu [Compass.app](https://compass.kkbox.com). V ní jde snadno naklikat nový projekt, který bude kompilovat SCSS soubory do CSS. Včetně automatického sledování změn souborů a obnovování změn (hotreload).

Obdobně dokáže fungovat i [LiveReload](/livereload).

Nevýhoda těchto řešení spočívá v tom, že použité řešení není pevně spjato s projektem. Může se tak stát, že různí lidé budou používat různé verse a ze stejných zdrojových SCSS souborů bude vznikat různý výstup.

Další problém je v ne úplně hezkém způsobu deployování (nasazování na server). Většinou je žádoucí produkční CSS **zkompilovat až při buildu** během nasazování webu, aby zkompilované soubory nebyly versované v repositáři. A k tomu se tyto aplikace moc nehodí.

Versovat kompiláty není dobré, protože při změnách často vznikají konflikty. Zvlášť v případě minifikace.