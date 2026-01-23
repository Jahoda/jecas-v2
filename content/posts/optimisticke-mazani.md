---
title: "Optimistické mazání"
headline: "Optimistické mazání"
description: "Jak implementovat okamžitou reakci na uživatelské akce s optimistickým mazáním. UI vzor pro rychlejší aplikace."
date: "2025-12-21"
last_modification: "2025-12-21"
status: 1
tags: ["js", "ux", "napady"]
format: "html"
---

<p>Optimistické mazání je <b>UX vzor</b>, kde aplikace okamžitě reaguje na akci uživatele (například smazání položky) a teprve poté ji posílá na server. Pokud server vrátí chybu, změna se vrátí zpět. Výsledkem je <b>rychlejší pocit aplikace</b> bez čekání na odpověď ze serveru.</p>

<h2 id="problem">Problém tradičního přístupu</h2>

<p>Při klasickém mazání musí uživatel čekat na odpověď serveru:</p>

<pre><code>async function smazatPolozku(id) {
  // Zobrazí loading spinner
  setLoading(true);

  try {
    await fetch(`/api/polozky/${id}`, { method: 'DELETE' });
    // Až teď zmizí z UI
    odebratZUI(id);
  } catch (error) {
    zobrazChybu('Nepodařilo se smazat');
  } finally {
    setLoading(false);
  }
}</code></pre>

<p><b>Nevýhody:</b></p>
<ul>
  <li>Uživatel čeká 200–500 ms (nebo déle při pomalém spojení)</li>
  <li>UI „zamrzne" s loading stavem</li>
  <li>Pocit pomalé aplikace, i když server reaguje rychle</li>
</ul>

<h2 id="reseni">Řešení: optimistický přístup</h2>

<p>Optimistické mazání <b>nejdřív aktualisuje UI</b> a pak teprve volá server:</p>

<pre><code>async function smazatPolozku(id) {
  // Okamžitě zmizí z UI
  const puvodni = odebratZUI(id);

  try {
    await fetch(`/api/polozky/${id}`, { method: 'DELETE' });
    // Server potvrdil - vše OK
  } catch (error) {
    // Chyba - vrátíme zpět
    vratitDoUI(puvodni);
    zobrazChybu('Nepodařilo se smazat');
  }
}</code></pre>

<p>Uživatel vidí <b>okamžitou reakci</b>. Ve většině případů server smazání potvrdí a uživatel si ani nevšimne čekání. Pokud selže, položka se vrátí zpět.</p>

<h2 id="ukazka-basic">Základní ukázka</h2>

<p>Seznam úkolů s optimistickým mazáním:</p>

<div class="live">
  <style>
    .opt-list {
      list-style: none;
      padding: 0;
      margin: 1em 0;
    }

    .opt-item {
      display: flex;
      align-items: center;
      gap: 0.75em;
      padding: 0.75em 1em;
      margin: 0.5em 0;
      background: #f5f5f5;
      border-radius: 6px;
      transition: opacity 0.2s, transform 0.2s;
    }

    .opt-item.removing {
      opacity: 0;
      transform: translateX(-20px);
    }

    .opt-item.error {
      background: #ffe0e0;
      animation: shake 0.4s;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }

    .opt-btn-delete {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5em 0.75em;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875em;
    }

    .opt-btn-delete:hover {
      background: #c0392b;
    }

    .opt-message {
      padding: 0.75em;
      margin: 0.5em 0;
      border-radius: 4px;
      background: #d4edda;
      color: #155724;
      display: none;
    }

    .opt-message.error {
      background: #f8d7da;
      color: #721c24;
    }

    .opt-message.show {
      display: block;
    }
  </style>

  <ul class="opt-list" id="opt-list-1">
    <li class="opt-item" data-id="1">
      <span>Nakoupit</span>
      <button class="opt-btn-delete" onclick="optimisticDelete(1)">Smazat</button>
    </li>
    <li class="opt-item" data-id="2">
      <span>Zavolat lékaři</span>
      <button class="opt-btn-delete" onclick="optimisticDelete(2)">Smazat</button>
    </li>
    <li class="opt-item" data-id="3">
      <span>Dokončit projekt</span>
      <button class="opt-btn-delete" onclick="optimisticDelete(3)">Smazat</button>
    </li>
  </ul>
  <div class="opt-message" id="opt-msg-1"></div>

  <script>
    async function optimisticDelete(id) {
      const item = document.querySelector(`#opt-list-1 [data-id="${id}"]`);
      const message = document.getElementById('opt-msg-1');

      // 1. Okamžitě animuj zmizení
      item.classList.add('removing');

      // 2. Po animaci odeber z DOM
      await new Promise(resolve => setTimeout(resolve, 200));
      const parent = item.parentNode;
      const html = item.outerHTML;
      item.remove();

      // 3. Simuluj API volání (70% úspěch, 30% chyba)
      const uspech = Math.random() > 0.3;
      await new Promise(resolve => setTimeout(resolve, 300));

      if (uspech) {
        // Server potvrdil
        message.textContent = 'Úkol smazán';
        message.className = 'opt-message show';
        setTimeout(() => message.classList.remove('show'), 2000);
      } else {
        // Chyba - vrátit zpět
        parent.insertAdjacentHTML('beforeend', html);
        const restored = document.querySelector(`#opt-list-1 [data-id="${id}"]`);
        restored.classList.add('error');
        setTimeout(() => restored.classList.remove('error'), 400);

        message.textContent = 'Nepodařilo se smazat, zkuste to znovu';
        message.className = 'opt-message error show';
        setTimeout(() => message.classList.remove('show'), 3000);
      }
    }
  </script>
