---
title: "JavaScript null vs. undefined – rozdíly a použití"
headline: "JavaScript <code>null</code> a <code>undefined</code>"
description: "Rozdíly mezi <code>null</code> a <code>undefined</code> v JavaScriptu, kdy je používat a jak se vyhnout běžným chybám."
date: "2025-08-22"
last_modification: "2025-08-22"
status: 1
tags: ["js", "ts", "napady"]
format: "html"
---

<p>V JavaScriptu jsou <code>null</code> a <code>undefined</code> dva speciální typy hodnot, které často způsobují zmatek. Pojďme si vysvětlit jejich rozdíly a kdy je používat.</p>

<h2 id="jak-zjistit-co-pouzit">Jak zjistit, co použít</h2>

<p>Nejste si jisti, kdy použít <code>null</code> a kdy <code>undefined</code>?</p>

<div id="decision-tree" style="font-family: monospace; line-height: 1.6; margin: 20px 0;">
    <div id="question-1" class="question active">
        <div class="question-box">
            <strong>Chcete explicitně říct, že hodnota neexistuje nebo byla odstraněna?</strong>
        </div>
        <div class="answers">
            <button onclick="answerQuestion(1, 'yes')" class="answer-btn">ANO</button>
            <button onclick="answerQuestion(1, 'no')" class="answer-btn">NE</button>
        </div>
    </div>
    
    <div id="question-2" class="question hidden">
        <div class="question-box">
            <strong>Je to neinicialisovaná proměnná nebo volitelný parametr?</strong>
        </div>
        <div class="answers">
            <button onclick="answerQuestion(2, 'yes')" class="answer-btn">ANO</button>
            <button onclick="answerQuestion(2, 'no')" class="answer-btn">NE</button>
        </div>
    </div>
    
    <div id="question-3" class="question hidden">
        <div class="question-box">
            <strong>Chcete vrátit hodnotu do původního stavu nebo resetovat konfiguraci?</strong>
        </div>
        <div class="answers">
            <button onclick="answerQuestion(3, 'yes')" class="answer-btn">ANO</button>
            <button onclick="answerQuestion(3, 'no')" class="answer-btn">NE</button>
        </div>
    </div>
    
    <div id="question-4" class="question hidden">
        <div class="question-box">
            <strong>Pracujete s databasí nebo API, které používá <code>null</code>?</strong>
        </div>
        <div class="answers">
            <button onclick="answerQuestion(4, 'yes')" class="answer-btn">ANO</button>
            <button onclick="answerQuestion(4, 'no')" class="answer-btn">NE</button>
        </div>
    </div>
    
    <div id="question-5" class="question hidden">
        <div class="question-box">
            <strong>Potřebujete rozlišit mezi „není nastaveno“ a „bylo vymazáno“?</strong>
        </div>
        <div class="answers">
            <button onclick="answerQuestion(5, 'yes')" class="answer-btn">ANO</button>
            <button onclick="answerQuestion(5, 'no')" class="answer-btn">NE</button>
        </div>
    </div>
    
    <div id="result" class="result hidden">
        <div id="result-content"></div>
        <button onclick="resetDecisionTree()" class="reset-btn">Začít znovu</button>
    </div>
</div>

<style>
.question-box {
    background: #f5f5f5;
    border: 2px solid #ddd;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    text-align: center;
}

.answers {
    text-align: center;
    margin: 15px 0;
}

.answer-btn {
    background: #007cba;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
}

.answer-btn:hover {
    background: #005a87;
}

.result {
    background: #e8f5e8;
    border: 2px solid #4caf50;
    padding: 20px;
    margin: 20px 0;
    border-radius: 5px;
    text-align: center;
}

.result h4 {
    color: #2e7d32;
    margin-bottom: 15px;
}

.result pre {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    text-align: left;
    overflow-x: auto;
}

.reset-btn {
    background: #ff9800;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
}

.reset-btn:hover {
    background: #f57c00;
}

.hidden {
    display: none;
}

.active {
    display: block;
}
</style>

