---
title: "Enum, union type, nebo const?"
headline: "TypeScript: Enum, union type, nebo <code>as const</code>?"
description: "Porovnání tří způsobů definování konstant v TypeScriptu – enum, union type a const assertion. Kdy který použít a jaké jsou jejich výhody a nevýhody."
date: "2026-01-19"
last_modification: "2026-01-19"
status: 1
tags: ["js"]
format: "html"
---

<p>V TypeScriptu máte několik způsobů, jak definovat sadu konstant. Nejčastější jsou <b>enum</b>, <b>union type</b> a <b>const assertion</b>. Každý přístup má své výhody a nevýhody.</p>

<h2 id="prehled">Přehled</h2>

<table>
  <tr>
    <th>Přístup</th>
    <th>Runtime hodnota</th>
    <th>Tree-shaking</th>
    <th>Iterace</th>
  </tr>
  <tr>
    <td>enum</td>
    <td>Ano</td>
    <td>Ne</td>
    <td>Ano</td>
  </tr>
  <tr>
    <td>const enum</td>
    <td>Ne (inlinuje se)</td>
    <td>Ano</td>
    <td>Ne</td>
  </tr>
  <tr>
    <td>Union type</td>
    <td>Ne</td>
    <td>-</td>
    <td>Ne</td>
  </tr>
  <tr>
    <td>as const</td>
    <td>Ano</td>
    <td>Ano</td>
    <td>Ano</td>
  </tr>
</table>

<h2 id="enum">Enum</h2>

<p>TypeScript enum je speciální konstrukce, která vytváří pojmenované konstanty. Dnes je považován za <b>legacy pattern</b> — vznikl v době, kdy TypeScript neměl lepší alternativy. Moderní projekty preferují union types nebo <code>as const</code>.</p>

<pre><code class="language-typescript">enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending'
}

function setStatus(status: Status) {
  console.log(status);
}

setStatus(Status.Active); // 'active'</code></pre>

<h3>Číselný enum</h3>

<p>Bez explicitních hodnot TypeScript přiřadí čísla od 0:</p>

<pre><code class="language-typescript">enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

console.log(Direction.Up);   // 0
console.log(Direction[0]);   // 'Up' (reversní mapování)</code></pre>

<p>Číselné enumy mají <b>reversní mapování</b> — můžete získat název z hodnoty. To ale zvětšuje výstupní kód.</p>

<h3>Co se vygeneruje</h3>

<p>Enum se kompiluje do JavaScriptového objektu:</p>

<pre><code class="language-javascript">// TypeScript
enum Status {
  Active = 'active',
  Inactive = 'inactive'
}

// Vygenerovaný JavaScript
var Status;
(function (Status) {
  Status["Active"] = "active";
  Status["Inactive"] = "inactive";
})(Status || (Status = {}));</code></pre>

<p>Pro číselný enum je kód ještě delší kvůli reversnímu mapování.</p>

<h3>Výhody enum</h3>

<ul>
  <li>Srozumitelná syntaxe</li>
  <li>Lze iterovat přes hodnoty</li>
  <li>Reversní mapování (pro číselné enumy)</li>
  <li>Hodnoty existují za běhu</li>
</ul>

<h3>Nevýhody enum</h3>

<ul>
  <li>Generuje runtime kód</li>
  <li>Nelze tree-shakovat — celý enum je vždy v bundlu (výsledném souboru po buildu)</li>
  <li>Není nativní JavaScript — specifické pro TypeScript</li>
  <li>Problémy s <code>isolatedModules</code> — tato volba v <code>tsconfig.json</code> zajišťuje, že každý soubor lze kompilovat samostatně (vyžadují ji nástroje jako Babel, esbuild nebo SWC). Při zapnuté volbě nelze re-exportovat enum z jiného souboru (<code>export { Status } from './types'</code>), protože kompilátor neví, jestli je <code>Status</code> typ nebo hodnota.</li>
</ul>

<h2 id="const-enum">Const enum</h2>

<p>Const enum se úplně odstraní při kompilaci — hodnoty se inlinují přímo do kódu:</p>

<pre><code class="language-typescript">const enum Status {
  Active = 'active',
  Inactive = 'inactive'
}

console.log(Status.Active);

// Vygenerovaný JavaScript
console.log("active"); // Enum zmizí, hodnota se vloží přímo</code></pre>

<h3>Omezení const enum</h3>

<ul>
  <li>Nelze iterovat — za běhu neexistuje</li>
  <li>Problémy při použití z jiných balíčků</li>
  <li>Nefunguje s <code>isolatedModules: true</code> — tato volba vyžaduje, aby každý soubor byl samostatně kompilovatelný. Const enum ale potřebuje znát hodnoty z jiného souboru v době kompilace, což není možné.</li>
  <li>Nelze použít computed hodnoty — hodnoty musí být konstantní výrazy (literály, reference na jiné členy enum). Nelze použít např. <code>Math.random()</code> nebo volání funkcí.</li>
</ul>

