---
title: "Markdown"
headline: "Markdown"
description: "Markdown slouží k formátování textu. Výhody a nevýhody, popis syntaxe."
date: "2015-02-05"
last_modification: "2016-04-20"
status: 1
tags: ["produktivita"]
format: "html"
---

<p>Při vytváření obsahu na internetu se zpravidla hodí nějaké formátování obsahu. Od vytváření odstavců – přes <b>tučný</b> a <i>šikmý</i> text – až po <a href="/odkaz">odkazy</a>, <a href="/seznamy">seznamy</a>, <a href="/obrazky">obrázky</a> a vlastní bloky.</p>

<p>V závislosti na tom, jestli se jedná o komentář na <a href="/facebook">Facebooku</a>, diskusní příspěvek nebo třeba článek na blogu, se potom hodí různé způsoby, <i>jak psát obsah</i>.</p>




<h2 id="syntaxe">Syntaxe Markdownu</h2>


<p><a href="http://daringfireball.net/projects/markdown/">Markdown</a> je ve formátování specifický tím, že nepoužívá otevírací/uzavírací značky jako HTML nebo <a href="/bb-code">BB Code</a>, ale zvláštní řídicí znaky.</p>


<p>Myšlenka <abbr>MD</abbr> (Markdownu) je v tom, aby v něm zapsaný obsah jakž takž rozumně vypadal i v naprosto hloupém editoru, který zvládá jen prostý text (například prvek <a href="/textarea"><code>&lt;textarea></code></a> na webových stránkách nebo poznámkový blok ve <a href="/windows">Windows</a>).</p>

<h3 id="priklad">Příklad v Markdownu</h3>

<pre><code># Nadpis nejvyšší úrovně
Odstavec s **tučným** a *šikmým textem*
1. číslovaný seznam
2. s několika
2. položkami

## Podnadpis <code>&lt;h2></code>
Zdrojový kód může být `v řádku` nebo jako blok:

  Výpis zdrojového kódu.
> Bloková citace
- nečíslovaný
- seznam

