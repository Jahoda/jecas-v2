---
title: "Build jednoduchého JS pro staré prohlížeče"
headline: "Build jednoduchého JS pro staré prohlížeče"
description: "Jak zajistit transformaci jednoduchého JavaScriptu i pro staré prohlížeče jako IE 11."
date: "2022-07-13"
last_modification: "2022-12-22"
status: 1
tags: ["hotova-reseni", "js", "ts"]
format: "html"
---

<p>V dnešní době se zpravidla <b>výrazně liší</b> JavaScript, ve kterém se něco píše, a výsledek, který potom běží v prohlížeči.</p>

<p>Teoreticky je možná psát pouze jeden kód a ten nijak pro produkční použití neupravovat, ale má to několik problémů:</p>

<ol>
  <li>
    <p>
      <b>Nekompatibilita</b> – v novějších prohlížečích funguje řada hezkých JS konstrukcí, které v <b>IE 11</b> ne.
    </p>
    
    <p>To jsou věci jako například:</p>
    
    <ul>
      <li>
        Psaní <code>const</code> a <a href="/js-var-let"><code>let</code> místo <code>var</code></a>.
      </li>
      <li>
        Optional chaining operator (<code>objekt?.vlastnost?.dalsiVlastnost</code>)
      </li>
      <li>
        Arrow functions (<code>const funkce = () => 'vrácená hodnota'</code>)
      </li>
      <li>
        Template Literals (<code>`textový řetězec a v něm ${promenna}`</code>)
      </li>
    </ul>
  </li>
  
  <li>
    <p>
      <b>Horší čitelnost/udržitelnost</b> – pokud se naopak kód píše v kompatibilním režimu, nepoužívání novějších JS praktik vede k hůře čitelnému kódu.
    </p>
  </li>
  
  <li>
    <p>
      <b>Velikost</b> – pro vývoj čitelný kód je zbytečně velký.
    </p>
    
    <p>Prohlížeč nepotřebuje rozumně pojmenované funkce a proměnné. Vystačí si v pohodě s tím, že místo <code>vystiznyNazevFunkce()</code> bude <code>a()</code>.</p>
  </li>
  
  <li>
    <p>
      <b>TypeScript</b> – pro větší kontrolu nad kódem se hodí používat typy. TypeScript díky tomu dokáže upozornit na spoustu potenciálních chyb.
    </p>
  </li>
</ol>

<p>Cílem je tedy psát kód se všemi vymoženostmi nového JS v TypeScriptu. A z toho nakonec dostat obyčejný JavaScript funkční i v <b>IE 11</b>.</p>


<h2 id="frameworky">Bez frameworků</h2>

<p>Dnešní standard je většinou použít nějakou reaktivní JS knihovnu jako je <b>React</b>, <b>Vue</b> nebo <b>Svelte</b>.</p>

<p>U těch je kompatibilní build dávno vyřešen.</p>

<p>V některých případech je ale framework zbytečný, který by zbytečně navyšoval celkovou velikost.</p>


<h2 id="babel">Babel</h2>

<p>Když jde o kompilaci do zpětně kompatibilního JS, nejznámější řešení je <a href="https://babeljs.io">Babel</a>.</p>

<p>Má i <a href="https://babeljs.io/repl">online nástroj</a>, kde je možné si vyzkoušet, co udělá.</p>

<p>Instalace je jednoduchá:</p>

<pre><code>npm install --save-dev @babel/core @babel/cli @babel/preset-env</code></pre>

<p>Pro TypeScript ještě:</p>

<pre><code>npm install --save-dev @babel/preset-typescript</code></pre>

<p>Prohnat přes něj JS soubor jde potom snadno jednoduchým npm skriptem (v <code>package.json</code>):</p>

<pre><code>{
  ...
  "scripts": {
      "babel": "babel puvodni-soubor.ts --out-file dist/vystupni-soubor.js"
  }
  ...
}</code></pre>



<p>Transformaci pro <b>IE 11</b> je třeba nastavit např. v souboru <code>.babelrc</code>:</p>

