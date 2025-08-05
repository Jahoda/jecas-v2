---
title: "Tisk stránky"
headline: "Vytisknutí stránky"
description: "Jak správně připravit webovou stránku pro pohodlné vytištění."
date: "2014-10-28"
last_modification: "2018-08-17"
status: 1
tags: ["css", "hotova-reseni", "js", "napady"]
format: "html"
---

<p>Ačkoliv s nástupem <b>chytrých mobilních zařízení</b> a dostupnějšího internetu není už taková potřeba weby tisknout na papír, stále mohou nastat případy, kdy je žádoucí vhodnou tiskovou podobu připravit.</p>


<h2 id="vyvolani">Vyvolání dialogu <i>Tisk</i></h2>

<p>Usnadnit návštěvníkům stránky tištění jde jednoduchým skriptem. Takto bude vypadat <b>tlačítko k vytištění</b> – vyvolá dialog <i>Tisk</i>. Totéž se vyvolává většinou klávesovou zkratkou <kbd>Ctrl</kbd> + <kbd>P</kbd> nebo z nabídky prohlížeče pod položkou <i>Tisk</i>.</p>

<pre><code>&lt;button onclick="<b>window.print()</b>">
  Vytisknout
&lt;/button></code></pre>

<div class="live"><button onclick="window.print()">
  Vytisknout
</button></div>







<h2 id="zpusoby">Možné přípravy k tisku</h2>

<p>Pokud výchozí podoba stránky není úplně ideální, lze tomu po <b>technické stránce</b> pomoci třemi způsoby (případně je kombinovat):</p>

<ol>
  <li>
    <p>Tiskovou stránku připravit <b>změnou CSS</b>, slouží k tomu CSS pravidlo / HTML atribut <code>@media</code>/<code>media</code>:</p>
  </li>
  
  <li>
    <p>Pro účely tištění <b>na straně serveru</b> vygenerovat zjednodušenou podobu téže stránky. Jen pouze s obsahem určeným k tisku.</p>
  </li>
  
  <li>
    <p>Zjednodušenou podobu stránky <b>připravit JavaScriptem</b>.</p>
  </li>
</ol>


<h2 id="tiskovy-styl">Tiskový styl</h2>

<p>Připojit ke stránce tiskový styl jde buď již zmíněným <code>@media print</code> pravidlem (pozor, <code>print</code> se nepíše do závorky, když to tak napíšete, tak to nebude fungovat):</p>

    
<pre><code>@media <b>print</b> {
  /* styly se aplikují při tisku */
}</code></pre>


<p>Nebo značkou <code>&lt;link></code>:</p>


<pre><code>&lt;link rel='stylesheet' href='tiskovy-styl.css' media='<b>print</b>'></code></pre>

<p>Či přes CSS <code>@import</code>:</p>

<pre><code>@import url('style/print.css') <b>print</b>;</code></pre>


<p>Podstatná nevýhoda externího tiskového souboru tkví ve skutečnosti, že <b>bude zdržovat načítání stránky</b>, i když nebude potřeba. Styly se stahují, i když se kvůli (<code>media=print</code>) nepoužijí. (Více o problematice v anglickém článku <a href="https://www.nccgroup.com/en/blog/2014/10/does-a-print-css-file-slow-your-site-down/">Does a print CSS file slow your site down?</a>.)</p>

<p>Přidání tiskových pravidel do <b>hlavního CSS</b> proto vypadá jako lepší volba (pokud těch tiskových pravidel není moc).</p>

<p>V tiskové stylu je obvykle dobré nastavit <b>černý text na bílém pozadí</b>, abychom tisknoucímu uživateli zbytečně moc neplýtvali inkoustem či jinou náplní v jeho tiskárně (některé novější prohlížeče to dělají automaticky).</p>


<p>Hodí se odkrýt i obsah <b>skrytý v atributech</b>, typicky popisky <code>title</code> nebo možná i cíle odkazů (<code>href</code>). Jde to snadno kombinací <a href="/content-attr"><code>content</code> + <code>attr()</code></a>.</p>


<p>Dilema potom nastává při určování, které prvky stránky <b>nechat tisknout</b>, a které schovat pomocí <code>display: none</code>, čímž je z tisku vyjmout. Můžeme tím uživateli <b>nepěkně zavařit</b>, protože zrovna to, co by chtěl, si třeba nebude moci vytisknout.</p>


<p>Výhodou řešení tiskovým stylem je relativně <b>nízká pracnost</b>. Stačí jen použít pár CSS pravidel. Ulehčit práci (ale často i přidat záhadné problémy) při přepisování původních vzhledů umí příkaz <code>!important</code>.</p>

