---
title: "AMP HTML ⚡"
headline: "AMP HTML ⚡"
description: "AMP HTML je způsob tvorby webu, při kterém je stránka dobře uzpůsobena rychlému načítání na mobilních zařízeních."
date: "2015-10-07"
last_modification: "2016-03-02"
status: 1
tags: ["html", "zrychlovani"]
format: "html"
---

<p>Zkratka <b>AMP</b> znamená <i lang="en">Accelerated Mobile Pages</i> (akcelerované mobilní stránky). Projekt má web na adrese <a href="https://www.ampproject.org/">ampproject.org</a>.</p>

<p>Anglické představení si je možné přečíst zde:</p>

<div class="external-content">
  <ul>
    <li>Accelerated Mobile Pages: <a href="https://www.ampproject.org/how-it-works/">A new approach to web performance</a></li>
  </ul>
</div>

<p>Ukázková kostra stránky vyhovující <b>principu AMP</b> je potom na <a href="https://github.com/ampproject/amphtml">GitHubu</a>.</p>


<h2 id="pointa">Hlavní myšlenka</h2>

<p>Mobilní připojení je stále značně slabší než u desktopů. Pokud web načítá hromady JavaScriptových knihoven, na pomalém přípojení se <b>stránka vůbec nemusí načíst</b> a obsah zobrazit. Přitom samotný obsah, kvůli kterému návštěvník hlavně přišel, by tolik dat nevyžadoval.</p>

<p>Accelerated Mobile Pages se tedy týká <b>převážně obsahových webů</b>. Na stránce může být z klasického HTML <b>pouze text</b>. Všechno ostatní se řeší <code>amp-*</code> komponentami – těmi se potom vkládají obrázky, videa, lightboxy, reklamy nebo meřicí skripty.</p>

<p>Věci <b>vyžadující JavaScript</b> se tak budou řešit prověřenými <b>AMP komponentami</b>.</p>




<div class="internal-content">
  <p>Snaha o rychlý obsah v podání Facebooku se jmenuje <a href="/facebook-instant-articles">Instant Articles</a>.</p>
</div>



<h2 id="pouzit">Použití</h2>

<p>Základem je následující <b>HTML kostra</b>.</p>

<pre><code>&lt;!doctype html>
&lt;html<b> ⚡</b>>
&lt;head>
  &lt;meta charset="utf-8">
  <b>&lt;link rel="canonical" href="hello-world.html"></b>
  &lt;meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,<b>minimal-ui</b>">
  <b>&lt;script src="https://cdn.ampproject.org/v0.js" async>&lt;/script></b>
  &lt;style>body {opacity: 0}&lt;/style>&lt;noscript>&lt;style>body {opacity: 1}&lt;/style>&lt;/noscript>
&lt;/head>
&lt;body>Hello World!&lt;/body>
&lt;/html></code></pre>









<p>Za povšimnutí stojí symbol blesku v značce <code>&lt;html></code>, nutnost použít <code>&lt;link rel="canonical"></code> (pro odkázání na normální HTML podobu) nebo použití <code>minimal-ui</code> v <code>&lt;meta name="viewport"></code>. Možnost <code>minimal-ui</code> jeden čas fungovala v mobilním iOS 7.1 (ve versi 8 byla zrušena) pro zmenšení rozhraní prohlížeče, což se hodilo u webových aplikací:</p>

<div class="external-content">
  <ul>
    <li>StackOverflow: <a href="http://stackoverflow.com/questions/24889100/ios-8-removed-minimal-ui-viewport-property-are-there-other-soft-fullscreen">iOS 8 removed “minimal-ui” viewport property, are there other “soft fullscreen” solutions?</a></li>
  </ul>
</div>


<p>Nakonec se připojuje samotný skript „AMP HTML“, ten má necelých <b>40 kB</b>.</p>

<ul>
  <li><p>Pro lepší cacheování se připojuje z <a href="/cdn">CDN</a>.</p></li>
  <li><p>Aby jeho připojení neblokovalo vykreslování stránky, má <a href="/async-defer#async">atribut <code>async</code></a>.</p>
  </li>
</ul>




<h2 id="komponenty">Vestavěné komponenty</h2>

<p>Cokoliv pokročilejšího než <b>běžný text</b> se řeší tzv. komponentami. Některé jsou vestavěné přímo v připojovaném skriptu:</p>

<ul>
  <li><p><code>&lt;amp-img></code> – pro vložení obrázku, funguje obdobně jako <code>&lt;img></code></p>
    <p>Proč nevkládat obrázek standardní cestou? Použití vlastní značky je kvůli <a href="/lazy-loading-obrazky">lazy loadingu</a> – obrázky se načtou, až když na ně návštěvník odroluje.</p>
  </li>
<li><p><code>&lt;amp-video></code> – náhrada HTML5 značky <code>&lt;video></code></p></li>    
  <li><p><code>&lt;amp-ad></code> –	slouží pro vložení reklamy (podporovány jsou reklamní systémy A9, AdReactor, AdSense, AdTech a Doubleclick)</p></li>
  <li><p><code>&lt;amp-pixel></code> – slouží pro počítadlo návštěv pomocí <a href="/ajax#pingnout">pingnutí 1×1px obrázku</a></p></li>

