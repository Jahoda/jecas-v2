---
title: "HTML kostra"
headline: "HTML kostra"
description: "Jak vypadá základní „kostra“ HTML stránky. Které HTML značky ji utváří."
date: "2015-03-06"
last_modification: "2015-10-20"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<pre><code>&lt;!doctype html>
&lt;meta charset="utf-8">
&lt;title>Titulek stránky&lt;/title>
Obsah stránky.</code></pre>




<p>Na HTML kódu je zajímavé, že v podstatě nemusí obsahovat žádný HTML kód a přesto funguje.</p>

<p>Když se napíše libovolný textový obsah do textového souboru s příponou <code>*.html</code>, prohlížeče ho zobrazí jako HTML. Nejjednodušší HTML stránka tedy <b>nemusí obsahovat jedinou HTML značku</b>.</p>

<pre><code>Nejjednodušší HTML stránka.</code></pre>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/mqlb-">Živá ukázka nejjednodušší HTML stránky</a></li>
  </ul>
</div>



<h2 id="cestina">Čeština</h2>

<p>Někdy se může stát, že prohlížeč není schopen správně určit kódování dokumentu, což vyústí ve špatné <b>zobrazení české diakritiky</b>.</p>

<div class="live no-source">
  <p>NejjednouduĹˇĹˇĂ HTML strĂˇnka.</p>
</div>

<p>Příklad pochází z této stránky:</p>

<div class="external-content">
  <ul>
    <li><a href="http://jecas.cz/files/html-kostra/stranka.html">Příklad stránky se špatným kódováním</a></li>
  </ul>
</div>

<p>Z takových důvodů se pro jistotu na začátek stránky přidává <code>&lt;meta charset></code>. Pro nové stránky je zpravidla nejvýhodnější volit kódování <b>UTF-8</b>.</p>

<pre><code><b>&lt;meta charset="utf-8"></b>
Nejjednodušší HTML stránka s funkční češtinou.</code></pre>







<p>Nastavit kódování jde i jinými způsoby.</p>

<ol>
  <li>
    <p>Využitím tzv. <a href="/bom">BOMu</a> (<i>Byte order mark</i>).</p>
  </li>
  <li>
    <p>Poslat skutečnou HTTP hlavičku <code>Content-Type</code>. V PHP třeba následovně:</p>
    
    <pre><code>header("Content-type: text/html; charset=utf-8");</code></pre>
  </li>
</ol>

<p>Jelikož BOM může vytvářet problémy při používání PHP a HTTP hlavička zase nezajistí správné kódování při případném <b>uložení souboru na disk</b>, zdá se <code>&lt;meta></code> značka nejvýhodnější.</p>

<p>Občas je možné se setkat se <b>starší podobou</b> <code>&lt;meta></code> značky pro kódování češtiny, je zbytečně složitá a patří do musea:</p>

<pre><code>&lt;meta http-equiv="content-type" content="text/html;charset=utf-8"></code></pre>

    

<h2 id="title">Titulek stránky</h2>

<p>Po přidání <code>&lt;meta></code> značky pro správné kódování češtiny už je stránka dobře funkční.</p>

<p>Pro vyšší komfort návštěvníků je dále vhodné přidat značku <code>&lt;title></code> obsahující titulek stránky. Bez něj se v záložce zobrazí jen ne úplně srozumitelná adresa.</p>

<p><img src="/files/html-kostra/chybi-titulek.png" alt="Chybějící titulek stránky" class="border"></p>





<p>Titulek je optimální umístit až pod <code>&lt;meta charset></code> značku pro kódování češtiny a před obsah.</p>

<pre><code>&lt;meta charset="utf-8">
<b>&lt;title>Název stránky&lt;/title></b>
Nejjednodušší HTML stránka s funkční češtinou a titulkem.</code></pre>



<ul>
  <li>Umístění <code>&lt;title></code> za <code>&lt;meta charset></code> zajistí jistotu správného kódování už v samotném titulku.</li>
  
  <li>Umístit <code>&lt;title></code> co nejvýš je dobré k tomu, aby se z titulku návštěvník co nejdříve dozvěděl, že se stránka načítá a o čem zhruba je.</li>
