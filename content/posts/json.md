---
title: „JSON“
headline: „JSON – formát, validace, formátování a porovnání“
description: „JSON je universální formát pro ukládání a přenos dat. Online nástroj pro formátování, minifikaci, validaci a porovnání JSON souborů.“
date: „2014–05–20“
last_modification: „2025–01–19“
status: 1
tags: [„js“, „php“, „hotova-reseni“]
format: „html“
---

<p>Zkratka <b>JSON</b> znamená <i lang=„en“>JavaScript Object Notation</i> – česky by se dala přeložit třeba jako <i>styl zápisu JavaScriptového objektu</i>. Z toho plyne, že má něco společného s JS, ale v dnešní době se používá jako universální strojově čitelný formát pro výměnu dat.</p>

<p>Hlavní výhody JSONu:</p>

<ul>
  <li><b>Čitelnost</b> – na rozdíl od XML je kompaktnější a přehlednější</li>
  <li><b>Snadné zpracování</b> – nativní podpora ve všech moderních jazycích</li>
  <li><b>Universálnost</b> – standard pro REST API, konfigurační soubory, databáze</li>
</ul>


<div class=„live“>

<h2 id=„formatter“>JSON Formatter &amp; Validátor</h2>

<p>Vložte JSON pro <b>formátování</b>, <b>minifikaci</b> nebo <b>validaci</b>. Data se zpracovávají pouze v prohlížeči.</p>

<style>
.json-tool textarea {
  width: 100%;
  min-height: 200px;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
  font-size: 13px;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  resize: vertical;
  tab-size: 2;
}
.json-tool textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.json-tool .controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
}
.json-tool button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
}
.json-tool button.primary {
  background: #2563eb;
  color: white;
}
.json-tool button.primary:hover {
  background: #1d4ed8;
}
.json-tool button.secondary {
  background: #f3f4f6;
  color: #374151;
}
.json-tool button.secondary:hover {
  background: #e5e7eb;
}
.json-tool .status {
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 14px;
  margin: 12px 0;
}
.json-tool .status.valid {
  background: #d1fae5;
  color: #065f46;
}
.json-tool .status.invalid {
  background: #fee2e2;
  color: #991b1b;
}
.json-tool .status.info {
  background: #dbeafe;
  color: #1e40af;
}
.json-diff { margin-top: 20px; }
.json-diff .diff-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 768px) {
  .json-diff .diff-container {
    grid-template-columns: 1fr;
  }
}
.json-diff .diff-result {
  margin-top: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  font-family: ui-monospace, monospace;
  font-size: 13px;
  white-space: pre-wrap;
  max-height: 400px;
  overflow: auto;
}
.json-diff .added { background: #d1fae5; color: #065f46; }
.json-diff .removed { background: #fee2e2; color: #991b1b; }
.json-diff .changed { background: #fef3c7; color: #92400e; }
</style>

<div class=„json-tool“>
  <textarea id=„json-input“ placeholder='{„example“: „Vložte sem JSON…“}'></textarea>

  <div class=„controls“>
    <button class=„primary“ onclick=„formatJSON()“>Formátovat</button>
    <button class=„secondary“ onclick=„minifyJSON()“>Minifikovat</button>
    <button class=„secondary“ onclick=„validateJSON()“>Validovat</button>
    <button class=„secondary“ onclick=„copyJSON()“>Kopírovat</button>
    <button class=„secondary“ onclick=„clearJSON()“>Vymazat</button>
  </div>

  <div id=„json-status“></div>
</div>

<script>
function getJSONInput() {
  return document.getElementById('json-input');
}

function setStatus(message, type) {
  const status = document.getElementById('json-status');
  status.className = 'status ' + type;
  status.textContent = message;
  status.style.display = 'block';
}

function formatJSON() {
  const input = getJSONInput();
  try {
    const parsed = JSON.parse(input.value);
    input.value = JSON.stringify(parsed, null, 2);
    setStatus('✓ JSON naformátován', 'valid');
  } catch (e) {
    setStatus('✗ Chyba: ' + e.message, 'invalid');
  }
}

function minifyJSON() {
  const input = getJSONInput();
  try {
    const parsed = JSON.parse(input.value);
    input.value = JSON.stringify(parsed);
    setStatus('✓ JSON minifikován (' + input.value.length + ' znaků)', 'valid');
  } catch (e) {
    setStatus('✗ Chyba: ' + e.message, 'invalid');
  }
}

function validateJSON() {
  const input = getJSONInput();
  try {
    const parsed = JSON.parse(input.value);
    const keys = countKeys(parsed);
    setStatus('✓ Validní JSON (' + keys + ' klíčů, ' + input.value.length + ' znaků)', 'valid');
  } catch (e) {
    setStatus('✗ Nevalidní JSON: ' + e.message, 'invalid');
  }
}

function countKeys(obj) {
  let count = 0;
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      obj.forEach(item => count += countKeys(item));
    } else {
      for (const key in obj) {
        count++;
        count += countKeys(obj[key]);
      }
    }
  }
  return count;
}

function copyJSON() {
  const input = getJSONInput();
  navigator.clipboard.writeText(input.value).then(() => {
    setStatus('✓ Zkopírováno do schránky', 'info');
  });
}

function clearJSON() {
  getJSONInput().value = '';
  document.getElementById('json-status').style.display = 'none';
}

// Ukázkový JSON při načtení
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('json-input');
  if (input && !input.value) {
    input.value = '{„name“:„Jan Novák“,„age“:30,„email“:„jan@example.com“,„skills“:[„JavaScript“,„TypeScript“,„Python“],„address“:{„city“:„Praha“,„zip“:„11000“}}';
  }
});
</script>

