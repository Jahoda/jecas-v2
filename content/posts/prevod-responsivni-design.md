---
title: "Jak předělat web na responsivní"
headline: "Převod webu na responsivní design"
description: "Jak webovou stránku co nejlépe a nejjednodušeji převést do responsivní podoby."
date: "2015-04-20"
last_modification: "2015-04-21"
status: 1
tags: ["hotova-reseni", "responsive"]
format: "html"
---

<p>Při <b>navrhování nového webu</b> je dobré myslet na to, že si stránku budou moci prohlížet návštěvníci na širokém spektru velikosti obrazovek.</p>

<ul>
  <li>Běžný rozsah rozlišení v roce 2015 se pohybuje někde okolo <b>320 až 2560 pixelů</b>.</li>
  
  <li>Návštěvníci navíc používají obrovské množství <b>různých konkrétních rozlišení</b>. Jen za poslední týden na tomto webu <a href="/ga">Google Analytics</a> naměřil <b>180 různých rozlišení</b> obrazovky.</li>
</ul>

<p>Co ale dělat, když je potřeba předělat již existující web s fixním layoutem do <b>responsivní podoby</b>?</p>



<h2 id="fixni">Fixní layout a breakpointy</h2>

<p>V dřívějších dobách bylo poměrně běžné, že se místo jednoho layoutu (rozvržení webu) s pevnými rozměry vytvořila další dvě rozvržení:</p>

<ol>
  <li><b>layout pro mobily</b> (v šířce například 320 nebo 480 pixelů),</li>
  
  <li><b>rozvržení pro tablety</b></li>
</ol>

<p>Pomocí CSS <a href="/mobilni-web#media-queries">pravidla <code>@media</code></a> se vytvořily tzv. <i>breakpointy</i> – hodnoty šířky obrazovky, kdy se aplikují odlišná CSS pravidla.</p>

<p>Takový přístup umožňoval vytvoření <b>na pixel přesného designu</b> (anglický termín: <i lang="en">pixel-perfect</i>), protože všechny rozměry jsou zadány v pixelech. Na druhou stranu pokryl jen úzkou skupinu používaných rozlišení.</p>

<p>Třísloupcové pevné rozvržení stránky vypadá typicky následovně:</p>

<p><img src="/files/prevod-responsivni-design/fixni.png" alt="Fixní třísloupcový layout" class="border"></p>


















<h2 id="pruzny">Pružný layout</h2>

<p>S ohledem na různá používaná rozlišení se zdá být výhodnější rozvržení, které se odvíjí od aktuální dostupné velikosti plochy, kde se může stránka zobrazovat (tzv. <i>viewport</i>).</p>

<p>Takový typ layoutu se obvykle označuje jako <b>pružný, gumový, elastický, procentuální, dynamický</b> a podobně.</p>

<p>Od fixního se liší tím, že se zadávají pouze <b>poměry rozměrů</b> jednotlivých sloupců. Pokud bude mít obal těchto sloupců nastavenu pevnou šířku, výsledek bude naprosto totožný jako v předchozím případě.</p>


<p><img src="/files/prevod-responsivni-design/procenta.png" alt="Fixní třísloupcový layout" class="border"></p>
















<p>Zajímavé věci se začnou dít, když se poslední <b>fixní šířka</b> odstraní – layout se bude přizpůsobovat šířce okna, aby ji za každé okolnosti vyplnil, ale nevytvořil vodorovný posuvník.</p>

<p>Při zúžení okna z 1000 na 850 pixelů se celé rozvržení chytře přizpůsobí.</p>

<p><img src="/files/prevod-responsivni-design/procenta-zmena.png" alt="Procentuální třísloupcový layout" class="border"></p>



















<h3 id="max-width">Maximální šířka</h3>

<p>Protože s ohledem na <a href="/responsivni-web#typografie">délku řádku textu</a>, která je ještě pohodlně čitelná (např. 80 znaků/řádek), je zbytečné na FullHD monitoru (1920 px na šířku) využít celý prostor, <b>maximální šířka</b> celého webu se nějak omezuje.</p>