<pre><code>.menu {
  display: none!important;
}</code></pre>


<p>Menu se skryje i v případě, že ho zviditelňuje (<code>display: block</code>) <b>silný selektor</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://css-tricks.com/print-stylesheet-approaches-blacklist-vs-whitelist/">Print Stylesheet Approaches: Blacklist vs Whitelist</a> – 2 postupy, kterými tvořit tiskový styl</li>
  </ul>
</div>


<h2 id="zvlastni-stranka">Zvláštní stránka pro tisk</h2>

<p>Další možnost je na straně serveru připravit upravenou (zjednodušenou) podobu, kde bude jenom <b>hlavní obsah</b>, s minimem CSS. Může to být snazší než přes styly <b>skrývat různé části</b> webu.</p>

<p>Zvláštní tiskovou stránku je dobré kvůli vyhledávačům <b>zakázat indexovat</b>, aby nehrozil vznik <b>duplicit</b>.</p>

<p>Zakázat indexování jde přes <code>&lt;meta></code> značku:</p>

<pre><code>&lt;meta name="robots" content="noindex,nofollow,nosnippet,noarchive"></code></pre>

<p><b>Lepší</b> je to ale i v souboru <a href="http://www.jakpsatweb.cz/robots-txt.html"><code>robots.txt</code></a>, protože na stránku s <code>&lt;meta></code> tagem mohou roboti zbytečně chodit.</p>

<p>Odkaz na <b>versi pro tisk</b> můžeme navíc doplnit o <code>rel="nofollow"</code> nebo ho realisovat JavaScriptem, aby lákal roboty co možná nejméně.</p>

<p>Trochu problém může nastat, když někdo bude <b>stránku pro tisk sdílet</b>, takže by na ní neměl chybět odkaz na <b>originální podobu</b> / hlavní stránku.</p>

<p>Výhoda tohoto postupu je v tom, že má návštěvník <b>na výběr ze dvou variant</b>, co si vytiskne.</p>

<ol>
  <li>Buď web v <b>původní podobě</b>, podobně jako ho vidí na monitoru,</li>
  <li>nebo ve variantě upravené pro tisk.</li>
</ol>










<h2 id="js">Zvláštní stránka vytvořená JavaScriptem</h2>

<p>Zajímavá metoda je samostatnou stránku pro tisk <b>připravit JavaScriptem</b>. Odpadá tím pracné vytváření speciální stránky na <b>serveru</b>, odpadá tím nutnost zaobírat se případnou duplicitou ve vyhledávačích nebo řešit, co se stane, když speciální stránku bude někdo sdílet. Skriptem vygenerovaná <i>stránka</i> pro tisk nebude mít žádnou URL.</p>


<p><b>Jak na to?</b> JavaScriptem si <a href="/nove-okno#window-open-dalsi">otevřeme nové okno</a> (<code>window.open</code>), kam nastrkáme příslušný HTML kód, co chceme tisknout, a <b>spustíme tisk</b>.</p>

<pre><code>function vytisknout(htmlKod, titulek) {
    var w = 800, // šířka okna
        h = 600, // výška okna
        left = (window.screen.width - w) / 2,
        top = (window.screen.height - h) / 2;
    var okno = window.open(
        '', // URL žádná není
        'oknoTisk', // název okna
        "height=" + h + ", width=" + w + 
        ", left=" + left + ", top=" + top + 
        ", location=no, menubar=yes, status=no, toolbar=no, scrollbars=yes, resizable=yes");
    okno.document.write(
      '&lt;!doctype html>&lt;meta charset="utf-8">&lt;title>' + 
      titulek + 
      '&lt;/title>'
    );
    okno.document.write(htmlKod);
    okno.document.close();
    okno.focus();
    okno.print();
    okno.close();
}</code></pre>

<p>Kromě HTML kódu se funkci <code>vytisknout</code> předává i <code>titulek</code>. Ten se v HTML kódu dá do <code>&lt;title></code> a slouží k ovlivnění textu, který se tiskne do <b>záhlaví</b>. Obdobně můžeme připojit případné <b>externí CSS</b> nebo styly uvést přímo do značky <code>&lt;style></code>.</p>

<p>Jinak funkce dělá stručně následující:</p>

<ol>
  <li>Nastaví rozměr vyskakovacího okna na 800 × 600.</li>
  <li>Podle <a href="/zjisteni-rozmeru">velikosti rozlišení</a> umístí okno (přibližně) doprostřed.</li>
  
  <li>Jako obsah okna vloží požadovaný HTML kód (<code>okno.document.write</code>).</li>
  
  <li>Kvůli některým prohlížečům dá pro jistotu oknu <code>focus</code>.</li>
  
  <li><b>Vytiskne stránku</b> – <code>okno.print()</code>.</li>
  
  <li>Zavře okno s obsahem pro tisk – <code>okno.close()</code>.</li>
