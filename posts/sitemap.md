---
title: "Vložení sitemap na Seznam a Google"
headline: "Jak přidat sitemapu do Seznamu a Google"
description: "Mapu webu v souboru <code>sitemap.xml</code> je vhodné přidat do Googlu, Seznamu nebo Bingu. Jak na to?"
date: "2014-10-16"
last_modification: "2015-12-26"
status: 1
tags: ["bing", "google", "seo", "seznam"]
format: "html"
---

<p>V případě rozsáhlejšího webu se hodí vytvořit jeho <b>strojově čitelnou mapu</b> – tzv. soubor sitemap.</p>


<h2 id="proc">Proč mapu webu vytvářet</h2>

<p><i>Sitemapa</i> není rozhodně nezbytná součást webu. Může se ale hodit pro <b>usnadnění procházení webu vyhledávači</b>.</p>

<p>Normálně roboti vyhledávačů procházejí jednotlivé stránky a v kódu hledají <a href="/odkaz">odkazy <code>&lt;a href></code></a> na další stránky, které by ještě mohly <b>zaindexovat</b>.</p>

<p>Vygenerovaná mapa webu <code>sitemap.xml</code> potom obsahuje strojově čitelný seznam všech adres webu – to může vyhledávači usnadnit <b>nacházení nových stránek</b> – pro objevení nových stránek stačí porovnat adresy v souboru <code>sitemap.xml</code>.</p>

<p>Mapa webu se hodí i v případě, kdy na všechny podstránky <b>nevedou odkazy</b> nebo jsou hodně <i>zahrabané</i> v struktuře webu. Ideální ale samozřejmě je se tomuto stavu vyhnout.</p>



<blockquote>
  <p>Podle mých testů je v Googlu vyhledatelná i stránka, na kterou nevede žádný odkaz, ale je v <code>sitemap.xml</code>, u Seznamu ne.</p>
</blockquote>




<h2 id="co">Co to je <code>sitemap.xml</code>?</h2>

<p>Mapa webu je <b>XML soubor</b> obsahující primárně <b>adresy</b> jednotlivých stránek. Kromě URL jde uvést i další věci jako datum poslední úpravy, prioritu stránky nebo frekvenci četnosti změn.</p>

<p>Zpravidla se mapa webu nachází na adrese:</p>

<pre><code>example.com/<b>sitemap.xml</b></code></pre>



<p>Ale není to podmínkou.</p>




<h3 id="priklad">Příklad sitemapy</h3>

<p>Příklad jedné <code>&lt;url></code> položky v mapě webu (všechny adresy se vkládají do nadřazené značky <code>&lt;urlset></code>):</p>

<pre><code>&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  &lt;url>
    &lt;loc>http://jecas.cz/sitemap&lt;/loc>
    &lt;lastmod>2015-12-26T08:10:11+00:00&lt;/lastmod>
    &lt;changefreq>always&lt;/changefreq>
    &lt;priority>1.0&lt;/priority>
  &lt;/url>
&lt;/urlset></code></pre>








<h3 id="nazev-souboru">Musí se jmenovat <code>sitemap.xml</code>?</h3>

<p>XML soubor s mapou webu může mít libovolné jméno nebo příponu. Používat <code>sitemap.xml</code> je jen zažitá konvence.</p>

<p>Mapu webu je klidně možné <b>dynamicky generovat</b> v <a href="/php">PHP</a> a podobně – většinou se tak i děje, protože sestavovat stovky nebo tisíce položek ručně není reálné. Jen je potřeba souboru přidat hlavičku <code>Content-Type: application/xml</code>.</p>

<p>Je-li získání všech stránek časově náročné, je lepší mapu webu generovat do statického souboru při každé změně (přidávání/odebírání/upravování stránek).</p>





<h2 id="velikost">Maximální velikost mapy webu</h2>

<p>Podle <a href="http://www.sitemaps.org/protocol.html#index">specifikace</a> je omezení velikosti mapy webu následující:</p>

<ul>
  <li>Maximálně <b>50 000 URL</b>.</li>
  
  <li>Datová velikost do <b>10 MB</b> před gzip kompresí. Google má datový limit 50 MB.</li>
</ul>


<h3 id="sitemapindex">Sitemap index</h3>

<p>Pokud jeden nebo oba limity nestačí, je potřeba seznam adresy <b>rozdělit do více souborů</b>.</p>

<p>K tomu slouží tzv. <i>sitemapindex</i>. Do souboru <code>sitemap.xml</code> se neuvedou URL stránek ale odkazy na dílčí mapy webu. Ty jde různě rozdělit třeba podle měsíců:</p>


<pre><code>&lt;sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  &lt;sitemap>
    &lt;loc>
      http://example.com/sitemap-2015-12.xml
    &lt;/loc>
  &lt;/sitemap>
