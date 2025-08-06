---
title: "Ikona stránky favicon"
headline: "Ikona stránky favicon"
description: "Jak správně vytvořit ikonku stránky (favicon) pro desktop i mobily."
date: "2014-05-18"
last_modification: "2015-11-20"
status: 1
tags: ["hotova-reseni", "html", "ikony"]
format: "html"
---

<p>Pro <b>lepší orientaci návštěvníka</b> mezi otevřenými záložkami je velmi vhodné přidat k webu malou ikonku – tzv. <i>favicon</i></p>

<p><img src="/files/favicon/taby.png" alt="Ikonky u záložek" class="border"></p>

<p>Při velkém počtu otevřených <i>tabů</i> je malá (16 × 16 pixelů) ikonka hlavním orientačním prvkem, jak požadovanou záložku najít.</p>

<p>Z tohoto důvodu jde považovat <b>absenci ikony</b> za velkou chybu s ohledem na použitelnost.</p>

<p>Kromě otevřených tabů se ikonka vyskytuje v <i>Liště záložek</i>. <b>Chrome</b>, <b>Firefox</b> nebo <b>Opera 15+</b> ji mohou zobrazovat hned pod adresním řádkem:</p>



<p><img src="/files/favicon/lista-zalozek.png" alt="Ikonky u záložek" class="border"></p>







<p>Další argument, proč soubor <code>favicon.ico</code> s ikonkou mít, je ten, že prohlížeč se na danou adresu podívá automaticky. Je zbytečné, aby takový pokus skončil <b>chybou 404</b>.</p>


<h2 id="nazev">Název <code>favicon.ico</code></h2>

<p>V dávných dobách, kdy ještě webové prohlížeče nepodporovaly prohlížení v záložkách (např. <b>IE 6</b> a starší), se prohlížeč po uložení stránky do oblíbených podíval, za existuje ikonka na adrese <code>example.com/favicon.ico</code> a pokusil se ji použít. Proto název <i>favicon</i> – zkratka favorite icon.</p>

<p>Jak fungovaly favicony před cca 15 lety popisuje historický článek:</p>

<div class="external-content">
  <ul>
    <li>Jak psát web: <a href="http://www.jakpsatweb.cz/favicon.html">Ikona stránky</a></li>
  </ul>
</div>



<p>Novější prohlížeče potom tento v podstatě standard převzaly a začaly ikonky nazvané <code>favicon.ico</code> zobrazovat u jednotlivých listů.</p>

<p>Pro přidání ikonky stránky tak stačí pouhé umístění souboru ve formátu <code>*.ico</code> do kořenového adresáře dané domény nebo subdomény.</p>









<h2 id="link">Značka <code>&lt;link></code></h2>

<p>Protože používání ikonky jen na základě umístění není moc transparentní, existuje ještě zvláštní hodnota <code>rel</code> atributu značky <code>&lt;link></code>, která se dává do hlavičky stránky a umí na ikonku ukázat.</p>


<pre><code>&lt;link rel="shortcut icon" href="ikona.ico" type="image/x-icon"></code></pre>



<p>Soubor s ikonou se potom může <b>jmenovat libovolně a nemusí být pouze v kořenu domény</b>. Pokud takové požadavky nejsou, je jeho použití zbytečné.</p>


<p>Při nepoužití <code>&lt;link></code>u a už nakešované favikoně se prohlížeče typicky na souboru <code>favicon.ico</code> nedotazují, ale berou ho automaticky z disku. Při uvedení ikony v <code>&lt;link></code>u se například v <b>Chrome</b> vyšle HTTP požadavek na danou URL.</p>

<p>Použít <code>&lt;link></code> na jednu stranu může být zbytečná režie pro návštěvníka, ale zase to teoreticky může znamenat rychlejší obnovení staré nakešované ikonky.</p>





<h2 id="cache">Dlouhé cacheování</h2>

<p>Vzhledem k tomu, že si prohlížeče soubor <code>favicon.ico</code> dokáží najít automaticky, mají tendenci si ho potom <b>ponechat na dlouhou dobu</b> v dočasných souborech.</p>

<p>I po mnoha <b>měsících nebo letech</b> se může zobrazovat stará podoba ikonky. Proto je dobré ji moc <b>neměnit</b>.</p>

<p>Případně ikonku připojit značkou <code>&lt;link></code> a po změně ikonky změnit název souboru.</p>





<h2 id="velikost">Velikost ikony</h2>

<p>Favikona u jednotlivých tabů se zobrazuje v desktopových prohlížečích ve velikosti <b>16 × 16 px</b>.</p>

<p>Prohlížeče <a href="/microsoft-edge"><b>MS Edge</b></a> a <a href="/ie11"><b>IE 11</b></a> ji v jiné velikosti zobrazují v „rychlém přístupu“.</p>

