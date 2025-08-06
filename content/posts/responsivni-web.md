---
title: "Responsivní design webu"
headline: "Responsivní design webu"
description: "Jak jednoduše a kvalitně vytvořit web, který se přizpůsobí všem velikostem cílových zařízení."
date: "2014-03-17"
last_modification: "2014-10-21"
status: 1
tags: ["hotova-reseni", "responsive"]
format: "html"
---

<p>O různých možnostech, jak vytvořit stránku pro <b>mobilní zařízení</b> pojednává samostatný článek <a href="/mobilni-web">Jak na mobilní web</a>. Tento text se věnuje tomu, jak s co nejmenší námahou vytvořit <b>rozložení stránky</b> (layout), který se bude vhodně přizpůsobovat různým velikostem <i>viewportu</i> (velikosti okna prohlížeče, kde se zobrazuje samotný obsah stránky, tj. bez záhlaví okna, stavového řádku a jiných lišt).</p>


<h2 id="html">HTML je responsivní</h2>

<p>První je dobré si uvědomit, že prosté HTML je v podstatě <b>responsivní samo o sobě</b>. Jde si to velmi jednoduše ověřit <b>vypnutím CSS</b> nebo zobrazením si hodně staré stránky z doby, kde se ještě CSS nepoužívalo.</p>

<p>Prakticky jediné, co je pro nová <b>zařízení s menším displejem</b> nutné udělat, je přidat jednu <a href="/meta-viewport">&lt;meta> značku</a> do hlavičky stránky (<code>&lt;head></code>).</p>

<pre><code>&lt;meta name="viewport" content="width=device-width,initial-scale=1"></code></pre>

<p>Tato značka zajistí, že prohlížeč zobrazí stránku v měřítku 1:1. Mobilní prohlížeče obvykle stránku bez tohoto <code>&lt;meta></code> tagu zobrazí v jiném měřítku a přidají <b>posuvník</b>.</p>

<p>Zobrazení prostého HTML na mobilním zařízení s vhodnou podobou <code>&lt;meta name="viewport"></code> (<a href="https://kod.djpw.cz/olgb-">ukázka</a>):</p>

<p><img src="/files/responsivni-web/s-meta.png" alt="Zobrazení s meta značkou viewport" class="border"></p>





































<p>Prostý text formátovaný základními HTML značkami, jako jsou <b>nadpisy</b>, <b>odstavce</b> nebo <b>seznamy</b>, se bude krásně přizpůsobovat prostoru viewportu.</p>


<p>A téže stránka bez této <code>&lt;meta></code> značky (<a href="https://kod.djpw.cz/nlgb-">ukázka</a>).</p>

<p><img src="/files/responsivni-web/bez-meta.png" alt="Zobrazení bez meta značkou viewport" class="border"></p>



























<p>Po přidání jedné značky si tedy můžeme <i>responsivitu</i> webu dalšími úpravami už jen <i>pokazit</i>.</p>




<h2 id="vyjimky">HTML výjimky</h2>

<p>Existují určité případy, kdy se obsah HTML značky na stránku nevejde. To jsou například:</p>

<ul>
  <li><b>obrázky</b> (značka <code>&lt;img></code>),</li>
  <li><b>videa</b>, <b>mapy</b> a podobné objekty (většinou vloženy značkou <a href="/ramy#iframe"><code>&lt;iframe></code></a>, <a href="/canvas"><code>&lt;canvas></code></a>, <a href="/svg"><code>&lt;svg></code></a>)</li>
  <li><b>tabulky</b> (<code>&lt;table></code>),</li>
  <li><b>zdrojové kódy</b> (<a href="/vypis-kodu#pre"><code>&lt;pre></code></a>),</li>
  
</ul>

<p>Musíme proto zajistit, aby nám svou větší šířkou <b>nerozhodily layout</b>.</p>


<h3 id="obrazky">Obrázky</h3>

<p>Nejjednodušší způsob, jak omezit rozměry obrázku, je pomocí <code>max-width: 100%</code>. Automatická <b>výška</b> (<code>height: auto</code>) potom zajistí, že se výška dopočítá na základě šířky, takže nedojde ke změně poměru výšky a šířky, což by vedlo k <b>deformaci</b> (<a href="https://kod.djpw.cz/rlgb">ukázka</a>).</p>

<pre><code>img {
  max-width: 100%;
  height: auto;
  box-sizing: border-box
}</code></pre>

