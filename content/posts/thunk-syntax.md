---
title: "Thunk syntax v JavaScriptu"
headline: "Thunk syntax v JavaScriptu"
description: "Co je thunk, jak funguje a k čemu se používá. Lazy loading, dependency injection, trampolining, testování a Redux Thunk."
date: "2025-12-29"
last_modification: "2025-12-29"
status: 1
tags: ["javascript"]
format: "html"
---

<p><b>Thunk</b> je funkce, která obaluje výraz a odkládá jeho vyhodnocení. Místo okamžitého výpočtu vrátíte funkci, která výpočet provede až při zavolání.</p>

<h2 id="co-je-thunk">Co je thunk</h2>

<p>Slovo „thunk" vzniklo v 60. letech při vývoji ALGOL 60. Programátoři potřebovali pojmenovat kus kódu, který se vyhodnotí později — a vtipně prohlásili, že o něm „už bylo promyšleno" (humorné „thunk" místo „thought"). V praxi jde o wrapper funkci:</p>

<pre><code>// Přímá hodnota
const value = 1 + 2;

// Thunk - odložený výpočet
const thunk = () => 1 + 2;

// Hodnota se vypočítá až teď
console.log(thunk()); // 3</code></pre>

<p>Thunk je tedy funkce, která:</p>

<ul>
  <li>Obaluje výpočet nebo operaci</li>
  <li>Odkládá vyhodnocení až do momentu zavolání</li>
  <li>Typicky nepřijímá argumenty (ale existují varianty)</li>
</ul>

<h2 id="synchronni-thunk">Synchronní thunk</h2>

<p>Nejjednodušší forma thunku odkládá synchronní výpočet:</p>

<pre><code>function createThunk(x, y) {
  return function() {
    return x + y;
  };
}

const thunk = createThunk(10, 20);

// Výpočet ještě neproběhl
console.log(typeof thunk); // "function"

// Teď se výpočet provede
console.log(thunk()); // 30</code></pre>

<p>Synchronní thunky se hodí pro <b>lazy evaluation</b> — výpočet se provede jen když je potřeba:</p>

<pre><code>function expensiveCalculation() {
  console.log("Počítám...");
  return Array(1000000).fill(0).reduce((a, b) => a + 1, 0);
}

// Vytvoříme thunk místo přímého volání
const lazyResult = () => expensiveCalculation();

// Výpočet se provede až při skutečné potřebě
if (needsResult) {
  console.log(lazyResult());
}</code></pre>

<h2 id="asynchronni-thunk">Asynchronní thunk</h2>

<p>Thunk může obalovat i asynchronní operaci. Místo hodnoty pak vrací Promise nebo přijímá callback:</p>

<pre><code>// Thunk s callbackem
function fetchUserThunk(userId) {
  return function(callback) {
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => callback(null, data))
      .catch(error => callback(error));
  };
}

const getUser = fetchUserThunk(42);
getUser((error, user) => {
  if (error) return console.error(error);
  console.log(user);
});</code></pre>

<p>Modernější verze s Promise:</p>

<pre><code>// Thunk vracející Promise
function fetchUserThunk(userId) {
  return function() {
    return fetch(`/api/users/${userId}`)
      .then(response => response.json());
  };
}

const getUser = fetchUserThunk(42);
getUser().then(user => console.log(user));</code></pre>

<h2 id="memoizace">Thunk s memoizací</h2>

<p>Thunk lze rozšířit o <b>memoizaci</b> — výpočet proběhne jen jednou a výsledek se uloží:</p>

<pre><code>function memoizedThunk(fn) {
  let cached = false;
  let result;

  return function() {
    if (!cached) {
      result = fn();
      cached = true;
    }
    return result;
  };
}

const expensiveThunk = memoizedThunk(() => {
  console.log("Počítám pouze jednou");
  return Math.random();
});

console.log(expensiveThunk()); // Počítám pouze jednou, 0.123...
console.log(expensiveThunk()); // 0.123... (bez výpisu)
console.log(expensiveThunk()); // 0.123... (bez výpisu)</code></pre>

<h2 id="redux-thunk">Redux Thunk</h2>

<p>Nejznámější využití thunků v JavaScriptu je <a href="https://github.com/reduxjs/redux-thunk">Redux Thunk</a> middleware. Umožňuje odesílat funkce místo obyčejných objektů:</p>

<pre><code>// Běžná akce - obyčejný objekt
const setUser = (user) => ({
  type: 'SET_USER',
  payload: user
});

