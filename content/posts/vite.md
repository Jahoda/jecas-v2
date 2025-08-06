---
title: "Vite – super rychlý dev server / build"
headline: "Vite – super rychlý dev server / build"
description: "Vite je nástroj pro neuvěřitelně rychlý dev server, hot reload a build JS/CSS."
date: "2021-03-01"
last_modification: "2021-03-01"
status: 1
tags: ["js", "produktivita"]
format: "html"
---

<p>V dnešní době se čím dál tím víc dbá na tzv. DX (<i lang="en">Developer Experience</i>) – tedy přívětivost pro vývojáře. Aby vývojář nemusel kvůli každé změně minutu čekat, složitě obnovovat stránku a proklikávat aplikaci.</p>

<p>Ve frontendovém světě CSS a JavaScriptu to typicky znamená, že se úpravy v kódu <b>ihned projevují</b> v živém prostředí prohlížeče, ideálně se zachováním stavu.</p>


<p>První pokusy o živou aplikaci změn se datují někam do roku <b>2013</b> (např. <a href="/zivy-nahled-css">LiveStyle</a>, <a href="/livereload">LiveReload</a>).</p>


<p>Následně se hojně používaly nástroje jako <a href="https://gruntjs.com">Grunt</a> a <a href="https://gulpjs.com">gulp.js</a>.</p>

<p>Později se stal celkem standardem <a href="https://webpack.js.org">webpack</a> se svým dev serverem. Mezi méně používané buildovací nástroje patří ještě třeba <a href="https://parceljs.org">Parcel</a> (zakládá si na minimální konfiguraci) nebo <a href="https://rollupjs.org/guide/en/">rollup.js</a>.</p>

<p>U větších projektů nastává typicky problém v tom, že <b>všechno trvá dlouho</b>. Zvlášť na slabších strojích může dev server servírující assety (CSS/JS/obrázky apod.) startovat klidně <b>několik minut</b> (tzv. studený start).</p>

<p>Následně jakákoliv změna trvá třeba v jednotkách až desítkách vteřin (tzv. hot reload).</p>

<p>V roce <b>2020</b> vzniknul nástroj <a href="https://esbuild.github.io">esbuild</a>, který je napsaný v jazyku Go a dokáže build zrychlit v některých případech i <b>100 &times;</b>.</p>

<p><img src="/files/vite/esbuild-rychlost.png" alt="Esbuild rychlost" class="border"></p>









<p>V témže roce autor knihovny <b>Vue.js</b> – Evan You – vytvořil s využitím esbuildu právě <b>Vite</b> (je to slovo z francouzštiny a znamená rychlý, čte se to jako <i>vít</i>).</p>

<div class="external-content">
  <ul>
    <li>
      <a href="https://vitejs.dev">Vite</a> – Next Generation Frontend Tooling
    </li>
  </ul>
</div>


<h2 id="instalace">Instalace nového projektu</h2>

<p>Použití je jednoduché. Instalace jde provést přes NPM nebo Yarn.</p>

<pre><code>npm init @vitejs/app</code></pre>

<pre><code>yarn create @vitejs/app</code></pre>







<p>Vite dokáže fungovat s populárními knihovnami jako <b>Vue.js</b> nebo <b>React</b> (včetně podpory TypeScriptu), případně i v čistém JavaScriptu.</p>

<p>Spuštění dev serveru je potom klasické přes:</p>

<pre><code>npm run dev</code></pre>


<p>Jak je vidět, je to až neuvěřitelně rychlé.</p>

<p><img src="/files/vite/spusteni-vite-dev-serveru.png" alt="Spuštění Vite dev serveru" class="border"></p>



















<p>Oproti spuštění prázdného Vue.js projektu s webpackem:</p>

<p><img src="/files/vite/spusteni-webpack-dev-serveru.png" alt="Spuštění webpack dev serveru" class="border"></p>

























<p>Následné změny v kódu jsou téměř instantní.</p>

<h2 id="migrace">Migrace z Vue CLI</h2>

<p>U projektu používající <a href="https://cli.vuejs.org">Vue CLI</a> (CLI znamená <i lang="en">Command Line Interface</i> – příkazový řádek) spočívá migrace na Vite v následujícím:</p>


<pre><code>npm install vite @vitejs/plugin-vue --save-dev
npm install @vue/compiler-sfc --save-dev
</code></pre>


<p>Přesunutí/zkopírování souboru <code>index.html</code> ze složky <code>public</code> do rootu projektu (do složky, kde je <code>package.json</code>) s drobnou úpravou – připojení <code>main.js</code> skriptu pod hlavní <code>&lt;div></code> aplikace:</p>



<pre><code>&lt;div id="app">&lt;/div>
<b>&lt;script type="module" src="/src/main.js">&lt;/script></b></code></pre>




