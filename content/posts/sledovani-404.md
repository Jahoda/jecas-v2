---
title: "Sledování chyb 404"
headline: "Sledování 404 chybových stránek"
description: "Jak zjistit adresy, které neexistují a končí chybovou stránkou 404 a co s nimi udělat."
date: "2015-07-21"
last_modification: "2015-07-26"
status: 1
tags: ["ga", "napady", "wordpress"]
format: "html"
---

<p>U každého navštěvovanějšího webu se dřív nebo později stane, že se návštěvník dostane na adresu, pro kterou <b>neexistuje obsah</b>.</p>

<p>Zobrazení neexistujícího obsahu může být způsobeno třemi způsoby:</p>

<ol>
  <li><b>Autorem webu</b>, který nějaký obsah smaže, změní mu URL nebo udělá chybu v odkazu.</li>
  
  <li><b>Návštěvníkem webu</b>, který se pokusí adresu ručně zadat nebo udělá chybu při odkazování na web.</li>
  
  <li><b>Robotem</b> snažícím se navštívit URL, které používají známé redakční systémy (např. adresa <code>wp-admin</code> – administrace <a href="/wordpress">WordPressu</a>).</li>
</ol>


<p>Z těchto důvodů je dobré mít o <b>404 chybách přehled</b>. Pro jejich zjištění jde použít následující způsoby:</p>


<h2 id="ga">Google Analytics</h2>

<p>Pokud se na stránce měří návštěvnost službou <a href="/ga">Google Analytics</a>, je skoro vyhráno. Tedy v případě, že chybová stránka má <b>titulek, podle kterého ji lze jednoznačně identifikovat</b> – například:</p>

<ul>
  <li><i>Stránka nebyla nalezena</i>,</li>
  <li><i>Stránka nenalezena</i>,</li>
  <li><i>Nenalezeno</i>,</li>
  <li><i>404 Not Found</i>,</li>
  <li><i>404 stránka nenalezena</i></li>
</ul>





<p><b>Titulek stránky</b> se nachází zpravidla nad adresním řádkem:</p>

<p><img src="/files/sledovani-404/titulek-prohlizec.png" alt="Titulek v adresním řádku" class="border"></p>




<p>Nebo jde získat ze zdrojového kódu stránky:</p>

<p><img src="/files/sledovani-404/titulek.png" alt="Titulek stránky ve zdrojovém kódu" class="border"></p>









<p>Tento titulek následně stačí vyhledat v Google Analytics ve volbě <i>Chování → Obsah webu → Všechny stránky → Název webu</i> a do <b>vyhledávacího políčka</b> zadat titulek <b>stránky 404</b>.</p>

<p><img src="/files/sledovani-404/nazev-stranky.png" alt="Vyhledání názvu stránky v Google Analytics" class="border"></p>










<p>Po vyhledání by se měl objevit jediný výsledek, který po rozkliknutí zobrazí <b>adresy, které k chybové stránce vedly</b>.</p>

<p>Pro jecas.cz to za jeden rok vypadá následovně:</p>

<p><img src="/files/sledovani-404/neexistujici-stranky.png" alt="Neexistující stránky" class="border"></p>





























<p>V případě, že by nějaká URL měla <b>hodně zobrazení</b>, dávalo by smysl na ní vytvořit relevantní obsah nebo ji na relevantní obsah <b>trvale přesměrovat</b>.</p>


<p>Pro pozdější pohodlné sledování chybových adres je dobré si pro tento výpis <b>vytvořit zkratku</b>:</p>

<p><img src="/files/sledovani-404/zkratka.png" alt="Přidání zkratky" class="border"></p>








<p>Stačí jen zadat název:</p>

<p><img src="/files/sledovani-404/pridani-zkratky.png" alt="Přidání zkratky" class="border"></p>















<h3 id="ga-jiny">Události v Google Analytics</h3>

<p>Pokud nemá chybová stránka <b>unikátní titulek</b> a je problém ho změnit, jde informaci o navštívení neexistující adresy zaznamenávat pomocí událostí v Google Analytics:</p>

<div class="internal-content">
  <ul>
    <li><a href="/ga-mereni#mereni-udalosti">Měření událostí v Google Analytics</a></li>
  </ul>
</div>


<h2 id="wordpress">404 chyby ve WordPressu</h2>

<p>Monitorování chyb 404 nabízí například doplněk <b>SEO Ultimate</b>. Tento plugin obsahuje i spoustu dalších funkcí.</p>

<p><img src="/files/sledovani-404/404-monitor.png" alt="Přidání zkratky" class="border"></p>






















