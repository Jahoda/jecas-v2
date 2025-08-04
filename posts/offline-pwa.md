---
title: "Offline stránka v PWA přes ServiceWorker"
headline: "Offline stránka v PWA přes ServiceWorker"
description: "Jak udělat web fungující offline. A splnit tak požadavky na PWA."
date: "2021-05-06"
last_modification: "2021-05-24"
status: 1
tags: ["JavaScript", "Hotová řešení", "Offline"]
---

PWA (*Progressive Web Apps*) je postup, jak vytvářet webové stránky, které se chováním podobají nativním aplikací.

Tedy v tomto případě například **fungují bez připojení k internetu**.

## Proč mít PWA

V praxi je to dobré například k tomu, aby stránku šlo v **Chrome** *nainstalovat*.

Výsledkem je potom v **macOS** upravené okno prohlížeče Chrome a přidání ikony mezi ostatní aplikace:

Na **Androidu** to jde takový web připnout na plochu mezi ostatní aplikace.

**Chrome** jeden čas upozorňoval, že v budoucnu bude možná vyžadovat i **offline fungování**.

  Site cannot be installed: Page does not work offline. Starting in Chrome 93, the installability criteria is changing, and this site will not be installable. See https://goo.gle/improved-pwa-offline-detection for more information.

Nakonec byl tento požadavek pro splnění PWA odložen. Ale kdo ví, kdy zase přijde.

Ověřit, co má stránka splňovat, aby byla validní PWA, jde zjistit v [DevTools](/vyvojarske-nastroje) na záložce **Lighthouse**:

## Vytvoření ServiceWorkeru

Aby vůbec mohl ServiceWorker fungovat, musí web běžet na [HTTPS](/https) (výjimkou je vývoj na [localhostu](/localhost)).

ServiceWorker je skript psaný v JavaScriptu. Většinou se tento soubor jmenuje `sw.js` nebo `serviceWorker.js`.

Záleží na tom, kde je umístěn. Je to dost důležité, protože pokud bude registrován z umístění např. `assets/js/sw.js`, nebude fungovat na adresách, které nezačínají `assets/js`.

Proto se většinou dává rovnou do rootu webu. Případně jde nastavit *rozsah působení* parametrem `scope`:

```
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js', { scope: '/'})
}
```

Výše uvedený kód zaregistruje SW, pokud ho prohlížeč podporuje.

## Offline stránka `offline.html`

Offline stránka může být pro jednoduchost [obyčejný HTML soubor](/html-kostra) s inline styly i obrázky:

```
&lt;!doctype html&gt;
&lt;meta charset="utf-8"&gt;
&lt;title&gt;Offline&lt;/title&gt;
&lt;meta name="viewport" content="width=device-width,initial-scale=1">
Jste offline.
```

V offline stránce je možné používat JS, takže není problém například přidat chování, aby se stránka sama obnovila, když je uživatel opět online:

```
&lt;script>
    window.addEventListener('online',  function () {
        window.location.reload()
    })
&lt;/script>
```

Jde používat i externí styly, skripty nebo obrázky, ale musely by se rovněž přidat do cache.

## Obsah `serviceWorker.js`

Úplně základní offline stránku stačí při instalaci workeru uložit do cache.

Třeba následovně:

```
const CACHE_VERSION = 1
const CACHE = {
    OFFLINE: 'offline-cache-' + CACHE_VERSION,
}
const OFFLINE_URL = 'offline.html'

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE.OFFLINE).then(function (cache) {
            return cache.add(OFFLINE_URL)
        })
    )
})
```

Tento kód při instalaci SW (událost `install`) otevře cache s názvem `offline-cache-1` (případně ji vytvoří, pokud neexistuje – těchto keší může být i víc) a přidá do ní obsah z URL `offline.html`.

Druhý úkol je odchytávat `fetch` události. Tam si je možné upravit chování standardních požadavků na soubory.

A v případě chyby vrátit `offline.html` z cache:

```
self.addEventListener('fetch', function (event) {
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' &amp;&amp; event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            (async function () {
                try {
                    return await fetch(event.request, { redirect: 'manual' })
                } catch {
                    const cache = await caches.open(CACHE.OFFLINE)
                    return await cache.match(OFFLINE_URL)
                }
            })()
        )
    }
})
```

To je celé.

Celý kód je obalen do podmínky omezující vykonávání na případy, kdy je cílem získat dokument. Konstrukce `event.request.mode` nefunguje všude, proto je uvedena ještě alternativní podmínka. Jsou tam kvůli tomu, aby se v případě požadavků třeba na obrázky nic nedělalo.

Za povšimnutí stojí `{ redirect: 'manual' }` – bez toho nemusí offline stránka fungovat, pokud se na doméně používá nějaké přesměrování.

Volání standardního požadavku metodou `fetch` je v `try` – `catch` bloku, takže v případě chyby (tj. uživatel je offline) se otevře cache a pokusí se v ní najít soubor `offline.html`.

Na kartě *Network* je potom u *requestů* vidět, že je zpracoval ServiceWorker (znázorňuje to ozubené kolečko před názvem):

## Debugování a vývoj

Základem je karta *Application* ve vývojářských nástrojích **Chrome**.

