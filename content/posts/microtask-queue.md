---
title: "Microtask queue v JavaScriptu"
headline: "Microtask queue v JavaScriptu"
description: "Jak funguje microtask queue, event loop a v jakém pořadí se spouští asynchronní kód v JavaScriptu."
date: "2025-12-12"
last_modification: "2025-12-12"
status: 1
tags: ["js", "async"]
format: "html"
---

<p>JavaScript je jednoduchý. Až na asynchronní kód. Ten je občas záhadný. Zejména pořadí, v jakém se jednotlivé části asynchronního kódu spouštějí.</p>

<p>Klíčem k pochopení je znalost <b>event loopu</b> a rozdíl mezi <b>task queue</b> (někdy též <i>macro task queue</i>) a <b>microtask queue</b>.</p>

<p><img src="/files/microtask-queue/event-loop.svg" alt="Diagram event loopu s microtask a task queue" class="border"></p>

<h2 id="event-loop">Event loop</h2>

<p>JavaScript v prohlížeči běží na <b>hlavním vlákně</b>, kde v daném okamžiku může probíhat jen jedna operace. I když existují <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API">Web Workers</a> pro práci na pozadí, hlavní vlákno zůstává jednovláknové.</p>

<p>Event loop je mechanismus, který umožňuje asynchronní chování JavaScriptu na hlavním vlákně. Neustále kontroluje, zda je <i>call stack</i> (zásobník volání) prázdný, a pokud ano, vezme další úlohu z fronty a provede ji.</p>

<p>Důležité je, že existují <b>dva typy front</b>:</p>

<ul>
  <li><b>Task queue</b> (macro task queue) – pro běžné asynchronní operace</li>
  <li><b>Microtask queue</b> – pro prioritní operace, které se mají provést co nejdříve</li>
</ul>


<h2 id="microtask-queue">Microtask queue</h2>

<p>Microtask queue je <b>prioritní fronta</b> pro operace, které mají být provedeny hned po dokončení aktuálně běžícího skriptu, ale ještě před tím, než prohlížeč provede další <i>rendering</i> nebo zpracuje další úlohu z <i>task queue</i>.</p>

<h3 id="co-patri">Co patří do microtask queue?</h3>

<p>Následující operace vytváří microtasky:</p>

<ul>
  <li><code>Promise.then()</code>, <code>Promise.catch()</code>, <code>Promise.finally()</code></li>
  <li><code>queueMicrotask()</code></li>
  <li><code>MutationObserver</code> callbacky</li>
  <li><code>async</code>/<code>await</code> (interně používá Promises)</li>
</ul>


<h3 id="co-patri-task">Co patří do task queue?</h3>

<p>Běžné asynchronní operace vytváří tasky (macro tasky):</p>

<ul>
  <li><code>setTimeout()</code> a <code>setInterval()</code></li>
  <li><code>setImmediate()</code> (Node.js)</li>
  <li>I/O operace</li>
  <li>UI rendering</li>
  <li>Uživatelské události (click, scroll, ...)</li>
</ul>


<h2 id="poradi">Pořadí vykonávání</h2>

<p>Event loop funguje následovně:</p>

<ol>
  <li>Provede se aktuální synchronní kód (call stack)</li>
  <li>Když je call stack prázdný, zpracují se <b>všechny</b> microtasky z microtask queue</li>
  <li>Prohlížeč může provést rendering</li>
  <li>Zpracuje se <b>jeden</b> task z task queue</li>
  <li>Celý cyklus se opakuje</li>
</ol>

<p>Klíčové je, že <b>microtasky mají prioritu</b>. Pokud se během zpracování microtasku přidá další microtask, zpracuje se ještě před tím, než se prohlížeč dostane k dalšímu tasku.</p>


<h2 id="interaktivni-demo">Interaktivní vizualizace</h2>

<p>Následující demo ukazuje, jak event loop zpracovává synchronní kód, microtasky a tasky krok za krokem:</p>

