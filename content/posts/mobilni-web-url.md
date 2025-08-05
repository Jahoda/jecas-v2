---
title: "Mobilní web na subdoméně"
headline: "Mobilní web na subdoméně"
description: "Má smysl mít mobilní web na zvláštní adrese <code>m.example.com</code>?"
date: "2015-11-23"
last_modification: "2015-11-24"
status: 1
tags: ["napady", "responsive", "seo"]
format: "html"
---

<blockquote>
  <p>Ne.</p>
</blockquote>

<p>Převážně z historických důvodů se je možné setkat s weby, jejichž mobilní verse běží na jiné URL než <i>velký</i> desktopový web:</p>

<pre><code>example.com/clanek – desktopová stránka
<b>m.</b>example.com/clanek – mobilní stránka</code></pre>


<p>Z praktického hlediska je většinou lepší použít adresu <b>jen jednu</b>.</p>

<p>Přizpůsobení webu cílovému zařízení jde potom zajistit dvěma způsoby (nebo jejich kombinací):</p>


<ol>
  <li>
    <p>V CSS pomocí <a href="/media">pravidla <code>@media</code></a> a servírování různého stylu na základě šířky (popř. výšky) stránky.</p>
    
    <pre><code>@media (max-width: 40em) {
  /* styly pro šířku do 40 em */
}</code></pre>
  </li>
  <li>
    <p>Detekcí na straně serveru a posláním specifického HTML. To jde provést i bez přesměrování na stejné URL.</p>
  </li>
</ol>


<h2 id="proc-se-pouziva">Proč se používá jiná URL</h2>

<p>Hlavní důvod, proč i velké weby jako <a href="/facebook">Facebook</a> nebo <a href="/twitter">Twitter</a> mají mobilní weby na subdoménách <code>m.facebook.com</code>/<code>mobile.twitter.com</code>, je typicky <b>historický</b>.</p>

<p><img src="/files/mobilni-web-url/twitter-mobile.png" alt="Mobilní Twitter v desktopovém Edge" class="border"></p>










<p>Daný web byl nejprve vytvořen pro desktop a až následně a nezávisle byla vytvořena mobilní podoba.</p>

<p>Aby se při <a href="/prevod-responsivni-design">přizpůsobování desktopového webu pro mobil</a> omylem nerozbil velký web, je z počátku nejjednodušší řešení vytvořit kopii desktopového webu, spustit ji na subdoméně <code>m.example.com</code> a začít provádět úpravy.</p>


<p>Dalším důvodem může být <b>omezení redakčního systému</b>. Upravit systém pro správu obsahu, aby podle detekce mobilů vracel jiný obsah, bývá složitější než jeho zkopírování.</p>


<h3 id="osekany">Osekaná desktop verse</h3>

<p>V minulosti byl i více rozšířený názor, že mobilní web je pouze <b>osekaná podoba hlavního webu pro desktop</b> s nejnutnějšími funkcemi a pro pokročilé možnosti se má člověk přepnout na „plnou stránku“.</p>

<p>Statisticky ale přibývají lidé, kteří weby <b>používají jen z malých dotykových zařízení</b> (mobily, tablety). Taktéž pro návštěvníky, co se na stránku připojují z více zařízení, není nic horšího, než když jim na mobilním webu bude chybět prvek, na který jsou z desktopu zvyklí.</p>





<h3 id="mobile-first">Preference mobilního webu</h3>

<p>Někdy se může stát, že zjednodušená podoba stránky pro mobily bude tak dobrá, že bude i desktopovým návštěvníkům vyhovovat více než plná podoba stránky. Či spíš desktopový web bude tak špatný, že ho předčí ten mobilní.</p>

<p>Díky hromadě dostupného místa při návrhu webu pro desktopy se může zapomenout na to, <b>co je na stránce nejdůležitější</b>.</p>

<p>Někdo kvůli tomu preferuje <a href="/mobile-first">mobile-first</a> přístup – web se udělá nejprve pro mobil a až následně se upravuje pro větší rozlišení.</p>


