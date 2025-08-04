---
title: "Parsování HTML v JavaScriptu"
headline: "Parsování HTML v JavaScriptu"
description: "Jak v klientském i serverovém JS parsovat a upravovat HTML kód."
date: "2023-03-06"
last_modification: "2023-03-08"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Pro parsování HTML kódu na straně klienta a získávání z něj nějakých informací je nejsnazší využít přímo DOM.

A cokoliv vybírat pomocí [`querySelector`u](/queryselector) přes standardní CSS selektory:

```
const odkazyVTabulkach = document.querySelectorAll("table a");
```

Je-li potřeba parsovat přímo HTML řetězec, jde použít [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/DOMParser):

```
const parser = new DOMParser();
const doc = parser.parseFromString(`&lt;p>Odstavec`, "text/html");
console.log(doc.querySelector("p").textContent)
```

Zajímavější je to ale **v JS na straně serveru**, protože nemá `document` ani `DOMParser` a podobný pokus tak skončí chybou:

```
ReferenceError: document is not defined
ReferenceError: DOMParser is not defined
```

## Regulární výrazy

Stáhnout obsah jde metodou `fetch` a z výsledného textu půjde vyparsovat např. [titulek](/html-kostra#title) stránky následovně:

```
const url = 'https://www.example.com';
fetch(url)
  .then(response => response.text())
  .then(html => {
    const regex = /&lt;title>(.*?)&lt;\/title>/;
    const match = regex.exec(html);
    const title = match[1];
    console.log(title);
  })
  .catch(error => console.log(error));
```

Tímto celkem končí možnosti běžného parsování HTML bez externích knihoven.

## HTML parsery v JS

Vzhledem k tomu, jak HTML funguje a jak [fungují různé HTML značky](/html-znacky), není úplně snadné si napsat vlastní parser.

Naštěstí existují **hotové knihovny**.

Ty fungují tak, že textový HTML vstup převedou do tzv. **AST** (abstract syntax tree), se kterým se dále pracuje.

Existuje hezký nástroj [AST explorer](https://astexplorer.net/), kde jde zkoumat jednotlivé parsery. A sledovat, jaký strom vytváří.

Mimochodem, ani ty hotové knihovny často nedokáží HTML pochopit stejně, jak funguje v prohlížeči.

Například následující kód je naprosto v pořádku, je i [validní](/validita), a prohlížeč před tabulkou odstavec ukončí.

```
&lt;p>Odstavec

&lt;table>
  &lt;tr>
    &lt;td>Buňka tabulky.
&lt;/table>
```

A správně pochopí i konce řádku a buňky tabulky. Dokonce doplní i `&lt;tbody>`:

Třeba populární [parse5](https://github.com/inikulin/parse5) si v tomto případě myslí, že HTML funguje jinak. [Ukázka](https://astexplorer.net/#/gist/348ec2af554ee77f2d6bb75eb6a593b3/4a0a58af209cb1a1ed65ed7acf62c6cf7fd1a8ad)

Stejně se chová i nativní DOMParser v prohlížeč – [ukázka](http://kod.djpw.cz/txid).

Například jiný parser – [htmlparser2](https://github.com/fb55/htmlparser2) – si poradí i s touto konstrukcí. [Ukázka](https://astexplorer.net/#/gist/ea0e6360354eaadcf9ad97019fb6aeca/7807f07f5cd722c1bc93e29f36b81c81a9cb89d4)

## Hotová řešení

Nad těmito parsery existují potom další knihovny, které nabízí **přívětivější rozhraní** pro získávání obsahu nebo jeho modifikaci.

### jsdom

[jsdom](https://github.com/jsdom/jsdom)

Snaží se mít stejné rozhraní jako běžné DOM JS funkce v prohlížeči.

```
const dom = new JSDOM(`&lt;!DOCTYPE html>&lt;p>Hello world&lt;/p>`);
console.log(dom.window.document.querySelector("p").textContent);
```

Knihovna jsdom se hodně používá pro **automatické testování** JS kódu, protože kromě využití k parsování dokáže kód i spouštět atd.

### cheerio

[cheerio](https://github.com/cheeriojs/cheerio)

Implementuje styl zápisu ve stylu **jQuery**:

```
const cheerio = require('cheerio');
const $ = cheerio.load('&lt;h2 class="title">Hello world&lt;/h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

$.html();
//=> &lt;html>&lt;head>&lt;/head>&lt;body>&lt;h2 class="title welcome">Hello there!&lt;/h2>&lt;/body>&lt;/html>
```

Například přidat pomocí cheeria [kotvy](/id) pro [nadpisy](/nadpisy) 1–3 jde následovně:

```
const $ = cheerio.load(html);

$('h1, h2, h3').each((i, element) => {
    const html = $.html(element);
    $(element).replaceWith(`&lt;a name="nadpis-${i}">&lt;/a>${html}`);
});

return $.html();
```

Dokáže pro parsování používat **parser5** i **htmlparser2**.

### Deno DOM

[Deno DOM](https://deno.land/x/deno_dom)

Při používání [Deno](https://deno.land) místo Node se nabízí použít tuto knihovnu. Zpřístupní běžné DOM metody na straně serveru ve stylu nativního DOMParseru.

```
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const doc = new DOMParser().parseFromString(
  `
  &lt;h1>Hello World!&lt;/h1>
  &lt;p>Hello from &lt;a href="https://deno.land/">Deno!&lt;/a>&lt;/p>
`,
  "text/html",
)!;

const p = doc.querySelector("p")!;

console.log(p.textContent); // "Hello from Deno!"
console.log(p.childNodes[1].textContent); // "Deno!"

p.innerHTML = "DOM in &lt;b>Deno&lt;/b> is pretty cool";
console.log(p.children[0].outerHTML); // "&lt;b>Deno&lt;/b>"
```

### Himalaya

[himalaya](https://github.com/andrejewski/himalaya)

Převádí HTML do JSONu a zpátky:

```
import { parse } from 'himalaya'
console.log(parse(html))
```

Pro následující kód:

```
&lt;div class='post post-featured'>
  &lt;p>Himalaya parsed me...&lt;/p>
  &lt;!-- ...and I liked it. -->
&lt;/div>
```

Výstupem je potom obyčejný [JSON](/json):

```
[{
  type: 'element',
  tagName: 'div',
  attributes: [{
    key: 'class',
    value: 'post post-featured'
  }],
  children: [{
    type: 'element',
    tagName: 'p',
    attributes: [],
    children: [{
      type: 'text',
      content: 'Himalaya parsed me...'
    }]
  }, {
    type: 'comment',
    content: ' ...and I liked it. '
  }]
}]
```

S ním je možné provádět standardními JS metodami pro práci s objekty, co je potřeba. A výsledek klidně zase převést do HTML přes `stringify`.

```
import {parse, **stringify**} from 'himalaya'
```

### Hyntax

[hyntax](https://github.com/mykolaharmash/hyntax)

Další nástroj pro převod HTML do AST formátu bez dalších závislostí.

```
const { tokenize, constructTree } = require('hyntax')
const util = require('util')
 
const inputHTML = `
&lt;html>
  &lt;body>
      &lt;input type="text" placeholder="Don't type">
      &lt;button>Don't press&lt;/button>
  &lt;/body>
&lt;/html>
`
 
const { tokens } = tokenize(inputHTML)
const { ast } = constructTree(tokens)
 
console.log(JSON.stringify(tokens, null, 2))
console.log(util.inspect(ast, { showHidden: false, depth: null }))
```

### unified

[unified](https://github.com/unifiedjs/unified)

Unified je universální rozhraní pro parsování čehokoliv. Existuje do něj spoustu pluginů.

Pro parsování HTML slouží [rehype](https://github.com/rehypejs/rehype) (existuje i třeba [remark](https://github.com/remarkjs/remark) pro parsování [Markdownu](/markdown) nebo [retext](https://github.com/retextjs/retext) pro obyčejný text).

Pro **rehype** něj [spoustu pluginů](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins), které řeší různé časté transformace HTML kódu.