---
title: "Video Playwright testu"
headline: "Video Playwright testu"
description: "Jak uložit video automatického testu."
date: "2022-08-13"
last_modification: "2022-08-13"
status: 1
tags: ["hotova-reseni", "testovani"]
format: "html"
---

<p><a href="https://playwright.dev"><b>Playwright</b></a> je nástroj pro automatické testování od Microsoftu.</p>

<p>Díky několika řádkům kódu je možné libovolný test zaznamenat jako video. Pokud test selže, lze snadněji zjistit, kde se stala chyba.</p>


<h2 id="instalace">Jak rozjet Playwright</h2>

<p>Instalace je snadná:</p>

<pre><code>npm init playwright@latest</code></pre>






<p>Spuštění testů je potom otázka <code>npx playwright test</code>. Ze začátku jsou připravené ukázkové testy, ze kterých jde vycházet.</p>




<h2 id="jak">Jak uložit video testu</h2>

<p>Stačí běžný test <i>obalit</i> do <i>kontextu</i> prohlížeče:</p>

<pre><code>import { test, chromium } from '@playwright/test'

test('test', async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } })
  const page = await context.newPage()

  // začátek samotného testu
  await page.goto('https://jecas.cz')
  // konec testu
  
  await context.close()
})
</code></pre>














<p>Test na příkladu skoro nic nedělá (jen navštíví jecas.cz).</p>

<p>Výsledné video uloží do složky <code>videos</code>.</p>

<p>Důležité je po dokončení zavolat <code>await context.close()</code>.</p>

<p>A místo <code>page</code> předávané do <code>async</code> funkce použít kontext <code>const page = await context.newPage()</code>.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>
    
Playwright: <a href="https://playwright.dev/docs/videos">Videos</a>
  </li>
</ul>