---
title: "TC39 Hack Pipes: Pipe operátor v JavaScriptu"
headline: "Hack Pipes: Elegantní zřetězení funkcí pomocí |>"
description: "Co je TC39 Hack Pipes proposal, jak funguje pipe operátor |> v JavaScriptu a proč zlepšuje čitelnost kódu."
date: "2025-12-05"
last_modification: "2025-12-05"
status: 1
tags: ["js", "napady"]
format: "html"
---

<p><b>Hack Pipes</b> je návrh (<i>proposal</i>) pro JavaScript, který přináší <b>pipe operátor</b> <code>|&gt;</code>. Tento operátor umožňuje elegantně <b>zřetězit volání funkcí</b> tak, že výstup jedné funkce se automaticky stane vstupem další.</p>

<p>Návrh je aktuálně ve <b>Stage 2</b> procesu TC39, což znamená, že je stále ve vývoji, ale má reálnou šanci na přijetí do jazyka.</p>

<h2 id="co-je-tc39">Co je TC39</h2>

<p><b>TC39</b> (<i>Technical Committee 39</i>) je výbor organizace <a href="https://ecma-international.org/">Ecma International</a>, který zodpovídá za <b>vývoj specifikace ECMAScript</b> – standardu, na kterém je JavaScript založen.</p>

<p>Každá nová funkce jazyka prochází <b>několikastupňovým procesem</b>:</p>

<ul>
<li><b>Stage 0</b> – Nápad (<i>Strawperson</i>) – prvotní návrh</li>
<li><b>Stage 1</b> – Návrh (<i>Proposal</i>) – formální popis problému a řešení</li>
<li><b>Stage 2</b> – Draft – počáteční specifikace, experimentální implementace</li>
<li><b>Stage 3</b> – Kandidát (<i>Candidate</i>) – kompletní specifikace, reálné implementace v prohlížečích</li>
<li><b>Stage 4</b> – Dokončeno (<i>Finished</i>) – součást standardu</li>
</ul>

<p>Hack Pipes je ve <b>Stage 2</b> od roku 2021.</p>

<h2 id="problem">Problém, který Hack Pipes řeší</h2>

<p>V JavaScriptu často potřebujeme aplikovat <b>sérii transformací</b> na nějakou hodnotu. Bez pipe operátoru máme několik možností, ale žádná není ideální.</p>

<h3 id="vnorene-volani">Vnořené volání funkcí</h3>

<p>Klasický přístup je <b>vnořovat funkce</b>:</p>

<pre><code class="language-js">const result = capitalize(trim(sanitize(userInput)));</code></pre>

<p>Problém: Čteme kód <b>zevnitř ven</b>, což je neintuitivní. Reálně se data transformují v pořadí <code>sanitize</code> → <code>trim</code> → <code>capitalize</code>, ale zapisujeme to obráceně.</p>

<h3 id="pomocne-promenne">Pomocné proměnné</h3>

<p>Alternativou je použít <b>mezilehlé proměnné</b>:</p>

<pre><code class="language-js">const sanitized = sanitize(userInput);
const trimmed = trim(sanitized);
const result = capitalize(trimmed);</code></pre>

<p>Problém: <b>Mnoho zbytečných proměnných</b>, které znečišťují scope a prodlužují kód.</p>

<h3 id="metody-retezeni">Řetězení metod</h3>

<p>U vestavěných typů můžeme využít <b>method chaining</b>:</p>

<pre><code class="language-js">const result = userInput
  .trim()
  .toLowerCase()
  .replace(/[^a-z]/g, '');</code></pre>

<p>Problém: Funguje jen pro <b>metody objektu</b>. Vlastní funkce takto řetězit nelze.</p>

<h2 id="reseni-hack-pipes">Řešení: Hack Pipes</h2>

<p>S pipe operátorem <code>|&gt;</code> můžeme psát transformace <b>zleva doprava</b>:</p>

<pre><code class="language-js">const result = userInput
  |&gt; sanitize(%)
  |&gt; trim(%)
  |&gt; capitalize(%);</code></pre>

