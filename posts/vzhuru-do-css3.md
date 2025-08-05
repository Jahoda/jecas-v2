---
title: "Recense: Vzhůru do CSS3‏"
headline: "Recense: Vzhůru do CSS3‏"
description: "Jaký je ebook o CSS3 od Martina Michálka."
date: "2015-07-27"
last_modification: "2016-07-11"
status: 1
tags: ["css", "produktivita", "recense"]
format: "html"
---

<p><img src="/files/article-large/vzhuru-do-css3.png" alt="Vzhůru do CSS3" class="border"></p>
















<p>E-book je k disposici ve formátech <b>PDF, ePUB a MOBI/Kindle</b>.</p>

<ul>
  <li>Cena: 249 Kč</li>
  <li>Počet stran: 110</li>
  <li>Doba čtení: cca 100 minut</li>
</ul>

<div class="external-content">
  <ul>
    <li><b><a href="http://www.vzhurudolu.cz/ebook">Vzhůru do CSS3</a></b> – Ebook o 22 nových CSS vlastnostech plný tutoriálů a referenčních příruček.</li>
  </ul>
</div>

<p>E-kniha je vhodná především pro <b>HTML/CSS kodéry</b>, kteří poslední roky nesledovali, co je možné v závislosti na podpoře v prohlížečích používat.</p>

<p>Pro poctivé čtenáře jecas.cz bude e-book spíš pěkné <b>ucelené opakování</b>, ale i tak se dozví spousto věcí, o kterých se zde nepíše.</p>

<p>Značná část obsahu knihy pochází z Martinovy příručky, která je dostupná online:</p>

<div class="external-content">
  <ul>
    <li>Vzhůru dolů: <a href="http://www.vzhurudolu.cz/prirucka/css3">CSS3 Příručka</a></li>
  </ul>
</div>


<p>Texty z původní online příručky jsou <b>vylepšeny a upraveny</b> – nejedná se tedy o pouhou kopii obsahu z webu.</p>




<h2 id="cast">Obsah e-knihy</h2>

<p>Kniha se dá rozdělit na čtyři části:</p>

<ol>
  <li>
    <p><b>Proměny kódeřiny</b> – popisuje změny v procesu tvorby webu způsobené zejména <b>rozšířením mobilních zařízení</b> a nutností tvořit web <a href="/responsive">responsivně</a>.</p>
    <p>Při návrhu webu se již neuvažuje o <b>3 různých prohlížečích a 3 různých rozlišeních</b>, ale cílová zařízení jsou tak rozmanitá, že je nutné tvořit stránky <b>universálně</b>.</p>
  </li>
  
  
  <li>
    <p><b>Nástroje, postupy, technologie</b> – pro mě nejzajímavější část. Obsahuje cenné rady, jak si <b>zefektivnit</b> samotný proces kódování využitím:</p>
    
    <ul>
      <li>preprocesorů,</li>
      <li>postprocesorů,</li>
      <li>autoprefixeru (nástroj automaticky přidávající potřebné <a href="/css-prefixy">CSS prefixy</a>),</li>
      <li>CSS frameworků typu <b>Bootstrap</b></li>
    </ul>
    
    <p>Dále je zmíněn postup, jak <a href="/prohlizece">testovat v různých prohlížečích</a>. Nebo mít během psaní kódu <b>okamžitý náhled výsledku</b> v prohlížeči díky nástroji <a href="http://www.browsersync.io/">Browsersync</a>. Ten prý navíc umožňuje i pohodlné <b>testování webu v rámci lokální sítě</b> na více zařízeních zároveň.</p>
    
    <p>Pro živý náhled CSS používám <a href="/zivy-nahled-css">rozšíření LiveStyle</a> do <a href="/st">Sublime Text</a>, ale <b>Browsersync</b> by mohl stát za vyzkoušení.</p>
  </li>
  
  
  <li>
    <p><b>Fallback strategie pro starší prohlížeče</b> – celkem 5 způsobů, jak řešit situace, kdy <b>prohlížeč něco nezná</b>.</p>
    
    <p>Od prostého oželení lepšího výsledku (např. CSS přechody <a href="/transition"><code>transition</code></a>), přes ignorování neznámých vlastností (např. nastavování rozměrů pomocí <a href="/calc#starsi"><code>calc</code></a>) až po <a href="/polyfill">polyfilly v JS</a> a automatické generátory fallbacků.</p>
  </li>  
  
  <li>
    <p><b>Referenční příručka CSS3</b> – nejrozsáhlejší část knihy.</p>
    
    <p>Většinu vlastností jsem zde sice již popsal (vedou na ně odkazy v následujícím seznamu), ale je zajímavé mít názor i od někoho jiného.</p>    