</div>

<p>Zkuste smazat nějaký úkol. V 70 % případů smazání proběhne hladce, ve 30 % selže a položka se vrátí zpět s animací.</p>

<h2 id="implementace">Kompletní implementace</h2>

<p>Robustnější implementace s historií pro undo:</p>

<pre><code>class OptimisticList {
  constructor(container) {
    this.container = container;
    this.history = new Map();
  }

  async deleteItem(id) {
    const item = this.container.querySelector(`[data-id="${id}"]`);
    if (!item) return;

    // Uložit původní stav
    this.history.set(id, {
      element: item.cloneNode(true),
      nextSibling: item.nextElementSibling
    });

    // Optimistická aktualisace
    item.classList.add('removing');
    await this.wait(200);
    item.remove();

    try {
      // API volání
      await fetch(`/api/items/${id}`, { method: 'DELETE' });
      // Úspěch - vyčistit historii
      this.history.delete(id);
    } catch (error) {
      // Chyba - vrátit zpět
      this.rollback(id);
      throw error;
    }
  }

  rollback(id) {
    const saved = this.history.get(id);
    if (!saved) return;

    const { element, nextSibling } = saved;

    if (nextSibling) {
      this.container.insertBefore(element, nextSibling);
    } else {
      this.container.appendChild(element);
    }

    element.classList.add('error');
    setTimeout(() => element.classList.remove('error'), 400);

    this.history.delete(id);
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}</code></pre>

<h2 id="react">Optimistické mazání v React</h2>

<p>Příklad s React hooku:</p>

<pre><code>function useOptimisticDelete(items, setItems) {
  const [history, setHistory] = useState(new Map());

  const deleteItem = async (id) => {
    // Uložit původní stav
    const originalItems = [...items];

    // Optimistická aktualisace
    setItems(items.filter(item => item.id !== id));

    try {
      await fetch(`/api/items/${id}`, { method: 'DELETE' });
    } catch (error) {
      // Vrátit zpět
      setItems(originalItems);
      throw error;
    }
  };

  return { deleteItem };
}

// Použití
function TodoList() {
  const [items, setItems] = useState([...]);
  const { deleteItem } = useOptimisticDelete(items, setItems);

  return (
    &lt;ul&gt;
      {items.map(item => (
        &lt;li key={item.id}&gt;
          {item.text}
          &lt;button onClick={() => deleteItem(item.id)}&gt;
            Smazat
          &lt;/button&gt;
        &lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>

<h2 id="vue">Optimistické mazání ve Vue</h2>

<pre><code>&lt;script setup&gt;
import { ref } from 'vue';

const items = ref([
  { id: 1, text: 'Nakoupit' },
  { id: 2, text: 'Zavolat' },
]);

const history = ref(new Map());

async function deleteItem(id) {
  // Uložit původní stav
  const original = [...items.value];

  // Optimistická aktualisace
  items.value = items.value.filter(item => item.id !== id);

  try {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
  } catch (error) {
    // Vrátit zpět
    items.value = original;
    console.error('Chyba při mazání:', error);
  }
}
&lt;/script&gt;

&lt;template&gt;
  &lt;ul&gt;
    &lt;li v-for="item in items" :key="item.id"&gt;
      {{ item.text }}
      &lt;button @click="deleteItem(item.id)"&gt;Smazat&lt;/button&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;</code></pre>

<h2 id="animace">Plynulé animace</h2>

<p>Pro lepší UX přidejte animaci při odebírání:</p>

<pre><code>.item {
  transition: all 0.3s ease-out;
  max-height: 100px;
  opacity: 1;
  transform: translateX(0);
}

.item.removing {
  max-height: 0;
  opacity: 0;
  transform: translateX(-20px);
  margin: 0;
  padding: 0;
}</code></pre>

<p>Pro animaci výšky musíte znát konkrétní výšku nebo použít <code>max-height</code> s dostatečně velkou hodnotou.</p>

<h2 id="offline">Optimistické operace offline</h2>

<p>V offline-first aplikacích můžete ukládat nepotvrzené operace do fronty:</p>

<pre><code>class OfflineQueue {
  constructor() {
    this.queue = this.loadQueue();
  }

  async deleteItem(id) {
    // Přidat do fronty
    this.queue.push({
      type: 'delete',
      id,
      timestamp: Date.now()
    });
    this.saveQueue();

    // Zkusit odeslat
    await this.processQueue();
  }

  async processQueue() {
    if (!navigator.onLine) return;

    while (this.queue.length > 0) {
      const operation = this.queue[0];

      try {
        await fetch(`/api/items/${operation.id}`, {
          method: 'DELETE'
        });
        // Úspěch - odebrat z fronty
        this.queue.shift();
        this.saveQueue();
      } catch (error) {
        // Chyba - zkusit později
        break;
      }
    }
  }

  loadQueue() {
    return JSON.parse(localStorage.getItem('queue') || '[]');
  }

  saveQueue() {
    localStorage.setItem('queue', JSON.stringify(this.queue));
  }
}

// Zpracovat frontu při obnovení spojení
window.addEventListener('online', () => {
  queue.processQueue();
});</code></pre>

<h2 id="undo">Tlačítko Undo</h2>

<p>Zobrazit možnost vrátit akci zpět (podobně jako Gmail):</p>

<div class="live">
  <style>
    .undo-list {
      list-style: none;
      padding: 0;
      margin: 1em 0;
    }

    .undo-item {
      display: flex;
      align-items: center;
      gap: 0.75em;
      padding: 0.75em 1em;
      margin: 0.5em 0;
      background: #f5f5f5;
      border-radius: 6px;
    }

    .undo-snackbar {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #323232;
      color: white;
      padding: 1em 1.5em;
      border-radius: 4px;
      display: flex;
      gap: 1em;
      align-items: center;
      transition: transform 0.3s;
      z-index: 1000;
    }

    .undo-snackbar.show {
      transform: translateX(-50%) translateY(0);
    }

    .undo-btn {
      background: #DA3F94;
      color: white;
      border: none;
      padding: 0.5em 1em;
      border-radius: 4px;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.875em;
    }
  </style>

  <ul class="undo-list" id="undo-list">
    <li class="undo-item" data-id="1">
      <span>Položka 1</span>
      <button class="opt-btn-delete" onclick="deleteWithUndo(1, 'Položka 1')">Smazat</button>
    </li>
    <li class="undo-item" data-id="2">
      <span>Položka 2</span>
      <button class="opt-btn-delete" onclick="deleteWithUndo(2, 'Položka 2')">Smazat</button>
    </li>
    <li class="undo-item" data-id="3">
      <span>Položka 3</span>
      <button class="opt-btn-delete" onclick="deleteWithUndo(3, 'Položka 3')">Smazat</button>
    </li>
  </ul>

  <div class="undo-snackbar" id="undo-snackbar">
    <span id="undo-text"></span>
    <button class="undo-btn" onclick="undoDelete()">Vrátit zpět</button>
  </div>

  <script>
    let undoTimeout;
    let lastDeleted = null;

    function deleteWithUndo(id, text) {
      const item = document.querySelector(`#undo-list [data-id="${id}"]`);
      const snackbar = document.getElementById('undo-snackbar');
      const undoText = document.getElementById('undo-text');

      // Zrušit předchozí timeout
      if (undoTimeout) {
        clearTimeout(undoTimeout);
      }

      // Uložit pro undo
      lastDeleted = {
        id,
        html: item.outerHTML,
        nextSibling: item.nextElementSibling
      };

      // Odebrat z UI
      item.remove();

      // Zobrazit snackbar
      undoText.textContent = `${text} smazána`;
      snackbar.classList.add('show');

      // Po 5 sekundách potvrdit smazání
      undoTimeout = setTimeout(() => {
        snackbar.classList.remove('show');
        // Zde by se volalo API
        console.log('Definitivně smazáno:', id);
        lastDeleted = null;
      }, 5000);
    }

    function undoDelete() {
      if (!lastDeleted) return;

      const list = document.getElementById('undo-list');
      const snackbar = document.getElementById('undo-snackbar');

      // Vrátit zpět
      if (lastDeleted.nextSibling) {
        list.insertBefore(
          document.createRange().createContextualFragment(lastDeleted.html).firstElementChild,
          lastDeleted.nextSibling
        );
      } else {
        list.insertAdjacentHTML('beforeend', lastDeleted.html);
      }

      // Skrýt snackbar
      snackbar.classList.remove('show');
      clearTimeout(undoTimeout);
      lastDeleted = null;
    }
  </script>
</div>

<h2 id="kdy-pouzit">Kdy použít optimistické mazání</h2>

<ul>
  <li><b>Vysoká spolehlivost</b> — server smazání téměř vždy potvrdí (99 %+)</li>
  <li><b>Rychlá odezva důležitá</b> — seznamy úkolů, komentáře, příspěvky</li>
  <li><b>Vratné akce</b> — mazání není destruktivní (lze obnovit ze zálohy)</li>
  <li><b>Nízké risiko</b> — chyba nepoškodí data nebo nepřinese ztrátu</li>
</ul>

<h2 id="kdy-nepouzit">Kdy nepoužívat</h2>

<ul>
  <li><b>Finanční transakce</b> — platby, převody (vyžadují potvrzení serveru)</li>
  <li><b>Kritická data</b> — nenávratné smazání důležitých záznamů</li>
  <li><b>Složité validace</b> — server může smazání zamítnout z mnoha důvodů</li>
  <li><b>Pomalé spojení</b> — uživatel může odejít před odesláním požadavku</li>
</ul>

<h2 id="tipy">Tipy pro implementaci</h2>

<ul>
  <li><b>Uložte původní stav</b> — abyste mohli vrátit změny při chybě</li>
  <li><b>Animujte změny</b> — plynulý přechod je příjemnější než okamžité zmizení</li>
  <li><b>Dejte uživateli zpětnou vazbu</b> — pokud selže, jasně to oznámte</li>
  <li><b>Nabídněte undo</b> — jako Gmail snackbar s tlačítkem „Vrátit zpět"</li>
  <li><b>Počítejte s offline režimem</b> — ukládejte operace do fronty</li>
  <li><b>Řešte souběžnost</b> — co když uživatel klikne vícekrát rychle za sebou?</li>
</ul>

<h2 id="srovnani">Srovnání přístupů</h2>

<table>
  <tr>
    <th></th>
    <th>Klasické mazání</th>
    <th>Optimistické mazání</th>
  </tr>
  <tr>
    <td>Rychlost UI</td>
    <td>Čeká na server (200–500 ms)</td>
    <td>Okamžitá odezva</td>
  </tr>
  <tr>
    <td>Konsistence</td>
    <td>100 % — zobrazí jen potvrzený stav</td>
    <td>~99 % — může se vrátit zpět</td>
  </tr>
  <tr>
    <td>Složitost</td>
    <td>Jednoduchá implementace</td>
    <td>Vyžaduje rollback logiku</td>
  </tr>
  <tr>
    <td>UX</td>
    <td>Pomalejší pocit</td>
    <td>Rychlejší pocit</td>
  </tr>
  <tr>
    <td>Použití</td>
    <td>Kritické operace</td>
    <td>Běžné akce s nízkou chybovostí</td>
  </tr>
</table>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://react.dev/reference/react/useOptimistic">React: useOptimistic hook</a></li>
  <li><a href="https://www.patterns.dev/react/optimistic-ui">Patterns.dev: Optimistic UI</a></li>
</ul>