</ul>


<p>HTML jinak disponuje značnou volností, takže není problém značku <code>&lt;title></code> dát klidně až za obsah. Bude to ale mít nevýhodu v tom, že se titulek může zobrazit až později, protože se před ním musí stáhnout ostatní HTML kód.</p>

<p>Titulek může být jen jeden, takže opětovné umístění značky <code>&lt;title></code> už název stránky v záložce nepřepíše. Použije se první výskyt.</p>





<h2 id="doctype">Značka <code>&lt;!doctype></code></h2>


<p>Používá se pro přepínání režimu prohlížečů. Zpravidla je výhodné přepnout stránku do <b>standardního režimu</b> (bez <code>&lt;!doctype></code> se používá <i>quirk režim</i>).</p>
<div class="internal-content">
  <ul>
    <li><a href="/doctype">HTML značka <code>&lt;!doctype></code></a> – rozdíl mezi standardním režimem a quirkem</li>
  </ul>
</div>



<p>Stačí tedy uvést na začátek souboru:</p>

<pre><code>&lt;!doctype html></code></pre>


<p>Velké rozdíly jsou hlavně v <b>Internet Exploreru</b>. Ostatní prohlížeče se mezi quirkem a standardním režimem tolik neliší (na box model v nich nemá režim vliv), ale třeba dědění velikosti písma v tabulce je odlišné.</p>




<h2 id="kompletni">Kompletní HTML kostra</h2>

<p>Základní podoba dobře funkční HTML kostry dokumentu vypadá následovně.</p>

<pre><code>&lt;!doctype html>
&lt;meta charset="utf-8">
&lt;title>Titulek stránky&lt;/title>
Obsah stránky.</code></pre>





<p>Tato základní kostra stránky může působit trochu <b>minimalisticky</b> oproti příkladům často uváděných v HTML učebnicích.</p>

<p>K vidění bývají příklady s uváděním nepovinných značek <code>&lt;html></code>, <code>&lt;head></code> a <code>&lt;body></code>, které není potřeba psát.</p>

<div class="internal-content">
  <ul>
    <li>Druhy HTML značek: <a href="/html-znacky#volitelne">Počáteční i koncová značka volitelná</a></li>
  </ul>
</div>

<p>Značka <code>&lt;html></code> není přímo potřebná k ničemu. Samotné ruční dělení dokumentu na <code>&lt;head></code> a <code>&lt;body></code> <b>není potřeba v 99,9 % případů</b>.</p>

<p>Explicitně uvádět tyto značky má tedy smysl jen v případě, že se pro ně nastavují nějaké CSS třídy, identifikátory a podobně. Případně kvůli <b>HTML editorům</b>, které mohou mít teoreticky problém rozlišit hlavičku a tělo.</p>

<p>Prohlížeče ví, jak funguje HTML, takže si <code>&lt;html></code>, <code>&lt;head></code> a <code>&lt;body></code> domyslí a ve finále v kódu budou.</p>

<p>Všechny tyto značky jde použít na stránce <b>pouze jednou</b>. Vícenásobné pokusy budou ignorovány.</p>


<h3 id="html">Značka <code>&lt;html></code></h3>

<p>Jedná se tzv. o <b>kořenový element</b>. Nic výš ve struktuře HTML stránky neexistuje.</p>

<p>V CSS jde zaměřit <a href="/css-selektory#korenovy">selektorem <code>:root</code></a> (funkční od <b>IE 9</b>).</p>

<p>Má nepovinnou počáteční i koncovou značku, nemusí se tedy do kódu vůbec psát.</p>

<p>Podporuje skoro jen <a href="/obecne-atributy">globální atributy</a>, z nichž je nejzajímavější <a href="/lang"><code>lang</code></a> pro určení jazyku stránky.</p>

<p>Další atributy:</p>

