---
title: "CSS vyhledávání a filtrování"
headline: "CSS vyhledávání a filtrování obsahu"
description: "Jak pomocí CSS se špetkou JS filtrovat obsah stránky nebo na ní vyhledávat."
date: "2013-09-12"
last_modification: "2013-09-13"
status: 1
tags: ["css", "hotova-reseni", "js", "napady"]
format: "html"
---

<p>Kromě filtrování pomocí <a href="/css-filtrovani-dat"><code>radio</code> přepínačů</a> na to lze jít ještě jinak — dle potřeby vygenerovat JavaScriptem CSS kód, který pomocí tříd nebo <a href="/css-selektory">pokročilých selektorů</a> zvýrazní vyhovující obsah / skryje nevyhovující.</p>

<h2 id="js-css-styl">Připojení CSS pomocí JavaScriptu</h2>
<p>V novějších prohlížečích (novější než IE 7) stačí měnit <code>innerHTML</code> značky <code>&lt;style&gt;</code>.</p>

<pre><code>&lt;style id=js-styl&gt;&lt;/style&gt;
&lt;p id=cerveny class=cerveny&gt;Text, který JS přebarví na červenou.</code>
&lt;script&gt;
document.getElementById("js-styl").innerHTML = "p.cerveny {color: red}"
&lt;/script&gt;
</pre>

<h3>Ukázka</h3>
<div class="live">
  <style id=js-styl></style>
<p id=cerveny class=cerveny>Text, který JS přebarví na červenou.
<script>
document.getElementById("js-styl").innerHTML = "p.cerveny {color: red}"
</script>
</div>

<h3 id="ie-js-styl">Starší Internet Explorery</h3>
<p>Ve starších IE funguje tato šílenost:</p>
<pre><code>var css = "p.zeleny {color: green}";
var pomocnyDiv = document.createElement('div');
pomocnyDiv.innerHTML = '&lt;p>jen tak&lt;/p>&lt;style>' + css + '&lt;/style>';
document.getElementsByTagName('head')[0].appendChild(pomocnyDiv.childNodes[1]);</code></pre>

<h4>Ukázka</h4>
<div class="live">
  <p class="zeleny">Text, který JS přebarví na zelenou i ve starých prohlížečích.</p>
  <script>
var css = "p.zeleny {color: green}";
var pomocnyDiv = document.createElement('div');
pomocnyDiv.innerHTML = '<p>jen tak</p><style>' + css + '</style>';
document.getElementsByTagName('head')[0].appendChild(pomocnyDiv.childNodes[1]);
  </script>
</div>

<h2 id="filtrovani">Filtrování</h2>
<p>Nyní už stačí přidat jednotlivým položkám CSS třídy a těm požadovaným přidat skriptem CSS.</p>

<div class="live">
  <script>
function pridatCss(css) {
  var stylSkript = document.getElementById("styl-skript");
  if (stylSkript) {
    stylSkript.parentNode.removeChild(stylSkript);
  }
  
  var pomocnyDiv = document.createElement('div');
  pomocnyDiv.innerHTML = '<p>jen tak</p><style id="styl-skript">' + css + '</style>';
  document.getElementsByTagName('head')[0].appendChild(pomocnyDiv.childNodes[1]);
}

function filtruj(trida) {
  pridatCss(".polozky li {display: none} .polozky ." + trida + 
            " {display: list-item}");
}
  </script>
  <div class="polozky">
  <p>
    <button onclick="filtruj('html')">HTML</button>
    <button onclick="filtruj('css')">CSS</button>
    <button onclick="filtruj('odkazy')">Odkazy</button>
    <button onclick="filtruj('tabulky')">Tabulky</button>
    <button onclick="filtruj('seznamy')">Seznamy</button>
    <button onclick="filtruj('selektory')">Selektory</button>
  </p>
  <ul>
    <li class="html odkazy">a</li>
    <li class="css obrazky">background-image</li>
    <li class="css odkazy selektory">:link</li>
    <li class="css odkazy selektory">:visited</li>
    <li class="css selektory">:target</li>
    <li class="css selektory">:first-child</li>
    <li class="html tabulky">table</li>
    <li class="html tabulky">thead</li>
    <li class="html tabulky">tr</li>
    <li class="html seznamy">ul</li>
    <li class="html seznamy">dl</li>
  </ul>
</div>
</div>

<h2 id="vyhledavani">Vyhledávání</h2>
<p>Na tomtéž principu lze vytvořit i vyhledávání v obsahu na stránce.</p>
<p>Použijeme k tomu <a href="/css-selektory#atributovy-obsahujici">selektor obsahujícího řetězce</a>. Ten aplikuje dané pravidlo na cokoliv, co má v hlídaném atributu požadovaný text.</p>
<pre><code>p[class*="a"] {color: red}</code></pre>
<p>Obarví všechny odstavce, které mají v názvu třídy písmeno <code>a</code>.</p>
<div class="live a-test">
  <style>
  .a-test p[class*="a"] {color: red}
  </style>
  <p class="ahoj">
    Odstavec <code>p.<b>a</b>hoj</code>
  </p>
  <p class="Odstavec nazdar">
    Odstavec <code>p.n<b>a</b>zdar</code>
  </p>
  <p class="Odstavec cau">
    Odstavec <code>p.c<b>a</b>u</code>
  </p>