<h2 id=„diff“>Porovnání JSON (Diff)</h2>

<p>Porovnejte dva JSON objekty a zobrazte <b>rozdíly</b> mezi nimi.</p>

<div class=„json-tool json-diff“>
  <div class=„diff-container“>
    <div>
      <label><b>JSON A</b> (původní)</label>
      <textarea id=„json-a“ placeholder='{„key“: „value“}'></textarea>
    </div>
    <div>
      <label><b>JSON B</b> (nový)</label>
      <textarea id=„json-b“ placeholder='{„key“: „new value“}'></textarea>
    </div>
  </div>

  <div class=„controls“>
    <button class=„primary“ onclick=„compareJSON()“>Porovnat</button>
    <button class=„secondary“ onclick=„swapJSON()“>Prohodit</button>
    <button class=„secondary“ onclick=„clearDiff()“>Vymazat</button>
  </div>

  <div id=„diff-status“></div>
  <div id=„diff-result“ class=„diff-result“ style=„display: none;“></div>
</div>

<script>
function compareJSON() {
  const a = document.getElementById('json-a').value;
  const b = document.getElementById('json-b').value;
  const result = document.getElementById('diff-result');
  const status = document.getElementById('diff-status');

  try {
    const objA = JSON.parse(a);
    const objB = JSON.parse(b);
    const diff = findDifferences(objA, objB, '');

    if (diff.length === 0) {
      status.className = 'status valid';
      status.textContent = '✓ JSON objekty jsou identické';
      status.style.display = 'block';
      result.style.display = 'none';
    } else {
      status.className = 'status info';
      status.textContent = 'Nalezeno ' + diff.length + ' rozdílů';
      status.style.display = 'block';
      result.innerHTML = diff.map(d => {
        const cls = d.type === 'added' ? 'added' : d.type === 'removed' ? 'removed' : 'changed';
        return '<div class=„' + cls + '“>' + escapeHtml(d.message) + '</div>';
      }).join('');
      result.style.display = 'block';
    }
  } catch (e) {
    status.className = 'status invalid';
    status.textContent = '✗ Chyba parsování: ' + e.message;
    status.style.display = 'block';
    result.style.display = 'none';
  }
}

