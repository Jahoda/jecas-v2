---
title: "CSS 3 selektory"
headline: "Seznam všech CSS 3 selektorů"
description: "V CSS 3 je spousta selektorů, které s postupným mizením starších prohlížečů může dávat smysl znát."
date: "2013-05-18"
last_modification: "2013-05-18"
status: 1
tags: ["css", "selektory-css"]
format: "html"
---

<p>Podpora „Vše“ znamená všechny relativně běžně používané prohlížeče (cca od Internet Exploreru 6). Některé selektory je možné ve starších IE <a href="/css3-ie">rozběhat JavaScriptem</a>.
<div>
<span id="css-selektory-toggle"></span>
<script>
var btn = document.createElement('button');
btn.textContent = 'Přepnout ukecanost';
btn.onclick = function() { this.parentNode.parentNode.className = this.parentNode.parentNode.className == '' ? 'filter' : ''; };
document.getElementById('css-selektory-toggle').appendChild(btn);
</script>
<table>
 <thead>
  <tr>
   <th class=top>Zápis/Název

   <th class=meaning>Význam

   <th class=center>Podpora
 <tbody>
  <tr id='hvezdickovy'>
   <td class=top><code>*</code><p><a href="#hvezdickovy">hvězdičkový selektor</a>

   <td class=meaning>Libovolný element.
    <p>Všechny elementy na stránce budou červeně.
    <pre><code>* {color: red}</code></pre>
  <p>Všechny elementy v odstavci budou modré.
 <pre><code>p * {color: blue}</code></pre>

    <td class=center>Vše

   

  <tr id="typovy">
   <td class=top><code>E</code><p><a href="#typovy">typový selektor</a>

   <td class=meaning>Všechny elementy <code>E</code> kdekoliv na stránce.
    <pre><code>div {color: red} /* všechny &lt;div>y budou červené */</code></pre>

    <td class=center>Vše

   

  <tr id="atributovy">
   <td class=top><code>E[atribut]</code><p><a href="#atributovy">atributový selektor</a>

   <td class=meaning>Element <code>E</code> s libovolným (ale nastaveným) atributem <code>atribut</code>.
    <pre><code>h1[id] {color: red} /* nadpisy s identifikátorem budou červené */</code></pre>
  <p>U elementů, které mají nějaký výchozí typ se tento selektor chová nejednotně napříč prohlížeči – Explorerové 7 a 8 chytí na <code>[type]</code> nebo <code>[type='text']</code> i <code>&lt;input></code> bez uvedeného typu (<a href="http://fiddle.jshell.net/DLsDe/show/">ukázka</a>).
    <td class=center>IE 7 +

   

  <tr id="atributovy-hodnota">
   <td class=top><code>E[atribut="hodnota"]</code><p><a href="#atributovy-hodnota">atributový s hodnotou</a>

   <td class=meaning>Element <code>E</code> s atributem <code>atribut</code> nastaveným na <code>hodnota</code>.
    <pre><code>/* checkboxy budou červené */
input[type=checkbox] {background: red}</code></pre>


   <td class=center>IE 7 +
    

   

  <tr id="atributovy-mezerovy">
   <td class=top><code>E[atribut~="hodnota"]</code><p><a href="#atributovy-mezerovy">atributový mezerový</a>

   <td class=meaning>Element <code>E</code>, u kterého je jeden z vícenásobných atributů (jednotlivé části atributu jsou odděleny mezerou) <code>atribut</code> roven hodnotě <code>hodnota</code> .
    <pre><code>div[class~="active"] {color}</pre></code>
    <p>Zvýrazní aktivní položku HTML kódu.
      <pre><code>&lt;div class='item <b>active</b>'></code></pre>
      <p>Selektor přesného atributu by nezafungoval.
    <td class=center>IE 7+
    

   

  <tr id="atributovy-zacinajici">
   <td class=top><code>E[atribut^="hodnota"]</code><p><a href="#atributovy-zacinajici">atributový začínající na</a>

   <td class=meaning>Element <code>E</code> s atributem <code>atribut</code> začínající na <code>hodnota</code>.
    <p>Odkazy s protokolem HTTPS budou červené.
    <pre><code>a[href^="https"] {color: red}</code></pre>
