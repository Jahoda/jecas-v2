---
title: "Optimistické mazání"
headline: "Optimistické mazání"
description: "Jak implementovat okamžitou reakci na uživatelské akce s optimistickým mazáním. UI vzor pro rychlejší aplikace."
date: "2026-01-23"
last_modification: "2026-01-23"
status: 1
tags: ["js", "ux", "napady"]
format: "html"
---

<p>Optimistické mazání je <b>UX vzor</b>, kde aplikace okamžitě reaguje na akci uživatele (například smazání položky) a teprve poté ji posílá na server. Pokud server vrátí chybu, změna se vrátí zpět. Výsledkem je <b>rychlejší pocit aplikace</b> bez čekání na odpověď ze serveru.</p>

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
  <li>Uživatel čeká 200–500 ms (nebo déle při pomalém spojení)</li>
  <li>UI „zamrzne” s loading stavem</li>
  <li>Pocit pomalé aplikace, i když server reaguje rychle</li>
</ul>

<h2 id="reseni">Řešení: optimistický přístup</h2>

<p>Optimistické mazání <b>nejdřív aktualisuje UI</b> a pak teprve volá server:</p>

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

<p>Uživatel vidí <b>okamžitou reakci</b>. Ve většině případů server smazání potvrdí a uživatel si ani nevšimne čekání. Pokud selže, položka se vrátí zpět.</p>

<h2 id="tanstack-query">Optimistické aktualisace s TanStack Query</h2>

<p>Pro aplikace s hodně API voláním je nejlepší použít <a href="/tanstack-query">TanStack Query</a>, která má vestavěnou podporu pro optimistické aktualisace:</p>

<pre><code>import { useMutation, useQueryClient } from '@tanstack/react-query';

function TodoList() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => fetch(`/api/items/${id}`, { method: 'DELETE' }),

    // Optimistická aktualisace
    onMutate: async (id) => {
      // Zrušit probíhající query
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Uložit předchozí stav
      const previousTodos = queryClient.getQueryData(['todos']);

      // Optimisticky aktualisovat cache
      queryClient.setQueryData(['todos'], (old) =>
        old?.filter((todo) => todo.id !== id)
      );

      // Vrátit kontext pro rollback
      return { previousTodos };
    },

    // Při chybě vrátit zpět
    onError: (err, id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },

    // Vždy invalidovat query po dokončení
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    &lt;button onClick={() => deleteMutation.mutate(todoId)}&gt;
      Smazat
    &lt;/button&gt;
  );
}</code></pre>

<p><b>Výhody TanStack Query:</b></p>
<ul>
  <li>Vestavěná podpora pro optimistické aktualisace</li>
  <li>Automatické zrušení probíhajících dotazů</li>
  <li>Rollback při chybě serveru</li>
  <li>Synchronisace cache napříč aplikací</li>
  <li>Podpora pro offline režim</li>
</ul>

<p>Více informací v článku <a href="/tanstack-query">TanStack Query</a>.</p>

<h2 id="strategie-undo">Jak řešit undo po smazání z UI</h2>

<p>Položka <b>okamžitě zmizí z UI</b> (optimistický přístup), ale co s požadavkem na server? Máte <b>tři hlavní možnosti</b>:</p>

<h3>1. Okamžité smazání + undo vytvoří znovu</h3>

<p>Pošlete DELETE požadavek na server <b>ihned</b>, ale zobrazíte toast s tlačítkem „Vrátit zpět”. Pokud uživatel klikne na undo, <b>vytvoříte položku znovu</b> pomocí POST/PUT požadavku.</p>

<pre><code>const undoStack = new Map();

async function deleteItem(id, item) {
  // 1. Okamžitě odebrat z UI
  setItems(items => items.filter(i => i.id !== id));

  // 2. Uložit pro případný undo
  undoStack.set(id, item);

  // 3. Zobrazit undo toast
  showUndoToast(id);

  // 4. Ihned smazat na serveru
  try {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
  } catch (error) {
    // Při chybě vrátit zpět
    setItems(items => [...items, item]);
    undoStack.delete(id);
    showError('Nepodařilo se smazat');
  }
}

