---
title: "Jakou nastavit velikost písma?"
headline: "Velikost písma"
description: "Jaká je vhodná velikost písma na webové stránce."
date: "2015-06-10"
last_modification: "2015-06-10"
status: 0
tags: ["typografie"]
format: "html"
---

<p>Většina návštěvníků chodí na běžné webové stránky <b>číst text</b>. Je proto enormně důležité, aby text byl dobře čitelný. Správná <b>velikost písma</b> je jednou z podmínek dobře čitelného obsahu.</p>


<h2 id="citelnost">Co ovlivňuje čitelnost?</h2>

<ol>
  <li><b>Velikost písma</b> – <font style="font-size: 70%">příliš</font> malá písmena se návštěvníkům špatně čtou.</li>
  
  <li><b>Kontrast barev písma a pozadí</b> – <font style="color: #ccc">příliš</font> světlé písmo na světlém pozadí bude špatně čitelné.</li>
  
  <li><b>Použitý font</b> – <font style="font-family: cursive">některé</font> sady znaků mohou být hůře čitelné.</li>
  
  <li><b>Výška řádku</b> – <font style="line-height: 1; width: 6em; display: inline-block; vertical-align: top">nízké  rozestupy mezi řádky čitelnosti nepomohou.</font></li>
  
  <li><b>Délka řádku</b> – u dlouhého textu o více řádcích se čtenář snadno ztratí.</li>
</ol>


<h2 id="historie">Vývoj velikosti písma</h2>

<p>Pokud existuje nějaký společný prvek, jak odlišit weby z roku <b>2021</b> od webů z roku <b>2010</b>, je tím právě velikost písma.</p>

<p>Zatímco v dnešní době se je možné setkat s běžným textem o velikosti <b>16 pixelů</b> nebo i víc, před deseti lety se běžně používalo <b>12 pixelů</b> nebo i méně.</p>

<p><b>Proč?</b></p>

<p>Jako vysvětlení se nabízí vývoj <b>fysické velikosti</b> obrazovek (velikost uhlopříčky monitoru) a vývoj <b>rozlišení</b> (a dostupné <a href="/sirka-stranky">šířky okna prohlížeče</a>). Během let se zmenšila běžná fysická velikost jednoho pixelu.</p>

<blockquote>
  <p>Když obvyklý 15" monitor měl rozlišení na šířku 800 pixelů, běžný 22" monitor má rozlišení na šířku 1920 pixelů. Tj. uhlopříčka je větší jen o polovinu, ale rozlišení je více než dvojnásobné.</p>
</blockquote>










<h2 id="jak-nastavit">Jak nastavit velikost?</h2>

<pre><code>element {
  font-size: <b>???</b>;
}</code></pre>

<p>Pokud není nutné dodržovat na pixel přesné velikosti, které třeba navrhnul grafik, <b>není důvod velikost nastavovat</b>.</p>

<p>Výchozí styly prohlížečů mají velikosti písma důsledně vyřešené, takže je stačí případně jen korigovat.</p>

<p><b>Výchozí velikost běžného písma</b> je napříč prohlížeči <b>16 pixelů</b>. To bez změny velikosti odpovídá rozměru <code>1em</code>/<code>1rem</code>.</p>

<p>Pokud se tedy <code>font-size</code> nikde nenastaví, běžný text bude mít 16 pixelů.</p>


<h2 id="vychozi">Výchozí velikosti</h2>

<p><a href="https://kod.djpw.cz/phad">Živý test</a> – test výchozích velikostí písma se <b>změřením ve vašem prohlížeči</b></p>

<p>Z <a href="/html-znacky">HTML značek</a> existují tyto, které jsou běžné používané a nějak ovlivňují velikost písma.</p>

<ol>
  <li>
    <p><code>&lt;h1></code> – velikost 32 px</p>
  </li>
  <li>
    <p><code>&lt;h2></code> – velikost 24 px</p>
  </li>
  <li>
    <p><code>&lt;h3></code> – velikost 18,72 px</p>
  </li>
  <li>
    <p><code>&lt;h4></code> – výchozí velikost 16 px</p>
  </li>
  <li>
    <p><code>&lt;h5></code> – velikost 13,28 px</p>
  </li>
  <li>
    <p><code>&lt;h6></code> – velikost 10,72 px</p>
  </li>
  <li>
    <p><code>&lt;small></code> – velikost 13,3 px</p>
  </li>
  <li>
    <p><code>&lt;big></code> – velikost 19,2 px</p>
  </li>  
  <li>
    <p><code>&lt;pre></code>, <code>&lt;code></code> – velikost 13 px</p>
  </li>    
