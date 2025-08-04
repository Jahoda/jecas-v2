---
title: "Náhled webu při sdílení na sociálních sítích"
headline: "Náhled odkazu při sdílení na sociálních sítích"
description: "Jak upravit stránku, aby se hezky zobrazovala při sdílení na Facebooku a Twitteru."
date: "2015-02-13"
last_modification: "2016-01-13"
status: 1
tags: ["Twitter", "Facebook", "Odkazy"]
---

Významným zdrojem návštěvnosti mohou být kromě přístupů z [vyhledávání](/seo) i **sociální sítě**. Když už se někomu stránka zalíbí natolik, aby ji sdílel, lze vhodnou úpravou webu napomoci, aby by sdílený odkaz maximálně lákavý pro ostatní.

    - [Tlačítka pro sdílení na sociálních sítích](/sdileci-tlacitka) – jak je elegantně přidat na web

## Náhled odkazu na Facebooku

[Facebook](/facebook) je často schopný odkazu zajistit přijatelnou podobu podobu i bez zvláštních úprav. Náhled odkazu by měl vypadat nějak takto:

Pro ověření výsledku existuje nástroj:

[Open Graph Object Debugger](https://developers.facebook.com/tools/debug)

To je hodně užitečné, protože **výsledky náhledu odkazu** se ukládají do cache a pomocí *Open Graph Object Debugger* jde načíst vždy aktuální podobu.

Tento nástroj ale neukazuje 100% to samé, co se zobrazí při skutečném sdílení – k tomu je nutné vložit URL do příspěvku na Facebooku. Pro načtení nových informací se ale *Open Graph Object Debugger* hodí.

V řadě případů si Facebook dokáže s načtením náhledu stránky bez problémů poradit, aniž by se na webu cokoliv optimalisovalo.

  - Titulek si dokáže vyzobnout ze značky `&lt;title>`.

  - Popisek zase z [odstavce `&lt;p>`](/odstavec).

  - Obrázky si najde ve značkách `&lt;img>`.

Pokud výsledek není optimální, je potřeba tomu trochu pomoci…

### Obrázek

Robot Facebooku dokáže obrázky **vhodné velikosti** vyzobat ze stránky, takže člověk, co odkaz sdílí, mezi těmito obrázky má na výběr.

Lidé jsou ale pohodlní nebo nemusí o možnosti listovat obrázky vědět, proto je dobré napomoci tomu, aby se jako první obrázek **nabídl ten nejlepší**.

Nabídnout obrázek jde speciální `&lt;meta>` značkou „`og:image`“:

```
&lt;meta property="og:image" content="http://example.com/url-obrazku.png">
```

Facebook vyžaduje obrázek velký alespoň **200 × 200 pixelů**. Jinak ho u odkazu nezobrazí, i když je určen `&lt;meta>` značkou.

Jediná možnost, jak přidat k odkazu obrázek menší, je jeho ruční upload při sdílení odkazu.

Pro zobrazení většího náhledu (obrázek nad titulkem a popisem) je potřeba obrázek velký alespoň **600 × 315 pixelů**. Náhled s větším obrázkem potom vypadá nějak takto:

Pro displaye s vysokým rozlišením může být obrázek klidně dvakrát větší – **1200 × 630 px**. Pro jiné rozměry se je dobré držet poměru **1.91:1**.

Podle mých testů se na desktopu obrázek zobrazuje v maximální velikosti **470 × 246 pixelů**, ale toto číslo se může měnit.

Ony vůbec potřebné rozměry nejsou tak striktní, jak Facebook uvádí. I menší obrázek se může dobře zobrazit. Pro vyšší jistotu do budoucna je ale asi lepší dodržet doporučené rozměry.

### Titulek a popisek

Dále se při sdílení zobrazuje titulek a úryvek webu. I tyto věci umí Facebook získat automaticky:

  - Titulek ze značky `&lt;title>`.

  - Úryvek webu z `&lt;meta name="description">` nebo si ho přímo najít na stránce.

Rovněž je lze přímo nastavit `og:` značkami:

  Titulek
  
    ```
&lt;meta property="og:title" content="Titulek">
```

  Popisek
  
    ```
&lt;meta property="og:description" content="Popisek">
```

Nastavit pro Facebook jiný titulek nebo popisek, než má konkrétní stránka, se může hodit pro dosažení vyšší míry prokliku při použití poutavějších slov.

Použít `og:title` je vhodné v případě, že je v `&lt;title>` kromě názvu článku i název web – ten je zbytečné duplikovat, protože se zobrazuje automaticky pod odkazem. V titulku pro Facebook by měl být tedy jen název stránky.

### URL

Na první pohled se může zdát zbytečné uvádět URL

```
&lt;meta property="og:url" content="http://example.com/">
```

Význam to ale má. Do adresy se může dostat nějaké *smetí* jako třeba [UTM parametry](/js-zmena-url#utm), které potom při sdílení mohou zbytečně drobit počet sdílení, protože jde o jiné URL.

### App ID

Není nutné, ale Facebook doporučuje `og:app_id` přidat.

```
&lt;meta property="fb:app_id" content="123456789">
```

Pomocí App ID jde propojit stránku s FB aplikací. Nějakou konkrétní zajímavou výhodu v tom nevidím.

Facebook má ohledně sdílení speciální stránku s doporučením:

    - Facebook: [Sharing Best Practices for Websites &amp; Mobile Apps](https://developers.facebook.com/docs/sharing/best-practices?locale=cs_CZ#debug) – doporučení pro sdílení

## Náhled na Twitteru

[Twitter](/twitter) dokáže převzít data z `og:` značek. Stránka optimalisovaná pro Facebook by se proto měla zobrazit dobře i na Twitteru. Jediné, co je potřeba přidat, je následující `&lt;meta>` značka:

```
&lt;meta name="twitter:card" content="summary">
```

U významných nebo rozkliknutých tweetů s odkazem se rovnou zobrazí náhled.

Bude-li mít náhledový obrázek rozměry alespoň **506 × 253 pixelů**, zobrazí se velký nad názvem a popisem stránky – obdobně jako na Facebooku.

Pro testování podoby náhledu odkazu existuje nástroj:

[Twitter Card validator](https://cards-dev.twitter.com/validator)

Twitter umožňuje jako náhled použít i interaktivní prvky jako například video; věnuje se tomu zvláštní článek:

    - [Náhled odkazu na Twitteru](/nahled-twitter) – jak zajistit co nejlepší zobrazení odkazu na Twitteru

## Odkazy jinam

- Buffer: [The Mega Guide to Ideal Image Sizes for Your Social Media Posts: Guidelines for All 6 Major Social Networks](https://blog.bufferapp.com/ideal-image-sizes-social-media-posts)

- [Images on Twitter – Size Does Matter](http://www.audienceview.com/size-does-matter/)

- [Twitter Style Guide: Sizes &amp; Dimensions for Twitter Graphics &amp; Images](http://freshtakeoncontent.com/twitter-image-sizes-dimensions/)

- [TIP#185: Co je to Open Graph a proč je potřeba aby designeři webů věděli o co jde](https://365tipu.wordpress.com/2015/07/04/tip185-co-je-to-open-graph-a-proc-je-potreba-aby-designeri-webu-vedeli-o-co-jde/)

  - [TIP#183: Jaké jsou rozměry všech těch různých obrázků na Facebooku?](https://365tipu.wordpress.com/2015/07/02/tip183-jake-jsou-rozmery-vsech-tech-ruznych-obrazku-na-facebooku/)