<p>Chceme-li přímo obrázku přidat rámeček (<code>border</code>) nebo odsazení (<code>padding</code>), je dobré použí <a href="/box-sizing#border-box">okrajový box-model</a> (<code>box-sizing: <b>border-box</b></code>), aby se tyto hodnoty k šířce <b>nepřičítaly</b>.</p>


<p>Řešení to není úplně ideální, protože zmenšení rozměrů nezmenší <b>datovou velikost</b>.</p>

<p class="rel">Jak zajisit zmenšení rozměru obrázku a snížení jejich <b>datové velikosti</b> je popsáno v samostatném článku <a href="/responsivni-obrazky">Responsivní obrázky</a>.</p>


<h3 id="objekty">Videa a objekty</h3>
<p>Stejný postup jako u obrázků zajistí <b>přizpůsobení se šířce</b> i pro značky <code>&lt;iframe></code>, <code>&lt;video></code>, <code>&lt;svg></code> nebo <code>&lt;canvas></code>.</p>

<p>Do CSS pravidel <b>minimální responsivní stránky</b> si proto přidáme:</p>

<pre><code>iframe, canvas, video, svg {
  max-width: 100%;
  box-sizing: border-box;
  height: auto;
}</code></pre>


<p>Jediný problém je správný <b>poměr stran</b>. U obrázku se poměr zachová, což třeba u <code>&lt;iframe></code> neplatí. Často to vadit nemusí, ale někdy to vytváří nehezké situace.</p>

<p>Nejspolehlivější řešení by bylo výšku dopočítávat JavaScriptem, ale i v CSS jde využít triku dopočítávání <a href="/vyska-podle-sirky">výšky podle šířky</a>. A připravit si tak několik obecných poměrů stran, které potom aplikujeme použitím příslušné CSS třídy.</p>

<pre><code>.pomer-stran {
  position: relative;
  height: 0;
  /* poměr stran 16:9 */
  padding-top: 56.25%;
}
.pomer-stran > * {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%; height: 100%;
}</code></pre>

<p>HTML kód potom bude vypadat takto (dalším obalem můžeme nastavit maximální šířku):</p>

<pre><code>&lt;div style="max-width: 560px">
  &lt;div class="pomer-stran">
    &lt;iframe width="560" height="315" src="">&lt;/iframe>
  &lt;/div>
&lt;/div></code></pre>

<p><a href="https://kod.djpw.cz/wrgb">Ukázka</a>.</p>

































<h3 id="tabulky">Tabulky</h3>

<p>Prosté <i>řešení</i> je tabulku obalit elementem s <code>overflow-y: auto</code>.</p>

<pre><code>.obal-tabulky {
  overflow-y: auto;
}</code></pre>

<p>Široká tabulka potom bude mít <b>vodorovný posuvník</b>, takže nerozhodí šířku celé stránky. <a href="https://kod.djpw.cz/orgb">Ukázka</a>.</p>

<p>Pokročilejší postup je potom <a href="/responsivni-tabulky#rozlamani">tabulku <i>rozlámat</i></a>.</p>

<p>A úplně nejlepší je dopředu myslet na to, že <b>velké tabulky</b> jsou na menších rozlišeních problematické, takže je pokud možné vytvářet jen s <b>menším počtem sloupců</b> / menší šířkou.</p>






<h3 id="zdrojove-kody">Zdrojové kódy</h3>

<p>Zdrojový kód v <code>&lt;pre>&lt;code>&lt;/pre>&lt;/code></code> jde rovněž obalit něčím s <code>overflow: auto</code> jako tabulku. Existují ale, myslím, lepší řešení.</p>

<ul>
  <li>
    <p>Nastavit <code>overflow: auto</code> přímo pro <code>&lt;pre></code>:</p>
    
    <pre><code>pre {
  overflow: auto;
}</code></pre>
  </li>
  
  <li>
    <p>Povolit <b>zalamování</b> včetně rozlamování slov (při zkopírování bude kód v původním stavu):</p>
    
    <pre><code>pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}</code></pre>
  </li>
</ul>

<p><a href="https://kod.djpw.cz/vrgb">Ukázka obou postupů</a> (funkční od <b>IE 8</b>)</p>

<p><a href="https://github.com/Jahoda/responsivni-web">Celý příklad responsivního webu na GitHubu</a></p>



