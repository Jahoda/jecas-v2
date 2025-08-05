---
title: "Rozdíl mezi var a let v JS"
headline: "Rozdíl mezi <code>var</code> a <code>let</code> v JS"
description: "Jaký je v JavaScriptu rozdíl mezi deklarováním proměnných přes <code>var</code> a <code>let</code>."
date: "2020-03-17"
last_modification: "2020-03-30"
status: 1
tags: ["js", "napady"]
format: "html"
---

<p>Proměnné lze v JS používat různým způsobem. Čím se tyto způsoby liší?</p>

<h2 id="window">Objekt <code>window</code></h2>

<pre><code>a = 1;
var b = 2;
let c = 3;</code></pre>




<p>Jsou-li proměnné deklarovány takto, jediný rozdíl z pohledu <code>window</code> objektu je, že deklarace přes <code>let</code> se nedostane do objektu <code>window</code>:</p>


<pre><code>console.log(window.a); // 1
console.log(window.b); // 2
console.log(window.c); // undefined</code></pre>









<h2 id="hoisting">Pořadí deklarace</h2>

<p>V angličtině se pro to používá termín <i lang="en">hoisting</i> (šlo by přeložit možná jako zvednutí).</p>

<p>V JS je možné deklarovat proměnné či funkce později v kódu, než je používat:</p>

<pre><code>a(); // a

function a() {
    console.log('a')
}</code></pre>







<p>Stejně tak proměnné pomocí <code>var</code>:</p>

<pre><code>a = 1;
console.log(a) // 1
var a;

b = 1;
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b;</code></pre>











<p>Proměnné ale nesmí být inicialisované, musí být pouze deklarované (tj. bez přiřazení hodnoty):</p>

<pre><code>console.log(a) // undefined
var a = 2;</code></pre>






<h2 id="scope">Scope/closure</h2>

<p>Tato dvě anglická slova značí by šla přeložit jako „pole působnosti“ a „uzávěr“.</p>

<p>Lidsky řečeno definují oblasti kódu, kde jsou proměnné dostupné.</p>

<pre><code>var a = 1;

function b() {
    console.log(a)    
    var c = 3;
    console.log(c);
}

console.log(c); // ReferenceError: c is not defined
b(); // 1 3</code></pre>










<p>V tomto kódu není možné přistupovat k proměnné <code>c</code> mimo <i>scope</i> funkce <code>b</code> – ta tedy <b>uzavírá rozsah platnosti proměnné</b> <code>c</code>.</p>

<p>Ve funkci <code>b</code> je ale možné přistupovat k proměnné <code>a</code> (globální scope) i proměnné <code>c</code> (scope funkce). Proto zavolání funkce <code>b</code> vypíše <code>1</code> i <code>3</code>.</p>

<p>Deklarace pomocí <code>let</code> se v tomto případě chová stejně.</p>


<h3 id="function-block">Function scope / block scope</h3>

<p>Zatímco <code>var</code> je tzv. <i>function scope</i>, deklarace <code>let</code> tzv. <i>block scope</i>. Co to znamená?</p>


<pre><code>var a = 1;
if (a === 1) {
    var a = 2;
    console.log(a); // 2
}
console.log(a); // 2</code></pre>







<p>V tomto kódu se v podmínce změní proměnná <code>a</code> na hodnotu <code>2</code>. Co v případě <code>let</code>?</p>


<pre><code>let a = 1;
if (a === 1) {
    let a = 2;
    console.log(a); // 2
}
console.log(a); // 1</code></pre>







<p>Díky <code>let</code> příklad vypíše mimo podmínku původní <code>1</code>. Proč?</p>

<p>Složené {závorky} vytvořily blokové scope, čímž se <i>ochránila</i> původní proměnná <code>a</code>. Díky <code>let</code> mohou vedle sebe existovat proměnné stejného názvu, aniž by se ovlivňovaly.</p>

<p>Toto chování u <code>let</code> platí i pro ostatní bloky, nemusí jít o podmínku:</p>

<pre><code>let a = 1;
{
    let a = 2;
    console.log(a); // 2
}
console.log(a); // 1</code></pre>