<p>Zástupný symbol <code>%</code> (tzv. <i>topic reference</i>) představuje <b>hodnotu z předchozího kroku</b>.</p>

<h3 id="syntaxe">Základní syntaxe</h3>

<pre><code class="language-js">// Základní použití
hodnota |&gt; funkce(%)

// Více argumentů
hodnota |&gt; funkce(%, arg2, arg3)

// Hodnota může být na libovolné pozici
hodnota |&gt; funkce(arg1, %, arg3)</code></pre>

<h3 id="priklady">Praktické příklady</h3>

<p><b>Transformace textu:</b></p>

<pre><code class="language-js">const slug = title
  |&gt; %.toLowerCase()
  |&gt; %.trim()
  |&gt; %.replace(/\s+/g, '-')
  |&gt; encodeURIComponent(%);</code></pre>

<p><b>Práce s poli:</b></p>

<pre><code class="language-js">const activeUserNames = users
  |&gt; %.filter(u =&gt; u.active)
  |&gt; %.map(u =&gt; u.name)
  |&gt; %.sort()
  |&gt; %.join(', ');</code></pre>

<p><b>Kombinace s await:</b></p>

<pre><code class="language-js">const data = userId
  |&gt; await fetchUser(%)
  |&gt; %.profile
  |&gt; JSON.stringify(%, null, 2);</code></pre>

<p><b>Složitější pipeline:</b></p>

<pre><code class="language-js">const report = rawData
  |&gt; parseCSV(%)
  |&gt; %.filter(row =&gt; row.year === 2024)
  |&gt; groupBy(%, 'category')
  |&gt; calculateTotals(%)
  |&gt; formatAsTable(%);</code></pre>

<h2 id="proc-hack">Proč "Hack" Pipes?</h2>

<p>Název pochází z programovacího jazyka <b>Hack</b> od Facebooku (varianta PHP), který tento styl pipe operátoru <a href="https://docs.hhvm.com/hack/expressions-and-operators/pipe">zavedl jako první</a>.</p>

<p>Existovaly i jiné návrhy pipe operátoru:</p>

<ul>
<li><b>F# Pipes</b> – inspirované jazykem F#, kde <code>x |&gt; f</code> znamená <code>f(x)</code></li>
<li><b>Smart Pipes</b> – automatické rozpoznání, zda jde o funkci nebo výraz</li>
</ul>

<p>TC39 nakonec zvolilo <b>Hack Pipes</b> pro jejich <b>explicitnost a flexibilitu</b>. Díky topic reference (<code>%</code>) je vždy jasné, kam se hodnota vloží.</p>

<h2 id="vyhody">Výhody Hack Pipes</h2>

<ul>
<li>
  <p><b>Čitelnost</b> – kód se čte zleva doprava, což odpovídá toku dat</p>
</li>
<li>
  <p><b>Flexibilita</b> – hodnota může být na libovolné pozici v argumentech funkce</p>
</li>
<li>
  <p><b>Konzistence</b> – funguje stejně s funkcemi, metodami i operátory</p>
</li>
<li>
  <p><b>Méně proměnných</b> – není potřeba vytvářet mezilehlé proměnné</p>
</li>
<li>
  <p><b>Snadné debugování</b> – můžete vložit <code>console.log(%)</code> kamkoliv do pipeline</p>
</li>
</ul>

<pre><code class="language-js">// Debugging v pipeline
const result = data
  |&gt; transform1(%)
  |&gt; (console.log('Po transform1:', %), %)
  |&gt; transform2(%);</code></pre>

<h2 id="nevyhody">Nevýhody a kritika</h2>

<ul>
<li>
  <p><b>Nová syntaxe</b> – vývojáři se musí naučit nový koncept</p>
</li>
<li>
  <p><b>Topic reference</b> – symbol <code>%</code> může být matoucí (diskutuje se i o <code>^</code> nebo <code>@@</code>)</p>
</li>
<li>
  <p><b>Tooling</b> – editory a lintery potřebují aktualizace</p>
