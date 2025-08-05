---
title: "Kdy začne stahování <img> obrázku"
headline: "Kdy začne stahování <code>&lt;img></code> obrázku"
description: "Kdy se začne stahovat obrázek připojený značkou <code>&lt;img></code>."
date: "2015-11-03"
last_modification: "2015-11-04"
status: 1
tags: ["html", "obrazky", "webove-prohlizece", "zrychlovani"]
format: "html"
---

<pre><code>&lt;img style="<b>display: none</b>" src="obrazek.png"></code></pre>


<p>Stáhne se neviditelný soubor s obrázkem, nebo ne?</p>

<p>A co takto jako CSS pozadí?</p>

<pre><code>&lt;div style="background: url(obrazek.png); <b>display: none</b>">
&lt;/div></code></pre>




<p>Chování CSS <code>background</code>u se liší napříč prohlížeči (viz níže). Všechny prohlížeče se ale shodují v tom, že obrázek ve značce <code>&lt;img></code> se <b>stáhne vždy</b>. I když je skrytý přes CSS <a href="/display#none"><code>display: none</code></a>.</p>


<p>Je tomu tak nejspíš proto, že se prohlížeče snaží pro rychlejší načítání <b>stahovat externí objekty co nejdříve</b>. Tedy už v případě, kdy dorazí HTML kód.</p>


<p>Pokud by se <code>&lt;img></code> s <code>display: none</code> neměl stahovat, musel by se nejdříve vyřešit jeho styl. To by znamenalo počkat na stažení CSS souborů a i blokujících JavaScriptů, následně by se sestavil CSSOM (<i lang="en">CSS Object Model</i>) a až teprve potom by se rozhodlo o stažení obrázku.</p>


<p>Více o vykreslování je v článku:</p>

<div class="internal-content">
  <ul>
    <li><a href="/vykreslovani">Jak funguje vykreslování stránky</a> – co prohlížeč dělá s webovou stránkou při vykreslování.</li>
  </ul>
</div>

<p>Prohlížeče tedy raději <code>&lt;img></code> stáhnou, i když se nakonec nezobrazí.</p>

<p>Ze stejného důvodu rychlejšího startu načítání <b>není nejlepší řešení</b> připojovat <code>*.css</code> a <code>*.js</code> soubory <a href="/nacitani-css#async">asynchronně JavaScriptem</a>. Prohlížeč tyto soubory nezačne načítat tak brzo, jak by mohl, kdyby byly v HTML. Musí napřed spustit JS kód.</p>



<h2 id="resource-hints">Resource Hints</h2>

<p>Pro ještě <b>rychlejší start načítání externích souborů</b> prohlížeče zavádějí tzv. <i lang="en">resource hints</i>. Jedná se o zvláštní HTTP hlavičky, které server pošle prohlížeči ještě před samotným HTML kódem.</p>

<p>Prohlížeč tak může začít stahovat požadované soubory ještě před tím, než mu dorazí jediný znak HTML kódu.</p>

<p>Slouží k tomu HTTP hlavička <code>Link</code> s nastavením <code>preconnect</code>/<code>prefetch</code>:</p>

<div class="internal-content">
  <ul>
    <li><a href="/google-prefetch">Google zrychlil načítání na mobilech</a> – pomocí <code>prefetch</code></li>
    
    <li><a href="/preconnect">Preconnect – zrychlení stahování z více domén</a></li>
  </ul>
</div>

<p>Specifikace počítá ještě s hodnotami <code>dns-prefetch</code> a <code>prerender</code> (renderování stránky dopředu):</p>

<div class="external-content">
  <ul>
    <li>W3C: <a href="https://w3c.github.io/resource-hints/">Resource Hint</a></li>
  </ul>
</div>

<h2 id="zabranit">Jak zabránit stažení <code>&lt;img></code></h2>

<p>Tato chytrá vlastnost prohlížečů je značnou překážkou při <a href="/lazy-loading-obrazky">lazy loadingu obrázků</a>, kdy je potřeba automatickému načtení obrázku zabránit.</p>


<p>Podle mých testů je jediné řešení funkční napříč prohlížeči značka <b href="/noscript"><code>&lt;noscript></code></b>:</p>