<h3 id="jistota">Jistota mobilního webu</h3>

<p>V dávných dobách pomalého mobilního internetu placeného dle přenesených dat byla mobilní subdoména zárukou toho, že je člověk na úsporné podobě webu.</p>

<p>Dnešní uživatelé už takové chování spíš neočekávají. Případně úsporu dat řeší prostřednictvím prohlížeče.</p>

<p>Nakonec umožnit přístup přes <code>m.example.com</code> není problém ani při používání jednotných URL. Zkrátka se taková adresa přesměruje na <code>example.com</code> a do <a href="/cookies">cookie</a> se uloží, že se má zobrazovat mobilní verse.</p>


<p>Na první pohled se tedy může zdát dělení na základě URL hlavně snazší na výrobu, ale nevýhody spíš převažují:</p>




<h2 id="nevyhody">Nevýhody „m“ subdomény</h2>


<h3 id="presmerovani">Přesměrovávání</h3>

<p>V první řadě je nutné vyřešit přesměrování. Když návštěvník přijde na stránku <code>example.com/clanek</code>, měl by být přesměrován na <code>m.example.com/clanek</code>.</p>

<p>Příručka <b>Google</b> nedodržení tohoto principu nazývá termínem <a lang="en" href="https://developers.google.com/webmasters/mobile-sites/mobile-seo/common-mistakes/faulty-redirects">faulty redirects</a> (vadné přesměrování). Jde o stav, kdy podstránky desktopového webu přesměrovávají na hlavní stranu mobilního.</p>

<p><img src="/files/mobilni-web-url/faulty-redirects.png" alt="Vadné přesměrování" class="border"></p>



























<p>Zajistit správné přesměrovávání může být problém v situaci, kdy mobilní i desktopový web jsou v podstatě <b>dvě zvláštní aplikace</b> a ne všechny adresy je možné přeložit tam i zpátky.</p>


<p>Dilema potom nastává v případě, co udělat s mobilní URL na desktopu. Pokud někdo bude sdílet odkaz s „<code>m.</code>“ na začátku a člověk si tento odkaz otevře na desktopu, dostane typicky osekanou podobu stránky v desktopovém prohlížeči.</p>

<p>Příklad <a href="https://m.facebook.com/jecascz/posts/990623920999324">odkazu</a> na mobilní stránku z <a href="/facebook">Facebooku</a> při zobrazení v desktopovém prohlížeči <a href="/microsoft-edge"><b>Edge</b></a>:</p>


<p><img src="/files/mobilni-web-url/m-desktop.png" alt="Mobilní Facebook v desktopovém Edge" class="border"></p>















































<p>Odkaz pro přepnutí na desktopovou stránku je často zatoulaný někde hluboko ve stránce:</p>

<p><img src="/files/mobilni-web-url/desktop-site.png" alt="Přepnutí na desktopovou stránku" class="border"></p>

























<p>Vytvářet mobilní web jako samostatnou aplikaci s jinou strukturou adres je tak dost nepraktické, protože přesměrování oběma směry bude obtížně realisovatelné.</p>




<h3 id="prodleva-presmerovani">Prodleva přesměrování</h3>

<p>I v případě dobře zvládnutého přesměrování je zde další problém: <b>přesměrování adres stojí zbytečný čas, kdy se nic neděje</b>.</p>

<p>Na pomalém mobilním 2G připojení s odezvou 300 milisekund se tato doba odezvy prakticky zahodí jen kvůli přesměrování.</p>

<p>Přesměrovávat hlavní doménu na mobilní subdoménu je tak zaručený způsob, jak hloupě zpomalit první načtení webu.</p>



<h3 id="detekce">Detekce mobilních prohlížečů</h3>

<p>Detekovat pro účely přesměrování, že je prohlížeč mobilní, je nutné dělat na základě hlavičky <a href="/ua">user-agent</a>.</p>