<td class=center>IE 7+
    

   

  <tr id="atributovy-koncici">
   <td class=top><code>E[atribut$="hodnota"]</code><p><a href="#atributovy-koncici">atributový končící na</a>

   <td class=meaning>Element <code>E</code> s atributem <code>atribut</code> končícím na <code>hodnota</code>.
  <p>Odkaz na PDF soubor bude červený.
    <pre><code>a[href$=".pdf"] {color: red}</code></pre><td class=center>IE 7+
    

   

  <tr id="atributovy-obsahujici">
   <td class=top><code>E[atribut*="hodnota"]</code><p><a href="#atributovy-obsahujici">atributový obsahující</a>

   <td class=meaning>Element <code>E</code>  s atributem <code>atribut</code> obsahující řetězec <code>hodnota</code>. 
    <pre><code>a[href*=".php"] {color: red}</code></pre>
    <p>Odkaz na <code>*.php</code> soubor bude červený, odkaz může mít nějaké parametry za otazníkem.
    <p>(Rozumné využití <a href="/css-vyhledavani">CSS vyhledávání</a>.)
    <td class=center>IE 7+
    

   

  <tr id="atributový-spojovnikovy">
   <td class=top><code>E[atribut|="en"]</code><p><a href="#atributový-spojovnikovy">atributový spojovníkový</a>

   <td class=meaning>Element <code>E</code>  s atributem <code>atribut</code>, který bude mít jednotlivé části atributu odděleny spojovníkem a začíná na <code>en</code>.
  <p>Není potřeba používat více tříd (<code>&lt;span class='icon home'></code>).
    <pre><code>span[class|="icon"] {display: block; width: 16px; height: 16px}
.icon-home {background: url("home.png")}
.icon-about {background: url("about.png")}</code></pre>
    <pre><code>&lt;span class='icon-home'>&lt;/span>
&lt;span class='icon-about'>&lt;/span></code></pre>
  


    <td class=center>IE 7+
    

   

  <tr id="korenovy">
   <td class=top><code>E:root</code><p><a href="#korenovy">kořenový</a>

   <td class=meaning>Kořenový element <code>E</code> (<code>&lt;html></code>).
    <p>Nedává v HTML moc smysl, protože je to element <code>&lt;html></code>, který je na stránce vždy jeden, tak proč nepoužít <code>html {}</code>. 
  <p>Snad jen kvůli hackování starších prohlížečů:
    <pre><code>html {color: red}
:root {background: blue}</code></pre>
  <p>V podporujících prohlížečích bude stránka modrá, v nepodporujících červená.
<td class=center>IE 9+<br><a href='http://fiddle.jshell.net/knYZP/show/'>Ukázka</a>
    

   

  <tr id="n-ty-potomek">
   <td class=top><code>E:nth-child(n)</code><p><a href="#n-ty-potomek">n-tý potomek</a>

   <td class=meaning>Element <code>E</code>, který je n-tým potomkem nadřazeného elementu.
  <p>Druhý odstavec (čísluje se od jedničky) bude červený:
    <pre><code>p:nth-child(2) {color: red}</code></pre>
<p>Pseudo-třída <code>nth-child</code> je ale mocnější, lze s ní řešit různé věci jako odlišení sudých/lichých řádků, každého n-tého řádku apod.
  <pre><code>tr:nth-child(odd) {color: red}  /* lichý řádek tabulky */
tr:nth-child(even) {color: blue} /* sudý řádek tabulky */

tr:nth-child(4n+1) {color: green} /* každý čtvrtý řádek */
</code></pre>
     <p>Vyzkoušet si tyto selektory je pohodlně možné na <a href="http://nth-test.com/">nth-test.com</a>.</p>
    <td class=center>IE 9+
    

   

  <tr id="n-ty-potomek-odkonce">
   <td class=top><code>E:nth-last-child(n)</code><p><a href="#n-ty-potomek-odkonce">n-tý potomek od konce</a>

   <td class=meaning>To samé jako <code>nth-child</code>, jen se elementy číslují od konce.