<dl>
  <dt id="manifest"><code>manifest</code></dt>
  <dd>
    <p>Atribut <code>manifest</code> slouží pro používání <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache">application cache</a>.</p>
  </dd>
  
  <dt id="xmlns"><code>xmlns</code></dt>
  <dd>
    <p>XML Namespace (jmenný prostor XML). Používal se v XHTML.</p>
  </dd>
  
  <dt id="version"><code>version</code></dt>
  <dd>
    <p>Dávno zavržený atribut: nahradil ho <a href="/doctype"><code>&lt;!doctype></code></a>.</p>
  </dd>
</dl>


<h3 id="head">Hlavička <code>&lt;head></code></h3>

<p>Hlavička stránky obsahuje prvky, které nejsou na stránce vidět:</p>

<ul>
  <li>titulek stránky <code>&lt;title></code>,</li>
  
  <li>meta informace ve značce <code>&lt;meta></code>,</li>
  
  <li>interní CSS – <code>&lt;style></code>,</li>
  
  <li>interní nebo externí JavaScript – <code>&lt;script></code>,</li>
  
  <li>obsah pro případ <a href="/vypnuty-js">vypnutého skriptování</a> – <code>&lt;noscript></code>,</li>
  
  <li>odkazy na externí CSS nebo ikonky stránky ve značce <code>&lt;link></code>,</li>
  
  <li>stanovení základní adresy pro odkazy <a href="/base"><code>&lt;base></code></a></li>  
</ul>

<p>Jiné <b>obsahové značky</b> nejsou v hlavičce dovoleny a jejich použití ji automaticky uzavře a otevře <code>&lt;body></code>.</p>

<p>Psát do kódu <code>&lt;head></code> není potřeba.</p>

<p>Ačkoliv se značka <code>&lt;head></code> a v ní obsažené značky nezobrazují, jde je stylovat.</p>

<div class="external-content">
  <ul>
    <li><a href="https://htmlhead.dev">HEAD</a> – popis snad všech myslitelných věcí, co mohou být v hlavičce stránky</li>
  </ul>
</div>


<h3 id="body">Tělo <code>&lt;body></code></h3>

<p>Obsahuje samostatný obsah stránky, který prohlížeč renderuje vykreslovacím jádrem. Počáteční i koncová značka je nepovinná – <code>&lt;body></code> se stejně vytvoří, když prohlížeč narazí na obsahový element, a ukončí za posledním elementem na stránce.</p>

<p>Kromě obecných atributů u něj jdou používat <code>on*</code> atributy pro <b>události v JavaScriptu</b>. Asi nejčastěji se používá událost <code>onload</code>, která se provede po načtení stránky.</p>

<p>Všechny atributy: <code>onafterprint</code>, <code>onbeforeprint</code>, <code>onbeforeunload</code>, <code>onblur</code>, <code>onerror</code>, <code>onfocus</code>, <code>onhashchange</code>, <code>onlanguagechange</code>, <code>onload</code>, <code>onmessage</code>, <code>onoffline</code>, <code>ononline</code>, <code>onpopstate</code>, <code>onredo</code>, <code>onresize</code>, <code>onstorage</code>, <code>onundo</code>, <code>onunload</code></p>

<p>Nakonec obsahuje řadu atributů, které se před CSS používaly pro <b>určení vzhledu dokumentu</b>. Nemá smysl je používat, když jdou nahradit pomocí CSS.</p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/lhrb">Ukázka</a> – formátování stránky bez CSS</li>
    
    <li><a href="http://www.jakpsatweb.cz/html/struktura.html#body">Struktura dokument: body</a> – přehled formátovacích atributů na Jak psát web</li>
  </ul>
</div>





<h2 id="semanticke-znacky">Sémantické HTML5 značky</h2>

<p>Na základě toho, že prvky webových stránek sestávají z obdobných sekcí jako je hlavička (tím není myšlena značka <code>&lt;head></code>), navigace, obsah, patička a podobně, v HTML5 dostaly tyto prvky <b>značky se zvláštním názvem</b>.</p>

