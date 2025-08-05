---
title: "CSS pro IE"
headline: "Zvláštní CSS pro IE"
description: "Jak odlišit Internet Explorer od ostatních prohlížečů a vytvořit zvláštní CSS jen pro IE."
date: "2014-01-02"
last_modification: "2017-11-25"
status: 1
tags: ["css", "hacky", "webove-prohlizece"]
format: "html"
---

<p>Při vytváření webu se lze snadno setkat s nejednotnostmi při <a href="/prohlizece">testování napříč prohlížeči</a> (<a href="/prohlizece-optimalisace">Pro které prohlížeče optimalisovat?</a>). Leckoho potom může napadnout vytvořit pro problematický prohlížeč <b>zvláštní HTML, CSS nebo JavaScript</b>.</p>

<p>Předně je dobré upozornit, že ideální je psát pokud možno <b>jednotný kód</b>. Tedy například v případě, že nějaká část webu má v některém z prohlížečů jiný rozměr, pokusit se <b>odhalit příčinu</b> než pro různé prohlížeče zadat různé rozměry.</p>

<h2 id="caste-problemy">Řešení častějších rozdílů</h2>
<p>V případě nejednotnosti vzhledu napříč prohlížeči je možné zkoušet následující <b>obecné postupy</b>.</p>

<ol>
  <li>
    <p>Sjednotit <a href="/doctype">vykreslovací režim</a>, který zabrání <a href="/box-model">odlišnému počítání rozměrů boxů</a>. Většinou pomůže mít na první řádce kódu správný <a href="/doctype"><code>&lt;!doctype></code></a>:
    </p>
    <pre><code>&lt;!doctype html></code></pre>
    
    
    
    
    
    
    
    <p>Odlišené počítání rozměrů se týká pouze <b>IE 9</b> a starších (nebo novějších <b>IE</b> při zapnutí režimu kompatibility).</p>
  </li>
  <li>
    <p>Srovnání různých výchozích <code>margin</code>ů a <code>padding</code>ů. Může pomoci <a href="/css-reset">CSS reset</a>.
    </p>
    
    <p>Nejjednodušší je tyto vlastnosti globálně vynulovat.</p>
    <pre><code>* {margin: 0; padding: 0}</code></pre>
    
    <p>Nechávat tuto konstrukci v kódu po odhalení problému ale příliš nedoporučuji, protože vynulování bude často nežádoucí. Obvykle bývají výchozí nejednotné hodnoty pořád lepší než odsazení žádné.</p>
  </li>
  <li>
    <p>
      Značné rozdíly panují u <a href="/stylovani-inputu">stylování formulářových políček</a>.
    </p>
  </li>

  
  <li>
    <p>Jako <i>poslední záchrana</i> občas pomůže <code>overflow: hidden</code>.</p>
    <pre><code>element {overflow: hidden}</code></pre>
  </li>
  
  
  
    <li>
    <p>V dávných dobách <b>IE 7</b> a starších občas problémy odstraňovalo zapnutí <a href="/haslayout"><code>hasLayout</code></a>u.</p>
    <pre><code>problematicky-element, problematicky-element * {zoom: 1}</code></pre>
  </li>
</ol>

<p>V případě, že nic z toho nezafunguje a chybí čas nebo trpělivost problém dále zkoumat, přichází na řadu naservírování odlišného kódu v závislosti na prohlížeči.</p>














<h2 id="css-pro-ie">CSS hacky pro IE</h2>

<h3 id="ie-11">IE 10, 11</h3>

<p>Pro <b>Internet Explorer 10–11</b> jde využít <a href="/media"><code>@media</code></a> pravidlo <code>hight-contrast</code> s <a href="/css-prefixy">prefixem</a>:</p>

<pre><code>@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
   /* style pro IE 10-11 */
}</code></pre>












<h3 id="selektorove">IE 9, IE 10 — Selektorové hacky</h3>
<p>Novější Internet Explorery lze odlišit na základě znalosti pokročilejších <a href="/css-selektory">CSS selektorů</a>.</p>

<p>Hezky se k tomu dá zneužít třeba <a href="/css-selektory#korenovy"><code>:root</code></a>, který funguje až od <b>IE 9</b>. Ve starších prohlížečích se proto daná vlastnost neprojeví (<a href="http://kod.djpw.cz/exab">ukázka</a>).</p>

<pre><code>element {color: blue} /* vlastnosti pro IE 8 a starší */
:root element {color: red} /* IE 9+ */</code></pre>










<p>Pro <b>IE 10</b> jde zase zneužít třeba selektor <a href="/css-selektory#required"><code>:required</code></a>, který ve starších prohlížečích nefunguje (<a href="http://kod.djpw.cz/dxab">ukázka</a>).</p>

<p>Jelikož v <b>IE 8</b> tyto selektory ještě nefungují, je možné vytvořit sestavu, co nabídne pro IE 7, 8, 9 a 10 různou podobu (<a href="http://kod.djpw.cz/gxab">ukázka</a>).</p>

<pre><code>element {color: red /* IE 8 */; =color: blue /* IE 7 */}
:root element {color: green /* IE 9 */}
input.hack {display: none}
input.hack:required + element {color: yellow /* IE 10+ */}</code></pre>







<h3 id="rovnitko">IE 7 — rovnítkový hack</h3>
<p>V případě, že nějaká vlastnost má platit jen v <b>IE 7</b>, není nic jednodušší než před ním připsat rovná se (<a href="http://kod.djpw.cz/zwab">ukázka</a>).</p>
<pre><code>element {<b>=</b>color: red}</code></pre>











