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

<h2 id="realne-priklady">Reálné příklady z praxe</h2>

<h3>Deprecation warning</h3>

<p>Označení vlastnosti jako zastaralé — uživatel dostane varování, ale kód stále funguje:</p>

<pre><code>function deprecate(obj, prop, novyNazev) {
  const hodnota = obj[prop];
  Object.defineProperty(obj, prop, {
    get() {
      console.warn(`${prop} je zastaralé, použijte ${novyNazev}`);
      return hodnota;
    },
    enumerable: false
  });
}

const config = { apiUrl: "https://api.example.com" };
config.API_URL = config.apiUrl; // stará verze
deprecate(config, "API_URL", "apiUrl");

config.API_URL; // Warning: API_URL je zastaralé, použijte apiUrl</code></pre>

<h3>Lazy loading (memoizace)</h3>

<p>Hodnota se vypočítá až při prvním přístupu a pak se uloží:</p>

<pre><code>function lazy(obj, prop, vypocet) {
  Object.defineProperty(obj, prop, {
    get() {
      const hodnota = vypocet();
      // Přepíše getter na prostou hodnotu
      Object.defineProperty(obj, prop, {
        value: hodnota,
        writable: false,
        enumerable: true
      });
      return hodnota;
    },
    configurable: true,
    enumerable: true
  });
}

const modul = {};
lazy(modul, "tezkéData", () => {
  console.log("Načítám data...");
  return { /* ... velký objekt ... */ };
});

// Nic se nenačítá, dokud nepřistoupíme
console.log(modul.tezkéData); // "Načítám data..." + vrátí objekt
console.log(modul.tezkéData); // Vrátí objekt bez logování (už je uložené)</code></pre>

<h3>Polyfill pro chybějící metodu</h3>

<p>Přidání metody do prototypu s korektními příznaky:</p>

<pre><code>// Polyfill pro Array.prototype.at (před ES2022)
if (!Array.prototype.at) {
  Object.defineProperty(Array.prototype, "at", {
    value: function(index) {
      if (index < 0) index = this.length + index;
      return this[index];
    },
    writable: true,
    enumerable: false,  // Nesmí se objevit ve for...in
    configurable: true
  });
}

[1, 2, 3].at(-1); // 3</code></pre>

<h3>Ochrana globálních objektů</h3>

<p>Zabránění přepsání důležitých funkcí (např. v security kontextu):</p>

<pre><code>// Zamknutí console.log proti přepsání
Object.defineProperty(console, "log", {
  value: console.log,
  writable: false,
  configurable: false
});

console.log = function() {}; // TypeError v strict mode, tiše selže jinak
console.log("Stále funguje!"); // Funguje</code></pre>

<h3>Sledování změn (debugging)</h3>

<p>Zjištění, kdo a kdy mění hodnotu:</p>

<pre><code>function sleduj(obj, prop) {
  let hodnota = obj[prop];
  Object.defineProperty(obj, prop, {
    get() { return hodnota; },
    set(nova) {
      console.log(`${prop}: ${hodnota} → ${nova}`);
      console.trace(); // Zobrazí call stack
      hodnota = nova;
    }
  });
}

const state = { count: 0 };
sleduj(state, "count");

state.count = 1; // "count: 0 → 1" + stack trace
state.count = 2; // "count: 1 → 2" + stack trace</code></pre>

<h3>Reaktivita ve Vue 2</h3>

<p>Vue 2 používal <code>Object.defineProperty</code> jako základ svého reaktivního systému. Zjednodušená verze toho, co framework dělá interně:</p>

<pre><code>function defineReactive(obj, key) {
  let value = obj[key];
  const subscribers = [];  // komponenty závislé na této vlastnosti

  Object.defineProperty(obj, key, {
    get() {
      // Při renderování komponenty ji zaregistruj jako závislost
      if (currentlyRenderingComponent) {
        subscribers.push(currentlyRenderingComponent);
      }
      return value;
    },
    set(newValue) {
      value = newValue;
      // Při změně překresli všechny závislé komponenty
      subscribers.forEach(component => component.update());
    }
  });
}

