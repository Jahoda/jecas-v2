---
title: "Kopírování objektů v JS"
headline: "Kopírování/klonování objektů v JS"
description: "Jak správně a úspěšně zkopírovat objekt v JavaScriptu."
date: "2020-06-08"
last_modification: "2020-10-20"
status: 1
tags: ["js", "napady"]
format: "html"
---

<p>V JS dochází při <b>kopírování objektů</b> k trochu odlišné situaci než při kopírování obsahu proměnných.</p>

<p>Je-li cílem zkopírovat obsah proměnné <code>prvni</code> do proměnné <code>druhy</code>, jde to provést následovně:</p>

<pre><code>var prvni = 'hodnota'
var druhy = prvni

druhy = 'jinaHodnota'

console.log(prvni) // hodnota
console.log(druhy) // jinaHodnota</code></pre>

<p><a href="https://kod.djpw.cz/yyyc">Živá ukázka</a></p>




<p>Stejným způsob způsobem se může nabízet <b>zkopírovat/naklonovat objekt</b>.</p>

<pre><code>var prvni = {
    vlastnost: 'hodnota'
}

var druhy = prvni

console.log(prvni) // {"vlastnost":"hodnota"}
console.log(druhy) // {"vlastnost":"hodnota"}</code></pre>






<p>Na první pohled to vypadá funkčně. Problém ale nastává, když se změní nějaká vlastnost <i>zkopírovaného</i> objektu:</p>


<pre><code>var prvni = {
    vlastnost: 'hodnota'
}

var druhy = prvni

<b>druhy.vlastnost = 'jinaHodnota'</b>

console.log(prvni) // {"vlastnost":"jinaHodnota"}
console.log(druhy) // {"vlastnost":"jinaHodnota"}</code></pre>


















<p><a href="https://kod.djpw.cz/bzyc">Živá ukázka</a></p>

<p>Jak je vidět z výstupu <a href="/konsole-varovani">JS konsole</a>, oba objekty jsou stejné. Proč?</p>

<p>Tímto způsobem se <b>nekopíruje objekt, ale jen se na něj vytváří  reference/odkaz</b>.</p>

<p>Nepochopení tohoto principu vede ke značným problémům.</p>


<h2 id="spread"><code>...Spread</code> operátor</h2>
<p>Řešení je použít tzv. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"><i>spread</i> operátor</a> – tři tečky bezprostředně před názvem proměnné/objektu:</p>

<pre><code>var prvni = {
    vlastnost: 'hodnota'
}

var druhy = { <b>...</b>prvni }

druhy.vlastnost = 'jinaHodnota'

console.log(prvni) // {"vlastnost":"hodnota"}
console.log(druhy) // {"vlastnost":"jinaHodnota"}</code></pre>

<p><a href="https://kod.djpw.cz/xyyc">Živá ukázka</a></p>








<p>Totéž jde zapsat i zkráceně jako:</p>

<pre><code>var prvni = {
    vlastnost: 'hodnota'
}

var druhy = { ...prvni, ...{ vlastnost: 'jinaHodnota' } }</code></pre>

<p>Tedy při přiřazení rovnou změnit nějakou vlastnost kopírovaného objektu.</p>










<p>Spread operátor (v překladu z angličtiny něco jako rozložit/rozprostřít) byl standardisován až v roce <b>2018</b> v ECMAScriptu 2018 (zkráceně označovaném jako ES2018 nebo ES9). Nefunguje tedy ve starších prohlížečích.</p>

<p>Nejen z tohoto důvodu je občas možné vidět věci jako:</p>

<pre><code>var druhy = JSON.parse(JSON.stringify(prvni))</code></pre>


<p>Funguje to trochu jinak než třítečkový operátor, ale v tomto případě to účel plní stejně. <a href="https://kod.djpw.cz/gzyc">Živá ukázka</a></p>

<p>Vzhledem k tomu, že to nejprve převádí objekt na řetězec a následně parsuje zpět na objekt, není to výkonově úplně nejlepší. Spíš nouzové řešení.</p>


<p>Další způsob je použít <code>Object.assign</code>. Ten byl standardisován dříve než <code>...spread</code> operátor, takže v případě psaní JS kódu, který se už nekompiluje nástrojem typu <a href="https://babeljs.io">Babel</a>, může dávat větší smysl používat toto řešení.</p>

<pre><code>var druhy = Object.assign({}, prvni)</code></pre>