<td class=center>IE 9+

   

  <tr id="n-ty-typ">
   <td class=top><code>E:nth-of-type(n)</code><p><a href="#n-ty-typ">n-tý steného typu</a>

   <td class=meaning>Podobné jako <a href="#n-ty-potomek"><code>nth-child</code></a>, jen nejde o potomky, ale o sourozence stejného typu (stejné značky).
    <td class=center>IE 9+
    
   

  <tr id="n-ty-typ-odkonce">
   <td class=top><code>E:nth-last-of-type(n)</code><p><a href="#n-ty-typ-odkonce">n-tý steného typu od konce</a>

   <td class=meaning>Totéž co <code>nth-of-type</code>, jen se sourozenci počítají od konce.
    <td class=center>IE 9+

   

  <tr id="prvni-posledni-potomek">
   <td class=top><code>E:first-child</code><br><code>E:last-child</code><p><a href="#prvni-posledni-potomek">první/poslední potomek</a>

   <td class=meaning><a href='/first-last-child'>První nebo poslední potomek</a> elementu <code>E</code>.
  <p>První položka seznamu bude červená a poslední modrá.
    <pre><code>ul li:first-child {color: red} 
ul li:last-child {color: blue}</code></pre><td class=center><span class=help title='last-child až IE 9+'>IE 7+<br>IE 9+</span>
   
   

  <tr id="prvni-posledni-typ">
   <td class=top><code>E:first-of-type</code><br><code>E:last-of-type</code><p><a href="#prvni-posledni-typ">první/posledni typ</a>

   <td class=meaning>První/poslední element <code>E</code> daného typu v rámci společného rodiče.
  <p>První nadpis první úrovně na stránce bude červený.
    <pre><code>h1:first-of-type {color: red}</code></pre>
    <p>Poslední nadpis první úrovně bude modrý.
 <pre><code>h1:last-of-type {color: blue}</code></pre><td class=center>IE 9+<br><a href="https://kod.djpw.cz/lcgb">Ukázka</a>
   
   

  <tr id="jedinacek">
   <td class=top><code>E:only-child</code><p><a href="#jedinacek">jedináček</a>

   <td class=meaning>Zachytí takový element <code>E</code>, který je jedináček – nemá žádné sourozence = jeho rodičovský element nemá jiné potomky.
  <p>Nadpis 1 bude jedináčkem.
    <pre><code>&lt;div>
  &lt;h1>Nadpis 1&lt;/h1>
&lt;/div></code></pre><td class=center>IE 9+
   

  <tr id="typovy-jedinacek">
   <td class=top><code>E:only-of-type</code><p><a href="#typovy-jedinacek">typový jedináček</a>

   <td class=meaning>Element <code>E</code>, který nemá žádné sourozence stejného typu.
  <p>Tedy CSS kód:
    <pre><code>h1:only-of-type {color: red}
p:only-of-type {color: blue}</code></pre>
  <p>Obarví v následujícím HTML jen „Nadpis 2“ červeně a „Text 3“ modře.
    <pre><code>&lt;h1>Nadpis 1&lt;/h1>
&lt;div>
  &lt;h1>Nadpis 2&lt;/h1>
  &lt;p>Text.
  &lt;p>Text.
&lt;/div>
&lt;h1>Nadpis 3&lt;/h1>
&lt;p>Text 3</code></pre><td class=center>IE 9+<br><a href="https://kod.djpw.cz/qzvb">Ukázka</a>

   

  <tr id="prazdny">
   <td class=top><code>E:empty</code><p><a href="#prazdny">prázdný</a>

   <td class=meaning>Element <code>E</code>, který nemá žádné potomky a ani neobsahuje text.

    <pre><code>&lt;span>&lt;/span></code></pre>
<pre><code>span:empty {display: block; padding: 10px; background: red}</code></pre>
    <td class=center>IE 9+<br><a href="http://fiddle.jshell.net/7BQMb/show/">Ukázka</a>
      
      
  <tr id="validace">
    <td class=top><code>E:valid</code><br><code>E:invalid</code><p><a href="#validace">validace</a>

      <td class=meaning>Zachytí, zda je <code>&lt;input></code> řádně vyplněn. Buď v souladu s <a href="/atribut-pattern">atributem <code>pattern</code></a> nebo s nějakým typem <code>&lt;input></code>u (<code>url</code>, <code>email</code> apod.).
    <td class=center>IE 10+<br><a href="https://kod.djpw.cz/ees">Ukázka</a>      
       

  <tr id="odkazove-pseudotridy">
   <td class=top><code>E:link</code><br> <code>E:visited</code><p><a href="#odkazove-pseudotridy">odkazové pseudotřídy</a>

   <td class=meaning>Element <code>E</code>, tedy odkaz <code>&lt;a></code>, který (ne)byl navštíven.
    <p>Kromě přebíjení selektorů nemá moc smysl <code>:link</code> používat, stačí prosté:
    <pre><code>a {color: red}