// Vue 2 toto volá pro každou vlastnost v data()
function observe(obj) {
  for (const key of Object.keys(obj)) {
    defineReactive(obj, key);
  }
}</code></pre>

<p>Tento přístup měl <b>známá omezení</b>:</p>

<pre><code>// Nefungovalo reaktivně — vlastnost neexistovala při observe()
this.novaVlastnost = "hodnota";

// Workaround
Vue.set(this, "novaVlastnost", "hodnota");

// Nefungovalo reaktivně — index pole není "vlastnost"
this.pole[0] = "nova";

// Workaround
Vue.set(this.pole, 0, "nova");</code></pre>

<p><b>Vue 3 přešel na Proxy</b>, který tyto problémy nemá — zachytí i nové vlastnosti a přístup přes index. Právě limity <code>Object.defineProperty</code> byly hlavním důvodem přechodu.</p>

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

<h2 id="monkey-patching">Monkey-patching knihoven</h2>

<p>Častý use case pro <code>Object.defineProperty</code> je <b>úprava chování existujícího kódu</b> — například knihovny třetí strany, kterou nemůžete přímo upravit:</p>

<pre><code>// Přidání logování do existující metody knihovny
const puvodniFetch = window.fetch;

Object.defineProperty(window, "fetch", {
  value: function(...args) {
    console.log("Fetch volán s:", args[0]);
    return puvodniFetch.apply(this, args);
  },
  writable: true,
  configurable: true
});</code></pre>

<p>Nebo sledování přístupu k vlastnosti:</p>

<pre><code>// Zachycení, kdy někdo čte localStorage
const puvodniStorage = window.localStorage;
let storageProxy = {};

Object.defineProperty(window, "localStorage", {
  get() {
    console.log("Přístup k localStorage");
    return puvodniStorage;
  },
  configurable: true
});</code></pre>

<p><b>Pozor:</b> Monkey-patching je mocný nástroj, ale snadno vede k těžko laditelným chybám. Používejte opatrně a pouze tam, kde není jiná možnost.</p>

<h2 id="proxy">Srovnání s Proxy</h2>

<p><code>Proxy</code> je modernější alternativa (ES6+), která umožňuje zachytit <b>jakoukoliv operaci</b> nad objektem:</p>

<pre><code>// Object.defineProperty — musíte definovat každou vlastnost zvlášť
const obj = {};
Object.defineProperty(obj, "a", {
  get() { console.log("čtení a"); return this._a; },
  set(v) { console.log("zápis a"); this._a = v; }
});

