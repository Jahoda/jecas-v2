---
title: "Lazy loading obrázků"
headline: "Lazy loading obrázků"
description: "Načtení obrázků, až když je na ně odrolováno. Různé postupy řešení."
date: "2013-11-27"
last_modification: "2017-02-07"
status: 1
tags: ["hotova-reseni", "js", "lazy-loading", "obrazky", "zrychlovani"]
format: "html"
---

<p>V případě, že je na stránce <b>hodně obrázků</b>, které nejsou ihned po příchodu na stránku vidět, jsou tzv. <i>pod ohybem</i>, může být rozumné je načítat až v momentě, kdy na ně návštěvník <b>odroluje</b>.</p>

<p>Sníží se tak <b>objem přenesených dat</b> i počet <b>HTTP spojení</b>.</p>

<h2 id="postup">Postup</h2>
<p>Jak zmíněné načítání při odrolování vytvořit v JavaScriptu:</p>

<ol>
  <li>Obrázky mimo <b>viditelnou oblast</b> stránky se po načtení skryjí.</li>
  <li>Při rolování (<code>window.onscroll</code>) se zkontroluje, které obrázky mají být vidět, a zobrazí se (donačtou se).</li>
</ol>

<h2 id="skryt-obrazek">Skrytí obrázku</h2>
<p>První zádrhel je v tom, že skrytí přes <code>display: none</code> nestačí, tj. něco jako:</p>

<pre><code>&lt;img src='obrazek.png' style='display: none'></code></pre>

<p>Sice obrázek skryje, ale fysickému <b>stažení obrázku</b> nezabrání. Naštěstí ale existují <a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=3&topic=153269">další postupy</a>, jak <b>načtení opravdu zabránit</b>:</p>

<ol>
  <li><p>Obrázku dát <b>prázdný/nesmyslný atribut <code>src</code></b> a ten skutečný až v momentě, kdy se na obrázek odscrolluje. Původní <code>src</code> může být v nějakém <a href="/vlastni-html-znacky">vlastním atributu</a>, ze kterého se hodnota skriptem přesune.</p></li>
  
  <li><p>Vložit obrázek jako <b>CSS pozadí</b>.</p>
    <pre><code>&lt;div class='obal-obrazku' style="display: none">
  &lt;div style="width: 100px; height: 100px; background: url(obrazek.png)">
  &lt;/div
&lt;div</code></pre>
    <p>Tady už <code>display: none</code> zafunguje a obrázek se automaticky nenačte.</p>
    
    <p>Důležité ale je <code>display: none</code> přidat rodiči <code>&lt;div></code>u s <code>background</code> obrázkem. Jinak se i tak v <b>některých prohlížečích obrázek stáhne</b> (test s <a href="http://kod.djpw.cz/jxab">rodičem</a> / <a href="http://kod.djpw.cz/hxab">elementem s pozadím</a>).</p>
  </li>
  
  <li>
    <p>Použít značku <code>&lt;noscript></code>. Její obsah se při <b>zapnutém JS</b> nevyhodnocuje. Nevýhoda je, že v <b>IE 7</b> se z ní nedá přečíst <code>innerHTML</code>. I tak ale jde přečíst hodnotu <code>&lt;noscript></code> atributu, což pro uložení adresy obrázku k <b>pozdějšímu načtení</b> může stačit (<a href="http://kod.djpw.cz/gqt">ukázka</a>).</p>
    <p><a href="https://github.com/luis-almeida/unveil">Hotové řešení</a> založené na jQuery, které využívá tuto techniku.</p>
  </li>
  
  <li>Vypsat kolem obrázku JavaScriptem <a href="/responsivni-komentare#script">značku <code>&lt;script></code> s neznámým <i>MIME typem</i></a>. Prohlížeč takový kód nevyhodnotí, ale jeho obsah půjde spolehlivě vydolovat z <code>innerHTML</code> (<a href="http://kod.djpw.cz/iqt">ukázka</a>).</li>
  
  <li><p>Použít <a href="/template">značku <code>&lt;template></code></a>. Ta zatím ale nefuguje v žádném <b>IE</b>, jen v <b>Chrome</b> a <b>Firefoxu</b>.</p></li>
