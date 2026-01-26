---
title: "Parsování čísel v JavaScriptu"
headline: "Parsování čísel v JavaScriptu: správně a bezpečně"
description: "Funkce pro práci s čísly <code>parseInt</code>, <code>Number</code>, <code>NaN</code>, doporučení a ukázky."
date: "2025-09-10"
last_modification: "2025-09-10"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Práce s čísly v JavaScriptu přináší velkou porci zábavy. Některé věci se hodí znát pro běžnou praxi. Další jsou spíš kuriosity vhodné k šikanování uchazečů o práci na pohovorech.</p>

<p>Většina zvláštních situací plyne z automatické typové konverse (tzv. <i>type coercion</i>), která často způsobuje, že číslo a řetězec „spolu komunikují“.</p>

<p>Při pokusu o sčítání platí, že pokud je <b>alespoň jeden operand řetězec</b>, dojde ke <b>zřetězení</b>:</p>

<p>Operand je hodnota nebo proměnná, na které operátor provádí svou operaci.</p>

<pre><code>"1" + 2           // "12"
2 + "1"           // "21"
"1" + "2"         // "12"
1 + 2 + "3"       // "33"   (nejprve 1+2=3, pak 3+"3" → "33")
"1" + 2 + 3       // "123"  (nejprve "1"+2 → "12", pak "12"+3 → "123")
</code></pre>

<p>U ostatních operací (<code>-</code>, <code>*</code>, <code>/</code>) se řetězce <b>převádějí na čísla</b>, pokud to jde:</p>

<pre><code>"10" - 1         // 9
"6" * "7"        // 42
"12" / 3         // 4
"foo" * 2        // NaN
</code></pre>

<p>Této skutečnosti je možné využívat i pro převod na čísla, kdy se řetězec vynásobí jedničkou nebo se přidá <code>+</code> před číslo v řetězci.</p>

<pre><code>+"1" + 1       // 2</code></pre>

<h2 id="string">Skoro všechno je string</h2>

<p>Reálné problémy plynoucí z míchání řetězců (<i>string</i>) s čísly (<i>number</i>) vyplývají z toho, že <b>skoro všechno může být řetězec</b>:</p>

<ol>
<li>
<p>Všechny hodnoty zadané do formulářů jsou řetězce. Ani <a href="/input#type-number">číselný <code>&lt;input type="number"&gt;</code></a> není výjimkou.</p></li>
<li>
<p>URL parametry / <a href="/query-string">query string</a> jsou na tom stejně:</p>
<pre><code>const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(typeof id); // "string"</code></pre>
</li>
<li>
<p>I u <a href="/json">JSONu</a> získaného z API je běžnou praxí, že jsou čísla posílána jako řetězce.</p>
<pre><code>const data = JSON.parse('{"age":"42"}');
console.log(typeof data.age); // "string"</code></pre>
</li>
</ol>


<h2 id="soucet">Součet čísel vs. součet řetězců</h2>

<p>Hodnota z <code>&lt;input type="text"></code> je řetězec. Operace <code>x + 5</code> provede <b>zřetězení</b>, nikoliv sčítání.</p>

