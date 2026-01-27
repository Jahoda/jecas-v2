---
title: "Uvozovky – české, anglické, jednoduché"
headline: "Uvozovky v HTML, CSS, JS, PHP, SQL"
description: "Přehled typů uvozovek (české „", anglické \"\", jednoduché '') a jak je správně používat v HTML, CSS, JavaScriptu, PHP a SQL."
date: "2015-12-22"
last_modification: "2015-12-24"
status: 1
tags: ["css", "html", "js", "php", "sql"]
format: "html"
---

<h2 id="html">HTML atributy</h2>

<p>V HTML se uvozovky používají pro obalení hodnot atributů.</p>




<p>V řadě (většině) případů se u HTML atributů používají uvozovky zbytečně, ale považuje se to za dobrý zvyk. Někomu se to tak víc líbí, někomu může ouvozovkované hodnoty lépe zvýrazňovat HTML editor:</p>

<p><img src="/files/uvozovky/zvyrazneni.png" alt="Zvýraznění hodnoty atributu v Sublime Text" class="border"></p>
  
  




<p>Někomu může vyhovovat, že nemusí přemýšlet nad případy, kde je možné uvozovky vynechat.</p>


<p>Třeba <a href="/odkaz">odkaz</a> na <code>jecas.cz</code> jde zapsat následovně:</p>

<pre><code>&lt;a href=http://jecas.cz>
  Je čas
&lt;/a></code></pre>




<p>Formulářový prvek <a href="/input"><code>&lt;input></code></a> může bez problémů vypadat následovně:</p>

<pre><code>&lt;input type=checkbox></code></pre>

<p>V podstatě může být v hodnotě atributu bez uvozovek cokoliv kromě:</p>

<ul>
  <li>
    <p>Mezery – ukončila by hodnotu atributu. A zbytek by se bral jako další atribut:</p>
    
    <pre><code>&lt;div class=prvni <b>druha</b>></code></pre>
  </li>
  <li>
    <p>Znaku <code>&gt;</code> – ukončil by HTML značku, čímž by se ukončila i hodnota atributu. Zbytek by se tak stal obsahem značky:</p>
    <pre><code>&lt;div class=prvni><b>druha></b></code></pre>
  </li>
</ul>

<p>W3C doporučení uvádí pro hodnoty atributů bez uvozovek následující:</p>
<div class="external-content">
  <ul>
    <li>W3C: <a href="http://www.w3.org/TR/html5/syntax.html#unquoted">Unquoted attribute value syntax</a></li>    
    <li>DJPW: <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=4&amp;topic=160534">Proč někdy není potřeba dávat hodnoty vlastností do uvozovek?</a></li>
  </ul>
</div>


<h2 id="css">CSS</h2>

<p>V CSS se uvozovky používají nejčastěji:</p>

<ol>
  <li id="url">
    <p>Ve funkci <code>url</code> pro nastavování např. obrázkového pozadí:</p>
    
    <pre><code>background: url("obrazek.png");</code></pre>
  </li>
  
  <li id="content">
    <p>Ve funkci <a href="/content-attr"><code>content</code></a> pro nastavování obsahu:</p>
    
    <pre><code>div:before {
  content: "Text";
}</code></pre>
  </li>
  
  
  <li id="font">
    <p>V názvech fontů za <a href="/font#font-family"><code>font-family</code></a>.</p>
    
    <pre><code>div {
  font-family: "New York CE", …;
}</code></pre>
  </li>
  
  
  <li id="selektory">
    <p>U <a href="/css-selektory#atributovy-hodnota">atributových selektorů</a>:</p>
    
    <pre><code>div[class="modra"] {
  …
}</code></pre>
  </li>
</ol>


<p>I tady platí, že uvozovky jsou často zbytečné. Vždy nutné je použít uvozovky u vlastnosti <code>content</code>. Mezi dvojitými a jednoduchými nejspíš není rozdíl.</p>


<p>Při používání standardních názvů souborů jde uvozovky bezpečně vynechat u <code>url</code>. Názvy fontů vyžadují uvozovky jen v případě, že obsahují čísla a speciální symboly.</p>


