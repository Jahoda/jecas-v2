---
title: "Rozdělování Vite/Rollup buildu do chunků"
headline: "Rozdělování Vite/Rollup buildu do chunků"
description: "Jak rozdělit build aplikace do souborů, aby byla co nejrychlejší. "
date: "2022-12-05"
last_modification: "2022-12-19"
status: 1
tags: ["js", "napady", "zrychlovani"]
format: "html"
---

<p>Je standardem, že se JavaScriptový kód vytvořený při vývoji významně liší od kódu, který potom běží v produkčním prostředí.</p>

<p>Při vývoji je praktické kód rozdělovat do mnoha malých souborů, kde jsou jednotlivé komponenty nebo metody.</p>

<p>Na produkci je to zase kvůli <a href="/zrychlovani">rychlosti</a> lepší pospojovat. Případně kvůli kompatibilitě se staršími prohlížeči přidat <a href="/polyfill">polyfilly</a> nebo dokonce JS kód psaný v novější syntaxi převést do kompatibilní podoby.</p>

<p>Obvykle se k tomu používá rychlý nástroj <a href="/vite">Vite</a>, který na pozadí používá <a href="https://rollupjs.org/guide/en/">rollup.js</a>.</p>

<p>Výsledný <i>build</i> se potom dělí do tzv. <i>chunků</i> (česky kusů).</p>





<h2 id="jeden">Jeden soubor</h2>

<p>Výchozí chování je takové, že se všechno spojí do jednoho souboru.</p>

<p>Výsledkem je tak něco jako:</p>

<pre><code>dist/src/index.html               1.84 KiB
dist/assets/index.f237c416.css   62.12 KiB / gzip: 10.96 KiB
dist/assets/index.ed3603d0.js  2361.14 KiB / gzip: 665.31 KiB   
</code></pre>





<p>U větší aplikace může celková velikost narůstat. Zvlášť při používání velkých externích knihoven.</p>

<p>Sám Rollup při výchozím nastavení upozorňuje na překročení velikosti 500 kB.</p>


<pre><code>(!) Some chunks are larger than 500 KiB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/guide/en/#outputmanualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.</code></pre>


<p>A navrhuje 2 řešení:</p>

<ol>
  <li>Použít <b>dynamické importy</b>.</li>
  <li>Rozdělit build od chunků <b>manuálně</b>.</li>
</ol>






<h2 id="zpomaleni">Je jeden <code>*.js</code> soubor problém?</h2>

<p>Spojit všechno do jednoho může znamenat extrémně velký soubor. Z toho vyplývá možná <b>dlouhá doba načítání</b>, protože než se stáhne, tak aplikace vůbec nic nemůže dělat.</p>

<p>Další nevýhoda je kešování u aplikací, které se často mění. Jakákoliv změna tak invaliduje úplně všechno.</p>



<p>Na druhou stranu může mít jeden jediný soubor výhodu v <b>účinnější Gzip/Brotli kompresi</b>. Ve finále se jeden soubor účinněji zkomprimuje a celkově se tak přenese méně dat.</p>

<p>Výhoda je i <b>rychlejší build aplikace</b>, protože Rollup nemusí moc přemýšlet co a jak rozdělit.</p>











<h2 id="dynamicke-importy">Dynamické importy</h2>

<p>Dynamickými importy se rozumí asynchronní funkce, která provádí samotný import. Takže místo klasického:</p>

<pre><code>import Component from 'Component.svelte'</code></pre>


<p>Vypadá funkce pro import následovně (a na požadovaném místě se zavolá):</p>

<pre><code>async () => await import('Component.svelte')</code></pre>









<p>Rollup takový import rozpozná, vytvoří pro něj zvláštní chunk a zajistí, že všechno bude správně fungovat.</p>

<p>O daný chunk se sníží velikost dříve jediného chunku a stáhne se až v momentě, kdy bude potřeba.</p>







<h3 id="svelte">Dynamický import Svelte komponenty</h3>

<p>Ve <a href="https://svelte.dev">Svelte</a> to vypadá následovně:</p>

