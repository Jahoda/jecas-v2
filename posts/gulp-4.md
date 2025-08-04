---
title: "Přechod na Gulp 4"
headline: "Přechod na Gulp 4"
description: "Jak přejít na Gulp 4. Co je potřeba změnit v <code>gulpfile.js</code>."
date: "2018-04-27"
last_modification: "2018-05-01"
status: 1
tags: ["CSS", "Produktivita", "Preprocesory"]
---

Gulp je populární nástroj pro automatisování vývoje. Typicky se používá např. k buildu CSS souborů za použití preprocesorů ze zdrojových SASS/LESS souborů, automatickému [prefixování](/css-prefixy), [spojování souborů](/slouceni-js-css), minifikování, správě ikon nebo sestavování JavaScriptů.

    - [gulp.js](https://github.com/gulpjs/gulp) – Gulp repositář na GitHubu

Ve versi 4 se lehce mění způsob, jak `gulpfile.js` (soubor s definovanými tasky) psát.

## Proč přecházet na Gulp 4?

Kromě důvodu, že bývá dobré používat aktuální verse software, je asi hlavní výhoda v přítomnosti nativního zpracování paralelních/sériových tasků.

### Sériové/paralelních tasky

Při komplikovanějším buildu se může hodit, aby některé tasky běžely zároveň a jiné na sebe čekaly.

V Gulpu 3 k tomu jde použít balíček [`run-sequence`](https://www.npmjs.com/package/run-sequence). Jinak tasky běží asynchronně zároveň.

Nativní zápis v Gulp 4 vypadá následovně:

```
var build = gulp.series(*prvni*, gulp.parallel(**druhy**, **druhyDalsi**));
```

Funkce/tasky `druhy` a `druhyDalsi` se spustí až po doběhnutí funkce/tasku `prvni` a obě potom poběží souběžně.

Z toho plyne většina nutných úprav pro přechod:

## Přechod

V době psaní článku se Gulp 4 nainstaluje následovně (pro uložení do `devDependencies` do `package.json`):

```
npm install gulp@next --save-dev
```

Pokud se po spuštění příkazu `gulp` zobrazí následující chyba:

```
'gulp' is not recognized as an internal or external command, operable program or batch file.
```

Je třeba `gulp@next` nainstalovat globálně:

```
npm install gulp@next **-g**
```

To je ve [Windows](/windows) vhodné v každém případě, protože jinak se může stát, že se použije starší globální verse Gulpu a použití nového `gulpfile.js` může končit nějakou chybou, jako např.:

```
gulpInst.start.apply(gulpInst, toRun);
               ^
TypeError: Cannot read property 'apply' of undefined
```

## Chyby a problémy k přepsání

Nyní by se již měl `gulpfile.js` zpracovávat Gulpem 4, takže zbývá soubor upravit do novější podoby. Po spuštění nějakého z tasků pravděpodobně dojde k některé z následujících chyb:

### AssertionError: Task function must be specified

Je způsobené právě jiným zápisem pořadí tasků. Takže následující konstrukce, která zajistí souběžný build stylů a puštění lintu na zdrojové soubory:

```
gulp.task('styles', ['sass-lint'], function() {
  gulp.src('./www/assets/scss/main.scss')
    .pipe(…);
    …
});
```

Bude muset vypadat např. následovně:

```
gulp.task('styles', **gulp.parallel**(
  function() {
    gulp.src('./www/assets/scss/main.scss')
      .pipe(…);
      …
  }, 
  lint
));
```

Kvůli obalování do `gulp.parallel`/`gulp.series` je poměrně výhodné anonymní funkce pojmenovávat, aby to bylo přehlednější.

### Signal async completion

Po přepsání výše uvedeného může při spouštění tasku k následující chybě:

```
The following tasks did not complete: styles
Did you forget to signal async completion?
```

Zde je změna kvůli možnosti sériového a paralelního běhu jednotlivých úloh.

Aby toto mohl Gulp vědět, je třeba ho o tom nějak informovat.

Jak na to? Existuje několik způsobů. Nejběžnější jsou:

    Vrátit *stream* pomocí klíčového slova `return`. 

    ```
**return** gulp.src('./www/assets/scss/main.scss')
  .pipe(…);
  …
```

    Použít callback `done`:

    ```
gulp.task('usage', function(**done**) {
  console.log('Usage: gulp styles');
  **done()**;
});
```

    Vrátit promisu:

    ```
gulp.task('usage', function() {
  return **new Promise**(function(resolve, reject) {
    console.log('Usage: gulp styles');
    **resolve()**;
  });
});
```

Po těchto opravách by vše mělo fungovat jako předtím.

## Přechod na ES6

Při úpravě `gulpfile.js` se může rovnou hodit přejít na ES6. Novější versi JavaScriptu.

Postup je následující:

    Přejmenovat `gulpfile.js` na `gulpfile.**babel**.js`

    Nainstalovat Babel:

    ```
npm install --save-dev babel-register babel-preset-env
```

    Vytvořit soubor `.babelrc` s následujícím obsahem:

    ```
{
  "presets": ["env"]
}

```

Nyní jde využívat vymoženosti ES6:

### Připojovat balíčky přes `import`

Místo:

```
var gulp = require('gulp');
```

Použít:

```
import gulp from 'gulp';
```

### Vytvářet tasky jako export funkce

Pokud daná funkce má být přímo taskem, jde místo:

```
gulp.task('lint', lint);
```

Přímo exportovat stejnojmennou funkci:

```
export function lint() {
  return gulp.src(paths.scss)
    .pipe(sassLint({
        configFile: paths.sassLint.config
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}
```

Vyexportovanou funkci jde i pojmenovat jinak než task:

```
function lint() {
  …
}
export { lint as cokoliv };
```

Tím se vytvoří task `cokoliv`, který použije funkci `lint`.

Přičemž původní `gulp.task('nazev-tasku', funkce)` jde používat i nadále.

### Zdánlivá chyba `Failed to load`

Při výše uvedeném požití se nejspíš po spuštění tasku zobrazí hláška:

```
Failed to load external module @babel/register
Requiring external module babel-register
```

Nejedná se o chybu, ale o vlastnost a na funkci nemá vliv.

## Odkazy jinam

  - StackOverflow: [Gulp error: The following tasks did not complete](https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async)

  - We Are Wizards Blog: [Migrating to gulp 4 by example](https://blog.wearewizards.io/migrating-to-gulp-4-by-example)

  - StackOverflow: [Gulp 4 - Gulpfile.js set up](https://stackoverflow.com/questions/32475614/gulp-4-gulpfile-js-set-up) – řešení návratových hodnot funkcí

  - Liquid Light: [How do I update to Gulp 4?](https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/)