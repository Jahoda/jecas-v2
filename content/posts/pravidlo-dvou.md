---
title: "Pravidlo dvou"
headline: "Pravidlo dvou"
description: "Jak používat pravidlo dvou pro efektivní psaní dobrého kódu"
date: "2025-09-04"
last_modification: "2025-09-04"
status: 1
tags: ["napady", "produktivita"]
format: "html"
---
<p>Jedna z osvědčených zásad psaní kódu je <b>DRY</b> (<i>don’t repeat yourself</i> – česky „neopakuj se“). Znamená to neduplikovat kód stylem copy &amp; paste na více místech v projektu, ale místo toho vyčlenit společné části do universálních funkcí nebo komponent.</p>

<p>Další dobré pravidlo je <b>KISS</b> (<i lang="en">keep it simple, stupid</i> – česky „drž to jednoduché“). To jde občas proti DRY, protože prosté zkopírování je někdy mnohem jednodušší než vymýšlení složité abstrakce za každou cenu.</p>

<h2 id="pravidlo-dvou">Pravidlo dvou</h2>
<p>Osobně se mi osvědčilo <b>pravidlo dvou</b>: jednorázové vědomé duplikování je v pořádku. Společnou abstrakci vytvářím až ve chvíli, kdy stejný kód potřebuji podruhé (tj. reálně by byl v projektu už na 3 místech).</p>
<p>Tím se předejde předčasné optimalisaci a zbytečné ztrátě času v době, kdy ještě není jasné, jakým směrem se vývoj vydá.</p>
<p>Často se navíc ukáže, že domněle „společná“ logika má v detailech rozdílné požadavky a sdílená abstrakce by další rozvoj spíš brzdila.</p>

<h2 id="proc-to-funguje">Proč to funguje</h2>
<ul>
  <li>Neabstrahuje se naslepo – kód je ověřen dvěma nezávislými použitími.</li>
  <li>Menší risiko překomplikování – vyhýbá se nadměrně obecnému návrhu.</li>
  <li>Rychlejší doručení hodnoty – první implementace je jednoduchá, rychlá a srozumitelná.</li>
  <li>Lepší ergonomie – skutečné potřeby se ukážou až po druhém použití.</li>
  
  
</ul>

<h2 id="jak-postupovat">Jak postupovat</h2>
<ol>
  <li><b>Poprvé</b> – klidně duplikuj. Udrž kód čitelný, pojmenuj věci srozumitelně a zbytečně nezobecňuj.</li>
  <li><b>Podruhé</b> – refaktoruj. Vytvoř společnou funkci/modul/komponentu, přesuň duplicitní části.</li>
</ol>

<p>Určitě ale není nutné se tím řídit vždy a existují případy, kdy může dávat smysl se duplikování bránit už od počátku. Například, kdy je dodržení DRY málo pracné nebo dokonce jednodušší na vývoj/testování.</p>

<h2 id="priklad">Příklad: duplikace → extrakce</h2>
<p>Poprvé – jednoduchá duplicita:</p>
<pre><code>async function saveUser(user) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return res.json();
}

async function saveOrder(order) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  return res.json();
}</code></pre>

<p>Podruhé – extrakce společného kódu:</p>
<pre><code>async function postJson(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

const saveUser = (user) => postJson('/api/users', user);
const saveOrder = (order) => postJson('/api/orders', order);</code></pre>

<h2 id="zaver">Závěr</h2>
<p>Nechť DRY zůstane cílem, ne dogmatem. Pravidlo dvou dává praktické vodítko: duplikuj jednou, abstrahuj podruhé. Jednoduché, čitelné – a zpravidla nejrychlejší cesta k udržitelnému kódu.</p>