<p>Vytvoření konfiguračního souboru <code>vite.config.js</code> v rootu projektu:</p>

<pre><code>import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
</code></pre>









<p>Přidání skriptu pro start dev serveru do <code>package.json</code> do sekce <code>scripts</code>:</p>

<pre><code>"scripts": {
  <b>"dev": "vite"</b>,</code></pre>




<p>Nyní by se v ideálním případě mohl rozběhnout bleskurychlý Vite dev server.</p>


<h3 id="relativni-cesty">Relativní cesty</h3>

<p>Výchozí instalace má problém s relativními cestami v importech využívající zavináč (<code>@</code>) na začátku. Tohle nebude fungovat:</p>

<pre><code>import HelloWorld from '<b>@/</b>components/HelloWorld.vue'</code></pre>




<p>Řešit to jde třeba instalací pluginu pro aliasy:</p>

<pre><code>npm install vite-aliases --save-dev
</code></pre>





<p>A úpravou <code>vite.config.js</code> pro jejich použití:</p>

<pre><code>import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
<b>import { getAliases } from 'vite-aliases'

const aliases = getAliases({
  prefix: '@/',
})</b>

// https://vitejs.dev/config/
export default defineConfig({
<b>  resolve: {
    alias: aliases,
  },</b>
  plugins: [vue()],
})
</code></pre>















<h2 id="proc">Proč je to tak rychlé?</h2>

<p>Jak je možné, že je najednou build aplikace rychlejší o několik řádů?</p>

<p>První důvod je používání nativních <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules">JavaScript modulů</a> (ES 6 modulů).</p>

<p>To jsou takové ty konstrukce <code>export default něco</code> a <code>import { něco } from 'neco.js'</code>.</p>

<p>A novější prohlížeče kromě <b>IE 11</b> podporují dynamické skládání aplikace pomocí importování těchto modulů.</p>

<p>Celá aplikace může být rozdělena do mnoha <code>*.js</code> souborů, které se importují, když je prohlížeč potřebuje.</p>

<p>Před <b>nativním fungování JS modulů</b> to řešil právě třeba webpack, který musel celou aplikaci projít, rozdělit ji do tzv. bundlů (jednotlivé části aplikace) a nakonec je ve správných situací připojovat.</p>

<p>Tato věc díky JS modulům odpadá, protože to umí rovnou prohlížeče.</p>



<p>Druhá věc je nejspíš použití jazyka Go, ve kterém je napsaný <b>esbuild</b>, protože Go je výrazně rychlejší než JavaScript.</p>








<h2 id="prejit">Má smysl přejít?</h2>


<p>Otázka ohledně přechodu na <b>Vite</b> není úplně jednoduchá, ač se může znát nárůst v rychlosti enormní.</p>


<p>První otázka je, jestli se člověku vůbec povede existující projekt zmigrovat v rozumném čase. Zvlášť pokud je v projektu hromada vlastní konfigurace webpacku, může to být dost práce.</p>


<p>Další věc je podpora různých dalších balíčků, co s webpackem spolehlivě fungují, ale s Vite nemusí.</p>

<p>Např. ve <b>Vue CLI</b> je vyřešené testování, které ve Vite zatím chybí.</p>

<p>Vzhledem k velkému rozšíření mezi vývojáři bude snazší hledat a najít řešení problémů ve webpacku.</p>



<p>Z principu fungování JS modulů může potom nastat problém v případě snahy podporovat <b>IE 11</b>, protože tam rychlé vývojové prostředí používající nativní JS moduly nebude fungovat.</p>

<p>Není sice problém vytvořit build funkční v <b>IE 11</b>, ale vývojové prostředí v takovém případě moc neodpovídá produkčnímu.</p>






<h2 id="hotreload">Ruční zprovoznění hot reloadu</h2>

<p>Aby fungoval hot reload při použití bez frameworku, je potřeba přidat obsluhující funkci.</p>

<p>Pro začátek postačí prázdná. Do souboru <code>main.js</code>:</p>

<pre><code>if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
        console.log('updated', newModule)
    })
}</code></pre>

<h2 id="zaver">Závěr</h2>

<p>Vite/esbuild jsou hodně zajímavé nástroje pro zpříjemnění a zrychlení práce vývojáře.</p>

<p>Pokud se vám povede Vite zapojit do vývoje existujícího projektu, bude to plus.</p>

<p>Stavět nový projekt, asi bych stále preferoval Vue CLI (zejména kvůli testům), ale klidně bych doplnil Vite pro rychlý dev server.</p>

<p>Naštěstí není problém mít webpack i Vite vedle sebe a rozhodnout se kdykoliv, jaký dev server si pro vývoj pustit.</p>