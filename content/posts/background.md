---
title: "CSS background"
headline: "CSS <code>background</code>"
description: "Jak nastavit pomocí CSS obrázkové pozadí."
date: "2014-09-22"
last_modification: "2014-09-22"
status: 0
tags: []
format: "html"
---

-webkit-background-clip: text; -- http://codepen.io/dghez/pen/ItxKE



<h2 id="position">Umístění pozadí <code>background-position</code></h2>

<p>Nastavit umístění obrázku jde pomocí klíčových slov <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code> a <code>center</code>.</p>

<pre><code>background-position: top left;</code></pre>

<p>Rovněž také délkovými jednotkami:</p>

<pre><code>background-position: 10px 10px;</code></pre>

<p>Délkové jednotky se počítají zleva a shora, takže umístit přesně obrázek zprava nebo zdola je komplikovanější:</p>

<ol>
  <li>
    <p>Novější prohlížeče podporují uvedení klíčového slova pro směr:</p>
    
    <pre><code>background-position: <b>right</b> 10px top;</code></pre>
  </li>
  
  <li>
    <p>Pro pevné rozměry elementu jde potřebná hodnota zleva/shora spočítat z šířky obrázku tak, aby ve výsledku byl obrázek požadovanou vzálenost od pravého/dolního okraje.</p>
  </li>
  
  <li>
    <p>Přibližného výsledku jde docílit s použitím procent:</p>
    
    <pre><code>background-position: 95% top;</code></pre>
  </li>
</ol>

<div class="external-content">
  <ul>
    <li>CSS Tricks: <a href="http://css-tricks.com/positioning-offset-background-images/">Positioning Offset Background Images</a></li>
  </ul>
</div>