---
title: "BB code"
headline: "BB kód v PHP"
description: "Formátování příspěvků pomocí BB code v PHP. Převod BB kódu do HTML."
date: "2014-03-11"
last_modification: "2014-03-20"
status: 1
tags: ["hotova-reseni", "php"]
format: "html"
---

<p>V případě, že chceme umožnit návštěvníkům stránky používat základní <b>formátování textu</b>, existuje několik základních způsobů, jak to zařídit.</p>

<ol>
  <li><a href="/wysiwyg">WYSIWYG editor</a>,</li>
  <li>HTML značky,</li>
  <li><a href="/markdown">Markdown/Texy!</a>,</li>
  <li><b>BB code</b></li>
</ol>

<p>Každá z možností má své pro a proti.</p>

<h2 id="co">Co to je BB code?</h2>

<p>Stručně řečeno má BB kód zjednodušenou podobu HTML kódu, kdy se místo špičatých <code>&lt;></code> závorek zapisují hranaté <code>[]</code> (tyto znaky lze relativně pohodlně zapsat i na <a href="/ceska-klavesnice">české klávesnici</a>).</p>

<p>Zkratka <b>BB</b> znamená <i>Bulletin Board</i>, protože se tento způsob formátování nejvíce rozšířil na <b>diskusních fórech</b>.</p>

<h3 id="zakladni-znaky">Základní znaky</h3>

<p>Typické BB značky:</p>

