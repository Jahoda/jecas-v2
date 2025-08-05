---
title: "Asynchronní načítání CSS"
headline: "Načítání CSS bez blokování vykreslování"
description: "Jak asynchronně načítat CSS, aby neblokovalo vykreslování stránky."
date: "2014-11-18"
last_modification: "2014-12-08"
status: 1
tags: ["css", "hotova-reseni", "napady", "zrychlovani"]
format: "html"
---

<p><b>Externí CSS</b> se většinou připojuje v <b>hlavičce stránky</b> (<code>&lt;head></code>) dvěma způsoby:</p>

<ul>
  <li>
    <p>HTML značkou <code>&lt;link></code>:</p>
    
    <pre><code>&lt;link rel="stylesheet" href="styl.css"></code></pre>
  </li>
  
  <li>
    <p>CSS pravidlem <code>@import</code> uvnitř <code>&lt;style></code>:</p>
    
    <pre><code>&lt;style>
  @import url('styl.css');
&lt;/style></code></pre>
  </li>
</ul>

<p>Problém obou případů spočívá v tom, že jejich <b>načítání</b> a <b>zpracování</b> blokuje vykreslení stránky. Než se CSS stáhne a zpracuje, uživatel <b>zírá na prázdnou stránku</b>.</p>

<p>S ohledem na <a href="/vykreslovani">vykreslování stránky</a> to má opodstatnění. Prohlížeč nemusí stránku <b>překreslovat</b> po každém CSS pravidlu, které zrovna zpracoval, ale nejdříve si počká na všechny styly a stránku <b>vykreslí najednou</b>.</p>

<p>Jelikož <b>HTTP spojení</b> pro každý CSS soubor něco <i>stojí</i>, znamená toto čekání zbytečnou <b>prodlevu při načítání stránky</b>. U datově většího nebo u více souborů se styly už to může být problematické.</p>

<div class="internal-content">
  <ul>
    <li>Více CSS souborů bývá dobré spojit: <a href="/slouceni-js-css">Spojení CSS a JS souborů do jednoho</a></li>
  </ul>
</div>


<h2 id="async">Asynchronní načítání CSS</h2>

<p>V případě, že bude výsledné CSS hodně velké nebo zkrátka chceme první načtení <b>co nejrychlejší</b>, nabízí se styly <b>rozdělit na dvě části</b>:</p>

<ol>
  <li>
    <p>Minimum stylů nutných k přijatelnému <b>zobrazení obsahu „nad ohybem“</b> (obsah, který je vidět ihned po načtení, než začne uživatel <b>rolovat</b>).</p>
  </li>
  
  <li>
    <p>Zbytek stylů („kritické CSS“).</p>
  </li>
</ol>

<p>Tzv. <b>kritické CSS</b> (pro obsah nad ohybem) se potom vloží přímo do hlavičky do značky <code>&lt;style></code>. A zbytek se načte později JavaScriptem. Taková <b>JS funkce</b> a její použití může vypadat následovně.</p>

<pre><code>&lt;script>
function nacistCSS(url) {
  var styl = document.createElement("link");
  var skript = document.getElementsByTagName("script")[0];
  styl.rel = "stylesheet";
  styl.href = url;
  setTimeout(function() {
    skript.parentNode.insertBefore(styl, skript);
  });
}
nacistCSS("<b>dalsi-styl.css</b>");
&lt;/script></code></pre>

<p>Pro funkčnost <a href="/vypnuty-js">bez podpory JavaScriptu</a> se potom za tento skript umístí standardní připojení CSS do značky <code>&lt;noscript></code>.</p>

<pre><code>&lt;noscript>
  &lt;link rel="stylesheet" href="<b>dalsi-styl.css</b>">
&lt;/noscript></code></pre>















<h2 id="smysl">Kdy má rozdělení smysl</h2>

<p>Při úvaze o <b>asynchronním načítání CSS</b>, je dobré stejně jako u jiných způsobů <b>optimalisace rychlosti</b> nejprve změřit aktuální stav.</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.webpagetest.org/">WebPageTest</a> – zjistí časovou osu načítání stránky</li>
  </ul>