<p>CSS selektory potřebují obalit hodnotu selektoru do uvozovek opět jen v případě, že obsahuje nestandardní znaky, které mají zvláštní význam v CSS, například zaměření políčka s názvem „pole[]“ by bez uvozovek nešlo:</p>

<pre><code>input[name="pole[]"] {
}</code></pre>



<p>Většina lidí uvozovky používá ve všech případech, protože si nechtějí nebo nedokáží zapamatovat, kde jsou uvozovky potřebné, nebo se jim zápis s uvozovkami zkrátka líbí nebo jde opět o pomoc editoru pro zvýrazňování syntaxe.</p>





<h2 id="js">Uvozovky v JavaScriptu</h2>

<p><a href="/js">JavaScript</a> vyžaduje uvozovky kolem řetězců. Jestli jsou uvozovky dvojité <code>"</code> nebo jednoduché <code>'</code>, nemá na funkci vliv.</p>

<pre><code>var promenna = "Text";
window.location = 'index.html';</code></pre>



<p>Možnost volit typ uvozovek se hodí při výpisu HTML s atributy. Není potom nutné uvozovky v HTML escapovat.</p>

<pre><code>var html = '&lt;div class="a">&lt;/div>';</code></pre>


<p>Novější prohlížeče podporující EcmaScript 6 znají ještě jeden typ uvozovek – <b>zpětnou uvozovku</b> – pro víceřádkové řetězce.</p>

<pre><code>var obsah = `Řetězec 
se zalomením
řádku`;</code></pre>




<h3 id="gravis">Znak <code>`</code></h3>

<p>Znak <code>`</code> se v programování nazývá jako zpětná uvozovka (anglicky <i lang="en">backquote</i> nebo <i lang="en">backtick</i>). V řadě jazyků se tento znak používá jako <a href="https://en.wikipedia.org/wiki/Grave_accent">diakritická značka</a>.</p>

<p>Na <a href="/ceska-klavesnice">české klávesnici</a> jde zapsat klávesovou zkratkou <kbd>Pravý Alt</kbd> + <kbd>ý</kbd>.</p>




<h3 id="json">JSON</h3>

<p>Drobný rozdíl je v <a href="/json">JSONu</a>, kde jsou vyžadovány dvojité uvozovky. Klíče nebo hodnoty obalené do jednoduchých uvozovek zde nejsou validní. Následující kód proto <b>není validní JSON</b>:</p>

<pre><code>{
  "klic" : <b>'</b>hodnota<b>'</b>
}</code></pre>





<h2 id="php">Uvozovky v PHP</h2>

<p>V <a href="/php">PHP</a> je <i>většinou</i> jedno, který typ uvozovek (jednoduché/dvojité) se použije.</p>

<p>Zásadní rozdíl je ale v tom, že v řetězci s dvojitými uvozovkami dojde k automatickému nahrazení proměnné její hodnotou:</p>

<pre><code>$a = 1;
echo "Výsledek: $a"; // Výsledek: 1</code></pre>



<p>V případě jednoduchých uvozovek se proměnná nenahradí:</p>

<pre><code>$a = 1;
echo 'Výsledek: $a'; // Výsledek: $a</code></pre>



<p>Pro lepší přehlednost zápisu s dvojitými uvozovkami se někdy ještě používají složené závorky:</p>

<pre><code>echo "Výsledek: <b>{</b>$a<b>}</b>";</code></pre>


<p>Hodně lidí ale tuto funkci nevyužívá a řetězce s proměnnými raději spojuje tečkou:</p>


<pre><code>echo "Výsledek: " <b>.</b> $a;</code></pre>


<p>V některých editorech to má vliv na obarvení:</p>


<p><img src="/files/uvozovky/zvyrazneni-php.png" alt="Zvýraznění PHP proměnné v Sublime Text" class="border"></p>
  
  




<p>Pro řetězec o více řádcích není v PHP problém použít odřádkování:</p>

<pre><code>$obsah = "Řetězec 
se zalomením
řádku";</code></pre>





<h3 id="heredoc">Heredoc</h3>

