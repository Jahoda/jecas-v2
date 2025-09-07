---
title: "Generátor náhodných čísel"
headline: "Generátor náhodného čísla"
description: "Jak vygenerovat náhodné číslo z určitého rozsahu (v JavaScriptu, PHP atd.)"
date: "2015-02-15"
last_modification: "2025-09-07"
status: 1
tags: ["hotova-reseni", "js", "php"]
format: "html"
---

<div class="live">
  <style>
    .nahodne button {
      min-width: 4em;
      padding: .5em;
      font-size: 150%;
      margin: auto;
      display: block;
    }
  </style>
  <p class="nahodne">
    <button onclick="
    this.textContent = Math.floor(Math.random() * 10) + 1
    ">
      Náhodné číslo 1 až 10
    </button>  
  </p>
  <p class="nahodne">
    <button onclick="
    this.textContent = Math.random() < 0.5 ? 'Ano' : 'Ne'
    ">
      Ano, nebo ne?
    </button>  
  </p>
</div>

<h2 id="generator">Generátor kódu pro náhodná čísla</h2>

<p>Následující generátor po zadání nejnižšího a nejvyššího čísla připraví JS/PHP kód, který slouží k vygenerování náhodného čísla z daného rozsahu.</p>

<div class="live">
<style>
  #priklad {
    margin-left: 1em;
  }
</style>
<form oninput="prepocitat(this)" onsubmit="prepocitat(this); return false">
  <p><label>Od: <input type="number" name="od" value="1"></label> (včetně)</p>
  <p><label>Do: <input type="number" name="do" value="10"></label> (včetně)</p>
  <p><label>Počet možných čísel: <output id="kolik-count">10</output></label></p>
  <button>Vygenerovat</button><span id="priklad"></span>  
  
  <p><b>JavaScript</b>:</p>
  <pre><code>const nahodne = Math.floor(Math.random() * <span id="kolik">10</span>) + <span id="od">1</span>;</code></pre>
  
  <p><b>PHP</b>:</p>
  <pre><code>random_int(<span id="od-php">1</span>, <span id="do-php">10</span>);</code></pre>  
  
  <p><b>Python</b>:</p>
  <pre><code>import random
random.randint(<span id="od-py">1</span>, <span id="do-py">10</span>)</code></pre>

  <p><b>Java</b>:</p>
  <pre><code>import java.util.concurrent.ThreadLocalRandom;
int n = ThreadLocalRandom.current().nextInt(<span id="od-java">1</span>, <span id="do-plus1-java">11</span>);</code></pre>

  <p><b>C#</b>:</p>
  <pre><code>var n = Random.Shared.Next(<span id="od-cs">1</span>, <span id="do-plus1-cs">11</span>);</code></pre>

  <p><b>Ruby</b>:</p>
  <pre><code>rand(<span id="od-rb">1</span>.. <span id="do-rb">10</span>)</code></pre>

  <p><b>Rust</b>:</p>
  <pre><code>use rand::Rng;
let n = rand::thread_rng().gen_range(<span id="od-rs">1</span>..=<span id="do-rs">10</span>);</code></pre>

  <p><b>Go</b>:</p>
  <pre><code>import (
  "crypto/rand"
  "math/big"
)
nBig, _ := rand.Int(rand.Reader, big.NewInt(<span id="kolik-go">10</span>))
n := int(nBig.Int64()) + <span id="od-go">1</span></code></pre>
</form>
<script>
  (function(){ 
  const priklad = document.getElementById("priklad");
  const kolik = document.getElementById("kolik");
  const kolikCount = document.getElementById("kolik-count");
  const od = document.getElementById("od");
  const odPhp = document.getElementById("od-php");
  const doPhp = document.getElementById("do-php");
  const odPy = document.getElementById("od-py");
  const doPy = document.getElementById("do-py");
  const odJava = document.getElementById("od-java");
  const doPlus1Java = document.getElementById("do-plus1-java");
  const odCs = document.getElementById("od-cs");
  const doPlus1Cs = document.getElementById("do-plus1-cs");
  const odRb = document.getElementById("od-rb");
  const doRb = document.getElementById("do-rb");
  const odRs = document.getElementById("od-rs");
  const doRs = document.getElementById("do-rs");
  const kolikGo = document.getElementById("kolik-go");
  const odGo = document.getElementById("od-go");
  function prepocitat(form) {
    const count = Number(form.do.value) - Number(form.od.value) + 1;
    kolik.textContent = String(count);
    kolikCount.textContent = String(count);
    od.textContent = form.od.value;
    odPhp.textContent = form.od.value;
    doPhp.textContent = form.do.value;
    // Python
    odPy.textContent = form.od.value;
    doPy.textContent = form.do.value;
    // Java/C# upper bound is exclusive
    odJava.textContent = form.od.value;
    doPlus1Java.textContent = String(Number(form.do.value) + 1);
    odCs.textContent = form.od.value;
    doPlus1Cs.textContent = String(Number(form.do.value) + 1);
    // Ruby inclusive range
    odRb.textContent = form.od.value;
    doRb.textContent = form.do.value;
    // Rust inclusive range
    odRs.textContent = form.od.value;
    doRs.textContent = form.do.value;
    // Go uses count and min
    kolikGo.textContent = String(count);
    odGo.textContent = form.od.value;
    priklad.textContent = Math.floor(Math.random() * count) + Number(form.od.value);
  }
  window.prepocitat = prepocitat;
  })()