</ol>


<p>Na velikostech těchto jednotlivých elementů panuje shoda napříč prohlížeči – maximálně se liší o setiny pixelu.</p>













<h3 id="monospace"><span style="font-family: monospace, monospace">Monospace</span> font</h3>

<p>Zvláštní situace panuje u <span style="font-family: monospace, monospace">monospace</span> písma. Jedná se o font, kde všechny znaky mají stejnou šířku – používá se zejména pro výpis zdrojových kódů, ale je v některých prohlížečích i výchozím písmem v <a href="/texxtarea"><code>&lt;textarea></code></a>:</p>

<pre><code>.monospace {
  font-family: monospace;
  font-size: 1rem;
}</code></pre>





<p>Jak bude velké písmo v <code>&lt;span class="monospace"></code>? Mohlo by se nabízet, že 16 px (1 rem = 16 px).</p>


<p>Realita bude ale většinou 13 px, což je v prohlížečích výchozí velikost pro <code>font-family: monospace</code>.</p>

<p><a href="https://kod.djpw.cz/vhad">Ukázka</a> – výchozí velikost 13 px</p>


<p>Má to ale jednoduché řešení, uvést kromě <code>monospace</code> ještě něco dalšího, klidně další <code>monospace</code> a velikost by měla být 16 px:</p>

<p><a href="https://kod.djpw.cz/uhad">Živá ukázka</a></p>


<p>Případně rovnou nastavit nějaká hezčí písma dostupná v operačních systémech pro zdrojové kódy. Zde používám toto:</p>

<pre><code>font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;</code></pre>




<p>Proč se tak děje? Předpokládám, že je to dané historicky kvůli zpětné kompatibilitě.</p>


<h3 id="formulare">Velikost ve formulářích</h3>

<p>Ve <a href="/formulare">formulářových prvcích</a>, např. značkách <code>&lt;input></code>, <code>&lt;textarea></code>, <code>&lt;select></code> nebo <code>&lt;button></code> existují rozdíly v chování napříč prohlížeči:</p>

<ol>
  <li>V <b>Chrome</b>, <b>Edge</b>, <b>Opeře</b> i <b>IE 11</b> je <code>font-size</code> 13,33 pixelů.</li>
  <li>V <b>Safari</b> je <code>font-size</code> 11 pixelů.</li>
  <li>Ve <b>Firefoxu</b> má <code>&lt;input></code> a <code>&lt;button></code> velikost 11 px a <code>&lt;textarea></code> pro změnu 13 px (nejspíš kvůli monospace fontu).</li>
</ol>

<p>Odlišnosti jsou i ve fontu písma – v <b>Safari</b> je vše bezpatkové, v ostatních prohlížečích je patková <code>&lt;textarea></code>.</p>

<p>Funguje to tak ve <b>Windows</b>, <b>macOS</b> i <b>iOS</b>.</p>

<p>V <b>iOS</b> je navíc vlastnost, kdy se do políčka s menším textem než 16 pixelů zoomuje:</p>

<div class="internal-content">
  <ul>
    <li><a href="/ios-zoom-inputu">Automatické zoomování inputů na iOS</a></li>
  </ul>
</div>











<p>Formuláře jsou tak nejspíš místo, kde už je vhodné zasáhnout a pro jednotný vzhled netrpící zoomováním v <b>iOS</b> sjednotit velikosti na výchozích 16 px.</p>

<p>Dále je dobré nastavit/sjednotit <code>font-family</code>, protože:</p>

<ol>
  <li>
    <p>Výchozí písmo se řídí kombinací systému a prohlížeče.</p>
  </li>
  <li>
    <p>Font se u formulářových prvků nezdědí ze společného rodiče stránky (např. značka <code>&lt;body></code>)</p>
  </li>
  <li>
    <p>Výchozí <code>font-family: monospace</code> pro <code>&lt;textarea></code> způsobuje menší velikost písma.</p>
  </li>
