---
title: "Dynamický update času „před X minutami“"
headline: "Dynamický update času „před X minutami“"
description: "Jak skriptem na stránce průběžně aktualisovat datum v podobě „zasláno před X minutami“."
date: "2014-07-04"
last_modification: "2014-07-13"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

V případě, že se na stránce zobrazuje místo běžného data text typu „**zasláno před 1 hodinou**“, je dobré tento údaj JavaScriptem průběžně aktualisovat.

Pro získání slovní representace kalendářního data v PHP se perfektně hodí funkce [`timeAgoInWords`](https://github.com/fprochazka/nette-components/blob/master/TimeAgoInWords/Helpers.php), která obsahuje i správné **české skloňování**.

Pro docílení průběžné aktualisace času stačí tedy:

  - [Převést PHP funkci do JS](/php2js).

  - Vytvořit funkci, co projde všechny příslušné elementy a upraví jejich obsah.

  - Tato funkce se bude spouštět opakovaně (například každou minutu).

[Živá ukázka hotového řešení](http://kod.djpw.cz/nleb)

## Element `&lt;time>`

Pro uvedení data/času se nabízí použít HTML značku `&lt;time>`. Slovní representace času bude jako její obsah (v JS [`innerHTML`](/innerhtml)). Skutečný a *strojově čitelný* datum potom bude v atributu `datetime`.

```
&lt;time datetime="2014-07-04T10:37:00">
  Před X hodinami
&lt;/time>
```

Původní obsah může buď vypsat PHP, nebo se první JavaScriptový update času spustí ihned po načtení stránky.

Písmeno `T` mezi datem a časem je kvůli **Firefoxu** a **IE**, které si s běžným `2014-07-04 10:37:00` neporadí.

## Nepřesnosti

Komplikace přináší fakt, že datum na straně klienta (v JavaScriptu) nemusí a nejspíš také **nebude shodné s časem na serveru**.

### Časová pásma

Je tedy poměrně vhodné u data a času uvést na straně serveru **časové pásmo**:

```
&lt;time datetime="2014-07-04T10:37:00**+02:00**">
  Před X hodinami/měsíci/roky
&lt;/time>
```

### Přesnější doba prodlevy

Je potřeba si zvážit do jaké míry má být údaj přesný.

V případě počítání **rozdílu mezi časem** ze serveru a od návštěvníka to nejspíš žádná sláva nebude (přesný/stejný čas by musel mít nastaven návštěvník i server).

Nabízejí se následující řešení:

    Čas pro zjišťování rozdílu si zjišťovat [AJAXem](/ajax) ze serveru. Zvlášť v případě, že je na stránce nějaké automatické **kontrolování nového obsahu**, není problém do odpovědi serveru přibalit hodnotu aktuálního data.

    Při **načtení stránky** si do jedné JS proměnné vypsat čas na serveru a do druhé aktuální čas klienta. Z toho potom počítat nepřesnost mezi časy a výsledný rozdíl tak upravit.

  - Na serveru si do `&lt;time>` vypsat přímo **počet sekund**. V JavaScriptu si uložit do proměnné **čas klienta** a při spuštění aktualisace ho odečíst od **aktuálního klientského času**. Tento rozdíl se potom přičte k rozdílu ze serveru a výsledek je připraven.