---
title: "Stránkování"
headline: "Stránkování"
description: "Jak správně řešit stránkování na webové stránce."
date: "2014-09-30"
last_modification: "2016-02-25"
status: 1
tags: ["napady", "responsive", "seo"]
format: "html"
---

<p>V případě, že je na stránce hodně obsahu, obvykle se používá <b>stránkování</b>. Na jedné HTML stránce tak nejsou stovky položek, ale třeba jen 20 s tím, že na následující položky vedou <b>stránkovací odkazy</b>.</p>

<p>Typicky stránkování vypadá nějak následovně (ukázka pochází z výsledků hledání na <a href="/seznam">Seznamu</a>):</p>

<p><img src="/files/strankovani/strankovani-seznam.png" alt="Stránkování na Seznamu" class="border"></p>




<h2 id="pouzivat">Proč stránkovat</h2>

<p>Hlavním smyslem dělení obsahu na jednotlivé stránky je:</p>

<ol>
  <li><b>nezahltit návštěvníka</b> hromadou obsahu,</li>
  
  <li>udržet stránku v <b>rozumné datové velikosti</b></li>
</ol>

<p>Podle těchto bodů by se měl odvíjet <b>počet položek na stránku</b>.</p>




<h3 id="clanky">Články na více stránkách</h3>

<p>Některé weby dělí na více stránek dokonce i <b>články</b>. To je zpravidla pro návštěvníky obtěžující, zvlášť v případě, že načítání není bleskurychlé.</p>

<p>Cílem tohoto nešťastného počínání je typicky snaha provozovatele webu <b>získat více <i>impresí</i></b> reklam (počet zobrazení), které jsou na webu umístěny.</p>

<p>Reklamní bannery se někdy prodávají na základě stanoveného počtu zobrazení, které jde tímto kouskováním obsahu navýšit.</p>






<h2 id="nepouzivat">Proč nepoužívat stránkování</h2>

<blockquote>
  <p>Cílem by mělo být, aby návštěvníci stránkování nepotřebovali.</p>
</blockquote>


<p>Pro uživatele bývá zpravidla výhodnější, když není <b>zavalen stovkami položek</b>, ze kterých si má vybírat.</p>

<p>Ideální je tedy nabídnout <b>kvalitní filtrování obsahu</b>, čímž jde zúžit obsah, který se má zobrazit. Bývá lepší zobrazit pár hodně relevantních záznamů, než nutit uživatele, aby se přehraboval stovkami méně relevantními.</p>



<h2 id="cisla">Číselné stránkování</h2>

<p>Používat pro stránkování čísla je většinou ta nejpoužívanější, nejsnazší ale zároveň <b>nejhorší</b> možnost.</p>

<p>Proč?</p>

<p>Čísla symbolisující jednotlivé stránky zpravidla nenesou žádnou informaci.</p>


<p><img src="/files/strankovani/hodne-stranek.png" alt="Čísla stránek" class="border"></p>





<p>Uživatel nebude vědět, že se potřebuje dostat na stranu 508, 464 nebo 713.</p>



<h2 id="kalendar">Stránkování podle časového období</h2>

<p>U <b>chronologicky řazených</b> položek se nabízí použít <b>kalendář</b> – tj. vyfiltrovat záznamy z určitého časového období.</p>

<p>Mít tedy místo stránek „1“, „2“, „3“ a podobně stránky například „leden 2016“, „únor 2016“ a tak dál.</p>

<p>Problém <b>stránkování podle časového období</b> je ale zase v tom, že nezajišťuje <b>rovnoměrné rozdělení</b>.</p>

<p>Půjde-li o stránkování archivu blogu, kde jede měsíc přibude 100 článků a druhý měsíc článek jen jeden, bude ve stránkování značný nepoměr.</p>





<h2 id="ovladani">Ovládací prvky stránkování</h2>


<p>Klasické stránkování jde zpravidla rozdělit na následující části:</p>

<ol>
  <li>Odkazy pro <b>další a předchozí</b> stánku.</li>
  <li>Odkazy pro <b>první a poslední</b> stránku.</li>
  <li><b>Čísla</b> jednotlivých stránek.</li>
</ol>

<p>Protože většina stránkování je na internetu udělaná tak, že se obsah postupně přelévá mezi stránkami – tj. <b>nový obsah odsouvá ten starý na další stránky</b>, není moc použitelné volit stránky podle jednotlivých čísel.</p>

<blockquote>
  <p>Co bylo dnes na straně 8, může být za týden na straně 18.</p>
</blockquote>




<p>Pro ovládání stránkování jsou tak nejdůležitější <b>odkazy <i>Předchozí</i> a <i>Další</i></b>.</p>

