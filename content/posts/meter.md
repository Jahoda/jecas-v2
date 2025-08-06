---
title: "HTML meter"
headline: "HTML značka <code>&lt;meter></code>"
description: "Značka <code>&lt;meter></code> slouží k indikaci čísla."
date: "2013-11-27"
last_modification: "2013-12-04"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Element <code>&lt;meter></code> je hodně podobný <a href="/progress">značce <code>&lt;progress></code></a> (ale nefunguje ani v <b><a href="/ie11">IE 11</a></b>). Jednoduše řečeno <b>znázorňuje číslo</b> sloupcovým grafem.</p>

<p>Zatímco <code>&lt;progress></code> je spíš určen k presentování postupu typu <i>Krok 1 ze 3</i>, <code>&lt;meter></code> může typicky znázorňovat:</p>

<ul>
  <li>stav <b>zaplnění místa na disku</b>,</li>
  <li><b>teplotu</b> (i když u té je trochu obtížné určit minimální a maximální hodnotu),</li>
  <li><b>popularitu</b> článku/videa/čehokoliv,</li>
  <li><b>relevanci</b> výsledku (hledání),</li>
  <li><b>kondici</b> torrentu a další.</li>
</ul>

<h2 id="atributy">Možné atributy</h2>
<p>Kromě standardních atributů jako <a href="/input#value"><code>value</code></a>, <a href="/input#name"><code>name</code></a> a <a href="/input#form"><code>form</code></a> (pro začlenění do formuláře) a dalších, existují tyto specifické.</p>

<dl>
  <dt id="min"><code>min</code></dt>
  <dd>Minimální hodnota (výchozí je <code>0</code>).</dd>
  
  <dt id="max"><code>max</code></dt>
  <dd>Maximální hodnota.</dd>

  <dt id="low"><code>low</code></dt>
  <dd>Jaká hodnota je považována za nízkou.</dd>  
  
  <dt id="high"><code>high</code></dt>
  <dd>Jaká hodnota je považována za <b>vysokou</b> (pozor na překlep <code>high<b>t</b></code>).</dd>  

  <dt id="optimum"><code>optimum</code></dt>
  <dd>Optimální hodnota.</dd>    
</dl>

<p>Hlavní <b>smysl</b> značky <code>&lt;meter></code> je asi v tom, že podle nastavení výše uvedených atributů se postará o <b>styl</b>, který výsledný element bude mít.</p>

<p>Pomyslnou osu hodnot od <code>min</code> do <code>max</code> je možné atributy <code>low</code> a <code>high</code> rozdělit na <b>3 části</b> a atributem <code>optimum</code> zvolit <b>optimální část</b>.</p>

<script>
  function prenastavit(el) {
    el.parentNode.getElementsByTagName("meter")[0].value = el.value;
    el.parentNode.getElementsByTagName("b")[0].innerHTML = el.value;
  }
</script>
<div class="live" id="ukazka">
  <p>Místo na disku: <meter min=0 max=640 optimum=0 low=400 high=550 value=100></meter> Z 640 GB zaplňeno <b>100</b> GB<br>
  <input type="range" min=0 max=640 value=100 onchange="prenastavit(this)"></p>
  
  <p>Relevance: <meter min=0 max=100 optimum=100 low=30 high=70 value=95></meter> <b>95</b> %<br>
  <input type="range" min=0 max=100 value=95 onchange="prenastavit(this)"></p> 
  
  <p>Teplota: <meter min=-50 max=50 optimum=20 low=10 high=30 value=17></meter> <b>17</b> °C<br>
  <input type="range" min=-50 max=50 value=17 onchange="prenastavit(this)"></p>   
  
  <p>(Možnost měnit hodnotu zajišťuje <a href="http://jecas.cz/input#type-range"><code>&lt;input type=range></code></a>.)</p>
</div>

<h2 id="stylovani">Stylování</h2>
<p>Hodilo by se, kdyby šlo funkcí <a href="/content-attr"><code>content</code></a> přečíst nastavenou hodnotu. Zatím to nejde.</p>

<p>Pro stylování obalu i sloupců existuje napříč prohlížeči odlišné <a href="/css-prefixy">oprefixované</a> vlastnosti.</p>

<h2 id="starsi-prohlizece">Starší prohlížeče</h2>
<p>Ve starších prohlížečích je teoreticky možné umístit náhradu uvnitř značky <code>&lt;meter></code> nebo v nich <a href="https://gist.github.com/strings28/667320">JavaScriptem vygenerovat</a> atrapu. Otázka je, zda použití <code>&lt;meter></code>u oproti <a href="http://jecas.cz/progress#podpora">pár <code>&lt;div></code>ům</a> natolik <b>usnadní práci</b>, aby stálo za to u všech uživatelů Internet Exploreru <b>spoléhat na JavaScript</b>.</p>