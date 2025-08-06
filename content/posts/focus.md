---
title: "Proč a jak používat :focus stav"
headline: "Jak používat CSS stav <code>:focus</code>"
description: "Proč je důležité stylovat stav <code>:focus</code>. Jak toho automaticky docílit a jaké jsou s tím problémy."
date: "2017-09-21"
last_modification: "2018-05-16"
status: 1
tags: ["css", "formulare", "napady", "selektory-css"]
format: "html"
---

<p><a href="/odkaz">Odkazy</a>, <a href="/input"><code>&lt;input></code>y</a>, <a href="/button">tlačítka</a> a všechny ostatní libovolné elementy s nezáporným <a href="/tabindex">atributem <code>tabindex</code></a> mohou mít <code>:focus</code> stav.</p>



<p>V praxi to znamená, že po kliknutí nebo od<kbd>Tab</kbd>ování je daný element zaměřitelný přes selektor <code>:focus</code>.</p>


<pre><code>a:focus {
  /* styl vybraného odkazu */
}</code></pre>






<p>Pro uživatele <b>používající klávesnici</b> je to dost užitečné, protože hezky vidí, kde se nacházejí. Dobrá ovladatelnost jen z klávesnice bývá u <b>dobře přístupných webů</b> samozřejmostí.</p>



<h2 id="vychozi">Výchozí <code>:focus</code></h2>

<p>Prakticky všechny novější prohlížeče se snaží <i>focusovaný</i> element nějak zvýraznit, aby to uživatel poznal.</p>

<p><b>Chrome</b> a <b>Opera</b> tak činí 5px modrým rámečkem. <b>Edge</b> a <b>Firefox</b> potom 1px černým tečkovaným. Orámování je řešené vlastností <code>outline</code>. Ta dělá něco jako <code>border</code>, jen:</p>

<ol>
  <li>
    <p>Neovlivňuje obsah elementu, ale <i>rámeček</i> se dostane mimo.
    <br>
    <span style="outline: auto red">Neovlivňuje obsah elementu.</span></p>
  </li>
  
  <li>
    <p style="outline: auto blue"><span style="float: left; height: 3em; width: 10px"></span>Může dosáhnout i nepravidelných tvarů (v <b>Opeře</b> a <b>Chrome</b>).</p>
    <br clear="all">
  </li>
  
  <li>
    <p><i>Vyleze</i> i přes nastavené oříznutí přes <code>overflow: hidden</code>.</p>
  </li>
</ol>

<p>Pokud tedy autor CSS do výchozího <code>:focus</code>u nezasahuje, má od tvůrců prohlížečů tuto schopnost úplně „zadarmo“.</p>

<div class="external-content">
  <ul>
    <li><a href="https://allyjs.io/tests/focus-outline-styles/index.html#style=focus&key=text,radio,checkbox,textarea,button,link,div&browser=firefox,chrome,safari,ie11">Default Browser Focus Outline Styles</a> – přehled <code>:focus</code> stylů napříč prohlížeči</li>
  </ul>
</div>

<h2 id="vlastni">Vlastní styl pro <code>:focus</code></h2>

<p>Bohužel ne vždy si jde s výchozím stylem vystačit. Trpí několika problémy:</p>

<ol>
  <li>
    <p>Nemusí visuálně ladit k designu webu. Nebo nemusí být dostatečně kontrastní k pozadí na daném místě stránky.</p>
  </li>
  <li>
    <p>Vzhled se liší napříč prohlížeči.</p>
  </li>
  <li>
    <p>V některý případech se nehodí k tvaru tlačítek / ovládacích prvků. Typicky třeba u tlačítek s kulatými okraji.</p>
    <div class="live">
      <button style="border-radius: 15px; outline: auto red">Tlačítko</button>
    </div>
  </li>
</ol>

<h3 id="vypnuti">Vypnutí výchozího rámečku tlačítka</h3>

<blockquote>
  <p>Prosím vypnout ten ošklivý rámeček kolem tlačítek, který tam zůstává po kliknutí.</p>
</blockquote>







<p>Bývají častá slova autora visuálního návrhu při pohledu na jeho podobu převedenou do prohlížeče.</p>


<p>Návrhy vzhledu webů od grafiků se stavy pro <code>:focus</code> bývají spíš výjimkou než pravidlem (autor článku se s nakresleným <code>:focus</code> stavem ještě nesetkal), takže se na to snadno zapomene.</p>

<p><b>Vypnout?</b></p>

<pre><code>:focus {
  outline: none;
}</code></pre>







<p>Tento kód bohužel <i>vylévá vaničku i s dítětem</i>. Místo ošklivého rámečku nebude označení <code>:focus</code>u žádné a uživatel se při použití <kbd>Tab</kbd>u <b>ztratí na stránce</b>.</p>




<h3 id="automaticky">Skoro automatický <code>:focus</code></h3>

<p>Pokud se člověku nechce vymýšlet další styl prvků, je relativně dobré řešení převzít styl <code>:hoveru</code> (ten občas grafici namalují) a použít ho i pro <code>:focus</code>.</p>


