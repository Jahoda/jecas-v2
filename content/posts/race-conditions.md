---
title: "Race conditions v JavaScriptu"
headline: "Race conditions v JavaScriptu"
description: "Co jsou race conditions, proč vznikají v asynchronním kódu a jak jim předcházet."
date: "2026-01-05"
last_modification: "2026-01-22"
status: 1
tags: ["js"]
format: "html"
---

<p>Race condition nastává, když výsledek programu závisí na <b>pořadí nebo časování</b> nekontrolovaných událostí. V JavaScriptu jsou běžné kvůli asynchronnímu zpracování — síťových požadavků, uživatelských akcí a časovačů.</p>

<h2 id="priklad">Základní příklad</h2>

<p>Představte si vyhledávací pole, které načítá výsledky při psaní:</p>

<pre><code>const searchInput = document.querySelector('#search');
const results = document.querySelector('#results');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;
  const response = await fetch(`/api/search?q=${query}`);
  const data = await response.json();
  results.innerHTML = data.map(item => `&lt;li&gt;${item}&lt;/li&gt;`).join('');
});</code></pre>

<p>Uživatel napíše „ab" — odešlou se dva požadavky:</p>

<ol>
  <li>Požadavek pro „a" (odeslán první)</li>
  <li>Požadavek pro „ab" (odeslán druhý)</li>
</ol>

<p>Pokud odpověď na „a" dorazí <b>později</b> než odpověď na „ab", zobrazí se <b>špatné výsledky</b>. Uživatel vidí výsledky pro „a", přestože v poli je „ab".</p>

<h2 id="proc">Proč k tomu dochází</h2>

<p>JavaScript je jednovláknový, ale síťové požadavky běží paralelně mimo hlavní vlákno. Odpovědi mohou dorazit v <b>libovolném pořadí</b>:</p>

<ul>
  <li>Server může být zatížený a první požadavek zpracuje pomaleji</li>
  <li>Síťová latence se liší</li>
  <li>CDN může cachovat jen některé odpovědi</li>
</ul>

<p>Kód ale zpracovává odpovědi v pořadí, v jakém <b>dorazí</b>, ne v jakém byly <b>odeslány</b>.</p>

<h2 id="reseni-1">Řešení 1: Ignorování zastaralých odpovědí</h2>

<p>Nejjednodušší řešení — uložit si aktuální dotaz a při zpracování odpovědi ověřit, jestli je stále relevantní:</p>

<pre><code>let currentQuery = '';

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;
  currentQuery = query;

  const response = await fetch(`/api/search?q=${query}`);
  const data = await response.json();

  // Zpracovat jen pokud je dotaz stále aktuální
  if (query === currentQuery) {
    results.innerHTML = data.map(item => `&lt;li&gt;${item}&lt;/li&gt;`).join('');
  }
});</code></pre>

<p>Když přijde odpověď pro „a", ale <code>currentQuery</code> je už „ab", odpověď se zahodí.</p>

<h2 id="reseni-2">Řešení 2: AbortController</h2>

<p>Lepší řešení — <b>zrušit předchozí požadavek</b> při odeslání nového. Ušetří se tím síťový provoz:</p>

<pre><code>let controller = null;

searchInput.addEventListener('input', async (e) => {
  // Zrušit předchozí požadavek
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();
  const query = e.target.value;

  try {
    const response = await fetch(`/api/search?q=${query}`, {
      signal: controller.signal
    });
    const data = await response.json();
    results.innerHTML = data.map(item => `&lt;li&gt;${item}&lt;/li&gt;`).join('');
  } catch (err) {
    if (err.name !== 'AbortError') {
      throw err;
    }
    // AbortError ignorujeme — je očekávaná
  }
});</code></pre>

<p><code>AbortController</code> umožňuje zrušit <code>fetch</code> požadavek. Když zavoláme <code>controller.abort()</code>, požadavek vyhodí <code>AbortError</code>.</p>

