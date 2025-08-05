---
title: "V jakém pořadí psát CSS vlastnosti"
headline: "Pořadí CSS vlastností"
description: "Jak správně řadit jednotlivé CSS vlastnosti v rámci jednoho bloku příslušícímu k selektoru."
date: "2017-09-22"
last_modification: "2018-05-28"
status: 1
tags: ["css", "hotova-reseni", "preprocesory", "style-guide"]
format: "html"
---

<p>Při práci ve skupině o více vývojářích bývá dobré, když se používá co nejvíce <b>jednotný styl zápisu CSS</b>. Slouží k tomu tzv. <i lang="en">Coding Standards</i> (CS) – soubor pravidel, jak kód odsazovat, jaké psát komentáře, jak pojmenovávat identifikátory apod.</p>

<p>V CSS je jedna z největších výzev <b>řazení vlastností</b> v rámci selektoru:</p>





<h2 id="nahodne">Náhodně</h2>

<p>Asi nejčastější způsob „řazení“ je náhodný.</p>

<pre><code>.nahodny {
  display: none;
  margin: 0;
  font-size: 120%;
  width: 100px;
  top: 5px;
  color: red;
  position: absolute;
  left: 10px;
  height: 20px;
  animation: mojeAnimace .5s;
}</code></pre>

















<p>Nevýhoda je v (ne)přehlednosti, protože není absolutně jasné, kde danou vlastnost najít. Problém z toho plynoucí může nastat třeba v případě přidávání nové vlastnosti, kdy snadno dojde k duplikování některých vlastností, protože to člověk snadno přehlédne.</p>




<h2 id="abecedne">Abecedně</h2>

<p>Abecední řazení je asi nejsnazší a nejpřístupnější způsob, jak docílit jednotného stylu kódu napříč týmem.</p>

<p>Seřadit vlastnosti podle abecedy jde relativně snadno i ručně. Případně to umí každý trochu chytřejší editor. V <a href="/st">Sublime Text</a> k tomu slouží klávesa <kbd>F9</kbd> nad označeným blokem.</p>



<pre><code>.abecedne {
  animation: mojeAnimace .5s;
  color: red;
  display: none;
  font-size: 120%;
  left: 10px;
  height: 20px;
  margin: 0;
  position: absolute;
  top: 5px;
  width: 100px;
}</code></pre>














<p>Pokud si na to člověk zvykne, celkem se eliminuje risiko duplikování vlastností. A je i jasné, kde danou vlastnost hledat a kam ji přidat.</p>



<p><b>Nevýhody?</b> Úplně se vytrácí přirozené seskupování vlastností k sobě nebo prioritisace „důležitějších“ vlastností.</p>

<ol>
  <li>
    <p>Proč je zrovna <a href="/animation">animace</a> na první místě?</p>
  </li>
  
  <li>
    <p>Proč nejsou vlastnosti zajišťující rozměry bloku, tj. <code>width</code> a <code>height</code> u sebe?</p>
  </li>
  
  <li>
    <p>Proč tak důležitá vlastnost jako <a href="/display"><code>display</code></a> je ukryta někde uprostřed?</p>
  </li>
  
  <li>
    <p>Proč vlastnosti související s <a href="/position">posicováním</a> (<code>position</code>, <code>top</code>, <code>left</code>) nejsou u sebe?</p>
  </li>
  
  <li>
    <p>V případě, že se používají <a href="/css-prefixy">prefixované vlasnosti</a> (přímo ve zdrojovém kódu bez Autoprefixeru) nebo jiné hacky, dochází potom k dost bizarním situacím nebo až rozbití zamýšlené funkce.</p>
  </li>
  
  <li>
    <p>…</p>
  </li>
</ol>


<h2 id="logicke">Logické řazení</h2>

<p>Dle vkusu autora by byl optimální zápis např. následující:</p>

<pre><code>.logicke {
  display: none;
  width: 100px;
  height: 20px;
  position: absolute;
  top: 5px;
  left: 10px;
  margin: 0;
  font-size: 120%;
  color: red;
  animation: mojeAnimace .5s;
}</code></pre>





