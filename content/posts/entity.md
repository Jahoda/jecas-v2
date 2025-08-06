---
title: "Entity"
headline: "HTML entity"
description: "Entity v HTML jsou zvláštní druh posloupnosti znaků sloužící k zápisu různých symbolů."
date: "2015-01-15"
last_modification: "2015-02-06"
status: 1
tags: ["html"]
format: "html"
---

<p>Znakové entity v HTML vznikly nejspíš z toho důvodu, že by bez nich bylo <b>komplikované zapsat znak „menší než“</b> — „<code>&lt;</code>“, který v HTML slouží k otevření značky, aniž by se tak interpretoval. Jedná se tedy o způsob tzv. <i>escapování</i>.</p>

<p>Typicky entita začíná znakem <code>&amp;</code> (na <a href="/ceska-klavesnice">české klávesnici</a> pravý <kbd>Alt</kbd> + <kbd>C</kbd>), potom následuje její název a končí středníkem – <code>;</code>.</p>


<h2 id="lt">Menší než <code>&lt;</code> – <code>&amp;lt;</code></h2>

<p>Začátek značky je sice tvořen sekvencí <code>&lt;</code> a alespoň jednoho znaku A–z (na velikosti nezáleží, bez diakritiky, čísel a podobně), takže napsat například <span class="live">a < b</span> by nebyl problém.</p>

<p>V případě „a&lt;b“ bez mezer by se už ale <b>nechtěně vytvořil</b> tučný text – sekvence „&lt;b“ by započala značku <code>&lt;b></code>.</p>

<p>Kromě toho by bez entit bylo komplikované do textu <a href="/vypis-kodu">vypisovat zdrojový HTML kód</a>.</p>

<p>Znak „<b>menší než</b>“ tedy na stránkách nevypisujících HTML kód a nepoužívajících výrazy typu „a&lt;b“ (bez mezer) není potřeba zapisovat pomocí entity. Většinou se tak ale pro pocit bezpečí dělá – entita je to <code>&amp;lt;</code> (z anglického <i>less than</i>).</p>






<h2 id="gt">Větší než <code>&gt;</code> – <code>&amp;gt;</code></h2>

<p>I symbol pro konec HTML značky je možné zapsat entitou. Nenapadá mě ale moc situací, kde by mohlo nezaentitování „<code>></code>“ vadit.</p>

<p>Ani v hodnotě HTML atributu není s <code>></code> problém, když se <b>použijí <a href="/uvozovky#html">uvozovky</a></b>.</p>

<pre><code>&lt;p title="a>b">
  Odstavec s popiskem „a>b“.
&lt;/p></code></pre>






<h2 id="amp">Ampersand <code>&amp;</code> – <code>&amp;amp;</code></h2>

<p>Protože entity začínají ampersandem, stal se <code>&amp;</code> do jisté míry <b>řídicím znakem</b>. Bylo tak najednou nutné vytvořit escape sekvenci i pro ampersand.</p>

<p>Podobně jako <code>&lt;</code>, ani ampersand není <b>většinou nutné</b> zapisovat pomocí entity.</p>

<p>Opět se to ale většinou pro jistotu dělá. Mohlo by se totiž stát že by přímo za <code>&amp;</code> byl obsah, který by tak dohromady dal <b>název existující entity</b>. Pokus o zápis „<code>Vt&amp;gt</code>“ by skončil následovně:</p>

<div class="live">
  <p>Vt&gt</p>
</div>






<h3 id="odkazy">Ampersand v odkazech</h3>

<p>Trochu reálnější risiko existuje v adresách u odkazů. Bude-li mít stránka URL:</p>

<pre><code>example.com/?a=1&amp;times</code></pre>

<p>A někdo tuto URL zkopíruje do <b>cíle odkazu</b>. Bez převedení <code>&amp;</code> na entitu se <code>&amp;times</code> zobrazí jako křížek <code>&times;</code> (který se zapisuje entitou <code>&amp;times;</code>) a odkaz nejspíš nebude fungovat.</p>

<p>Předejít tomuto problému může i autor webové aplikace vhodným návrhem parametrů v URL, aby s entitami <b>nekolidovaly</b>.</p>






<h2 id="quote">Uvozovky – <code>&amp;quot;</code>/<code>&amp;apos;</code></h2>

