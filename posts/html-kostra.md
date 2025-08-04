---
title: "HTML kostra"
headline: "HTML kostra"
description: "Jak vypadá základní „kostra“ HTML stránky. Které HTML značky ji utváří."
date: "2015-03-06"
last_modification: "2015-10-20"
status: 1
tags: ["HTML", "HTML značky"]
---

```
&lt;!doctype html>
&lt;meta charset="utf-8">
&lt;title>Titulek stránky&lt;/title>
Obsah stránky.
```

Na HTML kódu je zajímavé, že v podstatě nemusí obsahovat žádný HTML kód a přesto funguje.

Když se napíše libovolný textový obsah do textového souboru s příponou `*.html`, prohlížeče ho zobrazí jako HTML. Nejjednodušší HTML stránka tedy **nemusí obsahovat jedinou HTML značku**.

```
Nejjednodušší HTML stránka.
```

    - [Živá ukázka nejjednodušší HTML stránky](http://kod.djpw.cz/mqlb-)

## Čeština

Někdy se může stát, že prohlížeč není schopen správně určit kódování dokumentu, což vyústí ve špatné **zobrazení české diakritiky**.

  NejjednouduĹˇĹˇĂ HTML strĂˇnka.

Příklad pochází z této stránky:

    - [Příklad stránky se špatným kódováním](http://jecas.cz/files/html-kostra/stranka.html)

Z takových důvodů se pro jistotu na začátek stránky přidává `&lt;meta charset>`. Pro nové stránky je zpravidla nejvýhodnější volit kódování **UTF-8**.

```
**&lt;meta charset="utf-8">**
Nejjednodušší HTML stránka s funkční češtinou.
```

Nastavit kódování jde i jinými způsoby.

    Využitím tzv. [BOMu](/bom) (*Byte order mark*).

    Poslat skutečnou HTTP hlavičku `Content-Type`. V PHP třeba následovně:

    ```
header("Content-type: text/html; charset=utf-8");
```

Jelikož BOM může vytvářet problémy při používání PHP a HTTP hlavička zase nezajistí správné kódování při případném **uložení souboru na disk**, zdá se `&lt;meta>` značka nejvýhodnější.

Občas je možné se setkat se **starší podobou** `&lt;meta>` značky pro kódování češtiny, je zbytečně složitá a patří do musea:

```
&lt;meta http-equiv="content-type" content="text/html;charset=utf-8">
```

## Titulek stránky

Po přidání `&lt;meta>` značky pro správné kódování češtiny už je stránka dobře funkční.

Pro vyšší komfort návštěvníků je dále vhodné přidat značku `&lt;title>` obsahující titulek stránky. Bez něj se v záložce zobrazí jen ne úplně srozumitelná adresa.

Titulek je optimální umístit až pod `&lt;meta charset>` značku pro kódování češtiny a před obsah.

```
&lt;meta charset="utf-8">
**&lt;title>Název stránky&lt;/title>**
Nejjednodušší HTML stránka s funkční češtinou a titulkem.
```

  - Umístění `&lt;title>` za `&lt;meta charset>` zajistí jistotu správného kódování už v samotném titulku.

  - Umístit `&lt;title>` co nejvýš je dobré k tomu, aby se z titulku návštěvník co nejdříve dozvěděl, že se stránka načítá a o čem zhruba je.

HTML jinak disponuje značnou volností, takže není problém značku `&lt;title>` dát klidně až za obsah. Bude to ale mít nevýhodu v tom, že se titulek může zobrazit až později, protože se před ním musí stáhnout ostatní HTML kód.

Titulek může být jen jeden, takže opětovné umístění značky `&lt;title>` už název stránky v záložce nepřepíše. Použije se první výskyt.

## Značka `&lt;!doctype>`

Používá se pro přepínání režimu prohlížečů. Zpravidla je výhodné přepnout stránku do **standardního režimu** (bez `&lt;!doctype>` se používá *quirk režim*).

    - [HTML značka `&lt;!doctype>`](/doctype) – rozdíl mezi standardním režimem a quirkem

Stačí tedy uvést na začátek souboru:

```
&lt;!doctype html>
```

Velké rozdíly jsou hlavně v **Internet Exploreru**. Ostatní prohlížeče se mezi quirkem a standardním režimem tolik neliší (na box model v nich nemá režim vliv), ale třeba dědění velikosti písma v tabulce je odlišné.

## Kompletní HTML kostra

Základní podoba dobře funkční HTML kostry dokumentu vypadá následovně.

```
&lt;!doctype html>
&lt;meta charset="utf-8">
&lt;title>Titulek stránky&lt;/title>
Obsah stránky.
```

Tato základní kostra stránky může působit trochu **minimalisticky** oproti příkladům často uváděných v HTML učebnicích.

K vidění bývají příklady s uváděním nepovinných značek `&lt;html>`, `&lt;head>` a `&lt;body>`, které není potřeba psát.

    - Druhy HTML značek: [Počáteční i koncová značka volitelná](/html-znacky#volitelne)

Značka `&lt;html>` není přímo potřebná k ničemu. Samotné ruční dělení dokumentu na `&lt;head>` a `&lt;body>` **není potřeba v 99,9 % případů**.

Explicitně uvádět tyto značky má tedy smysl jen v případě, že se pro ně nastavují nějaké CSS třídy, identifikátory a podobně. Případně kvůli **HTML editorům**, které mohou mít teoreticky problém rozlišit hlavičku a tělo.

Prohlížeče ví, jak funguje HTML, takže si `&lt;html>`, `&lt;head>` a `&lt;body>` domyslí a ve finále v kódu budou.

Všechny tyto značky jde použít na stránce **pouze jednou**. Vícenásobné pokusy budou ignorovány.

### Značka `&lt;html>`

Jedná se tzv. o **kořenový element**. Nic výš ve struktuře HTML stránky neexistuje.

V CSS jde zaměřit [selektorem `:root`](/css-selektory#korenovy) (funkční od **IE 9**).

Má nepovinnou počáteční i koncovou značku, nemusí se tedy do kódu vůbec psát.

Podporuje skoro jen [globální atributy](/obecne-atributy), z nichž je nejzajímavější [`lang`](/lang) pro určení jazyku stránky.

Další atributy:

  `manifest`
  
    Atribut `manifest` slouží pro používání [application cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache).

  `xmlns`
  
    XML Namespace (jmenný prostor XML). Používal se v XHTML.

  `version`
  
    Dávno zavržený atribut: nahradil ho [`&lt;!doctype>`](/doctype).

### Hlavička `&lt;head>`

Hlavička stránky obsahuje prvky, které nejsou na stránce vidět:

  - titulek stránky `&lt;title>`,

  - meta informace ve značce `&lt;meta>`,

  - interní CSS – `&lt;style>`,

  - interní nebo externí JavaScript – `&lt;script>`,

  - obsah pro případ [vypnutého skriptování](/vypnuty-js) – `&lt;noscript>`,

  - odkazy na externí CSS nebo ikonky stránky ve značce `&lt;link>`,

  - stanovení základní adresy pro odkazy [`&lt;base>`](/base)

Jiné **obsahové značky** nejsou v hlavičce dovoleny a jejich použití ji automaticky uzavře a otevře `&lt;body>`.

Psát do kódu `&lt;head>` není potřeba.

Ačkoliv se značka `&lt;head>` a v ní obsažené značky nezobrazují, jde je stylovat.

    - [HEAD](https://htmlhead.dev) – popis snad všech myslitelných věcí, co mohou být v hlavičce stránky

### Tělo `&lt;body>`

Obsahuje samostatný obsah stránky, který prohlížeč renderuje vykreslovacím jádrem. Počáteční i koncová značka je nepovinná – `&lt;body>` se stejně vytvoří, když prohlížeč narazí na obsahový element, a ukončí za posledním elementem na stránce.

Kromě obecných atributů u něj jdou používat `on*` atributy pro **události v JavaScriptu**. Asi nejčastěji se používá událost `onload`, která se provede po načtení stránky.

Všechny atributy: `onafterprint`, `onbeforeprint`, `onbeforeunload`, `onblur`, `onerror`, `onfocus`, `onhashchange`, `onlanguagechange`, `onload`, `onmessage`, `onoffline`, `ononline`, `onpopstate`, `onredo`, `onresize`, `onstorage`, `onundo`, `onunload`

Nakonec obsahuje řadu atributů, které se před CSS používaly pro **určení vzhledu dokumentu**. Nemá smysl je používat, když jdou nahradit pomocí CSS.

    - [Ukázka](http://kod.djpw.cz/lhrb) – formátování stránky bez CSS

    - [Struktura dokument: body](http://www.jakpsatweb.cz/html/struktura.html#body) – přehled formátovacích atributů na Jak psát web

## Sémantické HTML5 značky

Na základě toho, že prvky webových stránek sestávají z obdobných sekcí jako je hlavička (tím není myšlena značka `&lt;head>`), navigace, obsah, patička a podobně, v HTML5 dostaly tyto prvky **značky se zvláštním názvem**.

Příklad HTML 5 struktury s využitím všech nových značek může vypadat následovně:

```
&lt;!doctype html>
&lt;html>
    &lt;head>
        &lt;meta charset="utf-8">
        &lt;title>Titulek stránky&lt;/title>
    &lt;/head>
    &lt;body>
      &lt;header>Hlavička stránky&lt;/header>
      &lt;nav>Navigace&lt;/nav>      
      &lt;main>
        &lt;article>
          &lt;header>Nadpis stránky&lt;/header>            
          &lt;section>Obsah stránky&lt;/section>
          &lt;footer>Zápatí článku&lt;/footer>
        &lt;/article>
      &lt;/main>
      &lt;aside>Boční sloupec&lt;/aside>
      &lt;footer>Patička&lt;/footer>
    &lt;/body>
&lt;/html>
```

### Značka `&lt;main>`

Patří do ní hlavní obsah stránky, který je **unikátní napříč webem**. Opakujicí se společné části stránky jako navigace, hlavička, patička a podobně by měly být mimo něj.

### Hlavička `&lt;header>`

Obecná značka pro hlavičku. Tím není myšleno pouze logo stránky, ale stejně tak může být v *hlavičce* uveden nadpis článku. Značka `&lt;header>` tedy označuje hlavičku/záhlaví dané sekce.

Hlavičkou tak bude i třeba nadpis a perex článku:

```
&lt;header>
  &lt;h1>Název článku&lt;/h1>
  &lt;p>Popis článku&lt;/p>
&lt;/header>
```

### Navigace `&lt;nav>`

Značka `&lt;nav>` označuje sekci obsahující **navigační prvky** – odkazy. Je jedno jestli externí nebo interní.

Do `&lt;nav>` tak patří hlavní menu, postranní menu nebo i [obsah stránky](/toc) (*table of contents*).

Odkazy v navigaci se často dávají do [seznamu](/seznamy):

```
&lt;nav>
  &lt;ul>
    &lt;li>&lt;a href="http://jecas.cz">Je čas&lt;/a>&lt;/li>
    …
  &lt;/ul>
&lt;/nav>
```

V dřívějších dobách se občas pro menu používala značka [`&lt;menu>`](/seznamy#menu), která se zobrazovala jako seznam. Byl jí změněn význam na [kontextovou nabídku](/menuitem).

### Článek `&lt;article>`

Že se značka `&lt;article>` hodí pro **obalení článku**, je asi jasné. Jinak do `&lt;article>` patří obsah, který jako celek dává smysl sám o sobě a nebyl by ho například problém přenést na jinou stránku.

V případě, že je na stránce článků více, bude pro každý odpovídat jeden `&lt;article>`.

Kromě článků je `&lt;article>` určen i třeba pro jednotlivé **příspěvky v diskusním fóru** nebo komentáře pod článkem.

### Patička/zápatí `&lt;footer>`

Neslouží pouze pro patičku stránky (to místo na konci webu, kam se [umisťuje datum](/paticka-datum)), ale pro **patičku dané sekce**.

Například v článku (značka `&lt;article>`) se nabízí do značky `&lt;footer>` dát informace o autorovi článku nebo odkazy na související zdroje.

### Okrajový obsah `&lt;aside>`

Označuje část obsahu, která není přímo související. Do `&lt;aside>` se nabízí umístit části bočního panelu, reklamy a podobně.

### Sekce `&lt;section>`

Obecná sekce obalující tematickou skupinu obsahu. Má smysl asi hlavně u rozsáhlých a dlouhých stránek/článků, kde už nejde vyznačit hierarchii prostřednictvím [nadpisů `&lt;h1–6>`](/nadpisy) – struktura je hlubší. Potom je řešení použít `&lt;section>`, kde se s číslováním nadpisů začne zase od začátku.

Značka `&lt;section>` má podobný význam jako původně `&lt;div>` (*division* – oddíl) než se začal hromadně používat ke stylování.

### Skupina nadpisů `&lt;hgroup>`

Značka `&lt;hgroup>` už byla z HTML 5 specifikace **odebrána**. Měla sloužit k obalení nadpisu a podnadpisu. Například:

```
&lt;header>
  &lt;h1>Název článku&lt;/h1>
  &lt;h2>Podnadpis článku&lt;/h2>
&lt;/header>
```

## Mají strukturní HTML 5 značky smysl?

Na strukturních HTML5 značkách je zajímavé to, že **prakticky nic nedělají**. Chovají se jako jakékoliv [vlastní značky](/vlastni-html-znacky), jen s tím rozdílem, že mají ve výchozích stylech **blokové zobrazení** ([`display: block`](/display#block)).

  Zbytečné strukturní tagy z HTML 5, protože nic nedělají.

  – **Dušan Janovský**, [Strukturní tagy z HTML 5](http://www.jakpsatweb.cz/html/html5-strukturni.html)

    Pro typické **návštěvníky jsou tyto značky neviditelné**, takže jejich přítomnost neocení.

    **Vyhledávače** potřebují a dovedou pochopit strukturu stránky i bez speciálních značek, protože nemají důvod stránky se sémantickými značkami upřednostňovat, když to **lidé neocení**.

    Pro starší prohlížeče se jedná o **neznámé značky**. V **IE 8** a starších se musí oživit JavaScriptem, aby vůbec šly stylovat.

    ```
&lt;!--[if lte IE 8]>
&lt;script>
var znacky = "article aside audio canvas datagrid datalist details dialog eventsource figure figcaption footer header hgroup mark menu meter nav output progress section time video";
znacky.replace(/\w+/g, function(znacka){document.createElement(znacka)});
&lt;/script>

```

    **Pro tvůrce webu** také nic moc nezlepšují. Psát `&lt;header>` nebo `&lt;div class="header">` vyjde prakticky nastejno.

V součtu tedy není moc důvod je používat.

Důvod pro používání je možná **zlepšení pro postižené uživatele** používající hlasové čtečky, které by mohly lépe pochopit strukturu.

Je ale k úvaze, jestli u čteček není situace stejná jako u vyhledávačů – **musí podporovat hromady starých stránek**, kde se HTML 5 značky nepoužívají, takže si s nimi musí poradit i bez zvláštní značek.

Větší přínos než zvláštní tagy by prý mohly mít [ARIA](/aria) atributy.