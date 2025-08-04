---
title: "Změna URL a AJAX"
headline: "Změna URL bez obnovení stránky"
description: "Jak může JavaScript přes <code>history.pushState</code> změnit URL stránky bez znovunačtení."
date: "2013-11-13"
last_modification: "2013-11-13"
status: 1
tags: ["JavaScript", "Rady a nápady", "AJAX"]
---

Pokud se jednotlivé stránky webové aplikace mají načítat asynchronně ([AJAXem](/ajax)), je důležité spolu se změnou obsahu **změnit i URL**. Proč?

  - Aby se dalo **na stránku odkázat**,

  - aby se návštěvník **mohl pohybovat historií** prohlížeče,

  - aby danou **URL mohl vyhledávač zaindexovat**.

Kromě **změny URL** je potřeba zároveň zajistit, aby se po zadání konkrétní URL **zpětně načetl** příslušný obsah.

## Změna URL

Od **IE 10** lze napříč prohlížeči používat `history.pushState`:

```
if (history.pushState) { // Test podpory
  // Načtení obsahu AJAXem
  window.history.pushState(objektObsah, "Titulek stránky", "url-stranky");
}
```

Parametry *Titulek* a *URL* jsou jasné. Parametr `objektObsah` slouží k uchování dat právě pro případ **pohybu v historii prohlížeče**. Jedná se o běžný JS objekt:

```
window.history.pushState(
  **{nadpis: "Text nadpisu", obsah: "Obsah stránky"}**, 
  "Titulek stránky", 
  "url-stranky"
);
```

Ideální proto je do něj **uložit obsah stránky**, který se mění (nadpis, obsah, …). K uloženým hodnotám objektu se dá dostat z `history.state`. Zjistit, že se má načíst obsah z `history.state`, je možné z události `window.onpopstate`. Testovací [ukázka](http://kod.djpw.cz/apq-).

```
window.onpopstate = function(*event*) {
  alert(*event*.state.**nadpis**);
};
```

### `history.replaceState`

Kromě `pushState` existuje ještě metoda `replaceState`, která funguje víceméně stejně, jen místo nové položky v historii **nahradí** tu současnou.

## Změna #hashe ve starých prohlížečích

V prohlížečích **IE 9** a starších je jediná možnost, jak **zajistit změnu URL** u AJAXem načítaného obsahu, měnit hodnotu `location.hash`.

Zachytit změnu `hash`e jde od **IE 8** přes `window.onhashchange`; pro ještě starší prohlížeče nezbývá než `location.hash` kontrolovat **časovačem**.

### Odkazování

Problém tohoto řešení je v tom, že URL v obvyklém tvaru `http://example.com/#!url-stranky` může být dostupná jen **při zapnutém JS**.

**Vyhledávače** a další služby (typu **facebookové načítání** titulku a popisu stránky u odkazů) to řeší tak, že adresu obsahující tzv. *hashbang* (`#!`) – tj. například `http://example.com/**#!**url-stranky` přepíší na `http://example.com/**?_escaped_fragment_=**url-stranky` a tam očekávají obsah.

Nešťastné je, že takto nefungují zdaleka všechny služby a návštěvníci bez JavaScriptu se na URL s **fragmentem/hashem nedostanou**.

Další nevýhoda je, že **fragment v URL** neumí serverový skript spolehlivě zachytit, takže při příchodu na `example.com/#!url-stranky` se stejně nejprve vygeneruje stránka `example.com`, aby se potom **skriptem stáhla ještě** `example.com/url-stranky`. Očekávané **zrychlení** webu je potom fuč.

Při použítí `history.pushState` tyto problémy nehrozí. JavaScript mění URL stránek na **plnohodnotné**, takže se po příchodu na tuto URL načte obsah standardně **ze serveru** a asynchronně se donačítá až další obsah při procházení. Vyhledávače a roboti používají jen **obsah přímo ze serveru**.

## Co používat?

Použití `history.pushState` s plnohodnotnými adresami se zdá být docela rozumné (už to tak funguje mj. na **YouTube**). Měnit adresu za `#!` už je trochu slabší, ale při **správném řešení** to jako náhrada `pushState` může sloužit, tj.:

  - Všude používat **plnohodnotné adresy** (cíl/`href` odkazů na `#!` variantu měnit v daných prohlížečích až skriptem).

  - Zajistit zobrazení příslušného obsahu na URL s `?_escaped_fragment_=`, aby např. návštěvník v **IE 9** mohl stránku normálně nasdílet na Facebooku.

  - Zajistit, aby se po zadání **adresy s fragmentem** zobrazil odpovídající obsah. V prohlížečích, co umí `pushState`, **fragment odstraňovat**.

Pořád ale přetrvává nevýhoda **dvojitého načítání** a získávání **nehezkých zpětných odkazů** s `#!`.

### Reset a zrychlení

Kromě toho je dobré zvážit, zda není při běžném (neajaxovém) procházení webů výhodné to, že se při každém načtení stránky všechen JavaScript v podstatě **vyresetuje**. Hrozí tak menší risiko, že se něco **rozbije** a návštěvník neznalý **reload tlačítka** nebude na stránce schopen dalšího fungování.

Nakonec u **rychlého webu** nebude nejspíš zisk z AJAXového načítání jen části stránky moc **významný**.

## Odkazy jinam

  - [Jak Google prohledává AJAXové weby](https://developers.google.com/webmasters/ajax-crawling/docs/getting-started)

  - [*Manipulování* s historií na MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history)