<pre><code>a:hover,
<b>a:focus</b> {
  /* styly pro :hover i :focus */
}</code></pre>

<p>Stavy se sice od sebe nebudou lišit (to je trochu škoda), ale je to skoro bez práce.</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/Kilian/postcss-hocus">Postcss-hocus</a> – filtr pro PostCSS, který umožní oba stavy napsat na jeden řádek</li>
  </ul>
</div>









<p>V dávných dobách se do tohoto předpisu přidávala i třída <code>:active</code>, protože starší <b>IE</b> ji používal pro odkazy zaměřené <kbd>Tab</kbd>em. V roce 2017 a později už je to ale zbytečné až nežádoucí:</p>

<p>Stav <code>:active</code> (po stisknutí tlačítka myši) by měl být rovněž visuálně navržen a měl by mít jiný vzhled než <code>:hover</code>.</p>



<h2 id="jaky-styl">Jaký styl pro <code>:focus</code>?</h2>



<p>Nabízí se třeba změnit barvu nebo přidat rámeček okolo – pomocí <code>outline</code>.</p>

<p>Je-li potřeba rámeček s kulatými rohy, jde k tomu hezky použít 1px stín vytvořený vlastností <a href="/box-shadow"><code>box-shadow</code></a>.</p>




<h2 id="zustava">Zůstávání <code>:focus</code>u po kliknutí</h2>


<p>Bohužel i při pečlivém návrhu se při střetu s realitou zjistí smutná věc.</p>


<p>Vlastní <code>:focus</code> styl se <b>chová jinak</b>. Dá se říct, že jeho současná <b>implementace ve většině prohlížečů je rozbitá</b>.</p>


<p>Některé prvky po vybrání myší sice získají <code>:focus</code>, ale výchozí <code>outline</code> prohlížeče <b>se vůbec nezobrazí</b> – zobrazí se jen při zaměření prvků klávesnicí.</p>

<p>Odlišné chování při zaměření myší a klávesnicí se týká:</p>

<ul>
  <li>odkazů,</li>
  <li>tlačítek (<code>&lt;button></code> i <code>&lt;input type=submit></code>),</li>
  
  <li>zaškrtávacích polí typu <code>checkbox</code> a <code>radio</code>,</li>
  
  <li>volby rozsahu (<code>&lt;input type=range></code>),</li>
  
  <li>možná ještě něčeho?</li>
</ul>

<p>Tyto elementy po kliknutí myší <code>:focus</code>ovaný stav nemají.</p>

<p>Naopak následující <code>:focus</code>ovatelné prvky mají <code>outline</code> i po kliknutí:</p>

<ol>
  <li>skoro všechny textové, číslené, telefonní a podobné <code>&lt;input></code>y,</li>
  <li><a href="/textarea"><code>&lt;textarea></code></a>,</li>
  <li><a href="/select"><code>&lt;select></code></a>,</li>
  <li>obecný element s <code>tabindex</code>em (kromě <code>-1</code>)</li>
</ol>

<p>Styl <code>:focus</code>ovaného elementu po kliknutí může vypadat rušivě. Navíc se v tomto chování liší od výchozího chování v prohlížečích.</p>


<p>Jediné, co jde bezpečně měnit, aby styl pro <code>:focus</code> po kliknutí nezůstal, je <code>outline-color</code>. Změny jiných vlastností se projeví i po kliknutí.</p>




<h3 id="nereseni">(Ne)řešení</h3>

<p>Nějaké universální jednoduché řešení moc neexistuje. Nejsnazší je obvyklé nic nedělání: <b>měnit u výchozího rámečku jen barvu nebo vůbec nic</b>.</p>


<p>Jinak je potřeba využít JavaScript:</p>

<h4 id="blur">Vyvolání události <code>blur</code></h4>

<p>Po kliknutí na prvek u něj okamžitě zavolat <code>blur()</code> a tím zrušit <code>:focus</code>.</p>

<pre><code>$('a, button, input[type=checkbox], input[type=radio]').click(
  function () {
    $(this).blur();
  }
);</code></pre>













<p>Vypadá to relativně funkčně — dokonce si prohlížeče mimo <b>MS Edge</b> i pamatují, kde skončilo <kbd>Tab</kbd>ování, a jsou schopny navázat.</p>

<p>Bohužel to trochu mění chování, protože prvky po kliknutí už <b>skutečně ztratí focus</b> – takže třeba zaškrtávátko <code>checkbox</code> už nepůjde znovu odškrtnout/zaškrtnout <kbd>Mezerník</kbd>em. Stejně tak tlačítko <code>&lt;button></code> nepůjde z klávesnice vícekrát zmáčknou, to bude zvlášť problém u <a href="/inkrementace-inputu">+/&minus; tlačítek</a>.</p>

<p>A trochu bych se bál, že to bude přinášet obtížně zjistitelné problémy do budoucna.</p>



<h4 id="tridy">Přepínání tříd</h4>

<p>Nabízí se myšlenka třeba při kliknutí myší na políčko (<a href="/udalosti-mysi#onmousedown"><code>onmousedown</code></a>) přidat elementu třídu typu <code>is-mouse-focus</code> a při <code>onblur</code>u ji zase odebírat.</p>

