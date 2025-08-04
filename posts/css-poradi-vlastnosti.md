---
title: "V jakém pořadí psát CSS vlastnosti"
headline: "Pořadí CSS vlastností"
description: "Jak správně řadit jednotlivé CSS vlastnosti v rámci jednoho bloku příslušícímu k selektoru."
date: "2017-09-22"
last_modification: "2018-05-28"
status: 1
tags: ["CSS", "Hotová řešení", "Preprocesory", "Style guide"]
---

Při práci ve skupině o více vývojářích bývá dobré, když se používá co nejvíce **jednotný styl zápisu CSS**. Slouží k tomu tzv. *Coding Standards* (CS) – soubor pravidel, jak kód odsazovat, jaké psát komentáře, jak pojmenovávat identifikátory apod.

V CSS je jedna z největších výzev **řazení vlastností** v rámci selektoru:

## Náhodně

Asi nejčastější způsob „řazení“ je náhodný.

```
.nahodny {
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
}
```

Nevýhoda je v (ne)přehlednosti, protože není absolutně jasné, kde danou vlastnost najít. Problém z toho plynoucí může nastat třeba v případě přidávání nové vlastnosti, kdy snadno dojde k duplikování některých vlastností, protože to člověk snadno přehlédne.

## Abecedně

Abecední řazení je asi nejsnazší a nejpřístupnější způsob, jak docílit jednotného stylu kódu napříč týmem.

Seřadit vlastnosti podle abecedy jde relativně snadno i ručně. Případně to umí každý trochu chytřejší editor. V [Sublime Text](/st) k tomu slouží klávesa F9 nad označeným blokem.

```
.abecedne {
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
}
```

Pokud si na to člověk zvykne, celkem se eliminuje risiko duplikování vlastností. A je i jasné, kde danou vlastnost hledat a kam ji přidat.

**Nevýhody?** Úplně se vytrácí přirozené seskupování vlastností k sobě nebo prioritisace „důležitějších“ vlastností.

    Proč je zrovna [animace](/animation) na první místě?

    Proč nejsou vlastnosti zajišťující rozměry bloku, tj. `width` a `height` u sebe?

    Proč tak důležitá vlastnost jako [`display`](/display) je ukryta někde uprostřed?

    Proč vlastnosti související s [posicováním](/position) (`position`, `top`, `left`) nejsou u sebe?

    V případě, že se používají [prefixované vlasnosti](/css-prefixy) (přímo ve zdrojovém kódu bez Autoprefixeru) nebo jiné hacky, dochází potom k dost bizarním situacím nebo až rozbití zamýšlené funkce.

    …

## Logické řazení

Dle vkusu autora by byl optimální zápis např. následující:

```
.logicke {
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
}
```

Bohužel co člověk, to názor. Navíc není úplně triviální zajistit, aby vlastnosti do uvedeného pořadí dokázal **automaticky připravit editor**.

Pro použití tohoto způsobu je tedy téměř nutná nějaká automatisace:

    Automatické řazení v pre/post-procesoru.

    CSS lint hlídající pořadí.

Automatické řazení může být teoreticky problém, protože v CSS na pořadí záleží. Zvlášť v případě hacků může i podivné pořadí dávat smysl a postprocesor to potom celé rozbije.

Mezi rozšířenější způsoby, jak řadit CSS vlastnosti (a které jde navíc automatisovat), jde považovat následující:

### Concentric CSS

Pořadí vlastností se dělí do následujících skupin:

```
.concentric-css {
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
}
```

    - [Concentric CSS](http://rhodesmill.org/brandon/2011/concentric-css/) – popis

    - [stylelint-config-concentric-order](https://www.npmjs.com/package/stylelint-config-concentric-order) – balíček pro stylelint

### Idiomatic CSS

Vlastnosti se řadí podle základních 3 skupin:

```
.idiomatic-css {
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
}
```

    - [Principles of writing consistent, idiomatic CSS](https://github.com/necolas/idiomatic-css#declaration-order)

    - [stylelint-config-idiomatic-order](https://www.npmjs.com/package/stylelint-config-idiomatic-order) – balíček pro stylelint

### Rational order

```
.rational-order {
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
}
```

    - Code Guide by @mdo: [Declaration order](http://codeguide.co/#css-declaration-order)

    - [stylelint-config-rational-order](https://www.npmjs.com/package/stylelint-config-rational-order) – balíček pro stylelint

## Podle délky řádku

Existuje ještě jeden způsob řazení – podle délky řádku. To má sice celkem jasné pravidlo, ale kombinuje to nevýhody abecedního i náhodného přístupu:

```
selektor {
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
}
```

## Co zvolit?

Z výše uvedeného vyplývá, že universální nejlepší způsob neexistuje.

Nejsnáze dosažitelný relativně rozumný způsob je **abecední řazení**, protože ho lze snadno dosáhnout v editoru i dodržovat z hlavy.

    - Google HTML/CSS Style Guide: [CSS Formatting Rules: Declaration Order](https://google.github.io/styleguide/htmlcssguide.html#Declaration_Order)

Pokud není problém v projektu používat automatisační nástroje, je možné do workflow zabudovat řešení, které kontroluje a případně i samo opravuje pořadí vlastností, dle nějakého [logického pořadí](#logicke):

## Řazení pomocí Stylelintu v Gulpu

Automatickou kontrolu a i opravu řazení s použitím [Gulpu 4](/gulp-4) jde vytvořit následovně díky **Stylelintu**:

    Nainstalovat potřebné balíčky: [`gulp-stylelint`](https://www.npmjs.com/package/gulp-stylelint), [`stylelint`](https://stylelint.io), [`stylelint-order`](https://github.com/hudochenkov/stylelint-order) a například `stylelint-config-rational-order` (dle preferovaného řazení).

    ```
npm install --save-dev gulp-stylelint stylelint stylelint-order
```

    Vybrat a nainstalovat nějaký plugin pro řazení:

    ```
npm install --save-dev stylelint-config-rational-order
```

    Vytvořit konfigurační soubor `.stylelintrc` a do `extends` uvést název řadicího balíčku:

    ```
{
  "rules": {
    …
  },
  "extends": [
    "stylelint-config-rational-order"
  ]
}
```

    Vytvořit gulp task pro kontrolování lintem:

    ```
gulp.task('lint-css', function lintCssTask() {
	const gulpStylelint = require('gulp-stylelint');

	return gulp
		.src(**'/scss/**/*.scss'**)
		.pipe(gulpStylelint({
			reporters: [
				{formatter: 'string', console: true}
			]
		}));
});
```

    Po zavolání `gulp lint-css` by se měly objevit problémy v řazení (pokud tedy nějaké v kódu existují):

    Pro počáteční automatickou opravu jde vytvořit další gulp task, který projde zdrojové soubory a změní v nich řazení vlastností:

    ```
gulp.task('fix-css', function fixCssTask() {
	const gulpStylelint = require('gulp-stylelint');

	return gulp
		.src(**'/scss/**/*.scss'**)
		.pipe(gulpStylelint({
			*fix: true*
		}))
		.pipe(gulp.dest(**'/scss/'**));
});
```

    - Martin Michálek: [Stylelint, protože pořádek musí být. I v CSS kódu](https://www.vzhurudolu.cz/prirucka/stylelint) – obecnější popis používání lintování v CSS

## PostCSS řazení

Řadit vlastnosti dokáže i následující plugin [PostCSS Sorting](https://github.com/hudochenkov/postcss-sorting). Nezkoušel jsem.

**Máte s řazením zkušenosti?** Budu rád, když mi napíšete do komentářů.