<p><b>Pozor:</b> Abort zruší požadavek na straně <b>klienta</b>, ale server o tom neví a požadavek zpracuje až do konce. Pokud jde o náročnou operaci (generování reportu, odesílání e-mailů), abort vám nepomůže snížit zátěž serveru — jen přestanete čekat na odpověď.</p>

<h2 id="reseni-3">Řešení 3: Zablokování UI během načítání</h2>

<p>Nejjednodušší prevence — nedovolit uživateli spustit další akci, dokud předchozí neskončí:</p>

<pre><code>const button = document.querySelector('#load-button');
let loading = false;

button.addEventListener('click', async () => {
  if (loading) return;

  loading = true;
  button.disabled = true;

  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    displayData(data);
  } finally {
    loading = false;
    button.disabled = false;
  }
});</code></pre>

<p>Zablokované tlačítko jasně signalizuje, že akce probíhá. Nevznikne race condition, protože druhý požadavek nelze odeslat.</p>

<p><b>Kdy použít:</b> Pro akce s jasným začátkem a koncem — odeslání formuláře, načtení detailu, smazání položky. <b>Nehodí se</b> pro vyhledávání při psaní nebo jiné situace, kde chcete reagovat na každou změnu.</p>

<h2 id="stav">Race condition při nastavování stavu</h2>

<p>Další častý případ — načítání dat při změně stavu komponenty:</p>

<pre><code>async function loadUser(userId) {
  loading = true;
  const response = await fetch(`/api/users/${userId}`);
  const user = await response.json();
  currentUser = user;
  loading = false;
}</code></pre>

<p>Pokud uživatel rychle přepíná mezi profily, může se stát:</p>

<ol>
  <li>Klik na uživatele A → požadavek pro A</li>
  <li>Klik na uživatele B → požadavek pro B</li>
  <li>Odpověď pro B (rychlejší) → zobrazí se B</li>
  <li>Odpověď pro A (pomalejší) → <b>přepíše B na A</b></li>
</ol>

<p>Výsledek: uživatel klikl na B, ale vidí A.</p>

<h2 id="reseni-4">Řešení 4: Identifikátor požadavku</h2>

<p>Použít unikátní identifikátor pro každý požadavek:</p>

<pre><code>let requestId = 0;

async function loadUser(userId) {
  const thisRequestId = ++requestId;

  loading = true;
  const response = await fetch(`/api/users/${userId}`);
  const user = await response.json();

  // Zpracovat jen pokud je toto stále poslední požadavek
  if (thisRequestId === requestId) {
    currentUser = user;
    loading = false;
  }
}</code></pre>

<p>Každý nový požadavek zvýší <code>requestId</code>. Při zpracování odpovědi ověříme, jestli se ID shoduje — pokud ne, odpověď ignorujeme.</p>

<h2 id="debounce">Race condition a debounce</h2>

<p>Debounce snižuje počet požadavků, ale <b>neřeší race conditions</b>:</p>

<pre><code>const debouncedSearch = debounce(async (query) => {
  const response = await fetch(`/api/search?q=${query}`);
  const data = await response.json();
  results.innerHTML = data.map(item => `&lt;li&gt;${item}&lt;/li&gt;`).join('');
}, 300);</code></pre>

<p>I s debouncem může nastat situace, kdy uživatel napíše „abc", počká, pak napíše „xyz". Oba požadavky se odešlou, ale odpovědi mohou dorazit v opačném pořadí.</p>

<p><b>Debounce kombinujte s AbortControllerem nebo kontrolou aktuálnosti.</b></p>

<h2 id="timeout">Timeout pro požadavek</h2>

<p>Pokud chcete omezit maximální dobu čekání na odpověď, použijte <code>AbortController</code> s časovačem:</p>

<pre><code>async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}</code></pre>

<h2 id="promise-race">Promise.race pro nejrychlejší odpověď</h2>

<p><code>Promise.race</code> vrátí výsledek první dokončené Promise. Hodí se, když stejná data poskytuje více API a chcete co nejrychlejší odpověď:</p>