<p>Příklad HTML 5 struktury s využitím všech nových značek může vypadat následovně:</p>

<pre><code>&lt;!doctype html>
&lt;html>
    &lt;head>
        &lt;meta charset="utf-8">
        &lt;title>Titulek stránky&lt;/title>
    &lt;/head>
    &lt;body>
      &lt;header>Hlavička stránky&lt;/header>
      &lt;nav>Navigace&lt;/nav>      
      &lt;main>
        &lt;article>
          &lt;header>Nadpis stránky&lt;/header>            
          &lt;section>Obsah stránky&lt;/section>
          &lt;footer>Zápatí článku&lt;/footer>
        &lt;/article>
      &lt;/main>
      &lt;aside>Boční sloupec&lt;/aside>
      &lt;footer>Patička&lt;/footer>
    &lt;/body>
&lt;/html></code></pre>























<h3 id="main">Značka <code>&lt;main></code></h3>

<p>Patří do ní hlavní obsah stránky, který je <b>unikátní napříč webem</b>. Opakujicí se společné části stránky jako navigace, hlavička, patička a podobně by měly být mimo něj.</p>



<h3 id="header">Hlavička <code>&lt;header></code></h3>

<p>Obecná značka pro hlavičku. Tím není myšleno pouze logo stránky, ale stejně tak může být v <i>hlavičce</i> uveden nadpis článku. Značka <code>&lt;header></code> tedy označuje hlavičku/záhlaví dané sekce.</p>

<p>Hlavičkou tak bude i třeba nadpis a perex článku:</p>

<pre><code>&lt;header>
  &lt;h1>Název článku&lt;/h1>
  &lt;p>Popis článku&lt;/p>
&lt;/header></code></pre>








<h3 id="nav">Navigace <code>&lt;nav></code></h3>

<p>Značka <code>&lt;nav></code> označuje sekci obsahující <b>navigační prvky</b> – odkazy. Je jedno jestli externí nebo interní.</p>

<p>Do <code>&lt;nav></code> tak patří hlavní menu, postranní menu nebo i <a href="/toc">obsah stránky</a> (<i lang="en">table of contents</i>).</p>

<p>Odkazy v navigaci se často dávají do <a href="/seznamy">seznamu</a>:</p>

<pre><code>&lt;nav>
  &lt;ul>
    &lt;li>&lt;a href="http://jecas.cz">Je čas&lt;/a>&lt;/li>
    …
  &lt;/ul>
&lt;/nav></code></pre>


<p>V dřívějších dobách se občas pro menu používala značka <a href="/seznamy#menu"><code>&lt;menu></code></a>, která se zobrazovala jako seznam. Byl jí změněn význam na <a href="/menuitem">kontextovou nabídku</a>.</p>







<h3 id="article">Článek <code>&lt;article></code></h3>

<p>Že se značka <code>&lt;article></code> hodí pro <b>obalení článku</b>, je asi jasné. Jinak do <code>&lt;article></code> patří obsah, který jako celek dává smysl sám o sobě a nebyl by ho například problém přenést na jinou stránku.</p>

<p>V případě, že je na stránce článků více, bude pro každý odpovídat jeden <code>&lt;article></code>.</p>

<p>Kromě článků je <code>&lt;article></code> určen i třeba pro jednotlivé <b>příspěvky v diskusním fóru</b> nebo komentáře pod článkem.</p>


<h3 id="footer">Patička/zápatí <code>&lt;footer></code></h3>

<p>Neslouží pouze pro patičku stránky (to místo na konci webu, kam se <a href="/paticka-datum">umisťuje datum</a>), ale pro <b>patičku dané sekce</b>.</p>

<p>Například v článku (značka <code>&lt;article></code>) se nabízí do značky <code>&lt;footer></code> dát informace o autorovi článku nebo odkazy na související zdroje.</p>




<h3 id="aside">Okrajový obsah <code>&lt;aside></code></h3>

<p>Označuje část obsahu, která není přímo související. Do <code>&lt;aside></code> se nabízí umístit části bočního panelu, reklamy a podobně.</p>


