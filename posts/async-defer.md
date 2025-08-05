---
title: "Připojení JavaScriptu s async a defer"
headline: "Připojení JavaScriptu s <code>async</code> a <code>defer</code>"
description: "Různé způsoby připojení JavaScriptu na stránku, aby se nezdržovalo načítání stránky."
date: "2014-10-31"
last_modification: "2016-02-06"
status: 1
tags: ["js", "zrychlovani"]
format: "html"
---

<p>Při zrychlování načítání webové stránky je způsob připojení JavaScriptu jedna z věcí, která může mít značný vliv na rychlost.</p>

<p>Týká se to hlavně první návštěvy webu. Po uložení skriptů do cache už na způsobu připojení skriptu tolik nezáleží, jelikož se obsah nemusí znovu stahovat.</p>

<p>Zjednodušenou situaci načítání JS při různých způsobech připojení ilustruje následující obrázek:</p>

<p><img src="/files/async-defer/async-defer.png" alt="Graf parsování HTML, načítání a spouštění JS" class="border"></p>























<h2 id="script">Samotná značka <code>&lt;script></code></h2>

<pre><code>&lt;script src="velkyJavaScript.js">&lt;/script></code></pre>


<p>Protože v externím JS by mohlo být něco vypisováno metodou <code>document.write</code>, prohlížeč při objevení externího JS přeruší parsování HTML kódu stránky do doby, než se skript stáhne a provede.</p>

<p>Zjednodušeně se říká, že obyčejná značka <code>&lt;script></code> <b>blokuje vykreslování</b>.</p>

<p>Umístit externí JS do <a href="/html-kostra#head">hlavičky</a> nebo před obsah je tak spolehlivým zabijákem dobrého dojmu z rychlosti načítání.</p>

<p>U aplikace zcela nefunkční <a href="/bez-javascriptu">bez JavaScriptu</a> to ale tolik nevadí, protože by stejně do stažení skriptu nešlo nic dělat (i když i tam bývá dobré něco uživateli zobrazit, aby věděl, že se něco děje). U běžných obsahových webů je to ale zpravidla <b>nežádoucí</b>.</p>




<h3 id="nakonci">Umístění skriptu na konec</h3>

<p>Možné snadné řešení blokování vykreslování je umístit JavaScript až na konec HTML kódu (před <code>&lt;/body></code>) nebo alespoň pod kritický obsah.</p>


<p>Problém tohoto postupu je někdy v tom, že se JS začne stahovat později (až po stažení skoro celého HTML). Jsou-li na stránce nějaké prvky závislé na JavaScriptu, mohou být pozorovatelnou dobu nefunkční, protože JS ještě nebude stažen a vyhodnocen.</p>


<p>Případně se skript vůbec nestihne načíst a spustit do doby, než návštěvník stránku opustí – to někdy vadí u měřicích kódů, protože se taková návštěva nezapočítá.</p>


<p>U méně důležitého skriptu to ale může být optimální chování, protože stahování skriptu nebude zdržovat důležitější obsah jako třeba obrázky, které se začnou stahovat dříve (budou výš v HTML kódu).</p>




<h2 id="pripojeni-js">Připojení skriptu skriptem</h2>

<p>V některých případech je vhodné, když se splní dvě podmínky zároveň:</p>

<ol>
  <li>
    <p>JavaScript se začne stahovat a vyhodnocovat co nejdříve.</p>
  </li>
  <li>
    <p>Stahování neblokuje vykreslování stránky</p>
  </li>
</ol>

<p>Rozšířil se kvůli tomu postup připojování externího JS pomocí interního skriptu v značce <code>&lt;script></code>:</p>

<pre><code>&lt;script>
function nacistJs(url) {
  var script = document.createElement("script");
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};
nacistJs('velkyJavaScript.js');
&lt;/script></code></pre>






<p>Tento postup používá drtivá většina služeb, které se vkládají JavaScriptem: <a href="/ga">Google Analytics</a>, <a href="/sdileci-tlacitka">sdílecí tlačítka</a> od Facebooku, externí <a href="/komentare">komentářové služby</a> a podobně.</p>

<p>Kromě toho, že tímto způsobem připojené JS soubory se mohou provést v různém pořadí nezávisle na pořadí jejich připojení, má tento postup ještě dva problémy:</p>



