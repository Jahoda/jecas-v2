---
title: "Nový řádek v HTML a CSS"
headline: "Odřádkování v HTML a CSS"
description: "Jak v HTML, HTML atributu nebo CSS vložit nový řádek."
date: "2015-03-04"
last_modification: "2015-03-08"
status: 1
tags: ["css", "html", "napady"]
format: "html"
---


<h2 id="br">Značka <code>&lt;br></code></h2>

<p>Jelikož je běžné odřádkování klávesou <kbd>Enter</kbd> v HTML kódu většinou chápáno jako <i>nějaký bílý znak</i> <b>bez zvláštního významu</b>, pro vynucení nového řádku slouží značka <code>&lt;br></code> (má zakázanou <a href="/html-znacky#koncova-zakazana">koncovou značku</a>).</p>

<pre><code>&lt;p>
  První řádek<b>&lt;br></b>Druhý řádek
&lt;/p></code></pre>






<p>Výjimkou, kdy se na odřádkování a jiné bílé znaky dbá, je použití CSS předpisu <code>white-space: pre</code> – takový styl má jako výchozí značka <a href="/vypis-kodu"><code>&lt;pre></code></a>.</p>

<p>Následující kód se tak zobrazí stejně jako při použití <code>&lt;br></code>. Každá mezera nebo odřádkování hraje svou roli, proto se konec a začátek značky <code>&lt;p></code> musí <i>nalepit</i> na obsah.</p>

<pre><code>&lt;p 
  style="<b>white-space: pre</b>"
<i>></i>První řádek
Druhý řádek<i>&lt;</i>/p></code></pre>





<p>Takový postup je lehce riskantní, protože bílé znaky může narušit editor při formátování kódu nebo případná minifikace HTML kódu.</p>

<p>Značka <code>&lt;br></code> by se neměla používat k vytváření odsazení – k tomu slouží CSS vlastnost <a href="/margin"><code>margin</code></a>. Nový řádek jde vytvořit i obalením obsahu do blokového elementu (CSS předpis <a href="/display#block"><code>display: block</code></a>).</p>

<pre><code>&lt;div>První řádek&lt;/div>
&lt;div>Druhý řádek&lt;/div></code></pre>





<p>Elegantnější je ale většinou použít <code>&lt;br></code> a členit textu do odstavců (<code>&lt;p></code>).</p>


<h2 id="atribut">Nový řádek v HTML atributu</h2>

<p>V některých případech je potřeba přidat <b>zalomení řádku</b> do HTML atributu – nejčastěji do obecného atributu <code>title</code>. Existuje více možností.</p>




<h3 id="entita">Entita <code>&amp;#10;</code></h3>

<p>Nejvýhodnější se zdá být entita <code>&amp;#10;</code>, která na daném místě vytvoří nový řádek.</p>

<pre><code>&lt;span 
  title="První řádek<b>&amp;#10;</b>Druhý řádek"
>
  Text
&lt;/span></code></pre>

<div class="live">
<p><span 
  title="První řádek&#10;Druhý řádek"
  class="help"
>
  Entita <code>&amp;#10;</code>
  </span></p>

</div>



<p>Kromě v atributu funguje toto zalomení i ve značce s nastaveným zachováváním bílých znaků (<code>white-space: pre</code>). Místo zalomení řádku v kódu stačí přidat entitu <code>&amp;#10;</code> a výsledek je stejný.</p>




<h3 id="odradkovani">Odřádkování v kódu</h3>

<p>Nový řádek v atributu se vytvoří i v případě, že bude odřádkování přímo ve zdrojovém HTML kódu.</p>

<pre><code>&lt;span 
  title="První řádek
Druhý řádek"
>
  Text
&lt;/span></code></pre>

<div class="live">

<p><span 
  title="První řádek
Druhý řádek"
  class="help"
>
  Odřádkování v kódu
  </span></p>
</div>

<h3 id="n">Odřádkování <code>\n</code> nefunguje</h3>

<p>V programovacích jazycích se často pro nový řádek používá sekvence znaků <code>\n</code>. Jelikož se v HTML pro escapování používají <a href="/entity">entity s <code>&amp;</code> na začátku</a>, <b>nebude</b> tento postup fungovat a <code>\n</code> se normálně vypíše.</p>

<div class="live"> 
<p><span 
  title="První řádek \n Druhý řádek"
  class="help"
>
  Odřádkování pomocí <code>\n</code>
  </span></p>  
</div>


<h2 id="textarea">Odřádkování v <code>&lt;textarea></code></h2>

<p>Textová oblast pro psaní textu – <a href="/textarea"><code>&lt;textarea></code></a> – má výchozí styl <code>white-space: pre</code>, takže se v ní nový řádek vytvoří buď odřádkováním přímo v kódu nebo entitou <code>&amp;#10;</code>.</p>

<pre><code>&lt;textarea>První řádek<b>
</b>Druhý řádek<b>&amp;#10;</b>Třetí řádek&lt;/textarea></code></pre>


<h3 id="placeholder">Atribut <code>placeholder</code></h3>

<p>U atributu placeholder je postup stejný jako u <code>&lt;textarea></code> – nový řádek v kódu i entita <code>&amp;#10;</code>. Zalomení řádku v <code>placeholder</code>u ale nefunguje ve staré <b>Opeře 12</b> a ani ve <b>Firefoxu 38</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/vglb">Test zalomení obsahu atributu <code>placehoder</code></a></li>
  </ul>
</div>


<h3 id="pocet">Počet řádků</h3>

<p>Počet řádků v <code>&lt;textarea></code> jde spočítat JavaScriptem:</p>

<div class="internal-content">
  <ul>
    <li><a href="/pocet-znaku">Počet znaků a slov v textu</a> – počítání nejen odřádkování v textu</li>
  </ul>
</div>


<h2 id="css">Zalomení řádku v CSS</h2>

<p>V CSS se potřeba vypsání nového řádku týká například vlastnosti <a href="/content-attr"><code>content</code></a> (při použití přes <code>:before</code>/<code>:after</code>). Kaskádové styly nepodporují uvnitř hodnoty vlastnosti řádek zalomit a ani HTML entity, takže se na to musí jít jinak. Řešením je řetězec „<code>\a</code>“. Zároveň je nutné přidat <code>white-space: pre</code>, aby se zalomení vykreslilo.</p>

<pre><code>element:before {
  content: 'První řádek <b>\a</b> Druhý řádek';
  white-space: pre;
}</code></pre>


<p>Tak jde vypsat víceřádkový text do vlastnosti <code>content</code>.</p>

<div class="live">
  <style>
    .zalomeny:before {
      content: 'První řádek \a Druhý řádek';
      white-space: pre;
    }
  </style>
  <span class="zalomeny"></span>
</div>

