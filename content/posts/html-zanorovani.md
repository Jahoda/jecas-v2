---
title: "Zanořování nezanořitelných HTML značek"
headline: "Zanořování nezanořitelných HTML značek"
description: "Jak funguje zanořování značek jako <p> nebo <button> v HTML parseru versus DOM metodách. Rozdíl mezi přímým HTML a createElement s appendChild."
date: "2025-11-11"
last_modification: "2025-11-11"
status: 1
tags: ["html", "html-tagy", "js", "napady"]
format: "html"
---

<p>Některé HTML značky <b>nelze do sebe zanořovat</b>. Typickým příkladem jsou odstavce <code>&lt;p></code> nebo tlačítka <code>&lt;button></code>. HTML parser takové pokusy automaticky opraví. Ale co se stane, když stejnou strukturu vytvoříme pomocí <b>DOM metod</b> v JavaScriptu?</p>

<h2 id="problem">Problém s vnořováním</h2>

<p>Zkusme napsat následující HTML kód, kde jeden odstavec zanořujeme do druhého:</p>

<pre><code>&lt;p>Vnější odstavec
  &lt;p>Vnitřní odstavec&lt;/p>
&lt;/p></code></pre>

<p>HTML parser tento kód automaticky <b>opraví</b> a výsledný DOM bude vypadat následovně:</p>

<pre><code>&lt;p>Vnější odstavec&lt;/p>
&lt;p>Vnitřní odstavec&lt;/p></code></pre>

<p>Parser při zjištění otevírací značky <code>&lt;p></code> uvnitř jiného <code>&lt;p></code> automaticky <b>uzavře</b> vnější odstavec a vytvoří dva samostatné odstavce za sebou.</p>

<div class="live">
  <div id="priklad-html"></div>
  <script>
    var div = document.getElementById('priklad-html');
    div.innerHTML = '<p>Vnější odstavec<p>Vnitřní odstavec</p></p>';
  </script>
  <button onclick="alert(document.getElementById('priklad-html').innerHTML)">Zobrazit výsledný DOM</button>
</div>

<h2 id="dom-metody">Vytvoření přes DOM metody</h2>

<p>Co se ale stane, když stejnou strukturu vytvoříme pomocí JavaScriptu a DOM metod <code>createElement</code> a <code>appendChild</code>?</p>

<pre><code>var vnejsi = document.createElement("p");
var vnitrni = document.createElement("p");

vnitrni.textContent = "Vnitřní odstavec";
vnejsi.textContent = "Vnější odstavec ";
vnejsi.appendChild(vnitrni);

document.body.appendChild(vnejsi);</code></pre>

<p>V tomto případě <b>žádná automatická oprava neproběhne</b>! Výsledný DOM skutečně obsahuje <code>&lt;p></code> uvnitř jiného <code>&lt;p></code>, což je v HTML nevalidní struktura.</p>

<div class="live">
  <div id="priklad-dom"></div>
  <script>
    var div = document.getElementById('priklad-dom');
    var vnejsi = document.createElement("p");
    var vnitrni = document.createElement("p");
    vnitrni.textContent = "Vnitřní odstavec";
    vnejsi.textContent = "Vnější odstavec ";
    vnejsi.appendChild(vnitrni);
    div.appendChild(vnejsi);
  </script>
  <button onclick="alert(document.getElementById('priklad-dom').innerHTML)">Zobrazit výsledný DOM</button>
</div>

<h2 id="proc">Proč to funguje jinak?</h2>

<p>Rozdíl je v tom, <b>kdy</b> se HTML parsuje:</p>

<ol>
  <li><b>HTML parser</b> zpracovává textový řetězec a podle <a href="https://html.spec.whatwg.org/">HTML specifikace</a> musí nevalidní struktury opravit. Parser <i>ví</i>, že <code>&lt;p></code> nemůže obsahovat další <code>&lt;p></code>, a automaticky první uzavře.</li>

  <li><b>DOM metody</b> pracují přímo s objektovým modelem dokumentu. Když voláte <code>appendChild</code>, pouze říkáte prohlížeči <i>„přidej tento element jako potomka"</i>. Parser se na to už nedívá, protože nepracujete s HTML řetězcem.</li>
</ol>

<h2 id="dalsi-priklady">Další příklady nezanořitelných značek</h2>

<p>Podobně jako <code>&lt;p></code> se chovají i další značky:</p>

<h3 id="button">Tlačítko <code>&lt;button></code></h3>

<p>Tlačítko nesmí obsahovat další tlačítko:</p>

<pre><code>&lt;!-- HTML parser automaticky opraví -->
&lt;button>Vnější
  &lt;button>Vnitřní&lt;/button>
&lt;/button></code></pre>

<p>Ale přes DOM metody to jde:</p>

<pre><code>var vnejsi = document.createElement("button");
var vnitrni = document.createElement("button");
vnitrni.textContent = "Vnitřní";
vnejsi.textContent = "Vnější ";
vnejsi.appendChild(vnitrni); // Funguje!</code></pre>

