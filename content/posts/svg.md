---
title: "SVG"
headline: "SVG"
description: "SVG je grafický formát vhodný pro grafické prvky, které mají mít možnost měnit svou velikost."
date: "2014-10-27"
last_modification: "2016-12-06"
status: 1
tags: ["obrazky", "responsive"]
format: "html"
---

<p>Zkratka <b>SVG</b> znamená <i lang="en">Scalable Vector Graphics</i> – škálovatelná vektorová grafika.</p>

<p>Zásadní rozdíl oproti běžným <a href="/format-obrazku">formátům obrázků</a> jako je PNG, GIF nebo JPG spočívá v tom, že jednotlivé části obrázku jsou přesně popsány XML značkami.</p>

<p>Má-li být na obrázku obdélník (anglicky <i lang="en">rectangle</i>), přidá se do <code>&lt;svg></code> značka <code>&lt;rect></code>:</p>

<pre><code>&lt;svg width="200" height="100">
 &lt;rect width="200" height="100" fill="#0D6AB7" />
&lt;/svg></code></pre>



<p>Po nastavení rozměrů a barvy výplně (<code>fill</code>) je obrázek na světě:</p>

<div class="live live--svg-blok">
  <svg width="200" height="100">
   <rect width="200" height="100" fill="#0D6AB7" />
  </svg>  
</div>






<p>Jak je vidět na ukázce, kód SVG obrázku jde vložit přímo do HTML.</p>

<p>Po uložení tohoto krátkého kódu do textového souboru s příponou <code>*.svg</code> vznikne  <b>plnohodnotný SVG obrázek</b>.</p>

<p>V uloženém souboru je nutné uvést <b>jmenné prostory</b>:</p>

<pre><code>&lt;svg 
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  &lt;!-- samotný obsah obrázku -->
  &lt;rect width="200" height="100" fill="#0D6AB7" />
&lt;/svg></code></pre>
  



















<p>Potom jde použít jako jakýkoliv jiný obrázek standardním způsobem se značkou <code>&lt;img></code>:</p>

<pre><code>&lt;img src="obrazek.<b>svg</b>"></code></pre>


<p>Nebo jako CSS <code>background</code>:</p>

<pre><code>element {
  background: url(obrazek.<b>svg</b>);
}</code></pre>












<h2 id="podpora">Podpora</h2>

<p>SVG obrázky jde používat od <b>IE 9</b>. Starší <b>Internet Explorery</b> podporují jiný vektorový formát – VML (<i lang="en">Vector Markup Language</i>).</p>

<p>Kromě <b>IE 8</b> nefunguje SVG ještě ve starém <b>Android Browseru 2.3</b>.</p>


<p>Za rozšíření formátu SVG může hlavně vzestup <a href="/responsive"><b>responsivních webů</b></a>, protože je najednou nutné zobrazovat grafické prvky v různých rozlišeních.</p>






<h2 id="kdy">Kdy použít SVG</h2>

<p>SVG se hodí prakticky na všechno <b>kromě fotografií</b>, tedy:</p>

<ul>
  <li>loga,</li>
  <li>ikony,</li>
  <li>prvky uživatelského rozhraní,</li>
  <li>vektorové ilustrace</li>
</ul>




<p>Kromě prostých obrázků se SVG hodí i pro reklamní bannery, infografiky, interaktivní grafické prvky, datové visualisace / grafy, animované ilustrace nebo pro efekty, které jsou aplikovatelné na HTML prvky.</p>





<h2 id="vyhody">Výhody SVG</h2>

<ol>
  <li>
    <p>Je možné <b>měnit rozměry</b> (<code>width</code> a <code>height</code>) bez ztráty kvality a změny datového objemu.</p>
    
    <p>Proto je SVG velmi užitečné při tvorbě responsivního webu. Při zvětšení nebo zmenšení obrázku mimo skutečné rozměry je SVG obrázek pořád téměř dokonale ostrý.</p>
    
    <p>Dále není potřeba vytvářet více obrázků pro různou hustotu pixelů.</p>
   
  </li>  
  <li>
    <p>Obrázek v SVG vypadá dobře i při <b>zoomování stránky</b>.</p>
  </li>
  <li>
    <p>Kromě značky <code>&lt;img></code> či CSS vlastnosti <code>background</code> jde SVG obrázek vložit přímo do stránky.</p>
  </li>
  <li>
    <p>SVG obrázek jde <b>stylovat pomocí CSS</b>. Jisté části se klidně mohou například přebarvit při najetí myší (<code>:hover</code>). Změny mohou být díky CSS <a href="/transition"><code>transition</code></a> i plynulé.</p>
  </li>  
  <li>
    <p>S obrázkem jde <b>manipulovat JavaScriptem</b>. Pomocí JS jde SVG i nakreslit.</p>
  </li>  
  <li>
    <p>Jednotlivé prvky a efekty SVG obrázku jdou <b>výborně animovat</b>.</p>
  </li>
  <li>
    <p>Do obrázku jde vkládat <b>text, který je skutečně text</b> a ne jen barevné body, které utváří písmena.</p>
  </li>
