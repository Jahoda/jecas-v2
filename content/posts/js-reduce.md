---
title: "Metoda reduce v JavaScriptu"
headline: "Metoda <code>reduce</code> v JavaScriptu"
description: "Kdy (ne)použít metodu reduce v JavaScriptu. Praktické příklady a srovnání s alternativami."
date: "2025-12-16"
last_modification: "2025-12-16"
status: 1
tags: ["js", "hotova-reseni"]
format: "html"
---

<p>Metoda <code>reduce</code> umožňuje <b>redukovat</b> pole na jedinou hodnotu. Je to mocný nástroj, ale v praxi existuje téměř vždy <b>čitelnější alternativa</b>. Tento článek ukazuje, kdy <code>reduce</code> skutečně použít a kdy sáhnout po jiném řešení.</p>

<h2 id="syntaxe">Základní syntaxe</h2>

<pre><code>pole.reduce((akumulator, hodnota, index, pole) => {
  return novyAkumulator;
}, pocatecniHodnota);</code></pre>

<h2 id="proc-naduzivani">Proč se reduce nadužívá</h2>

<p>Metoda <code>reduce</code> se v praxi používá mnohem častěji, než by bylo vhodné. Důvodů je několik:</p>

<ul>
  <li><b>Působí „funkcionálně"</b> — přišla s vlnou funkcionálního programování spolu s <code>map</code> a <code>filter</code>, a tak ji lidé automaticky považují za moderní přístup</li>
  <li><b>Tutoriály</b> — často ji prezentují jako „pokročilou techniku", kterou by měl znát každý JS vývojář</li>
  <li><b>One-liner syndrom</b> — láká k zápisu všeho na jeden řádek, i když výsledek je nečitelný</li>
  <li><b>Univerzálnost</b> — teoreticky lze pomocí <code>reduce</code> implementovat všechny ostatní array metody, což vede k dojmu, že je to „správný" nástroj na vše</li>
</ul>

<p>Ve skutečnosti je <code>reduce</code> <b>okrajový nástroj</b> pro specifické případy. Pro většinu úloh existuje čitelnější alternativa.</p>

<h2 id="kdy-nepouzivat">Kdy reduce nepoužívat</h2>

<p>Ve většině případů existuje <b>kratší a čitelnější</b> alternativa:</p>

<h3>Součet čísel</h3>

<pre><code>const cisla = [1, 2, 3, 4, 5];

// S reduce
const soucet = cisla.reduce((acc, n) => acc + n, 0);

// Bez reduce
let soucet = 0;
for (const n of cisla) soucet += n;</code></pre>

<p><i>Poznámka:</i> Reduce má výhodu, že výsledek je <code>const</code> a pomocná proměnná neuniká do scope. Pro jednoduchý součet je to legitimní důvod pro použití reduce.</p>

<h3>Maximum a minimum</h3>

<pre><code>const cisla = [3, 7, 2, 9, 1];

// S reduce
const max = cisla.reduce((a, b) => a > b ? a : b);

// Bez reduce — kratší a jasnější
const max = Math.max(...cisla);
const min = Math.min(...cisla);</code></pre>

<h3>Zploštění pole</h3>

<pre><code>const vnorene = [[1, 2], [3, 4], [5, 6]];

// S reduce
const ploche = vnorene.reduce((acc, arr) => acc.concat(arr), []);

// Bez reduce — kratší
const ploche = vnorene.flat();</code></pre>

<h3>Seskupování dat</h3>

<pre><code>const lide = [
  { jmeno: "Anna", vek: 25 },
  { jmeno: "Petr", vek: 30 },
  { jmeno: "Jana", vek: 25 }
];

// S reduce — 8 řádků
const podleVeku = lide.reduce((acc, osoba) => {
  const klic = osoba.vek;
  if (!acc[klic]) acc[klic] = [];
  acc[klic].push(osoba);
  return acc;
}, {});

// Bez reduce — 1 řádek (moderní prohlížeče)
const podleVeku = Object.groupBy(lide, o => o.vek);</code></pre>

<h3>Filtrování a mapování</h3>

<pre><code>const cisla = [1, 2, 3, 4, 5, 6];

// S reduce
const vysledek = cisla.reduce((acc, n) => {
  if (n % 2 === 0) acc.push(n * 2);
  return acc;
}, []);

// Bez reduce — čitelnější
const vysledek = cisla.filter(n => n % 2 === 0).map(n => n * 2);</code></pre>

<h3>Počítání výskytů</h3>

<pre><code>const ovoce = ["jablko", "banán", "jablko", "banán", "jablko"];

// S reduce
const pocty = ovoce.reduce((acc, o) => {
  acc[o] = (acc[o] || 0) + 1;
  return acc;
}, {});

// Bez reduce — podobná délka, ale přímočařejší
const pocty = {};
for (const o of ovoce) {
  pocty[o] = (pocty[o] || 0) + 1;
}</code></pre>

<h2 id="kdy-pouzit">Kdy reduce skutečně použít</h2>

<p>Existuje několik případů, kdy je <code>reduce</code> <b>nejlepší nebo jediná rozumná volba</b>:</p>

<h3>1. Skládání funkcí (compose/pipe)</h3>

<p>Toto je <b>ideální use case</b> pro <code>reduce</code>:</p>

<pre><code>// S reduce
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const pricti5 = x => x + 5;
const vynasob2 = x => x * 2;