<h2 id="typografie">Typografie</h2>


<h3 id="delka-radku">Délka řádků</h3>

<p>Už máme docela hezky responsivní stránky, bohužel pro uživatele s velkým <i>viewportem</i> <b>nebude čtení asi úplně příjemné</b>. Na velkém monitoru a maximalisovaném okně prohlížeče můze vzniknou na jednom řádku cca <b>300 znaků</b>.</p>

<p>To je poměrně dost a u delšího textu může být náročné po dočtení řádku správně trefit ten další. Proto oblast s textem omezíme <b>maximální šířkou</b> (<code>max-width</code>).</p>

<p>Je samozřejmě nemožné stanovit nějakou <b>přesnou hranici</b>, kdy je řádek už <b>moc dlouhý</b> (zvlášť s ohledem na to, že schopnosti a podmínky návětšvníků webu jsou individuální).</p>

<p>Osobně vidím maximální hranici někde kolem <b>80 znaků</b>, což může odpovídat cca šířce <code>35em</code> (záleží na velikosti písma a použitém <b>fontu</b>). Jelikož text se píše do <b>odstavců</b>, přidáme něco jako:</p>

<pre><code>p {
  max-width: 35em;
}</code></pre>










<h3 id="velikost">Velikost písma</h3>

<p>Zadávat obecnou velikost <b>není nutné</b>, použije se ta, co má jako výchozí prohlížeč nebo uživatel. Případné zvětšování/zmenšování písma potom stačí provádět relativně, tj. například procenty, aby jednotlivé části stránky respektovaly nastavení prohlížeč/uživatele.</p>


<p>Výchozí velikost bývá často 16 pixelů. Ukázka z <b>Firefoxu</b>:</p>

<p><img src="/files/responsivni-web/vychozi-pismo-firefox.png" alt="Výchozí velikost písma ve Firefoxu" class="border"></p>

<p>A <b>Google Chrome</b>:</p>

<p><img src="/files/responsivni-web/vychozi-pismo-chrome.png" alt="Výchozí velikost písma v Google Chrome" class="border"></p>

<p>Přidáme-li do kódu následující předpis:</p>

<pre><code>h1 {
  font-size: 300%;
}</code></pre>

<p>Nadpis <code>&lt;h1></code> bude mít trojnásobek (300 %) základní velikosti, tedy <i>nejspíš</i> 3 × 16 pixelů = 48 px. <a href="https://kod.djpw.cz/qrgb">Ukázka</a>.</p>

<p>Určovat velikost je dobré primárně pro <b>hlavní obsah stránky</b> a začít při nastavování písma právě tím. V případě, že je výchozí velikost pro použitý font příliš <b>velká nebo malá</b>, lehce ji upravíme pro <code>&lt;html></code> nebo <code>&lt;body></code>.</p>

<pre><code>html {
  font-size: 90%;
}</code></pre>

<p>Potom přejdeme k nastavování dalších částí obsahu (nadpisy a podobně). Velikost písma se <b>dědí</b>, takže předchozí <b>nadpis s 300% velikostí</b> bude mít při globálním zmenšení písma pro <code>&lt;html></code> ve finále velikost jen 90 % z té předchozí (48 pixelů), tedy přibližně 43 px (48 * 0.9). <a href="https://kod.djpw.cz/srgb">Ukázka</a>.</p>

















<h2 id="sloupce">Sloupcový layout</h2>

<p>Fajn, web už je nyní krásně <b>responsivní</b> a dobře čitelný. Pokud je ale na stránce více obsahu, na velkých zobrazovacích zařízeních bude jen <i>úzká dlouhá nudle</i> a vedle ní hromada volného místa. Nabízí se proto obsah <b>rozdělit do sloupců</b>.</p>

<p>Pravidlo číslo jedna pro tvorbu <b>vícesloupcového responsivního layoutu</b> je nezadávat šířku v pixelech, ale ideálně v procentech.</p>

<p>Sloupce se vedle sebe potom dostanou <a href="/float">obtékáním</a>. Řekněme, že hlavní obsah bude mít 80 % šířky a postranní menu 20 %.</p>

<pre><code>.obsah {
  width: 80%;
  float: left;
}
.menu {
  width: 20%;
  float: left;
}
</code></pre>

<p>Obtékání ukončí například <code>obal</code> pomocí <a href="/float#overflow"><code>overflow: hidden</code></a>:</p>

