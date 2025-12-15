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

// S reduce
const soucet = cisla.reduce((acc, cislo) => acc + cislo, 0);

console.log(soucet); // 15</code></pre>

<p>Počáteční hodnota <code>0</code> zajistí, že pro prázdné pole dostaneme <code>0</code> místo chyby.</p>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>// S cyklem for
let soucet = 0;
for (const cislo of cisla) {
  soucet += cislo;
}

// Nebo s forEach
let soucet = 0;
cisla.forEach(cislo => soucet += cislo);</code></pre>

<h2 id="prumer">Výpočet průměru</h2>

<p>Pro výpočet <b>průměru</b> využijeme třetí parametr (index) k detekci posledního prvku:</p>

<pre><code>const cisla = [10, 20, 30, 40];

// S reduce
const prumer = cisla.reduce((acc, cislo, index, pole) => {
  acc += cislo;
  if (index === pole.length - 1) {
    return acc / pole.length;
  }
  return acc;
}, 0);

console.log(prumer); // 25</code></pre>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>// Čitelnější varianta
let soucet = 0;
for (const cislo of cisla) {
  soucet += cislo;
}
const prumer = cisla.length ? soucet / cisla.length : 0;</code></pre>

<h2 id="max-min">Nalezení maxima a minima</h2>

<p>Metoda <code>reduce</code> umí najít <b>největší</b> nebo <b>nejmenší</b> hodnotu v poli:</p>

<pre><code>const cisla = [3, 7, 2, 9, 1, 5];

// S reduce
const max = cisla.reduce((acc, cislo) => cislo > acc ? cislo : acc);
const min = cisla.reduce((acc, cislo) => cislo &lt; acc ? cislo : acc);

console.log(max); // 9
console.log(min); // 1</code></pre>

<p>Všimněte si, že zde <b>není počáteční hodnota</b> — použije se první prvek pole.</p>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>// S Math.max/min a spread operátorem (lepší volba)
const max = Math.max(...cisla);
const min = Math.min(...cisla);

// S cyklem
let max = cisla[0];
for (const cislo of cisla) {
  if (cislo > max) max = cislo;
}</code></pre>

<h2 id="pocitani">Počítání výskytů</h2>

<p>Pomocí <code>reduce</code> lze snadno <b>spočítat</b>, kolikrát se každý prvek v poli vyskytuje:</p>

<pre><code>const ovoce = ["jablko", "banán", "jablko", "pomeranč", "banán", "jablko"];

// S reduce
const pocty = ovoce.reduce((acc, polozka) => {
  acc[polozka] = (acc[polozka] || 0) + 1;
  return acc;
}, {});

console.log(pocty);
// { jablko: 3, banán: 2, pomeranč: 1 }</code></pre>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>const pocty = {};
for (const polozka of ovoce) {
  pocty[polozka] = (pocty[polozka] || 0) + 1;
}</code></pre>

<h2 id="seskupovani">Seskupování dat</h2>

<p>Data lze <b>seskupit</b> podle určité vlastnosti:</p>

<pre><code>const lide = [
  { jmeno: "Anna", vek: 25 },
  { jmeno: "Petr", vek: 30 },
  { jmeno: "Jana", vek: 25 },
  { jmeno: "Karel", vek: 30 }
];

// S reduce
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

<p><b>Alternativa bez reduce:</b></p>

<pre><code>// S Object.groupBy (moderní prohlížeče)
const podleVeku = Object.groupBy(lide, osoba => osoba.vek);

// S cyklem
const podleVeku = {};
for (const osoba of lide) {
  const klic = osoba.vek;
  if (!podleVeku[klic]) {
    podleVeku[klic] = [];
  }
  podleVeku[klic].push(osoba);
}</code></pre>

<h2 id="zplosteni">Zploštění pole</h2>

<p>Víceúrovňové pole lze pomocí <code>reduce</code> <b>zploštit</b> na jednoúrovňové:</p>

<pre><code>const vnorene = [[1, 2], [3, 4], [5, 6]];

// S reduce
const ploche = vnorene.reduce((acc, pole) => acc.concat(pole), []);

