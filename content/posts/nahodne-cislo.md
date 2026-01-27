---
title: "Generátor náhodných čísel"
headline: "Generátor náhodných čísel online"
description: "Online generátor náhodných čísel z libovolného rozsahu. Náhodné číslo jedním kliknutím + kód pro JavaScript, PHP, Python a další jazyky."
date: "2015-02-15"
last_modification: "2026-01-27"
status: 1
tags: ["hotova-reseni", "js", "php"]
format: "html"
---

<div class="live">
<style>
  .gen-main { text-align: center; }
  .gen-main output {
    display: block;
    font-size: 300%;
    font-weight: bold;
    padding: .3em 0;
    min-height: 1.5em;
    letter-spacing: .05em;
  }
  .gen-main label { font-weight: bold; }
  .gen-main input[type=number] { width: 5em; font-size: 110%; text-align: center; }
  .gen-main button {
    font-size: 130%;
    padding: .5em 1.5em;
    cursor: pointer;
  }
  .gen-extras { display: flex; flex-wrap: wrap; gap: .5em; justify-content: center; margin-top: 1em; }
  .gen-extras button {
    padding: .5em 1em;
    font-size: 110%;
    cursor: pointer;
  }
</style>
<div class="gen-main">
  <p>
    <label>Od: <input type="number" id="gen-od" value="1"></label>
    <label>Do: <input type="number" id="gen-do" value="10"></label>
  </p>
  <output id="gen-vysledek">&nbsp;</output>
  <p><button onclick="genNahodne()">Generovat</button></p>
  <div class="gen-extras">
    <button onclick="genRozsah(1,6)">Kostka 1–6</button>
    <button onclick="genRozsah(1,100)">1–100</button>
    <button onclick="genRozsah(0,1)">0 nebo 1</button>
    <button onclick="document.getElementById('gen-vysledek').textContent = Math.random() < 0.5 ? 'Ano' : 'Ne'">Ano / Ne</button>
  </div>
</div>
<script>
function genNahodne() {
  var od = Number(document.getElementById('gen-od').value);
  var doo = Number(document.getElementById('gen-do').value);
  if (od > doo) { var t = od; od = doo; doo = t; }
  var vysledek = Math.floor(Math.random() * (doo - od + 1)) + od;
  document.getElementById('gen-vysledek').textContent = vysledek;
}
function genRozsah(od, doo) {
  document.getElementById('gen-od').value = od;
  document.getElementById('gen-do').value = doo;
  genNahodne();
}
genNahodne();
</script>
</div>

<h2 id="vice-cisel">Generátor více náhodných čísel</h2>

<p>Potřebujete vygenerovat více čísel najednou? Zadejte rozsah a počet.</p>

<div class="live">
<style>
  .gen-multi output {
    display: block;
    font-size: 150%;
    font-weight: bold;
    padding: .3em 0;
    min-height: 1.5em;
    word-spacing: .3em;
  }
</style>
<div class="gen-multi">
  <p>
    <label>Od: <input type="number" id="multi-od" value="1" style="width:5em"></label>
    <label>Do: <input type="number" id="multi-do" value="100" style="width:5em"></label>
    <label>Počet: <input type="number" id="multi-pocet" value="5" min="1" max="100" style="width:4em"></label>
  </p>
  <p><button onclick="genMulti()">Generovat</button>
  <label><input type="checkbox" id="multi-unikatni"> Bez opakování</label></p>
  <output id="multi-vysledek">&nbsp;</output>
</div>
<script>
function genMulti() {
  var od = Number(document.getElementById('multi-od').value);
  var doo = Number(document.getElementById('multi-do').value);
  var pocet = Number(document.getElementById('multi-pocet').value);
  var unikatni = document.getElementById('multi-unikatni').checked;
  if (od > doo) { var t = od; od = doo; doo = t; }
  var rozsah = doo - od + 1;
  if (pocet > 100) pocet = 100;
  if (unikatni && pocet > rozsah) pocet = rozsah;
  var cisla = [];
  if (unikatni) {
    var pool = [];
    for (var i = od; i <= doo; i++) pool.push(i);
    for (var j = pool.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = pool[j]; pool[j] = pool[k]; pool[k] = tmp;
    }
    cisla = pool.slice(0, pocet);
  } else {
    for (var i = 0; i < pocet; i++) {
      cisla.push(Math.floor(Math.random() * rozsah) + od);
    }
  }
  document.getElementById('multi-vysledek').textContent = cisla.join(', ');
}
</script>
</div>


<h2 id="kolo-stesti">Kolo štěstí</h2>

<p>Zadejte položky (každou na nový řádek) a roztočte kolo.</p>

