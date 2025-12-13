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
