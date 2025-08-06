---
title: "Popis obrázku"
headline: "Popis obrázku"
description: "Jak na webové stránce přidat k obrázku popisek."
date: "2015-01-02"
last_modification: "2015-01-14"
status: 1
tags: ["html", "napady", "obrazky"]
format: "html"
---

<p>Při vložení obrázku na stránku bývá často potřebné k němu uvést nějaký popis.</p>



<h2 id="alt">Atribut <code>alt</code></h2>

<p>Jedno z míst, kam je možné umístit popis obrázku, je HTML atribut <code>alt</code>. Zásadní jeho nevýhoda ale je, že jeho obsah <b>není standardně viditelný</b>.</p>

<pre><code>&lt;img src="obrazek.jpg" alt="<b>popisek obrázku</b>"></code></pre>

<p>Smysl má tak hlavně pro roboty vyhledávačů.</p>






<h3 id="nevidomi">Nevidomí návštěvníci</h3>

<p>Atribut <code>alt</code> může zlepšit zážitek ze stránky <b>nevidomým návštěvníkům</b>, kteří používají <b>hlasové čtečky</b>.</p>

<p>Pro takové návštěvníky by obrázek:</p>

<ol>
  <li>měl mít <code>alt</code> vyplněný, jinak na obrázek čtečka neupozorní,</li>
  
  <li>neobsahovat totéž, co viditelný popisek – jedná se o duplicitní informaci</li>
</ol>

<div class="external-content">
  <ul>
    <li><a href="http://validator.webylon.info/docs/pes-ben.html">Pes Ben</a> – co slyší nevidomý u různých způsobů popisu obrázků</li>
  </ul>
</div>

<p>Z praktického hlediska je ale tvorba správných popisků <b>často nemožná/nerentabilní</b> – například popisovat <b>stovky obrázků v galerii</b>.</p>


<h2 id="html">HTML kód pro popisek</h2>

<p>Aby si běžný návštěvník mohl popis obrázku přečíst, je ho nutné vložit přímo do HTML.</p>


<h3 id="figure">Značka <code>&lt;figure></code></h3>

<p>HTML 5 přišlo se značkami <code>&lt;figure></code> a <code>&lt;figcaption></code>, které se mimo jiné hodí k obalení obrázku a jeho popisu. Obě značky jsou blokové a <code>&lt;figure></code> má výchozí <a href="/margin"><code>margin</code></a>.</p>

<pre><code>&lt;figure>
    &lt;img src='obrazek.jpg' alt='obrázek'>
    &lt;figcaption>Popis obrázku&lt;/figcaption>
&lt;/figure></code></pre>

<p><a href="https://kod.djpw.cz/fmjb">Ukázka</a></p>

<p>Jediná nevýhoda je absence podpory v <b>IE8</b> a starších, kterou je kvůli stylování nutné <a href="/vlastni-html-znacky#html5">doplnit skriptem</a>.</p>







<h3 id="odstavec">Odstavec</h3>

<p>Asi nejjednodušší možná varianta je prosté použití odstavce.</p>


<pre><code>&lt;p>
    &lt;img src='obrazek.jpg' alt='obrázek'>
    &lt;br>
    Popis obrázku
&lt;/p></code></pre>

<p>Tento HTML kód ale nedává moc prostoru k <b>pohodlnému stylování</b>, takže v případě, že je obtížné formát výsledného kódu obrázku s popiskem <b>hromadně měnit</b>, bude lepší navrhnout HTML ve stylu <code>&lt;figure></code> a <code>&lt;figcaption></code>.</p>





<h3 id="odkaz">Odkaz</h3>

<p>Pro zobrazení miniatury obrázku s popisem, která bude odkazovat na velký obrázek, by mohl HTML kód vypadat následovně:</p>

<pre><code>&lt;a href="velky-obrazek.jpg">
  &lt;img src="maly-obrazek.jpg" alt="obrazek">
  &lt;div class="popisek">Popis obrázku&lt;/div>
&lt;/a></code></pre>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure"><code>&lt;figure></code></a></li>

  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption"><code>&lt;figcaption></code></a></li>  
</ul>