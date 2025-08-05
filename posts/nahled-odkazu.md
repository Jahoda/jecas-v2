---
title: "Náhled webu při sdílení na sociálních sítích"
headline: "Náhled odkazu při sdílení na sociálních sítích"
description: "Jak upravit stránku, aby se hezky zobrazovala při sdílení na Facebooku a Twitteru."
date: "2015-02-13"
last_modification: "2016-01-13"
status: 1
tags: ["facebook", "odkazy", "twitter"]
format: "html"
---

<p>Významným zdrojem návštěvnosti mohou být kromě přístupů z <a href="/seo">vyhledávání</a> i <b>sociální sítě</b>. Když už se někomu stránka zalíbí natolik, aby ji sdílel, lze vhodnou úpravou webu napomoci, aby by sdílený odkaz maximálně lákavý pro ostatní.</p>

<div class="internal-content">
  <ul>
    <li><a href="/sdileci-tlacitka">Tlačítka pro sdílení na sociálních sítích</a> – jak je elegantně přidat na web</li>
  </ul>
</div>

<h2 id="facebook">Náhled odkazu na Facebooku</h2>

<p><a href="/facebook">Facebook</a> je často schopný odkazu zajistit přijatelnou podobu podobu i bez zvláštních úprav. Náhled odkazu by měl vypadat nějak takto:</p>


<p><img src="/files/nahled-odkazu/fb-nahled.png" alt="Náhled sdíleného odkazu" class="border"></p>












<p>Pro ověření výsledku existuje nástroj:</p>
<!-- stará URL: https://developers.facebook.com/tools/debug/og/object/ -->
<p><a href="https://developers.facebook.com/tools/debug" class="button">Open Graph Object Debugger</a></p>

<p>To je hodně užitečné, protože <b>výsledky náhledu odkazu</b> se ukládají do cache a pomocí <i>Open Graph Object Debugger</i> jde načíst vždy aktuální podobu.</p>

<p><img src="/files/nahled-odkazu/debugger.png" alt="Zobrazení náhledu stránky" class="border"></p>














<p>Tento nástroj ale neukazuje 100% to samé, co se zobrazí při skutečném sdílení – k tomu je nutné vložit URL do příspěvku na Facebooku. Pro načtení nových informací se ale <i>Open Graph Object Debugger</i> hodí.</p>

<p>V řadě případů si Facebook dokáže s načtením náhledu stránky bez problémů poradit, aniž by se na webu cokoliv optimalisovalo.</p>

<ol>
  <li>Titulek si dokáže vyzobnout ze značky <code>&lt;title></code>.</li>
  <li>Popisek zase z <a href="/odstavec">odstavce <code>&lt;p></code></a>.</li>
  <li>Obrázky si najde ve značkách <code>&lt;img></code>.</li>
</ol>

<p>Pokud výsledek není optimální, je potřeba tomu trochu pomoci…</p>




<h3 id="facebook-obrazek">Obrázek</h3>

<p>Robot Facebooku dokáže obrázky <b>vhodné velikosti</b> vyzobat ze stránky, takže člověk, co odkaz sdílí, mezi těmito obrázky má na výběr.</p>

<p>Lidé jsou ale pohodlní nebo nemusí o možnosti listovat obrázky vědět, proto je dobré napomoci tomu, aby se jako první obrázek <b>nabídl ten nejlepší</b>.</p>





<p>Nabídnout obrázek jde speciální <code>&lt;meta></code> značkou „<code>og:image</code>“:</p>

<pre><code>&lt;meta property="og:image" content="http://example.com/url-obrazku.png"></code></pre>



<p>Facebook vyžaduje obrázek velký alespoň <b>200 × 200 pixelů</b>. Jinak ho u odkazu nezobrazí, i když je určen <code>&lt;meta></code> značkou.</p>

<p>Jediná možnost, jak přidat k odkazu obrázek menší, je jeho ruční upload při sdílení odkazu.</p>

<p><img src="/files/nahled-odkazu/fb-nahrano.png" alt="Nahrání obrázku sdíleného odkazu" class="border"></p>




















<p>Pro zobrazení většího náhledu (obrázek nad titulkem a popisem) je potřeba obrázek velký alespoň <b>600 × 315 pixelů</b>. Náhled s větším obrázkem potom vypadá nějak takto:</p>

<p><img src="/files/nahled-odkazu/fb-nahled-velky.png" alt="Náhled sdíleného odkazu" class="border"></p>























<p>Pro displaye s vysokým rozlišením může být obrázek klidně dvakrát větší – <b>1200 × 630 px</b>. Pro jiné rozměry se je dobré držet poměru <b>1.91:1</b>.</p>


<p>Podle mých testů se na desktopu obrázek zobrazuje v maximální velikosti <b>470 × 246 pixelů</b>, ale toto číslo se může měnit.</p>

<p>Ony vůbec potřebné rozměry nejsou tak striktní, jak Facebook uvádí. I menší obrázek se může dobře zobrazit. Pro vyšší jistotu do budoucna je ale asi lepší dodržet doporučené rozměry.</p>




