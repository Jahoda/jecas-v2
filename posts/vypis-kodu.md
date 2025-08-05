---
title: "Výpis zdrojového kódu"
headline: "Výpis zdrojového kódu"
description: "Jak na HTML stránce vypisovat zdrojové kódy."
date: "2014-10-31"
last_modification: "2015-07-12"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Ze sémantického hlediska jsou důležité hlavně dvě značky:</p>

<ul>
  <li><code>&lt;code></code></li>
  <li><code>&lt;pre></code></li>
  <li><code>&lt;var></code></li>
</ul>




<h2 id="code">Značka <code>&lt;code></code></h2>

<p>Slouží pro <b>zdrojový kód</b> zapsaný v řádku. Výchozí zobrazení značky <code>&lt;code></code> je řádkové a zobrazuje se <code class="live">neproporcionálním</code> písmem (<code><a href="/font#family">font-family</a>: monospace</code>).</p>

<p>Příklad řádkového použití <code>&lt;code></code>:</p>

<pre><code>&lt;p>
  Pro nastavení rámečku slouží 
  CSS vlastnost <b>&lt;code></b>border<b>&lt;/code></b>
&lt;/p></code></pre>








<h2 id="pre">Značka <code>&lt;pre></code></h2>

<p>Pokud se jedná o blok kódu, obalí se <code>&lt;code></code> ještě do značky <code>&lt;pre></code>:</p>

<pre><code><b>&lt;pre>&lt;code></b>zdrojový kód
přes více řádků<b>&lt;/code>&lt;/pre></b></code></pre>



<p>Značka <code>&lt;pre></code> slouží pro text, u kterého <b>záleží na bílých znacích</b> (mezery, tabulátory, odřádkování). Není nutné ji tedy používat spolu s <code>&lt;code></code>, pokud v ní není kód, ale <i>předformátovaný</i> obsah.</p>

<p>Standardní chování v HTML bere jakékoliv bílé znaky (i v několika opakování za sebou) jako <b>jednu mezeru</b>.</p>

<pre><code>&lt;p>
  Text s    hodně mezerami,
  tabulátory a novými
  řádky.
&lt;/p></code></pre>

<p>Proto tento kód bude ve výsledku celkem normální.</p>

<div class="live no-source">
  <style>.bile-znaky {white-space: pre}</style>
<p id="sBilymyZnaky">
  Text s    hodně mezerami,
  tabulátory a novými
  řádky.
</p></div>

<p>Z pohledu CSS má ale <code>&lt;pre></code> nastaven vlastnost <code>white-space</code> na <code>pre</code>, což způsobí <b>zachování všech bílých znaků</b>.</p>

<p>
  <button onclick="toggle(sBilymyZnaky, 'bile-znaky')">
    Změnit nastavení bílých znaků
  </button>
</p>

<p>Toto chování je ale u <b>zdrojových kódů</b> žádoucí.</p>




<h2 id="var">Značka <code>&lt;var></code></h2>

<p>Řádková značka <code>&lt;var></code> slouží k označení proměnné. Zobrazuje se <var class="live">kursivou</var>.</p>

<p>Proměnná může být v matematickém vzorci:</p>

<pre><code>&lt;p>
  &lt;var>x&lt;/var> = &lt;var>y&lt;/var> + 1
&lt;p></code></pre>





<p>Případně i ve zdrojovém kódu. Příklad JS kódu:</p>

<pre><code>var &lt;var>promenna&lt;/var> = 1;</code></pre>



<p>Značka <code>&lt;var></code> se moc často nepoužívá.</p>



<h2 id="osetreni">Ošetření HTML řídicích znaků</h2>

<p>Aby prohlížeče neinterpretovaly zdrojový kód jako HTML, je potřeba odstranit (převést na <a href="/entity">entity</a>) tzv. <b>řídicí znaky</b>. Ty v praxi existují dva:</p>

<ul>
  <li><code>&lt;</code> – slouží pro <b>otevření/uzavření HTML značky</b></li>
  
  <li><code>&amp;</code> – označuje začátek <b>entit</b></li>
</ul>

