---
title: "CSS resetování"
headline: "Způsoby CSS resetování"
description: "Používat CSS reset, nebo ne? Jaká jsou pro a proti."
date: "2013-10-21"
last_modification: "2015-06-02"
status: 1
tags: ["css", "knihovny", "napady"]
format: "html"
---

<p>Pro známé HTML elementy (na rozdíl od <a href="/vlastni-html-znacky">neznámých</a>) mají prohlížeče své výchozí CSS předpisy.</p>


<h2 id="vychozi">Příklad výchozích hodnot</h2>

<p>Různé prohlížeče mají trochu odlišné výchozí CSS.</p>

<div class="external-content">
  <ul>   
    <li><b>Firefox</b>: <a href="http://hg.mozilla.org/mozilla-central/file/tip/layout/style/html.css">Výchozí CSS předpisy</a></li>    
    <li><b>Webkit</b>: <a href="http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css">Výchozí CSS</a></li>    
    <li><b>Internet Explorer</b>: <a href="http://www.iecss.com/">Přehled výchozích CSS pravidel různých IE</a></li>    
    <li>W3C: <a href="http://www.w3.org/TR/CSS2/sample.html">Default style sheet for HTML 4</a></li>    
  </ul>
</div>

<p>Následující obsah CSS pravidel pochází z W3C specifikace:</p>

<pre data-style="max-height: 50em; overflow: auto;"><code>html, address, blockquote,
body, dd, div, dl, dt, fieldset, form,
frame, frameset, h1, h2, h3, h4, h5, h6, 
noframes, ol, p, ul, center,
dir, hr, menu, pre   { display: block; unicode-bidi: embed }
li              { display: list-item }
head            { display: none }
table           { display: table }
tr              { display: table-row }
thead           { display: table-header-group }
tbody           { display: table-row-group }
tfoot           { display: table-footer-group }
col             { display: table-column }
colgroup        { display: table-column-group }
td, th          { display: table-cell }
caption         { display: table-caption }
th              { font-weight: bolder; text-align: center }
caption         { text-align: center }
body            { margin: 8px }
h1              { font-size: 2em; margin: .67em 0 }
h2              { font-size: 1.5em; margin: .75em 0 }
h3              { font-size: 1.17em; margin: .83em 0 }
h4, p, blockquote, ul, 
fieldset, form, 
ol, dl, dir,
menu            { margin: 1.12em 0 }
h5              { font-size: .83em; margin: 1.5em 0 }
h6              { font-size: .75em; margin: 1.67em 0 }
h1, h2, h3, h4,
h5, h6, b,
strong          { font-weight: bolder }
blockquote      { margin-left: 40px; margin-right: 40px }
i, cite, em,
var, address    { font-style: italic }
pre, tt, code,
kbd, samp       { font-family: monospace }
pre             { white-space: pre }
button, textarea,
input, select   { display: inline-block }
big             { font-size: 1.17em }
small, sub, sup { font-size: .83em }
sub             { vertical-align: sub }
sup             { vertical-align: super }
table           { border-spacing: 2px; }
thead, tbody,
tfoot           { vertical-align: middle }
td, th, tr      { vertical-align: inherit }
s, strike, del  { text-decoration: line-through }
hr              { border: 1px inset }
ol, ul, dir,
menu, dd        { margin-left: 40px }
ol              { list-style-type: decimal }
ol ul, ul ol,
ul ul, ol ol    { margin-top: 0; margin-bottom: 0 }
u, ins          { text-decoration: underline }
br:before       { content: "\A"; white-space: pre-line }
center          { text-align: center }
:link, :visited { text-decoration: underline }
:focus          { outline: thin dotted invert }

@media print {
  h1            { page-break-before: always }
  h1, h2, h3,
  h4, h5, h6    { page-break-after: avoid }
  ul, ol, dl    { page-break-before: avoid }
}
</code></pre>



























































<h2 id="proc">Proč resetovat?</h2>

<p>Cílem CSS resetu je <b>sjednotit výchozí pravidla napříč prohlížeči</b>, protože různé prohlížeče mohou mít trochu jiné výchozí hodnoty. Nebo nastavit nějaký <b>jednotný základní vzhled</b>.</p>

<p>Ohledně <i>CSS resetování</i> jsou čtyři možnosti:</p>

<ol>
  <li>všechno <b>vynulovat</b>,</li>
  <li>sjednotit <b>odlišné vlastnosti</b>,</li>
  <li>přednastavit nějaké <b>universální hodnoty</b>,</li>
  <li><b>neresetovat</b>.</li>
</ol>






<h2 id="hvezdickovy">Hvězdičkový reset</h2>

<pre><code>* {
  margin: 0; 
  padding: 0
}</code></pre>