</ol>

<p>Konkrétní <b>volba řešení</b> by měla záviset na požadavcích, zejména s ohledem na <b>vyhledávače</b>:</p>

<ul>
  <li>První a druhá možnost obrázky pro roboty v podstatě <b>zneviditelní</b>. Proto je vhodná jen v případě, že to nevadí / vyhledávač se může k obrázku dostat někde jinde.</li>
  
  <li>U značky <code>&lt;template></code> není jasné, jak se k ní budou v budoucnu roboti chovat. Zatím je ale <b>Googlem indexována</b>.</li>
  
  <li>Vypsání <code>&lt;script></code>u z neznámým MIME typem je značně <b>nestandardní</b>.</li>
</ul>

<h2 id="reseni">Hotové řešení</h2>
<h3>HTML</h3>
<pre><code>&lt;div class="img">
  &lt;script>document.write("&lt;script type='text/lazy-loading'>")&lt;/script>
    &lt;img src="obrazek.png" width="100" height="100">
  &lt;script>document.write("&lt;\/script>")&lt;/script>
&lt;/div></code></pre>
<h3>JS</h3>
<pre><code>var lazyImages = [];
function inViewPort(img) {
	var coords = img.getBoundingClientRect();
	return (coords.top >= 0 &amp;&amp; coords.left >= 0 &amp;&amp; coords.top) &lt;= (window.innerHeight || document.documentElement.clientHeight);
}
window.onload = function () {
	var imgArea = document; // kde se obrázky hledají
	var images = imgArea.getElementsByTagName("div");
	for (var i = images.length - 1; i > 10; i--) {
		if (images[i].className != "img") continue;        
		lazyImages.push(images[i]);		
	}
}
window.onscroll = function() {
	for (var i = lazyImages.length - 1; i >= 0; i--) {
		if (inViewPort(lazyImages[i])) {
			var hiddenCode = lazyImages[i].getElementsByTagName("script")[1];
			if (hiddenCode) {
				lazyImages[i].innerHTML = hiddenCode.innerHTML;
			}
			lazyImages.splice(i, 1);
		}
	}
}</code></pre>

<h2 id="alternativni-reseni">Alternativní řešení</h2>
<p>Problém výše uvedeného postupu může být v tom, že při jakémkoliv rolování se budou vždy procházet všechny obrázky a bude se <b>kontrolovat jejich posice</b> a zda jsou vidět (funkce <code>inViewPort</code>).</p>

<p>Pokud by to stránku zpomalovalo, nabízí se si při načtení a změně rozměrů stránky ukládat posici obrázků.</p>

<p>Ještě mě napadl jeden postup. K obrázkům vytvořeným jako <b>CSS pozadí</b> uložit jejich přibližnou posici do CSS třídy (zaokrouhlenou třeba na stovky — například <code>top-2000</code> pro <i>obrázky</i>, co jsou přibližně 2000 pixelů od začátku stránky). A při rolování <a href="/css-vyhledavani#js-css-styl">vytvořit skriptem CSS</a>, které obrázek/obrázky s danou třídou zviditelní.</p>

<p>Něco ve smyslu:</p>
<pre><code>pridatCss(".top-" + zaokrouhlit(odrolovanoShora + vyskaOkna) + " {display: block}");</code></pre>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://dinbror.dk/blazy/">be]Lazy.js</a> – miniaturní knihovna pro lazy loading obrázků; skutečný <code>src</code> obrázku maskuje do <code>data-atributu</code></li>
  
  <li><a href="http://luis-almeida.github.io/unveil/">Unveil</a> – lazy loading plugin pro jQuery/<a href="/framework-zepto">Zepto</a></li>
</ul>