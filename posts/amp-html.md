---
title: "AMP HTML ⚡"
headline: "AMP HTML ⚡"
description: "AMP HTML je způsob tvorby webu, při kterém je stránka dobře uzpůsobena rychlému načítání na mobilních zařízeních."
date: "2015-10-07"
last_modification: "2016-03-02"
status: 1
tags: ["HTML", "Zrychlování webu"]
---

Zkratka **AMP** znamená *Accelerated Mobile Pages* (akcelerované mobilní stránky). Projekt má web na adrese [ampproject.org](https://www.ampproject.org/).

Anglické představení si je možné přečíst zde:

    - Accelerated Mobile Pages: [A new approach to web performance](https://www.ampproject.org/how-it-works/)

Ukázková kostra stránky vyhovující **principu AMP** je potom na [GitHubu](https://github.com/ampproject/amphtml).

## Hlavní myšlenka

Mobilní připojení je stále značně slabší než u desktopů. Pokud web načítá hromady JavaScriptových knihoven, na pomalém přípojení se **stránka vůbec nemusí načíst** a obsah zobrazit. Přitom samotný obsah, kvůli kterému návštěvník hlavně přišel, by tolik dat nevyžadoval.

Accelerated Mobile Pages se tedy týká **převážně obsahových webů**. Na stránce může být z klasického HTML **pouze text**. Všechno ostatní se řeší `amp-*` komponentami – těmi se potom vkládají obrázky, videa, lightboxy, reklamy nebo meřicí skripty.

Věci **vyžadující JavaScript** se tak budou řešit prověřenými **AMP komponentami**.

  Snaha o rychlý obsah v podání Facebooku se jmenuje [Instant Articles](/facebook-instant-articles).

## Použití

Základem je následující **HTML kostra**.

```
&lt;!doctype html>
&lt;html** ⚡**>
&lt;head>
  &lt;meta charset="utf-8">
  **&lt;link rel="canonical" href="hello-world.html">**
  &lt;meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,**minimal-ui**">
  **&lt;script src="https://cdn.ampproject.org/v0.js" async>&lt;/script>**
  &lt;style>body {opacity: 0}&lt;/style>&lt;noscript>&lt;style>body {opacity: 1}&lt;/style>&lt;/noscript>
&lt;/head>
&lt;body>Hello World!&lt;/body>
&lt;/html>
```

Za povšimnutí stojí symbol blesku v značce `&lt;html>`, nutnost použít `&lt;link rel="canonical">` (pro odkázání na normální HTML podobu) nebo použití `minimal-ui` v `&lt;meta name="viewport">`. Možnost `minimal-ui` jeden čas fungovala v mobilním iOS 7.1 (ve versi 8 byla zrušena) pro zmenšení rozhraní prohlížeče, což se hodilo u webových aplikací:

    - StackOverflow: [iOS 8 removed “minimal-ui” viewport property, are there other “soft fullscreen” solutions?](http://stackoverflow.com/questions/24889100/ios-8-removed-minimal-ui-viewport-property-are-there-other-soft-fullscreen)

Nakonec se připojuje samotný skript „AMP HTML“, ten má necelých **40 kB**.

  Pro lepší cacheování se připojuje z [CDN](/cdn).

  Aby jeho připojení neblokovalo vykreslování stránky, má [atribut `async`](/async-defer#async).

## Vestavěné komponenty

Cokoliv pokročilejšího než **běžný text** se řeší tzv. komponentami. Některé jsou vestavěné přímo v připojovaném skriptu:

  `&lt;amp-img>` – pro vložení obrázku, funguje obdobně jako `&lt;img>`

    Proč nevkládat obrázek standardní cestou? Použití vlastní značky je kvůli [lazy loadingu](/lazy-loading-obrazky) – obrázky se načtou, až když na ně návštěvník odroluje.

`&lt;amp-video>` – náhrada HTML5 značky `&lt;video>`

  `&lt;amp-ad>` –	slouží pro vložení reklamy (podporovány jsou reklamní systémy A9, AdReactor, AdSense, AdTech a Doubleclick)

  `&lt;amp-pixel>` – slouží pro počítadlo návštěv pomocí [pingnutí 1×1px obrázku](/ajax#pingnout)

## Externí komponenty

Další věci jako [lightboxy](/lightbox), vložení videa z [YouTube](/youtube), vložení obsahu z rámu a podobně se řeší **externími komponentami**.

To funguje tak, že se připojí další JavaScripty, které přidají potřebnou funkčnost.

Připojovat takovou spoustu skriptů se zdá být nerozumné. Při rozšířeném používání *Accelerated Mobile Pages* by ale všechny tyto knihovny v sobě měla už **cache prohlížeče**, takže by šlo používat hotové JS funkce bez načítání dalších dat.

    - [Živá ukázka](http://kod.djpw.cz/hwqb-) – použití všech dostupných AMP komponent

## Validace AMP HTML

Po připojení skriptu jde provést kontrolu, jak si stránka stojí s představou AMP HTML. Validace se zapne přidáním `#development=1` do adresy stránky. **Výsledek validace se objeví v JS konsoli** ve [vývojářských nástrojích](/vyvojarske-nastroje):

    - [Živá ukázka](http://kod.djpw.cz/gwqb-#development=1) – prostá AMP stránka s textem a obrázkem

Připojit si na zkoušku AMP skript do existujícího webu může být docela zajímavé. Člověk se dozví, co jeho web **nesplňuje**.

## Využití

Pro použití této technologie pro obsahový web vidím zásadní problém v nemožnosti použít:

  - **obrázky** – značka `&lt;img>` je zakázána a je otázka, jak obrázky vložené pomocí `&lt;amp-img>` budou nalezitelné vyhledávači;

  - **formuláře** – i na obsahovém webu se občas hodí

Další věc je, že je možné vytvořit **rychlejší a universální stránku** i bez použití AMP HTML.

Pro stránky, které se na mobilech načítají pomalu, to ale může být impuls ke změně.

## Odkaz na AMP versi

Stránky v AMP HTML dává smysl vytvářet spíš jako zvláštní podobu původních článků. Podobně jako například u RSS.

Aby se lidé a vyhledávače dozvěděli, že web existuje v AMP, existuje `rel="amphtml"`:

```
&lt;link rel="amphtml" href="/html-podoba-clanku">
```

Pro klasické [HTML odkazy](/odkaz) se potom nabízí:

```
&lt;a rel="amphtml" href="/html-podoba-clanku">
  Odkaz na AMP
&lt;/a>
```

  Původně článek vyšel 8. října 2015, zbytek je aktualisace z **2. března 2016**:

## Je AMP rychlejší?

Použít AMP automaticky neznamená, že bude stránka rychlejší než v obyčejném HTML. Při splnění AMP pravidel bude stránka sice patřit k rychlejším; bez AMP by ale na tom teoreticky mohla být ještě lépe (minimálně o dobu stahování `*.js` souboru s AMP).

Člověk, který ví, co dělá, dokáže vytvořit rychlejší web v obyčejném HTML. Pro ostatní je ale AMP vodítko, jak udělat stránku „dostatečně rychlou“.

    - [AMP Project: Will it Make Your Sites Faster?](http://webdesign.tutsplus.com/articles/amp-project-will-it-make-your-sites-faster--cms-25853) – srovnávací test rychlosti s/bez AMP

## Vliv na SEO

[Google](/google) začal AMP weby označovat ve výsledcích vyhledávání.

Prozatím nemají mít AMP weby přednost ve výsledcích hledání, nicméně je možné, že označení webu jako AMP bude mít vliv na uživatele vyhledávače, které budou tyto weby upřednostňovat před obyčejnými stránkami.

Je k úvaze, zda se časem kvůli *AMP ikonce* nebudou rychlé weby zpomalovat AMP skripty…

## Odkazy jinam

  - Adactio.com: [AMPed up](https://adactio.com/journal/9646)

  - Vzhůru dolů: [AMP opravuje a zároveň rozbíjí World Wide Web](http://www.vzhurudolu.cz/blog/40-amp)