console.log(ploche); // [1, 2, 3, 4, 5, 6]</code></pre>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>// S flat (lepší volba)
const ploche = vnorene.flat();

// Pro hluboké zanoření
const hluboce = [[1, [2, [3]]]];
const ploche = hluboce.flat(Infinity); // [1, 2, 3]</code></pre>

<h2 id="retezeni">Nahrazení map a filter</h2>

<p>Metoda <code>reduce</code> dokáže nahradit kombinaci <code>map</code> a <code>filter</code> v jednom průchodu:</p>

<pre><code>const cisla = [1, 2, 3, 4, 5, 6];

// S reduce (jeden průchod)
const vysledek = cisla.reduce((acc, n) => {
  if (n % 2 === 0) {
    acc.push(n * 2);
  }
  return acc;
}, []);

console.log(vysledek); // [4, 8, 12]</code></pre>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>// S filter a map (čitelnější)
const vysledek = cisla
  .filter(n => n % 2 === 0)
  .map(n => n * 2);

// S cyklem
const vysledek = [];
for (const n of cisla) {
  if (n % 2 === 0) {
    vysledek.push(n * 2);
  }
}</code></pre>

<h2 id="reduceright">Metoda reduceRight</h2>

<p>Existuje také <code>reduceRight</code>, která prochází pole <b>od konce</b>:</p>

<pre><code>const slova = ["svět", " ", "Ahoj"];

// S reduceRight
const veta = slova.reduceRight((acc, slovo) => acc + slovo, "");

console.log(veta); // "Ahoj svět"</code></pre>

<p><b>Alternativa bez reduce:</b></p>

<pre><code>// S reverse a join
const veta = slova.slice().reverse().join("");

// S cyklem
let veta = "";
for (let i = slova.length - 1; i >= 0; i--) {
  veta += slova[i];
}</code></pre>

<h2 id="best-practice">Kdy je reduce nejlepší volba</h2>

<p>Metoda <code>reduce</code> vyniká v těchto situacích:</p>

<h3>Skládání funkcí (compose)</h3>

<p>Vytvoření pipeline funkcí, které se postupně aplikují na hodnotu:</p>

<pre><code>const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const pricti5 = x => x + 5;
const vynasob2 = x => x * 2;
const odecti3 = x => x - 3;

const vypocet = pipe(pricti5, vynasob2, odecti3);
console.log(vypocet(10)); // ((10 + 5) * 2) - 3 = 27</code></pre>

<h3>Převod pole na objekt</h3>

<pre><code>const pole = [["a", 1], ["b", 2], ["c", 3]];

const objekt = pole.reduce((acc, [klic, hodnota]) => {
  acc[klic] = hodnota;
  return acc;
}, {});

console.log(objekt); // { a: 1, b: 2, c: 3 }

// Alternativa: Object.fromEntries (lepší)
const objekt = Object.fromEntries(pole);</code></pre>

<h3>Sekvenční Promise</h3>

<p>Spuštění asynchronních operací <b>postupně</b> (ne paralelně):</p>

<pre><code>const urls = ["/api/1", "/api/2", "/api/3"];

const vysledky = await urls.reduce(async (accPromise, url) => {
  const acc = await accPromise;
  const response = await fetch(url);
  const data = await response.json();
  acc.push(data);
  return acc;
}, Promise.resolve([]));</code></pre>

<h3>Deduplikace s podmínkou</h3>

<p>Odstranění duplicit podle vlastnosti objektu:</p>

<pre><code>const lide = [
  { id: 1, jmeno: "Anna" },
  { id: 2, jmeno: "Petr" },
  { id: 1, jmeno: "Anna" }
];

const unikatni = lide.reduce((acc, osoba) => {
  if (!acc.some(o => o.id === osoba.id)) {
    acc.push(osoba);
  }
  return acc;
}, []);

// Alternativa s Map
const unikatni = [...new Map(lide.map(o => [o.id, o])).values()];</code></pre>

<h2 id="kdy-nepouzivat">Kdy reduce nepoužívat</h2>