</ol>
























<h3 id="js-pouziti">Použití</h3>

<p>Použití funkce je prosté. Předá se jí HTML kód – například <a href="/innerhtml"><code>innerHTML</code></a> požadovaného elementu.</p>

<pre><code>&lt;button onclick="
    vytisknout(
        document.getElementById('<b>id-prvku-pro-tisk</b>').<i>innerHTML</i>, 
        'Titulek tisknuté stránky'
        )">
    Vytisknout element s ID „id-prvku-pro-tisk“
&lt;/button>
</code></pre>


<p><a href="http://kod.djpw.cz/jygb">Živá ukázka</a></p>







<h2 id="zobrazeni-nahledu">Zobrazení náhledu tištěné stránky</h2>

<p>Uživatelům majícím špatné zkušenosti z tištění webů může vadit, že se vyvolá tiskový dialog, aniž by bylo jasné, <b>co se ve skutečnosti vytiskne</b>. Ne všechny prohlížeče disponují náhledem po zavolání <code>window.print</code>.</p>

<p>Řešení je umístit <b>tlačítko přímo vyvolávající tisk</b> až do vyskakovacího okna a tiskový dialog nevyvolávat automaticky. Neměli bychom zapomenout tlačítko <i>Tisk</i> při tisku skrýt:</p>

<pre><code>@media print {
  .tlacitko-tisk {display: none}
}</code></pre>

<p>Druhá možnost je zajistit tiskový náhled ve vlastní režii přímo na původní stránce. Tj. po kliknutí na nějaké tlačítko aplikovat tiskový styl. A to:</p>

<ul>
  <li>
    <p>Dynamickým připojením tiskového CSS jako úplně běžného souboru se styly.</p>
    
    <pre><code>var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '<b>tiskovy-styl.css</b>';
document.getElementsByTagName('head')[0].appendChild(link);</code></pre>
  </li>
  
  <li>
    <p>Změnit třídu společnému rodiči stránky (<code>&lt;html></code>/<code>&lt;body></code>). <a href="/prepinani-trid">Přidat/odebrat</a> třídu <code>nahled-tisku</code>, která se dále použije ke stylování.</p>
    
    <pre><code>/* menu tisknou nebudeme */
.nahled-tisku .menu {
  display: none;
}
</code></pre>
    
    <p><a href="http://kod.djpw.cz/lygb-">Živá ukázka</a></p>
  </li>
</ul>


<h2 id="tiskovy-nahled">Náhled tisku v prohlížeči</h2>

<p>Pro testování vzhledu při tisku vlastních webů se hodí funkce <b>Tiskový náhled</b>, kterou disponuje většina prohlížečů.</p>

<p>Ve <b>Firefoxu</b> a <b>Chrome</b> se objeví při volbě <i>Tisk</i> z menu. V <b>Exploreru</b> je v menu v nabídce <i>Tisk</i> → <i>Náhled</i>. V nové <b>Opeře 25</b> jsem tiskový náhled nenašel.</p>

<p>Ukázka náhledu v <b>Chrome</b>. Pozadí je automaticky odebráno.</p>

<p><img src="/files/tisk/tiskovy-nahled.png" alt="Tiskový náhled v Chrome" class="border"></p>

<p>Pro zkušební tisk bez plýtvání papíru se hodí <b>tisk do PDF</b>. <b>Chrome</b> to umí přímo. Pro ostatní prohlížeče je řešením instalace tzv. <i>PDF tiskárny</i>, což je program, který se tváří jako klasická tiskárna, jen místo mačkání a zasekávání papíru ukládá výstup do PDF.</p>








































































<h3 id="print-color-adjust">Úprava barev <code>-webkit-print-color-adjust
</code></h3>

<p>Prohlížeče vycházejí z <b>Webkitu</b> (<b>Chrome</b>, <b>Opera</b> apod.) podporují vlastnost <code>-webkit-print-color-adjust</code> – ta může mít dvě hodnoty (kromě globálních <code>initial</code>, <code>initial</code> a <code>unset</code>):</p>

<ul>
  <li>
    <code>economy</code> – výchozí hodnota, při které se netisknou některé grafické prvky jako třeba pozadí, aby se neplýtvalo barvou
  </li>
  <li>
    <code>exact</code> – web se vytiskne bez úprav
  </li>
</ul>

<!-- https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeprint -->