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

<p>Pro aplikace s hodně API voláním je nejlepší použít <a href="/tanstack-query">TanStack Query</a>, která má vestavěnou podporu pro optimistické aktualisace:</p>

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
      queryClient.setQueryData(['todos'], context.previousTodos);
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

<h2 id="strategie-undo">Strategie pro implementaci undo</h2>

<p>Při implementaci undo máte <b>tři hlavní možnosti</b>, jak řešit načasování skutečného smazání:</p>

<h3>1. Soft delete (doporučeno)</h3>

<p>Položku <b>neodstraníte ze stavu</b>, jen ji označíte jako smazanou:</p>

<pre><code>async function deleteItem(id) {
  // Označit jako smazanou (zůstává v datech)
  setItems(items.map(item =>
    item.id === id ? { ...item, deleted: true } : item
  ));

  // Zobrazit undo snackbar
  showUndoSnackbar(id);

  // Počkat 5 sekund na případný undo
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Pokud nebyl undo, teprve teď skutečně smazat
  const item = items.find(i => i.id === id);
  if (item?.deleted) {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    // Odebrat z UI definitivně
    setItems(items => items.filter(i => i.id !== id));
  }
}

function undo(id) {
  // Jen zrušit flag deleted
  setItems(items.map(item =>
    item.id === id ? { ...item, deleted: false } : item
  ));
  hideUndoSnackbar();
}</code></pre>

<p><b>CSS pro visualisaci smazaného stavu:</b></p>

<pre><code>.item {
  transition: opacity 0.3s, transform 0.3s;
}

.item.deleted {
  opacity: 0;
  transform: translateX(-20px);
  pointer-events: none;
}

/* Nebo s vyblednutím místo zmizení */
.item.deleted {
  opacity: 0.5;
  text-decoration: line-through;
  pointer-events: none;
}</code></pre>

<p><b>Výhody soft delete:</b></p>
<ul>
  <li>Jednoduchá implementace (jen boolean flag)</li>
  <li>Zachováte posici v seznamu</li>
  <li>Snadná synchronisace se serverem</li>
  <li>Můžete zobrazit „šedý“ stav místo úplného zmizení</li>
  <li>Server může implementovat „koš“ (trash bin)</li>
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

    .soft-delete-item.deleted {
      opacity: 0.5;
      text-decoration: line-through;
      pointer-events: none;
      background: #ffe0e0;
    }

    .soft-delete-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5em 0.75em;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875em;
      margin-left: auto;
    }

    .soft-delete-btn:hover {
      background: #c0392b;
    }

    .soft-delete-status {
      font-size: 0.875em;
      color: #666;
      font-style: italic;
    }
  </style>

  <p><b>Ukázka soft delete:</b> Položka zůstává v DOM, pouze se označí jako smazaná.</p>

  <ul class="soft-delete-demo" id="soft-delete-list">
    <li class="soft-delete-item" data-id="1">
      <span>Úkol A</span>
      <span class="soft-delete-status"></span>
      <button class="soft-delete-btn opt-btn-delete" onclick="softDeleteDemo(1)">Smazat</button>
    </li>
    <li class="soft-delete-item" data-id="2">
      <span>Úkol B</span>
      <span class="soft-delete-status"></span>
      <button class="soft-delete-btn opt-btn-delete" onclick="softDeleteDemo(2)">Smazat</button>
    </li>
    <li class="soft-delete-item" data-id="3">
      <span>Úkol C</span>
      <span class="soft-delete-status"></span>
      <button class="soft-delete-btn opt-btn-delete" onclick="softDeleteDemo(3)">Smazat</button>
    </li>
  </ul>

  <script>
    (function() {
      window.softDeleteDemo = function(id) {
        const item = document.querySelector(`#soft-delete-list [data-id="${id}"]`);
        const status = item.querySelector('.soft-delete-status');

        // Soft delete - přidat třídu
        item.classList.add('deleted');
        status.textContent = '(označeno jako smazané)';

        // Po 3 sekundách obnovit
        setTimeout(() => {
          item.classList.remove('deleted');
          status.textContent = '';
        }, 3000);
      };
    })();
  </script>
</div>

<h3>2. Skutečné odstranění s rollbackem</h3>

<p>Položku <b>opravdu smažete</b> z UI a při undo ji vrátíte zpět:</p>

<pre><code>const undoStack = new Map();

