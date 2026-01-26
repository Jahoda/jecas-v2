---
title: "Disqus a poslední komentáře"
headline: "Nejnovější komentáře z Disqus"
description: "Jak vypsat nejnovější komentáře z diskusní platformy Disqus."
date: "2014-09-26"
last_modification: "2014-09-27"
status: 1
tags: ["hotova-reseni", "napady"]
format: "html"
---

<p><a href="http://disqus.com">Disqus</a> je populární nástroj pro zajištění <b>komentářů</b> na webu <b>prostřednictvím třetí strany</b>.</p>

<p>V případě, že ho na stránce použijeme, může se hodit někde zobrazit <b>přehled posledních komentářů</b>.</p>

<p>Kromě toho, že <b>Disqus</b> nabízí <a href="https://disqus.com/api/docs/">rozsáhlé API</a>, pro výpis posledních komentářů existuje přímo <i>widget</i>.</p>

<pre><code>&lt;script 
src="http://<b>jecas</b>.disqus.com/recent_comments_widget.js">
&lt;/script></code></pre>

<p>Stačí jen jako subdoménu (obsah mezi „<code>http://</code>“ a „<code>.disqus.com</code>“) uvést vlastní název.</p>

<p>Ten se nastavuje při <b>vytváření nové diskuse</b>. Zjisti potřebnou část URL je možné při najetí na název diskuse na <a href="https://disqus.com/home">domácí stránce Disqusu</a>.</p>

<p><img src="/files/disqus-api/url.png" alt="Zobrazení URL" class="border"></p>

<p>Po vložení skriptu na <b>povolené doméně</b> by se poslední komentáře měly objevit.</p>

<div class="live" style="overflow: hidden"><script 
src="http://jecas.disqus.com/recent_comments_widget.js
?num_items=3
&hide_avatars=1
&excerpt_length=10">
</script></div>


<h2 id="nastaveni">Nastavení</h2>

<p>Výsledný výpis příspěvků jde ovlivňovat přidáváním parametrů do URL vkládaného skriptu (widgetu).</p>

<pre><code>http://jecas.disqus.com/recent_comments_widget.js
?<b>num_items</b>=3
&amp;<b>hide_avatars</b>=1
&amp;<b>excerpt_length</b>=10</code></pre>

<ul>
  <li><code>num_items</code> – počet zobrazených komentářů</li>
  <li><code>hide_avatars</code> – zobrazit/skrýt avatary</li>
  <li><code>excerpt_length</code> – omezení délky příspěvků</li>
</ul>

<p>Kromě tohoto <i>widgetu</i> existuje ještě jeden, kde je i přehled <b>top komentátorů</b> a <b>populárních debat</b>.</p>

<div class="live" style="overflow: hidden"><script 
src="http://jecas.disqus.com/combination_widget.js?num_items=3&hide_mods=0&color=white&default_tab=recent&excerpt_length=50">
</script></div>




<h2 id="styl">Stylování</h2>

<p>Ačkoliv <b>vložený skript</b> vloží do stránky i nějaké to CSS, úplně dobře bez zásahu komentáře nevypadají. Naštěstí se JavaScriptem vytvořený <b>HTML kód</b> dá rozumně stylovat.</p>

<pre><code>.dsq-widget-list .dsq-widget-avatar {
  border-radius: 50%; 
  margin-right: 0.5em
}
.dsq-widget-comment {
  display: block; 
  margin: 1em 0 .5em 2.5em; 
  padding: .8em; 
  background: #efefef
}
.dsq-widget-list {
  padding: 0
}
.dsq-widget-meta {
  margin-left: 2.5em; 
  text-align: right
}</code></pre>


<p>Výsledný kód zobrazí přehled posledních komentářů.</p>