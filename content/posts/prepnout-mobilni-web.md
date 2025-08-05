---
title: "Přepnout na mobilní/desktopový web"
headline: "Přepnout mobilní/desktopový web"
description: "Jak přepnout mezi desktopovým a mobilním webem. Má to vůbec smysl?"
date: "2015-12-09"
last_modification: "2015-12-10"
status: 1
tags: ["napady", "responsive"]
format: "html"
---

<p>U responsivního webu je běžné, že na mobilu není možné vidět jeho plnou desktopovou podobu, ale pouze responsivní versi pro malé rozlišení.</p>

<p>Některým lidem to může vadit:</p>

<blockquote>
  <p>Co jsem udělal u responsivního designu při pohledu na mobilu? Zakomentoval řádek na responsivitu! Já fakt ty mobilní verze nenávidím.</p>
  
  <p class="autor">– Jan Horák na <a href="https://twitter.com/domainsworld/status/674620474257768448">Twitteru</a></p>
</blockquote>






<h2 id="kdy-vadi">Kdy responsivní vadí?</h2>

<p>Někomu se může zdát divné, že existují lidé, kteří dají přednost desktopovému vzhledu, když je stránka přizpůsobena pro malé displeje.</p>


<p>Stává se to hlavně v následujících případech:</p>


<ol>
  <li>
    <p><b>Zvyk</b> – návštěvník je zvyklý používat daný web z počítače. Při jeho zobrazení na mobilu si na responsivní podobě připadá jako na jiných stránkách, protože najednou všechno vypadá a ovládá se jinak.</p>    
  </li>  
  <li>
    <p><b>Chybějící obsah</b> – někteří tvůrci webů části obsahu na mobilech natvrdo skrývají.</p>
    
    <p>Pokud se nejedná o reklamy, zákon schválnosti zajistí, že při <a href="/prevod-responsivni-design">převádění desktopového webu na responsivní</a> a skrývání obsahu pro mobil se skryje zrovna něco, co návštěvník chce.</p>
    
    <p>Ideálně by se proto nic skrývat nemělo. Tohle je problém i kvůli <a href="/seo">vyhledávačům</a>, protože ty nechtějí posílat návštěvníky na weby, kde hledaný obsah nakonec nebude viditelný.</p>
    <div class="internal-content">
      <ul>
        <li><p><a href="/skryty-text">Google a skrytý text</a> – postoj Googlu ke skrytému textu</p></li>
      </ul>
    </div> 
  </li>  
  <li>
    <p><b>Odbyté zobrazení</b> – řada součástí velkých desktopových webů je obtížně převoditelná pro malé obrazovky. Typický příklad jsou třeba tabulky, které se řeší dost krkolomně.</p>
    
    <div class="internal-content">
      <ul>
        <li><p><a href="/responsivni-tabulky">Responsivní tabulky</a> – všechny možné postupy, co udělat s tabulkou na mobilech</p></li>
      </ul>
    </div>
    
    <p>Zvlášť v kombinaci se zvykem může být nedostatečně promyšlené zobrazení na malých obrazovkách důvodem k zavržení responsivního vzhledu.</p>
    
    <p>Tomuto problému jde předcházet <a href="/mobile-first">mobile-first</a> postupem, kdy se obsah navrhuje nejprve pro malá zařízení.</p>
  </li>  
  <li>
    <p><b>Plýtvání místem</b> – majitelé mobilního přístroje s velkým displejem a dobrým zrakem nemusí mít problém s lehce odzoomovanou desktopovou podobou stránky ani na mobilu.</p>
    
      
    
    <p>Při zobrazení na šířku je řada desktopových webů relativně pohodlně čitelná.</p>
    
    <p><img src="/files/prepnout-mobilni-web/dfens.png" alt="Desktopová stránka na mobilu" class="border"></p>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    <p>Protože lidé mají zrak různý a mobil používají v různých vzdálenostech od očí, může být řešením nastavitelná velikost písma. Docela hezky to vyřešili programátoři na iDNESu:</p>
    
    <p><img src="/files/prepnout-mobilni-web/velikost.png" alt="Zvětšení velikosti písma" class="border"></p>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <p>Pokud web na mobilu plýtvá místem, motivuje to návštěvníka k desktopovému vzhledu.</p>
         
    
    <p>Je dobré se slepě nedržet break-pointů mobil – tablet – desktop (míst, kde se změní rozložení webu). Ale upravovat rozložení v závislosti na tom, jak se vejde do daného prostoru.</p>
    
    <p>I na malé šířce mobilů držených „na výšku“ může někdy mít smysl použít vícesloupcové zobrazení.</p>
  </li>
</ol>


<h2 id="proc-responsivni">Proč responsivní</h2>

<p>Z bodů výše by se mohlo zdát, že responsivní podoba stránky nemusí být potřeba.</p>

<p>Tak to ale není.</p>



<p>Kromě skupiny lidí, kterým responsivní weby vadí, existuje ještě početnější skupina, které <b>vadí neresponsivní desktopové stránky na mobilu</b>.</p>



<blockquote>
  <p>Hodně lidí z webu neoptimalisovaného pro mobil rovnou uteče.</p>
</blockquote>


<p>Ze statistik jednoho webu před časem vyplynulo, že na mobilech má responsivní podoba stránky přibližně 2× nižší míru okamžitého opuštění, než měla desktopová varianta.</p>

