---
title: "Proč JavaScript !== není bezpečné pro porovnávání tajných řetězců"
headline: "Proč JavaScript <code>!==</code> není bezpečné pro porovnávání tajných řetězců"
description: "Operátor !== v JavaScriptu není constant-time. Při porovnávání hesel, tokenů nebo API klíčů to umožňuje timing attack."
date: "2025-12-22"
last_modification: "2025-12-22"
status: 1
tags: ["js", "zabezpeceni"]
format: "html"
---

<p>Operátory <code>===</code> a <code>!==</code> v JavaScriptu porovnávají řetězce <b>znak po znaku</b> a vrátí výsledek ihned, jakmile najdou rozdíl. To je efektivní, ale při porovnávání tajných hodnot (hesla, tokeny, API klíče) to představuje bezpečnostní riziko.</p>

<h2 id="problem">V čem je problém</h2>

<p>Představte si tento kód pro ověření API klíče:</p>

<pre><code>function overApiKlic(vstup: string): boolean {
  const spravnyKlic = process.env.API_KEY;
  return vstup === spravnyKlic;
}</code></pre>

<p>Vypadá nevinně, ale JavaScript engine porovnává takto:</p>

<ol>
  <li>Porovná první znak</li>
  <li>Pokud se liší → okamžitě vrátí <code>false</code></li>
  <li>Pokud se shoduje → porovná druhý znak</li>
  <li>Opakuje, dokud nenajde rozdíl nebo nedojde na konec</li>
</ol>

<p>To znamená, že:</p>

<ul>
  <li><code>"AAAA" === "XXXX"</code> — selže okamžitě (první znak)</li>
  <li><code>"XAAA" === "XXXX"</code> — selže o něco později (druhý znak)</li>
  <li><code>"XXAA" === "XXXX"</code> — selže ještě později (třetí znak)</li>
</ul>

<p><b>Útočník může měřit čas odpovědi</b> a postupně uhodnout každý znak tajného klíče.</p>

<h2 id="timing-attack">Co je timing attack</h2>

<p>Timing attack je typ útoku postranním kanálem (<i>side-channel attack</i>), kdy útočník získává informace na základě <b>doby trvání</b> operace, nikoliv z jejího výstupu.</p>

<p>Při porovnávání řetězců:</p>

<pre><code>// Útočník zkouší různé první znaky
"A..." → 0.1 ms
"B..." → 0.1 ms
"X..." → 0.2 ms  ← trvá déle, první znak je správně!

// Pak zkouší druhý znak
"XA..." → 0.2 ms
"XB..." → 0.2 ms
"XX..." → 0.3 ms  ← druhý znak je správně!</code></pre>

<p>U lokálního útoku stačí nanosekundové rozdíly. U síťového útoku je potřeba více pokusů pro statistickou analýzu, ale moderní techniky (např. analýza TCP timestampů) to umožňují i přes internet.</p>

<h2 id="reseni">Řešení: constant-time porovnání</h2>

<p>Bezpečné porovnání musí trvat <b>stejně dlouho</b> bez ohledu na to, kde se řetězce liší. V Node.js použijte <code>crypto.timingSafeEqual</code>:</p>

<pre><code>import crypto from "crypto";

function bezpecnePorovnej(a: string, b: string): boolean {
  // Oba řetězce musí mít stejnou délku
  if (a.length !== b.length) {
    return false;
  }

  const bufferA = Buffer.from(a, "utf8");
  const bufferB = Buffer.from(b, "utf8");

  return crypto.timingSafeEqual(bufferA, bufferB);
}</code></pre>

<p><b>Pozor:</b> <code>timingSafeEqual</code> vyžaduje buffery stejné délky. Pokud délky nesouhlasí, musíte to ošetřit — ale tím prozradíte, že délka je špatně. V praxi to většinou nevadí, protože útočník délku klíče často zná (např. UUID má vždy 36 znaků).</p>

<h3>Lepší varianta s hash</h3>

<p>Elegantnější řešení je porovnávat <b>hashe</b> obou hodnot. Hash má vždy stejnou délku:</p>

<pre><code>import crypto from "crypto";

function bezpecnePorovnejHash(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();

  return crypto.timingSafeEqual(hashA, hashB);
}</code></pre>

<p>Tato varianta:</p>

<ul>
  <li>Funguje pro řetězce jakékoliv délky</li>
  <li>Neprozrazuje délku tajného klíče</li>
  <li>Je o něco pomalejší kvůli hashování</li>
</ul>

<h2 id="prohlizec">Co v prohlížeči</h2>

<p>V prohlížeči není <code>crypto.timingSafeEqual</code> k dispozici. Můžete použít Web Crypto API pro hashování:</p>