<pre><code>{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": ['defaults', 'IE 11']
      }
    ],
    "@babel/preset-typescript"
  ]
}</code></pre>













<h2 id="swc">SWC</h2>

<p><a href="https://swc.rs">SWC</a> (Speedy Web Compiler) je mnohem méně známá a údajně 20–70krát rychlejší alternativa Babelu.</p>

<p>Pro vyzkoušení jde použít <a href="https://swc.rs/playground">online nástroj</a>.</p>



<h2 id="vite">Vite</h2>

<p><a href="/vite">Vite</a> je nástroj pro super rychlé vývojové prostředí a build.</p>

<p>Hodí se především pro větší aplikace napsané v Reactu/Vue/Svelte, ale má i <a href="https://vitejs.dev/guide/build.html#library-mode">library mode</a>.</p>

<p>Díky tomu jde obyčejný kód v TS spojit do jednoho souboru.</p>

<p>Přes plugin <a href="https://github.com/owlsdepartment/vite-plugin-babel">vite-plugin-babel</a> zajistit funkčnost ve starých prohlížečích.</p>


<h2 id="deleni">Dělení do souborů</h2>

<p>Pro přehlednost a snažší týmovou práci je užitečné dělit části kódu do samostatných souborů.</p>

<p>Ty potom ve výsledku spojit.</p>

<p>K tomu jde použít třeba <b>Vite</b> nebo <a href="https://esbuild.github.io">esbuild</a>:</p>


<h3 id="esbuild">Esbuild</h3>

<p>Stačí nainstalovat:</p>

<pre><code>npm install --save-exact esbuild</code></pre>

<p>A přidat skripty pro vývoj a build:</p>

<pre><code>{
  ...
  "scripts": {
    "esbuild": "esbuild src/main.ts --bundle --outfile=dist/vystupni-soubor.js --define:DEBUG=false",
    "esbuild:dev": "esbuild src/main.ts --bundle --outfile=dist/vystupni-soubor.js --define:DEBUG=true",
  }
  ...
}</code></pre>



<h2 id="testy">Testy</h2>

<p>Psát kód bez testů je dost otrava. Takže je rozumné přidat <a href="https://jestjs.io">Jest</a> nebo <a href="https://vitest.dev">Vitest</a>.</p>


<h2 id="codestyle">Code style</h2>

<p>Aby měl kód nějakou kulturu, hodí se nějak <b>automaticky formátovat kód</b>. Není potom potřeba při code review někomu připomínat, že používá taby místo mezer a podobně.</p>

<p>Osvědčil se mi <a href="https://prettier.io">Prettier</a>, protože podporuje hromady formátů, má jednoduchou instalaci a nastavení a dobrou podporu v editorech.</p>


<h2 id="kompilace">Kompilace a minifikace</h2>

<p><a href="https://closure-compiler.appspot.com/home">Closure Compiler</a> dokáže ušetřit hodně dat díky tomu, že zkrátí všechny možné názvy identifikátorů. Dokáže i zjednodušit některý kód a vyházet nepoužívaný kód.</p>

<p>Z následující funkce:</p>

<pre><code>const nazevFunkce = (prvniParametr, druhyParametr) => {
  const objekt = {
    prvniVlastnost: prvniParametr * 2,
    druhaVlastnost: druhyParametr * 3
  }
  return `text ${objekt.prvniVlastnost} ${objekt.druhaVlastnost}`
}

window["a"] = nazevFunkce</code></pre>

<p>Udělá:</p>

<pre><code>window.a=function(b,c){return"text "+2*b+" "+3*c};</code></pre>

<p>Instalace je následující:</p>

<pre><code>npm i google-closure-compiler</code></pre>

<p>A kompilace se spustí skriptem:</p>

<pre><code>"closure": "java -jar node_modules/google-closure-compiler-java/compiler.jar --js=vstupni-soubor.js --js_output_file=vystupni-soubor.js",</code></pre>