</ol>


<h2 id="nevyhody">Nevýhody</h2>

<p>Existují ale i nevýhody:</p>

<ol>
  <li>
    <p>Základní <b>podpora v prohlížečích</b> je slabší než u klasických formátů, které fungují všude. SVG nepodporuje <b>IE 8</b> a <b>Android Browser 2.3</b>.</p>
    
    <p>Vzhledem k tomu, že obrázky často bývají <b>nepostradatelnou součástí stránky</b>, je jejich nezobrazení problematické. Je potom nutné SVG obrázek převést ještě do klasickém formátu pro starší prohlížeče.</p>
    
    <p>Pokročilejší funkce mají potom podporu proměnlivější a chování se občas liší napříč prohlížeči.</p>
  </li>
  
  <li>
    <p><b>SVG se nehodí pro všechno</b> – pro grafiku, která nevzešla z grafického editoru, ale třeba z fotoaparátu, je formát SVG naprosto nevhodný.</p>
  </li>
  
  <li>
    <p><b>Datová velikost</b> může být u SVG větší než u <a href="/optimalisace-obrazku">optimalisovaného</a> PNG obrázku. SVG jde ale ještě komprimovat při přenosu pomocí <i>gzipu</i>, což může jeho velikost srazit na podobnou velikost.</p>
  </li>
  <li>
    <p><b>Otevřený zdrojový kód</b> – zdrojový kód SVG si lze prohlížet v libovolném textovém editoru. SVG obrázek se chrání před <a href="/kopirovani">kopírováním</a> a upravováním ještě hůř než klasické obrázky.</p>
    
    <p>Není problém si  jednotlivé části SVG projít ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a>:</p>
    
    <p><img src="/files/svg/prohlizeni-svg.png" alt="Prohlížení SVG obrázku ve vývojářských nástrojích" class="border"></p>
  </li>
</ol>




















<h2 id="vlozeni">Vložení SVG na stránku</h2>

<p>Samotné použití SVG na stránce je relativně komplikované. Existují základní tři způsoby:</p>


<h3 id="img">Značka <code>&lt;img></code></h3>

<p>Klasická značka <code>&lt;img></code> funguje i pro SVG:</p>

<pre><code>&lt;img src="obrazek.svg"></code></pre>


<p>Fallback pro starší prohlížeče jde potom zajistit JavaScriptem u události <code>onerror</code>:</p>

<pre><code>&lt;img src="obrazek.svg" 
  onerror="this.onerror=null; this.src='obrazek.png'
"></code></pre>




<p>Případě použít nepopulární detekci na straně serveru. Ta nebude trpět tím, že se nepodporovaným prohlížečům <b>stáhnou dva obrázky</b>.</p>













<h3 id="inline">Vložení SVG kódu do HTML</h3>

<p>SVG jde vložit do stránky přímo pomocí elementu <code>&lt;svg></code>. Při tomto postupu se obrázek stane součástí <a href="/dom">DOMu</a>. To umožní jeho snadné <b>stylování a ovládání JavaScriptem</b>.</p>

<pre><code>&lt;svg width="200" height="100">
 &lt;rect width="200" height="100" fill="#0D6AB7" />
 &lt;!-- další prvky obrázku -->
&lt;/svg></code></pre>





<p>Takové vložení je pro pohodlnost vhodné řešit na straně serveru. Příklad v PHP:</p>

<pre><code>&lt;?php echo file_get_contents("obrazek.svg"); ?></code></pre>



<p>Vložení SVG při použití <b>Latte</b> (šablonovací nástroj Nette frameworku):</p>

<pre><code>{file_get_contents($baseUrl . '/images/obrazek.svg')|noescape}</code></pre>



<p>Tento způsob vložení je hodně podobný použití <a href="/data-uri"><i>data-uri</i></a>. Ušetří se tím HTTP požadavek, ale obrázek se <b>nebude cacheovat</b>.</p>


<p>Inline vložení značkou <code>&lt;svg></code> má lehce horší podporu v prohlížečích. Kromě nepodporovaných prohlížečů <b>IE 8</b> a <b>Android Browser 2.3</b> nefunguje tento postup ve starých versích dalších prohlížečů:</p>

<div class="external-content">
  <ul>
    <li>Can I use: <a href="http://caniuse.com/#feat=svg-html5">Inline SVG in HTML5</a></li>
  </ul>
</div>


<p>Pro nepodporované prohlížeče se nabízí <b>detekce na straně serveru</b>. Případně jde pro inline SVG použít záložní obsah s použitím značek <code>&lt;switch></code> a <code>&lt;foreignObject></code>:</p>

