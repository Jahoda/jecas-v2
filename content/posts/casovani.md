---
title: "Časování v JavaScriptu"
headline: "Časovače v JavaScriptu"
description: "Jaké nabízí JavaScript možnosti pro vytváření animací. A jak docílit toho, aby byly plynulé. "
date: "2014-11-12"
last_modification: "2025-08-26"
status: 1
tags: ["js", "webove-animace"]
format: "html"
---

<p>Pokud chceme na webu něco pohyblivého/animovaného, nabízejí se 3 řešení:</p>

<ol>
  <li>Použít <b>pohyblivý obrázek</b> GIF / video.</li>
  
  <li>Použít CSS přechody <a href="/transition"><code>transition</code></a> nebo vlastnost <a href="/animation"><code>animation</code> s <code>@keyframes</code></a>. Tyto CSS animace potom případně <b>spouštět JavaScriptem</b>.</li>
  
  <li>Celou animaci řídit JavaScriptem, který bude měnit CSS vlastnosti (např. umístění, rozměry, <a href="/opacity">průhlednost</a> a podobně) nebo třeba vypisovat nějaký obsah.</li>
</ol>


<h2 id="setinterval">Opakované spouštění <code>setInterval</code></h2>

<p>První funkce slouží pro opakované spouštění libovolného JS kódu. Funkce <code>setInterval</code> má dva parametry, kde první je kód, který se má spustit, a druhý časová prodleva <b>v milisekundách</b>.</p>

<p>Existuje několik způsobů, jak kód pro časovač zapsat.</p>

<ol>
  <li>
    <p>Nejjednodušší je místo prvního parametru napsat <b>řetězec s JS kódem</b>. Následující příklad do elementu s ID „vypsat“ zapíše každých 1000 milisekund (1 vteřina) tečku.</p>
    
    <pre><code>setInterval(
  "document.getElementById('vypsat').innerHTML += '.'", 
  1000
);</code></pre>
    
    <p><a href="https://kod.djpw.cz/lihb">Ukázka</a></p>
    
    <p>Psaní kódu <b>do řetězce</b> ale není nic dobrého (jedná se o ekvivalent <code>eval</code>u). Proto je lepší se tomuto případu vyhnout. Kromě možných risik při <b>vyhodnocování</b> takového kódu si zbytečně snižujeme čitelnost, protože obsah v řetězci neumí většina editorů správně obarvit.</p>
  </li>
  
  <li>
    <p>Funkci <code>setInterval</code> proto raději předáme jako první parametr anonymní/nepojmenovanou funkci:</p>
    
    <pre><code>setInterval(
  function() {
    // opakovaně spouštěný kód
    document.getElementById('vypsat').innerHTML += '.';
  },
  1000
);</code></pre>

<p><a href="https://kod.djpw.cz/kihb">Ukázka</a></p>
  </li>
  
  <li>
    <p>Funkci si případně můžeme vytvořit samostatně a <code>setInterval</code>u předat jen její název:</p>

  
    <pre><code>function vypsat() {
  // opakovaně spouštěný kód
  document.getElementById('vypsat').innerHTML += '.';
}
var casovac = setInterval(vypsat, 1000);</code></pre>
    
    <p>Pro pozdější <b>zrušení časovače</b> je užitečné si ho přiřadit do proměnné.</p>

    <p><a href="https://kod.djpw.cz/mihb">Ukázka</a></p>
  </li>  
</ol>


<h3 id="clearinterval">Zrušení intervalu <code>clearInterval</code></h3>

<p>Pokud je <i>interval</i> v nějaké proměnné, jde ho na vyžádání zrušit:</p>

<pre><code>clearInterval(casovac);</code></pre>

<p><a href="https://kod.djpw.cz/nihb">Ukázka</a></p>

<p>Na rušení intervalu je dobré nezapomínat, protože to jinak může způsobovat <i>memory leaky</i>.</p>




<h2 id="settimeout">Spuštění po čase <code>setTimeout</code></h2>

<p>Na rozdíl od <code>set<b>Interval</b></code>u spustí požadovanou akci <code>set<b>Timeout</b></code> pouze <b>jednou</b>. Jinak jsou si obě funkce dost podobné.</p>

<pre><code>var casovac = setTimeout(
  function() {
    // kód se spustí pouze jednou za 1000 milisekund
  },
  1000
);</code></pre>


<h3 id="cleartimeout">Zrušení timeoutu <code>clearTimeout</code></h3>

<p>Pokud je <i>timeout</i> v nějaké proměnné, jde ho na vyžádání zrušit:</p>

<pre><code>clearTimeout(casovac);</code></pre>

<p><a href="https://kod.djpw.cz/oihb">Ukázka</a></p>

<p>Zajímavá je skutečnost, že je možné rušit rovněž <code>setInterval</code> pomocí <code>clearTimeout</code> a naopak.</p>


<h3 id="opakovane-timeout">Opakované spouštění <i>timeoutu</i></h3>

<p>I pomocí <code>setTimeout</code> jde <i>nasimulovat</i> <code>setInterval</code>, tedy zajistit <b>opakované spouštění</b>. V případech, kdy chceme, aby další opakování <b>bylo závislé na tom předchozím</b>, je to i lepší volba.</p>

<p>Celý princip spočívá v <b>rekursivním volání</b> <i>timeoutu</i>. Po provedení vlastní části kódu (vypsání) funkce <code>vypsat</code> zavolá pomocí <code>setTimeout</code> samu sebe.</p>

<pre><code>function vypsat() {
  // samotný výpis
  setTimeout(vypsat, 1000);
}
vypsat();</code></pre>

<p>Jelikož tento kód by <b>běžel nekonečně</b>, možná budeme potřebovat způsob, jak ho zastavit. Existují dvě možnosti.</p>

<ol>
  <li>Použít <code>clearTimeout</code>. <a href="https://kod.djpw.cz/rihb">Ukázka</a></li>
  
  <li>Ve funkci <code>vypsat</code> na základě splnění nějaké podmínky další časovač nevytvářet. <a href="https://kod.djpw.cz/sihb">Ukázka</a></li>
</ol>



<h2 id="requestanimationframe">Časování přes <code>requestAnimationFrame</code></h2>

<p>Novější způsob, kterým disponují prohlížeče od <b>IE 10</b>, je použití metody <code>requestAnimationFrame</code>.</p>

<p>Ta se hodí hlavně pro vytváření animací, protože:</p>

<ul>
  <li>Automaticky se synchronisuje s obnovovací frekvencí obrazovky (obvykle 60 FPS).</li>
  <li>Pozastavuje se, když je stránka v pozadí nebo není viditelná.</li>
  <li>Poskytuje plynulejší animace než <code>setInterval</code> nebo <code>setTimeout</code>.</li>
  <li>Optimalisuje výkon baterie na mobilních zařízeních.</li>
</ul>

<p>Základní použití:</p>

<pre><code>function animace() {
  // kód animace
  requestAnimationFrame(animace);
}
requestAnimationFrame(animace);</code></pre>

<p>Příklad jednoduché animace pohybu elementu:</p>

<pre><code>var element = document.getElementById('animovany');
var posice = 0;

function animace() {
  posice += 2;
  element.style.left = posice + 'px';
  
  if (posice < 300) {
    requestAnimationFrame(animace);
  }
}

requestAnimationFrame(animace);</code></pre>

<p>Metodě <code>requestAnimationFrame</code> je možné jako druhý parametr předat element, kterého se akce v <i>časovači</i> bude týkat. V takovém případě se nemusí akce provádět, když je například element mimo viditelnou plochu.</p>

<h3 id="cancelanimationframe">Zrušení animace <code>cancelAnimationFrame</code></h3>

<p>Pro zrušení animace slouží funkce <code>cancelAnimationFrame</code>:</p>

<pre><code>var animationId = requestAnimationFrame(animace);
// později...
cancelAnimationFrame(animationId);</code></pre>


<h2 id="animate">Metoda <code>animate</code></h2>

<p>Moderní prohlížeče podporují nativní Web Animations API, které poskytuje metodu <code>element.animate()</code>. Tato metoda umožňuje vytvářet složité animace přímo v JavaScriptu bez nutnosti psát CSS <i>keyframes</i>.</p>

<p>Základní syntaxe:</p>

<pre><code>element.animate(keyframes, options);</code></pre>

<p>Příklad jednoduché animace:</p>

<pre><code>var element = document.getElementById('animovany');

element.animate([
  { transform: 'translateX(0px)' },
  { transform: 'translateX(200px)' }
], {
  duration: 1000,
  easing: 'ease-in-out'
});</code></pre>

<p><a href="https://kod.djpw.cz/faod">Živá ukázka</a></p>

<p>Pokročilejší animace s více vlastnostmi:</p>

<pre><code>element.animate([
  { 
    opacity: 0,
    transform: 'scale(0.5) translateY(-50px)'
  },
  { 
    opacity: 1,
    transform: 'scale(1) translateY(0px)'
  }
], {
  duration: 800,
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  fill: 'forwards'
});</code></pre>

<p>Možnosti v <code>options</code> objektu:</p>

<ul>
  <li><code>duration</code> — délka animace v milisekundách,</li>
  <li><code>delay</code> — zpoždění před začátkem animace,</li>
  <li><code>easing</code> — funkce pro plynulost animace,</li>
  <li><code>iterations</code> — počet opakování (Infinity pro nekonečné),</li>
  <li><code>direction</code> — směr animace (normal, reverse, alternate, alternate-reverse),</li>
  <li><code>fill</code> — chování před a po animaci (none, forwards, backwards, both)</li>
</ul>

<p>Výhody <code>animate()</code> metody:</p>

<ul>
  <li>Nativní podpora v moderních prohlížečích.</li>
  <li>Lepší výkon než manuální změny CSS vlastností.</li>
  <li>Možnost programově ovládat animace (pause, play, reverse).</li>
  <li>Automatická optimalisace prohlížečem.</li>
</ul>

<p>Ovládání animace:</p>

<pre><code>var animace = element.animate([...], {...});

// pozastavení
animace.pause();

// pokračování
animace.play();

// obrácení
animace.reverse();

// nastavení rychlosti
animace.playbackRate = 2; // dvojnásobná rychlost</code></pre>


<div class="live">
<div id="animace-demo">
  <div id="animovany-element" style="width: 100px; height: 100px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 50%; position: relative; margin: 20px auto;"></div>
  
  <div style="text-align: center; margin: 20px 0;">
    <button id="start-btn" onclick="startAnimace()">Spustit</button>
    <button id="pause-btn" onclick="pauseAnimace()" disabled>Pozastavit</button>
    <button id="reset-btn" onclick="resetAnimace()">Reset</button>
  </div>
  
  <div style="display: flex; justify-content: space-around; margin: 20px 0;">
    <div>
      <label>Rychlost: <span id="speed-value">1</span>x</label><br>
      <input type="range" id="speed-slider" min="0.1" max="3" step="0.1" value="1" onchange="changeSpeed(this.value)">
    </div>
    <div>
      <label>Směr: <span id="direction-value">normal</span></label><br>
      <select id="direction-select" onchange="changeDirection(this.value)">
        <option value="normal">Normal</option>
        <option value="reverse">Reverse</option>
        <option value="alternate">Alternate</option>
        <option value="alternate-reverse">Alternate Reverse</option>
      </select>
    </div>
  </div>
</div>

<script>
var animace;
var element = document.getElementById('animovany-element');
var startBtn = document.getElementById('start-btn');
var pauseBtn = document.getElementById('pause-btn');
var resetBtn = document.getElementById('reset-btn');
var speedSlider = document.getElementById('speed-slider');
var speedValue = document.getElementById('speed-value');
var directionSelect = document.getElementById('direction-select');
var directionValue = document.getElementById('direction-value');

function startAnimace() {
  if (animace) {
    animace.play();
  } else {
    animace = element.animate([
      { 
        transform: 'translateX(0px) rotate(0deg) scale(1)',
        opacity: 0.5
      },
      { 
        transform: 'translateX(200px) rotate(180deg) scale(1.2)',
        opacity: 1
      },
      { 
        transform: 'translateX(0px) rotate(360deg) scale(1)',
        opacity: 0.5
      }
    ], {
      duration: 3000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      iterations: Infinity,
      direction: directionSelect.value
    });
  }
  
  startBtn.disabled = true;
  pauseBtn.disabled = false;
}

function pauseAnimace() {
  if (animace) {
    animace.pause();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

function resetAnimace() {
  if (animace) {
    animace.cancel();
    animace = null;
  }
  element.style.transform = 'translateX(0px) rotate(0deg) scale(1)';
  element.style.opacity = '0.5';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  speedSlider.value = 1;
  speedValue.textContent = '1';
  directionSelect.value = 'normal';
  directionValue.textContent = 'normal';
}

function changeSpeed(value) {
  if (animace) {
    animace.playbackRate = parseFloat(value);
  }
  speedValue.textContent = value;
}

function changeDirection(value) {
  if (animace) {
    animace.cancel();
    animace = element.animate([
      { 
        transform: 'translateX(0px) rotate(0deg) scale(1)',
        opacity: 0.5
      },
      { 
        transform: 'translateX(200px) rotate(180deg) scale(1.2)',
        opacity: 1
      },
      { 
        transform: 'translateX(0px) rotate(360deg) scale(1)',
        opacity: 0.5
      }
    ], {
      duration: 3000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      iterations: Infinity,
      direction: value
    });
    animace.play();
  }
  directionValue.textContent = value;
}
</script>
</div>

<h2 id="browser-tabs">Problém s neaktivními taby</h2>

<p>Prohlížeče zpomalují nebo pozastavují JavaScript v neaktivních tabech, což ovlivňuje časování a animace.</p>

<p>Různé prohlížeče se chovají jinak, ale obecně jde vycházet z:</p>

<ul>
  <li>omezení <code>setTimeout</code>/<code>setInterval</code> na cca 1 sekundu,</li>
  <li><code>requestAnimationFrame</code> se pozastaví,</li>
  <li>na mobilních zařízeních se pozastaví většina JavaScriptu</li>
</ul>

<p>Chování se může lišit i podle aktuálního <a href="/battery-api">stavu baterie</a> (úsporný režim apod.).</p>

<p>Reagovat na neaktivní taby lze pomocí <code>visibilitychange</code>.</p>

<pre><code>// Detekce viditelnosti stránky
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pozastavit animace
    animation.pause();
  } else {
    // Obnovit animace
    animation.play();
  }
});</code></pre>



<h2 id="dalsi-moznosti">Další možnosti časování</h2>

<h3 id="promisa">Časování přes <code>Promise</code></h3>

<p>Na pozadí používá <code>setTimeout</code> pro vytvoření zpoždění/<a href="/js-sleep">sleep</a>.</p>

<pre><code>// Jednoduché zpoždění
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Použití
async function animovanaSekvence() {
  console.log('Začátek');
  await delay(1000);
  console.log('Po 1 sekundě');
  await delay(2000);
  console.log('Po dalších 2 sekundách');
}

animovanaSekvence();</code></pre>


<h3 id="web-workers">Časování ve Web Workers</h3>

<p>Pro náročné operace, které by mohly blokovat hlavní vlákno, lze použít Web Workers:</p>

<pre><code>// main.js
const worker = new Worker('timer-worker.js');

worker.postMessage({ type: 'start', interval: 1000 });

worker.onmessage = function(e) {
  if (e.data.type === 'tick') {
    console.log('Tick z workeru:', e.data.timestamp);
  }
};

// timer-worker.js
self.onmessage = function(e) {
  if (e.data.type === 'start') {
    setInterval(() => {
      self.postMessage({
        type: 'tick',
        timestamp: Date.now()
      });
    }, e.data.interval);
  }
};</code></pre>

<h3 id="performance-api">Performance API pro přesné měření</h3>

<p>Pro velmi přesné měření času lze použít Performance API:</p>

<pre><code>// Měření času s vysokou přesností
const start = performance.now();

setTimeout(() => {
  const end = performance.now();
  console.log(`Uplynulo: ${end - start} milisekund`);
}, 1000);</code></pre>


<h2 id="throttling-debouncing">Throttling a debouncing</h2>

<p>Oba přístupy omezují frekvenci spouštění funkcí, čímž snižují náročnost, ale fungují jinak:</p>

<h3 id="throttling">Throttling</h3>

<p><b>Throttling</b> (česky <i>omezování frekvence</i> nebo <i>škrcení</i>) omezuje počet spuštění funkce na maximální hodnotu. Funkce se spustí maximálně jednou za daný časový interval.</p>

<pre><code>// Throttling - omezí frekvenci spouštění
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Použití pro scroll události
window.addEventListener('scroll', throttle(() => {
  console.log('Došlo ke scrollování');
}, 100));</code></pre>

<p><b>Kdy použít throttling:</b></p>
<ul>
  <li>Scroll události – reagování na rolování na stránce, které není potřeba tak často.</li>
  <li>Mouse move události – pro sledování pohybu myši.</li>
  <li>Resize události – změna velikosti okna.</li>
  <li>API volání – pro omezení rate limitů.</li>
</ul>

<h3 id="debouncing">Debouncing</h3>

<p><b>Debouncing</b> (česky <i>odložení spuštění</i>) počká na konec série událostí a spustí funkci až po určité době klidu. Funkce se spustí pouze jednou po poslední události.</p>

<pre><code>// Debouncing - počká na konec série událostí
function debounce(func, delay) {
  let timeoutId;
  return function() {
    const args = arguments;
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  }
}

// Použití pro resize události
window.addEventListener('resize', debounce(() => {
  console.log('Došlo ke změně velikosti');
}, 250));</code></pre>

<p>Debouncing se hodí použít, <b>když není potřeba reagovat ihned</b> na každou změnu. Ale stačí to až po nějaké době nečinnosti:</p>
<ul>
  <li>vyhledávání – pro vyhledávání při psaní nemusí být efektivní hledat po zadání každého znaku,</li>
  <li>validace formulářů – nemusí být potřeba validovat okamžitě,</li>
  <li>automatické ukládání</li>
</ul>

<p>Hodí se zvlášť pro výpočetně náročné operace nebo API volání. Pro rychlé věci může být uživatelsky přívětivější reagovat hned.</p>

<h2 id="vyber-metody">Kdy použít kterou metodu</h2>

<p>Výběr správné metody závisí na konkrétním použití:</p>

<ul>
  <li><code>setInterval</code>/<code>setTimeout</code> – pro jednoduché opakované akce, které nejsou visuální animace,</li>
  <li><code>requestAnimationFrame</code> – pro plynulé visuální animace a hry,</li>
  <li><code>element.animate()</code> – pro deklarativní animace s komplexními přechody,</li>
  <li><b>CSS animace</b> – pro jednoduché přechody a animace, které nevyžadují JavaScript logiku,</li>
  <li><b>Web Workers</b> – pro náročné výpočty bez blokování UI</li>
</ul>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS Tricks: <a href="http://css-tricks.com/using-requestanimationframe/">Using requestAnimationFrame</a></li>
  
  <li><a href="https://gist.github.com/paulirish/1579671">Polyfill pro starší prohlížeče</a> — <a href="https://gist.github.com/mrdoob/838785">zjednodušená podoba</a></li>
  
  <li>MSDN: <a href="http://msdn.microsoft.com/en-us/library/ie/hh920765(v=vs.85).aspx">Timing control for script-based animations ("requestAnimationFrame")</a></li>
  
  <li>Paul Irish: <a href="http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/">requestAnimationFrame for Smart Animating</a></li>
  
  <li>Creative JS: <a href="http://creativejs.com/resources/requestanimationframe/">requestAnimationFrame</a></li>
  
  <li>HTML5Rocks:<a href="http://updates.html5rocks.com/2014/05/Web-Animations---element-animate-is-now-in-Chrome-36">Web Animations - element.animate() is now in Chrome 36</a></li>
  
  <li>GoSquared Blog: <a href="https://engineering.gosquared.com/optimising-60fps-everywhere-in-javascript">Optimising for 60fps everywhere</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API">Web Animations API</a></li>
  
  <li>Can I Use: <a href="https://caniuse.com/#feat=web-animation">Web Animations API browser support</a></li>
</ul>