<p>Slouží k tomu CSS vlastnost <code>max-width</code>. Maximální šířka se většinou zadává v pixelech, ale lepší je použít <code>em</code> jednotky, protože potom bude rozměr správně reagovat na případné <b>zvětšení písma</b> ze strany uživatele.</p>

<div class="internal-content">
  <ul>
    <li><a href="/responsivni-web#px">Proč nepoužívat pixely</a> – vysvětlení + nástroj pro přepočet <code>px</code> na <code>em</code></li>
  </ul>
</div>


<h3 id="minimalni-sirka">Minimální šířka sloupců</h3>

<p>Stejně jako je vhodné omezit maximální šířku, taktéž naopak <b>minimální</b> šířka je potřeba. V opačném případě by z třísloupcového layoutu na malé obrazovce mobilního telefonu vznikly jen <b>tři úzké nudle</b>, kam by se obsah těžko vměstnal.</p>


<p>Řešení je postupně (již pružnou) stránku zužovat a v momentě, kdy je obsah ve sloupcích už příliš nalepený, přidat <b>breakpoint</b> pomocí pravidla <code>@media</code>, kterým se počet sloupců sníží.</p>

<div class="internal-content">
  <ul>
    <li><a href="/responsivni-mrizka">Responsivní CSS mřížka</a> – proměnlivá změna počtu sloupců a šířky na základě rozlišení</li>
  </ul>
</div>

<p>V daném breakpointu se zvedne procentuální šířka sloupců, což je odsune pod sebe (na obrázku se už třetí sloupec nevejde, takže se posune pod).</p>

<p><img src="/files/prevod-responsivni-design/odskoceni.png" alt="Přeskládání sloupců" class="border"></p>















<p>A následně se skončí jednosloupcovou variantou přes celou šířku u nejmenších zařízení (obrázek nerespektuje měřítko).</p>

<p><img src="/files/prevod-responsivni-design/pod-sebou.png" alt="Přeskládání sloupců" class="border"></p>
















<p>Pouhé <b>přeskládání obsahu pod sebe</b>, ale nemusí být ideální. Proč a co s tím udělat je popsáno dále v článku…</p>


<h2 id="praxe">Vytvoření responsivního designu v praxi</h2>

<p>V praxi potom převod fixního layoutu na responsivní vyžaduje následující.</p>




<h3 id="viewport">Nastavit <code>viewport</code></h3>

<p>Pro mobilní zařízení je nutné vložit do hlavičky stránky <a href="/meta-viewport"><code>&lt;meta></code> značku <code>viewport</code></a>, která mobilnímu prohlížeči řekne, že se stránka chce přizpůsobovat skutečné šířce. Aby totiž <b>ne</b>responsivní stránky na mobilech jakž takž fungovaly, mobilní prohlížeč pro ně simuluje větší rozlišení a potom stránku zmenší.</p>

<p>Použití <i>viewportu</i> toto chování zruší.</p>

<pre><code>&lt;meta name="viewport" content="width=device-width"></code></pre>





<h3 id="box-model">Používat okrajový box-model</h3>

<p>Při používání rozměrů v procentech je praktičtější „okrajový“ <a href="/box-model">box-model</a>. Není při jeho použití problém <b>kombinovat rozměry v procentech</b> třeba s jednotkou <code>em</code> nebo <code>px</code>. Jednomu elementu tak půjde nastavit šířku, <code>padding</code> a rámeček v různých jednotkách, protože odsazení (<code>padding</code>) a rámeček (<code>border</code>) se nepřičítají k rozměrům elementu.</p>

<p>Přepnout box-model na <code>border-box</code> u všech elementů na stránce jde přidáváním tohoto předpisu do CSS:</p>

<pre><code>*, 
*:after, 
*:before {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}</code></pre>







<p>Problém s mícháním jednotek teoreticky řešit počítáním pomocí <a href="/calc"><code>calc</code>/<code>-webkit-calc</code></a>, použití okrajového (<code>border-box</code>) modelu je ale jednodušší.</p>

<p>Navíc <code>calc</code> nepodporuje <b>IE 8</b>, stará <b>Opera 12</b>, <b>Android Browser 4.3</b> a <b>Opera Mini</b>.</p>




