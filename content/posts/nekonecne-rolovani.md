---
title: "Nekonečné rolování"
headline: "Nekonečné scrollování"
description: "Je lepší nekonečné rolování, klasické stránkování nebo tlačítko „Zobrazit další“?"
date: "2014-11-05"
last_modification: "2016-03-17"
status: 1
tags: ["napady", "responsive", "scroll"]
format: "html"
---

<p>Nekonečné rolování (v angličtině <i lang="en">infinite scroll</i> či <i lang="en">endless scroll</i>) je postup zobrazování obsahu webu, kdy se <b>další obsah sám zobrazuje</b> v závislosti na místě, kam návštěvník <b>odroloval</b>.</p>

<p>Pro získání dalšího obsahu tak návštěvník nemusí nikam jezdi myší a klikat, ale <b>stačí jen točit kolečkem</b>, popř. posouvat prstem (na dotykových zařízeních).</p>


<p>Nekonečné rolování tedy snižuje bariéru pro konsumaci dalšího obsahu. To může vést k delší době strávené na stránce a zobrazení více obsahu.</p>

<p>Technicky se další obsah stahuje <a href="/ajax">AJAXem</a> v závislosti na odrolovaném obsahu.</p>



<h2 id="strankovani">Stránkování</h2>

<p>Z jednoho úhlu pohledu je <i lang="en">infinite scroll</i> v podstatě zvláštní typ klasického <a href="/strankovani"><b>stránkování obsahu</b></a>, kdy se objeví třeba jen 10 položek a k dalším se je nutné proklikat přes odkazy na další stránky.</p>

<p>Po dočtení první strany se zobrazí stránkování a návštěvník:</p>

<ol>
  <li>neví, co bude na další straně,</li>
  
  <li>bude muset kliknout na číslo strany / odkaz <i>Další</i>,</li>
  
  <li>načtení další stránky bude trvat nějakou dobu.</li>
</ol>



<p>To může <b>snižovat motivaci</b> na další stranu kliknout.</p>

<p>V případě <b>nekonečné stránky</b> stačí jen rolovat, což je asi nejsnazší ovládací úkon, který návštěvník na webu může dělat.</p>



<h2 id="lazy-loading">Lazy loading</h2>

<p>Z jiného pohledu je nekonečné scrollování v podstatě <a href="/lazy-loading">lazy loading</a> obsahu.</p>

<p>Ze stránky se načte jen kousek, aby to netrvalo tak dlouho, a další obsah je potom <b>stahován průběžně</b>.</p>

<p>Při stahování dalších položek je dobré uměle natáhnout stránku (nebo zobrazit placeholdery obsahu) do doby, než se získají potřebná data. Řeší to problém v situaci, kdy člověk rychle roluje posuvníkem a dojel by na konec.</p>

<p>Například <a href="/facebook">Facebook</a> při odrolování na konec zobrazuje maketu příspěvku:</p>

<p><img src="/files/nekonecne-rolovani/fb-maketa.png" alt="Maketa příspěvku na Facebooku" class="border"></p>











<h2 id="automaticky">(Polo)automatické načítání</h2>

<p>Běžně se je možné setkat s dvěma typy nekonečných stránek:</p>

<ol>
  <li>
    <p>Nový obsah se stahuje a zobrazuje automaticky, jak návštěvník roluje.</p>
  </li>
  <li>
    <p>Pod poslední položkou je odkaz typu „Načíst dalších 20 položek“, který nevede na novou stránku jako u klasického stránkování, ale AJAXem do stávající stránky vloží nový obsah.</p>
    
    <p><img src="/files/nekonecne-rolovani/nacist-dalsi.png" alt="Načíst další" class="border"></p>



    
  </li>
</ol>

<p>Oba postupy jde kombinovat. Nějakou část obsahu načíst na základě rolování a potom vyžadovat kliknutí na tlačítko. Díky tomuto postupu může být na stránce dole pod obsahem patička, kam se dá odrolovat.</p>




<h2 id="preload">Preload</h2>

<p>Pro lepší uživatelský zážitek je lepší další položky <b>stahovat už v předstihu</b>, aby v momentě, kdy návštěvník doroluje na poslední, už byly připravené.</p>


<p>Část položek se při tomto postupu sice stáhne zbytečně, ale výsledný dojem bude mnohem lepší. Uživatel nebude muset po odrolování čekat.</p>



<p>Pokud by stahovaný HTML kód dalších položek obsahoval kromě textu i hodně externích obrázků, či jinak <b>datově náročný obsah</b>, je možné rozdělit přidávání nového obsahu do dvou kroků:</p>


<ol>
  <li>Stáhnout AJAXem kód dalších položek.</li>  
  <li>Přidat stažený obsah na stránku.</li>