<script>
const questions = [
    {
        id: 1,
        text: "Chcete explicitně říct, že hodnota neexistuje nebo byla odstraněna?",
        yesResult: {
                    answer: "<code>null</code>",
        reason: "Explicitní absence hodnoty",
            example: `let uzivatel = {
    jmeno: "Jan",
    email: null  // Uživatel nemá email
};`
        }
    },
    {
        id: 2,
        text: "Je to neinicialisovaná proměnná nebo volitelný parametr?",
        yesResult: {
                    answer: "<code>undefined</code>",
        reason: "Neinicialisovaná proměnná nebo volitelný parametr",
            example: `let hodnota;
console.log(hodnota); // undefined

function pozdrav(jmeno, titul) {
    if (titul === undefined) {
        titul = "pane";
    }
    return \`Dobrý den, \${titul} \${jmeno}\`;
}`
        }
    },
    {
        id: 3,
        text: "Chcete vrátit hodnotu do původního stavu nebo resetovat konfiguraci?",
        yesResult: {
                    answer: "<code>undefined</code>",
        reason: "Reset na výchozí hodnoty",
            example: `let config = { theme: "dark" };
config.theme = undefined; // Vrátí na výchozí

function getConfigValue(key) {
    return config[key] ?? getDefaultValue(key);
}`
        }
    },
    {
        id: 4,
        text: "Pracujete s databasí nebo API, které používá <code>null</code>?",
        yesResult: {
            answer: "<code>null</code>",
            reason: "Databázová hodnota nebo API <code>null</code>",
            example: `let dbData = {
    id: 1,
    description: null  // Pole v DB je NULL
};

// API odpověď
let apiResponse = {
    user: null  // Uživatel nebyl nalezen
};`
        }
    },
    {
        id: 5,
        text: "Potřebujete rozlišit mezi „není nastaveno“ a „bylo vymazáno“?",
        yesResult: {
                    answer: "<code>null</code>",
        reason: "Rozlišení mezi neinicialisováno a vymazáno",
            example: `let cache = {};
cache.data = "hodnota";
cache.data = null; // Explicitně vymazáno

// vs
cache.data2 = undefined; // Zatím nenastaveno

if (cache.data === null) {
    console.log("Data byla vymazána");
} else if (cache.data === undefined) {
    console.log("Data zatím nebyla nastavena");
}`
        }
    }
];

const defaultResult = {
    answer: "<code>undefined</code>",
    reason: "Výchozí volba pro absenci hodnoty",
    example: `// Výchozí chování JavaScriptu
let promenna;
console.log(promenna); // undefined

// Volitelný parametr
function funkce(param) {
    if (param === undefined) {
        param = "výchozí";
    }
    return param;
}`
};

function answerQuestion(questionId, answer) {
    const question = questions.find(q => q.id === questionId);
    
    if (answer === 'yes' && question.yesResult) {
        showResult(question.yesResult);
    } else if (questionId < questions.length) {
        // Zobrazit další otázku
        document.getElementById(`question-${questionId}`).classList.remove('active');
        document.getElementById(`question-${questionId}`).classList.add('hidden');
        document.getElementById(`question-${questionId + 1}`).classList.remove('hidden');
        document.getElementById(`question-${questionId + 1}`).classList.add('active');
    } else {
        // Poslední otázka - NE odpověď
        showResult(defaultResult);
    }
}

function showResult(result) {
    // Skrýt všechny otázky
    questions.forEach(q => {
        document.getElementById(`question-${q.id}`).classList.remove('active');
        document.getElementById(`question-${q.id}`).classList.add('hidden');
    });
    
    // Zobrazit výsledek
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('result-content');
    
    resultContent.innerHTML = `
        <h4>Doporučení: Použijte <strong>${result.answer}</strong></h4>
        <p><strong>Důvod:</strong> ${result.reason}</p>
        <pre><code class="language-javascript">${result.example}</code></pre>
    `;
    
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('active');
}

function resetDecisionTree() {
    // Skrýt všechny otázky a výsledek
    questions.forEach(q => {
        document.getElementById(`question-${q.id}`).classList.remove('active');
        document.getElementById(`question-${q.id}`).classList.add('hidden');
    });
    document.getElementById('result').classList.remove('active');
    document.getElementById('result').classList.add('hidden');
    
    // Zobrazit první otázku
    document.getElementById('question-1').classList.remove('hidden');
    document.getElementById('question-1').classList.add('active');
}
</script>

<h2 id="zaklady">Základy</h2>

<h3 id="co-je-undefined">Co je <code>undefined</code>?</h3>

<p><code>undefined</code> je primitivní hodnota, která se automaticky přiřadí proměnným, které byly deklarovány, ale nebyly inicialisovány.</p>

<pre><code class="language-javascript">let promenna;
console.log(promenna); // undefined

let obj = {};
console.log(obj.nesmysl); // undefined

function funkce() {
}
console.log(funkce()); // undefined</code></pre>

<h3 id="co-je-null">Co je <code>null</code>?</h3>

