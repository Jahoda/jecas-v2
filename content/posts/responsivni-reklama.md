---
title: "Responsivní reklama"
headline: "Responsivní reklama na mobilech"
description: "Jak se vypořádat s reklamami při vytváření responsivního webu. Jde to vůbec?"
date: "2015-09-14"
last_modification: "2016-01-13"
status: 1
tags: ["reklama", "responsive"]
format: "html"
---

<p>Reklamy zpravidla každého jenom otravují, ale pro provozovatele webů je to jeden ze způsobů, <b>jak vydělat na provoz</b>.</p>

<p>Základní možnosti, co s reklamou na mobilu udělat, jsou:</p>

<ol>
  <li>
    <p><b>Skrýt ji</b> – to ocení návštěvníci díky rychlejšímu načítání a méně rolování pro přeskočení reklamních bloků.</p>
  </li>  
  <li>
    <p><b>Přizpůsobit ji</b> – to ocení provozovatel, protože něco vydělá i na mobilech. Na mobilních zařízeních bývá reklama méně často blokována.</p>
  </li>
</ol>

<h2 id="skryt">Schování reklamy</h2>

<pre><code>.reklama {
  display: none;
}</code></pre>


<p>Může se nabízet reklamní blok skrýt pomocí CSS konstrukce <code><a href="/display">display</a>: none</code>.</p>

<p>To sice <b>visuálně reklamu skryje</b>, ale stále se mohou úplně <b>zbytečně načítat</b> skripty, styly a obrázky.</p>

<p>Lepší je proto zvolit jednu ze dvou možností:</p>

<ol>
  <li><p>Na straně serveru <a href="/mobilni-web-url#detekce">detekovat mobilní prohlížeče</a> a vůbec jim reklamní skripty nepřipojovat.</p></li>
  <li><p>Detekovat mobily by šlo i u klienta v JavaScriptu a podle toho následně dynamicky (ne)připojovat <code>*.js</code> soubory s reklamou.</p></li>
</ol>



<div class="external-content">
  <ul>
    <li><a href="http://www.labnol.org/internet/hide-adsense-ads/17822/">How to Hide AdSense Ads on your Website</a> – jak skrýt AdSense reklamu od Google na webu</li>
  </ul>
</div>

<h2 id="prizpusobeni">Přizpůsobení</h2>

<p>Při <a href="/prevod-responsivni-design">předělávání desktopového webu na responsivní</a> se je často nutné vypořádat s různými reklamními bloky a upravit je tak, aby nepřesahovaly dostupnou šířku stránky.</p>

<p>Když je <b>reklamní banner</b> širší než dostupný prostor, stránka získá nehezký vodorovný posuvník.</p>


<p>Co s tím?</p>




<h3 id="oriznout">Oříznutí</h3>

<p>Nejsnazší je široký obsah jednoduše oříznout:</p>

<pre><code>.obal-reklamy {
  overflow-x: hidden;
}</code></pre>



<p>Stačí řezat pouze vodorovným směrem (osa X) pomocí <code>overflow<b>-x</b>: hidden</code>.</p>


<p>Nevýhoda tohoto postupu je zásadní – část obsahu reklamy nebude vidět.</p>



<h3 id="zmenseni">Zmenšení</h3>

<p>Lepší řešení je tak zmenšit reklamu, aby se na displej vešla.</p>

<p>Sestává-li reklama z prostého obrázku <code>&lt;img></code>, je situace velmi snadná. Stačí použít stejné řešení jako u <a href="/responsivni-obrazky">responsivních obrázků</a>:</p>

<pre><code>.obal-reklamy img {
  max-width: 100%; 
  box-sizing: border-box; 
  height: auto
}</code></pre>





<p>S ohledem na <a href="/vykreslovani">vykreslovaní stránky</a> není tento postup úplně ideální, protože prohlížeč do doby načtení obrázku neví, jak velký prostor zabere:</p>