<p><b>404 Monitor</b> potom loguje všechny adresy, které vedly k chybě 404. K chybové adrese jde zobrazit i odkazující stránku a <a href="/ua">hlavičku user-agent</a>.</p>

<p><img src="/files/sledovani-404/404.png" alt="404 monitor" class="border"></p>


































<h2 id="nette">Chybové stránky v Nette</h2>

<p>Základní kostra (<i>sandbox</i>) <a href="http://nette.org">Nette Frameworku</a> automaticky loguje 404 chyby. Standardně jsou ukládány do souboru <code>log/access.log</code>.</p>

<p>Tento soubor je asi dobré čas od času smazat, protože může záhy <b>narůst do značných rozměrů</b>.</p>

<p>Vytvořený záznam po přístupu na neexistující stránku může vypadat následovně:</p>

<pre><code>[2015-07-24 14-09-35] 
HTTP code 404:  in ArticlePresenter.php:34  
@  http://jecas.cz/nesmysl</code></pre>









<h2 id="access">Access log</h2>

<p>Webové servery obvykle vytváří seznam se všemi <b>přístupy na soubory</b> umístěné na stránce. V seznamu logů je uveden i <b>kód odpovědi</b> – např.:</p>


<ul>
  <li>200 – stránka se úspěšně načetla,</li>
  <li>301 – přesměrování,</li>
  <li>404 – nenalezeno</li>
</ul>



<p>U webového <b>serveru Apache</b> může jeden záznam logu vypadat takto (pro přehlednost rozděleno na řádky):</p>

<pre><code>68.180.230.246 - - 
[24/Jul/2015:01:13:10 +0200] 
"GET /pozadovana-adresa HTTP/1.1" 
<b>404</b> 
1316 
"odkazujici-stranka" 
"Mozilla/5.0"</code></pre>







<p>Stačí z něj tedy vyfiltrovat přístupy s kódem 404.</p>

<p>Celý řádek access logu obsahuje:</p>

<ul>
  <li>IP adresu,</li>
  <li>datum,</li>
  <li>požadovanou URL a typ požadavku – GET/POST,</li>
  <li>kód odpovědi,</li>
  <li>velikost odpovědi v bytech,</li>
  <li>odkazující stránku – <a href="/referer">referrer</a>,</li>  
  <li>identifikátor prohlížeče <a href="/ua">user-agent</a></li>
</ul>






<p>Související odkazy:</p>

<div class="external-content">
  <ul>
    <li>Jak psát web: <a href="http://www.jakpsatweb.cz/seo/logy.html">Logy ze serveru</a></li>
    <li>Apache HTTP Server Version 2.2: <a href="https://httpd.apache.org/docs/2.2/logs.html">Log Files</a></li>
    <li>StackOverflow: <a href="http://stackoverflow.com/questions/9234699/understanding-apache-access-log">Understanding Apache Access Log</a></li>
  </ul>
</div>


<h2 id="search-console">Google Search Console</h2>

<p>Nefunkční stránky z pohledu <a href="/google">Googlu</a> jde zjistit pomocí nástroje <i>Search Console</i> (dříve Google Webmaster Tools):</p>


<p><img src="/files/sledovani-404/search-console.png" alt="404 v Search Console" class="border"></p>



























<p>Po výběru zkoumaného webu je tato možnost v <i>Procházení → Chyby procházení → Nenalezeno</i>.</p>

<p>Jednotlivé adresy jde rozkliknout a dozvědět se více podrobností – zejména <b>odkud se na neexistující stránku odkazuje</b>:</p>

<p><img src="/files/sledovani-404/nenalezeno.png" alt="Nenalezený obsah v GWT" class="border"></p>





















<h2 id="xenu">Kontrola odkazů programem Xenu</h2>

<p>Program <a href="http://home.snafu.de/tilman/xenulink.html">Xenu</a> dokáže projít web a hledat na něm <b>nefunkční odkazy</b>.</p>

<p>Jde tak odhalit <b>interní odkazy</b>, které končí chybou 404.</p>




<h2 id="seo">Vliv chybových stránek na SEO</h2>

<p>Google ignoruje obsah chybových stránek. Chybovou stránkou je myšleno cokoliv, co vrací hlavičku <i>404 Not Found</i> nebo <i>410 Gone</i>.</p>

<p>Obsah 404 stránky je tedy pouze pro <b>návštěvníka</b>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/google-404">Google ignoruje obsah „404 stránky“</a></li>
  </ul>
</div>




<!--
<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://www.lunametrics.com/blog/2014/08/19/404-errors-google-analytics-google-tag-manager/">Access 404 Error Metrics Using Google Tag Manager</a></li>
</ul>
-->