a:visited {color: blue} /* navštívené odkazy budou modré */</code></pre><td class=center>Vše

   

  <tr id="uzivatelske-akce">
   <td class=top><code>E:active</code><br>
    <code>E:hover</code><br>
    <code>E:focus</code><p><a href="#uzivatelske-akce">pseudotřídy uživatelských akcí</a>

   <td class=meaning>Element <code>E</code> (může být i jiný než odkaz).
    <dl>
      <dt><code>:hover</code>
        <dd>Při najetí myší na element.
      <dt><code>:active</code>
        <dd>Při kliknutí na element. Ve starších Explorerech funguje jako <code>:focus</code>
      <dt><code>:focus</code>
        <dd>Pokud je element vybrán, například při kliknutí do formulářového pole.
    </dl>
    <p>Pro lepší uživatelský komfort bývá vhodné odkazy zvýraznit kromě <code>:hover</code>u i při <code>:focus</code>u (popř. <code>:active</code>).
    <pre><code>a:hover, a:focus, a:active {/* zvýraznění odkazu */}</code></pre><td class=center><span class=help title='V IE 6 funguje jinak :active a :focus'>Vše</span>
     
     
     
     
     
     
     
     
     
     
     
     
  <tr id="focus-within">
   <td class=top><code>E:focus-within</code>

   <td class=meaning>Element <code>E</code>, ve kterém se nachází nějaký prvek, který má <code>:focus</code>.
     <p>Hodí se pro vytváření rozklikávacích nabídek nezávislých na JavaScriptu.</p>
    <td class=center><span class=help title='Firefox 52, Chrome 60, Opera 47'>Mimo <b>IE</b>/<b>Edge</b><br><a href="https://kod.djpw.cz/sojc">Ukázka</a></span>     


   

  <tr id="zamereni">
   <td class=top><code>E:target</code><p><a href="#zamereni">pseudotřída zaměření</a>

   <td class=meaning>Element <code>E</code>, na který <a href='/zvyrazneni-kotvy'>míří <code>#kotva</code> v adrese</a>.

    <pre><code>:target {color: red} /* element s kotvou při odkázání zčervená */</code></pre><td class=center>IE 9+

   

  <tr id="lang">
   <td class=top><code>E:lang(cs)</code><p><a href="#lang">jazyková pseudotřída</a>

   <td class=meaning>Potomek elementu s nastaveným atributem <code>lang</code> na <code>cs</code>.

    <pre><code>&lt;div lang='cs'>
      &lt;p>Text &lt;span>text&lt;/span>
&lt;/div></code></pre>
   <p>Tento <code>&lt;span></code> <i>podědí</i> atribut <code>lang</code> a lze jej potom zaměřit a obarvit na červeno pomocí:
    <pre><code>span:lang(cs) {color: red}</code></pre>
    <p>Domnívám se, že tento selektor nenabízí nic, co by nešlo udělat bez něj.
<td class=center>IE 8+<br><a href="http://fiddle.jshell.net/eypdm/show/">Ukázka</a>

   

  <tr id="disabled">
   <td class=top><code>E:enabled</code><br><code>E:disabled</code><p><a href="#disabled">povolená/zakázaná pseudotřída</a>

   <td class=meaning>Tímto selektorem lze ovlivnit vzhled formulářových polí, která (ne)jsou zablokována atributem <code>disabled</code>.

    <pre><code>input:disabled {color: red} /* zablokvaný &lt;input> bude červený */</code></pre><td class=center>IE 9+, nejde v Opeře<br><a href="https://kod.djpw.cz/vlb">Ukázka</a>
   

  <tr id="checked">
   <td class=top><code>E:checked<!--<br>E:indeterminate--></code><p><a href="#checked">pseudotřída zaškrtnutí</a>

   <td class=meaning>Zachytí radio button nebo checkbox, který je vybrán, respektive zaškrtnut.
    <pre><code>input:checked {background: red} /* zvolený &lt;input> bude červený */</code></pre>