<pre><code>async function fetchFromFastestSource(query) {
  const sources = [
    fetch(`https://api1.example.com/search?q=${query}`),
    fetch(`https://api2.example.com/search?q=${query}`),
    fetch(`https://api3.example.com/search?q=${query}`)
  ];

  const response = await Promise.race(sources);
  return response.json();
}</code></pre>

<p>Vrátí se výsledek od serveru, který odpoví první. Ostatní požadavky ale běží dál — pokud chcete šetřit prostředky, použijte <code>AbortController</code>:</p>

<pre><code>async function fetchFromFastestSource(query) {
  const controller = new AbortController();

  const sources = [
    'https://api1.example.com/search',
    'https://api2.example.com/search',
    'https://api3.example.com/search'
  ].map(url =&gt;
    fetch(`${url}?q=${query}`, { signal: controller.signal })
  );

  try {
    const response = await Promise.race(sources);
    controller.abort(); // Zrušit ostatní požadavky
    return response.json();
  } catch (err) {
    controller.abort();
    throw err;
  }
}</code></pre>

<p><b>Použití:</b> Geolokace z více poskytovatelů, ceny z více e-shopů, záložní CDN.</p>

<h2 id="lokalni-stav">Race condition s lokálním stavem</h2>

<p>Race conditions se netýkají jen síťových požadavků. Mohou nastat i s lokálním stavem:</p>

<pre><code>let count = 0;

async function increment() {
  const current = count;
  await someAsyncOperation();
  count = current + 1;
}

// Zavoláno dvakrát současně
increment();
increment();</code></pre>

<p>Obě volání přečtou <code>count = 0</code>, provedou asynchronní operaci, a pak obě nastaví <code>count = 1</code>. Výsledek je 1 místo očekávaných 2.</p>

<h3>Řešení: Fronta operací</h3>

<p>Serialisovat operace pomocí fronty:</p>

<pre><code>let queue = Promise.resolve();

function increment() {
  queue = queue.then(async () => {
    const current = count;
    await someAsyncOperation();
    count = current + 1;
  });
  return queue;
}</code></pre>

<p>Každé volání se zařadí do fronty a čeká na dokončení předchozího. Operace proběhnou postupně, ne současně.</p>

<h2 id="testovani">Testování race conditions</h2>

<p>Race conditions jsou těžké na odhalení, protože závisí na časování. Několik tipů:</p>

<ul>
  <li><b>Umělé zpoždění</b> — přidejte náhodné zpoždění do odpovědí serveru</li>
  <li><b>Rychlé klikání</b> — testujte rychlé opakované akce</li>
  <li><b>Pomalá síť</b> — použijte DevTools Network throttling</li>
  <li><b>Náhodné pořadí</b> — mockujte API tak, aby odpovědi přicházely v náhodném pořadí</li>
</ul>

<pre><code>// Mock s náhodným zpožděním
function mockFetch(url) {
  return new Promise(resolve =&gt; {
    const delay = Math.random() * 1000;
    setTimeout(() =&gt; {
      resolve({ json: () =&gt; ({ url }) });
    }, delay);
  });
}</code></pre>

<h2 id="shrnuti">Shrnutí</h2>

<p>Race conditions vznikají, když asynchronní operace dokončují v nepředvídatelném pořadí. Základní pravidla:</p>

<ul>
  <li><b>Ověřujte aktuálnost</b> — při zpracování odpovědi zkontrolujte, jestli je stále relevantní</li>
  <li><b>Rušte předchozí požadavky</b> — použijte <code>AbortController</code> (ale pamatujte, že server stále dokončí zpracování)</li>
  <li><b>Blokujte UI</b> — pro jednorázové akce zablokujte tlačítko během načítání</li>
  <li><b>Debounce nestačí</b> — kombinujte ho s dalšími technikami</li>
  <li><b>Testujte s náhodným zpožděním</b> — odhalíte problémy dříve</li>
</ul>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/AbortController">MDN: AbortController</a></li>
</ul>