<pre><code>async function bezpecnePorovnejProhlizec(
  a: string,
  b: string
): Promise&lt;boolean&gt; {
  const encoder = new TextEncoder();

  const hashA = await crypto.subtle.digest("SHA-256", encoder.encode(a));
  const hashB = await crypto.subtle.digest("SHA-256", encoder.encode(b));

  const viewA = new Uint8Array(hashA);
  const viewB = new Uint8Array(hashB);

  // Constant-time porovnání
  let result = 0;
  for (let i = 0; i &lt; viewA.length; i++) {
    result |= viewA[i] ^ viewB[i];
  }

  return result === 0;
}</code></pre>

<p><b>Poznámka:</b> XOR porovnání je constant-time, protože projde vždy všechny bajty bez ohledu na to, kde se hodnoty liší.</p>

<h2 id="frontend">A co frontend?</h2>

<p><b>Na frontendu timing attack prakticky nehrozí.</b> Důvody jsou dva:</p>

<ol>
  <li><b>Tajné hodnoty na frontend nepatří</b> — pokud máte API klíč nebo heslo v JavaScriptu prohlížeče, útočník ho najde ve zdrojovém kódu nebo DevTools během sekund. Timing attack je zbytečně složitý.</li>
  <li><b>Útočník by útočil sám na sebe</b> — frontend kód běží v prohlížeči uživatele. Útočník by měřil čas operací ve svém vlastním prohlížeči, kde už má plný přístup ke všemu.</li>
</ol>

<p>Timing attack dává smysl pouze tam, kde:</p>

<ul>
  <li>Tajná hodnota je na <b>serveru</b> (útočník ji nezná)</li>
  <li>Útočník může <b>opakovaně posílat requesty</b> a měřit čas odpovědi</li>
</ul>

<pre><code>// Backend (Node.js) — RIZIKO
app.post("/api", (req, res) => {
  if (req.headers["x-api-key"] === process.env.SECRET) {
    // Útočník měří čas odpovědi a postupně uhodne SECRET
  }
});

// Frontend (prohlížeč) — BEZ RIZIKA
if (userInput === "nějaká hodnota") {
  // Útočník vidí "nějaká hodnota" přímo ve zdrojovém kódu
}</code></pre>

<p>Sekce <a href="#prohlizec">Co v prohlížeči</a> výše je tedy relevantní hlavně pro <b>symetrické scénáře</b> — například když frontend i backend sdílí stejnou logiku (isomorphic JS) a chcete mít jednotný kód.</p>

<h2 id="kdy-je-dulezite">Kdy na tom záleží</h2>

<p>Constant-time porovnání je důležité při:</p>

<ul>
  <li><b>Ověřování API klíčů</b></li>
  <li><b>Porovnávání HMAC signatur</b> (webhooky, JWT)</li>
  <li><b>Ověřování CSRF tokenů</b></li>
  <li><b>Porovnávání session ID</b></li>
  <li><b>Jakékoliv tajné hodnoty</b>, které útočník může zkoušet opakovaně</li>
</ul>

<p>Naopak <b>není potřeba</b> u:</p>

<ul>
  <li>Veřejných dat (uživatelská jména, e-maily)</li>
  <li>Hodnot, které útočník nemůže ovlivnit</li>
  <li>Jednorázových tokenů s krátkým TTL a rate limitingem</li>
</ul>

<h2 id="frameworky">Jak to řeší frameworky</h2>

<p>Většina bezpečnostních knihoven to řeší správně:</p>

<ul>
  <li><b>Express session</b> — používá constant-time porovnání pro session ID</li>
  <li><b>Passport.js</b> — záleží na strategii, u vlastní implementace ověřte</li>
  <li><b>bcrypt/argon2</b> — funkce pro porovnání hesel jsou constant-time</li>
</ul>

<p>Problém nastává, když implementujete vlastní ověřování a použijete <code>===</code>.</p>

<h2 id="shrnuti">Shrnutí</h2>

<ul>
  <li><code>===</code> a <code>!==</code> v JS <b>nejsou constant-time</b></li>
  <li>Při porovnávání tajných hodnot použijte <code>crypto.timingSafeEqual</code></li>
  <li>Alternativně porovnávejte <b>hashe</b> obou hodnot</li>
  <li>V prohlížeči použijte XOR porovnání přes všechny bajty</li>
</ul>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b">Node.js: crypto.timingSafeEqual()</a></li>
  <li><a href="https://codahale.com/a-lesson-in-timing-attacks/">A Lesson In Timing Attacks</a> — klasický článek od Coda Hale</li>
  <li><a href="https://en.wikipedia.org/wiki/Timing_attack">Wikipedia: Timing attack</a></li>
</ul>