<pre><code>&lt;svg width="200" height="100">
  &lt;switch>
    &lt;rect width="200" height="100" fill="#0D6AB7" />
    &lt;foreignObject>
      &lt;div class="zalozni-obrazek">&lt;/div>
    &lt;/foreignObject>
  &lt;/switch>
&lt;/svg></code></pre>








<p>Nebo alternativní obsah umístit do značky <code>&lt;desc></code>, jejíž obsah se v podporovaných prohlížečích nezobrazí.</p>

<pre><code>&lt;svg width="200" height="100">
  &lt;rect width="200" height="100" fill="#0D6AB7" />
  &lt;desc>
    &lt;div class="zalozni-obrazek">&lt;/div>
  &lt;/desc>
&lt;/svg></code></pre>






















<p>Nabízí se otázka, proč do <code>&lt;desc></code>/<code>&lt;foreignObject></code> neumístit přímo značku <code>&lt;img></code>. To má svůj dobrý důvod: prohlížeče podporující SVG by potom <b>stáhly i záložní obrázek</b>.</p>



<h3 id="background">CSS <code>background</code></h3>

<p>Pro všelijaké SVG ikonky a podobně se typicky hodí použít <b>CSS pozadí</b> spolu s <a href="/obrazkove-pozadi"><code>background-size</code></a>:</p>

<pre><code>element {
  background: url(obrazek.svg) no-repeat;
  background-size: contain;
}</code></pre>




<p>Při použití CSS <code>background</code>u se nabízí poměrně jednoduché řešení fallbacku pro starší prohlížeče. Podpora SVG je v <b>IE</b> stejná jako podpora vícenásobných obrázků (<b>IE 9+</b>):</p>

<pre><code>element {
  background: url(obrazek.png);
  background-image: url(obrazek.svg), none;
}</code></pre>






<p>Nejprve se nastaví pozadí na PNG obrázek a následně se přepíše dvěma obrázky: SVG obrázkem a <i>ničím</i> (<code>none</code>). Prohlížeče nepodporující vícenásobné pozadí celou deklaraci s <code>background-image</code> zahodí a použijí PNG.</p>

<p>Problematický je v tomto <b>Android Browser 2.3</b> a starší, který nezná SVG, ale umí vícenásobné pozadí, takže nezobrazí nic.</p>

<p>Obdobně jde využít (ne)podpory <a href="/gradient">CSS gradientů</a>:</p>

<pre><code>element {
  background: url(obrazek.png);
  background-image: url(obrazek.svg), 
                    linear-gradient(transparent, transparent);
}</code></pre>







<p>To sice vyřadí starý <b>Adroid Browser</b>, ale rovněž bude místo SVG jen záložní obrázek v prohlížečích, které SVG podporují: <b>IE 9</b> a <b>Opera Mini</b>.</p>













<h3 id="object">SVG přes <code>&lt;object></code></h3>

<p>Značka <code>&lt;object></code> slouží pro universální vložení cizího prvku do stránky.</p>

<p>Výhoda je v tom, že přímo do značky lze umístit obsah, který prohlížeč použije v případě, že objekt nezná.</p>

<pre><code>&lt;object type="image/svg+xml" data="obrazek.svg">
  &lt;div class="zalozni-obrazek">&lt;/div>
&lt;/object></code></pre>




<p>Záložní obrázek je vhodné vložit prostřednictvím CSS pozadí a ne značkou <code>&lt;img></code>, aby záložní obrázek zbytečně nestahovaly prohlížeče, které umí <code>&lt;svg></code>.</p>







<h3 id="image">Značka <code>&lt;image></code></h3>

<p>Značka SVG umožňuje pomocí elementu <code>&lt;image></code> vložit v rámci <code>&lt;svg></code> libovolný obrázek:</p>

<pre><code>&lt;svg width="200" height="100">
  &lt;image 
    xlink:href="obrazek.svg" 
    src="obrazek.png"
    width="200" height="100" />
&lt;/svg></code></pre>






<p>Z toho jde vymyslet zajímavý fallback pro prohlížeče, co SVG neznají. Značka <code>&lt;image></code> se mimo element <code>&lt;svg></code> totiž chová prakticky stejně jako <code>&lt;img></code>, takže jde do <code>src</code> připojit záložní obrázek v PNG.</p>

<p>Starší prohlížeče budou neznámou značku <code>&lt;svg></code> ignorovat a <code>&lt;image></code> zobrazí jako <code>&lt;img></code>. Prohlížeče, co SVG znají, potom budou zase ignorovat atribut <code>src</code> a zobrazí <code>obrazek.svg</code>:</p>

<div class="live live--svg-blok">
<svg width="200" height="100">
  <image 
  xlink:href="/files/svg/obrazek.svg" 
    src="/files/svg/obrazek.png"
    width="200" height="100" />