<p>Znak <code>&lt;</code> se zapíše entitou „<code>&amp;lt;</code>“, <code>&amp;</code> potom jako „<code>&amp;amp;</code>“.</p>

<p>V PHP jde tento převod zajistit funkcí <code>htmlspecialchars</code>.</p>




<h3 id="xmp"><code>&lt;xmp></code></h3>

<p>Značky <code>&lt;xmp></code> a i <a href="/textarea"><code>&lt;textarea></code></a> mají jednu společnou a zajímavou funkci – HTML kód, který bude uvnitř, <b>nebude interpretován</b> jako HTML – s výjimkou ukončovacích značek (<code>&lt;/xmp></code>, respektive <code>&lt;/textarea></code>) těchto elementů.</p>

<pre><code>&lt;xmp>
  &lt;p>Zde může být HTML, které &lt;b>nebude&lt;/b> interpretováno.&lt;/p>
&lt;xmp></code></pre>

<p><a href="http://kod.djpw.cz/kqib">Živá ukázka</a></p>





<h3 id="plaintext"><code>&lt;plaintext></code></h3>

<p>Značka <code>&lt;plaintext></code> potom funguje jako <code>&lt;xmp></code> jen ji není možné uzavřít. Veškerý obsah za ní až do konce dokumentu se <b>nebude interpretovat jako HTML</b>.</p>

<p><a href="http://kod.djpw.cz/jqib">Živá ukázka</a></p>




<h3 id="listing"><code>&lt;listing></code></h3>

<p>Ještě existuje další zastaralá značka – <code>&lt;listing></code> – v ní se HTML kód normálně objeví, chová se hodně podobně jako <code>&lt;pre></code>.</p>

<div class="external-content">
  <p>Používá ji <b>Chamurappi</b> na <a href="http://webylon.info/">Webylonu</a>.</p>
</div>

<p><a href="http://kod.djpw.cz/lqib">Živá ukázka</a></p>






<h2 id="podobne">Podobné značky</h2>

<p>V HTML existují ještě podobné značky.</p>



<h3 id="samp"><code>&lt;samp></code></h3>

<p>Zobrazuje se jako řádkový <samp class="live">neproporcionálním</samp> písmem, tedy obdobně jako <code>&lt;code></code>.</p>

<p>V překladu znamená <i>vzorek</i> (z anglického <i lang="en">sample</i>). Hodí se pro obalení <b>výstupu z počítačového programu</b> – tedy například <b>chybové hlášky</b>, výstupu z příkazové řádky a podobně.</p>

<p>Pro použití jako bloku je třeba <code>&lt;samp></code> zkombinovat s <code>&lt;pre></code>.</p>

<pre><code>&lt;pre>&lt;samp>Fatal error: Maximum execution time of 5 seconds exceeded in&lt;/pre>&lt;/samp></code></pre>





<h3 id="tt"><code>&lt;tt></code></h3>

<p>Značka <code>&lt;tt></code> je už <i lang="en">obsolete</i> – tj. zastaralá, překonaná a <b>neměla by se používat</b>. Zobrazuje se stejně jako <code>&lt;code></code> nebo <code>&lt;span></code> v řádku a <tt class="live">neproporcionálním</tt> písmem.</p>

<p><b>Yuhů</b> ji popsal následovně:</p>

<blockquote cite="http://www.jakpsatweb.cz/html/text.html#tt">
  <p>Teletypový terminál. Že nevíte, co to je? Já také ne. (Nabízí se výraz "dálnopis", což ale problematiku spíše zatemňuje. Asi je to text konzoly vzdáleného připojení terminálu.) Zobrazováno strojopisem, tedy obvykle písmem Courier (ale ne vždy).</p>
  <p class="autor">Yuhů, <a href="http://www.jakpsatweb.cz/html/text.html#tt">Úprava textu</a></p>
</blockquote>





<p>Příklad z <a href="http://devdocs.io/html/element/tt">DevDocs</a>:</p>

<pre><code>&lt;p>
  Enter the following at the telnet 
  command prompt: &lt;code>set localecho&lt;/code>
  &lt;br>
  The telnet client should display: 
  &lt;tt>Local Echo is on&lt;/tt>
&lt;/p></code></pre>