async function undo(id) {
  const item = undoStack.get(id);
  if (!item) return;

  // Znovu vytvořit na serveru
  try {
    await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(item)
    });
    
    // Vrátit do UI
    setItems(items => [...items, item]);
    undoStack.delete(id);
    hideUndoToast();
  } catch (error) {
    showError('Nepodařilo se obnovit');
  }
}</code></pre>

<p><b>Výhody:</b></p>
<ul>
  <li>Server okamžitě ví o smazání - konsistentní stav</li>
  <li>Jednoduchá implementace - žádné timeouty</li>
  <li>Funguje dobře i při zavření aplikace - smazání proběhlo</li>
</ul>

<p><b>Nevýhody:</b></p>
<ul>
  <li>Undo je složitější - musíte znovu vytvořit položku</li>
  <li>Potřebujete endpoint pro vytvoření (může mít nové ID)</li>
  <li>Dvě API volání při undo (DELETE + POST)</li>
  <li>Pokud se změní ID, musíte aktualisovat reference</li>
</ul>

<div class="live">
  <style>
    .immediate-delete-demo {
      list-style: none;
      padding: 0;
      margin: 1em 0;
    }

    .immediate-delete-item {
      display: flex;
      align-items: center;
      gap: 0.75em;
      padding: 0.75em 1em;
      margin: 0.5em 0;
      background: #f5f5f5;
      border-radius: 6px;
      transition: opacity 0.3s, transform 0.3s;
    }

    .immediate-delete-item.removing {
      opacity: 0;
      transform: translateX(-20px);
    }

    .immediate-toast {
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

    .immediate-toast.show {
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

    .opt-btn-delete {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5em 0.75em;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875em;
      margin-left: auto;
    }
  </style>

  <p><b>Ukázka přístupu 1:</b> Smazání probíhá ihned, undo znovu vytvoří položku.</p>

  <ul class="immediate-delete-demo" id="immediate-list">
    <li class="immediate-delete-item" data-id="1">
      <span>Položka A</span>
      <button class="opt-btn-delete" onclick="immediateDeleteDemo(1, 'Položka A')">Smazat</button>
    </li>
    <li class="immediate-delete-item" data-id="2">
      <span>Položka B</span>
      <button class="opt-btn-delete" onclick="immediateDeleteDemo(2, 'Položka B')">Smazat</button>
    </li>
    <li class="immediate-delete-item" data-id="3">
      <span>Položka C</span>
      <button class="opt-btn-delete" onclick="immediateDeleteDemo(3, 'Položka C')">Smazat</button>
    </li>
  </ul>

  <div class="immediate-toast" id="immediate-toast">
    <span id="immediate-text"></span>
    <button class="undo-btn" onclick="immediateUndo()">Vrátit zpět</button>
  </div>

  <script>
    (function() {
      const undoStack = new Map();
      let currentId = null;

      window.immediateDeleteDemo = async function(id, text) {
        const item = document.querySelector(`#immediate-list [data-id="${id}"]`);
        const toast = document.getElementById('immediate-toast');
        const toastText = document.getElementById('immediate-text');

        // Uložit pro undo
        undoStack.set(id, { id, text, element: item.cloneNode(true) });
        currentId = id;

        // Okamžitě odstranit z UI
        item.classList.add('removing');
        await new Promise(resolve => setTimeout(resolve, 300));
        item.remove();

        // Zobrazit toast
        toastText.textContent = `${text} smazána (simulace DELETE)`;
        toast.classList.add('show');

        // Po 5 sekundách skrýt toast
        setTimeout(() => {
          if (currentId === id) {
            toast.classList.remove('show');
            undoStack.delete(id);
            currentId = null;
          }
        }, 5000);
      };

      window.immediateUndo = function() {
        if (!currentId) return;

        const saved = undoStack.get(currentId);
        if (!saved) return;

        // Simulace POST - znovu vytvořit
        const list = document.getElementById('immediate-list');
        const newItem = saved.element.cloneNode(true);
        list.appendChild(newItem);

        // Skrýt toast
        const toast = document.getElementById('immediate-toast');
        toast.classList.remove('show');

        undoStack.delete(currentId);
        currentId = null;
      };
    })();
  </script>
</div>

<h3>2. Odložené smazání (čekání na timeout)</h3>

<p>Zobrazíte toast „Smazáno”, ale <b>DELETE požadavek pošlete až po 5 sekundách</b>. Pokud uživatel klikne na undo, požadavek se nikdy nepošle.</p>

<pre><code>const deleteTimeouts = new Map();

async function deleteItem(id) {
  // 1. Okamžitě odebrat z UI
  setItems(items => items.filter(i => i.id !== id));

  // 2. Zobrazit undo toast
  showUndoToast(id);

  // 3. Naplánovat smazání na později
  const timeoutId = setTimeout(async () => {
    // Po 5 sekundách teprve smazat na serveru
    try {
      await fetch(`/api/items/${id}`, { method: 'DELETE' });
      deleteTimeouts.delete(id);
    } catch (error) {
      showError('Nepodařilo se smazat');
    }
  }, 5000);

  deleteTimeouts.set(id, timeoutId);
}

function undo(id) {
  // Zrušit timeout - smazání se nestane
  const timeoutId = deleteTimeouts.get(id);
  if (timeoutId) {
    clearTimeout(timeoutId);
    deleteTimeouts.delete(id);
  }

  // Vrátit do UI
  setItems(items => [...items, savedItem]);
  hideUndoToast();
}</code></pre>

<p><b>Výhody:</b></p>
<ul>
  <li>Jednoduchý undo - jen zrušíte timeout</li>
  <li>Jedno API volání (jen DELETE, žádný POST)</li>
  <li>Ušetříte síťový provoz pokud uživatel často používá undo</li>
</ul>

<p><b>Nevýhody:</b></p>
<ul>
  <li><b>Lže uživateli</b> - říkáte „smazáno”, ale ještě není</li>
  <li>Server neví o smazání - nekonsistentní stav</li>
  <li>Problém při zavření aplikace - timeout se nevykoná</li>
  <li>Složitější správa timeoutů</li>
  <li>Pokud se seznam načte znovu ze serveru, položka se vrátí</li>
</ul>

<div class="live">
  <style>
    .delayed-delete-demo {
      list-style: none;
      padding: 0;
      margin: 1em 0;
    }

    .delayed-delete-item {
      display: flex;
      align-items: center;
      gap: 0.75em;
      padding: 0.75em 1em;
      margin: 0.5em 0;
      background: #f5f5f5;
      border-radius: 6px;
      transition: opacity 0.3s, transform 0.3s;
    }

    .delayed-delete-item.removing {
      opacity: 0;
      transform: translateX(-20px);
    }

    .delayed-toast {
      position: fixed;
      bottom: 80px;
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

    .delayed-toast.show {
      transform: translateX(-50%) translateY(0);
    }

    .delayed-toast small {
      display: block;
      opacity: 0.7;
      font-size: 0.85em;
    }
  </style>

  <p><b>Ukázka přístupu 2:</b> Smazání se odloží o 5 sekund, undo zruší timeout.</p>

  <ul class="delayed-delete-demo" id="delayed-list">
    <li class="delayed-delete-item" data-id="1">
      <span>Úkol X</span>
      <button class="opt-btn-delete" onclick="delayedDeleteDemo(1, 'Úkol X')">Smazat</button>
    </li>
    <li class="delayed-delete-item" data-id="2">
      <span>Úkol Y</span>
      <button class="opt-btn-delete" onclick="delayedDeleteDemo(2, 'Úkol Y')">Smazat</button>
    </li>
    <li class="delayed-delete-item" data-id="3">
      <span>Úkol Z</span>
      <button class="opt-btn-delete" onclick="delayedDeleteDemo(3, 'Úkol Z')">Smazat</button>
    </li>
  </ul>

  <div class="delayed-toast" id="delayed-toast">
    <div>
      <span id="delayed-text"></span>
      <small>DELETE se pošle za <span id="delayed-countdown">5</span>s</small>
    </div>
    <button class="undo-btn" onclick="delayedUndo()">Vrátit zpět</button>
  </div>

  <script>
    (function() {
      const deleteTimeouts = new Map();
      const savedItems = new Map();
      let currentId = null;
      let countdownInterval = null;

      window.delayedDeleteDemo = async function(id, text) {
        const item = document.querySelector(`#delayed-list [data-id="${id}"]`);
        const toast = document.getElementById('delayed-toast');
        const toastText = document.getElementById('delayed-text');
        const countdown = document.getElementById('delayed-countdown');

        // Uložit pro undo
        savedItems.set(id, { id, text, element: item.cloneNode(true) });
        currentId = id;

        // Okamžitě odstranit z UI
        item.classList.add('removing');
        await new Promise(resolve => setTimeout(resolve, 300));
        item.remove();

        // Zobrazit toast
        toastText.textContent = `${text} smazán`;
        toast.classList.add('show');

        // Countdown
        let remaining = 5;
        countdown.textContent = remaining;
        
        if (countdownInterval) clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
          remaining--;
          countdown.textContent = remaining;
          if (remaining <= 0) {
            clearInterval(countdownInterval);
          }
        }, 1000);

        // Naplánovat smazání
        const timeoutId = setTimeout(() => {
          toast.classList.remove('show');
          deleteTimeouts.delete(id);
          savedItems.delete(id);
          currentId = null;
          clearInterval(countdownInterval);
          console.log('DELETE požadavek odeslán na server');
        }, 5000);

        deleteTimeouts.set(id, timeoutId);
      };

      window.delayedUndo = function() {
        if (!currentId) return;

        // Zrušit timeout
        const timeoutId = deleteTimeouts.get(currentId);
        if (timeoutId) {
          clearTimeout(timeoutId);
          deleteTimeouts.delete(currentId);
        }

        if (countdownInterval) {
          clearInterval(countdownInterval);
        }

        // Vrátit položku
        const saved = savedItems.get(currentId);
        if (saved) {
          const list = document.getElementById('delayed-list');
          const newItem = saved.element.cloneNode(true);
          list.appendChild(newItem);
          savedItems.delete(currentId);
        }

        // Skrýt toast
        const toast = document.getElementById('delayed-toast');
        toast.classList.remove('show');
        currentId = null;
      };
    })();
  </script>
</div>

<h3>3. Soft delete na backendu</h3>

<p>Pošlete DELETE požadavek <b>ihned</b>, ale backend neodstraní položku, jen ji označí jako smazanou (např. <code>deleted_at</code>). Undo pak pošle požadavek, který soft delete zruší.</p>

<pre><code>async function deleteItem(id) {
  // 1. Okamžitě odebrat z UI
  setItems(items => items.filter(i => i.id !== id));

  // 2. Soft delete na serveru (ihned)
  try {
    await fetch(`/api/items/${id}`, { 
      method: 'DELETE',
      headers: { 'X-Soft-Delete': 'true' }
    });

    // 3. Zobrazit undo toast
    showUndoToast(id);
  } catch (error) {
    // Při chybě vrátit zpět
    setItems(items => [...items, item]);
    showError('Nepodařilo se smazat');
  }
}

async function undo(id) {
  // Zrušit soft delete na serveru
  try {
    await fetch(`/api/items/${id}/restore`, { 
      method: 'POST' 
    });

    // Načíst znovu ze serveru
    const response = await fetch(`/api/items/${id}`);
    const item = await response.json();
    
    // Vrátit do UI
    setItems(items => [...items, item]);
    hideUndoToast();
  } catch (error) {
    showError('Nepodařilo se obnovit');
  }
}</code></pre>

<p><b>Výhody:</b></p>
<ul>
  <li>Server okamžitě ví o smazání - konsistentní stav</li>
  <li>Undo je jednoduché - jen odvolání soft deletu</li>
  <li>Položka zachovává stejné ID</li>
  <li>Můžete implementovat „koš” na serveru</li>
  <li>Funguje i při zavření aplikace</li>
  <li>Audit trail - vidíte historii smazání</li>
</ul>

<p><b>Nevýhody:</b></p>
<ul>
  <li>Vyžaduje změnu na backendu (soft delete)</li>
  <li>Potřebujete endpoint pro restore</li>
  <li>Dvě API volání při undo (DELETE + POST restore)</li>
  <li>Složitější databázové query (musíte filtrovat <code>deleted_at IS NULL</code>)</li>
</ul>

<div class="live">
  <style>
    .soft-delete-demo {
      list-style: none;
      padding: 0;
      margin: 1em 0;
    }

    .soft-delete-item {
      display: flex;
      align-items: center;
      gap: 0.75em;
      padding: 0.75em 1em;
      margin: 0.5em 0;
      background: #f5f5f5;
      border-radius: 6px;
      transition: opacity 0.3s, transform 0.3s;
    }

    .soft-delete-item.removing {
      opacity: 0;
      transform: translateX(-20px);
    }

    .soft-toast {
      position: fixed;
      bottom: 140px;
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

    .soft-toast.show {
      transform: translateX(-50%) translateY(0);
    }

    .soft-toast small {
      display: block;
      opacity: 0.7;
      font-size: 0.85em;
    }
  </style>

  <p><b>Ukázka přístupu 3:</b> Soft delete na serveru, undo odvolá smazání.</p>

  <ul class="soft-delete-demo" id="soft-list">
    <li class="soft-delete-item" data-id="1">
      <span>Email 1</span>
      <button class="opt-btn-delete" onclick="softDeleteDemo(1, 'Email 1')">Smazat</button>
    </li>
    <li class="soft-delete-item" data-id="2">
      <span>Email 2</span>
      <button class="opt-btn-delete" onclick="softDeleteDemo(2, 'Email 2')">Smazat</button>
    </li>
    <li class="soft-delete-item" data-id="3">
      <span>Email 3</span>
      <button class="opt-btn-delete" onclick="softDeleteDemo(3, 'Email 3')">Smazat</button>
    </li>
  </ul>

  <div class="soft-toast" id="soft-toast">
    <div>
      <span id="soft-text"></span>
      <small>Soft delete na serveru (deleted_at nastaven)</small>
    </div>
    <button class="undo-btn" onclick="softUndo()">Vrátit zpět</button>
  </div>

  <script>
    (function() {
      const savedItems = new Map();
      let currentId = null;

      window.softDeleteDemo = async function(id, text) {
        const item = document.querySelector(`#soft-list [data-id="${id}"]`);
        const toast = document.getElementById('soft-toast');
        const toastText = document.getElementById('soft-text');

        // Uložit pro undo
        savedItems.set(id, { id, text, element: item.cloneNode(true) });
        currentId = id;

        // Okamžitě odstranit z UI
        item.classList.add('removing');
        await new Promise(resolve => setTimeout(resolve, 300));
        item.remove();

        // Zobrazit toast
        toastText.textContent = `${text} smazán`;
        toast.classList.add('show');

        console.log('Soft DELETE požadavek odeslán ihned');

        // Po 5 sekundách skrýt toast
        setTimeout(() => {
          if (currentId === id) {
            toast.classList.remove('show');
            savedItems.delete(id);
            currentId = null;
          }
        }, 5000);
      };

      window.softUndo = function() {
        if (!currentId) return;

        // Simulace POST /restore
        console.log('POST /restore požadavek odeslán');

        const saved = savedItems.get(currentId);
        if (saved) {
          const list = document.getElementById('soft-list');
          const newItem = saved.element.cloneNode(true);
          list.appendChild(newItem);
          savedItems.delete(currentId);
        }

        // Skrýt toast
        const toast = document.getElementById('soft-toast');
        toast.classList.remove('show');
        currentId = null;
      };
    })();
  </script>
</div>

<h3>Doporučení</h3>

<p><b>Používejte soft delete na backendu (přístup 3)</b>, protože:</p>
<ul>
  <li>Nejlepší ze všech světů - okamžitá konsistence + jednoduché undo</li>
  <li>Server má vždy aktuální stav</li>
  <li>Můžete implementovat automatické čištění po X dnech</li>
  <li>Audit trail zdarma</li>
</ul>

<p><b>Odložené smazání (přístup 2)</b> použijte jen když:</p>
<ul>
  <li>Nemůžete změnit backend</li>
  <li>Ušetření síťového provozu je kritické</li>
  <li>Uživatelé často používají undo</li>
</ul>

<p><b>Okamžité smazání + undo vytvoří znovu (přístup 1)</b> je vhodný když:</p>
<ul>
  <li>Nemůžete implementovat soft delete</li>
  <li>Nemůžete implementovat restore endpoint</li>
  <li>Undo je vzácné</li>
</ul>


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

<h2 id="kdy-pouzit">Kdy použít optimistické mazání</h2>

<ul>
  <li><b>Vysoká spolehlivost</b> — server smazání téměř vždy potvrdí (99 %+)</li>
  <li><b>Rychlá odezva důležitá</b> — seznamy úkolů, komentáře, příspěvky</li>
  <li><b>Vratné akce</b> — mazání není destruktivní (lze obnovit ze zálohy)</li>
  <li><b>Nízké risiko</b> — chyba nepoškodí data nebo nepřinese ztrátu</li>
</ul>

<h2 id="kdy-nepouzit">Kdy nepoužívat</h2>

<ul>
  <li><b>Finanční transakce</b> — platby, převody (vyžadují potvrzení serveru)</li>
  <li><b>Kritická data</b> — nenávratné smazání důležitých záznamů</li>
  <li><b>Složité validace</b> — server může smazání zamítnout z mnoha důvodů</li>
  <li><b>Pomalé spojení</b> — uživatel může odejít před odesláním požadavku</li>
</ul>

<h2 id="tipy">Tipy pro implementaci</h2>

<ul>
  <li><b>Preferujte soft delete</b> — označte položku jako smazanou místo skutečného odstranění, je to jednodušší a spolehlivější</li>
  <li><b>Uložte původní stav</b> — abyste mohli vrátit změny při chybě serveru</li>
  <li><b>Animujte změny</b> — plynulý přechod je příjemnější než okamžité zmizení</li>
  <li><b>Dejte uživateli zpětnou vazbu</b> — pokud selže, jasně to oznámte</li>
  <li><b>Nabídněte undo</b> — jako Gmail snackbar s tlačítkem „Vrátit zpět” (5 sekund)</li>
  <li><b>Počítejte s offline režimem</b> — ukládejte operace do fronty v localStorage</li>
  <li><b>Řešte <a href="/race-conditions">souběžnost</a></b> — co když uživatel klikne vícekrát rychle za sebou?</li>
  <li><b>Načasujte API volání</b> — volejte server až po uplynutí undo časovače (5 s)</li>
</ul>

<h2 id="srovnani">Srovnání přístupů</h2>

<div class="live">
  <style>
    .compare-demo {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2em;
      margin: 2em 0;
    }

    .compare-column {
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      padding: 1em;
    }

    .compare-column h4 {
      margin: 0 0 1em;
      padding-bottom: 0.5em;
      border-bottom: 2px solid #e0e0e0;
    }

    .compare-list {
      list-style: none;
      padding: 0;
      margin: 1em 0;
      min-height: 180px;
    }

    .compare-item {
      padding: 0.75em 1em;
      margin: 0.5em 0;
      background: #f5f5f5;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 0.75em;
      transition: opacity 0.3s, transform 0.3s;
    }

    .compare-item.loading {
      opacity: 0.5;
      pointer-events: none;
    }

    .compare-item.removing {
      opacity: 0;
      transform: translateX(-20px);
    }

    .compare-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5em 0.75em;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875em;
      margin-left: auto;
    }

    .compare-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .compare-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #f3f3f3;
      border-top: 2px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-left: auto;
      display: none;
    }

    .compare-item.loading .compare-spinner {
      display: inline-block;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .compare-timer {
      font-size: 0.75em;
      color: #666;
      margin-top: 1em;
      text-align: center;
    }

    @media (max-width: 768px) {
      .compare-demo {
        grid-template-columns: 1fr;
      }
    }
  </style>

  <p><b>Interaktivní srovnání:</b> Zkuste smazat položku v obou seznamech a porovnejte dobu odezvy.</p>

  <div class="compare-demo">
    <div class="compare-column">
      <h4>⏱️ Klasické mazání</h4>
      <p style="font-size: 0.875em; color: #666;">Čeká na server (simulováno 500ms)</p>
      <ul class="compare-list" id="classic-list">
        <li class="compare-item" data-id="1">
          <span>Úkol 1</span>
          <button class="compare-btn opt-btn-delete" onclick="classicDelete(1)">Smazat</button>
          <div class="compare-spinner"></div>
        </li>
        <li class="compare-item" data-id="2">
          <span>Úkol 2</span>
          <button class="compare-btn opt-btn-delete" onclick="classicDelete(2)">Smazat</button>
          <div class="compare-spinner"></div>
        </li>
        <li class="compare-item" data-id="3">
          <span>Úkol 3</span>
          <button class="compare-btn opt-btn-delete" onclick="classicDelete(3)">Smazat</button>
          <div class="compare-spinner"></div>
        </li>
      </ul>
      <div class="compare-timer" id="classic-timer"></div>
    </div>

    <div class="compare-column">
      <h4>⚡ Optimistické mazání</h4>
      <p style="font-size: 0.875em; color: #666;">Okamžitá reakce</p>
      <ul class="compare-list" id="optimistic-list">
        <li class="compare-item" data-id="1">
          <span>Úkol 1</span>
          <button class="compare-btn opt-btn-delete" onclick="optimisticDeleteCompare(1)">Smazat</button>
        </li>
        <li class="compare-item" data-id="2">
          <span>Úkol 2</span>
          <button class="compare-btn opt-btn-delete" onclick="optimisticDeleteCompare(2)">Smazat</button>
        </li>
        <li class="compare-item" data-id="3">
          <span>Úkol 3</span>
          <button class="compare-btn opt-btn-delete" onclick="optimisticDeleteCompare(3)">Smazat</button>
        </li>
      </ul>
      <div class="compare-timer" id="optimistic-timer"></div>
    </div>
  </div>

  <script>
    (function() {
      window.classicDelete = async function(id) {
        const item = document.querySelector(`#classic-list [data-id="${id}"]`);
        const timer = document.getElementById('classic-timer');
        const btn = item.querySelector('button');

        const startTime = Date.now();
        btn.disabled = true;
        item.classList.add('loading');
        timer.textContent = 'Čekání na server...';

        // Simulace API volání
        await new Promise(resolve => setTimeout(resolve, 500));

        const endTime = Date.now();
        const duration = endTime - startTime;

        // Teprve teď odstranit
        item.classList.add('removing');
        await new Promise(resolve => setTimeout(resolve, 300));
        item.remove();

        timer.textContent = `✓ Smazáno za ${duration}ms`;
        setTimeout(() => timer.textContent = '', 2000);
      };

      window.optimisticDeleteCompare = async function(id) {
        const item = document.querySelector(`#optimistic-list [data-id="${id}"]`);
        const timer = document.getElementById('optimistic-timer');

        const startTime = Date.now();

        // Okamžitě odstranit
        item.classList.add('removing');
        const uiTime = Date.now() - startTime;

        await new Promise(resolve => setTimeout(resolve, 300));
        item.remove();

        timer.textContent = `⚡ UI aktualisace za ${uiTime}ms`;

        // API volání na pozadí (neblokuje UI)
        setTimeout(() => {
          timer.textContent += ' (API volání probíhá na pozadí)';
          setTimeout(() => timer.textContent = '', 2000);
        }, 100);
      };
    })();
  </script>
</div>

<table>
  <tr>
    <th></th>
    <th>Klasické mazání</th>
    <th>Optimistické mazání</th>
  </tr>
  <tr>
    <td>Rychlost UI</td>
    <td>Čeká na server (200–500 ms)</td>
    <td>Okamžitá odezva</td>
  </tr>
  <tr>
    <td>Konsistence</td>
    <td>100 % — zobrazí jen potvrzený stav</td>
    <td>~99 % — může se vrátit zpět</td>
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
    <td>Běžné akce s nízkou chybovostí</td>
  </tr>
</table>