<pre><code>.obal {
  overflow: hidden;
}</code></pre>

<p>Pro případné přidávání rámečku nebo <code>padding</code>u se hodí pro oba sloupce použít okrajový box-model (<b>IE 8+</b>) – nebude se o ně navyšovat šířka.</p>

<pre><code>.obsah, .menu {
  box-sizing: border-box;
}</code></pre>


<p><a href="https://kod.djpw.cz/vlgb">Výsledek</a></p>



















<h3 id="media">Media queries</h3>

<p>Nyní konečně do hry přichází <a href="/media">CSS pravidlo <code>@media</code></a>. <b>Zmenšováním okna prohlížeče</b> hledáme místo, kde už jsou dva sloupce moc a bylo by lepší je oba zobrazit <b>pod sebou</b> (analogicky to platí i pro <a href="/responsivni-mrizka">vyšší počet sloupců</a>).</p>

<p>Jak vhodnou <b>šířku změřit</b>? Po zapnutí <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> v <b>Chrome</b> se při změně velikosti okna zobrazuje aktuální rozměr vpravo nahoře (je ale větší o <b>šířku posuvníku</b>).</p>

<p>Jinak je často šíři možné zjistit ze značky <code>&lt;html></code> po jejím prozkoumání.</p>

<p><img src="/files/responsivni-web/rozmer-chrome.png" alt="Rozměr stránky" class="border"></p>

<p>Nyní vytvoříme tzv. <i>break-point</i>, tedy místo, kde se aplikují odlišná pravidla (zruší se dvojsloupcovost layoutu, což jde třeba nastavením šířky na 100 % – dva elementy se 100% šířkou se vedle sebe nevejdou).</p>

<pre><code>@media (max-width: 700px) {
  .obsah, .menu {
    width: 100%;
  }
}</code></pre>

<p><a href="https://kod.djpw.cz/wlgb">Ukázka</a> (projeví se při změně velikosti okna kolem 700 px)</p>

<p>Jak je vidět, při zmenšení okna pod cca 700 px se menu přesune nad obsah. Pokud by bylo moc dlouhé, nabízí se ho <a href="/responsivni-menu">schovat do tlačítka</a>.</p>

<p>Výše uvedené <code>@media</code> pravidlo se aplikuje vždy, když bude <b>šířka pod 700 px</b>. Chtěli-li bychom naopak něco aplikovat jen při šířce vyšší, použila by se vlastnost <code><b>min</b>-width</code>.</p>

<pre><code>@media (<b>min</b>-width: 700px) {
  /* Pravidla se aplikují při šířce 700 px a větší */
}</code></pre>

<p>U používání pravidla <code>@media</code> a zvlášť <code>min-width</code> si je dobré uvědomit, že takto obalený kód nebude aplikován v <b>IE 8</b> (nezná <i>media queries</i>). Jde-li proto o podporu <b>IE 8</b>, neměl by kód pro větší rozlišení (kde se typicky <b>IE 8</b> používá) být obalen do <code>@media</code>.</p>




















<h4 id="px">Rozměry <i>media queries</i> v pixelech</h4>
<p>Někoho může zaskočit, že jsou v <code>@media</code> pravidlu <b>použity pixely</b>, to samozřejmě není ideální a bylo by vhodné je přepočítat na <b>relativní jednotky</b>. Proč? Při odlišné velikosti písma nebudou absolutní hodnoty break-pointů v px sedět pro větší písmo.</p>

<p><img src="/files/responsivni-web/zvetseni-px.png" alt="Špatné break-pointy při rozměrech v pixelech" class="border"></p>



















<p>Obrázek ilustruje, jak při <b>zvětšení písma</b> ze strany uživatele u předchozí <a href="https://kod.djpw.cz/wlgb">ukázky</a> bude <i>break-point</i> v pixelech totálně mimo. Šířka menu je při větším písmu nedostatečná a přeskládání pod sebe by mělo <b>nastat dříve</b>. V tomto případě to není tak strašné, ale často to může významně rozhodit layout nebo způsobit <b>nečitelnost</b> některých částí stránky, když je překryje něco, co nemá.</p>

<p>Takto třeba vypadá hlavní stránka Seznamu při hraniční šířce a <b>zvětšeném písmu</b>:</p>

<p><img src="/files/responsivni-web/seznam-zvetseni-pisma.png" alt="Špatné break-pointy v pixelech na Seznamu" class="border"></p>















