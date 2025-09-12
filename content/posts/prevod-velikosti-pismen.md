---
title: "Převod na VELKÁ a malá písmena"
headline: "Převod písmen na VELKÁ a malá"
description: "Převedení textu na velká nebo malá písmena."
date: "2015-11-07"
last_modification: "2025-09-12"
status: 1
tags: ["produktivita", "css", "hotova-reseni", "js", "php"]
format: "html"
---

<div class="live no-source">
  <textarea cols="50" rows="5" id="prevod" onfocus="this.select()">Text s VELKÝMI i malými písmeny</textarea>
  
  <p class="flex gap-2 flex-wrap">
    <button onclick="prevod.value = naVelka(prevod.value)">VELKÁ PÍSMENA</button>
    <button onclick="prevod.value = naMala(prevod.value)">malá písmena</button>
    </p>
    <p class="flex gap-2 flex-wrap">
    <button onclick="prevod.value = camelCase(prevod.value)">CamelCase</button>
    <button onclick="prevod.value = invertovat(prevod.value)">Invertovat</button>
    <button onclick="prevod.value = stridave(prevod.value)">sTřÍdAvĚ</button>
    <button onclick="prevod.value = nahodnaVelikost(prevod.value)">náhodně</button>
    <button onclick="prevod.value = sentenceCase(prevod.value)">Věty</button>
    <button onclick="prevod.value = startCase(prevod.value)">Každé Slovo Velké</button>
    <button onclick="prevod.value = titleCaseCZ(prevod.value)">Nadpis (CZ)</button>
    <button onclick="prevod.value = lowerCamelCase(prevod.value)">camelCase</button>
    <button onclick="prevod.value = pascalCase(prevod.value)">PascalCase</button>
    <button onclick="prevod.value = kebabCase(prevod.value)">kebab-case</button>
    <button onclick="prevod.value = snakeCase(prevod.value)">snake_case</button>
    <button onclick="prevod.value = slugify(prevod.value)">slugify</button>
    <button onclick="prevod.value = bezDiakritiky(prevod.value)">bez diakritiky</button></p>
    <p class="flex gap-2 flex-wrap">
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




<h3 id="js-locale">Lokalisované převody (<code>toLocale…</code>)</h3>

<p>Pro jazyky se speciálními pravidly použijte <code>toLocaleUpperCase</code> a <code>toLocaleLowerCase</code> s kódem jazyka:</p>

<pre><code>"I".toLocaleLowerCase("tr");
"i".toLocaleUpperCase("tr");</code></pre>

<p>Pro robustnější dělení na slova/věty můžete využít <code>Intl.Segmenter</code> (když potřebujete spolehlivější než jednoduché <code>split</code>).</p>

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

<pre><code>mb_strtoupper("žluťoučký kůň", "UTF-8");</code></pre>



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

<h3 id="php-intl">Transliterace a slug v PHP (<code>intl</code>)</h3>

<p>Pro převod na ASCII a tvorbu URL slugu lze použít rozšíření <code>intl</code>:</p>

<pre><code>$ascii = transliterator_transliterate('Any-Latin; Latin-ASCII', $text);
$slug = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $ascii), '-'));</code></pre>


<h2 id="css">CSS</h2>

<p>V CSS jde pro převod velikosti písma použít vlastnost <code>text-transform</code>:</p>

<ul>
  <li><p><code>text-transform: lowercase</code> – <span class="live no-live" style="text-transform: lowercase">PŘEVEDE TEXT NA MALÁ PÍSMENA</span></p></li>
  <li><p><code>text-transform: uppercase</code> – <span class="live no-live" style="text-transform: uppercase">převede text na velká písmena</span></p></li>
  <li><p><code>text-transform: capitalize</code> – <span class="live no-live" style="text-transform: capitalize">první písmeno každého slova velké</span> (má limity u zkratek a apostrofů)</p></li>
</ul>

