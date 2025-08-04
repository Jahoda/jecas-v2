---
title: "Node.js a NPM"
headline: "Node.js a NPM"
description: "K čemu se hodí Node.js na frontendu a jak ho začít používat."
date: "2017-10-10"
last_modification: "2017-10-10"
status: 0
tags: []
---

## Různé verse Node.js

Při práci na různě starých projektech může být nutné mít pro různé projekty různé verse Node.js.

Ve **Windows** jde k tomu dobře použít nástroj [Node Version Manager (nvm) for Windows](https://github.com/coreybutler/nvm-windows).

Před instalací je třeba odinstalovat Node.js a smazat příslušné adresáře.

Po nainstalování **nvm** stačí v příkazovém řádku napsat.

```
nvm install latest
```

A následně poslední versi použít:

```
nvm use 8.x.x
```

Místo *latest* jde použít libovolné jiné starší Node.js.

## Update všech balíčků

```
npm i -g npm-check-updates &amp;&amp; ncu -u &amp;&amp; npm i
```

## Spouštění `*.js` skriptů

```
node ./script.js
```

```
"scripts": {
  "build": "node ./build/build.js"
}
```

```
npm run build
```

### Parametry

```
node ./script.js parametr1 parametr2
```

Dostupné jsou potom v `process.argv` od druhého indexu:

```
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
```

## Úprava souborů

```
const buildFile = 'soubor.html'
let html = fs.readFileSync(buildFile).toString()
let outputHtml = html.replace(/fytopuf/g, 'fytopufík')
fs.writeFileSync(buildFile, outputHtml)
```