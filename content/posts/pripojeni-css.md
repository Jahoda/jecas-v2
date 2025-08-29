---
title: "Připojení CSS do stránky"
headline: "Vložení CSS do stránky"
description: "Jakými všemi způsoby připojit CSS do stránky."
date: "2025-08-28"
last_modification: "2025-08-29"
status: 1
tags: ["css", "html", "zrychlovani"]
format: "html"
---

<h2 id="http-hlavicka">HTTP hlavička</h2>

<p>Asi nejméně známý a nejrychlejší způsob připojení CSS je přes HTTP hlavičku. Prohlížeč si stáhne CSS soubor ještě před načtením HTML dokumentu. Tato metoda je vhodná pro kritické styly, které musí být načteny co nejdříve.</p>

<p>Moc se nepoužívá, protože historicky to nefungovalo v <b>IE</b> a starém <b>Edge</b>.</p>

<p>S tlakem na <a href="/zrychlovani">zrychlování webu</a> nyní dobře podporované napříč prohlížeči.</p>

<p>Implementace v Node.js:</p>

<pre><code>response.setHeader('Link', '&lt;styl.css>; rel=stylesheet');</code></pre>

<p>Příklad implementace v PHP:</p>

<pre><code>&lt;?php
header("Link: &lt;styl.css>; rel=stylesheet");
?></code></pre>


<p>Připojení přes HTTP hlavičku má několik důležitých omezení:</p>

<ul>
  <li><strong>Nefunguje v Internet Exploreru</strong> – žádná verze IE nepodporuje <code>Link</code> hlavičku pro CSS</li>
  <li><strong>Vyžaduje server-side kód</strong> – nelze použít na statických stránkách</li>
  <li><strong>Omezené možnosti</strong> – nelze použít <a href="/media">media queries</a> nebo podmíněné načítání</li>
  <li><strong>Cache management na straně serveru</strong> – cache musí být řízena na serveru, což může být méně praktické než u <code>&lt;link&gt;</code> elementu</li>
</ul>

<h2 id="externi-soubor">Externí soubor</h2>

<pre><code>&lt;link rel="stylesheet" href="styl.css"&gt;</code></pre>

<p>Nejčastější a doporučený způsob připojení CSS. Externí soubor umožňuje:</p>

<ul>
  <li>Znovupoužití stylů na více stránkách</li>
  <li>Start načítání CSS bez zpracování HTML kódu</li>
  <li>Cacheování prohlížečem</li>
  <li>Snadnou údržbu a aktualisaci</li>
  <li>Oddělení obsahu od presentace</li>
</ul>

<h3>Připojení s atributy</h3>

<pre><code>&lt;link rel="stylesheet" href="styl.css" media="print"&gt;
&lt;link rel="stylesheet" href="styl.css" media="screen and (max-width: 768px)"&gt;</code></pre>

<h3>Použití data URL</h3>

<p>Specifický případ použití je <code>&lt;link&gt;</code> s data URL:</p>

<pre><code>&lt;link rel="stylesheet" href="data:text/css,body{background:lime}"&gt;</code></pre>

<p>Jde tak vložit na stránku CSS bez načítání externího souboru, které se ale jinak chová jako externě připojený skript.</p>

<p>Oproti <code>&lt;style&gt;</code> na takový styl jde použít <code>media</code> atributy nebo s ním pracovat v JS jako s jiným externím stylem, tj. bude dostupný v <code>document.styleSheets</code> a půjde vypnout přes <code>link.disabled = true</code>.</p>

<p>Občas se dá použít k různým hackům.</p>

<h2 id="interni-stylesheet">Interní stylesheet</h2>

<pre><code>&lt;style&gt;
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
&lt;/style&gt;</code></pre>

<p>Styly definované přímo v HTML dokumentu. Vhodné pro:</p>

<ul>
  <li>Jedinečné styly specifické pro danou stránku</li>
  <li>Rychlé testování a prototypování</li>
  <li>Styly, které se nemají cacheovat</li>
  <li>Kritické CSS – pro zrychlení prvního načítání dává smysl poslat styly potřebné pro oblast ve viewportu rovnou s HTML kódem</li>
</ul>

<h2 id="inline-styles">Inline styly</h2>

<pre><code>&lt;div style="color: red; font-size: 16px;"&gt;Text&lt;/div&gt;</code></pre>

<p>Styly aplikované přímo na HTML element. Používejte pouze pro:</p>

<ul>
  <li>Dynamické styly generované JavaScriptem</li>
  <li>Jedinečné styly pro konkrétní element</li>
  <li>Testování a debugování</li>
</ul>

<p>Inline styly mají nejvyšší prioritu a obtížně se udržují.</p>

<h2 id="import-pravidlo"><code>@import</code> pravidlo</h2>

<h3>V CSS souboru</h3>

<pre><code>@import url('styl.css');
@import url('styl.css') print;
@import url('styl.css') screen and (max-width: 768px);</code></pre>

<h3>V HTML dokumentu</h3>

<pre><code>&lt;style&gt;
@import url('styl.css');
&lt;/style&gt;</code></pre>

<p>Pravidlo <code>@import</code> umožňuje vkládání CSS souborů do jiných CSS souborů. Nebo i přímo do HTML přes značku <code>&lt;style&gt;</code>.</p>

<p>Má výkonové problémy, protože jedno CSS čeká na druhé.</p>

<p>Mohlo by se zdát, že použít ho přímo v HTML by nemusel být problém, ale opak je pravdou:</p>

<h3>Proč je @import v HTML horší než &lt;link&gt;?</h3>