<p><code>null</code> je také primitivní hodnota, ale musí být explicitně přiřazena. Representuje úmyslnou absenci hodnoty.</p>

<pre><code class="language-javascript">let promenna = null;
console.log(promenna); // null

let obj = {
    hodnota: null
};</code></pre>

<h2 id="rozdily">Rozdíly</h2>

<h3 id="porovnani">Porovnání</h3>

<pre><code class="language-javascript">console.log(null === undefined); // false
console.log(null == undefined);  // true (volné porovnání)

console.log(typeof null);      // "object" (to je chyba v JavaScriptu!)
console.log(typeof undefined); // "undefined"</code></pre>

<h3 id="chovani-v-objektech">Chování v objektech</h3>

<p>V objektech se <code>null</code> a <code>undefined</code> chovají různě:</p>

<pre><code class="language-javascript">let obj = {
    a: undefined,
    b: null,
    c: "hodnota"
};

console.log(obj);
// Výstup: { a: undefined, b: null, c: "hodnota" }

// Kontrola existence vlastností
console.log(obj.hasOwnProperty('a')); // true - vlastnost existuje
console.log(obj.hasOwnProperty('b')); // true - vlastnost existuje
console.log(obj.hasOwnProperty('d')); // false - vlastnost neexistuje

// Přístup k hodnotám
console.log(obj.a); // undefined
console.log(obj.b); // null
console.log(obj.d); // undefined (neexistující vlastnost)</code></pre>

<h3 id="json-prevod">Převod do JSON</h3>

<p>Při převodu do JSON se chování liší:</p>

<pre><code class="language-javascript">let obj = {
    a: undefined,
    b: null,
    c: "hodnota"
};

let json = JSON.stringify(obj);
console.log(json);
// Výstup: {"b":null,"c":"hodnota"}
// Vlastnost 'a' s undefined hodnotou je úplně vynechána!</code></pre>

<h2 id="prakticke-pouziti">Praktické použití</h2>

<h3 id="kdy-pouzit-null">Kdy použít <code>null</code></h3>

<ul>
<li><strong>Explicitní absence hodnoty</strong> – když chcete jasně říct, že hodnota neexistuje.</li>
<li><strong>API komunikace</strong> – pro přenos dat na server.</li>
<li><strong>Databasové hodnoty</strong> – když pole v databasi obsahuje <code>null</code>.</li>
<li><strong>Resetování proměnné</strong> – explicitní vymazání hodnoty.</li>
</ul>

<pre><code class="language-javascript">// Explicitní označení absence
let uzivatel = {
    jmeno: "Jan",
    email: null  // Uživatel nemá email
};

// API komunikace
let apiData = {
    name: "Jan",
    email: null,        // Explicitní absence
    phone: null         // Explicitní absence
};

// Resetování cache
let cache = {};
cache.data = "nějaká data";
cache.data = null; // Vymazání cache</code></pre>

<h3 id="kdy-pouzit-undefined">Kdy použít <code>undefined</code></h3>

<ul>
<li><strong>Neinicialisované proměnné</strong> – když proměnná ještě nebyla nastavena.</li>
<li><strong>Volitelné parametry</strong> – když funkce nemá povinný parametr.</li>
<li><strong>Resetování konfigurace</strong> – návrat na výchozí hodnoty.</li>
<li><strong>Neexistující vlastnosti</strong> – když objekt nemá danou vlastnost.</li>
</ul>

<pre><code class="language-javascript">// Neinicialisovaná proměnná
let hodnota;
console.log(hodnota); // undefined

// Volitelný parametr
function pozdrav(jmeno, titul) {
    if (titul === undefined) {
        titul = "pane";
    }
    return `Dobrý den, ${titul} ${jmeno}`;
}

// Reset konfigurace
let config = { theme: "dark" };
config.theme = undefined; // Vrátí na výchozí

// Kontrola existence vlastnosti
let obj = { a: 1 };
if (obj.b === undefined) {
    console.log("Vlastnost b neexistuje");
}</code></pre>

<h3 id="resetovani">Resetování proměnných</h3>

<p>Resetovat proměnné můžete oběma způsoby:</p>

<pre><code class="language-javascript">// Resetování přes null (explicitní)
let promenna = "nějaká hodnota";
promenna = null; // Jasně říká: "vymaž tuto hodnotu"

// Resetování přes undefined (implicitní)
let promenna2 = "nějaká hodnota";
promenna2 = undefined; // Také vymaže, ale méně jasné