<div class="live">
<style>
  .wheel-wrap { text-align: center; }
  .wheel-wrap canvas { display: block; margin: 0 auto; cursor: pointer; }
  .wheel-wrap textarea { width: 100%; min-height: 5em; font-size: 100%; }
  .wheel-wrap button { font-size: 120%; padding: .5em 1.5em; cursor: pointer; }
  .wheel-wrap textarea { resize: none; overflow: hidden; }
</style>
<div class="wheel-wrap">
  <textarea id="wheel-items" oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px';drawWheel(getWheelItems(),wheelAngle)">Pizza
Sushi
Burger
Salát
Kebab
Pasta</textarea>
  <p><button onclick="spinWheel()">Roztočit kolo</button></p>
  <canvas id="wheel-canvas" width="300" height="300"></canvas>
</div>
<script>
var wheelAngle = 0;
var wheelSpinning = false;
var wheelColors = ['#2563eb','#059669','#dc2626','#d97706','#7c3aed','#db2777','#0891b2','#4f46e5'];

function getWheelItems() {
  return document.getElementById('wheel-items').value.split('\n').map(function(s){return s.trim()}).filter(function(s){return s.length > 0});
}

function drawWheel(items, angle) {
  var canvas = document.getElementById('wheel-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var cx = 150, cy = 150, r = 140;
  ctx.clearRect(0, 0, 300, 300);
  if (items.length === 0) return;
  var step = 2 * Math.PI / items.length;
  for (var i = 0; i < items.length; i++) {
    var start = angle + i * step;
    var end = start + step;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = wheelColors[i % wheelColors.length];
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + step / 2);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold ' + Math.min(16, Math.floor(120 / items.length + 8)) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var label = items[i].length > 12 ? items[i].substring(0, 11) + '…' : items[i];
    ctx.fillText(label, r * 0.55, 0);
    ctx.restore();
  }
  // Ukazatel (šipka nahoře)
  ctx.beginPath();
  ctx.moveTo(cx - 10, 5);
  ctx.lineTo(cx + 10, 5);
  ctx.lineTo(cx, 22);
  ctx.closePath();
  ctx.fillStyle = '#1e293b';
  ctx.fill();
}

function spinWheel() {
  if (wheelSpinning) return;
  var items = getWheelItems();
  if (items.length < 2) return;
  wheelSpinning = true;
  var totalRotation = Math.random() * 2 * Math.PI + 4 * 2 * Math.PI;
  var startAngle = wheelAngle;
  var duration = 3000;
  var startTime = performance.now();
  function animate(now) {
    var elapsed = now - startTime;
    var t = Math.min(elapsed / duration, 1);
    var ease = 1 - Math.pow(1 - t, 3);
    wheelAngle = startAngle + totalRotation * ease;
    drawWheel(items, wheelAngle);
    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      wheelSpinning = false;
    }
  }
  requestAnimationFrame(animate);
}

drawWheel(getWheelItems(), wheelAngle);
var wheelTextarea = document.getElementById('wheel-items');
wheelTextarea.style.height = 'auto';
wheelTextarea.style.height = wheelTextarea.scrollHeight + 'px';
</script>
</div>


<h2 id="generator">Generátor kódu pro náhodná čísla</h2>

<p>Následující generátor po zadání nejnižšího a nejvyššího čísla připraví kód pro vygenerování náhodného čísla z daného rozsahu v různých jazycích.</p>