</div>
<p>Toho využijeme a do nějakého atributu si <b>připravíme klíčová slova</b>. Vhodné je bude oddělit nějakým málo používaným znakem, aby vyhledávání nechytalo i složeniny více slov.</p>
<p>Klíčová slova <b>může připravit server</b> nebo případně <b>JavaScript</b> — tolerantnějšího vyhledávání dosáhneme převedením klíčových slov i hledaného řetězce na malá písmena (pro ještě tolerantnější vyhledávání můžeme odstranit diakritiku).</p>

<div class="live">
<script>
function sjednotit(text) {
  return text.replace(/ /g, "-").toLowerCase();
}
  
function nastavitCss(css) {
  var stylSkript = document.getElementById("styl-skriptu");
  if (stylSkript) {
    stylSkript.parentNode.removeChild(stylSkript);
  }
  
  var pomocnyDiv = document.createElement('div');
  pomocnyDiv.innerHTML = '<p>jen tak</p><style id="styl-skriptu">' + css + '</style>';
  document.getElementsByTagName('head')[0].appendChild(pomocnyDiv.childNodes[1]);
}
 
function vyhledat(slovo) {
  var hidden = "max-height: 0; opacity: 0; =display: none";
  var visible = "max-height: 1.5em; opacity: 1; =display: block";
  
  if (slovo == "") {
    hidden = visible;
  }
  
  nastavitCss(".hledani ul li {" + hidden + "} .hledani ul li[data-slova*=\"" + 
            sjednotit(slovo) + "\"] {" + visible + "}");
}
</script>
<style>  
  .hledani ul {list-style: none}
  .hledani li {=display: block; overflow: hidden; max-height: 1.5em; opacity: 1; transition: 1s all}
</style>
<div class="hledani">
  <p>
    <label>Hledaný výraz: <input type="text" onkeyup="vyhledat(this.value)"></label>
  </p>
  <ul id="hledane">
    <li>Posicování v CSS	
    <li>Složení jednoduchého webu v PHP	
    <li>Zjištění skutečných rozměrů obrázku	
    <li>Box model	
    <li>Stejně vysoké sloupce	
    <li>Odkaz jako tlačítko	
    <li>Upload souborů bez refreshe	
    <li>Automatická datová optimalisace obrázků	
    <li>PHP proxy skript	
    <li>Fotografie na pozadí	
    <li>Centrování v CSS	
    <li>Zabránění rolování stránky	
    <li>Automatický lazy-loading YouTube videí	
    <li>Živý náhled CSS ze Sublime Text	
    <li>Kulatý obrázek	
    <li>Animace	
    <li>Flat UI	
    <li>Sublime Text 3 – pluginy a vylepšení	
    <li>Emmet	
    <li>Pro které prohlížeče optimalisovat	
    <li>Mobilní web	
    <li>Který prohlížeč je rychlejší?	
    <li>Přidání URL do Seznamu a Google	
    <li>Meta tag viewport	
    <li>Menu reagujicí na kliknutí	
    <li>Jak získat náhled webu?	
    <li>Testování webů v různých prohlížečích
  </ul>
  <p>Separátní <a href="https://kod.djpw.cz/eac">živá ukázka</a>.</p>
<script>
var zaznam = document.getElementById("hledane").getElementsByTagName("li");

for (var i = 0; i < zaznam.length; i++) {
  zaznam[i].setAttribute("data-slova", sjednotit(zaznam[i].innerHTML));
}  
</script>
</div>
</div>

<h3 id="index-php">Vytvoření <i>indexu</i> v PHP</h3>
<p>Převést <b>v PHP nadpisy na <i>klíčová slova</i></b> jde třeba takto:</p>
<pre><code>foreach ($nadpisy as $nadpis) {
  echo "&lt;li data-slova='" . 
        str_replace(" ", "-", strtolower($nadpis)) . 
       "'>$nadpis";
}
</code></pre>

<h3 id="index-js">Vytvoření <i>indexu</i> v JavaScriptu</h3>
<p>Při načtení stránky může slova pro vyhledávání do <code>data-atributu</code> připravit i přímo JS.</p>
<pre><code>var zaznam = document.getElementById("seznam-polozek").getElementsByTagName("li");
for (var i = 0; i &lt; zaznam.length; i++) {
  zaznam[i].setAttribute("data-slova", zaznam[i].innerHTML.replace(/ /g, "-").toLowerCase());
} </code></pre>

<h2 id="alternativni">Alternativní řešení</h2>
<p>Popsané řešení nelze použít a není vhodné vždy. V případě prohledávání velkého množství záznamů je <b>nesmyslné všechen obsah vypisovat na jedné stránce</b>. Lepší je <a href="/ajax">AJAXové</a> vyhledávání s pomocí serveru.</p>
<p>Vyfiltrovat výsledky umí i samotný JavaScript pomocí <code>indexOf</code>, bude to ale nejspíš pomalejší než CSS filtrování.</p>
<p>Uživatelský dojem by mohlo ještě zlepšit <b>zvýraznění nalezeného řetězce</b>.</p>

<h2 id="js">Filtrování v JavaScriptu</h2>
<p>Pro filtrování a řazení seznamů nebo tabulek existují i JS hotová řešení:</p>

<ul>
  <li><a href="http://listjs.com/">List.js</a></li>
  <li><a href="http://www.sitepoint.com/top-5-jquery-filter-sort-plugins/">My Top 5 jQuery Filter &amp; Sort Plugins</a></li>
  
  <li><a href="http://osvaldas.info/real-time-search-in-javascript">Real-Time Search in JavaScript</a></li>
</ul>