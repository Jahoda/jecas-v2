---
title: "Testování webů na mobilech"
headline: "Ladění responsivních webů"
description: "Jak testovat zobrazení responsivního webu na mobilních zařízeních."
date: "2016-02-16"
last_modification: "2016-03-07"
status: 1
tags: ["responsive", "testovani", "webove-prohlizece"]
format: "html"
---

<p>Problém vývoje responsivních webů je v tom, že cílové publikum tvoří obrovsky rozmanitá skupina zařízení.</p>

<p>Doby „optimalisováno pro 15" monitor a rozlišení 800 × 600“ už jsou <a href="/sirka-stranky#historie">nenávratně pryč</a>. Web se musí dobře zobrazovat na tisících různých rozlišeních a fungovat na značně rozličných zařízeních.</p>

<p>V možnostech běžného vývojáře potom nejspíš není zakoupit si stovky různých zařízení pro testování.</p>



<h2 id="desktop">Testování na desktopu</h2>

<p>Vzhledem k tomu, že mobilní prohlížeče se vykreslovacím jádrem téměř <b>neliší</b> od <i>velkých</i> prohlížečů, dost slušně jde pro mobily ladit na desktopu.</p>



<h3 id="device-mode">Device Mode</h3>

<p>Prohlížeč <b>Chrome</b> disponuje ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> režimem pro simulaci různých zařízení.</p>

<p>Tato funkce se nazývá <i lang="en">Device Mode</i> a je dostupná <b>po otevření DevTools</b> (klávesová zkratka <kbd>F12</kbd>)  zkratkou <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd> nebo po kliknutí na ikonku telefonu.</p>

<p><img src="/files/testovani-mobily/device-mode.png" alt="Device Mode" class="border"></p>









<p>Po zapnutí se stránka zobrazí s řadou ovládacích prvků, které slouží pro simulaci různých přístrojů:</p>

<p><img src="/files/testovani-mobily/rezim-zarizeni.png" alt="Device Mode" class="border"></p>















<ul>
  <li>
    <p><b>Device</b> – umožňuje ze seznamu vybrat konkrétní model. To zajistí příslušné nastavení rozměrů obrazovky a hustotu pixelů.</p>
    
    <p>Vybírat z nabídky telefonu konkrétní modely se hodí k tomu, že se podle toho nastaví hlavička <a href="/ua">user-agent</a>. Pokud stránka používá serverovou detekci na základě <i>user-agenta</i>, výsledek v simulátoru bude odpovídat realitě při použití zmíněného zařízení.</p>
  </li>
  
  
  
  <li>
    <p><b>Orientace</b> – někteří lidé používají svá zařízení na šířku (<i lang="en">landscape</i>) i na výšku (<i lang="en">portrait</i>).</p>
  </li>
  <li>
    <p><b>Screen</b> – změna velikosti <i>viewportu</i> (prostoru, kde se může vykreslovat obsah stránky). Tažením za okraje si lze s velikostí hrát nebo jde přesně zadat v pixelech.</p>
    
    <p>Kliknutím na ikonu vlevo od zaškrtávátka <i>Screen</i> jde zapnout visualisaci <a href="/media"><code>@media</code> pravidel</a>.</p>
    
    <p>Spolu s nastavováním velikosti stránky se hodí i možnost <b>Zoom to fit</b>. Pokud se web testuje na zařízení s malou obrazovkou, jde díky tomu dostat zmenšeninu ve vyšším rozlišení.</p>
  </li>
  
  
  <li>
    <p><b>Pixel ratio</b> – hodnota vpravo od rozměrů značí poměr HW a SW pixelů.</p>
    
    <p><img src="/files/testovani-mobily/device-pixel-ratio.png" alt="Pixel ratio" class="border"></p>





    
    
    
    
    
    
    
    <p>Prohlížeče mobilů obvykle mají nějaký poměr mezi HW pixely a SW pixely. Zpravidla nebývá 1:1.</p>   
    
    <p>Tedy telefon s rozlišením 1080 × 1920 (FullHD) zobrazí stránku třeba v třetinovém rozlišení 360 × 640. Device pixel ratio je potom rovno hodnotě <b>3</b>.</p>

    <p>Děje se to kvůli tomu, že pixel na telefonu může být tak malý, že by stránka zobrazená v poměru 1:1 byla nečitelná.</p>
  </li>
</ul>


<h2 id="rychlost">Rychlost připojení</h2>

<p>U mobilních zařízení se může někdy stát, že jsou připojena k internetu velmi špatným způsobem. Na řadě míst není kvalita signálu dobrá, takže se připojení vyznačuje:</p>

<ol>
  <li>Pomalou přenosovou rychlostí (dlouho trvá, než se něco stáhne).</li>
  <li>Pomalou odezvou (dlouho trvá, než se něco začne stahovat).</li>
</ol>

<p>Naštěstí <b>rychlost a odezvu připojení</b> jde ve vývojářských nástrojích ručně nastavit.</p>

<p><img src="/files/vyvojarske-nastroje/nastaveni-rychlosti.png" alt="Nastavení rychlosti připojení" class="border"></p>
























<p><b>Poznámka</b>: Občas se stane, že člověk zapomene omezenou rychlost vypnout a potom se diví, proč se běžné stránky mimo režim testování pomalu načítají.</p>




<h2 id="vykon">Výkon zařízení</h2>

<p>Asi nejhůře se bez skutečného zařízení testuje výkon celého webu. Průměrný desktop bude typicky mnohem rychlejší než prastarý telefon.</p>

<p>Problémy s výkonem se ale běžných obsahových webů tolik netýkají.</p>

<p>Největší brzdou obvykle bývají efekty navázané na scrollování jako paralax efekty, fixní prvky a podobné věci, které nutí prohlížeč překreslovat velkou plochu obrazovky.</p>

<div class="internal-content">
  <ul>
    <li><a href="/vykreslovani#mereni">Měření plynulosti vykreslování</a></li>
  </ul>
</div>




<p>Ačkoliv jde výkon (počet FPS) v prohlížeči měřit, při tvorbě her nebo visuálně náročných animací se ale reálné zařízení docela hodí.</p>




<h2 id="vzdalene">Vzdálené testování</h2>

<p>Kromě simulování různých zařízení v nástrojích <b>Chromu</b> existují služby nabízející vzdálené připojení ke skutečným fysickým zařízením (100% věrnost) nebo emulátorům.</p>

<p><img src="/files/testovani-mobily/browserstack.png" alt="Browserstack" class="border"></p>


































<p>Asi nejpopulárnější je Browserstack. Jedná se o placenou službu s omezenou trial versí zdarma (časem a dostupnými zařízeními).</p>

<p>Kromě testování různých mobilních platforem a prohlížečů umí i desktopové OS/prohlížeče.</p>


<div class="external-content">
  <ul>
    <li><a href="https://www.browserstack.com/">Browserstack</a> – vzdálené testování v různých prohlížečích</li>
  </ul>
</div>

<h2 id="localhost">Localhost na mobilu</h2>

<p>Při lokálním vývoji na PC se může hodit podívat na výsledek i na mobilu.</p>

<p>Nejsnazší je připojit počítač i mobil ke stejné Wi-Fi, zjistit IP adresu počítače v rámci sítě a zadat ji do mobilu:</p>


<p><img src="/files/testovani-mobily/zjisteni-ip-adresy.png" alt="Zjištění IP adresy" class="border"></p>


























<p>Pokud vývoj na PC běží na adrese <code>localhost:<b>3000</b></code>, stačí v tomto případě na mobilu přejít na <code>192.168.8.102:<b>3000</b></code>.</p>

<h2 id="smartphone">Je potřeba smartphone?</h2>

<p>Z možností, kterými disponují vývojářské nástroje nebo vzdálené testování, se skoro může zdát, že mít skutečný smartphone nemusí být nutné.</p>

<p>Na jednu stranu je to pravda, lepší ale bývá si alespoň pro představu web na mobilu osahat.</p>

<p>Způsob ovládání prsty se od používání přesného kursoru myši značně liší.</p>


<h2 id="odkazy">Související</h2>

<div class="internal-content">
  <ul>
    <li><a href="/testovani-edge">Testování v MS Edge a IE</a> – jak testovat v prohlížečích od Microsoftu</li>
    <li><a href="/prohlizece">Testování webů napříč prohlížeči</a> – testování i pro desktop</li>
      <li><a href="/prohlizece-optimalisace">Pro jaké prohlížeče ladit svůj web</a> – teoretická úvaha (trochu starší)</li>
  </ul>
</div>