<p>Chceme-li nastavit hodnotu <i>hraničních bodů</i> v např. <code>em</code> místo v <code>px</code>, potřebujeme zjistit kolik pixelů má jeden <code>em</code>. To jde buď prozkoumáním základní velikosti písma v <b>nastavení prohlížeče</b>, nebo třeba tak, že na <b>čisté</b> stránce pro <code>&lt;body></code> nastavíme <code>font-size: 1em</code> a něco do něj napíšeme. A ve <i>vypočítaných stylech</i> <code>&lt;body></code> se potom ukáže <b>velikost písma v pixelech</b> (v tomto případě <b>16 px</b>).</p>

<p><img src="/files/responsivni-web/rozmer-em.png" alt="Vypočítaná hodnota v pixelech" class="border"></p>










<p>Teď jen stačí provést jednoduchý výpočet <code>700 / 16</code> a vyjde odpovídající hodnota v <code>em</code>.</p>

<h4 id="kalkulacka">Kalkulačka pixelů na em</h4>

<div class="live">
  <script>
    function prepocitat(formular) {
      var vysledek = (formular.sirka.value / formular.velikost.value);
      vysledek = Math.round(vysledek * 10) / 10;
      var pravidlo = "@media (max-width: " + vysledek + "em) {\n" +
        "  /* pravidla pro šířku do cca " + formular.sirka.value + " px */\n" +
  "}";
      document.getElementById('vysledek').innerHTML = vysledek;
      document.getElementById('pravidlo').innerHTML = pravidlo;
    }
  </script>
  <form oninput="prepocitat(this)">
    <p><label>Šířka v pixelech: <input type="number" value="700" name="sirka">px</label></p>
    <p><label>Velikost 1 em: <input type="number" value="16" name="velikost">px</label></p>
    <p>Výsledná hodnota: <code id="vysledek">43</code><code>em</code> (zaokrouhleno na desetiny)</p>
    <pre><code id="pravidlo">@media (max-width: 43.7em) {
  /* pravidla pro šířku do cca 700 px */
}</code></pre>
  </form>
</div>

<p><a href="https://kod.djpw.cz/zlgb">Ukázka</a> předchozího dvou-sloupcového layoutu s převedenými <i>break-pointy</i> do <code>em</code> rozměrů.</p>

<p>Při srovnatelné šířce, bude už dávno menu a obsah pod sebou.</p>


<p><img src="/files/responsivni-web/zvetseni-em.png" alt="Špatné break-pointy při rozměrech v pixelech" class="border"></p>








<h3 id="omezeni-sirky">Omezení šířky layoutu</h3>

<p>Kvůli maximálnímu počtu znaků na řádek byla nastavena <code>max-width</code> pro odstavec (<code>&lt;p></code>). Když se ale podíváme na <a href="https://kod.djpw.cz/zlgb-">poslední podobu</a> příkladu responsivního layoutu na <b>větším monitoru</b>, vidíme pořád spoustu nevyužitého prostoru.</p>

<p>Možná by bylo hezčí <b>omezit šířku</b> celého layoutu a třeba to ještě celé <a href="/centrovani#margin-auto">horisontálně vycentrovat</a>.</p>

<pre><code>.obal {
  max-width: 65em; /* maximální šířka */
  margin: auto; /* vodorovné vycentrování */
}</code></pre>

<p><a href="https://kod.djpw.cz/cmgb-">Ukázka</a></p>







<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS-tricks.com: <a href="http://css-tricks.com/bookmarklet-colorize-text-45-75-characters-line-length-testing/">Testování počtu znaků mez 45–75 znaky</a></li>
  
  <li>SmashingMagazine: <a href="http://www.smashingmagazine.com/2014/09/29/balancing-line-length-font-size-responsive-web-design/">Úprava velikosti písma a výšky řádků</a></li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/5-uses-vertical-media-queries/">Kdy používat vertikální media-queries</a></li>
  
  <li>Fluidity: <a href="http://fluidity.sexy/">Důkaz, že je HTML responsivní samo o sobě</a></li>
  
  <li>Tuts+ Web Design: <a href="http://webdesign.tutsplus.com/articles/a-readability-first-approach-to-media-queries-and-layout--cms-19419">A “Readability First” Approach to Media Queries and Layout</a></li>
</ul>

