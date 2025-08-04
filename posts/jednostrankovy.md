---
title: "Jednostránkový web"
headline: "Jednostránkový web"
description: "Kdy vytvářet web o jediné stránce. Jaké jsou výhody a nevýhody."
date: "2014-09-22"
last_modification: "2016-03-09"
status: 1
tags: ["SEO", "Rady a nápady", "Scrollování"]
---

U malých webů – typicky různé presentační weby – může být zbytečné mít jednotlivé části obsahu na **samostatných stránkách** (více různých URL).

Bude-li obsahová struktura například následující:

  - Úvod

  - O nás

  - Služby

  - Reference

  - Ceník

  - Kontakt

Nejspíš nebude mnoho obsahu, co na jednotlivé podstránky umístit. Zdá se potom zbytečné, aby návštěvníci museli proklikat několik stránek, když by se všechny informace pohodlně vešly na stránku jedinou.

Vytvořit web stylem „single page“ tak v některých případech dává smysl.

## Vliv na SEO

Vyhledávače mají na jednu stranu v oblibě krátké stránky, které přímo nabízí odpověď na hledaný dotaz. Na stranu druhou podstránka s jedním odstavcem textu, kde bude třeba jen telefonní číslo a kontaktní formulář, není moc hodnotná.

Vyjádření **Dušana Janovského** ze Seznamu:

  Obecně platí, že vyhledávač se snaží dát uživateli odpověď co nejrychleji a nejkratší cestou ho dovést k cíli. Pokud se ten cíl nachází na krátké samostatné stránce, je to ideální, protože pak uživatel ani nemusí rolovat.

  Není ale dobré informace štěpit do pěti podstránek, jestliže máš na srdci jen pět vět. Firma, která má fotku provozovny, otevírací dobu, soupis výrobků, kontakt a mapu, si to klidně všechno může dát na hlavní stránku a udělá lépe, protože ta stránka bude pak dohledatelná i na složitější dotazy, protože bude obsahovat více slov, tedy i více jejich kombinací.

  Že se na jedné stránce nedá dělat interní linkbuilding, tolik nevadí, protože na jednostránkovém webu vyhledávač nemá kam zabloudit. Na delší stránky doporučuji umisťovat kotvy, které pak také uživateli ve snippetu rádi vypíšeme, aby se rychleji dostal tam, kam chce.

  **Dušan Janovský**, [Dušan Janovský o fulltextovém vyhledávání na Seznam.cz – 3. část](http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-3-cast/)

V případě použití jedné jediné stránky a [#kotev](/odkaz#kotva) se na [Seznamu](/seznam) odkazy na jednotlivé části zobrazí přímo ve výsledcích hledání.

## Použitelnost

Někomu může přijít jedna dlouhatánská stránka špatně použitelná, protože na ní uživatel bude muset **neustále rolovat**.

Řešením je opět navigace pomocí kotev.

Na jednostránkovém webu může být normální navigace, jen nebude odkazovat na samostatné podstránky, ale na části jediné stránky.

Navigace může být třeba i fixní, čímž na ní půjde **zvýraznit aktuální část**:

    - [Zvýraznění podle rolování](/zvyrazneni-odrolovani)

## Více informací

Pokud časem vznikne více obsahu k jednotlivým částem, není problém je až následně **vyčlenit na samostatnou stránku** a na hlavním „jednostránkovém webu“ uvést jen stručnou podobu.

Při vyčleňování je dobré dát pozor na **duplicitu**, tj. by se nemělo jednat o *copy &amp; paste*.

## Visuální efekty

Některé jednostránkové weby pro ozvláštnění používají různé efekty:

### Roztažení sekce přes celou stránku.

Každá část jediné stránky má výšku přes celou obrazovku:

[Živá ukázka](http://kod.djpw.cz/bxrb)

Docílit toho jde snadno jednotkami `vh` (*viewport height*) – fungují od **IE 9**:

```
.cast {
  min-height: 100vh;
}
```

Tento postup má dvě úskalí:

    Tím, že je první stránka dole **visuálně ukončená**, uživatele nemusí napadnout, že jde pokračovat.

    Řeší se to buď tak, že stránka není přesně přes celou výšku, ale dole vykukuje něco dalšího, nebo se možnost posunu znázorní symbolem šipky v dolní části.

    Obecně není **nastavování [výšky](/height)** moc dobrý postup, protože na ní s ohledem na délku obsahu a velikost písma nejde spoléhat. 

### Plynulé rolování

Po kliknutí na odkaz v navigaci, který míří na tutéž stránku, se místo přeskočení odroluje plynule.

[Živá ukázka](http://kod.djpw.cz/cxrb) – plynulé rolování

Zde je hlavní problém v tom, že udělat plynulé scrollování dobře, není úplně triviální. Naopak velmi snadno se udělá špatně použitelné (viz předchozí [ukázka](#spatna-ukazka)).

    **Trvá moc dlouho**. Z toho plynou některé další problémy…

    **Koliduje si rolováním vyvolaným uživatelem**. Pokud člověku přijde plynulé rolování příliš pomalé, bude tomu chtít pomoci kolečkem.

    Špatně udělané plynulé rolování to bude ignorovat a dělat si svoje.

    Má **paměťový efekt**. Kliknutí na jinou položku během plynulého rolování se zařadí do fronty (nezastaví předchozí posun), takže se po zběsilejším klikání stránka několik vteřiny sama různě hýbe bez zásahu uživatele.

    V jQuery k tomu stačí použít metodu [`stop()`](https://api.jquery.com/stop/).

    **Nejde používat #kotvy**. Při klasickém kliknutí na odkaz vedoucí na #kotvu, se přidá do adresního řádku:

    Uživatel tak může snadno zkopírovat a poslat odkaz na přesné umístění.

    Protože změna této kotvy automaticky způsobí, že prohlížeč přeskočí na daný obsah, špatná řešení plynulého rolování toto chování zkrátka zablokují.

    Měnit `location.hash` (#kotvu v adrese) bez posunu není úplně jednoduché:

        [Změna `location.hash` bez posunu stránky](/location-hash-rolovani)

    **Nemožnost otevřít na pozadí** – někteří lidé si cíle odkazů otevírají kolečkem myší na pozadí (případně na ně klikají s klávesou Ctrl/Shift – otevření na pozadí / do nové záložky).

    JS řešení by toto ideálně mělo zohledňovat a neblokovat.

### Řízený přesun mezi stránkami

Další možnost je zabránit uživateli rolovat, jak se mu zlíbí, ale při náznaku rolování dolů/nahoru ho rovnou přesunout o celou jednu obrazovku.

Ukázka tohoto postupu:

    - [One page scroll navigation with css transforms](http://codepen.io/suez/pen/LCHlA)

Vypadá to poměrně efektně, ale ovládání je značně nestandardní a animace celkem zdržující. Řadu uživatelů bude takové chování iritovat.

### CSS vlastnost `scroll-snap`

V některých novějších prohlížečích jde rolování po stránkách zajistit jen pomocí CSS:

    - [CSS vlastnost `scroll-snap`](/scroll-snap)

## Změna URL místo kotev

Pomocí [`histoy.pushState`](/zmena-url) je možné měnit URL stránky JavaScriptem bez nutnosti [obnovovat stránku](/js-zmena-url).

Teoreticky by tak u *single page* webu šlo pro jednotlivé části místo #kotev měnit kompletní URL.

Není to ale moc dobrý nápad, protože bude pracné řešit situaci, kdy člověk změněnou URL zkopíruje a někomu pošle nebo nasdílí. Pro takový případ by bylo potřeba, aby na všech adresách webový server vracel tentýž obsah. Tím ale vznikne duplicitní obsah, který bude potřeba řešit kvůli [vyhledávačům](/seo).

Zdá se tak výhodnější používat obyčejné kotvy.