// Kontrola po resetování
console.log(promenna == null);  // true (null)
console.log(promenna2 == null); // true (undefined)
console.log(promenna === null); // true
console.log(promenna2 === null); // false</code></pre>

<p><strong>Rozdíl:</strong></p>
<ul>
<li><code>null</code> – jasně říkám, že hodnota neexistuje,</li>
<li><code>undefined</code> – vracím do původního stavu</li>
</ul>

<h2 id="api-komunikace">API komunikace</h2>

<h3 id="proc-undefined-vadi">Proč <code>undefined</code> vadí pro API?</h3>

<p>Používání <code>undefined</code> v API komunikaci způsobuje problémy:</p>

<pre><code class="language-javascript">// undefined se ztratí
let userData = {
    name: "Jan",
    email: undefined  // Bude vynecháno v JSON
};

console.log(JSON.stringify(userData));
// {"name":"Jan"} - email je pryč!

// null se přenese
let apiData = {
    name: "Jan",
    email: null  // Explicitní absence
};

console.log(JSON.stringify(apiData));
// {"name":"Jan","email":null}</code></pre>

<h3 id="prakticke-problemy">Praktické problémy</h3>

<pre><code class="language-javascript">// PATCH operace - smazat email
let patchData = {
    email: undefined  // server neví, co dělat
};
// JSON: {} - prázdný objekt!

let patchData2 = {
    email: null  // server ví, že má smazat email
};
// JSON: {"email":null} - jasný záměr</code></pre>

<h2 id="moderni-pristupy">Moderní přístupy</h2>

<h3 id="nullish-coalescing"><code>Nullish</code> coalescing (??)</h3>

<pre><code class="language-javascript">let hodnota = null ?? "výchozí"; // "výchozí"
let hodnota2 = undefined ?? "výchozí"; // "výchozí"
let hodnota3 = 0 ?? "výchozí"; // 0
let hodnota4 = "" ?? "výchozí"; // ""</code></pre>

<h3 id="optional-chaining">Optional chaining (?.)</h3>

<pre><code class="language-javascript">let uzivatel = {
    adresa: null
};

console.log(uzivatel?.adresa?.ulice); // undefined
console.log(uzivatel?.jmeno); // undefined</code></pre>

<h2 id="typescript">TypeScript</h2>

<p>TypeScript přidává typovou bezpečnost, která může odhalit situace, kdy by člověk chtěl omylem pracovat s <code>null</code> a <code>undefined</code>:</p>

<h3 id="strict-null-checks">Strict null checks</h3>

<p>Hlavní rozdíl je v <code>strictNullChecks</code>:</p>

<pre><code class="language-typescript">// JavaScript - žádné kontroly
let jmeno;
console.log(jmeno.length); // Runtime error: Cannot read property 'length' of undefined

// TypeScript s strictNullChecks - kompilátor chybu odhalí
let jmeno: string;
console.log(jmeno.length); // Compile error: Object is possibly 'undefined'</code></pre>

<h2 id="kontrola-hodnot">Kontrola hodnot</h2>

<p>V praxi není takový rozdíl mezi prací s <code>null</code> a <code>undefined</code>.</p>

<p>Stačí prostá podmínka pro zkontrolování, že je <code>promenna</code> <i>truthy</i>.</p>

<pre><code>if (promenna) {
    // promenna není null/undefined
}</code></pre>

<p>Risiko v tomto kódu ale je, když bude proměnná např. číslo <code>0</code>, prázdný řetězec <code>""</code> nebo <code>false</code>, které se vyhodnotí jako <code>false</code>, i když jsou validní hodnoty.</p>

<p>Pro spolehlivou kontrolu, že je proměnná nastavená, použijte přísné porovnání:</p> 

<pre><code>if (promenna !== null && promenna !== undefined) {
    // promenna není null ani undefined
}</code></pre>

<p>Případně udělat výjimku a použít stručnější zápis:</p>

<pre><code>if (promenna != null) {
    // promenna není null ani undefined
}</code></pre>

<p>Funguje to, protože <code>null == undefined</code> je <code>true</code>.</p>

<h2 id="zaver">Závěr</h2>

<ol>
<li>Používejte <code>null</code> pro explicitní absenci hodnoty.</li>
<li>Nechte <code>undefined</code> pro neinicialisované proměnné.</li>
<li>Používejte přísné porovnání (<code>===</code>).</li>
<li>Využívejte moderní operátory (<code>??</code>, <code>?.</code>).</li>
<li>Buďte konsistentní v rámci projektu.</li>
<li>Pro API komunikaci vždy používejte <code>null</code>.</li>
</ol>