</script>
</div>




<h2 id="js">Náhodné číslo v JavaScriptu</h2>

<p>V JS se pro generování náhodného čísla používá <code>Math.random()</code>.</p>

<pre><code>const nahodne = Math.random();</code></pre>



<p>V proměnné <code>nahodne</code> bude něco mezi 0 a 1, například <code>0.6577748781199532</code>. Vyjít může i přesná nula, ale vždy bude číslo menší než 1.</p>

<p>Protože je zpravidla nutné mít čísla celá, násobí se to celé počtem požadovaných čísel. Tj. pro vygenerování deseti čísel:</p>

<pre><code>nahodne = nahodne * 10;</code></pre>




<p>Obsah <code>nahodne</code> teď bude něco jako <code>6.577748781199532</code>. Pro dosažení celých čísel se potom provede <b>zaokrouhlení</b>.</p>

<pre><code>nahodne = Math.floor(nahodne);</code></pre>


<p>A výsledkem je <code>6</code>. Metoda <code>Math.floor</code> zaokrouhluje dolů, takže výsledek bude nabývat hodnot 0 až 9. Použití jiného způsobu zaokrouhlení (<code>Math.round</code>/<code>Math.ceil</code>) by vedlo k nerovnoměrnému rozdělení jednotlivých čísel.</p>

<p>Následný obrázek srovnává četnosti jednotlivých čísel při různých způsobech zaokrouhlení.</p>

<p><img src="/files/nahodne-cislo/cetnost.png" alt="Četnosti čísel" class="border"></p>





<p><a href="https://kod.djpw.cz/etkb">Skript pro výpočet četnosti</a></p>

<p>Je-li cílem dostat místo 0–9 číslo z rozsahu 1 až 10, stačí přičíst jedničku.</p>

<pre><code>nahodne = nahodne + 1;</code></pre>

<p>Potřebujete-li bezpečnou náhodnost (např. pro identifikátory nebo tokeny), použijte <code>crypto.getRandomValues</code>.</p>

<pre><code>function secureRandomInt(min, max) {
  const range = max - min + 1;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return min + (buf[0] % range);
}</code></pre>


<h3 id="jakou-nahodnost-zvolit">Jakou náhodnost zvolit v JavaScriptu</h3>

<p>Pro běžné UI a logiku použijte <code>Math.random()</code>.</p>

<pre><code>const n = Math.floor(Math.random() * 10) + 1;</code></pre>

<p>Pro bezpečnost, tokeny a identifikátory použijte Web Crypto.</p>

<pre><code>crypto.randomUUID();</code></pre>

<pre><code>const bytes = new Uint8Array(32);
crypto.getRandomValues(bytes);</code></pre>

<p>Pro reprodukovatelné výsledky použijte seedovatelný PRNG.</p>

<h3 id="typescript">TypeScript funkce</h3>

<p>Užitečné typované funkce pro běžnou práci s náhodností v TypeScriptu.</p>

<p><b>Celé číslo v rozsahu</b>:</p>
<pre><code>export function randomInt(min: number, max: number): number {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * (b - a + 1)) + a;
}</code></pre>

<p><b>Náhodná položka z pole</b>:</p>
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

<p>V PHP je pro náhodné celé číslo z daného rozsahu doporučené použít <code>random_int</code> (od PHP 7). Funkci se zadává rozsah čísel, ze kterých se má výsledek vygenerovat.</p>

<p>Obě čísla parametrů znamenají <b>včetně</b>, takže následující kód vygeneruje čísla 1–10.</p>

<pre><code>random_int(1, 10);</code></pre>

<p>Pro kryptograficky bezpečná data (např. tokeny) použijte <code>random_bytes</code> a případně je převeďte do čitelného formátu.</p>



<h2 id="ostatni-jazyky">Náhodné číslo v dalších jazycích</h2>

<p>Nejčastější způsob, jak získat náhodné celé číslo v rozsahu <code>min..max</code> v populárních jazycích.</p>

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

<p>Zvlášť při malém počtu čísel a malém počtu opakování se může stát, že bude nějaké číslo padat podezřele často.</p>

<figure>
  <img src="/files/nahodne-cislo/cetnost-10.png" alt="Graf četnosti malého počtu generování" class="border">
  <figcaption>Četnost náhodných čísel z rozsahu 0–9 při pouhých deseti opakováních</figcaption>
</figure>







<p>Pokud prvek náhody nemusí být matematicky <b>přesný</b>, ale jde hlavně o dojem uživatele, dá se tomu trochu pomoci. Například zabránit vygenerování téhož čísla dvakrát po sobě.</p>

<p><a href="https://kod.djpw.cz/otkb">Ukázka</a> – nikdy se nevygeneruje stejné číslo dvakrát za sebou</p>

<p>Pokud je navíc cílem <b>zobrazit všechny náhodné</b> položky, hodí se ještě požadovat, aby se nějaké číslo mohlo vygenerovat podruhé až v okamžiku, kdy každé číslo z rozsahu už alespoň jednou padlo.</p>

<p><a href="https://kod.djpw.cz/stkb">Živá ukázka</a></p>

<p>V případě <b>PHP</b> je nutné vygenerovaná náhodná čísla někam ukládat – například do pole <code>$_SESSION</code>.</p>




<h2 id="vyuziti">Využití</h2>

<p>Na základě vygenerování náhodného čísla se dá potom i <a href="/random">vypisovat náhodný obsah</a>.</p>
