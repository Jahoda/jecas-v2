---
title: "InnerHTML"
headline: "JS vlastnost <code>innerHTML</code>"
description: "Jak funguje vlastnost <code>innerHTML</code> v JavaScriptu. Různé způsoby vypisování obsahu v JS."
date: "2014-02-21"
last_modification: "2014-10-16"
status: 1
tags: ["js", "napady"]
format: "html"
---

<p>Napříč prohlížeči široce podporovaná metoda <code>innerHTML</code> slouží v JS k:</p>

<ol>
  <li><b>získání HTML</b> obsahu nějakého elementu,</li>
  <li><b>nastavení HTML obsahu</b> do nějakého elementu.</li>
</ol>



<h2 id="ziskani-obsahu">Získání obsahu</h2>

<p>Po získání elementu (metodami <a href="/getelement"><code>getElement*</code></a>, <a href="/queryselector"><code>querySelector</code></a>em a podobně) jde pracovat s jeho vlastností <code>innerHTML</code>. Třeba HTML obsah elementu s identifikátorem „<code>element</code>“ vypsat hláškou <code>alert</code>.</p>

<pre><code>&lt;div id="<b>element</b>"><i>Obsah</i>&lt;/div>
&lt;script>
  var el = document.getElementById("<b>element</b>");
  alert(el.innerHTML); // vypíše „<i>Obsah</i>“
&lt;/script></code></pre>

<p><a href="https://kod.djpw.cz/wmgb">Ukázka</a></p>








<h2 id="nastaveni">Nastavení <code>innerHTML</code></h2>

<p>Zajímavější je nepochybně nějaké HTML za pomoci JavaScriptu nastavovat. Díky tomu je možné do stránky <b>dynamicky vypisovat obsah</b>.</p>

<pre><code>&lt;div id="<b>prazdny-element</b>">&lt;/div>
&lt;script>
  var el = document.getElementById("<b>prazdny-element</b>");
  el.innerHTML = "<i>Obsah</i>";
&lt;/script></code></pre>

<p>Tento kód vloží do prázdného <code>&lt;div></code>u <i>Obsah</i>. <a href="https://kod.djpw.cz/vmgb">Ukázka</a></p>

<p><b>Upozornění</b>: Důležitý obsah by měl být přímo v HTML. S obsahem vypsaným JavaScriptem mohou mít problémy vyhledávače.</p>










<h2 id="jak">Jak <code>innerHTML</code> funguje?</h2>

<p>Při nastavení <code>innerHTML</code> musí prohlížeč projít obsah řetězce a podle toho poupravit celý <a href="/dom">DOM (Document Object Model)</a> daného elementu.</p>

<p>Z toho plyne pár úskalí, na která je si dobré <b>dát pozor</b>.</p>






<h3 id="cyklus">Úprava <code>innerHTML</code> v cyklu</h3>

<p>Mějme následující kód, který si najde seznam a v <a href="/js-cykly">cyklu</a> do něj vloží 10 položek.</p>

<pre><code>var element = document.getElementById("seznam");
for (var i = 1; i &lt;= 10; i++) {
  element.innerHTML += "&lt;li>" + i + "&lt;/li>";
}</code></pre>

<p><a href="https://kod.djpw.cz/xmgb">Ukázka</a></p>

<p>Funkční to bude, ale <b>zbytečně neefektivní</b> – každý jednotlivý průchod cyklu bude manipulovat s <i>DOMem</i> celého elementu.</p>

<p>Lepší řešení proto je si obsah ukládat do <b>pomocné proměnné</b> a pomocí <code>innerHTML</code> ho nastavit najednou:</p>

<pre><code>var element = document.getElementById("seznam");
var obsah = "";
for (var i = 1; i &lt;= 10; i++) {
  obsah += "&lt;li>" + i + "&lt;/li>";
}
element.innerHTML = obsah;</code></pre>

<p><a href="https://kod.djpw.cz/ymgb">Ukázka</a></p>












<h3 id="pripojeni">Připojení obsahu</h3>

