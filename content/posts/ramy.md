---
title: "Rámy v HTML"
headline: "HTML rámy"
description: "Rámy v HTML umožňují zobrazit na jedné stránce obsah z více různých zdrojů."
date: "2015-07-09"
last_modification: "2015-10-14"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>V dřívějších dobách bylo běžné sestavovat stránku pomocí rámů. Při používání prostého HTML to byl (a stále je) snadný způsob, jak spravovat <b>obsah společných částí</b>.</p>

<p>Dnes se rámy používají především pro <b>vkládání obsahu z cizích stránek</b>. Jsou tak <a href="/youtube-vlozit">vkládána videa z YouTube</a>, pluginy ze sociálních sítí jako třeba <a href="/responsivni-facebook">Facebook Like tlačítko</a> nebo reklamy.</p>

<p>Výhoda rámu je <b>oddělení stránky A</b> se značkou <code>&lt;iframe></code> od <b>stránky B</b>, která se do rámu načítá. Stránka B si tak zachová svůj původní styl. To se při vkládání obsahu externím JavaScriptem nestane – skriptem vložený kód se stane normální součástí stránky. Totéž platí při <a href="/stazeni-stranky">stahování cizí stránky</a> v PHP.</p>






<h2 id="bezpecnost">Bezpečnost rámů</h2>

<p>Protože se stránka v rámu chová v podstatě stejně jako stránka v nové záložce – uživatel je v ní přihlášen a podobně – možnost používat rámy může způsobovat <b>bezpečnostní risika</b>.</p>

<p>Když se na stránku přidá nějaké lákavé tlačítko a přes něj se umístí neviditelná stránka v rámu, jde tak přimět uživatele, aby v přihlášené stránce v rámu provedl nějakou akci:.</p>

<div class="internal-content">
  <ul>
    <li><a href="/clickjacking">Clickjacking</a> – získání kliknutí od uživatele, aniž by o tom věděl</li>
  </ul>
</div>

<p>Někteří provozovatelé webů proto načtení svého webu do rámu blokují HTTP hlavičkou <code>X-FRAME-OPTIONS: SAMEORIGIN</code>.</p>

<p>Výchozí chování dále zabraňuje JavaScriptu v přístupu do <b>rámu z externí URL</b>.</p>

<p><img src="/files/ramy/externi-ram-js.png" alt="Pokus o přístup obsahu externí stránky" class="border"></p>











<p>Totéž platí pro stránku, která je do rámu vložená: <b>nemůže se dostat</b> ke svému rodiči.</p>


<h3 id="vyskoceni">Vyskočení z rámu</h3>

<p>Existuje jedna možnost, jak může stránka vložená do rámu <b>opustit svou nadřazenou stránku</b>:</p>

<pre><code>window.top.location = "http://jecas.cz";</code></pre>

<p>Když se toto do stránky umístí a stránka se vloží do <code>&lt;iframe></code>, po načtení rámu bude přesměrováno na <code>http://jecas.cz</code>.</p>

<p>Při použití <code>#kotvy</code> je to možnost, jak z vložené stránky předat <i>nahoru</i> nějaká data:</p>

<pre><code>window.top.location = "#data";</code></pre>


<!-- Než prohlížeče toto chování zavedly, dalo se díky tomu <i>vyskočit</i> z rámu, když si někdo nepřál, aby se jeho web do rámu načítal.-->


<h2 id="iframe">Rám <code>&lt;iframe></code></h2>

<p>Značka <code>&lt;iframe></code> má <a href="/html-znacky#povinne">povinnou koncovou značku</a>. Použití <i>iframe</i> pro vložení videa z YouTube vypadá následovně:</p>

<pre><code>&lt;iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/6HT-yirOGoo" 
  frameborder="0" 
  allowfullscreen
>
&lt;/iframe></code></pre>











<h3 id="atributy">Atributy <code>&lt;iframe></code></h3>