</svg>
</div>


<p>Je-li obdélník modrý, zobrazuje se SVG. V nepodporovaných prohlížečích se zobrazuje následující PNG obrázek:</p>

<p><img src="/files/svg/obrazek.png" alt="PNG obrázek" class="border"></p>















<h2 id="detekce">Test podpory SVG</h2>

<p>Detekovat podporu SVG v JavaScriptu jde pohodlně s využitím knihovny <a href="https://modernizr.com/">Modernizr</a>:</p>

<pre><code>if (!Modernizr.svg) {
  // SVG není podporováno
}</code></pre>





<p>Samostatný test podpory SVG je tam udělán následovně:</p>

<pre><code>function supportsSVG() {
  return !!document.createElementNS &amp;&amp; !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
}</code></pre>















<h2 id="fallback">SVG fallback</h2>

<p>Pro případ, že prohlížeč SVG nepodporuje, se zdá být nejsnazší fallback s CSS <code>background</code>em, který využívá podobné podpory SVG jako vícenásobného pozadí.</p>

<pre><code>element {
  background: url(obrazek.png);
  background-image: url(obrazek.svg), none;
}</code></pre>







<p>Není závislý na JS a funguje skoro všude. Pro vyšší jistotu se může přidat třída <code>.no-svg</code> pro <code>&lt;html></code>/<code>&lt;body></code> na základě detekce podpory SVG v JS nebo dle detekce problematického zařízení na serveru.</p>


<p>A v CSS mít ještě zálohu:</p>

<pre><code>element {
  background: url(obrazek.png);
  background-image: url(obrazek.svg), none;
}
.no-svg element {
  background-image: url(obrazek.png);
}</code></pre>






<p>Další příklady SVG fallbacků:</p>

<div class="external-content">
  <ul>
    <li><a href="http://developersdev.blogspot.ru/2014/10/svg-fallback-pure-css-can-i-use-part-5.html">SVG fallback pure CSS: Can I use Part 5</a></li>
    
    <li><a href="https://css-tricks.com/svg-fallbacks/">SVG Fallbacks</a></li>
    <li><a href="https://css-tricks.com/a-complete-guide-to-svg-fallbacks/">A Complete Guide to SVG Fallbacks</a></li>
  </ul>
</div>










<h2 id="sprite">SVG ikony / sprite</h2>

<p>Pro optimalisaci počtu HTTP spojení bývá zvykem všechny obrázky spojit do jednoho a jednotlivé obrázky zobrazovat vhodně nastaveným <code>background-position</code>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/css-sprite">CSS sprite</a> – spojení všech obrázků do jednoho</li>
  </ul>
</div>

<p>Menší vsuvka ohledně budoucnosti:</p>

<div class="soft">
<h3 id="http-2">Protokol HTTP/2</h3>

<p>Protokol HTTP/2 řeší problém se stahováním velkého množství externích souborů. Po jeho rozšíření nebude problém připojit do stránky desítky souborů s ikonkami bez zpomalení načítání.</p>

<p>Používání <b>CSS spritů a spojování souborů</b> bude potom naopak <b>anti-pattern</b>, protože bude komplikovat cacheování.</p>
</div>






<p>Klasický <i>CSS sprite postup</i> jde použít i v případě SVG. Jen se tím při <b>fixních rozměrech</b> nic moc nezíská (kromě ostrých ikonek při zoomu a na displejích s velkou hustotou pixelů).</p>





<h3 id="ruzna-velikost">Různá velikost</h3>

<p>Aby šly ikonky snadno zvětšovat a zmenšovat, je užitečné mít posice jednotlivých obrázků v relativních jednotkách – třeba <code>em</code>.</p>

<p>Díky tomu, že rozměry i posice obrázku jsou v <code>em</code> jednotkách, stačí pro změnu velikosti změnit <a href="/font#size"><code>font-size</code></a>.</p>

<p><a href="https://kod.djpw.cz/kprb">Živá ukázka</a> – změna velikosti SVG ikonek ve spritu</p>

<p><img src="/files/svg/svg-sprite.png" alt="Sprite z SVG ikonkami" class="border"></p>



















<p>Na ukázce je vidět, že není rozumné ikonky nalepit úplně na sebe, ale je dobré ponechat nějaké odsazení.</p>

<p>Dále ke čtení:</p>

<div class="external-content">
  <ul>
    <li>Smashing Magazine: <a href="http://www.smashingmagazine.com/2012/01/resolution-independence-with-svg/">Resolution Independence With SVG</a></li>
  </ul>
</div>


<h3 id="data-uri">SVG v data-uri</h3>

<p>Jelikož SVG má stejnou podporu jako Data URI (zápis obsahu souboru pomocí protokolu <code>data:</code>), není příliš problém <code>data:</code> použít místo vytváření <b>SVG spritu</b>:</p>