<h3 id="pevna-sirka">Odstranit pevnou šířku</h3>

<p>Jelikož se stránka má ve finále vejít i na obrazovku mobilu s kratší stranou o šířce 320 pixelů, všechny předpisy „<code>width: 321px</code>“ a širší musí jít z CSS pryč.</p>

<p>Pokud se <b>blokovému elementu</b> šířka nenastaví (a není <a href="/float">floatovaný</a>), roztáhne se přes celou dostupnou plochu. Někteří tvůrci CSS toto pravidlo neznají (nebo se jím neřídí), takže je možné pozorovat i zbytečné nastavení šířky vnitřního elementu na stejnou hodnotu jako má jeho rodič.</p>

<pre><code>&lt;div style="width: 500px">
  &lt;div style="<b>width: 500px</b>">
  &lt;/div>
&lt;/div></code></pre>







<p>Hodně vlastností <code>width</code> je tak možné z kódu odstranit. V případě, že by roztažení přes celý dostupný prostor vedlo k moc velké šířce, stačí přepsat <code>width</code> na <code><b>max-</b>width</code>.</p>

<p>Typicky se <code>max-width</code> používá pro omezení šířky celého obalu, vnitřní rozměry jsou potom v procentech.</p>




<h3 id="sloupce">Sloupce převést do procent</h3>

<p>Při převádění (zpravidla obtékaných) sloupců do procent je potřeba především <b>kalkulačka</b> a základní znalost počítání s procenty. Nebo použít tento přepočítávací nástroj:</p>

<div class="live no-source">
<form oninput="prepocitat(this)">
<p>
    <label>Sloupec 1: <input type="number" value="250"> px</label>
</p>
<p>
    <label>Sloupec 2: <input type="number" value="500"> px</label>
</p>
<p>
    <label>Sloupec 3: <input type="number" value="250"> px</label>
</p>
</form>
<div id="vysledek">
    <div class="vysledek-sloupec" style="width: 25%">25 %</div>
    <div class="vysledek-sloupec" style="width: 50%">50 %</div>
    <div class="vysledek-sloupec" style="width: 25%">25 %</div>
  <br clear="all">
</div>  
</div>

<p><b>Pozor na margin</b>!</p>

<p>V případě, že se používá okrajový box model a při převodu na procenta se sloupce vedle sebe nevejdou, nejspíš bude příčinou <b>odsazení</b> – vlastnost <a href="/margin"><code>margin</code></a> – je nutné tuto vlastnost odstranit/vynulovat a odsazení realisovat <b>vnořeným elementem</b> nebo <code>margin</code> zadat v procentech a jeho rozměr odečíst od šířky (rovněž v procentech). Zkrátka šířky + odsazení se musí vejít do 100 %.</p>


<h3 id="objekty">Obrázky, videa, iframe, objekty</h3>

<p>Typem prvků, které se nemusí vejít do responsivní podoby stránek, jsou prvky, které se i bez zadání <code>width</code> nemusejí na malou obrazovku vejít.</p>

<p>Rychlé řešení je přidat do CSS:</p>

<pre><code>img, iframe, canvas, video, svg {
  max-width: 100%;
  height: auto;
}</code></pre>







<p>Zajistí se tím „nerozbití layoutu“, ale optimální postup to úplně není. Pro nižší rozlišení by například mohl stačit <b>zmenšený a datově úspornější obrázek</b>. Bohužel s ohledem na zpětnou kompatibilitu a chování prohlížečů není k disposici úplně elegantní řešení. Navíc je v takovém případě nutné nějak generovat různé velikosti obrázků.</p>

<div class="external-content">
  <ul>
    <li>Martin Michálek: <a href="http://www.vzhurudolu.cz/prirucka/picturefill">Picturefill</a> – technika řešení responsivních obrázků</li>
  </ul>
</div>

<p>Je otázka, zda rozumná <b>podpora v koncových zařízení</b> (prohlížeče, roboti vyhledávačů) přijde dřív než doba, kdy nebude tolik nutné řešit pár desítek ušetřených kilobytů.</p>