<p>TypeScript tým <a href="https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls">nedoporučuje const enum</a> v knihovnách.</p>

<h2 id="union-type">Union type</h2>

<p>Union type definuje typ jako sjednocení literálů (konkrétních hodnot jako <code>"active"</code> nebo <code>200</code>, na rozdíl od obecných typů jako <code>string</code> nebo <code>number</code>):</p>

<pre><code class="language-typescript">type Status = 'active' | 'inactive' | 'pending';

function setStatus(status: Status) {
  console.log(status);
}

setStatus('active');    // OK
setStatus('unknown');   // Chyba: Argument of type '"unknown"' is not assignable</code></pre>

<h3>S objektovým typem</h3>

<pre><code class="language-typescript">type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Request {
  method: HttpMethod;
  url: string;
}

const req: Request = {
  method: 'GET',
  url: '/api/users'
};</code></pre>

<h3>Výhody union type</h3>

<ul>
  <li>Žádný runtime kód — existuje jen v typovém systému</li>
  <li>Nativní TypeScript pattern</li>
  <li>Funguje s <code>isolatedModules</code></li>
  <li>Výborná podpora v IDE (autocomplete)</li>
</ul>

<h3>Nevýhody union type</h3>

<ul>
  <li>Nelze iterovat — není runtime hodnota</li>
  <li>Nelze získat seznam hodnot za běhu</li>
  <li>Při mnoha hodnotách může být nepřehledné</li>
  <li>Při volání funkce píšete stringy přímo v kódu (<code>setStatus('active')</code>) — náchylné na překlepy a IDE autocomplete funguje až po napsání uvozovky</li>
</ul>

<p>Poslední bod řeší <code>as const</code>, kde místo stringů používáte pojmenované konstanty (<code>Status.Active</code>).</p>

<h2 id="as-const">Const assertion (<code>as const</code>)</h2>

<p>Const assertion vytvoří readonly objekt nebo pole s literálními typy. Nejjednodušší je <b>pole</b>:</p>

<pre><code class="language-typescript">const STATUSES = ['active', 'inactive', 'pending'] as const;

type Status = typeof STATUSES[number];
// Typ: "active" | "inactive" | "pending"

// Můžete iterovat
STATUSES.forEach(status =&gt; console.log(status));</code></pre>

<p>Zápis <code>[number]</code> znamená „typ libovolného prvku pole“ — je výrazně kratší než <code>[keyof typeof]</code> u objektů.</p>

<h3>S objektem (pojmenované klíče)</h3>

<p>Pokud chcete pojmenované konstanty jako <code>Status.Active</code>:</p>

<pre><code class="language-typescript">const Status = {
  Active: 'active',
  Inactive: 'inactive',
  Pending: 'pending'
} as const;

type StatusType = typeof Status[keyof typeof Status];
// Typ: "active" | "inactive" | "pending"

setStatus(Status.Active);  // Pojmenovaná konstanta
setStatus('active');       // Také funguje</code></pre>

<p>Zápis <code>typeof Status[keyof typeof Status]</code> je krkolomný, ale dá se zjednodušit pomocí <a href="#helper">helper typu</a>.</p>

<h3>Co se vygeneruje</h3>

<pre><code class="language-javascript">// TypeScript
const Status = {
  Active: 'active',
  Inactive: 'inactive'
} as const;

// Vygenerovaný JavaScript
const Status = {
  Active: 'active',
  Inactive: 'inactive'
};</code></pre>

<p>Konstanta <code>as const</code> se zkompiluje do běžného objektu — žádný overhead.</p>

<h3>Výhody as const</h3>

<ul>
  <li>Kombinuje výhody enum a union type</li>
  <li>Runtime hodnoty existují</li>
  <li>Lze iterovat</li>
  <li>Minimální vygenerovaný kód</li>
  <li>Tree-shakeable</li>
  <li>Funguje s <code>isolatedModules</code></li>
  <li>Nativní JavaScript pattern</li>
</ul>

<h3>Nevýhody as const</h3>

<ul>
  <li>Více kódu pro extrakci typu (<code>typeof X[keyof typeof X]</code>)</li>
  <li>Méně intuitivní pro začátečníky</li>
  <li>Stále můžete psát stringy přímo v kódu — <code>if (status === "active")</code> projde, i když máte <code>Status.Active</code></li>
</ul>

<p>Poslední bod řeší ESLint pravidlo <a href="https://typescript-eslint.io/rules/prefer-literal-enum-member/">@typescript-eslint/no-restricted-syntax</a> nebo vlastní pravidlo zakazující literály tam, kde existuje konstanta. TypeScript sám překlepy zachytí (typ nedovolí <code>"actve"</code>), ale nenutí vás používat pojmenované konstanty.</p>

<h2 id="helper">Helper pro as const</h2>

<p>Pro jednodušší práci s <code>as const</code> můžete vytvořit helper:</p>

<pre><code class="language-typescript">// Helper pro získání union typu z objektu
type ValueOf&lt;T&gt; = T[keyof T];

