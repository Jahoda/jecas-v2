---
title: "Přidat/odebrat třídu"
headline: "Přepínání tříd v JS"
description: "Přepínání, přidávání a odebírání CSS tříd JavaScriptem."
date: "2013-11-18"
last_modification: "2018-04-09"
status: 1
tags: ["hotova-reseni", "js", "prepinani-vzhledu"]
format: "html"
---

<p>Chceme-li na stránce provádět <a href="/zmena-vzhledu">změny vzhledu</a>, <a href="/zobrazit-skryt">zobrazovat a skrývat text</a> nebo obecně provádět nějaké <b>visuální změny</b>, existují dva základní postupy:</p>

<ol>
  <li>
    <p>Měnit CSS vlastnosti <b>přímo JavaScriptem</b> přes vlastnost <code>style</code>:</p>
    <pre><code>element.style.color = "red";
element.style.marginTop = "1em";</code></pre>
    <p>Pomlčky (spojovníky) v názvech CSS vlastností se v JavaScriptu zapisují tak, že se <b>spojovník vypustí</b> a písmeno po něm se zvětší (u <a href="/css-prefixy#js">CSS prefixů</a> je v <b>IE</b> drobná odlišnost).</p>
    <p>Případně se dají všechna pravidla <b>nastavit najednou</b> přes <code>style.cssText</code>:</p>
    <pre><code>element.style.<b>cssText</b> = "color: red; margin-top: 1em";</code></pre>
  </li>
  <li>
    <p>Změnit <b>jen třídu</b> (<code>className</code>) a vzhled <b>řešit v CSS</b>.</p>
  </li>
</ol>














<p>Měnit <b>jen CSS třídu</b> bývá většinou lepší postup. Nezanáší se tolik JS kód a CSS je možné psát v běžném a komfortnějším prostředí, než je <code>cssText</code> řetězec.</p>

<p>Pochopitelně to <b>neplatí vždy</b>. Třeba u <b>dynamicky nastavovaných rozměrů</b> nemá smysl si vytvářet stovky tříd typu:</p>
<pre><code>.sirka108 {width: 108px}</code></pre>
<p>Ale asi bude výhodnější měnit <code>style.width</code>.</p>













<h2 id="nastavit">Nastavit třídu</h2>
<p>Nastavení požadované třídy se provádí změnou <code>element.className</code>.</p>

<p>Následující kód nastaví (přepíše) elementu s ID <code>idecko</code> třídu na <code>vlastni-trida</code>:</p>
<pre><code>var <b>element</b> = document.getElementById("<i>idecko</i>");
element.className = "vlastni-trida";</code></pre>












<h2 id="pridat">Přidat třídu</h2>
<p>V případě, že element už <b>nějakou <code>class</code> má</b>, potřebujeme tu novou jen přidat, ale <b>zachovat původní</b>:</p>
<pre><code>element.className <b>+</b>= "<b> </b>dalsi-trida";</code></pre>
<p>Uvedený kód <b>přidá</b> k původní hodnotě <code>dalsi-trida</code>. Důležité je si uvědomit, že výsledným obsahem <code>className</code> musí být stejný obsah jako při klasickém nastavování tříd v HTML:</p>
<pre><code>&lt;div class="prvni-trida<b> </b>dalsi-trida"></code></pre>
<p>Nesmí se tedy <b>zapomenout na mezeru</b> mezi třídami. Mezery okolo jsou nadbytečné, ale ničemu <b>nevadí</b>.</p>




















<h2 id="odebrat">Odebrat třídu</h2>
<p>Tady už se musí pro podporu napříč prohlížeči začít trošku víc programovat a pomocí <code>replace</code> požadovanou <b>třídu odstranit</b>.</p>

<pre><code>function odebratTridu(element, trida) {
  element.className = element.className.replace(trida, "");
}</code></pre>














<h2 id="prepinani">Přidat/odebrat třídu</h2>
<p>Pro <b>přepínání jedné třídy</b> můžeme použít něco jako:</p>
<pre><code>function prepnout(element, trida) {
  if (element.className.match(trida)) {
    element.className = element.className.replace(trida, "");
  }
  else {
    element.className += " " + trida;
  }
}</code></pre>

<p>V případě, že element už třídu má, bude mu <b>odebrána</b>; pokud ji naopak ještě nemá, <b>bude přidána</b>.</p>
















<h2 id="prepinani-trid">Přepínání dvou tříd</h2>
<p>A nakonec <b>prohazování dvou názvů třídy</b> bude vypadat následovně:</p>
<pre><code>function prohoditTridy(element, trida1, trida2) {
  element.className = element.className == trida2 ? trida1 : trida2;
}</code></pre>















<h2 id="element">Jakému <code>element</code>u třídu měnit?</h2>
<p>Důležitá otázka je, kterému elementu třídu měnit/prohazovat/přepínat.</p>

<ol>
  <li>Pokud je tlačítko k přepínání <b>uvnitř elementu</b>, dá se na něj elegantně dostat přes <code>parentNode</code> (<a href="https://kod.djpw.cz/fzr">ukázka</a>).</li>
  <li>V ostatních případech je většinou nejlepší <b>najít element</b> přes <code>document.getElementById("idecko")</code> (<a href="https://kod.djpw.cz/hzr">ukázka</a>).</li>
</ol>


<h2 id="classlist">Seznam tříd <code>classList</code></h2>
<p>Od <b>IE 10</b> funguje v prohlížečích vlastnost <code>classList</code>:</p>

<ul>
  <li><code>element.classList.contains("nazevTridy")</code> — zjistí, zda element má <b>nastavenou třídu</b>,</li>
  <li><code>element.classList.add("nazevTridy")</code> — <b>přidá třídu</b>,</li>  
  <li><code>element.classList.remove("nazevTridy")</code> — <b>odebere třídu</b>,</li>  
  <li><code>element.classList.toggle("nazevTridy")</code> — <b>přepne třídu</b> (<a href="https://kod.djpw.cz/izr">ukázka</a>).</li>    
</ul>

<p>Testovat podporu <code>classListu</code> lze třeba přes:</p>
<pre><code>if (document.documentElement.classList) {
  // classList funguje
}</code></pre>

<p>Použití <code>classList</code>u by v <b>podporovaných prohlížečích</b> asi mělo být rychlejší. Existuje hotové řešení <a href="https://github.com/toddmotto/apollo">Apollo.js</a>, které právě v podporovaných prohlížečích použije <code>classList</code> a jinde <i>klasické řešení</i>.</p>












<h3 id="pokrocile">Pokročilejší <code>classList</code></h3>

<p>Mimo <b>IE</b> jde v novějších prohlížečích používat ještě užitečnější rozhraní <code>classList</code>:</p>

<ol>
  <li>
    <p>Druhý parametr v <code>classList.toggle</code>:</p>
    
    <pre><code>element.classList.toggle('prepnout-tridu', <b>promenna > 10</b>);</code></pre>
    
    <p>Přidá/odebere třídu podle vyhodnocení podmínky v druhém argumentu.</p>
  </li>
  
  
  
  <li>
    <p>Více tříd v <code>classList.add</code>/<code>classList.remove</code>:</p>
    
    
    <pre><code>element.classList.add('prvni-trida', <b>druha-trida</b>);</code></pre>
  </li>
  
  
  <li>
    <p>Nahrazení třídy přes <code>element.classList.replace</code>:</p>
    
    
    <pre><code>element.classList.replace('puvodni-trida', <b>nova-trida</b>);</code></pre>
  </li>
</ol>




<div class="external-content">
  <ul>
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/classList">Element.classList</a></li>
  </ul>
</div>