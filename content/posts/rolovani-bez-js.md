---
title: "Odrolování bez JavaScriptu"
headline: "Odrolování bez JavaScriptu"
description: "Jak odscrollovat na určitou část stránky bez JavaScriptu."
date: "2016-11-29"
last_modification: "2016-12-03"
status: 1
tags: ["html", "napady", "scroll"]
format: "html"
---

<div class="internal-content">
  <p><a href="/odrolovani">Odrolování na HTML značku v JS</a> se zabývá samostatný článek.</p>
</div>


<p>Existují ale nějaké možnosti jen v HTML?</p>





<h2 id="kotva">Kotva</h2>

<p>Pro odkazování na jednotlivé části dokumentu existují <a href="/odkaz#kotva">#kotvy</a>. Pro odrolování potom stačí použít běžný odkaz:</p>

<pre><code>&lt;a href="#<b>kotva</b>">
  Odkaz na místo označené ↓
&lt;/a>
…
&lt;a name="<b>kotva</b>">&lt;/a></code></pre>












<h3 id="nacteni">Odrolování po načtení</h3>

<p>Využít kotvy jde pro odrolování ihned při načtení stránky.</p>

<p>To jde třeba díky <code>&lt;meta></code> značce <code>refresh</code> v části <a href="/html-kostra#head"><code>&lt;head></code></a>:</p>


<pre><code>&lt;meta http-equiv="refresh" content="1;url=#<b>kotva</b>"></code></pre>







<p>Bohužel v takovém případě prohlížeče obnoví celou stránku. To není moc žádoucí, protože tím vznikne nekonečná smyčka přesměrování.</p>

<p>Teoreticky jde tento postup zkombinovat se serverovým řešením a tuto značku zobrazit jen při prvním načtení. Příklad v <a href="/php">PHP</a>:</p>

<pre><code>&lt;?php if (!isset($_GET["<b>odrolovat</b>"])):?>
  &lt;meta http-equiv="refresh" content="1;url=?<b>odrolovat</b>#<i>kotva</i>">
&lt;?php endif ?></code></pre>






<p>U webové stránky, kde je nutné řešit <a href="/seo">SEO</a>, to není úplně vhodné, protože vznikají duplicitní URL, které by bylo potřeba řešit.</p>




<h3 id="form">Odrolování po odeslání formuláře</h3>

<p>Postupu s kotvou jde využít i při odesílání webového <a href="/formulare">formuláře</a>.</p>

<p>Kotvu je nutné uvést už do atributu <code>action</code>:</p>

<pre><code>&lt;form <b>action</b>="url<i>#kotva</i>">
…
</code></pre>











<h2 id="presmerovani">HTTP přesměrování na kotvu</h2>

<p>Do hlavičky <code>Location</code> jde uvést stránku s kotvou. Řešení v PHP:</p>

<pre><code>&lt;?php 
header("Location: stranka.html<b>#kotva</b>");
?></code></pre>








<p>Dle HTTP specifikace by v této hlavičce měla být absolutní URL, takže tento postup teoreticky není v souladu se specifikací. Nicméně funguje dobře napříč prohlížeči.</p>





<h2 id="autofocus">Focusování políčka</h2>

<p>Zajímavá možnost, jak automaticky odrolovat ihned po načtení stránky bez špetky JS, je využít políčka <code>&lt;input></code> s atributem <a href="/autofocus"><code>autofocus</code></a> (funkční od <b>IE 9)</b>.</p>

<pre><code>&lt;input <b>autofocus</b> style="position: absolute; left: -9999px"></code></pre>





<p>Skrýt políčko, aby nestrašilo, nestačí přes <a href="/display"><code>display: none</code></a>, protože by nedostalo <code>focus</code>.</p>

<p><a href="https://kod.djpw.cz/wxcc-">Živá ukázka</a></p>


<p>Výhoda tohoto postupu je, že prohlížeč inteligentně řeší odrolování na element v rámci viewportu.</p>

<p>Kromě toho se odrolování provede v nejkratší možné chvíli od načtení, takže by se nemělo stávat, že uživatel začne rolovat už před automatickým odrolováním. To je nevýhoda JS řešení, kdy se nejprve čeká ještě na stažení a zpracování JavaScriptu.</p>

<p>Řešení funguje i v mobilních prohlížečích.</p>

<p>Zásadní nevýhoda spočívá v tom, že se do políčka přesune kursor, čím se <b>zablokují některé klávesové zkratky</b>.</p>






<h2 id="zaver">Závěr</h2>

<p>Používat pro odrolování JavaScript je často nejlepší možnost. V případě, že by mělo být odrolování plynulé potom jediná volba.</p>

<p>Existují ale i možnosti na JS nezávislé.</p>

<p>Kombinace <code>autofocus</code>u + JS pro <i>odblokování</i> kláves by mohla být použitelná i v praxi díky inteligentnímu přesunu cíle do viewportu.</p>