<p><b>Edge</b> ji zobrazuje v rozlišení <b>40 × 40 pixelů</b>:</p>

<p><img src="/files/favicon/edge.png" alt="Favikony v Edge" class="border"></p>












<p><b>IE 11</b> potom v rozměrech <b>32 × 32 px</b>:</p>

<p><img src="/files/favicon/ie11.png" alt="Favikony v Edge" class="border"></p>
















<p>Ostatní prohlížeče v <b>rychlém přístupu</b> zobrazují přímo náhled stránky. <b>Firefox</b> pouze web, <b>Chrome</b> potom ještě s ikonou v rozměrech 16 × 16:</p>

<p><img src="/files/favicon/chrome.png" alt="Favikony v Chrome" class="border"></p>













<h2 id="vetsi-ikony">Větší ikony na mobilech/tabletech</h2>


<h3 id="ios">iOS zařízení</h3>

<p>Zařízení s <b>iOS</b> (iPhone, iPad, …) se s obvyklou velikostí 16 × 16 u favikonek nespokojily a zavedly nový standard. Je to docela pochopitelné, protože pro dotykové ikony je 16 pixelů málo:</p>

<p><img src="/files/favicon/ipad.png" alt="Ikony na iPadu" class="border"></p>


















<p>Vkládají se proto do hlavičky speciální značky <code>&lt;link></code> s hodnotou <i>apple-touch-icon</i>:</p>

<pre><code>&lt;link rel="apple-touch-icon" sizes="114x114" href="ikona.png"></code></pre>

<p>Vytvořit ikonky pro zařízení od <b>Applu</b> je rozumné už jen kvůli tomu, aby pokus o jejich stažení neskončil chybou 404.</p>

<p>Podobně jako u <code>favicon.ico</code> se i „<b>dotykové ikony</b>“ hledají automaticky. Konkrétně v pořadí:</p>

<ol>
  <li><code>apple-touch-icon-180x180-precomposed.png</code></li>
  <li><code>apple-touch-icon-180x180.png</code></li>
  <li><code>apple-touch-icon-precomposed.png</code></li>
  <li><code>apple-touch-icon.png</code></li>
</ol>


<p>Kde <code>180x180</code> značí optimální velikost ikony pro daný typ zařízení/displeje. Slovo <code>precomposed</code> potom znamená, že se na ikonu nemají aplikovat efekty, které ji sjednocují s ikonami iOS.</p>


<div class="external-content">
  <ul>
    <li>iOS Developer Library Developer: <a href="https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html">Configuring Web Applications</a></li>
  </ul>
</div>

<p><b>Optimálních rozměrů ikonek</b> pro různá iOS zařízení je spoustu, takže je nejlepší vygenerovat ikony pro každý z rozměrů.</p>


<p>Aktuálně jsou <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html">uváděny</a> následující rozměry:</p>

<dl>
  <dt>180 × 180</dt>
  <dd>iPhone 6s Plus and iPhone 6 Plus (@3x)</dd>
  
  <dt>167 × 167</dt>
  <dd>iPad Pro (@2x)</dd>
  
  <dt>120 × 120</dt>
  <dd>iPhone 6s, iPhone 6, and iPhone 5 (@2x), iPhone 4s (@2x)</dd>
  
  <dt>152 × 152</dt>
  <dd>iPad and iPad mini (@2x)</dd>
</dl>


<p>U starších zařízení a operačních systémů se ještě objevovala rozlišení 144 × 144, 114 × 114, 76 × 76, 72 × 72, 60 × 60 nebo 57 × 57.</p>


<p>Pro <b>nejlepší výsledek</b> je tak nutné vygenerovat 10 různě velkých ikonek:</p>

<pre><code>&lt;link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
&lt;link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
&lt;link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
&lt;link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
&lt;link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
&lt;link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
&lt;link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
&lt;link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
&lt;link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png"></code></pre>










<p>Není bezpodmínečně nutné mít <b>obrázek pro každou velikost</b>. V případě, že optimální velikost chybí, použije se nejmenší větší ikona, než zařízení požaduje, případně největší dostupná ikona.</p>


<p>Pro zjednodušení procesu existuje <b>generátor</b>, který ikony potřebné velikosti vytvoří včetně <code>&lt;link></code> značek do hlavičky stránky. Kromě ikonek pro zařízení od <b>Applu</b> generuje i ikonky pro <b>Android</b> a <b>Windows</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://realfavicongenerator.net">Real Favicon Generator</a> – generátor všech potřebných ikon</li>
    
    <li><a href="http://www.favicon-generator.org/">Favicon &amp; App Icon Generator</a> – obdobný nástroj</li>
  </ul>
