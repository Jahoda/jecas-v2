---
title: "Element <progress>"
headline: "HTML značka <code>&lt;progress&gt;</code>"
description: "Značka <code>&lt;progress&gt;</code> slouží k znázornění <i>postupu</i>. Co nabízí za možnosti?"
date: "2013-08-28"
last_modification: "2013-09-10"
status: 1
tags: ["html", "html-tagy", "stylovani"]
format: "html"
---

<div class=live>
  <p><progress value="50" max="100">50 %</progress> (<code>value=50 max=100</code>)</p>
  <p><progress value="70" max="60">70 ze 60</progress>  (<code>value=70 max=60</code>)</p>
</div>

<p>Použití je následovné:</p>
<pre><code>&lt;progress value="50" max="100">50 %&lt;/progress></code></pre>

<dl>
  <dt><code>value</code></dt>
  <dd>Hodnota <i>postupu</i>, musí být mezi nulou a hodnotou <code>max</code>.</dd>
  <dt><code>max</code></dt>
  <dd>Určuje, jaká hodnota <code>value</code> se bude brát jako sto procent. Pokud je <code>value</code> větší než <code>max</code>, bere se to jako 100 %.</dd>
</dl>

<h2 id="podpora">Podpora</h2>
<p>Element <code>&lt;progress&gt;</code> je podporován <b>až od Exploreru 10</b>, v nepodporovaných zařízeních se objeví obsah mezi počáteční a koncovou značkou.</p>
<pre><code>&lt;progress value="50" max="100"><b>50 %</b>&lt;/progress></code></pre>
<p>Nicméně vytvořit náhradu za <code>&lt;progress&gt;</code> není nijak zvlášť složité:</p>

<div class="live"><div style="width: 100px; border: 1px solid #ccc; background: #fff"><div style="width: 70%; height: 14px; background: green"></div></div></div>

<p>Teoreticky je možné tuto náhradu umísit do značky:</p>
<pre><code>&lt;progress value="<b>50</b>" max="100">
  &lt;div class="progress"&gt;
    &lt;div style="width: <b>50</b>%&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/progress></code></pre>
<p>Otázka potom je, zda <code>&lt;progress&gt;</code> vůbec používat, když už se stejně vytváří atrapa.</p>


<h2 id="nacitani">Signalisace načítání</h2>

<p>Samotná značka <code>&lt;progress></code> poslouží i jako <b>jednoduchá indikace načítání</b>.</p>

<div class="live">
  <progress></progress>
</div>

<p><a href="http://kod.djpw.cz/wxib">Samostatná živá ukázka</a></p>


<h2 id="stylovani">Stylování</h2>
<dl><dt>Orientace</dt>
  <dd><p>Ve Firefoxech lze změnit orientaci na svislou pomocí:</p>
<pre><code>progress {-moz-orient: vertical}</code></pre>
  <p class=live><progress style="-moz-orient: vertical;" value="50" max="100">50 %</progress></p>
  
  <dt>Vzhled</dt>
  <dd><p>Vzhled je přebírán z operačního systému, vypne ho:</p>
    <pre><code>progress {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}</code></pre>
    
      <p class=live><progress style="appearance: none; -webkit-appearance: none; -moz-appearance: none;" value="50" max="100">50 %</progress></p>
    
    <p>Kromě toho lze zrušit <code>border</code> nebo nastavit rozměry (<code>width</code> a <code>height</code>).</p>
    <p>Vzhled <i>obalu</i> lze nastavit pseudotřídou <code>::progress-bar</code>, vzhled <i>ukazatele</i> zase přes <code>::progress-value</code>. V současné době jsou pro funkčnost alespoň ve Webkitu a Gecku nutny prefixy.</p></dd>
</dl>