<h3 id="forumulare">Formulářové prvky</h3>

<p>Nevejít do 320 px se mohou i formulářové prvky – <a href="/input"><code>&lt;input></code></a> nebo <a href="/textarea"><code>&lt;textarea></code></a>. Řešení je opět <code>max-width</code> a dát si pozor na případný <code>margin</code>.</p>

<pre><code>input, textarea, select {
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
}</code></pre>







<h3 id="grafika">Obrázková grafika</h3>

<p>Velkou překážkou je grafický návrh webu sestávající z <b>velkého množství obrázkové grafiky</b>, kterou je s proměnlivými rozměry často obtížné skloubit.</p>

<p>Jde ale využít možnosti CSS (<a href="/border-radius">kulaté rohy</a>, <a href="/box-shadow">stíny</a>, <a href="/gradient">gradienty</a>, <a href="/opacity">průhlednost</a>), které v době vytváření původního fixního layoutu nebyly dostatečně podporované, a nahradit těmito CSS postupy značné množství grafiky.</p>



<h3 id="tabulky">Tabulky</h3>

<p>Úplně největší oříšek jsou HTML tabulky, které obsahují <b>hodně obsahu</b> nebo mají <b>hodně sloupců</b>.</p>

<p>Rychlé řešení je tabulku „rozlámat“ změnou vlastnosti <a href="/display"><code>display</code></a>. Může se ale stát, že to znemožní její čitelnost (jednotlivé buňky budou pod sebou dle pořadí v HTML kódu).</p>

<p>Pro <b>Internet Explorer 9</b> nestačí použít <code>display: block</code>, ale rozlomení buněk tabulky zajistí až <code>float</code>.</p>

<p>Mobilní varianta <b>IE 9</b> se nachází ve Windows Phone 7, který ve starších telefonech již nejde updatovat na WP 8 s <b>IE 11</b>.</p>
  
  
<p>Finální řešení je tedy následující (<a href="https://kod.djpw.cz/yqmb">ukázka</a>).</p>

<pre><code>@media screen and (max-width: 600px) {
  /* rozlámání tabulek */
  td, th, tr, thead, tbody, tfoot {
    float: left;
    width: 100%;
  } 
}</code></pre>









<p>Prakticky neřešitelné jsou potom tabulky se <b>sloučenými buňkami</b> (HTML atributy <code>colspan</code>/<code>rowspan</code>). Takové je buď nutné kompletně předělat, nebo alespoň obalit elementem s <code>overflow-y: auto</code>, což umožní se k celému obsahu tabulky vodorovně dorolovat, aniž by se roztáhla celá stránka.</p>

<pre><code>.overflow {
    overflow-y: auto;
}</code></pre>

<div class="internal-content">
  <ul>
    <li><a href="/responsivni-tabulky">Responsivní tabulky</a> – různé způsoby, jak si poradit s tabulkami na mobilech a tabletech</li>
  </ul>
</div>




<h3 id="velikost">Velikost písma a prvků</h3>

<p>Tlačítka nebo odkazy, co jde pohodlně trefit <b>myší</b>, nemusí být dostatečně velká pro <b>ovládání prsty</b>.</p>

<blockquote>
  <p>Google uvádí doporučení, že ovládací prvek by měl být velký alespoň 48 × 48 pixelů (cca 7 × 7 milimetrů ve skutečnosti), aby šel snadno trefit průměrně velkým prstem.</p>

<p>U některých méně důležitých ovládacích prvků stačí rozměry menší, v tom případě by ale mělo být mezi nimi větší horisontální a vertikální odsazení. Google tento odstup stanovuje na 32 pixelů (5 mm) oběma směry.</p>
<div class="autor">— <a href="/oprava-chyb-pouzitelnosti#dotykove-prvky">Dotykové prvky jsou moc blízko</a></div>
</blockquote>



<p>Velikost písma je nejjednodušší <b>globálně vůbec nenastavovat</b> a ponechat výchozí, což je většinou <b>16 pixelů</b>. A pouze zvětšit nadpisy nebo důležitý text – jde k tomu použít třeba procenta.</p>