<h3 id="titulek-popisek">Titulek a popisek</h3>

<p>Dále se při sdílení zobrazuje titulek a úryvek webu. I tyto věci umí Facebook získat automaticky:</p>

<ul>
  <li>Titulek ze značky <code>&lt;title></code>.</li>
  
  <li>Úryvek webu z <code>&lt;meta name="description"></code> nebo si ho přímo najít na stránce.</li>
</ul>

<p>Rovněž je lze přímo nastavit <code>og:</code> značkami:</p>

<dl>
  <dt>Titulek</dt>
  <dd>
    <pre><code>&lt;meta property="og:title" content="Titulek"></code></pre>
  </dd>
  <dt>Popisek</dt>
  <dd>
    <pre><code>&lt;meta property="og:description" content="Popisek"></code></pre>
  </dd>  
</dl>

<p>Nastavit pro Facebook jiný titulek nebo popisek, než má konkrétní stránka, se může hodit pro dosažení vyšší míry prokliku při použití poutavějších slov.</p>

<p>Použít <code>og:title</code> je vhodné v případě, že je v <code>&lt;title></code> kromě názvu článku i název web – ten je zbytečné duplikovat, protože se zobrazuje automaticky pod odkazem. V titulku pro Facebook by měl být tedy jen název stránky.</p>




<h3 id="url">URL</h3>

<p>Na první pohled se může zdát zbytečné uvádět URL</p>

<pre><code>&lt;meta property="og:url" content="http://example.com/"></code></pre>


<p>Význam to ale má. Do adresy se může dostat nějaké <i>smetí</i> jako třeba <a href="/js-zmena-url#utm">UTM parametry</a>, které potom při sdílení mohou zbytečně drobit počet sdílení, protože jde o jiné URL.</p>



<h3 id="app">App ID</h3>

<p>Není nutné, ale Facebook doporučuje <code>og:app_id</code> přidat.</p>

<pre><code>&lt;meta property="fb:app_id" content="123456789"></code></pre>

<p>Pomocí App ID jde propojit stránku s FB aplikací. Nějakou konkrétní zajímavou výhodu v tom nevidím.</p>


<p>Facebook má ohledně sdílení speciální stránku s doporučením:</p>

<div class="external-content">
  <ul>
    <li>Facebook: <a href="https://developers.facebook.com/docs/sharing/best-practices?locale=cs_CZ#debug">Sharing Best Practices for Websites &amp; Mobile Apps</a> – doporučení pro sdílení</li>
  </ul>
</div>

<h2 id="twitter">Náhled na Twitteru</h2>

<p><a href="/twitter">Twitter</a> dokáže převzít data z <code>og:</code> značek. Stránka optimalisovaná pro Facebook by se proto měla zobrazit dobře i na Twitteru. Jediné, co je potřeba přidat, je následující <code>&lt;meta></code> značka:</p>

<pre><code>&lt;meta name="twitter:card" content="summary"></code></pre>

<p>U významných nebo rozkliknutých tweetů s odkazem se rovnou zobrazí náhled.</p>

<p><img src="/files/nahled-odkazu/twitter-nahled.png" alt="Náhled sdíleného odkazu na Twitteru" class="border"></p>



















<p>Bude-li mít náhledový obrázek rozměry alespoň <b>506 × 253 pixelů</b>, zobrazí se velký nad názvem a popisem stránky – obdobně jako na Facebooku.</p>


<p>Pro testování podoby náhledu odkazu existuje nástroj:</p>

<p><a href="https://cards-dev.twitter.com/validator" class="button">Twitter Card validator</a></p>



<p>Twitter umožňuje jako náhled použít i interaktivní prvky jako například video; věnuje se tomu zvláštní článek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/nahled-twitter">Náhled odkazu na Twitteru</a> – jak zajistit co nejlepší zobrazení odkazu na Twitteru</li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
<li>Buffer: <a href="https://blog.bufferapp.com/ideal-image-sizes-social-media-posts">The Mega Guide to Ideal Image Sizes for Your Social Media Posts: Guidelines for All 6 Major Social Networks</a></li>

<li><a href="http://www.audienceview.com/size-does-matter/">Images on Twitter – Size Does Matter</a></li>

<li><a href="http://freshtakeoncontent.com/twitter-image-sizes-dimensions/">Twitter Style Guide: Sizes &amp; Dimensions for Twitter Graphics &amp; Images</a></li>

<li><a href="https://365tipu.wordpress.com/2015/07/04/tip185-co-je-to-open-graph-a-proc-je-potreba-aby-designeri-webu-vedeli-o-co-jde/">TIP#185: Co je to Open Graph a proč je potřeba aby designeři webů věděli o co jde</a></li>  
  
  <li><a href="https://365tipu.wordpress.com/2015/07/02/tip183-jake-jsou-rozmery-vsech-tech-ruznych-obrazku-na-facebooku/">TIP#183: Jaké jsou rozměry všech těch různých obrázků na Facebooku?</a></li>
</ul>