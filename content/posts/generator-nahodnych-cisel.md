---
title: "Generátor náhodných čísel"
headline: "Generátor náhodných čísel online"
description: "Online generátor náhodných čísel. Vygenerujte náhodné číslo v libovolném rozsahu, losujte čísla bez opakování nebo generujte více čísel najednou."
date: "2025-01-27"
status: 1
tags: ["hotova-reseni", "produktivita", "js"]
format: "html"
---

<p>Potřebujete <b>náhodné číslo</b> pro losování, hru, nebo rozhodování? Tento generátor vytvoří náhodná čísla v libovolném rozsahu přímo v prohlížeči. Data se nikam neodesílají.</p>

<div class="live no-source">
<div id="gen-app">

<h2 id="generator">Generátor</h2>

<p>
  <label>Od: <input type="number" id="gen-min" value="1" style="width:100px"></label>
  <label>Do: <input type="number" id="gen-max" value="100" style="width:100px"></label>
</p>
<p>
  <label>Počet čísel: <input type="number" id="gen-count" value="1" min="1" max="1000" style="width:80px"></label>
</p>
<p>
  <label><input type="checkbox" id="gen-unique"> Bez opakování</label>
</p>
<p>
  <button onclick="generuj()">Generovat</button>
  <button onclick="document.getElementById('gen-result').textContent = ''">Vymazat</button>
</p>

<p id="gen-result" style="font-size: 2em; font-weight: bold; min-height: 1.2em; word-break: break-word;"></p>

</div>
</div>

<script>
function generuj() {
  var min = parseInt(document.getElementById('gen-min').value, 10);
  var max = parseInt(document.getElementById('gen-max').value, 10);
  var count = parseInt(document.getElementById('gen-count').value, 10);
  var unique = document.getElementById('gen-unique').checked;
  var result = document.getElementById('gen-result');

  if (isNaN(min) || isNaN(max) || isNaN(count)) {
    result.textContent = 'Zadejte platná čísla.';
    return;
  }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  if (count < 1) count = 1;
  if (unique && count > (max - min + 1)) {
    result.textContent = 'Rozsah je příliš malý pro ' + count + ' unikátních čísel.';
    return;
  }

  var nums = [];
  if (unique) {
    var pool = [];
    for (var i = min; i <= max; i++) pool.push(i);
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
    nums = pool.slice(0, count);
  } else {
    for (var i = 0; i < count; i++) {
      nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
  }
  result.textContent = nums.join(', ');
}
</script>


<h2 id="jak-funguje">Jak generátor funguje</h2>

<p>Generátor používá funkci <code>Math.random()</code> v JavaScriptu, která vrací pseudonáhodné číslo v rozsahu 0–1. Pro zadaný rozsah se výsledek přepočítá vzorcem:</p>

<pre><code>Math.floor(Math.random() * (max - min + 1)) + min</code></pre>

<p>Při zapnuté volbě <b>bez opakování</b> se použije <a href="https://cs.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle">Fisher–Yates shuffle</a> – pole všech možných hodnot se zamíchá a vrátí se požadovaný počet prvních prvků.</p>


<h2 id="pouziti">K čemu se hodí</h2>

<ul>
  <li><b>Losování</b> – výběr vítěze soutěže, losování pořadí</li>
  <li><b>Hry</b> – hod kostkou, náhrada za fyzickou kostku</li>
  <li><b>Rozhodování</b> – náhodný výběr z možností</li>
  <li><b>Testování</b> – generování testovacích dat</li>
  <li><b>Statistika</b> – náhodné vzorkování</li>
</ul>


<h2 id="js">Generování v JavaScriptu</h2>

<p>Pro generování náhodného celého čísla v rozsahu <code>min</code> až <code>max</code> (včetně) stačí v JS:</p>

<pre><code>function nahodneCislo(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Příklad: číslo od 1 do 100
nahodneCislo(1, 100);</code></pre>

<p>Pro kryptograficky bezpečná náhodná čísla je lepší použít <code>crypto.getRandomValues()</code>:</p>

<pre><code>function bezpecneNahodne(min, max) {
  var range = max - min + 1;
  var arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return min + (arr[0] % range);
}</code></pre>


<h2 id="php">Generování v PHP</h2>

<pre><code>// Náhodné číslo od 1 do 100
echo random_int(1, 100);</code></pre>

<p>Funkce <code>random_int()</code> (PHP 7+) generuje kryptograficky bezpečná náhodná čísla. Starší <code>rand()</code> a <code>mt_rand()</code> nejsou pro bezpečnostní účely vhodné.</p>
