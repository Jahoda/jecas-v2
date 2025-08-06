---
title: "Parsování HTML v JavaScriptu"
headline: "Parsování HTML v JavaScriptu"
description: "Jak v klientském i serverovém JS parsovat a upravovat HTML kód."
date: "2023-03-06"
last_modification: "2023-03-08"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Pro parsování HTML kódu na straně klienta a získávání z něj nějakých informací je nejsnazší využít přímo DOM.</p>

<p>A cokoliv vybírat pomocí <a href="/queryselector"><code>querySelector</code>u</a> přes standardní CSS selektory:</p>

<pre><code>const odkazyVTabulkach = document.querySelectorAll("table a");</code></pre>

<p>Je-li potřeba parsovat přímo HTML řetězec, jde použít <a href="https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/DOMParser">DOMParser</a>:</p>

<pre><code>const parser = new DOMParser();
const doc = parser.parseFromString(`&lt;p>Odstavec`, "text/html");
console.log(doc.querySelector("p").textContent)</code></pre>


<p>Zajímavější je to ale <b>v JS na straně serveru</b>, protože nemá <code>document</code> ani <code>DOMParser</code> a podobný pokus tak skončí chybou:</p>

<pre><code>ReferenceError: document is not defined
ReferenceError: DOMParser is not defined</code></pre>



<h2 id="regularni-vyrazy">Regulární výrazy</h2>

<p>Stáhnout obsah jde metodou <code>fetch</code> a z výsledného textu půjde vyparsovat např. <a href="/html-kostra#title">titulek</a> stránky následovně:</p>

<pre><code>const url = 'https://www.example.com';
fetch(url)
  .then(response => response.text())
  .then(html => {
    const regex = /&lt;title>(.*?)&lt;\/title>/;
    const match = regex.exec(html);
    const title = match[1];
    console.log(title);
  })
  .catch(error => console.log(error));</code></pre>


















<p>Tímto celkem končí možnosti běžného parsování HTML bez externích knihoven.</p>



<h2 id="parsery">HTML parsery v JS</h2>

<p>Vzhledem k tomu, jak HTML funguje a jak <a href="/html-znacky">fungují různé HTML značky</a>, není úplně snadné si napsat vlastní parser.</p>

<p>Naštěstí existují <b>hotové knihovny</b>.</p>


<p>Ty fungují tak, že textový HTML vstup převedou do tzv. <b>AST</b> (abstract syntax tree), se kterým se dále pracuje.</p>

<p>Existuje hezký nástroj <a href="https://astexplorer.net/">AST explorer</a>, kde jde zkoumat jednotlivé parsery. A sledovat, jaký strom vytváří.</p>


<p><img src="/files/js-parsovani-html/priklad-ast.png" alt="Příklad AST" class="border"></p>
































<p>Mimochodem, ani ty hotové knihovny často nedokáží HTML pochopit stejně, jak funguje v prohlížeči.</p>

<p>Například následující kód je naprosto v pořádku, je i <a href="/validita">validní</a>, a prohlížeč před tabulkou odstavec ukončí.</p>

<pre><code>&lt;p>Odstavec

&lt;table>
  &lt;tr>
    &lt;td>Buňka tabulky.
&lt;/table></code></pre>

<p>A správně pochopí i konce řádku a buňky tabulky. Dokonce doplní i <code>&lt;tbody></code>:</p>

<p><img src="/files/js-parsovani-html/doplneni-odstavce.png" alt="Doplnění odstavce" class="border"></p>

























<p>Třeba populární <a href="https://github.com/inikulin/parse5">parse5</a> si v tomto případě myslí, že HTML funguje jinak. <a href="https://astexplorer.net/#/gist/348ec2af554ee77f2d6bb75eb6a593b3/4a0a58af209cb1a1ed65ed7acf62c6cf7fd1a8ad">Ukázka</a></p>

<p>Stejně se chová i nativní DOMParser v prohlížeč – <a href="https://kod.djpw.cz/txid">ukázka</a>.</p>

<p>Například jiný parser – <a href="https://github.com/fb55/htmlparser2">htmlparser2</a> – si poradí i s touto konstrukcí. <a href="https://astexplorer.net/#/gist/ea0e6360354eaadcf9ad97019fb6aeca/7807f07f5cd722c1bc93e29f36b81c81a9cb89d4">Ukázka</a></p>


<h2 id="hotova-reseni">Hotová řešení</h2>

