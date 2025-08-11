---
title: "Query string v URL"
headline: "Query string v URL"
description: "Řetězec dotazu je část URL za otazníkem obsahující nejrůznější parametry."
date: "2025-03-24"
last_modification: "2025-08-11"
status: 1
tags: ["js", "html"]
format: "html"
---

<pre><code>https://example.com/produkty?<b>orderBy=price</b></code></pre>


<p>Obsah query stringu se obvykle zapisuje ve tvaru <code>parametr=hodnota</code> a více těchto dvojic se oddělí ampersandem (<code>&amp;</code>):</p>



<pre><code>https://example.com/produkty?orderBy=price<b>&amp;</b>sort=desc</code></pre>


<p>Historicky existovala v HTML značka <code>&lt;isindex></code>, která umožnila zadat uživateli vstup a ten se potom poslal na server za otazníkem.</p>

<p>Server tak mohl nabídnout například vyhledávání.</p>

<p>Je dost možné, že právě proto se tyto parametry v URL někdy označují i jako <i>search params</i>. A v JavaScriptu se dají získat z <code>window.location.<b>search</b></code> nebo moderněji z <code>URLSearchParams</code>.</p>




<p>Svého času se tyto parametry v URL využívaly v <a href="/php">PHP</a> aplikacích i pro kompletní routování. Celá aplikace klidně mohla být jediný soubor <code>index.php</code>, který přes obsah v URL za otazníkem rozhodoval, co se má vykreslit.</p>

<pre><code>https://example.com?page=kontakt</code></pre>





<p>Postupem času se přešlo k hezčím URL, kde jsou tyto parametry nenesoucí přílišnou hodnotu vypuštěny.</p>

<pre><code>https://example.com/kontakt</code></pre>




<p>Parametry v URL se tak používají zejména pro <b>vyhledávání, filtrování</b>, <a href="/strankovani">stránkování</a>, předávání identifikátorů nebo invalidace cache.</p>


<pre><code>https://www.google.com/search?q=je+cas</code></pre>





<h2 id="standardy">Standardy a základy</h2>

<p>Formát URL popisuje <a href="https://www.rfc-editor.org/rfc/rfc3986">RFC&nbsp;3986</a> a moderní chování prohlížečů sjednocuje <a href="https://url.spec.whatwg.org/">WHATWG URL Standard</a>.</p>

<p>V JavaScriptu je k dispozici rozhraní <code>URL</code> a <code>URLSearchParams</code>. Pro kódování existuje <code>encodeURIComponent</code> pro jednotlivé hodnoty a <code>encodeURI</code> pro celé URL.</p>


<h2 id="kodovani">Kódování hodnot</h2>

<ul>
  <li>Mezery mohou být kódovány jako <code>%20</code>.</li>
  <li>Diakritika a Unicode se kódují percent-encodingem (<code>%C4%8D</code> je <code>č</code> apod.).</li>  
</ul>


<h2 id="struktura">Struktura parametrů</h2>

<p>Pořadí klíčů může mít teoreticky vliv na funkci, ale nebývá to moc zvykem. Pro maximální stabilitu je vhodné klíče při serialisaci řadit.</p>

<pre><code>https://example.com/items?color=red&amp;color=blue
https://example.com/items?tags[]=a&amp;tags[]=b</code></pre>

<ul>
  <li>Klíče i hodnoty jsou case-sensitive.</li>
  <li>Duplicitní klíče mohou značit pole.</li>
  <li>Hranaté závorky a podobně v názvech klíčů (<code>tags[]</code>, <code>filter[price][min]</code>) jsou konvence pro zápis polí, ale prohlížeč je nějak speciálně neinterpretuje.</li>
</ul>

<pre><code>https://example.com/items?color=red&amp;color=blue
https://example.com/items?tags=a,b
https://example.com/items?filters=%5B%22a%22,%22b%22%5D
https://example.com/search?filter%5Bprice%5D%5Bmin%5D=100&amp;filter%5Bprice%5D%5Bmax%5D=200</code></pre>

<h3 id="prazdne-a-boolean">Prázdné hodnoty a přepínače</h3>

<ul>
  <li>Přítomnost klíče bez hodnoty může znamenat zapnutý přepínač (<code>?debug</code>).</li>
  <li><code>?q=</code> je prázdná hodnota, <code>?q</code> je jen přítomný klíč.</li>
</ul>

<pre><code>const params = new URL(location.href).searchParams;
params.has('debug');
params.get('q') === '';
</code></pre>

