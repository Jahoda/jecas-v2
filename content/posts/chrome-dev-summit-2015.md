---
title: "Chrome Dev Summit 2015"
headline: "Chrome Dev Summit 2015"
description: "Výběr zajímavostí z konference Chrome Dev Summit 2015."
date: "2015-11-17"
last_modification: "2015-11-19"
status: 1
tags: ["google", "konference"]
format: "html"
---

<p><a href="https://developer.chrome.com/devsummit">Chrome Dev Summit</a> je celkem zajímavá konference vysílaná živě na YouTube, kterou se vyplatí sledovat.</p>

<div class="internal-content">
  <p>Poznámky z minulého ročníku: <a href="/chrome-dev-summit-2014">Chrome Dev Summit 2014</a></p>
</div>

<p>Hlavní téma konference bylo jasné: <b>nahrazení nativních aplikací</b> pomocí <b>mobilních webů</b>.</p>

<p>Díky <b>ServiceWorkerům</b> je možné stále více a více vlastností typických pro nativní aplikace zajistit u <b>mobilní webové aplikace</b>.</p>






<h2 id="mobilni-web">Mobilní webové aplikace</h2>

<p>Díky rozšiřování funkčnosti webových prohlížečů se výrazně rozšiřují možnosti mobilních webových aplikací.</p>

<p><img src="/files/chrome-dev-summit-2015/sw.png" alt="Service Worker" class="border"></p>

























<p>Velkou roli zde hraje <b>ServiceWorker</b> –  prostředník mezi prohlížečem a operačním systémem, který umožňuje, že se weby mohou chovat jako nativní aplikace:</p>

<ul>
  <li>Mohou fungovat offline.</li>
  <li>Jde je připnout na hlavní obrazovku (<i lang="en">homescreen</i>).</li>
  <li>Mohou posílat notifikace.</li>
</ul>


<p>Webové aplikace, které se na podporovaných zařízeních chovají jako nativní, jsou označeny termínem <b>Progressive Web App</b>. Mohou obstojně fungovat i na starších zařízeních bez Service Workeru.</p>

<p>Jako ukázka, čeho je možné dosáhnout, může posloužit mobilní stránka <a href="https://flipkart.com">Flipkart.com</a>. Načítá se bleskurychle a dokáže i fungovat offline.</p>






<h3 id="automaticke-vyplnovani">Automatické vyplňování formulářů</h3>

<p>Automatické vyplňování formulářů může o 25 % zvýšit šanci, že ho člověk vyplní.</p>

<p><img src="/files/chrome-dev-summit-2015/autofill.png" alt="Automatické vyplňování formulářů" class="border"></p>






















<h2 id="svet-online">Připojení k internetu ve světě</h2>

<p>Pořád je spoustu lidí na světě, kteří nejsou online. Například v Indii. Tito lidé se s internetem zpravidla nejdříve setkají z mobilního telefonu.</p>

<p>Zařízení používané v zaostalých zemích se značně liší výkonem a velikostí úložiště. Omezená velikost úložiště nahrává použití webové aplikace, která nepotřebuje instalovat desítky MB.</p>

<p><img src="/files/chrome-dev-summit-2015/hw.png" alt="Rozdíly v HW chytrých telefonů" class="border"></p>




























<p>Většina mobilního přípojení je stále 2G.</p>

<p><img src="/files/chrome-dev-summit-2015/2g.png" alt="2G připojení" class="border"></p>















<p>1 vteřina prodlevy při načítání znamená 11 % méně zobrazení stránek a o 16 % menší spokojenost návštěvníků.</p>

<p>V Indii se cena 500 MB mobilních dat rovná 17 hodinám práce za minimální mzdu. Za hodinu práce za minimální mzdu si lze načíst 15 stránek.</p>

<p><img src="/files/chrome-dev-summit-2015/500mb.png" alt="500 MB v Indii" class="border"></p>













<p>Lidé tak několikrát denně <b>zapínají a vypínají svá data</b>.</p>

<p>Důležité je proto dostat návštěvníky na požadovanou stránku bez zbytečných překážek. Napomoci tomu může přidání webu na homescreen a notifikace, které vedou přímo na konkrétní obsah.</p>

<p><b>PageSpeed Module</b> dokáže jediným řádkem kódu výrazně zrychlit webovou stránku, aniž by si toho návštěvník všiml.</p>

<p><code>Save-data: on</code> – speciální režim, který lze zapnout v prohlížeči. Znamená, že je návštěvník náchylný na plýtvání daty.</p>

<p>Z JS vlastností <code>navigator.connection.type</code> a <code>navigator.connection.downlinkMax</code> jde zjistit typ a maximální rychlost připojení.</p>

<p>Díky ServiceWorkerům jde plynule přecházet mezi offline a online.</p>









<h2 id="instalace">Instalace webové aplikace</h2>

<p>Lidem se moc nechce instalovat aplikace. Samotná instalace typicky trvá hodně času, bojí se nedostatku místa, ztráty soukromí apod.</p>

<p><img src="/files/chrome-dev-summit-2015/instalace-aplikace.png" alt="Instalace nativní aplikace" class="border"></p>




































<p>Při hledání aplikace se většina lidí nedostane k jejímu použití. Mobilní webová aplikace může přinést lepší výsledky.</p>

<p><img src="/files/chrome-dev-summit-2015/instalace.png" alt="Průchod od instalace k použití aplikace" class="border"></p>




























<p><a href="/google">Google</a> navíc trestá stránky, které nabízejí ke stažení nativní aplikaci. Neoznačuje je ve vyhledávání jako <a href="/google-mobile-friendly">mobile-friendly</a>.</p>


<h3 id="add-homescree">Přidání na homescreen</h3>

<p>Četnější používání webové aplikace jde docílit přidáním webu na plochu.</p>



<p>Chrome dokáže automaticky <b>nabídnout přidání webové aplikace na homescreen</b> při splnění následujících požadavků:</p>

<ul>
  <li>ServiceWorker,</li>
  <li>TSL (zabezpečené připojení),</li>
  <li>web manifest (soubor obsahující název aplikace, ikonu a podobně),</li>
  <li>dvě návštěvy na 5+ minut</li>  
</ul>

<p>V případě nesplnění počtu návštěv jde stránku přidat na hlavní obrazovku alespoň ručně.</p>






<h2 id="web-manifest">Web manifest</h2>

<p>Soubor pro deklarace názvu, barev a ikon webové aplikace. Připojuje se v hlavičce.</p>

<pre><code>&lt;link rel="manifest" href="manifest.json"></code></pre>

<p><img src="/files/chrome-dev-summit-2015/manifest.png" alt="Soubor manifest.json" class="border"></p>






























<h3 id="zobrazeni">Typ zobrazení</h3>

<ul>
  <li><code>"display" : "standalone"</code> – zobrazení webové aplikace bez navigační lišty prohlížeče</li>
  <li><code>"display" : "fullscreen"</code> – zobrazení přes celou obrazovku bez horní systémové lišty</li>
  <li><code>"display" : "browser"</code> – zobrazení jako v prohlížeči</li>
</ul>

<p>Typ zobrazení jde použít v <code>@media</code> pravidlech.</p>

<pre><code>@media (display-mode: standalone) {
  /* zobrazení v režimu standalone */
}</code></pre>




<h3 id="orientace">Orientace</h3>

<ul>
  <li><code>"orientation" : "portrait"</code> – standardní zobrazení na výšku</li>
  <li><code>"orientation" : "landscape"</code> – zobrazení aplikace na šířku, vhodné pro hry</li>
</ul>



<h3 id="start">Úvodní adresa</h3>

<p>Musí odpovídat ServiceWorkeru:</p>

<pre><code>"start_url" : "/simple-demo/?home=true"</code></pre>

<h3 id="generator">Manifest generátor</h3>

<p>Soubor manifest je možné vygenerovat:</p>

<div class="external-content">
  <ul>
    <li><a href="http://brucelawson.github.io/manifest/">Manifest Generator</a></li>
  </ul>
</div>






<h2 id="https">HTTPS</h2>

<p>Hlavní důvody (kromě soukromí) <a href="/https">proč přejít na HTTPS</a> jsou:</p>

<ul>
  <li>soukromí a bezpečnost,</li>
  <li>vložení nežádoucího obsahu (ze strany veřejné Wi-Fi apod.),</li>
  <li>některé funkce vyžadují HTTPS (přístup ke kameře)</li>
</ul>


<p><b>Google</b> se snaží změnit chování prohlížeče v označování HTTP a HTTPS webů.</p>

<p>Nezabezpečená stránka se aktuálně zobrazuje neutrálně. To by se do budoucna mělo změnit.</p>

<p>Pro zjišťování problémů s HTTPS vznikla ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> záložka <i>Security</i>.</p>

<p><img src="/files/chrome-dev-summit-2015/security.png" alt="Karta Security v Chrome" class="border"></p>





























<h2 id="push-notifikace">Push notifikace</h2>


<p>Zvyšují počet aktivních uživatelů.</p>

<p>Návštěvník si povolí posílání notifikací, takže až vyjde na webu nový článek, dostane upozornění přímo s odkazem.</p>

<p>Je rozumné posílat pouze <b>důležité a naléhavé</b> notifikace. Obtěžování uživatele notifikacemi povede k jejich celému zablokování.</p>


<p><img src="/files/chrome-dev-summit-2015/dulezitost-notifikaci.png" alt="Důležitost notifikací" class="border"></p>
























<p><b>Žádost o zapnutí notifikací</b> by měla být zobrazena až ve chvíli, kdy návštěvník ví, co taková funkce bude dělat. Žádost o povolení notifikací by se tak neměla objevovat hned po načtení stránky.</p>

<p>Je dobré umožnit notifikace případně snadno vypnout v nastavení aplikace.</p>

<p>Neměly by být duplikované s nativní aplikací.</p>





<h3 id="custom">Custom actions</h3>

<p>V budoucnu bude možné přidávat do notifikací speciální akce.</p>


<p><img src="/files/chrome-dev-summit-2015/custom-actions.png" alt="Custom actions" class="border"></p>




















<h2 id="physical-web">Web Bluetooth / Physical Web</h2>

<p>Propojení webu s reálným světem.</p>

<p><img src="/files/chrome-dev-summit-2015/web-bluetooth.png" alt="Web Bluetooth" class="border"></p>




























<p>Webová aplikace může komunikovat s hardwarem prostřednictvím technologie Bluetooth.</p>

<p>Zatím jde o experimentální funkci.</p>


<p>Kromě získávání informací ze zařízení typu měřič srdečního tepu nebo ovládání jiného hardware se nabízí další možnost:</p>




<h3 id="vysilani-url">Vysílání URL</h3>

<p>Usnadnit objevení adresy webové stránky v reálném světě. Současný stav, kdy je člověk na mobilu nucen ručně vyťukávat URL do adresního řádku, není úplně pohodlný.</p>

<p><img src="/files/chrome-dev-summit-2015/beacon.png" alt="Objevení adresy" class="border"></p>






















<p>Myšlenka je taková, že na určitém místě v reálném světě bude krabička, která bude jednosměrně vysílat URL (<i lang="en">URL beacon</i>). Tuto adresu půjde mobilním telefonem snadno zachytit a navštívit. Jedná se tedy v podstatě o pohodlnější náhradu <a href="/qr">QRCode</a>.</p>

<p>Tato funkce je dostupná v <b>mobilní Opeře</b>:</p>


<div class="external-content">

<ul>
  <li>Dev.Opera.com: <a href="https://dev.opera.com/articles/release-the-beacons/">Release the Beacons!</a></li>
</ul>  
</div>

<h2 id="povoleni">Udělení povolení</h2>

<p>Webové aplikace mohou potřebovat technologie, které musí uživatel napřed povolit (notifikace, geolokace).</p>

<p>Povolení udělí velmi málo návštěvníků:</p>

<ul>
  <li>6 % povolí geolokaci</li>
<li>17 % povolí notifikace</li>
</ul>

<p><img src="/files/chrome-dev-summit-2015/ask-permission.png" alt="Žádost o povolení" class="border"></p>






















<p>Problém je, že aplikace žádají povolení ve špatnou chvíli (například při načtení stránky). Pro maximální šanci získání povolení je dobré dodržet následující body:</p>


<ol>
  <li><p>Žádost musí být dobře vysvětlená. Ideálně speciální stránkou s informacemi, proč jsou notifikace dobré / geolokace výhodná.</p></li>
  <li><p>Žádat o povolení pouze nezbytných věcí.</p></li>
  <li><p>Dát možnost povolení odvolat.</p></li>
</ol>


<div class="external-content">
  <ul>
  <li>W3C: <a href="https://w3c.github.io/permissions/">Permissions API</a></li>
  <li>Google Developers: <a href="https://developers.google.com/web/updates/2015/04/permissions-api-for-the-web">Permissions API for the Web</a></li>
</ul>
</div>




<h2 id="polymer">Polymer</h2>

<p><a href="https://www.polymer-project.org/1.0/">Polymer</a> je kolekce připravených elementů pro rychlé stavění aplikací.</p>

<p>V nové versi 1.0 je mnohem rychlejší.</p>

<p><img src="/files/chrome-dev-summit-2015/polymer.png" alt="Polymer" class="border"></p>






































<h2 id="devtools">Novinky v DevTools</h2>

<p>Řada lidí používá vývojářské nástroje pro návrh webů. V <b>Chrome</b> cítí, že tento trend bude pokračovat, takže vývojářské nástroje v <b>Chrome</b> mají poprvé v historii vlastního designera, který zlepšuje uživatelské rozhraní.</p>



<h3 id="vyber-barvy">Výběr barvy</h3>


<p>Nový nástroj pro <b>výběr barvy</b>. Barva jde nabrat kapátkem přímo ze stránky nebo použít barevné schéma založené na barvách použitých na webu.</p>


<p><img src="/files/chrome-dev-summit-2015/vyber-barvy.png" alt="Výběr barvy v DevTools" class="border"></p>


























<h3 id="device-mode">Device mode</h3>

<p>Device mode je <a href="/mobile-first">mobile-first</a>. Už se striktně nerozlišuje zobrazení mobil/desktop.</p>

<p>Při zobrazení náhledu stránky jde zapnout znázornění media-queries.</p>

<p><img src="/files/chrome-dev-summit-2015/device-mode.png" alt="Device Mode" class="border"></p>
























<h3 id="animace">Zkoumání animací</h3>

<p>Nový nástroj pro zkoumání a upravování animací. Jde měnit rychlost nebo časování.</p>

<p><img src="/files/chrome-dev-summit-2015/animace.png" alt="Zkoumání animací" class="border"></p>


















<h3 id="js">Debugování JavaScriptu</h3>

<p>Pro debugování JavaScriptu je možné vyčlenit ze zobrazovaného kódu frameworky. Zobrazují se potom pouze volání samotné aplikace.</p>



<h3 id="layout-mode">Layout Mode</h3>

<p><b>Layout Mode</b> je pokus o vytvoření WYSIWYG režimu upravování webu.</p>

<p>Vývojáři <b>Chrome</b> zjistili, že je nejčastěji potřeba měnit <code>padding</code>/<code>margin</code> – jde to tak prostým tažením myši.</p>

<p><img src="/files/chrome-dev-summit-2015/layout-mode.png" alt="Layout mode v Chrome DevTools" class="border"></p>













<h2 id="web-performance">Web performance</h2>

<p>Potřebná rychlost závisí na tom, co člověk dělá. Orientační vnímání rychlosti může vypadat nějak takto:</p>

<p><img src="/files/chrome-dev-summit-2015/rychlost.png" alt="Vnímání rychlosti" class="border"></p>


























<h3 id="rail">Princip RAIL</h3>

<ul>
  <li><b>R</b>esponse – odezva do 100 milisekund se jeví člověku jako okamžitá.</li>
  <li><b>A</b>nimace s 60 FPS (16,67 ms) se jeví jako plynulé.</li>
  <li><b>I</b>dle time 50 milisekund. Operace v nečinnosti na pozadí.</li>
  <li><b>L</b>oad time do 1 vteřiny (nemusí jít o celou aplikaci, ale alespoň o její podstatnou část)</li>
