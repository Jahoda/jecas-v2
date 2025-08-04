---
title: "Responsivní reklama"
headline: "Responsivní reklama na mobilech"
description: "Jak se vypořádat s reklamami při vytváření responsivního webu. Jde to vůbec?"
date: "2015-09-14"
last_modification: "2016-01-13"
status: 1
tags: ["Responsivní design", "Reklama"]
---

Reklamy zpravidla každého jenom otravují, ale pro provozovatele webů je to jeden ze způsobů, **jak vydělat na provoz**.

Základní možnosti, co s reklamou na mobilu udělat, jsou:

    **Skrýt ji** – to ocení návštěvníci díky rychlejšímu načítání a méně rolování pro přeskočení reklamních bloků.

    **Přizpůsobit ji** – to ocení provozovatel, protože něco vydělá i na mobilech. Na mobilních zařízeních bývá reklama méně často blokována.

## Schování reklamy

```
.reklama {
  display: none;
}
```

Může se nabízet reklamní blok skrýt pomocí CSS konstrukce `[display](/display): none`.

To sice **visuálně reklamu skryje**, ale stále se mohou úplně **zbytečně načítat** skripty, styly a obrázky.

Lepší je proto zvolit jednu ze dvou možností:

  Na straně serveru [detekovat mobilní prohlížeče](/mobilni-web-url#detekce) a vůbec jim reklamní skripty nepřipojovat.

  Detekovat mobily by šlo i u klienta v JavaScriptu a podle toho následně dynamicky (ne)připojovat `*.js` soubory s reklamou.

    - [How to Hide AdSense Ads on your Website](http://www.labnol.org/internet/hide-adsense-ads/17822/) – jak skrýt AdSense reklamu od Google na webu

## Přizpůsobení

Při [předělávání desktopového webu na responsivní](/prevod-responsivni-design) se je často nutné vypořádat s různými reklamními bloky a upravit je tak, aby nepřesahovaly dostupnou šířku stránky.

Když je **reklamní banner** širší než dostupný prostor, stránka získá nehezký vodorovný posuvník.

Co s tím?

### Oříznutí

Nejsnazší je široký obsah jednoduše oříznout:

```
.obal-reklamy {
  overflow-x: hidden;
}
```

Stačí řezat pouze vodorovným směrem (osa X) pomocí `overflow**-x**: hidden`.

Nevýhoda tohoto postupu je zásadní – část obsahu reklamy nebude vidět.

### Zmenšení

Lepší řešení je tak zmenšit reklamu, aby se na displej vešla.

Sestává-li reklama z prostého obrázku `&lt;img>`, je situace velmi snadná. Stačí použít stejné řešení jako u [responsivních obrázků](/responsivni-obrazky):

```
.obal-reklamy img {
  max-width: 100%; 
  box-sizing: border-box; 
  height: auto
}
```

S ohledem na [vykreslovaní stránky](/vykreslovani) není tento postup úplně ideální, protože prohlížeč do doby načtení obrázku neví, jak velký prostor zabere:

    - [Nastavení výšky responsivního obrázku](/rozmery-responsivniho-obrazku) – řešení poskakování obrázku

U některých reklamních systému se poskakování nejde vyhnout, protože sám systém v momentě žádosti o reklamní banner nemusí vědět, jak velký objekt dostane.

### Zmenšení `&lt;iframe>`

Docela časté je, že se reklama vkládá pomocí [rámu `&lt;iframe>`](/ramy#iframe).

Při použití rámu jde využít trik s [výškou podle šířky](/vyska-podle-sirky). Rám se potom dokáže přizpůsobovat šířce, aby si **zachoval poměr stran**.

HTML kód bude obsahovat dva obaly pro omezení maximální šířky.

```
&lt;div style="max-width: 728px">
  &lt;div class="obal-reklamy">
    &lt;iframe … width='728' height='90'>
    &lt;/iframe>
  &lt;/div>
&lt;/div>
```

V CSS se potom připraví kontejner s nastavenou proporcí, kam se [absolutně naposicuje](/position#absolute) rám:

```
.obal-reklamy {
    position: relative;
    height: 0;
    padding-bottom: 12.3626%;
}
.obal-reklamy iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

Procentuální hodnota pro `padding-bottom` se spočítá jako výška / šířka * 100. Vytvořil jsem si k tomu generátor kódu:

    - [Generátor CSS kódu pro přepočet poměru stran v px na procenta](/rozmery-responsivniho-obrazku#ratio-generator)

Stejný postup jde použít i pro jiné objekty jako je video nebo Flash.

## Best practice

Ideální je udělat reklamu přizpůsobitelnou pro různě velké obrazovky.

### Textová reklama

V případě textové reklamy je situace nejsnazší. Text se dokáže naprosto bez problému přizpůsobovat velikosti displeje.

### SVG

Nejmodernější postup pro grafické bannery je použít [SVG](/svg). Mezi drobné nevýhody patří jeho nepodporování prohlížeči **IE 8** a starší a vyšší nároky na hardware oproti klasickému [PNG/GIF obrázku](/format-obrazku).

Hlavní výhoda je dokonalá ostrost při libovolném zmenšování či zvětšování. Jde navíc [animovat](/webove-animace) nebo stylovat v CSS.

Pomocí [`@media`](/media) pravidel jde potom v závislosti na velikosti měnit uspořádání prvků na obrázku.

### Více obrázků

Horšího ale nejspíš výrobně levnějšího výsledku jde docílit vytvořením více obrázků pro různé šířky.

Přepínat mezi různými velikostmi obrázků jde potom buď přes `@media` pravidla a obrázky vložené přes CSS `background`, nebo zvláštní HTML značkou `&lt;picture>`.

Důležité je zajistit, aby se zbytečně nestahovaly obrázky, které nejsou potřeba:

    - [Kdy začne stahování `&lt;img>` obrázku](/zacatek-stahovani-obrazku)

## Neřešitelné cizí reklamy

Bohužel existují případy, kdy responsivní podobu reklamy nejde zajistit.

Jedná se o cizí reklamy vkládané do `&lt;iframe>`. Pokud vložená stránka s reklamou není responsivní a má **fixní šířku**, neexistuje dobré řešení – styly cizí stránky v rámu nejde měnit.

Nabízí se tak:

  - Reklamu oříznout (vlastností `overflow`).

  - Reklamu [zmenšit](/zoom) pomocí CSS transformace (např. `transform: scale(0.5)`).

  - Zobrazit jinou reklamu, která si s malou šířkou poradí.

  - Přemluvit tvůrce reklam k vytvoření responsivní reklamy.

## Umístění reklamy na mobilu

Vzhledem k tomu, že mobilní web je typicky v jediném sloupci, není tolik možností, kam reklamu dát.

### Reklama nad stránkou

U desktopových podob webu je běžné, že je nad stránkou reklamní banner.

Na mobilech je to trochu problematičtější, protože se tím ukrojí obzvlášť drahocenný prostor pro obsah.

V jistých případech to může být i matoucí, protože banner může vypadat jako záhlaví stránky.

### Reklama v textu

Na první pohled méně otravné je vložit reklamní banner mezi text nebo obsahové bloky na stránce.

Návštěvník nedostane reklamní smršť na přivítanou hned po načtení stránky, ale až v průběhu listování.

### Fixní banner

Docela zajímavý koncept reklamy se zdá být fixní banner na spodku obrazovky, který disponuje zavíracím tlačítkem:

Taková reklama se může zobrazit třeba až při odrolování stránky o určitý kus, čímž na sebe upozorní.

Tlačítko pro skrytí fixní reklamy je docela důležité – jinak bude banner neustále zabírat značnou část prostoru.

## Otravnost reklamy

Při umisťování reklamy je nutné volit kompromis mezi otravováním uživatelů a zdánlivým příjmem z reklamy.

Hodně otravná reklama může být navíc postupem času důvodem, proč lidé začnou hledat způsob, jak ji blokovat, nebo přestanou web navštěvovat.

Vývoj příjmů z reklamy v závislosti na její otravnosti může vypadat jako na následujícím grafu:

Se zvyšující se otravností reklamy se nejprve zvyšují příjmy (čím dál tím pomaleji), potom reklama začne uživatele štvát, že se jí začnou vyhýbat:

  - [blokováním reklam AdBlockem](/zapnuty-adblock),

  - přechodem k méně otravné konkurenci

Tím se web dostane do stavu, kdy je **zahlcen otravnou reklamou**, ale příjmy z ní se začnou snižovat.

Je velmi obtížné trefit bod, ve kterém se web právě nachází.

Navíc instalace AdBlocku postihne i *nevinné* weby, které reklamou své návštěvníky tolik neobtěžují.

## Odkazy jinam

  - [Rady pro tvůrce HTML bannerů](http://1gr.cz/reklama/)

  - [Standard Web Banners](http://designerstoolbox.com/designresources/banners/) – běžné rozměry reklamních bannerů