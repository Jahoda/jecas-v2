---
title: "Rozdíl mezi var a let v JS"
headline: "Rozdíl mezi <code>var</code> a <code>let</code> v JS"
description: "Jaký je v JavaScriptu rozdíl mezi deklarováním proměnných přes <code>var</code> a <code>let</code>."
date: "2020-03-17"
last_modification: "2020-03-30"
status: 1
tags: ["JavaScript", "Rady a nápady"]
---

Proměnné lze v JS používat různým způsobem. Čím se tyto způsoby liší?

## Objekt `window`

```
a = 1;
var b = 2;
let c = 3;
```

Jsou-li proměnné deklarovány takto, jediný rozdíl z pohledu `window` objektu je, že deklarace přes `let` se nedostane do objektu `window`:

```
console.log(window.a); // 1
console.log(window.b); // 2
console.log(window.c); // undefined
```

## Pořadí deklarace

V angličtině se pro to používá termín *hoisting* (šlo by přeložit možná jako zvednutí).

V JS je možné deklarovat proměnné či funkce později v kódu, než je používat:

```
a(); // a

function a() {
    console.log('a')
}
```

Stejně tak proměnné pomocí `var`:

```
a = 1;
console.log(a) // 1
var a;

b = 1;
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b;
```

Proměnné ale nesmí být inicialisované, musí být pouze deklarované (tj. bez přiřazení hodnoty):

```
console.log(a) // undefined
var a = 2;
```

## Scope/closure

Tato dvě anglická slova značí by šla přeložit jako „pole působnosti“ a „uzávěr“.

Lidsky řečeno definují oblasti kódu, kde jsou proměnné dostupné.

```
var a = 1;

function b() {
    console.log(a)    
    var c = 3;
    console.log(c);
}

console.log(c); // ReferenceError: c is not defined
b(); // 1 3
```

V tomto kódu není možné přistupovat k proměnné `c` mimo *scope* funkce `b` – ta tedy **uzavírá rozsah platnosti proměnné** `c`.

Ve funkci `b` je ale možné přistupovat k proměnné `a` (globální scope) i proměnné `c` (scope funkce). Proto zavolání funkce `b` vypíše `1` i `3`.

Deklarace pomocí `let` se v tomto případě chová stejně.

### Function scope / block scope

Zatímco `var` je tzv. *function scope*, deklarace `let` tzv. *block scope*. Co to znamená?

```
var a = 1;
if (a === 1) {
    var a = 2;
    console.log(a); // 2
}
console.log(a); // 2
```

V tomto kódu se v podmínce změní proměnná `a` na hodnotu `2`. Co v případě `let`?

```
let a = 1;
if (a === 1) {
    let a = 2;
    console.log(a); // 2
}
console.log(a); // 1
```

Díky `let` příklad vypíše mimo podmínku původní `1`. Proč?

Složené {závorky} vytvořily blokové scope, čímž se *ochránila* původní proměnná `a`. Díky `let` mohou vedle sebe existovat proměnné stejného názvu, aniž by se ovlivňovaly.

Toto chování u `let` platí i pro ostatní bloky, nemusí jít o podmínku:

```
let a = 1;
{
    let a = 2;
    console.log(a); // 2
}
console.log(a); // 1
```

Na druhou stranu v zanořeném scope je dostupná nadřazená proměnná:

```
let a = 1;
{
    console.log(a); // 1
}
console.log(a); // 1
```

Pokud není v bloku definována proměnná stejného názvu. Následující kód tak skončí chybou kvůli přístupu k proměnné před její deklarací:

```
let a = 1;
{
    console.log(a); // Uncaught ReferenceError: Cannot access 'a' before initialization
    let a;
}
console.log(a);
```

### Cykly

Hodně užitečné je `let` v cyklech:

```
for (var i = 0; i &lt; 5; i++) {
    console.log(i); // 0 1 2 3 4
}
console.log(i); // 5
```

V případě použití `var` tato proměnná „uteče“ mimo cyklus. Bude dostupná i mimo něj.

U `let` je situace jiná:

```
for (let i = 0; i &lt; 5; i++) {
    console.log(i); // 0 1 2 3 4
}
console.log(i); // ReferenceError: i is not defined
```

Na první pohled se může zdát, že je to jedno. Minimalisuje se tím ale risiko, že se nějaká proměnná přepíše někde, kde nemá.

Hodně užitečné to je potom pro případy, kdy se iterátor z cyklu (proměnná `i`) používá v nějaké **asynchronní metodě** jako je třeba `setTimeout`.

```
for (let i = 0; i &lt; 5; i++) {
    setTimeout(function () {
        console.log(i) // 0 1 2 3 4
    },
    100)
}
```

Co by se stalo s `var`? Vypsalo by to pětkrát pětku – [živá ukázka](http://kod.djpw.cz/rkvc).

Proč?

Při spuštění tohoto kódu totiž nejdřív proběhne cyklus, čímž vytvoří globální proměnnou s hodnotou `5`, potom se teprve provede akce v `setTimeout`, takže logicky vypíše pokaždé `5`.

Bez `let` je to **řešitelné obalením do anonymní funkce**, co se rovnou sama zavolá. Tím se kolem vytvoří nový *(function) scope*, podobně jako při použití `let` (tam se vytvoří *block scope*):

```
for (var i = 0; i &lt; 5; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(i)
        },
        100)
    })(i)
}
```

## Podpora v prohlížečích

Používání `let` je docela dobře podporované. Jen v **IE 11** není podpora úplně plná.

Ideální řešení je ale používat novější JS syntaxi a automaticky ji nechat **zkompilovat** třeba nástrojem [Babel](https://babeljs.io) pro starší prohlížeče.

## Závěr

Pokud to jde, osvědčilo se mi používat zásadně `let` a používání `var` mít zakázané v JS lintu.

Omezenější **oblast platnosti proměnných** a nemožnost si je omylem přepisovat bývá výhodnější chování, než je používání `var`.

## Odkazy jinam

    MDN: [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

    MDN: [Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)

    [ES6 variable scopes in loops with closure](https://medium.com/front-end-developers/es6-variable-scopes-in-loops-with-closure-9cde7a198744)

    [Explanation of `let` and block scoping with for loops](https://stackoverflow.com/questions/30899612/explanation-of-let-and-block-scoping-with-for-loops)

    [JavaScript Tutorial — Lexical Environment](https://medium.com/@js_tut/javascript-tutorial-lexical-environment-3ee161bb2295)