async function deleteItem(id) {
  const index = items.findIndex(item => item.id === id);
  const item = items[index];

  // Uložit pro případný undo
  undoStack.set(id, { item, index });

  // Odebrat z UI
  setItems(items.filter(i => i.id !== id));

  // Zobrazit undo
  showUndoSnackbar(id);

  // Po 5 sekundách potvrdit smazání
  setTimeout(async () => {
    if (undoStack.has(id)) {
      // Volat API
      await fetch(`/api/items/${id}`, { method: 'DELETE' });
      undoStack.delete(id);
    }
  }, 5000);
}

function undo(id) {
  const saved = undoStack.get(id);
  if (!saved) return;

  // Vložit zpět na původní posici
  setItems(items => {
    const copy = [...items];
    copy.splice(saved.index, 0, saved.item);
    return copy;
  });

  undoStack.delete(id);
  hideUndoSnackbar();
}</code></pre>

<p><b>Nevýhody:</b></p>
<ul>
  <li>Složitější (musíte pamatovat posici)</li>
  <li>Může se změnit pořadí, pokud se seznam mezitím aktualisuje</li>
  <li>Animace návratu je náročnější</li>
</ul>

<div class="live">
  <style>
    .hard-delete-demo {
      list-style: none;
      padding: 0;
      margin: 1em 0;
    }

    .hard-delete-item {
      display: flex;
      align-items: center;
      gap: 0.75em;
      padding: 0.75em 1em;
      margin: 0.5em 0;
      background: #f5f5f5;
      border-radius: 6px;
      transition: opacity 0.3s, transform 0.3s;
    }

    .hard-delete-item.removing {
      opacity: 0;
      transform: translateX(-30px);
    }

    .hard-delete-item.restoring {
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .hard-delete-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5em 0.75em;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875em;
      margin-left: auto;
    }

    .hard-delete-msg {
      padding: 0.5em 1em;
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      margin: 0.5em 0;
      border-radius: 4px;
      font-size: 0.875em;
      display: none;
    }

    .hard-delete-msg.show {
      display: block;
    }
  </style>

  <p><b>Ukázka hard delete:</b> Položka se skutečně odebere z DOM a po 3 sekundách se vrátí zpět.</p>

  <ul class="hard-delete-demo" id="hard-delete-list">
    <li class="hard-delete-item" data-id="1">
      <span>Položka X</span>
      <button class="hard-delete-btn opt-btn-delete" onclick="hardDeleteDemo(1)">Smazat</button>
    </li>
    <li class="hard-delete-item" data-id="2">
      <span>Položka Y</span>
      <button class="hard-delete-btn opt-btn-delete" onclick="hardDeleteDemo(2)">Smazat</button>
    </li>
    <li class="hard-delete-item" data-id="3">
      <span>Položka Z</span>
      <button class="hard-delete-btn opt-btn-delete" onclick="hardDeleteDemo(3)">Smazat</button>
    </li>
  </ul>

  <div class="hard-delete-msg" id="hard-delete-msg">
    Položka odstraněna z DOM
  </div>

  <script>
    (function() {
      const hardDeleteStack = new Map();

      window.hardDeleteDemo = async function(id) {
        const item = document.querySelector(`#hard-delete-list [data-id="${id}"]`);
        const list = document.getElementById('hard-delete-list');
        const msg = document.getElementById('hard-delete-msg');

        // Uložit pro rollback
        const index = Array.from(list.children).indexOf(item);
        hardDeleteStack.set(id, {
          html: item.outerHTML,
          index: index
        });

        // Animace zmizení
        item.classList.add('removing');
        await new Promise(resolve => setTimeout(resolve, 300));

        // Skutečné odstranění z DOM
        item.remove();
        msg.classList.add('show');

        // Po 3 sekundách vrátit zpět
        setTimeout(() => {
          const saved = hardDeleteStack.get(id);
          if (!saved) return;

          const children = Array.from(list.children);
          const fragment = document.createRange().createContextualFragment(saved.html);
          const newItem = fragment.firstElementChild;

          if (saved.index >= children.length) {
            list.appendChild(newItem);
          } else {
            list.insertBefore(newItem, children[saved.index]);
          }

          newItem.classList.add('restoring');
          setTimeout(() => newItem.classList.remove('restoring'), 300);

          msg.classList.remove('show');
          hardDeleteStack.delete(id);
        }, 3000);
      };
    })();
  </script>
</div>

<h3>3. Hybridní přístup</h3>

<p>Visuálně zmizí, ale data zůstávají - nejlepší z obou světů:</p>

<pre><code>const [items, setItems] = useState([...]);
const [deletingIds, setDeletingIds] = useState(new Set());

