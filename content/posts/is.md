---
title: "CSS pseudo třída :is()"
headline: "CSS pseudo třída <code>:is()</code>"
description: "Jak v CSS pseudo třída <code>:is()</code> dokáže z(ne)přehlednit styly."
date: "2021-03-16"
last_modification: "2021-03-16"
status: 1
tags: ["css", "selektory-css"]
format: "html"
---

<h2 id="zapis">Zápis</h2>

<p>Konstrukce <code>:is()</code> může obsahovat jeden nebo více selektorů a slouží k minimalisování opakování se v kódu.</p>


<p>Dříve tato pseudo třída měla ještě jiné názvy:</p>

<div class="internal-content">
  <ul>
    <li>
      <a href="/matches">Selektory <code>:matches</code> a <code>:any</code></a> – historické názvy této pseudo-třídy v roce 2015
    </li>
  </ul>
</div>

<p>Následujícím způsobem jde vybrat všechny <a href="/odkaz">odkazy</a> a <a href="/odstavec">odstavce</a> nacházející se v elementu s třídou <code>element</code>:</p>

<pre><code>.element :is(a, p) {}</code></pre>




<p>Téhož by šlo dosáhnout třeba následujícím způsobem:</p>

<pre><code>.element a,
.element p {}</code></pre>









<p>Pseudo třídu <code>:is</code> je možné v selektorech používat na libovolných místech, takže třeba taky:</p>

<pre><code>:is(.header, .footer) a {}</code></pre>

<p>Výše uvedený selektor zaměří všechny odkazy (<code>&lt;a></code>) v elementech s třídami <code>header</code> nebo <code>footer</code>.</p>


<p>Není podmínka psát všechny selektory na jeden řádek. Tohle taky funguje:</p>

<pre><code>:is(
    .header,
    .footer
) a {}</code></pre>

<p><i>Starý</i> zápis by byl:</p>


<pre><code>.header a,
.footer a {}</code></pre>













<p>Míchat jde i více <code>:is</code> v rámci jednoho selektoru:</p>

<pre><code>:is(.header, .footer) :is(a, span) {}</code></pre>

<p>Toto zaměří všechny odkazy a <a href="/div-span#span"><code>&lt;span></code>y</a> v elementech s třídami <code>header</code> a <code>footer</code>.</p>

<p><a href="http://kod.djpw.cz/pzad">Živá ukázka</a> – různé pokusy s <code>:is</code></p>


<h2 id="vyuziti">Využití</h2>

<p>Použít <code>:is</code> se nabízí v případech, kdy by člověk měl tendenci <b>psát něco opakovaně</b>.</p>

<p>Celkem smysluplné použití mi přijde pro <a href="/focus#automaticky">nastavování hoveru a focusu</a> u odkazů:</p>

<pre><code>a:is(:hover, :focus) {}</code></pre>




<p>Místo:</p>

<pre><code>a:hover,
a:focus {}</code></pre>





<p>Na druhou stranu jde vymyslet dost nesrozumitelné konstrukce, takže  všeho s mírou.</p>





<h2 id="specificita">Specificita / síla selektoru</h2>

<p>Dost zajímavá <i>vlastnost</i> je síla selektoru s <code>:is</code>.</p>

<p>Bude-li v HTML kódu odkaz v odstavci a následující styl:</p>

<pre><code>p :is(a) { color: yellow; }
p a { color: pink; }</code></pre>

<p>Odkaz bude růžový, protože pozdější vyhrává. Změna ale nastane, když se do <code>is</code> dostane něco silnějšího, ačkoliv to s původním elementem vůbec nesouvisí – třeba neexistující třída:</p>



<pre><code>p :is(a, .nesmyslna-neexistujici-trida) { color: yellow; }
p a { color: pink; }</code></pre>





<p>V tomto případě už bude odkaz žlutý, protože třída posílila selektor na prvním řádku.</p>




<h2 id="podpora">Podpora</h2>

<p>Kromě <b>IE 11</b> celkem dobře podporovaná vlastnost. Ve starších prohlížečích funguje přes klíčové slovo <code>:any</code>.</p>





<h2 id="preprocesory">Řeší to CSS preprocesory</h2>

<p>Pokud se na stránce používají preprocesory, využití <code>:is()</code> není takové, protože preprocesory už roky nabízí řadu způsobů, jak se opakování vyhnout.</p>

<p>V <b>SCSS</b> jde třeba napsat:</p>

<pre><code>.element {
  a, p {}
}</code></pre>

<p>Nebo:</p>

<pre><code>a {
  .header &amp;,
  .footer &amp; {}
}</code></pre>