function findDifferences(a, b, path) {
  const diffs = [];
  const prefix = path ? path + '.' : '';

  if (typeof a !== typeof b) {
    diffs.push({ type: 'changed', message: prefix.slice(0, -1) + ': typ změněn z ' + typeof a + ' na ' + typeof b });
    return diffs;
  }

  if (a === null || b === null) {
    if (a !== b) {
      diffs.push({ type: 'changed', message: prefix.slice(0, -1) + ': ' + JSON.stringify(a) + ' → ' + JSON.stringify(b) });
    }
    return diffs;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const maxLen = Math.max(a.length, b.length);
    for (let i = 0; i < maxLen; i++) {
      if (i >= a.length) {
        diffs.push({ type: 'added', message: '+ ' + prefix + '[' + i + ']: ' + JSON.stringify(b[i]) });
      } else if (i >= b.length) {
        diffs.push({ type: 'removed', message: '- ' + prefix + '[' + i + ']: ' + JSON.stringify(a[i]) });
      } else {
        diffs.push(…findDifferences(a[i], b[i], prefix + '[' + i + ']'));
      }
    }
    return diffs;
  }

  if (typeof a === 'object') {
    const allKeys = new Set([…Object.keys(a), …Object.keys(b)]);
    for (const key of allKeys) {
      const fullPath = prefix + key;
      if (!(key in a)) {
        diffs.push({ type: 'added', message: '+ ' + fullPath + ': ' + JSON.stringify(b[key]) });
      } else if (!(key in b)) {
        diffs.push({ type: 'removed', message: '- ' + fullPath + ': ' + JSON.stringify(a[key]) });
      } else {
        diffs.push(…findDifferences(a[key], b[key], fullPath));
      }
    }
    return diffs;
  }

  if (a !== b) {
    diffs.push({ type: 'changed', message: '~ ' + prefix.slice(0, -1) + ': ' + JSON.stringify(a) + ' → ' + JSON.stringify(b) });
  }

  return diffs;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function swapJSON() {
  const a = document.getElementById('json-a');
  const b = document.getElementById('json-b');
  const temp = a.value;
  a.value = b.value;
  b.value = temp;
}

function clearDiff() {
  document.getElementById('json-a').value = '';
  document.getElementById('json-b').value = '';
  document.getElementById('diff-status').style.display = 'none';
  document.getElementById('diff-result').style.display = 'none';
}

// Ukázková data pro diff
document.addEventListener('DOMContentLoaded', function() {
  const a = document.getElementById('json-a');
  const b = document.getElementById('json-b');
  if (a && !a.value) {
    a.value = '{\n  „name“: „Jan“,\n  „age“: 30,\n  „city“: „Praha“\n}';
  }
  if (b && !b.value) {
    b.value = '{\n  „name“: „Jan“,\n  „age“: 31,\n  „country“: „CZ“\n}';
  }
});
</script>

</div>



<h2 id=„syntaxe“>Syntaxe JSON</h2>

<p>JSON podporuje následující datové typy:</p>

<ul>
  <li><b>Objekt</b> – <code>{}</code> kolekce párů klíč-hodnota</li>
  <li><b>Pole</b> – <code>[]</code> uspořádaný seznam hodnot</li>
  <li><b>Řetězec</b> – text v dvojitých uvozovkách <code>"text"</code></li>
  <li><b>Číslo</b> – integer nebo float <code>42</code>, <code>3.14</code></li>
  <li><b>Boolean</b> – <code>true</code> nebo <code>false</code></li>
  <li><b>Null</b> – <code>null</code></li>
</ul>


<h3 id=„objekt“>Objekt</h3>

<p>Objekt je ve složených závorkách a jednotlivé dvojice „klíč : hodnota„ se oddělují čárkou:</p>

<pre><code>{
  "jmeno": "Jan Novák",
  "vek": 30,
  "email": "jan@example.com"
}</code></pre>


<h3 id=“zanorovani„>Zanořování dat</h3>

<p>Do klíče jde kromě hodnoty přiřadit další objekt:</p>

<pre><code>{
  "uzivatel": {
    "jmeno": "Jan",
    "adresa": {
      "mesto": "Praha",
      "psc": "11000"
    }
  }
}</code></pre>


<h3 id=“pole„>Pole</h3>

<p>Přísluší-li k jednomu klíči více položek, používají se hranaté závorky <code>[]</code>:</p>

<pre><code>{
  "uzivatele": [
    { "jmeno": "Jan", "vek": 30 },
    { "jmeno": "Eva", "vek": 25 }
  ]
}</code></pre>

<p>Data z pole se dostanou pomocí číselného indexu (od nuly):</p>

<pre><code>data.uzivatele[0].jmeno // "Jan"</code></pre>



<h2 id=“js„>JSON v JavaScriptu</h2>

<p>JavaScript má dva základní nástroje pro práci s JSON:</p>

<h3 id=“parse„>JSON.parse()</h3>

<p>Převede textový řetězec na JavaScript objekt:</p>

<pre><code>const text = '{"jmeno": "Jan", "vek": 30}';
const obj = JSON.parse(text);
console.log(obj.jmeno); // "Jan"</code></pre>


<h3 id=“stringify„>JSON.stringify()</h3>

<p>Převede JavaScript objekt na textový řetězec:</p>

<pre><code>const obj = { jmeno: "Jan", vek: 30 };
const text = JSON.stringify(obj);
// '{"jmeno":"Jan","vek":30}'

// S formátováním (2 mezery odsazení)
const pretty = JSON.stringify(obj, null, 2);</code></pre>


<h3 id=“fetch„>Načtení JSON z API</h3>

<p>Moderní způsob načtení JSON dat ze serveru pomocí <code>fetch</code>:</p>

<pre><code>// Async/await
const response = await fetch('/api/data.json');
const data = await response.json();

// Promises
fetch('/api/data.json')
  .then(response => response.json())
  .then(data => console.log(data));</code></pre>



<h2 id=“ts„>JSON v TypeScriptu</h2>

<p>TypeScript umožňuje definovat typy pro JSON data:</p>

<pre><code>interface User {
  jmeno: string;
  vek: number;
  email?: string; // volitelná položka
}

const data: User = JSON.parse(jsonText);

// Typově bezpečná funkce
function parseUser(json: string): User {
  return JSON.parse(json) as User;
}</code></pre>

<p>Pro runtime validaci se hodí knihovny jako <a href=“https://zod.dev„>Zod</a> nebo <a href=“https://github.com/colinhacks/zod„>Valibot</a>.</p>



<h2 id=“php„>JSON v PHP</h2>

<p>PHP má pro práci s JSON dvě hlavní funkce:</p>

<pre><code>&lt;?php
// Dekódování JSON → PHP
$json = '{"jmeno": "Jan", "vek": 30}';
$obj = json_decode($json);        // objekt
$arr = json_decode($json, true);  // asociativní pole

echo $obj->jmeno;  // "Jan"
echo $arr['jmeno']; // "Jan"

// Enkódování PHP → JSON
$data = ['jmeno' => 'Jan', 'vek' => 30];
$json = json_encode($data);
$pretty = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);</code></pre>