<h3 id="vnorene">Vnořené struktury</h3>

<p>Klíče typu <code>filter[price][min]</code> nejsou standardizované; klient i server se musí domluvit na stejném parsování. Prohlížeč je vrací jako stringové klíče.</p>

<h3 id="pole">Pole</h3>

<p>K úvaze je, jak řešit pole. Existují zpravidla 3 možnosti:</p>

<ol>
  <li>Duplicitní klíče representují pole (<code>getAll</code> je načte všechny).</li>
  <li>Jednotlivé položky pole se rozdělí třeba podle čárky.</li>
  <li>Pole se do URL dává jako serialisovaný JSON.</li>
</ol>

<h4 id="pole-duplicitni-klice">1) Duplicitní klíče</h4>

<p>Kompatibilní se <code>URLSearchParams</code>, zachová pořadí.</p>

<pre><code>https://example.com/products?color=red&amp;color=blue&amp;color=green</code></pre>

<pre><code>const url = new URL('https://example.com');
const params = url.searchParams;
const colors = params.getAll('color');
</code></pre>

<ul>
  <li><b>Výhody</b>: jasná semantika, podpora <code>getAll</code>, stabilní pořadí.</li>
  <li><b>Nevýhoda</b>: duplikování parametrů v URL zbytečně prodlužuje délku.</li>
</ul>

<h4 id="pole-csv">2) Oddělování čárkou</h4>

<p>Úsporné, ale naráží na kolize s oddělovačem a vyžaduje důsledné kódování.</p>

<pre><code>https://example.com/products?color=red,blue,green</code></pre>

<pre><code>const params = new URL(location.href).searchParams;
const values = (params.get('color') || '')
  .split(',')
  .filter(Boolean)
  .map(decodeURIComponent);
</code></pre>

<p>Sestavení URL:</p> 

<pre><code>const colors = ['light blue', 'red'];
const value = colors.map(encodeURIComponent).join(',');
const url = new URL('https://example.com');
url.searchParams.set('color', value);
url.toString();
</code></pre>

<ul>
  <li>Pro: jediný klíč, kratší než JSON.</li>
  <li>Proti: hodnoty nesmí obsahovat oddělovač bez kódování; křehké při ruční editaci.</li>
</ul>


<h4 id="pole-json">3) JSON</h4>

<p>Umožní libovolně komplexní struktury, ale je delší a hůře čitelný.</p>

<pre><code>https://example.com/products?filters=%5B%22red%22,%22blue%22%5D</code></pre>

<pre><code>const params = new URL(location.href).searchParams;
const raw = params.get('filters');
const filters = raw ? JSON.parse(decodeURIComponent(raw)) : [];
</code></pre>

<p>Naopak se tato adresa vytvoří pomocí <code>JSON.stringify</code>.</p>

<pre><code>const payload = ['red', 'blue'];
const url = new URL('https://example.com');
url.searchParams.set('filters', encodeURIComponent(JSON.stringify(payload)));
url.toString();
</code></pre>

<ul>
  <li>Pro: libovolné typy a vnoření.</li>
  <li>Proti: delší URL, horší čitelnost, nutné parsování a ošetření chyb.</li>
</ul>



<h2 id="js">Práce s URL v JavaScriptu</h2>

<p>JS nabízí jednoduché rozhraní pro práci s parametry v URL:</p>

<pre><code>const url = new URL('https://example.com/search?q=je+cas');
url.searchParams.get('q');
url.searchParams.append('page', '2');
url.searchParams.set('sort', 'desc');
url.searchParams.getAll('tag');
url.searchParams.delete('utm_source');
url.searchParams.sort();
url.toString();</code></pre>

<div class="external-content">
<ul>

  <li><a href="https://developer.mozilla.org/docs/Web/API/URLSearchParams">MDN: URLSearchParams</a></li>
  <li><a href="https://developer.mozilla.org/docs/Web/API/URL">MDN: URL</a></li>
  </ul>
  </div>

  <h2 id="knihovny">JS knihovny</h2>

<p>Pro běžné případy stačí <code>URL</code> a <code>URLSearchParams</code>. Pro vyšší kontrolu se hodí použít hotové řešení:</p>

<h3 id="query-string-lib">query-string</h3>

<div class="external-content">
<ul>
<li><a href="https://www.npmjs.com/package/query-string">query-string</a></li>
  </ul>
  </div>


<p>Jednoduché API, volitelný formát polí a stabilní serialisace.</p>

