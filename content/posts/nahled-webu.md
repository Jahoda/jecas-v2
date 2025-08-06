---
title: "Jak získat náhled webu?"
headline: "Získání náhledu/obrázku webu"
description: "Jak lze automaticky získat obrázkový náhled webové stránky."
date: "2013-06-25"
last_modification: "2013-06-25"
status: 1
tags: ["hotova-reseni", "napady", "seznam"]
format: "html"
---

<p><b>Zobrazení náhledu stránky</b> je možné docílit několika způsoby s využitím různých hotových nástrojů.</p>

<h2 id=seznam>Využití náhledů ze Seznamu</h2>
<p><a href='/nahled-seznam'>Screenshotátor Seznamu</a> prochází stránky a ukládá jejich screenshoty. Můžeme toho využít ve vlastní prospěch. Obrázek v rozlišení 100 × 75 pixelů snadno získáme na URL:
<pre><code>http://fimg.seznam.cz/?spec=ft100x75&amp;url=<b>http://jecas.cz</b></code></pre>

<div class=live>
<img src='http://fimg.seznam.cz/?spec=ft100x75&url=http://jecas.cz'>
</div>

<h2 id=shrink>ShrinkTheWeb</h2>
<p>Jedná se o webovou službu, která po jednoduché registraci umožní rovněž velmi pohodlně získávat obrázky webů. Do 5 000 požadavků za měsíc je služba zdarma.

<!--<div class=live>
<img src="http://images.shrinktheweb.com/xino.php?stwembed=1&stwxmax=320&stwymax=240&stwaccesskeyid=15687abbfd12615&stwurl=http://jecas.cz" border=0 />	
</div>-->

<p><a class=button href='http://www.shrinktheweb.com/'>Stránka ShrinkTheWeb</a>

<h2 id=websnapr>Websnapr</h2>
<p>Podobná služba nabízející zdarma dokonce 100 000 náhledů měsíčně. V tarifu zdarma ale přidává vodoznak.
<p><a class=button href='http://www.websnapr.com/'>Stránka Websnapr</a>



<h2 id=snapito>Snapito!</h2>
<p>Vytváří malé náhledy i obrázek celého webu. Po zadání e-mailu a hesla, nabízí pohodlné API.
<!--<div class=live>
<img src='http://api.snapito.com/web/294aa707ee65119289bcdaaddea449ed52fd7d37/mc?url=jecas.cz'>
</div>-->
<p><a class=button href='http://snapito.com/'>Stránka Snapito!</a>



<h2 id=ws>Web Screenshots</h2>
<p><img class=border src='/files/nahledy-webu/ws.png'>
<p>Zajímavá služba tvořící obrázky celé stránky, limit je 10 stránek na hodinu. Naneštěstí tato služba nemá API, takže by bylo potřeba napsat si vlastní rozhraní pro získávání obrázků.
<p><a class=button href='http://ctrlq.org/screenshots/'>Web Screenshots</a>


<h2 id=url2png>URL2PNG</h2>
<p>Zde dostupné pohodlné API je, nicméně služba není zdarma (měsíčně $30 za 3 500 obrázků).
<p><a class=button href='http://url2png.com/'>Stránka služby URL2PNG</a>

<h2><a href='http://browsershots.org/'>Browsershots</a> &amp; <a href='http://www.browserstack.com/'>BrowserStack</a></h2>
<p>Tyto služby umí dělat i náhledy úplně celé stránky, bohužel:

<ul>
<li><b>Browsershots.org</b> má složitěji použitelné API a na obrázky se dlouho čeká,
<li><b>BrowserStack.com</b> zase není zdarma.
</ul>

<h2 id=stazeni-obrazku>Stažení obrázku k sobě na server v PHP</h2>
<p>Může vypadat následovně.
<pre><code>&lt;?php
$url = "jecas.cz";
$nahled = file_get_contents("http://adresa-sluzby.com/?url=$url");
file_put_contents("cesta/k/nahledum" . $url. ".jpg", $nahled);</code></pre>

<h2 id="zivy-nahled">Živý náhled stránky</h2>
<p>Je to spíš taková kuriosita, ale zmenšeninu webu je možné vytvořit i ze stránky vložené do <code>&lt;iframe></code> a jeho <b>zmenšením v CSS</b>: <code>transform: scale(.3)</code> (s příslušnými <a href="/css-prefixy">prefixy</a>). <a href="https://kod.djpw.cz/wqv">Ukázka</a>.</p>

<p>Takový <i>náhled</i> bude živý. Nevýhoda je, že to dost zpomalí načítání stránky, kde bude <i>náhled</i> umístěn, protože se bude načítat i ta kompletní stránka v rámu.</p>

<p>Kromě toho řada stránek <b>vložení do rámu blokuje</b> hlavičkou <code>X-FRAME-OPTIONS</code>.</p>