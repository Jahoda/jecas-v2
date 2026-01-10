---
title: "Fresh: Deno framework s islands architekturou"
headline: "Fresh: Deno framework s islands architekturou"
description: "Porovnání Fresh frameworku s React/Next.js a Svelte/SvelteKit - build proces, runtime, reaktivita a šablony."
date: "2026-01-10"
last_modification: "2026-01-10"
status: 1
tags: ["js", "frameworky"]
format: "html"
---

<p><a href="https://fresh.deno.dev">Fresh</a> je webový framework postavený na <b>Deno</b>, který přináší zajímavý přístup k tvorbě webových aplikací. Na rozdíl od tradičních frameworků jako Next.js nebo SvelteKit používá tzv. <b>islands architekturu</b> a nemá žádný build krok.</p>

<h2 id="co-je-fresh">Co je Fresh</h2>

<p>Fresh je framework pro <b>server-side rendering</b> s minimálním JavaScriptem na klientu. Stránky se renderují na serveru jako <b>Preact komponenty</b> a ve výchozím stavu se do prohlížeče neposílá žádný JavaScript.</p>

<p>Interaktivita se přidává pouze tam, kde je potřeba – pomocí tzv. <b>islands</b> (ostrovů). Zbytek stránky zůstává jako statické HTML.</p>

<h2 id="islands-architektura">Islands architektura</h2>

<p>Hlavní myšlenka islands architektury je jednoduchá: <b>většina webových stránek je statická</b>. Interaktivní jsou jen některé části – formuláře, menu, košík v e-shopu.</p>

<p>Proč tedy hydratovat celou stránku JavaScriptem, když interaktivní je jen malá část?</p>

<pre><code>// Fresh – pouze CartWidget dostane JavaScript
export default function ProductPage() {
  return (
    &lt;div>
      &lt;Header />        {/* Statické HTML */}
      &lt;ProductGallery /> {/* Statické HTML */}
      &lt;CartWidget />     {/* Island: ~15 KB JS */}
      &lt;Footer />         {/* Statické HTML */}
    &lt;/div>
  );
}</code></pre>

<p>Srovnejme s tradičním přístupem v Next.js:</p>

<pre><code>// Next.js – celá stránka se hydratuje (~150 KB JS)
export default function ProductPage() {
  return (
    &lt;div>
      &lt;Header />
      &lt;ProductGallery />
      &lt;CartWidget />
      &lt;Footer />
    &lt;/div>
  );
}</code></pre>

<p>Rozdíl může být <b>až 10×</b> v množství JavaScriptu poslaného do prohlížeče.</p>

<h2 id="build-runtime">Build a runtime na produkci</h2>

<p>Zde je zásadní rozdíl mezi Fresh a ostatními frameworky.</p>

<h3 id="fresh-zero-build">Fresh: Zero build</h3>

<p>Fresh <b>nemá build krok</b>. Kód se kompiluje za běhu přímo v Deno. To znamená:</p>

<ul>
  <li>Žádný webpack, Vite, esbuild</li>
  <li>Žádné <code>node_modules</code></li>
  <li>Žádný <code>dist</code> nebo <code>.next</code> adresář</li>
  <li>TypeScript funguje nativně bez konfigurace</li>
</ul>

<p>Spuštění projektu:</p>

<pre><code>deno run -A main.ts</code></pre>

<p>Na produkci běží stejný kód jako při vývoji. Každý request renderuje stránku <b>just-in-time</b>.</p>

<h3 id="nextjs-build">Next.js: Tradiční build</h3>

<p>Next.js vyžaduje klasický build proces:</p>

<pre><code>npm run build    # Kompilace, bundling, optimalizace
npm run start    # Spuštění produkčního serveru</code></pre>

<p>Výstupem je adresář <code>.next</code> s optimalizovanými assety. Na produkci běží <b>předkompilovaný kód</b>.</p>

<h3 id="sveltekit-build">SvelteKit: Kompilace jako výhoda</h3>

<p>SvelteKit má také build krok, ale s důležitým rozdílem – Svelte je <b>kompilátor</b>:</p>

<pre><code>npm run build    # Svelte kompiluje komponenty na vanilla JS
npm run preview  # Náhled produkčního buildu</code></pre>

<p>Svelte kompilace odstraní framework runtime z výsledného kódu. Proto má SvelteKit typicky <b>o 50% menší bundle</b> než React/Next.js.</p>

<h3 id="srovnani-build">Srovnání build procesu</h3>

<table>
  <thead>
    <tr>
      <th>Framework</th>
      <th>Build krok</th>
      <th>Výstup na produkci</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Fresh</td>
      <td>Žádný</td>
      <td>Zdrojový kód + Deno runtime</td>
    </tr>
    <tr>
      <td>Next.js</td>
      <td>Webpack/Turbopack</td>
      <td>Optimalizované bundly + Node.js</td>
    </tr>
    <tr>
      <td>SvelteKit</td>
      <td>Vite + Svelte compiler</td>
      <td>Vanilla JS + adapter (Node/Edge)</td>
    </tr>
  </tbody>
</table>

<h2 id="rychlost">Rychlost a výkon</h2>

<h3 id="bundle-size">Velikost bundlu</h3>

<p>Díky islands architektuře Fresh posílá <b>60–80% méně JavaScriptu</b> než Next.js. SvelteKit je někde mezi – menší bundle než React díky kompilaci, ale stále hydratuje celou stránku.</p>

<table>
  <thead>
    <tr>
      <th>Framework</th>
      <th>Typický JS bundle</th>
      <th>Poznámka</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Fresh</td>
      <td>15–30 KB</td>
      <td>Pouze interaktivní ostrovy</td>
    </tr>
    <tr>
      <td>SvelteKit</td>
      <td>50–80 KB</td>
      <td>Žádný runtime, kompilovaný kód</td>
    </tr>
    <tr>
      <td>Next.js</td>
      <td>100–200 KB</td>
      <td>React runtime + komponenty</td>
    </tr>
  </tbody>
</table>

<h3 id="tti">Time to Interactive (TTI)</h3>

<p>Fresh dosahuje <b>nejrychlejší interaktivity</b>, protože prohlížeč zpracovává minimum JavaScriptu. SvelteKit je druhý díky menšímu bundlu. Next.js je nejpomalejší kvůli velikosti React runtime.</p>

<p>Reálné výsledky z produkce (Deco.cx): přechod na Fresh přinesl <b>5× rychlejší načítání</b> a <b>30% nárůst konverzí</b>.</p>

<h3 id="ttfb">Time to First Byte (TTFB)</h3>

<p>Zde je situace složitější:</p>

<ul>
  <li><b>Fresh</b> – každý request renderuje stránku znovu (žádný cache ve výchozím stavu)</li>
  <li><b>Next.js</b> – nabízí SSG, ISR, edge caching</li>
  <li><b>SvelteKit</b> – podobné možnosti jako Next.js</li>
</ul>

<p>Pro statické stránky může být Next.js/SvelteKit rychlejší díky předrenderování. Fresh ale může použít edge deployment na Deno Deploy.</p>

<h2 id="reaktivita">Rozdíly v reaktivitě</h2>

<h3 id="fresh-signals">Fresh: Preact Signals</h3>

<p>Fresh používá <b>Preact Signals</b> pro reaktivitu v islands:</p>

<pre><code>import { signal } from "@preact/signals";

// Vytvoření reaktivní hodnoty
const count = signal(0);

export default function Counter() {
  return (
    &lt;div>
      &lt;p>Počet: {count}&lt;/p>
      &lt;button onClick={() => count.value++}>+&lt;/button>
    &lt;/div>
  );
}</code></pre>

<p>Signals jsou <b>jemnozrnné</b> – při změně se překreslí jen ta část DOM, která signál používá, ne celá komponenta.</p>

<h3 id="svelte-runes">Svelte: Runes (Svelte 5)</h3>

<p>Svelte 5 přináší <b>runes</b> – nový systém reaktivity:</p>

<pre><code>&lt;script>
  let count = $state(0);

  function increment() {
    count++;
  }
&lt;/script>

&lt;p>Počet: {count}&lt;/p>
&lt;button onclick={increment}>+&lt;/button></code></pre>

<p>Svelte kompiluje reaktivitu do vanilla JS. Žádný runtime, změny jsou <b>sledované kompilátorem</b>.</p>

<h3 id="react-hooks">React/Next.js: Hooks</h3>

<p>React používá <b>hooks</b> a virtuální DOM:</p>

<pre><code>import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div>
      &lt;p>Počet: {count}&lt;/p>
      &lt;button onClick={() => setCount(count + 1)}>+&lt;/button>
    &lt;/div>
  );
}</code></pre>

<p>Při každé změně stavu se překreslí <b>celá komponenta</b> a React porovná virtuální DOM s reálným.</p>

<h3 id="srovnani-reaktivita">Srovnání reaktivity</h3>

<table>
  <thead>
    <tr>
      <th>Framework</th>
      <th>Mechanismus</th>
      <th>Granularita</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Fresh (Signals)</td>
      <td>Jemnozrnná reaktivita</td>
      <td>Pouze změněné DOM uzly</td>
    </tr>
    <tr>
      <td>Svelte (Runes)</td>
      <td>Kompilovaná reaktivita</td>
      <td>Pouze změněné DOM uzly</td>
    </tr>
    <tr>
      <td>React (Hooks)</td>
      <td>Virtual DOM diffing</td>
      <td>Celá komponenta + děti</td>
    </tr>
  </tbody>
</table>

<h2 id="sablony">Rozdíly v šablonách</h2>

<h3 id="fresh-jsx">Fresh: JSX/TSX</h3>

<p>Fresh používá standardní <b>JSX</b> syntaxi (Preact je API kompatibilní s Reactem):</p>

<pre><code>export default function Article({ title, content }) {
  return (
    &lt;article>
      &lt;h1>{title}&lt;/h1>
      &lt;div dangerouslySetInnerHTML={{ __html: content }} />
    &lt;/article>
  );
}</code></pre>

<p>Výhody: známá syntaxe pro React vývojáře, plná síla JavaScriptu/TypeScriptu.</p>

<h3 id="svelte-template">Svelte: Vlastní syntaxe</h3>

<p>Svelte má <b>vlastní šablonovací syntaxi</b>:</p>

<pre><code>&lt;script>
  let { title, content } = $props();
&lt;/script>

&lt;article>
  &lt;h1>{title}&lt;/h1>
  &lt;div>{@html content}&lt;/div>
&lt;/article></code></pre>

<p>Výhody: čistší syntaxe, méně boilerplate, HTML-first přístup.</p>

<h3 id="srovnani-sablony">Srovnání syntaxe</h3>

<table>
  <thead>
    <tr>
      <th>Vlastnost</th>
      <th>Fresh (JSX)</th>
      <th>Svelte</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Podmínky</td>
      <td><code>{condition && &lt;div/>}</code></td>
      <td><code>{#if condition}&lt;div/>{/if}</code></td>
    </tr>
    <tr>
      <td>Cykly</td>
      <td><code>{items.map(i => &lt;li>{i}&lt;/li>)}</code></td>
      <td><code>{#each items as i}&lt;li>{i}&lt;/li>{/each}</code></td>
    </tr>
    <tr>
      <td>CSS</td>
      <td>CSS-in-JS nebo externí soubory</td>
      <td>Scoped CSS přímo v komponentě</td>
    </tr>
    <tr>
      <td>Událost</td>
      <td><code>onClick={handler}</code></td>
      <td><code>onclick={handler}</code></td>
    </tr>
  </tbody>
</table>

<h2 id="ecosystem">Ekosystém a adopce</h2>

<p>Zde je Fresh v nevýhodě:</p>

<ul>
  <li><b>Fresh</b> – běží pouze na Deno, menší komunita, méně knihoven</li>
  <li><b>Next.js</b> – obrovský ekosystém, tisíce balíčků, široká adopce</li>
  <li><b>SvelteKit</b> – rostoucí komunita, dobrá dokumentace, npm kompatibilita</li>
</ul>

<h2 id="kdy-pouzit">Kdy použít Fresh</h2>

<p>Fresh je vhodný, pokud:</p>

<ul>
  <li>Chcete <b>minimální JavaScript</b> na klientu</li>
  <li>Preferujete <b>jednoduchost</b> bez build konfigurace</li>
  <li>Používáte nebo chcete používat <b>Deno</b></li>
  <li>Nasazujete na <b>edge</b> (Deno Deploy)</li>
  <li>Vytváříte <b>obsahové weby</b> s minimální interaktivitou</li>
</ul>

<h2 id="kdy-nepouzit">Kdy Fresh nepoužít</h2>

<p>Fresh není ideální pro:</p>

<ul>
  <li><b>Vysoce interaktivní aplikace</b> – dashboard, editor, hry</li>
  <li>Projekty vyžadující <b>rozsáhlý npm ekosystém</b></li>
  <li>Týmy zvyklé na <b>Node.js</b> workflow</li>
</ul>

<h2 id="zaver">Závěr</h2>

<p>Fresh představuje zajímavou alternativu k tradičním meta-frameworkům. Jeho <b>islands architektura</b> a <b>zero-build přístup</b> jsou osvěžující v době, kdy se build konfigurace stávají stále složitějšími.</p>

<p>Pro obsahové weby a projekty s důrazem na výkon může být Fresh výbornou volbou. Pro komplexní aplikace s bohatou interaktivitou ale zůstává Next.js nebo SvelteKit praktičtější volbou díky většímu ekosystému.</p>

<p>Klíčové je vybrat nástroj podle potřeb projektu, ne podle hype.</p>
