---
title: "Mezery mezi písmeny a slovy"
headline: "Odsazení písmen a slov"
description: "Nastavení odsazení jednotlivých písmen (<code>letter-spacing</code>) a mezer mezi slovy (<code>word-spacing</code>)."
date: "2014-04-07"
last_modification: "2014-04-07"
status: 1
tags: ["css", "css-vlastnosti", "pisma"]
format: "html"
---

<h2 id="letter">Mezera mezi písmeny</h2>

<pre><code>element {
  letter-spacing: 1em;
}</code></pre>

<p>K úpravě mezer mezi písmeny slouží CSS vlastnost <code>letter-spacing</code>. Jako hodnota se zadává libovolná délková jednotka (kromě procent):</p>

<div class="live">
  <p style="letter-spacing: 1em">
    Text s velkými mezerami
  </p>
</div>

<h2 id="word">Odsazování jednotlivých slov</h2>

<pre><code>element {
  word-spacing: 2em;
}</code></pre>

<p>Vlasnost <code>word-spacing</code> funguje obdobně, jen vytváří mezery mezi <b>celými slovy</b>.</p>

<div class="live">
  <p style="word-spacing: 2em">
    Text s velkými mezerami
  </p>
</div>

<h3 id="vyuziti">Využití</h3>

<p>Praktické využití <code>word-spacing</code>u nemusí být na první pohled zřejmé. Ale něco se přece jen najde:</p>

<ol>
  <li>
    <p>V případě použití velkého <code>letter-spacing</code>u (odsazením písmen slova) může zvětšení mezer mezi slovy pomoci lépe poznat <b>hranice slov</b>.</p>
  </li>
  
  <li>
    <p>Záporný <code>word-spacing</code> umí mezery mezi slovy úplně zrušit nebo zmenšit (do určité hranice – tj. nemohou se slova překrývat):</p>
    
    <div class="live">
  <p style="word-spacing: -1em">
    Text bez mezer
  </p> 
    </div>
  </li>
  
  <li>
    <p>V případě řádkových elementů dokáže <code>word-spacing</code> zastoupit odsazování vlastnostmi <a href="/margin"><code>margin</code></a>/<code>padding</code>.</p>
  </li>
</ol>

<h2 id="podpora">Podpora v prohlížečích</h2>
<p>Obě vlastnosti jsou <b>široce podporovány</b> napříč všemi běžně používanými prohlížeči.</p>

<h2 id="roztazeni-textu">Roztažení textu</h2>

<p>V některých grafických editorech si je možno povšimnout funkce, která <b>roztáhne písmo na přesně stanovenou šířku</b>.</p>

<p><img src="/files/spacing/font-to-width.png" alt="Roztažení textu na šířku" class="border"></p>

<p>Stejného efektu lze dosáhnout vhodným nastavením <code>letter</code> a <code>word-spacing</code>u s špetkou JavaScriptu.</p>

<a class="button" href="http://font-to-width.com/">Nástroj Font-to-Width</a>