---
title: "Převod na VELKÁ a malá písmena"
headline: "Převod písmen na VELKÁ a malá"
description: "Převedení textu na velká nebo malá písmena."
date: "2015-11-07"
last_modification: "2015-11-07"
status: 1
tags: ["css", "hotova-reseni", "js", "php"]
format: "html"
---

<div class="live no-source">
  <textarea cols="50" rows="5" id="prevod" onfocus="this.select()">Text s VELKÝMI i malými písmeny</textarea>
  
  <p>
    <button onclick="prevod.value = naVelka(prevod.value)">VELKÁ PÍSMENA</button>
    <button onclick="prevod.value = naMala(prevod.value)">malá písmena</button>
    <button onclick="prevod.value = camelCase(prevod.value)">CamelCase</button>
    <button onclick="prevod.value = invertovat(prevod.value)">Invertovat</button>
    <button onclick="prevod.value = stridave(prevod.value)">sTřÍdAvĚ</button>
    <button onclick="puvodni()">× Původní</button>
  </p>
</div>


<h2 id="js">JavaScript</h2>

<p>V JavaScriptu existují pro změnu velikosti dvě základní metody:</p>

<ul>
  <li><code>text.toUpperCase()</code> – převede proměnnou <code>text</code> na velká písmena</li>
  <li><code>text.toLowerCase()</code> – převede proměnnou <code>text</code> na malá písmena</li>
</ul>


<p>Pro převod částí slov, jako pouze prvního písmena a podobně, je možné použít rozdělení řetězce pomocí <code>substr</code> a první znak vybrat pomocí <code>charAt(0)</code>:</p>



<pre><code>function prvniVelke(text) {
  return text.charAt(0).toUpperCase() + text.substr(1);
}</code></pre>



<p>Pro průchod všemi slovy stačí rozdělit řetězec podle mezery (<code>text.split(" ")</code>) a jednotlivá slova projít <a href="/js-cykly">cyklem</a>.</p>




<h2 id="php">PHP</h2>

<p>V PHP existují pro zvětšování a zmenšování následující funkce:</p>

<ul>
  <li><code>strtoupper($text)</code> – převede <code>$text</code> na velká písmena</li>
  <li><code>strtolower($text)</code> – převede <code>$text</code> na malá písmena</li>
  <li><code>ucfirst($text)</code> – převede první písmeno <code>$text</code>u na velké</li>
  <li><code>ucwords($text)</code> – převede každé první písmeno slova v <code>$text</code>u na velké</li>
</ul>

<p>Převedení prvního písmena na velké v každém slově se v angličtině používá pro <b>psaní nadpisů</b>.</p>

<p>Ještě existují <code>mb_*</code> varianty. Pro znaky s <b>českou diakritikou</b> jsou ale všechny tyto funkce nepoužitelné:</p>


<div class="live no-source">
<meta charset=utf-8>

<dl>
	<dt>
		<code>strtoupper($text)</code>
	</dt>
	<dd>
		<p>žluťoučký kůň => žLUťOUčKý Kůň</p>
	</dd>
	<dt>
		<code>strtolower($text)</code>
	</dt>
	<dd>
		<p>ŽLUŤOUČKÝ KŮŇ => ŽluŤouČkÝ kŮŇ</p>
	</dd>
	<dt>
		<code>ucfirst($text)</code>
	</dt>
	<dd>
		<p>žluťoučký kůň => žluťoučký kůň</p>
	</dd>
	<dt>
		<code>ucwords($text)</code>
	</dt>
	<dd>
		<p>žluťoučký kůň => žluťoučký Kůň</p>
	</dd>
	<dt>
		<code>mb_strtoupper($text)</code>
	</dt>
	<dd>
		<p>žluťoučký kůň => žLUťOUčKý Kůň</p>
	</dd>
	<dt>
		<code>mb_strtolower($text)</code>
	</dt>
	<dd>
		<p>ŽLUŤOUČKÝ KŮŇ => �lu�ou�k� k��</p>
	</dd>					
</dl>  
</div>

<p>Rozchodit <code>mb_*</code> funkce se může podařit uvedením kódování:</p>

<pre><code>mb_internal_encoding("UTF-8");</code></pre>

<p>Případně to může rovnou fungovat v novějším PHP.</p>

<p>Kódování <code>UTF-8</code> jde případně předat jako druhý parametr:</p>

<pre><code><pre><code>mb_strtoupper("žluťoučký kůň", "UTF-8");</code></pre></code></pre>



<h3 id="mb_convert_case"><code>mb_convert_case</code></h3>

<p>Dosáhnout správného převodu českých znaků jde i funkcí <code>mb_convert_case</code>, které se navíc zadává typ převodu:</p>

<ul>
  <li><code>MB_CASE_UPPER</code> – na velká písmena</li>
  <li><code>MB_CASE_LOWER</code> – na malá písmena</li>
  <li><code>MB_CASE_TITLE</code> – začátek slova velký</li>
</ul>