</div>

<p>A podle aktuálního stavu potom postupně upravovat nejprve věci, které <b>zdržují nejvíce</b>. Tj. pokud generování stránky na serveru trvá 0,5 sekundy, je nejspíš účinnější řešit to místo pár desítek milisekund, co zabere stažení CSS o velikosti pár desítek kilobytů.</p>


<p>HTTP požadavek na běžný CSS soubor tedy může zabrat nižší desítky milisekund, kdy většinu času zabere <b>navázání spojení</b>.</p>

<p>U webů, které používá hodně návštěvníků <b>z mobilu</b>, jsou docela rozumné následující <b>orientační hodnoty</b>.</p>

<ul>
  <li>Obsah stránky „nad ohybem“ by se měl vejít do <b>prvních 14 kB</b>.</li>
  
  <li>Neasynchronně načítané (= vykreslování blokující) externí CSS by mělo být <b>do 20 kB</b>.</li>
</ul>



<h2 id="vytvoreni">Vytvoření „kritického CSS“</h2>

<p>Pro získání kritické části CSS z již <b>existující stránky</b> existuje docela šikovný online nástroj:</p>

<div class="external-content">
  <ul>
      <li><a href="http://jonassebastianohlsson.com/criticalpathcssgenerator/">Critical Path CSS Generator</a></li>
    
    <li><a href="https://adactio.com/journal/8504">Inlining critical CSS for first-time visits</a></li>
  </ul>
</div>

<p>Pochopitelně se těžko může měřit s <b>ručním vytvořením</b> nejnutnějších stylů. A už vůbec potom s tím, když bude člověk psát CSS od začátku s ohledem na vytvoření <i>kritického CSS</i>.</p>

<p>Není potřeba se totiž striktně držet stylování <b>všeho „nad ohybem“</b>, ale můžeme se zaměřit jen na styl hlavního obsahu. A ostatní styly asynchronně donačíst později bez <b>zdržování vykreslování</b>.</p>

<p>Pro <b>pocit rychlého načtení</b> je totiž klíčové zobrazit co nejdříve hlavní obsah. Když si ho uživatel bude už moci číst, není takový problém, že se <b>zbytek stránky</b> načte až později.</p>



<h2 id="cache">Cache</h2>

<p>Nevýhoda rozdělení CSS na <b>interní a externí</b> část způsobí, že se ta interní <b>nebude ukládat do cache</b> v prohlížeči. Dá se tedy říct, že výrazně zrychlíme <b>načítání první stránky</b>, abychom lehce zpomalili načítání všech dalších stránek. Kritické CSS se bude znovu a znovu stahovat na všech stránkách webu.</p>

<p>Taktéž přenášení stále stejného <i>kritického CSS</i> zvýší datový přenos.</p>

<p>Existují různé pokusy o <b>kešování kritického CSS</b> do <a href="/zalohovani-formularu#local-storage">lokálního úložiště</a> (<code>localStorage</code>), ale u většiny webů to nejspíš nepřinese takovou úsporu, aby to mělo smysl řešit. Několik kB navíc bez nutnosti dalšího HTTP spojení zbrzdí stránku jen <b>minimálně</b>.</p>

<p>Při implementaci si je nutné dát pozor na <b>relativní cesty</b> k <b>obrázkům</b> nebo <b>fontům</b>, pokud jsou tyto soubory v podadresářích třeba nějak takto:</p>

<pre><code>/index.html
/css/styl.css
/obrazky/obrazek.png
/fonty/pismo.otf</code></pre>


<p>Nebude cesta typu „<code>../obrazky/obrazek.png</code>“ ze značky <code>&lt;style></code> z hlavičky souboru <code>index.html</code> fungovat.</p>







<!--

<h2 id="shrnuti">Výhody a nevýhody</h2>
-->
<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://keithclark.co.uk/articles/loading-css-without-blocking-render/">Loading CSS without blocking render</a></li>

</ul>