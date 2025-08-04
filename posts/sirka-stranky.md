---
title: "Jak zvolit šířku stránky"
headline: "Jak široký web udělat"
description: "Jakou zvolit optimální šířku webové stránky."
date: "2015-02-24"
last_modification: "2015-09-22"
status: 1
tags: ["Rady a nápady", "Responsivní design", "Rozlišení"]
---

Při navrhování **šířky rozložení webu** je nutné vycházet z požadavků na obsah a dostupnou plochu na typických zařízení.

Nejpoužívanější je v roce 2015 rozlišení **1366 × 768 pixelů**.

## Pohled do historie

### 2005

V dávných dobách bylo stanovení šířky stránky poměrně jednoduché. Většina lidí měla 15" nebo 17" monitory s **rozlišením 800 × 600** nebo 1024 × 768 pixelů. Nějaké místo zabrala rolovací lišta, takže se webu dala šířka třeba **750 pixelů** a bylo hotovo.

### 2010

Později 15 palcové monitory s rozlišením 800 × 600 vymřely a rozšířily se **Full HD monitory** (1920 × 1080 px).

Dále vyšší prodeje notebooků vedly k rozšíření jejich typického širokoúhlého rozlišení **1366 × 768**.

Nejmenší běžnou šířkou se stalo 1024 pixelů, takže se webu zadala **šířka 960 pixelů** a bylo hotovo.

Hodnoty šířek se **nevymýšlely náhodně**, ale volila se taková čísla, co jsou dobře dělitelná pro **vytváření přesné mřížky**. Třeba zrovna 960 je beze zbytku dělitelné čísly 2, 3, 4, 5, 6 a 8.

### 2015

Následně se hodně rozšířila **mobilní zařízení** s menšími displeji schopná relativně slušně zobrazovat webové stránky.

Podíly jednotlivých rozlišení se obrovským způsobem **rozdrobily**. Pro příklad na tento web zavítalo posledních 20 000 návštěvníků z **450 různých rozlišení**.

Běžně se tak používají rozlišení od **240 pixelů** po Ultra HD rozlišení **3840 × 2160 pixelů**.

Používané uhlopříčky jsou potom od 1.5" u chytrých hodinek po desítky palců u velkých monitorů nebo televisí.

V podstatě tak nezbývá než web dělat [responsivní](/responsive), aby se všem možným rozlišením přizpůsobil.

## Nejpoužívanější rozlišení

Přestože jde díky **responsivnímu designu** zajistit, aby se stránka dobře zobrazovala na celé plejádě zařízení, hodí se znát podíly jednotlivých rozlišení, aby šlo stanovit, **jaká velikost stránky má být nejvíce vypiplaná**, protože ji bude používat nejvíce lidí.

Podle Toplistu to vypadá v roce 2015 následovně a nejčastější rozlišení jsou:

  - **1366 × 768**

  - 1280 × 768

  - 1152 × 864

  - 1280 × 960

  - 1920 × 1080

U mobilů potom kraluje **320 × 480**.

  Vývoj rozlišení v ČR v letech 2014–2015 podle [Toplistu](https://www.toplist.cz/global/history/resolution/)

## Stránka ve Full HD

Ačkoliv by poměrně početná skupina návštěvníků mohla mít na monitoru stránku ve Full HD (1920 pixelů na šířku), většinou se tak široké stránky nedělají.

Pro **dobrou čitelnost souvislého textu** není dobré mít delší řádky než cca 80 znaků – to je v závislosti na velikosti a stylu písma něco kolem **600 pixelů**.

Na Full HD monitor by se tak vešly v podstatě tři stránky textu vedle sebe.

Pro zaplnění tak velkého prostoru často není vhodný obsah, takže se stránky dělají užší.

Extrémní situace někdy nastává u **postupu mobile first**, kdy webový tvůrce u zobrazení pro mobily a tablety v podstatě také skončí a na velkém monitoru je zbytečně vidět pouze úzká nudle i v případě, že by dávalo smysl použít více sloupců. Vznikne nakonec spíš [mobile only](/mobile-first#mobile-only).

## Best practice

Pokud se rozvržení stránky (sloupce) navrhne chytře v procentech (s použitím [responsivní mřížky](/responsivni-mrizka)), je změna maximální šířky otázka úpravy jedné hodnoty v CSS:

```
.obal {
  max-width: 1300px;
}
```

Při menším rozlišení se zkrátka stránka automaticky přizpůsobí dostupnému místu.

Protože většinou bývá nejpoužívanější rozlišení **1366 × 768**, používám ho jako primární. Samozřejmě v případech, kdy je prostor čím smysluplným vyplnit.

## Odkazy jinam

  - [Responsive Upscaling: 11 Ideas for Large-Screen E-Commerce Design](http://baymard.com/blog/responsive-upscaling) – optimalisace stránky pro velké obrazovky