<table>
  <tr>
    <th>BB kód</th>
    <th>HTML ekvivalent</th>
    <th>Výsledek</th>
  </tr>
  <tr>
    <td><code>[b]text[/b]</code></td>
    <td><code>&lt;b>text&lt;/b></code></td>
    <td><b>text</b></td>
  </tr>
  <tr>
    <td><code>[i]text[/i]</code></td>
    <td><code>&lt;i>text&lt;/i></code></td>
    <td><i>text</i></td>
  </tr>
  <tr>
    <td><code>[code]code[/code]</code></td>
    <td><code>&lt;code>text&lt;/code></code></td>
    <td><code>text</code></td>
  </tr>
  <tr>
    <td><code>[url=http://example.com]text[/url]</code></td>
    <td><code>&lt;a href='http://example.com'>text&lt;/a></code></td>
    <td><a href='http://example.com'>text</a></td>
  </tr>
  <tr>
    <td><code>[img]http://example.com/obrazek.png[/img]</code></td>
    <td><code>&lt;img src='http://example.com/obrazek.png'>text&lt;/a></code></td>
    <td>(obrázek)</td>
  </tr>  
</table>

<p>Asi hlavní výhoda oproti obyčejnému HTML spočívá v tom, že:</p>

<ul>
  <li>Není problém zapsat ukázku HTML kódu. HTML se neinterpretuje a zároveň nezahodí, ale převede na entity.</li>
  <li>V PHP není jednoduchý způsob, jak povolit jen určité HTML značky a atributy. Značky zvládne sice odstranit funkce <code>strip_tags</code>, ale na povolení atributů je potřeba nějaký nástroj jako <a href="/vycisteni-kodu">HTML Purifier</a>.</li>
</ul>

<h2 id="prevod">Převod BB značek na HTML</h2>

<h3 id="jednoduche">Jednoduché značky <code>[b]</code>, <code>[i]</code>, <code>[code]</code></h3>

<p>Nejjednodušší způsob jako převádět <code>[b]text[/b]</code> na <code>>&lt;b>text&lt;/b></code> a podobně je použití regulárních výrazů a funkce <code>preg_replace</code>.</p>

<pre><code>$text = preg_replace(
  "~\[(b)\](.+?)\[/\\1\]~ui", 
  "&lt;\\1>\\2&lt;/\\1>", 
  $text
);</code></pre>

<p>Formátování všech jednoduchých značek (<code>[b]</code>, <code>[i]</code>, <code>[code]</code>) může zajistit jednoduchá funkce, které se předají požadované značky.</p>

<pre><code>function obycejnyBbKod($znacky, $text) {
  foreach ($znacky as $znacka) {
    $text = preg_replace(
      "~\[($znacka)\](.+?)\[/\\1\]~ui", 
      "&lt;\\1>\\2&lt;/\\1>", 
      $text
    );
  }
  return $text;
}</code></pre>

<p>Použití.</p>

<pre><code>$text = obycejnyBbKod(
  array("b", "i", "code"), $text
);
echo $text;</code></pre>

<h3 id="img">Značka <code>[img]</code></h3>

<p>V případě <b>vkládání obrázků</b> je nutné vytvořit jinou funkci (už se nebude nahrazovat značka za značku, ale potřebujeme obsah mezi <code>[img]</code> a <code>[/img]</code> dostat do <code>src</code> atributu značky <code>&lt;img></code>). Regulární výraz ale bude stejný.</p>

<pre><code>$text = preg_replace(
  "~\[img\](.+?)\[/img]~ui", 
  "&lt;img src='\\1'>", 
  $text
);</code></pre>

<h3 id="slozitejsi">Složitější BB značky <code>[url]</code></h3>

<p>BB značky, kde může být nějaký <i>atribut</i> s hodnotou, musí zpracovávat trochu <b>složitější regulární výraz</b>.</p>

<pre><code>$text = preg_replace(
  "~\[url=(.+?)\](.+?)\[/url]~ui", 
  "&lt;a href='\\1'>\\2&lt;/a>", 
  $text
);</code></pre>

<h2 id="bezpecnost">Bezpečnost</h2>

<p>Je potřeba myslet na to, že vstup od uživatele je nutno chránit před <a href="/bezpecnost#xss">XSS</a> a zároveň veškeré akce chránit před <a href="/bezpecnost#csrf">CSRF</a>. Možnost <b>vložit obrázek</b> může být skvělá příležitost, jak administrátor načte požadovanou URL (třeba URL pro smazání obsahu), aniž by <b>o tom věděl</b>.</p>

<h3 id="xss">XSS</h3>
<p>Proti <b>XSS</b> je vhodný postup ošetřit před <b>převáděním na BB code</b> obsah funkcí <code>htmlspecialchars</code>.</p>

<pre><code>$text = htmlspecialchars($text, ENT_QUOTES);</code></pre>

<p>Uvést druhý parametr <code>ENT_QUOTES</code> je <b>naprosto klíčové</b>. Zabrání to možnosti vložit škodlivý kód typu:</p>

<pre><code>[img]http://example.com'<b> onclick='alert("XSS")</b>[/img]
</code></pre>

<p>Který by se jinak přetvořil na <i>validní</i>, funkční a nebezpečný kód:</p>

<pre><code>&lt;img src='http://example.com'<b> onclick='alert("XSS")</b>'></code></pre>

<h2 id="callback">Zpracovávání obsahu značek</h2>

<p>V případě, že je žádoucí zadaný obsah BB značek nějak zpracovávat (upravovat), poslouží k tomu <b>PHP funkce</b> <code>preg_replace_<b>callback</b></code>.</p>

<pre><code>$text = preg_replace_callback(
  "~\[url=(.+?)\](.+?)\[/url]~ui", 
  function($vyskyty) {
    $cilOdkazu = $vyskyty["1"];
    $textOdkazu = $vyskyty["2"];
    // nějaké operace
    return "&lt;a href='" . $cilOdkazu . "'>" . $textOdkazu . "&lt;/a>"; 
  },
  $text
);</code></pre>

<h2 id="hotove-reseni">Hotové řešení</h2>

<p>Hotové řešení <a href="https://github.com/Jahoda/bb-code">BB code v PHP</a> je na GitHubu.</p>

<h2 id="zpetny-prevod">Zpětný převod HTML na BB code</h2>

<p>Převádět pro účely editace textů v BB kódu zpětně z HTML sice možné je, ale není to úplně ideální postup. Musí se kromě funkcí „BB Code → HTML“ vytvářet i převody opačné.</p>

<p>Navíc to není jen dopisování zpětných regulárních výrazů. Když se rozhodneme, že HTML značky obrázků mají mít třeba nějakou třídu, bude se muset psát další regulární výraz pro <b>převod staré podoby HTML do nové</b>. Nebo si napsat nějaký skript, co všechen obsah dekóduje do BB a převede zpět do nové podoby HTML.</p>

<p>Většinou lepší řešení je ukládat v DB <b>obě podoby</b> – jednu v BB kódu pro editaci a druhou v HTML pro výpis. Převádět BB kód by sice bylo možné při <b>každém vypsání stránky</b>, ale je to trochu zbytečná zátěž.</p>

<h2 id="problemy">Problémy</h2>

<p>Převody BB značek na HTML <b>regulárními výrazy</b> nejsou úplně neprůstřelné. Například není problém vytvořit překřížené značky a obecně <b>nevalidní výstup</b>. Je to ale řešení na pár řádek, což by napsání dokonale funkčního parseru, který by těmito problémy netrpěl, nebylo.</p>