<div class="live">
<style>
  .kod-gen-block { font-family: monospace; background: #1e293b; color: #e2e8f0; padding: .75em 1em; border-radius: .375em; overflow-x: auto; white-space: pre; margin: .25em 0 1em; }
</style>
<p>
  <label>Od: <input type="number" id="kod-od" value="1" oninput="kodUpdate()"> (včetně)</label>
  <label>Do: <input type="number" id="kod-do" value="10" oninput="kodUpdate()"> (včetně)</label>
  Počet možných čísel: <output id="kolik-count">10</output>
</p>

<p><b>JavaScript</b>:</p>
<div class="kod-gen-block" id="kod-js">const nahodne = Math.floor(Math.random() * 10) + 1;</div>

<p><b>PHP</b>:</p>
<div class="kod-gen-block" id="kod-php">random_int(1, 10);</div>

<p><b>Python</b>:</p>
<div class="kod-gen-block" id="kod-py">import random
random.randint(1, 10)</div>

<p><b>Java</b>:</p>
<div class="kod-gen-block" id="kod-java">import java.util.concurrent.ThreadLocalRandom;
int n = ThreadLocalRandom.current().nextInt(1, 11);</div>

<p><b>C#</b>:</p>
<div class="kod-gen-block" id="kod-cs">var n = Random.Shared.Next(1, 11);</div>

<p><b>Ruby</b>:</p>
<div class="kod-gen-block" id="kod-rb">rand(1.. 10)</div>

<p><b>Rust</b>:</p>
<div class="kod-gen-block" id="kod-rs">use rand::Rng;
let n = rand::thread_rng().gen_range(1..=10);</div>

<p><b>Go</b>:</p>
<div class="kod-gen-block" id="kod-go">import (
  "crypto/rand"
  "math/big"
)
nBig, _ := rand.Int(rand.Reader, big.NewInt(10))
n := int(nBig.Int64()) + 1</div>

<script>
function kodUpdate() {
  var od = document.getElementById("kod-od").value;
  var doo = document.getElementById("kod-do").value;
  var count = Number(doo) - Number(od) + 1;
  var doPlus1 = String(Number(doo) + 1);
  document.getElementById("kolik-count").textContent = String(count);
  document.getElementById("kod-js").textContent = "const nahodne = Math.floor(Math.random() * " + count + ") + " + od + ";";
  document.getElementById("kod-php").textContent = "random_int(" + od + ", " + doo + ");";
  document.getElementById("kod-py").textContent = "import random\nrandom.randint(" + od + ", " + doo + ")";
  document.getElementById("kod-java").textContent = "import java.util.concurrent.ThreadLocalRandom;\nint n = ThreadLocalRandom.current().nextInt(" + od + ", " + doPlus1 + ");";
  document.getElementById("kod-cs").textContent = "var n = Random.Shared.Next(" + od + ", " + doPlus1 + ");";
  document.getElementById("kod-rb").textContent = "rand(" + od + ".. " + doo + ")";
  document.getElementById("kod-rs").textContent = "use rand::Rng;\nlet n = rand::thread_rng().gen_range(" + od + "..=" + doo + ");";
  document.getElementById("kod-go").textContent = "import (\n  \"crypto/rand\"\n  \"math/big\"\n)\nnBig, _ := rand.Int(rand.Reader, big.NewInt(" + count + "))\nn := int(nBig.Int64()) + " + od;
}
</script>
</div>


<h2 id="js">Náhodné číslo v JavaScriptu</h2>

<p>V JS se pro generování náhodného čísla používá <code>Math.random()</code>.</p>

<pre><code>const nahodne = Math.random();</code></pre>

<p>V proměnné <code>nahodne</code> bude něco mezi 0 a 1, například <code>0.6577748781199532</code>. Vyjít může i přesná nula, ale vždy bude číslo menší než 1.</p>

<p>Protože je zpravidla nutné mít čísla celá, násobí se to celé počtem požadovaných čísel. Tj. pro vygenerování deseti čísel:</p>

<pre><code>nahodne = nahodne * 10;</code></pre>

<p>Obsah <code>nahodne</code> teď bude něco jako <code>6.577748781199532</code>. Pro dosažení celých čísel se potom provede <b>zaokrouhlení</b>.</p>

<pre><code>nahodne = Math.floor(nahodne);</code></pre>

<p>A výsledkem je <code>6</code>. Metoda <code>Math.floor</code> zaokrouhluje dolů, takže výsledek bude nabývat hodnot 0 až 9. Použití jiného způsobu zaokrouhlení (<code>Math.round</code>/<code>Math.ceil</code>) by vedlo k nerovnoměrnému rozdělení jednotlivých čísel.</p>

<p>Následný obrázek srovnává četnosti jednotlivých čísel při různých způsobech zaokrouhlení.</p>

<p><img src="/files/nahodne-cislo/cetnost.png" alt="Četnosti čísel" class="border"></p>

<p><a href="https://kod.djpw.cz/etkb">Skript pro výpočet četnosti</a></p>

<p>Je-li cílem dostat místo 0–9 číslo z rozsahu 1 až 10, stačí přičíst jedničku.</p>

<pre><code>nahodne = nahodne + 1;</code></pre>

<p>Potřebujete-li bezpečnou náhodnost (např. pro identifikátory nebo tokeny), použijte <code>crypto.getRandomValues</code>.</p>

<pre><code>function secureRandomInt(min, max) {
  const range = max - min + 1;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return min + (buf[0] % range);
}</code></pre>


<h3 id="jakou-nahodnost-zvolit">Jakou náhodnost zvolit v JavaScriptu</h3>

<p>Pro běžné UI a logiku použijte <code>Math.random()</code>.</p>

<pre><code>const n = Math.floor(Math.random() * 10) + 1;</code></pre>

<p>Pro bezpečnost, tokeny a identifikátory použijte Web Crypto.</p>

<pre><code>crypto.randomUUID();</code></pre>

<pre><code>const bytes = new Uint8Array(32);
crypto.getRandomValues(bytes);</code></pre>

<p>Pro reprodukovatelné výsledky použijte seedovatelný PRNG.</p>

<h3 id="typescript">TypeScript funkce</h3>

<p>Užitečné typované funkce pro běžnou práci s náhodností v TypeScriptu.</p>

<p><b>Celé číslo v rozsahu</b>:</p>
<pre><code>export function randomInt(min: number, max: number): number {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * (b - a + 1)) + a;
}</code></pre>

