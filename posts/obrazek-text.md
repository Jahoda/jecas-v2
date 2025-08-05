---
title: "Obrázkový text"
headline: "Text v obrázku"
description: "Jak vyřešit situaci, kdy má být textový obsah v obrázku z hlediska přístupnosti, použitelnosti a SEO."
date: "2015-04-26"
last_modification: "2015-05-07"
status: 1
tags: ["css", "hotova-reseni", "obrazky"]
format: "html"
---

<p>Pro <b>zajímavější grafické ztvárnění textu</b> se může nabízet sáhnout po obrázku, na kterém bude text vylepšený v grafickém editoru.</p>

<p><img src="/files/obrazek-text/text-obrazek.png" alt="Příklad obrázku obsahující text" class="border"></p>
















<p>První rada zní: <b>Psaní textu do obrázku se vyhnout.</b></p>

<ol>
  <li>
    <p>Text z obrázku půjde <b>složitě kopírovat</b>. Zároveň <a href="/kopirovani">kopírování</a> nezabrání, ani kdyby to bylo cílem.</p>
  </li>  
  <li>
    <p>Bude pravděpodobně složitější v budoucnu <b>provádět úpravy obsahu</b>, který je v obrázku.</p>
  </li>  
  <li>
    <p>Obrázek s textem je komplikovaný s ohledem na <a href="/responsive">responsivní layout webu</a>. Obrázek bude mít pevnou šířku a na menších obrazovkách půjde jen <b>zmenšit</b>, což může vést k <b>horší čitelnosti</b>. Obyčejný text se dokáže inteligentně přeskládat do více řádků.</p>
  </li>  
  <li>
    <p>Obrázkový text bude většinou <b>datově náročnější</b>.</p>
  </li>
</ol>


<h2 id="nahrada">Náhrada textu v obrázku</h2>

<p>Vývoj CSS vede tím směrem, že se stále více a více věcí, co šlo dřív řešit jen obrázky, dá nahradit <b>CSS vlastnostmi</b>. Pokud jde o zajímavější písmo nápisu, jde zase přímo na webu použít <b>zvláštní font</b>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/ceska-pisma">Česká písma z Google Fonts</a> – 250 zajímavých písem podporujících českou diakritiku</li>
  </ul>
</div>

<h3 id="vzhled-textu">Vzhled textu v CSS</h3>

<p>Pro úpravu vzhledu textu jde použít následující.</p>

<ul>
  <li><font style="color: #0D6AB7">Barva</font> – <code>color</code></li>
  <li><font style="font-size: 120%">Velikost</font> – <a href="/font#size"><code>font-size</code></a></li>
  <li><font style="font-weight: bold">Tučnost</font> – <a href="/font#weight"><code>font-weight</code></a></li>
  <li><font style="font-style: italic">Kursiva</font> – <a href="/font#style"><code>font-style</code></a></li>  
  <li><font style="font-variant: small-caps">Malá velká písmena</font> – <a href="/font#variant"><code>font-variant: small-caps</code></a></li>  
  <li><font style="text-transform: uppercase">Velká písmena</font> – <code>text-transform: uppercase</code></li>  
    <li><font style="text-shadow: 5px 10px 2px #0D6AB7;">Stín písma</font> – <a href="/text-shadow"><code>text-shadow</code></a></li>
  <li>Obrázkové pozadí místo barvy písmen – <a href="/background-clip#text"><code>background-clip</code></a></li>  
  <li><font style="-webkit-text-stroke: 2px #0D6AB7; text-stroke: 2px #0D6AB7;">Rámeček okolo písmen</font> – <a href="/text-stroke"><code>text-stroke</code></a></li>  
  <li>Odraz písma (celého boxu) – <a href="/box-reflect"><code>box-reflect</code></a></li>  
 
  <li><font style="text-decoration: line-through">Přeškrtnutí</font>, <font style="text-decoration: underline">podtržení</font> nebo <font style="text-decoration: overline">nadtržení</font> – <a href="/text-decoration"><code>text-decoration</code></a></li>  
  <li><font style="letter-spacing: 2px">Proložení písmen</font> – <code>letter-spacing: 2px</code></li>  
  <li><font style="word-spacing: 1em">Větší mezery mezi slovy</font> – <code>word-spacing: 1em</code></li>  
  <li>Jde vytvořit <a href="/pozadi-textu">pozadí pouze za písmeny</a>.</li>    
  <li>Textem jde <a href="/rotace">rotovat</a>, <a href="/flip">otáčet</a> nebo na něj aplikovat <a href="/filter">CSS filtry</a>.</li>
</ul>

<p>Docílit nápaditějšího vzhledu textu tak jde i pouze s využitím CSS, při zachování všech výhod prostého textu.</p>

<p>Pro zajímavější stylování je možné obalit jednotlivá písmena textu JavaScriptem a stylovat je samostatně:</p>

<div class="external-content">
  <ul>
    <li><a href="http://letteringjs.com/">Lettering.JS</a> – jQuery plugin pro obalení písmen do samostatných elementů</li>
  </ul>
</div>


<h2 id="pristupny">Přístupný text v obrázku</h2>

<p>Pokud není zbytí a na stránce musí být text v obrázku, nejjednodušší je použít značku <code>&lt;img></code> a textový obsah umístit do atributu <code>alt</code>.</p>

<pre><code>&lt;img src="text.png" <b>alt</b>="Text z obrázku"></code></pre>

<p>S ohledem na <a href="/seo">SEO</a> se někteří tvůrci uchylují k řešení, kdy v HTML kódu je text z obrázku nějakým způsobem <b>skrytý</b> a vidět je jen obrázkový nápis vytvořen pomocí CSS pozadí (<code>background-image</code>).</p>


<div class="live">
  <style>
    .obrazkovy {
      background: url('/files/obrazek-text/text-obrazek.png'); 
      width: 470px; 
      height: 246px;      
    }
    .obrazkovy span {
      display: none;
    }
  </style>  
  <div class="obrazkovy">
    <span>Text zkrášlený přímo v grafickém editoru</span>
  </div>
</div>



<p>Skrytí jde provést pomocí <code>display: none</code>. Někdy jsou ale k vidění i odlišné konstrukce, které <b>schování textu</b> provádějí jiným způsobem ve snaze ošálit robota, že skrytý text není skrytý.</p>

<p>Pokud v kódu je něco jako:</p>

<pre><code>text-indent: -9999px;</code></pre>

<p>Je to přesně ten případ.</p>





<h3 id="optimalni">Optimální řešení</h3>

<p>Pokud je nutné text řešit obrázek, je ideální obrázek naposicovat před text. Bude to mít výhodu v tom, že i <b>před stažením obrázku</b> bude návštěvník text vidět (byť v méně hezké podobě).</p>


<p><button onclick="toggle(document.querySelector('#ir .ir div'), 'skryt-pozadi')">Zobrazit/skrýt překryvný obrázek</button></p>

<div class="live" id="ir">
  <style>
    .ir, .ir div {       
      width: 470px; 
      height: 246px;      
      position: relative;
    }
    .ir div {
      background: url('/files/obrazek-text/text-obrazek.png');
      position: absolute;
      top: 0;
      left: 0;
    }
    /* Jen pro lepší styl písma */
    .ir {
      background: #fff;
      font-size: 45px;
      line-height: 1.2;
      padding: 1em;
      box-sizing: border-box;
      font-family: sans-serif;
    }
  </style>  
  <div class="ir">
    Text zkrášlený přímo v grafickém editoru
    <div></div>
  </div>
</div>


<style>
  .ir div.skryt-pozadi {
    background: none;
  }
</style>