<p>Opakem by měla být pseudotřída <code>indeterminate</code>, nicméně zatím nikde nefunguje. Lze využít <a href="#negace">negace <code>:not(:checked)</code></a>.
<p>S tímto selektorem lze v CSS vytvářet <a href='/css-filtrovani-dat'>docela zajímavé věci</a>.
    <td class=center>IE 9+<br><a href="http://fiddle.jshell.net/aPu47/show/">Ukázka</a>

   

  <tr id="first-letter-line">
   <td class=top><code>E::first-line</code><br><code>E::first-letter</code><p><a href="#first-letter-line">pseudoelement prvního písmena/řádku</a>

   <td class=meaning>První řádek/písmeno elementu <code>E</code>.

    <pre><code>p::first-line {color: red} /* první řádek zčervená */
p::first-letter {color: blue} /* první písmeno zmodrá */</code></pre>
<p>Zajímavé je, že s dvěmi dvojtečkami je zápis funkční až od IE 9 (<a href="http://fiddle.jshell.net/StwHy/show/">ukázka</a>), ale jen s jednou dvojtečkou funguje všude.
<td class=center>Všude<br><a href="http://fiddle.jshell.net/ecrAb/show/">Ukázka</a>
   

  <tr id="before-after">
   <td class=top><code>E::before</code><br><code>E::after</code><p><a href="#before-after">obsahové pseudo elementy</a>

   <td class=meaning>Slouží ke generování nového elementu před/za elementem <code>E</code>.
    <p>Lze tak například vygenerovat element určený k ukončení obtékání nebo <a href='http://jecas.cz/content-attr'>generovat obsah vlastností <code>content</code></a>.
      
      <p>Kvůli podpoře ve starších <b>IE</b> je výhodnější používat zápis jen s jednou dvojtečkou.</p>

    <pre><code>/* přidá text „Nepřehlédněte“ před odstavce */
p:before {content: "Nepřehlédněte: "}</code></pre>
<p>Nefunguje u některých elementů, které nemohou obsahovat text, jako <code>&lt;img></code>, <code>&lt;br></code> nebo <code>&lt;hr></code>.
<td class=center>IE 8+


   

  <tr id="id-class">
   <td class=top><code>E.trida</code><br> <code>E#idecko</code><p><a href="#id-class">identifikátor vs. třída</a>

   <td class=meaning>Element <code>E</code> s třídou <code>trida</code>, respektive id <code>idecko</code>.
    <p>Z pohledu CSS mezi nimy není přílišného rozdílu (třída má menší váhu). Podle specifikací by ID mělo být unikátní a použitou pouze jednou, prohlížečům to je v CSS celkem jedno.
    <p>Jedno to není JavaScriptu při používání metody <code>getElementById</code> nebo při odkazování na #kotvy. Pro přehlednost a jistotu, že ID nebude kvůli JS použito vícekrát, je vhodné řešení, kdy CSS používá jen třídy. A identifikátory jsou jen pro JavaScript a kotvy na stránce. 
    <pre><code>.trida {color: red}
#idecko {color: blue}</code></pre>
<pre><code>&lt;p class='trida'>Červený text
&lt;p id='idecko'>Modrý text</code></pre>
<td class=center>Vše

   

  <tr id="negace">
   <td class=top><code>E:not(s)</code><p><a href="#negace">negace</a>

   <td class=meaning>Element <code>E</code> který nevyhovuje selektoru v závorkách <code>not</code>.
<p>Nezaškrtnutý/nevybraný radio button/checkbox bude mít šedivé pozadí.
    <pre><code>input:not(:checked) {background: grey}</code></pre><td class=center>IE 9+

   

  <tr id="libovolny-potomek">
   <td class=top><code>E F</code><p><a href="#libovolny-potomek">libovolný potomek</a>

   <td class=meaning>Element F, který je ve stromu dokumentu na větvi elementu <code>E</code>. Jinak řečeno element <code>F</code> má nějakého libovolně vzdáleného předka <code>E</code>.
    <p>Odkaz v nadpise bude červený:
    <pre><code>h1 a {color: red}</code></pre>
  <p>Odkaz v seznamu bude modrý:
     <pre><code>ul a {color: blue}</code></pre>
     <p>Taktéž by fungovalo:
      <pre><code>ul <b>li</b> a {color: blue}</code></pre>
      <p>… ale je to zbytečně prodlužování.

    <td class=center>Vše


   

  <tr id="primy-potomek">
   <td class=top><code>E &gt; F</code><p><a href="#primy-potomek">přímý potomek</a>

   <td class=meaning>Element <code>F</code> je <b>přímým</b> potomkem elementu <code>E</code>.

    <pre><code>li > span {color: red}</code></pre>