<div class="internal-content">
  <ul>
    <li><a href="/rozmery-responsivniho-obrazku">Nastavení výšky responsivního obrázku</a> – řešení poskakování obrázku</li>
  </ul>
</div>

<p>U některých reklamních systému se poskakování nejde vyhnout, protože sám systém v momentě žádosti o reklamní banner nemusí vědět, jak velký objekt dostane.</p>




<h3 id="ram">Zmenšení <code>&lt;iframe></code></h3>

<p>Docela časté je, že se reklama vkládá pomocí <a href="/ramy#iframe">rámu <code>&lt;iframe></code></a>.</p>

<p>Při použití rámu jde využít trik s <a href="/vyska-podle-sirky">výškou podle šířky</a>. Rám se potom dokáže přizpůsobovat šířce, aby si <b>zachoval poměr stran</b>.</p>


<p>HTML kód bude obsahovat dva obaly pro omezení maximální šířky.</p>

<pre><code>&lt;div style="max-width: 728px">
  &lt;div class="obal-reklamy">
    &lt;iframe … width='728' height='90'>
    &lt;/iframe>
  &lt;/div>
&lt;/div></code></pre>






<p>V CSS se potom připraví kontejner s nastavenou proporcí, kam se <a href="/position#absolute">absolutně naposicuje</a> rám:</p>

<pre><code>.obal-reklamy {
    position: relative;
    height: 0;
    padding-bottom: 12.3626%;
}
.obal-reklamy iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}</code></pre>












<p>Procentuální hodnota pro <code>padding-bottom</code> se spočítá jako výška / šířka * 100. Vytvořil jsem si k tomu generátor kódu:</p>

<div class="internal-content">
  <ul>
    <li><a href="/rozmery-responsivniho-obrazku#ratio-generator">Generátor CSS kódu pro přepočet poměru stran v px na procenta</a></li>
  </ul>
</div>

<p>Stejný postup jde použít i pro jiné objekty jako je video nebo Flash.</p>


<h2 id="best-practice">Best practice</h2>

<p>Ideální je udělat reklamu přizpůsobitelnou pro různě velké obrazovky.</p>


<h3 id="text">Textová reklama</h3>

<p>V případě textové reklamy je situace nejsnazší. Text se dokáže naprosto bez problému přizpůsobovat velikosti displeje.</p>


<h3 id="svg">SVG</h3>

<p>Nejmodernější postup pro grafické bannery je použít <a href="/svg">SVG</a>. Mezi drobné nevýhody patří jeho nepodporování prohlížeči <b>IE 8</b> a starší a vyšší nároky na hardware oproti klasickému <a href="/format-obrazku">PNG/GIF obrázku</a>.</p>

<p>Hlavní výhoda je dokonalá ostrost při libovolném zmenšování či zvětšování. Jde navíc <a href="/webove-animace">animovat</a> nebo stylovat v CSS.</p>

<p>Pomocí <a href="/media"><code>@media</code></a> pravidel jde potom v závislosti na velikosti měnit uspořádání prvků na obrázku.</p>


<h3 id="vice-obrazku">Více obrázků</h3>

<p>Horšího ale nejspíš výrobně levnějšího výsledku jde docílit vytvořením více obrázků pro různé šířky.</p>

<p>Přepínat mezi různými velikostmi obrázků jde potom buď přes <code>@media</code> pravidla a obrázky vložené přes CSS <code>background</code>, nebo zvláštní HTML značkou <code>&lt;picture></code>.</p>

<p>Důležité je zajistit, aby se zbytečně nestahovaly obrázky, které nejsou potřeba:</p>

<div class="internal-content">
  <ul>
    <li><a href="/zacatek-stahovani-obrazku">Kdy začne stahování <code>&lt;img></code> obrázku</a></li>
  </ul>
</div>


<h2 id="neresitelne">Neřešitelné cizí reklamy</h2>

<p>Bohužel existují případy, kdy responsivní podobu reklamy nejde zajistit.</p>


<p>Jedná se o cizí reklamy vkládané do <code>&lt;iframe></code>. Pokud vložená stránka s reklamou není responsivní a má <b>fixní šířku</b>, neexistuje dobré řešení – styly cizí stránky v rámu nejde měnit.</p>


<p>Nabízí se tak:</p>

<ol>
  <li>Reklamu oříznout (vlastností <code>overflow</code>).</li>
  <li>Reklamu <a href="/zoom">zmenšit</a> pomocí CSS transformace (např. <code>transform: scale(0.5)</code>).</li>
  <li>Zobrazit jinou reklamu, která si s malou šířkou poradí.</li>
  
  <li>Přemluvit tvůrce reklam k vytvoření responsivní reklamy.</li>
</ol>




<h2 id="umisteni">Umístění reklamy na mobilu</h2>

<p>Vzhledem k tomu, že mobilní web je typicky v jediném sloupci, není tolik možností, kam reklamu dát.</p>


<h3 id="nad">Reklama nad stránkou</h3>

<p>U desktopových podob webu je běžné, že je nad stránkou reklamní banner.</p>


<p>Na mobilech je to trochu problematičtější, protože se tím ukrojí obzvlášť drahocenný prostor pro obsah.</p>

<p>V jistých případech to může být i matoucí, protože banner může vypadat jako záhlaví stránky.</p>

<p><img src="/files/responsivni-reklama/nahore.png" alt="Banner nahoře" class="border"></p>




















<h3 id="text">Reklama v textu</h3>

<p>Na první pohled méně otravné je vložit reklamní banner mezi text nebo obsahové bloky na stránce.</p>

<p>Návštěvník nedostane reklamní smršť na přivítanou hned po načtení stránky, ale až v průběhu listování.</p>

<p><img src="/files/responsivni-reklama/mobile-banner.png" alt="Reklama v textu" class="border"></p>










































<h3 id="fixni">Fixní banner</h3>

<p>Docela zajímavý koncept reklamy se zdá být fixní banner na spodku obrazovky, který disponuje zavíracím tlačítkem:</p>

<p><img src="/files/responsivni-reklama/fixni.png" alt="Reklama v textu" class="border"></p>

















<p>Taková reklama se může zobrazit třeba až při odrolování stránky o určitý kus, čímž na sebe upozorní.</p>

<p>Tlačítko pro skrytí fixní reklamy je docela důležité – jinak bude banner neustále zabírat značnou část prostoru.</p>



<h2 id="otravnost">Otravnost reklamy</h2>


<p>Při umisťování reklamy je nutné volit kompromis mezi otravováním uživatelů a zdánlivým příjmem z reklamy.</p>

<p>Hodně otravná reklama může být navíc postupem času důvodem, proč lidé začnou hledat způsob, jak ji blokovat, nebo přestanou web navštěvovat.</p>

<p>Vývoj příjmů z reklamy v závislosti na její otravnosti může vypadat jako na následujícím grafu:</p>


<p><img src="/files/responsivni-reklama/otravnost-reklamy.png" alt="Závislost příjmů z reklamy na otravnosti" class="border"></p>

























<p>Se zvyšující se otravností reklamy se nejprve zvyšují příjmy (čím dál tím pomaleji), potom reklama začne uživatele štvát, že se jí začnou vyhýbat:</p>

<ul>
  <li><a href="/zapnuty-adblock">blokováním reklam AdBlockem</a>,</li>
  <li>přechodem k méně otravné konkurenci</li>
</ul>



<p>Tím se web dostane do stavu, kdy je <b>zahlcen otravnou reklamou</b>, ale příjmy z ní se začnou snižovat.</p>

<p>Je velmi obtížné trefit bod, ve kterém se web právě nachází.</p>

<p>Navíc instalace AdBlocku postihne i <i>nevinné</i> weby, které reklamou své návštěvníky tolik neobtěžují.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://1gr.cz/reklama/">Rady pro tvůrce HTML bannerů</a></li>
  <li><a href="http://designerstoolbox.com/designresources/banners/">Standard Web Banners</a> – běžné rozměry reklamních bannerů</li>
</ul>