<h3 id="section">Sekce <code>&lt;section></code></h3>

<p>Obecná sekce obalující tematickou skupinu obsahu. Má smysl asi hlavně u rozsáhlých a dlouhých stránek/článků, kde už nejde vyznačit hierarchii prostřednictvím <a href="/nadpisy">nadpisů <code>&lt;h1–6></code></a> – struktura je hlubší. Potom je řešení použít <code>&lt;section></code>, kde se s číslováním nadpisů začne zase od začátku.</p>

<p>Značka <code>&lt;section></code> má podobný význam jako původně <code>&lt;div></code> (<i lang="en">division</i> – oddíl) než se začal hromadně používat ke stylování.</p>


<h3 id="hgroup">Skupina nadpisů <code>&lt;hgroup></code></h3>

<p>Značka <code>&lt;hgroup></code> už byla z HTML 5 specifikace <b>odebrána</b>. Měla sloužit k obalení nadpisu a podnadpisu. Například:</p>

<pre><code>&lt;header>
  &lt;h1>Název článku&lt;/h1>
  &lt;h2>Podnadpis článku&lt;/h2>
&lt;/header></code></pre>








<h2 id="html5-smysl">Mají strukturní HTML 5 značky smysl?</h2>

<p>Na strukturních HTML5 značkách je zajímavé to, že <b>prakticky nic nedělají</b>. Chovají se jako jakékoliv <a href="/vlastni-html-znacky">vlastní značky</a>, jen s tím rozdílem, že mají ve výchozích stylech <b>blokové zobrazení</b> (<a href="/display#block"><code>display: block</code></a>).</p>


<blockquote cite="http://www.jakpsatweb.cz/html/html5-strukturni.html">
  <p>Zbytečné strukturní tagy z HTML 5, protože nic nedělají.</p>
  <p class="autor">– <b>Dušan Janovský</b>, <a href="http://www.jakpsatweb.cz/html/html5-strukturni.html">Strukturní tagy z HTML 5</a></p>
</blockquote>



<ol>
  <li>
    <p>Pro typické <b>návštěvníky jsou tyto značky neviditelné</b>, takže jejich přítomnost neocení.</p>
  </li>
  
  <li>
    <p><b>Vyhledávače</b> potřebují a dovedou pochopit strukturu stránky i bez speciálních značek, protože nemají důvod stránky se sémantickými značkami upřednostňovat, když to <b>lidé neocení</b>.</p>
  </li>
  
  <li>
    <p>Pro starší prohlížeče se jedná o <b>neznámé značky</b>. V <b>IE 8</b> a starších se musí oživit JavaScriptem, aby vůbec šly stylovat.</p>
    
    <pre><code>&lt;!--[if lte IE 8]>
&lt;script>
var znacky = "article aside audio canvas datagrid datalist details dialog eventsource figure figcaption footer header hgroup mark menu meter nav output progress section time video";
znacky.replace(/\w+/g, function(znacka){document.createElement(znacka)});
&lt;/script>
<![endif]--></code></pre>
  </li>
  
  <li>
    <p><b>Pro tvůrce webu</b> také nic moc nezlepšují. Psát <code>&lt;header></code> nebo <code>&lt;div class="header"></code> vyjde prakticky nastejno.</p>
  </li>
</ol>

<p>V součtu tedy není moc důvod je používat.</p>

<p>Důvod pro používání je možná <b>zlepšení pro postižené uživatele</b> používající hlasové čtečky, které by mohly lépe pochopit strukturu.</p>


<p>Je ale k úvaze, jestli u čteček není situace stejná jako u vyhledávačů – <b>musí podporovat hromady starých stránek</b>, kde se HTML 5 značky nepoužívají, takže si s nimi musí poradit i bez zvláštní značek.</p>


<p>Větší přínos než zvláštní tagy by prý mohly mít <a href="/aria">ARIA</a> atributy.</p>

<!--<h2 id="odkazy">Odkazy jinam</h2>-->

