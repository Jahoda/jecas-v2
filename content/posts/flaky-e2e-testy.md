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

<h3>9. Používání force: true</h3>

<p>Volba <code>force: true</code> obchází všechny kontroly — viditelnost, překrytí jinými elementy, disabled stav. Je to <b>lék horší než nemoc</b>:</p>

<pre><code>// Špatně — maskuje skutečný problém
await page.click('.submit-button', { force: true });

// Proč je to problém:
// - Element může být překrytý modalem nebo loaderem
// - Element může být mimo viewport
// - Element může být disabled
// - Uživatel by na něj reálně kliknout nemohl</code></pre>

<p>Když test selhává bez <code>force: true</code>, je to signál, že něco není v pořádku. Místo obcházení kontroly zjistěte příčinu:</p>

<pre><code>// Správně — počkat až element bude kliknutelný
await page.locator('.submit-button').click(); // Auto-waiting

// Nebo explicitně počkat na podmínky
await expect(page.locator('.loader')).toBeHidden();
await expect(page.locator('.submit-button')).toBeEnabled();
await page.locator('.submit-button').click();</code></pre>

<p><code>force: true</code> má smysl jen ve výjimečných případech — například testování custom komponenty, která záměrně zachytává kliknutí na jiném elementu.</p>

<h3>10. Hledání neviditelného textu</h3>

<p>Text může být v DOM, ale uživatel ho nevidí. Test projde, ale testuje něco, co uživatel nemůže vidět:</p>

<pre><code>// Špatně — text může být skrytý (display: none, visibility: hidden, opacity: 0)
await expect(page.locator('.message')).toHaveText('Úspěch');

// Element existuje a má správný text, ale:
// - Může být schovaný v collapsed sekci
// - Může být mimo viewport
// - Může mít opacity: 0 během animace
// - Může být překrytý jiným elementem</code></pre>

<p>Vždy ověřte, že element je viditelný:</p>

<pre><code>// Správně — ověřit viditelnost před kontrolou textu
await expect(page.locator('.message')).toBeVisible();
await expect(page.locator('.message')).toHaveText('Úspěch');

// Nebo použít getByText s výchozím filtrováním
await expect(page.getByText('Úspěch')).toBeVisible();</code></pre>

<p>Podobný problém nastává u elementů mimo viewport:</p>

<pre><code>// Element je v DOM, ale uživatel musí scrollovat
const message = page.locator('.message-at-bottom');

// Špatně — nekontroluje, zda uživatel zprávu vidí
await expect(message).toHaveText('Hotovo');

// Správně — scrollovat do view a ověřit viditelnost
await message.scrollIntoViewIfNeeded();
await expect(message).toBeVisible();
await expect(message).toHaveText('Hotovo');</code></pre>

<p>Playwright a Cypress mají různé výchozí chování:</p>

<ul>
  <li><b>Playwright</b> — <code>toHaveText()</code> nekontroluje viditelnost, pouze DOM</li>
  <li><b>Cypress</b> — <code>should('have.text')</code> také nekontroluje viditelnost</li>
</ul>

<p>Proto vždy explicitně testujte viditelnost, když je to pro uživatele důležité.</p>

<h3>11. Nejednoznačné selektory</h3>

<p>Selektor, který matchuje více elementů, je časovaná bomba:</p>

<pre><code>// Špatně — na stránce může být víc tlačítek "Odeslat"
await page.click('button:has-text("Odeslat")');

// Playwright klikne na první nalezený element, ale:
// - Pořadí elementů se může změnit
// - Může přibýt nové tlačítko výše v DOM
// - V různých stavech UI může být viditelné jiné tlačítko</code></pre>

<p>Používejte specifické selektory:</p>

<pre><code>// Správně — jednoznačný selektor
await page.click('[data-testid="contact-form-submit"]');

// Nebo zúžit kontext
await page.locator('.contact-form').getByRole('button', { name: 'Odeslat' }).click();

// Playwright strict mode — selže, pokud matchuje více elementů
await page.locator('button:has-text("Odeslat")').click(); // Strict by default</code></pre>

<h3>12. Spoléhání na pořadí elementů</h3>

<p>Selektory jako <code>:nth-child()</code> nebo <code>:first</code> jsou křehké:</p>

<pre><code>// Špatně — závisí na pořadí
await page.click('.product-list li:nth-child(2) .buy-button');
cy.get('.product-list li').eq(1).find('.buy-button').click();

// Problémy:
// - Pořadí se může změnit při řazení
// - Může přibýt/ubýt položka
// - Lazy loading může změnit index</code></pre>

<p>Vybírejte podle obsahu nebo atributů:</p>

<pre><code>// Správně — výběr podle obsahu
await page.locator('.product-list li', { hasText: 'MacBook Pro' })
  .getByRole('button', { name: 'Koupit' }).click();

// Nebo podle data atributu
await page.click('[data-product-id="macbook-pro"] .buy-button');</code></pre>

<h3>13. Toast a notifikace</h3>

<p>Notifikace se zobrazí a rychle zmizí — test nestihne ověřit:</p>