<pre><code>.icon {
  background-image: url('data:image/svg+xml;…');
}</code></pre>




<p>Každá ikonka potom má vlastní <code>background-image</code>, takže se nemusí kouzlit s <code>background-position</code>.</p>

<p>Veškeré SVG obrázky se stanou součástí CSS souboru.</p>

<p>Existují hotové nástroje, které umí z SVG ikonek vygenerovat hotové řešení s fallbacky:</p>

<div class="external-content">
  <ul>
    <li><a href="http://iconizr.com/">Iconizr</a> – vygeneruje SVG sprite pro CSS background, data-uri i fallbacky v PNG</li>
    <li><a href="http://www.grumpicon.com/">Grumpicon</a> – vygeneruje SVG do data-uri s PNG fallbacky</li>
  </ul>
</div>

<p>Vkládání obrázků pomocí data-uri je dobré zvážit. Má to i své nevýhody:</p>

<ol>
  <li>
    <p>Obrázky se <b>kešují spolu s CSS souborem</b>, což nemusí být ideální. Změna jediného obrázku vede k nutnosti znovu stahovat celé CSS. Změna CSS v podstatě zneplatní všechny obrázky.</p>
  </li>  
  <li>
    <p>Datově velké obrázky budou <b>zdržovat stažení CSS</b>. Měly by tedy být mimo <i>kritické CSS</i> <a href="/nacitani-css">načítané asynchronně</a>, jinak budou blokovat vykreslení.</p>
  </li>  
  <li>
    <p>Vždy se stáhnou všechny obrázky, ačkoliv na dané stránce nemusí být potřeba.</p>
  </li>
</ol>

<p>Pro <b>větší obrázky</b> tedy není tento postup moc šťastný. Detailněji se problematikou zabývá článek:</p>

<div class="external-content">
  <ul>
    <li><a href="http://calendar.perfplanet.com/2011/why-inlining-everything-is-not-the-answer/">Why Inlining Everything Is NOT The Answer</a></li>
  </ul>
</div>


<h3 id="svg-sprite">Skutečný SVG sprite</h3>

<p>SVG nabízí ještě jeden elegantní způsob, jak sprity vytvořit.</p>

<p>Do značky <code>&lt;svg></code> přímo do HTML kódu jde umístit všechny ikonky. Slouží k tomu značka <code>&lt;symbol></code>.</p>

<pre><code>&lt;svg style="display:none;">
  &lt;symbol id="<b>id-ikony</b>" viewBox="0 0 32 32">
    &lt;path d="…" fill="#000000">&lt;/path>
  &lt;/symbol>
  &lt;symbol id="dalsi-ikona" viewBox="0 0 32 32">
    &lt;!-- obsah další ikony -->
  &lt;/symbol>
&lt;/svg></code></pre>




<p>Používat element <code>&lt;symbol></code> není úplně nutné. Jde použít i skupinu <code>&lt;g></code>, ale není to tak dobré. Symbol totiž prohlížeče nerenderují před použitím.</p>

<p>Element <code>&lt;svg></code> je skrytý pomocí <a href="/display#none"><code>display: none</code></a>, jinak by na stránce zabíral nějaký ten prostor.</p>

<p>Jednotlivé nadefinované <i>symboly</i> jde následně použít kdekoliv na stránce pomocí značky <code>&lt;use></code>:</p>

<pre><code>&lt;svg class="ikona">
  &lt;use xlink:href="<b>#id-ikony</b>">&lt;/use>
&lt;/svg></code></pre>



<p>Třída u <code>&lt;svg></code> slouží pro další stylování. Tímto postupem je navíc možné měnit vlastnosti SVG obrázku pomocí CSS souboru připojeného ke stránce (při jiném způsobu vložení musí být CSS v <code>*.svg</code> souboru).</p>


<div class="live">
<svg style="display:none;">
  <symbol id="id-ikony" viewBox="0 0 1024 1024">
	<path class="path1" d="M1024 590.444l-512-397.426-512 397.428v-162.038l512-397.426 512 397.428zM896 576v384h-256v-256h-256v256h-256v-384l384-288z"></path>
</symbol>
</svg>
<style>
.ikona {
	display: inline-block;
	width: 1em;
	height: 1em;
	fill: currentColor;
}  
</style>
<button style="font-size: medium">
    <svg class="ikona ikona-domu">
      <use xlink:href="#id-ikony"></use>
    </svg>
  Tlačítko s SVG ikonkou
</button>  
</div>

<p>Tuto techniku dokáže používat online nástroj <b>Icomoon</b>:</p>

<div class="external-content">
  <ul>
    <li><a href="https://icomoon.io/app/">Icomoon</a> – nástroj pro vytvoření SVG spritů</li>
  </ul>