&lt;/sitemapindex></code></pre>







<p>Odkazovaný soubor <code>sitemap-2015-12.xml</code> už potom obsahuje odkazy na stránky webu.</p>

<p>Sitemap index se může pro jistotu používat i pro menší počty URL.</p>




<h2 id="robors">Sitemapa v <code>robots.txt</code></h2>

<p>Soubor <code>robots.txt</code> umožňuje předat pokyny robotům vyhledávačů, jde do něj i umístit odkaz na mapu webu:</p>

<pre><code>Sitemap: http://example.com/<b>sitemap.xml</b></code></pre>




<h2 id="wordpress">Vytvoření sitemapy ve Wordpressu</h2>

<p>Pro redakční systém <a href="/wordpress">WordPress</a> existuje plugin <b>Google XML Sitemaps</b>. Stránky v mapě webu rozděluje po měsících, dokáže po přidání nebo úpravě článku dát vědět Google nebo Bingu o změně. Zároveň přidává odkaz na <i>sitemap</i> do <code>robots.txt</code>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://wordpress.org/plugins/google-sitemap-generator/">Google XML Sitemaps</a> – stránka pluginu na Wordpress.org</li>
  </ul>
</div>


<h2 id="seznam">Přidat sitemap na Seznam</h2>

<p>Seznam nenabízí žádný <b>formulář pro vložení/načtení sitemapy</b> jako existuje třeba pro <a href="/pridat-url">ruční přidání URL</a>. Jediná možnost, jak ho informovat o vytvoření mapy webu, je uvést tuto informaci v souboru <code>robots.txt</code>:</p>



<p>Slouží k tomu prosté:</p>

<pre><code>Sitemap: http://example.com/<b>sitemap.xml</b></code></pre>


<p>Doporučení ohledně <b>používání mapy webu na Seznamu</b>:</p>

<div class="external-content">
  <ul>
    <li>Seznam.cz nápověda: <a href="http://napoveda.seznam.cz/cz/sitemaps/">Sitemaps</a></li>
  </ul>
</div>




<h2 id="google">Google</h2>

<p>Google má formulář pro nahrání mapy webu ve své službě pro webmastery <b>Search Console</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.google.com/webmasters/">Google Search Console</a></li>
  </ul>
</div>

<p>V <i>Procházení</i> → <i>Soubory Sitemap</i> je vpravo nahoře tlačítko <i>Přidat/otestovat soubor sitemap</i>:</p>

<p><img src="/files/sitemap/google-sitemap.png" alt="Přidání sitemapy do Google" class="border"></p>





























<div class="external-content">
  <ul>
    <li>Google Search Console Help: <a href="https://support.google.com/webmasters/answer/183668?hl=en&amp;topic=8476">Build a sitemap</a></li>
  </ul>
</div>

<h2 id="bing">Bing</h2>

<p>Vyhledávač <b>Bing</b> má podobně jako <b>Google</b> nástroje pro webmastery.</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.bing.com/webmaster">Nástroje pro správce webů Bing</a></li>
  </ul>
</div>

<p>Sitemapu jde přidat po vybrání webu v nabídce <i>Konfigurace mého webu</i> → <i>Soubory Sitemaps</i>:</p>

<p><img src="/files/sitemap/bing-sitemap.png" alt="Přidání sitemapy do Bingu" class="border"></p>


























<h2 id="jine">Jiné využití <code>sitemap.xml</code></h2>

<p>Kromě vyhledávačů může mapa webu posloužit i nástrojům pro vytěžování obsahu stránek. V mapě webu mají kompletní seznam všech URL webu na zlatém podnose.</p>





<h2 id="rss">RSS vs. sitemap</h2>

<p>Vyhledávače dokáží jako strojově čitelný zdroj obsahu použít i RSS/Atom exporty. Ty ale většinou kvůli úsporám přenášení dat obsahují pouze několik nejnovějších záznamů.</p>

<p>V <code>sitemap.xml</code> bývá seznam všech stránek.</p>






<h2 id="html">HTML mapa webu</h2>

<p>Protože v XML souboru <code>sitemap.xml</code> si lidský návštěvník moc nepočte, některé weby obsahují mapy webu i v HTML podobě pro lidi.</p>


<p>Při určitém počtu stránek a stromové struktuře to může být užitečné. U webu se stovkami stránek a nejasnou hierarchií je asi pohodlnější způsob navigace <b>interní vyhledávání</b>.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Sitemaps.org: <a href="http://www.sitemaps.org/protocol.html">Sitemaps XML format</a></li>
  
  <li>Wikipedie: <a href="http://cs.wikipedia.org/wiki/Sitemap">Sitemap</a></li>
</ul>