<p>Někdy se ještě používá pro označení řetězců <a href="http://php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc">heredoc</a>:</p>

<pre><code>$obsah = &lt;&lt;&lt;EOT
Řetězec 
se zalomením
řádku
EOT;</code></pre>





<p>Výhoda oproti uvozovkám je v tom, že případné další uvozovky uvnitř není nutné escapovat. Tento postup se proto používá třeba k výpisu HTML kódu uvnitř PHP.</p>


<p>Zpětné uvozovky <code>``</code> mají v PHP zcela odlišný význam než v JavaScriptu. Slouží k zavolání funkce <a href="http://php.net/manual/en/language.operators.execution.php"><code>shell_exec</code></a>.</p>



<h2 id="mysql">Uvozovky v MySQL</h2>

<p>V MySQL se jednoduché uvozovky používají pro obalení řetězců v podmínkách:</p>

<pre><code>SELECT FROM tabulka WHERE sloupec = <b>'</b>něco<b>'</b></code></pre>

<p>Případně:</p>

<pre><code>SELECT FROM tabulka WHERE sloupec LIKE <b>'</b>%něco%<b>'</b></code></pre>




<p>Pro obalení názvů sloupců nebo tabulek jde použít zpětné uvozovky <code>``</code>:</p>

<pre><code>SELECT FROM <b>`</b>tabulka<b>`</b> WHERE <b>`</b>sloupec<b>`</b> = 'něco'</code></pre>



<p>Zpětné uvozovky se hodí pro případy, kdy identifikátory tabulek či sloupců obsahují zvláštní znaky nebo <a href="http://dev.mysql.com/doc/refman/5.5/en/keywords.html">reservovaná klíčová slova</a>.</p>

<p>Pokud by se třeba sloupec jmenoval <code>key</code>, následující dotaz by selhal:</p>

<pre><code>SELECT key FROM tabulka</code></pre>


<p>Lepší je nejspíš se těmto názvům raději <b>vyhnout</b>.</p>




<h3 id="ansi-mode">Jednoduché nebo dvojité</h3>