async function deleteItem(id) {
  // 1. Označit pro animaci zmizení
  setDeletingIds(prev => new Set(prev).add(id));

  // 2. Počkat na animaci (200ms)
  await new Promise(resolve => setTimeout(resolve, 200));

  // 3. Soft delete (zůstává v datech)
  setItems(items => items.map(item =>
    item.id === id ? { ...item, deleted: true } : item
  ));

  // 4. Odebrat z animujících
  setDeletingIds(prev => {
    const next = new Set(prev);
    next.delete(id);
    return next;
  });

  // 5. Zobrazit undo
  showUndoSnackbar(id);

  // 6. Po 5 sekundách skutečně smazat
  setTimeout(async () => {
    const item = items.find(i => i.id === id);
    if (item?.deleted) {
      await fetch(`/api/items/${id}`, { method: 'DELETE' });
      setItems(items => items.filter(i => i.id !== id));
    }
  }, 5000);
}

function undo(id) {
  // Jen zrušit deleted flag
  setItems(items => items.map(item =>
    item.id === id ? { ...item, deleted: false } : item
  ));
  hideUndoSnackbar();
}

// Render - filtrovat smazané a animovat mizející
return items
  .filter(item => !item.deleted)
  .map(item => (
    &lt;div className={deletingIds.has(item.id) ? 'removing' : ''}&gt;
      {item.text}
    &lt;/div&gt;
  ));</code></pre>

<p>Tento přístup kombinuje plynulou animaci zmizení s jednoduchostí soft delete.</p>

<div class="live">
  <style>
    .hybrid-delete-demo {
      list-style: none;
      padding: 0;
      margin: 1em 0;
    }

    .hybrid-delete-item {
      padding: 0.75em 1em;
      margin: 0.5em 0;
      background: #f5f5f5;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 0.75em;
      transition: opacity 0.3s, transform 0.3s;
    }

    .hybrid-delete-item.deleting {
      opacity: 0;
      transform: translateX(-20px) scale(0.95);
    }

    .hybrid-delete-item.deleted {
      display: none;
    }

    .hybrid-delete-item.restoring {
      animation: fadeSlideIn 0.4s ease-out;
    }

    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: scale(0.9) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .hybrid-delete-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5em 0.75em;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875em;
      margin-left: auto;
    }

    .hybrid-status {
      padding: 0.5em 1em;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin: 0.5em 0;
      border-radius: 4px;
      font-size: 0.875em;
      display: none;
    }

    .hybrid-status.show {
      display: block;
    }
  </style>

  <p><b>Ukázka hybridního přístupu:</b> Plynule zmizí, ale data zůstávají pro snadné obnovení.</p>

  <ul class="hybrid-delete-demo" id="hybrid-delete-list">
    <li class="hybrid-delete-item" data-id="1" data-deleted="false">
      <span>Hybridní úkol 1</span>
      <button class="hybrid-delete-btn opt-btn-delete" onclick="hybridDeleteDemo(1)">Smazat</button>
    </li>
    <li class="hybrid-delete-item" data-id="2" data-deleted="false">
      <span>Hybridní úkol 2</span>
      <button class="hybrid-delete-btn opt-btn-delete" onclick="hybridDeleteDemo(2)">Smazat</button>
    </li>
    <li class="hybrid-delete-item" data-id="3" data-deleted="false">
      <span>Hybridní úkol 3</span>
      <button class="hybrid-delete-btn opt-btn-delete" onclick="hybridDeleteDemo(3)">Smazat</button>
    </li>
  </ul>

  <div class="hybrid-status" id="hybrid-status">
    📊 Stav: Položka je smazaná v UI, ale stále existuje v datech. Obnoví se za 3 sekundy.
  </div>

  <script>
    (function() {
      window.hybridDeleteDemo = async function(id) {
        const item = document.querySelector(`#hybrid-delete-list [data-id="${id}"]`);
        const status = document.getElementById('hybrid-status');

        // Fáze 1: Animace zmizení
        item.classList.add('deleting');
        await new Promise(resolve => setTimeout(resolve, 300));

        // Fáze 2: Soft delete (zůstává v DOM, ale skrytý)
        item.classList.add('deleted');
        item.classList.remove('deleting');
        item.dataset.deleted = 'true';

        status.classList.add('show');

        // Fáze 3: Po 3 sekundách obnovit
        setTimeout(() => {
          if (item.dataset.deleted === 'true') {
            item.dataset.deleted = 'false';
            item.classList.remove('deleted');
            item.classList.add('restoring');

            setTimeout(() => item.classList.remove('restoring'), 400);
            status.classList.remove('show');
          }
        }, 3000);
      };
    })();
  </script>
