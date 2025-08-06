---
title: "CSS test"
headline: "CSS test"
description: "Otestujte své znalosti v CSS testu."
date: "2015-10-05"
last_modification: "2015-10-05"
status: 0
tags: []
format: "html"
---

<div class="question">
  <p>Funkce <a href="/calc"><code>calc()</code></a> slouží k počítání hodnot v CSS – např. <code>width: calc(10em + 5px)</code>.</p>
  
  <p>Bude fungovat v media queries?</p>
  
  <pre><code>@media (max-width: <b>calc(10em + 5px)</b>) {
}</code></pre>
  
  <div class="options">
    <div><label><input type="radio" value="1"> Ano</label></div>
    <div><label><input type="radio" value="1"> Ne</label></div>
  </div>
  
  <div class="answer">
    <p>Výpočty v pravidlu <code>@media</code> bohužel nefungují.</p>
  </div>
</div>


<div class="question">
  <p>Liší se u vlastnosti <code>z-index</code> hodnoty <code>0</code> a <code>auto</code>?</p>
  
  <div class="options">
    <div><label><input type="radio" value="1"> Ano</label></div>
    <div><label><input type="radio" value="1"> Ne</label></div>
  </div>
  
  <div class="answer">
    <p>Hodnota <code>0</code> vytvoří novou skupinu, kde se <code>z-index</code> počítá, což ovlivní <code>z-index</code> u potomků této skupiny.</p>
    
    <div class="internal-content">
      <ul>
        <li>Z-index: <a href="/z-index#nula-auto">Rozdí mezi <code>0</code> a <code>auto</code></a></li>
      </ul>
    </div>
  </div>
</div>

<div class="question">
  <p>Jak široký bude element s následujícím předpisem:</p>
  
  <pre><code>.element {
  width: 200px;
  min-width: 300px;
  max-width: 100px;
}</code></pre>
  
  <div class="options">
    <div><label><input type="radio" value="1"> 100 pixelů</label></div>
    <div><label><input type="radio" value="2"> 200 pixelů</label></div>
    <div><label><input type="radio" value="3"> 300 pixelů</label></div>
  </div>
  
  <div class="answer">
    <p>Šířka bude 300 pixelů, protože <code>min-width</code> přepíše <code>height</code>.</p>
  </div>
</div>

<div class="question">
  <p>Jak široký bude element s následujícím předpisem:</p>
  
  <pre><code>.element {
  width: 200px;
  max-width: 100px;
}</code></pre>
  
  <div class="options">
    <div><label><input type="radio" value="1"> 100 pixelů</label></div>
    <div><label><input type="radio" value="2"> 200 pixelů</label></div>
  </div>
  
  <div class="answer">
    <p>Šířka bude 100 pixelů, protože <code>max-width</code> má přednost před <code>width</code>.</p>
  </div>
</div>



<div class="question">
  <p>Třídy <code>.cervena</code> a <code>.modra</code> nastavují odpovídající barvu textu. Co když tyto třídy nepozorný kodér přiřadí do dvou atributů <code>class</code>?</p>
  
  <pre><code>&lt;div class="cervena" class="modra">
  Text
&lt;/div></code></pre>
  
  <p>Jakou barvu bude <i>Text</i> mít?</p>
  
  <div class="options">
    <div><label><input type="radio" value="1"> červenou (první vyhraje)</label></div>
    <div><label><input type="radio" value="2"> modrou</label></div>
    <div><label><input type="radio" value="2"> výchozí (atribut <code>class</code> bude nedefinovaný)</label></div>
  </div>
  
  <div class="answer">
    <p>Text bude červený. Opakované použití HTML atributu se nijak neprojeví.</p>
  </div>
</div>







<div class="question">
  <p>Co se stane, když autor webu umístí <code>&lt;meta charset></code> značku pro kódování na špatné místo:</p>
  
  <pre><code>&lt;!doctype html>
<b>&lt;meta charset="utf-8"></b>
&lt;html>
  &lt;head>
	&lt;title>Žluťoučký&lt;/title></code></pre>
  
  <p>Zobrazí se ve <i>žluťoučkém</i> titulku správně diakritika?</p>
  
  <div class="options">
    <div><label><input type="radio" value="1"> ano</label></div>
    <div><label><input type="radio" value="2"> ne, protože <code>&lt;meta></code> patří do <code>&lt;head></code></label></div>
  </div>
  
  <div class="answer">
    <p>Titulek i veškerý další obsah se zobrazí v pořádku. Značky <code>&lt;html></code> i <code>&lt;head></code> jsou nepovinné a prohlížeč si je na správných místech sám domyslí a na špatných je automaticky ignoruje.</p>
  </div>
</div>

<style>
.question {
  border-top: 2px solid;
  padding-top: 1em;
}</style>