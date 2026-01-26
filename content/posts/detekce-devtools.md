---
title: "Detekce otevření DevTools"
headline: "Detekce otevření DevTools"
description: "Jak zjistit, že se na stránce otevřely vývojářské nástroje."
date: "2025-08-23"
last_modification: "2025-08-23"
status: 1
tags: ["js", "hotova-reseni"]
format: "html"
---

<p>Detekce otevření DevTools může být užitečná pro různé účely – od debugování až po pokus o bezpečnostní opatření. Existuje několik způsobů, jak zjišťovat, že uživatel otevřel vývojářské nástroje.</p>

<p>Jsou i možnosti, jak se otevření <a href="/vyvojarske-nastroje">vývojářských nástrojů</a> snažit zabránit.</p>

<blockquote>
<p>Žádný způsob není 100%. Pokud nechcete, aby někdo viděl váš zdrojový kód, nedávejte ho na internet.</p>
</blockquote>

<h2 id="detekce">Detekce velikosti okna a její změny</h2>

<p>Vychází se z úvahy, že otevření DevTools obvykle změní rozměry viewportu. Tato metoda funguje na principu rozdílu mezi vnější a vnitřní velikostí okna prohlížeče.</p>


<h3 id="jak-funguje">Jak funguje</h3>
<ul>
  <li><code>window.outerWidth</code> – celková šířka okna prohlížeče včetně panelů</li>
  <li><code>window.innerWidth</code> – šířka viditelné oblasti stránky</li>
  <li>Rozdíl větší než např. 160px obvykle znamená otevřené DevTools</li>
</ul>

<p>Výhodou je nízká režie této detekce. Nevýhodou je nefunkčnost při DevTools v samostatném okně a falešně positivní vyhodnocení při otevření různých postranních panelů, pokud jimi prohlížeč disponuje.</p>

<div class="live">
  <style>
    .devtools-demo {
      padding: 20px;
      border: 2px solid #ddd;
      border-radius: 8px;
      margin: 20px 0;
      transition: all 0.3s ease;
    }
    .devtools-demo.detected {
      border-color: #ff4444;
      background-color: #fff5f5;
    }
    .devtools-demo .status {
      font-weight: bold;
      margin-bottom: 10px;
    }
    .devtools-demo .status.detected {
      color: #ff4444;
    }
    .devtools-demo .status.safe {
      color: #44aa44;
    }
  </style>
  
  <div id="demo1" class="devtools-demo">
    <div id="status1" class="status safe">DevTools nejsou detekovány</div>
    <p>Zkuste otevřít DevTools (F12) a sledujte změnu stavu.</p>
  </div>
  
  <script>
    var devtools1 = false;
    
    function detectDevTools1() {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        if (!devtools1) {
          devtools1 = true;
          document.getElementById('demo1').classList.add('detected');
          document.getElementById('status1').textContent = 'DevTools byly detekovány!';
          document.getElementById('status1').className = 'status detected';
        }
      } else {
        if (devtools1) {
          devtools1 = false;
          document.getElementById('demo1').classList.remove('detected');
          document.getElementById('status1').textContent = 'DevTools nejsou detekovány';
          document.getElementById('status1').className = 'status safe';
        }
      }
    }
    
    window.addEventListener('resize', detectDevTools1);
    detectDevTools1();
  </script>
  <script data-cleanup>
    window.removeEventListener('resize', detectDevTools1);
  </script>
</div>

<h2 id="casovac">Měření času <code>console.log</code></h2>

<p>Tato metoda využívá skutečnost, že při otevřených DevTools trvá zpracování <code>console.log</code> déle než při zavřených.</p>

<p>Čas jde měřit přes <a href="https://developer.mozilla.org/en-US/docs/Web/API/Performance/now">Performance: now() metodu</a>.</p>

<p>Problém je, že na rychlém hardwaru bude i volání s otevřenými DevTools hodně rychlé. Naopak při přetížení systému může být pomalé i volání bez DevTools.</p>

