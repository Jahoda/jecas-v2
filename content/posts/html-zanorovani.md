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

<p><img src="/files/html-zanorovani/html-vs-dom.svg" alt="Porovnání HTML parseru a DOM metod při zanořování nezanořitelných značek" class="border"></p>

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

<h2 id="stylovani">Stylování vnořených nezanořitelných elementů</h2>

<p>Pokud se vám přes DOM metody podaří vytvořit <b>vnořené nezanořitelné elementy</b>, může se jejich stylování chovat <b>neočekávaně</b>.</p>

<h3 id="css-dedicnost">CSS dědičnost a specifičnost</h3>

<p>CSS pravidla se aplikují normálně, protože prohlížeč vidí validní DOM strukturu (i když je nevalidní podle HTML specifikace):</p>

<pre><code>p {
  margin: 20px;
  color: blue;
}

/* Vnitřní odstavec zdědí vlastnosti a přidá své */</code></pre>

<p>Problém nastává, když vnořený odstavec zdědí vlastnosti od vnějšího odstavce. Například <code>margin</code> se může <b>aplikovat dvakrát</b>, což vede k většímu rozestupu, než byste čekali.</p>

<div class="live">
  <style>
    .demo-nested p { margin: 20px; background: #f0f0f0; padding: 10px; }
  </style>
  <div class="demo-nested" id="demo-nested"></div>
  <script>
    var container = document.getElementById('demo-nested');
    var outer = document.createElement('p');
    var inner = document.createElement('p');
    outer.textContent = 'Vnější odstavec ';
    inner.textContent = 'Vnitřní odstavec (má dvojitý margin!)';
    outer.appendChild(inner);
    container.appendChild(outer);
  </script>
</div>

<h3 id="display-vlastnost">Vlastnost display</h3>

<p>Zajímavé je chování vlastnosti <code>display</code>. Odstavce jsou standardně <code>display: block</code>, což znamená, že zabírají celou šířku. Vnořený blokový element uvnitř jiného blokového elementu se bude chovat stejně:</p>

<pre><code>&lt;style>
  p { display: block; }
&lt;/style>

&lt;!-- Vytvořeno přes DOM --&gt;
&lt;p>Vnější (block)
  &lt;p>Vnitřní (block v blocku)&lt;/p>
&lt;/p></code></pre>

<p>Pokud změníte <code>display</code> vlastnost vnějšího nebo vnitřního elementu (např. na <code>inline</code> nebo <code>flex</code>), může se layout chovat <b>nepředvídatelně</b>.</p>

<h3 id="button-stylovani">Stylování vnořených tlačítek</h3>

<p>U tlačítek je situace ještě komplikovanější. Tlačítko má speciální <b>výchozí styly</b> a chování (kurzor, hover stavy, focus). Vnořené tlačítko zdědí některé vlastnosti, ale může mít problémy s:</p>

<ul>
  <li><b>Kliknutím</b> – které tlačítko se má aktivovat?</li>
  <li><b>Focus stavem</b> – může dojít k neočekávanému vizuálnímu zvýraznění</li>
  <li><b>Z-indexem</b> – vnořené tlačítko může překrývat vnější</li>
</ul>

<pre><code>var outer = document.createElement('button');
var inner = document.createElement('button');
outer.textContent = 'Vnější ';
inner.textContent = 'Vnitřní';
outer.appendChild(inner);

// Kliknutí na vnitřní tlačítko vyvolá události obou tlačítek!</code></pre>

<h2 id="xhtml">Co XHTML?</h2>

<p><b>XHTML</b> (Extensible HyperText Markup Language) je varianta HTML, která dodržuje přísnější pravidla <b>XML</b>. V XHTML platí stejná omezení na zanořování jako v HTML – <code>&lt;p></code> nemůže obsahovat další <code>&lt;p></code>, <code>&lt;button></code> nemůže obsahovat další <code>&lt;button></code>, atd.</p>

<h3 id="xhtml-parsing">XHTML parsing</h3>

<p>Hlavní rozdíl XHTML oproti HTML je v <b>chování parseru</b>:</p>

<ul>
  <li><b>HTML parser</b> je <i>benevolentní</i> (forgiving) – automaticky opravuje chyby a snaží se zobrazit stránku, i když má nevalidní strukturu</li>
  <li><b>XML/XHTML parser</b> je <i>striktní</i> – při jakékoliv chybě zobrazí chybovou hlášku a <b>odmítne stránku zobrazit</b></li>
</ul>

<p>Pokud byste v XHTML napsali vnořené odstavce:</p>

<pre><code>&lt;?xml version="1.0"?>
&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
&lt;html xmlns="http://www.w3.org/1999/xhtml">
&lt;body>
  &lt;p>Vnější
    &lt;p>Vnitřní&lt;/p>
  &lt;/p>
&lt;/body>
&lt;/html></code></pre>

<p>Prohlížeč by zobrazil <b>chybovou hlášku</b> místo stránky:</p>

<pre><code>XML Parsing Error: mismatched tag
Location: file:///path/to/file.xhtml
Line Number 6, Column 7:</code></pre>

<h3 id="xhtml-dom">XHTML a DOM metody</h3>

<p>Pokud byste v XHTML dokumentu použili <b>DOM metody</b> k vytvoření vnořených nezanořitelných elementů, situace by byla stejná jako v HTML:</p>

<pre><code>// V XHTML dokumentu
var outer = document.createElement('p');
var inner = document.createElement('p');
outer.appendChild(inner); // Funguje!</code></pre>

<p>DOM metody <b>neověřují validitu</b> podle XHTML pravidel, takže lze vytvořit nevalidní strukturu. Rozdíl je ale v tom, že při jakémkoliv pokusu o <b>serializaci</b> (např. výpis <code>innerHTML</code> nebo uložení DOM zpět do souboru) může dojít k chybě nebo neočekávanému chování.</p>

<h3 id="xhtml-dnes">XHTML dnes</h3>

<p>XHTML se dnes <b>prakticky nepoužívá</b>. HTML5 přinesl mnohem flexibilnější přístup a většina webů používá běžné HTML s <i>forgiving</i> parserem. XHTML má smysl pouze v specifických případech, jako je:</p>

<ul>
  <li>Zpracování dokumentů v <b>XML nástrojích</b></li>
  <li>Integrace HTML s <b>XML daty</b></li>
  <li>Situace, kde je nutná <b>striktní validace</b></li>
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

<p>Pro komplexnější <b>stylování tlačítek</b> můžete použít různé techniky:</p>

<pre><code>&lt;!-- Tlačítko s ikonou --&gt;
&lt;button class="btn-with-icon">
  &lt;svg class="icon">...&lt;/svg>
  &lt;span class="label">Klikni&lt;/span>
&lt;/button>

&lt;!-- Tlačítko s pseudo-elementy v CSS --&gt;
&lt;style>
  .fancy-button::before {
    content: "→ ";
    font-weight: bold;
  }
&lt;/style>
&lt;button class="fancy-button">Odeslat&lt;/button></code></pre>

<h2 id="zaver">Závěr</h2>

<p>HTML parser a DOM metody se chovají <b>odlišně</b> při práci s nezanořitelnými značkami:</p>

<ul>
  <li><b>HTML parser</b> (včetně <code>innerHTML</code>) automaticky opraví nevalidní struktury podle HTML specifikace</li>
  <li><b>DOM metody</b> (<code>createElement</code>, <code>appendChild</code>) umožňují vytvořit i nevalidní struktury, protože neprochází parserem</li>
  <li><b>XHTML parser</b> je striktní a odmítne zobrazit dokument s chybami, ale DOM metody fungují stejně jako v HTML</li>
  <li><b>Stylování</b> vnořených nezanořitelných elementů může vést k neočekávanému chování (dvojité marginy, problémy s eventy)</li>
  <li>Tento rozdíl může způsobit <b>problémy</b> při různých způsobech renderování (CSR vs SSR)</li>
  <li>Nejlepší je <b>dodržovat</b> HTML specifikaci a nevytvářet nevalidní struktury záměrně</li>
  <li>Pro stylování používejte <code>&lt;span></code>, <code>&lt;div></code> nebo CSS pseudo-elementy místo vnořování nezanořitelných značek</li>
</ul>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://html.spec.whatwg.org/">HTML Living Standard</a> – Oficiální HTML specifikace</li>
  <li><a href="https://validator.w3.org/">W3C Markup Validation Service</a> – Validátor HTML</li>
  <li><a href="/dom">DOM (Document Object Model)</a> – Jak funguje DOM</li>
  <li><a href="/innerhtml">innerHTML</a> – Práce s HTML obsahem v JS</li>
  <li><a href="/button">HTML tlačítko &lt;button></a> – Více o tlačítkách</li>
</ul>
