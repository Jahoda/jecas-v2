---
title: "Flaky E2E testy"
headline: "Jak řešit nestabilní E2E testy"
description: "Proč jsou E2E testy nestabilní, jak je identifikovat a praktické tipy na jejich opravu."
date: "2025-12-31"
status: 1
tags: ["testovani", "e2e", "playwright", "cypress"]
---

<p>Flaky testy jsou noční můra každého vývojáře. Test projde, pak neprojde, pak zase projde — a vy nevíte, jestli je chyba v kódu nebo v testu. U E2E testů je tento problém obzvlášť častý.</p>

<h2 id="co-je-flaky-test">Co je flaky test</h2>

<p>Flaky test je test, který <b>nedeterministicky</b> prochází nebo selhává při spuštění na stejném kódu. Jeden běh projde, druhý ne. Příčina není v kódu aplikace, ale v samotném testu nebo testovacím prostředí.</p>

<p>Flaky testy jsou nebezpečné, protože:</p>

<ul>
  <li><b>Snižují důvěru</b> — vývojáři začnou ignorovat selhání testů</li>
  <li><b>Zpomalují vývoj</b> — opakované spouštění CI, čekání na „zelený" build</li>
  <li><b>Maskují skutečné chyby</b> — reálná regrese se ztratí mezi falešnými poplachy</li>
</ul>

<h2 id="priciny">Časté příčiny</h2>

<h3>1. Race conditions</h3>

<p>Nejčastější příčina. Test předpokládá, že něco bude hotové, ale není:</p>

<pre><code>// Špatně — element nemusí být ještě v DOM
await page.click('.submit-button');
await page.click('.success-message'); // Může selhat

// Správně — počkat na element
await page.click('.submit-button');
await page.waitForSelector('.success-message');
await page.click('.success-message');</code></pre>

<h3>2. Hardcoded čekání</h3>

<p>Fixní <code>sleep</code> nebo <code>wait</code> jsou křehké:</p>

<pre><code>// Špatně — 1 sekunda nemusí stačit (nebo je zbytečně moc)
await page.click('.load-data');
await page.waitForTimeout(1000);
expect(await page.locator('.data').count()).toBe(10);

// Správně — čekat na konkrétní podmínku
await page.click('.load-data');
await expect(page.locator('.data')).toHaveCount(10);</code></pre>

<h3>3. Závislost na pořadí</h3>

<p>Testy by měly být nezávislé. Pokud test B závisí na testu A, máte problém:</p>

<pre><code>// Špatně — test závisí na stavu z předchozího testu
test('zobrazí seznam produktů', async () => {
  // Předpokládá, že předchozí test vytvořil produkty
  await expect(page.locator('.product')).toHaveCount(3);
});

// Správně — test si připraví vlastní data
test('zobrazí seznam produktů', async () => {
  await createTestProducts(3);
  await page.goto('/products');
  await expect(page.locator('.product')).toHaveCount(3);
});</code></pre>

<h3>4. Sdílený stav</h3>

<p>Testy sdílí databázi, cookies, localStorage nebo jiný stav:</p>

<pre><code>// Před každým testem vyčistit stav
beforeEach(async () => {
  await clearDatabase();
  await page.context().clearCookies();
  await page.evaluate(() => localStorage.clear());
});</code></pre>

<h3>5. Animace a přechody</h3>

<p>CSS animace mohou způsobit, že element není kliknutelný:</p>

<pre><code>// Špatně — klik během animace
await page.click('.animated-button');

// Správně — počkat na stabilitu elementu
await page.locator('.animated-button').click({ force: false });

// Nebo zakázat animace v testech
await page.addStyleTag({
  content: '*, *::before, *::after { animation: none !important; transition: none !important; }'
});</code></pre>

<h3>6. Síťové požadavky</h3>

<p>API odpovědi mohou přijít v různém pořadí nebo s různou latencí:</p>

<pre><code>// Špatně — předpokládá rychlou odpověď
await page.click('.fetch-button');
await expect(page.locator('.result')).toBeVisible();

// Správně — čekat na síťový požadavek
await page.click('.fetch-button');
await page.waitForResponse(resp =>
  resp.url().includes('/api/data') && resp.status() === 200
);
await expect(page.locator('.result')).toBeVisible();</code></pre>

<h3>7. Viewport a responzivita</h3>

<p>Element může být schovaný nebo na jiné pozici v různých velikostech okna:</p>

<pre><code>// Nastavit konzistentní viewport
beforeEach(async () => {
  await page.setViewportSize({ width: 1280, height: 720 });
});</code></pre>

<h3>8. Časová pásma a datum</h3>

<p>Testy závislé na aktuálním čase:</p>

<pre><code>// Špatně — závisí na aktuálním datu
test('zobrazí dnešní události', async () => {
  await expect(page.locator('.today-events')).toBeVisible();
});

// Správně — mockovat čas
test('zobrazí dnešní události', async () => {
  await page.clock.setFixedTime(new Date('2025-06-15T10:00:00'));
  await page.goto('/events');
  await expect(page.locator('.today-events')).toBeVisible();
});</code></pre>

<h2 id="identifikace">Jak identifikovat flaky testy</h2>

<h3>Opakované spouštění</h3>

<p>Playwright i Cypress umožňují opakované spuštění testů:</p>

<pre><code># Playwright — spustit každý test 10×
npx playwright test --repeat-each=10

# Cypress — pomocí pluginu
npx cypress run --env burn=10</code></pre>

<h3>CI statistiky</h3>

<p>Sledujte historii CI buildů. Test, který selhává náhodně v 10% případů, je flaky. Nástroje jako <a href="https://buildkite.com/test-analytics">Buildkite Test Analytics</a> nebo <a href="https://circleci.com/docs/insights/">CircleCI Insights</a> mohou pomoci.</p>

<h3>Paralelní běhy</h3>

<p>Spuštění testů paralelně často odhalí race conditions a sdílený stav:</p>

<pre><code># Playwright
npx playwright test --workers=4

# Playwright — plně paralelní mód
npx playwright test --fully-parallel</code></pre>

<h2 id="oprava">Jak opravit flaky testy</h2>

<h3>1. Používejte správné čekání</h3>

<p>Playwright a Cypress mají auto-waiting — využívejte ho:</p>

<pre><code>// Playwright — auto-waiting assertions
await expect(page.locator('.message')).toBeVisible();
await expect(page.locator('.count')).toHaveText('5');

// Cypress — automatické opakování
cy.get('.message').should('be.visible');
cy.get('.count').should('have.text', '5');</code></pre>

<h3>2. Izolujte testy</h3>

<p>Každý test by měl být nezávislý:</p>

<pre><code>// Playwright — izolovaný kontext pro každý test
test.describe('produkty', () => {
  test.beforeEach(async ({ page }) => {
    await resetDatabase();
    await page.goto('/');
  });

  test('vytvoří produkt', async ({ page }) => {
    // ...
  });
});</code></pre>

<h3>3. Mockujte externí závislosti</h3>

<p>API třetích stran mohou být pomalé nebo nedostupné:</p>

<pre><code>// Playwright — mock API
await page.route('**/api/external/**', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ data: 'mocked' })
  });
});

// Cypress — intercept
cy.intercept('GET', '/api/external/*', {
  statusCode: 200,
  body: { data: 'mocked' }
});</code></pre>

<h3>4. Přidejte data-testid atributy</h3>

<p>Selektory jako <code>.btn-primary</code> nebo <code>div > span:nth-child(2)</code> jsou křehké:</p>

<pre><code>&lt;!-- Špatně --&gt;
&lt;button class="btn btn-primary"&gt;Odeslat&lt;/button&gt;

&lt;!-- Správně --&gt;
&lt;button class="btn btn-primary" data-testid="submit-button"&gt;Odeslat&lt;/button&gt;</code></pre>

<pre><code>// Test
await page.click('[data-testid="submit-button"]');

// Nebo pomocí getByTestId
await page.getByTestId('submit-button').click();</code></pre>

<h3>5. Retry logika</h3>

<p>Pro akce, které mohou selhat, použijte retry:</p>

<pre><code>// Playwright — retry kliknutí
await expect(async () => {
  await page.click('.flaky-button');
  await expect(page.locator('.result')).toBeVisible();
}).toPass({ timeout: 10000 });</code></pre>

