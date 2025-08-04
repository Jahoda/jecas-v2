---
title: "Vyloučení vlastních návštěv v Google Analytics"
headline: "Odstranění vlastních návštěv v Google Analytics"
description: "Jak v Google Analytics vyloučit ze statistik svých webů vlastní návštěvy."
date: "2013-06-15"
last_modification: "2013-06-15"
status: 1
tags: ["SEO", "Google", "Google Analytics"]
---

U webů s nízkou návštěvností mohou vlastní návštěvy webu významně zamíchat se statistikami (u vysoké návštěvnosti to statistiky příliš neovlivní), tudíž se nabízí své návštěvy vyfiltrovat. Existují různé způsoby.

## Odfiltrování IP adres v Google Analytics

Přímo v rozhraní GA lze omezit IP adresy.

Na [hlavní straně](https://www.google.com/analytics/web/) je vpravo nahoře tlačítko „Správce“,
po prokliknutí vybereme potřebný účet,
zvolíme „Všechny filtry“ (druhý zdola),
zvolíme „Nový filtr“
a už konečně zadáme přesnou IP adresu nebo její začátek atp.

Co když ale filtr dle IP nestačí? Například se na své stránky připojujeme z více míst…

## Blokování měřicích skriptů

Používáme-li několik málo zařízení z různých IP adres, můžeme měření zablokovat přímo v prohlížeči nebo operačním systému.

Blokování v prohlížeči
První možnost je použít nějaký obyčejný AdBlock a zablokovat přímo měřicí skript. Nachází se na URL:
```
http://www.google-analytics.com/analytics.js
```

Nebo použít doplněk do libovolného prohlížeče přímo od Google: [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout)

Blokování v OS
Pokud na daném zařízení ladíme web ve více prohlížečích, může být otravné zařizovat blokaci v každém z nich. Rychlé řešení je doménu `google-analytics.com` *zablokovat* v [souboru `host`](http://en.wikipedia.org/wiki/Hosts_(file)). Tedy do `host` přidat:
```
127.0.0.1         google-analytics.com
```

Na této doméně běží měřicí skript. Samotné Google Analytics budou fungovat bez problémů.

Používá-li se nesprávcovský účet, lze blokování realisovat pomocí funkce „Rodičovská kontrola“:
```
Ovládací panely\Uživatelské účty a zabezpečení rodiny\Rodičovská kontrola
```

## „Blokování“ v redakčním systému

Další možnost je sám sobě měřicí kód na stránky vůbec nevypsat. Takto je možné provést i výjimky pro IP adresy bez nastavování GA (Google Analytics).
```
&lt;?php
if ($_SERVER['REMOTE_ADDR'] !== '127.0.0.1') {
// Kód Google Analytics
}
```

Nebo lépe kód nevypisovat pro určité uživatelské role. Potom bude blokování za předpokladu přihlášení fungovat napříč zařízeními i IP adresami.
Nakonec lze takto uživatele zalogovat s poznámkou do GA pomocí `[_setCustomVar](https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration?hl=cs#_gat.GA_Tracker_._setCustomVar)` a podle toho je později vyfiltrovat.