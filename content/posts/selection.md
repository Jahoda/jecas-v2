---
title: "Barva označeného textu"
headline: "Styl označeného textu"
description: "Pseudo-element <code>::selection</code> umožňuje změnit styl kursorem označeného textu."
date: "2015-01-12"
last_modification: "2015-01-12"
status: 1
tags: ["css", "selektory-css", "stylovani"]
format: "html"
---

<p><img src="/files/selection/oznaceni.gif" alt="Označení textu pomocí selection" class="border"></p>


<p>Výchozí styl výběru je většinou <span style="background: #3399FE; color: #fff; padding: .1em 0">modré pozadí a bílý text</span>. Pomocí stylu pro <code>::selection</code> je možné toto chování změnit. Kromě důvodu čistě estetického, aby výběr <b>ladil k designu</b> stránky, existuje i praktický důvod – na stránce s modrým pozadím a bílým textem nebude <b>standardní styl dobře vidět</b>.</p>

<p>Před změnou si je dobré uvědomit, že uživatelé jsou na <b>výchozí styl</b> zvyklí, takže změna může přinést nejistotu.</p>

<div class="live">
  <style>
    .selection-test::-moz-selection {
      color: #8ECCF0; 
      background: #DA3F94;
    }
    .selection-test::selection {
      color: #8ECCF0; 
      background: #DA3F94;
    }
  </style>
  <p class="selection-test">Tento odstavec má nestandardní styl při výběru.</p>
</div>

<p>Některé prohlížeče – <b>Firefox</b> a <b>Internet Explorer</b> – dokáží výchozí barevný styl <code>::selection</code> automaticky <b>invertovat</b> (bílé pozadí, modrý text), aby byl kontrastní k pozadí.</p>

<p>Kromě staré <b>Opery 12</b> jde měnit barvu výběru i ve <b>formulářových polích</b> (<a href="/input"><code>&lt;input></code></a>/<a href="/textarea"><code>&lt;textarea></code></a>).</p>


<h2 id="zapis">Zápis</h2>

<p>Styl označení textu jde nastavit globálně pro <b>celou stránku</b>:</p>

<pre><code>::selection {
  /* styly pro všechny výběry na stránce */
}</code></pre>

<p>Nebo i pro zvláštní elementy.</p>

<pre><code>.zvlastni-element::selection {
  /* styly pro .zvlastni-element */
}</code></pre>




<h3 id="vlastnost">Povolené vlastnosti</h3>

<p>Pseudo-element <code>::selection</code> má zabudovanou ochranu před <b>příliš kreativními designéry</b>, měnit tak jde pouze:</p>

<ul>
  <li><code>color</code> – barva písma</li>
  
  <li><code>background-color</code> – barva pozadí (nejde použít obrázek a podobně), jde použít zápis zkratkou <code>background</code></li>
  
  <li><a href="/text-shadow"><code>text-shadow</code></a> – stín textu (nefunguje v <b>IE</b> a staré <b>Opeře 12</b>)</li>
</ul>


<h2 id="podpora">Podpora</h2>

<p>Měnit styl označeného textu je možné od <b>IE 9</b>. <b>Firefox</b> vyžaduje použít <code>-moz-</code> <a href="/css-prefixy">prefix</a>. Selektor s prefixem nelze spojit se selektorem bez něj. Tohle proto <b>nebude fungovat</b>:</p>

<pre class="error"><code>::selection, ::-moz-selection {
  /* nebude fungovat */
}</code></pre>

<p>Oba zápisy je nutné <b>duplikovat</b>:</p>

<pre><code>::selection {
  color: yellow;
  background: red;
}
::<b>-moz-</b>selection {
  color: yellow;
  background: red;
}</code></pre>

<p><a href="https://kod.djpw.cz/skjb-">Živá ukázka</a></p>