<p>To vyžaduje udržovat aktuální regulární výraz, který detekci provádí:</p>

<div class="external-content">
  <ul>
    <li><a href="http://detectmobilebrowsers.com/">Detect Mobile Browsers</a> – implementace detekcí v PHP, JS a dalších jazycích</li>
  </ul>
</div>

<p>Zajistit jiný vzhled na základě <code>@media</code> v CSS je v tomto ohledu spolehlivější.</p>


<h3 id="sprava">Správa dvou webů</h3>

<p>Udržovat dvě varianty webu může být časem značná koule na noze, protože se nová funkcionalita musí přidávat dvojmo.</p>


<h3 id="jednotna-url">URL by měla být jednotná</h3>

<p>Někdo zastává názor, že z teoretického pohledu by podoba URL se stejným obsahem neměla nést informaci o cílovém zařízení. Stejně jako se nedělají speciální subdomény pro <b>hlasové čtečky</b> nebo <b>Internet Explorery</b>, mělo by totéž platit pro web pro mobily.</p>

<p>Trochu proti tomuto názoru stojí <a href="/amp-html">AMP HTML</a> nebo RSS podoba článků – v obou případech je tentýž obsah na různých URL.</p>




<h2 id="seo">Mobilní URL a SEO</h2>

<p>Z pohledu vyhledávačů je při použití mobilní subdomény na dvou různých adresách duplicitní obsah. <a href="/google">Google</a> proto doporučuje mobilní a desktopový web propojit <code>&lt;link></code> značkami s hodnotami <code>rel="canonical"</code> a <code>rel="alternate</code>:</p>

<p>V <a href="/html-kostra#head">hlavičce</a> desktopového článku na adrese <code>example.com/clanek</code> bude odkaz na mobilní variantu:</p>

<pre><code>&lt;link rel="alternate" media="only screen and (max-width: 640px)"
      href="http://m.example.com/clanek"></code></pre>




<p>V hlavičce mobilního článku <code>m.example.com/clanek</code> bude zase zpět odkaz na desktopovou stránku:</p>

<pre><code>&lt;link rel="canonical" href="http://example.com/clanek" ></code></pre>

<p>Díky tomu <b>Google</b> pochopí vztah stránek mezi sebou. Je důležité, aby obsah obou stránek odpovídal 1:1 a značky <code>&lt;link></code> se shodovali s přesměrováním, které se na serveru provádí při návštěvě z mobilu/desktopu.</p>

<p><b>Další doporučení:</b></p>

<ol>
  <li><p>Konkrétní desktopová podstránka se musí přesměrovávat na svůj mobilní ekvivalent. Nikdy ne na hlavní stránku.</p>
  <p>Taktéž <code>&lt;link rel="canonical"></code> nemá z mobilní podstránky vést na hlavní stranu desktopového webu, ale na konkrétní podstránku.</p>
  </li>
  
  
  <li>
    <p>U stránek, které nemají ekvivalent pro mobil/desktop nemá cenu uživatele někam přesměrovávat. Je lepší špatně optimalisovaná stránka než žádná stránka.</p>
  </li>  
  <li>
    <p>Google akceptuje všechny tři postupy tvorby mobilního webu. (Doporučuje první.)</p>
    <ol>
      <li><p><b>Různý styl pomocí pravidla <code>@media</code>.</b> Společný HTML kód pro mobil i desktop.</p></li>
      <li>
        <p>Různý HTML obsah na základě serverové detekce na stejné URL.</p>
        
        <p>V tomto případě je nutné dobře provést detekci prohlížečů, aby:</p>
        
        <ul>
          <li><code>Googlebot</code> dostal podobu stránky pro desktop.</li>
          <li><code>Googlebot-Mobile</code> dostal mobilní web.</li>
        </ul>        
      </li>
      
      <li><p>Přesměrování na „m“ subdoménu.</p></li>
    </ol>
  </li>  
  <li>
    <p>Google nemá doporučení ohledně toho, kdy nebo jestli vůbec přesměrovávat z mobilní subdomény na hlavní stránku při návštěvě z desktopu. Nechává to plně na autorech webů.</p>
  </li>
