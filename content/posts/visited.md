---
title: "Navštívený odkaz :visited"
headline: "Navštívený odkaz <code>:visited</code>"
description: "Pomocí CSS pseudo třídy <code>:visited</code> jde měnit některé styly navštíveného odkazu."
date: "2015-07-26"
last_modification: "2015-07-29"
status: 1
tags: ["css", "odkazy", "selektory-css"]
format: "html"
---

<p>Pro přehlednější používání webové stránky se hodí odlišit odkazy, které <b>návštěvník již navštívil</b> – nemusí na ně potom už klikat znovu, když zná jejich obsah.</p>


<p>Zaměřit navštívené odkazy jde pomocí <code>:visited</code>:</p>

<pre><code>:visited {
  color: grey; /* navštívený odkaz bude šedivý */
}</code></pre>





<p>Někdy se před <code>:visited</code> zbytečně píše ještě značka odkazu:</p>

<pre><code><b>a</b>:visited {}</code></pre>



<p>Jelikož navštívený může být pouze odkaz, nemá to funkci vliv. Teoreticky je složitější zápis odolný proti případným <b>změnám chování prohlížečů</b>, pokud by <code>:visited</code> začalo fungovat i u jiných značek. Už se to v <b>historii</b> stalo s pseudo třídou po najetí myší – <code>:hover</code> (více v článku <a href="http://www.webylon.info/K.46#I">Kaskádová móda</a> na Webylonu).</p>


<p>Výchozí styl běžných odkazů je <font color="0000CC">modrou barvou</font>, navštívené odkazy potom <font color="800080">červenomodrou</font>. Pokud výchozí barvy nezapadají do stylu webu, obvykle se navštívený odkaz styluje <b>méně výrazněji než normální odkaz</b>.</p>



<h2 id="odlisit">Má smysl odlišovat navštívené odkazy?</h2>

<p>Je docela běžné, že webové stránky navštívené odkazy <b>neodlišují</b>.</p>

<p>V řadě případů to bude nejspíš z <b>lenosti</b> – zkrátka se styl odkazu zapíše jako:</p>

<pre><code>a {
  /* styl odkazu */
}</code></pre>






<p>Což postihne i odkaz, který již byl navštíven.</p>

<p>Druhá možnost je, že by odlišný styl některých odkazů <b>mátl uživatele</b>, takže se schválně jinak nestyluje.</p>

<ul>
  <li>Nemusí být každému na první pohled jasné, že jiná barva odkazu značí, že byl navštíven.</li>
  
  <li>U některých stránek může být cílem, aby na něj návštěvník <b>chodil opakovaně</b>. Méně výrazý styl odkazu by od toho mohl odrazovat.</li>

  <li>U odkazů na <b>stránky kategorií/rozcestníků</b> je potom snížení důrazu risikové, protože nebere v úvahu, jestli návštěvník prošel i podstránky.</li>
</ul>


<p>Možnosti stylování navštívených odkazů jsou navíc <b>značně omezené z důvodu ochrany soukromí</b>:</p>



<h2 id="soukromi">Nefungují styly pro <code>:visited</code></h2>

<p>Bez znalosti okolností se může zdát, že stylování navštívených odkazů <b>nefunguje</b>.</p>

<p>U <code>:visited</code> jde měnit pouze <b>barvy</b>:</p>

<ul>
  <li>barvu písma (<code>color</code>),</li>
  
  <li>pozadí (<code>background</code>),</li>
  
  <li>okrajů (<code>border-*-color</code>),</li>
  
  <li>ohraničení (<code>outline-color</code>),</li>
  
  <li>barvu oddělovače sloupců (<code>column-rule-color</code>),</li>
  
  <li><code>fill</code> a <code>stroke</code></li>
</ul>


<p>Proč?</p>

<p>V dobách před tímto omezením šlo velmi snadno ověřit, jaký libovolný web <b>návštěvník navštívil</b>. Třeba nastavením pozadí na adresu <b>měřicího skriptu</b>:</p>

<pre><code>&lt;a 
  href="http://jecas.cz" 
  style="background: url(<b>navstivil.php?url=jecas.cz</b>)"
>
&lt;/a></code></pre>







