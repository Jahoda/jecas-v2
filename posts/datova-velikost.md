---
title: "Datová velikost stránky"
headline: "Datová velikost stránky"
description: "Jak by měla být stránka datově velká pro rozumně rychlé načítání."
date: "2015-07-06"
last_modification: "2015-07-09"
status: 1
tags: ["Rady a nápady", "Zrychlování webu"]
---

Pro návštěvníky je příjemné, když se web **rychle načítá**. Tomu jde mimo jiné pomoci tak, že pro zobrazení webu nebude potřeba stahovat **velký objem dat**.

Úspornou velikost stránky dále ocení hlavně lidé používající internetové připojení s **limitem stažených dat**, případně za internet platí na základě přenesených MB/GB.

    - [What Does My Site Cost?](http://whatdoesmysitecost.com/) – přepočítává celková data stažená na stránce na cenu dat v jednotlivých zemích

Výsledek hlavní stránky [jecas.cz](http://jecas.cz):

Kolik stojí načtení vašeho webu?

## Rychlost načítání vs. objem dat

Jak rychle se stránka načte může, ale **nemusí vždy významně ovlivňovat** datová velikost. Pro pocit, že je web rychlý, je potřeba:

  - co nejrychlejší **odezva ze strany serveru**,

  - co nejrychlejší **zobrazení hlavního obsahu**

Když návštěvník už **něco vidí** a může si stránku prohlížet, nemusí ho trápit, že se někde stahují další objemná data. Pokud mu tedy nejde o úsporu přenesených dat. Že stránka spotřebuje spoustu dat ale většinou neví.

## Jakou datovou hranici zvolit

Pochopitelně **nelze stanovit přesnou hranici**, kdy je web ještě datově rozumný a kdy už příliš náročný.

### Pomalé mobilní připojení

Vycházet jde ale například z toho, že rychlost špatného mobilního připojení může být pouhých **250 kb** (kilobitů) za vteřinu. To odpovídá **31,25 kB** (kliob**y**tům).

Takové připojení bude mít **odezvu** třeba **300 milisekund**. Další je odezva serveru – například **100 ms**. Pokud se má stránka načíst **do 1 vteřiny**, zbývá 0,6 vteřiny na stahování dat. Dále TCP spojení trpí tzv. **pomalým startem** (anglicky [Slow-start](http://en.wikipedia.org/wiki/Slow-start)) – to znamená, že nejde ihned použít maximální přenosovou rychlost.

  Pro zobrazení webu do 1 vteřiny tak zbývá prostor pro stránku cca **14 kB** v jediném HTTP požadavku, aby měl návštěvník do té doby zobrazeno alespoň něco.

To znamená umístit hlavní obsah stránky do HTML kódu co nejvýš a před něj přidat do HTML i základní CSS. Toto *základní CSS* se obvykle nazývá termínem **kritické CSS** a jde i vygenerovat automaticky.

  - Načítání CSS bez blokování vykreslování: [Vytvoření „kritického CSS“](/nacitani-css#vytvoreni)

  - Vzhůru dolů: [Critical CSS a zrychlení zobrazení stránky](http://www.vzhurudolu.cz/blog/35-critical-css)

Další data se potom načtou později, když už si ale návštěvník **má co prohlížet**.

### Rychlé připojení

U rychlého připojení potom u běžných součástí částí stránky jako jsou:

  - styly,

  - skripty,

  - obrázky

nebývá ani tak problém s **datovou velikostí**, ale spíš s počtem požadavků. Samotné stahování dat často tvoří jen zlomek doby pro získání souboru.

Zde pomůže hlavně **minimalisace počtu souborů**, které se stahují. Tedy spojit všechny CSS a JS soubory do jednoho a obrázky stránky, u kterých to jde, umístit do CSS sprite:

    - [CSS sprite](/css-sprite) – Spojení všech obrázků do jednoho (CSS sprite) zrychlí načítání webu. Hotový generátor v PHP.

S velkým množství požadavků si taktéž dokáže lépe poradit [HTTPS](/https).

    - Souki.cz: [Optimalizujeme pro rychlost: HTTPS](https://www.souki.cz/optimalizujeme-pro-rychlost-https) – rozdíl v rychlosti při hodně požadavcích mezi HTTPS a HTTP

## Simulace různých rychlostí připojení

Ve [vývojářských nástrojích](/vyvojarske-nastroje) v prohlížeči **Chrome** je přímo funkce pro nastavení **pomalého připojení**. Týká se to přenosové rychlosti i odezvy.

Dostat se k této možnosti jde po přepnutí *device mode* (ikona dotykového telefonu):

Na základě požadavků na dobu načtení u různých připojení se potom odvíjí, jak je potřeba **snížit datovou náročnost**.

## Vliv velikosti stránky na SEO

[Google](/google) uvádí, že má nastaven limit **10 megabytů** na stránku. Vyjádření **Johna Muellera** z Google ohledně datové velikosti stránky:

  There is obviously a limit to the size of the page that we can download. I think that is around 10 megabytes. So if you have your content within those 10 megabytes, then we will be able to recognize that and show that in search.

  [Google Crawl Limit Per Page: 10 Megabytes](https://www.seroundtable.com/google-10-megabyte-crawl-page-20536.html)

Přílišná datová náročnost stránky potom může negativně ovlivňovat **okamžitou míru opuštění**. Lidé zkrátka nevydrží čekat a vrátí se z webu zpět do výsledků vyhledávání, což vyhledávač dokáže měřit a na základě toho **upravovat umístění webu** (dát na lepší posici web, ze kterého lidé neutíkají).