<pre><code>&lt;noscript>
  &lt;img src="obrazek.png">
&lt;/noscript></code></pre>




<p>Případně tedy nepoužívat <code>&lt;img src></code>, ale doplnit tuto konstrukci až JavaScriptem, když je obrázek potřeba.</p>

<p>Tímto způsobem se řeší lazy-loading v <a href="/amp-html">AMP HTML</a>, kde je pro obrázek zvláštní značka <code>&lt;amp-img></code>.</p>


<h3 id="pokusy">Pokusy</h3>

<p>Následující pokusy o zabránění selhávají:</p>

<ol>
  <li><p>Skrytí přes <code>display: none</code>.</p></li>  
  <li><p>Použití značky <a href="/template"><code>&lt;template></code></a> funguje pouze v <b>Chrome</b> / nové <b>Opeře</b>.</p></li>  
  <li>
    <p>Nestažení obrázku nezabrání ani <a href="/hidden">atribut <code>hidden</code></a>.</p>
  </li>  
  <li>
    <p>Obrázek se stáhne, i když je nepoužitý uvnitř značky <code>&lt;object></code>.</p>
  </li>
  <li>
    <p>Vypsání neexistujícího skriptu skriptem kolem obrázku stažení nezabrání.</p>
  </li>
</ol>

<p><a href="http://kod.djpw.cz/ovrb">Živá ukázka</a> – test pokusů o zabránění načtení obrázku</p>





<h2 id="css-pozadi">Stahování CSS pozadí</h2>

<p><b>Internet Explorer</b>, <b><a href="/microsoft-edge">Edge</a></b>, <b>Chrome</b> a <b>Opera 15+</b> stahují obrázky i u elementů s <code>display: none</code>.</p>

<pre><code>&lt;div style="background: url(obrazek.png); <b>display: none</b>">
&lt;/div></code></pre>



<p>Soubor <code>obrazek.png</code> z ukázky nebude stažen ve <b>Firefoxu</b> a staré <b>Opeře 12</b>.</p>

<p>Na funkci nemá vliv, jestli je styl obrázku zapsán <i>inline</i> stylem v HTML atributu <code>style</code> nebo přiřazen pomocí třídy.</p>

<p>Obrázky v CSS předpisu pro <b>nepoužité elementy</b> se ale už nestahují vůbec nikde.</p>

<pre><code>.nepouzita-trida {
  /* obrázek se nestáhne, dokud se třída nepoužije */
  background: url(obrazek.png);
}</code></pre>




<p>Obrázek z CSS se stáhne až v momentě, kdy se daný předpis na stránce použije.</p>




<h3 id="media">Pravidlo <code>@media</code></h3>

<p>Obrázky na pozadí v <code>@media</code> podmínkách se potom chovají jako nepoužité předpisy.</p>

<pre><code>.trida {
  background: url(velky.png);
}
@media (max-width: 50em) {
  .trida {
    background: url(maly.png);
  }
}</code></pre>








<p>Do šířky <code>50em</code> se stáhne <b>pouze</b> obrázek <code>maly.png</code>, jinak pouze <code>velky.png</code>.</p>

<p>Změna velikosti okna již načtené stránky a aplikování různých předpisů v <code>@media</code> potom teprve vyvolá načtení jiného obrázku z příslušného <code>@media</code> bloku.</p>



<h2 id="sprite-img">CSS sprite v <code>&lt;img></code></h2>

<p>Zajímavou věc jde pozorovat ve výsledcích vyhledávání na <a href="/google">Google</a>.</p>

<p>Google logo je zdánlivě vložené značkou <code>&lt;img></code>, ale ve skutečnosti se jedná o <a href="/css-sprite">sprite obrázek</a>:</p>

<p><img src="/files/zacatek-stahovani-obrazku/google-sprite.png" alt="Sprite obrázků Google" class="border"></p>




























<p>Pomocí <a href="/position">posicování</a> a oříznutí je z tohoto obrázku vidět jen samotné logo:</p>

<p><img src="/files/zacatek-stahovani-obrazku/google-img-sprite.png" alt="Sprite obrázků Google" class="border"></p>
























<p>Nabízí se vysvětlení, že je to právě kvůli rychlejšímu startu stahování obrázků.</p>