<p>Případně místy zmenšit méně podstatný text.</p>




<h2 id="skryvani">Skrývání obsahu</h2>

<p>Protože pouhé přeskládání několika-sloupcového rozložení do <b>jedné úzké nekonečně dlouhé nudle</b> není z hlediska pohodlného procházení webu úplně ideální postup, může se nabízet některé prvky stránky úplně skrýt.</p>



<h3 id="skryti-obsahu">Úplné skrytí obsahu</h3>

<pre><code>.nedpostatny-box {
  display: none;
}</code></pre>





<p>A je to. Nebo ne?</p>

<p>Problém <b>trvalého skrývání obsahu</b> je větší, než se může zdát.</p>

<ol>
  <li><p>Zákon schválnosti zajistí, že návštěvník bude hledat zrovna ten obsah, co se <b>jako nepodstatný skryl</b>. Vzhledem k tomu, že responsivní podobu webu většinou není z mobilu snadné „vypnout“, bude nemožnost dostat se k obsahu „který tam na počítači byl“ značně nepříjemná.</p></li>
  
  <li>
    <p>Skrývání obsahu není úplně <b>vhodná praktika vzhledem k vyhledávačům</b>. Z pohledu návštěvníka není situace, kdy mu vyhledávač obsah najde, ale na stránce potom není ihned vidět, dvakrát dobrá.</p>
    <p><a href="/google">Google</a> kvůli tomu i snižuje váhu obsahu, který je skrytý, byť jde odkrýt.</p>
    <div class="internal-content">
      <ul>
        <li><a href="/skryty-text">Google a skrytý text</a></li>
      </ul>
    </div>
  </li>
</ol>


<h3 id="zobrazit-skryt">Tlačítka pro zobrazení obsahu</h3>

<p>Co tedy s tím? Vytvořit onu kilometr dlouho mobilní stránku není žádoucí. Zbývá proto méně špatná varianta – ne tak důležité části stránky <b>skrýt za tlačítka</b>, která budou obsah zobrazovat/skrývat.</p>

<p>Před procesem skrývání si je nutné rozmyslet, které prvky na stránce jsou ty <b>nejdůležitější</b> – tj. by měly být ihned viditelné a pokud možno hned na začátku stránky.</p>

<p>Pro technické řešení stačí troška JavaScriptu.</p>

<div class="internal-content">
  <ul>
    <li><a href="/zobrazit-skryt">Skrývání a odkrývání textu</a></li>
    
    <li><a href="/rozbaleni">Plynulé rozbalení obsahu</a> – obsah se může rozkrýt i postupně plynulou změnou výšky</li>
    
    <li><a href="/responsivni-menu">Responsivní navigace</a> – různé řešení navigace schované do tlačítka</li>
  </ul>
</div>


<h2 id="rychlost">Rychlost</h2>

<p>Ačkoliv <b>rychlost načítání</b> není podmínkou pro funkční responsivní layout webu, z mobilních zařízení se častěji připojují lidé s pomalejším připojením k internetu. Je tedy dobré, když už responsivní web existuje, aby se také uživatelům načetl v rozumné době.</p>

<p>Odhalit nedostatky v rychlosti načítání a navrhnout opravy umí online nástroj <a href="http://developers.google.com/speed/pagespeed/insights/">Google PageSpeed Insights</a>.</p>






<h2 id="testovani">Testování mobilního webu</h2>

<p>Pro zběžné otestování formální použitelnosti stránky v mobilech existuje test od Googlu:</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.google.com/webmasters/tools/mobile-friendly/">Test použitelnosti v mobilech</a></li>
  </ul>
</div>

<p>Projít tímto testem je užitečné, protože Google <a href="/google-mobile-friendly">označuje stránky vhodné pro mobil</a> ve výsledcích hledání, což může přinést <b>vyšší míru prokliku</b> u vyhovujících stránek. Z praktického hlediska ale „zelená hláška“ zase tolik nezaručuje.</p>


<h3 id="zarizeni">Je potřeba pro testování několik mobilů a tabletů?</h3>