const vypocet = pipe(pricti5, vynasob2);
console.log(vypocet(10)); // (10 + 5) * 2 = 30</code></pre>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>// Vnořené volání — nečitelné při více funkcích
const vysledek = vynasob2(pricti5(10));

// Nebo cyklem
const pipe = (...fns) => x => {
  let result = x;
  for (const fn of fns) result = fn(result);
  return result;
};</code></pre>

<p>Zde je <code>reduce</code> skutečně nejelegantnější řešení.</p>

<h3>2. Více agregací najednou</h3>

<p>Když potřebujete spočítat <b>více hodnot v jednom průchodu</b>:</p>

<pre><code>const cisla = [3, 7, 2, 9, 1, 5];

// S reduce
const stats = cisla.reduce((acc, n) => ({
  sum: acc.sum + n,
  count: acc.count + 1,
  min: Math.min(acc.min, n),
  max: Math.max(acc.max, n)
}), { sum: 0, count: 0, min: Infinity, max: -Infinity });

stats.avg = stats.sum / stats.count;
// { sum: 27, count: 6, min: 1, max: 9, avg: 4.5 }</code></pre>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>let sum = 0, min = Infinity, max = -Infinity;
for (const n of cisla) {
  sum += n;
  min = Math.min(min, n);
  max = Math.max(max, n);
}
const stats = { sum, count: cisla.length, min, max, avg: sum / cisla.length };</code></pre>

<p>Cyklus je srovnatelně čitelný. Reduce má výhodu, že stav je zapouzdřený v objektu.</p>

<h3>3. Stavový automat / parsing</h3>

<p>Když procházíte data a potřebujete <b>udržovat stav</b> mezi iteracemi:</p>

<pre><code>// Parsování závorek — kontrola správného párování
const text = "((a + b) * (c - d))";

// S reduce
const vysledek = text.split("").reduce((acc, znak) => {
  if (acc.chyba) return acc;
  if (znak === "(") acc.hloubka++;
  if (znak === ")") acc.hloubka--;
  if (acc.hloubka &lt; 0) acc.chyba = true;
  return acc;
}, { hloubka: 0, chyba: false });

const jeValidni = vysledek.hloubka === 0 && !vysledek.chyba; // true</code></pre>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>let hloubka = 0;
let chyba = false;
for (const znak of text) {
  if (znak === "(") hloubka++;
  if (znak === ")") hloubka--;
  if (hloubka &lt; 0) { chyba = true; break; }
}
const jeValidni = hloubka === 0 && !chyba;</code></pre>

<p>Cyklus umožňuje <code>break</code> při chybě — efektivnější. Reduce vždy projde celé pole.</p>

<h3>4. Sekvenční async operace</h3>

<p>Když potřebujete spustit Promise <b>postupně</b> (ne paralelně):</p>

<pre><code>const urls = ["/api/1", "/api/2", "/api/3"];

// S reduce
const vysledky = await urls.reduce(async (accPromise, url) => {
  const acc = await accPromise;
  const res = await fetch(url);
  acc.push(await res.json());
  return acc;
}, Promise.resolve([]));</code></pre>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>const vysledky = [];
for (const url of urls) {
  const res = await fetch(url);
  vysledky.push(await res.json());
}</code></pre>

<p>Cyklus <code>for...of</code> s <code>await</code> je výrazně čitelnější.</p>

<h3>5. Rekurzivní zpracování stromové struktury</h3>

<pre><code>const strom = {
  hodnota: 1,
  deti: [
    { hodnota: 2, deti: [] },
    { hodnota: 3, deti: [
      { hodnota: 4, deti: [] }
    ]}
  ]
};

// S reduce
const soucetStromu = (uzel) => {
  return uzel.deti.reduce(
    (acc, dite) => acc + soucetStromu(dite),
    uzel.hodnota
  );
};

console.log(soucetStromu(strom)); // 1 + 2 + 3 + 4 = 10</code></pre>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>const soucetStromu = (uzel) => {
  let suma = uzel.hodnota;
  for (const dite of uzel.deti) {
    suma += soucetStromu(dite);
  }
  return suma;
};</code></pre>

<p>Obě varianty jsou srovnatelně čitelné.</p>

<h2 id="reduceright">Metoda reduceRight</h2>

<p>Prochází pole <b>od konce</b>. Užitečné pro <code>compose</code> funkce:</p>

<pre><code>const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);</code></pre>

<h2 id="mutace">Mutace vs. imutabilita</h2>

<p>Při práci s objekty/poli jako akumulátorem:</p>

<pre><code>// S mutací — rychlejší, ale pozor v React/Redux
pole.reduce((acc, item) => {
  acc.push(item);
  return acc;
}, []);

// Bez mutace — bezpečnější, ale pomalejší
pole.reduce((acc, item) => [...acc, item], []);</code></pre>

<p>Pro běžné skripty je mutace v pořádku. Pro React/Redux preferujte imutabilní přístup.</p>

<h2 id="tipy">Shrnutí</h2>

<ul>
  <li><b>Nepoužívejte reduce</b> pro jednoduché operace — <code>map</code>, <code>filter</code>, <code>flat</code>, <code>Math.max</code> jsou čitelnější</li>
  <li><b>Používejte reduce</b> pro compose/pipe, více agregací najednou, stavové automaty</li>
  <li><b>Vždy uvádějte počáteční hodnotu</b> — předejdete chybám u prázdných polí</li>
  <li>Pokud je callback delší než 5 řádků, zvažte <code>for...of</code></li>
</ul>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce">MDN: Array.prototype.reduce()</a></li>
</ul>