<p>Šlo to třeba hezky využít k zjištění toho, jestli návštěvník byl na webu konkurence. Z tohoto důvodu tedy nejde navštíveným odkazům měnit <b>obrázkové pozadí</b>.</p>

<blockquote>
  <p>Omezené stylování navštívených odkazů se týká prohlížečů:</p>
  
  <ul>
    <li><b>Internet Explorer 9+</b>,</li>
    
    <li><b>Firefox 4+</b>,</li>
    
    <li><b>Chrome</b>,</li>
    
    <li><b>Opera 15+</b></li>
  </ul>
</blockquote>


<p>Proč nefungují další vlastnosti, jako změna rozměrů (výšky/šířky), nastavení tučného písma a další?</p>

<p>I z těch by šlo zjistit (byť méně elegantně než obrázkový pozadím), zda návštěvník web už navštívil. Změny takových vlastností mohou <b>ovlivňovat své okolí</b>, takže by se zjišťování jen přesunulo na okolní elementy.</p>




<h3 id="zjisteni-barvy">Zjištění barvy</h3>

<p>I barvu je ale přece možné skriptem zjistit:</p>

<div class="internal-content">
  <ul>
    <li><a href="/zjisteni-css">Zjištění výsledného CSS v JavaScriptu</a></li>
  </ul>
</div>

<p>Z tohoto důvodu metoda <code>getComputedStyle()</code> při použití na navštíveném odkazu <b>lže</b> – vrací hodnoty odkazu nenavštíveného.</p>


<h3 id="sourozenec">Selektor sourozence</h3>

<p>Stejně tak nefunguje ani <b>selektor sourozence</b>:</p>

<pre><code>:visited + span {
  /* tato pravidla se nikdy neaplikují */
}</code></pre>

<p>Prohlížeč se z pohledu selektoru tváří, že odkaz navštívený není.</p>





<h3 id="before-after">Pseudo elementy <code>:before</code>/<code>after</code></h3>

<p>Nemožnosti používat pseudo-elementy je zvlášť škoda, šlo by tak snadno a elegantně k odkazům připsat, že byly navštíveny:</p>

<pre><code>:visited:after {
  content: "✔ Navštíveno";
}</code></pre>




<p>Bohužel to funguje jen u staré <b>Opery 12</b>, kde tak jde velmi snadno hezky označit <b>přečtené články</b>:</p>

<p><img src="/files/visited/visited-opera.png" alt="Označení navštívených odkazů" class="border"></p>



























<h2 id="omezeni">Důsledky omezení</h2>

<p>Asi největší problém možnost <b>měnit pouze barvu</b> přináší návštěvníkům s <b>problémem rozlišovat barvy</b>.</p>

<p>Může se zdát, že omezení nemuselo být tak dramatické a dalo se vztahovat pouze na <b>odkazy na jiné domény</b>, vždyť vlastník webu může stejně sledovat, co jeho návštěvníci viděli a co ne.</p>

<p>Takové chování by zneužitelnost pouze zmírnilo, protože stále existují stránky na stejné doméně, které spolu nesouvisí.</p>





<h2 id="odliseni">Odlišení navštíveného odkazu</h2>

<p>Pro názornější znázornění navštíveného obsahu je tak nutné si ukládat navštívené stránky uživatele ve vlastní režii:</p>

<ol>
  <li>
    <p>Pomocí JavaScriptu do <b>lokálního úložiště</b> – <a href="/zalohovani-formularu#local-storage"><code>localStorage</code></a>.</p>
  </li>
  <li>
    <p>Serverovým skriptem uživateli přidat <b>identifikační cookie</b> a do DB na straně serveru mu přiřazovat navštívené stránky.</p>
  </li>
</ol>

<p>Když už se tato data ukládají, nabízí se si informací uložit co nejvíc. Třeba <b>datum návštěvy</b>:</p>

<p><img src="/files/visited/navstiveno.png" alt="Označení navštívených odkazů" class="border"></p>


<p>Z ukládaných záznamů by mohlo jít zjistit a zobrazit i počet návštěv dané stránky, případě měřit i dobu, kterou člověk stránku četl a podobně.</p>





<h3 id="ukladani">Ukládat u klienta, nebo na server?</h3>

<p>Ukládat data na server má smysl hlavně v případě, že není <b>data o návštěvnosti</b> možné zjistit jinak – třeba pomocí <a href="/ga">Google Analytics</a>. Jinak je ukládání na serveru zbytečná zátěž.</p>



