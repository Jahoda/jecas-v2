---
title: "CSS @font-face"
headline: "CSS <code>@font-face</code>"
description: "Pomocí CSS pravidla <code>@font-face</code> jde na stránce používat různá webová písma."
date: "2013-11-24"
last_modification: "2017-08-20"
status: 1
tags: ["css", "css-pravidla", "pisma"]
format: "html"
---

<p>V dávných dobách se na webu dalo používat pouze písmo, které bylo <b>nainstalováno v počítači</b>. Nastavení písma pomocí <a href="/font#font-family"><code>font-family</code></a> naštěstí funguje tak chytře, že jde <b>uvést písem víc</b> a prohlížeč použije první, které bude dostupné.</p>

<p>Pro maximální jistotu se nakonec uvádí ještě <b>obecná rodina písem</b> (nejčastěji <code>serif</code> – <span style="font-family: serif">patkové písmo</span>, <code>sans-serif</code> – <span style="font-family: sans-serif">bezpatkové písmo</span> a <code>monospace</code> – <span style="font-family: monospace">jako psací stroj</span>)</p>

<pre><code>body {
  font-family: 'Název písma', 'Záložní písmo', rodina;
}</code></pre>


<p>Použití <code>@font-face</code> nabízí připojení souboru s fontem:</p>




<h2 id="zapis">Zápis</h2>

<p>V nejjednodušším případě se uvede pouze název písma a cesta k němu:</p>

<pre><code>@font-face {
  font-family: "Název písma";
  src: url("pismo.ttf");
}</code></pre>






<p>Identifikátor „<code>Název písma</code>“ je potom běžně použitelný pro uvedení ve <code>font-family</code>.</p>

<p>Jako <code>src</code> jde uvést kromě <code>url</code> i <code>local</code>, díky čemuž prohlížeč zkusí nejprve použít lokální podobu fontu daného názvu:</p>

<pre><code>@font-face {
  font-family: "Název písma";
  src: local("Písmo"), 
       url("pismo.ttf");
}</code></pre>






<p>Při používání alespoň trochu rozšířených písem se tak může zdát dobré <code>local</code> uvést vždy pro případ, že by ho náhodou měl návštěvník nainstalovaný.</p>

<p>V praxi to zase tak dobré není, protože může dojít ke kolisi názvů. V systému může být například nainstalovaná starší verse písma, kde chybí některé znaky a podobně.</p>





<h3 id="unicode-range">Rozsah znaků <code>unicode-range</code></h3>

<p>Vlastností <code>unicode-range</code> uvnitř <code>@font-face</code> jde specifikovat rozsah znaků, na které se daný font aplikuje.</p>

<p>Zápis může vypadat třeba následovně:</p>

<pre><code>unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;</code></pre>

<p>Díky tomu se může font rozdělit do více souborů a prohlížeč potom stáhne jen ty, které jsou na stránce potřeba.</p>

<p>Podporované od <b>IE 9</b>.</p>

<h2 id="podpora">Podpora v prohlížečích</h2>

<p>Webové fonty <b>vůbec nefungují</b> v prohlížeči <b>Opera Mini</b>. Dále nefungují v mobilních <b>Internet Explorerech 9</b> a starších (mobilní <b>IE 9</b> je ve <b>Windows Phone 7</b> zařízeních, která není možné updatovat).</p>

<div class="external-content">
  <ul>      
  <li><a href="https://docs.google.com/presentation/d/1n4NyG4uPRjAA8zn_pSQ_Ket0RhcWC6QlZ6LMjKeECo0/edit#slide=id.g179004919_00">@font-face web font research</a> – přehled podpory <code>@font-face</code> v roce 2013</li>
  </ul>
</div>

<p>Nepodporování webfontů na některých zařízeních je závažným důvodem, proč nepoužívat tzv. <b>font-ikony</b> – ikony tvořené písmem.</p>

<div class="internal-content">
  <ul>
    <li><a href="/font-ikony">Font ikony</a> – proč je nepoužívat a čím je nahradit.</li>
  </ul>
</div>


<h2 id="format">Formát fontů</h2>

<p>Největším rozdílem mezi prohlížeči je v <b>podpoře formátů písma</b>. Typicky se jde setkat s formáty:</p>

<ul>
  <li><p>WOFF (<i>Web Open Font Format</i>) – koncovka <code>*.woff</code>, který je podporován od <b>IE 9</b> a od <b>Android prohlížeče 4.4</b>.</p></li>
  
  <li>
    <p>WOFF 2.0 – díky lepší kompresi než WOFF 1.0 může být datově menší. Nefunguje v <b>IE</b> a ve starších versích ostatních prohlížečů. To ale příliš nevadí, protože se v takovém případě může použít základní verse 1.0.</p>
  </li>
  
  <li>
   <p>EOT (<i>Embedded OpenType fonts</i>), koncovka <code>*.eot</code>: Podporují ho nové i staré <b>Internet Explorery</b> i <a href="/microsoft-edge"><b>MS Edge</b></a>.</p></li>
  
  <li><p>TTF/OTF (<i>TrueType / OpenType font</i>), koncovky <code>*.ttf</code> a <code>*.otf</code>: Je podporován v <b>IE 9</b> a novějších a podporuje ho i prastarý <b>Android Browser 2.2</b>.</p></li>
</ul>


<h2 id="hotova-reseni">Hotová řešení</h2>

<p>Pro zjednodušení používání webových písem existují online služby, které dokáží fonty nabízet v potřebných formátech a připravit i <code>@font-face</code> CSS deklaraci.</p>

<p>Nejznámější jsou asi <b>Google Fonts</b>, které jde na web připojovat zdarma:</p>

<div class="internal-content">
  <ul>
    <li><a href="/ceska-pisma">Česká písma z Google Fonts</a> – 250 fontů fungujících s českými znaky</li>
  </ul>
</div>

<p>Vygenerovat fonty v různých formátech dokáže například Font Squirrel:</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.fontsquirrel.com/tools/webfont-generator">Font Squirrel</a> – webfont generátor</li>
  </ul>
</div>


<h2 id="stahovani">Stahování webových fontů</h2>

<p>Nejzásadnějším problémem webových fontů je nutnost <b>stahování souboru s písmem</b>.  Písma z Google Font mají sice například jen <b>desítky kilobytů</b> – při načítání na pomalém mobilním připojení to ale už může znamenat <b>znatelnou prodlevu</b>.</p>

<p>Než se takové písmo stáhne, čelí prohlížeč dilematu:</p>

<ol>
  <li>
    <p>Vykreslit stránku <b>záložním písmem</b> a po načtení speciálního fontu ji <b>překreslit</b>. To způsobí visuálně nepěkné probliknutí.</p>
    
    <p>Pro tento jev je známa anglická zkratka <b>FOUT</b> (<i lang="en">flash of unstyled text</i>).</p>
    
    <p>V případě, že se zvláštní stahované písmo hodně liší od záložního, může se zásadněji <b>změnit rozložení stránky</b>. Proto je dobré ho nastavit co možná nejpodobnější.</p>
  </li>
  
  
  
  <li>
    <p><b>Počkat na stažení písma</b> – to je značně problematické tím, že do načtení písma zírá návštěvník na prázdnou stránku. Nemůže si textový obsah číst, ačkoliv je k disposici.</p>
    
    <p>Tento jev se potom označuje zkratkou <b>FOIT</b> (<i lang="en">flash of invisible text</i>).</p>
  </li>
</ol>

<p>Protože nezobrazení textu je větší průšvih než probliknutí, obvykle při dlouhém načítání volí prohlížeče kompromis.</p>

<p>Typicky <b>tři vteřiny</b> se čeká na stažení zvláštního písma a potom se přejde na náhradu. Návštěvník si tedy „vychutná“ oba problémy – 3 vteřiny neuvidí text, následně se zobrazí záložní písmo a nakonec stránka po dokončení načtení speciálního písma poskočí:</p>

<p><img src="/files/font-face/zobrazeni-nacitani.gif" alt="Zobrazování stránky během načítání webfontů" class="border"></p>



















<p>Není to ale pravidlo. V některých prohlížečích timeout pro přepnutí záložního písma chybí:</p>


<div class="external-content">
  <ul>
    <li>CSS Font Rendering Controls: <a href="https://tabatkins.github.io/specs/css-font-display/#intro">Chování načítání písma v různých prohlížečích</a></li>
  </ul>
</div>



<h2 id="reseni">Nejlepší řešení</h2>


<p>Je otázka, zda upřednostnit možnost rychlého čtení nebo se snažit eliminovat probliknutí.</p>

<p>Pro <b>lepší kontrolu nad chováním</b> načítání se používají různé JS knihovny jako <a href="https://github.com/typekit/webfontloader">Web Font Loader</a>.</p>

<p>Kromě toho <b>Chrome 35+</b> a <b>Opera 22+</b> mají přímo v sobě zabudované Font Loading API pro sledování načítání fontů. Nástroj <a href="https://github.com/zachleat/fontfaceonload">fontfaceonload</a> ho potom umí použít v případě, že je dostupné. Jinak se použije Web Font Loader. Pro Font Loading API nakonec existuje ještě <a href="/polyfill">polyfill</a> <a href="https://github.com/bramstein/fontloader">fontloader</a>.</p>



<p>Konkrétně Web Font Loader dokáže přidávat CSS třídy pro <code>&lt;html></code> na základě průběhu načítání písma. Čímž jde řídit dobu, kterou se má zkoušet načítat webový font a kdy se má sáhnout po systémovém písmu.</p>

<p>Více o tom v článku <b>Davida Grudla</b> popisujícím řešení připojení webfontu a čekání na něj po dobu 1 vteřiny:</p>

<div class="external-content">
  <ul>
    <li>phpFashion: <a href="https://phpfashion.com/jak-spravne-nacitat-webove-fonty">Jak správně načítat webové fonty</a></li>
  </ul>
</div>

<p>Problém trochu je, že se načítání písma zdrží ještě o načítáním dalšího JavaScriptu + je speciální písmo <a href="/bez-javascriptu">závislé na JS</a>.</p>



<h3 id="dulezitost">Je zvláštní písmo důležité?</h3>

<p>Pro rozhodování o tom, jak se s webfonty vypořádat, by měla hrát roli <b>důležitost zvláštního webového fontu</b>.</p>

<p>U <b>obsahového webu</b> bude nejspíš důležitější, aby návštěvník mohl co nejdříve začít číst.</p>

<p>A už není tolik důležité, že se obsah zobrazí jiným fontem nebo po načtení webového fontu stránka přeskočí mezi systémovým a webovým písmem.</p>

<p>Přebliknutí systémového písma a webfontu je tedy přijatelná daň a na stažení písma by se tedy nemělo čekat.</p>

<p>U stránky <b>zaměřené víc na vzhled</b> než na obsah je ale zase naopak žádoucí, aby přebliknutím netrpěla a pokud možno vždy se zobrazovala speciálním písmem.</p>



<h3 id="cekani">Vynucené čekání na font</h3>

<p>V případě, že je naprosto nutné, aby se obsah zobrazil speciálním fontem, je možné ho pomocí <a href="/data-uri">Data URI</a> vložit do zvláštního CSS souboru, který potom bude <b>blokovat vykreslování stránky</b>. Stránka se tedy zobrazí, až bude font načtený.</p>



<h3 id="cache">První načtení a cache</h3>

<p>Problém s probliknutím textu nebo jeho delší neviditelností se zpravidla týká jen <b>prvního načtení stránky</b>. Po úspěšném stažení by se písmo mělo uložit do keše prohlížeče a při zobrazení další stránky tak být ihned dostupné.</p>

<p>Teoreticky se tak při první návštěvě může použít systémové písmo a webfont pouze stáhnout pro pozdější použití. Detekovat první/opakované načtení je možné pomocí <a href="/cookies">cookies</a>. Nicméně přítomnost cookie automaticky neznamená, že je písmo nakešované.</p>

<p>Jiný způsob je webfont cacheovat do <a href="/localstorage"><code>localStorage</code></a>:</p>

<div class="external-content">
  <ul>  <li><a href="http://bdadam.com/blog/better-webfont-loading-with-localstorage-and-woff2.html">Better webfont loading with using localStorage and providing WOFF2 support</a></li></ul>
</div>



<h3 id="systemove">Používat systémové fonty</h3>

<p>Jediné 100% řešení přeblikávání písem (FOUT) i neviditelného textu (FOIT) je vůbec <b>nepoužívat webové fonty</b>.</p>

<p>Při použití písem předinstalovaných v operačním systému se žádný další font stahovat nemusí, nic není neviditelné a nic nebliká.</p>

<p>Nepoužívání webfontů neznamená, že stránka musí být jen fonty jako je  <span style="font-family: 'Times New Roman', serif">Times New Roman</span> nebo <span style="font-family: 'Arial', sans-serif">Arial</span> – existují i další písma předinstalovaná v operačních systémech.</p>

<p>Pokud nevadí, že stránka používá <b>různé písmo na různých platformách</b>, jde při nastavování <code>font-family</code> vyjmenovat více písem specifických pro danou platformu.</p>


<div class="live">
  <style>
  .systemovym {font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;}
  </style>
  <p class="systemovym">Tento text se zobrazuje výchozím systémovým písmem dané platformy.</p>
</div>

<p>Problematikou systémových fontů se zabývá samostatný článek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/systemova-pisma">Systémová písma</a> – jak a proč používat lokální písma dostupné v operačních systémech</li>
  </ul>
</div>



<h3 id="podobny-sytemovy">Podobný systémový font</h3>

<p>Pro minimalisaci probliknutí po načtení systémového písma existuje šikovný nástroj <a href="https://meowni.ca/font-style-matcher/">Font style matcher</a>.</p>

<p>Vhodnou konfigurací velikosti (<a href="/font#size"><code>font-size</code></a>), výšky řádku (<a href="/font#line-height"><code>line-heigh</code></a>) nebo mezer mezi písmeny (<a href="/letter-spacing"><code>letter-spacing</code></a>) a slovy (<a href="/word-spacing"><code>word-spacing</code></a>) dokáže docílit proporčně podobného systémového písma k speciálnímu „web fontu“.</p>


<h2 id="font-display">CSS vlastnost <code>font-display</code></h2>

<p>Pro řešení případů, co se má dělat před načtením písma, bude v budoucnu sloužit CSS vlastnost <code>font-display</code>:</p>

<pre><code>@font-face {
  font-display: auto | block | swap | fallback | optional;
}</code></pre>

<div class="external-content">
  <ul>
    <li><a href="https://tabatkins.github.io/specs/css-font-display/">CSS Font Rendering Controls Module Level 1</a></li>
  </ul>
</div>




<h2 id="cestina">Podpora českých znaků</h2>

<p>Další bolístkou zvláštních písem je případná absence některých speciálních znaků – typicky háčků a čárek.</p>

<p>V lepším případě se tyto neznámé <b>znaky s diakritikou</b> zobrazí jiným stylem písma – což bude trochu ošklivé, ale řada lidí si toho vůbec nemusí všimnout.</p>

<p><img src="/files/font-face/ie.png" alt="Špatné zobrazení diakritiky" class="border"></p>













<p>Horší případ je, když se místo chybějících znaků zobrazí pouze křížky<!-- (dělá to často stará <b>Opera 12</b>)-->:</p>

<p><img src="/files/font-face/opera-12.png" alt="Špatné zobrazení diakritiky" class="border"></p>













<p>V některých prohlížečích nepodporujících vlastní fonty se potom text zobrazí nějakým systémovým písmem (to dělá <b>Opera Mini</b>):</p>


<p><img src="/files/font-face/opera-mini.png" alt="Špatné zobrazení diakritiky" class="border"></p>








<h3 id="podpora">Jak zjistit podporu českých znaků?</h3>

<p>Z Google Fonts jsem se pokusil automaticky určit ta písma, která českou diakritiku obsahují:</p>

<div class="internal-content">
  <ul>
    <li><a href="/ceska-pisma">Česká písma (250 fontů)</a></li>
  </ul>
</div>

<p>Pro detailní zkoumání konkrétních písem vytvořil <b>Chamurappi</b> speciální nástroj:</p>

<div class="external-content">
  <ul>
    <li><a href="http://fontokuk.webylon.info">Fontokuk</a> – Jednoduchý nástroj na testování přítomnosti znaků v písmech</li>
  </ul>
</div>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>DevDocs: <a href="http://devdocs.io/css/@font-face"><code>@font-face</code></a></li>
   

  
  <li><a href="http://www.filamentgroup.com/lab/font-events.html">Font Loading Revisited with Font Events</a></li>
  
  <li><a href="https://viget.com/extend/the-font-face-dilemma">The @font-face dilemma</a></li>
  
 
  <li><a href="http://bramstein.com/writing/web-font-anti-patterns.html">Web Font Anti-Patterns</a> – čemu se vyvarovat při používání webfontů</li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/4-expert-tips-google-fonts/">4 Expert Tips for Getting the Most Out of Google Fonts</a> – tipy pro optimalisaci Google fontů</li>
  
  <li><a href="http://bramstein.com/writing/detecting-system-fonts-without-flash.html">Detecting System Fonts Without Flash</a> – detekce instalovaných systémových fontů</li>  
  
  <li><a href="http://www.sitepoint.com/joy-of-subsets-web-fonts/">The Joy of Subsets: Crossbreeding Web Fonts</a></li>
  
  <li><a href="http://www.zachleat.com/web/critical-webfonts/">Critical Web Fonts</a></li>

</ul>

<!-- Změna plynulým probliknutím: https://kod.djpw.cz/udsb 

Náhled: https://kod.djpw.cz/vdsb
-->