<pre><code>// Špatně — toast může zmizet než ho test najde
await page.click('.save-button');
await expect(page.locator('.toast')).toHaveText('Uloženo');

// Toast má animaci 300ms + zobrazení 2s + animace 300ms
// Test může "minout" okno, kdy je toast viditelný</code></pre>

<p>Řešení:</p>

<pre><code>// Správně — počkat na toast ihned po akci
await page.click('.save-button');
await expect(page.locator('.toast')).toBeVisible({ timeout: 5000 });
await expect(page.locator('.toast')).toHaveText('Uloženo');

// Nebo použít waitFor s podmínkou
await expect(page.getByRole('alert')).toContainText('Uloženo');

// Případně prodloužit dobu zobrazení toastu v testech
// (nastavit env proměnnou TOAST_DURATION=10000)</code></pre>

<h3>14. iframe a Shadow DOM</h3>

<p>Elementy v iframe nebo Shadow DOM nejsou dostupné běžnými selektory:</p>

<pre><code>// Špatně — element je v iframe
await page.click('.payment-button'); // Nenajde

// Správně — přepnout se do iframe
const frame = page.frameLocator('iframe.payment-widget');
await frame.locator('.payment-button').click();

// Shadow DOM
const host = page.locator('custom-element');
await host.locator('button.internal').click(); // Playwright prochází shadow DOM automaticky

// Cypress potřebuje shadow: true
cy.get('custom-element').shadow().find('button.internal').click();</code></pre>

<h3>15. Stale element reference</h3>

<p>Element byl odebrán z DOM a znovu přidán (např. při rerenderování):</p>

<pre><code>// Špatně — uložená reference může být stale
const button = await page.$('.dynamic-button');
await page.click('.trigger-rerender');
await button.click(); // StaleElementReferenceError

// Správně — vždy používat čerstvý locator
await page.click('.trigger-rerender');
await page.locator('.dynamic-button').click(); // Nové vyhledání</code></pre>

<p>Playwright locatory jsou "lazy" — vyhledávají element až při akci. Proto preferujte locatory před element handles.</p>

<h3>16. Popup okna a nové taby</h3>

<p>Kliknutí otevře nový tab nebo popup — test pokračuje ve špatném kontextu:</p>

<pre><code>// Špatně — kliknutí otevře nový tab, ale test zůstane v původním
await page.click('a[target="_blank"]');
await expect(page.locator('.new-page-content')).toBeVisible(); // Nenajde

// Správně — zachytit novou stránku
const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.click('a[target="_blank"]')
]);
await newPage.waitForLoadState();
await expect(newPage.locator('.new-page-content')).toBeVisible();</code></pre>

<h3>17. Lazy loading a virtualizace</h3>

<p>Elementy se načítají až při scrollu (infinite scroll, virtualizované seznamy):</p>

<pre><code>// Špatně — element ještě není v DOM
await expect(page.locator('.item-500')).toBeVisible();

// Správně — scrollovat dokud se element neobjeví
while (!(await page.locator('.item-500').isVisible())) {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(100);
}

// Nebo použít scrollIntoViewIfNeeded (pokud element existuje v DOM)
await page.locator('.item-500').scrollIntoViewIfNeeded();

// Pro virtualizované seznamy — element nemusí být v DOM vůbec
// Potřebujete scrollovat a čekat na načtení</code></pre>

<h3>18. Testování downloadu souborů</h3>

<p>Download souboru je asynchronní a cesta k souboru se může lišit:</p>

<pre><code>// Špatně — nekontroluje, že download proběhl
await page.click('.download-button');
// ... a co dál?

// Správně — zachytit download event
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.click('.download-button')
]);

// Ověřit název souboru
expect(download.suggestedFilename()).toBe('report.pdf');

// Uložit do konkrétní cesty
await download.saveAs('/tmp/test-downloads/report.pdf');

// Ověřit obsah (pro textové soubory)
const content = await download.createReadStream();
</code></pre>

<h3>19. Testování clipboard</h3>

<p>Operace s clipboardem vyžadují oprávnění a mohou selhat:</p>

<pre><code>// Nastavit oprávnění v configu
// playwright.config.ts
use: {
  permissions: ['clipboard-read', 'clipboard-write'],
}

// Test
await page.click('.copy-button');
const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
expect(clipboardText).toBe('Zkopírovaný text');

// Pozor: V headless módu clipboard nemusí fungovat
// Fallback — ověřit přes UI feedback
await page.click('.copy-button');
await expect(page.locator('.toast')).toHaveText('Zkopírováno');</code></pre>

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
  <li>Selektory používají <code>data-testid</code> a jsou jednoznačné</li>
  <li>Nepoužívám <code>:nth-child()</code> nebo pozicové selektory</li>
  <li>Nepoužívám <code>force: true</code> (kromě výjimečných případů)</li>
  <li>Kontroluji viditelnost elementů, ne jen jejich přítomnost v DOM</li>
  <li>Používám locatory místo element handles (kvůli stale references)</li>
  <li>Zachytávám nové taby a popup okna přes <code>waitForEvent('page')</code></li>
  <li>Pro iframe používám <code>frameLocator()</code></li>
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
