---
title: "Předávání a čtení dat z package.json v gulpfile.js"
headline: "Čtení dat z <code>package.json</code> v <code>gulpfile.js</code>"
description: "Jak do Gulpu předávat konfiguraci například z <code>package.json</code>."
date: "2019-04-08"
last_modification: "2019-04-08"
status: 0
tags: []
---

Při používání [preprocesoru](/preprocesory) [Gulp](/gulp-4) se občas hodí do JS souboru s jednotlivými *tasky* (`gulpfile.js`) předávat nějakou konfiguraci.

Například zdrojové soubory, ze kterých se má sestavit výsledné CSS/JS.

Pro **přehlednost** může být užitečné nastavení **vyčlenit do samostatného souboru**. Nebo použít `package.json`:

Jak ale tato data předat?

## `package.json`

V `package.json` se vytvoří nový klíč, např. `assets`.

```
…,
"assets": {
  "js" : [
    "node_modules/focus-visible/dist/focus-visible.min.js",
    "node_modules/vanilla-lazyload/dist/lazyload.min.js",
    "www/assets/js/main.js"
  ],
  "css" : [
    "www/assets/scss/main.scss"
  ]
}
```

## `gulpfile.js`

Pro přečtení jde použít třeba balíček `fs`:

    Nainstaluje se následovně:

    ```
npm install fs --save-dev
```

    Potom se připojí:

    ```
import fs from 'fs';
```

    Obsah `package.json` se zparsuje a přiřadí do konstanty:

    ```
const packageJson = JSON.parse(fs.readFileSync('./package.json'));
```

    Nyní je v `packageJson.assets.js` pole všech použitých JS (viz výše) a soubory jsou připravené k dalšímu zpracování Gulpem (spojení, minifikace apod.).

    ```
return gulp.src(packageJson.assets.js).pipe(…)
```