<h2 id="hotove-reseni">Hotové řešení s <code>localStorage</code></h2>

<p>Pro konkrétní implementaci ukládání do <code>localStorage</code> je potřeba:</p>

<ol>
  <li>
    <p>Sestavit <b>identifikátor stránky</b> – k tomu se bude hodit obsah za lomítkem (<code>location.pathname</code>) a část s otazníkem (<code>location.search</code>).</p>
    
    <pre><code>var pageId = location.pathname + location.search</code>;</pre>
    
    <p>Postup jako při <code>location</code> bude stejný i pro následné procházení odkazů:</p>
  <div class="internal-content">
    <ul>
      <li><p><a href="/js-parsovani-url">Parsování URL v JavaScriptu</a></p></li>
    </ul>
  </div>
  </li>
  
  <li>
    <p><b>Uložit</b> do lokálního úložiště pro identifikátor datum:</p>
    <pre><code>localStorage.setItem(
  pageId,
  new Date()
);</code></pre>
  </li>
</ol>






<p>Nyní zbývá jen část pro <b>znázornění navštívenosti</b>:</p>

<ol>
  <li>
    <p><b>Projít odkazy</b> na stránce <a href="/js-cykly">cyklem</a>. Všechny odkaz na stránce jsou v <code>document.links</code>, případně se výběr může vztahovat jen na určitou oblast.</p>
    
    <pre><code>var links = document.links;
for (var i = links.length; i--; ) {
  visited(links[i]);
}</code></pre>
  </li>
  
  
  
  
  <li>
    <p><b>Označit navštívené odkazy</b> – to zajistí funkce <code>visited</code> třeba přidáním vlastního atributu <code>data-visited</code>.</p>
    
    <p>Navštívenost se zjistí na základě vyhledání položky v úložišti podle identifikátoru odkazu:</p>
    
    <pre><code>var item = localStorage.getItem(pageId);
if (item) {   
  // navštívený odkaz
}</code></pre>
  </li>
  
  
  
  <li>
    <p><b>Časový rozdíl</b> se zjistí odečtením data z úložiště (proměnná <code>item</code>) od aktuálního data, datum je nutné parsovat:</p>
  
  <pre><code>var date = new Date() - Date.parse(item);</code></pre>
  
  
  <p>Pro representaci časové prodlevy v <b>češtině</b> stylem <i>před X minutami</i> půjde použít funkci <code>timeAgoInWords</code> z <a href="/update-casu">dynamického updatu času</a>.</p>
  
  
  <p>Výsledek se nastaví do atributu:</p>
  
  <pre><code>link.setAttribute("data-visited", TimeAgo.init(date));</code></pre>
  
  <p>To by mělo zajistit označení všech navštívených odkazů v HTML <a href="/dom">DOMu</a>:</p>
  
  
  <p><img src="/files/visited/ago.png" alt="Znázornění navštívení v DOMu" class="border"></p>
  </li>
  
  <li>
    <p><b>Znázornění proběhne v CSS</b> pomocí pseudoelementu <code>:after</code> a přečtení hodnoty pomocí <a href="/content-attr"><code>attr()</code></a> (<b>IE 8+</b>).</p>
    
    <pre><code>a[data-visited]:after {
    content: "navštíveno " attr(data-visited);
}</code></pre>
    
    
    <p>Stylovat <b>navštívené odkazy libovolným způsobem</b> půjde přes prosté <code>a[data-visited]</code>.</p>   
  </li>
</ol>

<p><a href="https://kod.djpw.cz/bqob-">Živá ukázka</a> – po poklikání na odkazy a vyčkání by to mělo zobrazovat <b>dobu od poslední návštěvy</b>:</p>

<p><img src="/files/visited/vysledek.png" alt="Zobrazení doby od načtení" class="border"></p>
















<p>(Moc jsem to netestoval, najdete-li chybu, dejte prosím vědět do komentářů.)</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Mozilla Hacks: <a href="https://hacks.mozilla.org/2010/03/privacy-related-changes-coming-to-css-vistited/">privacy-related changes coming to CSS :visited</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/%3Avisited"><code>:visited</code></a></li>
</ul>