---
title: "Funkce getElementById a getElementsByTagName"
headline: "Metody <code>getElementById</code> a <code>getElementsByTagName</code>"
description: "Vybírání elementů v JavaScriptu metodami <code>getElementById</code>, <code>getElementsByTagName</code> a <code>getElementsByClassName</code>."
date: "2014-03-31"
last_modification: "2014-03-31"
status: 1
tags: ["js", "js-vyber-elementu"]
format: "html"
---

<p>Chceme-li v JavaScriptu pracovat s nějakým HTML elementem, který už na stránce existuje, dají se k tomu použít <code>getElement*</code> metody.</p>

<p>Používání těcho metod se týká hlavně psaní kódu pro prohlížeče <b>IE 7</b> a starší, které ještě neznají metody <a href="/queryselector">querySelector/querySelectorAll</a> – vybírání elementů pomocí běžných <a href="/css-selektory">CSS selektorů</a>.</p>

<p>V novějších prohlížečích (<b>IE 8</b>+) je <code>querySelector:</code></p>

<ol>
  <li>kratší na zápis,</li>
  <li>universálnější, takže jsou pohodlnější případné změny.</li>
</ol>

<h2 id="id"><code>getElementById</code></h2>

<p>Vrátí první element s požadovaným ID. (Poznámka: podle HTML specifikace by na stránce mělo být jedno ID použito jen jednou, nicméně JavaScript (a koneckonců ani CSS) nemá výrazný problém s nedodržením.)</p>

<pre><code>var element = document.getElementById("<b>idecko</b>");</code></pre>

<h2 id="tagname"><code>getElementsByTagName</code></h2>

<p>Vybere všechny HTML značky s daným názvem. Při zápisu těchto metod se často plete písmeno <code>s</code> za „<code>getElement</code>“. U metody <code>getElementBy<b>Id</b></code> se „<code>s</code>“ nepíše, u <code>getElement<i>s</i>By<b>TagName</b></code> naopak ano (i v případě, že je potřeba vybrat pouze první element daného názvu).</p>

<p>Následující tvary jsou <b>proto chybné</b>:</p>

<ul>
  <li><code>document.getElement<b>s</b>ById</code></li>
  <li><code>document.getElemen<b>t</b>ByTagName</code></li>
  <li><code>document.getElemen<b>t</b>ByClassName</code></li>
</ul>

<h3 id="prochazeni">Procházení elementů</h3>
<p>Jelikož <code>getElementsByTagName</code> nevrátí konkrétní element, ale pole elementů (tzv. <code>nodeList</code>). Je potřeba kolekci elementů <a href="/js-cykly">projít cyklem</a> nebo použít číselné indexy (jsou číslovány od nuly):</p>

<pre><code>var prvniDiv = document.getElementsByTagName("div")<b>[0]</b>;
var tretiDiv = document.getElementsByTagName("div")<b>[2]</b>;</code></pre>

<p>Jednoduchý průchod všemi <code>&lt;div></code>y stránky.</p>

<pre><code>var znacky = document.getElementsByTagName("div");
for (var i = 0; i &lt; znacky.length; i++) {
  // znacky[i]
}</code></pre>

<h2 id="classname"><code>getElementsByClassName</code></h2>

<p>Tato metoda se chová podobně jako <code>getElementsByTagName</code>, jen vybírá, jak už název vypovídá, podle názvu třídy.</p>

<pre><code>var zlute = document.getElementsBy<b>Class</b>Name</code>("zlute");</pre>

<p>Výše uvedený kód přiřadí do proměnné <code>zlute</code> kolekci elementů s CSS třídou „<code>zlute</code>“. Procházení cyklem je shodné jako u předchozí metody.</p>

<p>Z důvody slabší podpory (<b>IE 9</b> a novější), než je u <code>querySelector</code>u, ale nedává používání <code>getElementsByClassName</code> moc smysl.</p>

<h2 id="skladani">Skládání <code>getElement</code> metod</h2>

<p>Metody <code>getElement</code> je možné řetězit. První element s třídou <code>zluty</code> v druhém <code>&lt;div></code>u v elementu s ID <code>idecko</code> vybere následující kód:</p>

<pre><code>var element = document.getElementById("idecko")
                      .getElementsByTagName("div")[1]
                      .getElementsByClassName("zluty")[0];</code></pre>

<p><a href="http://kod.djpw.cz/socb">Ukázka</a>.</p>

<p>Zde už je elegance <code>querySelector</code>u jasně patrná. Ekvivalentní kód s jeho využitím by mohl být:</p>

<pre><code>var element = document.querySelector(
  "#idecko > div:nth-child(2) > .zluty:first-child"
);</code></pre>

<p><a href="http://kod.djpw.cz/tocb">Ukázka</a>. I když to vyžaduje znalost pokročilejších CSS selektorů. A podpora napříč prohlížeči je limitována nejen podporou <code>querySelectoru</code> (<b>IE 8+</b>), ale i <a href="/css-selektory#n-ty-potomek">selektoru n-tého potomka</a> (<b>IE 9</b> a novější).</p>

<p>Ještě větší rozdíl je u komplikovanějších selektorů jako třeba přímý potomek (<code>.rodic > .potomek</code>), selektor sourozence (<code>.prvni + .druhy</code>) a podobně. Zde už je nutné bez <code>querySelector</code>u testovat <code>parentNode</code>, <code>previousSibling</code>, <code>nextSibling</code>, regulárními výrazy <code>className</code> u komplikovanějších <b>atributových selektorů</b> a podobně.</p>

<h2 id="existence-elementu">Ověření existence elementu</h2>

<p>V případě, že chceme s vybraným elementem nějak pracovat, a <b>není úplně jisté, že bude existovat</b>, je vhodné ověřit existenci. Přístup k vlastnostem neexistujícího elementu vyhazuje chyby. Potřebná podmínka je primitivní.</p>

<pre><code>var element = document.getElementById("idecko");
if (element) {
  element.style.display = "block";
}</code></pre>