<p>Dvojité uvozovky se v MySQL většinou chovají stejně jako jednoduché. Problém ale může nastat u jiných SQL databasí nebo při změně nastavení <a href="http://dev.mysql.com/doc/refman/5.6/en/sql-mode.html#sqlmode_ansi_quotes"><code>ANSI_QUOTES</code> režimu</a>. Dvojité uvozovky se potom mohou začít chovat jako zpětné uvozovky <code>`</code>.</p>

<p>Nabízí se proto používat raději jednoduché.</p>




<h2 id="michani">Míchání uvozovek</h2>

<p>Pořádná zábava začne v momentě, kdy je potřeba nakombinovat více typů uvozovek kvůli používání různých programovacích jazyků.</p>


<p>Řešení číslo 1: <b>Nemíchat mezi sebou kód z různých jazyků</b>.</p>

<p>Při jeho nedodržení je nutné dělat následující:</p>





<h3 id="html-js">Uvozovky v HTML a JavaScriptu</h3>

<p>Vypsání <code>alert</code>u po <a href="/udalosti-mysi#kliknuti">kliknutí</a>. Uvnitř dvojitých uvozovek jde použít jednoduché:</p>

<pre><code>&lt;button onclick="alert('Hláška')">
  Tlačítko
&lt;/button></code></pre>



<p>Co ale v případě, že se po kliknutí na tlačítko má vypsat nějaký HTML kód? Třeba odkaz</p>

<pre><code>&lt;div id="vypis">&lt;/div>
&lt;button onclick="vypis.innerHTML = '&lt;a href=<b>???</b>>Odkaz&lt;/a>'">
  Tlačítko
&lt;/button></code></pre>





<p>Najednou pro jeho atribut <code>href</code> už nezbývají volné uvozovky.</p>

<ol>
  <li>
    <p><b>Escapování</b> – pomocí zpětného lomítka <code>\</code> (lze zapsat zkratkou <kbd>Pravý Alt</kbd> + <kbd>Q</kbd>) jde uvozovky tzv. escapovat.</p>
    
    <p>Escapovat uvozovku kolem hodnoty atributu zpětným lomítkem nejde v rámci HTML, tam k tomu slouží <a href="/entity#quote">entity pro uvozovky</a> – <code>&amp;quot;</code> a <code>&amp;apos;</code>.</p>
    
    <p>Na následující ukázce by se hodnota atributu ukončila ihned druhou dvojitou uvozovkou a vznikl by tak nevalidní kód.</p>
    
    <pre><code>&lt;button onclick="alert(\<b>"</b>Hláška\")"></code></pre>
    
    <p>Jiný typ uvozovky, než se používá pro obalení HTML atributu, ale už escapovat jde:</p>
    
    <pre><code>&lt;div id="vypis">&lt;/div>
&lt;button onclick="vypis.innerHTML = '&lt;a href=<b>\'</b>cil.html<b>\'</b>>Odkaz&lt;/a>'">
  Tlačítko
&lt;/button></code></pre>
  </li>
  
  
  
  <li>
    <p><b>Entity</b> – <i>vyplácá-li</i> se druhý typ uvozovek i jeho escapovaná podoba, další možnost je použít entity:</p>
    
    
    <pre><code>&lt;div id="vypis">&lt;/div>
&lt;button onclick="vypis.innerHTML = '&lt;b title=\'Titulek <b>&amp;quot</b>;textu<b>&amp;quot;</b>\'>Text&lt;/b>'">
  Tlačítko
&lt;/button></code></pre>    
    
    
    
    <p><a href="https://kod.djpw.cz/bbtb">Živá ukázka</a> – zanoření více uvozovek</p>
  </li>
</ol>



<h3 id="php-html-js">PHP a HTML + JS</h3>

<p>Měl-li by se HTML kód s JavaScriptem v uvozovkách vypisovat pomocí PHP, bude nedostatek uvozovek ještě větší.</p>

<p>Na druhou stranu jde escapovat i uvozovku, která obaluje řetězec:</p>

<pre><code>echo "&lt;button onclick=\"vypis.innerHTML = '&lt;b title=\'Titulek <b>&amp;quot</b>;textu<b>&amp;quot;</b>\'>Text&lt;/b>'\">";</code></pre>


<p>Vyhnout se nutnosti escapování HTML/JS kódu v PHP jde již zmíněným <a href="#heredoc">heredocem</a>. Nebo přerušením PHP bloku:</p>

<pre><code>&lt;?php … ?>
&lt;button>
  HTML obsah
&lt;/button>
&lt;?php … ?></code></pre>






<h3 id="oddeleni">Oddělení různých jazyků</h3>

<p>Jak je vidět na ukázkách, zanořování různých uvozovek není moc přehledné.</p>

<p>V případě JavaScriptu je řešení vyčlenit událost po kliknutí do zvláštní funkce a tu potom připojit:</p>

<div class="internal-content">
  <ul>
    <li><a href="/pripojeni-udalosti">Navázání událostí v JavaScriptu</a></li>
  </ul>
</div>

<p>Zbavit se nutnosti zanořovat uvozovky jde i vytvářením HTML kódu metodami <code>createElement</code> a nastavování atributů pomocí JS vlastností:</p>

<pre><code>var element = document.createElement("div");
element.className = "prvni druha";
element.onclick = funkce;</code></pre>




<p>V PHP je potom řešení použít heredoc, přerušení PHP bloku nebo využití nějakého šablonovacího systému a mít tak HTML kód kompletně oddělený od PHP.</p>





<h2 id="ceske">České uvozovky</h2>

<p>Nakonec se na webu vyskytují ještě „české uvozovky“ – vypadají visuálně lépe než " nebo '. Zapsat jdou entitami <code>&amp;bdquo;</code> a <code>&amp;ldquo;</code>.</p>

<p>Pro &sbquo;jednoduché české uvozovky&lsquo; slouží entity <code>&amp;sbquo;</code> a <code>&amp;lsquo;</code></p>


<p>Ve <a href="/windows"><b>Windows</b></a> pro ně ale žádná jednoduchá klávesová zkratka neexistuje.</p>

<!-- Ukázka https://kod.djpw.cz/dbtb -->