<p>Jelikož hlavní rozdíly bývaly v hodnotách <a href="/margin"><code>margin</code></a> a <code>padding</code>, výše uvedený předpis je všem elementům sjednotí tím, že je vynuluje. A to, co se týče délky zápisu CSS pravidel, velmi stručně.</p>


<p>Kromě toho se tento postup může <b>hodit CSS začátečníkům</b>, kteří ještě pořádně neví, jaké <b>výchozí hodnoty daný element má</b>. Vyresetováním všeho mají jistotu, že se projeví jen vlastnoručně přidané <code>margin</code>y a <code>padding</code>y.</p>


<p>Dále je na první pohled na stránce patrné, které elementy je <b>ještě potřeba nastylovat</b>. <b>Nevýhodný</b> je naopak fakt, že <b>zapomenuté elementy</b> budou <b>špatně vypadat</b> – lepší výchozí hodnoty než žádné.</p>

<p>Hrozba <a href="/css-reset-formularu">nenávratného rozhození formulářů</a> už není v dnešní době <b>moc reálná</b> (pokud se neresetuje i <code>border</code> nebo <code>background</code>, což <a href="/vzhled-formularu">rozhodí systémový vzhled</a> formulářových prvků).</p>




<h2 id="normalisace">Konkrétní reset / normalisace</h2>

<p>Kromě resetování úplně všeho je možnost pečlivě vyjmenovat elementy s různými styly a ty <b>sjednotit napříč prohlížeči</b>.</p>

<p>To dělá třeba <a href="http://necolas.github.io/normalize.css/">normalize.css</a>. <b>Výhoda je</b>, že elementy, u kterých by se <b>dalo smířit s výchozím vzhledem</b>, není třeba po vynulování zvnovu deklarovat. <b>Nevýhodné</b> je pravděpodobné zanášení CSS spoustou <b>předpisů, které se na stránce nevyužijí</b> a obecně používání CSS, které není 100% pod kontrolou.</p>





<h2 id="sjednoceni">Sjednocení universálními hodnotami</h2>

<p>Další způsob je před psaním samotných CSS pravidel připojit CSS přepisy <b>sjednocují hodnoty ve všech prohlížečích</b> nastavením na nějaké <b>použitelné hodnoty</b>.</p>

<p>Existují hotová řešení (bývají součástní CSS frameworků – <a href="/semantic-ui">Semantic UI</a>, <a href="/kraken">Kraken</a> nebo <a href="http://twitter.github.io/bootstrap/">Bootstrap</a>), jejichž použitím se získá <b>shodný vzhled napříč prohlížeči</b> a většinou i v nějaké <b>hezčí podobě</b>, než bývají výchozí CSS.</p>

<p>Nevýhody jsou <b>znečištění CSS</b> spoustou zbytečného kódu, který se buď nepoužije, nebo stejně následně <b>přepíše</b>. Kromě toho podobně jako u <i>čistého CSS</i> je vhodné znát <b>výchozí hodnoty</b> daného frameworku, když je <b>bude potřeba přepisovat</b>.</p>





<h2 id="neresetovat">Neresetovat</h2>

<p>Nakonec je i řešení nic předem neresetovat a rovnou <b>psát vlastní CSS pravidla</b>. Jak bylo naznačeno, hodí se k tomu <b>znalost výchozích hodnot</b> (nebo větší trpělivost při ladění v různých prohlížečích).</p>





<h2 id="shrnuti">Shrnutí</h2>

<p>Těžko <b>obecně určit nejlepší postup</b>. Volba by měla záviset na konkrétním použití.</p>

<ol>
  <li>Vyhovuje-li výchozí <b>styl nějakého FW</b>, nemá většinou smysl <b>vynalézat kolo</b>, ale je vhodné framework použít.</li>
  
  <li>Naopak v případě, že cílový vzhled frameworku vůbec <b>neodpovídá</b> potřebnému vzhledu, moc se jeho použitím nezíská a jen uživatelé budou muset stahovat <b>zbytečná data navíc</b>. Kromě toho se snadno <b>zapomene na přestylování</b> obsahu ladícího k frameworku, ale neladícího k webu.</li>
  
  <li>Je třeba zvážit, zda <a href="#normalisace">normalisace</a> neřeší jen nepoužité elementy nebo sjednocuje jen elementy, <b>co by se stejně přestylovaly</b> — typicky třeba velikost a odsazení nadpisů, často i seznamy nebo formuláře. Podobně u <a href="/css-reset#hvezdickovy">hvězdičkového resetu</a> je teoreticky zbytečné elementy <i>vynulovat</i>, když se stejně vlastní hodnoty <b>později přepíší vlastními</b>.</li>
</ol>



<h2 id="odkaz">Odkazy jinam</h2>

<ul>
  <li>Six Revisions: <a href="http://sixrevisions.com/css/css-reset-stylesheets/">The Best CSS Reset Stylesheets</a> – seznam různých CSS resetů</li>
</ul>