Je zde vidět samotný Service Worker – v jakém je stavu:

Pro vývoj se hodí možnost *Update on reload* a pro otestování si zapnout *Offline*. Jen pozor na to, že obě zaškrtnuté položky způsobí, že se offline stránka nezobrazí.

Užitečné může být i podívat se do cache:

Je dobré tohle fakt dobře otestovat, protože nakešovaný nefunkční `serviceWorker.js` může klidně návštěvníkům web úplně vyřadit.

Když ServiceWorker zpracovává všechny požadavky na HTML stránky jako na příkladu výše, může kompletně rozbít toto servírování obsahu návštěvníkovi.

## Soubor `manifest.json`

Další podmínkou PWA je `manifest.json` – jedná se o soubor ve formátu [JSON](/json), kde jsou základní informace o aplikaci a odkazy na ikony.

Asi nejsnazší je si takový soubor vytvořit použitím nějakého generátoru:

      [Web App Manifest Generator](https://manifest-gen.netlify.app)

Výstupem je něco takového:

```
{
  "name": "Je čas",
  "short_name": "Je čas",
  "theme_color": "#1079CF",
  "background_color": "#fff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "images/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
  ]
}
```

Tento soubor se připojuje značkou `&lt;link>` v hlavičce webu.

### Maskable ikona

Posledním trendem v ikonách aplikací je tzv. *maskable* formát. Řeší to problém, kdy různé verse a nadstavby Androidu mají jinak přizpůsobené ikony – zejména jejich zaoblení.

Aby se nemusely vytvářet různé varianty, [maskable formát](https://www.w3.org/TR/appmanifest/#icon-masks) definuje ochrannou zónu kolem ikony.

To znamená, že cokoliv mimo zelený kruh může systém libovolně zprůhlednit.

Pro připravení vlastní *maskable* ikony se hodí:

      [Maskable.app Editor](https://maskable.app/editor) – nástroj pro vygenerování *maskable* ikony

Odkaz na tuto ikonu je následně potřeba přidat do `manifest.json` mezi ostatní ikony (do pole `icons`):

```
    {
      "src": "images/icons/maskable_icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable",
      "density": 4
    }
```

## Má smysl mít PWA?

Při splnění kroků výše bude web splňovat formální požadavky na PWA, které je možné automaticky testovat **Lighthouse** nástrojem ve vývojářských nástrojích.

Podobně jako kdysi řešená [validita HTML/CSS kódu](/validita) nezajišťovala automaticky dobrý web, ani stránka splňující PWA nemusí být nikterak lepší.

Příklad popsaný v tomto článku je tak trochu *PWA pro PWA* – praktický přínos pro uživatele je dost malý.

**Výhoda PWA** je v podstatě jen možnost instalace na plochu na Androidu, kde je otázka, jestli to významné množství lidí potřebuje.

Význam takto hloupé `offline.html` stránky je trochu sporný.

Standardní hláška prohlížeče má výhody v tom, že je na ní návštěvník zvyklý, je přeložená do jeho jazyku a případně respektuje i nastavení světlého/tmavého režimu:

Vlastní offline stránka tak může být pro návštěvníky zhoršení situace.

**Nevýhoda PWA** spočívá v tom, že se musí navíc:

    Spustit JS kód registrující ServiceWorker.

    Stáhnout a vykonat/instalovat kód v souboru `serviceWorker.js`. 

    Stáhnout a uložit do cache obsah stránky `offline.html`.

    Stáhnout a zpracovat obsah souboru `manifest.json`.

    Každý požadavek na soubory musí projít logikou ServiceWorkeru.

První příchod na stránku tak znamená **stahovat další 3 soubory navíc**. K tomu sice malou, ale pořád nějakou zátěž v podobě JavaScriptu pro registraci, instalaci a samotného běhu SW.

Vytvářet PWA tak dává smysl spíš v situacích, kdy to nabídne návštěvníkům více funkcionality – například **push notifikace**.

Případně když stránka nabídne **opravdové offline použití**, ne jen vlastní chybovou offline stránku.

To je dobře proveditelné u [SPA](/spa) (single page aplikací), kde se může díky ServiceWorkeru uložit do cache celá logika aplikace včetně skriptů, stylů nebo obrázků a opakovaný příchod na takovou stránku je téměř okamžitý, protože spuštění celé aplikace obslouží SW z cache.

## Risiko rozbití webu

ServiceWorker s offline fungováním přináší dost velkou šanci poměrně zásadně rozbít celý web.

Je to tím, že pro offline fungování stránky veškeré požadavky prochází přes ServiceWorker. Takže když tam bude chyba, nemusí vůbec nic fungovat.

Velmi vhodné je mít před spuštěním na webu monitoring typu [Sentry](https://sentry.io/welcome/).

U větších webů ideálně pustit úpravu nejprve na menší část návštěvníků.

## Odkazy jinam

  - MDN: [Making PWAs work offline with Service workers](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers)

  - web.dev: [Create an offline fallback page](https://web.dev/offline-fallback-page/)

  - StackOverflow: [navigator.serviceWorker is never ready](https://stackoverflow.com/questions/29874068/navigator-serviceworker-is-never-ready/58845198#58845198) – problém s umístěním SW mimo root