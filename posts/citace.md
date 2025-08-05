---
title: "Citace v HTML"
headline: "Citace v HTML"
description: "Jaké značky se v HTML používají pro označení citovaného textu."
date: "2015-07-07"
last_modification: "2015-07-10"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Čas od času je vhodné na webu <b>citovat kus cizího obsahu</b> (případně citovat sám sebe).</p>

<p>Když se do stránky hodí přidat kus obsahu ze stránky jiné, je někdy <b>problematické použít prostý odkaz</b>:</p>

<ol>
  <li>odkazem nemusí jít <b>přesně zaměřit</b> kýžená část textu,</li>
  <li>odkaz na jinou stránku by zbytečně <b>odváděl pozornost</b> od čtení původní stránky,</li>
  <li>není jisté, jestli cíl odkazu <b>vydrží delší dobu</b> (to není jisté v podstatě nikdy),</li>
  <li>je žádoucí v textu provést <b>vlastní úpravy/zvýraznění</b>,</li>
  <li>není kam odkázat, protože obsah například <b>přišel e-mailem</b> / kontaktním formulářem</li>
</ol>



<p>Minimálně z těchto důvodů se citace používá.</p>




<h2 id="blockquote">Bloková citace <code>&lt;blockquote></code></h2>

<p>Pro citování <b>většího množství obsahu</b> slouží element <code>&lt;blockquote></code>. Je blokový s povinnou počáteční i uzavírací značkou. Ve <a href="/css-reset#vychozi">výchozím stylu</a> prohlížečů má nastaven <a href="/margin"><code>margin</code></a> přibližně takto:</p>

<pre><code>blockquote {
  margin-top: 1.12em;
  margin-right: 40px;
  margin-bottom: 1.12em;
  margin-left: 40px;
}</code></pre>








<p>Teoreticky pomocí něj jde citovat i úplně celou stránku, takže může obsahovat prakticky libovolné značky, včetně dalšího <code>&lt;blockquote></code>.</p>


<div class="live">
  <blockquote>Citovaný obsah
    <blockquote>
      <p>Citace v odstavci druhé úrovně</p>
    </blockquote>
  </blockquote>
</div>



<p>Kvůli jednotnosti odsazení mezi citacemi s jedním a více odstavců je dobré používat uvnitř <code>&lt;blockquote></code> ještě značku <code>&lt;p></code>.</p>




<h3 id="blockquote-cite">Zdroj citace, atribut <code>cite</code></h3>

<p>Značka <code>&lt;blockquote></code> má speciální atribut <code>cite</code> pro uvedení zdroje.</p>

<pre><code>&lt;blockquote <b>cite</b>="http://example.com">
  &lt;p>Citovaný text&lt;/p>
&lt;/blockquote></code></pre>




<p>Vtip je v tom, že tento zdroj se návštěvníkům <b>nikde nezobrazuje</b>. Nezbývá tedy než odkaz na zdroj přidat ručně pomocí běžného odkazu.</p>




<h3 id="zdroj">Viditelné uvedení zdroje</h3>

<pre><code>&lt;blockquote cite="<b>http://example.com</b>">
  &lt;p>Citovaný text&lt;/p>
  &lt;p>
    — &lt;a href="<b>http://example.com</b>">Example.com&lt;/a>
  &lt;/p>
&lt;/blockquote></code></pre>







<p>Výše uvedený zápis ale není úplně v souladu se specifikací značky <code>&lt;blockquote></code>, která tvrdí, že uvnitř má být jen citovaný obsah, což uvedení zdroje jaksi není.</p>

<p>HTML kód citace by měl být ideálně navržen tak, aby šlo strojově určit, co je citace a co už ne.</p>

<p>Kromě ignorování specifikace existují následující způsoby:</p>



<h4 id="mimo">Zdroj mimo <code>&lt;blockquote></code></h4>

<pre><code>&lt;blockquote cite=">http://example.com">
  &lt;p>Citovaný text&lt;/p>
&lt;/blockquote>
<b>&lt;p></b>
— &lt;a href="http://example.com">Example.com&lt;/a>
<b>&lt;/p></b></code></pre>







<p>Tento kód bude pro pohodlnější stylování nejspíš ještě vhodné obalit elementem <code>&lt;div></code>.</p>


<h4 id="figure">Značky <code>&lt;figure></code> a <code>&lt;figcaption></code></h4>

<p>HTML 5 značky, které slouží k <i>popisování objektu</i> a hodí se i třeba k <a href="/popis-obrazku#figure">popisu obrázku</a>.</p>

<pre><code>&lt;figure>
  &lt;blockquote cite="http://example.com">
    &lt;p>Citovaný text&lt;/p>
  &lt;/blockquote>
  <b>&lt;figcaption></b>
  — &lt;a href="http://example.com">Example.com&lt;/a>
  <b>&lt;/figcaption></b>
&lt;/figure></code></pre>









<h4 id="footer">Značka <code>&lt;footer></code></h4>

<p>Pro odlišení obsahu citace a uvedení zdroje jde použít i značku <code>&lt;footer></code>.</p>

<pre><code>&lt;blockquote cite="http://example.com">
  &lt;p>Citovaný text&lt;/p>
  <b>&lt;footer></b>
    — &lt;a href="http://example.com">Example.com&lt;/a>
  <b>&lt;/footer></b>
