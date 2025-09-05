---
title: "CSS funkce random()"
headline: "CSS funkce random()"
description: "Jak v CSS generovat náhodné hodnoty pomocí <code>random()</code> a kdy ji použít."
date: "2025-09-05"
last_modification: "2025-09-05"
status: 1
tags: ["css-funkce", "css"]
format: "html"
---

<p><code>random(min, max, step)</code> je nová CSS funkce, která vrací náhodnou hodnotu v zadaném rozsahu a jednotkách. Lze generovat náhodné rozměry, úhly, barvy i pozice bez JavaScriptu. Volitelný <code>step</code> určuje krok (jde tak generovat např. jen sudá čísla).</p>

<div class="note">
<p><b>Podpora:</b> Funkce se aktivně vyvíjí. Aktuálně funguje v <a href="https://developer.apple.com/safari/resources/">Safari Technology Preview
</a>.</p>
</div>

<p>Pokud se následující tvar po každém načtení zobrazí jinak velký, váš prohlížeč <code>random</code> podporuje:</p>

<div class="live">
<div style="width: 10px; width: random(10px, 100px); height: 10px; height: random(5px, 15px); background: #DA3F94"></div>
</div>

<h2 id="zakladni-pouziti">Základní použití</h2>

<pre><code>.procenta {
  top: random(0%, 100%);
  left: random(0%, 100%);
}

.pixely {
  width: random(100px, 200px);
}

.stupne {
  filter: hue-rotate(random(0deg, 360deg));
}</code></pre>



<h2 id="sdileni-nahodnosti">Sdílení náhodnosti</h2>

<p>Stejnou náhodnou hodnotu lze sdílet pomocí <b>identifikátoru</b> (začíná <code>--</code>) nebo speciálního klíčového slova <code>element-shared</code>.</p>

<p>Jde tak vygenerovat třeba náhodný čtverec (výška i šířka budou náhodně stejné číslo):</p>

<pre><code>.square {
  width: random(--side, 100px, 200px);
  height: random(--side, 100px, 200px);
}</code></pre>

<p>Klíčové slovo <code>element-shared</code> zajistí, že všechny prvky s danou třídou budou stejně náhodně velké:</p>

<pre><code>.rectangles {
  width: random(element-shared, 100px, 200px);
  height: random(element-shared, 80px, 160px);
}</code></pre>

<p>Kombinace identifikátoru s <code>element-shared</code> vygeneruje jednu společnou náhodnou hodnotu pro všechny prvky i deklarace, kde se použije. V tomto příkladu tedy všechny <code>.global-square</code> budou stejně velké čtverce (šířka = výška) se stejnou náhodnou stranou v rozsahu 120–240&nbsp;px.</p>

<pre><code>.global-square {
  width: random(--g element-shared, 120px, 240px);
  height: random(--g element-shared, 120px, 240px);
}
</code></pre>

<h2 id="animace-a-interakce">Animace a interakce</h2>


<pre><code>@keyframes spin {
  from { rotate: 0deg; }
  to {
    rotate: 5turn;
    rotate: random(1turn, 5turn);
  }
}
</code></pre>

<p>V podporovaných prohlížečích by se měl po každém načtení stránky kruh zastavit na jiném místě.</p>