</div>

<h3 id="android">Android</h3>

<p><b>Chrome</b> v <b>Androidu</b> dříve podporoval taktéž automaticky načítané <i>apple-touch</i> ikony na základě hledání ve známých adresách. Kvůli četným 404 chybám od toho ale <b>Chrome 30</b> upustil.</p>

<p><img src="/files/favicon/android-chrome.png" alt="Ikona ve Windows dlaždici" class="border"></p>


















<p>Android jinak podporuje standardní zápis s <code>rel=icon</code>:</p>

<pre><code>&lt;link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192"></code></pre>


<p>Důležitý je atribut <code>sizes</code>, podle kterého se rozhodne, jak velká ikonka se použije.</p>

<p>Je doporučené používat ikonu <b>192 × 192 pixelů</b>.</p>

<p><b>Chrome</b> si umí poradit i s <i>apple-touch</i> ikonami připojenými značkou <code>&lt;link></code>, i když prý jen dočasně.</p>

<div class="external-content">
  <ul>
    <li>Developer Google Chrome: <a href="https://developer.chrome.com/multidevice/android/installtohomescreen">Add to Homescreen</a></li>
  </ul>
</div>


<h3 id="windows">Windows</h3>

<p><b>Windows</b> má svůj zvláštní zápis pro ikonky aplikací – ty se zobrazují v dlaždicích. Ve <b>Windows 8</b>, <a href="/windows-10"><b>Windows 10</b></a> a <b>Windows Phone</b>.</p>

<p><img src="/files/favicon/windows.png" alt="Ikona ve Windows dlaždici" class="border"></p>















<p>Pro <b>Windows</b> dlaždice se k tomuto účelu používají <code>&lt;meta></code> značky:</p>

<pre><code>&lt;meta name="msapplication-TileColor" content="#1081dd">
&lt;meta name="msapplication-TileImage" content="/mstile-144x144.png"></code></pre>




<p>Jak je patrné z obrázku, nejlepší bude jednobarevná ikona s průhledností.</p>


<p>Pro připnutí stránky z <b>Internet Exploreru</b> na hlavní panel Windows se používá <code>favicon.ico</code>. Je proto ideální, když má i rozměr 32 × 32 px.</p>

<div class="external-content">
  <ul>
    <li>MSDN: <a href="https://msdn.microsoft.com/en-us/library/dn455106(v=vs.85).aspx?f=255&MSPPError=-2147217396">Creating custom tiles for IE11 websites</a></li>
  </ul>
</div>



<h2 id="svg">Favikony a SVG</h2>

<p>Vzhledem k hromadě rozměrů se nabízí použít pro ikony vektorový formát <a href="/svg">SVG</a>.</p>

<p>Nemuselo by se potom generovat skoro <b>30 různých souborů</b>:</p>

<p><img src="/files/favicon/generovane.png" alt="Různé formáty vygenerovaných ikonek" class="border"></p>


































<p>Favicony v SVG momentálně podporuje:</p>

<ul>
  <li><b>Firefox 41</b>,</li>
  <li><b>Safari 9 </b></li>
</ul>


<p>Pro desktopový <b>Firefox</b> to moc zajímavé není, protože používá stejně jen ikonku 16 × 16. <b>Safari 9</b> v Mac OS X El Capitan zobrazuje SVG ikonku u připnutých záložek:</p>


<p><img src="/files/favicon/safari-svg.png" alt="SVG ikona v Safari" class="border"></p>













<p>SVG ikona pro <b>Safari</b> musí být monochromatická a barva pro <i>focus</i> se nastavuje atributem <code>color</code>:</p>

<pre><code>&lt;link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1081dd"></code></pre>


<p>SVG ikona se připojí obdobně jako PNG:</p>

<pre><code>&lt;link rel="icon" type="image/svg+xml" href="/favicon.svg"></code></pre>


<p>Související:</p>

<div class="external-content">
  <ul>
      <li>The new code: <a href="http://thenewcode.com/28/Making-And-Deploying-SVG-Favicons">Making And Deploying SVG Favicons</a></li>
  </ul>
</div>



<h2 id="vytvorit">Jak vytvořit ikonu?</h2>

<h3 id="generator">Použít generátor</h3>

<p>Při vytváření základního obrázku je dobré myslet na to, že se bude <b>nejčastěji zobrazovat ve velikosti 16 × 16 pixelů</b>, takže by se mělo jednat o něco jednoduchého, co bude při těchto malých rozměrech vypadat rozumně.</p>