// Thunk akce - funkce
const fetchUser = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FETCH_USER_START' });

    try {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      dispatch(setUser(user));
    } catch (error) {
      dispatch({ type: 'FETCH_USER_ERROR', error });
    }
  };
};

// Použití
store.dispatch(fetchUser(42));</code></pre>

<p>Redux Thunk middleware detekuje, že akce je funkce, a zavolá ji s <code>dispatch</code> a <code>getState</code> jako argumenty. To umožňuje:</p>

<ul>
  <li>Asynchronní operace (API volání)</li>
  <li>Podmíněné odesílání</li>
  <li>Přístup k aktuálnímu stavu</li>
  <li>Odesílání více akcí</li>
</ul>

<h2 id="implementace-middleware">Implementace middleware</h2>

<p>Redux Thunk middleware je překvapivě jednoduchý:</p>

<pre><code>const thunkMiddleware = ({ dispatch, getState }) => {
  return (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
};</code></pre>

<p>Celá logika: pokud je akce funkce, zavolej ji. Jinak předej dál.</p>

<h2 id="thunk-vs-promise">Thunk vs Promise</h2>

<p>Thunky a Promise řeší podobný problém — reprezentaci budoucí hodnoty. Hlavní rozdíl:</p>

<table>
  <tr>
    <th></th>
    <th>Thunk</th>
    <th>Promise</th>
  </tr>
  <tr>
    <td>Spuštění</td>
    <td>Při zavolání</td>
    <td>Okamžitě při vytvoření</td>
  </tr>
  <tr>
    <td>Opakované volání</td>
    <td>Spustí znovu</td>
    <td>Vrací uložený výsledek</td>
  </tr>
  <tr>
    <td>Lazy evaluation</td>
    <td>Ano</td>
    <td>Ne</td>
  </tr>
  <tr>
    <td>Zrušení</td>
    <td>Nezavoláte</td>
    <td>Nelze (bez AbortController)</td>
  </tr>
</table>

<pre><code>// Promise - spustí se hned
const promise = fetch('/api/data');

// Thunk - spustí se až při zavolání
const thunk = () => fetch('/api/data');

// Promise běží, i když výsledek nepotřebujeme
// Thunk se nespustí, dokud ho nezavoláme</code></pre>

<h2 id="prakticke-vyuziti">Praktické využití</h2>

<h3>Podmíněné načítání</h3>

<pre><code>const loadDataIfNeeded = () => {
  return (dispatch, getState) => {
    const { data, loading } = getState();

    // Nenačítej, pokud už data máme nebo načítáme
    if (data || loading) return;

    dispatch(fetchData());
  };
};</code></pre>

<h3>Debounced akce</h3>

<pre><code>let timeout;
const debouncedSearch = (query) => {
  return (dispatch) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(search(query));
    }, 300);
  };
};</code></pre>

<h3>Sekvenční akce</h3>

<pre><code>const checkout = () => {
  return async (dispatch) => {
    await dispatch(validateCart());
    await dispatch(processPayment());
    await dispatch(sendConfirmation());
    dispatch(clearCart());
  };
};</code></pre>

<h2 id="lazy-loading">Lazy loading modulů</h2>

<p>Thunky umožňují načítat moduly až když jsou potřeba:</p>

<pre><code>// Thunk pro lazy import
const getChart = () => import('chart.js');
const getEditor = () => import('monaco-editor');

// Použití - modul se načte až při volání
async function showChart(data) {
  const { Chart } = await getChart();
  new Chart(canvas, { type: 'line', data });
}

// Editor se nenačte, dokud uživatel neklikne
button.onclick = async () => {
  const monaco = await getEditor();
  monaco.editor.create(container, options);
};</code></pre>

<p>Výhoda oproti přímému importu: moduly se nenačítají při startu aplikace, ale až když jsou skutečně potřeba.</p>

<h2 id="dependency-injection">Dependency injection</h2>

<p>Thunky lze použít pro předávání závislostí:</p>

<pre><code>// Závislosti jako thunky
const createService = (getLogger, getDatabase) => ({
  async save(data) {
    const logger = getLogger();
    const db = getDatabase();

    logger.info('Saving data...');
    await db.insert(data);
  }
});

// Konfigurace závislostí
const service = createService(
  () => console,               // dev logger (console.info)
  () => new SQLiteDatabase()   // dev database
);

// V produkci
const prodService = createService(
  () => new CloudLogger(),
  () => new PostgresDatabase()
);</code></pre>

<p>Závislosti se vytvoří až při použití, ne při inicializaci.</p>

<h2 id="trampolining">Trampolining</h2>

<p>Thunky řeší problém přetečení zásobníku u rekurzivních funkcí:</p>