<p>Flag <code>JSON_UNESCAPED_UNICODE</code> zajistí správné zobrazení českých znaků.</p>



<h2 id=“python„>JSON v Pythonu</h2>

<pre><code>import json

# Parsování
data = json.loads('{"jmeno": "Jan", "vek": 30}')
print(data["jmeno"])  # Jan

# Ze souboru
with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Serialisace
text = json.dumps(data, ensure_ascii=False, indent=2)</code></pre>



<h2 id=“json-js„>JSON vs. JavaScript objekt</h2>

<p>Objekt v JavaScriptu vypadá podobně jako JSON, ale existují <b>rozdíly</b>:</p>

<table class=“wikitable„>
  <tr>
    <th>Vlastnost</th>
    <th>JSON</th>
    <th>JS objekt</th>
  </tr>
  <tr>
    <td>Klíče</td>
    <td>Musí být v <code>"dvojitých uvozovkách"</code></td>
    <td>Mohou být bez uvozovek</td>
  </tr>
  <tr>
    <td>Řetězce</td>
    <td>Pouze <code>"dvojité uvozovky"</code></td>
    <td>Jednoduché i dvojité</td>
  </tr>
  <tr>
    <td>Trailing comma</td>
    <td>Zakázána</td>
    <td>Povolena</td>
  </tr>
  <tr>
    <td>Komentáře</td>
    <td>Nepodporuje</td>
    <td>Podporuje</td>
  </tr>
  <tr>
    <td>Funkce</td>
    <td>Nepodporuje</td>
    <td>Podporuje</td>
  </tr>
