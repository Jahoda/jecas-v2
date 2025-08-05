---
title: "Vlastní HTML atributy"
headline: "Vlastní atributy v HTML"
description: "Jak je to s vytvářením a používáním atributů s vlastními názvy v HTML stránce."
date: "2014-02-05"
last_modification: "2014-02-05"
status: 1
tags: ["html", "html-tagy", "napady"]
format: "html"
---

<p>Podobně jako je možné si vytvářet <a href="/vlastni-html-znacky">vlastní HTML elementy</a> (od <b>IE 9</b> plně funkční včetně možnosti stylování), dá se totéž dělat i s atributy. S těmi je to dokonce ještě lepší — pro stylování je lze využít už v <b>IE 7</b>.</p>

<pre><code>&lt;style>
  div[<b>barva</b>=<i>cervena</i>] {color: red}
&lt;/style>
&lt;div <b>barva</b>="<i>cervena</i>">
  Červený div.
&lt;/div></code></pre>

<p><a href="http://kod.djpw.cz/erbb">Živá ukázka</a>. Použití je bezproblémové. Pochopitelně v případě, že se omylem náhodou netrefíme do existujícího atributu. Prohlížeče neznámý atribut nijak neřeší, ale <b>umožní stylování</b> <a href="/css-selektory#atributovy">atributovým selektorem</a>.</p>

<p>Jediná nevýhoda bude možná <b>teoreticky lehce nižší rychlost</b> než při klasickém stylování <a href="/id-class">třídami nebo identifikátory</a>, ale zatím jsem nic takového nepostřehl. Otázka je spíš, co to v CSS přinese navíc.</p>

<p>Od <b>IE 8</b> je možné <a href="/content-attr">číst hodnotu i přímo v CSS</a>.</p>

<p>Mimochodem, atributový selektor má nižší váhu než <code>class</code> nebo <code>id</code>.</p>

<h2 id="js">Vlastní atributy a JavaScript</h2>
<p>Zajímavé mi přijde až používání v JavaScriptu. Nestandardní atributy se dobře hodí k uložení nějaké hodnoty, <b>označení stavu aplikace</b> nebo označení elementů se společnými znaky.</p>

<p>Zejména to ukládání stavů do vlastních atributů mi přijde „čistší“, než je používání <a href="/prepinani-trid">běžných tříd</a>. Je tak hezky odděleno samotné stylování vzhledu a stylování <i>funkcí</i> (např. <a href="/zobrazit-skryt">skrytí obsahu</a>).</p>

<h3 id="vyber">Výběr elementů podle vlastní atributů</h3>

<p>Od <b>IE 8</b>, který umí metody <a href="/queryselector"><code>querySelector</code>/<code>querySelectorAll</code></a>, je výběr těchto elementů velmi jednoduchý.</p>

<pre><code>var cerveneDivy = document.querySelectorAll("div[barva=cervena]");</code></pre>

<p>(Pro <b>IE 7</b> by případně <code>querySelector</code> mohl jít <a href="http://www.codecouch.com/2012/05/adding-document-queryselectorall-support-to-ie-7/">dodělat</a> <a href="https://gist.github.com/connrs/2724353">polyfillem</a>.)</p>

<p>V případě, že bychom chtěli najít libovolné elementy s požadovaným atributem, řešení je hvězdičkový selektor.</p>

<pre><code>var cerveneDivy = document.querySelectorAll("<b>*</b>[barva=cervena]");</code></pre>

<p><a href="http://kod.djpw.cz/grbb">Živá ukázka</a>.</p>

<h3 id="nastavovani-cteni">Nastavování a čtení atributů</h3>

<p>Odlišnost oproti běžným atributů je v získávání/nastavování hodnoty.</p>

<p>Je nutné používat metody <code>getAttribute</code>/<code>setAttribute</code> (poznámka: pro standardní atributy jsou <a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=8&topic=90307">lepší standardní vlastnosti DOMu</a>.)</p>

<pre><code>var element = document.querySelector("*[barva]");
element.getAttribute("barva"); // obsah atributu „barva“
element.setAttribute("barva", "<b>novaHodnota</b>); // nastaví obsah</code></pre>

<p><a href="http://kod.djpw.cz/hrbb">Ukázka</a></p>

<h2 id="data">Data atributy, nebo vlastní?</h2>
<p>Podle specifikace by <i>vlastní atributy</i> měly začínat prefixem <code>data-</code>. Má smysl se tohoto držet?</p>

<ul>
  <li>Dle vlastní libosti pojmenované atributy <b>neprojdou validátorem</b> (validátor je vyhodnotí jako nepovolené pro danou značku). To <code>data-atribut</code>y toleruje.</li>
  
  <li>U <code>data-</code> prefixu by nemělo hrozit, že se námi vymyslený atribut <b>dostane do specifikace</b>, prohlížeče mu začnou přisuzovat nějaký význam a web se tak <b>rozbije</b>.</li>
  
  <li>Pojmenování atributu jako <code>data-nazev-atributu</code> místo prostého <code>nazev-atributu</code> může člověku, co detailně nezná všechny HTML atributy, <b>pomoci v orientaci</b>. Na první pohled je vidět, že je atribut <i>vlastní</i>.</li>
  
  <li>Jinak je to asi jedno.</li>
</ul>