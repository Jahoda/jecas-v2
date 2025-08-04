---
title: "Video Playwright testu"
headline: "Video Playwright testu"
description: "Jak uložit video automatického testu."
date: "2022-08-13"
last_modification: "2022-08-13"
status: 1
tags: ["Hotová řešení", "Testování webů"]
---

[**Playwright**](https://playwright.dev) je nástroj pro automatické testování od Microsoftu.

Díky několika řádkům kódu je možné libovolný test zaznamenat jako video. Pokud test selže, lze snadněji zjistit, kde se stala chyba.

## Jak rozjet Playwright

Instalace je snadná:

```
npm init playwright@latest
```

Spuštění testů je potom otázka `npx playwright test`. Ze začátku jsou připravené ukázkové testy, ze kterých jde vycházet.

## Jak uložit video testu

Stačí běžný test *obalit* do *kontextu* prohlížeče:

```
import { test, chromium } from '@playwright/test'

test('test', async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } })
  const page = await context.newPage()

  // začátek samotného testu
  await page.goto('https://jecas.cz')
  // konec testu
  
  await context.close()
})

```

Test na příkladu skoro nic nedělá (jen navštíví jecas.cz).

Výsledné video uloží do složky `videos`.

Důležité je po dokončení zavolat `await context.close()`.

A místo `page` předávané do `async` funkce použít kontext `const page = await context.newPage()`.

## Odkazy jinam

Playwright: [Videos](https://playwright.dev/docs/videos)