<ul>
  <li>
    <p><code id="width">width</code> a <code id="height">height</code> – šířka a výška</p>
  </li>
  
  <li id="src">
    <p><code>src</code> – stránka, která se do rámu načte</p>
  </li>
  
  <li id="allowfullscreen">
    <p><code>allowfullscreen</code> – v podporovaných prohlížečích je nutný k možnosti zobrazit obsah z rámu přes celou obrazovku (jeho podpora se bude zvyšovat), pro starší <b>Webkity</b> a <b>Gecka</b> existuje tento atribut s prefixy <code>mozallowfullscreen</code> a <code>webkitallowfullscreen</code></p>
    
    <div class="external-content">
      <ul>
        <li><p><a href="https://kod.djpw.cz/ddob">Test atributu <code>allowfullscreen</code></a></p></li></ul></div>
  </li>
  
  <li id="frameborder">
    <p><code>frameborder</code> – rámy mají ve výchozím stylu rámeček <code>border: 2px inset</code>, tímto atributem nebo <b>pomocí CSS</b> jde zrušit</p>
    
    <p>Atribut <code>frameborder</code> je <b><a href="/validita">nevalidní</a> v HTML 5</b>, ale při nabízení kódu pro vložení na stránky se z praktických důvodů používá. Výchozí rámeček je typicky nežádoucí a autor webu, co rám na svou stránku vkládá, by ho nemusel umět zrušit.</p>
    
    <p><img src="/files/ramy/frameborder.png" alt="Nevalidní atribut frameborder" class="border"></p>
        
        
    
  </li>
  
  <li id="name">
    <p><code>name</code> – pro otevírání cíle odkazu ze stránky do rámu je nutné rám pojmenovat, stejná hodnota jako atributu <code>name</code> se potom zadá do <code>target</code> u <a href="/odkaz">odkazu</a></p>
  </li>
</ul>

<h3 id="nove">Nové HTML 5 atributy</h3>

<ul>
  <li id="sandbox">
    <p><code>sandbox</code> – atribut slouží pro <b>zvýšení ochrany</b> stránky, která do sebe vkládá cizí web pomocí <code>&lt;iframe></code></p>
    
    <p>Podporují prohlížeče <b>IE 10</b>, <b>Chrome 4</b>, <b>Firefox 17</b>, <b>Opera 15</b> a novější.</p>
    
    <p>Samotné uvedení atributu <code>sandbox</code> zakazuje několik věcí (uvedeno níže). Pokud je třeba povolit některou z nich, přidá se do hodnoty atributu (hodnot <code>allow-*</code> může být uvedeno více, oddělují se mezerou).</p>
    
    <ul>
      <li id="allow-same-origin"><code>allow-same-origin</code> – Stránka v rámu se bude chovat jako by byla stejného původu jako stránka, která ji do rámu načítá</li>
      
      <li id="allow-top-navigation"><code>allow-top-navigation</code> – Stránka z rámu může způsobit přechod na jinou URL u nadřazené stránky.</li>
      
      <li id="allow-forms"><code>allow-forms</code> – Stránka v rámu může odesílat formuláře.</li>
      
      <li id="allow-popups"><code>allow-popups</code> – Povolí zobrazování <a href="/nove-okno">vyskakovacích oken</a>.</li>
      
      <li id="allow-scripts"><code>allow-scripts</code> – Povolí spouště skripty.</li>
      
      <li id="allow-pointer-lock"><code>allow-pointer-lock</code> – Umožní stránce v rámu sledovat pohyby myši.</li>     
    </ul>
  </li>
  
  <li id="seamless">
    <p><code>seamless</code> – má sloužit k <b>těsnému propojení</b> rodičovské stránky a stránky v rámu</p>
    
    <p>Obsah rámu by tak měl dědit CSS od svého rodiče, otevírat odkazy v nadřazeném okně a podobně. V říjnu 2015 ho nepodporoval žádný prohlížeč.</p>
  </li>
  
  <li id="srcdoc">
    <p><code>srcdoc</code> – existuje kvůli zpětné kompatibilitě. Pokud bude prohlížeč <code>srcdoc</code> znát, dá se očekávat, že bude znát i atributy <code>sandbox</code> a <code>seamless</code>. V takovém případě se tímto atributem dá <b>změnit cíl rámu</b> na stránku, která s tím bude počítat.</p>
  </li>
</ul>

<h3 id="zastarale">Zastaralé atributy</h3>

<p>Řada dalších, především presentačních, atributů byla v HTML 5 označena jako zastaralé a nejsou validní.</p>