</ol>

<div class="external-content">
  <ul>
    <li>Google Webmaster's Mobile Guide: 
    <ul>
      <li><a href="https://developers.google.com/webmasters/mobile-sites/mobile-seo/overview/select-config">Select your mobile configuration</a></li>
      <li><a href="https://developers.google.com/webmasters/mobile-sites/mobile-seo/configurations/separate-urls">Separate URLs</a></li>      
    </ul>
    </li>
  </ul>
</div>

<h3 id="seznam">Mobilní web na Seznamu</h3>

<p>Podle vyjádření <b>Dušana Janovského</b> jsou v případě Seznamu stejně jako u Googlu správně všechny tři způsoby vytvoření mobilního webu (změna pouze CSS, různý obsah na jedné URL nebo „m“ subdoména).</p>

<p>Vytvoření mobilního webu na jiné URL je z nich nejslabší, responsivní web nejlepší:</p>

<blockquote>
  <p>Všechny tři popsané možnosti jsou správně. Dá se ale říct, že některé
    jsou správněji než jiné.</p>

  <p>Responsivní web je nejlepší.</p>
Posílání různého obsahu na stejné URL je taky dobré, ale je nutné se
ujistit, že <a href="http://napoveda.seznam.cz/cz/seznambot/">SeznamBot</a> dostává obsah, který dostávat má.

  <p>Propojení přes <code>&lt;link rel=cannonical></code> je také dobré řešení, i když v
praxi asi nejslabší, protože to může vést k tomu, že se některé
kanonické linky nezvalidují a zaignorují, zejména pokud bude obsah na
obou URL výrazněji odlišný.</p>
  
  <p class="autor"><b>Dušan Janovský</b></p>
</blockquote>






<p>V případě servírování různého obsahu na stejné URL je důležité, aby <code>SeznamBot</code> dostal preferovanou podobu stránky.</p>

<p>Na rozdíl od Google nemá <b>Seznam mobilního robota</b> pro procházení mobilních webů. Detekce prohlížečů by tak neměla <code>SeznamBot</code>a poslat na osekanou podobu stránky.</p>



<h2 id="prepnuti">Přepínání mezi mobilem a desktopem</h2>

<p>Není špatné umožnit návštěvníkovi přepnout mezi různými existujícími podobami webu.</p>

<p>Na obrázku níže je mobilní a desktopová podoba <a href="https://fb.com/jecascz">Facebook stránky jecas.cz</a> na témže mobilu:</p>


<p><img src="/files/mobilni-web-url/mobile-desktop.png" alt="Přepnutí na desktopovou stránku" class="border"></p>














































<p>Přepínání verse se typicky dělá pomocí cookies. V případě, že si návštěvník ručně vyžádá desktopovou podobu stránky na mobilu, už se neprovede automatická detekce, která by mu naservírovala mobilní web.</p>


<h3 id="responsive">Přepínání responsivního webu</h3>

<p>I dobře responsivní web, kde veškeré přizpůsobení mobilům a desktopů probíhá pomocí <code>@media</code> pravidel v CSS, může mít smysl přepnout do desktopové podoby.</p>

<p>Zvlášť v případě doplnění responsivní podoby pro mobily do již existujícího webu mohou stálí návštěvníci toužit po původní podobě, na kterou byli zvyklí.</p>

<p>Není problém jim vyhovět. Stačí k tomu jen při zapnutí „desktopové verse“ odstranit značku <a href="/meta-viewport"><code>&lt;meta name=viewport></code></a>. Mobilní prohlížeč tak bude simulovat větší šířku a stránka se zobrazí podobně jako na desktopu.</p>






<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Smashing Magazine: <a href="http://www.smashingmagazine.com/2012/04/why-we-shouldnt-make-separate-mobile-websites/">Why We Shouldn’t Make Separate Mobile Websites</a></li>
</ul>