---
title: "Metoda reduce v JavaScriptu"
headline: "Metoda <code>reduce</code> v JavaScriptu"
description: "Jak funguje metoda reduce v JavaScriptu. Praktické příklady použití pro součet, průměr, seskupování dat a další operace s poli."
date: "2025-01-15"
last_modification: "2025-01-15"
status: 1
tags: ["js", "hotova-reseni"]
format: "html"
---

<p>Metoda <code>reduce</code> je jedna z <b>nejužitečnějších</b> metod pro práci s poli v JavaScriptu. Umožňuje <b>redukovat</b> pole na jedinou hodnotu — číslo, řetězec, objekt nebo dokonce jiné pole.</p>

<h2 id="syntaxe">Základní syntaxe</h2>

<p>Metoda <code>reduce</code> přijímá dva parametry: <b>callback funkci</b> a volitelnou <b>počáteční hodnotu</b> akumulátoru.</p>

<pre><code>pole.reduce((akumulator, aktualniHodnota, index, pole) => {
  return novaHodnotaAkumulatoru;
}, pocatecniHodnota);</code></pre>

<p>Callback funkce má čtyři parametry:</p>
<ul>
  <li><code>akumulator</code> — průběžný výsledek, který se předává mezi iteracemi</li>
  <li><code>aktualniHodnota</code> — aktuální prvek pole</li>
  <li><code>index</code> — index aktuálního prvku (volitelný)</li>
  <li><code>pole</code> — původní pole (volitelný)</li>
</ul>

<h2 id="soucet">Součet čísel</h2>

<p>Nejčastější použití <code>reduce</code> je <b>sečtení</b> všech prvků pole:</p>

<pre><code>const cisla = [1, 2, 3, 4, 5];

const soucet = cisla.reduce((acc, cislo) => acc + cislo, 0);

console.log(soucet); // 15</code></pre>

<p>Počáteční hodnota <code>0</code> zajistí, že pro prázdné pole dostaneme <code>0</code> místo chyby.</p>

<h2 id="prumer">Výpočet průměru</h2>

<p>Pro výpočet <b>průměru</b> využijeme třetí parametr (index) k detekci posledního prvku:</p>

<pre><code>const cisla = [10, 20, 30, 40];

const prumer = cisla.reduce((acc, cislo, index, pole) => {
  acc += cislo;
  if (index === pole.length - 1) {
    return acc / pole.length;
  }
  return acc;
}, 0);

console.log(prumer); // 25</code></pre>

<h2 id="max-min">Nalezení maxima a minima</h2>

<p>Metoda <code>reduce</code> umí najít <b>největší</b> nebo <b>nejmenší</b> hodnotu v poli:</p>

<pre><code>const cisla = [3, 7, 2, 9, 1, 5];

const max = cisla.reduce((acc, cislo) => cislo > acc ? cislo : acc);
const min = cisla.reduce((acc, cislo) => cislo &lt; acc ? cislo : acc);

console.log(max); // 9
console.log(min); // 1</code></pre>

<p>Všimněte si, že zde <b>není počáteční hodnota</b> — použije se první prvek pole.</p>

<h2 id="pocitani">Počítání výskytů</h2>

<p>Pomocí <code>reduce</code> lze snadno <b>spočítat</b>, kolikrát se každý prvek v poli vyskytuje:</p>

<pre><code>const ovoce = ["jablko", "banán", "jablko", "pomeranč", "banán", "jablko"];

const pocty = ovoce.reduce((acc, polozka) => {
  acc[polozka] = (acc[polozka] || 0) + 1;
  return acc;
}, {});

console.log(pocty);
// { jablko: 3, banán: 2, pomeranč: 1 }</code></pre>

<h2 id="seskupovani">Seskupování dat</h2>

<p>Data lze <b>seskupit</b> podle určité vlastnosti:</p>

<pre><code>const lide = [
  { jmeno: "Anna", vek: 25 },
  { jmeno: "Petr", vek: 30 },
  { jmeno: "Jana", vek: 25 },
  { jmeno: "Karel", vek: 30 }
];

const podleVeku = lide.reduce((acc, osoba) => {
  const klic = osoba.vek;
  if (!acc[klic]) {
    acc[klic] = [];
  }
  acc[klic].push(osoba);
  return acc;
}, {});

console.log(podleVeku);
// { 25: [{jmeno: "Anna", ...}, {jmeno: "Jana", ...}], 30: [...] }</code></pre>

<h2 id="zplosteni">Zploštění pole</h2>

<p>Víceúrovňové pole lze pomocí <code>reduce</code> <b>zploštit</b> na jednoúrovňové:</p>

<pre><code>const vnorene = [[1, 2], [3, 4], [5, 6]];

const ploche = vnorene.reduce((acc, pole) => acc.concat(pole), []);

console.log(ploche); // [1, 2, 3, 4, 5, 6]</code></pre>

<p><i>Poznámka:</i> Pro hlubší zanoření lze použít <code>Array.prototype.flat()</code> nebo rekurzivní <code>reduce</code>.</p>

<h2 id="retezeni">Nahrazení map a filter</h2>

<p>Metoda <code>reduce</code> dokáže nahradit kombinaci <code>map</code> a <code>filter</code> v jednom průchodu:</p>

<pre><code>const cisla = [1, 2, 3, 4, 5, 6];

// Klasicky s map a filter (dva průchody)
const vysledek1 = cisla
  .filter(n => n % 2 === 0)
  .map(n => n * 2);

// S reduce (jeden průchod)
const vysledek2 = cisla.reduce((acc, n) => {
  if (n % 2 === 0) {
    acc.push(n * 2);
  }
  return acc;
}, []);

console.log(vysledek2); // [4, 8, 12]</code></pre>

<h2 id="reduceright">Metoda reduceRight</h2>

<p>Existuje také <code>reduceRight</code>, která prochází pole <b>od konce</b>:</p>

<pre><code>const slova = ["svět", " ", "Ahoj"];

const veta = slova.reduceRight((acc, slovo) => acc + slovo, "");

console.log(veta); // "Ahoj svět"</code></pre>

<h2 id="tipy">Praktické tipy</h2>

<ul>
  <li><b>Vždy uvádějte počáteční hodnotu</b> — předejdete chybám u prázdných polí</li>
  <li><b>Nezapomeňte na return</b> — callback musí vždy vrátit novou hodnotu akumulátoru</li>
  <li><b>Nemutujte akumulátor</b> — u objektů a polí raději vytvářejte nové instance</li>
  <li>Pro jednoduché operace jako <code>map</code> nebo <code>filter</code> použijte přímo tyto metody — <b>čitelnost</b> je důležitější než optimalizace</li>
</ul>

<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Metoda <code>reduce</code> je podporována ve všech moderních prohlížečích a v Internet Exploreru od verze 9.</p>