</ul>







<h2 id="externi-komponenty">Externí komponenty</h2>

<p>Další věci jako <a href="/lightbox">lightboxy</a>, vložení videa z <a href="/youtube">YouTube</a>, vložení obsahu z rámu a podobně se řeší <b>externími komponentami</b>.</p>

<p>To funguje tak, že se připojí další JavaScripty, které přidají potřebnou funkčnost.</p>


<p><img src="/files/amp-html/scripty.png" alt="Externí AMP komponenty" class="border"></p>











<p>Připojovat takovou spoustu skriptů se zdá být nerozumné. Při rozšířeném používání <i lang="en">Accelerated Mobile Pages</i> by ale všechny tyto knihovny v sobě měla už <b>cache prohlížeče</b>, takže by šlo používat hotové JS funkce bez načítání dalších dat.</p>


<div class="external-content">
  <ul>    
    <li><a href="http://kod.djpw.cz/hwqb-">Živá ukázka</a> – použití všech dostupných AMP komponent</li>
  </ul>
</div>



<h2 id="validace">Validace AMP HTML</h2>

<p>Po připojení skriptu jde provést kontrolu, jak si stránka stojí s představou AMP HTML. Validace se zapne přidáním <code>#development=1</code> do adresy stránky. <b>Výsledek validace se objeví v JS konsoli</b> ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a>:</p>

<p><img src="/files/amp-html/validace.png" alt="Validace AMP" class="border"></p>










<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/gwqb-#development=1">Živá ukázka</a> – prostá AMP stránka s textem a obrázkem</li>

  </ul>
</div>


<p>Připojit si na zkoušku AMP skript do existujícího webu může být docela zajímavé. Člověk se dozví, co jeho web <b>nesplňuje</b>.</p>



<h2 id="vyuziti">Využití</h2>

<p>Pro použití této technologie pro obsahový web vidím zásadní problém v nemožnosti použít:</p>

<ul>
  <li><b>obrázky</b> – značka <code>&lt;img></code> je zakázána a je otázka, jak obrázky vložené pomocí <code>&lt;amp-img></code> budou nalezitelné vyhledávači;</li>
  
  <li><b>formuláře</b> – i na obsahovém webu se občas hodí</li>
</ul>

<p>Další věc je, že je možné vytvořit <b>rychlejší a universální stránku</b> i bez použití AMP HTML.</p>

<p>Pro stránky, které se na mobilech načítají pomalu, to ale může být impuls ke změně.</p>


<h2 id="odkazy-amp">Odkaz na AMP versi</h2>

<p>Stránky v AMP HTML dává smysl vytvářet spíš jako zvláštní podobu původních článků. Podobně jako například u RSS.</p>

<p>Aby se lidé a vyhledávače dozvěděli, že web existuje v AMP, existuje <code>rel="amphtml"</code>:</p>

<pre><code>&lt;link rel="amphtml" href="/html-podoba-clanku"></code></pre>

<p>Pro klasické <a href="/odkaz">HTML odkazy</a> se potom nabízí:</p>

<pre><code>&lt;a rel="amphtml" href="/html-podoba-clanku">
  Odkaz na AMP
&lt;/a></code></pre>





<div class="soft">
  <p>Původně článek vyšel 8. října 2015, zbytek je aktualisace z <b>2. března 2016</b>:</p>
</div>

<h2 id="rychlost">Je AMP rychlejší?</h2>

<p>Použít AMP automaticky neznamená, že bude stránka rychlejší než v obyčejném HTML. Při splnění AMP pravidel bude stránka sice patřit k rychlejším; bez AMP by ale na tom teoreticky mohla být ještě lépe (minimálně o dobu stahování <code>*.js</code> souboru s AMP).</p>

<p>Člověk, který ví, co dělá, dokáže vytvořit rychlejší web v obyčejném HTML. Pro ostatní je ale AMP vodítko, jak udělat stránku „dostatečně rychlou“.</p>

<div class="external-content">
  <ul>
    <li><a href="http://webdesign.tutsplus.com/articles/amp-project-will-it-make-your-sites-faster--cms-25853">AMP Project: Will it Make Your Sites Faster?</a> – srovnávací test rychlosti s/bez AMP</li>
  </ul>
</div>






<h2 id="seo">Vliv na SEO</h2>

<p><a href="/google">Google</a> začal AMP weby označovat ve výsledcích vyhledávání.</p>

<p>Prozatím nemají mít AMP weby přednost ve výsledcích hledání, nicméně je možné, že označení webu jako AMP bude mít vliv na uživatele vyhledávače, které budou tyto weby upřednostňovat před obyčejnými stránkami.</p>

<p>Je k úvaze, zda se časem kvůli <i>AMP ikonce</i> nebudou rychlé weby zpomalovat AMP skripty…</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Adactio.com: <a href="https://adactio.com/journal/9646">AMPed up</a></li>
  
  <li>Vzhůru dolů: <a href="http://www.vzhurudolu.cz/blog/40-amp">AMP opravuje a zároveň rozbíjí World Wide Web</a></li>
</ul>