<div class="live">
<style>
.live-rand-spin { display: flex; gap: 12px; align-items: center }
.live-rand-spin .wheel { width: 120px; height: 120px; border-radius: 50%; background: conic-gradient(#22d3ee, #a78bfa, #22d3ee); box-shadow: 0 6px 24px rgb(0 0 0 / .15) }
@keyframes live-rand-spin { from { rotate: 0deg } to { rotate: 5turn; rotate: random(1turn, 5turn) } }
.live-rand-spin .wheel:hover { animation: live-rand-spin 1200ms cubic-bezier(.2,.7,.2,1) both }
</style>
<div class="live-rand-spin">
  <div class="wheel" title="Najeď myší"></div>
  <span>Najeď myší</span>
</div>
</div>

<h2 id="kdy-se-hodnota-meni">Kdy se hodnota mění</h2>

<p>Hodnota se generuje při výpočtu stylů. Mění se při přepočtu stylů elementu (změna tříd, stavů, <a href="/media">media queries</a> apod.).</p>

<h2 id="progressive-enhancement">Progressive enhancement</h2>

<p>Pro nepodporované prohlížeče jde buď použít klasicky <a href="/supports"><code>@supports</code></a>, nebo využít toho, že neznámou hodnotu prohlížeče ignorují:</p>

<pre><code>/* Fallback-první deklarace – starší prohlížeče použijí první hodnotu */
.badge { opacity: 0.8; opacity: random(0.6, 1); }

/* Alternativně explicitně přes @supports */
@supports (opacity: random(0, 1)) {
  .badge { opacity: random(0.6, 1); }
}

@supports not (opacity: random(0, 1)) {
  .badge { opacity: 0.8; }
}
</code></pre>

<h2 id="priklady">Příklady</h2>

<p>Je otázka, k čemu se generování náhodného čísla v CSS hodí.</p>

<p>Určitě by tak šel po desetiletích konečně udělat starý dobrý efekt sněžení na stránce čistě pomocí CSS.</p>

<h3 id="generator-cisla">Generátor náhodného čísla 0–10</h3>

<p>V podporovaných prohlížečích se po každém načtení zobrazí jiné číslo.</p>
 
<p>Bohužel nejde <code>random</code> vypsat pomocí <a href="/content"><code>content</code></a>.</p>

<div class="live">
<style>
.live-rand-single { display: inline-flex; gap: 12px; align-items: center; user-select: none }
.live-rand-single .carousel { width: 56px; overflow: hidden }
.live-rand-single .strip { display: flex; transform: translateX(calc(random(0, 10, 1) * -56px)) }
.live-rand-single:hover .strip { transform: translateX(calc(random(0, 10, 1) * -56px)) }
.live-rand-single .cell { flex: 0 0 56px; height: 56px; display: grid; place-items: center; border-radius: 8px; background: #0b1020; color: #fff; font: 700 28px/1 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji" }
</style>
<div class="live-rand-single" title="Najeď myší">
  <div class="carousel">
    <div class="strip">
      <div class="cell">0</div>
      <div class="cell">1</div>
      <div class="cell">2</div>
      <div class="cell">3</div>
      <div class="cell">4</div>
      <div class="cell">5</div>
      <div class="cell">6</div>
      <div class="cell">7</div>
      <div class="cell">8</div>
      <div class="cell">9</div>
      <div class="cell">10</div>
    </div>
  </div>
</div>
</div>

<h3 id="snezeni">Sněžení bez JS</h3>

<div class="live">
<style>
.live-rand-snow { position: relative; margin-right: 140px; height: 220px; background: linear-gradient(#0b1020, #111827); border-radius: 12px; overflow: hidden }
.live-rand-snow .flake { position: absolute; top: -8px; left: random(0%, 100%); width: random(2px, 5px); height: random(2px, 5px); border-radius: 50%; background: #fff; opacity: random(0.5, 0.95) }
@keyframes live-snow-fall { to { transform: translateY(240px) translateX(random(-30px, 30px)); } }
.live-rand-snow .flake { animation: live-snow-fall random(6s, 12s) linear infinite; animation-delay: random(-12s, 0s) }
</style>
<div class="live-rand-snow">
  <div class="flake"></div><div class="flake"></div><div class="flake"></div><div class="flake"></div>
  <div class="flake"></div><div class="flake"></div><div class="flake"></div><div class="flake"></div>
  <div class="flake"></div><div class="flake"></div><div class="flake"></div><div class="flake"></div>
  <div class="flake"></div><div class="flake"></div><div class="flake"></div><div class="flake"></div>
  <div class="flake"></div><div class="flake"></div><div class="flake"></div><div class="flake"></div>
  <div class="flake"></div><div class="flake"></div><div class="flake"></div><div class="flake"></div>
</div>
</div>

<p>Ale představit si dokážu i drobné transformace UI.</p>

<h2 id="bez-random">Bez <code>random</code></h2>

<p>CSS <code>random</code> jde snadno nahradit běžným <a href="/random">generování náhodného čísla</a>, které se může nastavit jako <a href="/var">CSS proměnná</a>, a fungovat s tím velmi podobně.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
<li><a href="https://webkit.org/blog/17285/rolling-the-dice-with-css-random/">Rolling the Dice with CSS random()</a>
</li>
</ul>