<style>
  .event-loop-demo {
    border: 2px solid #ddd;
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    font-family: system-ui, -apple-system, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    .event-loop-demo {
      background: linear-gradient(135deg, #2d3436 0%, #1e272e 100%);
      border-color: #444;
    }
    .event-loop-demo .queue-box {
      background: #34495e !important;
      border-color: #555 !important;
      color: #ecf0f1 !important;
    }
    .event-loop-demo .task-item {
      background: #2c3e50 !important;
      color: #ecf0f1 !important;
    }
    .event-loop-demo .controls button {
      background: #3498db !important;
      color: white !important;
    }
    .event-loop-demo .controls button:hover {
      background: #2980b9 !important;
    }
    .event-loop-demo .log-output {
      background: #1e272e !important;
      border-color: #444 !important;
      color: #ecf0f1 !important;
    }
  }

  .event-loop-demo .controls {
    text-align: center;
    margin-bottom: 20px;
  }

  .event-loop-demo .controls button {
    background: #3498db;
    color: white;
    border: none;
    padding: 12px 24px;
    margin: 5px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s;
  }

  .event-loop-demo .controls button:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  .event-loop-demo .controls button:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }

  .event-loop-demo .queues {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }

  .event-loop-demo .queue-box {
    background: white;
    border: 2px solid #3498db;
    border-radius: 8px;
    padding: 15px;
    min-height: 150px;
  }

  .event-loop-demo .queue-box.callstack {
    border-color: #27ae60;
  }

  .event-loop-demo .queue-box.microtask {
    border-color: #3498db;
  }

  .event-loop-demo .queue-box.task {
    border-color: #e74c3c;
  }

  .event-loop-demo .queue-title {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .event-loop-demo .callstack .queue-title { color: #27ae60; }
  .event-loop-demo .microtask .queue-title { color: #3498db; }
  .event-loop-demo .task .queue-title { color: #e74c3c; }

  .event-loop-demo .task-item {
    background: #ecf0f1;
    padding: 8px 12px;
    margin: 5px 0;
    border-radius: 4px;
    font-size: 13px;
    animation: slideIn 0.3s ease-out;
    border-left: 3px solid;
  }

  .event-loop-demo .callstack .task-item {
    border-left-color: #27ae60;
    background: #d5f4e6;
  }
  .event-loop-demo .microtask .task-item {
    border-left-color: #3498db;
    background: #d6eaf8;
  }
  .event-loop-demo .task .task-item {
    border-left-color: #e74c3c;
    background: #fadbd8;
  }

  .event-loop-demo .task-item.executing {
    animation: pulse 0.6s ease-in-out;
    font-weight: bold;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); box-shadow: 0 0 15px rgba(52, 152, 219, 0.5); }
  }

  .event-loop-demo .log-output {
    background: #2c3e50;
    color: #ecf0f1;
    padding: 15px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 15px;
    border: 2px solid #34495e;
  }

  .event-loop-demo .log-line {
    margin: 3px 0;
    padding: 2px 0;
  }

  .event-loop-demo .status {
    text-align: center;
    font-weight: bold;
    margin: 15px 0;
    padding: 10px;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 6px;
    font-size: 14px;
  }
</style>

<div class="event-loop-demo" id="eventLoopDemo">
  <div class="controls">
    <button onclick="startDemo()">▶ Spustit</button>
    <button onclick="stepDemo()">→ Krok</button>
    <button onclick="resetDemo()">↻ Reset</button>
  </div>

  <div class="status" id="status">Připraveno - klikněte na "Spustit" nebo "Krok"</div>

  <div class="queues">
    <div class="queue-box callstack">
      <div class="queue-title">Call Stack</div>
      <div id="callstack"></div>
    </div>

    <div class="queue-box microtask">
      <div class="queue-title">Microtask Queue</div>
      <div id="microtask"></div>
    </div>

    <div class="queue-box task">
      <div class="queue-title">Task Queue</div>
      <div id="taskqueue"></div>
    </div>
  </div>

  <div class="log-output" id="log"></div>
</div>

<script>
let demoState = {
  callStack: [],
  microtaskQueue: [],
  taskQueue: [],
  log: [],
  step: 0,
  isRunning: false,
  steps: []
};

function initDemo() {
  demoState.steps = [
    {
      action: 'push-stack',
      item: 'main()',
      message: '1. Spuštění main() - synchronní kód',
      queue: 'callStack'
    },
    {
      action: 'log',
      message: 'console.log("start")'
    },
    {
      action: 'push-task',
      item: 'setTimeout()',
      message: '2. setTimeout() přidán do Task Queue',
      queue: 'taskQueue'
    },
    {
      action: 'push-microtask',
      item: 'Promise.then()',
      message: '3. Promise.then() přidán do Microtask Queue',
      queue: 'microtaskQueue'
    },
    {
      action: 'push-microtask',
      item: 'queueMicrotask()',
      message: '4. queueMicrotask() přidán do Microtask Queue',
      queue: 'microtaskQueue'
    },
    {
      action: 'log',
      message: 'console.log("end")'
    },
    {
      action: 'pop-stack',
      message: '5. main() dokončen - Call Stack prázdný',
      queue: 'callStack'
    },
    {
      action: 'status',
      message: '📋 Event loop kontroluje fronty...'
    },
    {
      action: 'execute-microtask',
      message: '6. Zpracování microtasků (PRIORITA!)',
      item: 'Promise.then()'
    },
    {
      action: 'execute-microtask',
      message: '7. Zpracování dalšího microtasku',
      item: 'queueMicrotask()'
    },
    {
      action: 'status',
      message: '✅ Všechny microtasky zpracovány'
    },
    {
      action: 'status',
      message: '🎨 Prohlížeč může provést rendering...'
    },
    {
      action: 'execute-task',
      message: '8. Zpracování tasku z Task Queue',
      item: 'setTimeout()'
    },
    {
      action: 'status',
      message: '✨ Event loop dokončen! Celý cyklus se opakuje.'
    }
  ];
}

function renderQueues() {
  const callStackEl = document.getElementById('callstack');
  const microtaskEl = document.getElementById('microtask');
  const taskQueueEl = document.getElementById('taskqueue');

  callStackEl.innerHTML = demoState.callStack.length
    ? demoState.callStack.map(item => `<div class="task-item">${item}</div>`).join('')
    : '<div style="text-align: center; opacity: 0.5; padding: 20px;">prázdný</div>';

  microtaskEl.innerHTML = demoState.microtaskQueue.length
    ? demoState.microtaskQueue.map(item => `<div class="task-item">${item}</div>`).join('')
    : '<div style="text-align: center; opacity: 0.5; padding: 20px;">prázdná</div>';

  taskQueueEl.innerHTML = demoState.taskQueue.length
    ? demoState.taskQueue.map(item => `<div class="task-item">${item}</div>`).join('')
    : '<div style="text-align: center; opacity: 0.5; padding: 20px;">prázdná</div>';
}

function addLog(message) {
  demoState.log.push(message);
  const logEl = document.getElementById('log');
  logEl.innerHTML = demoState.log.map(msg =>
    `<div class="log-line">> ${msg}</div>`
  ).join('');
  logEl.scrollTop = logEl.scrollHeight;
}

function updateStatus(message) {
  document.getElementById('status').textContent = message;
}

function executeStep() {
  if (demoState.step >= demoState.steps.length) {
    updateStatus('✅ Demo dokončeno!');
    demoState.isRunning = false;
    return false;
  }

  const step = demoState.steps[demoState.step];

  switch(step.action) {
    case 'push-stack':
      demoState.callStack.push(step.item);
      break;
    case 'pop-stack':
      demoState.callStack.pop();
      break;
    case 'push-microtask':
      demoState.microtaskQueue.push(step.item);
      break;
    case 'push-task':
      demoState.taskQueue.push(step.item);
      break;
    case 'execute-microtask':
      if (demoState.microtaskQueue.length > 0) {
        demoState.microtaskQueue.shift();
        addLog(`Proveden: ${step.item}`);
      }
      break;
    case 'execute-task':
      if (demoState.taskQueue.length > 0) {
        demoState.taskQueue.shift();
        addLog(`Proveden: ${step.item}`);
      }
      break;
    case 'log':
      addLog(step.message);
      break;
    case 'status':
      // Pouze status update
      break;
  }

  if (step.message) {
    updateStatus(step.message);
  }

  renderQueues();
  demoState.step++;

  return true;
}

function stepDemo() {
  if (demoState.step === 0 || demoState.step >= demoState.steps.length) {
    initDemo();
    if (demoState.step >= demoState.steps.length) {
      resetDemo();
    }
  }
  executeStep();
}

function startDemo() {
  if (demoState.isRunning) return;

  if (demoState.step === 0 || demoState.step >= demoState.steps.length) {
    resetDemo();
  }

  demoState.isRunning = true;

  const interval = setInterval(() => {
    const shouldContinue = executeStep();
    if (!shouldContinue || !demoState.isRunning) {
      clearInterval(interval);
      demoState.isRunning = false;
    }
  }, 1200);
}

function resetDemo() {
  demoState = {
    callStack: [],
    microtaskQueue: [],
    taskQueue: [],
    log: [],
    step: 0,
    isRunning: false,
    steps: []
  };
  initDemo();
  renderQueues();
  document.getElementById('log').innerHTML = '';
  updateStatus('Připraveno - klikněte na "Spustit" nebo "Krok"');
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDemo);
} else {
  initDemo();
}
</script>

<p>Demo ukazuje typický průběh zpracování kódu s <code>setTimeout</code>, <code>Promise</code> a <code>queueMicrotask</code>. Všimněte si, že microtasky se vždy zpracují před tasky!</p>


<h2 id="priklad">Praktický příklad</h2>

<p>Následující kód ilustruje pořadí vykonávání:</p>

<pre><code>console.log('1: synchronní start');

setTimeout(() => {
  console.log('2: setTimeout (macro task)');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3: Promise 1 (microtask)');
  })
  .then(() => {
    console.log('4: Promise 2 (microtask)');
  });

queueMicrotask(() => {
  console.log('5: queueMicrotask (microtask)');
});

console.log('6: synchronní konec');
</code></pre>

<p>Výstup bude:</p>

<pre><code>1: synchronní start
6: synchronní konec
3: Promise 1 (microtask)
5: queueMicrotask (microtask)
4: Promise 2 (microtask)
2: setTimeout (macro task)
</code></pre>


<h3 id="vysvetleni">Vysvětlení pořadí</h3>

<ol>
  <li>
    <p>Nejdříve se provede veškerý <b>synchronní kód</b> (řádky 1 a 6)</p>
  </li>
  <li>
    <p>Pak se zpracují <b>všechny microtasky</b> v pořadí, v jakém byly přidány (řádky 3, 5, 4)</p>
  </li>
  <li>
    <p>Nakonec se zpracuje <b>macro task</b> z <code>setTimeout</code> (řádek 2)</p>
  </li>
</ol>


<h2 id="async-await">Async/await a microtasky</h2>

<p>Funkce označené jako <code>async</code> vždy vrací Promise. Klíčové slovo <code>await</code> pozastaví vykonávání funkce a pokračování funkce se zařadí jako microtask.</p>

<pre><code>async function asyncFunkce() {
  console.log('1: start async funkce');

  await Promise.resolve();

  console.log('2: po await (microtask)');
}

console.log('3: před voláním');
asyncFunkce();
console.log('4: po volání');
</code></pre>

<p>Výstup:</p>

<pre><code>3: před voláním
1: start async funkce
4: po volání
2: po await (microtask)
</code></pre>

<p>Kód po <code>await</code> se chová jako callback v <code>.then()</code> – je zařazen do microtask queue.</p>


<h2 id="queue-microtask">queueMicrotask()</h2>

<p>API <code>queueMicrotask()</code> umožňuje explicitně přidat callback do microtask queue:</p>

<pre><code>queueMicrotask(() => {
  console.log('Tento kód se spustí jako microtask');
});
</code></pre>

<p>Je to <b>čistší a efektivnější alternativa</b> k <code>Promise.resolve().then(...)</code>. Na rozdíl od Promise nevytváří zbytečný Promise objekt – jde přímo k věci.</p>

<pre><code>// Starý způsob - vytváří Promise objekt
Promise.resolve().then(() => {
  console.log('Microtask přes Promise');
});

// Nový způsob - přímé zařazení do fronty
queueMicrotask(() => {
  console.log('Microtask přímo');
});
</code></pre>


<h3 id="realne-pouziti">Reálné použití queueMicrotask()</h3>

<h4 id="batch-aktualizace">Batch aktualizace DOM</h4>

<p>Seskupení více DOM operací do jedné, aby se stránka překreslila jen jednou:</p>

<pre><code>let updatesPending = false;
const updates = [];

function scheduleUpdate(element, value) {
  updates.push({ element, value });

  if (!updatesPending) {
    updatesPending = true;
    queueMicrotask(() => {
      // Provede všechny aktualizace najednou
      updates.forEach(({ element, value }) => {
        element.textContent = value;
      });
      updates.length = 0;
      updatesPending = false;
    });
  }
}

// Použití - všechny tři aktualizace se provedou najednou
scheduleUpdate(div1, 'hodnota 1');
scheduleUpdate(div2, 'hodnota 2');
scheduleUpdate(div3, 'hodnota 3');
</code></pre>


<h4 id="error-handling">Zpracování chyb mimo try/catch</h4>

<p>Oddělení error handlingu od synchronního kódu:</p>

<pre><code>function asyncOperation(data) {
  if (!data) {
    queueMicrotask(() => {
      throw new Error('Data chybí');
    });
    return;
  }

  // Zpracování dat...
}

// Chyba se hodí až v microtasku,
// takže try/catch zde nechytí nic
try {
  asyncOperation(null);
} catch (e) {
  console.log('Toto se nikdy nespustí');
}

// Místo toho použij:
window.addEventListener('error', (e) => {
  console.log('Chyba zachycena:', e.message);
});
</code></pre>


<h4 id="plugin-hooks">Plugin/Hook systém</h4>

<p>Umožnění pluginům reagovat na události v dalším microtasku:</p>

<pre><code>class EventSystem {
  constructor() {
    this.hooks = [];
  }

  registerHook(fn) {
    this.hooks.push(fn);
  }

  trigger(data) {
    // Synchronní zpracování
    this.processData(data);

    // Hooks se spustí až po dokončení
    queueMicrotask(() => {
      this.hooks.forEach(hook => hook(data));
    });
  }

  processData(data) {
    console.log('Zpracování:', data);
  }
}

const events = new EventSystem();
events.registerHook(data => console.log('Hook 1:', data));
events.registerHook(data => console.log('Hook 2:', data));

events.trigger('test');
// Výstup:
// Zpracování: test
// Hook 1: test
// Hook 2: test
</code></pre>

<p>Více informací: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask">MDN - queueMicrotask()</a></p>


<h2 id="mutation-observer">MutationObserver</h2>

<p><code>MutationObserver</code> slouží k pozorování změn v DOM stromu. Jeho callbacky se spouštějí jako microtasky:</p>

<pre><code>const observer = new MutationObserver(() => {
  console.log('DOM se změnil (microtask)');
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

document.body.appendChild(document.createElement('div'));
console.log('Prvek přidán (synchronní)');
</code></pre>

<p>Výstup:</p>

<pre><code>Prvek přidán (synchronní)
DOM se změnil (microtask)
</code></pre>


<h2 id="nekonecna-smycka">Pozor na nekonečnou smyčku</h2>

<p>Protože se všechny microtasky zpracovávají před dalším taskem, může dojít k <b>zablokování event loopu</b>:</p>

<pre><code>function pridejMicrotask() {
  queueMicrotask(() => {
    console.log('Microtask');
    pridejMicrotask(); // Přidává další microtask
  });
}

pridejMicrotask();
setTimeout(() => {
  console.log('Tento kód se nikdy nespustí!');
}, 0);
</code></pre>

<p>V tomto případě se <code>setTimeout</code> callback nikdy nespustí, protože fronta microtasků se neustále doplňuje.</p>


<h2 id="prakticke-vyuziti">Praktické využití</h2>

<h3 id="aktualizace-stavu">Aktualizace stavu před renderingem</h3>

<p>Microtasky se hodí pro operace, které mají být provedeny před dalším renderingem stránky:</p>

<pre><code>element.textContent = 'Načítání...';

queueMicrotask(() => {
  // Aktualizace dat před renderingem
  element.textContent = nactiData();
});
</code></pre>


<h3 id="debouncing">Debouncing pomocí microtasků</h3>

<p>Občas je vhodné seskupit více operací do jedné. Například při sledování změn stavu v reactive frameworku:</p>

<pre><code>class StateManager {
  constructor() {
    this.state = {};
    this.listeners = [];
    this.updatePending = false;
    this.changes = [];
  }

  setState(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;

    // Uložit změnu
    this.changes.push({ key, oldValue, newValue: value });

    // Naplánovat batch aktualizaci
    if (!this.updatePending) {
      this.updatePending = true;
      queueMicrotask(() => {
        this.notifyListeners(this.changes);
        this.changes = [];
        this.updatePending = false;
      });
    }
  }

  notifyListeners(changes) {
    console.log('Notifikace o změnách:', changes);
    this.listeners.forEach(listener => listener(changes));
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }
}

// Použití
const state = new StateManager();

state.subscribe(changes => {
  console.log(`Provedeno ${changes.length} změn najednou`);
});

// Všechny tři změny se zpracují v jednom microtasku
state.setState('name', 'Jan');
state.setState('age', 30);
state.setState('city', 'Praha');

console.log('Změny naplánované, ale ještě neprovedené');

// Výstup:
// Změny naplánované, ale ještě neprovedené
// Notifikace o změnách: [
//   { key: 'name', oldValue: undefined, newValue: 'Jan' },
//   { key: 'age', oldValue: undefined, newValue: 30 },
//   { key: 'city', oldValue: undefined, newValue: 'Praha' }
// ]
// Provedeno 3 změn najednou
</code></pre>


<h2 id="rozdily-prohlizecu">Rozdíly mezi prostředími</h2>

<p>Implementace event loopu se mírně liší mezi prohlížečem a Node.js:</p>

<ul>
  <li><b>Prohlížeč</b> – zpracovává rendering mezi tasky</li>
  <li><b>Node.js</b> – má více fází event loopu (timers, I/O callbacks, idle, poll, check, close callbacks)</li>
</ul>

<p>V Node.js existuje také <code>process.nextTick()</code>, který má ještě vyšší prioritu než microtasky.</p>


<h2 id="debugovani">Debugování a vizualizace</h2>

<p>Pro pochopení pořadí vykonávání lze použít:</p>

<ul>
  <li><b>Chrome DevTools</b> – Performance tab zobrazuje tasky a microtasky</li>
  <li><b>Loupe</b> – vizualizační nástroj pro event loop (<a href="http://latentflip.com/loupe/">latentflip.com/loupe</a>)</li>
  <li><b>Console logy</b> – nejjednodušší způsob sledování pořadí</li>
</ul>


<h2 id="zaver">Závěr</h2>

<ul>
  <li>
    <p><b>Event loop</b> je srdce asynchronního JavaScriptu</p>
  </li>
  <li>
    <p><b>Microtask queue</b> má prioritu před task queue (macro task queue)</p>
  </li>
  <li>
    <p>Promises, <code>async/await</code>, <code>queueMicrotask()</code> a <code>MutationObserver</code> používají microtasky</p>
  </li>
  <li>
    <p><code>setTimeout</code>, <code>setInterval</code> a události používají tasky</p>
  </li>
  <li>
    <p>Všechny microtasky se zpracují před dalším taskem nebo renderingem</p>
  </li>
</ul>

<p>Pochopení microtask queue je klíčové pro psaní správného asynchronního kódu a debugování neočekávaného chování.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Jake Archibald: <a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/">Tasks, microtasks, queues and schedules</a> – podrobný článek s interaktivními příklady</li>

  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide">Using microtasks in JavaScript</a> – oficiální dokumentace</li>

  <li>Philip Roberts: <a href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">What the heck is the event loop anyway?</a> – skvělá přednáška o event loopu</li>
</ul>