<p>Bohužel co člověk, to názor. Navíc není úplně triviální zajistit, aby vlastnosti do uvedeného pořadí dokázal <b>automaticky připravit editor</b>.</p>

<p>Pro použití tohoto způsobu je tedy téměř nutná nějaká automatisace:</p>

<ol>
  <li>
    <p>Automatické řazení v pre/post-procesoru.</p>
  </li>
  
  <li>
    <p>CSS lint hlídající pořadí.
    </p>
  </li>
</ol>

<p>Automatické řazení může být teoreticky problém, protože v CSS na pořadí záleží. Zvlášť v případě hacků může i podivné pořadí dávat smysl a postprocesor to potom celé rozbije.</p>

<p>Mezi rozšířenější způsoby, jak řadit CSS vlastnosti (a které jde navíc automatisovat), jde považovat následující:</p>

<h3 id="concentric-css">Concentric CSS</h3>

<p>Pořadí vlastností se dělí do následujících skupin:</p>


<pre><code>.concentric-css {
    display: ;    /* Umístění boxu */
    position: ;
    float: ;
    clear: ;

    visibility: ; /* Je box viditelný? */
    opacity: ;
    z-index: ;

    margin: ;     /* Vrstvy box modelu */
    outline: ;
    border: ;
    background: ;
    padding: ;

    width: ;      /* Rozměry boxu a scrollování */
    height: ;
    overflow: ;

    color: ;      /* Text */
    text: ;
    font: ;
}</code></pre>



















<div class="external-content">
  <ul>
    <li><a href="http://rhodesmill.org/brandon/2011/concentric-css/">Concentric CSS</a> – popis</li>
    
    <li><a href="https://www.npmjs.com/package/stylelint-config-concentric-order">stylelint-config-concentric-order</a> – balíček pro stylelint</li>
  </ul>
</div>



<h3 id="idiomatic">Idiomatic CSS</h3>

<p>Vlastnosti se řadí podle základních 3 skupin:</p>

<pre><code>.idiomatic-css {
    /* Posicování */
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    /* Viditelnost a box-model */
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 10px solid #333;
    margin: 10px;

    /* Ostatní */
    background: #000;
    color: #fff;
    font-family: sans-serif;
    font-size: 16px;
    text-align: right;
}</code></pre>





















<div class="external-content">
  <ul>
    <li><a href="https://github.com/necolas/idiomatic-css#declaration-order">Principles of writing consistent, idiomatic CSS</a></li>
    
    <li><a href="https://www.npmjs.com/package/stylelint-config-idiomatic-order">stylelint-config-idiomatic-order</a> – balíček pro stylelint</li>
  </ul>
</div>


<h3 id="rational">Rational order</h3>

<pre><code>.rational-order {
  /* Posicování */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box-model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;

  /* Typografie */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* Visuální zobrazení */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* Ostatní */
  opacity: 1;
}</code></pre>


















<div class="external-content">
  <ul>
    <li>Code Guide by @mdo: <a href="http://codeguide.co/#css-declaration-order">Declaration order</a></li>
    
    <li><a href="https://www.npmjs.com/package/stylelint-config-rational-order">stylelint-config-rational-order</a> – balíček pro stylelint</li>
  </ul>
</div>






<h2 id="delka">Podle délky řádku</h2>

<p>Existuje ještě jeden způsob řazení – podle délky řádku. To má sice celkem jasné pravidlo, ale kombinuje to nevýhody abecedního i náhodného přístupu:</p>

<pre><code>selektor {
  top: 5px;
  margin: 0;
  color: red;
  left: 10px;
  width: 100px;
  height: 20px;
  display: none;
  font-size: 120%;
  position: absolute;
  animation: mojeAnimace .5s;
}</code></pre>

















<h2 id="co-zvolit">Co zvolit?</h2>

<p>Z výše uvedeného vyplývá, že universální nejlepší způsob neexistuje.</p>

<p>Nejsnáze dosažitelný relativně rozumný způsob je <b>abecední řazení</b>, protože ho lze snadno dosáhnout v editoru i dodržovat z hlavy.</p>