</ul>




<p><img src="/files/chrome-dev-summit-2015/rail.png" alt="Princip RAIL" class="border"></p>















<p>Důležitost RAILu se liší dle typu webu. U obsahového webu je důležitý hlavně <i>Load</i>.</p>

<p><img src="/files/chrome-dev-summit-2015/obsahova.png" alt="RAIL u obsahové stránky" class="border"></p>




























<p>U aplikací zase spíš <i>Response</i> a <i>Animation</i>:</p>


<p><img src="/files/chrome-dev-summit-2015/aplikace.png" alt="RAIL u aplikace" class="border"></p>


























<h3 id="animation">Animation</h3>

<p>Plynulým animacím jde hodně pomoci používáním změny průhlednosti a transformací, které jsou šetrnější k <a href="/vykreslovani#prekreslovani">překreslování</a>, postupem FLIP (first, last, invert, play).</p>


<p><img src="/files/chrome-dev-summit-2015/flip.png" alt="Animace FLIP" class="border"></p>




















<p>Při přechodu se nejprve nastaví cílový stav, transformací se vrátí do výchozí podoby a přehrání je tak pouze zrušení transformace.</p>

<p>Výhoda je v tom, že náročné operace se provedou ještě před tím, než začne samotná animace.</p>

<p>Dobré je také se vyhnout animacím během rolování, které je samo o sobě hodně náročná animace.</p>




<h3 id="idle">Idle</h3>

<p>Pomocí <code>requestIdleCallback</code> jde provádět úkony ve chvíli, kdy prohlížeč <i>nic důležitého nedělá</i>.</p>

<p>Hodí se pro věci, které nejsou nezbytné, např. různá měření a podobně. Potřebné úkony je dobré rozdělit do malých operací, které se stihnou provést do 50 milisekund.</p>


<h3 id="load">Load</h3>

<p>Do 1 vteřiny pro opakované načtení. Při prvním načtení trvá dlouho samotné navázání spojení, DNS lookup apod.</p>

<p>Při opakovaném načtení je ideální už použít ServiceWorker, čímž jde docílit prakticky okamžitého načtení.</p>


<h2 id="http-2">HTTP/2</h2>

<p>HTTP/1 je plné hacků, jak obejít zásadní problém – pomalé zpracovávání více požadavků zároveň.</p>

<p><img src="/files/chrome-dev-summit-2015/http1.png" alt="HTTP/1" class="border"></p>































<p>Opakovaně se pro každý požadavek přenáší stejná data – typicky identifikátor session v <a href="/cookies">cookie</a>.</p>

<p>Používají se věci jako:</p>

<ul>
  <li>inline vkládání obsahu (např. <a href="/data-uri">data URI</a>),</li>
  <li><a href="/css-sprite">sprite</a> obrázků (spojení více obrázků do jednoho)</li>
  <li><a href="/slouceni-js-css">spojování CSS a JS souborů</a> do jednoho</li>
</ul>

<p>Výše uvedená snaha o snižování požadavků je s příchodem HTTP/2 antipattern:</p>

<ul><li>
  <p>Změna jednoho ze spojených souborů invaliduje všechna data, která by se jinak mohla kešovat samostatně.</p></li>
    <li>
    <p>Stahuje se i obsah, který není zrovna potřeba.</p>
  </li>
</ul>


<p>HTTP/2 si s hodně požadavky poradí.</p>


<h3 id="push">HTTP/2 PUSH</h3>

<p>Server může poslat informaci se soubory, které budou potřebovat.</p>

<p><img src="/files/chrome-dev-summit-2015/push.png" alt="HTTP/2 push" class="border"></p>


















<p>Není potom nejprve v HTML kódu najít externí styly a skripty, které se mají stáhnout, ale server může už při požadavku na <code>index.html</code> předat informaci, že se mají začít stahovat další soubory.</p>


<h2 id="priste">Příští Chrome Dev Summit</h2>

<p>Příští konference Chrome Dev Summit bude už za <b>6 měsíců</b>.</p>