Odstavec s odkazem na [web jecas.cz](http://jecas.cz).

A nakonec obrázek:

![alternativní text](http://jecas.cz/images/jecas.png)</code></pre>



















<p>Výše uvedený obsah se v HTML zobrazí následovně:</p>

<p><img src="/files/markdown/ukazka.png" alt="Výsledek převodu MD na HTML" class="border"></p>


















































<p><a href="https://kod.djpw.cz/ymvb">Ukázka</a></p>







<h2 id="poznamky">Poznámky k MD syntaxi</h2>

<ul>
  <li id="ol">
    <p>U <b>číslovaného seznamu</b> není nutné, aby byly položky v pořadí 1, 2, 3. Klidně jde všude uvést jedničky a vše se řádně převede:</p>
    <pre><code>1. položka
1. druhá položka
1. třetí položka</code></pre>
  </li>

  
  
  
  <li id="code">
    <p><b>Řádkový <code>kód</code></b> se značí zpětným lomítkem <code>`</code> (anglicky <i lang="en">backtick</i> nebo <i lang="en">backquote</i>).</p>
    <p>Na <a href="/ceska-klavesnice">české klávesnici</a> je trochu problém tento znak zapsat. Je potřeba použít klávesovou zkratku <kbd>Pravý Alt</kbd> + <kbd>ý</kbd>.</p>
  </li>
  
  <li id="pre">
    <p><b>Blokový kód</b> stačí odsadit tabulátorem nebo 4 mezerami a vynechat před ním jeden řádek.</p>
    <p>Při zvýrazňování syntaxe se častěji používá zápis s třemi zpětnými uvozovkami <code>```</code> a určením názvu jazyku:</p>
    
    <pre><code>```javascript
var s = "Obarvený JS kód";
alert(s);
```</code></pre>
  </li>
  
  
  
  
  
  
  
  <li id="seznamy-odstavce">
    <p>Uvnitř (ne)číslovaných seznamů jde <b>vytvářet odstavce</b> (pomocí vynechání řádku a odsazení):</p>
    
    <pre><code>- První odstavec v seznamu
    
    Druhý odstavec v seznamu</code></pre>
  </li>
  
  
  
  
  
  <li id="html">
    <p>Markdown se může <b>kombinovat s HTML</b>. Výjimkou je odsazení (zdrojový kód), kdy se HTML kód převede na <a href="/entity">entity</a>, aby se neinterpretoval.</p>
  </li>
  
  
  <li id="odkazy-pokrocile">
    <p>Odkazy na stránky, obrázky a jiné soubory jde alternativně zapisovat pomocí odkazů:</p>
    <pre><code>Odstavec a odkaz na [web jecas.cz][2] a odkaz na [diskusi][1].</code></pre>
    
    
    
    
    
    <p>Cíle odkazů jdou potom nadefinovat třeba na konci souboru:</p>
    
    <pre><code>[1]: http://diskuse.jakpsatweb.cz
[2]: http://jecas.cz</code></pre>
    
    <p>Kromě číselných identifikátorů jde používat stejným způsobem i řetězce (nezáleží na velikosti písmen).</p>
  </li>

</ul>






<h2 id="nevyhody">Výhody a nevýhody</h2>

<p>Hlavní nevýhoda je v nutnosti se učit nový <i>jazyk</i>.</p>

<p>Pro běžné uživatele je nejspíš vhodnější visuální <a href="/wysiwyg">WYSIWYG</a> editor. Pro člověka znalého HTML není potom problém s dobrým editorem psát přímo v HTML.</p>


<p>Syntaxe MD nemá jasná obecná pravidla jako HTML nebo BB kód, kde je jasně stanovená značka a atribut, ale různé prvky se řeší odlišným způsobem.</p>







<h3 id="omezeni">Omezení</h3>

<p>Má-li si člověk vystačit pouze s Markdown syntaxí, relativně brzo narazí na <b>omezení v bohatosti syntaxe</b>.</p>

<p>Například obyčejné vytvoření <a href="/html-tabulky">HTML tabulky</a> nebo vlastního bloku (elementu <a href="/div-span#div"><code>&lt;div></code></a> s vlastní třídou) není v základní implementaci Markdownu možné.</p>

<p>Identifikátory nadpisů sice MD vytváří automaticky, nastavit vlastní ID ale moc elegantní není:</p>

<pre><code># &lt;a name="identifikator">&lt;/a>Nadpis</code></pre>






<p>Stejně tak vytvoření <a href="/popis-obrazku">popisku k obrázku</a>, které by se dalo řešit třeba pomocí značek <code>&lt;figure></code> a <code>&lt;figcaption></code> nejde v základní MD syntaxi nějak rozumně vyřešit.</p>


<p>Psát v MD <b>celé HTML stránky</b> je tak značně komplikované.</p>


<p>Na druhou stranu omezení se na základní věci má i svoje výhody, protože vlastní bloky jsou oproti standardním HTML prvkům náchylné na problémy při redesignu.</p>

<p>Kvůli omezením Markdownu tak vznikne celkem universální kód.</p>




<h3 id="vyhody">Výhody</h3>

<p>Díky <b>rozšířenosti</b> je Markdown vhodný formát pro jednoduché formátování textu dobře přenositelné mezi různými aplikacemi.</p>

<p>Při <b>psaní v hloupém editoru</b> je MD přehlednější a nejspíš i pohodlněji zapisovatelný než HTML nebo BB kód. Při použití editoru se zvýrazňováním syntaxe, <a href="/emmet">Emmetem</a>, snippety a klávesovými zkratkami se ale rozdíly mezi MD a HTML dost stírají.</p>

<p>Výstupem z textu zapsaného v Markdownu je validní HTML. V případě používání HTML je obvykle nutné provádět <a href="/vycisteni-kodu">opravení/ošetření HTML kódu</a>.</p>





<h2 id="implementace">Implementace</h2>

<p>Při používání MD na webu jsou dvě možnosti:</p>

<ol>
  <li>Zpracovávat Markdown na straně serveru (např. v <a href="/php">PHP</a>).</li>
  <li>Převádět syntaxi přímo v prohlížeči <a href="/js">JavaScriptem</a>.</li>
</ol>





<h3 id="php">PHP</h3>

<p>Nástroje pro formátování Markdownem v PHP:</p>

<div class="external-content">
  <ul>
    <li><a href="http://parsedown.org/">Parsedown</a> – rychlejší MD v PHP</li>
    <li><a href="https://michelf.ca/projects/php-markdown/extra/">PHP Markdown Extra</a> – Markdown s více možnostmi (vlastní bloky apod.)</li>
  </ul>
</div>



<h3 id="js">MD v JavaScriptu</h3>

<p>Převádění v JS na straně klienta se hodí spíš pro živý náhled, protože umožnit uživatelům, aby do DB vkládali HTML kód většinou není moc bezpečné.</p>

<p>Pro JavaScript se nejčastěji používá knihovna marked:</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/chjj/marked">marked</a> – knihovna pro převod MD → HTML pro použití u klienta i na serveru</li>
  </ul>
</div>


<p><a href="https://kod.djpw.cz/zpvb">Živá ukázka</a> – jednoduchý editor převádějící Markdown do HTML</p>


<h2 id="editory">Editory</h2>

<p>Existuje mnoho editorů podporující Markdown. Existují i pluginy do offline editorů – třeba pro <a href="/st">Sublime Text</a>.</p>

<p>Lepší editory dokáží prvky v Markdownu visuálně odlišovat nebo nabízet rovnou výsledný náhled. Pro pohodlnější psaní jsou hodně užitečné klávesové zkratky.</p>

<div class="external-content">
  <ul>
    <li><a href="http://dillinger.io/">Dillinger</a> – online editor pro psaní v MD</li>
    <li><a href="https://stackedit.io/editor">Stackedit</a> – online editor</li>
      <li>Sitepoint: <a href="http://www.sitepoint.com/best-markdown-editors-windows/">The Best Markdown Editor for Windows</a> – desktopové aplikace pro <a href="/windows">Windows</a></li>
  </ul>
</div>





<h2 id="texy">Texy!</h2>

<p>Existuje více nástrojů pro relativně pohodlné psaní v plaintextu převoditelného do HTML.</p>

<p>Jedním z nich je <a href="https://texy.info/cs/">Texy!</a> od <b>Davida Grudla</b>, které používá trochu jinou syntaxi než MD.</p>

<p>V Texy! je možné používat vlastní bloky, dokáže zajistit české typografické úpravy, ale není tolik rozšířeno jako Markdown.</p>

<!-- 
<h2 id="odkazy">Odkazy jinam</h2>

<ul>

</ul>


  <li>
    <p>V MD jde i <b>vytvářet tabulky</b>. Používá se tím znak <code>|</code> (na české klávesnici <kbd>Pravý Alt</kbd> + <kbd>W</kbd>).</p>
  </li>

-->