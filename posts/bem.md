---
title: "BEM: způsob zápisu CSS"
headline: "BEM – způsob zápisu CSS"
description: "BEM (Block, Element, Modifier) je postup, kterým zapisovat CSS pravidla a pojmenovávat CSS třídy."
date: "2015-04-02"
last_modification: "2015-04-03"
status: 1
tags: ["css", "napady"]
format: "html"
---

<pre><code>.blok {}
.blok__element {}
.blok--modifikator {}</code></pre>

<p>Nejjednodušší příklad použití této konvence pojmenování tříd může vypadat následovně.</p>

<pre><code>&lt;button class="tlacitko tlacitko--dulezite">
  &lt;span class="tlacitko__popis">Koupit za&lt;/span>
  &lt;span class="tlacitko__cena">500 Kč&lt;/span>
&lt;/button> </code></pre>


<p>S CSS selektory:</p>

<pre><code>.tlacitko {}
.tlacitko--dulezite {}
.tlacitko__popis {}
.tlacitko__cena {}</code></pre>

<dl>
  <dt id="block">Block</dt>
  <dd>
    <p><b>B</b>lokem je v tomto případě třída <code>tlacitko</code>.</p>
  </dd>
  
  <dt id="element">Element</dt>
  <dd>
    <p><b>E</b>lementy jsou potomci bloku, tedy třídy <code>tlacitko__popis</code> a <code>tlacitko__cena</code>.</p>
  </dd>  
  
  <dt id="modifier">Modifier</dt>
  <dd>
    <p><b>M</b>odifikátorem je třída <code>tlacitko--dulezite</code>.</p>
  </dd>    
</dl>







<h2 id="principy">Principy BEM</h2>

<p>Hlavní princip BEMu boří jeden z hlavních pilířů kaskádových stylů – kaskádovitost. Vůbec se nepoužívá <b>zanořování</b>. Každý element má svou třídu, podle které je jednoznačně identifikován.</p>

<p>To má některé výhody.</p>


<h3 id="zanorovani">Zanořování a dědičnost</h3>
<p>HTML/CSS kodér se nemusí tolik prát s dědičností a sílou selektorů. Síla selektorů je pouze na úrovni prosté třídy.</p>

<p>Původní příklad bez použití BEMu by mohl vypadat následovně.</p>



<pre><code>&lt;button class="tlacitko dulezite">
  &lt;span class="popis">Koupit za&lt;/span>
  &lt;span class="cena">500 Kč&lt;/span>
&lt;/button> </code></pre>







<p>Adekvátní CSS by vypadalo následovně:</p>

<pre><code>.tlacitko {}
.tlacitko.dulezite {}
.tlacitko .popis {}
.tlactiko .cena {}</code></pre>





<p>Problém potom může nastat v případě, že by někde na stránce měl existovat blok s názvem <code>popis</code>:</p>

<pre><code>&lt;div class="popis">
…
&lt;/div></code></pre>

<p>Jeho styly pro selektor <code>.popis {}</code> by se potom promítly i do <code>&lt;button class="tlacitko popis"></code>. Stejně tak by se styly pro blok <code>.dulezite</code> promítly do <code>&lt;button class="tlacitko dulezite"></code>.</p>

<p>Konflikt tak při používání BEMu může nastat jen na úrovni bloků, což je menší risiko, než při zanořování selektorů.</p>



<h3 id="srozumitelnost">Srozumitelnost kódu</h3>

<p>Jelikož se styly nemohou dědit napříč různými bloky a každý stylovaný element má svou CSS třídu, je snazší k HTML elementu dohledat jeho selektor. Není kvůli tomu nutné používat <a href="/vyvojarske-nastroje">vývojářské nástroje</a>. Na druhou stranu to přináší nároky na <b>vyšší složitost HTML kódu</b>, kde se píší třídy i v místech, kdy by šlo použít obecný kontext (<code>.navigace a</code>).</p>



<pre><code>&lt;div class="navigace">
  &lt;a href="#" class="navigace__odkaz">Odkaz&lt;/a>
  &lt;a href="#" class="navigace__odkaz">Odkaz&lt;/a>
&lt;/div></code></pre>

<p>Používání konvence BEM tedy přináší něco za něco. Vyžaduje sice trochu více psaní, výsledek ale může být srozumitelný a <b>lépe přenositelný mezi projekty</b>, protože je menší risiko, že dojde ke kolisi v názvech.</p>









<h2 id="pouzivat">Používat BEM?</h2>

<p>Postup <i>Block, Element, Modifier</i> může být užitečný jako společná konvence při práci hodně lidí nad stejným CSS, kdy je jasně patrné, co která třída je.</p>

<p>Jde použít i nějaký kompromis, kdy se alespoň v rámci bloku používají třídy s názvem bloku na začátku:</p>

<pre><code>&lt;button class="tlacitko tlacitko-dulezite">
  &lt;span class="tlacitko-popis">Koupit za&lt;/span>
  &lt;span class="tlacitko-cena">500 Kč&lt;/span>
&lt;/button> </code></pre>






<p>Nebo si zvolit jinou konvenci pro znázornění elementu a modifikátoru. Například <b>Martin Michálek</b> <a href="http://www.vzhurudolu.cz/prirucka/bem">nepoužívá</a> spojovníky v názvech tříd, takže může používat následující zjednodušení.</p>

<pre><code>.blok {}
.blok-element {}
.blok--modifikator {}</code></pre>





<p>Omezit kolise v názvech tříd může i postup, který popsal <b>Pepa Linha</b>:</p>

<div class="external-content">
  <ul>
    <li><a href="http://blog.webdream.cz/css/piste-css-jako-znovupouzitelne-komponenty">Pište CSS jako znovupoužitelné komponenty</a></li>
  </ul>
</div>

<p>To spočívá v tom, že tzv. blok z metodiky BEM zapíše s prefixem „<code>c-</code>“, načež všechny třídy, co k němu patří, do něj zanořuje s využitím CSS preprocesoru.</p>

<pre><code>.c-blok {  
  .element {}
  &amp;.-modifikator {}
}</code></pre>





<p>Výhodou je, že se v HTML kódu nemusejí neustále opakovat názvy bloků u elementů a modifikátorů. Nevýhoda je potom menší <i>neprůstřelnost</i> k stejně pojmenovaným třídám a vyšší váha selektorů.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  
  <li>CSS Tricks: <a href="https://css-tricks.com/bem-101/">BEM 101</a></li>
  
  <li>CSS Wizardry: <a href="http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/">More Transparent UI Code with Namespaces</a></li>
  
    <li>CSS Wizardry: <a href="http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/">BEMIT: Taking the BEM Naming Convention a Step Further</a></li>
    
  <li>BEM.info: <a href="https://en.bem.info/">BEM – Technology for creating web applications</a></li>
  
  <li>David Berner: <a href="https://medium.com/fed-or-dead/battling-bem-5-common-problems-and-how-to-avoid-them-5bbd23dee319">Battling BEM – 5 common problems and how to avoid them</a></li>
  
</ul>