<p>Na druhou stranu v zanořeném scope je dostupná nadřazená proměnná:</p>

<pre><code>let a = 1;
{
    console.log(a); // 1
}
console.log(a); // 1</code></pre>






<p>Pokud není v bloku definována proměnná stejného názvu. Následující kód tak skončí chybou kvůli přístupu k proměnné před její deklarací:</p>

<pre><code>let a = 1;
{
    console.log(a); // Uncaught ReferenceError: Cannot access 'a' before initialization
    let a;
}
console.log(a);</code></pre>









<h3 id="cykly">Cykly</h3>

<p>Hodně užitečné je <code>let</code> v cyklech:</p>

<pre><code>for (var i = 0; i &lt; 5; i++) {
    console.log(i); // 0 1 2 3 4
}
console.log(i); // 5</code></pre>









<p>V případě použití <code>var</code> tato proměnná „uteče“ mimo cyklus. Bude dostupná i mimo něj.</p>

<p>U <code>let</code> je situace jiná:</p>

<pre><code>for (let i = 0; i &lt; 5; i++) {
    console.log(i); // 0 1 2 3 4
}
console.log(i); // ReferenceError: i is not defined</code></pre>







<p>Na první pohled se může zdát, že je to jedno. Minimalisuje se tím ale risiko, že se nějaká proměnná přepíše někde, kde nemá.</p>

<p>Hodně užitečné to je potom pro případy, kdy se iterátor z cyklu (proměnná <code>i</code>) používá v nějaké <b>asynchronní metodě</b> jako je třeba <code>setTimeout</code>.</p>

<pre><code>for (let i = 0; i &lt; 5; i++) {
    setTimeout(function () {
        console.log(i) // 0 1 2 3 4
    },
    100)
}</code></pre>









<p>Co by se stalo s <code>var</code>? Vypsalo by to pětkrát pětku – <a href="http://kod.djpw.cz/rkvc">živá ukázka</a>.</p>

<p>Proč?</p>

<p>Při spuštění tohoto kódu totiž nejdřív proběhne cyklus, čímž vytvoří globální proměnnou s hodnotou <code>5</code>, potom se teprve provede akce v <code>setTimeout</code>, takže logicky vypíše pokaždé <code>5</code>.</p>

<p>Bez <code>let</code> je to <b>řešitelné obalením do anonymní funkce</b>, co se rovnou sama zavolá. Tím se kolem vytvoří nový <i>(function) scope</i>, podobně jako při použití <code>let</code> (tam se vytvoří <i>block scope</i>):</p>

<pre><code>for (var i = 0; i &lt; 5; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(i)
        },
        100)
    })(i)
}</code></pre>










<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Používání <code>let</code> je docela dobře podporované. Jen v <b>IE 11</b> není podpora úplně plná.</p>

<p>Ideální řešení je ale používat novější JS syntaxi a automaticky ji nechat <b>zkompilovat</b> třeba nástrojem <a href="https://babeljs.io">Babel</a> pro starší prohlížeče.</p>



<h2 id="zaver">Závěr</h2>

<p>Pokud to jde, osvědčilo se mi používat zásadně <code>let</code> a používání <code>var</code> mít zakázané v JS lintu.</p>

<p>Omezenější <b>oblast platnosti proměnných</b> a nemožnost si je omylem přepisovat bývá výhodnější chování, než je používání <code>var</code>.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>
    MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let"><code>let</code></a>
  </li>
  <li>
    MDN: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting">Hoisting</a>
  </li>
  <li>
    <a href="https://medium.com/front-end-developers/es6-variable-scopes-in-loops-with-closure-9cde7a198744">ES6 variable scopes in loops with closure</a>
  </li>
  <li>
    <a href="https://stackoverflow.com/questions/30899612/explanation-of-let-and-block-scoping-with-for-loops">Explanation of `let` and block scoping with for loops</a>
  </li>
  <li>
    <a href="https://medium.com/@js_tut/javascript-tutorial-lexical-environment-3ee161bb2295">JavaScript Tutorial — Lexical Environment</a>
  </li>
</ul>