<div class="live">
  <style>
    .sum-demo { display:grid; gap:.5rem; }
    .sum-demo .grid { display:grid; grid-template-columns:1fr 1fr; gap:.75rem; }
    .sum-demo label { font-weight:600; }
    .sum-demo input[type="text"] { width:100%; padding:.5rem .6rem; border:1px solid #cbd5e1; border-radius:.5rem; }
    .sum-demo .row { display:grid; grid-template-columns:1fr auto; gap:.75rem; align-items:center; }
    .sum-demo code { background:#f3f4f6; padding:.15rem .4rem; border-radius:.35rem; }
    .sum-demo output { font-variant-numeric: tabular-nums; }
  </style>
  <div class="sum-demo">
    <div class="grid">
      <div>
        <label for="sd-a">Vstup z pole (string)</label>
        <input id="sd-a" type="text" value="1" autocomplete="off" spellcheck="false">
      </div>
      <div>
        <label for="sd-b">Druhé sčítané</label>
        <input id="sd-b" type="text" value="5" autocomplete="off" spellcheck="false">
      </div>
    </div>
    <div class="row"><div><code>x + y</code> (řetězení)</div><output id="sd-cat"></output></div>
    <div class="row"><div><code>Number(x) + Number(y)</code></div><output id="sd-num"></output></div>
    <div class="row"><div><code>+x + +y</code></div><output id="sd-plus"></output></div>
    <div class="row"><div><code>parseInt(x, 10) + parseInt(y, 10)</code></div><output id="sd-int"></output></div>
    <div class="row"><div><code>parseFloat(x) + parseFloat(y)</code></div><output id="sd-float"></output></div>
  </div>
  <script>
    (function(){
      var root = document.currentScript && document.currentScript.parentElement;
      if(!root) return;
      var a = root.querySelector('#sd-a');
      var b = root.querySelector('#sd-b');
      var oCat = root.querySelector('#sd-cat');
      var oNum = root.querySelector('#sd-num');
      var oPlus = root.querySelector('#sd-plus');
      var oInt = root.querySelector('#sd-int');
      var oFloat = root.querySelector('#sd-float');
      function update(){
        var x = a.value;
        var y = b.value;
        if(oCat) oCat.textContent = x + y;
        if(oNum) oNum.textContent = String(Number(x) + Number(y));
        if(oPlus) oPlus.textContent = String((+x) + (+y));
        if(oInt) oInt.textContent = String((Number.parseInt(x, 10) || 0) + (Number.parseInt(y, 10) || 0));
        if(oFloat) oFloat.textContent = String((Number.parseFloat(x) || 0) + (Number.parseFloat(y) || 0));
      }
      a.addEventListener('input', update);
      b.addEventListener('input', update);
      update();
    })();
  </script>
</div>


<p>Co s tím?</p>
<h3 id="number"><code>Number</code></h3>



<p>Obecně typicky stačí převést takový vstup pomocí <code>Number</code>:</p>

<pre><code>const age = Number(document.querySelector('#age')?.value ?? '')
const id = Number(new URLSearchParams(location.search).get('id') ?? '')
const data = JSON.parse('{"age":"42","items":[{"qty":"3"},{"qty":"5"}]}')
const age2 = Number(data.age)</code></pre>

<p>A zde začíná další zábava. Datům od uživatele není dobré věřit. Aplikace by si měla poradit s každým vstupem.</p>

<p>Funkce <code>Number</code> je relativně přísná. Poradí si s bílými znaky okolo čísla (to může být i nezalomitelná mezera, takže <code>Number("\u00A042")</code> nebo <code>Number("42\u00A0")</code> je v pořádku). Prázdný řetězec nebo <code>null</code> převede na <code>0</code>, jinak je výsledkem NaN (<i>not a number</i>):</p>

<pre><code>Number(" 42 ")          // 42
Number("")              // 0
Number("   ")           // 0
Number(null)            // 0
Number(undefined)       // NaN
Number("42px")          // NaN
Number("\n\t3.14 ")     // 3.14
Number("42e4")          // 420000
Number("0xFF")          // 255
Number("0b1010")        // 10
Number("0o17")          // 15</code></pre>

<p>Funkce <code>Number</code> převede na číslo i zápisy s exponentem (<code>42e4</code>). Stejně tak si podle prefixu dokáže zvolit jinou číselnou soustavu – šestnáctkovou/hexadecimální (prefix 0x), dvojkovou/binární (0b) nebo osmičkovou/oktalovou (0o).</p>

<h3 id="parse"><code>parseFloat</code>/<code>parseInt</code></h3>

<p>Pro trochu tolerantnější přístup k číslům jde použít <code>parseFloat</code>/<code>parseInt</code> (pro parsování čísla s desetinnou čárkou nebo celého).</p>

<p>Hlavní rozdíl je v tom, že tyto funkce dokáží odstranit nepořádek na konci čísla. Takže třeba v pohodě odstranit jednotky:</p>

<pre><code>parseInt("42px", 10)       // 42
parseFloat("3.14em")       // 3.14
parseFloat("1.2e3ms")      // 1200
parseInt("08", 10)         // 8
parseInt("0x10", 16)       // 16
parseInt("0x10", 10)       // 0
</code></pre>

<p>Další specialita je možnost zvolit číselnou soustavu, ve které se má číslo parsovat. To je považováno za doporučený postup, protože bez jejího uvedení se ji může prohlížeč pokusit hádat. Zvlášť historicky to způsobovalo nekonsistentní situace.</p>

<pre><code>parseInt("1010", 2)    // 10
parseInt("ff", 16)     // 255
parseInt("z", 36)      // 35
parseInt("08")         // 8 nebo 0 (historicky), proto vždy parseInt(s, 10)
</code></pre>


<div class="live">
  <style>
    .parse-demo { display:grid; gap:.5rem; align-items:center; }
    .parse-demo label { display:block; font-weight:600; }
    .parse-demo input[type="text"] { width:100%; max-width:420px; padding:.5rem .6rem; border:1px solid #cbd5e1; border-radius:.5rem; }
    .parse-demo .row { display:grid; grid-template-columns:1fr auto; gap:.75rem; align-items:center; }
    .parse-demo code { background:#f3f4f6; padding:.15rem .4rem; border-radius:.35rem; }
    .parse-demo output { font-variant-numeric: tabular-nums; }
  </style>
  <div class="parse-demo">
    <div>
      <label for="pd-in">Vstup</label>
      <input id="pd-in" type="text" value="42px" autocomplete="off" spellcheck="false">
    </div>
    <div class="row"><div><code>Number(x)</code></div><output id="pd-number"></output></div>
    <div class="row"><div><code>+x</code></div><output id="pd-plus"></output></div>
    <div class="row"><div><code>parseInt(x, 10)</code></div><output id="pd-int"></output></div>
    <div class="row"><div><code>parseFloat(x)</code></div><output id="pd-float"></output></div>
    <div class="row"><div><code>Number.isFinite(Number(x))</code></div><output id="pd-finite"></output></div>
    <div class="row"><div><code>Number.isNaN(Number(x))</code></div><output id="pd-nan"></output></div>
  </div>
  <script>
    (function(){
      var root = document.currentScript && document.currentScript.parentElement;
      if(!root) return;
      var input = root.querySelector('#pd-in');
      var outNumber = root.querySelector('#pd-number');
      var outPlus = root.querySelector('#pd-plus');
      var outInt = root.querySelector('#pd-int');
      var outFloat = root.querySelector('#pd-float');
      var outFinite = root.querySelector('#pd-finite');
      var outNaN = root.querySelector('#pd-nan');
      function update(){
        var v = input.value;
        var n = Number(v);
        var p = +v;
        var i = Number.parseInt(v, 10);
        var f = Number.parseFloat(v);
        if(outNumber) outNumber.textContent = String(n);
        if(outPlus) outPlus.textContent = String(p);
        if(outInt) outInt.textContent = String(i);
        if(outFloat) outFloat.textContent = String(f);
        if(outFinite) outFinite.textContent = String(Number.isFinite(n));
        if(outNaN) outNaN.textContent = String(Number.isNaN(n));
      }
      input.addEventListener('input', update);
      update();
    })();
  </script>
</div>


<h3 id="radix">Číselná soustava (radix)</h3>

<p><b>Radix</b> je základ číselné soustavy. <code>parseInt(text, radix)</code> říká, v jaké soustavě se má řetězec číst. <b>10</b> je desítková, <b>2</b> binární, <b>16</b> šestnáctková; povolený rozsah je <b>2…36</b>. Znaky <code>a</code> až <code>z</code> představují hodnoty 10 až 35 a nerozlišují velikost písmen. Funkce čte zleva a zastaví se na prvním nepovoleném znaku.</p>

<pre><code>parseInt("1010", 2)     // 10
parseInt("ff", 16)      // 255
(255).toString(16)      // "ff"
parseInt("08", 10)      // 8
</code></pre>

<div class="live">
  <style>
    .radix-demo { display:grid; gap:.75rem; }
    .radix-demo .grid { display:grid; grid-template-columns:1fr 1fr; gap:.75rem; }
    .radix-demo label { font-weight:600; }
    .radix-demo input[type="text"], .radix-demo input[type="number"], .radix-demo select { width:100%; padding:.5rem .6rem; border:1px solid #cbd5e1; border-radius:.5rem; }
    .radix-demo .row { display:grid; grid-template-columns:1fr auto; gap:.75rem; align-items:center; }
    .radix-demo code { background:#f3f4f6; padding:.15rem .4rem; border-radius:.35rem; }
    .radix-demo output { font-variant-numeric: tabular-nums; }
  </style>
  <div class="radix-demo">
    <div class="grid">
      <div>
        <label for="rx-str">Řetězec</label>
        <input id="rx-str" type="text" value="ff" autocomplete="off" spellcheck="false">
      </div>
      <div>
        <label for="rx-base">Radix</label>
        <select id="rx-base"></select>
      </div>
    </div>
    <div class="row"><div><code>parseInt(s, base)</code></div><output id="rx-parse"></output></div>
    <div class="row"><div><code>platné znaky</code></div><output id="rx-valid"></output></div>
    <div class="grid">
      <div>
        <label for="rx-dec">Decimální číslo</label>
        <input id="rx-dec" type="number" step="1" value="255">
      </div>
      <div>
        <label for="rx-base2">Radix</label>
        <select id="rx-base2"></select>
      </div>
    </div>
    <div class="row"><div><code>n.toString(base)</code></div><output id="rx-to"></output></div>
  </div>
  <script>
    (function(){
      var root = document.currentScript && document.currentScript.parentElement;
      if(!root) return;
      var sEl = root.querySelector('#rx-str');
      var bEl = root.querySelector('#rx-base');
      var oParse = root.querySelector('#rx-parse');
      var oValid = root.querySelector('#rx-valid');
      var dEl = root.querySelector('#rx-dec');
      var b2El = root.querySelector('#rx-base2');
      var oTo = root.querySelector('#rx-to');
      function fillSelect(sel){
        for(var i=2;i<=36;i++){ var opt=document.createElement('option'); opt.value=String(i); opt.textContent=String(i); sel.appendChild(opt); }
      }
      fillSelect(bEl); fillSelect(b2El);
      bEl.value = '16';
      b2El.value = '16';
      function validChars(base){
        var digits = '0123456789abcdefghijklmnopqrstuvwxyz'.slice(0, base);
        return digits;
      }
      function updateParse(){
        var s = sEl.value.trim();
        var base = Number(bEl.value||10);
        var n = Number.parseInt(s, base);
        if(oParse) oParse.textContent = String(n);
        if(oValid) oValid.textContent = validChars(base);
      }
      function updateTo(){
        var n = Number(dEl.value||0);
        var base = Number(b2El.value||10);
        var out = (n>=0 ? n : -n).toString(base);
        if(n<0) out = '-' + out;
        if(oTo) oTo.textContent = out;
      }
      sEl.addEventListener('input', updateParse);
      bEl.addEventListener('change', updateParse);
      dEl.addEventListener('input', updateTo);
      b2El.addEventListener('change', updateTo);
      updateParse(); updateTo();
    })();
  </script>
</div>

<h2 id="validace">Validace čísel</h2>

<p>Z různých specifik čísel jako je možnost zadat exponent nebo použít různé číselné soustavy plyne, že prostá validace, jestli je vstup od uživatele číslo, nemusí být dostatečná.</p>

<p>Je tak potřeba zvolit pro konkrétní případ, jestli přijímat zápisy s exponentem, zápisy v jiné číselné soustavě nebo třeba nekonečno <code>Infinity</code>.</p>

<p>K úvaze je i použití serialisace místo validace, kdy se neplatné znaky ve vstupu ignorují a algoritmus se snaží pochopit, co chtěl člověk zadat.</p>

<p>Zde může být typicky problém s oddělovači tisíců nebo desetinných míst.</p>





<h2 id="lokalisace">Lokalisovaná čísla: čárka a mezery</h2>

<p>JavaScript parsuje desetinnou <b>tečku</b>. Vstup jako <code>"1 234,56"</code> je potřeba převést na <code>"1234.56"</code>. Zároveň je vhodné odstranit různé druhy mezer v tisících (<code>NBSP</code>, <code>narrow NBSP</code>, běžná mezera).</p>

<pre><code>function parseCzDecimal(input) {
  const raw = String(input)
  const withoutSpaces = raw.replace(/[\u00A0\u202F\s]/g, "")
  const unified = withoutSpaces.replace(",", ".")
  return toNumberStrict(unified)
}

parseCzDecimal("1 234,56")   // 1234.56
parseCzDecimal("12,0")       // 12
parseCzDecimal("12 345")     // 12345
</code></pre>

<p>Udělat políčko tolerantní k českému číslu by šlo tímto způsobem.</p>

<div class="live">
  <style>
    .cz-demo { display:grid; gap:.5rem; }
    .cz-demo label { font-weight:600; }
    .cz-demo input[type="text"] { width:100%; max-width:420px; padding:.5rem .6rem; border:1px solid #cbd5e1; border-radius:.5rem; }
    .cz-demo .row { display:grid; grid-template-columns:1fr auto; gap:.75rem; align-items:center; }
    .cz-demo code { background:#f3f4f6; padding:.15rem .4rem; border-radius:.35rem; }
    .cz-demo output { font-variant-numeric: tabular-nums; }
  </style>
  <div class="cz-demo">
    <div>
      <label for="cz-in">Lokalisovaný vstup</label>
      <input id="cz-in" type="text" value="1 234,56" autocomplete="off" spellcheck="false">
    </div>
    <div class="row"><div><code>Bez mezer</code></div><output id="cz-nospace"></output></div>
    <div class="row"><div><code>Tečka místo čárky</code></div><output id="cz-dot"></output></div>
    <div class="row"><div><code>Number(...)</code></div><output id="cz-number"></output></div>
    <div class="row"><div><code>Validní tvar</code></div><output id="cz-valid"></output></div>
  </div>
  <script>
    (function(){
      var root = document.currentScript && document.currentScript.parentElement;
      if(!root) return;
      var input = root.querySelector('#cz-in');
      var outNoSpace = root.querySelector('#cz-nospace');
      var outDot = root.querySelector('#cz-dot');
      var outNumber = root.querySelector('#cz-number');
      var outValid = root.querySelector('#cz-valid');
      function normalizeSpaces(s){ return String(s).replace(/[\u00A0\u202F\s]/g, ""); }
      function unifyDecimal(s){ return s.replace(",", "."); }
      function isStrictNumber(s){ return /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(s); }
      function update(){
        var v = input.value;
        var noSpace = normalizeSpaces(v);
        var dot = unifyDecimal(noSpace);
        var valid = isStrictNumber(dot);
        var n = valid ? Number(dot) : NaN;
        if(outNoSpace) outNoSpace.textContent = noSpace;
        if(outDot) outDot.textContent = dot;
        if(outNumber) outNumber.textContent = String(n);
        if(outValid) outValid.textContent = String(valid);
      }
      input.addEventListener('input', update);
      update();
    })();
  </script>
</div>

<p>K úvaze je, jestli není validace až moc přísná, že si neporadí naopak s anglickým formátem <code>1,234.56</code>. Je potřeba to dobře vyzkoušet pro konkrétní případ.</p>


<h2 id="edge">Okrajové hodnoty a další typy</h2>

<ul>
  <li><b>Number("")</b> → 0, <b>Number(null)</b> → 0, <b>Number(undefined)</b> → NaN.</li>
  <li><b>parseInt/parseFloat</b>: <code>parseInt("")</code>, <code>parseInt(null)</code>, <code>parseInt(undefined)</code> → NaN (protože <code>""</code>, <code>"null"</code>, <code>"undefined"</code> nejsou čísla).</li>
  <li><b>+x</b>: chová se jako <code>Number(x)</code>.</li>
  <li><b>Boolean("")</b> → false, <b>Boolean(null)</b> → false, <b>Boolean(undefined)</b> → false.</li>
  <li><b>Boolean</b>: <code>Number(true) → 1</code>, <code>Number(false) → 0</code>.</li>
  <li><b>Pole</b>: <code>[] → "" → 0</code>, <code>[1] → "1" → 1</code>, <code>[1,2] → "1,2" → NaN</code>.</li>
  <li><b>Objekt</b>: <code>{} → "[object Object]" → NaN</code>.</li>
  <li><b>Symbol</b>: <code>Number(Symbol())</code> a <code>parseInt(Symbol())</code> vyhodí <b>TypeError</b>.</li>
  <li><b>BigInt</b>: <code>Number(10n) → 10</code>, pozor na přesnost u velkých hodnot.</li>
  
</ul>

<div class="live">
  <style>
    .edge-demo { display:grid; gap:.5rem; }
    .edge-demo .row { display:grid; grid-template-columns:1fr auto; gap:.75rem; align-items:center; }
    .edge-demo select { width:100%; max-width:420px; padding:.5rem .6rem; border:1px solid #cbd5e1; border-radius:.5rem; }
    .edge-demo code { background:#f3f4f6; padding:.15rem .4rem; border-radius:.35rem; }
    .edge-demo output { font-variant-numeric: tabular-nums; }
  </style>
  <div class="edge-demo">
    <label for="edge-val">Hodnota</label>
    <select id="edge-val">
      <option value="empty">""</option>
      <option value="null">null</option>
      <option value="undefined">undefined</option>
      <option value="true">true</option>
      <option value="false">false</option>
      <option value="arr-empty">[]</option>
      <option value="arr-one">[1]</option>
      <option value="arr-two">[1,2]</option>
      <option value="obj">{}</option>
      <option value="sym">Symbol()</option>
      <option value="big-10">10n</option>
    </select>
    <div class="row"><div><code>typeof x</code></div><output id="e-type"></output></div>
    <div class="row"><div><code>String(x)</code></div><output id="e-str"></output></div>
    <div class="row"><div><code>Number(x)</code></div><output id="e-num"></output></div>
    <div class="row"><div><code>+x</code></div><output id="e-plus"></output></div>
    <div class="row"><div><code>parseInt(x, 10)</code></div><output id="e-int"></output></div>
    <div class="row"><div><code>parseFloat(x)</code></div><output id="e-float"></output></div>
    <div class="row"><div><code>Boolean(x)</code></div><output id="e-bool"></output></div>
  </div>
  <script>
    (function(){
      var root = document.currentScript && document.currentScript.parentElement;
      if(!root) return;
      var sel = root.querySelector('#edge-val');
      var oType = root.querySelector('#e-type');
      var oStr = root.querySelector('#e-str');
      var oNum = root.querySelector('#e-num');
      var oPlus = root.querySelector('#e-plus');
      var oInt = root.querySelector('#e-int');
      var oFloat = root.querySelector('#e-float');
      var oBool = root.querySelector('#e-bool');
      var sym = Symbol();
      var big10 = 10n;
      function getValue(k){
        switch(k){
          case 'empty': return "";
          case 'null': return null;
          case 'undefined': return void 0;
          case 'true': return true;
          case 'false': return false;
          case 'arr-empty': return [];
          case 'arr-one': return [1];
          case 'arr-two': return [1,2];
          case 'obj': return {};
          case 'sym': return sym;
          case 'big-10': return big10;
        }
        return void 0;
      }
      function update(){
        var x = getValue(sel.value);
        if(oType) oType.textContent = typeof x;
        if(oStr) oStr.textContent = String(x);
        if(oNum) oNum.textContent = String(Number(x));
        if(oPlus) oPlus.textContent = String(+x);
        if(oInt) oInt.textContent = String(Number.parseInt(x, 10));
        if(oFloat) oFloat.textContent = String(Number.parseFloat(x));
        if(oBool) oBool.textContent = String(Boolean(x));
      }
      sel.addEventListener('change', update);
      update();
    })();
  </script>
</div>




<h2 id="doporuceni">Doporučení</h2>

<ul>
  <li>Chcete‑li zvalidovat, že <b>celý</b> vstup je číslo, použijte <code>Number</code> a <code>Number.isFinite</code>.</li>
  <li>Potřebujete‑li číslo vyčíst z <b>počátku</b> textu (např. <code>"42px"</code>), použijte <code>parseInt(x, 10)</code> nebo <code>parseFloat</code>.</li>
  <li>Vždy předejte <code>radix</code> (číselnou soustavu) do <code>parseInt</code>: <code>parseInt(s, 10)</code>.</li>
  <li>Pro lokální formáty (<b>1 234,56</b>) nejprve vstup normalisujte (mezery, <b>NBSP</b>, čárka → tečka) a pak použijte přísnou konversi.</li>
</ul>