</ol>

<p><b>Kompletní sjednocující kód</b> pro nastavení velikosti písma na webu může vypadat následovně – velikost a font se podědí po rodiči – v tomto případě dle výchozího stylu z prohlížeče pro značku <code>&lt;html></code>:</p>

<pre><code>input,
textarea,
select,
button {
  font-size: inherit;
  font-family: inherit;
}</code></pre>





<p><a href="https://kod.djpw.cz/xhad">Živá ukázka</a></p>

<p>Případně dává smysl nastavit specifický <code>font-family</code>, pokud má být u formulářových prvků jiný.</p>

<p>Jeden problém ale nastává v <b>Safari</b> v <b>macOS</b>, kde nejde u <code>&lt;select></code>u změnit velikost (v mobilním <b>iOS</b> to jde):</p>

<p><img src="/files/velikost-pisma/styl-selectu-v-safari.png" alt="Styl selectu v Safari" class="border"></p>
































<p>Řešení je vypnout <a href="/stylovani-selectu">stylování <code>&lt;select></code>u</a> přes <code>-webkit-appearance: none</code>, nicméně tím vzhled značně degraduje, tak je otázka, jestli se s tím nesmířit.</p>



<h2 id="zmena">Změna velikosti</h2>

<p>U složitějších webů a webových aplikací si ale člověk s výchozí velikostí písma nejspíš nevystačí.</p>

<p>Z různých důvodů dává smysl písmo z výchozích 16 px zvětšovat i zmenšovat.</p>

<ol>
  <li>
    <p><b>Zvětšení písma</b> se hodí zejména pro nadpisy, důležité odkazy v navigaci nebo pro delší souvislý text.</p>
    <p>Zejména u textových stránek s jednodušším layoutem, jako je třeba článek na blogu, se hodí používat větší písmo, protože se lépe čte.</p>
  </li>
  
  <li>
    <p><b>Zmenšení písma</b> je vhodné pro méně důležité věci na stránce – třeba pro <i>poznámky pod čarou</i>.</p>
    
    <p>Dále u webových aplikací a zejména u administrací s velkými tabulkami bývá často písmo zmenšováno, aby se na obrazovku vešlo hodně informací. </p>
  </li>
</ol>


<h2 id="jednotky">Jaké jednotky použít</h2>

<p>Velikost písma jde v CSS nastavovat hromadou způsobů a všechny trpí nějakými problémy:</p>


<h3 id="pixely">Pixely</h3>

<pre><code>p {font-size: 18 px}</code></pre>

<p>Na první pohled elegantní řešení, jak nastavit přesnou velikost.</p>

<p>Používat <code>px</code> jednotku bylo už před lety značně nepopulární, protože nešla v <b>Internet Exploreru</b> zvětšovat.</p>

<p>To už dnes to takový problém není, protože prohlížeče mají pro zvětšení i funkci zoom.</p>

<p>Problém ale nastává, pokud by uživatel chtěl místo zoomu jen zvětšit text v nastavení prohlížeče. Potom se pixely nezvětší.</p>

<p><img src="/files/velikost-pisma/velikost-pisma-chrome.png" alt="velikost-pisma-chrome" class="border"></p>









<p><a href="https://kod.djpw.cz/aiad">Živá ukázka</a> – při změně velikosti písma by měl první text zůstat stále 32 px velký</p>














<h3 id="procenta-em">Procenta a <code>em</code> jednotky</h3>

<p>Na rozdíl od pixelů jdou spolehlivě zvětšovat.</p>

<p>Pokud výchozí velikost písma neodpovídá představě, jde zvětšit/zmenšit písmo následovně:</p>

<pre><code>.vetsi {
  font-size: 120%;
  // nebo
  <i>font-size: 1.2em</i>;
}
.mensi {
  font-size: 80%;
  // nebo
  <i>font-size: 0.8em</i>;
}</code></pre>













<p>Zápisy v procentech a <code>em</code> jsou ekvivalentní.</p>

