---
title: "CSS selektor :empty"
headline: "CSS selektor <code>:empty</code>"
description: "CSS selektor <code>:empty</code> zaměří element, ve kterém vůbec nic není."
date: "2015-09-13"
last_modification: "2015-09-16"
status: 1
tags: ["css", "selektory-css"]
format: "html"
---

<p>Pro zachycení pomocí <code>:empty</code> <b>nesmí</b> být v elementu:</p>

<ul>
  <li>Jiný HTML element.</li>
  <li>Libovolný text.</li>
  <li>Mezera nebo odřádkování.</li>
</ul>


<p>Tedy CSS pravidlo:</p>

<pre><code>div:empty {
  display: none;
}</code></pre>




<p>Skryje pouze:</p>

<pre><code>&lt;div>&lt;/div></code></pre>



<p>Případně se jako <i>empty</i> bere i HTML komentář:</p>

<pre><code>&lt;div>&lt;!-- komentář -->&lt;/div></code></pre>





<h2 id="podpora">Podpora</h2>

<p>CSS selektor <code>:empty</code> je funkční od <b>Internet Exploreru 9</b>.</p>




<h2 id="vyuziti">Využití</h2>

<p>Asi nejzajímavější je využití v případě, kdy není jisté, jestli bude ve značce nějaký obsah (třeba se vypisuje JavaScriptem), a takový element má nějaký padding, pozadí nebo rámeček.</p>

<div class="live">
  <style>
    .test-empty {
      padding: 1em;
      background: #fff;
      border-left: 5px solid #ccc
    }
  </style>
  <div class="test-empty">Element s odsazením a rámečkem</div>
</div>

<p>Pokud by v něm žádný obsah nebyl, zobrazilo by se něco jako:</p>


<div class="live">
  <div class="test-empty"></div>
</div>

<p>Skrytí značky pomocí <code>:empty</code> tento případ elegantně řeší bez nutnosti zobrazovat/skrývat element JavaScriptem změnou vlastnosti <a href="/display"><code>display</code></a>.</p>