<p>Z toho plyne, že tyto odkazy by měly být dostatečně velké; <b>větší než čísla stránek</b>. Mít stránkování representované pouze pomocí šipek <kbd>&laquo;</kbd> a <kbd>&raquo;</kbd>, <kbd>←</kbd> a <kbd>→</kbd> nebo <kbd>&lt;</kbd> a <kbd>&gt;</kbd>, tak nemusí být úplně šťastné řešení.</p>

<p>Nabízí se tedy připsat slova <i>Zpět</i>/<i>Vpřed</i> a podobně.</p>

<p>U stránkování se také občas hodí možnost pro <b>návrat na první stranu</b>. V případě, že by si návštěvník chtěl procházet obsah <i>odzadu</i>, ocení naopak ještě tlačítko na <b>poslední stranu</b>.</p>

<p>Odkazy na začátek/konec se zpravidla realisují prostřednictvím čísel stránek, kdy odkazy na stranu <kbd>1</kbd> a na stranu poslední jsou neustále vypsány.</p>

<p>V praxi to může vypadat nějak takto:</p>

<p><img src="/files/strankovani/strankovani.png" alt="Chytré stránkování" class="border"></p>










<h3 id="posice">Držení posice</h3>

<p>Při vytváření ovládacích tlačítek pro <i>Předchozí</i> a <i>Další</i> stránku je dobré myslet na to, aby tyto odkazy stále <b>držely svou posici</b>.</p>

<p>Jak je vidět na následující animaci, zobrazení původně neviditelného tlačítka <i>Prev</i> způsobí posunutí tlačítka <i>Next</i>.</p>

<p><img src="/files/strankovani/skakani.gif" alt="Poskakující ovládání stránkování" class="border"></p>

<p>Nejjednodušší řešení je vypisovat odkaz pro předchozí stranu i na první straně. A buď  ho skrýt pomocí CSS, aby stále zabíralo prostor (<code>visibility: hidden</code>), nebo mu změnit styl, aby vypadalo jako neaktivní – třeba pomocí <a href="/opacity">průhlednosti</a>.</p>

<div class="live">
  <span href="#" style="opacity: .5">&laquo; Předchozí</span>
  <a href="#">1</a>
  <a href="#">2</a>
  <a href="#">3</a>
  <a href="#">&raquo; Další</a>
</div>


<h2 id="responsivni">Responsivní stránkování</h2>

<p>V době používání webů ze zařízení s různě velkou obrazovkou je nutné, aby se stránkování dokázalo <b>přizpůsobovat různému prostoru</b>, který pro něj bude dostupný.</p>

<p>Pro klasické stránkování s odkazy „Předchozí“/„Další“ i čísly stránek je asi nejlepší použít CSS <a href="/display#tabulkove">tabulkové hodnoty</a> vlastnosti <a href="/display#tabulkove"><code>display</code></a> a některé položky v <a href="/media"><code>@media</code> pravidlu</a> skrýt:</p>

<p><a href="http://kod.djpw.cz/mbpb">Živá ukázka</a></p>


<p>Kvůli nedostatku místa se obvykle klasická podoba stránkování musí redukovat. To ve finále znamená ponechat třeba jen tlačítka předchozí a další.</p>


<p>Případně zobrazit pouze tlačítko typu „Zobrazit dalších 20 záznamů“.</p>




<h2 id="nekonecne">Nekonečné načítání dalších položek</h2>

<p>Pro zjednodušení zobrazení dalších položek, když už návštěvník všechny projel, bývá k vidění technika, která <b>donekonečna donačítává další obsah</b> s ohledem na to, jak návštěvník roluje stránkou.</p>

<p>Výhoda je zřejmá – prosté odrolování bývá pro uživatele snazší než kliknutí na odkaz <i>Další</i>, takže uživatel typicky uvidí více obsahu.</p>

<p>Tato technika má ale i své nevýhody.</p>

<ol>
  <li>
    <p>Není možné mít na stránce s nekonečným rolováním <b>patičku</b> pod obsahem. Ta by logicky nebyla rozumně dosažitelná.</p>
  </li>
  
  <li>
    <p>Pokud se do stránky stále přidává nový obsah a žádný předchozí se nemaže, může být po načtení hromady položek stránka <b>výkonově náročná</b>.</p>
  </li>
  
  <li>
    <p>Často je problém po opuštění stránky s načteným množstvím položek, použít funkci <i>Zpět</i>. Většina realisací nekonečného rolování potom není schopna zobrazit obsah, který člověk předtím viděl.</p>
    
    <p>Uživatelé mají na základě této zkušenosti <b>nižší ochotu klikat</b> na položky přidané <i>nekonečným rolováním</i>.</p>
  </li>
</ol>


<h2 id="seo">Stránkování a SEO</h2>

<p>Špatně udělané stránkování je z <b>pohledu vyhledávačů problematické</b>. Bohužel špatně udělané stránkování má drtivá většina webových stránek – včetně těch používajících třeba populární redakční systém <a href="/wordpress">WordPress</a>.</p>