<div class="external-content">
  <ul>
    <li>Google HTML/CSS Style Guide: <a href="https://google.github.io/styleguide/htmlcssguide.html#Declaration_Order">CSS Formatting Rules: Declaration Order</a></li>
  </ul>
</div>


<p>Pokud není problém v projektu používat automatisační nástroje, je možné do workflow zabudovat řešení, které kontroluje a případně i samo opravuje pořadí vlastností, dle nějakého <a href="#logicke">logického pořadí</a>:</p>



<h2 id="stylelint">Řazení pomocí Stylelintu v Gulpu</h2>

<p>Automatickou kontrolu a i opravu řazení s použitím <a href="/gulp-4">Gulpu 4</a> jde vytvořit následovně díky <b>Stylelintu</b>:</p>

<ol>
  <li>
    <p>Nainstalovat potřebné balíčky: <a href="https://www.npmjs.com/package/gulp-stylelint"><code>gulp-stylelint</code></a>, <a href="https://stylelint.io"><code>stylelint</code></a>, <a href="https://github.com/hudochenkov/stylelint-order"><code>stylelint-order</code></a> a například <code>stylelint-config-rational-order</code> (dle preferovaného řazení).</p>
    
    <pre><code>npm install --save-dev gulp-stylelint stylelint stylelint-order</code></pre>
    
    <p>Vybrat a nainstalovat nějaký plugin pro řazení:</p>
    
    <pre><code>npm install --save-dev stylelint-config-rational-order</code></pre>    
  </li>
  
  
  
  
  
  
  
  
  
  <li>
    <p>Vytvořit konfigurační soubor <code>.stylelintrc</code> a do <code>extends</code> uvést název řadicího balíčku:</p>
    
    <pre><code>{
  "rules": {
    …
  },
  "extends": [
    "stylelint-config-rational-order"
  ]
}</code></pre>
  </li>
  
  
  
  
  
  
  
  
  
  
  
  
  <li>
    <p>Vytvořit gulp task pro kontrolování lintem:</p>
    
    <pre><code>gulp.task('lint-css', function lintCssTask() {
	const gulpStylelint = require('gulp-stylelint');

	return gulp
		.src(<b>'/scss/**/*.scss'</b>)
		.pipe(gulpStylelint({
			reporters: [
				{formatter: 'string', console: true}
			]
		}));
});</code></pre>
    
    
    
    
    
    
    
    
    
    <p>Po zavolání <code>gulp lint-css</code> by se měly objevit problémy v řazení (pokud tedy nějaké v kódu existují):</p>
    
    <p><img src="/files/css-poradi-vlastnosti/stylelint-poradi.png" alt="Zobrazení chyb ve výpisu" class="border"></p>
  </li>
  
  
  
    
  
  
  
  
  <li>
    <p>Pro počáteční automatickou opravu jde vytvořit další gulp task, který projde zdrojové soubory a změní v nich řazení vlastností:</p>
    
    <pre><code>gulp.task('fix-css', function fixCssTask() {
	const gulpStylelint = require('gulp-stylelint');

	return gulp
		.src(<b>'/scss/**/*.scss'</b>)
		.pipe(gulpStylelint({
			<i>fix: true</i>
		}))
		.pipe(gulp.dest(<b><b>'/scss/'</b></b>));
});</code></pre>
  </li>
</ol>








<div class="external-content">
  <ul>
    <li>Martin Michálek: <a href="https://www.vzhurudolu.cz/prirucka/stylelint">Stylelint, protože pořádek musí být. I v CSS kódu</a> – obecnější popis používání lintování v CSS</li>
  </ul>
</div>


<h2 id="post-css-razeni">PostCSS řazení</h2>

<p>Řadit vlastnosti dokáže i následující plugin <a href="https://github.com/hudochenkov/postcss-sorting">PostCSS Sorting</a>. Nezkoušel jsem.</p>

<p><b>Máte s řazením zkušenosti?</b> Budu rád, když mi napíšete do komentářů.</p>