<p>Obarví element &lt;span> v kódu <pre>
<code>&lt;ul>
  &lt;li>&lt;span>Text&lt;/span>
&lt;/ul></code></pre>
<p>Ale už ne <code>&lt;li>&lt;a href='#'>&lt;span>Text&lt;/span>&lt;/a></code>, protože je mezi <code>&lt;li></code> a <code>&lt;span</code>em odkaz.

    <td class=center>IE 7+
   

  <tr id="primy-sourozenec">
   <td class=top><code>E + F</code><p><a href="#primy-sourozenec">přímý sourozenec</a>

   <td class=meaning>Element <code>F</code>, který přímo následuje element <code>E</code>.

    <pre><code>div + ul {color: red}</code></pre>
<p>Obraví na červeno seznam, který bezprostředně sousedí s <code>&lt;div></code>em:
  <pre><code>&lt;div>Obsah&lt;/div>
&lt;ul>
…
&lt;/ul></code></pre>
<p>Pokud mezi <code>&lt;div></code>em a seznamem bude nějaký jiný element, seznam se neobarví.

    <td class=center>IE 7+

   

  <tr id="libovolny-sourozenec">
   <td class=top><code>E ~ F</code><p><a href="#libovolny-sourozenec">libovolný sourozenec</a>

   <td class=meaning>Element <code>F</code>, před kterým je někde ve stejné úrovni element <code>E</code>.
    <p>Narozdíl od selektoru <a href='#primy-sourozenec'>přímého sourozence</a> zachytí i seznam, který má před nějakým <code>&lt;div></code>em ve stejné úrovni libovolný počet jiných elementů.
<td class=center>IE 7+

  <tr id="fullscreen">
    <td class=top><code>:fullscreen E</code><p><a href="#fullscreen">fullscreen</a>

   <td class=meaning>Element <code>E</code> při zobrazení ve fullscreenu (<b>režimu celé obrazovky</b>).
     <p>Selektor <code>:fullscreen</code> by měl umožňit zvláštní styl v celo-obrazovkovém režimu. Zapisuje se s <a href="/css-prefixy">prefixy</a>, ve <b>Firefoxu</b> a <b>Chrome</b> navíc se spojovníkem mezi „full“ a „screen“ — <code>:-moz-full<b>-</b>screen</code>, <code>:-webkit-full<b>-</b>screen</code> a <code>:-ms-fullscreen</code>.</p>
     <p>Bohužel se mi tuto funkčnost nepodařilo v žádném prohlížeči spustit (<a href="https://kod.djpw.cz/dqs">kód pro FF</a>). Nějaký popis <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:fullscreen"><code>:fullscreen</code></a>u je na MDN.</p>