<div class="live">
  <style>
    .console-timing-demo .button {
      background: #007cba;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-bottom: 15px;
    }
    .console-timing-demo .button:hover {
      background: #005a87;
    }
    .console-timing-demo .results {
      background: #f8f8f8;
      padding: 15px;
      border-radius: 5px;
      font-family: monospace;
      margin-top: 15px;
    }
    .console-timing-demo .time {
      font-weight: bold;
      color: #007cba;
    }
    .console-timing-demo .status {
      margin-top: 10px;
      padding: 8px;
      border-radius: 4px;
      font-weight: bold;
    }
    .console-timing-demo .status.fast {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    .console-timing-demo .status.slow {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    .console-timing-demo .history {
      margin-top: 15px;
      font-size: 0.9em;
    }
    .console-timing-demo .history-item {
      padding: 5px 0;
      border-bottom: 1px solid #eee;
    }
  </style>
  
  <div class="console-timing-demo">
    <h3 class="mt-0">Test rychlosti console.log</h3>
    <p>Klikněte na tlačítko pro změření času vykonání console.log. Při otevřených DevTools bude čas delší.</p>
    
    <button class="button" onclick="measureConsoleTime()">Změřit čas console.log</button>
    
    <div id="results" class="results" style="display: none;">
      <div>Poslední měření: <span id="lastTime" class="time">-</span></div>
      <div id="status" class="status"></div>
    </div>
    
    <div class="history">
      <h4>Historie měření:</h4>
      <div id="history"></div>
    </div>
  </div>
  
  <script>
    var measurementHistory = [];
    
    function measureConsoleTime() {
      const start = performance.now();
      
      console.log('%c', 'color: transparent');
      console.clear();
      
      const end = performance.now();
      const duration = end - start;
      
      const result = {
        time: duration,
        timestamp: new Date().toLocaleTimeString(),
        devtools: duration > 100
      };
      
      measurementHistory.push(result);
      
      displayResults(result);
      updateHistory();
    }
    
    function displayResults(result) {
      const resultsDiv = document.getElementById('results');
      const timeSpan = document.getElementById('lastTime');
      const statusDiv = document.getElementById('status');
      
      timeSpan.textContent = result.time.toFixed(2) + ' ms';
      
      if (result.devtools) {
        statusDiv.textContent = '🚨 DevTools pravděpodobně otevřeny (čas > 100ms)';
        statusDiv.className = 'status slow';
      } else {
        statusDiv.textContent = '✅ DevTools pravděpodobně zavřeny (čas < 100ms)';
        statusDiv.className = 'status fast';
      }
      
      resultsDiv.style.display = 'block';
    }
    
    function updateHistory() {
      const historyDiv = document.getElementById('history');
      const recentHistory = measurementHistory.slice(-5);
      
      historyDiv.innerHTML = recentHistory.map(item => `
        <div class="history-item">
          ${item.timestamp}: ${item.time.toFixed(2)}ms 
          ${item.devtools ? '🚨' : '✅'}
        </div>
      `).join('');
    }
  </script>
</div>


<h2 id="debugger">Detekce pomocí debugger</h2>

<p>Použití <code>debugger</code> statementu. Tato metoda využívá skutečnost, že debugger statement způsobí pausu v kódu pouze při otevřených DevTools.</p>

<p>Při zavřených DevTools se debugger ignoruje (rychlé vykonání).</p>

<div class="live">
  <style>
    .debugger-timing-demo .button {
      background: #8e44ad;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-bottom: 15px;
    }
    .debugger-timing-demo .button:hover {
      background: #6c3483;
    }
    .debugger-timing-demo .results {
      background: #f8f8f8;
      padding: 15px;
      border-radius: 5px;
      font-family: monospace;
      margin-top: 15px;
    }
    .debugger-timing-demo .time {
      font-weight: bold;
      color: #8e44ad;
    }
    .debugger-timing-demo .status {
      margin-top: 10px;
      padding: 8px;
      border-radius: 4px;
      font-weight: bold;
    }
    .debugger-timing-demo .status.fast {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    .debugger-timing-demo .status.slow {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    .debugger-timing-demo .history {
      margin-top: 15px;
      font-size: 0.9em;
    }
    .debugger-timing-demo .history-item {
      padding: 5px 0;
      border-bottom: 1px solid #eee;
    }
    .debugger-timing-demo .warning {
      background: #fff3cd;
      color: #856404;
      border: 1px solid #ffeaa7;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 15px;
      font-size: 0.9em;
    }
  </style>
  
  <div class="debugger-timing-demo">
    <h3 class="mt-0">Test rychlosti debugger statementu</h3>
    <p>Klikněte na tlačítko pro změření času vykonání debugger statementu. Při otevřených DevTools bude čas delší.</p>
    
    <div class="warning">
      ⚠️ <strong>Pozor:</strong> Tento test může způsobovat pauzy v kódu při otevřených DevTools. 
      Pokud máte DevTools otevřené, může se kód pozastavit na debugger statementu.
    </div>
    
    <button class="button" onclick="measureDebuggerTime()">Změřit čas debugger</button>
    
    <div id="debuggerResults" class="results" style="display: none;">
      <div>Poslední měření: <span id="debuggerLastTime" class="time">-</span></div>
      <div id="debuggerStatus" class="status"></div>
    </div>
    
    <div class="history">
      <h4>Historie měření:</h4>
      <div id="debuggerHistory"></div>
    </div>
  </div>
  
  <script>
    var debuggerMeasurementHistory = [];
    
    function measureDebuggerTime() {
      const start = performance.now();
      
      debugger;
      
      const end = performance.now();
      const duration = end - start;
      
      const result = {
        time: duration,
        timestamp: new Date().toLocaleTimeString(),
        devtools: duration > 100
      };
      
      debuggerMeasurementHistory.push(result);
      
      displayDebuggerResults(result);
      updateDebuggerHistory();
    }
    
    function displayDebuggerResults(result) {
      const resultsDiv = document.getElementById('debuggerResults');
      const timeSpan = document.getElementById('debuggerLastTime');
      const statusDiv = document.getElementById('debuggerStatus');
      
      timeSpan.textContent = result.time.toFixed(2) + ' ms';
      
      if (result.devtools) {
        statusDiv.textContent = '🚨 DevTools pravděpodobně otevřeny (čas > 100ms)';
        statusDiv.className = 'status slow';
      } else {
        statusDiv.textContent = '✅ DevTools pravděpodobně zavřeny (čas < 100ms)';
        statusDiv.className = 'status fast';
      }
      
      resultsDiv.style.display = 'block';
    }
    
    function updateDebuggerHistory() {
      const historyDiv = document.getElementById('debuggerHistory');
      const recentHistory = debuggerMeasurementHistory.slice(-5);
      
      historyDiv.innerHTML = recentHistory.map(item => `
        <div class="history-item">
          ${item.timestamp}: ${item.time.toFixed(2)}ms 
          ${item.devtools ? '🚨' : '✅'}
        </div>
      `).join('');
    }
  </script>
</div>

<p>Nevýhodou je, že při tomto použití je <code>debugger</code> při otevřených vývojářských nástrojích dost otravný. Ale jde to vypnout:</p>

<p><img src="/files/detekce-devtools/deactivate-breakpoints.png" alt="Deaktivování breakpointů" class="border" /></p>


<h2 id="kombinace">Kombinovaný přístup</h2>

<p>Nejspolehlivější asi bude kombinace více metod. Je ale otázka, jestli to za to stojí.</p>

<h2 id="zablokovani-devtools">Zablokování otevření DevTools</h2>

<p>Kromě detekce otevřených DevTools můžete také zkusit zabránit jejich otevření. Existuje několik způsobů, jak omezit přístup k vývojářským nástrojům.</p>

<p>Nejčastější způsob otevření DevTools je pomocí klávesových zkratek. Můžete je zachytit a zabránit jejich spuštění:</p>

<pre><code class="language-javascript">document.addEventListener('keydown', function(event) {
    // F12
    if (event.keyCode === 123) {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+I (Windows/Linux) nebo Cmd+Option+I (Mac)
    if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+J (Windows/Linux) nebo Cmd+Option+J (Mac)
    if (event.ctrlKey && event.shiftKey && event.keyCode === 74) {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+U (View Source)
    if (event.ctrlKey && event.keyCode === 85) {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C (Elements inspector)
    if (event.ctrlKey && event.shiftKey && event.keyCode === 67) {
        event.preventDefault();
        return false;
    }
});

// Zabránit pravému kliknutí
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    return false;
});
</code></pre>

<div class="live">
  <style>
    .block-demo {
      padding: 20px;
      border: 2px solid #ddd;
      border-radius: 8px;
      margin: 20px 0;
      transition: all 0.3s ease;
    }
    .block-demo.blocked {
      border-color: #ff4444;
      background-color: #fff0f0;
    }
    .block-demo .status {
      font-weight: bold;
      margin-bottom: 10px;
    }
    .block-demo .status.blocked {
      color: #ff4444;
    }
    .block-demo .status.active {
      color: #44aa44;
    }
    .block-demo .attempts {
      font-size: 0.9em;
      color: #666;
      margin-top: 10px;
    }
  </style>
  
  <div id="blockDemo" class="block-demo">
    <div id="blockStatus" class="status active">Sledování pokusů o otevření DevTools</div>
    <p>Zkuste otevřít DevTools pomocí <kbd>F12</kbd>, <kbd>Ctrl<kbd>+<kbd>Shift</kbd>+</kbd>I</kbd> nebo pravého kliknutí. Pokusy budou zaznamenány, ale DevTools se otevřou normálně.</p>
    <div id="blockAttempts" class="attempts">Pokusy o otevření: 0</div>
  </div>
  
  <script>
    var attemptCount = 0;
    
    var handleKeyDown = function(event) {
      // Debug: vypiš všechny klávesové události
      if (event.metaKey || event.ctrlKey) {
        console.log('Debug kláves:', {
          key: event.key,
          metaKey: event.metaKey,
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,
          altKey: event.altKey,
          code: event.code
        });
      }
      
      // F12
      if (event.key === 'F12') {
        attemptCount++;
        document.getElementById('blockAttempts').textContent = `Pokusy o otevření: ${attemptCount}`;
        document.getElementById('blockDemo').classList.add('blocked');
        setTimeout(() => {
          document.getElementById('blockDemo').classList.remove('blocked');
        }, 1000);
        console.log(`Pokus o otevření DevTools: F12`);
        return;
      }
      
      // Ctrl+Shift+I (Windows/Linux) nebo Cmd+Option+I (Mac)
      if ((event.ctrlKey && event.shiftKey && event.key === 'I') || 
          (event.metaKey && event.altKey && event.code === 'KeyI')) {
        attemptCount++;
        document.getElementById('blockAttempts').textContent = `Pokusy o otevření: ${attemptCount}`;
        document.getElementById('blockDemo').classList.add('blocked');
        setTimeout(() => {
          document.getElementById('blockDemo').classList.remove('blocked');
        }, 1000);
        console.log(`Pokus o otevření DevTools: ${event.metaKey ? 'Cmd+Option' : 'Ctrl+Shift'}+I`);
        return;
      }
      
      // Ctrl+Shift+J (Windows/Linux) nebo Cmd+Option+J (Mac)
      if ((event.ctrlKey && event.shiftKey && event.key === 'J') || 
          (event.metaKey && event.altKey && event.code === 'KeyJ')) {
        attemptCount++;
        document.getElementById('blockAttempts').textContent = `Pokusy o otevření: ${attemptCount}`;
        document.getElementById('blockDemo').classList.add('blocked');
        setTimeout(() => {
          document.getElementById('blockDemo').classList.remove('blocked');
        }, 1000);
        console.log(`Pokus o otevření DevTools: ${event.metaKey ? 'Cmd+Option' : 'Ctrl+Shift'}+J`);
        return;
      }
      
      // Ctrl+U (View Source)
      if ((event.ctrlKey || event.metaKey) && event.key === 'u') {
        attemptCount++;
        document.getElementById('blockAttempts').textContent = `Pokusy o otevření: ${attemptCount}`;
        document.getElementById('blockDemo').classList.add('blocked');
        setTimeout(() => {
          document.getElementById('blockDemo').classList.remove('blocked');
        }, 1000);
        console.log(`Pokus o otevření DevTools: ${event.metaKey ? 'Cmd' : 'Ctrl'}+U`);
        return;
      }
      
      // Ctrl+Shift+C (Elements inspector)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') {
        attemptCount++;
        document.getElementById('blockAttempts').textContent = `Pokusy o otevření: ${attemptCount}`;
        document.getElementById('blockDemo').classList.add('blocked');
        setTimeout(() => {
          document.getElementById('blockDemo').classList.remove('blocked');
        }, 1000);
        console.log(`Pokus o otevření DevTools: ${event.metaKey ? 'Cmd' : 'Ctrl'}+Shift+C`);
        return;
      }
    };
    
    var handleContextMenu = function(event) {
      attemptCount++;
      document.getElementById('blockAttempts').textContent = `Pokusy o otevření: ${attemptCount}`;
      document.getElementById('blockDemo').classList.add('blocked');
      setTimeout(() => {
        document.getElementById('blockDemo').classList.remove('blocked');
      }, 1000);
      console.log('Pokus o otevření DevTools: pravé kliknutí');
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
  </script>
  
  <script data-cleanup>
    // Odstranění event listenerů při opuštění stránky
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('contextmenu', handleContextMenu);
  </script>
  </div>

<h3 id="omezeni-zablokovani">Omezení zablokování</h3>

<p>Je důležité si uvědomit, že zablokování DevTools má svá omezení:</p>

<ul>
  <li><strong>Nespolehlivost</strong>: Zkušení uživatelé mohou blokování obcházet.</li>
  <li><strong>Uživatelská zkušenost</strong>: Může narušit legitimní používání.</li>
</ul>

<h2 id="obfuskace">Obfuskace kódu</h2>

<p>Obfuskace kódu se snaží ztížit jeho čtení a modifikaci. Vzhledem k tomu, že z podstaty webu se všechny skripty a styly stahují k uživateli, má k nim vždy přístup.</p>

<p>Pro <i>ochranu</i> kódu lze použít nějaký nástroj pro obfuskaci: <a href="https://github.com/javascript-obfuscator/javascript-obfuscator">JavaScript obfuscator</a> (<a href="https://obfuscator.io">online</a>).</p>

<p>Příklad obfuskovaného kódu:</p>

<pre><code class="language-javascript">(function(_0x394301,_0x1aff2f){var _0x3cc9b5=_0xfda4,_0x4301eb=_0x394301();while(!![]){try{var _0x2eca77=-parseInt(_0x3cc9b5(0x191))/0x1+-parseInt(_0x3cc9b5(0x189))/0x2*(parseInt(_0x3cc9b5(0x190))/0x3)+-parseInt(_0x3cc9b5(0x18c))/0x4*(-parseInt(_0x3cc9b5(0x193))/0x5)+parseInt(_0x3cc9b5(0x18d))/0x6*(parseInt(_0x3cc9b5(0x192))/0x7)+parseInt(_0x3cc9b5(0x18b))/0x8+-parseInt(_0x3cc9b5(0x18e))/0x9*(-parseInt(_0x3cc9b5(0x188))/0xa)+-parseInt(_0x3cc9b5(0x18a))/0xb;if(_0x2eca77===_0x1aff2f)break;else _0x4301eb['push'](_0x4301eb['shift']());}catch(_0x35e1ed){_0x4301eb['push'](_0x4301eb['shift']());}}}(_0x195e,0xb12ed));function _0x195e(){var _0x493f9d=['26iVFDSU','5049627aPRImx','3813168pzeJjs','131872kqQiHw','269898aqDVfc','379521QRuwaA','log','327909QoSSmj','192311uHIQmu','175ybtpoA','60uohBYN','190qAZQCv'];_0x195e=function(){return _0x493f9d;};return _0x195e();}function _0xfda4(_0x5b891a,_0x428281){var _0x195e96=_0x195e();return _0xfda4=function(_0xfda4c9,_0x507e09){_0xfda4c9=_0xfda4c9-0x188;var _0x4464db=_0x195e96[_0xfda4c9];return _0x4464db;},_0xfda4(_0x5b891a,_0x428281);}function hi(){var _0x154fa1=_0xfda4;console[_0x154fa1(0x18f)]('Hello\x20World!');}hi();</code></pre>

<p>Problém v dnešní době je, že lze kód relativně snadno deobfuskovat pomocí AI:</p>

<p><img src="/files/detekce-devtools/rozmotani-kodu.png" alt="Rozmotání kódu" class="border" /></p>



<h2 id="zaver">Závěr</h2>

<ul>
  <li>Žádná metoda není 100% spolehlivá.</li>
  <li><strong>Výkon</strong>: Časté kontroly mohou ovlivnit výkon.</li>
  <li>Je-li něco potřeba opravdu tajit, řešením je to přesunout na stranu serveru.</li>
</ul>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://stackoverflow.com/questions/7798748/find-out-whether-chrome-console-is-open">Stack Overflow – Find out whether Chrome console is open</a></li>
</ul>