---
title: "Přechod na Gulp 4"
headline: "Přechod na Gulp 4"
description: "Jak přejít na Gulp 4. Co je potřeba změnit v <code>gulpfile.js</code>."
date: "2018-04-27"
last_modification: "2018-05-01"
status: 1
tags: ["css", "preprocesory", "produktivita"]
format: "html"
---

<p>Gulp je populární nástroj pro automatisování vývoje. Typicky se používá např. k buildu CSS souborů za použití preprocesorů ze zdrojových SASS/LESS souborů, automatickému <a href="/css-prefixy">prefixování</a>, <a href="/slouceni-js-css">spojování souborů</a>, minifikování, správě ikon nebo sestavování JavaScriptů.</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/gulpjs/gulp">gulp.js</a> – Gulp repositář na GitHubu</li>
  </ul>
</div>


<p>Ve versi 4 se lehce mění způsob, jak <code>gulpfile.js</code> (soubor s definovanými tasky) psát.</p>



<h2 id="proc">Proč přecházet na Gulp 4?</h2>

<p>Kromě důvodu, že bývá dobré používat aktuální verse software, je asi hlavní výhoda v přítomnosti nativního zpracování paralelních/sériových tasků.</p>


<h3 id="serie">Sériové/paralelních tasky</h3>

<p>Při komplikovanějším buildu se může hodit, aby některé tasky běžely zároveň a jiné na sebe čekaly.</p>



<p>V Gulpu 3 k tomu jde použít balíček <a href="https://www.npmjs.com/package/run-sequence"><code>run-sequence</code></a>. Jinak tasky běží asynchronně zároveň.</p>

<p>Nativní zápis v Gulp 4 vypadá následovně:</p>


<pre><code>var build = gulp.series(<i>prvni</i>, gulp.parallel(<b>druhy</b>, <b>druhyDalsi</b>));</code></pre>



<p>Funkce/tasky <code>druhy</code> a <code>druhyDalsi</code> se spustí až po doběhnutí funkce/tasku <code>prvni</code> a obě potom poběží souběžně.</p>





<p>Z toho plyne většina nutných úprav pro přechod:</p>



<h2 id="prechod">Přechod</h2>

<p>V době psaní článku se Gulp 4 nainstaluje následovně (pro uložení do <code>devDependencies</code> do <code>package.json</code>):</p>

<pre><code>npm install gulp@next --save-dev</code></pre>









<p>Pokud se po spuštění příkazu <code>gulp</code> zobrazí následující chyba:</p>

<pre><code>'gulp' is not recognized as an internal or external command, operable program or batch file.</code></pre>

<p>Je třeba <code>gulp@next</code> nainstalovat globálně:</p>

<pre><code>npm install gulp@next <b>-g</b></code></pre>











<p>To je ve <a href="/windows">Windows</a> vhodné v každém případě, protože jinak se může stát, že se použije starší globální verse Gulpu a použití nového <code>gulpfile.js</code> může končit nějakou chybou, jako např.:</p>


<pre><code>gulpInst.start.apply(gulpInst, toRun);
               ^
TypeError: Cannot read property 'apply' of undefined</code></pre>









<h2 id="problemy">Chyby a problémy k přepsání</h2>

<p>Nyní by se již měl <code>gulpfile.js</code> zpracovávat Gulpem 4, takže zbývá soubor upravit do novější podoby. Po spuštění nějakého z tasků pravděpodobně dojde k některé z následujících chyb:</p>


<h3>AssertionError: Task function must be specified</h3>

<p>Je způsobené právě jiným zápisem pořadí tasků. Takže následující konstrukce, která zajistí souběžný build stylů a puštění lintu na zdrojové soubory:</p>

<pre><code>gulp.task('styles', ['sass-lint'], function() {
  gulp.src('./www/assets/scss/main.scss')
    .pipe(…);
    …
});</code></pre>










<p>Bude muset vypadat např. následovně:</p>

<pre><code>gulp.task('styles', <b>gulp.parallel</b>(
  function() {
    gulp.src('./www/assets/scss/main.scss')
      .pipe(…);
      …
  }, 
  lint
));</code></pre>

















<p>Kvůli obalování do <code>gulp.parallel</code>/<code>gulp.series</code> je poměrně výhodné anonymní funkce pojmenovávat, aby to bylo přehlednější.</p>



<h3 id="async">Signal async completion</h3>