&lt;/blockquote></code></pre>








<h4 id="small">Značka <code>&lt;small></code></h4>

<p>Pro obalení autora/zdroje citace by možná mohla posloužit i značka <code>&lt;small></code>.</p>

<pre><code>&lt;blockquote cite="http://example.com">
  &lt;p>Citovaný text&lt;/p>
  <b>&lt;small></b>
    — &lt;a href="http://example.com">Example.com&lt;/a>
  <b>&lt;/small></b>
&lt;/blockquote></code></pre>








<p>Příklady s <code>&lt;footer></code> a <code>&lt;small></code> jsou potenciálně risikové v případě, že by tyto značky <b>obsahovala samotná citace</b>. To je nejspíš ale minimum případů.</p>




<h2 id="q">Řádková citace <code>&lt;q></code></h2>

<p>Stejný význam jako bloková citace <code>&lt;blockquote></code>, jen v řádkovém provedení.</p>

<p>Rovněž značka <code>&lt;q></code> má atribut <code>cite</code> pro (neviditelné) uvedení zdroje.</p>

<p>Zajímavé chování ve výchozím CSS je automatické <b>přidání uvozovek</b> před a po.</p>


<div class="live">
  <p>Obyčejný text v odstavci, následuje citace: <q>Obsah citace</q></p>
</div>



<p>Změnit styl uvozovek jde pomocí pseudo-elementů <a href="/css-selektory#before-after"><code>:before</code>/<code>:after</code></a>.</p>

<div class="live">
  <style>
    .jine-uvozovky q:before {
      content: "„";
    }
    .jine-uvozovky q:after {
      content: "“";
    }    
  </style>
  <p class="jine-uvozovky">Citace: <q>Obsah citace s českými uvozovkami</q></p>
</div>

<p>Případně uvozovky <b>úplně zrušit</b>:</p>

<pre><code>q:before, q:after {
  content: "";
}</code></pre>

<p>Pro důmyslnější nastavování uvozovek pomocí CSS vlastnosti <code>content</code> existuje vlastnost <a href="/quotes"><code>quotes</code></a> funkční od <b>Internet Exploreru 8</b>.</p>



<h2 id="cite">Název/jméno <code>&lt;cite></code></h2>

<p>Nakonec existuje značka <code>&lt;cite></code>, která slouží k označení nějakého díla (názvu knihy, filmu, článku, básně, písně, divadelní hry, počítačové hry, počítačového programu, právní nebo technické normy a podobně).</p>

<p>Značka <code>&lt;cite></code> podle nejnovějšího návrhu HTML specifikace <b>neslouží k vyznačení jména</b> autora.</p>

<blockquote lang="en" cite="https://html.spec.whatwg.org/multipage/semantics.html#the-cite-element">
  <p>A person's name is not the title of a work — even if people call that person a piece of work — and the element (<code>cite</code>) must therefore not be used to mark up people's names.</p>
  
  <p class="autor">HTML Living Standard: <a href="https://html.spec.whatwg.org/multipage/semantics.html#the-cite-element">The <code>cite</code> element</a></p>
</blockquote>



<p>Starší zdroje občas uvádí použití <code>&lt;cite></code> právě i pro označení jmen nebo dokonce pro označení citovaného textu. Podle aktuální specifikace by se to ale dělat nemělo.</p>




<h3 id="zobrazeni">Zobrazení</h3>

<p>Výchozí zobrazení je řádkové a kursivou (<code><a href="/font#style">font-style</a>: italic</code>).</p>

<div class="live">
  <p>Přečetl jsem knihu <cite>Fytopuf a kládoblah</cite>.</p>
</div>




<h3 id="vyhledavace">URL v <code>&lt;cite></code></h3>

<p>Docela zajímavě používají element <code>&lt;cite></code> vyhledávače <a href="/google">Google</a> a <a href="/bing">Bing</a>. Dávají do něj adresu zobrazeného webu ve výsledcích hledání.</p>

<p><img src="/files/citace/serp-cite.png" alt="Použití značky cite ve výsledcích vyhledávání" class="border"></p>










<p>Je tedy otázka, jestli jedna z motivací není ušetření pár znaků v HTML kódu…</p>




<h2 id="styl">Styl citace</h2>

<p>Na webových stránkách je docela populární uvádět <b>názory zákazníků nebo uživatelů</b> nějakou visuálně zajímavější formou. Včetně například obrázků citovaných.</p>

<p>Mohlo by to vypadat třeba takto:</p>

<p><img src="/files/citace/styl.png" alt="Použití značky cite ve výsledcích vyhledávání" class="border"></p>


















<p><a href="http://kod.djpw.cz/mcob">Živá ukázka</a></p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>HTML5 Doctor: <a href="http://html5doctor.com/blockquote-q-cite/">Quoting and citing with <code>&lt;blockquote&gt;</code>, <code>&lt;q&gt;</code>, <code>&lt;cite&gt;</code>, and the cite attribute</a></li>
  
  <li>HTML5 Doctor: <a href="http://html5doctor.com/blockquote-q-cite/">cite and blockquote – reloaded</a></li>
  
  <li>Semantika.name: <a href="http://semantika.name/citace-zkratky.html">Citace a zkratky</a></li>
  
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/html/bloky.html#blockquote">Blockquote</a> – pohled do historie</li>
</ul>