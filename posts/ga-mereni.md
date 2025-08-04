---
title: "Měření interního vyhledávání v Google Analytics"
headline: "Měření vyhledávání a akcí v Google Analytics"
description: "Jak v Google Analytics měřit vlastní akce jako kliknutí na tlačítko nebo dotazy do interního vyhledávání."
date: "2014-05-27"
last_modification: "2014-12-29"
status: 1
tags: ["Google Analytics"]
---

Pokud nechceme úpravy na webu provádět na základě **pocitu nebo věštění z křišťálové koule**, hodí se mít **přehled o návštěvnících**.

**Google Analytics** dokáží spoustu věcí měřit samy od sebe po vložení základní podoby kódu. Existují ale další statistiky, co se většinou hodí do **GA** doplnit:

  - měření **událostí**,

  - měření **interního vyhledávání**

## Měření událostí

Události se hodí k logování různých **uživatelských akcí**. Můžeme tak například zaznamenávat kliknutí na nějaké tlačítko a vyhodnocovat, jestli jeho změna přinesla větší počet kliknutí a podobně.

Realisace v JavaScriptu je celkem jednoduchá, stačí odeslat (`send`) data typu `event` (událost).

```
ga("send", "event", 
  "Kategorie",
  "Akce",
  "Popisek", // nepovinné
  "Hodnota" // nepovinné číslo
);
```

Při kliknutí na tlačítko se tak nabízí použít něco jako:

```
ga("send", "event", "kliknutí", "tlačítko", "název tlačítka");
```

Kvůli uživatelům **blokujícím meřicí skripty** můžeme volání funkce `ga` obalit do `try – catch` bloku:

```
try {
  ga("send", "event", "kliknutí", "tlačítko", "název tlačítka");
}
catch(e){}
```

Nehrozí potom chyba v případě, že se **Google Analytics nenačte**, kdy by se volala neexistující funkce `ga`.

Naměřená data pro **vytvořené události** i **interní vyhledávání** jsou k disposici v nabídce *Chování* → *Události*

## Interní vyhledávání

Logovat **interní vyhledávání** je dost užitečná věc. Dá se z toho zjistit, co **návštěvníci na webu hledají** – to se může hodit při budování dalšího obsahu nebo vylepšování **navigační struktury**.

Měření interního vyhledávání je nutné zapnout (jmenuje se to *SiteSearch*). Zapíná se ve volbě *Správce* → *Výběr dat* → *Nastavení zobrazení*.

Kromě zapnutí funkce **SiteSearch** je třeba zadat do Google Analytics název **parametru v URL**, který se používá k vyhledávání.

Pokud je výsledek hledání nějakého fráze přístupný metodou `GET`, zjistíme název parametru z obsahu před hledaným výrazem:

```
http://example.com/?**q**=hledané+slovo
```

Pokud se používá `POST` nebo se hledá [AJAXem](/ajax), je nutné si navíc hledání zaznamenávat se *smyšlenou URL* ručně JavaScriptem:

```
&lt;script>
  ga('send', 'pageview', '/search_results.php?q=' + **hledaneSlovo**);
&lt;/script>
```

V proměnné `hledaneSlovo` bude hledaná fráze, kterou jde například získat z **políčka pro vyhledávání**:

```
var hledaneSlovo = document.getElementById("hledani").value;
```

## `nonInteraction`

V některých případech je vhodné do funkce `ga` předat parametr `nonInteraction`.

```
{'nonInteraction': 1}
```

Pokud má hodnotu `true`/`1`, znamená to, že tak zalogování nebude mít vliv na *bounce rate* (míru opuštění stránky). Jinak zaznamenání události **prodlouží dobu návštěvy**.

Nedá se obecně říct, jestli je událost vhodné považovat za interakci, která by míru opuštění měla ovlivňovat, nebo ne. Pokud bude na stránce například jenom jedno video, dává smysl, aby jeho přehrání bylo považováno za interakci.

Použití `nonInteraction` v `ga` vypadá následovně:

```
ga('send', 'event', 
  'Kategorie', 
  'Akce',
  {'nonInteraction': true}
);
```

## Odkazy jinam

  - Google Analytics: [Event Tracking - Web Tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/events)

  - [Nastavení služby Site Search v případě vyhledávačů využívajících metodu POST](https://support.google.com/analytics/answer/1012264?hl=cs&ref_topic=1120718)

  - [Analytics.js Field Reference](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference)