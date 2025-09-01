---
title: "Animace requestAnimationFrame"
headline: "Animace <code>requestAnimationFrame</code>"
description: "Animování pomocí <code>requestAnimationFrame</code> umožňuje vytvářet plynulejší a méně náročné animace."
date: "2015-09-30"
last_modification: "2025-09-02"
status: 0
tags: ["js", "animace"]
format: "html"
---

<p>V ideálním případě je dobré použít <b>animace vytvořené přímo v CSS</b> – pomocí <code>@keyframes</code> a vlastnosti <a href="/animation"><code>animation</code></a> či přes přechody <a href="/transition"><code>transition</code></a>.</p>

<p>Pro složitější animace nebo interaktivní prvky, na které je CSS krátké, je nutné <b>použít JavaScript</b>. Moderní alternativy zahrnují:</p>

<ul>
  <li><b>CSS Animations</b> – pro jednoduché animace bez interakce</li>
  <li><b>Web Animations API</b> – pro pokročilé animace s JavaScript kontrolou</li>
  <li><b>requestAnimationFrame</b> – pro vlastní animační logiku</li>
  <li><b>CSS Transforms s JavaScript</b> – pro kombinaci výkonu CSS a flexibility JS</li>
</ul>



<h2 id="fps">60 FPS</h2>

<p>Pomyslnou hranicí, aby byla animace <b>krásně plynulá</b>, je dosažení stabilních 60 snímků za sekundu (anglicky <i lang="en"><b>f</b>rames <b>p</b>er <b>s</b>econd</i>).</p>

<p>Nabízí se tedy použít časovač <code>setTimeout</code>, který se 60 krát za vteřinu rekursivně zavolá další krok animace:</p>

<pre><code>let casovac;
function animace() {
  // Kód samotné animace
  …
  // Spuštění dalšího kroku animace
  casovac = setTimeout(
    animace,
    1000 / 60
  );
}

// Spuštění animace
animace();</code></pre>













<p>Funkce <code>animace</code> se bude volat neustále v intervalu <code>1000 / 60</code>, což je cca každých <b>16 milisekund</b> (občas interval 16 ms z tohoto důvodu vidět ve zdrojových kódech).</p>




<h3 id="problemy">Problémy časovače</h3>

<p>Použití prostého časovače <code>setTimeout</code> trpí několika problémy:</p>

<ol>
  <li>
    <p>Interval přesně <b>neodpovídá frekvenci monitoru</b>. Pokud je frekvence jiná než 60 Hz, neodpovídá jeden krok animace úměrně stejné době zobrazení na monitoru.</p>
    
    <p>Při nižší frekvenci monitoru logicky některé snímky vypadnou. Při vyšší, která nebude násobkem, potom některé kroky animace budou na více obnoveních a některé pouze na jednom.</p>
  </li>
  
  <li>
    <p>Pro <b>dojem plynulosti</b> je důležitější <b>konsistentní počet <i>framů</i> než jejich vysoký počet</b>. Když se počet snímků najednou sníží z vysoké hodnoty, lidské oko to bude vnímat jako zaseknutí. Bude-li počet snímků nížší neustále, výsledný dojem bude plynulý.</p>
    
    <p>Z tohoto důvodu mají některé počítačové hry tzv. <b>FPS lock</b> (zámek počtu snímků za sekundu) nastaven na stabilní hodnotu. Hra vypadá plynuleji při stabilních 30 FPS než při 60 FPS, které se občas propadnou na 40 FPS. Ne jinak je tomu u animací v prohlížeči…</p>

    <div class="external-content">
      <ul>
        <li>IGN: <a href="http://www.ign.com/articles/2014/11/05/understanding-frame-rate-and-its-importance">Understanding the Importance of Frame Rate</a></li>
      </ul>
    </div>
  </li>
  
  
  <li>
    <p>U <b>animací</b> typicky <b>není tak podstatná doba běhu</b>, ale hlavně je užitečné, aby byly plynulé, když je návštěvník vidí.</p>
    
    <p>Pokud je <b>záložka s animujícím se webem neaktivní</b>, je zbytečné, aby časovač běžel (dnešní prohlížeče zpravidla v takovém případě automaticky snižují četnost časovače).</p>
    
    <p>Stejně tak v režimu úspory energie návštěvník ocení úspornější animaci s nižším FPS než přesně načasovanou animaci pomocí intervalu, která mu za chvíli vycucne baterii.</p>
  </li>
</ol>







<h2 id="vysvetleni">Vysvětlení <code>requestAnimationFrame</code></h2>

<p>Použití <code>requestAnimationFrame</code> přenese starosti ohledně intervalu spouštění animace na prohlížeč. Ten potom další krok animace spustí v okamžiku, <b>kdy uzná za vhodné</b>.</p>





<h2 id="podpora">Podpora</h2>

<p>Požadavek na snímek animace podporují všechny moderní prohlížeče včetně <b>Chrome</b>, <b>Firefoxu</b>, <b>Safari</b> a <b>Edge</b>. Podpora sahá až k <b>IE 10+</b>. V dnešní době již není potřeba používat prefixy ani polyfilly pro většinu aplikací.</p>

<p>V moderních prohlížečích stačí použít:</p>

<pre><code>const rAF = window.requestAnimationFrame;
const cAF = window.cancelAnimationFrame;</code></pre>

<p>Pro zpětnou kompatibilitu se staršími prohlížeči:</p>

<pre><code>const rAF = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || 
  window.setTimeout;

const cAF = window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.clearTimeout;</code></pre>






<p>Animování potom vypadá následovně:</p>

<pre><code>function animace() {
  // Kód samotné animace
  …
  // Spuštění dalšího kroku animace, až bude prohlížeč chtít
  rAF(animace);
}

// Spuštění animace, až se to bude hodit
rAF(animace);</code></pre>

<h3 id="zastaveni-animace">Zastavení animace</h3>

<p>Pro zastavení animace je potřeba použít <code>cancelAnimationFrame</code>:</p>

<pre><code>let animationId;

function animace() {
  // Kód samotné animace
  …
  
  // Spuštění dalšího kroku animace
  animationId = requestAnimationFrame(animace);
}

// Spuštění animace
animationId = requestAnimationFrame(animace);

// Zastavení animace
cancelAnimationFrame(animationId);</code></pre>

<p>Bez <code>cancelAnimationFrame</code> by animace běžela nekonečně, což by způsobovalo zbytečné zatížení prohlížeče.</p>

<h3 id="prakticky-priklad">Praktický příklad</h3>

<p>Zde je kompletní příklad animace posunu elementu:</p>

<pre><code>function animateElement(element, startX, endX, duration) {
  const startTime = performance.now();
  let animationId;
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing funkce pro plynulejší animaci
    const easeInOut = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
    const currentX = startX + (endX - startX) * easeInOut;
    element.style.transform = `translateX(${currentX}px)`;
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  }
  
  animationId = requestAnimationFrame(animate);
  return animationId;
}

// Použití
const box = document.querySelector('.box');
const animationId = animateElement(box, 0, 200, 1000);

// Zastavení animace (např. při kliknutí)
box.addEventListener('click', () => {
  cancelAnimationFrame(animationId);
});</code></pre>












<h2 id="moderni-alternativy">Moderní alternativy</h2>

<p>V dnešní době existují pokročilejší způsoby animování:</p>

<h3 id="web-animations-api">Web Animations API</h3>

<p>Web Animations API poskytuje lepší kontrolu nad animacemi než <code>requestAnimationFrame</code>:</p>

<pre><code>const element = document.querySelector('.animated');
element.animate([
  { transform: 'translateX(0px)', opacity: 1 },
  { transform: 'translateX(100px)', opacity: 0.5 }
], {
  duration: 1000,
  easing: 'ease-in-out',
  iterations: Infinity
});</code></pre>

<h3 id="css-custom-properties">CSS Custom Properties s JavaScript</h3>

<p>Kombinace CSS custom properties s JavaScript umožňuje plynulé animace:</p>

<pre><code>// JavaScript
const element = document.querySelector('.animated');
let progress = 0;

function animate() {
  progress += 0.01;
  element.style.setProperty('--progress', progress);
  
  if (progress < 1) {
    requestAnimationFrame(animate);
  }
}

animate();</code></pre>

<pre><code>/* CSS */
.animated {
  --progress: 0;
  transform: translateX(calc(var(--progress) * 100px));
  transition: transform 0.1s ease-out;
}</code></pre>

<h2 id="kdy-pouzit">Kdy použít <code>requestAnimationFrame</code> v dnešní době?</h2>

<p>I když existují modernější alternativy, <code>requestAnimationFrame</code> zůstává užitečný pro specifické případy:</p>

<h3 id="vlastni-animacni-logika">Vlastní animační logika</h3>

<ul>
  <li>Složitá matematika nebo logika v každém snímku</li>
  <li>Animace založené na fyzice (gravitace, kolize, pružiny)</li>
  <li>Interaktivní animace reagující na vstup uživatele</li>
</ul>

<h3 id="vykonnostne-kriticke-aplikace">Výkonnostně kritické aplikace</h3>

<ul>
  <li>Hry v prohlížeči</li>
  <li>Data vizualizace s tisíci elementy</li>
  <li>Canvas animace</li>
  <li>WebGL aplikace</li>
</ul>

<h3 id="kombinace-s-css">Kombinace s CSS</h3>

<ul>
  <li>Ovlivňování CSS custom properties z JavaScriptu</li>
  <li>Synchronizace více animací</li>
  <li>Animace závislé na scroll pozici</li>
</ul>

<h3 id="prakticky-priklad-scroll">Praktický příklad – scroll indikátor</h3>

<pre><code>function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  
  document.querySelector('.scroll-indicator').style.width = `${progress}%`;
}

// Spuštění při scroll události
window.addEventListener('scroll', () => {
  requestAnimationFrame(updateScrollProgress);
});

// Pro zastavení scroll animace při opuštění stránky
window.addEventListener('beforeunload', () => {
  // Zde by se volal cancelAnimationFrame pokud bychom měli ID
});</code></pre>

<h3 id="kdy-pouzit-alternativy">Kdy použít modernější alternativy</h3>

<p><b>CSS Animations/Transitions</b> – pro jednoduché animace:</p>

<pre><code>/* CSS */
.element {
  transition: transform 0.3s ease;
}
.element:hover {
  transform: scale(1.1);
}</code></pre>

<p><b>Web Animations API</b> – pro pokročilé animace s JS kontrolou:</p>

<pre><code>element.animate([
  { transform: 'translateX(0px)' },
  { transform: 'translateX(100px)' }
], { duration: 1000, easing: 'ease-in-out' });</code></pre>

<p><b>Závěr:</b> <code>requestAnimationFrame</code> není zastaralý, ale je to nástroj pro specifické případy. Pro většinu animací jsou lepší CSS nebo Web Animations API, ale pro složité, interaktivní nebo výkonnostně kritické animace zůstává <code>requestAnimationFrame</code> nejlepší volbou.</p>

<h2 id="performance-a-debugging">Performance a debugging</h2>

<h3 id="mereni-fps">Měření FPS</h3>

<p>Pro sledování výkonu animací je užitečné měřit skutečné FPS:</p>

<pre><code>let frameCount = 0;
let lastTime = performance.now();

function measureFPS() {
  frameCount++;
  const currentTime = performance.now();
  
  if (currentTime - lastTime >= 1000) {
    const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
    console.log(`FPS: ${fps}`);
    
    frameCount = 0;
    lastTime = currentTime;
  }
  
  requestAnimationFrame(measureFPS);
}

measureFPS();</code></pre>

<h3 id="devtools">DevTools pro animace</h3>

<p>Moderní prohlížeče nabízejí nástroje pro analýzu animací:</p>

<ul>
  <li><b>Chrome DevTools</b> – Performance tab s Frame timeline</li>
  <li><b>Firefox DevTools</b> – Performance panel s Frame rate grafy</li>
  <li><b>Safari Web Inspector</b> – Timeline tab pro analýzu animací</li>
</ul>

<h2 id="pokrocilé-techniky">Pokročilé techniky</h2>

<h3 id="throttling">Throttling s requestAnimationFrame</h3>

<p>Pro optimalizaci scroll nebo resize událostí:</p>

<pre><code>let ticking = false;

function updateLayout() {
  // Náročná operace
  console.log('Layout updated');
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateLayout);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick);</code></pre>

<h3 id="batch-rendering">Batch rendering</h3>

<p>Pro animace s mnoha elementy:</p>

<pre><code>const elements = document.querySelectorAll('.animated');
let currentIndex = 0;

function animateBatch() {
  const batchSize = 10;
  const endIndex = Math.min(currentIndex + batchSize, elements.length);
  
  for (let i = currentIndex; i < endIndex; i++) {
    elements[i].style.transform = `translateX(${i * 10}px)`;
  }
  
  currentIndex = endIndex;
  
  if (currentIndex < elements.length) {
    requestAnimationFrame(animateBatch);
  }
}

animateBatch();</code></pre>

<h2 id="efektivnější-alternativy">Efektivnější alternativy k <code>requestAnimationFrame</code></h2>

<p>I když je <code>requestAnimationFrame</code> lepší než <code>setTimeout</code>, existují ještě efektivnější způsoby animování:</p>

<h3 id="css-animations">CSS Animations/Transitions – Nejefektivnější</h3>

<pre><code>/* CSS */
.element {
  transition: transform 0.3s ease;
}
.element:hover {
  transform: translateX(100px);
}</code></pre>

<p><b>Výhody:</b></p>
<ul>
  <li>Hardware acceleration (GPU)</li>
  <li>Prohlížeč optimalizuje automaticky</li>
  <li>Žádný JavaScript overhead</li>
  <li>Nejlepší performance</li>
</ul>

<h3 id="web-animations-api-efektivni">Web Animations API – Moderní a efektivní</h3>

<pre><code>element.animate([
  { transform: 'translateX(0px)' },
  { transform: 'translateX(100px)' }
], { 
  duration: 1000,
  easing: 'ease-in-out'
});</code></pre>

<p><b>Výhody:</b></p>
<ul>
  <li>GPU acceleration</li>
  <li>Lepší kontrola než CSS</li>
  <li>Synchronizace více animací</li>
  <li>Compositor thread</li>
</ul>

<h3 id="css-custom-properties-hybrid">CSS Custom Properties + rAF – Hybridní přístup</h3>

<pre><code>// JavaScript – pouze update hodnot
element.style.setProperty('--x', x + 'px');</code></pre>

<pre><code>/* CSS – animace */
.element {
  transform: translateX(var(--x));
  transition: transform 0.1s ease-out;
}</code></pre>

<h3 id="canvas-webgl">Canvas/WebGL – Pro složité animace</h3>

<p>Canvas a WebGL animace také používají <code>requestAnimationFrame</code> pro synchronizaci s refresh rate monitoru, ale jsou efektivnější než DOM animace:</p>

<pre><code>const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Vykreslení
  requestAnimationFrame(animate);
}</code></pre>

<p><b>Výhody Canvas/WebGL:</b></p>
<ul>
  <li>Žádné DOM manipulace</li>
  <li>Hardware acceleration</li>
  <li>Lepší performance pro složité animace</li>
  <li>Plná kontrola nad vykreslováním</li>
</ul>

<h3 id="intersection-observer">Intersection Observer + CSS – Lazy animace</h3>

<pre><code>const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
});

document.querySelectorAll('.lazy-animate').forEach(el => {
  observer.observe(el);
});</code></pre>

<h3 id="performance-hierarchy">Performance hierarchy</h3>

<p>Od nejefektivnější po nejméně efektivní:</p>

<ol>
  <li><b>CSS Transitions</b> – nejrychlejší</li>
  <li><b>CSS Animations</b> – velmi rychlé</li>
  <li><b>Web Animations API</b> – rychlé + kontrola</li>
  <li><b>Canvas/WebGL + rAF</b> – efektivní pro složité animace</li>
  <li><b>CSS Custom Properties + rAF</b> – dobré</li>
  <li><b>DOM + requestAnimationFrame</b> – flexibilní, ale pomalejší</li>
  <li><b>setTimeout/setInterval</b> – nejpomalejší</li>
</ol>

<h3 id="kdy-pouzit-efektivni">Kdy použít co</h3>

<ul>
  <li><b>CSS</b> – pro jednoduché animace</li>
  <li><b>Web Animations API</b> – pro složité animace s JS kontrolou</li>
  <li><b>Canvas/WebGL + rAF</b> – pro hry, data vizualizace nebo složité animace</li>
  <li><b>DOM + rAF</b> – pro vlastní logiku nebo interaktivní animace</li>
</ul>

<p><b>Závěr:</b> Pro většinu případů jsou CSS animace nejefektivnější. <code>requestAnimationFrame</code> je nejlepší volba pouze když potřebujete vlastní animační logiku nebo interaktivitu.</p>

<h2 id="caste-problemy">Často se vyskytující problémy a řešení</h2>

<h3 id="memory-leaks">Memory leaks</h3>

<p>Častý problém je zapomenutí na <code>cancelAnimationFrame</code>:</p>

<pre><code>// ❌ Špatně – memory leak
function startAnimation() {
  function animate() {
    // animace
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// ✅ Správně – cleanup
let animationId;
function startAnimation() {
  function animate() {
    // animace
    animationId = requestAnimationFrame(animate);
  }
  animationId = requestAnimationFrame(animate);
}

function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
}</code></pre>

<h3 id="nekonecne-animace">Nekonečné animace</h3>

<p>Vždy definujte podmínku pro ukončení:</p>

<pre><code>function animateWithCondition() {
  let progress = 0;
  
  function animate() {
    progress += 0.01;
    
    // ✅ Podmínka pro ukončení
    if (progress >= 1) {
      return; // Ukončí animaci
    }
    
    element.style.transform = `translateX(${progress * 100}px)`;
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
}</code></pre>

<h3 id="konflikty-css">Konflikty s CSS animacemi</h3>

<p>JavaScript animace mohou konfliktovat s CSS:</p>

<pre><code>// ❌ Konflikt
element.style.transform = 'translateX(100px)'; // JS
element.classList.add('animate'); // CSS animace

// ✅ Správně – použijte pouze jeden přístup
element.style.transform = 'translateX(100px)'; // Pouze JS
// NEBO
element.classList.add('animate'); // Pouze CSS</code></pre>

<h2 id="framework-integration">Framework integrace</h2>

<h3 id="react">React</h3>

<pre><code>import { useEffect, useRef } from 'react';

function AnimatedComponent() {
  const animationRef = useRef();
  const elementRef = useRef();
  
  useEffect(() => {
    function animate() {
      // animace
      animationRef.current = requestAnimationFrame(animate);
    }
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return <div ref={elementRef} className="animated" />;
}</code></pre>

<h3 id="vue">Vue</h3>

<pre><code>export default {
  mounted() {
    this.startAnimation();
  },
  
  beforeUnmount() {
    this.stopAnimation();
  },
  
  methods: {
    startAnimation() {
      this.animationId = requestAnimationFrame(this.animate);
    },
    
    animate() {
      // animace
      this.animationId = requestAnimationFrame(this.animate);
    },
    
    stopAnimation() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
    }
  }
}</code></pre>

<h3 id="svelte">Svelte</h3>

<pre><code>&lt;script&gt;
  import { onMount, onDestroy } from 'svelte';
  
  let animationId;
  
  onMount(() => {
    function animate() {
      // animace
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
  });
  
  onDestroy(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
&lt;/script&gt;

&lt;div class="animated"&gt;Animovaný element&lt;/div&gt;</code></pre>

<h2 id="pokrocilé-animace">Pokročilé animace</h2>

<h3 id="physics-engine">Physics engine</h3>

<pre><code>class PhysicsAnimation {
  constructor(element) {
    this.element = element;
    this.velocity = { x: 0, y: 0 };
    this.position = { x: 0, y: 0 };
    this.gravity = 0.5;
    this.friction = 0.98;
  }
  
  animate() {
    // Aplikace gravitace
    this.velocity.y += this.gravity;
    
    // Aplikace tření
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    
    // Update pozice
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    
    // Kolize se zemí
    if (this.position.y > 300) {
      this.position.y = 300;
      this.velocity.y *= -0.7; // Odraz
    }
    
    // Aplikace na DOM
    this.element.style.transform = 
      `translate(${this.position.x}px, ${this.position.y}px)`;
    
    requestAnimationFrame(() => this.animate());
  }
  
  start() {
    this.animate();
  }
}</code></pre>

<h3 id="smooth-scrolling">Smooth scrolling</h3>

<pre><code>function smoothScrollTo(targetY, duration = 1000) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing funkce
    const easeInOutCubic = progress < 0.5 
      ? 4 * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
    const currentY = startY + distance * easeInOutCubic;
    window.scrollTo(0, currentY);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

// Použití
document.querySelector('.scroll-button').addEventListener('click', () => {
  smoothScrollTo(1000);
});</code></pre>

<h2 id="best-practices">Best practices</h2>

<h3 id="optimalizace">Optimalizace pro mobilní zařízení</h3>

<ul>
  <li>Používejte <code>transform</code> a <code>opacity</code> místo <code>left</code>/<code>top</code></li>
  <li>Vyhýbejte se animacím <code>width</code>/<code>height</code> a <code>margin</code>/<code>padding</code></li>
  <li>Zvažte snížení FPS na 30 pro úsporu baterie</li>
  <li>Používejte <code>will-change</code> CSS vlastnost pro optimalizaci</li>
</ul>

<h3 id="accessibility">Accessibility</h3>

<ul>
  <li>Respektujte <code>prefers-reduced-motion</code> media query</li>
  <li>Poskytněte možnost zastavit animace</li>
  <li>Nepoužívejte animace pro kritické informace</li>
</ul>

<pre><code>// Respektování prefers-reduced-motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  startAnimation();
}</code></pre>

<h3 id="error-handling">Error handling</h3>

<pre><code>function safeAnimation(callback) {
  try {
    requestAnimationFrame(callback);
  } catch (error) {
    console.error('Animation error:', error);
    // Fallback nebo cleanup
  }
}</code></pre>

<h2 id="odkazy">Odkazy jinam</h2>

<div class="external-content">
  <ul>
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame">requestAnimationFrame API</a></li>
    
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API">Web Animations API</a></li>
    
    <li>CSS-Tricks: <a href="https://css-tricks.com/using-requestanimationframe/">Using requestAnimationFrame</a></li>
    
    <li>Google Developers: <a href="https://developers.google.com/web/fundamentals/design-and-ux/animations/animations-and-performance">Animations and Performance</a></li>
  </ul>
</div>