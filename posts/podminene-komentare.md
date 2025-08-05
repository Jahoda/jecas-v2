---
title: "Podmíněné komentáře pro IE"
headline: "Podmíněné komentáře pro Internet Explorer"
description: "Jak rychle a snadno hackovat HTML a CSS v různých historických versích Internet Exploreru."
date: "2013-05-11"
last_modification: "2013-05-11"
status: 1
tags: ["hacky", "html", "html-tagy"]
format: "html"
---

<div class="soft">
  <p>S vymizením starších prohlížečů než <b>IE 10</b> jsou podmíněné komentáře technikou do musea. A v běžné praxi je člověk těžko využije.</p>
</div>




<p>Pokud selžou všechny snahy o sjednocení vzhledu/chování napříč prohlížeči, přichází na řadu hackování, tedy psaní různého kódu pro různý prohlížeč.</p>

<p>Internet Explorer uměl <a href="#ie10">(do IE 10)</a> tzv. podmíněné komentáře. Tedy speciální HTML komentář, který má v hranatých závorkách nějakou podmínku, například:</p>
<pre>&lt;!--[if IE]&gt;
	&lt;p>Nějaký HTML kód&lt;/p>
&lt;![endif]--></pre>

<p>Pozor na to, že v jiných prohlížečích, než je <b>IE 9</b> a starší, tyto komentářové podmínky <b>nefungují</b>. Výše uvedená konstrukce se projeví jako běžný HTML komentář, tedy nijak.</p>

<h2>Pár dalších příkladů</h2>
<table>
	<tr>
		<th width=20%>Podmínka
		<th>Kde se obsah zobrazí
	<tr>
		<td><code>if IE</code>
		<td>ve všech IE
	<tr>
		<td><code>if lt IE 9</code>
		<td>ve starších než IE 9 (<code>lt</code> znamená lower than – nižší než)
	<tr>
		<td><code>if gt IE 8</code>
		<td>v novějších než IE 8 (<code>gt</code> znamená greater than – vyšší než)
	<tr>
		<td><code>if !IE 7</code>
		<td>všude jinde než v IE 7, pochopitelně taktéž ne v jíných prohlížečích než IE (je to pro ně běžný komentář), vykřičník je negace
	<tr>
		<td><code>if gte IE 6</code>
		<td>ve všech IE od verse 6 včetně (<code>gt<b>e</b></code> – asi jakože equal = shodné)
</table>

<p>Kromě výše uvedených symbolů lze používat i klasické operátory <code>&amp;</code> či <code>|</code> a podmínky řetězit.</p>

<h2>Použití</h2>
<ol>
	<li><p>Jedna možnost je pro Explorer(y) vytvářet zvláštní CSS soubory a podmínkou (komentářem) obalit jejich při<code>&lt;link></code>ování ke stránce.</p>
		<p>Nevýhoda je, že uživatel bude zbytečně zdržován dalším HTTP požadavkem na další CSS soubor, který často bude mít jen pár opravných vlastností.
	<li><p>Proto může být elegantnější pomocí podmíněných komentářů nastavit třídu <code>ie</code> pro nějaký hodně nadřazený element (<code>&lt;html</code>/<code>body></code>) a pro konkrétní prohlížeč psát selektory začínající právě tou třídou:
		<pre><code>.ie h1 {/* pravidla pro nadpis &lt;h1> v IE */}</code></pre>
		<p>V HTML lze využít toho, že u elementu <code>&lt;html></code> je volitelné psát počáteční i koncovou značku, takže se nemusíme zaobírat jejím dosazováním pro ostatní prohlížeče.
		<pre>&lt;!--[if IE]>&lt;html class="ie">&lt;![endif]--></pre>
</ol>			

<h2 id="ie10">Podmíněné komentáře v IE 10</h2>
<p>V Internet Exploreru 10 už podmíněné komentáře nefungují s výjimkou přepnutí do staršího režimu <b>IE 9</b>.</p>
<pre>&lt;meta http-equiv="x-ua-compatible" content="IE=9"></pre>
<p>Čímž se ale přijde o možnosti, co umí IE 10 oproti IE 9.</p>
      
<p>Proto se jako lepší řešení může nabízet určit prohlížeč na straně serveru. A třeba podle toho přidat CSS třídu.</p>

<h3>Řešení v PHP</h3>
<p>Podobně jako u <a href="/nahled-seznam#reseni">upravování náhledu na Seznamu</a>, stačí testovat hlavičku <a href="/ua"><code>user-agent</code></a>:
<pre><code>&lt?php 
if (strpos($_SERVER['HTTP_USER_AGENT'], "MSIE")) {
  echo "&lt;html class=ie>";
}
?></code></pre>
<p>Specifikovat konkrétní IE lze testování hodnot jako (<code>MSIE 6</code>, <code>MSIE 7</code>, <code>MSIE 8</code>, <code>MSIE 9</code>, <code>MSIE 10</code>).</p>
      
<p><a href="/ie11">IE 11</a> už <code>MSIE</code> v <code>user-agent</code> hlavičce nemá. Detekovat jde ale třeba vykreslovací jádro <code>Trident/7.0</code>.</p>      
      
      <p>Tvar podmínky pro <b>jiné prohlížeče než IE</b> by vypadal následovně:</p>
<pre><code>&lt?php 
if (
  isset($_SERVER['HTTP_USER_AGENT']) &&
  (
    strpos($_SERVER['HTTP_USER_AGENT'], "MSIE") === false ||    
    strpos($_SERVER['HTTP_USER_AGENT'], "Trident/7.0") === false
  )
) {
  echo "&lt;html class=non-ie>";
}</code></pre>