<p>Metoda <code>reduce</code> <b>není vždy nejlepší volba</b>. Vyhněte se jí v těchto případech:</p>

<h3>Jednoduché transformace</h3>

<p>Pro <code>map</code>, <code>filter</code> nebo <code>find</code> operace použijte přímo tyto metody:</p>

<pre><code>// Špatně — zbytečně složité
const dvojnasobky = cisla.reduce((acc, n) => {
  acc.push(n * 2);
  return acc;
}, []);

// Správně — čitelné a jasné
const dvojnasobky = cisla.map(n => n * 2);</code></pre>

<h3>Hledání max/min</h3>

<p>Pro čísla je <code>Math.max/min</code> čitelnější:</p>

<pre><code>// Zbytečně složité
const max = cisla.reduce((a, b) => a > b ? a : b);

// Lepší
const max = Math.max(...cisla);</code></pre>

<h3>Zploštění pole</h3>

<p>Metoda <code>flat()</code> je určena přesně pro tento účel:</p>

<pre><code>// Zbytečně složité
const ploche = vnorene.reduce((acc, arr) => acc.concat(arr), []);

// Lepší
const ploche = vnorene.flat();</code></pre>

<h3>Vedlejší efekty</h3>

<p>Pokud jen procházíte pole a provádíte akce (DOM manipulace, console.log), použijte <code>forEach</code>:</p>

<pre><code>// Špatně — reduce nemá vracet nic smysluplného
cisla.reduce((_, cislo) => {
  console.log(cislo);
}, null);

// Správně
cisla.forEach(cislo => console.log(cislo));</code></pre>

<h3>Příliš složitá logika</h3>

<p>Pokud je callback <code>reduce</code> delší než 5–7 řádků, zvažte cyklus <code>for</code>:</p>

<pre><code>// Těžko čitelné
const vysledek = data.reduce((acc, item) => {
  // 15 řádků složité logiky...
  return acc;
}, initial);

// Lepší — cyklus s jasnou strukturou
const vysledek = initial;
for (const item of data) {
  // Logika rozdělená do menších kroků
}</code></pre>

<h2 id="mutace">Co znamená „nemutujte akumulátor"</h2>

<p>Při práci s <b>objekty</b> nebo <b>poli</b> jako akumulátorem existují dva přístupy:</p>

<h3>S mutací (funkční, ale může způsobit problémy)</h3>

<pre><code>const vysledek = pole.reduce((acc, item) => {
  acc.push(item);  // Mutuje původní pole
  acc[key] = val;  // Mutuje původní objekt
  return acc;
}, []);</code></pre>

<h3>Bez mutace (bezpečnější)</h3>

<pre><code>const vysledek = pole.reduce((acc, item) => {
  return [...acc, item];           // Nové pole
  return { ...acc, [key]: val };   // Nový objekt
}, []);</code></pre>

<p><b>Proč na tom záleží?</b></p>

<ul>
  <li><b>Předvídatelnost</b> — nemutující kód je snazší debugovat</li>
  <li><b>React/Redux</b> — vyžadují nové reference pro detekci změn</li>
  <li><b>Paralelní zpracování</b> — mutace může způsobit race conditions</li>
</ul>

<p><b>Prakticky:</b> Pro jednoduché skripty je mutace v pořádku. Pro React/Redux aplikace nebo sdílený kód preferujte imutabilní přístup.</p>

<h2 id="tipy">Praktické tipy</h2>

<ul>
  <li><b>Vždy uvádějte počáteční hodnotu</b> — předejdete chybám u prázdných polí</li>
  <li><b>Nezapomeňte na return</b> — callback musí vždy vrátit novou hodnotu akumulátoru</li>
  <li><b>Preferujte čitelnost</b> — pokud je <code>map</code>/<code>filter</code>/<code>for</code> jasnější, použijte je</li>
  <li><b>Pojmenujte akumulátor smysluplně</b> — <code>sum</code>, <code>groups</code>, <code>result</code> místo <code>acc</code></li>
</ul>

<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Metoda <code>reduce</code> je podporována ve všech moderních prohlížečích a v Internet Exploreru od verze 9.</p>