<p>K testování responsivního webu z velké části stačí běžný počítač. Mobilní prohlížeče používají velice <b>podobná vykreslovací jádra</b> jako „velké“ prohlížeče.</p>

<p>Menší obrazovku jde potom snadno nasimulovat zmenšením okna prohlížeče.</p>

<p><b>Chamurappi</b> (vládce <a href="http://webylon.info">Webylonu</a>) doporučuje pro testování na desktopu <b>používat zoom</b>.</p>

<blockquote cite="http://diskuse.jakpsatweb.cz/?action=vthread&forum=15&topic=162695#4">
  <p>Na desktopu jsou lidé zvyklí ladit bez zoomu, mobilní prohlížeče jsou de facto přizoomované vždy. Podle mě je vhodné na desktopu natáhnout okno na šířku 640 nebo 960 pixelů a nastavit 200% zoom – to je přesnější reprezentace toho, jak stránka v mobilu funguje, než když prohlížeč simuluje třistadvacetipixelové okénko.</p>
  
  <p class="autor">Chamurappi</p>
</blockquote>

<p>Ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> v <b>Chrome</b> je navíc k testování na mobilních zařízeních funkce <b>Mobilní zobrazení</b>. Zapíná se ikonkou telefonu.</p>

<p><img src="/files/prevod-responsivni-design/mobilni-zobrazeni.png" alt="Přepnutím mobilního režimu zobrazení" class="border"></p>





<p>Tento nástroj v <b>Chrome</b> dokáže navíc emulovat dotykové události <a href="/udalosti-mysi#dotykove"><code>ontouch*</code></a>, nastavovat rychlost připojení, měnit hlavičku <i>User agent</i>, měnit hustotu pixelů, nebo nastavit rozlišení dle některých populárních mobilů a tabletů.</p>


<p><img src="/files/prevod-responsivni-design/chrome-mobile.png" alt="Mobilní režim zobrazení" class="border"></p>



















<p>V některých situacích se ale web na skutečném fysickém zařízení může chovat trochu jinak. Navíc prohlížení webu na malém zařízení a ovládání prsty se dost liší od emulace pomocí myši na velkém PC. Rozhodně je tedy užitečné si stránku zkusit <b>používat i na skutečném mobilu</b>.</p>

<p>Jde tak třeba zjistit, že často používané ovládací prvky jsou špatně dostupné nebo příliš malé a podobně.</p>


<p>Opatřit si <b>zařízení pro testování</b> nemusí být úplně nákladná záležitost. Není k tomu potřeba nejvýkonnější model telefonu/tabletu, ale naopak se docela hodí slabší HW, což může tvůrce přimět příliš neplýtvat systémovými prostředky. Dále potom stačí zařízení z druhé ruky a ani nemusí být plně funkční – zpravidla je potřeba hlavně funkční internetový prohlížeč a Wi-Fi připojení.</p>




<style>
  
.vysledek-sloupec {
    color: #fff;
    padding: 1em 0;
    text-align: center;
    background: #0D6AB7;
    float: left;
    overflow: hidden;
}
.vysledek-sloupec + .vysledek-sloupec {
    background: #fff;
    color: #000;
}
.vysledek-sloupec + .vysledek-sloupec + .vysledek-sloupec {
    background: #1081DD;
    color: #fff;
}
</style>
<script>
var vysledek = document.getElementById("vysledek").getElementsByTagName("div");
function prepocitat(el) {
    var sloupce = el.elements;
    var celkem = 0;
    var pocetSloupcu = sloupce.length;
    for (var i = pocetSloupcu; i--; ) {
        celkem += parseInt(sloupce[i].value * 1);
    }

    var sirka, podil;
    for (i = pocetSloupcu; i--; ) {
        if (celkem === 0) {
            sirka = 0;
        }
        else {
            podil = parseInt(sloupce[i].value * 1) / celkem * 100;
            sirka = Math.round(podil * 1000) / 1000;
          //sloupce[i].parentNode.appendChild(document.createTextNode(podil));
            
        }
        vysledek[i].innerHTML = sirka + " %";
        vysledek[i].style.width = sirka + "%";
    }
}  
  
  // https://kod.djpw.cz/ipmb
</script>