<p>Vzhledem k různým velikostem a formátům je potom nejsnazší vytvořit PNG obrázek v rozměrech <b>260 × 260</b> a vložit ho do <a href="http://realfavicongenerator.net/">Favicon Generatoru</a>, který soubory ve všech potřebných formátech vytvoří a stejně tak i připraví HTML kód pro ikonky, který stačí zkopírovat do hlavičky (<a href="/html-kostra#head"><code>&lt;head></code></a>).</p>





<h3 id="rucne">Ruční vytvoření ikony</h3>

<p>Při ručním vytváření a správě ikon je asi nejsnazší vytvořit soubor <code>favicon.ico</code> ve velikosti 16 × 16. Bude fungovat v drtivé většině případů. U záložek v prohlížečích se stejně nic většího nezobrazuje.</p>

<p>Uložit obrázek jako ICO jde v grafickém editoru. Návod pro GIMP:</p>

<div class="external-content">
  <ul>
    <li><a href="http://thenewcode.com/467/Creating-Multi-Resolution-Favicons-For-Web-Pages-With-GIMP">Creating Multi-Resolution Favicons For Web Pages With GIMP</a></li>
  </ul>
</div>

<p>Případně existuje hromada <b>online převaděčů</b>. Třeba:</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.icoconverter.com/">ICO converter</a></li>
  </ul>
</div>



<p>Formát <code>*.ico</code> je specifický tím, že v jednom souboru může být více variant ikon. Není tak úplně naškodu mít <i>favicon</i> i v rozměrech 32 × 32, byť to zvýší datovou velikost (větší ikonka se hodí např. při připnutí stránky z <b>Internet Exploreru</b> na hlavní panel).</p>

<p>Bude-li <code>favicon.ico</code> v kořenovém adresáři, není třeba na ni odkazovat značkou <code>&lt;link></code>.</p>

<p><b>„Touch“ ikona</b> pro připnutí stránky na hlavní obrazovku u dotykových zařízení je nejsnáze realisovatelná jedním obrázkem o rozměrech rozměrech 192 × 192 s názvem <code>apple-touch-icon-precomposed.png</code>.</p>

<p>Název zajistí funkčnost na <b>iOS</b>. Pro <b>Android</b> se ikonka připojí značkou:</p>

<pre><code>&lt;link rel="icon" sizes="192x192" href="apple-touch-icon-precomposed.png"></code></pre>



<p>Pro řadu starších zařízení bude ikona zbytečně datově velká, ale pokud nebude moc komplikovaná, tak se i tak vejde po <a href="/optimalisace-obrazku">optimalisaci</a> do několika kB.</p>





<h2 id="best-practice">Best-practice</h2>

<p>Jako nejlepší postup pro vytváření <i>faviconek</i> jde považovat výsledek produkovaný <b>Real Favicon Generátorem</b>. Proč ikony připravuje, tak jak připravuje, je důkladně zdůvodněné v FAQ:</p>

<div class="external-content">
  <ul><li><a href="http://realfavicongenerator.net/faq">Real Favicon Generator: FAQ</a> – argumentace pro chování generátoru ikonek</li></ul>
</div>




<h2 id="vyuziti">Využití favikony</h2>

<p>Kromě nejpoužívanější funkce ikony – znázornění webu – jde vymyslet i další využití:</p>



<h3 id="odliseni">Odlišení kategorií webu</h3>

<p>Na <a href="http://djpw.cz">Diskusi JPW</a> to před lety vymyslel <a href="http://webylon.info"><b>Chamurappi</b></a>. Miniaturní rozměry ikonky ale moc prostoru nedávají:</p>

<p><img src="/files/favicon/djpw.png" alt="SVG ikona v Safari" class="border"></p>









<p>S jednodušší podobou ikonky by šlo docílit snazšího odlišení změnou barvy.</p>



<h3 id="notifikace">Notifikace</h3>

<p>Teoreticky je možné změnou ikonky znázorňovat notifikace.</p>

<p><img src="/files/favicon/notifikace.png" alt="Notifikace ve favicon" class="border"></p>

<p>Většina webů ale místo toho používá spíš <a href="/ikona-prehravani">změnu titulku</a> – <code>document.title</code>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://lab.ejci.net/favico.js/">favico.js</a> – JS pro změnu ikon, znázorňování notifikací nebo přehrávání videa</li>
      <li><a href="http://webdesign.tutsplus.com/tutorials/how-to-display-update-notifications-in-the-browser-tab--cms-23458">How to Display Update Notifications in the Browser Tab</a> – notifikace přes favikonky</li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://mathiasbynens.be/notes/touch-icons">Everything you always wanted to know about touch icons</a> – popisuje chování dotykových ikonek v různých prohlížečích</li>
  
  <li>Jonathan T. Neal: <a href="http://www.jonathantneal.com/blog/understand-the-favicon/">Understand the Favicon</a> – pohled do historie favikonek</li>
</ul>
