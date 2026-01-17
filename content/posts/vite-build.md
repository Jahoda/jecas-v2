---
title: "Jak Vite sestavuje build"
headline: "Jak Vite sestavuje build"
description: "Vite používá HTML jako vstupní bod a sleduje importy. Entry points, pre-bundling, monorepo."
date: "2026-01-17"
status: 1
tags: ["js", "knihovny"]
format: "html"
---

<p><a href="https://vite.dev/">Vite</a> je moderní build nástroj, který se od tradičních bundlerů typu Webpack liší především způsobem, jakým hledá a zpracovává soubory. Pojďme se podívat, jak to celé funguje.</p>

<h2 id="vstupni-bod">HTML jako vstupní bod</h2>

<p>Na rozdíl od Webpacku, kde se definuje JavaScript soubor jako entry point, Vite staví na <b>HTML souborech</b>.</p>

<p>Ve výchozím nastavení Vite použije <code>&lt;root&gt;/index.html</code> jako vstupní bod. V tomto HTML souboru hledá značky:</p>

<pre><code>&lt;script type="module" src="/src/main.js">&lt;/script></code></pre>

<p>Tento přístup je záměrný – HTML je skutečným vstupním bodem webové aplikace a Vite s ním tak i pracuje.</p>


<h2 id="sledovani-importu">Sledování importů</h2>

<p>Jakmile Vite najde vstupní JavaScript soubor, <b>sleduje všechny importy</b> a postupně prochází celý strom závislostí.</p>

<p>To znamená, že Vite nezpracovává všechny soubory ve složce <code>src/</code>, ale pouze ty, které jsou skutečně importovány.</p>

<pre><code>// main.js
import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'

createApp(App).mount('#app')</code></pre>

<p>V tomto příkladu Vite zpracuje:</p>

<ol>
  <li><code>vue</code> z <code>node_modules</code></li>
  <li><code>App.vue</code> a všechny jeho závislosti</li>
  <li><code>main.css</code> a případné <code>@import</code> v něm</li>
</ol>

<p>Soubory, které nikdo neimportuje, se do buildu nedostanou.</p>


<h2 id="pre-bundling">Pre-bundling závislostí</h2>

<p>Při prvním spuštění dev serveru Vite prochází zdrojový kód a hledá <b>bare importy</b> – tedy importy balíčků z <code>node_modules</code>.</p>

<pre><code>import lodash from 'lodash-es'  // bare import
import './utils.js'              // relativní import</code></pre>

<p>Pre-bundling řeší dva problémy:</p>

<h3 id="konverse-formatu">Konverse formátů</h3>

<p>Mnoho npm balíčků je distribuováno jako CommonJS nebo UMD. Vite je musí převést na ESM, protože dev server pracuje výhradně s nativními ES moduly.</p>

<p>Jaký je mezi nimi rozdíl?</p>

<h4 id="commonjs">CommonJS (CJS)</h4>

<p>Původní modulový systém Node.js. Používá <code>require()</code> a <code>module.exports</code>:</p>

<pre><code>// math.js (CommonJS)
const PI = 3.14159
function add(a, b) {
  return a + b
}
module.exports = { PI, add }

// použití
const math = require('./math')
console.log(math.add(2, 3))</code></pre>

<p>CommonJS moduly se načítají <b>synchronně</b>. Prohlížeče tento formát nativně nepodporují.</p>

<h4 id="umd">UMD (Universal Module Definition)</h4>

<p>Hybridní formát kompatibilní s CommonJS, AMD i globálními proměnnými:</p>

<pre><code>// UMD wrapper (zjednodušeně)
(function (root, factory) {
  if (typeof define === 'function' &amp;&amp; define.amd) {
    define(['dependency'], factory)  // AMD
  } else if (typeof module === 'object') {
    module.exports = factory(require('dependency'))  // CommonJS
  } else {
    root.MyLib = factory(root.Dependency)  // globální proměnná
  }
}(this, function (dep) {
  return { /* ... */ }
}))</code></pre>

<p>UMD vznikl jako universální řešení před standardisací ES modulů. Dnes je považován za <i>legacy</i> formát.</p>

<h4 id="esm">ESM (ES Modules)</h4>

<p>Nativní modulový systém JavaScriptu (od ES2015). Používá <code>import</code> a <code>export</code>:</p>

<pre><code>// math.js (ESM)
export const PI = 3.14159
export function add(a, b) {
  return a + b
}

// použití
import { PI, add } from './math.js'
console.log(add(2, 3))</code></pre>

<p>ESM moduly se načítají <b>asynchronně</b> a podporují statickou analysu – bundler tak může provést tree-shaking a odstranit nepoužitý kód.</p>

<h4 id="proc-konverse">Proč Vite potřebuje konversi</h4>

<p>Během vývoje Vite posílá moduly přímo do prohlížeče. Prohlížeče ale rozumí pouze ESM syntaxi (<code>import</code>/<code>export</code>). Pokud nějaký balíček používá <code>require()</code>, prohlížeč ho nedokáže spustit. Proto Vite při pre-bundlingu převádí CommonJS a UMD balíčky na ESM.</p>

<h3 id="optimalisace-http">Optimalisace HTTP požadavků</h3>

<p>Některé ESM balíčky mají stovky interních modulů. Například <code>lodash-es</code> obsahuje přes 600 souborů.</p>

<p>Bez pre-bundlingu by prohlížeč musel stáhnout každý modul zvlášť. Vite je sloučí do jednoho souboru a dramaticky tak sníží počet HTTP požadavků.</p>


<h2 id="cache">Cachování</h2>

<p>Výsledky pre-bundlingu se ukládají do <code>node_modules/.vite</code>. Vite znovu prebundluje pouze když:</p>

<ul>
  <li>Se změní lockfile (<code>package-lock.json</code>, <code>pnpm-lock.yaml</code>)</li>
  <li>Se změní <code>vite.config.js</code></li>
  <li>Se změní <code>NODE_ENV</code></li>
</ul>

<p>Pro vynucení nového prebundlingu lze použít <code>--force</code> flag.</p>


<h2 id="vice-stranek">Více vstupních bodů</h2>

<p>Pro aplikace s více stránkami lze nakonfigurovat více HTML souborů:</p>

<pre><code>// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
      },
    },
  },
})</code></pre>

<p>Vite pak zpracuje oba HTML soubory a jejich závislosti.</p>


<h2 id="knihovny">Režim knihovny</h2>

<p>Pro tvorbu knihoven se HTML jako vstupní bod nehodí. Vite proto nabízí <b>library mode</b>:</p>

<pre><code>// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MojeKnihovna',
      fileName: 'moje-knihovna',
    },
  },
})</code></pre>

<p>V tomto režimu Vite přímo použije zadaný JavaScript soubor jako vstupní bod.</p>


<h2 id="monorepo">Monorepo a workspaces</h2>

<p>Vite umí pracovat s <b>propojenými balíčky</b> v rámci monorepa (pnpm workspaces, npm workspaces, yarn workspaces).</p>

<h3 id="linked-packages">Propojené balíčky</h3>

<p>Balíčky ze stejného repozitáře Vite automaticky detekuje a zachází s nimi jako se zdrojovým kódem – <b>neprebundluje je</b>.</p>

<p>To znamená, že změny v propojeném balíčku se okamžitě projeví bez nutnosti rebuildu.</p>

<pre><code>// package.json v apps/web
{
  "dependencies": {
    "@muj-projekt/ui": "workspace:*",
    "@muj-projekt/utils": "workspace:*"
  }
}</code></pre>

<h3 id="commonjs-v-monorepu">CommonJS v monorepu</h3>

<p>Pokud propojený balíček není v ESM formátu, je potřeba ho explicitně přidat do konfigurace:</p>

<pre><code>// vite.config.js
export default defineConfig({
  optimizeDeps: {
    include: ['@muj-projekt/legacy-utils'],
  },
  build: {
    commonjsOptions: {
      include: [/@muj-projekt\/legacy-utils/, /node_modules/],
    },
  },
})</code></pre>

<h3 id="hmr-v-monorepu">HMR v monorepu</h3>

<p>Pro správné fungování Hot Module Replacement v monorepu může být potřeba nastavit <code>server.watch</code>:</p>

<pre><code>// vite.config.js
export default defineConfig({
  server: {
    watch: {
      // Sledovat změny i v nadřazených složkách
      ignored: ['!**/node_modules/@muj-projekt/**'],
    },
  },
})</code></pre>


<h2 id="rollup">Rollup pod kapotou</h2>

<p>Pro produkční build Vite používá <a href="https://rollupjs.org/">Rollup</a>. Ten přebírá vstupní body a:</p>

<ol>
  <li>Analyzuje všechny importy</li>
  <li>Provádí tree-shaking (odstraňuje nepoužitý kód)</li>
  <li>Vytváří optimalisované chunky</li>
  <li>Minifikuje výstup</li>
</ol>

<p>Vite přidává předkonfigurované nastavení optimalisované pro moderní prohlížeče, ale veškeré Rollup možnosti jsou dostupné přes <code>build.rollupOptions</code>.</p>


<h2 id="souhrn">Souhrn</h2>

<table>
  <thead>
    <tr>
      <th>Co</th>
      <th>Jak to Vite řeší</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Vstupní bod</td>
      <td>HTML soubory (výchozí <code>index.html</code>)</td>
    </tr>
    <tr>
      <td>Hledání souborů</td>
      <td>Sledování importů od vstupního bodu</td>
    </tr>
    <tr>
      <td>npm balíčky</td>
      <td>Pre-bundling do <code>node_modules/.vite</code></td>
    </tr>
    <tr>
      <td>Workspace balíčky</td>
      <td>Zpracovány jako zdrojový kód</td>
    </tr>
    <tr>
      <td>Produkční build</td>
      <td>Rollup s tree-shakingem</td>
    </tr>
  </tbody>
</table>

<p>Tento přístup – sledování importů místo skenování složek – zajišťuje, že se zpracují pouze importované soubory. Díky tree-shakingu se navíc z importovaných modulů odstraní nepoužité exporty (funkce, konstanty), pokud nemají vedlejší efekty.</p>