<h3 id="preload-scanner">Preload scanner</h3>

<p>Prohlížeče na HTML kód aplikují tzv. <i>preload scanner</i>. Jedná se o mechanismus, který v kódu hledá značky s odkazy na soubory, které může začít stahovat bez nutnosti cokoliv vykreslovat.</p>

<p>Týká se to například <a href="/obrazky">obrázků</a> vložených značkou <code>&lt;img></code> (kvůli tomu se <a href="/zacatek-stahovani-obrazku">vždycky stahují</a>), značky <code>&lt;link></code> pro připojení CSS nebo značky <code>&lt;script></code>.</p>

<p>Použití blokujícího JS tak může někdy být rychlejší než jeho připojení JavaScriptem, právě kvůli tomu, že se díky preload scanneru začne dřív stahovat.</p>




<h3 id="blokujici-css">CSS blokuje JavaScript</h3>

<p>Připojení skriptu JavaScriptem čeká na vyhodnocení JS kódu připojovací funkce. To je například pozdrženo načítáním a zpracováváním CSS (sestavováním CSSOM).</p>



<p>JavaScript ve značce <code>&lt;script></code> musí čekat na stažení a vyhodnocení CSS pro případ, že by například potřeboval zjišťovat rozměry prvků, které jsou logicky ovlivňovány přes CSS.</p>

<p>Připojení skriptu skriptem by tedy (když už) mělo proběhnout před připojením CSS, má-li se začít stahovat brzo.</p>

<p>Související:</p>

<div class="internal-content">
  <ul>
    <li><a href="/vykreslovani">Jak funguje vykreslování stránky</a></li>
  </ul>
</div>





<h2 id="async">Značka <code>&lt;script async></code></h2>

<p>Výhody obyčejného <code>&lt;script></code>u a připojování JavaScriptem kombinuje atribut <code>async</code>.</p>


<pre><code>&lt;script src="velkyJavaScript.js" <b>async</b>>&lt;/script></code></pre>

<p>Díky němu adresa souboru neunikne preload scanneru, ale zároveň skript nebude blokovat vykreslení stránky během doby svého stahování.</p>



<p>Nevýhody <code>async</code>?</p>




<h3 id="posloupnost">Pořadí spuštění JS</h3>

<p>Při použití <code>async</code> <b>není jasné, kdy se skript spustí</b> (stejně jako při připojení skriptu skriptem) – to může být problém při připojování více skriptů, které jsou na sobě závislé, protože se může dřív provést první i druhý.</p>


<h3 id="jquery">Asynchronní jQuery</h3>

<p>Připojit asynchronně například knihovnu typu jQuery a vlastní externí skript jQuery využívající tak není bez úprav dost dobře možné. Při použití atributu <code>async</code> by se ve vlastním skriptu mohly volat metody ještě nenačteného jQuery.</p>

<p>V případě, že je všechen JS kód <a href="/slouceni-js-css">spojen dohromady</a>, to problém není. Od slučování souborů se ale se zlepšováním podpory HTTP/2 bude v budoucnu nejspíš ustupovat, protože u tohoto protokolu přináší víc nevýhod než výhod.</p>



<p>V praxi se to dá řešit proměnnými v interním <code>&lt;script></code>u, kam se ukládá stav s přehledem načtených skriptů. Každý externí skript potom obsahuje funkci pro spuštění všeho, kde se testuje, jestli už se všechny potřebné soubory provedly.</p>

<p>Další nevýhoda je <b>podpora v prohlížečích</b>. V <b>IE 9</b> a starších a v <b>Android Browseru 2.3</b> a starších se <code>async</code> ignoruje, takže potom takové <code>&lt;script></code>y blokují vykreslování.</p>




<h2 id="defer"><code>&lt;script defer></code></h2>

<p>I staré <b>Internet Explorery</b> ale podporují atribut <code>defer</code>. Ten sice funguje trochu jinak než <code>async</code>, ale blokování vykreslování dokáže odstranit.</p>




<h3 id="defer-async">Rozdíly <code>defer</code> a <code>async</code></h3>