</table>



<h2 id=“jsonc„>JSON s komentáři (JSONC)</h2>

<p>Standardní JSON nepodporuje komentáře. Pro konfigurační soubory existuje <b>JSONC</b> (JSON with Comments), který používá např. VS Code pro <code>settings.json</code>:</p>

<pre><code>{
  // Toto je komentář
  "editor.fontSize": 14,
  /* Víceřádkový
     komentář */
  "editor.tabSize": 2
}</code></pre>

<p>JSONC není standardní JSON a vyžaduje speciální parser.</p>



<h2 id=“json5„>JSON5</h2>

<p><a href=“https://json5.org„>JSON5</a> je rozšíření JSONu, které přidává:</p>

<ul>
  <li>Komentáře (<code>//</code> a <code>/* */</code>)</li>
  <li>Trailing commas</li>
  <li>Klíče bez uvozovek</li>
  <li>Jednoduché uvozovky pro řetězce</li>
  <li>Víceřádkové řetězce</li>
</ul>

<pre><code>{
  // Konfigurace
  name: 'Projekt',
  version: 1,
  features: [
    'feature1',
    'feature2', // trailing comma OK
  ],
}</code></pre>



<h2 id=“pouziti„>Kde se JSON používá</h2>

<ul>
  <li><b>REST API</b> – standardní formát pro komunikaci frontend-backend</li>
  <li><b>Konfigurační soubory</b> – <code>package.json</code>, <code>tsconfig.json</code>, VS Code settings</li>
  <li><b>NoSQL databáze</b> – MongoDB, CouchDB, Firebase</li>
  <li><b>Web Storage</b> – localStorage, sessionStorage (s JSON.stringify)</li>
  <li><b>JWT tokeny</b> – payload je JSON zakódovaný v Base64</li>
</ul>



<h2 id=“jsonp„>JSONP (zastaralé)</h2>

<p>JSONP je „JSON s vycpávkou“ (písmeno P značí <i>padding</i>). Používal se v situacích, kdy bylo potřeba získat JavaScriptem data z cizí domény, protože AJAX byl omezen na stejnou doménu.</p>

<p><b>Dnes je JSONP nahrazen technologií <a href=„/cors“>CORS</a></b>, která umožňuje bezpečnější cross-origin požadavky.</p>

<p>JSONP fungoval tak, že server vracel data obalená do volání JS funkce:</p>

<pre><code>// Server vrací:
callback({"jmeno": "Jan", "vek": 30});

// Klient definuje funkci:
function callback(data) {
  console.log(data.jmeno);
}</code></pre>

<p>Nevýhoda JSONP byla bezpečnostní – připojoval se cizí skript, který mohl manipulovat se stránkou.</p>



<h2 id=„tipy“>Tipy pro práci s JSON</h2>

<ul>
  <li>Používejte <b>konsistentní pojmenování</b> klíčů (camelCase nebo snake_case)</li>
  <li>Pro velká data zvažte <b>streaming parsery</b> (např. JSONStream pro Node.js)</li>
  <li>Validujte vstupní JSON pomocí <b>JSON Schema</b></li>
  <li>Pro binární data použijte <b>Base64</b> encoding</li>
  <li>Při API komunikaci nastavte <code>Content-Type: application/json</code></li>
</ul>



<h2 id=„nastroje“>Online nástroje</h2>

<div class=„external-content“>
  <ul>
    <li><a href=„https://jsonlint.com/“>JSONLint</a> – validátor a formátovač JSONu</li>
    <li><a href=„https://jsonformatter.org/“>JSON Formatter</a> – formátování a konverse</li>
    <li><a href=„https://json-schema.org/“>JSON Schema</a> – specifikace pro validaci struktury</li>
    <li><a href=„https://transform.tools/json-to-typescript“>JSON to TypeScript</a> – generování TS typů z JSON</li>
  </ul>
</div>
