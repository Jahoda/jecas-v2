---
title: "Jednostránkový web"
headline: "Jednostránkový web"
description: "Kdy vytvářet web o jediné stránce. Jaké jsou výhody a nevýhody."
date: "2014-09-22"
last_modification: "2016-03-09"
status: 1
tags: ["napady", "scroll", "seo"]
format: "html"
---

<p>U malých webů – typicky různé presentační weby – může být zbytečné mít jednotlivé části obsahu na <b>samostatných stránkách</b> (více různých URL).</p>


<p>Bude-li obsahová struktura například následující:</p>

<ol>
  <li>Úvod</li>
  
  <li>O nás</li>
  
  <li>Služby</li>
  
  <li>Reference</li>
  
  <li>Ceník</li>
  
  <li>Kontakt</li>
</ol>

<p>Nejspíš nebude mnoho obsahu, co na jednotlivé podstránky umístit. Zdá se potom zbytečné, aby návštěvníci museli proklikat několik stránek, když by se všechny informace pohodlně vešly na stránku jedinou.</p>

<p>Vytvořit web stylem „single page“ tak v některých případech dává smysl.</p>



<h2 id="seo">Vliv na SEO</h2>

<p>Vyhledávače mají na jednu stranu v oblibě krátké stránky, které přímo nabízí odpověď na hledaný dotaz. Na stranu druhou podstránka s jedním odstavcem textu, kde bude třeba jen telefonní číslo a kontaktní formulář, není moc hodnotná.</p>


<p>Vyjádření <b>Dušana Janovského</b> ze Seznamu:</p>

<blockquote cite="http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-3-cast/">
  <p>Obecně platí, že vyhledávač se snaží dát uživateli odpověď co nejrychleji a nejkratší cestou ho dovést k cíli. Pokud se ten cíl nachází na krátké samostatné stránce, je to ideální, protože pak uživatel ani nemusí rolovat.</p>
  
  <p>Není ale dobré informace štěpit do pěti podstránek, jestliže máš na srdci jen pět vět. Firma, která má fotku provozovny, otevírací dobu, soupis výrobků, kontakt a mapu, si to klidně všechno může dát na hlavní stránku a udělá lépe, protože ta stránka bude pak dohledatelná i na složitější dotazy, protože bude obsahovat více slov, tedy i více jejich kombinací.</p>
  
  <p>Že se na jedné stránce nedá dělat interní linkbuilding, tolik nevadí, protože na jednostránkovém webu vyhledávač nemá kam zabloudit. Na delší stránky doporučuji umisťovat kotvy, které pak také uživateli ve snippetu rádi vypíšeme, aby se rychleji dostal tam, kam chce.</p>
  
  <p class="autor"><b>Dušan Janovský</b>, <a href="http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-3-cast/">Dušan Janovský o fulltextovém vyhledávání na Seznam.cz – 3. část</a></p>
</blockquote>





<p>V případě použití jedné jediné stránky a <a href="/odkaz#kotva">#kotev</a> se na <a href="/seznam">Seznamu</a> odkazy na jednotlivé části zobrazí přímo ve výsledcích hledání.</p>

<p><img src="/files/jednostrankovy/seznam-kotvy.png" alt="Odkazy na kotvy v SERPu Seznamu" class="border"></p>


















<h2 id="pouzitelnost">Použitelnost</h2>

<p>Někomu může přijít jedna dlouhatánská stránka špatně použitelná, protože na ní uživatel bude muset <b>neustále rolovat</b>.</p>

<p>Řešením je opět navigace pomocí kotev.</p>

<p>Na jednostránkovém webu může být normální navigace, jen nebude odkazovat na samostatné podstránky, ale na části jediné stránky.</p>

<p>Navigace může být třeba i fixní, čímž na ní půjde <b>zvýraznit aktuální část</b>:</p>

<div class="internal-content">
  <ul>
    <li><a href="/zvyrazneni-odrolovani">Zvýraznění podle rolování</a></li>
  </ul>
</div>





<h2 id="vice">Více informací</h2>

<p>Pokud časem vznikne více obsahu k jednotlivým částem, není problém je až následně <b>vyčlenit na samostatnou stránku</b> a na hlavním „jednostránkovém webu“ uvést jen stručnou podobu.</p>

<p>Při vyčleňování je dobré dát pozor na <b>duplicitu</b>, tj. by se nemělo jednat o <i>copy &amp; paste</i>.</p>




<h2 id="efekty">Visuální efekty</h2>

<p>Některé jednostránkové weby pro ozvláštnění používají různé efekty:</p>



<h3 id="roztazeni">Roztažení sekce přes celou stránku.</h3>

<p>Každá část jediné stránky má výšku přes celou obrazovku:</p>
    
<p><img src="/files/jednostrankovy/cela-stranka.gif" alt="Stránka přes celou obrazovku" class="border"></p>





















<p><a href="http://kod.djpw.cz/bxrb">Živá ukázka</a></p>

<p>Docílit toho jde snadno jednotkami <code>vh</code> (<i lang="en">viewport height</i>) – fungují od <b>IE 9</b>:</p>

<pre><code>.cast {
  min-height: 100vh;
}</code></pre>




<p>Tento postup má dvě úskalí:</p>