// Proxy — zachytí všechny vlastnosti najednou
const obj = new Proxy({}, {
  get(target, prop) {
    console.log(`čtení ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`zápis ${prop}`);
    target[prop] = value;
    return true;
  }
});</code></pre>

<h3>Kdy použít co</h3>

<table>
  <tr>
    <th></th>
    <th>Object.defineProperty</th>
    <th>Proxy</th>
  </tr>
  <tr>
    <td><b>Známé vlastnosti</b></td>
    <td>Ano</td>
    <td>Ano</td>
  </tr>
  <tr>
    <td><b>Dynamické vlastnosti</b></td>
    <td>Ne (musíte znát název předem)</td>
    <td>Ano (zachytí cokoliv)</td>
  </tr>
  <tr>
    <td><b>Úprava existujícího objektu</b></td>
    <td>Ano (in-place)</td>
    <td>Ne (vytváří wrapper)</td>
  </tr>
  <tr>
    <td><b>Zachycení delete, in, ...</b></td>
    <td>Ne</td>
    <td>Ano</td>
  </tr>
  <tr>
    <td><b>Podpora IE11</b></td>
    <td>Ano</td>
    <td>Ne</td>
  </tr>
  <tr>
    <td><b>Výkon</b></td>
    <td>Rychlejší</td>
    <td>Pomalejší (režie trapu)</td>
  </tr>
</table>

<p><b>Proxy je lepší volba</b> pro reaktivní systémy (Vue 3), validaci vstupů, nebo když potřebujete zachytit operace nad neznámými vlastnostmi. <b>defineProperty je lepší</b> pro úpravu konkrétních vlastností existujících objektů (monkey-patching) nebo když potřebujete podporu starších prohlížečů.</p>

<h2 id="alternativy">Jednodušší alternativy</h2>

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

<h2 id="antipattern">Kdy je to antipattern</h2>

<p>Gettery a settery s <code>Object.defineProperty</code> umožňují vytvořit "magické" objekty — vypadají jako běžné vlastnosti, ale na pozadí spouští libovolný kód. To může být problém:</p>

<pre><code>// Tohle vypadá nevinně...
user.email = "test@example.com"

// ...ale spustilo validaci, API call, toast notifikaci a analytics event</code></pre>

<h3>Problematické použití</h3>

<ul>
  <li><b>Skryté side-effecty</b> — přiřazení vypadá triviálně, ale dělá netriviální věci</li>
  <li><b>Těžko debugovatelné</b> — když <code>obj.x = 5</code> nefunguje, je těžké zjistit proč</li>
  <li><b>Porušení principu nejmenšího překvapení</b> — kolega netuší, že jednoduchý assignment má vedlejší efekty</li>
</ul>

<h3>Kdy je to v pořádku</h3>

<ul>
  <li><b>Framework s jasnou konvencí</b> — Vue, Svelte, MobX — všichni vědí, že reaktivní state "dělá věci"</li>
  <li><b>Dobře zdokumentované API</b> — název funkce jasně říká, co objekt dělá (např. <code>createReactiveStore()</code>)</li>
  <li><b>Interní implementace</b> — uživatel knihovny přímo s gettery nepracuje</li>
  <li><b>Computed properties bez side-effectů</b> — getter jen počítá hodnotu z jiných vlastností</li>
</ul>

<h3>Alternativa — explicitní API</h3>

<pre><code>// Místo magie
params.limit = 50

// Explicitní metoda
params.set("limit", 50)
// nebo
updateParams({ limit: 50 })</code></pre>

<p><b>Doporučení:</b> Pro běžný aplikační kód preferujte explicitní metody. Pro knihovny a frameworky je "magie" akceptovatelná, pokud je <b>konzistentní</b>, <b>zdokumentovaná</b> a <b>očekávatelná</b>.</p>

<h2 id="kdy-pouzit">Kdy použít Object.defineProperty</h2>

<p>Hlavní síla <code>Object.defineProperty</code> je v tom, že vytvoříte objekt, který <b>vypadá běžně, ale chová se "magicky"</b>:</p>

<pre><code>// Uživatel vidí toto:
params.limit = 50

// Ale pod kapotou se děje:
// setter: validace → aktualizace URL → sync do storage</code></pre>

<p>Typické legitimní použití:</p>

<ul>
  <li><b>Monkey-patching</b> — úprava chování knihoven třetích stran nebo globálních objektů</li>
  <li><b>Skryté vlastnosti</b> — interní stav, který nemá být vidět v JSON nebo enumeraci</li>
  <li><b>Neměnné vlastnosti</b> — konstanty, které nelze přepsat</li>
  <li><b>Polyfilly</b> — přidání chybějících metod do prototypů (např. <code>Array.prototype.includes</code>)</li>
  <li><b>Dynamické gettery/settery</b> — když názvy vlastností nejsou známé v době kompilace</li>
  <li><b>Reaktivní systémy</b> — Vue 2 používal <code>defineProperty</code> pro sledování změn</li>
</ul>

<p>Pro většinu běžného kódu jsou objektové literály s gettery/settery, třídy nebo Proxy čitelnější a flexibilnější.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty">MDN: Object.defineProperty()</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties">MDN: Object.defineProperties()</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor">MDN: Object.getOwnPropertyDescriptor()</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy">MDN: Proxy</a></li>
</ul>