<pre><code>// Klasická rekurze - může přetéct stack
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Trampolining s thunky
function trampoline(fn) {
  let result = fn();
  while (typeof result === 'function') {
    result = result();
  }
  return result;
}

function factorialThunk(n, acc = 1) {
  if (n <= 1) return acc;
  return () => factorialThunk(n - 1, n * acc); // Vrací thunk
}

// Bezpečné i pro velká čísla
console.log(trampoline(() => factorialThunk(10000)));</code></pre>

<p>Místo rekurzivního volání funkce vrací thunk. Trampolína thunky rozbaluje v cyklu, takže nedochází k hromadění na zásobníku.</p>

<h2 id="konfigurace">Odložená konfigurace</h2>

<p>Thunky umožňují definovat konfiguraci, která se vyhodnotí až za běhu:</p>

<pre><code>const config = {
  apiUrl: () => process.env.API_URL || 'http://localhost:3000',
  retries: () => parseInt(process.env.RETRIES) || 3,
  features: () => ({
    darkMode: localStorage.getItem('darkMode') === 'true',
    beta: document.cookie.includes('beta=1')
  })
};

// Hodnoty se načtou až při přístupu
async function makeRequest(endpoint) {
  for (let i = 0; i < config.retries(); i++) {
    const response = await fetch(config.apiUrl() + endpoint);
    if (response.ok) return response;
  }
}</code></pre>

<p>Konfigurace může záviset na stavu, který není dostupný při inicializaci (localStorage, cookies, env proměnné).</p>

<h2 id="testovani">Testování a mockování</h2>

<p>Thunky usnadňují testování tím, že oddělují vytvoření závislosti od jejího použití:</p>

<pre><code>// Produkční kód
const createUserService = (getApi = () => realApi) => ({
  async getUser(id) {
    const api = getApi();
    return api.fetch(`/users/${id}`);
  }
});

// Test
describe('UserService', () => {
  it('fetches user by id', async () => {
    const mockApi = {
      fetch: jest.fn().mockResolvedValue({ id: 1, name: 'Jan' })
    };

    const service = createUserService(() => mockApi);
    const user = await service.getUser(1);

    expect(mockApi.fetch).toHaveBeenCalledWith('/users/1');
    expect(user.name).toBe('Jan');
  });
});</code></pre>

<h2 id="event-handlers">Event handlery</h2>

<p>Thunky oddělují definici handleru od jeho spuštění:</p>

<pre><code>// Factory pro event handlery
const createClickHandler = (action) => {
  return (event) => {
    action(event.target);
  };
};

// Definice handlerů - logika oddělená od DOM
const handlers = {
  'submit-btn': createClickHandler((el) => el.form.submit()),
  'reset-btn': createClickHandler((el) => el.form.reset()),
  'menu-btn': createClickHandler((el) => {
    document.getElementById('menu').classList.toggle('open');
  })
};

// Připojení až když DOM existuje
document.addEventListener('DOMContentLoaded', () => {
  Object.entries(handlers).forEach(([id, handler]) => {
    document.getElementById(id)?.addEventListener('click', handler);
  });
});</code></pre>

<h2 id="alternativy">Alternativy k Redux Thunk</h2>

<p>Pro komplexnější asynchronní logiku existují alternativy:</p>

<ul>
  <li><b>Redux Saga</b> — používá generátory, lepší pro komplexní flow</li>
  <li><b>Redux Observable</b> — používá RxJS, reaktivní přístup</li>
  <li><b>RTK Query</b> — vestavěné řešení v Redux Toolkit pro data fetching</li>
</ul>

<p>Pro většinu aplikací je však Redux Thunk dostatečný a jeho jednoduchost je výhodou.</p>

<h2 id="shrnuti">Shrnutí</h2>

<ul>
  <li>Thunk je funkce obalující výraz pro odložené vyhodnocení</li>
  <li>Umožňuje lazy evaluation — výpočet proběhne až když je potřeba</li>
  <li>Na rozdíl od Promise se thunk spustí až při zavolání</li>
</ul>

<p>Využití thunků:</p>

<ul>
  <li><b>Redux Thunk</b> — asynchronní akce v Reduxu</li>
  <li><b>Lazy loading</b> — dynamický import modulů</li>
  <li><b>Dependency injection</b> — odložené vytváření závislostí</li>
  <li><b>Trampolining</b> — optimalizace rekurze</li>
  <li><b>Konfigurace</b> — hodnoty závislé na runtime stavu</li>
  <li><b>Testování</b> — snadné mockování závislostí</li>
</ul>
