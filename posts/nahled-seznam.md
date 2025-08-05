---
title: "Náhled stránky na Seznam.cz"
headline: "Úprava náhledového obrázku webu na Seznamu"
description: "Vyhledávání na Seznamu zobrazuje vedle výsledků vyhledávání obrázkový náhled webu. Jak zobrazení náhledu stránky ve vyhledávači ovlivnit?"
date: "2013-04-26"
last_modification: "2017-04-24"
status: 1
tags: ["seo", "seznam"]
format: "html"
---

<p>Jelikož weby jsou v <b>screenshot generátoru Seznamu</b> <i>snímány v <a href='http://fulltext.sblog.cz/2009/02/04/novy-screenshot-generator/'>rozlišení cca <del>700×550 pix</del></a></i> <i><a href="https://twitter.com/liborsmekal/status/362669997421629442">700×525 bodů</a></i>, může se snadno stát, že automatický náhled nebude ideální (zobrazení zmenšené podoby stránky pro malá zařízení nebo překrytí reklamou) a nezbývá než tzv. Screenshotátor popostrčit.</p>


<!--
<div class="soft">
  <h2 id="novy">Nové náhledy na Seznamu</h2>
  <p>Zatím pokusně na <a href="http://seznam.sk">seznam.sk</a> funguje nový styl hledání s většími náhledy. Ty pořizuje nový <i>screen-shot generátor</i> v rozlišení 1600×1200 pixelů (podle měření v Google Analytics).</p>
  <p><b>User-agent</b>: Mozilla/5.0 (compatible; Seznam screenshot-generator 2.1; +http://fulltext.sblog.cz/screenshot/)</p>
    <p>Kromě toho ještě existuje <b>mobilní</b> varianta: Mozilla/5.0 (Linux; U; Android 4.1.2; cs-cz; Seznam screenshot-generator Build/Q3) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30</p>
</div>
-->








<h2 id="zmena">Změna náhledu</h2>

<p>Někdy se může stát, že obrázkový robot <b>zachytí stránku špatně</b>. Například v momentě, kdy probíhá údržba nebo se stane nějaká chyba. Stejně tak při <b>úpravách vzhledu</b> může být žádoucí, aby se náhled změnil.</p>

<p>Přegenerování lze vyžádat <a href="/pridat-url">přidáním URL</a>.</p>

<blockquote>
  <p>Přidáním stránky docílíte také <b>obnovení starého nebo neexistujícího náhledu</b> stránky.</p>
</blockquote>






<h2 id=detekce>Detekce</h2>

<p>Pro detekování obrázkového robota jde využít tyto údaje:</p>

<table>
<tr><th>IP adresy
  <td>
    <pre><code>77.75.77.123
77.75.77.174
77.75.77.200
77.75.79.123
77.75.79.200
2a02:598:2::1123
2a02:598:2::1200</code></pre>
<tr><th>Hlavičky <code>user-agent</code><td>
  <pre><code>Mozilla/5.0 PhantomJS (compatible; Seznam screenshot-generator 2.1; +http://fulltext.sblog.cz/screenshot/
Mozilla/5.0 (compatible; Seznam screenshot-generator 2.0; +http://fulltext.sblog.cz/screenshot/)
Mozilla/5.0 (compatible; Seznam screenshot-generator 2.1; +http://fulltext.sblog.cz/screenshot/)
Mozilla/5.0 (Linux; U; Android 4.1.2; cs-cz; Seznam screenshot-generator Build/Q3) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30</code></pre>
</table>
<p><b>Poznámka</b>: IP adresa i <code>user-agent</code> se mohou změnit, aktuální hodnoty by měly být na stránce <a href='http://napoveda.seznam.cz/cz/fulltext-hledani-v-internetu/komunikace-s-vyhledavacim-robotem/seznambot/'>nápovědy Seznamu</a>. Doporučuji testovat řetězec <code>Seznam screenshot-generator</code>, ten by snad mohl vydržet nejdéle.

<h2 id=upravy>Úpravy</h2>
<p>Pro upravení náhledu lze zvolit dvě možnosti:
<ol>
  <li>některé části (<a href="https://twitter.com/liborsmekal/status/362667289763512320">typicky reklamy</a>) při návštěvě <b>generátorem screenshotů</b> skrýt/upravit,
    <li>ze stránky si udělat <b>vlastní obrázek</b> ve zmíněném rozlišení (<i>cca 700×525 pix</i>) a robotovi jej nabídnout jako <code>&lt;img></code> obrázek.
</ol>

<h2 id=reseni>Řešení v PHP</h2>
<p>V jazyce PHP potom stačí jednoduchá podmínka na začátku webu:
<pre><code>&lt;?php 
if (strpos($_SERVER['HTTP_USER_AGENT'], "Seznam screenshot-generator")) {
  die("&lt;img src='adresa-nahledoveho-obrazku.png'>");
}
?></code></pre>
<p>Nebo naopak:
<pre><code>&lt;?php if (<b>!</b>strpos($_SERVER['HTTP_USER_AGENT'], "Seznam screenshot-generator")) { ?>
&lt;div class='reklama'>Nějaký obsah, co se screenovacímu robotovi neukáže.&lt;/div>
&lt;?php } ?></code></pre>
<p>Pokud je cílem skrýt některé prvky. V tomto případě dávám k úvaze jen přiřadit zvláštní CSS třídu pro <code>&lt;html></code> nebo <code>&lt;body></code> a potřebné změny zajistit pomocí CSS.
  
<h2 id="cloaking">Cloaking?</h2>
<p>Cloaking je podvodná technika, kdy se vyhledávačům (právě pomocí nějaké detekce jako je výše uvedená) a běžným návštěvníkům posílá různý obsah s nekalým úmyslem vyhledávač obelstít (více na <a href="http://en.wikipedia.org/wiki/Cloaking">anglické Wikipedii</a>).</p>
<p>Nicméně při nepodovodném použití se jedná o běžný <a href="https://en.wikipedia.org/wiki/Content_negotiation">content negotiation</a>, tj. čistou praktiku podobně jako mobilní prohlížeče dostávají upravenou <a href="/mobilni-web">mobilní versi</a> a slušný vyhledávač by neměl nic namítat.</p>
  
<h2 id="hlavni-obrazek">Hlavní obrázek</h2>
  <p>Ohledně náhledů Seznam.cz nabízí ještě tzv. <a href="http://napoveda.seznam.cz/cz/fulltext-hledani-v-internetu/komunikace-s-generatorem-nahledu/pravidla-pro-hlavni-obrazek/">Hlavní obrázek</a>, ten ale bohužel není moc použitelný.</p>
  <blockquote>
    <p>Hlavní obrázek (previewimage) se uplatňuje jenom v několika spíše výjimečných situacích. V případě normální stránky pouze při hledání přes operátor <code>site:</code>.</p>
    <p class="autor"><b>Yuhů</b> na <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=13&amp;topic=148171#10">DJPW</a></p>
  </blockquote>
  
  
  