</ol>

<p>V prvním kroku se typicky stáhne minimum dat, takže není problém si další položky připravit už dřív. Samotné vložení nových položek potom může klidně proběhnout až v momentě, kdy je návštěvník na konci. To ale bude bleskurychlé.</p>




<h2 id="vyhody-nevyhody">Výhody a nevýhody</h2>

<ol>
  <li>
    <p>Nekonečné rolování vede k tomu, že lidé mají tendenci spíš <b>proletět stovky položek</b>, aniž by je pořádně prozkoumali.</p>
    <p>Klasické stránkování tak zajistí vyšší pozornost položkám na první stránce. V případě, že je obsah řazený dle relevance, nekonečné rolování se tak nezdá být moc výhodné (například pro výsledky hledání) – je užitečné, aby si člověk vybral z nejrelevantnějšího obsahu na začátku, než aby jen proletěl stovky položek.</p>
  </li>
  
  <li>
    <p>U <b>nízké relevance</b> je lepší zobrazit položek méně, aby si je člověk pořádně prohlédl. Když existuje hodně relevantních položek, tak klidně víc.</p>
  </li>
  
  
  <li>
    <p>Na mobilu znamená nekonečné rolování 2× víc načtených položek než při stránkování. Na druhou stranu zabraňuje možnosti dostat se na patičku (kde mohou lidé hledat důležité věci).</p>
    <p>Klasické stránkování evokuje nutnost znovu načíst stránku – to lidé na mobilu docela neradi dělají, protože to obvykle trvá dlouho.</p>
  </li>
  
  
  <li>
    <p>Rolování na mobilu může být zároveň:</p>
    
    <ul>
      <li>moc pomalé (uživatel vše posouvá prstem)</li>
      <li>příliš rychlé (při využití setrvačnosti)</li>
    </ul>
    
    <p>Událost rolování se zavolá až při jeho dokončení. Při rychlém prolétnutí stránky se tedy úplně plynulý zážitek nemusí dostavit.</p>    
  </li>
</ol>



<h2 id="problemy">Problémy nekonečných stránek</h2>

<p>Ačkoliv má nekonečné načítání obsahu své výhody, existují i problémy a risika.</p>




<h3 id="velka-stranka">Příliš velká stránka</h3>

<p>Pokud návštěvník vydrží rolovat hodně dlouho, vznikne mu <b>enormně dlouhá stránka</b> třeba se stovkami položek.</p>

<p>Taková stránka může být náročná na HW a fungovat pomalu.</p>

<p>V ideálním případě by přidání nových položek mělo <b>odstranit ty staré</b>. Bohužel to není úplně jednoduché s ohledem na to, že odebrání předchozích položek způsobí posun stránky směrem vzhůru.</p>

<p>Je tedy nutné odebrané položky nahradit placeholderem nebo po jejich odebrání skriptem odrolovat.</p>



<h3 id="navrat">Nemožnost návratu</h3>

<p>Asi vůbec největší problém spočívá v <b>nemožnosti se vrátit zpět</b> po kliknutí na nekonečně načtenou položku.</p>

<p>Při použití funkce <i>Zpět</i> většina prohlížečů zobrazí stránku bez donačtených elementů.</p>

<p>Toto chování celkem logicky <b>snižuje ochotu klikat</b> na automaticky načtený obsah. Uživatel se bojí, aby mu obsah nezmizel, a tak se musí chovat hodně opatrně. Zvlášť při dotykovém ovládání na mobilu je velmi snadné něco omylem prokliknout.</p>

<p>Nemožnost návratu je částečně řešitelná. Zvlášť v případě, kdy nekonečné rolování vzniklo jako náhrada klasického stránkování. Po donačtení nových položek jde změnit URL:</p>

<div class="internal-content">
  <ul>
    <li><a href="/zmena-url">Změna URL JavaScriptem bez obnovení stránky</a></li>
  </ul>
</div>


<p>Při použití funkce <i>Zpět</i> se tak člověk alespoň vrátí na stránku, kde jsou záznamy, které naposled viděl.</p>

<p>V některých prohlížečích je to řešitelné pomocí History API:</p>

<div class="external-content">
  <ul>
  <li>Paul Lewis: <a href="https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration">History API: Scroll Restoration</a> – manuální obnovení odscrollování</li>
  </ul>
</div>

<h3 id="paticka">Patička</h3>

<p>Bývá zvykem, že jistý typ informací (kontakt, podmínky užití, přepnutí <a href="/jazyk">jazyku</a>, <a href="/prepnout-mobilni-web">přepnutí na mobilní/desktopový web</a> atd.) se nachází v patičce webu.</p>