<td class=center>IE 11+

    <tr id="indeterminate">
    <td class=top><code>E:indeterminate</code><p><a href="#indeterminate">indeterminate</a></p></td>
    <td class=meaning>
      <p>Funguje jen u značek <a href="/input#type-checkbox"><code>&lt;input type=checkbox></code></a> a <a href="/progress"><code>&lt;progress></code></a>.</p>
      <p>Má smysl pro vytváření třístavového <code>checkbox</code>u (<i>Vybrat vše</i>), 
        kdy <code>indeterminate</code> znamená, že jsou zaškrtnuty jen některé položky.</p>
      <p>Nastavit <i>neurčitý</i> stav je možné jen JavaScriptem.</p>
      <pre><code>document.getElementById("checkbox").indeterminate = true;</code></pre>
    </td>
    <td class=center>IE 9+<br><a href="https://kod.djpw.cz/jxs">Ukázka</a></td>
  </tr>
  
  
    <tr id="optional">
    <td class=top><code>E:optional</code><p><a href="#optional">optional</a></p></td>
    <td class=meaning>
      <p>Funguje jen u značek <a href="/input"><code>&lt;input></code></a>, které není povinné vyplnit, tj. nemají atribut <a href="/input#required"><code>required</code></a>.</p>
      <p><b>Opakem</b> je selektor <a href="#required"><code>:required</code></a>.</p>
    </td>
    <td class=center>IE 10+<br><a href="https://kod.djpw.cz/oys">Ukázka</a></td>
  </tr>  
  
      <tr id="required">
    <td class=top><code>E:required</code><p><a href="#required">required</a></p></td>
    <td class=meaning>
      <p>Funguje jen u značek <a href="/input"><code>&lt;input></code></a>, které <b>je povinné vyplnit</b>, tj. <b>mají</b> atribut <a href="/input#required"><code>required</code></a>.</p>
      <p>Opakem je selektor <a href="#optional"><code>:optional</code></a>.</p>
      <p>Pro zaměření políčka, které je správně/špatně vyplněno slouží selektory <a href="#validace">validace</a> (<code>:valid</code>/<code>:invalid</code>).</p>
    </td>
    <td class=center>IE 10+<br><a href="https://kod.djpw.cz/pys">Ukázka</a></td>
  </tr>  
    
        <tr id="placeholder">
          <td class=top><code>E::placeholder</code><p><a href="#placeholder">placeholder</a></p></td>
    <td class=meaning>
      <p>Umožnuje stylovat obsah <a href="/placeholder">atributu <code>placeholder</code></a> (zástupný znak v <a href="/input"><code>&lt;input></code>u</a>).</p>
    </td>
    <td class=center>IE 10+<br><a href="https://kod.djpw.cz/nldb">Ukázka</a></td>
  </tr>  
  
  
          <tr id="read-only">
          <td class=top><code>E:read-only</code><p><a href="#read-only">read-only</a></p></td>
    <td class=meaning>
      <p>Umožnuje stylovat <a href="/input#readonly"><code>&lt;input></code> s atributem <code>readonly</code></a>, který je určen jen ke čtení.</p>
      
      <pre><code>&lt;input <b>readonly</b>></code></pre>
      
      <p>Zaměřit <code>readonly</code> element se ale dá i přes <a href="#atributovy">atributový selektor</a>:</p>
      
      <pre><code>input[readonly] {}</code></pre>
    </td>
    <td class=center>Chrome, Firefox<br><a href="https://kod.djpw.cz/qldb">Ukázka</a></td>
  </tr>
  
          <tr id="read-write">
          <td class=top><code>E:read-write</code><p><a href="#read-write">read-write</a></p></td>
    <td class=meaning>
      <p>Umožnuje zaměřit <code>&lt;input></code>, který nemá atirbut <code>readolny</code>.</p>
      
      <p>Zajímavé je, že atribut <code>disabled</code> nevadí a takový <code>&lt;input></code> tedy selektor <code>read-write</code> zachytí.</p>
      
      <p>Pro starší prohlížeče je možné použít <a href="#atributovy">atributový</a> selektor s <a href="#negace">negací</a> (<b>IE 9+</b>):</p>
      
      <pre><code>input[type=text]:not([readonly]) {}</code></pre>
    </td>
    <td class=center>Chrome, Firefox<br><a href="https://kod.djpw.cz/rldb">Ukázka</a></td>
  </tr>  
  
          <tr id="default">
          <td class=top><code>E:default</code><p><a href="#default">default</a></p></td>
    <td class=meaning>
      <p>Zaměří <b>výchozí odesílací tlačítko</b>. Hodí se v případě, že je ve formuláři více tlačítek (<code>&lt;input type=submit></code>/<code>&lt;button></code>).</p>
      
      <p>Zvýrazněné bude to, které by se <i>použilo</i> při stiknutí <kbd>Enter</kbd>u.</p>
    </td>
    <td class=center>Chrome, Firefox<br><a href="https://kod.djpw.cz/sldb">Ukázka</a></td>
  </tr>   
</table>
      
      
</div>
  
<h2 id="sila">Síla selektorů</h2>  
  
<div class="external-content">
  <ul>
    <li><a href="http://specificity.keegan.st/">Specificity Calculator</a> – visuální znázornění síly CSS selektorů</li>
  </ul>
</div>  