</li>
<li>
  <p><b>Zneužití</b> – příliš dlouhé pipeline můžou být hůře čitelné než klasický kód</p>
</li>
</ul>

<h2 id="jak-vyzkouset">Jak vyzkoušet už dnes</h2>

<p>I když Hack Pipes nejsou zatím v JavaScriptu oficiálně, můžete je vyzkoušet pomocí <b>Babel pluginu</b>:</p>

<pre><code class="language-bash">npm install --save-dev @babel/plugin-proposal-pipeline-operator</code></pre>

<p>Konfigurace v <code>babel.config.js</code>:</p>

<pre><code class="language-js">module.exports = {
  plugins: [
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'hack', topicToken: '%' }]
  ]
};</code></pre>

<h2 id="alternativy">Alternativy v současném JavaScriptu</h2>

<p>Pokud nechcete čekat na oficiální podporu, existují alternativy:</p>

<h3 id="funkce-pipe">Funkce pipe()</h3>

<p>Mnoho knihoven nabízí funkci <code>pipe</code>:</p>

<pre><code class="language-js">// Lodash/fp, Ramda, apod.
import { pipe } from 'lodash/fp';

const processUser = pipe(
  sanitize,
  trim,
  capitalize
);

const result = processUser(userInput);</code></pre>

<p>Nevýhoda: Funguje pouze s <b>unárními funkcemi</b> (jeden argument).</p>

<h3 id="vlastni-pipe">Vlastní implementace</h3>

<pre><code class="language-js">const pipe = (...fns) =&gt; (x) =&gt; fns.reduce((v, f) =&gt; f(v), x);

const process = pipe(
  x =&gt; x.trim(),
  x =&gt; x.toLowerCase(),
  x =&gt; x.replace(/\s+/g, '-')
);

const slug = process('  Hello World  '); // 'hello-world'</code></pre>

<h2 id="budoucnost">Budoucnost návrhu</h2>

<p>Hack Pipes jsou ve Stage 2 již několik let. Hlavní otevřené otázky:</p>

<ul>
<li><b>Finální syntaxe topic reference</b> – <code>%</code>, <code>^</code>, <code>@@</code>, nebo jiný symbol?</li>
<li><b>Interakce s await</b> – jak přesně bude fungovat <code>await</code> uvnitř pipeline</li>
<li><b>Error handling</b> – jak řešit chyby v rámci pipeline</li>
</ul>

<p>Pro postup do Stage 3 je potřeba:</p>

<ul>
<li>Kompletní specifikace</li>
<li>Implementace v alespoň jednom prohlížeči</li>
<li>Shoda výboru TC39</li>
</ul>

<h2 id="zaver">Závěr</h2>

<ul>
<li>
  <p><b>Hack Pipes</b> přináší pipe operátor <code>|&gt;</code> do JavaScriptu pro elegantní zřetězení funkcí</p>
</li>

<li>
  <p>Využívá <b>topic reference</b> (<code>%</code>) jako zástupný symbol pro hodnotu z předchozího kroku</p>
</li>

<li>
  <p>Návrh je ve <b>Stage 2</b> procesu TC39 – není zatím součástí standardu</p>
</li>

<li>
  <p>Již dnes můžete experimentovat pomocí <b>Babel pluginu</b></p>
</li>

<li>
  <p>Alternativou jsou knihovní funkce <code>pipe()</code> z Lodash, Ramda a podobných</p>
</li>
</ul>

<h2 id="odkazy-jinam">Odkazy jinam</h2>

<ul>
  <li><a href="https://github.com/tc39/proposal-pipeline-operator">TC39 Proposal: Pipeline Operator</a> – oficiální GitHub repozitář návrhu</li>
  <li><a href="https://babeljs.io/docs/babel-plugin-proposal-pipeline-operator">Babel: Pipeline Operator Plugin</a> – dokumentace Babel pluginu</li>
  <li><a href="https://2ality.com/2022/01/pipe-operator.html">2ality: JavaScript pipe operator</a> – podrobný článek od Dr. Axel Rauschmayera</li>
</ul>