</div>

<p>Nevýhoda nastrkání všech SVG ikonek do hlavičky je jasná – <b>ikonky se nebudou ukládat do cache</b>.</p>

<p>Teoreticky je možné ikonky cacheovat JavaScriptem do <a href="/localstorage"><code>localStorage</code></a>:</p>

<div class="external-content">
  <ul>
    <li>Osvaldas Valutis: <a href="http://osvaldas.info/caching-svg-sprite-in-localstorage">Caching SVG Sprite in localStorage</a></li>
  </ul>
</div>

<p>Nebo SVG definici ikonek stáhnout <a href="/ajax">AJAXem</a>, což použití cache umožní, ale opět to bude závislé na JavaScriptu.</p>


<p>I problém s kešováním se SVG snaží řešit:</p>


<h3 id="svg-externi-sprite">SVG sprite z externího souboru</h3>

<p>Do konstrukce <code>&lt;use xlink:href="<b>#id-ikony</b>">&lt;/use></code> jde zadat <b>externí soubor</b> se všemi definicemi ikonek a odkázat se na konkrétní symbol:</p>

<pre><code>&lt;svg class="ikona">
  &lt;use xlink:href="<b>ikony.svg</b>#id-ikony">&lt;/use>
&lt;/svg></code></pre>

<p>Tento postup ale bohužel nefunguje v <b>Internet Exploreru</b> (ani v <b>IE 9+</b>, který SVG podporuje).</p>

<p>Detailnější popis <b>SVG spritů</b>:</p>

<div class="external-content">
  <ul>
    <li>Sara Soueidan: <a href="https://24ways.org/2014/an-overview-of-svg-sprite-creation-techniques/">An Overview of SVG Sprite Creation Techniques</a></li>
  </ul>
</div>


<h2 id="programy">Grafické programy pro SVG</h2>

<p>Pro vlastní vytváření SVG je potřeba nějaký ten grafický editor:</p>


<h3 id="inksacep">Inkscape</h3>

<p><a href="https://inkscape.org/en/download/" class="button">Stáhnout Inkscape</a></p>

<p><b>Inkscape</b> je zdarma pro všechny platformy – <a href="/windows-10"><b>Windows</b></a>, <b>Mac OS X</b>, <b>Linux</b>.<!-- Že je zdarma, je asi jediná výhoda, protože jinak je to dost špatně ovladatelný editor.--></p>

<p><img src="/files/svg/inkscape.png" alt="Kreslení SVG v Inkscape" class="border"></p>



































<p>Výsledný SVG obrázek je potřeba pro použití pročistit od zbytečných značek.</p>


<h3 id="illustrator">Adobe Illustrator</h3>

<p><a href="http://www.adobe.com/cz/products/illustrator.html" class="button">Stáhnout Illustrator</a></p>

<p>Poměrně drahý program, který se pro pouhou úpravu SVG asi nevyplatí kupovat.</p>








<h3 id="online">Online editory</h3>

<p>Vzhledem k povaze SVG není takový problém vytvořit <b>editor přímo v prohlížeči</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://svg-edit.googlecode.com/svn-history/r1771/trunk/editor/svg-editor.html">SVG edit</a> – kreslení SVG přímo v prohlížeči</li>
  </ul>
</div>



<h3 id="pruzkumnik">Zobrazení SVG v průzkumníku</h3>

<p>Ve Windows se při prohlížení <i>Explorerem</i> (průzkumníkem) standardně nezobrazují náhledy SVG obrázků. To není moc praktické. Existuje ale rozšíření, které tento problém řeší:</p>

<p><a href="https://svgextension.codeplex.com/" class="button">SVG Viewer Extension for Windows Explorer</a></p>

<p>Po stažení a instalaci se budou automaticky zobrazovat náhledy SVG souborů:</p>

<p><img src="/files/svg/svg-explorer.png" alt="Zobrazení náhledu SVG" class="border"></p>





















<p>Pokud se ihned po instalaci náhledy nezačnou zobrazovat, jde tomu pomoci změnou možnosti <i>Otevřít v programu</i> ve vlastnostech souboru. Po nastavení klidně té samé možnosti by se měly náhledy ukázat.</p>



<h2 id="vycisteni">Optimalisace SVG</h2>

<p>Z grafických editorů typicky lezou zbytečně datově velké SVG obrázky. Existují nástroje pro optimalisaci a kompresi.</p>

<p>Mnohdy jde dosáhnout i <b>50% úspor</b>:</p>

<ol>
  <li><b>Odstraněním meta</b> dat, které do SVG obrázku uložil grafický editor.</li>
  <li>Zjednodušením a zkombinováním <i>cest</i> (<code>&lt;path></code>).</li>
  
  <li>Snížení <b>počtu desetinných míst</b> typicky vede k největším úsporám.</li>
  
  <li>Pro opakované styly více prvků jde použít CSS.</li>
