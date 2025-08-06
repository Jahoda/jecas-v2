---
title: "Odstavec v HTML"
headline: "HTML odstavec"
description: "HTML značka <code>&lt;p></code> slouží k uspořádávání textu do odstavců."
date: "2015-07-13"
last_modification: "2015-08-13"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>U webových stránek bývá zvykem, že delší text bývá pro lepší přehlednost <b>členěn do odstavců</b>. Slouží k tomu bloková značka <code>&lt;p></code> (<i>p</i> pochází z anglického <i lang="en">paragraph</i> = odstavec).</p>



<h2 id="zapis">Zápis odstavců</h2>

<pre><code><b>&lt;p></b>
  Text v odstavci.
<b>&lt;/p></b></code></pre>




<p>Odstavec má v HTML <b>nepovinnou <a href="/html-znacky#koncova-volitelna">uzavírací značku</a></b> – automaticky se uzavře o jiný <b>blokový element</b>. To může způsobovat problémy, protože se tak odstavec může uzavřít jinde, než autor stránky zamýšlel.</p>

<p>V následujícím příkladu bude odstavec ukončen <a href="/seznamy#ul">seznamem <code>&lt;ul></code></a> a ukončovací značka „<code>&lt;/p></code>“ <b>bude ignorována</b>.</p>

<pre><code>&lt;p>
  Text v odstavci.
  <b>&lt;ul></b>
    &lt;li>Pokus o položku seznamu v odstavci
  &lt;/ul>
  Domnělé pokračování odstavce
&lt;/p></code></pre>








<p>Stejně tak dokáže odstavec předčasně ukončit i značka <code>&lt;div></code>, <a href="/nadpisy">nadpisy <code>&lt;h1–6></code></a>, seznamy, tabulky, bloková citace, další spousta značek a nebo <b>jiný odstavec</b> – není tedy možné vytvořit <i>odstavec v odstavci</i>.</p>

<pre><code>&lt;p>První odstavec
&lt;p>Druhý odstavec ukončí ten první</code></pre>



<p>Pokud je potřeba stylovat blok, kde má být text i například seznam, nezbývá než použít jako obal element <code>&lt;div></code>.</p>


<h3 id="blokovy">Blokový element v HTML a CSS</h3>

<p>Je rozdíl mezi blokovým elementem v HTML a blokovou hodnotou <code>block</code> u CSS vlastnosti <a href="/display"><code>display</code></a>.</p>

<p>Zda nějaká značka odstavec ukončí, <b>není závislé na CSS</b>. Pro vložení visuálního bloku do odstavce jde tedy použít řádkovou značku – např. <code>&lt;span></code> – a nastavit ji <code>display: block</code>.</p>


<pre><code>&lt;p>
  Text v odstavci.
  <b>&lt;span style="display: block"></b>
    Jako blok.
  &lt;/span>
  Pokračování odstavce.
&lt;/p></code></pre>









<h2 id="atributy">Atributy odstavce</h2>

<p>Odstavec podporuje pouze <a href="/obecne-atributy">obecné atributy</a>. K tomu navíc:</p>

<dl>
  <dt id="align"><code>align</code></dt>
  <dd>
    <p>Dřívější HTML specifikace uváděly atribut <code>align</code> pro zarovnání obsahu v odstavci. Atribut stále funguje, jde nahradit CSS vlastností <a href="/text-align"><code>text-align</code></a>. V HTML5 je <a href="/validita">nevalidní</a>.</p>
    
    <div class="live">
      <p align="left">Odstavec zarovnaný vlevo (výchozí chování).</p>
      <p align="right">Odstavec zarovnaný vpravo.</p>
      <p align="center">Odstavec zarovnaný na střed.</p>      
    </div>
  </dd>
</dl>






<h2 id="styl">Styl odstavce</h2>

<p>Ve výchozích stylech má odstavec horní a dolní odsazení (CSS vlastnost <a href="/margin"><code>margin</code></a>).</p>

<p>Symbolický zápis:</p>

<pre><code>p {
  margin: 1em 0;
}</code></pre>





<p>Při umístění <b>dvou odstavců za sebou</b> se potom odsazení tzv. <a href="/margin#spojovani"><i>slévá</i></a>. Tj. mezi dvěma odstavci <b>nebude</b> mezera <code>2em</code>, ale jen <code>1em</code>, protože se v takovém případě používá hodnota rovna vyššímu <code>margin</code>u z obou elementů.</p>


<h3 id="reset">CSS reset</h3>