<ol>  
  <li>
    <p>Skript s atributem <code>defer</code> se provede až po zparsování celého HTML. Skript s <code>async</code> ihned, až se dostahuje.</p>
  </li>
  <li>
    <p>Použití <code>defer</code>u by mělo zajistit provedení JS v uvedeném pořadí. Podle všeho ale tato vlastnost není v <b>IE 9</b> a starších <a href="https://github.com/h5bp/lazyweb-requests/issues/42">úplně spolehlivá</a>.</p>
  </li>
</ol>

<p>Atribut <code>defer</code> tedy sice zabrání blokování vykreslování, ale skript se u velkých a náročných stránek provede hodně pozdě. U měřicích skriptů to může způsobovat nezapočítání návštěvy, když se uživatel přesune jinam dřív, než se dokončí parsování HTML a následné vykonání skriptu.</p>


<h2 id="async-defer"><code>&lt;script async defer></code></h2>

<p>Pro pohodlné připojení skriptu objevitelného <i>preload scannerem</i>, který nezablokuje během svého stahování vykreslování stránky, se oba atributy kombinují.</p>

<pre><code>&lt;script src="velkyJavaScript.js" <b>async</b> <i>defer</i>>&lt;/script></code></pre>


<p>Tento postup se nejspíš dá označit jako nejlepší možné řešení připojování JS, který není pro stránku úplně nepostradatelný, nezáleží u něj na pořadí spuštění více externích souborů a je vhodné, aby se začal stahovat trochu dřív než na konci stránky.</p>

<p>Funkce je následující:</p>

<ul>
  <li><p>Prohlížeče s podporou <code>async</code> načtou skript bez blokování stránky a spustí okamžitě po stažení.</p></li>
  <li><p> Prohlížeče s podporou <code>defer</code>u načtou skript rovněž bez blokování, ale spustí jej až po dokončení parsování HTML.</p></li>
  <li><p>Prohlížeče s podporou <code>async</code> i <code>defer</code> budou tím pádem <code>defer</code> ignorovat.</p>
  </li>
</ul>

<p>Poznámka: Atributy <code>async</code> a <code>defer</code> nemají vliv na interní JS kód mezi <code>&lt;script></code> a <code>&lt;script></code>. Účinkují jen u externích skriptů.</p>




<h2 id="resource-Hints">Resource Hints</h2>

<p>Prohlížeče     <b>Chrome 46+</b>,    <b>Firefox 39+</b> a    <b>Opera 33+</b> podporují tzv. <i lang="en">Resource Hints</i>. Jde o mechanismus, jak dát prohlížeči s předstihem vědět o souborech, které bude potřeba stahovat.</p>

<p>V odpovědi serveru stačí přidat HTTP hlavičku <code>Link</code> a prohlížeč může začít stahovat obsah, aniž by ještě začal parsovat HTML:</p>

<pre><code>Link: &lt;https://example.com/velkyJavaScript.js>; rel=prefetch;</code></pre>


<div class="external-content">
  <ul>
    <li>W3C: <a href="https://w3c.github.io/resource-hints/">Resource Hint</a></li>
  </ul>
</div>


<h2 id="zaver">Závěr</h2>

<p>Nedá se universálně říct, který postup připojení skriptu je nejlepší. Záleží na konkrétním záměru s jakým se skript má načítat a na prohlížečích, které mají být podporované.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Ilya Grigorik: <a href="https://www.igvita.com/2014/05/20/script-injected-async-scripts-considered-harmful/">Script-injected "async scripts" considered harmful</a> – problémy v rychlosti při připojování skriptu skriptem</li>
  
  <li>David Grudl: <a href="http://phpfashion.com/rychlejsi-stranky-s-google-universal-analytics">Rychlejší stránky s Google Universal Analytics</a> – přepsání připojování skriptu do <code>async</code> + <code>defer</code> podoby</li>  
  
  <li>Growing with the Web: <a href="http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html">async vs defer attributes</a> – stručný přehled o načítání s <code>async</code>/<code>defer</code>/ničím</li>
  
  <li>HTML5 Rocks: <a href="http://www.html5rocks.com/en/tutorials/speed/script-loading/">Deep dive into the murky waters of script loading</a></li>
</ul>



<!-- http://kod.djpw.cz/leub -->