</ol>

<p>Úpravy pochopitelně mohou změnit výsledný vzhled obrázku. </p>





<h3 id="svgomg">SVGOMG</h3>

<p><a class="button" href="https://jakearchibald.github.io/svgomg/">SVGOMG online</a></p>


<p>SVGOMG je online nástroj běžící přímo v prohlížeči.</p>

<p>Díky tomu jde při různých stupních optimalisace přímo pozorovat výsledek.</p>

<p>Zároveň se zobrazuje <b>míra úspory velikosti</b>.</p>



<p><img src="/files/svg/svgomg.png" alt="SVGOMG" class="border"></p>






































<p>Využívá SVGO, které jde použít i pro automatisovanou optimalisaci na lokálním PC.</p>


<div class="external-content">
  <ul>
    <li><a href="https://github.com/svg/svgo">SVGO</a> – optimalisuje SVG obrázky v Node.js</li>
  </ul>
</div>


<h3 id="svg-editor">SVG Editor</h3>

<p><a class="button" href="https://petercollingridge.appspot.com/svg-editor">SVG Editor online</a></p>

<p>Hodně podobný nástroj jako SVGOMG.</p>

<p><img src="/files/svg/svg-editor.png" alt="" class="border"></p>

































<p>Další informace o optimalisaci SVG obsahují články:</p>

<div class="external-content">
  <ul>
    <li>Mozilla Hacks: <a href="https://hacks.mozilla.org/2015/03/optimising-svg-images/">Optimising SVG images</a></li>
    
    <li>Sara Soueidan, Performance Calendar: <a href="http://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/">Tips For Optimising SVG Delivery For The Web</a></li>
    
    <li>CSS Tricks: <a href="http://css-tricks.com/gotchas-on-getting-svg-into-production/">5 Gotchas You’re Gonna Face Getting Inline SVG Into Production</a></li>
  </ul>
</div>



<h2 id="prevod">Převod PNG na SVG</h2>

<p>Pro použití v responsivním designu se hodí PNG obrázky nahrazovat SVG formátem.</p>

<p>Existuje řada online nástrojů, které se snaží automaticky převádět PNG do SVG. Rozumně to funguje pouze pro jednoduché obrázky.</p>

<p>Složitější věci je nutné <b>ručně překreslit</b>. Některé převodní nástroje pouze zabalí PNG/GIF obrázek do značky <code>&lt;svg></code>, což je k ničemu.</p>

<div class="external-content">
<ul>
  <li><a href="https://www.pngtosvg.com">PNG to SVG</a></li>
  <li><a href="http://vectormagic.com/home">Vector Magic</a></li>
  
  <li><a href="http://image.online-convert.com/convert-to-svg">Convert image to the SVG format</a></li>
  
  <li><a href="http://www.fileformat.info/convert/image/svg2png.htm">SVG to PNG image conversion</a></li>
  
  <li><a href="https://www.npmjs.com/package/png2svg">png2svg

simple pixel art -> SVG</a></li>
  
  <li><a href="http://picsvg.com/">PicSvg</a> – Convert Picture to SVG</li>
  
  <li><a href="https://github.com/eugene1g/font-blast">Font-blast</a> – umí převést <a href="/font-ikony">font-ikony</a> na SVG</li>
</ul>
</div>


<h2 id="text">Text v SVG</h2>

<p>Skutečný text se do SVG obrázku zadává značkou <code>&lt;text></code>:</p>

<div class="live">
<svg viewBox="0 0 200 50">
    <text y="1em" fill="#0D6AB7" font-size="40">Je čas</text>
  </svg>  
</div>








<p>Takový text z obrázku je potom perfektně <b>přístupný</b> a je i možné ho <b>označit myší</b>.</p>

<div class="live">
<svg viewBox="0 0 200 100">
    <defs>
      <linearGradient id="jecas">
        <stop stop-color="#0D6AB7" offset="0%"/>
        <stop stop-color="#DA3F94" offset="100%"/>
      </linearGradient>
    </defs>  
    <text font-size="40" font-family="Segoe UI, Arial, sans-serif" fill="url(#jecas)">
      <tspan textLength="80" x="0" y="1em"
        lengthAdjust="spacingAndGlyphs">Je čas</tspan>
      <tspan textLength="80" x="0" dy="1em"
        lengthAdjust="spacingAndGlyphs">web design</tspan>
    </text>
  </svg>  
</div>




<p>S textem jde potom provádět spoustu věcí. Třeba roztáhnout písmo podle šířky a obarvit ho gradientem.</p>

<p>Další úpravy a animace textu popisuje následující presentace:</p>