<p>V selektoru pro <code>:focus</code> potom použít ještě <a href="/css-selektory#not"><code>:not</code></a>, aby se styly v tomto případě neaplikovaly.</p>


<p>Bohužel současná pravidla v prohlížečích jsou tak komplexní, že to úplně jednoduše zapsat nejde. Například zůstávání <code>:focus</code>u se liší u jednotlivých typů <code>&lt;input></code>ů – tlačítka, checkboxy, radia nebo rozsahy <code>:focus</code> mít nemají, ale všechno ostatní ano.</p>

<p>Dále je možné prvek <code>:focus</code>ovat i kliknutím jinam, tj. přes značku <a href="/label-for"><code>&lt;label></code></a>.</p>

<p>Touto problematikou se zabývají následující stránky:</p>

<div class="external-content">
  <ul>
    <li><a href="https://marcysutton.com/button-focus-hell/">Button Focus Hell</a> – řešení při vývoji Angular Material (nedostatečné)</li>
    <li>Chromium bugs: <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=271023">Outline should not appear on elements focused by mouse</a></li>
  </ul>
</div>




<h2 id="focus-visible">Pseudotřída <code>:focus-visible</code></h2>


<p>Specifikace (draft) CSS 4 selektorů počítá s doplněním <code>:focus</code>u o <code>:focus-visible</code>.</p>

<div class="external-content">
  <ul>
    <li>Selectors Level 4: <a href="https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo">The Input Focus-Ring Pseudo-class: :focus-visible</a></li>
  </ul>
</div>

<p>Až bude fungovat, bude se pravděpodobně používat místo současného <code>:focus</code>u.</p>

<p>Tato pseudotřída dokáže v závislosti na použitém rozhraní (myš/klávesnice/dotyk) určit, jestli je žádoucí, aby se zobrazilo zvýraznění. Půjde tak docílit vlastního vzhledu, který se ale bude chovat jako současný nativní <code>outline</code>.</p>

<pre><code>element:focus-visible {
  /* libovolné styly pro :focus */
}</code></pre>



<h3 id="polyfill">Polyfill pro <code>:focus-visible</code></h3>

<p>Existuje hotový maličký JS polyfill, který daným prvkům nastavuje CSS třídu <code>focus-visible</code> ve stejných případech, jako prohlížeče výchozí <code>outline</code>:</p>


<div class="external-content">
  <ul>
    <li><a href="https://github.com/WICG/focus-visible">Polyfill for `:focus-visible`</a> – stránka polyfillu s <a href="https://wicg.github.io/focus-visible/demo/">ukázkou</a></li>
  </ul>
</div>



<span id="focus-ring"></span>
<h3 id="moz-focusring">Ve Firefoxu <code>:moz-focusring</code></h3>

<p>Ve <b>Firefoxu</b> už funguje tato vlastnost s <a href="/css-prefixy">prefixem</a> a psaná bez spojovníku. Ještě ve starší podobně názvu, který měl znít <code>:focus-<b>ring</b></code></p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/yvjc">Živá ukážka</a> – test experimentálního selektoru pro <b>Firefox</b></li>
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-focusring"><code>:-moz-focusring</code></a></li>
  </ul>
</div>

<h3 id="what-input">Knihovna <i>What Input</i></h3>

<p>Hotové JS řešení <a href="https://github.com/ten1seven/what-input">What Input?</a> dokáže stránce přiřazovat atributy podle toho, zda se vstup provedl myší nebo z klávesnice. V případě, že proběhl myší, jde tak výchozí <code>:focus</code> v některých případech potlačit.</p>

<h2 id="focus-within">Focus uvnitř <code>:focus-within</code></h2>

<p>Docela novinka, ale podporovaná už v současných versích většiny prohlížečů (kromě <b>Edge</b> a <b>Android Browser</b>).</p>

<p>Na nějakém rodičovském prvku (třeba značce <code>&lt;form></code>) jde zjistit, jestli nemá <code>:focus</code> něco uvnitř.</p>


<pre><code>form:focus-within {
  box-shadow: 0 0 5px 0 red;
}</code></pre>







<p>Takový formulář během vyplňování políček získá červený stín.</p>

<div class="live">
  <style>
    .focus-within {
      padding: .1em 1em;
    }
    .focus-within:focus-within {
      box-shadow: 0 0 5px 0 red;
    }
  </style>
  <form action="" class="focus-within">
    <p><input type="text"></p>
    <p><input type="text"></p>
    <p><input type="text"></p>
    <p><button>Odeslat</button></p>
  </form>
</div>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Martin Pešout: <a href="http://www.martinpesout.cz/jak-jsem-vyzral-na-nechteny-outline/">Jak jsem vyzrál na nechtěný outline</a></li>
  
  <li>Martin Michálek: <a href="https://slideslive.com/38902622/pristupnost-v-kodu-ukazky-a-navrhove-vzory">	
Přístupnost v kódu: ukázky a návrhové vzory</a> – přednáška z WebExpa s praktickými tipy, jak nezničit ovladatelnost z klávesnice</li>
</ul>