<ul>
<li>Vlastnosti textu
	<ul>
      <li><a href="/oriznuti-textu">Text Overflow</a> – způsob přetékání textu</li>
      <li><a href="/text-shadow">Text Shadow</a> – stín textu</li>
		<li>Font Face – vlastní fonty, tipy a triky, netechnické aspekty</li>
	</ul>
</li>	
<li>Vlastnosti pozadí
	<ul>
      <li><a href="/background-clip">Background Clip</a> – míra roztažení pozadí</li>
		<li>Background Origin – pozice začátku pozadí</li>
      <li><a href="/obrazkove-pozadi">Background Size</a> – velikost obrázku na pozadí</li>
      <li><a href="/gradient">Gradients</a> – barevné přechody</li>
      <li><a href="/vice-obrazku">Multiple Backgrounds</a> – více obrázků na pozadí</li>
	</ul>
</li>
<li>Vlastnosti rámečků
  <ul>
    <li><a href="/border-image">Border Image</a> – rámeček vykreslený obrázkem</li>
    <li><a href="/border-radius">Border Radius</a> – poloměr rohu rámečku</li>    
  </ul>
</li>
<li>Vlastnosti boxu
  <ul>
    <li><a href="/box-shadow">Box Shadow</a> – stínování elementu</li>
    <li><a href="/box-sizing">Box Sizing</a> – způsob počítání velikosti boxu</li>    
  </ul>
</li>
  <li><a href="/responsivni-web#media">Media Queries</a> – podmíněné zobrazení pro média</li>
<li>CSS transformace
  <ul>
    <li>Transforms – proměny objektu</li>  
  </ul></li>
<li>CSS animace
<ul>
  <li><a href="/transition">Transitions</a> – jednoduché animace přechodu</li>
  <li><a href="/animation">Animations</a> – plnohodnotné animace</li>  
</ul></li>
<li>Layout v CSS3
<ul>
<li>Multi-column Layout – vícesloupcová sazba textu</li>
  <li><a href="/flexbox">Flexbox</a> – layout pomocí pružných boxů</li>  
</ul></li>

<li>Vybrané další CSS3 vlastnosti
<ul>
<li>Nové CSS3 jednotky – rem, vw, vh</li>
  <li><a href="/rgba">RGBa barva</a> – barva s poloprůhledností</li>  
  <li><a href="/css-selektory">Selektory</a></li>
</ul>
</li>
<li> Nestandardní vlastnosti
<ul>
  <li><a href="/box-reflect">Box Reflection</a> – odlesk</li>
</ul></li>
</ul>    
  </li>
</ol>



<h2 id="zaver">Závěr</h2>

<p>Ačkoliv by se mohlo zdát, že značná část obsahu e-booku se dá najít jinde, pro nastudování si současných <b>CSS 3 postupů</b> půjde v češtině těžko najít lepší <b>kompletní přehled</b>.</p>

<p>E-kniha Vzhůru do CSS3 se navíc dobře čte a ani neobsahuje překlepy, kterých bych si všiml.</p>

<p>Nenarazil jsem ani na nějaké vážné faktické chyby nebo případy, že by autor něco podstatného zamlčel.</p>

<p>Pro webové tvůrce, kteří začínají nebo jsou mírně pokročilí či o CSS 3 mnoho neslyšeli, proto <b>doporučuji</b> e-book <b><a href="http://www.vzhurudolu.cz/ebook">Vzhůru do CSS3</a></b> k přečtení.</p>

<div class="">
  <p><small>Poznámka: E-book jsem si koupil v předprodeji. Za napsání této recense nejsem autorem knihy placený.</small></p>
</div>