<p>Vyhledávač <a href="/google">Google</a> si kvůli tomu pohrával s označeních stránek <a href="/google-mobile-friendly">„mobile-friendly“</a> ve výsledcích hledání.</p>




<h2 id="prepinani">Zapnout/vypnout responsivitu</h2>

<p>V případě, že pro web platí některý z bodů, kdy responsivní web vadí, nabízí se přidat přepínač, který responsivní zobrazení vypne.</p>


<p>Přidat tuto možnost není příliš složité.</p>

<p>Pro zapnutí „desktopové verse“ na mobilech stačí odstranit značku 
  <a href="/meta-viewport"><code>&lt;meta name=viewport></code></a>:</p>

<pre><code>&lt;meta name="viewport" content="width=device-width,initial-scale=1"></code></pre>

<p>Mobilní prohlížeč tak bude simulovat větší šířku a stránka se zobrazí podobně jako na desktopu.</p>

<p>Přepnutí přidáváním/odebíráním <code>&lt;meta></code> značky jde provádět JavaScriptem bez nutnosti obnovit stránku:</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/zrsb-">Živá ukázka</a> – zapnutí/vypnutí responsivního webu</li>
  </ul>
</div>


<p>Tento postup <b>nejde použít u desktopových prohlížečů</b>. Ty se ke značce <code>viewport</code> chovají jinak. Výše uvedená ukázka proto na desktopu <i>nic nedělá</i>.</p>


<p>Pro uložení nastavení se potom hodí použít <a href="/cookies">cookies</a> a při opětovném načtení stránky příslušnou podobu <code>&lt;meta name=viewport></code> vygenerovat na straně serveru.</p>


<div class="soft">
  <p>Přepínání bez obnovení stránky <b>na mobilních zařízeních</b> z <a href="http://kod.djpw.cz/zrsb-">ukázky</a> nemám moc otestované. Budu moc rád, když to vyzkoušíte a dáte mi vědět do komentářů s informací o prohlížeči/OS.</p>
  
  <ul>
    <li><p>Při testování jsme narazili na problém v mobilním <b>Firefoxu</b>, kde přepínání <code>viewport</code>u JavaScriptem neprobíhá korektně.</p></li>
  </ul>
  <p>Děkuji.</p>
</div>







<h3 id="pevne-rozmery">Nastavení pevných rozměrů</h3>

<p>V ukázce se pro zrušení přizpůsobování velikosti stránky šířce zařízení (<code>width=device-width</code>) nepoužívá nastavení větší šířky v pevných rozměrech pomocí pixelů.</p>

<p>Je to z toho důvodu, aby si prohlížeč šířku sám určil dle svého uvážení.</p>




<h3 id="prepnout-desktop">Přepnutí na desktopu</h3>

<p>Je otázka, jestli existuje reálná potřeba při úzkém okně na desktopu vypnout responsivní versi.</p>

<p>V takovém případě jde použít třeba postup, který popsal <a href="http://www.1-webdesign.cz/"><b>habendorf</b></a> (nejlepší kodér, co znám):</p>


<blockquote>
  <p>Řešil jsem to dvěma CSS soubory, základním a „mobilním“ (záměrně v uvozovkách), přičemž ten „mobilní“ se na nějaký <code>onclick</code> zakazoval/povoloval.</p>
</blockquote>

<p>Jiné řešení je přidat před všechny deklarace pro zobrazení mimo desktop speciální třídu, kterou potom půjde přepínat pro <code>&lt;html></code>/<code>&lt;body></code>. Zvýší to ale sílu <a href="/css-selektory">selektorů</a>, na to je třeba dát pozor.</p>





<h2 id="kam-umistit">Kam umístit přepínání</h2>

<p>Nejčastěji bývá tlačítko pro přepnutí umístěno na konci stránky u patičky, takže asi tam.</p>




<h2 id="vypnuti-prohlizec">Vypnutí mobilního zobrazení v prohlížeči</h2>

<p>Většina mobilních prohlížečů má v sobě funkci pro přepnutí mezi desktopovým a mobilním zobrazení.</p>

<p>Mobilní <a href="/edge-mobile"><b>Edge</b></a> ve <b>Windows 10 Mobile</b>:</p>


<p><img src="/files/prepnout-mobilni-web/edge.png" alt="Desktopová stránka na mobilu" class="border"></p>
    
    
    
    
    
    
    










<p>Obdobné nastavení mají i prohlížeče na jiných platformách.</p>

<p>Problém tohoto nastavení je ale v tom, že pouze mění hlavičku <a href="/ua"><code>user-agent</code></a>, aby pro automatické detekce nevypadala jako z mobilu.</p>



<p>Změna nastavení tak zafunguje u webů, kde se používá detekce mobilů a <a href="/mobilni-web-url">přesměrování na mobilní subdoménu</a> nebo servírování různého obsahu podle detekce.</p>



<p>Na <b>responsivní design</b> vytvořený pouze změnou CSS a <code>@media</code> pravidly to nemá vliv. To je trochu škoda, ale nejspíš s tím nejde rozumně nic moc dělat.</p>

<p>Přidávat <code>&lt;meta name=viewport></code> na základě detekce <i>user-agenta</i> není tak spolehlivé, navíc lidí, kteří toto nastavení znají a používají, bude nejspíš velmi málo.</p>