const Status = {
  Active: 'active',
  Inactive: 'inactive',
  Pending: 'pending'
} as const;

type Status = ValueOf&lt;typeof Status&gt;;
// "active" | "inactive" | "pending"

// Helper pro pole
type ArrayElement&lt;T&gt; = T extends readonly (infer U)[] ? U : never;

const ROLES = ['admin', 'user', 'guest'] as const;

type Role = ArrayElement&lt;typeof ROLES&gt;;
// "admin" | "user" | "guest"</code></pre>

<h2 id="porovnani">Praktické porovnání</h2>

<h3>Definice</h3>

<pre><code class="language-typescript">// Enum
enum ColorEnum {
  Red = 'red',
  Green = 'green',
  Blue = 'blue'
}

// Union type
type ColorUnion = 'red' | 'green' | 'blue';

// As const
const Color = {
  Red: 'red',
  Green: 'green',
  Blue: 'blue'
} as const;
type ColorConst = typeof Color[keyof typeof Color];</code></pre>

<h3>Použití</h3>

<pre><code class="language-typescript">// Enum
function paintEnum(color: ColorEnum) {}
paintEnum(ColorEnum.Red);

// Union type
function paintUnion(color: ColorUnion) {}
paintUnion('red');

// As const
function paintConst(color: ColorConst) {}
paintConst(Color.Red);
paintConst('red'); // Také funguje</code></pre>

<h3>Iterace</h3>

<pre><code class="language-typescript">// Enum — funguje, ale komplikovaně
Object.values(ColorEnum).forEach(color => console.log(color));

// Union type — nelze
// ColorUnion.forEach... // Chyba - typ neexistuje za běhu

// As const — funguje
Object.values(Color).forEach(color => console.log(color));</code></pre>

<h2 id="kdy-co">Kdy co použít</h2>

<h3>Použijte union type když:</h3>

<ul>
  <li>Nepotřebujete runtime hodnoty</li>
  <li>Máte jednoduchý seznam možností</li>
  <li>Chcete co nejmenší bundle</li>
</ul>

<pre><code class="language-typescript">type Size = 'sm' | 'md' | 'lg' | 'xl';
type Theme = 'light' | 'dark';
type HttpStatus = 200 | 201 | 400 | 404 | 500;</code></pre>

<h3>Použijte as const když:</h3>

<ul>
  <li>Potřebujete runtime hodnoty i typy</li>
  <li>Chcete iterovat přes hodnoty</li>
  <li>Vytváříte knihovnu</li>
  <li>Máte <code>isolatedModules: true</code></li>
</ul>

<pre><code class="language-typescript">const API_ENDPOINTS = {
  Users: '/api/users',
  Posts: '/api/posts',
  Comments: '/api/comments'
} as const;

type Endpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

// Můžete iterovat i typovat
Object.entries(API_ENDPOINTS).forEach(([name, url]) => {
  console.log(`${name}: ${url}`);
});</code></pre>

<h3>Použijte enum když:</h3>

<ul>
  <li>Pracujete s existujícím kódem, který enumy používá</li>
  <li>Potřebujete reversní mapování (číselné enumy)</li>
  <li>Tým je na enumy zvyklý</li>
</ul>

<h3>Vyhněte se const enum</h3>

<p>Const enum má příliš mnoho problémů. Použijte raději <code>as const</code>.</p>

<h2 id="discriminated-union">Discriminated union</h2>

<p>Pro složitější případy použijte <b>discriminated union</b> — union typů s rozlišovacím polem:</p>

<pre><code class="language-typescript">type Action =
  | { type: 'increment'; amount: number }
  | { type: 'decrement'; amount: number }
  | { type: 'reset' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment':
      return state + action.amount;
    case 'decrement':
      return state - action.amount;
    case 'reset':
      return 0;
  }
}</code></pre>

<p>TypeScript automaticky zúží typ v každé větvi switche.</p>

<h2 id="migrace">Migrace z enum na as const</h2>

<p>Pokud chcete migrovat existující enum:</p>

<pre><code class="language-typescript">// Původní enum
enum OldStatus {
  Active = 'active',
  Inactive = 'inactive'
}

// Nový as const
const Status = {
  Active: 'active',
  Inactive: 'inactive'
} as const;

type Status = typeof Status[keyof typeof Status];

// Použití zůstává téměř stejné
// OldStatus.Active → Status.Active</code></pre>

<h2 id="zaver">Závěr</h2>

<ol>
  <li><b>Union type</b> — pro jednoduché případy bez runtime hodnot</li>
  <li><b>As const</b> — pro většinu případů s runtime hodnotami</li>
  <li><b>Enum</b> — pouze pokud máte dobrý důvod</li>
  <li><b>Const enum</b> — vyhněte se</li>
</ol>

<p>Moderní TypeScript projekty preferují <code>as const</code> nebo union types. Enumy jsou stále validní volba, ale přinášejí zbytečný runtime overhead.</p>