<ul>
  <li id="align"><code>align</code> – zarovnávání (jde použít <a href="/float"><code>float</code></a>)</li>
  
  <li id="margin"><code>marginheight</code>, <code>marginwidth</code> – odsazení (nahrazuje <a href="/margin"><code>margin</code></a>)</li>
  
  <li><code>frameborder</code> – nahrazuje CSS <code>border</code>, ale stále se používá kvůli výchozímu rámečku</li>
  
  <li id="scrolling"><code>scrolling</code> – skryje posuvníky a zabrání rolování</li>
  
  <li id="longdesc"><code>longdesc</code> – URI s popisem rámu</li>
</ul>


<h3 id="automaticka-vyska">Automatická výška rámu</h3>

<p>Při vložení stránky pomocí <code>&lt;iframe></code> není elegantní nutnost nastavovat pevnou výšku. Když je obsah delší, zobrazuje se potom posuvník. Pro stránky ze stejné domény to jde řešit JavaScriptem:</p>

<div class="internal-content">
  <ul>
    <li><a href="/vyska-iframe">Automatická výška <code>&lt;iframe></code> podle obsahu</a> – nastavení výšky rámu podle obsahu</li>
  </ul>
</div>


<h2 id="frameset">Použití značky <code>&lt;frameset></code></h2>

<p>Pomocí značky <code>&lt;frameset></code> se hlavní stránka <code>index.html</code> rozdělila na několik částí a pomocí značky <code>&lt;frame></code> se do těchto oblastí připojil obsah.</p>

<p><img src="/files/ramy/frameset.png" alt="Rozvržení stránky pomocí rámů" class="border"></p>


















<p>Z menu (<code>menu.html</code>) potom vedly odkazy s nastaveným cílem (atribut <code>target</code>) do rámu pro obsah.</p>

<p>Používání rámů přináší značné nevýhody:</p>

<ol>
  <li>Návštěvník se může dostat například na stránku <code>obsah.html</code> bez zobrazení menu a hlavičky.</li>
  
  <li>Během procházení webu je <b>adresa</b> zobrazená v liště prohlížeče stále stejná.</li>
  
  <li>Stejně tak je stále stejný <b>titulek stránky</b> (značka <code>&lt;title></code>).</li>
</ol>

<div class="external-content">
  <ul>
    <li>Jak psát web: <a href="http://www.jakpsatweb.cz/ramy-problemy.html">Problémy rámů aneb proč je nepoužívat</a> – popis dalších problémů rámů</li>
  </ul>
</div>

<p>S rozšířením <b>podpory PHP</b> a dalších programovacích jazyků na straně serveru přestal být problém stránku skládat z jednotlivých kousků. Přestal tak být důvod rámy hojně používat.</p>

<div class="internal-content">
  <ul>
    <li><a href="/include">Složení jednoduchého webu v PHP</a> – pospojování webu z kousků funkcí <code>include</code></li>
  </ul>
</div>

<p>V PHP potom vznikla řada <b>redakčních systémů</b>, které skládání výsledných stránek řeší automaticky. Autor webu tedy ani nemusí umět programovat.</p>

<p>Používání rámů <code>&lt;frameset></code> + <code>&lt;frame></code> nakonec bylo označeno jako <b>zastaralé/překonané v HTML 5</b> a není tedy validní:</p>


<p><img src="/files/ramy/obsolete.png" alt="Nevalidní značka frameset" class="border"></p>




<h2 id="noframes">Alternativní obsah</h2>

<p>V případě, že prohlížeč <b>nepodporuje nebo blokuje rámy</b>, jde přidat dovnitř elementu alternativní obsah.</p>

<p>U značky <code>&lt;iframe></code> přímo mezi její počáteční a koncovou značku.</p>

<pre><code>&lt;iframe>
  Alternativní obsah
&lt;/iframe></code></pre>

<p>Dříve se ještě pro alternativní obsah ke značce <code>&lt;frameset></code> používala značka <code>&lt;noframes></code>. Ta je v HTML 5 označena jako překonaná.</p>

<!--
<h2 id="nahrada">Náhrada rámů</h2>

<p>Náhradit <code>&lt;frameset></code> jde pomocí několika <code>&lt;iframe></code> a jejich umístěním pomocí CSS.</p>

<p>Aternativou k <code>&lt;iframe></code></p>-->