<h2 id="podminene-komentare">Podmíněné komentáře (IE 9)</h2>
<p>Další způsob, jak naservírovat <b>pro IE jiné CSS</b>, jsou <a href="/podminene-komentare">podmíněné komentáře</a>. Nefungují ale už v <b>IE 10</b>. Jen když se přepne <a href="/podminene-komentare#ie10">zobrazovací režim</a> a tím <b>IE 10</b> <i>poníží</i> na starší.</p>

<p>Podmíněné komentáře se zapisují do HTML kódu, ale není problém pomocí nich připojit CSS soubor jen pro podporovaný <b>Internet Explorer</b> (novější prohlížeče než <b>IE 9</b> považují podmíněné komentáře za <b>obyčejný HTML komentář</b>).</p>

<pre><code>&lt;!--[if lt IE 9]>
	&lt;link rel="stylesheet" type="text/css" href="ie8.css">
&lt;![endif]--></code></pre>

<p>Když už se ale má tento hack použít, přijde mi elegantnější nastavit třídu „<code>ie</code>“ nějakému <a href="/stylovani-body">společnému obalu</a> a v CSS psát:</p>

<pre><code>.ie element {/* Vlastnosti pro IE */}</code></pre>

<p>Ušetří se tím HTTP požadavek na další soubor v příslušných Explorerech.</p>


















<h2 id="detekce">Detekce z hlavičky <code>user-agent</code></h2>
<p>Na straně serveru (např. v PHP) nebo na straně klienta (v JavaScriptu) je možné přečíst hlavičku <code>user-agent</code> a uhodnout z ní prohlížeč návštěvníka.</p>

<p>Použitelně vypadá <a href="https://github.com/piwik/device-detector">Device Detection library</a> z analytického nástroje Piwik.</p>

<p>Elegantněji moc <b>spolehlivě</b> prohlížeče odlišovat nelze. Kvůli tomu, že se občas hackování pomocí detekce <code>user-agenta</code> používá, musejí tvůrci prohlížečů při vytvoření nové verse volit <code>user-agent</code> s ohledem, aby se pokud možno <b>nerozbily starší weby</b>.</p>

<p>Třeba <a href="/ie11">IE 11</a> už v této hlavičce <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=5&amp;topic=153994">nemá</a> charakteristické <code>MSIE</code>, ale jméno a číslo jádra — <code>Trident/7.0</code>.</p>






<h3 id="js">User-agent v JavaScriptu</h3>
<p>Informace o prohlížeči je v <code>navigator.userAgent</code>.</p>

<p>Používáte prohlížeč:</p>

<div class="live">
  <p id="ua"></p>
  <script>document.getElementById("ua").innerHTML = navigator.userAgent</script>
</div>

<p>(Jinak při nejednotnostech v JavaScriptu je lepší detekovat přímo <b>konkrétní vlastnosti</b> než versi prohlížeče. V CSS k tomu bylo dokonce zavedeno <a href="/supports">pravidlo <code>@supports</code></a>.)</p>






<h3 id="php">User-agent v PHP</h3>
<p>V PHP je stejná hlavička dostupná přes <code>$_SERVER['HTTP_USER_AGENT']</code>.</p>

<p>Ještě existujte PHP funkce <a href="http://php.net/manual/en/function.get-browser.php"><code>get_browser</code></a>, ale málo kde funguje.</p>

<p>Podmínky pro různé <b>IE</b> mohou vypadat následovně:</p>

<pre><code>if (strpos($_SERVER['HTTP_USER_AGENT'], 'Trident/7.0') !== false) // IE 11
elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 10') !== false) // IE 10
elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 9') !== false) // IE 9
elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 8') !== false) // IE 8
elseif (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 7') !== false) // IE 7</code></pre>














<h3 id="ua-css">User-agent v CSS</h3>

<p>Docela zajímavé řešení je předat si celou hodnotu <code>user-agent</code> hlavičky do nějakého rodičovského HTML elementu (třeba <code>&lt;html></code>):</p>

<pre><code>&lt;html data-user-agent="Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)"></code></pre>





<p>V CSS jde potom použít <a href="/css-selektory#atributovy-obsahujici">hvězdičkový atributový selektor</a>:</p>


<pre><code>body[data-user-agent*="MSIE 10"] .ie {
    /* styly pro IE */
}</code></pre>







<p>Doplnit hodnotu user-agenta do data-atributu jde na straně serveru prostým vypsáním nebo v JavaScriptu z objektu <a href="/ua#js"><code>navigator</code></a>:</p>

<pre><code>document.body.setAttribute("data-user-agent", navigator.userAgent);</code></pre>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/fykc-">Živá ukázka</a> – selektory závislé na user-agentovi</li>
  </ul>
</div>


<h2 id="stary-prohlizec">Hláška „máte starý prohlížeč“</h2>
<p style="background: #F3E8A3; border: 1px solid #DCBF1D; padding: 1em">Používáte starý prohlížeč, přejděte na moderní, bezpečný, rychlý a superskvělý <b>Fytopuf 18</b>.</p>

<p>Před umístěním obdobné hlášky, že web funguje jen v nějakém prohlížeči, doporučuji dobře zvážit, zda nestojí za to problémy raději <b>odstranit</b>.</p>

<p>V drtivé většině případů se vyplatí zobrazit stránku alespoň nějak špatně než vůbec. Proto je nutno brát ohled na to, aby se některé prohlížeče nebo dokonce <b>vyhledávače</b> od stránky <i>neodřízly</i>.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://browserhacks.com">BROWSERHACKS
</a> – rozsáhlý přehled hacků pro jednotlivé prohlížeče s možností filtrování</li>
</ul>