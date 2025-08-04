---
title: "Responsivní menu"
headline: "Responsivní navigace"
description: "Jak udělat elegantní navigaci pro zobrazení na malých obrazovkách."
date: "2014-05-30"
last_modification: "2014-06-22"
status: 1
tags: ["CSS", "Hotová řešení", "Responsivní design", "Menu v CSS"]
---

Při tvorbě [responsivního designu](/responsive) čelíme výzvě, jak vyřešit navigaci (menu).

V případě, kdy je **menu nad obsahem**, to může být zvlášť u **delších navigací** nevhodné, protože návštěvník bude muset odrolovat celou nabídku, aby se dostal na samotný obsah.

Podobně nepraktická bude i opačná situace, kdy bude krkolomné se dostat skrz obsah k menu.

První možnost, která se používala hlavně v minulosti, je umístit na začátek prosté **odkazy na různé kotvy** typu *přeskočit na obsah*, *přeskočit na menu* a podobně.

Dnes se častěji navigace *zabalují* do jediného tlačítka, které menu po kliknutí vysune, zobrazí přes celou stránku nebo vysune ze strany.

Nejjednodušší typy chování jsou zachyceny na následujícím videu.

[Responsivní navigace](https://www.youtube.com/watch?v=6HT-yirOGoo)

## Rozbalení menu

  Do obalu navigace se umístí ve výchozí podobě skryté tlačítko *≡ Menu*.

  Pomocí [media queries](/mobilni-web#media-queries) se u menších obrazovek toto tlačítko zobrazí a naopak skryje menu.

  A nakonec se s využitím [přepínání třídy JavaScriptem](/prepinani-trid) bude toto menu po klikání na tlačítko *Menu* zobrazovat/skrývat.

[Samostatná živá ukázka](http://kod.djpw.cz/jqdb) (projeví se při šířce do 480 px)

Samotný HTML kód navigace je tedy společný pro mobily i desktop, odlišnou podobu mu může zařídit **změna CSS**.

Pokud by bylo příliš pracné původní styl pro velké obrazovky *přebíjet* v [`@media` podmínce](/media), stačí JavaScriptem **kompletně vyměnit třídu** společného obalového elementu (ne ji jen přidávat/odebírat).

## Efekt rozbalení

Výše uvedená ukázka zajišťuje jen základní funkci [zobrazit/skrýt](/zobrazit-skryt). Jak by šlo vykouzlit nějaké lepší efekty?

### Absolutní posicování

S využitím [absolutní posice](/position#absolute) menu (a relativní posice u obalu) může navigace překrývat obsah. Podobně jako [rozklikávací menu](/klikaci-menu).

### Menu přes celou obrazovku

Roztáhnout navigaci na celou obrazovku jde nejsnáze [fixním posicováním](/position-fixed):

```
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

V takovém případě je nutné nezapomenout na možnost **okno s navigací zavřít**. Například původní tlačítko naposicovat nahoru s popiskem *Zavřít*.

[Samostatná živá ukázka](http://kod.djpw.cz/wzdb) (pro 480 px na šířku)

### „Odtlačení“ obsahu

Dalším populárním efektem je situace, kdy po kliknutí na tlačítko *Menu* **navigace přijede ze strany** a odstrčí hlavní obsah.

Zde je možný postup přidávat při kliknutí třídu přímo pro `&lt;body>` ([document.body](/documentelement-body) v JS).

    Po přidání třídy se **odsune obsah**. Třeba relativním posicováním obalu stránky (např. `position: relative; left: 90%`).

    Zároveň se objeví menu široké 90 % (`width: 90%`).

    Docílit **plynulých přechodů** pomůže CSS vlasnost [`transition`](/transition)/[`animation`](/animation).

    Jiná možnost je mít před hlavním sloupcem stránky ještě jeden – zatím s nulovou šířkou (budou [obtékané](/float)). A odsunutí nasimulovat jeho roztahováním.

[Samostatná živá ukázka odtlačení](http://kod.djpw.cz/zzdb) (pro 480 px na šířku)

Vylepšit **ovladatelnost stránky** při odsouvání obsahu lze umístěním klikací plochy nad zbytek obsahu, který je vidět. A po kliknutí na tuto plochu zase menu **zasunout zpátky**.