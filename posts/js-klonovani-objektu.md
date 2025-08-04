---
title: "Kopírování objektů v JS"
headline: "Kopírování/klonování objektů v JS"
description: "Jak správně a úspěšně zkopírovat objekt v JavaScriptu."
date: "2020-06-08"
last_modification: "2020-10-20"
status: 1
tags: ["JavaScript", "Rady a nápady"]
---

V JS dochází při **kopírování objektů** k trochu odlišné situaci než při kopírování obsahu proměnných.

Je-li cílem zkopírovat obsah proměnné `prvni` do proměnné `druhy`, jde to provést následovně:

```
var prvni = 'hodnota'
var druhy = prvni

druhy = 'jinaHodnota'

console.log(prvni) // hodnota
console.log(druhy) // jinaHodnota
```

[Živá ukázka](http://kod.djpw.cz/yyyc)

Stejným způsob způsobem se může nabízet **zkopírovat/naklonovat objekt**.

```
var prvni = {
    vlastnost: 'hodnota'
}

var druhy = prvni

console.log(prvni) // {"vlastnost":"hodnota"}
console.log(druhy) // {"vlastnost":"hodnota"}
```

Na první pohled to vypadá funkčně. Problém ale nastává, když se změní nějaká vlastnost *zkopírovaného* objektu:

```
var prvni = {
    vlastnost: 'hodnota'
}

var druhy = prvni

**druhy.vlastnost = 'jinaHodnota'**

console.log(prvni) // {"vlastnost":"jinaHodnota"}
console.log(druhy) // {"vlastnost":"jinaHodnota"}
```

[Živá ukázka](http://kod.djpw.cz/bzyc)

Jak je vidět z výstupu [JS konsole](/konsole-varovani), oba objekty jsou stejné. Proč?

Tímto způsobem se **nekopíruje objekt, ale jen se na něj vytváří  reference/odkaz**.

Nepochopení tohoto principu vede ke značným problémům.

## `...Spread` operátor

Řešení je použít tzv. [*spread* operátor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) – tři tečky bezprostředně před názvem proměnné/objektu:

```
var prvni = {
    vlastnost: 'hodnota'
}

var druhy = { **...**prvni }

druhy.vlastnost = 'jinaHodnota'

console.log(prvni) // {"vlastnost":"hodnota"}
console.log(druhy) // {"vlastnost":"jinaHodnota"}
```

[Živá ukázka](http://kod.djpw.cz/xyyc)

Totéž jde zapsat i zkráceně jako:

```
var prvni = {
    vlastnost: 'hodnota'
}

var druhy = { ...prvni, ...{ vlastnost: 'jinaHodnota' } }
```

Tedy při přiřazení rovnou změnit nějakou vlastnost kopírovaného objektu.

Spread operátor (v překladu z angličtiny něco jako rozložit/rozprostřít) byl standardisován až v roce **2018** v ECMAScriptu 2018 (zkráceně označovaném jako ES2018 nebo ES9). Nefunguje tedy ve starších prohlížečích.

Nejen z tohoto důvodu je občas možné vidět věci jako:

```
var druhy = JSON.parse(JSON.stringify(prvni))
```

Funguje to trochu jinak než třítečkový operátor, ale v tomto případě to účel plní stejně. [Živá ukázka](http://kod.djpw.cz/gzyc)

Vzhledem k tomu, že to nejprve převádí objekt na řetězec a následně parsuje zpět na objekt, není to výkonově úplně nejlepší. Spíš nouzové řešení.

Další způsob je použít `Object.assign`. Ten byl standardisován dříve než `...spread` operátor, takže v případě psaní JS kódu, který se už nekompiluje nástrojem typu [Babel](https://babeljs.io), může dávat větší smysl používat toto řešení.

```
var druhy = Object.assign({}, prvni)
```

[Živá ukázka](http://kod.djpw.cz/izyc)

## Hluboké a mělké klonování

Při klonování objektů je třeba rozlišovat tzv. hluboké klonování (*deep clone*) a mělké (*shallow clone*).

Spread operátor `...` dělá právě to mělké.

To se projeví tak, že změna hodnoty o úroveň níž (v příkladu `dalsiVlastnost`) se projeví i u klonovaného objektu.

```
var prvni = {
    vlastnost: 'hodnota',
    dalsiVlastnost: {
        text: 'ahoj'
    }
}

var druhy = { ...prvni }
druhy.vlastnost = 'jinaHodnota'
**druhy.dalsiVlastnost.text = 'fytopuf'**

console.log(prvni) // {"vlastnost":"hodnota","dalsiVlastnost":{**"text":"fytopuf"**}}
console.log(druhy) // {"vlastnost":"jinaHodnota","dalsiVlastnost":{**"text":"fytopuf"**}}
```

[Živá ukázka](http://kod.djpw.cz/jzyc)

Tedy první úroveň je naklonovaná, ale hlouběji už je jen reference na původní objekt.

Mělkou kopii vytváří i konstrukce `Object.assign`.

**Co s tím?**

Asi nejjednodušší řešení bez používání cizích knihoven je již výše zmíněný `JSON.parse(JSON.stringify(objekt))`.

[Živá ukázka](http://kod.djpw.cz/mzyc)

Není to ale z výše popsaných důvodů úplně čisté řešení. Další problém je v tom, že se hodí jen pro **klonování primitivních datových typů** jako je řetězec (*String*), číslo (*Number*) nebo true/false (*Boolean*).

Pokud bude v objektu třeba funkce, tento převod tam a zase zpět nepřežije.

### Knihovny pro deep copy

Jako *best-practice* považuji použít např. funkci [`cloneDeep`](https://lodash.com/docs/4.17.15#cloneDeep) z populární knihovny Lodash:

```
var prvni = {
    vlastnost: 'hodnota',
    dalsiVlastnost: {
        text: 'ahoj'
    }
}

var druhy = **_.cloneDeepWith**(prvni)

druhy.vlastnost = 'jinaHodnota'
druhy.dalsiVlastnost.text = 'fytopuf'

console.log(prvni) // {"vlastnost":"hodnota","dalsiVlastnost":{"text":"ahoj"}}
console.log(druhy) // {"vlastnost":"jinaHodnota","dalsiVlastnost":{"text":"fytopuf"}}

```

[Živá ukázka](http://kod.djpw.cz/qzyc)

I v minulosti populární knihovna **jQuery** má funkci [`extend`](https://api.jquery.com/jquery.extend/), která umí hloubkově klonovat objekty:

```
var druhy = $.extend(true, {}, prvni);
```

[Živá ukázka](http://kod.djpw.cz/szyc)

## Odkazy jinam

Deep Cloning Objects In JavaScript (And How It Works)
  - [Why JSON.parse(JSON.stringify()) is a bad practice to clone an object in JavaScript](https://medium.com/@pmzubar/why-json-parse-json-stringify-is-a-bad-practice-to-clone-an-object-in-javascript-b28ac5e36521)

  Object spread vs. Object.assign

  - [3 Ways to Clone Objects in JavaScript](https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/)

  - [Understanding the JavaScript Spread Operator — Advanced Uses](https://medium.com/better-programming/understanding-the-javascript-spread-operator-from-beginner-to-expert-part-2-1ec1808d015e)