<p>Pro „malé kapitálky“ lze použít <code>font-variant-caps: small-caps</code>:</p>
<p><span class="live no-live" style="font-variant-caps: small-caps">Malé kapitálky SMALL CAPS</span></p>

<p>Prohlížeče <b>Chrome</b> nebo <b>Firefox</b> fungují jinak než <a href="/safari"><b>Safari</b></a> – při kopírování ctí původní velikost písma v HTML kódu. Jde to vyzkoušet: předchozí ukázky jsou psány opačnou velikostí, než je nastavena v CSS.</p>

<p>Safari při kopírování dodržuje CSS nastavení.</p>


<p>Pomocí <a href="/first-letter"><code>:first-letter</code></a> jde automaticky docílit textu malými písmeny s velkým počátečním.</p>

<pre><code>.prvniVelke {
  text-transform: lowercase;
}
.prvniVelke:first-letter {
  text-transform: uppercase;
}</code></pre>

<h2 id="vscode-cursor">Převod velikosti ve VS Code a Cursoru</h2>

<p>Nejrychleji přes paletu příkazů:</p>

<ul>
  <li><kbd>Cmd + Shift + P</kbd> (macOS) / <kbd>Ctrl + Shift + P</kbd> (Windows/Linux)</li>
  <li>Vyhledejte: <code>Transform to Uppercase</code>, <code>Transform to Lowercase</code>, <code>Transform to Title Case</code></li>
  
  <li><b>Menu</b>: <b>Selection → Transform to Uppercase/Lowercase/Title Case</b></li>
</ul>

<p>V <b>Cursoru</b> platí stejné příkazy jako ve VS Code.</p>

<p><img src="/files/prevod-velikosti-pismen/konvertovani-velikosti-cursor.png" class="border" alt="" /></p>


<h2 id="intellij">Převod velikosti v JetBrains (WebStorm, PhpStorm…)</h2>

<ul>
  <li><b>Edit → Convert Case</b> → <code>Upper Case</code>, <code>Lower Case</code>, <code>Title Case</code>, <code>Toggle Case</code></li>
  <li>Zkratka: <kbd>⌘⇧U</kbd> (macOS) / <kbd>Ctrl + Shift + U</kbd> (Windows/Linux) pro přepínání velikosti</li>
  <li><b>Find Action</b>: <kbd>⌘⇧A</kbd> / <kbd>Ctrl + Shift + A</kbd> a napište „Convert Case“</li>
</ul>

<h2 id="st">Převod velikosti v Sublime Text</h2>

<p>V <a href="/st">Sublime Text</a> editoru je pro převod na malá/velká písmena přímo <a href="/sublime-text-zkratky#velka-mala">klávesová zkratka</a>:</p>

<ul>
  <li><kbd>Ctrl + K, U</kbd> – velká písmena</li>
  <li><kbd>Ctrl + K, L</kbd> – malá písmena</li>
</ul>


<h2 id="krik">KŘIK</h2>

<p>V internetových diskusích je občas k vidění, že někdo záměrně píše vše velkými písmeny se zapnutým <kbd>CapsLock</kbd>em.</p>

<p>UKŘIČENÝ text není možné dost dobře převést do normální podoby, protože část informací je nenávratně ztracena. Automatisovaně jde alespoň převést vše na malá písmena a ponechat velká jen písmena na začátku věty.</p>

<p>Nicméně skvěle se na podobné situace hodí <a href="/ai-programovani">AI</a>, které dokáže navrátit i takto znehodnocený text.</p>


<h2 id="seo">Velká písmena ve vyhledávání</h2>

<p><a href="/seznam">Vyhledávač Seznam</a> automaticky převádí některé titulky s velkými písmeny:</p>

<div class="internal-content">
<ul>
  <li><a href="/seznam-velka-pismena">Proč Seznam převádí zkratky na malá písmena</a></li>
</ul>  
</div>

<h2 id="titlecase-en">Nadpisy s velkými písmeny v angličtině</h2>