<p>Pro dvojité (<code>"</code>) a jednoduché (<code>'</code>) <i>uvozovky</i> existují taktéž speciální entity – hodí se k zápisu uvozovek do <b>hodnoty atributů</b>, které bývají v uvozovkách.</p>

<p>Pokud má v atributu <code>title</code> být obsah <code>Text v "uvozovkách"</code>, je nutné <code>"</code> převést na entity (nebo pro obalení hodnoty atributu použít uvozovky jednoduché).</p>

<pre><code>&lt;p title="Text v &amp;quot;uvozovkách&amp;quot;"></code></pre>




<p>Jelikož u českých textů bývá zvykem používat „české uvozovky“ (<code>&amp;bdquo;</code> a <code>&amp;ldquo;</code>), hodí se <code>&amp;quot;</code>/<code>&amp;apos;</code> spíš při psaní JavaScriptu do <code>on*</code> atributů (což obecně nebývá moc dobrý nápad) nebo jako <b>automatická ochrana</b> před <a href="/bezpecnost#xss">XSS</a>.</p>



<h2 id="streadnik">Středník na konci</h2>

<p>Entity jsou obvykle k vidění se <b>středníkem na konci</b>. Ani tento středník ale není tak úplně povinný. Některé entity se zobrazí i bez středníku. Dokonce za entitou bez středníku může i normálně pokračovat <span class="live">&regslovo&plusmn</span> (výsledek zápisu <code>&amp;regslovo&amp;plusmn</code>).</p>

<p>Vzhledem k editorům barvícím zdrojový kód a obecně přehlednosti to nevypadá jako vhodný postup.</p>




<h2 id="velikost-textu">Velikost textu entit</h2>

<p>Identifikátory entit jsou většinou <b>závislé na velikosti písma</b>. Některé entity je možné zapsat malými i VELKÝMI písmeny.</p>

<div class="live">
  <p>VELKÁ: &TRADE;, &REG;, &QUOT;</p>
  <p>malá: &trade;, &reg;, &quot;</p>
</div>






<p>U entit pro písmena řecké abecedy se na základě velikosti prvního písmena rozlišuje mezi malou a velkou variantou téhož znaku.</p>


<h2 id="symboly">Zápis symbolů</h2>

<p>Kromě escapovacího významu se entity hodí i k zápisu zvláštních symbolů <b>bez ohledu na kódování</b>. To v dnešní době, kdy jde dobře používat UTF-8 ale není významná výhoda – různé podivné znaky jde rovnou vkládat do HTML kódu.</p>

<p>Jelikož ale může být problematické exotičtější znak umět na klávesnici zapsat, znalost <b>znakových entit</b> se hodí pro urychlení zápisu.</p>

<div class="external-content">
  <ul>
    <li><a href="http://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML">Seznam znakových entit</a></li>
  </ul>
</div>


<h2 id="ciselne">Číselné entity</h2>

<p>Kromě entit, které jsou slovně pojmenované, existují ještě tzv. <b>číselné entity</b>. Existují dvojího typu:</p>

<ol>
  <li>Desítkové – <code>&amp;#</code> – číslo – <code>;</code></li>
  <li>Šestnáctkové – <code>&amp;x</code> – kód – <code>;</code></li>  
</ol>

<p>Těmito entitami jdou zapsat úplně všechny znaky.</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.7is7.com/software/chars.html">HTML Character Codes</a> – seznam všech číselných entit.</li>
  </ul>
</div>

<p>Číselné entity jde občas použít k obejití různých ochran ve webových aplikacích. Pokud bude například nějaký web v komentářích blokovat řetězec <code>jecas.cz</code>, může k obejití stačit nahradit nějaký znak řetězce entitou.</p>

<pre><code>jec&amp;#97;s.cz</code></pre>

<p>Taktéž se tímto způsobem často podaří obejít minimální limit délky formulářového pole.</p>

<p>Entitou <code>&amp;#8203;</code> se zapisuje tzv. <b>nulová mezera</b> (mezeru s nulovou šířkou). Skutečná délka je potom mnohem vyšší, než vypadá.</p>

<div class="live">
  <input type="text" value="1&#8203;&#8203;&#8203;&#8203;">
  <button onclick="alert('Počet znaků: ' + this.previousSibling.previousSibling.value.length)">Délka</button>
</div>





<h2 id="diakritika">Diakritika</h2>

<p>Některé <a href="/wysiwyg">WYSIWYG</a> editory mají tendenci znaky s <b>českou diakritikou</b> převádět na entity. Při správně nastaveném kódování to není nutné.</p>

<table>
	<tr>
		<td><code>&amp;ecaron;</code></td>
		<td>ě</td>
	</tr>
	<tr>
		<td><code>&amp;scaron;</code></td>
		<td>š</td>
	</tr>
	<tr>
		<td><code>&amp;ccaron;</code></td>
		<td>č</td>
	</tr>
	<tr>
		<td><code>&amp;rcaron;</code></td>
		<td>ř</td>
	</tr>
	<tr>
		<td><code>&amp;zcaron;</code></td>
		<td>ž</td>
	</tr>
	<tr>
		<td><code>&amp;dcaron;</code></td>
		<td>ď</td>
	</tr>
	<tr>
		<td><code>&amp;tcaron;</code></td>
		<td>ť</td>
	</tr>
	<tr>
		<td><code>&amp;ncaron;</code></td>
		<td>ň</td>
	</tr>
	<tr>
		<td><code>&amp;uacute;</code></td>
		<td>ú</td>
	</tr>
	<tr>
		<td><code>&amp;oacute;</code></td>
		<td>ó</td>
	</tr>
</table>

<p>Používání entit pro diakritiku vytváří nepřehledný zdrojový kód. Převést ho na běžné znaky jde automaticky:</p>

<div class="internal-content">
  <ul>
    <li><a href="/vycisteni-kodu">Pročištění a opravení HTML</a></li>
  </ul>
</div>


<h2 id="php">Převod entit v PHP</h2>

<p>V jazyce PHP existují pro práci s entitami tři funkce:</p>

<ul>
  <li><a href="http://php.net/manual/en/function.htmlentities.php"><code>htmlentities</code></a> – převede na znakové entity všechny znaky, které převést jde</li>
  
  <li><a href="http://php.net/manual/en/function.html-entity-decode.php"><code>html_entity_decode</code></a> – převede entity na běžné znaky</li>
  
  <li><a href="http://php.net/manual/en/function.htmlspecialchars.php"><code>htmlspecialchars</code></a> – převede řídicí znaky HTML (<code>&lt;</code>, <code>&amp;</code>, <code>&gt;</code>), s parametrem <code>html_entity_decode</code> i uvozovky (<code>"</code>, <code>'</code>)</li>
</ul>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/html/entity-vsechny.html">Použitelné znakové entity</a></li>
</ul>