<p><b>Náhodná položka z pole</b>:</p>
<pre><code>export function randomItem<T>(items: readonly T[]): T {
  if (items.length === 0) throw new Error('items must not be empty');
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}</code></pre>

<p><b>Bezpečné celé číslo</b> pomocí Web Crypto:</p>
<pre><code>export function secureRandomInt(min: number, max: number): number {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  const range = b - a + 1;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return a + (buf[0] % range);
}</code></pre>


<h2 id="php">Náhodné číslo PHP</h2>

<p>V PHP je pro náhodné celé číslo z daného rozsahu doporučené použít <code>random_int</code> (od PHP 7). Funkci se zadává rozsah čísel, ze kterých se má výsledek vygenerovat.</p>

<p>Obě čísla parametrů znamenají <b>včetně</b>, takže následující kód vygeneruje čísla 1–10.</p>

<pre><code>random_int(1, 10);</code></pre>

<p>Pro kryptograficky bezpečná data (např. tokeny) použijte <code>random_bytes</code> a případně je převeďte do čitelného formátu.</p>



<h2 id="ostatni-jazyky">Náhodné číslo v dalších jazycích</h2>

<p>Nejčastější způsob, jak získat náhodné celé číslo v rozsahu <code>min..max</code> v populárních jazycích.</p>

<p><b>Python</b>:</p>
<pre><code>import random
random.randint(1, 10)  # včetně obou krajů</code></pre>

<p><b>Go</b>:</p>
<pre><code>import (
  "crypto/rand"
  "math/big"
)

// 1..10 včetně
nBig, _ := rand.Int(rand.Reader, big.NewInt(10))
n := int(nBig.Int64()) + 1</code></pre>

<p><b>Ruby</b>:</p>
<pre><code>rand(1..10) # včetně 1 i 10</code></pre>

<p><b>Rust</b>:</p>
<pre><code>use rand::Rng;
let n = rand::thread_rng().gen_range(1..=10);</code></pre>

<p><b>Java</b> (Java 17+):</p>
<pre><code>import java.util.concurrent.ThreadLocalRandom;
int n = ThreadLocalRandom.current().nextInt(1, 11); // 1..10</code></pre>

<p><b>C#</b> (.NET 6+):</p>
<pre><code>var n = Random.Shared.Next(1, 11); // 1..10</code></pre>


<h2 id="stejne">Stále stejné náhodné číslo</h2>

<p>Zvlášť při malém počtu čísel a malém počtu opakování se může stát, že bude nějaké číslo padat podezřele často.</p>

<figure>
  <img src="/files/nahodne-cislo/cetnost-10.png" alt="Graf četnosti malého počtu generování" class="border">
  <figcaption>Četnost náhodných čísel z rozsahu 0–9 při pouhých deseti opakováních</figcaption>
</figure>

<p>Pokud prvek náhody nemusí být matematicky <b>přesný</b>, ale jde hlavně o dojem uživatele, dá se tomu trochu pomoci. Například zabránit vygenerování téhož čísla dvakrát po sobě.</p>

<p><a href="https://kod.djpw.cz/otkb">Ukázka</a> – nikdy se nevygeneruje stejné číslo dvakrát za sebou</p>

<p>Pokud je navíc cílem <b>zobrazit všechny náhodné</b> položky, hodí se ještě požadovat, aby se nějaké číslo mohlo vygenerovat podruhé až v okamžiku, kdy každé číslo z rozsahu už alespoň jednou padlo.</p>

<p><a href="https://kod.djpw.cz/stkb">Živá ukázka</a></p>

<p>V případě <b>PHP</b> je nutné vygenerovaná náhodná čísla někam ukládat – například do pole <code>$_SESSION</code>.</p>


<h2 id="vyuziti">Využití</h2>

<p>Na základě vygenerování náhodného čísla se dá potom i <a href="/random">vypisovat náhodný obsah</a>. Náhodnost je také klíčová pro <a href="/bezpecne-heslo">generování bezpečných hesel</a>.</p>