<p>V angličtině se často v nadpisech kapitalisují všechna slova kromě krátkých „malých“ slov uprostřed (říká se tomu <i>Title Case</i>).</p>

<p><b>Výjimky:</b> a, an, the, and, but, or, for, nor, on, at, to, by, in, of.</p>

<p>Případně se píše pouze první písmeno velké podobně jako v češtině (říká se tomu <i>sentence case</i>).</p>

<p>Zde se nedá říct, co je špatně nebo správně. Apple a Google svět se od sebe liší.</p>

<p><b>Android (Material Design):</b> v UI používejte sentence case (velké první slovo a vlastní jména). Tlačítka, štítky i nadpisy by měly být sentence case; celá VELKÁ písmena se v textu nepoužívají.</p>

<p><b>Příklad</b>: <i>Settings, Allow notifications, Add to cart</i></p>
<div class="external-content">
<ul>
<li><a href="https://m3.material.io/foundations/content-design/style-guide/ux-writing-best-practices#fc5c2a78-f4bf-4d42-bdac-42ff80391129">Material Design – UX writing best practices</a></li>
</ul>
</div>
<p><b>iOS (Apple HIG):</b> v UI převážně sentence case; pro názvy obrazovek a navigační tituly se běžně používá title case.</p>

<p><b>Příklad</b>: <i>New Message, Allow notifications</i></p>

<div class="external-content">
<ul>
<li><a href="https://developer.apple.com/design/human-interface-guidelines/writing">Apple Human Interface Guidelines – Writing</a></li></ul>
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
  
  function nahodnaVelikost(text) {
    var vysledek = "";
    for (var i = 0; i < text.length; i++) {
      var pismeno = text.substr(i, 1);
      vysledek += Math.random() < 0.5 ? naMala(pismeno) : naVelka(pismeno);
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
  
  function normalizeSpaces(text) {
    return text.trim().replace(/\s+/g, " ");
  }
  
  function startCase(text) {
    var slova = normalizeSpaces(text).split(" ");
    for (var i = 0; i < slova.length; i++) {
      slova[i] = prvniVelke(slova[i]);
    }
    return slova.join(" ");
  }
  
  function titleCaseCZ(text) {
    var mala = ["a","i","u","v","s","z","k","o","na","do","od","po","pod","nad","u","za","pro","bez","při","před","přes","mezi","ve","se","ze"];
    var slova = normalizeSpaces(text).toLowerCase().split(" ");
    for (var i = 0; i < slova.length; i++) {
      if (i === 0 || i === slova.length - 1 || mala.indexOf(slova[i]) === -1) {
        slova[i] = prvniVelke(slova[i]);
      }
    }
    return slova.join(" ");
  }
  
  function sentenceCase(text) {
    var lower = text.toLowerCase();
    var vysledek = "";
    var velke = true;
    for (var i = 0; i < lower.length; i++) {
      var ch = lower.charAt(i);
      if (velke && /[a-zá-ž]/i.test(ch)) {
        vysledek += ch.toUpperCase();
        velke = false;
      } else {
        vysledek += ch;
      }
      if (/[.!?]/.test(ch) || /\n/.test(ch)) {
        velke = true;
      }
    }
    return vysledek;
  }
  
  function lowerCamelCase(text) {
    var slova = normalizeSpaces(text).toLowerCase().split(" ");
    if (!slova[0]) return "";
    var vysledek = slova[0];
    for (var i = 1; i < slova.length; i++) {
      vysledek += prvniVelke(slova[i]);
    }
    return vysledek.replace(/[^a-zA-Z0-9]/g, "");
  }
  
  function pascalCase(text) {
    return camelCase(normalizeSpaces(text));
  }
  
  function bezDiakritiky(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  function kebabCase(text) {
    return bezDiakritiky(text).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  
  function snakeCase(text) {
    return bezDiakritiky(text).toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  }
  
  function slugify(text) {
    return kebabCase(text);
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