<p><a href="https://kod.djpw.cz/izyc">Živá ukázka</a></p>









<h2 id="deep">Hluboké a mělké klonování</h2>

<p>Při klonování objektů je třeba rozlišovat tzv. hluboké klonování (<i>deep clone</i>) a mělké (<i>shallow clone</i>).</p>

<p>Spread operátor <code>...</code> dělá právě to mělké.</p>

<p>To se projeví tak, že změna hodnoty o úroveň níž (v příkladu <code>dalsiVlastnost</code>) se projeví i u klonovaného objektu.</p>

<pre><code>var prvni = {
    vlastnost: 'hodnota',
    dalsiVlastnost: {
        text: 'ahoj'
    }
}

var druhy = { ...prvni }
druhy.vlastnost = 'jinaHodnota'
<b>druhy.dalsiVlastnost.text = 'fytopuf'</b>

console.log(prvni) // {"vlastnost":"hodnota","dalsiVlastnost":{<b>"text":"fytopuf"</b>}}
console.log(druhy) // {"vlastnost":"jinaHodnota","dalsiVlastnost":{<b>"text":"fytopuf"</b>}}</code></pre>

<p><a href="https://kod.djpw.cz/jzyc">Živá ukázka</a></p>




















<p>Tedy první úroveň je naklonovaná, ale hlouběji už je jen reference na původní objekt.</p>

<p>Mělkou kopii vytváří i konstrukce <code>Object.assign</code>.</p>

<p><b>Co s tím?</b></p>

<p>Asi nejjednodušší řešení bez používání cizích knihoven je již výše zmíněný <code>JSON.parse(JSON.stringify(objekt))</code>.</p>

<p><a href="https://kod.djpw.cz/mzyc">Živá ukázka</a></p>





<p>Není to ale z výše popsaných důvodů úplně čisté řešení. Další problém je v tom, že se hodí jen pro <b>klonování primitivních datových typů</b> jako je řetězec (<i>String</i>), číslo (<i>Number</i>) nebo true/false (<i>Boolean</i>).</p>

<p>Pokud bude v objektu třeba funkce, tento převod tam a zase zpět nepřežije.</p>



<h3 id="knihovny">Knihovny pro deep copy</h3>

<p>Jako <i>best-practice</i> považuji použít např. funkci <a href="https://lodash.com/docs/4.17.15#cloneDeep"><code>cloneDeep</code></a> z populární knihovny Lodash:</p>

<pre><code>var prvni = {
    vlastnost: 'hodnota',
    dalsiVlastnost: {
        text: 'ahoj'
    }
}

var druhy = <b>_.cloneDeepWith</b>(prvni)

druhy.vlastnost = 'jinaHodnota'
druhy.dalsiVlastnost.text = 'fytopuf'

console.log(prvni) // {"vlastnost":"hodnota","dalsiVlastnost":{"text":"ahoj"}}
console.log(druhy) // {"vlastnost":"jinaHodnota","dalsiVlastnost":{"text":"fytopuf"}}
</code></pre>

<p><a href="https://kod.djpw.cz/qzyc">Živá ukázka</a></p>
















<p>I v minulosti populární knihovna <b>jQuery</b> má funkci <a href="https://api.jquery.com/jquery.extend/"><code>extend</code></a>, která umí hloubkově klonovat objekty:</p>

<pre><code>var druhy = $.extend(true, {}, prvni);</code></pre>


<p><a href="https://kod.djpw.cz/szyc">Živá ukázka</a></p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://www.digitalocean.com/community/tutorials/js-deep-cloning-javascript-objects">
Deep Cloning Objects In JavaScript (And How It Works)</a></li>
  <li><a href="https://medium.com/@pmzubar/why-json-parse-json-stringify-is-a-bad-practice-to-clone-an-object-in-javascript-b28ac5e36521">Why JSON.parse(JSON.stringify()) is a bad practice to clone an object in JavaScript</a></li>
  <li><a href="https://stackoverflow.com/questions/32925460/object-spread-vs-object-assign">Object spread vs. Object.assign
</a></li>
  <li><a href="https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/">3 Ways to Clone Objects in JavaScript</a></li>
  <li><a href="https://medium.com/better-programming/understanding-the-javascript-spread-operator-from-beginner-to-expert-part-2-1ec1808d015e">Understanding the JavaScript Spread Operator — Advanced Uses</a></li>
</ul>