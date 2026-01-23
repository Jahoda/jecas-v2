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


<h3>2. Odložené smazání (čekání na timeout)</h3>

<p>Zobrazíte toast „Smazáno”, ale <b>DELETE požadavek pošlete až po 5 sekundách</b>. Pokud uživatel klikne na undo, požadavek se nikdy nepošle.</p>


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


<h3>3. Soft delete na backendu</h3>

<p>Pošlete DELETE požadavek <b>ihned</b>, ale backend neodstraní položku, jen ji označí jako smazanou (např. <code>deleted_at</code>). Undo pak pošle požadavek, který soft delete zruší.</p>


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