<ol>
  <li>
    <p>Tím, že je první stránka dole <b>visuálně ukončená</b>, uživatele nemusí napadnout, že jde pokračovat.</p>
    
    <p>Řeší se to buď tak, že stránka není přesně přes celou výšku, ale dole vykukuje něco dalšího, nebo se možnost posunu znázorní symbolem šipky v dolní části.</p>
  </li>
  
  <li>
    <p>Obecně není <b>nastavování <a href="/height">výšky</a></b> moc dobrý postup, protože na ní s ohledem na délku obsahu a velikost písma nejde spoléhat. </p>
  </li>
</ol>


<h3 id="plynule-rolovani">Plynulé rolování</h3>

<p>Po kliknutí na odkaz v navigaci, který míří na tutéž stránku, se místo přeskočení odroluje plynule.</p>

<p id="spatna-ukazka"><a href="http://kod.djpw.cz/cxrb">Živá ukázka</a> – plynulé rolování</p>

<p><img src="/files/jednostrankovy/plynule.gif" alt="Plynulé odrolování" class="border"></p>




















<p>Zde je hlavní problém v tom, že udělat plynulé scrollování dobře, není úplně triviální. Naopak velmi snadno se udělá špatně použitelné (viz předchozí <a href="#spatna-ukazka">ukázka</a>).</p>

<ol>
  <li>
    <p><b>Trvá moc dlouho</b>. Z toho plynou některé další problémy…</p>
  </li>
  
  <li>
    <p><b>Koliduje si rolováním vyvolaným uživatelem</b>. Pokud člověku přijde plynulé rolování příliš pomalé, bude tomu chtít pomoci kolečkem.</p>
    
    <p>Špatně udělané plynulé rolování to bude ignorovat a dělat si svoje.</p>
  </li>
  
  <li>
    <p>Má <b>paměťový efekt</b>. Kliknutí na jinou položku během plynulého rolování se zařadí do fronty (nezastaví předchozí posun), takže se po zběsilejším klikání stránka několik vteřiny sama různě hýbe bez zásahu uživatele.</p>
    
    <p>V jQuery k tomu stačí použít metodu <a href="https://api.jquery.com/stop/"><code>stop()</code></a>.</p>
  </li>
  
  <li>
    <p><b>Nejde používat #kotvy</b>. Při klasickém kliknutí na odkaz vedoucí na #kotvu, se přidá do adresního řádku:</p>
    
    <p><img src="/files/jednostrankovy/url-kotva.png" alt="Kotva v adresním řádku" class="border"></p>

    <p>Uživatel tak může snadno zkopírovat a poslat odkaz na přesné umístění.</p>
    
    <p>Protože změna této kotvy automaticky způsobí, že prohlížeč přeskočí na daný obsah, špatná řešení plynulého rolování toto chování zkrátka zablokují.</p>
    
    <p>Měnit <code>location.hash</code> (#kotvu v adrese) bez posunu není úplně jednoduché:</p>
    
    <div class="internal-content">
      <ul>
        <li><p><a href="/location-hash-rolovani">Změna <code>location.hash</code> bez posunu stránky</a></p></li>
      </ul>
    </div>
  </li>
  <li>
    <p><b>Nemožnost otevřít na pozadí</b> – někteří lidé si cíle odkazů otevírají kolečkem myší na pozadí (případně na ně klikají s klávesou <kbd>Ctrl</kbd>/<kbd>Shift</kbd> – otevření na pozadí / do nové záložky).</p>
    
    <p>JS řešení by toto ideálně mělo zohledňovat a neblokovat.</p>
  </li>
</ol>


<h3 id="rizeny-presun">Řízený přesun mezi stránkami</h3>

<p>Další možnost je zabránit uživateli rolovat, jak se mu zlíbí, ale při náznaku rolování dolů/nahoru ho rovnou přesunout o celou jednu obrazovku.</p>

<p>Ukázka tohoto postupu:</p>

<div class="external-content">
  <ul>
    <li><a href="http://codepen.io/suez/pen/LCHlA">One page scroll navigation with css transforms</a></li>
  </ul>  
</div>

<p>Vypadá to poměrně efektně, ale ovládání je značně nestandardní a animace celkem zdržující. Řadu uživatelů bude takové chování iritovat.</p>



<h3 id="scroll-snap">CSS vlastnost <code>scroll-snap</code></h3>

<p>V některých novějších prohlížečích jde rolování po stránkách zajistit jen pomocí CSS:</p>

<div class="internal-content">
  <ul>
    <li><a href="/scroll-snap">CSS vlastnost <code>scroll-snap</code></a></li>
  </ul>
</div>


<h2 id="zmena-url">Změna URL místo kotev</h2>

<p>Pomocí <a href="/zmena-url"><code>histoy.pushState</code></a> je možné měnit URL stránky JavaScriptem bez nutnosti <a href="/js-zmena-url">obnovovat stránku</a>.</p>

<p>Teoreticky by tak u <i>single page</i> webu šlo pro jednotlivé části místo #kotev měnit kompletní URL.</p>

<p>Není to ale moc dobrý nápad, protože bude pracné řešit situaci, kdy člověk změněnou URL zkopíruje a někomu pošle nebo nasdílí. Pro takový případ by bylo potřeba, aby na všech adresách webový server vracel tentýž obsah. Tím ale vznikne duplicitní obsah, který bude potřeba řešit kvůli <a href="/seo">vyhledávačům</a>.</p>

<p>Zdá se tak výhodnější používat obyčejné kotvy.</p>

<!--
<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Sitepoint: <a href="http://www.sitepoint.com/simple-fundamentals-designing-one-page-sites/">Simple Fundamentals of One-Page Site Design</a></li>
</ul>

-->