<h3>6. Stabilní test data</h3>

<p>Generujte unikátní data pro každý test:</p>

<pre><code>test('registrace uživatele', async ({ page }) => {
  const uniqueEmail = `test-${Date.now()}@example.com`;

  await page.fill('[data-testid="email"]', uniqueEmail);
  await page.fill('[data-testid="password"]', 'heslo123');
  await page.click('[data-testid="register"]');

  await expect(page.locator('.welcome')).toContainText(uniqueEmail);
});</code></pre>

<h2 id="nastroje">Nástroje pro detekci</h2>

<h3>Playwright</h3>

<pre><code>// playwright.config.ts
export default defineConfig({
  retries: 2, // Opakovat selhané testy
  use: {
    trace: 'on-first-retry', // Trace pro ladění
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // Reportovat flaky testy
  reporter: [['html'], ['json', { outputFile: 'results.json' }]],
});</code></pre>

<h3>Cypress</h3>

<pre><code>// cypress.config.js
module.exports = {
  retries: {
    runMode: 2,
    openMode: 0,
  },
  video: true,
  screenshotOnRunFailure: true,
};</code></pre>

<h2 id="strategie">Strategie pro CI</h2>

<h3>Karanténa flaky testů</h3>

<p>Označte flaky testy a spouštějte je zvlášť:</p>

<pre><code>// Playwright
test.describe('flaky tests', () => {
  test.describe.configure({ retries: 3 });

  test('nestabilní test', async ({ page }) => {
    // ...
  });
});

// Nebo pomocí anotace
test('nestabilní test', {
  annotation: { type: 'flaky', description: 'Občas selhává kvůli animaci' },
}, async ({ page }) => {
  // ...
});</code></pre>

<h3>Pomalé vs rychlé testy</h3>

<p>Rozdělte testy na rychlé (unit, integrační) a pomalé (E2E):</p>

<pre><code># CI pipeline
- name: Rychlé testy
  run: npm run test:unit

- name: E2E testy
  run: npm run test:e2e
  continue-on-error: true # Neblokovat merge kvůli flaky testům</code></pre>

<h2 id="prevence">Prevence</h2>

<ul>
  <li><b>Code review testů</b> — kontrolujte testy stejně jako produkční kód</li>
  <li><b>Dokumentujte známé problémy</b> — když najdete flaky test, zdokumentujte příčinu</li>
  <li><b>Měřte flakiness</b> — sledujte metriky a reagujte na trendy</li>
  <li><b>Opravujte hned</b> — flaky test se sám neopraví, jen se zhorší</li>
  <li><b>Používejte správné nástroje</b> — Playwright a Cypress mají lepší auto-waiting než starší frameworky</li>
</ul>

<h2 id="checklist">Checklist pro stabilní E2E testy</h2>

<ul>
  <li>Každý test je nezávislý a může běžet samostatně</li>
  <li>Žádné hardcoded <code>sleep</code> nebo <code>waitForTimeout</code></li>
  <li>Používám auto-waiting assertions</li>
  <li>Testy mají vlastní testovací data</li>
  <li>Externí API jsou mockované</li>
  <li>Viewport je konzistentní</li>
  <li>Animace jsou vypnuté nebo počkám na jejich dokončení</li>
  <li>Selektory používají <code>data-testid</code></li>
  <li>CI má nastavené retries</li>
  <li>Trace a video jsou zapnuté pro selhání</li>
</ul>

<h2 id="zaver">Závěr</h2>

<p>Flaky testy jsou symptom, ne příčina. Většinou signalizují race condition v testu, sdílený stav, nebo nesprávné čekání. Klíč k jejich řešení je systematický přístup: identifikovat, izolovat, opravit.</p>

<p>Nejlepší flaky test je ten, který nevznikne. Pište testy s vědomím, že běží v nedeterministickém prostředí, používejte správné čekání a izolujte stav. Váš budoucí já vám poděkuje.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://playwright.dev/docs/test-assertions">Playwright: Auto-waiting Assertions</a></li>
  <li><a href="https://docs.cypress.io/guides/references/best-practices">Cypress: Best Practices</a></li>
  <li><a href="https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html">Google: Flaky Tests at Google and How We Mitigate Them</a></li>
</ul>