<p>Nad těmito parsery existují potom další knihovny, které nabízí <b>přívětivější rozhraní</b> pro získávání obsahu nebo jeho modifikaci.</p>


<h3 id="jsdom">jsdom</h3>

<p><a href="https://github.com/jsdom/jsdom">jsdom</a></p>

<p>Snaží se mít stejné rozhraní jako běžné DOM JS funkce v prohlížeči.</p>

<pre><code>const dom = new JSDOM(`&lt;!DOCTYPE html>&lt;p>Hello world&lt;/p>`);
console.log(dom.window.document.querySelector("p").textContent);</code></pre>

<p>Knihovna jsdom se hodně používá pro <b>automatické testování</b> JS kódu, protože kromě využití k parsování dokáže kód i spouštět atd.</p>


<h3 id="cheerio">cheerio</h3>

<p><a href="https://github.com/cheeriojs/cheerio">cheerio</a></p>

<p>Implementuje styl zápisu ve stylu <b>jQuery</b>:</p>

<pre><code>const cheerio = require('cheerio');
const $ = cheerio.load('&lt;h2 class="title">Hello world&lt;/h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

$.html();
//=> &lt;html>&lt;head>&lt;/head>&lt;body>&lt;h2 class="title welcome">Hello there!&lt;/h2>&lt;/body>&lt;/html></code></pre>











<p>Například přidat pomocí cheeria <a href="/id">kotvy</a> pro <a href="/nadpisy">nadpisy</a> 1–3 jde následovně:</p>

<pre><code>const $ = cheerio.load(html);

$('h1, h2, h3').each((i, element) => {
    const html = $.html(element);
    $(element).replaceWith(`&lt;a name="nadpis-${i}">&lt;/a>${html}`);
});

return $.html();</code></pre>









<p>Dokáže pro parsování používat <b>parser5</b> i <b>htmlparser2</b>.</p>



<h3 id="deno-dom">Deno DOM</h3>

<p><a href="https://deno.land/x/deno_dom">Deno DOM</a></p>

<p>Při používání <a href="https://deno.land">Deno</a> místo Node se nabízí použít tuto knihovnu. Zpřístupní běžné DOM metody na straně serveru ve stylu nativního DOMParseru.</p>

<pre><code>import {
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
console.log(p.children[0].outerHTML); // "&lt;b>Deno&lt;/b>"</code></pre>















<h3 id="himalaya">Himalaya</h3>

<p><a href="https://github.com/andrejewski/himalaya">himalaya</a></p>

<p>Převádí HTML do JSONu a zpátky:</p>

<pre><code>import { parse } from 'himalaya'
console.log(parse(html))</code></pre>

<p>Pro následující kód:</p>

<pre><code>&lt;div class='post post-featured'>
  &lt;p>Himalaya parsed me...&lt;/p>
  &lt;!-- ...and I liked it. -->
&lt;/div></code></pre>

<p>Výstupem je potom obyčejný <a href="/json">JSON</a>:</p>

<pre><code>[{
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
}]</code></pre>



































<p>S ním je možné provádět standardními JS metodami pro práci s objekty, co je potřeba. A výsledek klidně zase převést do HTML přes <code>stringify</code>.</p>

<pre><code>import {parse, <b>stringify</b>} from 'himalaya'</code></pre>







<h3 id="hyntax">Hyntax</h3>

<p><a href="https://github.com/mykolaharmash/hyntax">hyntax</a></p>

<p>Další nástroj pro převod HTML do AST formátu bez dalších závislostí.</p>

<pre><code>const { tokenize, constructTree } = require('hyntax')
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
console.log(util.inspect(ast, { showHidden: false, depth: null }))</code></pre>

















<h3 id="unified">unified</h3>

<p><a href="https://github.com/unifiedjs/unified">unified</a></p>

<p>Unified je universální rozhraní pro parsování čehokoliv. Existuje do něj spoustu pluginů.</p>


<p>Pro parsování HTML slouží <a href="https://github.com/rehypejs/rehype">rehype</a> (existuje i třeba <a href="https://github.com/remarkjs/remark">remark</a> pro parsování <a href="/markdown">Markdownu</a> nebo <a href="https://github.com/retextjs/retext">retext</a> pro obyčejný text).</p>

<p>Pro <b>rehype</b> něj <a href="https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins">spoustu pluginů</a>, které řeší různé časté transformace HTML kódu.</p>