<p>Takové písmo bude o 20 % větší nebo menší než velikost nadřazeného elementu. Při výchozích 16 pixelech tak bude <code>.vetsi</code> odpovídat <code>21px</code> a <code>.mensi</code> zase <code>13px</code>.</p>

<p>Další relativní jednotky jako třeba <code>ex</code> a <code>ch</code> se chovají velmi podobně. </p>


<p>První nevýhoda je, že pokud existuje požadavek typu <i>nastavit písmo na 15 px</i>, je potřeba provést přepočet. A zjistit, že 15 px odpovídá číslu <code>0.9375em</code>.</p>


<p>To v dnešní době <b>díky CSS preprocesorům</b> není už takový problém. Lze snadno napsat funkci, která přepočet provede sama (příklad v SASSu):</p>

<pre><code>@function em($px) {
    @return $px / 16 * 1em;
}

.font-size-15 {
    font-size: em(15);
}</code></pre>








<p>V čistém CSS jde pro přepočet použít funkci <a href="/calc"><code>calc</code></a>:</p>

<pre><code>.font-size-15 {
    font-size: calc(15em / 16);
}</code></pre>





<p><a href="https://kod.djpw.cz/ciad">Živá ukázka</a></p>

<p>Další možnost v CSS bez preprocesoru je použít <a href="/var">nativní proměnné <code>var</code></a> a nadeklarovat si proměnné s potřebnými velikostmi pro pozdější pohodlné použití – <a href="https://kod.djpw.cz/diad">příklad</a>. (Nefunguje v <b>IE 11</b>.)</p>


<p>Protože dříve toto nebylo možné, používal <b>trik 62,5%</b>:</p>

<p>Pro <b>přehledné nastavování pixelových hodnot</b> procenty (nebo <code>em</code>) se používal postup, kdy se hodnota hlavního obalu nastaví na <code>x-small</code>, což odpovídá 10 pixelům nebo právě <code>62.5%</code> či <code>0.625em</code>, což je pořád totéž:</p>

<pre><code>html {
  font-size: x-small;
  // nebo
  font-size: 62.5%;
  // nebo
  font-size: 0.625em;
}</code></pre>





<p>Nyní pro nastavení textu o velikosti 15 pixelů stačí přehledné:</p>

<pre><code>.text {
  font-size: 150%;
  // nebo
  font-size: 1.5em;
}</code></pre>



<p><a href="https://kod.djpw.cz/fiad">Živá ukázka – 62,5 % trik</a></p>


<p>Problém je, že se hodnoty <b>počítají relativně vůči rodiči</b>, takže v elementu <code>.text</code> už bude nastavování pomocí procent opět vyžadovat kalkulačku.</p>

<p>Při zanořování stále stejného elementu s velikostí <code>150%</code> se stane následující:</p>

<div class="live">
<style>
  .zanoreni {font-size: 150%; line-height: 1}
</style>
<div class="zanoreni">
    Text
    <div class="zanoreni">
        Text
        <div class="zanoreni">
            Text
            <div class="zanoreni">
                Text
            </div>
        </div>    
    </div>
</div>  
</div>










<p>Jednotku <code>em</code> jde potom kromě pro velikosti písma používat i pro rozměry layoutu. Pokud se tato jednotka důsledně používá, je změna velikosti celého webu změnou jediné nadřazené hodnoty.</p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/okqb">Živá ukázka</a> – pohodlná změna velikosti <code>em</code> layoutu</li>
  </ul>
</div>



<p>Při úvaze nad <code>em</code> jednotkami pro <code>font-size</code> je třeba zvážit, jestli je ta relativní změna při zanořování žádoucí nebo ne.</p>



<h3 id="rem">Jednotky <code>rem</code></h3>

<p>V roce 2021 už je tato jednotka dobře podporovaná napříč prohlížeči. Kdysi dávno se moc nepoužívala kvůli nepodpoře v <b>IE 8</b>.</p>

<p>Ve všech prohlížečích se <b>zvětšuje</b>/zmenšuje, když si uživatel změní velikost písma.</p>

<p>Jedná se o variantu jednotky <code>em</code>, která se ale neodvozuje od hodnot všech rodičovských elementů, ale jen od výchozí velikosti písma elementu <code>&lt;html></code>.</p>