<pre><code>{#await import('Component.svelte') then Component}
  &lt;Component.default />
{/await}</code></pre>





<!-- https://svelte.dev/repl/7fe8ee36c797466c9a379b7d9012ed8c?version=3.53.1 -->


<h3 id="kdy-pouzit">Co importovat dynamicky</h3>

<p>Není úplně snadné stanovit jednoznačný postup, co importovat dynamicky. Mohlo by se například nabízet používat dynamické importy pro jednotlivé <b>routy aplikace</b>.</p>

<p>Bohužel tento postup dost pravděpodobně povede k obrovskému množství miniaturních chunků, které se vytvoří i pro sdílené společné komponenty.</p>

<p>Kromě toho se dost pravděpodobně sníží dojem z rychlosti, protože při změně adresy se nejdřív bude muset stáhnout příslušný JS soubor. Takže vznikne něpříjemná prodleva.</p>

<p>A celý build se časově prodlouží.</p>


<p>Rozumné použití se tak zdá být třeba pro <b>velké externí knihovny</b>, které se používají na několika málo místech – například WYSIWYG editor.</p>

<p>Pro zjištění velikosti balíčku se hodí stránka <a href="https://bundlephobia.com">Bundlephobia</a>.</p>

<p><img src="/files/build-chunk/vue-velikost.png" alt="Vue velikost" class="border"></p>
























<p>Další věc jsou <a href="/preklad">překlady aplikace</a> do různých jazyků. Tam obvykle stačí připojovat jen aktuální jazyk a ne X různých dalších lokalisací.</p>







<h2 id="manualChunks">Vlastní chunky (<code>manualChunks</code>)</h2>

<p>Rozdělení na jednotlivé soubory jde kromě dynamickými importy zajistit i pomocí tzv. <i>manualChunks</i>.</p>

<p>Přímo v konfiguraci <code>vite.config.js</code>:</p>

<pre><code>{
  ...
  build: {
    rollupOptions: {
      manualChunks: {
        luxon: ['luxon'],
        firebase: ['firebase/app', 'firebase/storage', 'firebase/auth', 'firebase/firestore'],
        icons: ['@steeze-ui/heroicons'],
      },
    },  
  }
}</code></pre>
















<p>Uvedený kód vyrobí 3 nové chunky s kódem externích <b>npm závislostí</b>.</p>

<p>Ty tak nebudou ve společném souboru s aplikací, díky čemuž se nebudou muset znovu stahovat při změně v jejím kódu, ale načtou se z <i lang="en">cache</i>.</p>


<h2 id="preload">Preload</h2>

<p>Rozdělení do chunků může pomoci prvnímu načtení, ale při práci s aplikací bude způsobovat prodlevu.</p>

<p>Řešením může být tzv. <i>preload</i>. Jedná se o techniku, kdy se soubory, které by mohly být potřeba, stáhnout s nižší prioritou.</p>

<p>Existují k tomu hotové pluginy:</p>

<ul>
  <li><a href="https://www.npmjs.com/package/rollup-plugin-modulepreload">rollup-plugin-modulepreload</a></li>
  
  <li><a href="https://www.npmjs.com/package/vite-plugin-preload">vite-plugin-preload</a></li>
</ul>



<h2 id="login">Aplikace za loginem</h2>

<p>Pro vytvoření rychlé aplikace nebo webu je třeba řešit konkrétní případ.</p>

<p>Třeba u typické webové aplikace, která je dostupná jen pro přihlášené, se může hodit následující postup:</p>

<ol>
  <li>
    <p>Udělat maximálně rychlou přihlašovací obrazovku s minimem JS/CSS kódu.</p>
  </li>
  <li>
    <p>Ta se uživateli načte bleskurychle.</p>
  </li>
  <li>
    <p>Během vyplňování přihlašovacích údajů se může <i>preloadovat</i> zbytek aplikace.</p>
  </li>
  <li>
    <p>Při kliknutí na tlačítko <i>Přihlásit</i> tak už může být kód privátní sekce načtený a vše tak proběhne zdánlivě okamžitě.</p>
  </li>
</ol>


<h2 id="zaver">Závěr</h2>

<p>Správné rozdělení chunků a určení, kdy se co má načítat, není vůbec snadné.</p>

<p>Do <i>rozumné</i> velikosti to nejspíš není potřeba příliš řešit. Přijatelná velikost se ale liší projekt od projektu a dle typu aplikace.</p>

<p>U webu bude 0,5 MB JS výrazně větší problém než u administrace nebo aplikace schované za loginem.</p>

<p>Vše je nutné testovat a měřit, třeba přes <a href="/vyvojarske-nastroje">vývojářské nástroje</a>.</p>


<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>Vite: <a href="https://vitejs.dev/guide/features.html#dynamic-import">Dynamic Import</a></li>
  <li>Rollup: <a href="https://rollupjs.org/guide/en/#outputmanualchunks">output.manualChunks</a></li>
</ul>