<pre><code>import { parse, stringify } from 'query-string';

parse('?q=je+cas&tag=red&tag=blue');
stringify({ q: 'je cas', tag: ['red', 'blue'] });
stringify({ tag: ['red', 'blue'] }, { arrayFormat: 'comma' });
stringify({ a: 'c', z: 'y', b: 'f' }, { sort: (a, b) => a.localeCompare(b) });
</code></pre>


<h3 id="qs-lib">qs</h3>

<div class="external-content">
<ul>
  <li><a href="https://www.npmjs.com/package/qs">qs</a></li>
  </ul>
  </div>

<p>Robustní parser/stringifier s podporou vnořených struktur přes hranaté závorky, ochrannými limity a bohatým nastavením.</p>

<pre><code>import qs from 'qs';

qs.parse('filter[price][min]=100&filter[price][max]=200&tags[]=a&tags[]=b');
qs.stringify({ filter: { price: { min: 100, max: 200 } }, tags: ['a', 'b'] });
qs.parse('a[b][c][d]=1', { depth: 2 });
qs.parse('a=1&b=2&c=3', { parameterLimit: 2 });
qs.parse('foo=bar&foo=baz', { duplicates: 'first' });
</code></pre>


<h2 id="limity-get">Maximální délka query parametrů</h2>

<p>Standard pevný limit neurčuje; praktické maximum závisí na prohlížeči a infrastruktuře (proxy/CDN/webserver). Délka se počítá pro celou URL (cesta + názvy query parametrů + jejich hodnoty).</p>

<p>Bezpečné doporučení velikosti URL je do <b>2&nbsp;kB</b> pro širokou kompatibilitu. Starší prohlížeče (IE) měly limit kolem 2&nbsp;kB.</p>

<p>Typické výchozí limity serverů bývají kolem 8&nbsp;kB nebo i více. Moderní prohlížeče zvládnou mnohem více, ale limitem bývá server.</p>
  <p>Při překročení se obvykle vrací <code>414 URI Too Long</code> nebo <code>400 Bad Request</code>.</p>

<p>U velkých dat je tak lepší použít metodu POST.</p>


<h2 id="hash">Query vs. hash</h2>

<p><code>?</code> se posílá na server, <code>#</code> ne.</p>

<p>Z toho plynou různé důsledky, kdy je co lepší použít.</p>

<p>Hash se tak hodí v případech, kdy je cílem přes URL sdílet data, která nemá server vidět. Nebo pro odrolování na část stránky pomocí #kotvy.</p>

<p>Skoro ve všech ostatních případech je lepší použít query parametr.</p>

<p>V URL parametrech by nemělo být nic citlivého, kde by hrozilo risiko při úniku.</p>

<p>Adresa se totiž může někam dostat jako referer, může být v logách nebo ji mohou uložit různé analytické nástroje. Jednou jsem takhle zachraňoval objednávky e-shopu přes Google Analytics :–)</p>


<h2 id="vykon-cache">Výkon a cache</h2>

<ul>
  <li>CDN/cache často klíčuje podle cesty a query. Nepodstatné parametry mohou cache tříštit.</li>
  <li>Někdy se toho cíleně využívá pro invalidaci cache u statických souborů (<code>?v=123</code>).</li>
</ul>

<h2 id="seo">SEO</h2>

<p>Z pohledu vyhledávače je každá URL s jiným obsahem query stringu <i>samostatná stránka</i>.</p>

<p>Z toho plyne risiko duplicitních stránek.</p>


<pre><code>https://example.com/produkty
https://example.com/produkty?a
https://example.com/produkty?b</code></pre>






<p>Všechny tyto stránky mohou vracet stejný obsah, ale vyhledávač se musí rozhodnout, kterou z nich upřednostnit.</p>

<p>Dokonce i následující URL mohou teoreticky vracet různý obsah:</p>

<pre><code>https://example.com/produkty?orderBy=price&amp;sort=desc
https://example.com/produkty?sort=desc&amp;orderBy=price</code></pre>


<p>Většinou se to řeší <b>kanonickým odkazem</b>, který jasně definuje, která varianta je preferovaná. Pomáhá také stabilizace pořadí parametrů a odstraňování šumových klíčů (např. UTM):</p>

<pre><code>&lt;link href="https://example.com/produkty" rel="canonical"></code></pre>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://www.jakpsatweb.cz/clanky/fosilie-isindex.html">Živá fosílie HTML – ISINDEX</a></li>
</ul>