<p>Špatně udělané stránkování se projevuje tím, že se na jednotlivých URL <b>mění obsah</b>.</p>




<h3 id="priklad">Příklad</h3>

<p>První strana je na adrese:</p>

<pre><code>example.com</code></pre>



<p>Po kliknutí na <i>Další</i> se přejde na URL typu:</p>

<pre><code>example.com/<b>page/2/</b></code></pre>


<p>Problém ze <a href="/seo">SEO</a> pohledu je v tom, že po přidání nové položky na první stranu, se ty starší odsunou dále, což je <b>přemístí na jiné URL</b>. Poslední položka první strany se dostane na první místo stránky druhé a podobně.</p>


<blockquote cite="http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-cast-2/">
  <p>Na často se měnící stránkování nemá cenu uživatele posílat, protože tam stejně už pravděpodobně nenajde to, co tam bylo.</p>
  
  <p class="autor">Dušan Janovský, <a href="http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-cast-2/">O fulltextovém vyhledávání na Seznam.cz</a></p>
</blockquote>

<p>Pro vyhledávač je tedy složité zajistit, aby se mezi <b>zaindexováním</b> a zobrazením ve <b>výsledcích hledání</b> nezměnil obsah. Hrozí, že návštěvník klikne na výsledek vedoucí na stranu 3, ale vlivem přidání nového obsahu už na ní hledaný obsah nebude. To vypadá jako chyba vyhledávače, což není v jeho zájmu, takže takové <b>stránky nemá příliš rád</b>.</p>



<p>Dobře udělané stránkování by tedy mělo zobrazovat nejstarší obsah na URL s „<code>page=1</code>“ a nové položky přidávat na nové adresy.</p>

<h3 id="od-konce">Stránkování od konce</h3>

<p>Pro vyhledávač správně udělané stránkování by mělo zajistit, že na jednotlivých stránkách bude stále stejný obsah. Tedy jednotlivé položky se nebudou přelévat napříč různými URL.</p>

<p>Postup, kterým stránkování s pokud možno zachováním stejného obsahu na URL může fungovat, popsal v komentářích <b>Yuhů</b>:</p>

<blockquote>
  <p>Kdysi jsme to na Novinkách dělali tak, že archivní stránky měly deset položek, titulka taky deset a nejmladší archivní 7 až 16 položek. Ve chvíli, kdy se na nejmladší archivní chtěla přidat sedmnáctá položka, se vytvořila nová archivní se sedmi položkami, přičemž šest se přeneslo z té předchozí, kde se v tu chvíli smazaly. Podle mě nejlepší ze špatných řešení.</p>
</blockquote>




<h3 id="zakaz">Zákaz indexování</h3>

<p>V ohlasech na tento článek zazněly názory, že je zbytečné, aby stránkovaný obsah vyhledávač indexoval.</p>

<blockquote cite="https://twitter.com/jantichy/status/703160014060392448">
  <p>Odpověď je <code>robots=noindex,follow</code> na všechny další stránky ve stránkování kromě první.</p>
  <p class="autor">— Jan Tichý na <a href="https://twitter.com/jantichy/status/703160014060392448">Twitteru</a></p>
</blockquote>


<p>V případě špatně udělaného stránkování a hodně četného přidávání obsahu, kdy je ve finále obsah jednotlivých stránek stejně nestálý, jde celkem universálně souhlasit.</p>


<p>Při dobře udělaném stránkování (se stálým obsahem) mohou ale vzniknout potenciálně <b>zajímavé stránky</b>, kam má smysl, aby návštěvníci z vyhledávání chodili.</p>

<p>Příkladem mohou být komentáře rozdělené do více stránek. Stejně tak x-tá stránka výpisu seznamu článků/produktů může nabízet kombinaci obsahu zajímavější než detail konkrétního článku/produktu a přivést tak na web návštěvníky z vyhledávání.</p>

<p>Risikem ale nejspíš může být <b>duplicita</b> v situaci, kdy se například hodnotný popis kategorie bude vyskytovat na všech stránkách.</p>





<h3 id="prev-next">Atribut <code>rel="prev/next"</code></h3>

<p>Strojově čitelně jde odkazy na předchozí/další stranu označit <a href="/odkaz#rel">atributem <code>rel</code></a> pro odkaz <code>&lt;a></code>.</p>

<p>Stejně tak jde předchozí a další stránku uvést <code>&lt;link></code> značkou v <a href="/html-kostra#head">hlavičce</a>. Někteří návštěvníci mohou mít prohlížeč (či rozšíření), které tyto značky umí využít a usnadnit tak navigaci.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS Tricks: <a href="http://css-tricks.com/thoughts-pagination/">Thoughts on Pagination</a></li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/pagination-seo-red-flags-best-practices/">Pagination and SEO: Red Flags and Best Practices</a></li>  
</ul>