<p>Uvnitř značky <code>&lt;html></code> je proto spoleh, že <code>1rem</code> bude ve výchozím stylu prohlížečů na všech místech odpovídat <code>16px</code>.</p>

<p>Jednotka <code>rem</code> nemá tu vlastnost jako <code>em</code>, že by měnila velikosti v závislosti na zanořování.</p>

<p>Pokud se tedy velikost písma pro <code>html</code> nastaví na <code>62.5%</code>, <code>0.625em</code> nebo <code>x-small</code>, bude všude na stránce platit, že <code>1rem</code> = <code>10px</code>.</p>


<p>Případně jde opět použít CSS preprocesor a velikost z pixelů na <code>rem</code> přepočítat jednoduchou funkcí:</p>


<pre><code>@function rem($px) {
    @return $px / 16 * 1rem;
}

.font-size-15 {
    font-size: rem(15);
}</code></pre>


<p>Jednotky <code>rem</code> potom fungují skoro stejně pohodlně jako pixely – jen s tím, že jde na jednom místě (značka <code>&lt;html></code>) snadno zajistit <b>globální změnu velikosti</b> a písmo respektuje uživatelskou preferenci ohledně zvětšování/zmenšování písma v nastavení prohlížeče.</p>














<h3 id="ostatni">Ostatní jednotky a způsoby</h3>

<p>Existují ještě další způsoby, jak <code>font-size</code> natavit, nepřijdou mi ale v praxi potřebné.</p>


<p>Snad s výjimkou <a href="/pismo-podle-sirky#viewport">viewport jednotek</a>, které mohou velikost písma automaticky přizpůsobovat šířce okna.</p>





<h2 id="velikosti">Jaké zvolit velikosti</h2>

<p>Když už víme, jaké zvolit jednotky pro nastavení velikostí, zbývá rozhodnout, jaké velikosti nastavit.</p>

<p>Předně je potřeba si uvědomit, že různé fonty mohou být jinak velké. Takže v závislosti na použitém písmu se hodí případně velikost upravit.</p>

<p>U převážně <b>textové stránky</b> mi přijde <b>rozumná základní velikost výchozích 16 px</b>.</p>

<p>Delší text jako je článek může být klidně i trochu větší – třeba kolem 18 px až 20 px.</p>

<p>Méně podstatné věci potom třeba zmenšit na 14 px.</p>

<p>U <b>webových aplikací</b> a komplikovanějších stránek – třeba <b>e-shopů</b>, kde není prostoru nazbyt, se nabízí volit písmo a rozestupy menší.</p>

<p>Výchozí velikost může být třeba <b>13–15 px</b>.</p>







<h3 id="zmena-velikost">Uživatelská změna velikosti webu</h3>

<p>U webových aplikací je poměrně běžné, že jde někde v nastavení zvolit, jak se moc má/nemá plýtvat místem.</p>

<p>Na <a href="/twitter">Twitteru</a> je v nastavení přepínání velikosti textu:</p>

<p><img src="/files/velikost-pisma/velikost-pisma-twitter.png" alt="velikost-pisma-twitter" class="border"></p>









<p>Redesign <a href="/facebook">Facebooku</a> z roku 2020 přinesl <i>kompaktní režim</i>, který šetří prostorem. Mění velikost písma a odsazení.</p>

<p><img src="/files/velikost-pisma/fb-kompaktni-rezim.png" alt="FB kompaktní režim" class="border"></p>


















<p>Podobné nastavení má i webový Outlook:</p>

<p><img src="/files/velikost-pisma/outlook-hustota-zobrazeni.png" alt="Outlook hustota zobrazení" class="border"></p>

















<p>Často je to dobré řešení, protože lidé mají různé potřeby a zrakové schopnosti.</p>

<p>Změna velikosti je tak <b>pod kontrolou tvůrce webu</b>, který může nabídnout lepší zážitek než zoom (ten např. rozbíjí obrázky jejich zvětšováním nad skutečnou velikost) nebo změna velikosti písma v prohlížeči, o které každý neví.</p>

<p>Je to ale dost práce navíc a velikosti, odsazení a použité jednotky je potřeba s touto možností navrhovat.</p>