<p>Řada tvůrců u stránek odsazení odstavce <a href="/css-reset">resetují</a> na nulu.</p>

<pre><code>/* spousta elementů*/, 
p {
  margin: 0;
}</code></pre>






<p>A následně si odsazení nastavují podle umístění odstavce.</p>

<p>V praxi se nezdá být problém odstavci globálně <b>vůbec nic nenastavovat</b> a ponechat mu výchozí hodnoty, které jsou zpravidla použitelné.</p>



<h3 id="prvni-radek">Odsazení prvního řádku</h3>

<p>U textů v českých knihách nebo novinách bývá zvykem, že se odstavec tvoří <b>odsazením začátku řádku</b>:</p>

<p><img src="/files/odstavec/noviny-odstavec.jpg" alt="Příklad odstavců v novinách" class="border"></p>



















<p>Na webu není potřeba <b>šetřit papírem a místem</b>, takže styl odstavců zpravidla sestává z <b>horního a dolního odsazení</b> realisované CSS vlastností <a href="/margin"><code>margin</code></a>.</p>

<div class="live">
  <p>První odstavec.</p>
  
  <p>Druhý odstavec.</p>
</div>




<p>Případné <b>odsazení prvního řádku</b> jde ale snadno vytvořit vlastností <code>text-indent</code>.</p>

<div class="live">
  <style>
    .odsazeny {
      text-indent: 1em;
      max-width: 20em;
    }
  </style>
  <p class="odsazeny">Delší první odstavec, který je přes více řádků. První řádek odstavce je odsazen pomocí CSS.</p>
  
  <p class="odsazeny">Krátký odstavec.</p>
</div>

<p>Občas se toto odsazování ještě vylepšuje tak, že se zleva neodsazuje <b>první odstavec po nadpisu</b> nebo jiném bloku; jde toho docílit CSS <a href="/css-selektory#primy-sourozenec">selektorem přímého sourozence</a> (funkční od <b>IE 7</b>).</p>

<pre><code>p + p {
 text-indent: 1em;
}</code></pre>



<p>Zleva bude odsazen pouze odstavec, který následuje po odstavci. <a href="https://kod.djpw.cz/efob">Ukázka</a>.</p>



<h2 id="mimo-odstavec">Text mimo odstavec</h2>

<p>Odsazení odstavce se často hodí, takže je docela pohodlné do něj obalovat jakýkoliv text. Třeba položky <a href="/formulare">formuláře</a>:</p>

<pre><code>&lt;p>
  &lt;label>Jméno:</code> &lt;input name="jmeno">&lt;/label>
&lt;/p></pre>



<p>Striktní specifikace HTML 4.01 dokonce zakazovala do některých kontextů obsah bez použití odstavce vůbec umístit.</p>

<p>Třeba při vložení prostého textu přímo do <code>&lt;body></code>:</p>

<p><img src="/files/odstavec/bez-odstavce.png" alt="Zakázaný text mimo odstavec" class="border"></p>














<h2 id="rucni">„Ruční“ tvoření odstavce</h2>

<p>Simulovat podobu odstavců jde teoreticky <b>zalomením řádku</b> <a href="/odradkovani#br">značkou <code>&lt;br></code></a>.</p>

<pre><code>Text
<b>&lt;br>&lt;br></b>
Další text</code></pre>





<p>Výsledek se potom vzhledově blíží k použití odstavců:</p>

<div class="live no-source">
  Text
<br><br>
Další text
</div>



<p>Jedná se ale o nouzové řešení, <b>když není možné odstavec použít</b>, jinak je dobré se tomu vyhnout.</p>

<p>Značka <code>&lt;br></code> by se nikdy neměla používat k visuálnímu odsazování, ale skutečně jen k <b>zalomení</b>.</p>




<h2 id="odsazeni">Odsazení odstavcem</h2>

<p>Vytvářením prázdných odstavců jde rychle zvyšovat <b>svislý odstup</b> mezi částmi webu.</p>

<p>Dosahuje se toho prázdným odstavcem s <b>pevnou mezerou</b> <code>&amp;nbsp;</code>:</p>

<pre><code>&lt;p>&amp;nbsp;&lt;/p></code></pre>




<p>Občas takový kód leze z <a href="/wysiwyg">WYSIWYG editorů</a>. V praxi je dobré se tomu vyhnout – takové „odsazení“ je do budoucna většinou špatně udržovatelné.</p>

<div class="live no-source">
  <p>Obsah.</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>Další obsah odsazený odstavci.</p>
</div>