</div>

<h3>Doporučení</h3>

<p><b>Používejte soft delete</b>, protože:</p>
<ul>
  <li>Jednodušší kód a údržba</li>
  <li>Spolehlivější - nemůžete ztratit posici</li>
  <li>Lepší pro server - můžete implementovat „koš“</li>
  <li>Snadnější debug - vidíte smazané položky v dev tools</li>
</ul>

<p><b>Skutečné odstranění</b> použijte jen když:</p>
<ul>
  <li>Položka musí okamžitě zmizet z UI</li>
  <li>Nemáte server-side „koš“</li>
  <li>Jde o dočasná data (notifikace, toasty)</li>
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

<h2 id="undo">Tlačítko Undo s soft delete</h2>

<p>Zobrazit možnost vrátit akci zpět (podobně jako Gmail). Tento příklad používá <b>soft delete</b> - položka zmizí, ale zůstává v datech:</p>

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
      transition: opacity 0.3s, transform 0.3s;
    }

    .undo-item.deleted {
      opacity: 0;
      transform: translateX(-20px);
      pointer-events: none;
    }

    .undo-item.restoring {
      opacity: 1;
      transform: translateX(0);
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
      <span>Úkol 1: Nakoupit</span>
      <button class="opt-btn-delete" onclick="deleteWithUndo(1, 'Úkol 1')">Smazat</button>
    </li>
    <li class="undo-item" data-id="2">
      <span>Úkol 2: Zavolat</span>
      <button class="opt-btn-delete" onclick="deleteWithUndo(2, 'Úkol 2')">Smazat</button>
    </li>
    <li class="undo-item" data-id="3">
      <span>Úkol 3: Napsat email</span>
      <button class="opt-btn-delete" onclick="deleteWithUndo(3, 'Úkol 3')">Smazat</button>
    </li>
  </ul>

  <div class="undo-snackbar" id="undo-snackbar">
    <span id="undo-text"></span>
    <button class="undo-btn" onclick="undoDelete()">Vrátit zpět</button>
  </div>

  <script>
    (function() {
      let undoTimeout;
      let currentDeletedId = null;

      window.deleteWithUndo = async function(id, text) {
        const item = document.querySelector(`#undo-list [data-id="${id}"]`);
        const snackbar = document.getElementById('undo-snackbar');
        const undoText = document.getElementById('undo-text');

        // Zrušit předchozí timeout
        if (undoTimeout) {
          clearTimeout(undoTimeout);
          // Pokud už bylo něco smazáno, definitivně to potvrdit
          if (currentDeletedId) {
            const prev = document.querySelector(`#undo-list [data-id="${currentDeletedId}"]`);
            if (prev) prev.remove();
          }
        }

        // Soft delete - přidat třídu (položka zůstává v DOM)
        currentDeletedId = id;
        item.classList.add('deleted');

        // Zobrazit snackbar
        undoText.textContent = `${text} smazán`;
        snackbar.classList.add('show');

        // Po 5 sekundách definitivně smazat
        undoTimeout = setTimeout(async () => {
          snackbar.classList.remove('show');

          // Zde by se volalo API
          console.log('Definitivně smazáno:', id);
          // await fetch(`/api/items/${id}`, { method: 'DELETE' });

          // Odebrat z DOM
          item.remove();
          currentDeletedId = null;
        }, 5000);
      };

      window.undoDelete = function() {
        if (!currentDeletedId) return;

        const item = document.querySelector(`#undo-list [data-id="${currentDeletedId}"]`);
        const snackbar = document.getElementById('undo-snackbar');

        // Vrátit zpět - odebrat třídu deleted
        item.classList.remove('deleted');
        item.classList.add('restoring');
        setTimeout(() => item.classList.remove('restoring'), 300);

        // Skrýt snackbar
        snackbar.classList.remove('show');
        clearTimeout(undoTimeout);
        currentDeletedId = null;
      };
    })();
  </script>
</div>

<p>Výhody tohoto přístupu:</p>
<ul>
  <li>Jednoduchá implementace - jen přidání/odebrání CSS třídy</li>
  <li>Položka zachovává svou posici v seznamu</li>
  <li>Plynulá animace při obnovení</li>
  <li>Můžete smazat další položku, zatímco čekáte na timeout předchozí</li>
</ul>

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