<div class="live">
  <div id="priklad-button"></div>
  <script>
    var div = document.getElementById('priklad-button');
    var vnejsi = document.createElement("button");
    var vnitrni = document.createElement("button");
    vnitrni.textContent = "Vnitřní";
    vnejsi.textContent = "Vnější ";
    vnejsi.appendChild(vnitrni);
    div.appendChild(vnejsi);
  </script>
</div>

<h3 id="a">Odkaz <code>&lt;a></code></h3>

<p>Odkaz nesmí obsahovat další interaktivní element, jako je další odkaz nebo tlačítko:</p>

<pre><code>&lt;!-- Nevalidní, parser opraví -->
&lt;a href="url1">
  &lt;a href="url2">Vnořený odkaz&lt;/a>
&lt;/a></code></pre>

<h3 id="form">Formulář <code>&lt;form></code></h3>

<p>Formulář nesmí obsahovat další formulář:</p>

<pre><code>&lt;!-- Nevalidní -->
&lt;form>
  &lt;form>&lt;/form>
&lt;/form></code></pre>

<h2 id="prakticke-dusledky">Praktické důsledky</h2>

<p>Tento rozdíl je důležitý zejména pro <b>JavaScriptové frameworky</b> a knihovny, které vytvářejí DOM dynamicky.</p>

<h3 id="innerhtml">innerHTML vs createElement</h3>

<p>Při použití <a href="/innerhtml"><code>innerHTML</code></a> se HTML řetězec parsuje stejně jako běžný HTML kód, takže se aplikují všechna omezení:</p>

<pre><code>// HTML parser opraví strukturu
element.innerHTML = '&lt;p>Vnější&lt;p>Vnitřní&lt;/p>&lt;/p>';</code></pre>

<p>Zatímco při použití DOM metod se omezení neaplikují:</p>

<pre><code>// Vytvoří nevalidní, ale funkční strukturu
var p1 = document.createElement('p');
var p2 = document.createElement('p');
p1.appendChild(p2);</code></pre>

<h3 id="frameworky">Frameworky jako Svelte</h3>

<p>Některé frameworky (např. <a href="/proc-svelte">Svelte</a>) generují kód, který používá DOM metody. To znamená, že mohou vytvořit HTML struktury, které by v čistém HTML nešly napsat.</p>

<p>Toto chování může vést k <b>neočekávaným výsledkům</b>, pokud komponenta vytvoří strukturu, která je technicky nevalidní, ale v DOM funguje. Při použití <code>innerHTML</code> nebo server-side renderingu se taková struktura může chovat jinak.</p>

<h2 id="validace">HTML validace</h2>

<p>I když DOM metody umožňují vytvořit nevalidní struktury, <b>nedoporučuje se</b> to dělat záměrně:</p>

<ul>
  <li>Může to způsobit <b>nekonzistentní chování</b> při různých způsobech renderování (CSR vs SSR)</li>
  <li>Validátory HTML budou hlásit <b>chyby</b></li>
  <li>Může to ovlivnit <b>přístupnost</b> (screen readery mohou mít problémy)</li>
  <li>Budoucí verze prohlížečů mohou takové struktury <b>opravovat</b></li>
</ul>

<h2 id="reseni">Správné řešení</h2>

<p>Namísto vnořování nezanořitelných značek použijte jiné elementy:</p>

<pre><code>&lt;!-- Místo vnořených odstavců -->
&lt;div>
  &lt;p>První odstavec&lt;/p>
  &lt;p>Druhý odstavec&lt;/p>
&lt;/div>

&lt;!-- Místo vnořených tlačítek -->
&lt;div class="button-group">
  &lt;button>První tlačítko&lt;/button>
  &lt;button>Druhé tlačítko&lt;/button>
&lt;/div></code></pre>

<p>Nebo použijte <code>&lt;span></code> a CSS pro stylování:</p>

<pre><code>&lt;button>
  &lt;span class="inner-button-style">Pseudo tlačítko uvnitř&lt;/span>
&lt;/button></code></pre>

<h2 id="zaver">Závěr</h2>

<p>HTML parser a DOM metody se chovají <b>odlišně</b> při práci s nezanořitelnými značkami:</p>

<ul>
  <li><b>HTML parser</b> (včetně <code>innerHTML</code>) automaticky opraví nevalidní struktury</li>
  <li><b>DOM metody</b> (<code>createElement</code>, <code>appendChild</code>) umožňují vytvořit i nevalidní struktury</li>
  <li>Tento rozdíl může způsobit <b>problémy</b> při různých způsobech renderování</li>
  <li>Nejlepší je <b>dodržovat</b> HTML specifikaci a nevytvářet nevalidní struktury záměrně</li>
</ul>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://html.spec.whatwg.org/">HTML Living Standard</a> – Oficiální HTML specifikace</li>
  <li><a href="https://validator.w3.org/">W3C Markup Validation Service</a> – Validátor HTML</li>
  <li><a href="/dom">DOM (Document Object Model)</a> – Jak funguje DOM</li>
  <li><a href="/innerhtml">innerHTML</a> – Práce s HTML obsahem v JS</li>
  <li><a href="/button">HTML tlačítko &lt;button></a> – Více o tlačítkách</li>
</ul>