<p>Konstrukce <code>element.innerHTML <b>+=</b> "&lt;p>něco&lt;/p>"</code> je obecně ve většině případů <b>dost nešťastná</b>.</p>

<p>Kvůli přidání <i>něčeho</i> se musí <b>znovu vytvořit celý DOM</b> <code>element</code>u. Kromě toho, že to u složitějších věcí dlouho trvá, se tím <i>zresetuje</i> dosavadní stav – například vyplněná <b>políčka formulářů</b> a podobně. (Někdy se to ale může hodit – třeba u <a href="/input-file">resetování <code>&lt;input type="file"></code></a>.)</p>

<p><a href="https://kod.djpw.cz/angb">Ukázka</a></p>
<!--
<p>Řešením je metodou <code>createElement</code> element vytvořit a přidat ho přes <code>appendChild</code>:</p>

<pre><code>var neco = document.createElement("p");
neco.innerHTML = "něco";
element.appendChild(neco);</code></pre>

<p><a href="https://kod.djpw.cz/bngb">Ukázka</a></p>

<p>Kromě vytvoření celých elementů (<code>createTextNode</code>) lze vytvořit i samotný text – metodou <code>create<b>TextNode</b></code>.</p>

<pre><code>var text = document.createTextNode("obsah");
element.appendChild(text);</code></pre>

-->







<h2 id="insertAdjacentHTML">Vlastnost <code>insertAdjacentHTML</code></h2>

<p>Řešením na překreslování DOMu při změně <code>innerHTML</code> je metoda <code>insertAdjacentHTML</code>.</p>

<p>Funguje ve všech aktuálních versích prohlížečů (<b>IE 4+</b>, <b>Chrome 1+</b>, <b>Firefox 8+</b>, <b>Opera 7+</b>).</p>

<pre><code>element.insertAdjacentHTML(umisteni, obsah);</code></pre>

<p>První parametr <code>umisteni</code> určuje, kam se obsah má vložit:</p>

<ul>
  <li><code>beforebegin</code> – před element</li>
  <li><code>afterbegin</code> – na začátek elementu</li>
  <li><code>beforeend</code> – před konec elementu</li>
  <li><code>afterend</code> – za element</li>
</ul>

<p>U prostého odstavce vypadají posice následovně.</p>

<pre><code>&lt;!-- beforebegin -->
&lt;p>
  &lt;!-- afterbegin -->
  Obsah
  &lt;!-- beforeend -->
&lt;/p>
&lt;!-- afterend --></code></pre>

<p>Druhý parametr <code>obsah</code> je potom text / HTML kód, který se má vložit.</p>

<p><a href="https://kod.djpw.cz/engb">Ukázka</a></p>
















<h2 id="text">Vlastnosti <code>textContent</code> a <code>innerText</code></h2>

<p>Pro získávání/nastavování obsahu, který <b>neobsahuje HTML</b>, existují vlastnosti podobné jako <code>innerHTML</code>.</p>

<p>Vlastnosti <code>textContent</code> i <code>innerText</code> fungují obdobně, jen mají <b>různou podporu v prohlížečích</b>.</p>

<ol>
  <li><code>textContent</code> – funguje od <b>IE 9</b></li>
  
  <li><code>innerText</code> – funguje všude kromě <b>Firefoxu</b></li>
</ol>

<p><a href="https://kod.djpw.cz/dngb">Ukázka</a></p>

<p>Kvůli těmto rozdílům je snazší používat <code>innerHTML</code>. V případě, že je vyloženě cílem získat obsah <b>bez HTML značek</b>, je možné obě vlastnosti sjednotit.</p>

<pre><code>var text = element.textContent || element.innerText;</code></pre>





<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>DevDocs: <a href="http://devdocs.io/dom/node.textcontent">Node.textContent</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/element.insertAdjacentHTML">Element.insertAdjacentHTML()</a></li>
  
  <li>John Resig: <a href="http://ejohn.org/blog/dom-insertadjacenthtml/">DOM insertAdjacentHTML</a></li>
</ul>