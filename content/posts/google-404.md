---
title: "Google a chybová stránka 404"
headline: "Google ignoruje obsah „404 stránky“"
description: "Jak se staví Google k obsahu chybové stránky s kódem 404/410."
date: "2015-01-20"
last_modification: "2015-07-21"
status: 1
tags: ["google", "seo"]
format: "html"
---

<p>Pro případy, kdy se uživatel dostane na URL, která na webu <b>neexistuje</b>, bývá dobré vytvořit „chybovou stránku 404“.</p>

<p><b>Chybová stránka</b> má smysl pro návštěvníka, protože se z ní může dozvědět, kde by původní obsah mohl najít. Aby robot vyhledávače poznal, že se jedná o <b>chybovou stránku</b>, posílá se HTTP kód 404 nebo 410.</p>

<ul>
  <li><b>404 Not Found</b> – stránka nebyla nalezena, není vyloučeno, že v budoucnu bude fungovat</li>  
  <li><b>410 Gone</b> – stránka <b>byla zrušena</b> a není plánované její obnovení</li>
</ul>

<p>Zajímavý je přístup, kterým se k 404/410 stránkám <b>chová Google</b>. Jejich obsah totiž úplně <b>ignoruje</b>.</p>

<p>Na Twitteru to <a href="https://twitter.com/JohnMu/status/556889502187536384">potvrdil</a> <b>John Mueller</b> z Googlu.</p>

<blockquote>
  <p>We ignore everything on pages that return 404/410 when we crawl them - make them work for your users.</p>
</blockquote>

<h2 id="minimum">Minimum 404 stránek</h2>

<p>Plyne z toho mimo jiné následující – snažit se mít minimální počet zpětných odkazů a přístupů na stránky vracející kód 404.</p>

<div class="internal-content">
  <ul>
    <li><a href="/oprava-url">Dohledání a opravení rozbité adresy</a> – překlepy v odkazech může jít automaticky opravit a přesměrovat</li>
  </ul>
</div>

<p>Pomůže se i držet pravidla <b>nikdy neměnit URL</b>. A když už, tak všechny staré URL <b>přesměrovat na nové</b>.</p>

<div class="external-content">
  <ul>
    <li><b>Yuhů</b>: <a href="http://weblog.jakpsatweb.cz/d/1333060980-tri-zasady-pro-tvorbu-dobrych-seo-url.html">Tři zásady pro tvorbu dobrých SEO URL</a></li>
  </ul>
</div>

<p>Pokud na nějakou neexistující URL chodí návštěvníci nebo vedou odkazy, je dobrý nápad na takové adrese <b>vytvořit obsah</b>.</p>


<h2 id="zruseny-obsah">Zrušený obsah</h2>

<p>Častou chybou je, že autor webu neaktuální obsah (např. zboží v e-shopu, co se už neprodává) jednoduše <b>smaže</b>. Zbytečně se tím připraví o případné návštěvy z vyhledávání.</p>

<p>Ideální postup je na stránku přidat informaci, že už <b>není aktuální</b>. A k tomu nabídnout návštěvníkovi obsah, který by ho mohl zajímat.</p>



<h2 id="zjistit">Zjištění chyb 404</h2>

<p>Aby se mohlo s případnými neexistujícími stránkami něco dělat, je dobré je <b>zaznamenávat</b> (<i>logovat</i>). To jde mnoha způsoby jako je:</p>

<ul>
  <li>Logování chybových stránek na straně serveru.</li>
  
  <li>Používání nějakého počitadla. Např. <a href="/ga">Google Analytics</a>.</li>
  
  <li>Logování 404 v redakčním systému. Třeba <a href="/wordpress">WordPress</a> to umí s doplňkem <b>SEO Ultimate</b>.</li>
</ul>


<h2 id="archiv">Zobrazení odkazu na archive.org</h2>

<p>Archivní služba, která ukládá čas od času podoby webových stránek, nabízí jednoduchý způsob, jak na stránku 404 přidat odkaz na <b>zobrazení z archivu</b>.</p>

<p>Stačí vložit kód:</p>

<pre><code>&lt;div id="wb404">&lt;/div>
&lt;script src="https://archive.org/web/wb404.js">&lt;/script></code></pre>






<p>V případě, že je z archivu co zobrazit, se objeví informace s odkazem.</p>

<p><img src="/files/google-404/archive.png" alt="Zobrazení boxu s odkazem na archiv" class="border"></p>




<p>Jinak se neukáže nic.</p>

<div class="external-content">
  <ul>
    <li><a href="https://blog.archive.org/2013/10/24/web-archive-404-handler-for-webmasters/">Free “404: File Not Found” Handler for Webmasters to Improve User Experience</a></li>
  </ul>
</div>

<p><small>Tip na toto řešení poslal <a href="http://baraja.cz/">Jan Barášek</a>.</small></p>