<div class="external-content">
  <ul>
    <li>Brenna O'Brien: <a href="http://talks.brennaobrien.com/svg-typography/">Creative Typography with SVG</a> – formátování a animování písma</li>
  </ul>
</div>


<h2 id="ikony-stahnout">SVG ikony ke stažení</h2>

<p>Hromadu ikon v SVG je možné zdarma stáhnout z internetu:</p>

<div class="external-content">
  <ul>
    <li><a href="https://thenounproject.com/">Noun Project</a> – ikonky pro všechno se snadnou možností prohledávat</li>
    <li><a href="http://svgicons.sparkk.fr/">SVG Icons</a> – několik hotových sad ikon připravených ke vložení</li>
  </ul>
</div>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS Tricks: <a href="https://css-tricks.com/using-svg/">Using SVG</a> – úvod do používání SVG</li>
  
  <li><a href="http://snapsvg.io/start/">Snap SVG</a> – vytváření SVG pomocí JavaScriptu (článek na <a href="http://www.sitepoint.com/introduction-snap-svg/">Sitepointu</a>)</li>
</ul>

<h3 id="animace">SVG animace</h3>

<ul>
  <li>CSS Ticks: <a href="http://css-tricks.com/svg-animation-on-css-transforms/">SVG Animation and CSS Transforms: A Complicated Love Story</a></li>  
  <li>CSS Ticks: <a href="https://css-tricks.com/scroll-drawing/">Scroll Drawing</a> – kreslení v závislosti na rolování</li>  
<li>Smashing Magazine: <a href="http://www.smashingmagazine.com/2014/11/03/styling-and-animating-svgs-with-css/">Styling And Animating SVGs With CSS</a></li>    
  <li>Jake Archibald: <a href="http://jakearchibald.com/2013/animated-line-drawing-svg/">Animated line drawing in SVG</a> – animované SVG čáry</li>  
  <li>The new code: <a href="http://thenewcode.com/36/Morphing-Elements-with-SVG">Morphing Elements with SVG</a></li>
  <li>JS knihovny pro animace SVG:
    <ul>
      <li><a href="http://snapsvg.io/">Snap.svg</a></li>
      <li><a href="http://greensock.com/gsap">GSAP</a></li>
      <li><a href="http://julian.com/research/velocity/#svg">Velocity.js</a></li>
      <li><a href="http://d3js.org/">D3.js</a></li>
    </ul>
  </li>  
</ul>

<h3 id="bannery">SVG bannery</h3>

<ul>
  <li>Chris Gannon: <a href="http://codepen.io/chrisgannon/post/my-first-svg-banner-ad">My First SVG Banner Ad</a></li>
</ul>

<h3 id="filtry">SVG filtry a textury</h3>

<ul>
  <li><a href="http://jorgeatgu.github.io/svg-filters/">SVG Filters</a></li>   
  <li><a href="http://riccardoscalco.github.io/textures/">Textures.js</a> – SVG patterns for Data Visualization</li>
</ul>

<h3 id="generator">Generátory</h3>

<ul>
  <li><a href="http://demosthenes.info/blog/1061/Bokeh-Backgrounds-with-SVG-and-JS">Bokeh Backgrounds with SVG and JS</a> – generování pozadí pomocí JS</li>
</ul>

<h3 id="grafy">Grafy</h3>

<ul>
  <li><a href="https://css-tricks.com/how-to-make-charts-with-svg/">How to Make Charts with SVG</a></li>
</ul>

<h3 id="webgl">WebGL</h3>

<ul>
  <li>CSS Tricks: <a href="https://css-tricks.com/rendering-svg-paths-in-webgl/">Rendering SVG Paths in WebGL</a></li>
</ul>

<h3 id="prednasky">Přednášky</h3>

<ul>
  <li>Brenda Storer: <a href="http://brendastorer.com/presentations/2015-10-CSSDevConf-SVGs/#intro">Cracking the SVG Code</a></li>
  <li>Chris Coyier: <a href="https://speakerdeck.com/chriscoyier/the-wonderful-world-of-svg">The Wonderful World of SVG</a></li>  
  <li>Sarah Drasner: <a href="http://slides.com/sdrasner/cssdevconf/">Designing Complex SVG Animations</a></li>
  <li>Sara Soueidan: <a href="http://www.slideshare.net/SaraSoueidan/svg-for-web-designers-and-developers">SVG For Web Designers (and Developers)</a></li>
</ul>


<!--
<li>Sara Soueidan:<a href="http://sarasoueidan.com/blog/svg-coordinate-systems/">Understanding SVG Coordinate Systems &amp; Transformations</a></li>

<li><a href="http://css-tricks.com/scale-svg/">How to Scale SVG</a></li>

<li><a href="http://codepen.io/chriscoyier/pen/MYJBgR">preserveAspectRatio Tester</a></li>

-->






<style>
  .live--svg-blok svg {
    display: block;
  }
</style>
