---
title: "Node.js a NPM"
headline: "Node.js a NPM"
description: "K čemu se hodí Node.js na frontendu a jak ho začít používat."
date: "2017-10-10"
last_modification: "2017-10-10"
status: 0
tags: []
format: "html"
---

<p></p>



<h2 id="verse">Různé verse Node.js</h2>

<p>Při práci na různě starých projektech může být nutné mít pro různé projekty různé verse Node.js.</p>

<p>Ve <b>Windows</b> jde k tomu dobře použít nástroj <a href="https://github.com/coreybutler/nvm-windows">Node Version Manager (nvm) for Windows</a>.</p>

<p>Před instalací je třeba odinstalovat Node.js a smazat příslušné adresáře.</p>

<p>Po nainstalování <b>nvm</b> stačí v příkazovém řádku napsat.</p>




<pre><code>nvm install latest</code></pre>





<p>A následně poslední versi použít:</p>


<pre><code>nvm use 8.x.x</code></pre>




<p>Místo <i lang="en">latest</i> jde použít libovolné jiné starší Node.js.</p>


<h2 id="update">Update všech balíčků</h2>

<pre><code>npm i -g npm-check-updates &amp;&amp; ncu -u &amp;&amp; npm i</code></pre>










<h2 id="skripty">Spouštění <code>*.js</code> skriptů</h2>

<pre><code>node ./script.js</code></pre>










<pre><code>"scripts": {
  "build": "node ./build/build.js"
}</code></pre>



<pre><code>npm run build</code></pre>




<h3 id="parametry">Parametry</h3>

<pre><code>node ./script.js parametr1 parametr2</code></pre>

<p>Dostupné jsou potom v <code>process.argv</code> od druhého indexu:</p>


<pre><code>process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});</code></pre>


<h2 id="uprava-souboru">Úprava souborů</h2>

<pre><code>const buildFile = 'soubor.html'
let html = fs.readFileSync(buildFile).toString()
let outputHtml = html.replace(/fytopuf/g, 'fytopufík')
fs.writeFileSync(buildFile, outputHtml)</code></pre>