<p>Rovněž se jí předá kódování (typicky <code>UTF-8</code>):</p>

<pre><code>mb_convert_case("žluťoučký kůň", MB_CASE_UPPER, "UTF-8");</code></pre>

<div class="live no-source">
<dl>
	<dt>
		<code>mb_convert_case($text, MB_CASE_UPPER, "UTF-8")</code>
	</dt>
	<dd>
		<p>žluťoučký kůň => ŽLUŤOUČKÝ KŮŇ</p>
	</dd>	
	<dt>
		<code>mb_convert_case($text, MB_CASE_LOWER, "UTF-8")</code>
	</dt>
	<dd>
		<p>ŽLUŤOUČKÝ KŮŇ => žluťoučký kůň</p>
	</dd>	
	<dt>
		<code>mb_convert_case($text, MB_CASE_TITLE, "UTF-8")</code>
	</dt>
	<dd>
		<p>ŽLUŤOUČKÝ KŮŇ => Žluťoučký Kůň</p>
		<p>žluťoučký kůň => Žluťoučký Kůň</p>
	</dd>  
</dl>
</div>

<p>Pro vyzkoušení:</p>

<div class="external-content">
  <ul>
    <li><a href="https://gist.github.com/Jahoda/114b1c65967807681b2d">Testovací skript</a></li>
  </ul>
</div>


<h2 id="css">CSS</h2>

<p>V CSS jde pro převod velikosti písma použít vlastnost <code>text-transform</code>:</p>

<ul>
  <li><p><code>text-transform: lowercase</code> – <span class="live" style="text-transform: lowercase">PŘEVEDE TEXT NA MALÁ PÍSMENA</span></p></li>
  <li><p><code>text-transform: uppercase</code> – <span class="live" style="text-transform: uppercase">převede text na velká písmena</span></p></li>
</ul>

<p>Prohlížeče <b>Chrome</b> a nová <b>Opera</b> fungují jinak než <a href="/microsoft-edge"><b>Edge</b></a> nebo <b>Firefox</b> – při kopírování nectí původní velikost písma v HTML kódu. Jde to vyzkoušet: předchozí ukázky jsou psány opačnou velikostí, než je nastavena v CSS.</p>


<p>Pomocí <a href="/first-letter"><code>:first-letter</code></a> jde automaticky docílit textu malými písmeny s velkým počátečním.</p>

<pre><code>.prvniVelke {
  text-transform: lowercase;
}
.prvniVelke:first-letter {
  text-transform: uppercase;
}</code></pre>


<h2 id="st">Převod velikosti v Sublime Text</h2>

<p>V <a href="/st">Sublime Text</a> editoru je pro převod na malá/velká písmena přímo <a href="/sublime-text-zkratky#velka-mala">klávesová zkratka</a>:</p>

<ul>
  <li><kbd>Ctrl + K, U</kbd> – velká písmena</li>
  <li><kbd>Ctrl + K, L</kbd> – malá písmena</li>
</ul>


<h2 id="krik">KŘIK</h2>

<p>V internetových diskusích je občas k vidění, že někdo záměrně píše vše velkými písmeny se zapnutým <kbd>CapsLock</kbd>em.</p>

<p>UKŘIČENÝ text není možné dost dobře převést do normální podoby, protože část informací je nenávratně ztracena. Automatisovaně jde alespoň převést vše na malá písmena a ponechat velká jen písmena na začátku věty.</p>


<h2 id="seo">Velká písmena ve vyhledávání</h2>

<p><a href="/seznam">Vyhledávač Seznam</a> automaticky převádí některé titulky s velkými písmeny:</p>

<div class="internal-content">
<ul>
  <li><a href="/seznam-velka-pismena">Proč Seznam převádí zkratky na malá písmena</a></li>
</ul>  
</div>


<script>
  function naVelka(text) {
    return text.toUpperCase();
  }
  function naMala(text) {
    return text.toLowerCase();
  }  
  
  function prvniVelke(text) {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  }
  
  function camelCase(text) {    
    var slova = text.split(" ");
    var vysledek = "";
    for (var i = 0; i < slova.length; i++) {
        vysledek += prvniVelke(slova[i]);
    }
    return vysledek;
  }  
  
  function stridave(text) {
    var vysledek = "";
    for (var i = 0; i < text.length; i++) {
      var pismeno = text.substr(i, 1);
      vysledek += (i % 2) ? naMala(pismeno) : naVelka(pismeno);
    }
    return vysledek;
  }
  
  function invertovat(text) {
    var vysledek = "";
    for (var i = 0; i < text.length; i++) {
        var pismeno = text.substr(i, 1);
        vysledek += (pismeno == pismeno.toUpperCase()) ? naMala(pismeno) : naVelka(pismeno);
    }
    return vysledek;
  }    
  
  var original = prevod.value;
  function puvodni() {
    prevod.value = original;
  }
  prevod.onpaste = prevod.onblur = function() {
    setTimeout(function() {
      original = prevod.value;
    });
  }
</script>