<p>V případě nekonečné stránky je nemožné nebo obtížné se na patičku dostat.</p>


<p>Na desktopu to jde vyřešit patičkou v jiném sloupci, než je obsah. Dělá to tak třeba Facebook nebo <a href="/twitter">Twitter</a>:</p>

<p><img src="/files/nekonecne-rolovani/paticka-sloupec.png" alt="Patička v jiném sloupci" class="border"></p>















<p>Na malých obrazovkách mobilů už většinou prostor pro další sloupec není, takže je možné buď patičku úplně vypustit, nebo stránkování řešit tlačítkem „Zobrazit další“ a obsah automaticky po odrolování nenačítat.</p>




<h2 id="seo">Nekonečné rolování a SEO</h2>

<p>Pro vyhledávače je nekonečné načítání obsahu během rolování neviditelné. <a href="/seznam">Seznam</a> prakticky vůbec nepodporuje <a href="/js">JavaScript</a>, takže ho načítání obsahu v závislosti na JS událostech úplně mine.</p>



<h3 id="google">Google</h3>

<p><a href="/google">Google</a> sice JS podporuje dobře; Googlebot už ale při procházení stránek nevyvolává různé události typu rolování apod., takže se k skriptem načtenému obsahu nedostane.</p>

<p>Ideální je, když existují URL funkční bez JavaScriptu, na kterých je stránkovaný obsah. Na tyto stránky jde potom <i>odkázat</i> značkou <code>&lt;link></code> v hlavičce stránky:</p>



<pre><code>&lt;link rel="next" href="/items?page=6"/>
&lt;link rel="prev" href="/items?page=4"/></code></pre>


<p>Související čtení ohledně nekonečného rolování a Google:</p>

<div class="external-content">
  <ul>      
  <li>Webmaster Central Blog: <a href="http://googlewebmastercentral.blogspot.cz/2014/02/infinite-scroll-search-friendly.html">Infinite scroll search-friendly recommendations</a></li>
  <li><a href="http://scrollsample.appspot.com/items">Ukázkový příklad nekonečného rolování od Google</a></li>  
  <li>John Mueller: <a href="http://youtu.be/aKpQQY4S_7w?t=17m48s">Nekonečné rolování</a> (video)</li>
  </ul>
</div>


<h3 id="seznam">Seznam</h3>

<p>Robot Seznamu se značkami <code>&lt;link></code> nepracuje:</p>

<blockquote cite="http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-cast-2/">
  <p>S rel next a prev při kanonizaci nepracujeme.</p>
  <p class="autor"><b>Yuhů</b>, <a href="http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-cast-2/">O fulltextovém vyhledávání</a></p>
</blockquote>


<p>Pro Seznam se tak nabízí umístit do obsahu odkaz na statickou podobu další stránky. Nebo mít speciální stránku s veškerým obsahem (to ale může být náročné u velkého množství položek).</p>

<p>Aby mělo smysl jednotlivé stránky indexovat, je potřeba, aby bylo stránkování dobře udělané – pokud možno se neměnil obsah na konkrétních stranách.</p>

<div class="internal-content">
  <ul>
    <li><a href="/strankovani#seo">Stránkování a SEO</a> – jak správně udělat stránkování</li>
  </ul>
</div>


<h2 id="zaver">Závěr</h2>

<p>Různé typy stránkování mají různé výhody. Nekonečné rolování vede k prohlédnutí velkého množství obsahu. Stránkování vyžadující kliknutí zase způsobí, že člověk každou z položek bude prohlížeč detailněji.</p>

<p>Obecně vzato není použitý typ stránkování zase tak významný oproti jiným věcem v použitelnosti.</p>

<p>Z článku ohledně stránkování u e-shopů na Smashing Magazine vzešlo doporučení zobrazovat 15–30 položek a potom „Load more…“ tlačítko.</p>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Smashing Magazine: <a href="https://www.smashingmagazine.com/2016/03/pagination-infinite-scrolling-load-more-buttons/">Infinite Scrolling, Pagination Or “Load More” Buttons? Usability Findings In eCommerce</a></li>
  <li>Sitepoint: <a href="http://www.sitepoint.com/ux-infinite-scrollgood-bad-maybe/">The UX of Infinite Scroll: The Good, the Bad, and the Maybe</a></li>
 <li>UX Planet: <a href="https://uxplanet.org/ux-infinite-scrolling-vs-pagination-1030d29376f1#.er9wclz0h">UX: Infinite Scrolling vs. Pagination</a></li>
  <li>UX Planet: <a href="https://uxplanet.org/pagination-best-practices-76fbd3f5a78d#.ry7otugsv">Pagination Best Practices</a></li>

</ul>