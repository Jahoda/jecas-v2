---
title: "Object.defineProperty v JavaScriptu"
headline: "<code>Object.defineProperty</code> v JavaScriptu"
description: "Jak pomocí Object.defineProperty definovat vlastnosti objektů s přesnou kontrolou nad jejich chováním."
date: "2025-12-16"
last_modification: "2025-12-16"
status: 1
tags: ["js"]
format: "html"
---

<p>Metoda <code>Object.defineProperty</code> umožňuje <b>definovat novou vlastnost</b> objektu nebo <b>upravit existující</b> s přesnou kontrolou nad jejím chováním. Na rozdíl od přímého přiřazení (<code>obj.prop = hodnota</code>) můžete nastavit, zda je vlastnost zapisovatelná, enumerovatelná nebo konfigurovatelná.</p>

<h2 id="syntaxe">Základní syntaxe</h2>

<pre><code>Object.defineProperty(objekt, nazevVlastnosti, deskriptor);</code></pre>

<p>Metoda vrací původní objekt s přidanou nebo upravenou vlastností.</p>

<h2 id="deskriptor">Deskriptor vlastnosti</h2>

<p>Deskriptor je objekt, který popisuje chování vlastnosti. Existují dva typy deskriptorů:</p>

<h3>Datový deskriptor</h3>

<pre><code>Object.defineProperty(obj, "jmeno", {
  value: "Jan",           // hodnota vlastnosti
  writable: true,         // lze měnit hodnotu?
  enumerable: true,       // zobrazí se ve for...in?
  configurable: true      // lze smazat nebo změnit deskriptor?
});</code></pre>

<h3>Přístupový deskriptor (getter/setter)</h3>

<pre><code>Object.defineProperty(obj, "jmeno", {
  get() { return this._jmeno; },
  set(hodnota) { this._jmeno = hodnota; },
  enumerable: true,
  configurable: true
});</code></pre>

<p><b>Pozor:</b> Datový a přístupový deskriptor nelze kombinovat. Vlastnost má buď <code>value</code>/<code>writable</code>, nebo <code>get</code>/<code>set</code>.</p>

<h2 id="vychozi-hodnoty">Výchozí hodnoty</h2>

<p>Při použití <code>Object.defineProperty</code> jsou výchozí hodnoty <b>restriktivní</b>:</p>

<pre><code>// Toto vytvoří vlastnost, kterou nelze změnit ani smazat
Object.defineProperty(obj, "konstanta", {
  value: 42
});

// Ekvivalent:
Object.defineProperty(obj, "konstanta", {
  value: 42,
  writable: false,      // výchozí
  enumerable: false,    // výchozí
  configurable: false   // výchozí
});</code></pre>

<p>Oproti tomu přímé přiřazení nastaví všechny příznaky na <code>true</code>:</p>

<pre><code>obj.prop = 42;

// Ekvivalent:
Object.defineProperty(obj, "prop", {
  value: 42,
  writable: true,
  enumerable: true,
  configurable: true
});</code></pre>

<h2 id="priklady">Praktické příklady</h2>

<h3>Konstantní vlastnost</h3>

<pre><code>const config = {};

Object.defineProperty(config, "API_URL", {
  value: "https://api.example.com",
  writable: false,
  enumerable: true,
  configurable: false
});

config.API_URL = "https://jina.url"; // V strict mode vyhodí TypeError
console.log(config.API_URL);         // "https://api.example.com"</code></pre>

<h3>Skrytá vlastnost</h3>

<p>Vlastnost s <code>enumerable: false</code> se nezobrazí ve <code>for...in</code>, <code>Object.keys()</code> ani <code>JSON.stringify()</code>:</p>

<pre><code>const uzivatel = { jmeno: "Jan" };

Object.defineProperty(uzivatel, "_id", {
  value: 12345,
  enumerable: false
});

console.log(Object.keys(uzivatel)); // ["jmeno"]
console.log(uzivatel._id);          // 12345
console.log(JSON.stringify(uzivatel)); // '{"jmeno":"Jan"}'</code></pre>

<h3>Computed property (getter)</h3>

<pre><code>const kruh = { polomer: 5 };

Object.defineProperty(kruh, "obsah", {
  get() {
    return Math.PI * this.polomer ** 2;
  },
  enumerable: true
});

console.log(kruh.obsah);  // 78.54...
kruh.polomer = 10;
console.log(kruh.obsah);  // 314.15...</code></pre>

<h3>Validace při přiřazení (setter)</h3>

<pre><code>const osoba = { _vek: 0 };

Object.defineProperty(osoba, "vek", {
  get() {
    return this._vek;
  },
  set(hodnota) {
    if (typeof hodnota !== "number" || hodnota < 0) {
      throw new Error("Věk musí být kladné číslo");
    }
    this._vek = hodnota;
  },
  enumerable: true
});

osoba.vek = 25;           // OK
osoba.vek = -5;           // Error: Věk musí být kladné číslo</code></pre>

<h2 id="vice-vlastnosti">Definice více vlastností najednou</h2>

<p>Pro definici více vlastností použijte <code>Object.defineProperties</code>:</p>

<pre><code>const obj = {};

Object.defineProperties(obj, {
  jmeno: {
    value: "Jan",
    writable: true,
    enumerable: true
  },
  vek: {
    value: 30,
    writable: true,
    enumerable: true
  },
  _tajne: {
    value: "skryto",
    enumerable: false
  }
});</code></pre>

<h2 id="getownpropertydescriptor">Zjištění deskriptoru</h2>

<p>Deskriptor existující vlastnosti zjistíte pomocí <code>Object.getOwnPropertyDescriptor</code>:</p>

<pre><code>const obj = { jmeno: "Jan" };

const deskriptor = Object.getOwnPropertyDescriptor(obj, "jmeno");
console.log(deskriptor);
// {
//   value: "Jan",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }</code></pre>

<h2 id="alternativy">Moderní alternativy</h2>

<p>Pro běžné případy existují jednodušší přístupy:</p>

<h3>Getter/setter v objektovém literálu</h3>

<pre><code>const kruh = {
  polomer: 5,
  get obsah() {
    return Math.PI * this.polomer ** 2;
  }
};</code></pre>

<h3>Getter/setter ve třídě</h3>

<pre><code>class Kruh {
  constructor(polomer) {
    this.polomer = polomer;
  }

  get obsah() {
    return Math.PI * this.polomer ** 2;
  }
}</code></pre>

<h3>Object.freeze pro neměnnost</h3>

<pre><code>const config = Object.freeze({
  API_URL: "https://api.example.com",
  TIMEOUT: 5000
});

config.API_URL = "jina"; // Tiše selže (v strict mode TypeError)
config.NOVA = "x";       // Tiše selže</code></pre>

<h2 id="kdy-pouzit">Kdy použít Object.defineProperty</h2>

<ul>
  <li><b>Skryté vlastnosti</b> — interní stav, který nemá být vidět v JSON nebo enumeraci</li>
  <li><b>Neměnné vlastnosti</b> — konstanty, které nelze přepsat</li>
  <li><b>Metaprogramování</b> — knihovny, frameworky, proxy objekty</li>
  <li><b>Zpětná kompatibilita</b> — přidání getterů/setterů do existujících objektů</li>
</ul>

<p>Pro většinu běžného kódu jsou objektové literály s gettery/settery nebo třídy čitelnější.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty">MDN: Object.defineProperty()</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties">MDN: Object.defineProperties()</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor">MDN: Object.getOwnPropertyDescriptor()</a></li>
</ul>
