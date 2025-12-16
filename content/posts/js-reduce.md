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
  <li><b>Působí „funkcionálně"</b> — pochází z funkcionálního programování a přišla s vlnou FP spolu s <code>map</code> a <code>filter</code>, takže ji lidé automaticky považují za moderní přístup</li>
  <li><b>Tutoriály</b> — často ji prezentují jako „pokročilou techniku", kterou by měl znát každý JS vývojář</li>
  <li><b>One-liner syndrom</b> — láká k zápisu všeho na jeden řádek, i když výsledek je nečitelný</li>
  <li><b>Univerzálnost</b> — pomocí <code>reduce</code> lze skutečně implementovat všechny ostatní array metody (<code>map</code>, <code>filter</code>, <code>find</code>, <code>some</code>, <code>every</code>, <code>flat</code>…), což vede k dojmu, že je to „správný" nástroj na vše</li>
</ul>

<p>Ve skutečnosti je <code>reduce</code> <b>okrajový nástroj</b> pro specifické případy. Pro většinu úloh existuje čitelnější alternativa.</p>

<h2 id="vyhody">Výhody reduce</h2>

<p>Přesto má <code>reduce</code> několik legitimních výhod:</p>

<ul>
  <li><b>Výsledek jako const</b> — nepotřebujete <code>let</code> proměnnou, kterou postupně měníte. To má tu výhodu, že nehrozí, že se dále v kódu omylem přepíše</li>
  <li><b>Zapouzdřený stav</b> — akumulátor neuniká do okolního scope</li>
  <li><b>Jeden výraz</b> — lze použít přímo v expression kontextu (přiřazení, return, ternární operátor)</li>
  <li><b>Žádné mezivýsledky</b> — na rozdíl od <code>filter().map()</code> nevytváří mezipole</li>
</ul>

<p><b>Výkonnost:</b> Samotný <code>reduce</code> je kvůli režii volání funkce o něco pomalejší než prostý <code>for</code> cyklus. Výhodu má při nahrazení řetězených metod (<code>filter().map()</code>), kde ušetří vytváření mezipole a druhý průchod. V praxi je rozdíl zanedbatelný, že bych doporučoval řešit spíš čitelnost.</p>

<h2 id="kdy-nepouzivat">Kdy reduce nepoužívat</h2>

<p>Ve většině případů existuje <b>kratší a čitelnější</b> alternativa:</p>

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

// S reduce — 6 řádků
const podleVeku = lide.reduce((acc, osoba) => {
  const klic = osoba.vek;
  if (!acc[klic]) acc[klic] = [];
  acc[klic].push(osoba);
  return acc;
}, {});

// Bez reduce — 1 řádek (moderní prohlížeče)
const podleVeku = Object.groupBy(lide, o => o.vek);</code></pre>

<h3>Filtrování a mapování</h3>

<p>Vyfiltruje sudá čísla a zdvojnásobí je — výsledek je <code>[4, 8, 12]</code>.</p>

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

<h3>Součet čísel</h3>

<pre><code>const cisla = [1, 2, 3, 4, 5];
const soucet = cisla.reduce((acc, n) => acc + n, 0);</code></pre>

<p>Výsledek je <code>const</code> a pomocná proměnná neuniká do scope. Alternativa s <code>for</code> cyklem vyžaduje <code>let</code>.</p>

<h3>Skládání funkcí (compose/pipe)</h3>

<pre><code>const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const pricti5 = x => x + 5;
const vynasob2 = x => x * 2;

const vypocet = pipe(pricti5, vynasob2);
console.log(vypocet(10)); // (10 + 5) * 2 = 30</code></pre>

<p>Alternativa s vnořeným voláním <code>vynasob2(pricti5(10))</code> je při více funkcích nečitelná. Cyklus by fungoval, ale reduce je zde skutečně nejelegantnější.</p>

<p>Pro ostatní případy (více agregací, stavové automaty, async operace, rekurzivní struktury) <b>existují vždy srovnatelně nebo více čitelné alternativy</b> pomocí <code>for...of</code>. Cyklus navíc umožňuje <code>break</code> pro předčasné ukončení, což reduce neumí.</p>

<h2 id="reduceright">Metoda reduceRight</h2>

<p>Prochází pole <b>od konce</b>. Užitečné pro <code>compose</code> funkce:</p>

<pre><code>const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);</code></pre>

<h2 id="mutace">Mutace vs. imutabilita</h2>

<p>Reduce jde používat s mutací i bez:</p>

<pre><code>// S mutací — rychlejší
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