<h2 id="best-practice">Best practice</h2>

<p>Aktuální doporučení</p>

<ol>
  <li>
    <p>Nepoužívat jednotky <code>px</code> pro <code>font-size</code>, protože písmo v pixelech nemusí jít vždy zvětšovat.</p>
  </li>
  
  <li>
    <p>Použít <code>rem</code> jednotky, pokud je cílem mít na stránce přesně dané velikosti písma.</p>
    
    <p>Například web vychází z grafického návrhu nebo manuálu, kde jsou <b>přesné velikosti</b> v <code>px</code> pro jednotlivé prvky a je třeba to dodržet.</p>
  </li>
  
  <li>
    <p>Procenta nebo <code>em</code> se hodí hlavně v případech, kdy člověk sází velikosti písma <i>od oka</i>. Je mu jedno, kolik bude mít text pixelů, ale chce ho udělat trochu větší/menší.</p>
  </li>
  
  <li>
    <p>Pro formulářové prvky používat alespoň velikost odpovídající 16 pixelům, aby se do nich na <b>iPhonech</b> nemuselo zoomovat.</p>
  </li>
  
  <li>
    <p>Nezakazovat na mobilech zoomování. I když se může zdát velikost písma dostatečná, existují případy, kdy má uživatel třeba krátkodobě snížené schopnosti číst text (rozespalost, únava, nemoc, opilost, pohyb apod.), kdy se mu přiblížení hodí.</p>
  </li>
  
  <li>
    <p>Nastavit napříč webem <b>konsistentní velikosti</b> písma. Je nepraktické, když je nějaká část stránky nebo celá stránka tak malým písmem, že si návštěvník kvůli tomu písmo zvětší. Ale potom přijde na jinou stránku, když už to potřeba není, která bude zbytečně obrovská.</p>
  </li>
  
  <li>
    <p>Při <b>redesignu</b> a zvětšení písma do na dnešní poměry běžné velikosti si budou uživatelé stěžovat, že je písmo zbytečně obří a na stránku se nic nevejde.</p>
  </li>
</ol>



<h2 id="uzivatele-menit">Uživatelé mění velikost písma</h2>

<p>Mění si uživatelé velikost písma v prohlížeči? Můžete si to zkusit změřit na svém webu.</p>

<ul>
  <li><a href="https://kod.djpw.cz/laoc-">Příklad měření velikost</a> – zobrazí se aktuální velikost</li>
</ul>

<p>Podle některých měření to mohou být jednotky procent návštěvníků.</p>

<div class="external-content">
  <ul>
    <li><a href="https://medium.com/@vamptvo/pixels-vs-ems-users-do-change-font-size-5cfb20831773">Pixels vs. Ems: Users DO Change Font Size</a> – statistiky měření uživatelů, co si změnili velikost písma (3.08 %)</li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://medium.freecodecamp.org/8-point-grid-typography-on-the-web-be5dc97db6bc">8-Point Grid: Typography On The Web</a></li>
  
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/css/css-jednotky.html">Délkové jednotky v CSS</a></li>
  
  <li>Diskuse: <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=19&amp;topic=138070">Jednotka em není šířka písmena M</a></li>
  
  <li><a href="https://www.filamentgroup.com/lab/how-we-learned-to-leave-body-font-size-alone.html">How we learned to leave default font-size alone and embrace the em</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-size"><code>font-size</code></a></li>
  
  <li> CSS Wizardry: <a href="http://csswizardry.com/2011/05/font-sizing-with-rem-could-be-avoided/">Font sizing with rem could be avoided</a></li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/understanding-and-using-rem-units-in-css/">Understanding and Using rem Units in CSS</a></li>
  
  <li>Cloud Four Blog: <a href="http://blog.cloudfour.com/responsive-guide-to-type-sizing/">A Responsive Guide to Type Sizing</a></li>
  
  <li>CSS Tricks: <a href="https://css-tricks.com/rem-global-em-local/">Use `rem` for Global Sizing; Use `em` for Local Sizing</a></li>
  
  <li><a href="http://zellwk.com/blog/rem-vs-em/">REM vs EM – The Great Debate</a></li>
</ul>