<p>Po přepsání výše uvedeného může při spouštění tasku k následující chybě:</p>

<pre><code>The following tasks did not complete: styles
Did you forget to signal async completion?</code></pre>










<p>Zde je změna kvůli možnosti sériového a paralelního běhu jednotlivých úloh.</p>

<p>Aby toto mohl Gulp vědět, je třeba ho o tom nějak informovat.</p>


<p>Jak na to? Existuje několik způsobů. Nejběžnější jsou:</p>


<ol>
  <li>
    <p>Vrátit <i lang="en">stream</i> pomocí klíčového slova <code>return</code>. </p>
    
    <pre><code><b>return</b> gulp.src('./www/assets/scss/main.scss')
  .pipe(…);
  …</code></pre>
  </li>
  
  
  
  
  
  <li>
    <p>Použít callback <code>done</code>:</p>
    
    <pre><code>gulp.task('usage', function(<b>done</b>) {
  console.log('Usage: gulp styles');
  <b>done()</b>;
});</code></pre>
  </li>
  
  
  
  
  
  
  
  <li>
    <p>Vrátit promisu:</p>
    
    <pre><code>gulp.task('usage', function() {
  return <b>new Promise</b>(function(resolve, reject) {
    console.log('Usage: gulp styles');
    <b>resolve()</b>;
  });
});</code></pre>
  </li>
  
  
  
  
  
  
</ol>


<p>Po těchto opravách by vše mělo fungovat jako předtím.</p>


<h2 id="es6">Přechod na ES6</h2>

<p>Při úpravě <code>gulpfile.js</code> se může rovnou hodit přejít na ES6. Novější versi JavaScriptu.</p>

<p>Postup je následující:</p>


<ol>
  <li>
    <p>Přejmenovat <code>gulpfile.js</code> na <code>gulpfile.<b>babel</b>.js</code></p>
  </li>
  
  
  <li>
    <p>Nainstalovat Babel:</p>
    
    <pre><code>npm install --save-dev babel-register babel-preset-env</code></pre>
  </li>
  
  
  <li>
    <p>Vytvořit soubor <code>.babelrc</code> s následujícím obsahem:</p>
    
    <pre><code>{
  "presets": ["env"]
}
</code></pre>
  </li>
</ol>




<p>Nyní jde využívat vymoženosti ES6:</p>




<h3 id="import">Připojovat balíčky přes <code>import</code></h3>

<p>Místo:</p>

<pre><code>var gulp = require('gulp');</code></pre>

<p>Použít:</p>

<pre><code>import gulp from 'gulp';</code></pre>















<h3 id="export">Vytvářet tasky jako export funkce</h3>

<p>Pokud daná funkce má být přímo taskem, jde místo:</p>

<pre><code>gulp.task('lint', lint);</code></pre>








<p>Přímo exportovat stejnojmennou funkci:</p>

<pre><code>export function lint() {
  return gulp.src(paths.scss)
    .pipe(sassLint({
        configFile: paths.sassLint.config
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}</code></pre>











<p>Vyexportovanou funkci jde i pojmenovat jinak než task:</p>

<pre><code>function lint() {
  …
}
export { lint as cokoliv };</code></pre>








<p>Tím se vytvoří task <code>cokoliv</code>, který použije funkci <code>lint</code>.</p>


<p>Přičemž původní <code>gulp.task('nazev-tasku', funkce)</code> jde používat i nadále.</p>





<h3 id="chyba">Zdánlivá chyba <code>Failed to load</code></h3>

<p>Při výše uvedeném požití se nejspíš po spuštění tasku zobrazí hláška:</p>

<pre><code>Failed to load external module @babel/register
Requiring external module babel-register</code></pre>








<p>Nejedná se o chybu, ale o vlastnost a na funkci nemá vliv.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>StackOverflow: <a href="https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async">Gulp error: The following tasks did not complete</a></li>
  
  <li>We Are Wizards Blog: <a href="https://blog.wearewizards.io/migrating-to-gulp-4-by-example">Migrating to gulp 4 by example</a></li>
  
  <li>StackOverflow: <a href="https://stackoverflow.com/questions/32475614/gulp-4-gulpfile-js-set-up">Gulp 4 - Gulpfile.js set up</a> – řešení návratových hodnot funkcí</li>
  
  <li>Liquid Light: <a href="https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/">How do I update to Gulp 4?</a></li>
</ul>