<p>Při použití <code>&lt;style&gt;@import url('styl.css');&lt;/style&gt;</code> v HTML nastává několik problémů:</p>

<ul>
  <li><strong>Sekvenční načítání:</strong> Prohlížeč musí nejdříve stáhnout HTML, pak zpracovat <code>&lt;style&gt;</code> tag, a teprve potom začít stahovat CSS soubor. U <code>&lt;link&gt;</code> se CSS stahuje paralelně s HTML.</li>
  <li><strong>Blokování renderování:</strong> <code>@import</code> blokuje zpracování dalších <code>&lt;style&gt;</code> tagů, dokud se nestáhne importovaný soubor</li>
  <li><strong>Nemožnost preloadu:</strong> Prohlížeč nemůže předem načíst CSS soubor, protože neví o jeho existenci před zpracováním <code>&lt;style&gt;</code> tagu</li>
</ul>


<h2 id="priorita">Priorita načítání</h2>

<p>Prohlížeč zpracovává CSS v následujícím pořadí priority:</p>

<ol>
  <li>Inline styly (nejvyšší priorita)</li>
  <li>Interní <code>&lt;style&gt;</code> tag</li>
  <li>Externí CSS soubory (v pořadí v HTML)</li>
  <li><code>@import</code> pravidla</li>
</ol>

<h2 id="javascript">JavaScript</h2>

<p>V JS jde připojit CSS stejnými principy, jako se tak děje v HTML. Nejčastěji značkou <code>&lt;link&gt;</code>:</p>

<pre><code>// Dynamické vytvoření link elementu
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'styl.css';
document.head.appendChild(link);</code></pre>

<p>Možné je i CSS stáhnout metodou <code>fetch</code> a vložit do značky <code>&lt;style&gt;</code>.</p>

<pre><code>// Načtení CSS jako text
fetch('styl.css')
  .then(response => response.text())
  .then(css => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  });</code></pre>

<p>JavaScript umožňuje <a href="nacitani-css">dynamické načítání CSS</a> podle potřeby aplikace.</p>

<p>Připojováním CSS přes JS jde značně zpomalit jeho aplikování, ale v některých případech to může být žádoucí – skriptem připojené CSS neblokuje vykreslování.</p>

<h3>CSS přes JavaScript vlastnosti</h3>

<p>Druhá možnost je přiřazovat přímo <code>style</code>:</p>

<pre><code>// Přímé nastavení style vlastnosti
element.style.backgroundColor = 'blue';
element.style.color = 'white';
element.style.padding = '10px 20px';

// Nastavení více vlastností najednou
Object.assign(element.style, {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  border: '2px solid blue',
  borderRadius: '4px'
});</code></pre>

<p>Další možnost je použít <code>setProperty</code>:</p>

<pre><code>document.documentElement.style.setProperty('background', 'lime');</code></pre>

<p>Případně jde v JS přidávat pravidla přímo do <code>styleSheets</code>:</p>

<pre><code>document.styleSheets[0].insertRule("body { background: red; }", 0);</code></pre>

<h3>Historická vlastnost <code>behaviour</code></h3>

<p>Internet Explorer měl specifickou CSS vlastnost <code>behaviour</code>, která umožňovala připojení HTC (HTML Components) souborů přímo přes CSS:</p>

<pre><code>&lt;style>
/* CSS - připojení HTC souboru */
.element {
  behaviour: url(component.htc);
}
&lt;/style>

&lt;div class="element"&gt;Obsah&lt;/div&gt;</code></pre>

<p>HTC soubor se načetl automaticky a jeho obsah (včetně CSS) se aplikoval na element s touto vlastností.</p>

<p>Šlo tak přes CSS vlastnost načíst další CSS :–)</p>

<h2 id="preload-prefetch">Preload a prefetch</h2>

<pre><code>&lt;link rel="preload" href="kriticky.css" as="style" onload="this.onload=null;this.rel='stylesheet'"&gt;
&lt;link rel="prefetch" href="nekriticky.css"&gt;</code></pre>

<p>Optimalisace načítání CSS:</p>

<ul>
  <li><strong><code>preload</code>:</strong> Načte kritické CSS s vysokou prioritou</li>
  <li><strong><code>prefetch</code>:</strong> Načte CSS s nízkou prioritou pro budoucí použití</li>
</ul>

<h2 id="iframe-object-embed">Iframe, Object a Embed</h2>

<p>Externí CSS lze vložit do stránky <code>&lt;iframe&gt;</code>, <code>&lt;object&gt;</code> nebo <code>&lt;embed&gt;</code> elementů.</p>

<p>Akorát v tomto případě se vloží jako prostý text.</p>

<h2 id="moderni-pristupy">Moderní buildovací nástroje</h2>

<p>V dnešní době už vývojář často ani neřeší způsob vložení CSS ručně, ale stará se o to framework a buildovací nástroj – např. <a href="https://vite.dev/">Vite</a>.</p>

<p>Výsledkem potom často je, že autor ani netuší, jak se kde a jaké CSS připojuje. Ale build nástroj si to nějak vymyslí sám. Tento web je toho příkladem.</p>

<h2 id="doporučení">Doporučení</h2>

<ul>
  <li>Pro většinu případů používejte externí CSS soubory s <code>&lt;link&gt;</code> elementem</li>
  <li>Kritické styly načtěte přes HTTP hlavičku nebo <code>preload</code></li>
  <li>Inline styly používejte pouze pro dynamické styly</li>
  <li><code>@import</code> se vyhněte kvůli horšímu výkonu</li>
</ul>