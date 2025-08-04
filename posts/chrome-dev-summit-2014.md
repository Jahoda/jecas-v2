---
title: "Chrome Dev Summit 2014"
headline: "Chrome Dev Summit 2014"
description: "Výběr zajímavostí z Chrome Dev Summit."
date: "2014-11-19"
last_modification: "2014-11-20"
status: 1
tags: ["Prohlížeče", "Google", "Konference"]
---

[Chrome Dev Summit](https://developer.chrome.com/devsummit/) je možné **sledovat online**. Záznam celého prvního dne je [tady](https://www.youtube.com/watch?v=0b9ZE1V4uRk).

## Indikace mobile-friendly

Stránky ve výsledcích vyhledávání jsou označeny popiskem „Mobile-friendly“, jestliže stránka splňuje některé požadavky responsivních webů.

Více v samostatném článku [Google označí stránky vhodné pro mobil](/google-mobile-friendly).

## Plynulý přechod mezi dvěma stránkami

Pro [animovaný přechod](/plynuly-prechod) mezi dvěma stránkami je připravována funkce **Navigation Transitions**. Ta umožní určit elementy, které mají zůstat při přechodu mezi stránkami. Poslouží k tomu `&lt;meta>` značka:

```
&lt;meta name="**transition-elements**" content="{CSS selektory}">
```

Styly pro animaci při příchodu a odchodu ze stránky potom mají nové `rel` atributy.

### Odchod ze stránky

```
&lt;link rel="**transition-exiting-stylesheet**" href="fade_out.css">
```

### Příchod na stránku

```
&lt;link rel="**transition-entering-stylesheet**" href="fade_in.css">
```

    - [Navigation Transitions specification](https://docs.google.com/document/d/17jg1RRL3RI969cLwbKBIcoGDsPwqaEdBxafGNYGwiY4/edit#heading=h.pcll678prpwu)

## Prohlížeč animací

Do jádra **Blink** (používá **Chrome** a nová **Opera**) byl přidán prohlížeč CSS animací.

Každou animaci je možné zastavit/spustit uprostřed běhu. Jednotlivé fáze si ručně procházet a dokonce si zvýraznit ovlivněné elementy.

    Devtools Animations: Basic animation inspection &amp; control in Styles pane

## Material design framework

[Web](http://www.google.com/design/spec/material-design/introduction.html)

Připravená sada nástrojů pro snadné vytváření relativně dobře vypadajících responsivních webových aplikací. Obsahuje spoustu obsahu od ikon, barvev, tlačítek až po před-připravené layouty.

## Přebarvení lišty v prohlížeči

Speciálním `&lt;meta>` tagem půjde v mobilní versi **Chrome** nastavit barva záhlaví prohlížeče, aby ladila se zbytkem stránky:

```
&lt;meta name="theme-color" content="#0D6AB7">
```

Optimální rozměry jsou 192 × 192 pixelů. Zobrazená ikona se vezme z:

```
&lt;link rel="icon" sizes="192x192" href="highres.png">
```

## Plynulost animací

Průběh animace lze rozdělit do 3 částí:

  - uživatel animaci vyvolá například kliknutím a **čeká na spuštění**,

  - animace probíhá,

  - uživatel si uvědomí, že **animace skončila**.

Při vytváření animací jde využít toho, že plynulá animace (vysoké FPS) stačí pouze v kroku 2. Toho jde využít tak, že náročné operace (výpočty) proběhnou **před a po dokončení** pohybu.

Před animací je tedy dobré provést [překreslení stránky](/vykreslovani#prekreslovani). Například zjištěním hodnoty `offset*`, která překreslení spustí.

## HTML imports

HTML importy umožnují vkládat tzv. *widgety*. Řeší to problém, kdy je v jedné stránce připojeno několik různých hotových řešení, která se nepřehledně ladí a snadno si mohou přebíjet CSS vlastnosti.

Importy umí vytvořit pro vkládanou šablonu nová *scope*.

Více v samostatném článku [HTML Imports](/html-imports) a o značce [`&lt;template>`](/template).