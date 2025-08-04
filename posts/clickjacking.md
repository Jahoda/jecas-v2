---
title: "Clickjacking na Facebooku"
headline: "Clickjacking na Facebooku"
description: "Jak funguje clickjacking na Facebooku a jak se proti němu bránit."
date: "2014-05-04"
last_modification: "2014-07-25"
status: 1
tags: ["Facebook", "Bezpečnost"]
---

Tento útok je populární hlavně na **Facebooku** u jeho *Like*/*To se mi líbí* tlačítka. Spočívá v tom, že se útočníkovi povede, aby návštěvník udělil stránce *Like*, aniž by o tom **věděl**.

Docílí se toho celkem snadno.

  - Na web se umístí typicky nějaké **video** s lákavým popiskem a náhledem.

  - Do místa, kde se očekává, že nic netušící návštěvník klikne, se umístí [Like tlačítko](/sdileci-tlacitka). Toto místo je zpravidla nějaké tlačítko *Play*.

  - Tento *Like box* se využitím [průhlednosti](/opacity) **zneviditelní** (maximálně zprůhlední).

  - Nyní si uživatel zkusí **pustit video**, ale místo toho se kliknutí promítne do *Like* tlačítka.

  - V případě, že video na stránce skutečně existuje a po dalším kliknutí se spustí, si člověk vůbec **nemusí všimnout**, že je stránka podvodná. A nevědomky udělené *To se mi líbí* tak útočníkovi zůstane.

Příklad takového videa – je možné pozorovat popisek *To se mi libí*, který pochází z neviditelného *Like* tlačítka.

[Živá ukázka](http://kod.djpw.cz/noeb) zjednodušeného postupu clickjackingu.

## Risika

Risika nachytání se nejsou příliš vysoká. Nejspíš vás maximálně někdo bude považovat za člověka, co kliká na každou ptákovinu.

## Obrana

    Neklikat na **podezřelé odkazy** s šokujícími názvy.

    Když se dostaneme na takovou podezřelou stránku, podívat se před kliknutím, zda se při podržení myši nad videem **neobjevuje popisek** (`title`) z *Like* tlačítka.

    Po navštívení a kliknutí na něco na podezřelé stránce nebo čas od času si zkontrolovat *Activity log*/*Záznamy o aktivitách*, které jsou na stránce **vlastního profilu** vpravo dole nad [cover obrázkem](/facebook-cover).

    Stoprocentní, ale možná až nežádoucí obrana, je zablokovat všechna *To se mi líbí* tlačítka spolu s dalšími prvky Facebooku.

    Stačí zablokovat část URL `*connect.facebook.net*`.

## Ochrana vlastních stránek

Tento útok je použitelný i pro jiné weby, než je Facebook. Ochrana z posice tvůrce webu / webové aplikace tkví v **zakázání načítání stránky do rámů** (většinou `&lt;iframe>`) – je k tomu možné použít hlavičku `X-FRAME-OPTIONS`.

Řešení v PHP:

```
&lt;?php
header('X-Frame-Options: SAMEORIGIN');
?>
```

Proč tohle Facebook nedělá? Protože je na načtení v `&lt;iframe>` závislý. Kdyby se jeho obsah nenačítal v `&lt;iframe>`, měl by útočník ještě víc možností ke **zneužití**.