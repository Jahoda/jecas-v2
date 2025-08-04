---
title: "Asynchronní načítání CSS"
headline: "Načítání CSS bez blokování vykreslování"
description: "Jak asynchronně načítat CSS, aby neblokovalo vykreslování stránky."
date: "2014-11-18"
last_modification: "2014-12-08"
status: 1
tags: ["CSS", "Hotová řešení", "Rady a nápady", "Zrychlování webu"]
---

**Externí CSS** se většinou připojuje v **hlavičce stránky** (`&lt;head>`) dvěma způsoby:

    HTML značkou `&lt;link>`:

    ```
&lt;link rel="stylesheet" href="styl.css">
```

    CSS pravidlem `@import` uvnitř `&lt;style>`:

    ```
&lt;style>
  @import url('styl.css');
&lt;/style>
```

Problém obou případů spočívá v tom, že jejich **načítání** a **zpracování** blokuje vykreslení stránky. Než se CSS stáhne a zpracuje, uživatel **zírá na prázdnou stránku**.

S ohledem na [vykreslování stránky](/vykreslovani) to má opodstatnění. Prohlížeč nemusí stránku **překreslovat** po každém CSS pravidlu, které zrovna zpracoval, ale nejdříve si počká na všechny styly a stránku **vykreslí najednou**.

Jelikož **HTTP spojení** pro každý CSS soubor něco *stojí*, znamená toto čekání zbytečnou **prodlevu při načítání stránky**. U datově většího nebo u více souborů se styly už to může být problematické.

    - Více CSS souborů bývá dobré spojit: [Spojení CSS a JS souborů do jednoho](/slouceni-js-css)

## Asynchronní načítání CSS

V případě, že bude výsledné CSS hodně velké nebo zkrátka chceme první načtení **co nejrychlejší**, nabízí se styly **rozdělit na dvě části**:

    Minimum stylů nutných k přijatelnému **zobrazení obsahu „nad ohybem“** (obsah, který je vidět ihned po načtení, než začne uživatel **rolovat**).

    Zbytek stylů („kritické CSS“).

Tzv. **kritické CSS** (pro obsah nad ohybem) se potom vloží přímo do hlavičky do značky `&lt;style>`. A zbytek se načte později JavaScriptem. Taková **JS funkce** a její použití může vypadat následovně.

```
&lt;script>
function nacistCSS(url) {
  var styl = document.createElement("link");
  var skript = document.getElementsByTagName("script")[0];
  styl.rel = "stylesheet";
  styl.href = url;
  setTimeout(function() {
    skript.parentNode.insertBefore(styl, skript);
  });
}
nacistCSS("**dalsi-styl.css**");
&lt;/script>
```

Pro funkčnost [bez podpory JavaScriptu](/vypnuty-js) se potom za tento skript umístí standardní připojení CSS do značky `&lt;noscript>`.

```
&lt;noscript>
  &lt;link rel="stylesheet" href="**dalsi-styl.css**">
&lt;/noscript>
```

## Kdy má rozdělení smysl

Při úvaze o **asynchronním načítání CSS**, je dobré stejně jako u jiných způsobů **optimalisace rychlosti** nejprve změřit aktuální stav.

    - [WebPageTest](http://www.webpagetest.org/) – zjistí časovou osu načítání stránky

A podle aktuálního stavu potom postupně upravovat nejprve věci, které **zdržují nejvíce**. Tj. pokud generování stránky na serveru trvá 0,5 sekundy, je nejspíš účinnější řešit to místo pár desítek milisekund, co zabere stažení CSS o velikosti pár desítek kilobytů.

HTTP požadavek na běžný CSS soubor tedy může zabrat nižší desítky milisekund, kdy většinu času zabere **navázání spojení**.

U webů, které používá hodně návštěvníků **z mobilu**, jsou docela rozumné následující **orientační hodnoty**.

  - Obsah stránky „nad ohybem“ by se měl vejít do **prvních 14 kB**.

  - Neasynchronně načítané (= vykreslování blokující) externí CSS by mělo být **do 20 kB**.

## Vytvoření „kritického CSS“

Pro získání kritické části CSS z již **existující stránky** existuje docela šikovný online nástroj:

      - [Critical Path CSS Generator](http://jonassebastianohlsson.com/criticalpathcssgenerator/)

    - [Inlining critical CSS for first-time visits](https://adactio.com/journal/8504)

Pochopitelně se těžko může měřit s **ručním vytvořením** nejnutnějších stylů. A už vůbec potom s tím, když bude člověk psát CSS od začátku s ohledem na vytvoření *kritického CSS*.

Není potřeba se totiž striktně držet stylování **všeho „nad ohybem“**, ale můžeme se zaměřit jen na styl hlavního obsahu. A ostatní styly asynchronně donačíst později bez **zdržování vykreslování**.

Pro **pocit rychlého načtení** je totiž klíčové zobrazit co nejdříve hlavní obsah. Když si ho uživatel bude už moci číst, není takový problém, že se **zbytek stránky** načte až později.

## Cache

Nevýhoda rozdělení CSS na **interní a externí** část způsobí, že se ta interní **nebude ukládat do cache** v prohlížeči. Dá se tedy říct, že výrazně zrychlíme **načítání první stránky**, abychom lehce zpomalili načítání všech dalších stránek. Kritické CSS se bude znovu a znovu stahovat na všech stránkách webu.

Taktéž přenášení stále stejného *kritického CSS* zvýší datový přenos.

Existují různé pokusy o **kešování kritického CSS** do [lokálního úložiště](/zalohovani-formularu#local-storage) (`localStorage`), ale u většiny webů to nejspíš nepřinese takovou úsporu, aby to mělo smysl řešit. Několik kB navíc bez nutnosti dalšího HTTP spojení zbrzdí stránku jen **minimálně**.

Při implementaci si je nutné dát pozor na **relativní cesty** k **obrázkům** nebo **fontům**, pokud jsou tyto soubory v podadresářích třeba nějak takto:

```
/index.html
/css/styl.css
/obrazky/obrazek.png
/fonty/pismo.otf
```

Nebude cesta typu „`../obrazky/obrazek.png`“ ze značky `&lt;style>` z hlavičky souboru `index.html` fungovat.

## Odkazy jinam

  - [Loading CSS without blocking render](http://keithclark.co.uk/articles/loading-css-without-blocking-render/)